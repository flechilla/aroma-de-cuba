# Aroma de Cuba — Astro Blog Build Guide

A complete, step-by-step guide for building **Aroma de Cuba**, a Cuban news and culture blog, using Astro with content collections and MDX.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Prerequisites & Setup](#2-prerequisites--setup)
3. [Project Structure](#3-project-structure)
4. [Cuban Design System](#4-cuban-design-system)
5. [Astro Configuration](#5-astro-configuration)
6. [Content Collections Schema](#6-content-collections-schema)
7. [Global Styles](#7-global-styles)
8. [Layouts](#8-layouts)
9. [Components](#9-components)
10. [Pages](#10-pages)
11. [Blog Posts in MDX](#11-blog-posts-in-mdx)
12. [RSS Feed](#12-rss-feed)
13. [SEO & Metadata](#13-seo--metadata)
14. [Deployment](#14-deployment)
15. [Content Workflow](#15-content-workflow)

---

## 1. Project Overview

**Aroma de Cuba** is a bilingual-ready blog covering Cuban news, history, tourism, products, and culture. The visual identity draws from real Cuban aesthetics: Havana's colonial architecture, hand-painted signage, tobacco and coffee tones, vintage tile patterns, and the warm Caribbean palette — not generic "tropical" clip-art.

### Site Map

```
/                     → Homepage (featured news + section highlights)
/blog                 → Blog listing (news articles, paginated)
/blog/[slug]          → Individual blog post (MDX)
/historia             → History of Cuba
/turismo              → Tourism guide
/productos            → Cuban products (cigars, rum, coffee, etc.)
/cultura              → Cuban culture (music, art, dance, literature)
/about                → About the blog
/rss.xml              → RSS feed
```

### Content Collections

| Collection | Format | Purpose |
|---|---|---|
| `blog` | `.mdx` | News articles, opinion pieces, current events |
| `pages` | `.mdx` | Static pages (history, tourism, products, culture) |

---

## 2. Prerequisites & Setup

### Requirements

- Node.js 18.17.1+ (recommended: 20 LTS)
- npm, pnpm, or yarn
- A code editor (VS Code recommended, with the Astro extension)
- Git

### Create the Project

```bash
# Create a new Astro project
npm create astro@latest aroma-de-cuba

# When prompted:
#   Template: Empty
#   TypeScript: Yes (Strict)
#   Install dependencies: Yes
#   Initialize git: Yes

cd aroma-de-cuba
```

### Install Dependencies

```bash
# Core integrations
npm install @astrojs/mdx @astrojs/sitemap @astrojs/rss

# Fonts (self-hosted, no Google Fonts dependency)
npm install @fontsource/lora @fontsource/inter @fontsource/playfair-display
```

> **Why these fonts?**
> - **Playfair Display** — Elegant serif for the site title and hero headlines. Evokes vintage Cuban print media and colonial-era typography.
> - **Lora** — Warm, readable serif for article body text. Has the calligraphic roots that complement Cuban literary tradition.
> - **Inter** — Clean sans-serif for navigation, metadata, captions, and UI elements. Ensures legibility at small sizes.

---

## 3. Project Structure

```
aroma-de-cuba/
├── public/
│   ├── favicon.svg
│   ├── og-default.jpg              # Default social share image
│   └── fonts/                      # Any additional custom fonts
│
├── src/
│   ├── assets/
│   │   ├── images/                 # Optimized images (processed by Astro)
│   │   │   ├── hero-havana.jpg
│   │   │   ├── logo-aroma.svg
│   │   │   └── patterns/
│   │   │       └── tile-pattern.svg
│   │   └── icons/                  # SVG icons
│   │       ├── coffee.svg
│   │       ├── cigar.svg
│   │       └── palm.svg
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   ├── BlogCard.astro
│   │   ├── BlogList.astro
│   │   ├── CategoryBadge.astro
│   │   ├── SectionHero.astro
│   │   ├── NewsletterForm.astro
│   │   ├── CubanQuote.astro        # Decorative blockquote for MDX
│   │   ├── ImageGallery.astro      # Photo gallery for MDX
│   │   ├── InfoBox.astro           # Highlighted info box for MDX
│   │   └── SEOHead.astro
│   │
│   ├── content/
│   │   ├── blog/
│   │   │   ├── 2026-02-01-habana-vieja-restoration.mdx
│   │   │   ├── 2026-01-28-cuban-coffee-harvest.mdx
│   │   │   └── ...
│   │   └── pages/
│   │       ├── historia.mdx
│   │       ├── turismo.mdx
│   │       ├── productos.mdx
│   │       └── cultura.mdx
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, head, global styles
│   │   ├── BlogPostLayout.astro    # Single blog post
│   │   └── PageLayout.astro        # Static pages (history, tourism, etc.)
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog listing
│   │   │   ├── [...slug].astro     # Dynamic blog post routes
│   │   │   └── [category].astro    # Category filter page
│   │   ├── historia.astro
│   │   ├── turismo.astro
│   │   ├── productos.astro
│   │   ├── cultura.astro
│   │   └── rss.xml.ts              # RSS feed endpoint
│   │
│   ├── styles/
│   │   ├── global.css              # CSS custom properties + base styles
│   │   ├── typography.css          # Type scale and font imports
│   │   └── cuban-patterns.css      # Decorative patterns and borders
│   │
│   └── content.config.ts           # Content collections definition
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

### Naming Conventions

- **Blog posts**: `YYYY-MM-DD-slug-in-spanish-or-english.mdx` — date prefix for natural sorting
- **Components**: PascalCase `.astro` files
- **Styles**: kebab-case `.css` files
- **Images**: kebab-case, descriptive names (`havana-malecon-sunset.jpg`, not `IMG_3421.jpg`)

---

## 4. Cuban Design System

This is the heart of the visual identity. Every decision here should feel like walking through Havana — warm stone walls, hand-lettered signs, colorful but faded by sun and time, tobacco leaves drying in a barn, strong coffee in a small cup.

### 4.1 Color Palette

These are derived from real Cuban visual references: colonial buildings, tobacco, aged paper, Caribbean sea, vintage cars, and terracotta tiles.

```
PRIMARY COLORS
──────────────────────────────────────────
Tabaco            #5C3D2E    Dark warm brown — tobacco leaves, espresso
Ron Añejo         #8B5E3C    Aged rum amber — warmth, heritage
Arena de Varadero #F4E8D1    Warm sand/cream — backgrounds, paper
Coral Colonial    #C4533A    Terracotta/coral — Havana facades
Azul Habana       #2D5F7C    Colonial blue — doors, shutters, sky

ACCENT COLORS
──────────────────────────────────────────
Palma Verde       #3A6B4A    Tropical green — palm fronds, vegetation
Amarillo Sol      #E8A838    Warm golden yellow — sunlight, marigolds
Rojo Clásico      #B83230    Classic red — vintage cars, revolution
Cielo Caribe      #87BBCD    Soft Caribbean blue — ocean, clear sky

NEUTRALS
──────────────────────────────────────────
Humo              #2B2926    Near-black — text, heavy elements
Piedra Oscura     #5A534E    Dark stone — secondary text
Piedra            #8C847D    Mid stone — borders, muted text
Ceniza            #C5BDB5    Light ash — dividers, subtle borders
Pergamino         #FAF6F0    Off-white — page background, cards
Blanco            #FFFDF9    Warm white — clean surfaces
```

### 4.2 Typography Scale

```
FONT STACK
──────────────────────────────────────────
Display / Site Title:   'Playfair Display', Georgia, 'Times New Roman', serif
Headings / Article:     'Lora', Cambria, Georgia, serif
Body / UI:              'Inter', -apple-system, 'Segoe UI', sans-serif

TYPE SCALE (base: 1rem = 16px)
──────────────────────────────────────────
--text-xs:    0.75rem    (12px)   Captions, fine print
--text-sm:    0.875rem   (14px)   Metadata, dates, tags
--text-base:  1rem       (16px)   Body copy
--text-lg:    1.125rem   (18px)   Lead paragraphs
--text-xl:    1.25rem    (20px)   H4, card titles
--text-2xl:   1.5rem     (24px)   H3
--text-3xl:   1.875rem   (30px)   H2
--text-4xl:   2.25rem    (36px)   H1, page titles
--text-5xl:   3rem       (48px)   Hero headlines
--text-6xl:   3.75rem    (60px)   Display / site name

LINE HEIGHTS
──────────────────────────────────────────
Headings:  1.2
Body:      1.7
Tight:     1.4
```

### 4.3 Spacing System

```
Based on an 8px grid:
--space-1:   0.25rem   (4px)
--space-2:   0.5rem    (8px)
--space-3:   0.75rem   (12px)
--space-4:   1rem      (16px)
--space-6:   1.5rem    (24px)
--space-8:   2rem      (32px)
--space-10:  2.5rem    (40px)
--space-12:  3rem      (48px)
--space-16:  4rem      (64px)
--space-20:  5rem      (80px)
--space-24:  6rem      (96px)
```

### 4.4 Visual Identity Elements

**Tile Border Pattern**
Cuban cement tiles (losas hidráulicas) are iconic. Use a simple geometric tile motif as a decorative border for section dividers, card highlights, or the header. Create this as an SVG pattern rather than an image — it stays crisp at any size and loads instantly.

**Texture**
Add a very subtle paper texture to the main background (low-opacity noise pattern via CSS). This gives the "aged paper" feel without looking like a Photoshop filter.

**Photography Style**
Favor warm-toned, slightly desaturated photography that feels documentary rather than stock. Think: natural light, lived-in spaces, real people. Avoid: over-saturated HDR, staged tourist shots, AI-generated tropical clichés.

**Iconography**
Use simple, hand-drawn-style line icons for categories: a coffee bean, a tobacco leaf, a palm tree, a musical note, a colonial arch. Keep them single-color and lightweight.

**Decorative Rules**
Use a warm-colored horizontal rule with a small decorative element (a coffee bean, a star, or a tile motif) as section dividers. Do NOT use standard `<hr>`.

---

## 5. Astro Configuration

### `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aromadecuba.com',  // Replace with your actual domain
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  image: {
    domains: [],  // Add external image domains if needed
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
```

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@styles/*": ["src/styles/*"],
      "@assets/*": ["src/assets/*"],
      "@content/*": ["src/content/*"]
    }
  }
}
```

> **Why path aliases?** They prevent fragile relative imports like `../../../components/Header.astro`. With aliases, every import reads as `@components/Header.astro` regardless of file depth.

---

## 6. Content Collections Schema

### `src/content.config.ts`

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Blog Collection ─────────────────────────────────────────
// News articles, opinion pieces, current events about Cuba
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
        'noticias',      // News
        'historia',      // History
        'turismo',       // Tourism
        'productos',     // Products
        'cultura',       // Culture
        'gastronomia',   // Food & Drink
        'opinion',       // Opinion
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
// Long-form pages: history, tourism, products, culture
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
```

### Schema Design Decisions

- **`category` as an enum**: Prevents typos, enables type-safe filtering, and limits categories to your defined set.
- **`image()` for cover images**: Astro processes these through its image pipeline — automatic resizing, format conversion, and optimization.
- **`draft` flag**: Lets you write posts without publishing them. Filter drafts in your queries.
- **`featured` flag**: Mark posts to appear on the homepage hero section.
- **`lang` field**: Future-proofs for bilingual content.

---

## 7. Global Styles

### `src/styles/typography.css`

```css
/* Self-hosted fonts — no external requests, no FOUT flicker */
@import '@fontsource/playfair-display/400.css';
@import '@fontsource/playfair-display/700.css';
@import '@fontsource/playfair-display/400-italic.css';
@import '@fontsource/lora/400.css';
@import '@fontsource/lora/400-italic.css';
@import '@fontsource/lora/600.css';
@import '@fontsource/lora/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
```

### `src/styles/global.css`

```css
@import './typography.css';
@import './cuban-patterns.css';

/* ─── DESIGN TOKENS ──────────────────────────────────── */
:root {
  /* Primary */
  --color-tabaco:           #5C3D2E;
  --color-ron:              #8B5E3C;
  --color-arena:            #F4E8D1;
  --color-coral:            #C4533A;
  --color-azul:             #2D5F7C;

  /* Accent */
  --color-palma:            #3A6B4A;
  --color-sol:              #E8A838;
  --color-rojo:             #B83230;
  --color-cielo:            #87BBCD;

  /* Neutrals */
  --color-humo:             #2B2926;
  --color-piedra-oscura:    #5A534E;
  --color-piedra:           #8C847D;
  --color-ceniza:           #C5BDB5;
  --color-pergamino:        #FAF6F0;
  --color-blanco:           #FFFDF9;

  /* Semantic mappings */
  --color-bg:               var(--color-pergamino);
  --color-bg-card:          var(--color-blanco);
  --color-bg-accent:        var(--color-arena);
  --color-text:             var(--color-humo);
  --color-text-secondary:   var(--color-piedra-oscura);
  --color-text-muted:       var(--color-piedra);
  --color-link:             var(--color-azul);
  --color-link-hover:       var(--color-coral);
  --color-border:           var(--color-ceniza);
  --color-border-strong:    var(--color-piedra);

  /* Typography */
  --font-display:  'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-heading:  'Lora', Cambria, Georgia, serif;
  --font-body:     'Inter', -apple-system, 'Segoe UI', Helvetica, sans-serif;

  --text-xs:    0.75rem;
  --text-sm:    0.875rem;
  --text-base:  1rem;
  --text-lg:    1.125rem;
  --text-xl:    1.25rem;
  --text-2xl:   1.5rem;
  --text-3xl:   1.875rem;
  --text-4xl:   2.25rem;
  --text-5xl:   3rem;
  --text-6xl:   3.75rem;

  --leading-tight:    1.2;
  --leading-snug:     1.4;
  --leading-normal:   1.7;

  /* Spacing */
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-3:   0.75rem;
  --space-4:   1rem;
  --space-6:   1.5rem;
  --space-8:   2rem;
  --space-10:  2.5rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-20:  5rem;
  --space-24:  6rem;

  /* Layout */
  --max-width-prose:    65ch;
  --max-width-content:  72rem;
  --max-width-narrow:   48rem;
  --header-height:      4.5rem;
  --border-radius:      0.25rem;
  --border-radius-lg:   0.5rem;

  /* Shadows — warm-tinted, not cool gray */
  --shadow-sm:   0 1px 2px rgba(92, 61, 46, 0.06);
  --shadow-md:   0 4px 12px rgba(92, 61, 46, 0.08);
  --shadow-lg:   0 8px 24px rgba(92, 61, 46, 0.10);

  /* Transitions */
  --transition-fast:    150ms ease;
  --transition-normal:  250ms ease;
}


/* ─── RESET & BASE ───────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background-color: var(--color-bg);

  /* Subtle paper texture via CSS — no image file needed */
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(139, 94, 60, 0.015) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(196, 83, 58, 0.01) 0%, transparent 50%);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Warm-toned selection highlight */
::selection {
  background-color: var(--color-arena);
  color: var(--color-tabaco);
}


/* ─── HEADINGS ───────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: var(--leading-tight);
  color: var(--color-tabaco);
  text-wrap: balance;
}

h1 { font-size: var(--text-4xl); font-weight: 700; margin-bottom: var(--space-6); }
h2 { font-size: var(--text-3xl); font-weight: 700; margin-bottom: var(--space-4); }
h3 { font-size: var(--text-2xl); font-weight: 600; margin-bottom: var(--space-3); }
h4 { font-size: var(--text-xl);  font-weight: 600; margin-bottom: var(--space-2); }


/* ─── LINKS ──────────────────────────────────────────── */
a {
  color: var(--color-link);
  text-decoration-color: var(--color-cielo);
  text-underline-offset: 0.15em;
  text-decoration-thickness: 1px;
  transition: color var(--transition-fast), text-decoration-color var(--transition-fast);
}

a:hover {
  color: var(--color-link-hover);
  text-decoration-color: var(--color-coral);
}


/* ─── PROSE (article content) ────────────────────────── */
.prose {
  max-width: var(--max-width-prose);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.prose p {
  margin-bottom: var(--space-6);
}

.prose p:first-of-type::first-line {
  /* Optional: subtle emphasis on the opening line of articles */
}

.prose img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
  margin-block: var(--space-8);
}

.prose blockquote {
  border-left: 3px solid var(--color-coral);
  padding-left: var(--space-6);
  margin-block: var(--space-8);
  font-style: italic;
  color: var(--color-piedra-oscura);
}

.prose ul,
.prose ol {
  padding-left: var(--space-6);
  margin-bottom: var(--space-6);
}

.prose li {
  margin-bottom: var(--space-2);
}

.prose hr {
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-ceniza) 20%,
    var(--color-ron) 50%,
    var(--color-ceniza) 80%,
    transparent
  );
  margin-block: var(--space-12);
}

/* Code blocks — rare in a blog, but styled just in case */
.prose code {
  font-size: 0.9em;
  background: var(--color-arena);
  padding: 0.15em 0.4em;
  border-radius: var(--border-radius);
}

.prose pre {
  background: var(--color-humo);
  color: var(--color-arena);
  padding: var(--space-6);
  border-radius: var(--border-radius-lg);
  overflow-x: auto;
  margin-block: var(--space-8);
}

.prose pre code {
  background: none;
  padding: 0;
}


/* ─── UTILITY CLASSES ────────────────────────────────── */
.container {
  width: 100%;
  max-width: var(--max-width-content);
  margin-inline: auto;
  padding-inline: var(--space-6);
}

.container--narrow {
  max-width: var(--max-width-narrow);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.visually-hidden {
  composes: sr-only;
}
```

### `src/styles/cuban-patterns.css`

```css
/* ─── CUBAN TILE BORDER ──────────────────────────────── */
/* Inspired by losas hidráulicas — the cement tiles found in
   colonial Cuban homes. This creates a repeating geometric
   border using pure CSS. */

.tile-border {
  --tile-size: 12px;
  --tile-color: var(--color-coral);
  --tile-bg: var(--color-arena);
  height: 6px;
  background:
    repeating-linear-gradient(
      90deg,
      var(--tile-color) 0px,
      var(--tile-color) var(--tile-size),
      var(--tile-bg) var(--tile-size),
      var(--tile-bg) calc(var(--tile-size) * 2)
    );
  opacity: 0.6;
}

.tile-border--thick {
  height: 10px;
  background:
    repeating-linear-gradient(
      90deg,
      var(--tile-color) 0px,
      var(--tile-color) 6px,
      transparent 6px,
      transparent 8px,
      var(--color-azul) 8px,
      var(--color-azul) 14px,
      transparent 14px,
      transparent 16px
    );
  opacity: 0.5;
}


/* ─── DECORATIVE DIVIDER ─────────────────────────────── */
/* A warm horizontal rule with a small diamond/star in the center */

.divider {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-block: var(--space-12);
  color: var(--color-ron);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-ceniza),
    var(--color-ron),
    var(--color-ceniza),
    transparent
  );
}

.divider::before {
  background: linear-gradient(to right, transparent, var(--color-ron));
}

.divider::after {
  background: linear-gradient(to left, transparent, var(--color-ron));
}


/* ─── CARD STYLES ────────────────────────────────────── */
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-normal), transform var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}


/* ─── CATEGORY BADGES ────────────────────────────────── */
.badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--border-radius);
}

.badge--noticias     { background: var(--color-coral);  color: var(--color-blanco); }
.badge--historia     { background: var(--color-ron);    color: var(--color-blanco); }
.badge--turismo      { background: var(--color-azul);   color: var(--color-blanco); }
.badge--productos    { background: var(--color-tabaco); color: var(--color-arena); }
.badge--cultura      { background: var(--color-palma);  color: var(--color-blanco); }
.badge--gastronomia  { background: var(--color-sol);    color: var(--color-tabaco); }
.badge--opinion      { background: var(--color-piedra); color: var(--color-blanco); }


/* ─── CUBAN ACCENT STRIPE ────────────────────────────── */
/* A thin multi-color stripe that appears at the very top of the page,
   reminiscent of painted building facades */

.accent-stripe {
  height: 4px;
  background: linear-gradient(
    to right,
    var(--color-coral) 0%,
    var(--color-coral) 25%,
    var(--color-azul) 25%,
    var(--color-azul) 50%,
    var(--color-sol) 50%,
    var(--color-sol) 75%,
    var(--color-palma) 75%,
    var(--color-palma) 100%
  );
}
```

---

## 8. Layouts

### `src/layouts/BaseLayout.astro`

```astro
---
import '@styles/global.css';
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import SEOHead from '@components/SEOHead.astro';
import { ViewTransitions } from 'astro:transitions';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  article?: boolean;
}

const {
  title,
  description,
  ogImage = '/og-default.jpg',
  article = false,
} = Astro.props;

const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Aroma de Cuba"
      href={new URL('/rss.xml', Astro.site)}
    />
    <SEOHead
      title={title}
      description={description}
      canonicalUrl={canonicalUrl.href}
      ogImage={ogImage}
      article={article}
    />
    <ViewTransitions />
  </head>
  <body>
    <div class="accent-stripe" aria-hidden="true"></div>
    <Header />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style>
  main {
    min-height: calc(100dvh - var(--header-height) - 20rem);
  }
</style>
```

### `src/layouts/BlogPostLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import CategoryBadge from '@components/CategoryBadge.astro';
import { Image } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  author: string;
  date: Date;
  updatedDate?: Date;
  category: string;
  tags: string[];
  coverImage: ImageMetadata;
  coverImageAlt: string;
}

const {
  title,
  description,
  author,
  date,
  updatedDate,
  category,
  tags,
  coverImage,
  coverImageAlt,
} = Astro.props;

const formattedDate = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(date);

const formattedUpdated = updatedDate
  ? new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(updatedDate)
  : null;
---

<BaseLayout title={`${title} — Aroma de Cuba`} description={description} article>
  <article class="blog-post">
    <header class="blog-post__header">
      <div class="container container--narrow">
        <CategoryBadge category={category} />
        <h1 class="blog-post__title" transition:name={`post-title`}>
          {title}
        </h1>
        <p class="blog-post__description">{description}</p>
        <div class="blog-post__meta">
          <span class="blog-post__author">{author}</span>
          <time datetime={date.toISOString()}>{formattedDate}</time>
          {formattedUpdated && (
            <span class="blog-post__updated">
              Actualizado: <time datetime={updatedDate!.toISOString()}>{formattedUpdated}</time>
            </span>
          )}
        </div>
      </div>
    </header>

    <div class="blog-post__cover">
      <Image
        src={coverImage}
        alt={coverImageAlt}
        width={1200}
        height={630}
        loading="eager"
        class="blog-post__cover-image"
      />
    </div>

    <div class="container container--narrow">
      <div class="prose">
        <slot />
      </div>

      {tags.length > 0 && (
        <footer class="blog-post__tags">
          <span class="blog-post__tags-label">Etiquetas:</span>
          {tags.map((tag) => (
            <a href={`/blog?tag=${tag}`} class="blog-post__tag">
              #{tag}
            </a>
          ))}
        </footer>
      )}
    </div>
  </article>
</BaseLayout>

<style>
  .blog-post__header {
    padding-block: var(--space-12) var(--space-8);
    text-align: center;
  }

  .blog-post__title {
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    margin-block: var(--space-4) var(--space-4);
    color: var(--color-tabaco);
  }

  .blog-post__description {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-piedra-oscura);
    font-style: italic;
    max-width: 50ch;
    margin-inline: auto;
  }

  .blog-post__meta {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-6);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .blog-post__meta > *:not(:last-child)::after {
    content: '·';
    margin-left: var(--space-4);
  }

  .blog-post__author {
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .blog-post__cover {
    max-width: 56rem;
    margin-inline: auto;
    margin-bottom: var(--space-10);
    padding-inline: var(--space-6);
  }

  .blog-post__cover-image {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-lg);
    aspect-ratio: 1200 / 630;
    object-fit: cover;
  }

  .blog-post__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-10);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  .blog-post__tags-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .blog-post__tag {
    font-size: var(--text-sm);
    color: var(--color-ron);
    text-decoration: none;
  }

  .blog-post__tag:hover {
    color: var(--color-coral);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .blog-post__title {
      font-size: var(--text-3xl);
    }
    .blog-post__meta {
      flex-direction: column;
      gap: var(--space-1);
    }
    .blog-post__meta > *::after {
      display: none;
    }
  }
</style>
```

### `src/layouts/PageLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import SectionHero from '@components/SectionHero.astro';

interface Props {
  title: string;
  description: string;
  heroImage?: ImageMetadata;
  heroImageAlt?: string;
}

const { title, description, heroImage, heroImageAlt } = Astro.props;
---

<BaseLayout title={`${title} — Aroma de Cuba`} description={description}>
  <SectionHero
    title={title}
    description={description}
    image={heroImage}
    imageAlt={heroImageAlt}
  />
  <div class="page-content container container--narrow">
    <div class="prose">
      <slot />
    </div>
  </div>
</BaseLayout>

<style>
  .page-content {
    padding-block: var(--space-12) var(--space-20);
  }
</style>
```

---

## 9. Components

### `src/components/SEOHead.astro`

```astro
---
interface Props {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  article?: boolean;
}

const { title, description, canonicalUrl, ogImage, article = false } = Astro.props;
const fullTitle = title.includes('Aroma de Cuba') ? title : `${title} — Aroma de Cuba`;
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph -->
<meta property="og:type" content={article ? 'article' : 'website'} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={new URL(ogImage, Astro.site)} />
<meta property="og:site_name" content="Aroma de Cuba" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(ogImage, Astro.site)} />
```

### `src/components/Header.astro`

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { href: '/blog', label: 'Noticias' },
  { href: '/historia', label: 'Historia' },
  { href: '/turismo', label: 'Turismo' },
  { href: '/productos', label: 'Productos' },
  { href: '/cultura', label: 'Cultura' },
  { href: '/about', label: 'Nosotros' },
];
---

<header class="header">
  <nav class="header__nav container" aria-label="Navegación principal">
    <a href="/" class="header__logo" aria-label="Aroma de Cuba — Inicio">
      <span class="header__logo-text">Aroma de Cuba</span>
    </a>

    <button
      class="header__menu-toggle"
      aria-expanded="false"
      aria-controls="main-nav"
      aria-label="Abrir menú de navegación"
    >
      <span class="header__menu-icon" aria-hidden="true"></span>
    </button>

    <ul id="main-nav" class="header__links" role="list">
      {navLinks.map(({ href, label }) => (
        <li>
          <a
            href={href}
            class:list={[
              'header__link',
              { 'header__link--active': currentPath.startsWith(href) },
            ]}
            aria-current={currentPath.startsWith(href) ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--color-blanco);
    border-bottom: 1px solid var(--color-border);
    height: var(--header-height);
  }

  .header__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .header__logo {
    text-decoration: none;
  }

  .header__logo-text {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-tabaco);
    letter-spacing: -0.01em;
  }

  .header__links {
    display: flex;
    gap: var(--space-1);
    list-style: none;
  }

  .header__link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--border-radius);
    transition: color var(--transition-fast), background-color var(--transition-fast);
  }

  .header__link:hover {
    color: var(--color-tabaco);
    background-color: var(--color-arena);
  }

  .header__link--active {
    color: var(--color-coral);
    font-weight: 600;
  }

  /* ── Mobile menu toggle ── */
  .header__menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
  }

  .header__menu-icon {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-tabaco);
    position: relative;
    transition: background var(--transition-fast);
  }

  .header__menu-icon::before,
  .header__menu-icon::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-tabaco);
    transition: transform var(--transition-normal);
  }

  .header__menu-icon::before { top: -7px; }
  .header__menu-icon::after  { top: 7px; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .header__menu-toggle {
      display: block;
    }

    .header__links {
      display: none;
      position: absolute;
      top: var(--header-height);
      left: 0;
      right: 0;
      flex-direction: column;
      background: var(--color-blanco);
      border-bottom: 1px solid var(--color-border);
      padding: var(--space-4) var(--space-6);
      box-shadow: var(--shadow-lg);
    }

    .header__links[data-open='true'] {
      display: flex;
    }

    .header__link {
      padding: var(--space-3) var(--space-4);
      font-size: var(--text-base);
    }
  }
</style>

<script>
  // Minimal mobile menu toggle — no framework needed
  const toggle = document.querySelector('.header__menu-toggle');
  const nav = document.getElementById('main-nav');

  toggle?.addEventListener('click', () => {
    const isOpen = nav?.getAttribute('data-open') === 'true';
    nav?.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
</script>
```

### `src/components/Footer.astro`

```astro
---
const year = new Date().getFullYear();
---

<footer class="footer">
  <div class="tile-border--thick" aria-hidden="true"></div>
  <div class="footer__content container">
    <div class="footer__brand">
      <p class="footer__name">Aroma de Cuba</p>
      <p class="footer__tagline">Noticias, cultura y sabor desde la isla</p>
    </div>

    <nav class="footer__nav" aria-label="Navegación del pie de página">
      <div class="footer__section">
        <h3 class="footer__heading">Secciones</h3>
        <ul class="footer__list" role="list">
          <li><a href="/blog">Noticias</a></li>
          <li><a href="/historia">Historia</a></li>
          <li><a href="/turismo">Turismo</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/cultura">Cultura</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <h3 class="footer__heading">Más</h3>
        <ul class="footer__list" role="list">
          <li><a href="/about">Nosotros</a></li>
          <li><a href="/rss.xml">RSS Feed</a></li>
        </ul>
      </div>
    </nav>

    <p class="footer__copy">
      &copy; {year} Aroma de Cuba. Todos los derechos reservados.
    </p>
  </div>
</footer>

<style>
  .footer {
    margin-top: var(--space-20);
    background: var(--color-humo);
    color: var(--color-ceniza);
  }

  .footer__content {
    padding-block: var(--space-12) var(--space-8);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
  }

  .footer__name {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    color: var(--color-arena);
    margin-bottom: var(--space-2);
  }

  .footer__tagline {
    font-size: var(--text-sm);
    color: var(--color-piedra);
    font-style: italic;
  }

  .footer__nav {
    display: flex;
    gap: var(--space-10);
  }

  .footer__heading {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-piedra);
    margin-bottom: var(--space-4);
  }

  .footer__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .footer__list a {
    font-size: var(--text-sm);
    color: var(--color-ceniza);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer__list a:hover {
    color: var(--color-arena);
  }

  .footer__copy {
    grid-column: 1 / -1;
    font-size: var(--text-xs);
    color: var(--color-piedra);
    padding-top: var(--space-6);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 640px) {
    .footer__content {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### `src/components/BlogCard.astro`

```astro
---
import { Image } from 'astro:assets';
import CategoryBadge from './CategoryBadge.astro';

interface Props {
  title: string;
  description: string;
  date: Date;
  category: string;
  coverImage: ImageMetadata;
  coverImageAlt: string;
  slug: string;
  featured?: boolean;
}

const {
  title,
  description,
  date,
  category,
  coverImage,
  coverImageAlt,
  slug,
  featured = false,
} = Astro.props;

const formattedDate = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}).format(date);
---

