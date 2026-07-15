import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import rehypeTufteSidenotes from "./src/plugins/rehype-tufte-sidenotes";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.vomkonstant.in",
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypeTufteSidenotes],
  },
  integrations: [mdx(), sitemap(), react()],
  vite: {
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    plugins: [tailwindcss()],
  },
});
