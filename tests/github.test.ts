import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock @octokit/rest before importing github module
vi.mock('@octokit/rest', () => {
  const mockReposGet = vi.fn();
  const mockGetAllTopics = vi.fn();

  const mockOctokit = {
    rest: {
      repos: {
        get: mockReposGet,
        getAllTopics: mockGetAllTopics,
      },
    },
  };

  return {
    Octokit: vi.fn(() => mockOctokit),
  };
});

// Import after mocking
// We need to re-import modules after clearing cache to avoid stale cache state
import { getRepo, getStarHistory, formatNumber, formatDelta, clearCache } from '../src/github.js';

const mockOctokitModule = await import('@octokit/rest');

describe('GitHub API Client', () => {
  let mockOctokit: any;

  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();

    mockOctokit = new (mockOctokitModule.Octokit as any)();
  });

  afterEach(() => {
    clearCache();
  });

  describe('getRepo', () => {
    it('should parse and fetch repo data from GitHub API', async () => {
      const mockRepoResponse = {
        data: {
          full_name: 'facebook/react',
          description: 'A declarative UI library',
          language: 'JavaScript',
          license: { spdx_id: 'MIT' },
          stargazers_count: 100000,
          forks_count: 20000,
          open_issues_count: 500,
          created_at: '2013-05-24T16:15:54Z',
          updated_at: '2024-01-01T00:00:00Z',
          pushed_at: '2024-01-01T00:00:00Z',
          homepage: 'https://react.dev',
          default_branch: 'main',
        },
      };

      const mockTopicsResponse = {
        data: {
          names: ['react', 'javascript', 'ui'],
        },
      };

      mockOctokit.rest.repos.get.mockResolvedValue(mockRepoResponse);
      mockOctokit.rest.repos.getAllTopics.mockResolvedValue(mockTopicsResponse);

      const result = await getRepo('facebook/react');

      expect(result.owner).toBe('facebook');
      expect(result.name).toBe('react');
      expect(result.fullName).toBe('facebook/react');
      expect(result.description).toBe('A declarative UI library');
      expect(result.language).toBe('JavaScript');
      expect(result.license).toBe('MIT');
      expect(result.stars).toBe(100000);
      expect(result.forks).toBe(20000);
      expect(result.openIssues).toBe(500);
      expect(result.topics).toEqual(['react', 'javascript', 'ui']);
      expect(result.defaultBranch).toBe('main');
    });

    it('should return null license when spdx_id is missing', async () => {
      const mockRepoResponse = {
        data: {
          full_name: 'test/test',
          description: null,
          language: null,
          license: null,
          stargazers_count: 0,
          forks_count: 0,
          open_issues_count: 0,
          created_at: '2020-01-01T00:00:00Z',
          updated_at: '2020-01-01T00:00:00Z',
          pushed_at: '2020-01-01T00:00:00Z',
          homepage: null,
          default_branch: 'main',
        },
      };

      const mockTopicsResponse = { data: { names: [] } };

      mockOctokit.rest.repos.get.mockResolvedValue(mockRepoResponse);
      mockOctokit.rest.repos.getAllTopics.mockResolvedValue(mockTopicsResponse);

      const result = await getRepo('test/test');

      expect(result.license).toBeNull();
      expect(result.description).toBeNull();
      expect(result.topics).toEqual([]);
    });

    it('should throw on invalid repo format', async () => {
      await expect(getRepo('invalid')).rejects.toThrow('Invalid repo format');
      await expect(getRepo('too/many/slashes')).rejects.toThrow('Invalid repo format');
      await expect(getRepo('')).rejects.toThrow('Invalid repo format');
    });

    it('should throw on empty owner or name', async () => {
      await expect(getRepo('/repo')).rejects.toThrow('Invalid repo format');
      await expect(getRepo('owner/')).rejects.toThrow('Invalid repo format');
    });

    it('should use cache to avoid duplicate API calls', async () => {
      const mockRepoResponse = {
        data: {
          full_name: 'test/cached',
          description: 'Cached repo',
          language: 'TypeScript',
          license: { spdx_id: 'MIT' },
          stargazers_count: 100,
          forks_count: 10,
          open_issues_count: 1,
          created_at: '2020-01-01T00:00:00Z',
          updated_at: '2020-01-01T00:00:00Z',
          pushed_at: '2020-01-01T00:00:00Z',
          homepage: null,
          default_branch: 'main',
        },
      };

      const mockTopicsResponse = { data: { names: [] } };

      mockOctokit.rest.repos.get.mockResolvedValue(mockRepoResponse);
      mockOctokit.rest.repos.getAllTopics.mockResolvedValue(mockTopicsResponse);

      // First call
      const result1 = await getRepo('test/cached');
      expect(result1.stars).toBe(100);

      // Second call should use cache
      const result2 = await getRepo('test/cached');
      expect(result2.stars).toBe(100);

      // Only one API call should have been made (second is cached)
      expect(mockOctokit.rest.repos.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStarHistory', () => {
    it('should return estimated star history points', async () => {
      const mockRepoResponse = {
        data: {
          full_name: 'facebook/react',
          description: null,
          language: 'JavaScript',
          license: { spdx_id: 'MIT' },
          stargazers_count: 100000,
          forks_count: 20000,
          open_issues_count: 500,
          created_at: '2013-05-24T16:15:54Z',
          updated_at: '2024-01-01T00:00:00Z',
          pushed_at: '2024-01-01T00:00:00Z',
          homepage: null,
          default_branch: 'main',
        },
      };

      const mockTopicsResponse = { data: { names: [] } };

      mockOctokit.rest.repos.get.mockResolvedValue(mockRepoResponse);
      mockOctokit.rest.repos.getAllTopics.mockResolvedValue(mockTopicsResponse);

      const history = await getStarHistory('facebook/react', 5);

      expect(history.length).toBe(5);
      expect(history[0].stars).toBeGreaterThan(0);
      expect(history[4].stars).toBe(100000); // Last point should match total
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with K/M suffixes', () => {
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(2500000)).toBe('2.5M');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('formatDelta', () => {
    it('should format positive deltas with + prefix', () => {
      expect(formatDelta(105, 100)).toBe('+5');
    });

    it('should format negative deltas', () => {
      expect(formatDelta(95, 100)).toBe('-5');
    });

    it('should show zero for no change', () => {
      expect(formatDelta(100, 100)).toBe('0');
    });
  });
});
