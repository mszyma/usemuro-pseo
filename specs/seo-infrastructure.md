# Muro SEO & Marketing Infrastructure

> Last updated: January 31, 2026

## Overview

This document describes the SEO, pSEO (Programmatic SEO), and GEO (Generative Engine Optimization) infrastructure for the Muro marketing website at https://usemuro.com.

---

## Page Statistics

| Metric | Count |
|--------|-------|
| **Total HTML Pages** | 6,586 |
| **Languages** | 3 (EN, DE, PL) |
| **Paint Colors in Database** | 27,304 |
| **Paint Manufacturers** | 30 |
| **Blog Articles** | 10 |

### Page Breakdown by Type

| Type | Per Language | Total (×3) | Description |
|------|-------------|------------|-------------|
| Individual Color Pages | 2,117 | 6,351 | One page per paint color |
| Manufacturer Index Pages | 30 | 90 | Browse colors by brand |
| Category Pages | 26 | 78 | Hue + style categories |
| Blog Articles | 10 | 30 | Long-form SEO content |
| Blog Category Pages | 6 | 18 | Content categories |
| Static Pages | 4 | 12 | Home, FAQ, Legal, Colors index |
| Root Files | 7 | 7 | sitemap.xml, robots.txt, llms.txt, etc. |

---

## pSEO: Programmatic SEO for Paint Colors

### Strategy

Each of the 27,304 paint colors has its own dedicated page, targeting long-tail search queries like:
- "Behr Barely Pink paint color"
- "Benjamin Moore Simply White LRV"
- "Sherwin-Williams Agreeable Gray hex code"

### Paint Color Database

#### USA Brands (18,376 colors)

| Brand | Colors | URL Pattern |
|-------|--------|-------------|
| Behr | 4,699 | `/en/colors/behr/{color-name}` |
| Benjamin Moore | 4,118 | `/en/colors/benjamin_moore/{color-name}` |
| Vista Paint | 2,785 | `/en/colors/vista/{color-name}` |
| PPG Paints | 2,088 | `/en/colors/ppg/{color-name}` |
| Valspar | 1,764 | `/en/colors/valspar/{color-name}` |
| Dunn-Edwards | 1,696 | `/en/colors/dunn_edwards/{color-name}` |
| Sherwin-Williams | 1,526 | `/en/colors/sherwin_williams/{color-name}` |
| Neenah | 1,700 | `/en/colors/neenah/{color-name}` |

#### European Brands (7,360 colors)

| Brand | Country | Colors | URL Pattern |
|-------|---------|--------|-------------|
| Caparol | Germany | 3,488 | `/en/colors/caparol/{color-name}` |
| Brillux | Germany | 1,514 | `/en/colors/brillux/{color-name}` |
| Jotun | Norway | 1,213 | `/en/colors/jotun/{color-name}` |
| Sto | Germany | 800 | `/en/colors/sto/{color-name}` |
| Farrow & Ball | UK | 132 | `/en/colors/farrow_ball/{color-name}` |

#### Color Standards (213 colors)

| Standard | Colors | URL Pattern |
|----------|--------|-------------|
| RAL Classic | 213 | `/en/colors/ral/{color-name}` |

### Color Page Features

Each color page includes:

```
┌─────────────────────────────────────────┐
│ Color Swatch (large, hex-based)         │
├─────────────────────────────────────────┤
│ Color Name: Barely Pink                 │
│ Manufacturer: Behr                      │
│ Code: 100A-1                            │
│ Hex: #F9ECFC                            │
│ LRV: 94.1                               │
│ Category: White                         │
├─────────────────────────────────────────┤
│ Similar Colors (6 suggestions)          │
├─────────────────────────────────────────┤
│ CTA: Download Muro App                  │
└─────────────────────────────────────────┘
```

### SEO Metadata per Color Page

```typescript
{
  title: "Barely Pink by Behr - Muro Paint Visualizer",
  description: "Visualize Barely Pink (100A-1) by Behr on your walls with Muro AI. Hex: #F9ECFC, LRV: 94.1. See before you paint.",
  keywords: "Barely Pink, Behr, paint color 100A-1, white paint, LRV 94.1, hex F9ECFC, paint color visualizer, AI paint preview",
  canonical: "https://usemuro.com/en/colors/behr/barely-pink",
  hreflang: {
    en: "https://usemuro.com/en/colors/behr/barely-pink",
    de: "https://usemuro.com/de/farben/behr/barely-pink",
    pl: "https://usemuro.com/pl/kolory/behr/barely-pink"
  }
}
```

