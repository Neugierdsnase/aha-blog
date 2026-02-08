import { defineCollection, z } from "astro:content";

export const testContent = defineCollection({
	type: "content",
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
	}),
});

const blog = defineCollection({
	type: "content",
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		lang: z.enum(['en', 'de']),
		draft: z.boolean().optional(),
	}),
});

const bookGenres: [string, ...string[]] = [
	"art",
	"art-history",
	"biography",
	"business",
	"comedy",
	"craft",
	"crime",
	"cultural-studies",
	"drama",
	"economics",
	"fantasy",
	"fiction",
	"historical-fiction",
	"history",
	"humor",
	"journalism",
	"literary-fiction",
	"memoir",
	"mystery",
	"mythology",
	"nautical",
	"non-fiction",
	"novella",
	"personal-development",
	"philosophy",
	"poetry",
	"politics",
	"productivity",
	"psychology",
	"religion",
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
