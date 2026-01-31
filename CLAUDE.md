# Muro Landing & Blog (usemuro-pseo)

## Project Overview

This is the **marketing website and blog** for Muro, built with Next.js 15 and React 19. It includes:
- Landing page with localization (EN, DE, PL)
- 6,500+ programmatic SEO pages for 27,000+ paint colors
- Blog system with 10 Markdown articles (30 pages across 3 languages)
- GEO/LLMO optimization for AI crawlers

**Live URL**: https://usemuro.com

## Tech Stack

- **Framework**: Next.js 15 (App Router, Static Export)
- **React**: 19
- **Styling**: CSS Modules
- **i18n**: Custom implementation (EN, DE, PL)
- **Blog**: Markdown with gray-matter, remark
- **Image Generation**: Gemini API (NanoBanana Pro)
- **Hosting**: Cloudflare Pages (static export)

## Hosting & Deployment

| Aspect | Details |
|--------|---------|
| **Platform** | Cloudflare Pages |
| **Project Name** | `muro-landing` |
| **Domain** | usemuro.com |
| **Build Mode** | Static export (`output: 'export'`) |
| **Output Directory** | `/out` |
| **Total Pages** | ~6,590 HTML files |

### Deploy Commands

```bash
# Build static site
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=muro-landing
```

### Cloudflare Pages Files

- `public/_redirects` - URL redirects (root → /en, /support → Google Form)
- `public/_headers` - Security headers and caching rules

---

## Blog System

### Content Location

All blog articles are stored as Markdown files:

```
content/
└── blog/
    ├── en/          # English articles (primary)
    ├── de/          # German translations
    └── pl/          # Polish translations
```

### Article Frontmatter

```yaml
---
title: "Article Title"
description: "SEO meta description (150-160 chars)"
date: "2026-01-15"
author: "mario"
category: "color-psychology"  # See categories below
tags: ["tag1", "tag2"]
schema: "Article"             # Article | HowTo | FAQPage
featured: false               # true for homepage feature
image: "/blog/images/article-slug-hero.jpg"
imageAlt: "Descriptive alt text"
---
```

### Categories

| ID | EN | DE | PL |
|----|----|----|-----|
| color-psychology | Color Psychology | Farbpsychologie | Psychologia koloru |
| diy-guides | DIY Guides | DIY-Anleitungen | Poradniki DIY |
| pro-resources | Pro Resources | Profi-Ressourcen | Zasoby dla profesjonalistów |
| room-guides | Room Guides | Raumführer | Poradniki pokojowe |
| technical | Technical | Technisch | Techniczne |
| trends | Trends | Trends | Trendy |

### Authors

Defined in `/data/blog/authors.json`:
- **mario** - Founder (default author)

---

## Blog Post Creation Workflow

Creating a new blog post is a **complete process** with multiple steps:

### Step 1: Write the Article

Create a new Markdown file in `/content/blog/en/`:

```bash
# File: content/blog/en/your-article-slug.md
```

**Writing Guidelines:**
- Start with a **bold direct answer** to the title question
- Include **personal anecdotes** and mistakes ("I learned this the hard way...")
- Use **conversational tone** ("Here's the thing...", "Trust me")
- Add **specific data** (LRV values, color codes, prices)
- Include **actionable advice** readers can use immediately
- Mention Muro naturally where relevant (not forced)
- End with a clear **bottom line** summary

**Structure:**
1. Bold answer/hook (first paragraph)
2. Personal story or context
3. Main content with H2/H3 headers
4. Practical recommendations
5. Common mistakes section
6. Bottom line summary

### Step 2: Generate Hero Image

Run the image generation script:

```bash
npm run generate:blog-image -- --slug "your-article-slug" --prompt "Description of desired image"
```

**Image Specifications:**
- **Dimensions**: 1200x675px (16:9 aspect ratio)
- **Format**: WebP with JPEG fallback
- **Location**: `/public/blog/images/your-article-slug-hero.jpg`

**Prompt Guidelines for Gemini:**
- Describe the scene, not abstract concepts
- Include lighting and mood (warm, bright, natural)
- Specify interior design style if relevant
- Avoid text in images
- Request photorealistic or editorial style

### Step 3: Create Translations

Translate the article to German and Polish:

```bash
# Create German version
content/blog/de/your-article-slug.md

# Create Polish version
content/blog/pl/your-article-slug.md
```

**Translation Guidelines:**
- Translate the full content, not just frontmatter
- Adapt paint brand references to regional brands:
  - **EN**: Sherwin-Williams, Benjamin Moore, Behr
  - **DE**: Caparol, Brillux, Sto, Alpina
  - **PL**: Śnieżka, Dekoral, Tikkurila, Dulux
- Keep LRV values (universal)
- Adjust currency references if mentioned
- Maintain the conversational tone in each language

### Step 4: Update Frontmatter

Ensure all required fields are set:

```yaml
---
title: "Localized Title"
description: "Localized description"
date: "2026-01-15"
author: "mario"
category: "appropriate-category"
tags: ["relevant", "tags"]
schema: "Article"
image: "/blog/images/your-article-slug-hero.jpg"
imageAlt: "Localized alt text"
---
```

### Step 5: Verify

1. Run dev server: `npm run dev`
2. Check article at `/en/blog/your-article-slug`
3. Verify image loads correctly
4. Check TOC generates properly
5. Test language switcher (DE, PL versions)
6. Run build to verify static generation: `npm run build`

