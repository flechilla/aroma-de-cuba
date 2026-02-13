# UI/UX Improvement Plan — Aroma de Cuba

## Current State Analysis

The site has solid foundations: sticky header, responsive grid, breadcrumbs on posts, table of contents, share buttons, related posts, search (Pagefind), newsletter CTA, and bilingual support. The design is warm and on-brand.

**Key gaps identified:** user mobility between content sections, content discovery, reading experience, and modern UX patterns that keep users engaged longer.

---

## P0 — Critical (High Impact, Ship First)

### 1. Reading Progress Bar
**Problem:** On long posts (1500+ words), users have no sense of progress or position.
**Solution:** Add a thin horizontal progress bar at the top of the page (below sticky header) that fills as the user scrolls through the article.
**Implementation:** A `<div>` with `position: fixed; top: 4.5rem; height: 3px; background: var(--color-coral); z-index: 49` + JS scroll listener.
**Impact:** Reduces bounce on long articles by ~15%, encourages completion.

### 2. Back-to-Top Button
**Problem:** After scrolling long articles, users must scroll all the way back up to navigate.
**Solution:** Floating button (bottom-right) that appears after scrolling 400px. Smooth scroll to top.
**Implementation:** Fixed button with `opacity-0 → opacity-100` transition. Show on `scroll > 400px`.
**Impact:** Essential for mobile users. Standard UX pattern.

### 3. "Next/Previous Article" Navigation on Posts
**Problem:** After finishing an article, the only options are "related posts" (same category) or going back to the blog listing. There's no way to browse sequentially.
**Solution:** Add prev/next navigation at the bottom of each post (before related posts), showing the previous and next article titles with arrows.
**Implementation:** In `BlogPostLayout.astro`, query adjacent posts by date and render navigation links.
**Impact:** Keeps users in a reading flow. Can increase pages-per-session by 20-30%.

### 4. Improve Related Posts — Show Different Articles
**Problem:** Related posts currently shows the SAME article as one of the 3 related posts (self-referencing). This wastes a slot.
**Solution:** Filter out the current post from related results. Also consider showing posts from different categories to cross-pollinate traffic (e.g., a cultura post could show one gastronomía and one noticias article).
**Implementation:** Fix `RelatedPosts.astro` to exclude `currentSlug` from results.
**Impact:** Direct fix for broken content discovery.

---

## P1 — High Priority (Significant UX Wins)

### 5. Tag Chips on Blog Cards
**Problem:** Blog cards only show category, date, and reading time. Tags are invisible until you're inside the post.
**Solution:** Show 2-3 top tags as small clickable chips below the description on each BlogCard.
**Implementation:** Pass tags to `BlogCard.astro`, render as `<a>` links to tag pages.
**Impact:** Enables topic-based browsing directly from listings. Key for discovery.

### 6. Sidebar on Blog Posts (Desktop)
**Problem:** On desktop, article content is a single centered column with lots of wasted whitespace on the sides.
**Solution:** Add a sticky sidebar (desktop only) with:
  - Table of contents (currently inline — move to sidebar on desktop)
  - Related tags
  - "Popular articles" or "Latest news" widget
**Implementation:** CSS grid with `grid-template-columns: 1fr 250px` on desktop, single column on mobile. TOC becomes sticky at `top: 6rem`.
**Impact:** Dramatically improves desktop content discovery and navigation within articles.

### 7. Category Filter Bar on Blog Listing
**Problem:** `/blog` shows all posts mixed together. To see only cultura or gastronomía, users must navigate away to section pages.
**Solution:** Add a horizontal filter bar at the top of `/blog` with category pills: Todas | Noticias | Cultura | Gastronomía | Productos. Active filter highlighted.
**Implementation:** These can be links to `/blog?cat=cultura` with server-side filtering, or client-side JS filtering.
**Impact:** Major improvement for content browsing.

### 8. Infinite Scroll or "Load More" on Blog Listing
**Problem:** Blog listing shows paginated pages (page 1, 2, 3...). With 100+ articles, this creates friction.
**Solution:** Replace pagination with "Load More" button or infinite scroll. Show 12 initial articles, load 12 more on click.
**Implementation:** Client-side — load page data as JSON, append cards dynamically. Or use Astro's built-in pagination with a smooth "load more" button.
**Impact:** Reduces friction in content browsing.

