'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from '../landing.module.css';

interface LanguageSwitcherProps {
  currentLang: string;
  /** Optional translation mapping for blog posts: { en: 'english-slug', de: 'german-slug', pl: 'polish-slug' } */
  translations?: Record<string, string>;
}

export default function LanguageSwitcher({ currentLang, translations }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    // Check if we're on a blog post page and have translations
    const blogPostMatch = pathname.match(/^\/(en|de|pl)\/blog\/([^/]+)$/);

    if (blogPostMatch && translations && translations[newLang]) {
      // Navigate to the translated blog post
      router.push(`/${newLang}/blog/${translations[newLang]}`);
    } else {
      // Default behavior: just replace the language prefix
      const newPathname = pathname.replace(/^\/(en|de|pl)/, `/${newLang}`);
      router.push(newPathname);
    }
  };

  return (
    <div className={styles.langSwitcher}>
      <button
        onClick={() => switchLanguage('en')}
        className={`${styles.langBtn} ${currentLang === 'en' ? styles.langBtnActive : ''}`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('de')}
        className={`${styles.langBtn} ${currentLang === 'de' ? styles.langBtnActive : ''}`}
      >
        DE
      </button>
      <button
        onClick={() => switchLanguage('pl')}
        className={`${styles.langBtn} ${currentLang === 'pl' ? styles.langBtnActive : ''}`}
      >
        PL
      </button>
    </div>
  );
}
