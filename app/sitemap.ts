import { MetadataRoute } from 'next';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/i18n/config';
import { getAllBlogPosts } from '@/lib/blog/loader';

// Required for static export
export const dynamic = 'force-static';

const BASE_URL = 'https://usemuro.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each language
  for (const lang of SUPPORTED_LANGUAGES) {
    // Homepage
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Blog index
    entries.push({
      url: `${BASE_URL}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // FAQ
    entries.push({
      url: `${BASE_URL}/${lang}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Legal
    entries.push({
      url: `${BASE_URL}/${lang}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    });

    // Blog articles
    const posts = await getAllBlogPosts(lang as Language);
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    // Blog categories
    const categories = ['color-psychology', 'diy-guides', 'pro-resources', 'room-guides', 'technical', 'trends'];
    for (const category of categories) {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
