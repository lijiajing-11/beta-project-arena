import * as esbuild from 'esbuild';

try {
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'es2022',
    format: 'esm',
    outfile: 'dist/index.js',
    banner: { js: '#!/usr/bin/env node' },
    sourcemap: true,
  });
  console.log('✅ Build succeeded!');
} catch (e) {
  console.error('❌', e.message);
  process.exit(1);
}
