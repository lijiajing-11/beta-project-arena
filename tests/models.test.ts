import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import type { RepoData, StarPoint, RepoSnapshot, BattleResult } from '../src/models.js';

describe('Models', () => {
  describe('RepoData', () => {
    it('should have all required fields', () => {
      const repo: RepoData = {
        owner: 'facebook',
        name: 'react',
        fullName: 'facebook/react',
        description: 'A UI library',
        language: 'TypeScript',
        license: 'MIT',
        stars: 100000,
        forks: 20000,
        openIssues: 500,
        createdAt: '2013-05-24T16:15:54Z',
        updatedAt: '2024-01-01T00:00:00Z',
        pushedAt: '2024-01-01T00:00:00Z',
        topics: ['react', 'ui'],
        homepage: 'https://react.dev',
        defaultBranch: 'main',
      };

      expect(repo.owner).toBe('facebook');
      expect(repo.name).toBe('react');
      expect(repo.stars).toBe(100000);
      expect(repo.forks).toBe(20000);
      expect(repo.openIssues).toBe(500);
    });

    it('should allow null description', () => {
      const repo: RepoData = {
        owner: 'test',
        name: 'test',
        fullName: 'test/test',
        description: null,
        language: null,
        license: null,
        stars: 0,
        forks: 0,
        openIssues: 0,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
        pushedAt: '2020-01-01T00:00:00Z',
        topics: [],
        homepage: null,
        defaultBranch: 'main',
      };

      expect(repo.description).toBeNull();
      expect(repo.language).toBeNull();
    });

    it('should allow empty topics array', () => {
      const repo: RepoData = {
        owner: 'test',
        name: 'test',
        fullName: 'test/test',
        description: null,
        language: 'JavaScript',
        license: null,
        stars: 0,
        forks: 0,
        openIssues: 0,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
        pushedAt: '2020-01-01T00:00:00Z',
        topics: [],
        homepage: null,
        defaultBranch: 'main',
      };

      expect(repo.topics).toEqual([]);
    });
  });

  describe('StarPoint', () => {
    it('should have date and stars fields', () => {
      const point: StarPoint = {
        date: '2024-01-01',
        stars: 50000,
      };

      expect(point.date).toBe('2024-01-01');
      expect(point.stars).toBe(50000);
    });
  });

  describe('RepoSnapshot', () => {
    it('should contain a repo and timestamp', () => {
      const repo: RepoData = {
        owner: 'test',
        name: 'test',
        fullName: 'test/test',
        description: 'Test',
        language: 'TypeScript',
        license: 'MIT',
        stars: 100,
        forks: 10,
        openIssues: 1,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
        pushedAt: '2020-01-01T00:00:00Z',
        topics: [],
        homepage: null,
        defaultBranch: 'main',
      };
      const timestamp = new Date('2024-06-01T12:00:00Z');

      const snapshot: RepoSnapshot = { repo, timestamp };

      expect(snapshot.repo).toBe(repo);
      expect(snapshot.timestamp).toBe(timestamp);
    });
  });

  describe('BattleResult', () => {
    it('should have all battle fields', () => {
      const makeRepo = (name: string): RepoData => ({
        owner: 'test',
        name,
        fullName: `test/${name}`,
        description: null,
        language: null,
        license: null,
        stars: 0,
        forks: 0,
        openIssues: 0,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
        pushedAt: '2020-01-01T00:00:00Z',
        topics: [],
        homepage: null,
        defaultBranch: 'main',
      });

      const repo1: RepoSnapshot = { repo: makeRepo('repo1'), timestamp: new Date() };
      const repo2: RepoSnapshot = { repo: makeRepo('repo2'), timestamp: new Date() };

      const result: BattleResult = {
        repo1,
        repo2,
        winner: 'repo1',
        starDiff: 100,
        forkDiff: 10,
        issueDiff: -5,
        scores: { stars: 'test/repo1', forks: 'test/repo1', issues: 'test/repo2', language: 'Tie' },
      };

      expect(result.winner).toBe('repo1');
      expect(result.starDiff).toBe(100);
      expect(result.scores.stars).toBe('test/repo1');
    });

    it('can have tie as winner', () => {
      const makeRepo = (name: string): RepoData => ({
        owner: 'test',
        name,
        fullName: `test/${name}`,
        description: null,
        language: null,
        license: null,
        stars: 0,
        forks: 0,
        openIssues: 0,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
        pushedAt: '2020-01-01T00:00:00Z',
        topics: [],
        homepage: null,
        defaultBranch: 'main',
      });

      const result: BattleResult = {
        repo1: { repo: makeRepo('a'), timestamp: new Date() },
        repo2: { repo: makeRepo('b'), timestamp: new Date() },
        winner: 'tie',
        starDiff: 0,
        forkDiff: 0,
        issueDiff: 0,
        scores: { stars: 'Tie', forks: 'Tie', issues: 'Tie', language: 'Same' },
      };

      expect(result.winner).toBe('tie');
    });
  });
});
