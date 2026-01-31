import { TOCItem } from './types';

/**
 * Extract table of contents from markdown content
 * Only extracts H2 and H3 headers
 */
export function extractTOC(content: string): TOCItem[] {
  const toc: TOCItem[] = [];
  const headerRegex = /^(#{2,3})\s+(.+)$/gm;

  let match;
  while ((match = headerRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugify(text);

    toc.push({ id, text, level });
  }

  return toc;
}

/**
 * Convert header text to URL-safe slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Spaces to dashes
    .replace(/-+/g, '-') // Multiple dashes to single
    .replace(/^-|-$/g, ''); // Trim dashes
}

/**
 * Add IDs to headers in HTML content
 */
export function addHeaderIds(htmlContent: string): string {
  return htmlContent.replace(
    /<h([23])>([^<]+)<\/h[23]>/g,
    (match, level, text) => {
      const id = slugify(text);
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );
}
