# Blog Implementation Plan for Muro pSEO Website

## Overview

This document outlines the implementation plan for adding a multilingual blog to the Muro pSEO website, following the structure defined in `public/llms.txt`.

## Blog Categories

Based on `llms.txt`, the blog will have 5 categories:

| Category ID | English Name | German Name | Polish Name | SEO Focus |
|-------------|--------------|-------------|-------------|-----------|
| `color-psychology` | Color Psychology | Farbpsychologie | Psychologia Kolorów | How colors affect mood, perception |
| `diy-guides` | DIY Painting Guides | DIY Malanleitungen | Poradniki DIY | Step-by-step painting tutorials |
| `pro-resources` | Professional Resources | Profi-Ressourcen | Zasoby dla Profesjonalistów | Content for painters/contractors |
| `room-guides` | Room-Specific Guides | Raumspezifische Anleitungen | Poradniki Pokojowe | Living room, bedroom, kitchen colors |
| `technical` | Technical Articles | Technische Artikel | Artykuły Techniczne | LRV, color theory, paint chemistry |

## URL Structure

### English (`/en`)
```
/en/blog                                    # All articles
/en/blog/category/color-psychology          # Category listing
/en/blog/category/diy-guides
/en/blog/category/pro-resources
/en/blog/category/room-guides
/en/blog/category/technical
/en/blog/[slug]                             # Individual article
```

### German (`/de`)
```
/de/blog                                    # Main blog page
/de/blog/kategorie/farbpsychologie
/de/blog/kategorie/diy-anleitungen
/de/blog/kategorie/profi-ressourcen
/de/blog/kategorie/raum-anleitungen
/de/blog/kategorie/technisch
/de/blog/[slug]
```

### Polish (`/pl`)
```
/pl/blog                                    # Main blog page
/pl/blog/kategoria/psychologia-kolorow
/pl/blog/kategoria/poradniki-diy
/pl/blog/kategoria/zasoby-profesjonalne
/pl/blog/kategoria/poradniki-pokojowe
/pl/blog/kategoria/techniczne
/pl/blog/[slug]
```

## File Structure

```
app/
└── [lang]/
    └── blog/
        ├── page.tsx                        # Blog listing (all articles)
        ├── [slug]/
        │   └── page.tsx                    # Individual article page
        └── category/
            └── [category]/
                └── page.tsx                # Category listing page

lib/
├── blog/
│   ├── loader.ts                           # Blog article loader (cached)
│   ├── types.ts                            # TypeScript interfaces
│   └── categories.ts                       # Category definitions
└── i18n/
    └── translations/
        ├── en.json                         # Add blog translations
        ├── de.json
        └── pl.json

data/
└── blog/
    ├── articles.json                       # Article metadata index
    └── articles/
        ├── color-psychology/
        │   └── how-colors-affect-mood.json
        ├── diy-guides/
        │   └── painting-walls-like-a-pro.json
        ├── pro-resources/
        │   └── pricing-interior-jobs.json
        ├── room-guides/
        │   └── best-bedroom-colors.json
        └── technical/
            └── understanding-lrv.json
```

## Data Schema

### Article Schema (`data/blog/articles/<category>/<slug>.json`)

```typescript
interface BlogArticle {
  id: string;                               // Unique ID: "how-colors-affect-mood"
  slug: string;                             // URL slug (same as id for most cases)
  category: CategoryId;                     // "color-psychology" | "diy-guides" | etc.

  // Multilingual content
  translations: {
    en: ArticleContent;
    de: ArticleContent;
    pl: ArticleContent;
  };

  // Metadata
  author: string;                           // "Muro Team"
  publishedAt: string;                      // ISO date: "2026-01-15"
  updatedAt?: string;                       // Optional: ISO date
  readingTimeMinutes: number;               // Estimated: 5

  // SEO
  featuredImage?: string;                   // "/images/blog/how-colors-affect-mood.jpg"
  tags: string[];                           // ["psychology", "mood", "interior design"]

  // Relations
  relatedColors?: string[];                 // ["behr-barely-pink", "sherwin-agreeable-gray"]
  relatedArticles?: string[];               // ["understanding-lrv", "warm-vs-cool-colors"]
}

interface ArticleContent {
  title: string;                            // "How Colors Affect Your Mood"
  metaDescription: string;                  // 150-160 chars for SEO
  excerpt: string;                          // 200-300 chars preview
  content: string;                          // Full article in Markdown
}

type CategoryId =
  | "color-psychology"
  | "diy-guides"
  | "pro-resources"
  | "room-guides"
  | "technical";
```

### Article Index Schema (`data/blog/articles.json`)

```typescript
interface BlogIndex {
  totalArticles: number;
  lastUpdated: string;                      // ISO date
  articles: ArticleIndexEntry[];
}

interface ArticleIndexEntry {
  id: string;
  slug: string;
  category: CategoryId;
  publishedAt: string;
  featured: boolean;                        // Show on homepage/top of listings
  translations: {
    en: { title: string };
    de: { title: string };
    pl: { title: string };
  };
}
```

## Implementation Steps

### Phase 1: Foundation (2-3 days)

#### 1.1 Create Type Definitions
- [ ] Create `lib/blog/types.ts` with TypeScript interfaces
- [ ] Define BlogArticle, ArticleContent, CategoryId types

#### 1.2 Create Blog Data Loader
- [ ] Create `lib/blog/loader.ts`
- [ ] Implement `getAllArticles()` - returns all articles
- [ ] Implement `getArticleBySlug(slug)` - returns single article
- [ ] Implement `getArticlesByCategory(category)` - filtered by category
- [ ] Add in-memory caching (same pattern as colors loader)

