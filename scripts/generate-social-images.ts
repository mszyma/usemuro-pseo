#!/usr/bin/env npx ts-node

/**
 * Social Media Image Generator for Visual Content Designs
 *
 * Generates 30 images (10 designs × 3 formats) based on specs in
 * /specs/visual-content-designs.md
 *
 * Usage:
 *   npx ts-node scripts/generate-social-images.ts
 *   npx ts-node scripts/generate-social-images.ts --design 1
 *   npx ts-node scripts/generate-social-images.ts --format feed
 *   npx ts-node scripts/generate-social-images.ts --design 5 --format stories
 *   npx ts-node scripts/generate-social-images.ts --dry-run
 *
 * Environment:
 *   GEMINI_API_KEY - Your Gemini API key
 */

import * as fs from 'fs';
import * as path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'social');

// ─── Format specs ──────────────────────────────────────────────

type Format = 'feed' | 'stories' | 'reels-cover';

interface FormatSpec {
  width: number;
  height: number;
  label: string;
  geminiSize: string; // closest supported Gemini output size
}

const FORMAT_SPECS: Record<Format, FormatSpec> = {
  feed: {
    width: 1080,
    height: 1080,
    label: 'Instagram Feed (1:1)',
    geminiSize: '1024x1024',
  },
  stories: {
    width: 1080,
    height: 1920,
    label: 'Instagram Stories (9:16)',
    geminiSize: '1024x1792',
  },
  'reels-cover': {
    width: 1080,
    height: 1920,
    label: 'Reels Cover (9:16)',
    geminiSize: '1024x1792',
  },
};

const FORMATS: Format[] = ['feed', 'stories', 'reels-cover'];

// ─── Design definitions ────────────────────────────────────────

interface DesignDef {
  number: number;
  slug: string;
  name: string;
  prompts: Record<Format, string>;
}

/**
 * Each prompt is painstakingly crafted to match the layout spec in
 * visual-content-designs.md, targeting the exact colors, composition,
 * and emotional tone described there. Gemini image generation works
 * best with concrete, scene-based descriptions.
 */
