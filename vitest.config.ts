import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    // Unit tests live next to the code they cover. The Playwright e2e specs
    // (e2e/*.spec.ts) are intentionally excluded so vitest never tries to run
    // them.
    include: ["src/**/*.test.ts"],
  },
});
