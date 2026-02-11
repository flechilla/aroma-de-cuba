import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data, id }) => !data.draft && id.startsWith('es/'));

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Aroma de Cuba',
    description: 'Noticias, cultura y sabor desde la isla — las últimas publicaciones del blog Aroma de Cuba.',
    site: context.site!,
    items: sortedPosts.map((post) => {
      // Remove language prefix from post.id (e.g., "es/2026-02-11-slug" -> "2026-02-11-slug")
      const cleanSlug = post.id.replace(/^es\//, '');
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${cleanSlug}/`,
        categories: [post.data.category, ...post.data.tags],
      };
    }),
    customData: '<language>es</language>',
  });
}
