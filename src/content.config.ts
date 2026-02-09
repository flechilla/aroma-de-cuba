import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Blog Collection ─────────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().max(200),
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
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      lang: z.enum(['es', 'en']).default('es'),
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
    }),
});

export const collections = { blog, pages };
