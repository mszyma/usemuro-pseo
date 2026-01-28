'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Language } from '@/lib/i18n/config';
import { Manufacturer } from '@/lib/colors/loader';

// Country filter configuration with multilingual labels
// Note: region values match the manufacturer data which uses Polish region names
const COUNTRY_FILTERS = [
  {
    id: 'all',
    region: null,
    labels: { en: 'All Regions', de: 'Alle Regionen', pl: 'Wszystkie regiony' },
    flag: '🌍',
  },
  {
    id: 'usa',
    region: 'usa',
    labels: { en: 'United States', de: 'Vereinigte Staaten', pl: 'Stany Zjednoczone' },
    flag: '🇺🇸',
  },
  {
    id: 'uk',
    region: 'uk',
    labels: { en: 'United Kingdom', de: 'Vereinigtes Königreich', pl: 'Wielka Brytania' },
    flag: '🇬🇧',
  },
  {
    id: 'dach',
    region: 'dach',
    labels: { en: 'DACH Region', de: 'DACH-Region', pl: 'Region DACH' },
    flag: '🇩🇪',
  },
  {
    id: 'scandinavia',
    region: 'skandynawia',
    labels: { en: 'Scandinavia', de: 'Skandinavien', pl: 'Skandynawia' },
    flag: '🇸🇪',
  },
  {
    id: 'france',
    region: 'francja',
    labels: { en: 'France', de: 'Frankreich', pl: 'Francja' },
    flag: '🇫🇷',
  },
  {
    id: 'italy',
    region: 'wlochy',
    labels: { en: 'Italy', de: 'Italien', pl: 'Włochy' },
    flag: '🇮🇹',
  },
  {
    id: 'spain',
    region: 'hiszpania',
    labels: { en: 'Spain', de: 'Spanien', pl: 'Hiszpania' },
    flag: '🇪🇸',
  },
  {
    id: 'poland',
    region: 'polska',
    labels: { en: 'Poland', de: 'Polen', pl: 'Polska' },
    flag: '🇵🇱',
  },
];

interface CountryFilterProps {
  lang: Language;
  manufacturers: Manufacturer[];
}

