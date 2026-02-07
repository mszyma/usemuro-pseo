# Blog Creation Workflow with Images

## Overview

This document describes the complete workflow for creating blog articles with both hero images and inline images. All images are generated using Gemini AI to avoid licensing issues.

---

## Image Strategy

### Image Types

| Type | Aspect Ratio | Dimensions | Purpose |
|------|--------------|------------|---------|
| **Hero** | 16:9 | 1200x675px | Article header, OG/social cards |
| **Inline** | 4:3 | 1200x900px | Section illustrations within content |

### Image Count Formula

- **Hero**: 1 per article (always)
- **Inline**: 1 per ~500 words (calculated automatically)

Example: A 2500-word article = 1 hero + 5 inline images

### File Structure

```
public/blog/images/
├── article-slug-hero.jpg              # Hero image
└── article-slug/                      # Folder for inline images
    ├── section-1.jpg
    ├── section-2.jpg
    └── section-3.jpg
```

---

## Complete Workflow

### Step 1: Write the Article (EN)

Create `/content/blog/en/your-slug.md`:

```markdown
---
title: "Article Title"
description: "SEO meta description (150-160 chars)"
date: "2026-01-30"
author: "mario"
category: "room-guides"
tags: ["relevant", "tags"]
schema: "Article"
featured: false
image: "/blog/images/your-slug-hero.jpg"
imageAlt: "Descriptive alt text for hero image"
---

**Bold direct answer to the title question.** Hook the reader immediately.

Personal story or context that builds trust...

## First Section (H2)

Content of first section...

## Second Section (H2)

Content of second section...

## The Bottom Line

Summary and key takeaways...
```

**Writing Guidelines:**
- Start with **bold direct answer** to the title question
- Include **personal anecdotes** ("I learned this the hard way...")
- Use **conversational tone** ("Here's the thing...", "Trust me")
- Provide **specific data** (LRV values, color codes, prices)
- End with **"The Bottom Line"** summary

### Step 2: Generate All Images

Run the automated image generation:

```bash
npm run generate:article-images -- --slug "your-slug"
```

This script will:
1. Parse the article content
2. Count words and determine inline image count
3. Identify H2 sections for context
4. Generate hero image (16:9)
5. Generate inline images (4:3) for each major section
6. Save to `public/blog/images/`

**Options:**
```bash
# Dry run - show what would be generated without creating files
npm run generate:article-images -- --slug "your-slug" --dry-run

# Only generate hero image
npm run generate:article-images -- --slug "your-slug" --hero-only

# Only generate inline images (hero already exists)
npm run generate:article-images -- --slug "your-slug" --inline-only
```

### Step 3: Add Inline Images to Markdown

After images are generated, add them to your article at appropriate H2 sections:

```markdown
## First Section (H2)

![Alt text describing the image](/blog/images/your-slug/section-1.jpg)

Content of first section continues...

## Second Section (H2)

More content here...

![Another descriptive alt text](/blog/images/your-slug/section-2.jpg)

Content continues after image...
```

**Image Placement Guidelines:**
- Place image **after the H2 heading** and **before the main content**
- Or place **mid-section** to break up long text blocks
- Don't place images back-to-back
- Ensure alt text is descriptive and includes keywords

### Step 4: Translate to DE and PL

Create translations in:
- `/content/blog/de/your-slug.md`
- `/content/blog/pl/your-slug.md`

**Translation Checklist:**
- [ ] Translate all content (not just frontmatter)
- [ ] Adapt paint brand references:
  - EN: Sherwin-Williams, Benjamin Moore, Behr
  - DE: Caparol, Brillux, Sto, Alpina
  - PL: Śnieżka, Dekoral, Tikkurila, Dulux
- [ ] Translate `imageAlt` in frontmatter
- [ ] Translate inline image alt texts
- [ ] Keep image paths the same (images are shared)
- [ ] Keep LRV values unchanged (universal)
- [ ] Adjust currency if mentioned

**Example translated image reference:**
```markdown
<!-- EN -->
![Bright small bedroom with light cream walls](/blog/images/your-slug/section-1.jpg)

<!-- DE -->
![Helles kleines Schlafzimmer mit hellen cremefarbenen Wänden](/blog/images/your-slug/section-1.jpg)

<!-- PL -->
![Jasna mała sypialnia z jasnokremowymi ścianami](/blog/images/your-slug/section-1.jpg)
```

### Step 5: Verify

```bash
# Run dev server
npm run dev

# Check article at each URL:
# - http://localhost:3000/en/blog/your-slug
# - http://localhost:3000/de/blog/your-slug
# - http://localhost:3000/pl/blog/your-slug

# Build for production to verify
npm run build
```

