'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Color {
  id: string;
  name: string;
  code: string;
  hexColor: string;
  category: string;
  manufacturer: string;
}

interface ColorCategoryGridProps {
  category: string;
  categoryName: string;
  colors: Color[];
  lang: string;
  manufacturerSlug: string;
  showAllLabel: string;
  showLessLabel: string;
}

// Client-side slugify function
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const INITIAL_DISPLAY = 24;
const LOAD_MORE_INCREMENT = 48;

export default function ColorCategoryGrid({
  category,
  categoryName,
  colors,
  lang,
  manufacturerSlug,
  showAllLabel,
  showLessLabel,
}: ColorCategoryGridProps) {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [highlightedColor, setHighlightedColor] = useState<string | null>(null);
  const [targetColorSlug, setTargetColorSlug] = useState<string | null>(null);

  // Step 1: On mount, check hash and expand if needed
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#color-')) {
      const colorSlug = hash.replace('#color-', '');

      // Check if this color is in our list
      const colorIndex = colors.findIndex(c => slugify(c.name) === colorSlug);
      if (colorIndex !== -1) {
        // Mark this as our target color
        setTargetColorSlug(colorSlug);

        // Expand to show this color if needed
        if (colorIndex >= INITIAL_DISPLAY) {
          setDisplayCount(Math.min(colorIndex + 12, colors.length));
        }
      }
    }
  }, [colors]); // Only run on mount/colors change

  // Step 2: Once we have a target and it's rendered, scroll to it
  useEffect(() => {
    if (!targetColorSlug) return;

    // Use requestAnimationFrame to ensure DOM is updated
    const scrollToColor = () => {
      const element = document.getElementById(`color-${targetColorSlug}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedColor(targetColorSlug);
        setTargetColorSlug(null); // Clear target after scrolling

        // Remove highlight after animation
        setTimeout(() => setHighlightedColor(null), 3000);
      } else {
        // Element not yet rendered, try again
        requestAnimationFrame(scrollToColor);
      }
    };

    // Small delay to let React render, then start checking
    setTimeout(() => requestAnimationFrame(scrollToColor), 50);
  }, [targetColorSlug, displayCount]);
  const hasMore = displayCount < colors.length;
  const showingAll = displayCount >= colors.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + LOAD_MORE_INCREMENT, colors.length));
  };

  const handleShowAll = () => {
    setDisplayCount(colors.length);
  };

  const handleShowLess = () => {
    setDisplayCount(INITIAL_DISPLAY);
  };

  return (
    <section className="mb-16">
      <h2
        className="mb-8 text-3xl font-semibold capitalize"
        style={{ color: 'var(--text-charcoal)', fontFamily: "'DM Sans', sans-serif" }}
      >
        {categoryName}
        <span className="ml-3 text-lg font-normal" style={{ color: 'var(--text-muted)' }}>
          ({colors.length.toLocaleString()})
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {colors.slice(0, displayCount).map((color) => {
          const colorSlug = slugify(color.name);
          const isHighlighted = highlightedColor === colorSlug;

          return (
            <Link
              key={color.id}
              id={`color-${colorSlug}`}
              href={`/en/colors/${manufacturerSlug}/${colorSlug}`}
              className="group"
              style={{
                transition: 'all 0.3s ease',
                transform: isHighlighted ? 'scale(1.05)' : undefined,
              }}
            >
              <div
                className="aspect-square w-full rounded-2xl shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl border-4"
                style={{
                  backgroundColor: `#${color.hexColor}`,
                  borderColor: isHighlighted ? 'var(--accent-terracotta)' : 'var(--border-light)',
                  boxShadow: isHighlighted ? '0 0 0 4px rgba(196, 112, 79, 0.3), 0 10px 40px rgba(0,0,0,0.2)' : undefined,
                }}
              />
              <p
                className="mt-3 text-sm font-medium truncate"
                style={{ color: isHighlighted ? 'var(--accent-terracotta)' : 'var(--text-charcoal)' }}
              >
                {color.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {color.code}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Load More / Show All Controls */}
      {colors.length > INITIAL_DISPLAY && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {hasMore ? (
            <>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {lang === 'de'
                  ? `Zeige ${displayCount} von ${colors.length.toLocaleString()} ${categoryName} Farben`
                  : lang === 'pl'
                    ? `Pokazano ${displayCount} z ${colors.length.toLocaleString()} ${categoryName} kolorów`
                    : `Showing ${displayCount} of ${colors.length.toLocaleString()} ${categoryName} colors`}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleLoadMore}
                  className="rounded-full px-6 py-2 text-sm font-medium transition-all hover:opacity-80"
                  style={{
                    background: 'var(--bg-light)',
                    color: 'var(--text-charcoal)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  {lang === 'de' ? 'Mehr laden' : lang === 'pl' ? 'Zaladuj wiecej' : 'Load More'}
                </button>
                <button
                  onClick={handleShowAll}
                  className="rounded-full px-6 py-2 text-sm font-medium transition-all hover:opacity-80"
                  style={{
                    background: 'var(--accent-terracotta)',
                    color: 'white',
                  }}
                >
                  {showAllLabel} ({colors.length.toLocaleString()})
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleShowLess}
              className="rounded-full px-6 py-2 text-sm font-medium transition-all hover:opacity-80"
              style={{
                background: 'var(--bg-light)',
                color: 'var(--text-charcoal)',
                border: '1px solid var(--border-light)',
              }}
            >
              {showLessLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
