/**
 * Color database index for fast lookup during markdown processing
 * Builds an in-memory index from the kolory database for quick color matching
 */

import { getAllColors, slugify, type Color } from '@/lib/colors/loader';

export interface ColorMatch {
  color: Color;
  manufacturer: string;
  manufacturerDisplayName: string;
  hexColor: string;
  slug: string;
  url: string;
}

// Use globalThis to persist cache across module reloads in dev mode
const globalCache = globalThis as typeof globalThis & {
  __colorIndex?: Map<string, ColorMatch>;
  __codeIndex?: Map<string, ColorMatch>;
  __nameOnlyIndex?: Map<string, ColorMatch[]>;
};

// Lazy-loaded index (uses global cache for persistence)
let colorIndex: Map<string, ColorMatch> | null = globalCache.__colorIndex ?? null;
let codeIndex: Map<string, ColorMatch> | null = globalCache.__codeIndex ?? null;

/**
 * Normalize a color name for lookup
 * - Convert to lowercase
 * - Remove special characters
 * - Trim whitespace
 */
function normalizeColorName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9äöüßàáâãäåæçèéêëìíîïñòóôõöøùúûü\s-]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Create a lookup key from color name and manufacturer
 */
function createKey(name: string, manufacturer: string): string {
  return `${normalizeColorName(name)}::${manufacturer.toLowerCase()}`;
}

/**
 * Create a code lookup key from code and manufacturer
 */
function createCodeKey(code: string, manufacturer: string): string {
  return `${code.toLowerCase().replace(/\s+/g, '')}::${manufacturer.toLowerCase()}`;
}

/**
 * Build the color index from all available colors
 */
function buildIndex(): void {
  if (colorIndex !== null) return;

  colorIndex = new Map();
  codeIndex = new Map();

  try {
    const allColors = getAllColors();

    for (const color of allColors) {
      const slug = slugify(color.name);
      const match: ColorMatch = {
        color,
        manufacturer: color.manufacturer,
        manufacturerDisplayName: color.manufacturerDisplayName,
        hexColor: color.hexColor,
        slug,
        url: '', // Will be filled in with lang-specific URL later
      };

      // Index by normalized name + manufacturer
      const nameKey = createKey(color.name, color.manufacturer);
      if (!colorIndex.has(nameKey)) {
        colorIndex.set(nameKey, match);
      }

      // Index by code + manufacturer
      const codeKey = createCodeKey(color.code, color.manufacturer);
      if (!codeIndex.has(codeKey)) {
        codeIndex.set(codeKey, match);
      }
    }

    // Persist to global cache for dev mode
    globalCache.__colorIndex = colorIndex;
    globalCache.__codeIndex = codeIndex;

    console.log(`[color-index] Built index with ${colorIndex.size} colors`);
  } catch (error) {
    console.error('[color-index] Error building index:', error);
    colorIndex = new Map();
    codeIndex = new Map();
  }
}

/**
 * Find a color match by name and manufacturer
 */
export function findColorByName(name: string, manufacturerId: string): ColorMatch | null {
  buildIndex();
  const key = createKey(name, manufacturerId);
  return colorIndex?.get(key) || null;
}

/**
 * Find a color match by code and manufacturer
 */
export function findColorByCode(code: string, manufacturerId: string): ColorMatch | null {
  buildIndex();
  const key = createCodeKey(code, manufacturerId);
  return codeIndex?.get(key) || null;
}

/**
 * Find a color match by name, code, and manufacturer
 * Tries name first, then falls back to code
 */
export function findColorMatch(
  name: string,
  manufacturerId: string,
  code?: string
): ColorMatch | null {
  // Try by name first
  const byName = findColorByName(name, manufacturerId);
  if (byName) return byName;

  // Fall back to code if provided
  if (code) {
    const byCode = findColorByCode(code, manufacturerId);
    if (byCode) return byCode;
  }

  return null;
}

/**
 * Get the color page URL for a specific language
 */
export function getColorUrl(match: ColorMatch, lang: string): string {
  const colorRoute = lang === 'de' ? 'farben' : lang === 'pl' ? 'kolory' : 'colors';
  return `/${lang}/${colorRoute}/${match.manufacturer}/${match.slug}`;
}

/**
 * Clear the index (useful for testing)
 */
export function clearColorIndex(): void {
  colorIndex = null;
  codeIndex = null;
  nameOnlyIndex = null;
  globalCache.__colorIndex = undefined;
  globalCache.__codeIndex = undefined;
  globalCache.__nameOnlyIndex = undefined;
}

// Secondary index by name only (for standalone color lookups)
let nameOnlyIndex: Map<string, ColorMatch[]> | null = globalCache.__nameOnlyIndex ?? null;

/**
 * Build the name-only index for standalone color searches
 */
function buildNameOnlyIndex(): void {
  if (nameOnlyIndex !== null) return;

  buildIndex(); // Ensure main index is built first
  nameOnlyIndex = new Map();

  if (!colorIndex) return;

  // Group colors by normalized name (without manufacturer)
  for (const match of colorIndex.values()) {
    const normalizedName = normalizeColorName(match.color.name);
    if (!nameOnlyIndex.has(normalizedName)) {
      nameOnlyIndex.set(normalizedName, []);
    }
    nameOnlyIndex.get(normalizedName)!.push(match);
  }

  // Persist to global cache for dev mode
  globalCache.__nameOnlyIndex = nameOnlyIndex;
}

/**
 * Find colors by name only (without knowing manufacturer)
 * Returns the best match (prefers well-known US brands)
 */
export function findColorByNameOnly(name: string): ColorMatch | null {
  buildNameOnlyIndex();

  const normalizedName = normalizeColorName(name);
  const matches = nameOnlyIndex?.get(normalizedName);

  if (!matches || matches.length === 0) return null;

  // Prefer well-known US brands, then UK, then DACH
  const brandPriority: Record<string, number> = {
    'benjamin_moore': 1,
    'sherwin_williams': 2,
    'behr': 3,
    'farrow_ball': 4,
    'ppg': 5,
    'valspar': 6,
    'dulux': 7,
    'caparol': 8,
    'brillux': 9,
    'ral': 10,
  };

  // Sort by brand priority (lower is better)
  const sorted = [...matches].sort((a, b) => {
    const priorityA = brandPriority[a.manufacturer] ?? 99;
    const priorityB = brandPriority[b.manufacturer] ?? 99;
    return priorityA - priorityB;
  });

  return sorted[0];
}

/**
 * Get all indexed color names for pattern matching
 * Returns a set of normalized color names (at least 2 words to avoid false positives)
 */
export function getIndexedColorNames(): Set<string> {
  buildNameOnlyIndex();

  const names = new Set<string>();
  if (!nameOnlyIndex) return names;

  for (const normalizedName of nameOnlyIndex.keys()) {
    // Only include names with at least 2 words to reduce false positives
    // Single words like "white", "gray" would match too much
    const wordCount = normalizedName.split(' ').length;
    if (wordCount >= 2) {
      names.add(normalizedName);
    }
  }

  return names;
}
