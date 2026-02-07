/**
 * Remark plugin to add inline color swatches to blog articles
 *
 * Transforms color mentions like "Simply White by Benjamin Moore (OC-117)"
 * into linked swatches with hover previews.
 *
 * Also detects standalone color names like "Sea Salt" or "Swiss Coffee"
 * that appear without the "by Brand" pattern.
 */

import { visit } from 'unist-util-visit';
import type { Root, Text, Html } from 'mdast';
import { findColorMatch, getColorUrl, findColorByNameOnly, getIndexedColorNames, type ColorMatch } from './color-index';
import { findColorMentions, findStandaloneColors, type ColorMention, type StandaloneColorMention } from './color-patterns';

export interface RemarkColorSwatchesOptions {
  lang: string;
}

/**
 * Generate HTML for a color swatch with "by Brand" pattern
 */
function generateSwatchHtml(
  match: ColorMatch,
  mention: ColorMention,
  lang: string
): string {
  const url = getColorUrl(match, lang);
  const hex = match.hexColor.startsWith('#') ? match.hexColor : `#${match.hexColor}`;

  // Escape any special characters in the color name for HTML
  const escapedColorName = mention.colorName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Build the swatch HTML
  // Structure: <a href="url" class="color-swatch">
  //   <span class="color-swatch-box" style="background:hex"></span>
  //   <span class="color-swatch-preview" style="background:hex"></span>
  //   Color Name
  // </a> by Manufacturer (CODE)

  const swatchHtml = `<a href="${url}" class="color-swatch" title="${escapedColorName} - ${match.manufacturerDisplayName}"><span class="color-swatch-box" style="background:${hex}"></span><span class="color-swatch-preview" style="background:${hex}"></span>${mention.colorName}</a>`;

  // Reconstruct the rest of the mention (by/von/od Manufacturer (Code))
  let rest = '';
  if (lang === 'de') {
    rest = ` von ${mention.manufacturer}`;
  } else if (lang === 'pl') {
    // Detect whether original used 'od' or 'z'
    rest = mention.fullMatch.includes(' od ') ? ` od ${mention.manufacturer}` : ` z ${mention.manufacturer}`;
  } else {
    rest = ` by ${mention.manufacturer}`;
  }

  if (mention.code) {
    rest += ` (${mention.code})`;
  }

  return swatchHtml + rest;
}

/**
 * Generate HTML for a standalone color swatch (without manufacturer)
 */
function generateStandaloneSwatchHtml(
  match: ColorMatch,
  colorName: string,
  lang: string
): string {
  const url = getColorUrl(match, lang);
  const hex = match.hexColor.startsWith('#') ? match.hexColor : `#${match.hexColor}`;

  // Escape any special characters in the color name for HTML
  const escapedColorName = colorName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Build the swatch HTML - same structure but simpler since no "by Brand" follows
  return `<a href="${url}" class="color-swatch" title="${escapedColorName} - ${match.manufacturerDisplayName}"><span class="color-swatch-box" style="background:${hex}"></span><span class="color-swatch-preview" style="background:${hex}"></span>${colorName}</a>`;
}

/**
 * Process a text node and replace color mentions with swatches
 */
function processTextNode(
  text: string,
  lang: string
): Array<Text | Html> {
  // First, find "Color by Brand" pattern mentions
  const brandMentions = findColorMentions(text, lang);

  // Build list of ranges to exclude from standalone search
  const excludeRanges: Array<{ start: number; end: number }> = [];

  // Collect all replacements (both brand mentions and standalone)
  const replacements: Array<{
    startIndex: number;
    endIndex: number;
    html: string;
  }> = [];

  // Process brand mentions
  for (const mention of brandMentions) {
    const match = findColorMatch(
      mention.colorName,
      mention.manufacturerId,
      mention.code
    );

    if (match) {
      replacements.push({
        startIndex: mention.startIndex,
        endIndex: mention.endIndex,
        html: generateSwatchHtml(match, mention, lang),
      });
      excludeRanges.push({
        start: mention.startIndex,
        end: mention.endIndex,
      });
    }
  }

  // Now find standalone color names (not part of "by Brand" patterns)
  const indexedNames = getIndexedColorNames();
  const standaloneMatches = findStandaloneColors(text, indexedNames, excludeRanges);

  for (const standalone of standaloneMatches) {
    const match = findColorByNameOnly(standalone.colorName);

    if (match) {
      // Check if this range doesn't overlap with any existing replacement
      const overlaps = replacements.some(
        r =>
          (standalone.startIndex >= r.startIndex && standalone.startIndex < r.endIndex) ||
          (standalone.endIndex > r.startIndex && standalone.endIndex <= r.endIndex)
      );

      if (!overlaps) {
        replacements.push({
          startIndex: standalone.startIndex,
          endIndex: standalone.endIndex,
          html: generateStandaloneSwatchHtml(match, standalone.colorName, lang),
        });
      }
    }
  }

  if (replacements.length === 0) {
    return [{ type: 'text', value: text }];
  }

  // Sort replacements by position
  replacements.sort((a, b) => a.startIndex - b.startIndex);

  // Build result array
  const result: Array<Text | Html> = [];
  let lastIndex = 0;

  for (const replacement of replacements) {
    // Add text before this replacement
    if (replacement.startIndex > lastIndex) {
      result.push({
        type: 'text',
        value: text.slice(lastIndex, replacement.startIndex),
      });
    }

    // Add the swatch HTML
    result.push({
      type: 'html',
      value: replacement.html,
    });

    lastIndex = replacement.endIndex;
  }

  // Add any remaining text after the last replacement
  if (lastIndex < text.length) {
    result.push({
      type: 'text',
      value: text.slice(lastIndex),
    });
  }

  return result;
}

/**
 * Remark plugin that transforms color mentions into inline swatches
 */
export function remarkColorSwatches(options: RemarkColorSwatchesOptions) {
  const { lang } = options;

  return (tree: Root) => {
    // Skip expensive color indexing in development mode for faster page loads
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    // We need to collect all changes first, then apply them
    // to avoid modifying the tree while iterating
    const changes: Array<{
      parent: { children: Array<Text | Html | any> };
      index: number;
      newNodes: Array<Text | Html>;
    }> = [];

    visit(tree, 'text', (node: Text, index: number | undefined, parent: any) => {
      // Skip if no parent or no index (shouldn't happen)
      if (index === undefined || !parent) return;

      // Skip text in code blocks or inline code
      if (parent.type === 'code' || parent.type === 'inlineCode') return;

      const text = node.value;

      // Skip very short text nodes
      if (text.length < 5) return;

      const newNodes = processTextNode(text, lang);

      // Only mark for change if we actually found and replaced colors
      if (newNodes.length > 1 || (newNodes.length === 1 && newNodes[0].type === 'html')) {
        changes.push({ parent, index, newNodes });
      }
    });

    // Apply changes in reverse order to maintain correct indices
    for (let i = changes.length - 1; i >= 0; i--) {
      const { parent, index, newNodes } = changes[i];
      parent.children.splice(index, 1, ...newNodes);
    }
  };
}
