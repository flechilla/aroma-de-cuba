import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aromadecuba.com',
  integrations: [
    mdx(),
    sitemap({
      // Filter out draft pages
      filter: (page) => !page.includes('/draft/'),
      
      // i18n configuration for hreflang tags
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
      
      // Custom serialization for priority and changefreq
      serialize: (item) => {
        // Homepage - highest priority
        if (item.url === 'https://aromadecuba.com/' || item.url === 'https://aromadecuba.com/en/') {
          return {
            ...item,
            changefreq: 'daily',
            priority: 1.0,
          };
        }
        
        // Blog index pages
        if (item.url.match(/\/blog\/?$/) || item.url.match(/\/blog\/\d+\/?$/)) {
          return {
            ...item,
            changefreq: 'daily',
            priority: 0.9,
          };
        }
        
        // Individual blog posts (noticias = high priority, fresher content)
        // URL structure: ES = /blog/slug/, EN = /en/blog/slug/
        if (item.url.match(/\/blog\/\d{4}-\d{2}-\d{2}/) || item.url.match(/\/en\/blog\/\d{4}-\d{2}-\d{2}/)) {
          // Extract date from URL for lastmod
          const dateMatch = item.url.match(/\/(\d{4}-\d{2}-\d{2})-/);
          const lastmod = dateMatch ? dateMatch[1] : undefined;
          
          return {
            ...item,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: lastmod ? new Date(lastmod).toISOString() : undefined,
          };
        }
        
        // Category pages
        if (item.url.includes('/categoria/') || item.url.includes('/category/')) {
          return {
            ...item,
            changefreq: 'daily',
            priority: 0.7,
          };
        }
        
        // Tag pages
        if (item.url.includes('/etiqueta/') || item.url.includes('/tag/')) {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 0.5,
          };
        }
        
        // Static pages (about, cultura, gastronomia, etc.)
        return {
          ...item,
          changefreq: 'monthly',
          priority: 0.6,
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  image: {
    domains: ['vwy1t1uzxwusskun.public.blob.vercel-storage.com'],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
