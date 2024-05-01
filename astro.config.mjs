import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import htmx from "astro-htmx";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.vomkonstant.in",
  markdown: {
    syntaxHighlight: false,
    gfm: false,
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
  integrations: [mdx(), sitemap(), htmx()],
});
