import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    include: ['src/**/*.spec.ts'],
    exclude: [
      'node_modules',
      'dist',
    ],
  },
})