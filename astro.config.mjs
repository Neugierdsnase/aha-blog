import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://blog.vomkonstant.in",
    markdown: {
        syntaxHighlight: false,
        gfm: true,
        rehypePlugins: [],
    },
    integrations: [mdx(), sitemap(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
});