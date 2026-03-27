import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;
export type BookPost = CollectionEntry<"book">;
export type TestPost = CollectionEntry<"test-content">;