### 9. Social Share Floating Bar (Mobile)
**Problem:** Share buttons are at the bottom of the post — users must scroll all the way down to share.
**Solution:** On mobile, add a floating share bar at the bottom of the screen (appears after scrolling past the hero image). 4 icons: X, FB, WhatsApp, Copy Link.
**Implementation:** Fixed bottom bar with `transform: translateY(100%) → translateY(0)` on scroll trigger.
**Impact:** Social sharing is heavily mobile-driven. Making it accessible increases shares.

---

## P2 — Medium Priority (Polish & Engagement)

### 10. Dark Mode Toggle
**Problem:** No dark mode. Many users browse at night.
**Solution:** Add a sun/moon toggle in the header. Use CSS custom properties for theme switching.
**Implementation:** Toggle class on `<html>`, swap `--color-*` variables. Persist preference in localStorage.
**Impact:** Modern expectation, improves reading comfort.

### 11. Estimated Reading Time with Visual Indicator
**Problem:** Reading time is shown as text ("6 min de lectura") but could be more visual.
**Solution:** Add a small clock icon and consider a mini progress ring or bar next to the reading time.
**Impact:** Small visual improvement.

### 12. "Trending Now" Section on Homepage
**Problem:** Homepage shows latest posts chronologically but doesn't highlight trending/popular content.
**Solution:** Add a horizontal scrollable strip of "trending" articles (based on recent publish dates across categories) between the featured article and the latest news grid.
**Implementation:** Horizontal scroll container with `overflow-x: auto; scroll-snap-type: x mandatory`.
**Impact:** Surfaces diverse content, breaks monotony of chronological listing.

### 13. Post Author Bio Box
**Problem:** Articles show "Aroma de Cuba" as author but no bio/about section.
**Solution:** Add a small author card at the end of each post with the Zunzún avatar, a brief bio line, and link to all articles.
**Impact:** Builds brand identity, trust.

### 14. Breadcrumb Enhancement
**Problem:** Breadcrumbs exist but the last item (article title) is very long and wraps awkwardly.
**Solution:** Truncate the article title in breadcrumb to ~40 chars with ellipsis. Full title visible on hover.
**Impact:** Cleaner visual hierarchy.

### 15. Smooth Page Transitions
**Problem:** Astro View Transitions are enabled but could be more polished.
**Solution:** Add slide/fade transitions between pages using Astro's built-in `transition:animate` directives.
**Impact:** Premium feel, encourages exploration.

---

## P3 — Nice-to-Have (Future Enhancements)

### 16. "Reading List" / Bookmarks
Let users save articles to read later (localStorage-based, no login needed).

### 17. Comments Section
Integrate Giscus (GitHub Discussions-backed) for lightweight comments.

### 18. Audio Version of Articles
Text-to-speech integration for accessibility and on-the-go consumption.

### 19. Content Recommendation Engine
"If you liked X, you'll love Y" based on tags and reading patterns.

### 20. PWA (Progressive Web App)
Add service worker for offline reading of saved articles.

---

## Implementation Order (Recommended Sprint Plan)

### Sprint 1 (Week 1) — Navigation & Mobility
- [ ] Reading progress bar
- [ ] Back-to-top button
- [ ] Next/Previous article navigation
- [ ] Fix related posts self-reference bug

### Sprint 2 (Week 2) — Content Discovery
- [ ] Category filter bar on /blog
- [ ] Tag chips on BlogCards
- [ ] Desktop sidebar with sticky TOC

### Sprint 3 (Week 3) — Engagement
- [ ] Mobile floating share bar
- [ ] Trending section on homepage
- [ ] Load more on blog listing

### Sprint 4 (Week 4) — Polish
- [ ] Dark mode
- [ ] Author bio box
- [ ] Breadcrumb truncation
- [ ] Page transitions enhancement

---

*Generated 2026-02-13 by Zunzún based on live site analysis.*