<article class:list={['blog-card card', { 'blog-card--featured': featured }]}>
  <a href={`/blog/${slug}`} class="blog-card__link">
    <div class="blog-card__image-wrapper">
      <Image
        src={coverImage}
        alt={coverImageAlt}
        width={featured ? 800 : 400}
        height={featured ? 420 : 225}
        class="blog-card__image"
        loading="lazy"
      />
    </div>
    <div class="blog-card__body">
      <div class="blog-card__meta">
        <CategoryBadge category={category} />
        <time datetime={date.toISOString()}>{formattedDate}</time>
      </div>
      <h3 class="blog-card__title">{title}</h3>
      <p class="blog-card__excerpt">{description}</p>
    </div>
  </a>
</article>

<style>
  .blog-card__link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .blog-card__image-wrapper {
    overflow: hidden;
    aspect-ratio: 16 / 9;
  }

  .blog-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }

  .blog-card:hover .blog-card__image {
    transform: scale(1.03);
  }

  .blog-card__body {
    padding: var(--space-4) var(--space-6) var(--space-6);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .blog-card__meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  .blog-card__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-tabaco);
    margin-bottom: var(--space-2);
    line-height: var(--leading-snug);
  }

  .blog-card:hover .blog-card__title {
    color: var(--color-coral);
  }

  .blog-card__excerpt {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-normal);
    flex: 1;
  }

  /* Featured card — larger, horizontal on desktop */
  .blog-card--featured .blog-card__link {
    flex-direction: row;
  }

  .blog-card--featured .blog-card__image-wrapper {
    flex: 0 0 55%;
    aspect-ratio: auto;
  }

  .blog-card--featured .blog-card__title {
    font-size: var(--text-2xl);
  }

  @media (max-width: 768px) {
    .blog-card--featured .blog-card__link {
      flex-direction: column;
    }
    .blog-card--featured .blog-card__image-wrapper {
      aspect-ratio: 16 / 9;
    }
  }