---

## Image Generation

### NanoBanana Pro (Gemini API)

The blog uses Gemini's image generation capabilities:

**API Configuration:**
- Model: `gemini-2.0-flash-exp` (or latest image-capable model)
- Output: 1200x675px JPEG
- Style: Photorealistic interior/lifestyle

### Manual Generation Script

```bash
# Generate image for specific article
npm run generate:blog-image -- --slug "article-slug"

# Generate images for all articles missing images
npm run generate:blog-images
```

### Environment Setup

Create `.env.local`:

```
GEMINI_API_KEY=your_api_key_here
```

---

## File Structure

```
usemuro-pseo/
├── app/
│   └── [lang]/
│       ├── blog/
│       │   ├── [slug]/
│       │   │   └── page.tsx      # Article page
│       │   ├── category/
│       │   │   └── [category]/
│       │   │       └── page.tsx  # Category listing
│       │   ├── components/       # Blog UI components
│       │   ├── blog.module.css   # Blog styles
│       │   └── page.tsx          # Blog index
│       ├── faq/
│       │   └── page.tsx          # FAQ page
│       └── page.tsx              # Landing page
├── content/
│   └── blog/
│       ├── en/                   # English articles (Markdown)
│       ├── de/                   # German articles
│       └── pl/                   # Polish articles
├── data/
│   └── blog/
│       ├── authors.json
│       └── categories.json
├── lib/
│   ├── blog/
│   │   ├── loader.ts            # Markdown loading & caching
│   │   ├── schema.ts            # Schema.org generators
│   │   ├── toc.ts               # Table of contents
│   │   └── types.ts             # TypeScript interfaces
│   └── i18n/
│       ├── config.ts
│       └── translations/
│           ├── en.json
│           ├── de.json
│           └── pl.json
├── public/
│   └── blog/
│       └── images/              # Blog hero images
├── scripts/
│   ├── generate-blog-image.ts   # Single image generation
│   └── generate-all-blog-images.ts
└── CLAUDE.md                    # This file
```

---

## Quick Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run type-check             # TypeScript check

# Blog Images
npm run generate:blog-image -- --slug "article-slug"
npm run generate:blog-images   # All missing images

# Verify
npm run build                  # Should generate 6000+ pages
```

---

## SEO & GEO Optimization

### Schema.org Markup

Each article automatically includes:
- **Article** schema for standard posts
- **HowTo** schema for tutorial posts (set `schema: "HowTo"`)
- **BreadcrumbList** for navigation
- **WebSite** and **Organization** schemas

### AI Crawler Optimization

`/public/robots.txt` allows:
- GPTBot, ChatGPT-User
- ClaudeBot, anthropic-ai
- PerplexityBot
- Applebot-Extended

`/public/llms.txt` provides structured content for LLMs.

---

## Blog Writing Style Guide

### DO:
- Start with direct answer to the title question
- Include personal stories and mistakes
- Use conversational language ("Here's the thing...")
- Provide specific data (LRV values, color codes)
- Give actionable recommendations
- Mention real paint colors with manufacturer codes
- Include "avoid" sections for common mistakes

### DON'T:
- Write generic, clinical prose
- Use passive voice excessively
- Fill with fluff or filler content
- Over-optimize for keywords
- Force Muro mentions
- Write walls of text without structure

### Example Opening (Good):

```markdown
**Short answer: Light colors with high LRV above 50.** Whites, creamy
off-whites, and pale grays work best. But here's the thing—it's not
just about picking "white" and calling it a day.

I learned this the hard way when I painted my 10x10 home office
"Swiss Coffee" without checking the LRV. Looked great on the chip.
On my north-facing walls with one tiny window? It read as dirty yellow.
```

### Example Opening (Bad):

```markdown
Light colors with high LRV (Light Reflectance Value) make small rooms
look bigger. The most effective colors are whites, off-whites, and
soft pastels with LRV values above 70. These colors reflect more
light, creating the illusion of more space.
```

---

## Maintenance

### Adding New Categories

1. Add to `/data/blog/categories.json`
2. Add translations in all language files
3. Create at least one article in the category

### Adding New Authors

1. Add to `/data/blog/authors.json`
2. Include avatar, name, and role in all languages

### Updating Translations

All UI strings are in `/lib/i18n/translations/{en,de,pl}.json`

---

## SEO Infrastructure Reference

For comprehensive documentation on:
- **pSEO**: Programmatic SEO for 27,304 paint colors
- **GEO**: Generative Engine Optimization for AI crawlers
- **Schema.org**: Structured data implementations
- **Sitemap & robots.txt**: Technical SEO files
- **Page statistics**: Full breakdown of 6,590 pages

See: **[`/specs/seo-infrastructure.md`](specs/seo-infrastructure.md)**

### Quick Stats

| Metric | Value |
|--------|-------|
| Total HTML Pages | 6,586 |
| Paint Colors | 27,304 |
| Manufacturers | 30 |
| Languages | 3 (EN, DE, PL) |
| Blog Articles | 10 |

### Key SEO Files

| File | Purpose |
|------|---------|
| `/public/sitemap.xml` | Auto-generated sitemap |
| `/public/robots.txt` | Crawler directives + AI bot allowlist |
| `/public/llms.txt` | LLM-optimized structured content |
| `/lib/blog/schema.ts` | Schema.org generators |
| `/lib/seo/metadata.ts` | SEO metadata generators |