export default function CountryFilter({ lang, manufacturers }: CountryFilterProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [filteredManufacturers, setFilteredManufacturers] = useState<Manufacturer[]>(manufacturers);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const filtered = selectedCountry === 'all'
      ? manufacturers
      : manufacturers.filter(m => m.region.toLowerCase() === COUNTRY_FILTERS.find(f => f.id === selectedCountry)?.region);

    setIsAnimating(true);
    setTimeout(() => {
      setFilteredManufacturers(filtered);
      setIsAnimating(false);
    }, 150);
  }, [selectedCountry, manufacturers]);

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
  };

  return (
    <>
      {/* Country Filter */}
      <div className="mb-12 overflow-hidden">
        <div className="flex items-center justify-center mb-6">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'var(--bg-light)',
              color: 'var(--text-muted)'
            }}
          >
            {lang === 'de' ? 'Nach Region filtern' : lang === 'pl' ? 'Filtruj według regionu' : 'Filter by Region'}
          </div>
        </div>

        <div className="relative">
          {/* Scrollable filter container */}
          <div
            className="flex gap-3 overflow-x-auto pb-4 px-4 scrollbar-hide justify-center flex-wrap"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {COUNTRY_FILTERS.map((filter, index) => {
              const isActive = selectedCountry === filter.id;
              const count = filter.region === null
                ? manufacturers.length
                : manufacturers.filter(m => m.region.toLowerCase() === filter.region).length;

              return (
                <button
                  key={filter.id}
                  onClick={() => handleCountryChange(filter.id)}
                  className="country-filter-button group relative flex-shrink-0 rounded-2xl px-6 py-4 transition-all duration-300 border-2 hover:scale-105"
                  style={{
                    background: isActive ? 'var(--accent-terracotta)' : 'white',
                    borderColor: isActive ? 'var(--accent-terracotta)' : 'var(--border-light)',
                    color: isActive ? 'white' : 'var(--text-charcoal)',
                    scrollSnapAlign: 'center',
                    animationDelay: `${index * 50}ms`,
                    boxShadow: isActive
                      ? '0 8px 24px rgba(212, 94, 63, 0.25)'
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl filter-flag" style={{
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                    }}>
                      {filter.flag}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-base whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {filter.labels[lang]}
                      </div>
                      <div
                        className="text-xs font-medium mt-0.5"
                        style={{
                          color: isActive ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-muted)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {count} {count === 1
                          ? (lang === 'de' ? 'Hersteller' : lang === 'pl' ? 'producent' : 'brand')
                          : (lang === 'de' ? 'Hersteller' : lang === 'pl' ? 'producentów' : 'brands')
                        }
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
                        : 'linear-gradient(135deg, rgba(212, 94, 63, 0.05) 0%, rgba(212, 94, 63, 0) 100%)',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8 text-center">
        <p
          className="text-lg font-medium transition-opacity duration-300"
          style={{
            color: 'var(--text-secondary)',
            opacity: isAnimating ? 0.5 : 1,
          }}
        >
          {lang === 'de'
            ? `${filteredManufacturers.length} Hersteller ${selectedCountry !== 'all' ? `in ${COUNTRY_FILTERS.find(f => f.id === selectedCountry)?.labels.de}` : ''}`
            : lang === 'pl'
            ? `${filteredManufacturers.length} producentów ${selectedCountry !== 'all' ? `w ${COUNTRY_FILTERS.find(f => f.id === selectedCountry)?.labels.pl}` : ''}`
            : `${filteredManufacturers.length} ${filteredManufacturers.length === 1 ? 'brand' : 'brands'} ${selectedCountry !== 'all' ? `in ${COUNTRY_FILTERS.find(f => f.id === selectedCountry)?.labels.en}` : ''}`
          }
        </p>
      </div>

      {/* Manufacturers Grid */}
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300"
        style={{ opacity: isAnimating ? 0.5 : 1 }}
      >
        {filteredManufacturers.map((manufacturer, index) => (
          <Link
            key={manufacturer.id}
            href={`/${lang}/colors/${manufacturer.id}`}
            className="manufacturer-card group relative overflow-hidden rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-xl"
            style={{
              borderColor: 'var(--border-light)',
              animationDelay: `${index * 30}ms`,
            }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold transition-colors" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
                {manufacturer.displayName}
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                {manufacturer.totalColors?.toLocaleString() || 'View'} {lang === 'de' ? 'Farben' : lang === 'pl' ? 'kolorów' : 'colors'}
              </p>
            </div>

            <div className="flex items-center text-sm font-medium" style={{ color: 'var(--accent-terracotta)' }}>
              {lang === 'de' ? 'Farben durchsuchen' : lang === 'pl' ? 'Przeglądaj kolory' : 'Browse colors'}
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Region Badge */}
            {manufacturer.region && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ background: 'var(--bg-light)', color: 'var(--text-muted)' }}>
                  {manufacturer.region.toUpperCase()}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredManufacturers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}>
            {lang === 'de' ? 'Keine Hersteller gefunden' : lang === 'pl' ? 'Nie znaleziono producentów' : 'No manufacturers found'}
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {lang === 'de'
              ? 'Versuchen Sie, einen anderen Filter auszuwählen'
              : lang === 'pl'
              ? 'Spróbuj wybrać inny filtr'
              : 'Try selecting a different filter'
            }
          </p>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .country-filter-button {
          animation: fadeInUp 0.4s ease-out backwards;
        }

        .manufacturer-card {
          animation: fadeInUp 0.5s ease-out backwards;
        }

        .country-filter-button:active {
          transform: scale(0.98);
        }

        .filter-flag {
          filter: grayscale(0);
          transition: filter 0.3s ease;
        }

        .country-filter-button:not(.active) .filter-flag {
          filter: grayscale(0.2);
        }

        .country-filter-button:hover .filter-flag {
          filter: grayscale(0);
        }
      `}</style>
    </>
  );
}
