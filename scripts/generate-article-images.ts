#!/usr/bin/env npx ts-node

/**
 * Article Images Generator
 *
 * Analyzes a blog article and generates all needed images:
 * - 1 hero image (16:9)
 * - N inline images (4:3) based on word count (~1 per 500 words)
 *
 * Usage:
 *   npx ts-node scripts/generate-article-images.ts --slug "article-slug"
 *   npx ts-node scripts/generate-article-images.ts --slug "article-slug" --dry-run
 *   npx ts-node scripts/generate-article-images.ts --slug "article-slug" --hero-only
 *   npx ts-node scripts/generate-article-images.ts --slug "article-slug" --inline-only
 *
 * Environment:
 *   GEMINI_API_KEY - Your Gemini API key
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'blog', 'images');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog', 'en');

// Words per inline image
const WORDS_PER_IMAGE = 500;

// Minimum inline images (even for short articles)
const MIN_INLINE_IMAGES = 0;

// Maximum inline images (to avoid too many)
const MAX_INLINE_IMAGES = 8;

// Section keyword to prompt enhancement mapping
const SECTION_KEYWORD_PROMPTS: Record<string, string> = {
  'colors': 'paint swatches and color samples arranged aesthetically',
  'palette': 'paint swatches and color samples arranged aesthetically',
  'color': 'paint swatches and color samples arranged aesthetically',
  'lrv': 'room with natural light showing paint reflectance on walls',
  'light reflectance': 'room with natural light showing paint reflectance on walls',
  'kitchen': 'modern kitchen interior with freshly painted cabinets',
  'bedroom': 'cozy bedroom with calming painted wall colors',
  'bathroom': 'clean modern bathroom with fresh wall paint',
  'living room': 'inviting living room with coordinated wall colors',
  'office': 'productive home office with professional wall colors',
  'workspace': 'productive home office with professional wall colors',
  'avoid': 'split view showing good vs bad color choice',
  'mistakes': 'split view showing good vs bad color choice',
  "don't": 'split view showing good vs bad color choice',
  'tips': 'person thoughtfully examining paint samples',
  'how to': 'person thoughtfully examining paint samples',
  'guide': 'person thoughtfully examining paint samples',
  'ceiling': 'room showing ceiling and wall paint relationship',
  'trim': 'close-up of painted trim and molding details',
  'molding': 'close-up of painted trim and molding details',
  'flow': 'open floor plan showing color flow between spaces',
  'room to room': 'open floor plan showing color flow between spaces',
  'north-facing': 'room with north-facing windows and warm paint colors',
  'natural light': 'room with north-facing windows and warm paint colors',
  'test': 'paint samples on wall in different lighting conditions',
  'sample': 'paint samples on wall in different lighting conditions',
  'white': 'multiple white paint swatches showing different undertones',
  'undertone': 'multiple white paint swatches showing different undertones',
  'finish': 'wall showing different paint finishes side by side',
  'matte': 'wall showing different paint finishes side by side',
  'gloss': 'wall showing different paint finishes side by side',
  'calculator': 'person measuring room for paint calculation',
  'measure': 'person measuring room for paint calculation',
  'trend': 'trendy modern interior with current paint color trends',
  'small room': 'small but well-designed room with light paint colors',
  'bigger': 'small but well-designed room with light paint colors, maximizing space',
  'best': 'beautiful interior with professionally selected paint colors',
  'top': 'beautiful interior with professionally selected paint colors',
  'choose': 'person thoughtfully examining paint samples in natural light',
  'pick': 'person thoughtfully examining paint samples in natural light',
  'bottom line': 'bright and clean interior room with perfect paint colors',
};

// Category-based default prompts
const CATEGORY_PROMPTS: Record<string, string> = {
  'color-psychology': 'Modern interior room with beautiful paint colors, natural lighting through windows, cozy and inviting atmosphere',
  'diy-guides': 'Person painting a wall with roller, paint supplies nearby, bright natural light, home improvement scene',
  'pro-resources': 'Professional painter at work, clean modern interior, paint samples and tools',
  'room-guides': 'Beautiful interior room design, cohesive color scheme, natural daylight',
  'technical': 'Close-up of paint swatches and color samples, technical but aesthetic arrangement',
  'trends': 'Trendy modern interior with current design elements, bold color choices',
};

interface ArticleAnalysis {
  slug: string;
  title: string;
  category: string;
  wordCount: number;
  sections: Section[];
  recommendedInlineCount: number;
}

interface Section {
  title: string;
  level: number;
  position: number;  // Line number
}

interface ImageTask {
  type: 'hero' | 'inline';
  sectionTitle?: string;
  sectionIndex?: number;
  outputPath: string;
  prompt: string;
}

function countWords(text: string): number {
  // Remove Markdown syntax
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '')  // Remove code blocks
    .replace(/`[^`]+`/g, '')         // Remove inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')  // Remove images
    .replace(/\[[^\]]*\]\([^)]*\)/g, '')   // Remove links (keep text would be better)
    .replace(/#{1,6}\s/g, '')        // Remove heading markers
    .replace(/[*_~`]/g, '')          // Remove formatting
    .replace(/\n+/g, ' ')            // Normalize newlines
    .trim();

  return cleanText.split(/\s+/).filter(word => word.length > 0).length;
}

function extractSections(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match H2 headings (## Title)
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      sections.push({
        title: h2Match[1].trim(),
        level: 2,
        position: index + 1,
      });
    }
  });

  return sections;
}

function analyzeArticle(slug: string): ArticleAnalysis | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Article not found: ${filePath}`);
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const wordCount = countWords(content);
  const sections = extractSections(content);

  // Calculate recommended inline images
  let recommendedInlineCount = Math.floor(wordCount / WORDS_PER_IMAGE);
  recommendedInlineCount = Math.max(MIN_INLINE_IMAGES, Math.min(MAX_INLINE_IMAGES, recommendedInlineCount));

  // If we have more sections than recommended images, match to sections
  if (sections.length > 0 && sections.length <= MAX_INLINE_IMAGES) {
    // Use number of sections, but don't exceed what word count suggests (plus some buffer)
    recommendedInlineCount = Math.min(sections.length, Math.ceil(wordCount / WORDS_PER_IMAGE) + 1);
  }

  return {
    slug,
    title: data.title || slug,
    category: data.category || 'room-guides',
    wordCount,
    sections,
    recommendedInlineCount,
  };
}

function enhancePromptFromKeywords(text: string): string | null {
  const lowerText = text.toLowerCase();

  for (const [keyword, enhancement] of Object.entries(SECTION_KEYWORD_PROMPTS)) {
    if (lowerText.includes(keyword)) {
      return enhancement;
    }
  }

  return null;
}

function generatePromptForHero(title: string, category: string): string {
  const basePrompt = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS['room-guides'];
  const titleEnhancement = enhancePromptFromKeywords(title);
  const prompt = titleEnhancement || basePrompt;

  return `Professional interior design photography. ${prompt}. Natural lighting, editorial style, 16:9 aspect ratio. High quality, photorealistic, no text or watermarks.`;
}

function generatePromptForInline(sectionTitle: string, articleTitle: string): string {
  let enhancement = enhancePromptFromKeywords(sectionTitle);

  if (!enhancement) {
    enhancement = enhancePromptFromKeywords(articleTitle);
  }

  if (!enhancement) {
    enhancement = 'interior design scene with beautiful paint colors';
  }

  return `Interior design detail photograph. ${enhancement}. Natural lighting, lifestyle photography style, 4:3 aspect ratio. Clean composition, no text, photorealistic quality.`;
}

function selectSectionsForImages(sections: Section[], count: number): Section[] {
  if (sections.length === 0 || count === 0) return [];
  if (count >= sections.length) return sections;

  // Distribute evenly across sections
  const selected: Section[] = [];
  const step = sections.length / count;

  for (let i = 0; i < count; i++) {
    const index = Math.floor(i * step);
    selected.push(sections[index]);
  }

  return selected;
}

function createImageTasks(analysis: ArticleAnalysis, options: { heroOnly?: boolean; inlineOnly?: boolean }): ImageTask[] {
  const tasks: ImageTask[] = [];

  // Hero image
  if (!options.inlineOnly) {
    const heroPath = path.join(OUTPUT_DIR, `${analysis.slug}-hero.jpg`);
    tasks.push({
      type: 'hero',
      outputPath: heroPath,
      prompt: generatePromptForHero(analysis.title, analysis.category),
    });
  }

  // Inline images
  if (!options.heroOnly && analysis.recommendedInlineCount > 0) {
    const selectedSections = selectSectionsForImages(analysis.sections, analysis.recommendedInlineCount);

    selectedSections.forEach((section, index) => {
      const inlinePath = path.join(OUTPUT_DIR, analysis.slug, `section-${index + 1}.jpg`);
      tasks.push({
        type: 'inline',
        sectionTitle: section.title,
        sectionIndex: index + 1,
        outputPath: inlinePath,
        prompt: generatePromptForInline(section.title, analysis.title),
      });
    });
  }

  return tasks;
}

async function generateImage(task: ImageTask): Promise<boolean> {
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable not set');
    return false;
  }

  const aspectRatio = task.type === 'hero' ? '16:9' : '4:3';
  console.log(`\n  Generating ${task.type} image (${aspectRatio})...`);
  if (task.sectionTitle) {
    console.log(`  Section: "${task.sectionTitle}"`);
  }
  console.log(`  Prompt: "${task.prompt.substring(0, 80)}..."`);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a photorealistic image for a blog article. ${task.prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "image/jpeg"
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`  API Error: ${response.status}`);
      return false;
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
      const imageData = data.candidates[0].content.parts[0].inlineData.data;
      const buffer = Buffer.from(imageData, 'base64');

      fs.mkdirSync(path.dirname(task.outputPath), { recursive: true });
      fs.writeFileSync(task.outputPath, buffer);

      console.log(`  ✅ Saved: ${task.outputPath}`);
      return true;
    }

    console.error('  Unexpected API response structure');
    return false;

  } catch (error) {
    console.error('  Error generating image:', error);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf('--slug');
  const dryRun = args.includes('--dry-run');
  const heroOnly = args.includes('--hero-only');
  const inlineOnly = args.includes('--inline-only');

  if (slugIndex === -1 || !args[slugIndex + 1]) {
    console.log('Usage: npx ts-node scripts/generate-article-images.ts --slug "article-slug" [options]');
    console.log('\nOptions:');
    console.log('  --slug "slug"    Article slug (required)');
    console.log('  --dry-run        Show what would be generated without creating files');
    console.log('  --hero-only      Only generate hero image');
    console.log('  --inline-only    Only generate inline images');
    console.log('\nExamples:');
    console.log('  npx ts-node scripts/generate-article-images.ts --slug "what-colors-make-small-room-look-bigger"');
    console.log('  npx ts-node scripts/generate-article-images.ts --slug "best-kitchen-colors" --dry-run');
    process.exit(1);
  }

  const slug = args[slugIndex + 1];

  console.log('\n🖼️  Article Images Generator');
  console.log('============================\n');

  // Analyze article
  const analysis = analyzeArticle(slug);
  if (!analysis) {
    process.exit(1);
  }

  console.log(`📄 Article: ${analysis.title}`);
  console.log(`📁 Category: ${analysis.category}`);
  console.log(`📊 Word count: ${analysis.wordCount}`);
  console.log(`📑 H2 Sections: ${analysis.sections.length}`);
  console.log(`🖼️  Recommended images: 1 hero + ${analysis.recommendedInlineCount} inline\n`);

  // Show sections
  if (analysis.sections.length > 0) {
    console.log('Sections found:');
    analysis.sections.forEach((section, i) => {
      console.log(`  ${i + 1}. ${section.title}`);
    });
    console.log('');
  }

  // Create image tasks
  const tasks = createImageTasks(analysis, { heroOnly, inlineOnly });

  console.log(`📋 Image tasks (${tasks.length} total):`);
  tasks.forEach((task, i) => {
    if (task.type === 'hero') {
      console.log(`  ${i + 1}. [HERO] ${path.basename(task.outputPath)}`);
    } else {
      console.log(`  ${i + 1}. [INLINE] section-${task.sectionIndex}.jpg - "${task.sectionTitle}"`);
    }
  });

  if (dryRun) {
    console.log('\n🔍 DRY RUN - No images generated');
    console.log('\nTo generate images, run without --dry-run flag.');
    console.log('\nAfter generation, add inline images to your article:');
    tasks.filter(t => t.type === 'inline').forEach(task => {
      console.log(`\n## ${task.sectionTitle}`);
      console.log(`\n![Alt text describing the image](/blog/images/${analysis.slug}/section-${task.sectionIndex}.jpg)`);
    });
    return;
  }

  if (!GEMINI_API_KEY) {
    console.error('\n❌ Error: GEMINI_API_KEY environment variable not set');
    console.log('\nTo set up:');
    console.log('1. Get API key from https://makersuite.google.com/app/apikey');
    console.log('2. Create .env.local with: GEMINI_API_KEY=your_key');
    console.log('3. Or export: export GEMINI_API_KEY=your_key');
    process.exit(1);
  }

  // Generate images
  console.log('\n🚀 Generating images...');

  let successCount = 0;
  let failCount = 0;

  for (const task of tasks) {
    const success = await generateImage(task);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Rate limiting between requests
    if (tasks.indexOf(task) < tasks.length - 1) {
      console.log('  ⏳ Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n============================');
  console.log(`✅ Generated: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('============================\n');

  if (successCount > 0) {
    console.log('📝 Next steps:');
    console.log('1. Update frontmatter if hero was generated:');
    console.log(`   image: "/blog/images/${analysis.slug}-hero.jpg"`);
    console.log('\n2. Add inline images to your article at appropriate H2 sections:');
    tasks.filter(t => t.type === 'inline').forEach(task => {
      console.log(`\n   ## ${task.sectionTitle}`);
      console.log(`   ![Alt text](/blog/images/${analysis.slug}/section-${task.sectionIndex}.jpg)`);
    });
    console.log('\n3. Don\'t forget to translate alt texts in DE/PL versions!');
  }

  if (failCount > 0) {
    console.log('\n⚠️  For failed images, you can:');
    console.log('1. Retry: npm run generate:article-images -- --slug "' + analysis.slug + '"');
    console.log('2. Generate manually with Midjourney/DALL-E');
    console.log('3. Use generate-blog-image.ts with custom prompts');
  }
}

main();
