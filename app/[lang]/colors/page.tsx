import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getAllManufacturers } from '@/lib/colors/loader';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import CountryFilter from './CountryFilter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: `Browse All Paint Colors | Muro`,
    description: `Browse 33,000+ paint colors from top manufacturers like Sherwin-Williams, Benjamin Moore, Behr, and more. Visualize any color on your walls with Muro.`,
  };
}

export default async function ColorsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const manufacturers = getAllManufacturers();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-cream)' }}>
      {/* Navigation */}
      <Navigation lang={lang} />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-12 text-sm">
          <ol className="flex items-center justify-center space-x-2" style={{ color: 'var(--text-muted)' }}>
            <li>
              <Link href={`/${lang}`} className="hover:opacity-70 transition-opacity">
                {lang === 'de' ? 'Startseite' : lang === 'pl' ? 'Strona główna' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium" style={{ color: 'var(--text-charcoal)' }}>
              {lang === 'de' ? 'Alle Farben' : lang === 'pl' ? 'Wszystkie kolory' : 'All Colors'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
            {lang === 'de' ? 'Farbpalette durchsuchen' : lang === 'pl' ? 'Przeglądaj kolory farb' : 'Browse Paint Colors'}
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'de'
              ? `Entdecken Sie ${manufacturers.length.toLocaleString()} Hersteller mit über 33.000 Farbtönen. Wählen Sie eine Marke, um ihre komplette Farbkollektion zu sehen.`
              : lang === 'pl'
              ? `Odkryj ${manufacturers.length.toLocaleString()} producentów z ponad 33 000 kolorów farb. Wybierz markę, aby zobaczyć jej pełną kolekcję kolorów.`
              : `Explore ${manufacturers.length.toLocaleString()} manufacturers with over 33,000 paint colors. Choose a brand to see their complete color collection.`
            }
          </p>
        </div>

        {/* Client-side Country Filter */}
        <CountryFilter lang={lang} manufacturers={manufacturers} />

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl p-12 text-center" style={{ background: 'var(--bg-light)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
            {lang === 'de'
              ? 'Bereit, diese Farben an Ihren Wänden zu visualisieren?'
              : lang === 'pl'
              ? 'Gotowy, aby zwizualizować te kolory na swoich ścianach?'
              : 'Ready to visualize these colors on your walls?'
            }
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'de'
              ? `Laden Sie Muro für iPhone und iPad herunter, um diese ${manufacturers.length.toLocaleString()} Marken in Ihrem Raum zu sehen.`
              : lang === 'pl'
              ? `Pobierz Muro na iPhone i iPad, aby zobaczyć te ${manufacturers.length.toLocaleString()} marki w Twojej przestrzeni.`
              : `Download Muro for iPhone and iPad to see any of these ${manufacturers.length.toLocaleString()} brands in your space.`
            }
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
            {lang === 'de' ? 'Im App Store herunterladen' : lang === 'pl' ? 'Pobierz w App Store' : 'Download on App Store'}
          </a>
        </div>
      </main>
    </div>
  );
}
