import chalk from 'chalk';
import Table from 'cli-table3';
import type { RepoData, RepoSnapshot, BattleResult } from '../models.js';
import { formatNumber, getRepo, clearCache } from '../github.js';

export async function watchRepo(
  repoStr: string,
  onUpdate: (snapshot: RepoSnapshot, previous?: RepoSnapshot) => void,
  interval: number = 30,
  signal?: AbortSignal
): Promise<void> {
  let previous: RepoSnapshot | undefined;
  let totalGrowth = 0;
  let startTime = Date.now();

  const tick = async (): Promise<void> => {
    if (signal?.aborted) return;
    try {
      clearCache();
      const repo = await getRepo(repoStr);
      const snapshot: RepoSnapshot = { repo, timestamp: new Date() };

      if (previous) {
        const growth = repo.stars - previous.repo.stars;
        totalGrowth += growth;
      }
      onUpdate(snapshot, previous);
      previous = snapshot;
    } catch (err: any) {
      if (previous) {
        console.log(chalk.yellow(`⚠ Stale data (last: ${previous.timestamp.toLocaleTimeString()}) — ${err.message}`));
      } else {
        console.error(chalk.red(`✗ Error: ${err.message}`));
        return;
      }
    }
  };

  await tick();
  if (signal?.aborted) return;

  return new Promise((resolve) => {
    const timer = setInterval(async () => {
      if (signal?.aborted) {
        clearInterval(timer);
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        console.log(chalk.cyan(`\n📊 Watch summary: ${mins}m ${secs}s watched, ${totalGrowth > 0 ? '+' : ''}${totalGrowth} new stars`));
        resolve();
        return;
      }
      await tick();
    }, interval * 1000);
  });
}

export function renderDashboard(snapshot: RepoSnapshot, previous?: RepoSnapshot): void {
  const { repo } = snapshot;
  const table = new Table({
    style: { head: ['cyan'], border: ['gray'] },
    colWidths: [20, 30],
  });

  const starDelta = previous ? repo.stars - previous.repo.stars : 0;
  const forkDelta = previous ? repo.forks - previous.repo.forks : 0;
  const issueDelta = previous ? repo.openIssues - previous.repo.openIssues : 0;

  table.push(
    [chalk.bold('Repository'), chalk.cyan(repo.fullName)],
    [chalk.bold('Description'), repo.description ?? chalk.gray('No description')],
    [
      chalk.bold('⭐ Stars'),
      `${formatNumber(repo.stars)} ${starDelta !== 0 ? (starDelta > 0 ? chalk.green(`(+${starDelta})`) : chalk.red(`(${starDelta})`)) : ''}`,
    ],
    [
      chalk.bold('⑂ Forks'),
      `${formatNumber(repo.forks)} ${forkDelta !== 0 ? (forkDelta > 0 ? chalk.green(`(+${forkDelta})`) : chalk.red(`(${forkDelta})`)) : ''}`,
    ],
    [
      chalk.bold('⚠ Issues'),
      `${formatNumber(repo.openIssues)} ${issueDelta !== 0 ? (issueDelta > 0 ? chalk.red(`(+${issueDelta})`) : chalk.green(`(${issueDelta})`)) : ''}`,
    ],
    [chalk.bold('🔤 Language'), repo.language ?? chalk.gray('N/A')],
    [chalk.bold('📜 License'), repo.license ?? chalk.gray('None')],
    [chalk.bold('🕐 Updated'), new Date(repo.updatedAt).toLocaleString()],
    [chalk.bold('📅 Created'), new Date(repo.createdAt).toLocaleDateString()],
  );

  console.clear();
  console.log(chalk.bold.cyan('\n  ┌──────────────────────────────────────┐'));
  console.log(chalk.bold.cyan('  │        🧬  repo-sense  WATCH        │'));
  console.log(chalk.bold.cyan('  └──────────────────────────────────────┘\n'));
  console.log(table.toString());
  console.log(chalk.gray(`  Last updated: ${snapshot.timestamp.toLocaleTimeString()}  |  Press Ctrl+C to stop\n`));
}

