import { Octokit } from '@octokit/rest';
import type { RepoData, StarPoint } from './models.js';

// 1 minute cache to avoid hammering the API
const cache = new Map<string, { data: RepoData; timestamp: number }>();
const CACHE_TTL = 60_000; // 60 seconds

function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    return new Octokit({ auth: token, userAgent: 'repo-sense/0.1.0' });
  }
  return new Octokit({ userAgent: 'repo-sense/0.1.0' });
}

function parseRepo(repo: string): { owner: string; name: string } {
  const parts = repo.split('/');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(`Invalid repo format: "${repo}". Use "owner/name" format (e.g., "facebook/react")`);
  }
  return { owner: parts[0], name: parts[1] };
}

function getCacheKey(owner: string, name: string): string {
  return `${owner}/${name}`;
}

export async function getRepo(repoStr: string): Promise<RepoData> {
  const { owner, name } = parseRepo(repoStr);
  const cacheKey = getCacheKey(owner, name);
  const cached = cache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const octokit = getOctokit();
  const { data } = await octokit.rest.repos.get({ owner, repo: name });
  const { data: topicsData } = await octokit.rest.repos.getAllTopics({ owner, repo: name });

  const repoData: RepoData = {
    owner,
    name,
    fullName: data.full_name,
    description: data.description,
    language: data.language,
    license: data.license?.spdx_id ?? null,
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    openIssues: data.open_issues_count ?? 0,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    pushedAt: data.pushed_at,
    topics: topicsData.names ?? [],
    homepage: data.homepage,
    defaultBranch: data.default_branch,
  };

  cache.set(cacheKey, { data: repoData, timestamp: now });
  return repoData;
}

export async function getStarHistory(repoStr: string, points: number = 10): Promise<StarPoint[]> {
  const { owner, name } = parseRepo(repoStr);
  const repo = await getRepo(repoStr);

  const created = new Date(repo.createdAt);
  const now = new Date();
  const totalStars = repo.stars;
  const totalDays = Math.max(1, (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

  // Estimate star history based on time distribution
  const history: StarPoint[] = [];
  for (let i = 0; i < points; i++) {
    const fraction = (i + 1) / points;
    const date = new Date(created.getTime() + (now.getTime() - created.getTime()) * fraction);
    const estimatedStars = Math.round(totalStars * fraction);
    history.push({
      date: date.toISOString().split('T')[0],
      stars: estimatedStars,
    });
  }

  return history;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

export function formatDelta(current: number, previous: number): string {
  const diff = current - previous;
  if (diff > 0) return `+${diff}`;
  if (diff < 0) return `${diff}`;
  return '0';
}

export function clearCache(): void {
  cache.clear();
}
