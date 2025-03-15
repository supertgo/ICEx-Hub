import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    mockReset: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/test/vitest.setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: [
        ...configDefaults.exclude,
        '**/./next/**',
        '**/node_modules/**',
        '**/cypress/**',
        '**/assets/**',
        '**/lib/**',
        '**/protocols/**',
        '**/app/**',
        'src/**/**.stories.tsx',
        'src/**/**.mock.tsx',
        'src/middleware.ts',
        'src/icons/**',
        'src/test/**',
        'src/test/**',
        'src/utils/urls.ts',
        'src/utils/test/test-utils.ts',
        'src/types/**',
        'src/services/api/api.ts',
        'src/styles/global.ts',
        'src/providers/app-providers.tsx',
        'src/providers/query-provider.tsx',
        '**/generators/**',
        'next.config.js',
      ],
    },
  },
})
