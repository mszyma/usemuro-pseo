import { BlogPost, Author, HowToStep, FAQItem } from './types';
import { Language } from '../i18n/config';

const SITE_URL = 'https://usemuro.com';
const SITE_NAME = 'Muro';
const SITE_TAGLINE = 'See it before you paint it';
const SITE_DESCRIPTION = 'See exactly how any paint color will look on your walls before you buy a single can';
const SUPPORT_EMAIL = 'mariusz@szyma.co';

// Social profiles - add more as they become available
const SOCIAL_PROFILES = {
  // twitter: 'https://twitter.com/usemuro',
  // instagram: 'https://instagram.com/usemuro',
  // linkedin: 'https://linkedin.com/company/usemuro',
};

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(
  post: BlogPost,
  author: Author,
  lang: Language
): object {
  const url = `${SITE_URL}/${lang}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image
      ? `${SITE_URL}${post.frontmatter.image}`
      : `${SITE_URL}/og-image.jpg`,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated || post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.twitter && { url: `https://twitter.com/${author.twitter}` }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'pl-PL',
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.tags.join(', '),
  };
}

/**
 * Generate HowTo schema for tutorial articles
 */
export function generateHowToSchema(
  post: BlogPost,
  steps: HowToStep[],
  totalTime?: string
): object {
  const url = `${SITE_URL}/${post.lang}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image
      ? `${SITE_URL}${post.frontmatter.image}`
      : undefined,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}${step.image}`,
        },
      }),
    })),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebsiteSchema(lang: Language): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${lang}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${lang}/colors?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization schema
 * Used on homepage and can be included on blog posts
 */
export function generateOrganizationSchema(pageUrl?: string): object {
  const socialProfiles = Object.values(SOCIAL_PROFILES).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Muro - Wall Color Visualizer',
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    url: pageUrl || SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    ...(socialProfiles.length > 0 && { sameAs: socialProfiles }),
    contactPoint: {
      '@type': 'ContactPoint',
      email: SUPPORT_EMAIL,
      contactType: 'customer support',
      url: `${SITE_URL}/support`,
      availableLanguage: ['English', 'German', 'Polish'],
    },
  };
}

/**
 * Generate SoftwareApplication schema for the app
 */
export function generateAppSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Muro',
    alternateName: 'Muro - Wall Color Visualizer',
    description: SITE_DESCRIPTION,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free download with in-app subscription',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generate BlogPosting schema (alternative to Article)
 * Follows the format shown in schema.org BlogPosting examples
 */
export function generateBlogPostingSchema(
  post: BlogPost,
  author: Author,
  lang: Language
): object {
  const url = `${SITE_URL}/${lang}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image
      ? `${SITE_URL}${post.frontmatter.image}`
      : `${SITE_URL}/og-image.jpg`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated || post.frontmatter.date,
    inLanguage: lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'pl-PL',
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.tags.join(', '),
  };
}

/**
 * Generate all schemas for a blog post page
 * Returns an array of schema objects to be rendered as separate script tags
 */
export function generateBlogPageSchemas(
  post: BlogPost,
  author: Author,
  lang: Language,
  breadcrumbItems: { name: string; url: string }[]
): object[] {
  const url = `${SITE_URL}/${lang}/blog/${post.slug}`;

  return [
    generateOrganizationSchema(url),
    generateBlogPostingSchema(post, author, lang),
    generateBreadcrumbSchema(breadcrumbItems),
  ];
}

/**
 * Generate all schemas for the homepage
 * Returns an array of schema objects
 */
export function generateHomepageSchemas(lang: Language): object[] {
  return [
    generateOrganizationSchema(),
    generateWebsiteSchema(lang),
    generateAppSchema(),
  ];
}