export async function battleRepos(repo1: string, repo2: string): Promise<BattleResult> {
  const [r1, r2] = await Promise.all([getRepo(repo1), getRepo(repo2)]);

  const starDiff = r1.stars - r2.stars;
  const forkDiff = r1.forks - r2.forks;
  const issueDiff = r1.openIssues - r2.openIssues;

  let winner: 'repo1' | 'repo2' | 'tie';
  if (starDiff > 0) winner = 'repo1';
  else if (starDiff < 0) winner = 'repo2';
  else winner = 'tie';

  const scores: Record<string, string> = {
    stars: starDiff > 0 ? r1.fullName : starDiff < 0 ? r2.fullName : 'Tie',
    forks: forkDiff > 0 ? r1.fullName : forkDiff < 0 ? r2.fullName : 'Tie',
    issues: issueDiff < 0 ? r1.fullName : issueDiff > 0 ? r2.fullName : 'Tie', // fewer issues = better
    language: r1.language === r2.language ? 'Same' : `${r1.language ?? 'N/A'} vs ${r2.language ?? 'N/A'}`,
  };

  return {
    repo1: { repo: r1, timestamp: new Date() },
    repo2: { repo: r2, timestamp: new Date() },
    winner,
    starDiff,
    forkDiff,
    issueDiff,
    scores,
  };
}

export function renderBattle(result: BattleResult): void {
  const { repo1: s1, repo2: s2, winner, starDiff, forkDiff, issueDiff, scores } = result;
  const r1 = s1.repo;
  const r2 = s2.repo;

  const table = new Table({
    style: { head: ['cyan'], border: ['gray'] },
    head: ['Metric', chalk.cyan(r1.fullName), chalk.magenta(r2.fullName), 'Victor'],
    colWidths: [14, 22, 22, 22],
  });

  const starWinner = starDiff > 0 ? r1.fullName : starDiff < 0 ? r2.fullName : '—';
  const forkWinner = forkDiff > 0 ? r1.fullName : forkDiff < 0 ? r2.fullName : '—';
  const issueWinner = issueDiff < 0 ? r1.fullName : issueDiff > 0 ? r2.fullName : '—';

  table.push(
    [
      '⭐ Stars',
      chalk.yellow(formatNumber(r1.stars)),
      chalk.yellow(formatNumber(r2.stars)),
      chalk.green(starWinner === r1.fullName ? '🏆' : starWinner === r2.fullName ? '🏆' : '—'),
    ],
    [
      '⑂ Forks',
      chalk.blue(formatNumber(r1.forks)),
      chalk.blue(formatNumber(r2.forks)),
      chalk.green(forkWinner === r1.fullName ? '🏆' : forkWinner === r2.fullName ? '🏆' : '—'),
    ],
    [
      '⚠ Issues',
      chalk.red(formatNumber(r1.openIssues)),
      chalk.red(formatNumber(r2.openIssues)),
      chalk.green(issueWinner === r1.fullName ? '🏆 (fewer)' : issueWinner === r2.fullName ? '🏆 (fewer)' : '—'),
    ],
    [
      '🔤 Language',
      r1.language ?? '—',
      r2.language ?? '—',
      r1.language === r2.language ? '✓ Same' : chalk.gray('Different'),
    ],
    [
      '📜 License',
      r1.license ?? '—',
      r2.license ?? '—',
      r1.license === r2.license ? '✓ Same' : chalk.gray('Different'),
    ],
  );

  console.log(chalk.bold.cyan('\n  ╔══════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('  ║            ⚔️   REPO BATTLE  ⚔️                        ║'));
  console.log(chalk.bold.cyan('  ╚══════════════════════════════════════════════════════════╝\n'));
  console.log(table.toString());

  console.log();

  // Winner summary
  if (winner === 'tie') {
    console.log(chalk.bold.yellow('\n  🤝 It\'s a tie! Both repos have the same star count!\n'));
  } else {
    const w = winner === 'repo1' ? r1 : r2;
    const l = winner === 'repo1' ? r2 : r1;
    const diff = Math.abs(starDiff);
    console.log(chalk.bold(`\n  🏆 ${chalk.green(w.fullName)} WINS!`));
    console.log(chalk.white(`     Leads by ${chalk.yellow(formatNumber(diff))} stars over ${chalk.gray(l.fullName)}`));
    if (forkDiff > 0 && winner === 'repo1') {
      console.log(chalk.gray(`     Also leads in forks: ${formatNumber(forkDiff)} more`));
    } else if (forkDiff > 0) {
      console.log(chalk.gray(`     ${l.fullName} leads in forks: ${formatNumber(Math.abs(forkDiff))} more`));
    }
    console.log();
  }
}
