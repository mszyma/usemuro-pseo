import { Language } from './config';
import enTranslations from './translations/en.json';
import deTranslations from './translations/de.json';
import plTranslations from './translations/pl.json';

const dictionaries = {
  en: enTranslations,
  de: deTranslations,
  pl: plTranslations,
};

export async function getDictionary(lang: Language) {
  return dictionaries[lang];
}

export type Dictionary = typeof enTranslations;
