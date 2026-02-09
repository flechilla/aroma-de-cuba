import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data, id }) => !data.draft && id.startsWith('en/'));

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Aroma de Cuba',
    description: 'News, culture, and flavor from the island — the latest posts from the Aroma de Cuba blog.',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/en/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
