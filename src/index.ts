import { Command } from 'commander';
import { watchRepo, renderDashboard, battleRepos, renderBattle } from './commands/watch.js';

export async function run(): Promise<void> {
  const program = new Command();

  program
    .name('rs')
    .description('🧬 repo-sense — Beautiful GitHub repo intelligence from your terminal')
    .version('0.1.0');

  program
    .command('watch <repo>')
    .description('Watch a repository with live-updating metrics dashboard')
    .option('-i, --interval <seconds>', 'Polling interval in seconds', '30')
    .action(async (repo: string, options: { interval: string }) => {
      const interval = parseInt(options.interval, 10) || 30;
      const abortController = new AbortController();

      process.on('SIGINT', () => {
        abortController.abort();
      });

      try {
        await watchRepo(
          repo,
          (snapshot, previous) => renderDashboard(snapshot, previous),
          interval,
          abortController.signal
        );
      } catch (err: any) {
        console.error(`✗ Error: ${err.message}`);
        process.exit(1);
      }
    });

  program
    .command('battle <repo1> <repo2>')
    .description('Compare two repositories head-to-head')
    .action(async (repo1: string, repo2: string) => {
      try {
        const result = await battleRepos(repo1, repo2);
        renderBattle(result);
      } catch (err: any) {
        console.error(`✗ Error: ${err.message}`);
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

// Allow running directly
run();