</style>
```

### `src/components/CategoryBadge.astro`

```astro
---
interface Props {
  category: string;
}

const { category } = Astro.props;

const labels: Record<string, string> = {
  noticias: 'Noticias',
  historia: 'Historia',
  turismo: 'Turismo',
  productos: 'Productos',
  cultura: 'Cultura',
  gastronomia: 'Gastronomía',
  opinion: 'Opinión',
};
---

<span class={`badge badge--${category}`}>
  {labels[category] || category}
</span>
```

### `src/components/SectionHero.astro`

```astro
---
import { Image } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  image?: ImageMetadata;
  imageAlt?: string;
}

const { title, description, image, imageAlt } = Astro.props;
---

<section class="section-hero">
  {image && (
    <div class="section-hero__bg">
      <Image
        src={image}
        alt={imageAlt || ''}
        width={1400}
        height={500}
        class="section-hero__image"
        loading="eager"
      />
      <div class="section-hero__overlay" aria-hidden="true"></div>
    </div>
  )}
  <div class="section-hero__content container">
    <h1 class="section-hero__title">{title}</h1>
    <p class="section-hero__description">{description}</p>
    <div class="tile-border" aria-hidden="true" style="max-width: 120px; margin-top: var(--space-6);"></div>
  </div>
</section>

