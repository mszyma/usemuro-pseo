import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import {
  getAllManufacturers,
  getManufacturerById,
  getManufacturerColors,
  slugify,
  getAllColors,
} from '@/lib/colors/loader';
import {
  HUE_CATEGORIES,
  STYLE_CATEGORIES,
  ALL_CATEGORIES,
  isValidCategoryId,
  getCategoryById,
  getCategoryName,
  getCategoryDescription,
} from '@/lib/colors/categories';
import { generateManufacturerMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import ColorCategoryGrid from '../components/ColorCategoryGrid';

interface PageProps {
  params: Promise<{
    lang: Language;
    manufacturer: string;
  }>;
}

export async function generateStaticParams() {
  const manufacturers = getAllManufacturers();
  const params: Array<{ lang: string; manufacturer: string }> = [];

  // Generate params for manufacturers
  manufacturers.forEach((mfg) => {
    ['en', 'de', 'pl'].forEach((lang) => {
      params.push({
        lang,
        manufacturer: mfg.id,
      });
    });
  });

  // Generate params for all categories (hue + style)
  ALL_CATEGORIES.forEach((category) => {
    ['en', 'de', 'pl'].forEach((lang) => {
      params.push({
        lang,
        manufacturer: category.id, // Using same param name for routing
      });
    });
  });

  return params;
}

// Required for static export
export const dynamic = 'force-static';

export async function generateMetadata({ params }: PageProps) {
  const { lang, manufacturer: slugParam } = await params;

  // Check if this is a category
  if (isValidCategoryId(slugParam)) {
    const category = getCategoryById(slugParam)!;
    const categoryName = getCategoryName(category, lang);
    const categoryDesc = getCategoryDescription(category, lang);

    return {
      title: `${categoryName} | Muro`,
      description: categoryDesc,
      openGraph: {
        title: categoryName,
        description: categoryDesc,
      },
    };
  }

  // Otherwise, treat as manufacturer
  const manufacturer = getManufacturerById(slugParam);

  if (!manufacturer) {
    return {
      title: 'Not Found',
    };
  }

  const colors = getManufacturerColors(slugParam);
  return generateManufacturerMetadata(manufacturer, lang, colors.length);
}

export default async function ManufacturerPage({
  params,
}: {
  params: Promise<{ lang: Language; manufacturer: string }>;
}) {
  const { lang, manufacturer: slugParam } = await params;
  // Note: Pagination is now client-side. All colors are rendered and paginated via CSS/JS
  const COLORS_PER_PAGE = 240;

  const dict = await getDictionary(lang);

  // Check if this is a category page
  if (isValidCategoryId(slugParam)) {
    const category = getCategoryById(slugParam)!;
    const categoryName = getCategoryName(category, lang);
    const categoryDesc = getCategoryDescription(category, lang);

    // Get all colors and filter by category
    const allColors = getAllColors();
    let colors = [];

    // Filter based on category type
    if (category.type === 'hue') {
      // For hue categories, filter by exact category match
      colors = allColors.filter((color) => color.category === slugParam);
    } else {
      // For style categories, use custom filtering logic
      colors = allColors.filter((color) => {
        switch (slugParam) {
          case 'modern-neutrals':
            return ['neutral', 'gray', 'white', 'beige'].includes(color.category);
          case 'scandinavian-whites':
            return color.category === 'white';
          case 'earth-tones':
            return ['brown', 'beige', 'orange'].includes(color.category);
          case 'coastal-blues':
            return color.category === 'blue';
          case 'warm-grays':
            return color.category === 'gray';
          case 'bold-accents':
            return ['red', 'orange', 'yellow', 'purple', 'green', 'blue'].includes(color.category) && color.lrv < 50;
          default:
            return false;
        }
      });
    }

    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-cream)' }}>
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
                <Link href={`/${lang}/colors`} className="hover:opacity-70 transition-opacity">
                  {dict.allColors}
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium" style={{ color: 'var(--text-charcoal)' }}>{categoryName}</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
              {categoryName}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-4" style={{ color: 'var(--text-secondary)' }}>
              {categoryDesc}
            </p>
            <p className="text-lg font-medium" style={{ color: 'var(--accent-terracotta)' }}>
              {colors.length.toLocaleString()} {lang === 'de' ? 'Farben' : lang === 'pl' ? 'kolorów' : 'colors'}
            </p>
          </div>

          {/* Colors Grid - Show first 240 colors for performance */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {colors.slice(0, COLORS_PER_PAGE).map((color) => (
              <Link
                key={color.id}
                id={`color-${slugify(color.name)}`}
                href={`/en/colors/${color.manufacturer}/${slugify(color.name)}`}
                className="group"
              >
                <div
                  className="aspect-square w-full rounded-2xl shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl border-4"
                  style={{
                    backgroundColor: `#${color.hexColor}`,
                    borderColor: 'var(--border-light)'
                  }}
                />
                <p className="mt-3 text-sm font-medium truncate" style={{ color: 'var(--text-charcoal)' }}>{color.name}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{color.manufacturerDisplayName}</p>
              </Link>
            ))}
          </div>

          {/* Show more colors indicator */}
          {colors.length > COLORS_PER_PAGE && (
            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {lang === 'de'
                  ? `Zeige ${COLORS_PER_PAGE} von ${colors.length.toLocaleString()} Farben. Nutze die Muro App für alle Farben.`
                  : lang === 'pl'
                    ? `Pokazano ${COLORS_PER_PAGE} z ${colors.length.toLocaleString()} kolorów. Użyj aplikacji Muro, aby zobaczyć wszystkie.`
                    : `Showing ${COLORS_PER_PAGE} of ${colors.length.toLocaleString()} colors. Use the Muro app for all colors.`
                }
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 rounded-2xl p-12 text-center" style={{ background: 'var(--bg-light)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
              {dict.visualizeThisColor.replace('This Color', 'These Colors')}
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
              {dict.downloadMuroToSee.replace('{{colorName}}', lang === 'de' ? 'diese Farben' : lang === 'pl' ? 'te kolory' : 'these colors')}
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

  // Otherwise, treat as manufacturer page
  const manufacturer = getManufacturerById(slugParam);

  if (!manufacturer) {
    notFound();
  }

  const colors = getManufacturerColors(slugParam);

  // Group colors by category
  const colorsByCategory = colors.reduce((acc, color) => {
    if (!acc[color.category]) {
      acc[color.category] = [];
    }
    acc[color.category].push(color);
    return acc;
  }, {} as Record<string, typeof colors>);

  const displayName =
    lang === 'en'
      ? manufacturer.displayNameEN
      : lang === 'de'
        ? manufacturer.displayNameDE
        : manufacturer.displayNamePL;

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
              <Link href={`/${lang}/colors`} className="hover:opacity-70 transition-opacity">
                {dict.allColors}
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium" style={{ color: 'var(--text-charcoal)' }}>{displayName}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
            {displayName}
          </h1>
          <p className="mt-6 text-xl" style={{ color: 'var(--text-secondary)' }}>
            {dict.colorsFrom.replace('{{manufacturer}}', displayName)}
          </p>
          <p className="mt-2 text-lg font-medium" style={{ color: 'var(--accent-terracotta)' }}>
            {dict.totalColors.replace('{{count}}', colors.length.toLocaleString())}
          </p>
          {manufacturer.website && (
            <div className="mt-6">
              <a
                href={manufacturer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: 'var(--accent-terracotta)' }}
              >
                Visit {displayName} Website
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3l6 6-6 6" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Colors Grid - Client-side expandable categories */}
        {Object.entries(colorsByCategory).map(([category, categoryColors]) => (
          <ColorCategoryGrid
            key={category}
            category={category}
            categoryName={dict.categories[category as keyof typeof dict.categories] || category}
            colors={categoryColors.map(c => ({
              id: c.id,
              name: c.name,
              code: c.code,
              hexColor: c.hexColor,
              category: c.category,
              manufacturer: c.manufacturer,
            }))}
            lang={lang}
            manufacturerSlug={slugParam}
            showAllLabel={lang === 'de' ? 'Alle anzeigen' : lang === 'pl' ? 'Pokaz wszystkie' : 'Show All'}
            showLessLabel={lang === 'de' ? 'Weniger anzeigen' : lang === 'pl' ? 'Pokaz mniej' : 'Show Less'}
          />
        ))}

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900">{dict.visualizeThisColor}</h3>
          <p className="mt-4 text-gray-600">
            {dict.downloadMuroToSee.replace('{{colorName}}', `any ${displayName} color`)}
          </p>
          <a
            href="https://testflight.apple.com/join/x27fAsVs"
            className="mt-6 inline-block rounded-full bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            {dict.downloadCTA}
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">{dict.footer.copyright}</p>
            <div className="flex gap-6">
              <Link
                href={`/${lang}/${lang === 'en' ? 'legal' : lang === 'de' ? 'rechtliches' : 'prawne'}`}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                {dict.footer.legal}
              </Link>
              <a
                href="http://usemuro.com/support"
                className="text-sm text-gray-500 hover:text-gray-900"
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
