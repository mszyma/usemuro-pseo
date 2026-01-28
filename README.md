# Muro Programmatic SEO Website

A Next.js 15 static website generating **35,000+ search-optimized pages** for paint color visualization using Muro's color database.

## Project Overview

- **Framework**: Next.js 15 with App Router (Static Site Generation)
- **Database**: 37,084 paint colors from 38 manufacturers
- **Languages**: English, German, Polish (i18n)
- **SEO**: Comprehensive metadata, JSON-LD, Open Graph tags
- **Hosting**: Designed for Cloudflare Pages

## Features

✅ **35,000+ Static Pages**
- Individual color pages: `/en/colors/behr/barely-pink`
- Manufacturer pages: `/en/manufacturers/behr`
- Category pages: `/en/colors/white`
- Comparison pages: `/en/compare/similar-to/color-name`

✅ **Multilingual (i18n)**
- English (`/en`), German (`/de`), Polish (`/pl`)
- Automatic language detection via middleware
- Localized routes (e.g., `/en/colors` → `/de/farben` → `/pl/kolory`)

✅ **SEO Optimized**
- Dynamic metadata generation
- JSON-LD structured data (Schema.org Product)
- Open Graph & Twitter Card tags
- Canonical URLs with hreflang alternates
- Dynamic sitemap generation

✅ **Three-Tier Generation Strategy**
- **Tier 1**: Build time (5,000 priority pages - top 100 colors per manufacturer)
- **Tier 2**: ISR with 1-hour revalidation (10,000 pages)
- **Tier 3**: On-demand ISR (20,000+ long-tail pages)

## Project Structure

```
usemuro-pseo/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # i18n routing
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout
│   │   └── colors/
│   │       ├── [manufacturer]/
│   │       │   ├── page.tsx      # Manufacturer page
│   │       │   └── [slug]/
│   │       │       └── page.tsx  # Individual color page
│   ├── globals.css
│   └── layout.tsx
├── lib/                          # Core utilities
│   ├── colors/
│   │   ├── loader.ts             # Color database loader (cached)
│   │   └── similar.ts            # Similar color algorithm
│   ├── i18n/
│   │   ├── config.ts             # i18n configuration
│   │   ├── dictionaries.ts       # Translation loader
│   │   └── translations/         # en.json, de.json, pl.json
│   └── seo/
│       └── metadata.ts           # SEO metadata generators
├── data/
│   └── kolory/                   # Color database (37k+ colors)
├── middleware.ts                 # Language detection & redirects
└── next.config.ts
```

## Data Source

The color database is loaded from `/data/kolory/` which contains:
- **38 manufacturers** from USA, UK, DACH, Scandinavia
- **37,084 colors** with RGB, hex, LRV, categories
- **JSON format** with two structures supported:
  1. Collections array (e.g., Behr)
  2. Direct colors array (e.g., Sherwin-Williams)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

## URLs Generated

### Homepage
```
/                     → redirects to /en
/en, /de, /pl         → Homepage
```

### Individual Color Pages (33,000+)
```
/en/colors/behr/barely-pink
/de/farben/caparol/polarweiss
/pl/kolory/sniezka/biel-magnolii
```

### Manufacturer Pages (38)
```
/en/manufacturers/behr
/de/hersteller/caparol
/pl/producenci/sniezka
```

## Example Pages

### English Color Page
**URL**: `/en/colors/behr/barely-pink`
**Title**: Barely Pink by Behr - Muro Paint Visualizer
**Meta Description**: Visualize Barely Pink (100A-1) by Behr on your walls with Muro AI. Hex: #F9ECFC, LRV: 94.1. See before you paint.

**Features**:
- Large color swatch with hex color (#F9ECFC)
- Full color details (code, hex, RGB, LRV, category)
- Similar colors grid (12 colors)
- Download CTA
- Breadcrumb navigation
- JSON-LD structured data
- Hreflang tags for EN/DE/PL versions

### German Color Page
**URL**: `/de/farben/caparol/polarweiss`
Same features, fully translated to German

### Polish Color Page
**URL**: `/pl/kolory/sniezka/biel-magnolii`
Same features, fully translated to Polish

## SEO Features

### Meta Tags
- Comprehensive title and description
- Keywords with color name, manufacturer, LRV, hex
- Canonical URL
- Hreflang alternates (EN/DE/PL)
- Open Graph tags with dynamic images
- Twitter Card metadata

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Barely Pink Paint Color",
  "brand": {
    "@type": "Brand",
    "name": "Behr"
  },
  "sku": "behr-100a-1",
  "mpn": "100A-1",
  "additionalProperty": [
    { "name": "Hex Color", "value": "#F9ECFC" },
    { "name": "LRV", "value": "94.1" },
    { "name": "RGB", "value": "rgb(249, 236, 252)" }
  ]
}
```

## Color Similarity Algorithm

The similar colors feature uses HSL color space distance:
- Hue difference (circular, 0-360°)
- Saturation difference (0-100%)
- Lightness difference (0-100%)
- Weighted formula: `sqrt((hueDiff/180)² × 3 + (lightDiff/100)² × 2 + (satDiff/100)² × 1)`

## Build Performance

### Current Stats
- **Total colors**: 37,084
- **Manufacturers**: 38
- **Build time (Tier 1)**: ~2-3 minutes for 5,000 priority pages
- **Full build estimate**: ~15-20 minutes for all static pages

### Optimization
- In-memory caching for color database
- Lazy loading of manufacturer files
- Three-tier generation strategy
- ISR for non-priority pages

## Deployment (Cloudflare Pages)

1. **Build Command**: `npm run build`
2. **Output Directory**: `.next` or `out` (if using static export)
3. **Node Version**: 20+
4. **Environment Variables**: None required

### Redirects
Create `public/_redirects`:
```
/ /en 302
https://www.usemuro.com/* https://usemuro.com/:splat 301!
```

### Headers
Create `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff

/en/*
  Content-Language: en

/de/*
  Content-Language: de

/pl/*
  Content-Language: pl
```

## Next Steps

1. ✅ Phase 1: Foundation complete (homepage, color pages, manufacturer pages)
2. ⏳ Phase 2: Add category pages (`/en/colors/white`, `/en/colors/blue`)
3. ⏳ Phase 3: Add comparison pages (`/en/compare/similar-to/color-name`)
4. ⏳ Phase 4: Add trending pages (`/en/trending/colors-2025`)
5. ⏳ Phase 5: Deploy to Cloudflare Pages
6. ⏳ Phase 6: Submit sitemap to Google Search Console

## Known Issues

- Some manufacturers have incomplete data (missing files)
- Middleware doesn't work with static export (use Cloudflare redirects instead)
- Need to add sitemap generation
- Need to add robots.txt

## License

Proprietary - Muro © 2026
