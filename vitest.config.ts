import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/sample/**/*.ts', 'test/builtins/**/*.ts'],
  },
})