---

## GEO: Generative Engine Optimization

### Purpose

GEO ensures Muro appears in AI-generated answers from ChatGPT, Claude, Perplexity, and other LLM-based search tools.

### `/llms.txt` - LLM-Optimized Content

Location: `https://usemuro.com/llms.txt`

Structured documentation specifically for AI crawlers containing:

1. **Company Overview**
   - App description and key facts
   - 27,304 colors from 29 manufacturers
   - Zero-knowledge privacy architecture

2. **Paint Color Database Index**
   - Direct URLs to all manufacturer pages
   - Color counts per brand
   - Browse all link

3. **Common Q&A Pairs**
   - Is Muro free? (subscription model)
   - How accurate are visualizations? (~90%)
   - What brands are available?
   - Where are photos stored? (local + iCloud)

4. **Blog Article Index**
   - All articles with direct URLs
   - Organized by category

5. **Contact Information**
   - Support URL
   - Email address

### `/robots.txt` - AI Crawler Allowlist

```txt
# LLM/AI Crawler Allowlist
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: cohere-ai
Allow: /
```

### Why GEO Matters

When users ask AI assistants:
- "What app can visualize paint colors on my walls?"
- "Best paint color apps for iPhone"
- "How to preview Sherwin-Williams colors at home"

The AI can reference Muro's structured content from `llms.txt` and indexed pages.

---

## Schema.org Structured Data

### Implemented Schemas

| Schema Type | Location | Purpose |
|-------------|----------|---------|
| `Article` | Blog posts | Rich snippets for articles |
| `HowTo` | Tutorial posts | Step-by-step rich results |
| `FAQPage` | FAQ page | FAQ rich snippets |
| `BreadcrumbList` | All pages | Navigation breadcrumbs |
| `WebSite` | Homepage | Site search box in Google |
| `Organization` | Site-wide | Company info |
| `SoftwareApplication` | Homepage | App listing in search |

### Example: Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Colors Make a Small Room Look Bigger",
  "description": "Light colors with high LRV above 50...",
  "image": "https://usemuro.com/blog/images/small-room-hero.jpg",
  "datePublished": "2026-01-15",
  "author": {
    "@type": "Person",
    "name": "Mario"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Muro"
  }
}
```

### Example: SoftwareApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Muro",
  "description": "AI-powered paint color visualization for iOS",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free download with in-app subscription"
  }
}
```

---

## Blog Content Strategy

### Article Categories

| Category ID | English | German | Polish |
|-------------|---------|--------|--------|
| `color-psychology` | Color Psychology | Farbpsychologie | Psychologia koloru |
| `diy-guides` | DIY Guides | DIY-Anleitungen | Poradniki DIY |
| `pro-resources` | Pro Resources | Profi-Ressourcen | Zasoby dla profesjonalistów |
| `room-guides` | Room Guides | Raumführer | Poradniki pokojowe |
| `technical` | Technical | Technisch | Techniczne |
| `trends` | Trends | Trends | Trendy |

### Published Articles (10)

1. **What Colors Make a Small Room Look Bigger** (`color-psychology`)
   - Target: "colors that make rooms look bigger"
   - Content: LRV explanation, specific color recommendations

2. **How LRV Affects Your Paint Choice** (`technical`)
   - Target: "what is LRV in paint"
   - Content: Technical explanation with practical examples

3. **White Paint Undertones Explained** (`color-psychology`)
   - Target: "white paint undertones"
   - Content: Warm vs cool whites, how to identify

4. **North-Facing Room Paint Colors** (`room-guides`)
   - Target: "best paint colors for north facing rooms"
   - Content: Lighting considerations, specific recommendations

5. **How to Choose Paint Colors Flow Room to Room** (`diy-guides`)
   - Target: "choosing paint colors for whole house"
   - Content: Color flow strategy, open floor plans

6. **How to Test Paint Colors Before Committing** (`diy-guides`)
   - Target: "how to test paint colors"
   - Content: Sample techniques, digital preview with Muro

7. **How Much Paint Do I Need Calculator** (`diy-guides`)
   - Target: "paint calculator"
   - Content: Square footage formulas, coverage estimates