<style>
  .section-hero {
    position: relative;
    padding-block: var(--space-20);
    background: var(--color-tabaco);
    color: var(--color-arena);
    overflow: hidden;
    min-height: 20rem;
    display: flex;
    align-items: center;
  }

  .section-hero__bg {
    position: absolute;
    inset: 0;
  }

  .section-hero__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .section-hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(43, 41, 38, 0.85) 0%,
      rgba(43, 41, 38, 0.6) 60%,
      rgba(43, 41, 38, 0.4) 100%
    );
  }

  .section-hero__content {
    position: relative;
    z-index: 1;
  }

  .section-hero__title {
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    color: var(--color-arena);
    margin-bottom: var(--space-4);
  }

  .section-hero__description {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-ceniza);
    max-width: 45ch;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .section-hero {
      min-height: 14rem;
      padding-block: var(--space-12);
    }
    .section-hero__title {
      font-size: var(--text-3xl);
    }
  }
</style>
```

### `src/components/CubanQuote.astro`

This component is designed for use inside MDX articles, for decorative pull quotes.

```astro
---
interface Props {
  author?: string;
}

const { author } = Astro.props;
---

<figure class="cuban-quote">
  <blockquote>
    <slot />
  </blockquote>
  {author && <figcaption class="cuban-quote__author">— {author}</figcaption>}
