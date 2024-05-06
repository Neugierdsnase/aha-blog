import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.vomkonstant.in",
  markdown: {
    syntaxHighlight: false,
    gfm: false,
  },
  integrations: [mdx(), sitemap(), alpinejs()]
});
