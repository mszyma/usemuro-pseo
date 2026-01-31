'use client';

import Link from 'next/link';
import { BlogPostPreview } from '@/lib/blog/types';
import { Language } from '@/lib/i18n/config';
import styles from '../blog.module.css';

interface BlogCardProps {
  post: BlogPostPreview;
  lang: Language;
  dict: {
    minRead: string;
    readMore: string;
    featuredPost: string;
  };
  featured?: boolean;
}

export default function BlogCard({ post, lang, dict, featured }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'pl-PL',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const categoryName = post.category.name[lang];

  if (featured) {
    return (
      <article className={`${styles.blogCard} ${styles.featuredCard}`}>
        <div className={styles.blogCardImage}>
          {post.image ? (
            <img src={post.image} alt={post.imageAlt || post.title} />
          ) : (
            <div className={styles.blogCardImagePlaceholder}>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.blogCardContent}>
          <div className={styles.featuredBadge}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {dict.featuredPost}
          </div>
          <div className={styles.blogCardMeta}>
            <span className={styles.blogCardCategory}>{categoryName}</span>
            <span className={styles.blogCardDate}>{formattedDate}</span>
          </div>
          <h2 className={styles.blogCardTitle}>
            <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className={styles.blogCardExcerpt}>{post.description}</p>
          <div className={styles.blogCardFooter}>
            <span className={styles.blogCardReadTime}>
              {post.readingTime} {dict.minRead}
            </span>
            <Link href={`/${lang}/blog/${post.slug}`} className={styles.blogCardLink}>
              {dict.readMore}
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.blogCard}>
      <div className={styles.blogCardImage}>
        {post.image ? (
          <img src={post.image} alt={post.imageAlt || post.title} />
        ) : (
          <div className={styles.blogCardImagePlaceholder}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.blogCardContent}>
        <div className={styles.blogCardMeta}>
          <span className={styles.blogCardCategory}>{categoryName}</span>
          <span className={styles.blogCardDate}>{formattedDate}</span>
        </div>
        <h3 className={styles.blogCardTitle}>
          <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className={styles.blogCardExcerpt}>{post.description}</p>
        <div className={styles.blogCardFooter}>
          <span className={styles.blogCardReadTime}>
            {post.readingTime} {dict.minRead}
          </span>
          <Link href={`/${lang}/blog/${post.slug}`} className={styles.blogCardLink}>
            {dict.readMore}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