</figure>

<style>
  .cuban-quote {
    margin-block: var(--space-10);
    padding: var(--space-8);
    background: var(--color-arena);
    border-left: 4px solid var(--color-coral);
    border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
    position: relative;
  }

  .cuban-quote::before {
    content: '\201C'; /* Opening double curly quote */
    font-family: var(--font-display);
    font-size: 4rem;
    color: var(--color-ron);
    opacity: 0.3;
    position: absolute;
    top: -0.25rem;
    left: var(--space-4);
    line-height: 1;
  }

  .cuban-quote blockquote {
    border: none;
    padding: 0;
    margin: 0;
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-style: italic;
    color: var(--color-tabaco);
    line-height: var(--leading-snug);
  }

  .cuban-quote__author {
    margin-top: var(--space-3);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-style: normal;
    color: var(--color-piedra-oscura);
  }
</style>
```

### `src/components/InfoBox.astro`

For highlighted information boxes in MDX articles (travel tips, historical facts, product details).

```astro
---
interface Props {
  type?: 'info' | 'tip' | 'warning' | 'history';
  title?: string;
}

const { type = 'info', title } = Astro.props;

const icons: Record<string, string> = {
  info: 'ℹ',
  tip: '★',
  warning: '⚠',
  history: '⌛',
};
---

