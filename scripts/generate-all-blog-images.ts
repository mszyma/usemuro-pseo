#!/usr/bin/env npx ts-node

/**
 * Generate images for all blog articles that are missing hero images
 *
 * Usage:
 *   npx ts-node scripts/generate-all-blog-images.ts
 *   npx ts-node scripts/generate-all-blog-images.ts --dry-run
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { execSync } from 'child_process';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog', 'en');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'blog', 'images');

interface ArticleInfo {
  slug: string;
  title: string;
  category: string;
  hasImage: boolean;
  imagePath: string;
}

function getAllArticles(): ArticleInfo[] {
  const articles: ArticleInfo[] = [];

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    return articles;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const slug = file.replace('.md', '');
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    const expectedImagePath = path.join(IMAGES_DIR, `${slug}-hero.jpg`);
    const hasImage = fs.existsSync(expectedImagePath);

    articles.push({
      slug,
      title: data.title || slug,
      category: data.category || 'unknown',
      hasImage,
      imagePath: expectedImagePath,
    });
  }

  return articles;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log('\n🖼️  Blog Image Generator - Batch Mode');
  console.log('======================================\n');

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No images will be generated\n');
  }

  // Ensure images directory exists
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const articles = getAllArticles();

  if (articles.length === 0) {
    console.log('No articles found.');
    return;
  }

  console.log(`Found ${articles.length} articles:\n`);

  const missingImages: ArticleInfo[] = [];
  const existingImages: ArticleInfo[] = [];

  for (const article of articles) {
    if (article.hasImage) {
      existingImages.push(article);
      console.log(`  ✅ ${article.slug} (has image)`);
    } else {
      missingImages.push(article);
      console.log(`  ❌ ${article.slug} (missing image)`);
    }
  }

  console.log(`\nSummary:`);
  console.log(`  - With images: ${existingImages.length}`);
  console.log(`  - Missing images: ${missingImages.length}`);

  if (missingImages.length === 0) {
    console.log('\n✅ All articles have images!');
    return;
  }

  if (dryRun) {
    console.log('\n📋 Would generate images for:');
    for (const article of missingImages) {
      console.log(`  - ${article.slug}: ${article.title}`);
    }
    console.log('\nRun without --dry-run to generate images.');
    return;
  }

  console.log(`\n🚀 Generating ${missingImages.length} images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const article of missingImages) {
    console.log(`\n📷 [${successCount + failCount + 1}/${missingImages.length}] ${article.title}`);
    console.log(`   Slug: ${article.slug}`);

    try {
      // Call the single image generator
      execSync(
        `npx ts-node scripts/generate-blog-image.ts --slug "${article.slug}"`,
        { stdio: 'inherit' }
      );
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed to generate image for ${article.slug}`);
      failCount++;
    }

    // Rate limiting - wait between requests
    if (successCount + failCount < missingImages.length) {
      console.log('   Waiting 2 seconds before next image...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n================================`);
  console.log(`✅ Generated: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`================================\n`);

  if (failCount > 0) {
    console.log('For failed images, you can:');
    console.log('1. Retry with: npx ts-node scripts/generate-all-blog-images.ts');
    console.log('2. Generate manually with Midjourney/DALL-E');
    console.log('3. Generate individually: npx ts-node scripts/generate-blog-image.ts --slug "article-slug"');
  }
}

main();
