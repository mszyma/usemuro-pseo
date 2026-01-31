export const SUPPORTED_LANGUAGES = ['en', 'de', 'pl'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export const LOCALIZED_ROUTES = {
  en: {
    colors: 'colors',
    manufacturers: 'manufacturers',
    compare: 'compare',
    trending: 'trending',
    legal: 'legal',
    support: 'support',
    blog: 'blog',
    faq: 'faq',
  },
  de: {
    colors: 'farben',
    manufacturers: 'hersteller',
    compare: 'vergleichen',
    trending: 'trends',
    legal: 'rechtliches',
    support: 'unterstuetzung',
    blog: 'blog',
    faq: 'faq',
  },
  pl: {
    colors: 'kolory',
    manufacturers: 'producenci',
    compare: 'porownaj',
    trending: 'trendy',
    legal: 'prawne',
    support: 'wsparcie',
    blog: 'blog',
    faq: 'faq',
  },
} as const;

export function detectLanguageFromHeader(acceptLanguage: string | null): Language {
  if (!acceptLanguage) return DEFAULT_LANGUAGE;

  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase());

  for (const lang of languages) {
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('pl')) return 'pl';
    if (lang.startsWith('en')) return 'en';
  }

  return DEFAULT_LANGUAGE;
}
