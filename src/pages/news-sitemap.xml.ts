import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  // Filter for recent news posts (Google News only indexes content < 2 days old typically)
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const recentNews = posts
    .filter(post => {
      const postDate = new Date(post.data.date);
      return postDate >= twoDaysAgo && post.data.category === 'noticias';
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentNews.map(post => {
  const lang = post.slug.startsWith('es/') ? 'es' : 'en';
  const langName = lang === 'es' ? 'Spanish' : 'English';
  const url = lang === 'es' 
    ? `https://aromadecuba.com/blog/${post.slug}/`
    : `https://aromadecuba.com/en/blog/${post.slug}/`;
  
  return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>Aroma de Cuba</news:name>
        <news:language>${lang}</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.data.date).toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.data.title)}</news:title>
    </news:news>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
