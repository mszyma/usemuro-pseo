import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { slugify, getColorBySlug, getAllManufacturers } from '@/lib/colors/loader';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import trendingColors from '@/data/trending_colors_clean.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    en: 'Trending Paint Colors 2026 | Muro',
    de: 'Trendfarben 2026 | Muro',
    pl: 'Trendy Kolorystyczne 2026 | Muro',
  };

  const descriptions = {
    en: 'Discover the most trending paint colors for 2026 from top manufacturers worldwide. Stay ahead with the latest color trends.',
    de: 'Entdecken Sie die trendigen Farbtöne für 2026 von führenden Herstellern weltweit. Bleiben Sie mit den neuesten Farbtrends auf dem Laufenden.',
    pl: 'Odkryj najbardziej trendujące kolory farb na 2026 rok od czołowych producentów na świecie. Bądź na bieżąco z najnowszymi trendami kolorystycznymi.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}

interface TrendingColor {
  id: string;
  name: string;
  hexColor: string;
  rgb: { r: number; g: number; b: number };
  lrv: number;
  category: string;
  brand: string;
  code?: string;
  source: string;
  trend: boolean;
}

export default async function TrendingColors2026Page({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const colors = trendingColors.colors as TrendingColor[];

  // Group by category
  const colorsByCategory = colors.reduce((acc, color) => {
    if (!acc[color.category]) {
      acc[color.category] = [];
    }
    acc[color.category].push(color);
    return acc;
  }, {} as Record<string, TrendingColor[]>);

  const categoryNames = {
    en: {
      brown: 'Warm Browns & Earth Tones',
      neutral: 'Neutral Tones',
      white: 'Whites & Off-Whites',
      green: 'Greens & Nature-Inspired',
      blue: 'Blues & Aquas',
      red: 'Reds & Warm Accents',
      yellow: 'Yellows & Golds',
      purple: 'Purples & Violets',
    },
    de: {
      brown: 'Warme Brauntöne & Erdtöne',
      neutral: 'Neutraltöne',
      white: 'Weiß & Cremetöne',
      green: 'Grün & Naturinspiriert',
      blue: 'Blau & Aquatöne',
      red: 'Rot & Warme Akzente',
      yellow: 'Gelb & Goldtöne',
      purple: 'Violett & Lila',
    },
    pl: {
      brown: 'Ciepłe brązy i odcienie ziemi',
      neutral: 'Odcienie neutralne',
      white: 'Biel i kremowe odcienie',
      green: 'Zielenie i naturalne kolory',
      blue: 'Błękity i akwamaryny',
      red: 'Czerwienie i ciepłe akcenty',
      yellow: 'Żółcie i złote odcienie',
      purple: 'Fiolety i fioletowe',
    },
  };

  const pageTitle = {
    en: 'Trending Paint Colors 2026',
    de: 'Trendfarben 2026',
    pl: 'Trendy Kolorystyczne 2026',
  };

  const pageDescription = {
    en: 'Discover the colors defining 2026. From Pantone\'s Color of the Year to forecasts from Sherwin-Williams, Benjamin Moore, and Behr, these are the shades shaping interior design.',
    de: 'Entdecken Sie die Farben, die 2026 prägen. Von Pantones Farbe des Jahres bis zu Prognosen von Sherwin-Williams, Benjamin Moore und Behr – das sind die Farbtöne, die das Innendesign gestalten.',
    pl: 'Odkryj kolory definiujące rok 2026. Od Koloru Roku Pantone po prognozy od Sherwin-Williams, Benjamin Moore i Behr – to odcienie kształtujące design wnętrz.',
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-cream)' }}>
      {/* Navigation */}
      <Navigation lang={lang} />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-12 text-sm">
          <ol className="flex items-center justify-center space-x-2" style={{ color: 'var(--text-muted)' }}>
            <li>
              <Link href={`/${lang}`} className="hover:opacity-70 transition-opacity">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${lang}/trending/colors-2026`} className="hover:opacity-70 transition-opacity">
                Trending
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium" style={{ color: 'var(--text-charcoal)' }}>
              {pageTitle[lang]}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
            {pageTitle[lang]}
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-4" style={{ color: 'var(--text-secondary)' }}>
            {pageDescription[lang]}
          </p>
          <p className="text-lg font-medium" style={{ color: 'var(--accent-terracotta)' }}>
            {colors.length} {lang === 'de' ? 'Trendfarben' : lang === 'pl' ? 'trendujących kolorów' : 'trending colors'}
          </p>
        </div>

        {/* Colors by Category */}
        {Object.entries(colorsByCategory).map(([category, categoryColors]) => (
          <section key={category} className="mb-16">
            <h2 className="mb-8 text-3xl font-semibold" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
              {categoryNames[lang][category as keyof typeof categoryNames.en] || category}
              <span className="ml-3 text-lg font-normal" style={{ color: 'var(--text-muted)' }}>
                ({categoryColors.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categoryColors.map((color) => (
                <div key={color.id} className="group">
                  <div
                    className="aspect-square w-full rounded-2xl shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl border-4"
                    style={{
                      backgroundColor: `#${color.hexColor}`,
                      borderColor: 'var(--border-light)'
                    }}
                  />
                  <p className="mt-3 text-sm font-medium truncate" style={{ color: 'var(--text-charcoal)' }}>
                    {color.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {color.brand}
                  </p>
                  {color.code && (
                    <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {color.code}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl p-12 text-center" style={{ background: 'var(--bg-light)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
            {lang === 'de' ? 'Visualisieren Sie diese Trendfarben an Ihren Wänden' : lang === 'pl' ? 'Zwizualizuj te trendy na swoich ścianach' : 'Visualize These Trending Colors on Your Walls'}
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'de'
              ? 'Laden Sie Muro für iPhone und iPad herunter, um diese Trendfarben in Ihrem Zuhause zu sehen.'
              : lang === 'pl'
              ? 'Pobierz Muro na iPhone i iPad, aby zobaczyć te kolory w Twoim domu.'
              : 'Download Muro for iPhone and iPad to see these trending colors in your home.'}
          </p>
          <a
            href="https://testflight.apple.com/join/x27fAsVs"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-semibold transition-all hover:opacity-90 hover:transform hover:scale-105"
            style={{ background: 'var(--text-charcoal)' }}
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {dict.downloadCTA}
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{dict.footer.copyright}</p>
            <div className="flex gap-6">
              <Link
                href={`/${lang}/${lang === 'en' ? 'legal' : lang === 'de' ? 'rechtliches' : 'prawne'}`}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text-muted)' }}
              >
                {dict.footer.legal}
              </Link>
              <a
                href="http://usemuro.com/support"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text-muted)' }}
              >
                {dict.footer.support}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
