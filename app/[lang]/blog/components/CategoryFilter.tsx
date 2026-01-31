'use client';

import Link from 'next/link';
import { Category } from '@/lib/blog/types';
import { Language } from '@/lib/i18n/config';
import styles from '../blog.module.css';

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string | null;
  lang: Language;
  allLabel: string;
}

export default function CategoryFilter({
  categories,
  currentCategory,
  lang,
  allLabel,
}: CategoryFilterProps) {
  return (
    <div className={styles.categoryFilter}>
      <Link
        href={`/${lang}/blog`}
        className={`${styles.categoryBtn} ${!currentCategory ? styles.categoryBtnActive : ''}`}
      >
        {allLabel}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${lang}/blog/category/${category.slug}`}
          className={`${styles.categoryBtn} ${
            currentCategory === category.slug ? styles.categoryBtnActive : ''
          }`}
        >
          {category.name[lang]}
        </Link>
      ))}
    </div>
  );
}
