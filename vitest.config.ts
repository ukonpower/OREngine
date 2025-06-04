import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      glpower: path.join(__dirname, 'packages/glpower/packages/glpower/src'),
      maxpower: path.join(__dirname, 'packages/maxpower'),
      '~': path.join(__dirname, 'src'),
    },
  },
  test: {
    dir: 'tests',
    include: ['**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    environment: 'node',
  },
});
