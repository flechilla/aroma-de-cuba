# Aroma de Cuba — Content Workflow

## Overview

This document describes the automated content generation workflow for Aroma de Cuba.

## Automated Generation

Content is generated automatically by **Zunzún** (the site's dedicated AI agent) 4 times daily.

### Schedule (UTC)
- 06:00 — Morning generation
- 12:00 — Midday generation
- 18:00 — Evening generation
- 00:00 — Night generation

### Current Focus: Gastronomía

The initial automation focuses on the Gastronomía section, covering:
- Traditional Cuban recipes
- Ingredient deep-dives
- Drinks and cocktails
- Restaurant spotlights
- Culinary history
- Fusion cuisine

## Content Structure

### Languages
All content is published in both Spanish (primary) and English.

### File Locations
- Spanish: `src/content/blog/es/YYYY-MM-DD-slug.mdx`
- English: `src/content/blog/en/YYYY-MM-DD-slug.mdx`

### Frontmatter Schema
```yaml
---
title: string          # 50-60 chars
description: string    # 150-160 chars
author: "Aroma de Cuba"
date: YYYY-MM-DD
category: gastronomia | cultura | noticias
tags: string[]         # 3-5 relevant tags
coverImage: path
coverImageAlt: string  # Accessible description
draft: boolean
featured: boolean
---
```

## Deployment

After content creation, the site rebuilds automatically:
```bash
cd /root/.openclaw/workspace/projects/aroma-de-cuba
docker compose up -d --build
```

## Quality Standards

1. **Authenticity** — Culturally accurate, no stereotypes
2. **SEO-Ready** — Optimized titles, descriptions, headings
3. **Bilingual** — Both versions adapted (not literal translations)
4. **Engaging** — Story-driven, sensory-rich writing
5. **Practical** — Actionable for readers

## Manual Triggers

To manually request content generation, message Zunzún via Telegram with:
- "Generate a gastronomía post"
- "Write about [specific topic]"
- "Create content for the blog"

## Future Sections

Planned automation for:
- Cultura (music, art, traditions)
- Noticias (current events, filtered for relevance)
- Turismo (travel guides, destinations)
