import { Metadata } from 'next';
import { Color, Manufacturer } from '../colors/loader';
import { Language } from '../i18n/config';

const SITE_URL = 'https://usemuro.com';
const SITE_NAME = 'Muro';

export function generateColorMetadata(
  color: Color,
  lang: Language,
  similarColors: Color[]
): Metadata {
  const title = `${color.name} by ${color.manufacturerDisplayName} - ${SITE_NAME} Paint Visualizer`;
  const description = `Visualize ${color.name} (${color.code}) by ${color.manufacturerDisplayName} on your walls with Muro AI. Hex: #${color.hexColor}, LRV: ${color.lrv.toFixed(1)}. See before you paint.`;

  const langPrefix = lang === 'en' ? 'colors' : lang === 'de' ? 'farben' : 'kolory';
  const canonicalUrl = `${SITE_URL}/${lang}/${langPrefix}/${color.manufacturer}/${slugify(color.name)}`;

  return {
    title,
    description,
    keywords: [
      color.name,
      color.manufacturerDisplayName,
      `paint color ${color.code}`,
      `${color.category} paint`,
      `LRV ${color.lrv.toFixed(1)}`,
      `hex ${color.hexColor}`,
      'paint color visualizer',
      'AI paint preview',
    ].join(', '),

    openGraph: {
      title: `${color.name} - ${color.manufacturerDisplayName}`,
      description: `See ${color.name} on your walls before you paint`,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/api/og-color?id=${color.id}`,
          width: 1200,
          height: 630,
          alt: `${color.name} by ${color.manufacturerDisplayName}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/api/og-color?id=${color.id}`],
    },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en/colors/${color.manufacturer}/${slugify(color.name)}`,
        de: `${SITE_URL}/de/farben/${color.manufacturer}/${slugify(color.name)}`,
        pl: `${SITE_URL}/pl/kolory/${color.manufacturer}/${slugify(color.name)}`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateManufacturerMetadata(
  manufacturer: Manufacturer,
  lang: Language,
  colorCount: number
): Metadata {
  const displayName = lang === 'en' ? manufacturer.displayNameEN : lang === 'de' ? manufacturer.displayNameDE : manufacturer.displayNamePL;
  const title = `${displayName} Paint Colors - ${colorCount} Colors | ${SITE_NAME}`;
  const description = `Browse ${colorCount} ${displayName} paint colors. Visualize any color on your walls with Muro AI before you buy.`;

  const langPrefix = lang === 'en' ? 'colors' : lang === 'de' ? 'farben' : 'kolory';
  const canonicalUrl = `${SITE_URL}/${lang}/${langPrefix}/${manufacturer.id}`;

  return {
    title,
    description,
    keywords: [
      displayName,
      `${displayName} paint colors`,
      `${displayName} color palette`,
      'paint visualizer',
      manufacturer.country,
    ].join(', '),

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en/colors/${manufacturer.id}`,
        de: `${SITE_URL}/de/farben/${manufacturer.id}`,
        pl: `${SITE_URL}/pl/kolory/${manufacturer.id}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateHomepageMetadata(lang: Language): Metadata {
  const titles = {
    en: 'Muro - Visualize Paint Colors on Your Walls with AI',
    de: 'Muro - Visualisieren Sie Wandfarben mit KI',
    pl: 'Muro - Wizualizuj kolory farb na ścianach dzięki AI',
  };

  const descriptions = {
    en: 'See paint colors on your walls before you buy. Muro uses advanced AI to visualize any paint color in your space. Browse 30,000+ colors from top brands.',
    de: 'Sehen Sie Wandfarben an Ihren Wänden, bevor Sie kaufen. Muro verwendet fortschrittliche KI, um jede Farbe in Ihrem Raum zu visualisieren. Durchsuchen Sie über 30.000 Farben von Top-Marken.',
    pl: 'Zobacz kolory farb na swoich ścianach przed zakupem. Muro używa zaawansowanej sztucznej inteligencji do wizualizacji każdego koloru w Twojej przestrzeni. Przeglądaj ponad 30 000 kolorów od najlepszych marek.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],

    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Muro Paint Visualizer',
        },
      ],
    },

    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        pl: `${SITE_URL}/pl`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
