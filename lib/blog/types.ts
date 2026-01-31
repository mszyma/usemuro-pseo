import { Language } from '../i18n/config';

export interface Author {
  id: string;
  name: string;
  role: {
    en: string;
    de: string;
    pl: string;
  };
  avatar?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: {
    en: string;
    de: string;
    pl: string;
  };
  description: {
    en: string;
    de: string;
    pl: string;
  };
  icon: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  schema: 'Article' | 'HowTo' | 'FAQPage';
  readingTime?: number;
  featured?: boolean;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  lang: Language;
  frontmatter: BlogPostFrontmatter;
  content: string;
  htmlContent: string;
  toc: TOCItem[];
  readingTime: number;
  excerpt: string;
}

export interface BlogPostPreview {
  slug: string;
  lang: Language;
  title: string;
  description: string;
  date: string;
  author: Author;
  category: Category;
  tags: string[];
  image?: string;
  imageAlt?: string;
  readingTime: number;
  featured?: boolean;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
