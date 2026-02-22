import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Blog Collection ─────────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),  // SEO: 60-65 optimal, max 70
      description: z.string().max(160),  // SEO: meta description max 160
      author: z.string().default('Aroma de Cuba'),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum([
        'noticias',
        'historia',
        'turismo',
        'productos',
        'cultura',
        'gastronomia',
        'opinion',
      ]),
      tags: z.array(z.string()).default([]),
      coverImage: image(),
      coverImageAlt: z.string(),
      coverImageCredit: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      lang: z.enum(['es', 'en']).default('es'),
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .optional(),
      // Slug of the translated version (without lang prefix)
      // e.g., Spanish post with translationSlug: "cuban-coffee-history" points to /en/blog/cuban-coffee-history/
      translationSlug: z.string().optional(),
    }),
});

// ─── Static Pages Collection ─────────────────────────────────
const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      lastUpdated: z.coerce.date(),
      order: z.number().default(0),
      lang: z.enum(['es', 'en']).default('es'),
    }),
});

export const collections = { blog, pages };
