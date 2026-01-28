import fs from 'fs';
import path from 'path';

// In-memory cache for build performance
const COLOR_CACHE = new Map<string, Color[]>();
const MANUFACTURER_CACHE = new Map<string, Manufacturer>();
let ALL_MANUFACTURERS: Manufacturer[] | null = null;

export interface Color {
  id: string;              // "behr-100a-1"
  code: string;            // "100A-1"
  name: string;            // "Barely Pink"
  hexColor: string;        // "F9ECFC"
  rgb: { r: number; g: number; b: number };
  lrv: number;             // Light Reflectance Value (0-100)
  category: string;        // "white", "blue", "neutral", etc.
  manufacturer: string;    // "behr"
  manufacturerDisplayName: string; // "Behr"
  collectionName?: string; // Optional collection name
}

export interface Manufacturer {
  id: string;
  displayName: string;
  displayNamePL: string;
  displayNameDE: string;
  displayNameEN: string;
  country: string;
  region: string;
  website: string;
  totalColors: number;
}

export interface ManufacturerData {
  manufacturer: string;
  displayName: string;
  displayNamePL: string;
  displayNameDE: string;
  displayNameEN: string;
  country: string;
  region: string;
  website: string;
  source: string;
  lastUpdated: string;
  totalColors: number;
  collections: Array<{
    id: string;
    name: string;
    colors: Array<{
      id: string;
      code: string;
      name: string;
      hexColor: string;
      rgb: { r: number; g: number; b: number };
      lrv: number;
      category: string;
    }>;
  }>;
}

const DATA_DIR = path.join(process.cwd(), 'data', 'kolory');

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Calculate LRV from RGB (approximate formula)
 */
function calculateLrv(rgb: { r: number; g: number; b: number }): number {
  // Approximate LRV calculation based on luminance
  const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
  return (luminance / 255) * 100;
}

/**
 * Get all manufacturers from the manufacturers.json index
 */
export function getAllManufacturers(): Manufacturer[] {
  if (ALL_MANUFACTURERS !== null) {
    return ALL_MANUFACTURERS;
  }

  const manufacturersPath = path.join(DATA_DIR, 'manufacturers.json');
  const data = JSON.parse(fs.readFileSync(manufacturersPath, 'utf-8'));

  ALL_MANUFACTURERS = data.producers.map((m: any) => ({
    id: m.id,
    displayName: m.displayName,
    displayNamePL: m.displayNamePL || m.displayName,
    displayNameDE: m.displayNameDE || m.displayName,
    displayNameEN: m.displayNameEN || m.displayName,
    country: m.country,
    region: m.region,
    website: m.website,
    totalColors: m.colorCount,
  }));

  return ALL_MANUFACTURERS!;
}

/**
 * Get a single manufacturer by ID
 */
export function getManufacturerById(id: string): Manufacturer | null {
  if (MANUFACTURER_CACHE.has(id)) {
    return MANUFACTURER_CACHE.get(id)!;
  }

  const manufacturers = getAllManufacturers();
  const manufacturer = manufacturers.find(m => m.id === id);

  if (manufacturer) {
    MANUFACTURER_CACHE.set(id, manufacturer);
  }

  return manufacturer || null;
}

/**
 * Get all colors from a specific manufacturer
 */
export function getManufacturerColors(manufacturerId: string): Color[] {
  if (COLOR_CACHE.has(manufacturerId)) {
    return COLOR_CACHE.get(manufacturerId)!;
  }

  const manufacturer = getManufacturerById(manufacturerId);
  if (!manufacturer) {
    return [];
  }

  // Find the color file based on region
  const regionPath = path.join(DATA_DIR, manufacturer.region);
  const colorFile = path.join(regionPath, `${manufacturerId}_colors.json`);

  if (!fs.existsSync(colorFile)) {
    console.warn(`Color file not found: ${colorFile}`);
    return [];
  }

  const data: any = JSON.parse(fs.readFileSync(colorFile, 'utf-8'));

  // Flatten all colors from all collections
  const colors: Color[] = [];

  // Handle both formats: collections array OR direct colors array
  if (data.collections && Array.isArray(data.collections)) {
    // Format 1: Collections array (e.g., Behr)
    data.collections.forEach((collection: any) => {
      collection.colors.forEach((color: any) => {
        // Fill in missing RGB from hex if needed
        const rgb = color.rgb || hexToRgb(color.hexColor);
        const lrv = color.lrv !== undefined ? color.lrv : calculateLrv(rgb);

        colors.push({
          ...color,
          rgb,
          lrv,
          manufacturer: manufacturerId,
          manufacturerDisplayName: manufacturer.displayName,
          collectionName: collection.name,
        });
      });
    });
  } else if (data.colors && Array.isArray(data.colors)) {
    // Format 2: Direct colors array (e.g., Sherwin-Williams)
    data.colors.forEach((color: any) => {
      // Fill in missing RGB from hex if needed
      const rgb = color.rgb || hexToRgb(color.hexColor);
      const lrv = color.lrv !== undefined ? color.lrv : calculateLrv(rgb);

      colors.push({
        ...color,
        rgb,
        lrv,
        manufacturer: manufacturerId,
        manufacturerDisplayName: manufacturer.displayName,
      });
    });
  } else {
    console.warn(`Unsupported format in ${colorFile}`);
    return [];
  }

  COLOR_CACHE.set(manufacturerId, colors);
  return colors;
}

/**
 * Get all colors from all manufacturers (expensive - use sparingly)
 */
export function getAllColors(): Color[] {
  const manufacturers = getAllManufacturers();
  const allColors: Color[] = [];

  manufacturers.forEach(manufacturer => {
    const colors = getManufacturerColors(manufacturer.id);
    allColors.push(...colors);
  });

  return allColors;
}

/**
 * Get a specific color by manufacturer and slug
 */
export function getColorBySlug(manufacturerId: string, slug: string): Color | null {
  const colors = getManufacturerColors(manufacturerId);

  // Convert slug back to potential color names
  const nameFromSlug = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return colors.find(color => {
    const colorSlug = slugify(color.name);
    return colorSlug === slug || color.name.toLowerCase() === nameFromSlug.toLowerCase();
  }) || null;
}

/**
 * Get colors by category
 */
export function getColorsByCategory(category: string, limit?: number): Color[] {
  const allColors = getAllColors();
  const filtered = allColors.filter(color => color.category === category);

  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Search colors by name or code
 */
export function searchColors(query: string, limit: number = 50): Color[] {
  const allColors = getAllColors();
  const lowerQuery = query.toLowerCase();

  const matches = allColors.filter(color => {
    return (
      color.name.toLowerCase().includes(lowerQuery) ||
      color.code.toLowerCase().includes(lowerQuery) ||
      color.id.toLowerCase().includes(lowerQuery)
    );
  });

  return matches.slice(0, limit);
}

/**
 * Convert color name to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get color statistics
 */
export function getColorStats() {
  const manufacturers = getAllManufacturers();
  const totalColors = manufacturers.reduce((sum, m) => sum + m.totalColors, 0);

  return {
    totalManufacturers: manufacturers.length,
    totalColors,
    byRegion: manufacturers.reduce((acc, m) => {
      acc[m.region] = (acc[m.region] || 0) + m.totalColors;
      return acc;
    }, {} as Record<string, number>),
  };
}
