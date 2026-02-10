# Social Media Publishing - Aroma de Cuba

## Overview

Automated social media publishing for blog posts. Currently supports **Facebook Page**.

## Setup

### Facebook Credentials

Location: `scripts/.env.facebook`

```env
FB_APP_ID=1233625421528299
FB_APP_SECRET=<secret>
FB_PAGE_ID=972895705914730
FB_PAGE_ACCESS_TOKEN=<token>
```

**Token expires ~60 days.** To refresh:
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select app "Aroma de Cuba"
3. Get User Token with permissions: `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`
4. Run: `python3 scripts/fb_publish.py --setup` or ask Zunzún to exchange the token

### Dependencies

```bash
pip install requests python-dotenv flask
```

## Usage

### Publish a Post

**As photo post (recommended - better engagement):**
```bash
python3 scripts/fb_publish.py \
  --url "https://aromadecuba.com/blog/es/..." \
  --title "Título del post" \
  --description "Descripción breve" \
  --image "https://..." \
  --photo-post
```

**As link post:**
```bash
python3 scripts/fb_publish.py \
  --url "https://aromadecuba.com/blog/es/..." \
  --title "Título del post" \
  --description "Descripción breve"
```

### Test Connection

```bash
python3 scripts/fb_publish.py --test
```

### Setup Token (Interactive)

```bash
python3 scripts/fb_publish.py --setup
```

## Post Format

Posts are published with this format:
```
📰 {title}

{description}

🔗 {url}
```

For photo posts, the image is uploaded directly (better visibility in feeds).

## Integration with Content Generation

The Zunzún cron jobs automatically publish to Facebook after creating new blog posts:

1. **News** (`zunzun-noticias`): Publishes breaking news
2. **Culture** (`zunzun-cultura`): Publishes culture articles
3. **Gastronomy** (`zunzun-gastronomia`): Publishes recipes/food content
4. **Products** (`zunzun-productos`): Publishes product guides

## Troubleshooting

### Token Expired
Error: `OAuthException: Error validating access token`
→ Refresh token using Graph API Explorer

### Page Not Found
Error: `Page XXX not found`
→ Verify FB_PAGE_ID and that the token has access to the page

### Image Not Showing
- Ensure og:image meta tag has absolute URL
- Run Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

## Files

- `scripts/fb_publish.py` - Main publishing script
- `scripts/fb_oauth_server.py` - OAuth callback server (for token setup)
- `scripts/.env.facebook` - Credentials (gitignored)
- `scripts/requirements.txt` - Python dependencies
