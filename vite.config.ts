import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  fmt: {
    proseWrap: "always",
    printWidth: 80,
    sortPackageJson: false,
    astro: {},
    associations: [
      {
        files: ["*.astro"],
        language: "astro",
      },
      {
        files: ["*.mdx"],
        language: "mdx",
      },
    ],
    ignorePatterns: [
      "dist/",
      ".astro/",
      "node_modules/",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pnpm-debug.log*",
      ".env",
      ".env.production",
      ".DS_Store",
    ],
  },
});