8. **Paint Finish Guide: Flat to Gloss** (`technical`)
   - Target: "paint finish types"
   - Content: Sheen levels, where to use each

9. **Best Paint Colors for Kitchens** (`room-guides`)
   - Target: "kitchen paint colors"
   - Content: Cabinet colors, wall colors, trends

10. **Paint Color Trends 2025-2026** (`trends`)
    - Target: "paint color trends 2025"
    - Content: Color of the year, emerging palettes

### Blog SEO Features

- **Hero images** for each article (1200×675px)
- **Table of contents** auto-generated from headings
- **Reading time** estimates
- **Related articles** suggestions
- **Color swatches** inline with color mentions
- **Schema.org markup** (Article, HowTo, FAQ)

---

## Internationalization

### Supported Languages

| Language | Code | URL Prefix | Market |
|----------|------|------------|--------|
| English | `en` | `/en/` | USA, UK, Global |
| German | `de` | `/de/` | Germany, Austria, Switzerland |
| Polish | `pl` | `/pl/` | Poland, CEE |

### Localized URL Patterns

| Page Type | English | German | Polish |
|-----------|---------|--------|--------|
| Colors index | `/en/colors` | `/de/farben` | `/pl/kolory` |
| Color page | `/en/colors/behr/...` | `/de/farben/behr/...` | `/pl/kolory/behr/...` |
| Blog | `/en/blog` | `/de/blog` | `/pl/blog` |
| FAQ | `/en/faq` | `/de/faq` | `/pl/faq` |
| Legal | `/en/legal` | `/de/rechtliches` | `/pl/prawne` |

### Regional Brand Emphasis

- **English**: Sherwin-Williams, Benjamin Moore, Behr
- **German**: Caparol, Brillux, Sto, Alpina
- **Polish**: Śnieżka, Dekoral, Tikkurila, Dulux

---

## Technical SEO Files

### `/sitemap.xml`

Auto-generated sitemap including:
- Homepage (all languages)
- Blog index and articles
- FAQ and Legal pages
- Blog categories

Note: Individual color pages are not in sitemap (too many URLs). They're discovered through internal linking.

### `/_headers` (Cloudflare Pages)

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/blog/images/*
  Cache-Control: public, max-age=604800
```

### `/_redirects` (Cloudflare Pages)

```
/ /en 302
/support https://docs.google.com/forms/d/e/... 302
/legal.html /en/legal 301
/legal /en/legal 301
```

---

## Hosting & Deployment

| Aspect | Details |
|--------|---------|
| **Platform** | Cloudflare Pages |
| **Build** | Next.js 15 static export (`output: 'export'`) |
| **Domain** | usemuro.com |
| **SSL** | Cloudflare (automatic) |
| **CDN** | Cloudflare global edge network |
| **Build time** | ~5 minutes for 6,590 pages |

### Deployment Command

```bash
npm run build  # Generates /out directory
npx wrangler pages deploy out --project-name=muro-landing
```

---

## Future Improvements

### Planned

- [ ] Add sitemap index for color pages (split into multiple sitemaps)
- [ ] Implement color search with Algolia or similar
- [ ] Add more blog articles (target: 50 articles)
- [ ] Create manufacturer landing pages with richer content
- [ ] Add user reviews/testimonials schema
- [ ] Implement FAQ schema on color pages

### Metrics to Track

- Organic search impressions (Google Search Console)
- AI assistant mentions (manual tracking)
- Color page indexation rate
- Blog article rankings for target keywords
- Conversion rate: page visit → app download

---

## File Locations

| File | Path |
|------|------|
| Color data | `/data/kolory/{region}/{manufacturer}_colors.json` |
| Blog content | `/content/blog/{lang}/{slug}.md` |
| Schema generators | `/lib/blog/schema.ts` |
| SEO metadata | `/lib/seo/metadata.ts` |
| i18n config | `/lib/i18n/config.ts` |
| Translations | `/lib/i18n/translations/{lang}.json` |
| llms.txt | `/public/llms.txt` |
| robots.txt | `/public/robots.txt` |

---

## Related Documentation

- [CLAUDE.md](/Users/mario4/Code/walls/usemuro-pseo/CLAUDE.md) - Project setup and development guide
- [Color Database](/Users/mario4/Code/walls/kolory/README.md) - Paint color data sources
