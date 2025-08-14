import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const bookGenres: [string, ...string[]] = [
  "art",
  "art-history",
  "biography",
  "biography",
  "craft",
  "cultural-studies",
  "drama",
  "economics",
  "fantasy",
  "fiction",
  "historical-fiction",
  "history",
  "history",
  "humor",
  "literary-fiction",
  "memoir",
  "memoir",
  "mystery",
  "mythology",
  "nautical",
  "non-fiction",
  "novella",
  "personal-development",
  "philosophy",
  "philosophy",
  "poetry",
  "politics",
  "productivity",
  "psychology",
  "romance",
  "science",
  "self-help",
  "social-criticism",
  "technology",
  "thriller",
  "travel",
];

const book = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // Core book information
    title: z.string(),
    subtitle: z.string().optional(),
    authors: z.array(z.string()),
    description: z.string().optional(),

    // Publication details
    publisher: z.string().optional(),
    releaseDate: z.union([z.number(), z.string()]), // Year or full date
    originalLanguage: z
      .enum(["de", "en", "fr", "es", "it", "ru", "other"])
      .optional(),
    translator: z.string().optional(),
    pages: z.number().optional(),
    isbn: z.string().optional(),

    // Series information
    series: z
      .object({
        name: z.string(),
        number: z.number(),
        totalBooks: z.number().optional(),
      })
      .optional(),

    // Classification
    genre: z.object({
      primary: z.enum(bookGenres),
      secondary: z.array(z.enum(bookGenres)).optional(),
    }),
    themes: z.array(z.string()).optional(),

    // Reading experience
    finishedDate: z.coerce.date(),
    readInLang: z.enum(["de", "en"]),
    modeOfConsumption: z.enum(["hardcover", "softcover", "ebook", "audio"]),

    // Personal assessment
    rating: z.number().min(0).max(10).optional(),
    recommendation: z
      .enum(["highly-recommend", "recommend", "neutral", "skip"])
      .optional(),

    // Technical
    draft: z.boolean().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { blog, book };
