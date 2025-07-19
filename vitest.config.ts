import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/fraction.ts', 'test/sample/**/*.ts', 'test/builtins/**/*.ts', 'test/doc/**/*.ts'],
  },
})
