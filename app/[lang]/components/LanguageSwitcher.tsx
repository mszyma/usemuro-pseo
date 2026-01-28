'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from '../landing.module.css';

interface LanguageSwitcherProps {
  currentLang: string;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    // Replace the language prefix in the pathname
    const newPathname = pathname.replace(/^\/(en|de|pl)/, `/${newLang}`);
    router.push(newPathname);
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
