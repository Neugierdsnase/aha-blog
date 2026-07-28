import { getCollection } from "astro:content";
import type { CollectionKey } from "astro:content";

/** Static paths for a `[...slug].astro` route backed by a single content collection. */
export async function getContentPaths<C extends CollectionKey>(collection: C) {
  const entries = await getCollection(collection);
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: entry,
  }));
}