<aside class={`info-box info-box--${type}`} role="note">
  <div class="info-box__header">
    <span class="info-box__icon" aria-hidden="true">{icons[type]}</span>
    {title && <strong class="info-box__title">{title}</strong>}
  </div>
  <div class="info-box__content">
    <slot />
  </div>
</aside>

<style>
  .info-box {
    margin-block: var(--space-8);
    padding: var(--space-6);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border);
  }

  .info-box--info    { background: #f0f5fa; border-color: var(--color-azul); }
  .info-box--tip     { background: #f5f9f0; border-color: var(--color-palma); }
  .info-box--warning { background: #fdf5ec; border-color: var(--color-sol); }
  .info-box--history { background: var(--color-arena); border-color: var(--color-ron); }

  .info-box__header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  .info-box__icon {
    font-size: var(--text-lg);
  }

  .info-box__title {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .info-box__content {
    font-size: var(--text-base);
    line-height: var(--leading-normal);
  }

  .info-box__content :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
```

---

## 10. Pages

### `src/pages/index.astro` — Homepage

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import BlogCard from '@components/BlogCard.astro';
import { getCollection } from 'astro:content';

// Fetch and sort blog posts
const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const sortedPosts = allPosts.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

// Separate featured and recent
const featuredPost = sortedPosts.find((p) => p.data.featured) || sortedPosts[0];
const recentPosts = sortedPosts
  .filter((p) => p.id !== featuredPost?.id)
  .slice(0, 6);

// Section links
const sections = [
  {
    title: 'Historia',
    description: 'Cinco siglos de una historia fascinante y compleja',
    href: '/historia',
    color: 'var(--color-ron)',
  },
  {
    title: 'Turismo',
    description: 'Playas, ciudades coloniales y naturaleza sin igual',
    href: '/turismo',
    color: 'var(--color-azul)',
  },
  {
    title: 'Productos',
    description: 'Tabaco, ron, café y los tesoros de la isla',
    href: '/productos',
    color: 'var(--color-tabaco)',
  },
  {
    title: 'Cultura',
    description: 'Música, arte, danza y tradición viva',
    href: '/cultura',
    color: 'var(--color-palma)',
  },
];
---

<BaseLayout
  title="Aroma de Cuba — Noticias, cultura y sabor desde la isla"
  description="Blog dedicado a Cuba: noticias actuales, historia, turismo, productos y cultura cubana."
>
  <!-- Hero -->
  <section class="home-hero">
    <div class="container">
      <h1 class="home-hero__title">Aroma de Cuba</h1>
      <p class="home-hero__subtitle">Noticias, cultura y sabor desde la isla</p>
      <div class="tile-border" style="max-width: 100px; margin-top: var(--space-4);" aria-hidden="true"></div>
    </div>
  </section>

  <!-- Featured Post -->
  {featuredPost && (
    <section class="section container" aria-labelledby="featured-heading">
      <h2 id="featured-heading" class="sr-only">Artículo destacado</h2>
      <BlogCard
        title={featuredPost.data.title}
        description={featuredPost.data.description}
        date={featuredPost.data.date}
        category={featuredPost.data.category}
        coverImage={featuredPost.data.coverImage}
        coverImageAlt={featuredPost.data.coverImageAlt}
        slug={featuredPost.id}
        featured
      />
    </section>
  )}

  <!-- Recent Posts -->
  <section class="section container" aria-labelledby="recent-heading">
    <h2 id="recent-heading" class="section__title">Últimas noticias</h2>
    <div class="posts-grid">
      {recentPosts.map((post) => (
        <BlogCard
          title={post.data.title}
          description={post.data.description}
          date={post.data.date}
          category={post.data.category}
          coverImage={post.data.coverImage}
          coverImageAlt={post.data.coverImageAlt}
          slug={post.id}
        />
      ))}
    </div>
    <div class="section__cta">
      <a href="/blog" class="button">Ver todas las noticias</a>
    </div>
  </section>

  <!-- Section Cards -->
  <section class="section container" aria-labelledby="explore-heading">
    <h2 id="explore-heading" class="section__title">Explora Cuba</h2>
    <div class="sections-grid">
      {sections.map(({ title, description, href, color }) => (
        <a href={href} class="section-card" style={`--accent: ${color}`}>
          <h3 class="section-card__title">{title}</h3>
          <p class="section-card__description">{description}</p>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>

<style>
  .home-hero {
    background: var(--color-tabaco);
    color: var(--color-arena);
    padding-block: var(--space-20) var(--space-16);
    text-align: center;
  }

  .home-hero__title {
    font-family: var(--font-display);
    font-size: var(--text-6xl);
    color: var(--color-arena);
    margin-bottom: var(--space-3);
    letter-spacing: -0.02em;
  }

  .home-hero__subtitle {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-ceniza);
    font-style: italic;
  }

  .section {
    padding-block: var(--space-12);
  }

  .section__title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    color: var(--color-tabaco);
    margin-bottom: var(--space-8);
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: var(--space-6);
  }

  .section__cta {
    text-align: center;
    margin-top: var(--space-10);
  }

  .button {
    display: inline-block;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-blanco);
    background: var(--color-coral);
    padding: var(--space-3) var(--space-8);
    border-radius: var(--border-radius);
    text-decoration: none;
    transition: background var(--transition-fast);
  }

  .button:hover {
    background: var(--color-rojo);
    color: var(--color-blanco);
  }

  .sections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    gap: var(--space-6);
  }

  .section-card {
    padding: var(--space-8) var(--space-6);
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-top: 3px solid var(--accent, var(--color-coral));
    border-radius: var(--border-radius-lg);
    text-decoration: none;
    transition: box-shadow var(--transition-normal), transform var(--transition-normal);
  }

  .section-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .section-card__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-tabaco);
    margin-bottom: var(--space-2);
  }

  .section-card__description {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-normal);
  }

  @media (max-width: 640px) {
    .home-hero__title {
      font-size: var(--text-4xl);
    }
  }
</style>
```

### `src/pages/blog/index.astro` — Blog Listing

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import BlogCard from '@components/BlogCard.astro';
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const posts = allPosts.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

// Get unique categories for filter
const categories = [...new Set(posts.map((p) => p.data.category))];
---

<BaseLayout
  title="Noticias — Aroma de Cuba"
  description="Las últimas noticias y artículos sobre Cuba."
>
  <section class="blog-listing">
    <div class="container">
      <h1 class="blog-listing__title">Noticias</h1>
      <p class="blog-listing__subtitle">Lo último desde la isla</p>

      <nav class="blog-listing__filters" aria-label="Filtrar por categoría">
        <a href="/blog" class="filter-chip filter-chip--active">Todos</a>
        {categories.map((cat) => (
          <a href={`/blog/${cat}`} class="filter-chip">
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </a>
        ))}
      </nav>

      <div class="posts-grid">
        {posts.map((post) => (
          <BlogCard
            title={post.data.title}
            description={post.data.description}
            date={post.data.date}
            category={post.data.category}
            coverImage={post.data.coverImage}
            coverImageAlt={post.data.coverImageAlt}
            slug={post.id}
          />
        ))}
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .blog-listing {
    padding-block: var(--space-12) var(--space-20);
  }

  .blog-listing__title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    color: var(--color-tabaco);
  }

  .blog-listing__subtitle {
    font-family: var(--font-heading);
    font-style: italic;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-8);
  }

  .blog-listing__filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-8);
  }

  .filter-chip {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: 99px;
    text-decoration: none;
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);
  }

  .filter-chip:hover {
    border-color: var(--color-coral);
    color: var(--color-coral);
    background: transparent;
  }

  .filter-chip--active {
    background: var(--color-coral);
    color: var(--color-blanco);
    border-color: var(--color-coral);
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: var(--space-6);
  }
