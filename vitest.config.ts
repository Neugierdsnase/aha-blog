import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Unit tests live next to the code they cover. The Playwright e2e specs
    // (e2e/*.spec.ts) are intentionally excluded so vitest never tries to run
    // them.
    include: ["src/**/*.test.ts"],
  },
});
