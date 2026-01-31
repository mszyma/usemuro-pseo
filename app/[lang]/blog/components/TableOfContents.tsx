'use client';

import { TOCItem } from '@/lib/blog/types';
import styles from '../blog.module.css';

interface TableOfContentsProps {
  items: TOCItem[];
  title: string;
}

export default function TableOfContents({ items, title }: TableOfContentsProps) {
  if (items.length === 0) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.tocWrapper}>
      <h4 className={styles.tocTitle}>{title}</h4>
      <ul className={styles.tocList}>
        {items.map((item) => (
          <li
            key={item.id}
            className={`${styles.tocItem} ${item.level === 3 ? styles.tocItemL3 : ''}`}
          >
            <button
              onClick={() => scrollToSection(item.id)}
              className={styles.tocLink}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
