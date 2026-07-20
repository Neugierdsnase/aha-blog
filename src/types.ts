import type { CollectionEntry } from "astro:content";

export type BookPost = CollectionEntry<"book">;

/** Minimal shape a PostList / PostListItem needs to render an entry. */
export interface PostListEntry {
  id: string;
  data: {
    title: string;
    description?: string;
    pubDate: Date;
  };
}
