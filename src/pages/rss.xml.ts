import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const books = await getCollection("book", ({ data }) => !data.draft);

  // Enhanced blog post items with metadata
  const postItems = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description || post.data.subtitle || "",
    pubDate: post.data.pubDate,
    link: `/blog/${post.id}/`,
    author: "Konstantin",
    categories: [post.data.lang, ...(post.data.featured ? ["featured"] : [])].filter(Boolean),
    customData: `<language>${post.data.lang}</language>`,
  }));

  // Enhanced book items with metadata
  const bookItems = books.map((book) => ({
    title: book.data.title,
    description: book.data.description || "",
    pubDate: book.data.finishedDate,
    link: `/book/${book.id}/`,
    author: book.data.authors?.join(", ") || "Unknown",
    categories: [
      book.data.genre?.primary,
      ...(book.data.genre?.secondary || []),
    ].filter(Boolean),
    customData: book.data.rating
      ? `<rating>${book.data.rating}/10</rating>
         <recommendation>${book.data.recommendation || "neutral"}</recommendation>`
      : "",
  }));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: [...postItems, ...bookItems],
    customData: `<language>de-DE</language>
    <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
  });
}