</style>
```

### `src/pages/blog/[...slug].astro` — Dynamic Blog Post

```astro
---
import { getCollection } from 'astro:content';
import BlogPostLayout from '@layouts/BlogPostLayout.astro';
import CubanQuote from '@components/CubanQuote.astro';
import InfoBox from '@components/InfoBox.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogPostLayout
  title={post.data.title}
  description={post.data.description}
  author={post.data.author}
  date={post.data.date}
  updatedDate={post.data.updatedDate}
  category={post.data.category}
  tags={post.data.tags}
  coverImage={post.data.coverImage}
  coverImageAlt={post.data.coverImageAlt}
>
  <Content components={{ CubanQuote, InfoBox }} />
</BlogPostLayout>
```

### `src/pages/historia.astro` — Static Page Example

This pattern is the same for `turismo.astro`, `productos.astro`, and `cultura.astro`. Each one renders the corresponding MDX file from the `pages` collection.

```astro
---
import { getEntry } from 'astro:content';
import PageLayout from '@layouts/PageLayout.astro';
import CubanQuote from '@components/CubanQuote.astro';
import InfoBox from '@components/InfoBox.astro';

const page = await getEntry('pages', 'historia');
if (!page) throw new Error('Page "historia" not found in pages collection');

const { Content } = await page.render();
---

<PageLayout
  title={page.data.title}
  description={page.data.description}
  heroImage={page.data.heroImage}
  heroImageAlt={page.data.heroImageAlt}
>
  <Content components={{ CubanQuote, InfoBox }} />
</PageLayout>
```

---

## 11. Blog Posts in MDX

### Example Post: `src/content/blog/2026-02-01-habana-vieja-restoration.mdx`

```mdx
---
title: "La restauración de La Habana Vieja alcanza un nuevo hito"
description: "Las obras de rehabilitación en el casco histórico de La Habana revelan frescos coloniales del siglo XVIII bajo capas de pintura moderna."
author: "Aroma de Cuba"
date: 2026-02-01
category: noticias
tags:
  - habana
  - arquitectura
  - patrimonio
  - restauracion
coverImage: ../../assets/images/habana-vieja-restoration.jpg
coverImageAlt: "Andamios frente a un edificio colonial en la Habana Vieja con fachada recién restaurada en tonos ocre y azul"
draft: false
featured: true
---

import CubanQuote from '@components/CubanQuote.astro';
import InfoBox from '@components/InfoBox.astro';

Los trabajos de restauración en la Plaza Vieja de La Habana han revelado un
hallazgo extraordinario: debajo de más de una docena de capas de pintura
moderna, un equipo de conservadores ha descubierto frescos del siglo XVIII
que representan escenas de la vida colonial cubana.

El descubrimiento, anunciado por la Oficina del Historiador de la Ciudad,
confirma lo que muchos expertos sospechaban: los edificios coloniales de
La Habana guardan tesoros artísticos ocultos bajo décadas de intervenciones
mal planificadas.