#### 1.3 Create Category Configuration
- [ ] Create `lib/blog/categories.ts`
- [ ] Define category metadata (id, name translations, description, icon)

### Phase 2: Routes & Pages (2-3 days)

#### 2.1 Blog Listing Page
- [ ] Create `app/[lang]/blog/page.tsx`
- [ ] Display all articles, newest first
- [ ] Category filter sidebar
- [ ] Pagination (12 articles per page)
- [ ] Featured articles section at top

#### 2.2 Category Pages
- [ ] Create `app/[lang]/blog/category/[category]/page.tsx`
- [ ] Filter articles by category
- [ ] Category description header
- [ ] Pagination support

#### 2.3 Individual Article Pages
- [ ] Create `app/[lang]/blog/[slug]/page.tsx`
- [ ] Render Markdown content
- [ ] Author, date, reading time metadata
- [ ] Related colors section (if applicable)
- [ ] Related articles section
- [ ] Social sharing buttons
- [ ] Breadcrumb navigation

### Phase 3: SEO & Translations (1-2 days)

#### 3.1 SEO Metadata
- [ ] Add `generateMetadata()` to all blog pages
- [ ] Implement JSON-LD for Article schema
- [ ] Add hreflang tags for EN/DE/PL versions
- [ ] Open Graph tags for social sharing

#### 3.2 i18n Translations
- [ ] Add blog UI strings to `en.json`, `de.json`, `pl.json`
- [ ] Route translations in `lib/i18n/config.ts`
  - `category` → `kategorie` (DE) → `kategoria` (PL)

### Phase 4: Content & Polish (2-3 days)

#### 4.1 Sample Articles
- [ ] Create 2-3 sample articles per category (10-15 total)
- [ ] Ensure all translations are complete

#### 4.2 Navigation & UI
- [ ] Add "Blog" link to Navigation component
- [ ] Add blog preview to homepage (optional)
- [ ] Style blog components with Tailwind

#### 4.3 Static Generation
- [ ] Implement `generateStaticParams()` for all blog routes
- [ ] Add blog pages to sitemap

## Component Design

### BlogCard Component
```tsx
// Used in listings
<BlogCard
  article={article}
  lang={lang}
  showCategory={true}
  showExcerpt={true}
/>
```

### ArticleContent Component
```tsx
// Renders markdown with styled prose
<ArticleContent
  content={article.content}
  lang={lang}
/>
```

### CategoryBadge Component
```tsx
<CategoryBadge category="color-psychology" lang={lang} />
```

### RelatedColors Component
```tsx
// Shows color swatches linked to color pages
<RelatedColors colorIds={article.relatedColors} lang={lang} />
```

## SEO Considerations

### Article Page Meta Tags
```html
<title>{title} | Muro Blog</title>
<meta name="description" content="{metaDescription}" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="{publishedAt}" />
<meta property="article:author" content="Muro Team" />
<meta property="article:section" content="{categoryName}" />
```

### JSON-LD Article Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How Colors Affect Your Mood",
  "author": {
    "@type": "Organization",
    "name": "Muro"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Muro",
    "url": "https://usemuro.com"
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-20",
  "mainEntityOfPage": "https://usemuro.com/en/blog/how-colors-affect-mood",
  "articleSection": "Color Psychology",
  "wordCount": 1500
}
```

## Estimated Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| Phase 1 | Foundation (types, loader, categories) | 2-3 days |
| Phase 2 | Routes & Pages | 2-3 days |
| Phase 3 | SEO & Translations | 1-2 days |
| Phase 4 | Content & Polish | 2-3 days |
| **Total** | | **7-11 days** |

## Dependencies

### NPM Packages to Add
- `marked` or `react-markdown` - Markdown rendering
- `gray-matter` (optional) - If using frontmatter in markdown files
- `reading-time` - Calculate reading time from content

### Existing Infrastructure to Leverage
- `lib/i18n/` - Translation system
- `lib/seo/metadata.ts` - SEO utilities
- Color database - For related colors feature
- Tailwind CSS - Styling

## Content Strategy Suggestions

### Initial Articles (10-15 total)

**Color Psychology (3 articles)**
1. "How Colors Affect Your Mood and Well-being"
2. "The Psychology of Blue: Calming Spaces"
3. "Warm vs Cool Colors: Which is Right for Your Home?"

**DIY Guides (3 articles)**
1. "Painting Walls Like a Pro: Complete Guide"
2. "How to Choose the Right Paint Finish"
3. "Common Painting Mistakes and How to Avoid Them"

**Professional Resources (2 articles)**
1. "Pricing Interior Painting Jobs: A Guide for Contractors"
2. "Color Consultation Tips for Design Professionals"

**Room-Specific Guides (3 articles)**
1. "Best Colors for Bedrooms: Sleep-Inducing Palettes"
2. "Kitchen Color Trends 2026"
3. "Bathroom Paint: Choosing Moisture-Resistant Options"

**Technical Articles (2 articles)**
1. "Understanding LRV (Light Reflectance Value)"
2. "RGB, Hex, and HSL: Color Codes Explained"

## Notes

- All articles should include CTAs to download the Muro app
- Link to relevant color pages when mentioning specific colors
- Each article should target 1-3 SEO keywords
- Consider adding author profiles later (V2)
- Future: CMS integration (Contentful, Sanity) for non-technical editing
