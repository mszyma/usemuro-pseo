import Link from 'next/link';
import { BlogPostPreview } from '@/lib/blog/types';
import { Language } from '@/lib/i18n/config';
import styles from '../blog.module.css';

interface RelatedPostsProps {
  posts: BlogPostPreview[];
  lang: Language;
  title: string;
  dict: {
    minRead: string;
    readMore: string;
    featuredPost: string;
  };
}

export default function RelatedPosts({ posts, lang, title, dict }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.relatedSection}>
      <h3 className={styles.relatedTitle}>{title}</h3>
      <div className={styles.relatedGrid}>
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString(
            lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'pl-PL',
            { year: 'numeric', month: 'short', day: 'numeric' }
          );
          const categoryName = post.category.name[lang];

          return (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className={styles.relatedCard}
            >
              <span className={styles.relatedCardCategory}>{categoryName}</span>
              <h4 className={styles.relatedCardTitle}>{post.title}</h4>
              <p className={styles.relatedCardExcerpt}>{post.description}</p>
              <span className={styles.relatedCardMeta}>
                {formattedDate} · {post.readingTime} {dict.minRead}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