<CubanQuote author="Eusebio Leal Spengler">
  Cada piedra de esta ciudad cuenta una historia. Nuestro deber es escucharla.
</CubanQuote>

## Un hallazgo bajo capas de tiempo

El equipo de restauración, compuesto por especialistas cubanos y
colaboradores del Instituto Getty de Conservación, trabajó durante seis
meses para documentar y estabilizar los frescos antes de hacerlos
públicos.

<InfoBox type="history" title="Contexto histórico">
  La Plaza Vieja fue fundada en 1559 como Plaza Nueva. Durante siglos
  sirvió como centro de la vida social y comercial de La Habana.
  En el siglo XX sufrió un deterioro severo, y su restauración
  comenzó en la década de 1990.
</InfoBox>

## Lo que viene

Las autoridades planean abrir una sala de exhibición permanente en el
mismo edificio donde se encontraron los frescos, permitiendo al público
ver las obras restauradas en su contexto original.
```

### Example Static Page: `src/content/pages/historia.mdx`

```mdx
---
title: "Historia de Cuba"
description: "Desde los taínos hasta hoy — un recorrido por cinco siglos de historia cubana."
heroImage: ../../assets/images/hero-historia.jpg
heroImageAlt: "Vista panorámica del Capitolio de La Habana al atardecer"
lastUpdated: 2026-01-15
order: 1
---

import InfoBox from '@components/InfoBox.astro';
import CubanQuote from '@components/CubanQuote.astro';

Cuba es mucho más que una isla en el Caribe. Su historia es un tejido
complejo de culturas, revoluciones, arte y resistencia que ha dejado
una huella profunda en el mundo.

## Los primeros habitantes

Antes de la llegada de los europeos, Cuba estaba habitada por pueblos
indígenas, principalmente los taínos y los siboneyes. Los taínos
desarrollaron una cultura agrícola sofisticada, cultivando yuca, maíz
y tabaco — una planta que eventualmente transformaría la economía mundial.

<InfoBox type="history" title="Dato curioso">
  La palabra "tabaco" proviene del taíno, al igual que "hamaca",
  "canoa" y "huracán".
</InfoBox>

## La era colonial (1492–1898)

Cristóbal Colón llegó a Cuba el 28 de octubre de 1492, declarándola
la tierra más hermosa que ojos humanos habían visto. La colonización
española transformó radicalmente la isla durante los siguientes
cuatro siglos.

<!-- Continue with more sections... -->
```

---

## 12. RSS Feed

### `src/pages/rss.xml.ts`

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Aroma de Cuba',
    description: 'Noticias, cultura y sabor desde la isla — las últimas publicaciones del blog Aroma de Cuba.',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>es</language>',
  });
}
```

---

## 13. SEO & Metadata

### Checklist

Each page and blog post should have these elements covered (mostly handled by the `SEOHead` component and layouts):

- **Title tag**: Unique, under 60 characters, format: `Page Title — Aroma de Cuba`
- **Meta description**: Unique, under 160 characters, compelling
- **Canonical URL**: Automatically set from `Astro.url`
- **Open Graph tags**: title, description, image, type, locale
- **Twitter card**: `summary_large_image` with image
- **Structured data** (optional but recommended): Add JSON-LD for `Article` type on blog posts

### JSON-LD for Blog Posts

Add this to `BlogPostLayout.astro` inside the `<head>` (via `SEOHead` or directly):

```astro
<script
  type="application/ld+json"
  set:html={JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: date.toISOString(),
    dateModified: (updatedDate || date).toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Aroma de Cuba',
    },
  })}
/>
```

---

## 14. Deployment

### Recommended: Static Generation

Astro builds to static HTML by default — perfect for a content blog. No server required.

**Build command:**

```bash
npm run build    # Outputs to ./dist/
npm run preview  # Local preview of the built site
```

### Hosting Options

Any static hosting works. Top recommendations for this type of site:

- **Vercel** — Zero-config Astro support. Add a `vercel.json` or just connect your repo.
- **Netlify** — Same simplicity. Add a `netlify.toml` or connect your repo.
- **Cloudflare Pages** — Fast global CDN, generous free tier.

Example `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## 15. Content Workflow

### Writing a New Blog Post

1. Create a new `.mdx` file in `src/content/blog/`:
   ```
   src/content/blog/2026-02-09-your-post-slug.mdx
   ```

2. Add the required frontmatter (the schema will validate it):
   ```yaml
   ---
   title: "Your title here"
   description: "A compelling summary under 200 characters"
   author: "Aroma de Cuba"
   date: 2026-02-09
   category: noticias
   tags:
     - relevant
     - tags
   coverImage: ../../assets/images/your-image.jpg
   coverImageAlt: "Descriptive alt text for accessibility"
   draft: false
   featured: false
   ---
   ```

3. Write your content in MDX. Use the custom components:
   ```mdx
   import CubanQuote from '@components/CubanQuote.astro';
   import InfoBox from '@components/InfoBox.astro';

   Your article text here...

   <CubanQuote author="Author Name">
     A meaningful quote related to the article.
   </CubanQuote>

   <InfoBox type="tip" title="Dato útil">
     Helpful context or a travel tip.
   </InfoBox>
   ```

4. Place your cover image in `src/assets/images/` — Astro will optimize it automatically.

5. Run `npm run dev` and preview your post at `localhost:4321/blog/your-post-slug`.

### Image Guidelines

- **Cover images**: 1200 x 630px minimum (social share ratio)
- **Format**: `.jpg` for photos, `.png` for graphics, `.svg` for icons
- **Location**: Always in `src/assets/images/` (not `public/`) so Astro can optimize them
- **Naming**: `kebab-case-descriptive-name.jpg`
- **Alt text**: Required by schema. Write it as if describing the image to someone who cannot see it.

### Development Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build locally
npx astro check   # Type-check your Astro files
```

---

## Appendix: Quick Reference

### Collection Queries

```typescript
import { getCollection, getEntry } from 'astro:content';

// All published blog posts, sorted by date
const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

// Posts by category
const newsOnly = posts.filter((p) => p.data.category === 'noticias');

// Featured posts
const featured = posts.filter((p) => p.data.featured);

// Single page by ID
const historiaPage = await getEntry('pages', 'historia');

// Render content
const { Content, headings } = await post.render();
```

### Color Quick Reference

| Name | Hex | Use |
|---|---|---|
| Tabaco | `#5C3D2E` | Headings, logo, emphasis |
| Ron Añejo | `#8B5E3C` | Decorative elements, warm accents |
| Arena | `#F4E8D1` | Card backgrounds, accent surfaces |
| Coral Colonial | `#C4533A` | Primary action color, CTAs, badges |
| Azul Habana | `#2D5F7C` | Links, secondary actions |
| Palma Verde | `#3A6B4A` | Success states, culture category |
| Amarillo Sol | `#E8A838` | Warnings, highlights |
| Pergamino | `#FAF6F0` | Page background |
| Humo | `#2B2926` | Body text, footer background |
