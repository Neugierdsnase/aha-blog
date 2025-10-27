import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeTufteFootnotes from "./scripts/rehype-tufte-footnotes.js";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.vomkonstant.in",
	markdown: {
		syntaxHighlight: false,
		gfm: true,
		rehypePlugins: [rehypeTufteFootnotes],
	},
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