**Verification Checklist:**
- [ ] Hero image displays correctly
- [ ] All inline images load
- [ ] TOC generates with all H2 sections
- [ ] Language switcher works
- [ ] Alt texts are visible (hover or screen reader)
- [ ] Build completes without errors

---

## Gemini AI Prompts

### Hero Image Prompt Template

```
Professional interior design photography. {scene_based_on_title}.
Natural lighting, editorial style, 16:9 aspect ratio.
High quality, photorealistic, no text or watermarks.
```

### Inline Image Prompt Template

```
Interior design detail photograph. {section_specific_context}.
Natural lighting, lifestyle photography style, 4:3 aspect ratio.
Clean composition, no text, photorealistic quality.
```

### Keyword to Prompt Mapping

The image generation script automatically enhances prompts based on keywords found in section headings:

| Keyword in H2 | Prompt Enhancement |
|---------------|-------------------|
| "colors", "palette", "color" | "paint swatches and color samples arranged aesthetically" |
| "LRV", "light reflectance" | "room with natural light showing paint reflectance on walls" |
| "kitchen" | "modern kitchen interior with freshly painted cabinets" |
| "bedroom" | "cozy bedroom with calming painted wall colors" |
| "bathroom" | "clean modern bathroom with fresh wall paint" |
| "living room" | "inviting living room with coordinated wall colors" |
| "office", "workspace" | "productive home office with professional wall colors" |
| "avoid", "mistakes", "don't" | "split view showing good vs bad color choice" |
| "tips", "how to", "guide" | "person thoughtfully examining paint samples" |
| "ceiling" | "room showing ceiling and wall paint relationship" |
| "trim", "molding" | "close-up of painted trim and molding details" |
| "flow", "room to room" | "open floor plan showing color flow between spaces" |
| "north-facing", "natural light" | "room with north-facing windows and warm paint colors" |
| "test", "sample" | "paint samples on wall in different lighting conditions" |
| "white", "undertone" | "multiple white paint swatches showing different undertones" |
| "finish", "matte", "gloss" | "wall showing different paint finishes side by side" |
| "calculator", "measure" | "person measuring room for paint calculation" |
| "trend" | "trendy modern interior with current paint color trends" |

---

## Script Reference

### generate-blog-image.ts

Single image generation:

```bash
# Generate hero image (default)
npm run generate:blog-image -- --slug "article-slug"

# Generate with custom prompt
npm run generate:blog-image -- --slug "article-slug" --prompt "Custom scene description"

# Generate inline image for specific section
npm run generate:blog-image -- --slug "article-slug" --type inline --section "Kitchen Colors"
```

### generate-article-images.ts

Batch generation for entire article:

```bash
# Generate all images (hero + inline)
npm run generate:article-images -- --slug "article-slug"

# Dry run (show what would be generated)
npm run generate:article-images -- --slug "article-slug" --dry-run

# Hero only
npm run generate:article-images -- --slug "article-slug" --hero-only

# Inline only
npm run generate:article-images -- --slug "article-slug" --inline-only
```

### generate-all-blog-images.ts

Generate hero images for all articles:

```bash
npm run generate:blog-images

# Dry run
npm run generate:blog-images -- --dry-run
```

---

## Environment Setup

Create `.env.local` in the project root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

---

## Troubleshooting

### Images Not Generating

1. Check `GEMINI_API_KEY` is set correctly
2. Verify API key has image generation permissions
3. Try with `--dry-run` first to see what would be generated
4. Check console for specific API error messages

### Images Look Wrong

1. Try a more specific custom prompt
2. Regenerate with `--prompt "detailed scene description"`
3. Generate manually and place in the expected path

### Build Errors

1. Ensure all image paths in Markdown match actual files
2. Check image file extensions are correct (.jpg)
3. Verify frontmatter `image` path is correct

---

## Quick Checklist

### New Article Checklist

- [ ] Write article in `/content/blog/en/slug.md`
- [ ] Run `npm run generate:article-images -- --slug "slug"`
- [ ] Add inline images to Markdown
- [ ] Create DE translation with adapted brands
- [ ] Create PL translation with adapted brands
- [ ] Translate all alt texts
- [ ] Run `npm run dev` and verify visually
- [ ] Run `npm run build` to verify no errors

### Image Checklist Per Article

- [ ] Hero image exists at `/public/blog/images/slug-hero.jpg`
- [ ] Inline images exist at `/public/blog/images/slug/section-N.jpg`
- [ ] Hero alt text in frontmatter is descriptive
- [ ] All inline alt texts are descriptive
- [ ] Alt texts translated in DE/PL versions
- [ ] Images load correctly in browser
