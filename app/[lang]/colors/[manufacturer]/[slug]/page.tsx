import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import {
  getAllManufacturers,
  getManufacturerColors,
  getColorBySlug,
  slugify,
  getAllColors,
} from '@/lib/colors/loader';
import { findSimilarColors } from '@/lib/colors/similar';
import { generateColorMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../../components/Navigation';

interface PageProps {
  params: Promise<{
    lang: Language;
    manufacturer: string;
    slug: string;
  }>;
}

// Generate static params for colors from each manufacturer
// English-only to maximize color coverage within Cloudflare Pages 20K file limit
// DE/PL color URLs redirect to EN via _redirects
export async function generateStaticParams() {
  const manufacturers = getAllManufacturers();
  const params: Array<{ lang: string; manufacturer: string; slug: string }> = [];

  // With English-only color pages, we have 3x more budget
  // (6000 colors × 1 lang × 2 files = ~12,000 files + ~400 other pages = ~12,400 files)
  const TOTAL_COLOR_BUDGET = 6000;
  const totalColors = manufacturers.reduce((sum, mfg) => sum + getManufacturerColors(mfg.id).length, 0);

  manufacturers.forEach((mfg) => {
    const allColors = getManufacturerColors(mfg.id);
    // Proportional allocation with minimum of 100 colors per manufacturer
    const allocation = Math.max(100, Math.floor((allColors.length / totalColors) * TOTAL_COLOR_BUDGET));
    const colors = allColors.slice(0, allocation);

    colors.forEach((color) => {
      // English only - DE/PL redirect via _redirects
      params.push({
        lang: 'en',
        manufacturer: mfg.id,
        slug: slugify(color.name),
      });
    });
  });

  return params;
}

// Required for static export
export const dynamic = 'force-static';

export async function generateMetadata({ params }: PageProps) {
  const { lang, manufacturer, slug } = await params;
  const color = getColorBySlug(manufacturer, slug);

  if (!color) {
    return {
      title: 'Color Not Found',
    };
  }

  try {
    const allColors = getAllColors();
    const similarColors = findSimilarColors(color, allColors, 12);
    return generateColorMetadata(color, lang, similarColors);
  } catch (error) {
    console.error(`Error generating metadata for ${manufacturer}/${slug}:`, error);
    return {
      title: `${color.name} - ${color.manufacturerDisplayName}`,
      description: `View ${color.name} by ${color.manufacturerDisplayName}`,
    };
  }
}

export default async function ColorPage({ params }: PageProps) {
  const { lang, manufacturer, slug } = await params;
  const dict = await getDictionary(lang);

  const color = getColorBySlug(manufacturer, slug);

  if (!color) {
    notFound();
  }

  // Find similar colors with error handling
  let similarColors: any[] = [];
  try {
    const allColors = getAllColors();
    similarColors = findSimilarColors(color, allColors, 12);
  } catch (error) {
    console.error(`Error finding similar colors for ${manufacturer}/${slug}:`, error);
  }

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
            <li>
              <Link
                href={`/${lang}/colors/${manufacturer}`}
                className="hover:opacity-70 transition-opacity"
              >
                {color.manufacturerDisplayName}
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium" style={{ color: 'var(--text-charcoal)' }}>{color.name}</li>
          </ol>
        </nav>

        {/* Color Display */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 mb-16">
          {/* Color Swatch */}
          <div>
            <div
              className="aspect-square w-full rounded-2xl shadow-2xl border-4"
              style={{
                backgroundColor: `#${color.hexColor}`,
                borderColor: 'var(--border-light)'
              }}
            />
          </div>

          {/* Color Details */}
          <div>
            <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
              {color.name}
            </h1>
            <p className="text-2xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              {color.manufacturerDisplayName}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{dict.colorCode}:</span>
                <span className="font-semibold" style={{ color: 'var(--text-charcoal)' }}>{color.code}</span>
              </div>

              <div className="flex justify-between py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{dict.hexCode}:</span>
                <span className="font-mono font-semibold" style={{ color: 'var(--text-charcoal)' }}>#{color.hexColor}</span>
              </div>

              {color.rgb && (
                <div className="flex justify-between py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{dict.rgbCode}:</span>
                  <span className="font-mono font-semibold" style={{ color: 'var(--text-charcoal)' }}>
                    {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                  </span>
                </div>
              )}

              {color.lrv != null && (
                <div className="flex justify-between py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{dict.lrvValue}:</span>
                  <span className="font-semibold" style={{ color: 'var(--text-charcoal)' }}>{color.lrv.toFixed(1)}</span>
                </div>
              )}

              <div className="flex justify-between py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{dict.category}:</span>
                <span className="font-semibold capitalize" style={{ color: 'var(--text-charcoal)' }}>{color.category}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-8" style={{ background: 'var(--bg-light)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
                {dict.visualizeThisColor}
              </h3>
              <p className="mb-6 text-base" style={{ color: 'var(--text-secondary)' }}>
                {dict.downloadMuroToSee.replace('{{colorName}}', color.name)}
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
          </div>
        </div>

        {/* Similar Colors */}
        {similarColors.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
              {dict.similarColors}
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {similarColors.map((simColor) => (
                <Link
                  key={simColor.id}
                  href={`/en/colors/${simColor.manufacturer}/${slugify(simColor.name)}`}
                  className="group"
                >
                  <div
                    className="aspect-square w-full rounded-2xl shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl border-4"
                    style={{
                      backgroundColor: `#${simColor.hexColor}`,
                      borderColor: 'var(--border-light)'
                    }}
                  />
                  <p className="mt-3 text-sm font-medium truncate" style={{ color: 'var(--text-charcoal)' }}>
                    {simColor.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {simColor.manufacturerDisplayName}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
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

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${color.name} Paint Color`,
            description: `${color.name} by ${color.manufacturerDisplayName}. Hex: #${color.hexColor}${color.lrv != null ? `, LRV: ${color.lrv.toFixed(1)}` : ''}`,
            brand: {
              '@type': 'Brand',
              name: color.manufacturerDisplayName,
            },
            color: color.name,
            sku: color.id,
            mpn: color.code,
            category: `${color.category} paint`,
            additionalProperty: [
              { '@type': 'PropertyValue', name: 'Hex Color', value: `#${color.hexColor}` },
              ...(color.lrv != null ? [{ '@type': 'PropertyValue', name: 'LRV', value: color.lrv.toFixed(1) }] : []),
              ...(color.rgb ? [{
                '@type': 'PropertyValue',
                name: 'RGB',
                value: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
              }] : []),
            ],
          }),
        }}
      />
    </div>
  );
}
