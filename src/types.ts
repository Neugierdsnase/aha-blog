import type { CollectionEntry } from "astro:content";

type BlogPost = CollectionEntry<"blog">;
export type BookPost = CollectionEntry<"book">;
type TestPost = CollectionEntry<"test-content">;
