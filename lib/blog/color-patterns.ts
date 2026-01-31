/**
 * Pattern detection for color mentions in blog articles
 * Supports English, German, and Polish patterns
 */

export interface ColorMention {
  fullMatch: string;
  colorName: string;
  manufacturer: string;
  manufacturerId: string;
  code?: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Manufacturer display name to ID mapping
 * Maps various ways manufacturers are referenced in articles to their database IDs
 */
export const MANUFACTURER_ALIASES: Record<string, string> = {
  // USA brands
  'benjamin moore': 'benjamin_moore',
  'benjaminmoore': 'benjamin_moore',
  'bm': 'benjamin_moore',
  'sherwin-williams': 'sherwin_williams',
  'sherwin williams': 'sherwin_williams',
  'sherwinwilliams': 'sherwin_williams',
  'sw': 'sherwin_williams',
  'behr': 'behr',
  'valspar': 'valspar',
  'ppg': 'ppg',
  'ppg paints': 'ppg',
  'dunn-edwards': 'dunn_edwards',
  'dunn edwards': 'dunn_edwards',
  'dunnedwards': 'dunn_edwards',
  'vista paint': 'vista',
  'vista': 'vista',
  'neenah': 'neenah',
  'neenah paper': 'neenah',

  // UK brands
  'farrow & ball': 'farrow_ball',
  'farrow and ball': 'farrow_ball',
  'farrow ball': 'farrow_ball',
  'f&b': 'farrow_ball',
  'dulux': 'dulux',
  'little greene': 'little_greene',
  'crown': 'crown',
  'crown paints': 'crown',

  // DACH brands (German/Austrian/Swiss)
  'caparol': 'caparol',
  'brillux': 'brillux',
  'sto': 'sto',
  'alpina': 'alpina',
  'keim': 'keim',
  'keimfarben': 'keim',
  'ral': 'ral',
  'ral colors': 'ral',
  'ral farben': 'ral',

  // Scandinavian brands
  'jotun': 'jotun',
  'beckers': 'beckers',

  // Polish brands
  'sniezka': 'sniezka',
  'śnieżka': 'sniezka',
  'magnat': 'magnat',
  'dekoral': 'dekoral',
  'jedynka': 'jedynka',
  'tikkurila': 'tikkurila_pl',

  // French brands
  'seigneurie': 'seigneurie',
  'seigneurie gauthier': 'seigneurie',
  'tollens': 'tollens',
  'zolpan': 'zolpan',
  'v33': 'v33',

  // Italian brands
  'san marco': 'san_marco',
  'oikos': 'oikos',
  'valpaint': 'valpaint',
  'maxmeyer': 'maxmeyer',

  // Spanish brands
  'titanlux': 'titanlux',
  'monto': 'monto',
  'montó': 'monto',
  'montó pinturas': 'monto',
  'isaval': 'isaval',
};

/**
 * Get manufacturer ID from display name
 */
export function getManufacturerId(displayName: string): string | null {
  const normalized = displayName.toLowerCase().trim();
  return MANUFACTURER_ALIASES[normalized] || null;
}

/**
 * English pattern: "Color Name by Brand (CODE)"
 * Examples:
 * - "Simply White by Benjamin Moore (OC-117)"
 * - "Alabaster by Sherwin-Williams (SW 7008)"
 * - "Sea Salt by Sherwin-Williams"
 *
 * Note: Uses greedy matching for manufacturer to capture multi-word names
 * like "Benjamin Moore". The negative lookahead (?![a-zA-Z]) ensures we
 * stop at word boundaries.
 */
const ENGLISH_PATTERN = /([A-Z][a-zA-Z\s'''-]+?)\s+by\s+([A-Z][a-zA-Z\s&-]+)(?:\s*\(([A-Z0-9\s-]+)\))?(?![a-zA-Z])/g;

/**
 * German pattern: "Farbname von Marke"
 * Examples:
 * - "Cremeweiß von Caparol"
 * - "Alpinweiß von Alpina"
 * - "Perlgrau von Brillux"
 */
const GERMAN_PATTERN = /([A-ZÄÖÜ][a-zA-ZäöüßÄÖÜ\s'''-]+?)\s+von\s+([A-ZÄÖÜ][a-zA-ZäöüßÄÖÜ\s&-]+)(?:\s*\(([A-Z0-9\s-]+)\))?(?![a-zA-ZäöüßÄÖÜ])/g;

/**
 * Polish pattern variations
 * Examples:
 * - "Biel Alpejska od Śnieżka"
 * - "Kremowy z Magnat"
 */
const POLISH_PATTERN = /([A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'''-]+?)\s+(?:od|z)\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s&-]+)(?:\s*\(([A-Z0-9\s-]+)\))?(?![a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ])/g;

/**
 * Find color mentions in text based on language
 */
export function findColorMentions(text: string, lang: string): ColorMention[] {
  const mentions: ColorMention[] = [];

  let pattern: RegExp;
  switch (lang) {
    case 'de':
      pattern = new RegExp(GERMAN_PATTERN.source, 'g');
      break;
    case 'pl':
      pattern = new RegExp(POLISH_PATTERN.source, 'g');
      break;
    default:
      pattern = new RegExp(ENGLISH_PATTERN.source, 'g');
  }

  let match;
  while ((match = pattern.exec(text)) !== null) {
    const colorName = match[1].trim();
    const manufacturer = match[2].trim();
    const code = match[3]?.trim();

    const manufacturerId = getManufacturerId(manufacturer);

    // Only include if we can resolve the manufacturer
    if (manufacturerId) {
      mentions.push({
        fullMatch: match[0],
        colorName,
        manufacturer,
        manufacturerId,
        code,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
      });
    }
  }

  return mentions;
}

/**
 * Check if a string looks like a color code
 */
export function isColorCode(str: string): boolean {
  // Common color code patterns:
  // - OC-117 (Benjamin Moore)
  // - SW 7008 (Sherwin-Williams)
  // - 100A-1 (Behr)
  // - RAL 9010
  return /^[A-Z]{0,3}\s?[\d-]+[A-Z]?$/i.test(str.trim());
}

/**
 * Standalone color mention (without "by Brand" pattern)
 */
export interface StandaloneColorMention {
  colorName: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Find standalone color names in text by searching against the color database
 * This finds colors like "Swiss Coffee" or "Sea Salt" that appear without "by Brand"
 */
export function findStandaloneColors(
  text: string,
  indexedNames: Set<string>,
  excludeRanges: Array<{ start: number; end: number }>
): StandaloneColorMention[] {
  const mentions: StandaloneColorMention[] = [];

  // Sort names by length (longest first) to match longer names before shorter substrings
  const sortedNames = Array.from(indexedNames).sort((a, b) => b.length - a.length);

  for (const normalizedName of sortedNames) {
    // Create a regex to find this color name (case insensitive, word boundaries)
    // Escape special regex characters in the name
    const escapedName = normalizedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match the name with word boundaries, case insensitive
    const pattern = new RegExp(`\\b(${escapedName})\\b`, 'gi');

    let match;
    while ((match = pattern.exec(text)) !== null) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      // Skip if this range overlaps with an already-found mention (from "by Brand" patterns)
      const overlaps = excludeRanges.some(
        range =>
          (startIndex >= range.start && startIndex < range.end) ||
          (endIndex > range.start && endIndex <= range.end) ||
          (startIndex <= range.start && endIndex >= range.end)
      );

      if (overlaps) continue;

      // Skip if this overlaps with an already found standalone mention
      const overlapsPrevious = mentions.some(
        m =>
          (startIndex >= m.startIndex && startIndex < m.endIndex) ||
          (endIndex > m.startIndex && endIndex <= m.endIndex)
      );

      if (overlapsPrevious) continue;

      // Check if this is part of "by/von/od/z Brand" pattern (already handled)
      // Look ahead to see if followed by " by ", " von ", etc.
      const textAfter = text.slice(endIndex, endIndex + 20);
      if (/^\s+(by|von|od|z)\s+/i.test(textAfter)) {
        continue;
      }

      // Check if this appears right after a "by/von/od/z " (it's a manufacturer name)
      const textBefore = text.slice(Math.max(0, startIndex - 10), startIndex);
      if (/\b(by|von|od|z)\s+$/i.test(textBefore)) {
        continue;
      }

      mentions.push({
        colorName: match[0], // Preserve original casing
        startIndex,
        endIndex,
      });
    }
  }

  // Sort by position in text
  mentions.sort((a, b) => a.startIndex - b.startIndex);

  return mentions;
}