const DESIGNS: DesignDef[] = [
  // ── 1. The Swatch Graveyard ────────────────────────────────
  {
    number: 1,
    slug: 'swatch-graveyard',
    name: 'The Swatch Graveyard',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with a clean diagonal split composition.
        LEFT HALF (slightly desaturated, warm off-white overlay): A flat-lay photograph of dozens of paint color swatches and sample chips scattered chaotically on a white marble kitchen countertop. Include visible swatches in warm beige (#C7BFB2), soft gray (#B5AA9A), cream (#C7B9A1), and off-white (#F0EBE0). The mess conveys overwhelm and indecision.
        RIGHT HALF (vibrant, clean): A smartphone screen showing a single beautiful room wall painted in deep navy blue (#3C4F6E). The phone display is crisp and clear, showing a modern living room with the navy wall looking perfect.
        The diagonal split goes from top-left to bottom-right.
        Bottom area has subtle text space on a clean white (#FAFAF8) background.
        Style: editorial product photography, natural soft lighting, modern and clean aesthetic. No visible text or watermarks in the image.
      `,
      stories: `
        Create a 9:16 vertical social media graphic.
        TOP SECTION (45%): An overhead flat-lay photograph of dozens of paint color swatches and sample chips scattered messily on a white marble surface. Colors include warm beige (#C7BFB2), soft gray (#B5AA9A), cream (#C7B9A1), off-white (#F0EBE0). Slightly desaturated and chaotic, conveying overwhelm.
        CENTER: A clean white band with space for a downward arrow graphic.
        BOTTOM SECTION (45%): A smartphone mockup showing a beautiful living room with one wall painted in rich navy blue (#3C4F6E). The room looks elegant and resolved. Clean, bright, vibrant.
        Background: clean warm white (#FAFAF8).
        Style: editorial product photography, natural lighting, modern minimalist. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical social media cover image.
        Background: A slightly transparent (30% opacity feel) flat-lay of scattered paint swatches on a light surface — beige, gray, cream tones visible but faded.
        Center focus: A large smartphone mockup showing a modern living room wall painted in elegant deep navy (#3C4F6E). The phone screen is sharp and bright, contrasting against the faded swatch background.
        The composition conveys "clarity emerging from chaos."
        Top and bottom have generous space for text overlays.
        Style: clean, modern, editorial. No text or watermarks.
      `,
    },
  },

  // ── 2. The $400 Mistake ────────────────────────────────────
  {
    number: 2,
    slug: '400-dollar-mistake',
    name: 'The $400 Mistake',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with a 50/50 vertical split.
        LEFT PANEL (labeled "BEFORE"): A modern living room with a wall painted in an unflattering yellow-green (#C9B64C) that looks sickly under warm LED lighting. The room has warm wood floors (#A08060), a linen sofa (#E8E0D4), and brass accents. The wall color clearly looks like a regrettable choice — slightly greenish-yellow and clashing with the decor. Subtle warm reddish tint overlay.
        RIGHT PANEL (labeled "AFTER"): The exact same living room composition, but the wall is now painted in a beautiful, flattering sage green (#8B9A7E). Everything looks harmonious and intentional. A small phone outline in the bottom-right corner shows a paint visualization app interface. Subtle cool greenish tint.
        A thin white divider line separates the two panels.
        Background: warm white (#FAFAF8). Style: interior design photography, natural warm lighting, editorial quality. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic with two stacked room photographs.
        TOP PHOTO (50%): A modern living room with walls painted in an unflattering yellow-green (#C9B64C). Warm wood floors, linen sofa, brass accents. The color looks sickly and wrong — a clear decorating mistake. Slightly reddish warm tint overlay.
        BOTTOM PHOTO (50%): The exact same living room, but walls painted in beautiful sage green (#8B9A7E). Everything looks harmonious. A small phone mockup in the corner shows a color visualization app. Subtle green tint.
        Between the two photos: a clean white band for transition text space.
        Top and bottom have space for headline and CTA text.
        Style: interior design editorial photography, natural lighting. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical social media cover with dramatic contrast.
        TOP HALF: Close-up of a living room wall painted in unflattering yellow-green (#C9B64C) — the color looks sickly under warm LED light. Visible paint roller marks suggest it was just painted. Conveys regret.
        BOTTOM HALF: The same wall now painted in beautiful sage green (#8B9A7E), with styled decor — a framed print, a plant on a shelf, warm lighting. Conveys satisfaction and confidence.
        Strong contrast between the two halves. Clean white divider between them.
        Generous space at very top and bottom for text overlays.
        Style: interior photography, editorial quality. No text or watermarks.
      `,
    },
  },

  // ── 3. North-Facing Room Trap ──────────────────────────────
  {
    number: 3,
    slug: 'north-facing-room-trap',
    name: 'North-Facing Room Trap',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic showing the same room in two lighting conditions side-by-side.
        LEFT PANEL: A beautiful bedroom painted in Benjamin Moore Chantilly Lace white (#F5F0E7). The room has south-facing windows with warm, bright natural sunlight streaming in. The white walls look crisp, clean, and truly white. Light oak furniture (#C4A872), white linen bedding (#F2EDE4), matte black lamp. Warm color temperature ~5500K feel.
        RIGHT PANEL: The exact same bedroom composition, same white paint, but with north-facing lighting. The walls now appear dingy, slightly yellow-gray (#E8E3D2). The light is flat, cool, and unflattering. The same furnishings look dull. Cool color temperature ~7500K feel.
        A thin white divider separates the panels.
        Small sun icon suggestion on left side, cloud icon suggestion on right side.
        Below the panels: space for color name and details.
        Style: interior design photography showing dramatic lighting differences. Photorealistic, no text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic showing lighting's effect on paint color.
        TOP PHOTO (45%): A bedroom with white walls (#F5F0E7) bathed in warm, south-facing sunlight. The white looks crisp and beautiful. Light oak furniture, white linens, matte black accents. Bright and inviting.
        CENTER BAND: Clean white space for a label.
        BOTTOM PHOTO (45%): The exact same bedroom, same white paint, but under flat north-facing light. The walls now read as yellow-gray (#E8E3D2). Everything looks washed out and dingy.
        The contrast should be striking — same paint, dramatically different appearance.
        Style: editorial interior photography demonstrating lighting effects. Photorealistic, no text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        Full-bleed photo of a north-facing room with "white" walls that appear dingy and yellow-gray (#E8E3D2) under flat, cool lighting. A single window shows overcast sky. The room feels unwelcoming despite nice furniture (light oak, white linens). The white paint looks like a disappointment.
        Center: A phone mockup showing the same room but properly visualized — the correct white (#F5F0E7) looking crisp and beautiful.
        Generous space at top and bottom for text overlays.
        Style: interior photography, moody north-light atmosphere contrasting with phone's bright visualization. No text or watermarks.
      `,
    },
  },

  // ── 4. Swipe to Transform ─────────────────────────────────
  {
    number: 4,
    slug: 'swipe-to-transform',
    name: 'Swipe to Transform',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic showing a modern living room with bare, unpainted walls.
        The room has raw drywall/primer gray (#D4D0CC) walls — clearly unfinished and awaiting paint. The room otherwise has beautiful mid-century modern furniture: a walnut credenza, a cream sofa, brass floor lamp, a large fiddle leaf fig plant, hardwood floors.
        The empty gray walls are the focal point — they look blank and full of potential, waiting to be transformed with color.
        Natural light comes through large windows. The composition is straight-on, clean, and magazine-quality.
        The image conveys anticipation — "this room is about to become something beautiful."
        Style: editorial interior photography, bright natural lighting, aspirational but accessible. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic.
        A modern living room with walls freshly painted in a warm, earthy sage green (#8B9A7E — Sherwin-Williams Evergreen Fog). The room has mid-century modern furniture: walnut credenza, cream sofa, brass lamp, fiddle leaf fig, hardwood floors. The sage green walls tie everything together beautifully.
        Below the room photo (bottom 35%): a clean white (#FAFAF8) card-like area showing a circle color swatch of the sage green, with space for color name text.
        The mood is calm, grounded, and resolved — the color choice feels perfect.
        Style: editorial interior design photography, natural daylight. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image of a modern living room with bare primer-gray walls (#D4D0CC), mid-century modern furniture — walnut credenza, cream sofa, brass lamp, plants. The walls are clearly unfinished, awaiting color.
        The composition is inviting and anticipatory — the room is beautiful except for the blank walls.
        Large space at top and bottom for text overlays.
        Style: bright, editorial interior photography. No text or watermarks.
      `,
    },
  },

  // ── 5. The 3 AM Panic ─────────────────────────────────────
  {
    number: 5,
    slug: '3am-panic',
    name: 'The 3 AM Panic',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with two stacked scenes in rounded-corner panels.
        TOP PANEL (dark, nighttime): A person lying in bed at night, illuminated only by the blue-white glow of their phone screen. The room is dark navy (#1A1A2E). Floating around them are translucent, ghostly paint color swatches in beige (#C7BFB2), gray (#B5AA9A), cream (#C7B9A1), and off-white (#F0EBE0) — all at partial transparency, representing the colors haunting their thoughts. The scene conveys late-night anxiety and decision paralysis.
        BOTTOM PANEL (warm, morning): The same person sleeping peacefully in a warm, sunlit bedroom (#FDF6EC warm cream tones). A phone on the nightstand shows a paint visualization app with a selected color on a wall. Morning light streams through curtains. The mood is calm and resolved.
        Rounded corners on both panels (16px feel). Small gap between them.
        Style: lifestyle photography, cinematic lighting, relatable and slightly humorous. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic with two stacked scenes.
        TOP SCENE (55%): A person in bed at night, lit by phone screen glow against a dark navy room (#1A1A2E). Floating translucent paint swatches surround them — beige, gray, cream tones. The blue phone light creates an anxious, insomniac atmosphere. They're clearly scrolling through paint color options at 3 AM.
        CENTER: A clean divider band.
        BOTTOM SCENE (35%): The same person sleeping peacefully in warm morning light (#FDF6EC). Phone on nightstand shows a paint visualization app. Sunlight through curtains. Calm, resolved atmosphere.
        The contrast between nighttime anxiety and morning peace is the story.
        Style: cinematic lifestyle photography, relatable mood. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        Full scene: A person lying in bed at night, face illuminated by the blue-white glow of their smartphone. The room is dark navy (#1A1A2E). Semi-transparent paint swatches in beige, gray, and cream tones float around them like ghosts — representing the endless paint color options haunting their thoughts.
        The phone screen shows a grid of paint color options. The mood is relatable anxiety — the universal experience of late-night over-researching.
        Generous space at top and bottom for text overlays.
        Style: cinematic, moody, lifestyle photography. Slightly humorous. No text or watermarks.
      `,
    },
  },

  // ── 6. Undertone Revealed ──────────────────────────────────
  {
    number: 6,
    slug: 'undertone-revealed',
    name: 'Undertone Revealed',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with an educational, "x-ray" concept.
        CENTER: A large, photorealistic paint color chip/swatch card in what appears to be a neutral gray (#B5ADA5 — Sherwin-Williams Repose Gray). The swatch is centered on a clean white (#FAFAF8) background with a subtle drop shadow.
        OVERLAID on the swatch: A circular magnifying glass or "reveal" circle (200px diameter feel) that shows the hidden pink undertone — inside the circle, the gray shifts to a warm pink-gray (#C9A8A0), revealing the secret undertone.
        BELOW THE SWATCH: Two small rectangular room preview images side by side:
        — Left: A room wall in the gray at morning (cool, neutral #BCB4AC).
        — Right: The same room wall at evening (warm lighting reveals the pink undertone #C4AEA6).
        Style: product photography meets educational infographic. Clean, modern, white background. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic.
        TOP (40%): A large paint color chip/swatch in neutral gray (#B5ADA5) on a clean white background. A circular magnifying lens overlay reveals the hidden pink undertone (#C9A8A0) within the gray.
        MIDDLE (20%): Clean white space for text.
        BOTTOM (40%): A room photograph showing walls painted in this gray color under warm evening light (2700K), where the pink undertone is clearly visible (#C4AEA6). The room has warm wood furniture and soft lighting that pulls out the hidden pink.
        The composition reveals a "secret" — what looks gray is actually pink.
        Style: clean editorial, product photography meets interior design. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        CENTER: A giant paint color chip/swatch in neutral gray (#B5ADA5) fills the middle of the frame on a clean white background. A dramatic circular "reveal" zone on the swatch shows the hidden pink undertone (#C9A8A0), as if the gray paint is being x-rayed to show what's underneath.
        The concept is a paint color "secret being exposed."
        Generous space at top and bottom for text overlays.
        Style: clean product photography with a dramatic reveal element. White background. No text or watermarks.
      `,
    },
  },

  // ── 7. Color Confidence Score ──────────────────────────────
  {
    number: 7,
    slug: 'color-confidence-score',
    name: 'Color Confidence Score',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with a dashboard/infographic design.
        TWO STACKED CARDS on a clean white (#FAFAF8) background:
        TOP CARD: Light red-tinted background (#FEF2F2). Features a circular progress gauge/ring showing 23%. The gauge ring is red-to-orange gradient (#EF4444 to #F97316), mostly empty. Next to it, three items with red X marks: checklist items suggesting failure/uncertainty. The mood is "low confidence, guessing."
        BOTTOM CARD: Light green-tinted background (#F0FDF4). Features a circular progress gauge/ring showing 94%. The gauge ring is green gradient (#22C55E to #16A34A), nearly full. Next to it, three items with green checkmarks suggesting confidence and verification. The mood is "high confidence, certain."
        Both cards have subtle borders, rounded corners (16px), and clean modern styling.
        The contrast between red/23% and green/94% should be immediately striking.
        Style: clean data visualization, modern UI design, flat/minimal aesthetic. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic.
        Two stacked dashboard cards on white (#FAFAF8) background, with more vertical breathing room.
        TOP CARD (40%): Rose-tinted (#FEF2F2) card with a large circular gauge at 23% in red-orange (#EF4444). Three red X checklist items beside it. Low confidence mood.
        BOTTOM CARD (40%): Green-tinted (#F0FDF4) card with a large circular gauge at 94% in green (#22C55E). Three green checkmark items beside it. High confidence mood.
        Space above, between, and below for text.
        Style: modern UI dashboard aesthetic, clean infographic design. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        Clean white (#FAFAF8) background.
        UPPER CENTER: A large circular gauge showing 23% in red/orange (#EF4444), nearly empty, looking alarming.
        LOWER CENTER: A large circular gauge showing 94% in green (#22C55E), nearly full, looking confident and positive.
        The two gauges are the dominant visual elements, stacked vertically with space between them. Minimal decoration — just the gauges and clean backgrounds.
        Generous space at top and bottom for text.
        Style: minimal data visualization, clean modern design. No text or watermarks.
      `,
    },
  },

  // ── 8. Real Room, Real Color ───────────────────────────────
  {
    number: 8,
    slug: 'real-room-real-color',
    name: 'Real Room, Real Color',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with a before/after slider effect.
        The image shows a mid-century modern living room split by a vertical "slider" divider line with a circular handle.
        LEFT HALF (BEFORE): The room has flat, blank white/primer walls (#E8E5E0). The walls look empty and undecided. The room has walnut mid-century furniture (#6B4226), cream textiles (#F0E8D8), a brass lamp (#C8A84E), and green plants. Semi-transparent question mark symbols float on the white walls.
        RIGHT HALF (AFTER): The exact same room, but with a stunning deep teal-green accent wall (#3A5C52 — BM Narragansett Green). The wall color transforms the entire space, making it feel intentional and designed. A small phone mockup in the bottom-right corner shows a paint visualization app with the teal selected.
        The vertical divider has a small white circular "drag" handle in the center.
        Style: interior design editorial photography, warm natural lighting, mid-century modern aesthetic. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic with a before/after slider concept.
        A mid-century modern living room shown in full vertical height, split by a vertical slider divider.
        LEFT: Flat primer-white walls (#E8E5E0), blank and undecided. Question mark shapes faintly visible. Walnut furniture, cream textiles, brass accents, plants.
        RIGHT: Beautiful deep teal-green accent wall (#3A5C52). The room is transformed and feels complete. A small phone mockup shows the color visualization app.
        Circular white slider handle on the divider line.
        Room fills top 70%. Bottom 30% is clean white space for text.
        Style: editorial interior photography. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        Background: A mid-century modern living room with blank primer-white walls (#E8E5E0) at 60% opacity. Walnut furniture, cream textiles, brass lamp, plants visible but slightly faded.
        CENTER: The same room but with a gorgeous deep teal accent wall (#3A5C52), shown in a rounded-corner frame with a subtle white glow/border effect. This "after" view is sharp, vibrant, and the focal point.
        The concept: the transformed room emerging from the blank canvas.
        Space at top and bottom for text.
        Style: editorial interior photography, modern design aesthetic. No text or watermarks.
      `,
    },
  },

  // ── 9. The Paint Store Paralysis ───────────────────────────
  {
    number: 9,
    slug: 'paint-store-paralysis',
    name: 'The Paint Store Paralysis',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic.
        BACKGROUND: A first-person POV photograph standing in a paint store aisle, staring at an overwhelming wall of hundreds of paint color sample chips/swatches arranged in rainbow order. The sheer quantity is the point — it's visually overwhelming. Apply a slight Gaussian blur (soft focus) and a dark overlay to push the background back.
        CENTER: A smartphone mockup (380px wide feel) showing a clean, simple paint visualization app interface with just 3 color options displayed on a real wall photo. The colors shown are warm beige (#C7BFB2), soft tan (#CEC1B0), and light beige (#C7B9A1). The phone screen is crisp and bright.
        A subtle white radial glow emanates from behind the phone, making it stand out against the dark, blurry background.
        The contrast: thousands of chips (overwhelming) vs. three colors on your wall (clarity).
        Style: lifestyle photography with product mockup. Atmospheric, editorial. No text or watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic.
        FULL BACKGROUND: Paint store aisle, hundreds of color chips on the wall, shot from eye-level POV. Gaussian blur and dark overlay (#000000 at 35%). Overwhelming, dizzying.
        CENTER: A large smartphone mockup (480px wide feel) showing a paint visualization app with 3 curated neutral colors on a real room wall. Beige (#C7BFB2), tan (#CEC1B0), light beige (#C7B9A1). Phone screen is sharp, bright, and inviting.
        White glow behind phone.
        Top 20% and bottom 25% have space for text (lighter overlay for readability).
        Style: atmospheric lifestyle photography, editorial. No text or watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        FULL BLEED: Paint store aisle shot from first-person POV, overwhelming wall of hundreds of color chips. Heavy Gaussian blur (12px feel) and dark overlay. The environment is dizzying and stressful.
        CENTER: A bright smartphone mockup showing a clean paint visualization with 3 simple color options on a real wall. The phone is the beacon of clarity in the chaos.
        Very generous space at top and bottom for text overlays (the dark overlay ensures readability).
        Style: dramatic atmospheric photography, phone mockup as focal point. No text or watermarks.
      `,
    },
  },

  // ── 10. Before You Buy a Single Can ────────────────────────
  {
    number: 10,
    slug: 'before-you-buy',
    name: 'Before You Buy a Single Can',
    prompts: {
      feed: `
        Create a 1:1 square social media graphic with two receipt-style cards side by side on a clean white (#FAFAF8) background.
        LEFT RECEIPT: Styled like a real paper receipt on slightly off-white paper (#F8F6F0) with a subtle shadow. It lists paint project costs — multiple line items going down the receipt. The total at the bottom is large and attention-grabbing in red (#EF4444). The receipt is slightly crumpled/tilted (2-3 degrees) to suggest carelessness. It represents an expensive paint mistake.
        RIGHT RECEIPT: Same paper receipt style but straight and neat. The line items show fewer purchases (efficient). The total at the bottom is in green (#22C55E), significantly lower. A green stamp-like overlay rotated (-15 degrees) reads as a "CONFIDENT" approval stamp in green (#22C55E) with a border.
        The two receipts are side by side with a small gap (16px feel).
        Below the receipts: clean space for savings text.
        Style: flat-lay product photography of paper receipts, minimal modern design. No readable text — just the visual pattern of receipt line items. No watermarks.
      `,
      stories: `
        Create a 9:16 vertical social media graphic with two receipt cards stacked vertically.
        TOP RECEIPT (40%): A paper receipt (#F8F6F0) showing multiple line items (paint costs). Slightly crumpled, tilted. Total in red (#EF4444) — expensive. Conveys waste and regret.
        CENTER: Clean white (#FAFAF8) space for transition text.
        BOTTOM RECEIPT (40%): A neat, straight paper receipt with fewer line items. Total in green (#22C55E) — affordable. Has a green "CONFIDENT" stamp overlay rotated -15 degrees. Conveys smart spending and certainty.
        Both receipts have subtle shadows and off-white (#F8F6F0) paper texture.
        Space at top and bottom for headline and CTA.
        Style: flat-lay product photography, minimal design. No readable text on receipts. No watermarks.
      `,
      'reels-cover': `
        Create a 9:16 vertical cover image.
        Clean white (#FAFAF8) background.
        Two paper receipts overlapping in the center of the frame, slightly angled. The "confident" receipt (green total, green stamp) is on top, partially covering the expensive receipt (red total, crumpled). Both on off-white paper (#F8F6F0) with subtle shadows.
        The composition suggests the smart choice triumphing over the wasteful one.
        Generous space at top for headline and bottom for savings number + CTA.
        Style: minimal flat-lay photography of paper receipts. No readable text. No watermarks.
      `,
    },
  },
];

// ─── Image generation ──────────────────────────────────────────

async function generateImage(
  prompt: string,
  outputPath: string,
  format: Format
): Promise<boolean> {
  if (!GEMINI_API_KEY) {
    console.error('  Error: GEMINI_API_KEY environment variable not set');
    console.log('  Set it with: export GEMINI_API_KEY=your_key');
    return false;
  }

  const spec = FORMAT_SPECS[format];
  const cleanPrompt = prompt.replace(/\s+/g, ' ').trim();

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a high-quality social media image. Dimensions: ${spec.width}x${spec.height}px (${spec.label}). ${cleanPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.95,
          topK: 32,
          maxOutputTokens: 8192,
          image_config: {
            image_size: spec.geminiSize,
          },
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`  API Error ${response.status}: ${error.substring(0, 200)}`);
      return false;
    }

    const data = await response.json();

    // Extract image from response (try multiple structures)
    const parts = data.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.data) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, buffer);
          return true;
        }
      }
    }

    console.error('  Unexpected response structure');
    return false;
  } catch (error) {
    console.error(`  Network/generation error: ${error}`);
    return false;
  }
}

function getOutputPath(design: DesignDef, format: Format): string {
  const ext = format === 'reels-cover' ? 'jpg' : 'png';
  return path.join(
    OUTPUT_DIR,
    `muro-${String(design.number).padStart(2, '0')}-${design.slug}-${format}.${ext}`
  );
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  // Parse --design N
  const designIdx = args.indexOf('--design');
  const filterDesign =
    designIdx !== -1 ? parseInt(args[designIdx + 1], 10) : undefined;

  // Parse --format feed|stories|reels-cover
  const formatIdx = args.indexOf('--format');
  const filterFormat =
    formatIdx !== -1 ? (args[formatIdx + 1] as Format) : undefined;

  console.log('\n  Social Media Image Generator');
  console.log('  ============================\n');

  if (dryRun) console.log('  DRY RUN — no images will be generated\n');

  // Filter designs and formats
  const designs = filterDesign
    ? DESIGNS.filter((d) => d.number === filterDesign)
    : DESIGNS;
  const formats = filterFormat ? [filterFormat] : FORMATS;

  if (designs.length === 0) {
    console.error(`  Design #${filterDesign} not found (valid: 1-10)`);
    process.exit(1);
  }

  const totalImages = designs.length * formats.length;
  console.log(
    `  Generating ${totalImages} images (${designs.length} designs x ${formats.length} formats)\n`
  );

  // Ensure output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let success = 0;
  let fail = 0;
  let current = 0;

  for (const design of designs) {
    console.log(`  Design ${design.number}: ${design.name}`);

    for (const format of formats) {
      current++;
      const outputPath = getOutputPath(design, format);
      const spec = FORMAT_SPECS[format];

      console.log(
        `    [${current}/${totalImages}] ${spec.label} -> ${path.basename(outputPath)}`
      );

      if (dryRun) {
        console.log(`    Prompt: "${design.prompts[format].replace(/\s+/g, ' ').trim().substring(0, 100)}..."`);
        console.log(`    Output: ${outputPath}`);
        continue;
      }

      // Check if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`    Already exists, skipping`);
        success++;
        continue;
      }

      const ok = await generateImage(design.prompts[format], outputPath, format);
      if (ok) {
        console.log(`    Saved: ${outputPath}`);
        success++;
      } else {
        fail++;
      }

      // Rate limit between API calls
      if (current < totalImages) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log('');
  }

  console.log('  ================================');
  console.log(`  Total:     ${totalImages}`);
  if (!dryRun) {
    console.log(`  Generated: ${success}`);
    console.log(`  Failed:    ${fail}`);
  }
  console.log(`  Output:    ${OUTPUT_DIR}`);
  console.log('  ================================\n');

  if (!dryRun && fail > 0) {
    console.log('  To retry failed images, run again (existing files are skipped).');
    console.log('  To regenerate a specific image, delete it first then re-run.\n');
  }
}

main();
