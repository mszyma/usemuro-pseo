import { Color } from './loader';

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Validate that a color has valid RGB values
 */
function hasValidRgb(color: Color): boolean {
  return !!(
    color.rgb &&
    typeof color.rgb.r === 'number' &&
    typeof color.rgb.g === 'number' &&
    typeof color.rgb.b === 'number' &&
    !isNaN(color.rgb.r) &&
    !isNaN(color.rgb.g) &&
    !isNaN(color.rgb.b)
  );
}

/**
 * Calculate color distance using HSL color space
 * Returns a value between 0 (identical) and ~100 (very different)
 */
function calculateColorDistance(color1: Color, color2: Color): number {
  const hsl1 = rgbToHsl(color1.rgb.r, color1.rgb.g, color1.rgb.b);
  const hsl2 = rgbToHsl(color2.rgb.r, color2.rgb.g, color2.rgb.b);

  // Hue difference (circular)
  let hueDiff = Math.abs(hsl1.h - hsl2.h);
  if (hueDiff > 180) hueDiff = 360 - hueDiff;

  // Saturation and lightness differences
  const satDiff = Math.abs(hsl1.s - hsl2.s);
  const lightDiff = Math.abs(hsl1.l - hsl2.l);

  // Weighted distance formula
  // Hue is most important, then lightness, then saturation
  const distance = Math.sqrt(
    Math.pow(hueDiff / 180, 2) * 3 +  // Hue weight: 3
    Math.pow(lightDiff / 100, 2) * 2 + // Lightness weight: 2
    Math.pow(satDiff / 100, 2) * 1     // Saturation weight: 1
  );

  return distance * 100;
}

/**
 * Find similar colors to a given color
 */
export function findSimilarColors(
  targetColor: Color,
  allColors: Color[],
  limit: number = 12
): Color[] {
  // Validate target color first
  if (!hasValidRgb(targetColor)) {
    return [];
  }

  // Calculate distances for all colors
  const distances = allColors
    .filter(color => color.id !== targetColor.id) // Exclude the target color itself
    .filter(hasValidRgb) // Ensure valid RGB
    .map(color => ({
      color,
      distance: calculateColorDistance(targetColor, color),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return distances.map(d => d.color);
}

/**
 * Find colors in the same category as the target
 */
export function findSameCategoryColors(
  targetColor: Color,
  allColors: Color[],
  limit: number = 12
): Color[] {
  return allColors
    .filter(color =>
      color.id !== targetColor.id &&
      color.category === targetColor.category
    )
    .slice(0, limit);
}

/**
 * Get complementary colors (opposite on color wheel)
 */
export function findComplementaryColors(
  targetColor: Color,
  allColors: Color[],
  limit: number = 6
): Color[] {
  // Validate target color first
  if (!hasValidRgb(targetColor)) {
    return [];
  }

  const targetHsl = rgbToHsl(targetColor.rgb.r, targetColor.rgb.g, targetColor.rgb.b);

  // Complementary hue is 180 degrees opposite
  const complementaryHue = (targetHsl.h + 180) % 360;

  const distances = allColors
    .filter(color => color.id !== targetColor.id)
    .filter(hasValidRgb) // Ensure valid RGB
    .map(color => {
      const hsl = rgbToHsl(color.rgb.r, color.rgb.g, color.rgb.b);
      let hueDiff = Math.abs(hsl.h - complementaryHue);
      if (hueDiff > 180) hueDiff = 360 - hueDiff;

      return {
        color,
        distance: hueDiff,
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return distances.map(d => d.color);
}
