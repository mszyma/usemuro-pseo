#!/usr/bin/env npx ts-node

/**
 * Blog Image Generator using Gemini API
 *
 * Usage:
 *   npx ts-node scripts/generate-blog-image.ts --slug "article-slug"
 *   npx ts-node scripts/generate-blog-image.ts --slug "article-slug" --prompt "Custom prompt"
 *   npx ts-node scripts/generate-blog-image.ts --slug "article-slug" --type inline --section "Section Name"
 *
 * Environment:
 *   GEMINI_API_KEY - Your Gemini API key
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Use Gemini 3 Pro Image Preview for image generation (same as other scripts)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent';

// Image specifications by type
const IMAGE_SPECS = {
  hero: {
    width: 1200,
    height: 675,  // 16:9 aspect ratio
    aspectRatio: '16:9',
  },
  inline: {
    width: 1200,
    height: 900,  // 4:3 aspect ratio
    aspectRatio: '4:3',
  },
};

type ImageType = 'hero' | 'inline';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'blog', 'images');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog', 'en');

// Default prompts based on category
const CATEGORY_PROMPTS: Record<string, string> = {
  'color-psychology': 'Modern interior room with beautiful paint colors, natural lighting through windows, cozy and inviting atmosphere, editorial photography style, warm tones',
  'diy-guides': 'Person painting a wall with roller, paint supplies nearby, bright natural light, home improvement scene, editorial lifestyle photography',
  'pro-resources': 'Professional painter at work, clean modern interior, paint samples and tools, business-like atmosphere, documentary photography style',
  'room-guides': 'Beautiful interior room design, cohesive color scheme, natural daylight, interior design magazine style photography',
  'technical': 'Close-up of paint swatches and color samples, technical but aesthetic arrangement, soft lighting, product photography style',
  'trends': 'Trendy modern interior with current design elements, bold color choices, Instagram-worthy aesthetic, lifestyle photography',
};

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
};

interface ArticleMeta {
  title: string;
  description: string;
  category: string;
  slug: string;
}

async function getArticleMeta(slug: string): Promise<ArticleMeta | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`Article not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);

  return {
    title: data.title || slug,
    description: data.description || '',
    category: data.category || 'room-guides',
    slug,
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

function generatePromptForHero(meta: ArticleMeta, customPrompt?: string): string {
  if (customPrompt) {
    return `${customPrompt}. High quality, 16:9 aspect ratio, no text or watermarks, photorealistic.`;
  }

  const basePrompt = CATEGORY_PROMPTS[meta.category] || CATEGORY_PROMPTS['room-guides'];

  // Try to enhance based on title keywords
  const titleEnhancement = enhancePromptFromKeywords(meta.title);
  const prompt = titleEnhancement || basePrompt;

  return `Professional interior design photography. ${prompt}. Natural lighting, editorial style, 16:9 aspect ratio. High quality, photorealistic, no text or watermarks.`;
}

function generatePromptForInline(sectionTitle: string, articleTitle: string): string {
  // Try to get enhancement from section title first
  let enhancement = enhancePromptFromKeywords(sectionTitle);

  // Fall back to article title
  if (!enhancement) {
    enhancement = enhancePromptFromKeywords(articleTitle);
  }

  // Default fallback
  if (!enhancement) {
    enhancement = 'interior design scene with beautiful paint colors';
  }

  return `Interior design detail photograph. ${enhancement}. Natural lighting, lifestyle photography style, 4:3 aspect ratio. Clean composition, no text, photorealistic quality.`;
}

async function generateImageWithGemini(prompt: string, outputPath: string, imageType: ImageType): Promise<boolean> {
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable not set');
    console.log('\nTo set up:');
    console.log('1. Get API key from https://makersuite.google.com/app/apikey');
    console.log('2. Create .env.local with: GEMINI_API_KEY=your_key');
    console.log('3. Or export: export GEMINI_API_KEY=your_key');
    return false;
  }

  const specs = IMAGE_SPECS[imageType];
  console.log(`Generating ${imageType} image (${specs.aspectRatio})...`);
  console.log(`Prompt: "${prompt.substring(0, 100)}..."`);

  try {
    // Use Gemini 3 Pro Image Preview (same format as Python scripts)
    const imageSize = specs.aspectRatio === '16:9' ? '1792x1024' : '1280x960';

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a photorealistic image for a blog article. ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          topK: 32,
          maxOutputTokens: 8192,
          image_config: {
            image_size: imageSize
          }
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`API Error: ${response.status} - ${error}`);

      // For now, create a placeholder message
      console.log('\n⚠️  Image generation failed.');
      console.log('   Creating placeholder for: ' + outputPath);
      return false;
    }

    const data = await response.json();

    // Extract image from Gemini response format (camelCase: inlineData)
    if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
      const imageData = data.candidates[0].content.parts[0].inlineData.data;
      const buffer = Buffer.from(imageData, 'base64');

      // Ensure output directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, buffer);

      console.log(`✅ Image saved to: ${outputPath}`);
      return true;
    }

    // Try alternative response structure (iterate through parts)
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, 'base64');
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Image saved to: ${outputPath}`);
          return true;
        }
      }
    }

    console.error('Unexpected API response structure:', JSON.stringify(data, null, 2).substring(0, 500));
    return false;

  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
}

function getOutputPath(slug: string, imageType: ImageType, sectionIndex?: number): string {
  if (imageType === 'hero') {
    return path.join(OUTPUT_DIR, `${slug}-hero.jpg`);
  } else {
    return path.join(OUTPUT_DIR, slug, `section-${sectionIndex || 1}.jpg`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf('--slug');
  const promptIndex = args.indexOf('--prompt');
  const typeIndex = args.indexOf('--type');
  const sectionIndex = args.indexOf('--section');
  const sectionNumIndex = args.indexOf('--section-num');

  if (slugIndex === -1 || !args[slugIndex + 1]) {
    console.log('Usage: npx ts-node scripts/generate-blog-image.ts --slug "article-slug" [options]');
    console.log('\nOptions:');
    console.log('  --slug "slug"        Article slug (required)');
    console.log('  --prompt "text"      Custom prompt for image generation');
    console.log('  --type hero|inline   Image type (default: hero)');
    console.log('  --section "title"    Section title for inline image context');
    console.log('  --section-num N      Section number for output filename (default: 1)');
    console.log('\nExamples:');
    console.log('  npx ts-node scripts/generate-blog-image.ts --slug "what-colors-make-small-room-look-bigger"');
    console.log('  npx ts-node scripts/generate-blog-image.ts --slug "best-kitchen-colors" --type inline --section "Best White Colors"');
    console.log('  npx ts-node scripts/generate-blog-image.ts --slug "article" --prompt "Modern white kitchen with natural light"');
    process.exit(1);
  }

  const slug = args[slugIndex + 1];
  const customPrompt = promptIndex !== -1 ? args[promptIndex + 1] : undefined;
  const imageType: ImageType = (typeIndex !== -1 && args[typeIndex + 1] === 'inline') ? 'inline' : 'hero';
  const sectionTitle = sectionIndex !== -1 ? args[sectionIndex + 1] : undefined;
  const sectionNum = sectionNumIndex !== -1 ? parseInt(args[sectionNumIndex + 1], 10) : 1;

  console.log(`\n📷 Blog Image Generator`);
  console.log(`========================\n`);

  // Get article metadata
  const meta = await getArticleMeta(slug);
  if (!meta) {
    process.exit(1);
  }

  console.log(`Article: ${meta.title}`);
  console.log(`Category: ${meta.category}`);
  console.log(`Type: ${imageType}`);

  // Generate prompt based on type
  let prompt: string;
  if (customPrompt) {
    const specs = IMAGE_SPECS[imageType];
    prompt = `${customPrompt}. High quality, ${specs.aspectRatio} aspect ratio, no text or watermarks, photorealistic.`;
  } else if (imageType === 'inline' && sectionTitle) {
    prompt = generatePromptForInline(sectionTitle, meta.title);
  } else {
    prompt = generatePromptForHero(meta);
  }

  console.log(`\nPrompt: ${prompt}\n`);

  // Generate image
  const outputPath = getOutputPath(slug, imageType, imageType === 'inline' ? sectionNum : undefined);
  const success = await generateImageWithGemini(prompt, outputPath, imageType);

  if (success) {
    if (imageType === 'hero') {
      console.log(`\n✅ Done! Update your article frontmatter:`);
      console.log(`   image: "/blog/images/${slug}-hero.jpg"`);
    } else {
      console.log(`\n✅ Done! Add to your article:`);
      console.log(`   ![Alt text](/blog/images/${slug}/section-${sectionNum}.jpg)`);
    }
  } else {
    console.log(`\n⚠️  Image generation failed. You can:`);
    console.log(`   1. Set GEMINI_API_KEY and retry`);
    if (imageType === 'hero') {
      console.log(`   2. Manually create an image at: public/blog/images/${slug}-hero.jpg`);
    } else {
      console.log(`   2. Manually create an image at: public/blog/images/${slug}/section-${sectionNum}.jpg`);
    }
    console.log(`   3. Use a service like Midjourney or DALL-E`);
  }
}

// Export functions for use by generate-article-images.ts
export {
  getArticleMeta,
  generatePromptForHero,
  generatePromptForInline,
  generateImageWithGemini,
  getOutputPath,
  IMAGE_SPECS,
  SECTION_KEYWORD_PROMPTS,
  type ImageType,
  type ArticleMeta,
};

main();
