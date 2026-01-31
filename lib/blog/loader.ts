import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Language, SUPPORTED_LANGUAGES } from '../i18n/config';
import { Author, Category, BlogPost, BlogPostPreview, BlogPostFrontmatter, TOCItem } from './types';
import { extractTOC } from './toc';
import { remarkColorSwatches } from './remark-color-swatches';

// In-memory cache for build performance
const POST_CACHE = new Map<string, BlogPost>();
const POSTS_LIST_CACHE = new Map<string, BlogPostPreview[]>();
let AUTHORS_CACHE: Author[] | null = null;
let CATEGORIES_CACHE: Category[] | null = null;

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const DATA_DIR = path.join(process.cwd(), 'data', 'blog');

/**
 * Get all authors from authors.json
 */
export function getAuthors(): Author[] {
  if (AUTHORS_CACHE) return AUTHORS_CACHE;

  const authorsPath = path.join(DATA_DIR, 'authors.json');
  if (!fs.existsSync(authorsPath)) {
    return [];
  }

  const data = JSON.parse(fs.readFileSync(authorsPath, 'utf-8'));
  AUTHORS_CACHE = data.authors;
  return AUTHORS_CACHE!;
}

/**
 * Get author by ID
 */
export function getAuthorById(id: string): Author | null {
  const authors = getAuthors();
  return authors.find(a => a.id === id) || null;
}

/**
 * Get all categories from categories.json
 */
export function getCategories(): Category[] {
  if (CATEGORIES_CACHE) return CATEGORIES_CACHE;

  const categoriesPath = path.join(DATA_DIR, 'categories.json');
  if (!fs.existsSync(categoriesPath)) {
    return [];
  }

  const data = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  CATEGORIES_CACHE = data.categories;
  return CATEGORIES_CACHE!;
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): Category | null {
  const categories = getCategories();
  return categories.find(c => c.id === id) || null;
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | null {
  const categories = getCategories();
  return categories.find(c => c.slug === slug) || null;
}

/**
 * Calculate reading time from markdown content
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Extract excerpt from content
 */
function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s/g, '') // headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/`([^`]+)`/g, '$1') // code
    .replace(/\n/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Get a single blog post by slug and language
 */
export async function getBlogPost(slug: string, lang: Language): Promise<BlogPost | null> {
  const cacheKey = `${lang}:${slug}`;
  if (POST_CACHE.has(cacheKey)) {
    return POST_CACHE.get(cacheKey)!;
  }

  const filePath = path.join(CONTENT_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const frontmatter = data as BlogPostFrontmatter;

  // Skip drafts in production
  if (frontmatter.draft && process.env.NODE_ENV === 'production') {
    return null;
  }

  // Process markdown to HTML with color swatches
  const processedContent = await remark()
    .use(gfm)
    .use(remarkColorSwatches, { lang })
    .use(html, { sanitize: false })
    .process(content);

  const htmlContent = processedContent.toString();
  const toc = extractTOC(content);
  const readingTime = frontmatter.readingTime || calculateReadingTime(content);
  const excerpt = extractExcerpt(content);

  const post: BlogPost = {
    slug,
    lang,
    frontmatter,
    content,
    htmlContent,
    toc,
    readingTime,
    excerpt,
  };

  POST_CACHE.set(cacheKey, post);
  return post;
}

/**
 * Get all blog posts for a language
 */
export async function getAllBlogPosts(lang: Language): Promise<BlogPostPreview[]> {
  if (POSTS_LIST_CACHE.has(lang)) {
    return POSTS_LIST_CACHE.get(lang)!;
  }

  const langDir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(langDir)) {
    return [];
  }

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
  const posts: BlogPostPreview[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const post = await getBlogPost(slug, lang);

    if (post) {
      const author = getAuthorById(post.frontmatter.author);
      const category = getCategoryById(post.frontmatter.category);

      if (author && category) {
        posts.push({
          slug,
          lang,
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          date: post.frontmatter.date,
          author,
          category,
          tags: post.frontmatter.tags,
          image: post.frontmatter.image,
          imageAlt: post.frontmatter.imageAlt,
          readingTime: post.readingTime,
          featured: post.frontmatter.featured,
        });
      }
    }
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  POSTS_LIST_CACHE.set(lang, posts);
  return posts;
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categorySlug: string, lang: Language): Promise<BlogPostPreview[]> {
  const allPosts = await getAllBlogPosts(lang);
  return allPosts.filter(p => p.category.slug === categorySlug);
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(lang: Language, limit: number = 3): Promise<BlogPostPreview[]> {
  const allPosts = await getAllBlogPosts(lang);
  return allPosts.filter(p => p.featured).slice(0, limit);
}

/**
 * Get related posts based on category and tags
 */
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  lang: Language,
  limit: number = 3
): Promise<BlogPostPreview[]> {
  const allPosts = await getAllBlogPosts(lang);

  const scored = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(post => {
      let score = 0;
      // Same category = 2 points
      if (post.category.id === category) score += 2;
      // Shared tags = 1 point each
      const sharedTags = post.tags.filter(t => tags.includes(t));
      score += sharedTags.length;
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ post }) => post);
}

/**
 * Get all slugs for static generation
 */
export function getAllBlogSlugs(): { lang: Language; slug: string }[] {
  const slugs: { lang: Language; slug: string }[] = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    const langDir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(langDir)) continue;

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      slugs.push({
        lang,
        slug: file.replace(/\.md$/, ''),
      });
    }
  }

  return slugs;
}

/**
 * Get all category slugs for static generation
 */
export function getAllCategorySlugs(): { lang: Language; category: string }[] {
  const categories = getCategories();
  const slugs: { lang: Language; category: string }[] = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    for (const category of categories) {
      slugs.push({
        lang,
        category: category.slug,
      });
    }
  }

  return slugs;
}

/**
 * Get translated slugs for a blog post by finding posts that share the same image.
 * Returns a mapping of language code to slug for all available translations.
 */
export async function getTranslatedSlugs(
  currentSlug: string,
  currentLang: Language
): Promise<Record<Language, string>> {
  const currentPost = await getBlogPost(currentSlug, currentLang);
  if (!currentPost || !currentPost.frontmatter.image) {
    // No image to match on, return current slug for all languages
    return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
      acc[lang] = currentSlug;
      return acc;
    }, {} as Record<Language, string>);
  }

  const currentImage = currentPost.frontmatter.image;
  const translations: Record<Language, string> = {} as Record<Language, string>;

  // Find posts in each language that share the same image
  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang === currentLang) {
      translations[lang] = currentSlug;
      continue;
    }

    const langDir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(langDir)) {
      translations[lang] = currentSlug; // Fallback
      continue;
    }

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
    let found = false;

    for (const file of files) {
      const filePath = path.join(langDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      if (data.image === currentImage) {
        translations[lang] = file.replace(/\.md$/, '');
        found = true;
        break;
      }
    }

    if (!found) {
      translations[lang] = currentSlug; // Fallback to current slug
    }
  }

  return translations;
}
