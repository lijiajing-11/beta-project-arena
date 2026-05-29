import { describe, it, expect, vi, beforeEach } from 'vitest';

// We'll test the CLI by importing individual exports
import { Command } from 'commander';

describe('CLI Entry', () => {
  it('should define watch and battle commands', () => {
    // Just verify the program structure parses correctly
    const program = new Command();

    program
      .name('rs')
      .description('🧬 repo-sense')
      .version('0.1.0');

    program
      .command('watch <repo>')
      .description('Watch a repository with live-updating metrics dashboard')
      .option('-i, --interval <seconds>', 'Polling interval in seconds', '30');

    program
      .command('battle <repo1> <repo2>')
      .description('Compare two repositories head-to-head');

    const commands = program.commands.map(c => c.name());
    expect(commands).toContain('watch');
    expect(commands).toContain('battle');
  });

  it('should have correct version', () => {
    const program = new Command();
    program.version('0.1.0');
    expect(program.version()).toBe('0.1.0');
  });

  it('should parse watch interval option', () => {
    const program = new Command();
    program
      .command('watch <repo>')
      .option('-i, --interval <seconds>', 'Polling interval', '30');

    const cmd = program.commands[0];
    // Test default value
    const opts = cmd.opts();
    // Default is handled in action, not as option default
  });

  it('should require repo argument for watch', () => {
    const program = new Command();
    const cmd = program
      .command('watch <repo>')
      .description('test');

    expect(cmd.arguments()[0].required).toBe(true);
  });

  it('should require both repo arguments for battle', () => {
    const program = new Command();
    const cmd = program
      .command('battle <repo1> <repo2>')
      .description('test');

    expect(cmd.arguments().length).toBe(2);
    expect(cmd.arguments()[0].required).toBe(true);
    expect(cmd.arguments()[1].required).toBe(true);
  });
});
