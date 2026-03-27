import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { bookGenres } from "./utils/genreLabels";

export const testContent = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/test-content" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		lang: z.enum(['en', 'de']),
		draft: z.boolean().optional(),
		featured: z.boolean().optional(),
	}),
});

const book = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/book" }),
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
		finishedDate: z.coerce.date().optional(),
		readInLang: z.enum(["de", "en"]),
		modeOfConsumption: z.enum(["hardcover", "softcover", "ebook", "audio"]),

		// Personal assessment
		rating: z.number().min(0).max(10).optional(),
		recommendation: z
			.enum(["highly-recommend", "recommend", "neutral", "skip"])
			.optional(),

		// Technical
		draft: z.boolean().optional(),
	}),
});

export const collections = { blog, book, "test-content": testContent };
