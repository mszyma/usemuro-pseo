import { Author } from '@/lib/blog/types';
import { Language } from '@/lib/i18n/config';
import styles from '../blog.module.css';

interface AuthorCardProps {
  author: Author;
  lang: Language;
  byLabel: string;
}

export default function AuthorCard({ author, lang, byLabel }: AuthorCardProps) {
  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={styles.authorCard}>
      <div className={styles.authorAvatar}>
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} />
        ) : (
          initials
        )}
      </div>
      <div className={styles.authorInfo}>
        <h4>
          {byLabel} {author.name}
        </h4>
        <p>{author.role[lang]}</p>
      </div>
    </div>
  );
}
