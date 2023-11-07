import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: [
      './lib/utils.ts',
    ],
  },
})
