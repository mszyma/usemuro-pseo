# Visual Content Designs: AI Wall Color Visualization

> 10 social media design concepts targeting homeowners in the emotional moment of choosing a paint color and fearing regret. Every design features a before/after or transformation element.

---

## Global Design System

### Brand Foundation

| Element | Value |
|---------|-------|
| **Brand** | Muro |
| **Tagline** | See it before you paint it |
| **Voice** | Confident, warm, direct — like a friend who happens to know paint |
| **Platform** | iOS (iPhone & iPad) |

### Typography Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Headlines** | Inter | 700 (Bold) | SF Pro Display, system-ui |
| **Subheads** | Inter | 500 (Medium) | SF Pro Text, system-ui |
| **Body / Captions** | Inter | 400 (Regular) | SF Pro Text, system-ui |
| **Accent / CTA** | Inter | 600 (SemiBold) | SF Pro Display, system-ui |

Inter is chosen for its clean geometry, excellent screen rendering at all sizes, and approachable character — modern without feeling cold or designer-pretentious.

### Base Color Palette (UI / Chrome)

| Name | Hex | Usage |
|------|-----|-------|
| Muro White | `#FAFAF8` | Backgrounds, light mode base |
| Soft Charcoal | `#2D2D2D` | Primary text |
| Warm Gray | `#8C8C88` | Secondary text, captions |
| Muro Accent | `#3B82F6` | CTAs, links, interactive elements |
| Success Green | `#22C55E` | Positive indicators, "after" badges |
| Regret Red | `#EF4444` | Negative indicators, "before" pain |

### Export Dimensions

| Format | Dimensions | Aspect Ratio | Safe Zone (inset from edges) |
|--------|-----------|--------------|------------------------------|
| **Instagram Feed** | 1080 x 1080 px | 1:1 | 60 px all sides |
| **Instagram Stories** | 1080 x 1920 px | 9:16 | 60 px sides, 200 px top, 340 px bottom |
| **Reels Cover** | 1080 x 1920 px | 9:16 | 60 px sides, 250 px top, 420 px bottom |

Safe zones account for platform UI overlays (profile icons, like buttons, captions, swipe-up zones).

---

## Design 1: "The Swatch Graveyard"

### Concept

A flat-lay photo of dozens of paint swatches scattered on a kitchen counter (the "before" — chaotic, overwhelming) transforms into a single clean phone screen showing the chosen color on an actual wall (the "after" — clarity). Targets the emotional overwhelm of too many choices.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│                             │
│   [LEFT 50%]   [RIGHT 50%] │
│                             │
│   Swatch chaos  Phone mock  │
│   photograph    showing one │
│   (desaturated  color on    │
│    slightly)    real wall   │
│                 (vibrant)   │
│                             │
│ ─ ─ ─ diagonal split ─ ─ ─ │
│                             │
│  "50 swatches"  "1 perfect  │
│                  match"     │
│                             │
│         [Muro logo bottom   │
│          center, small]     │
└─────────────────────────────┘
```

- **Split**: Diagonal from top-left to bottom-right. Left side slightly desaturated. Right side full saturation.
- **Headline**: Top-left corner, `"Still guessing?"` — Inter Bold 48px, Soft Charcoal.
- **Counter text**: Left: `"50 swatches"` in Regret Red, 36px Medium. Right: `"1 perfect match"` in Success Green, 36px Medium.
- **CTA badge**: Bottom-right, rounded pill — `"See it before you paint it"` — Muro Accent background, white text, 20px SemiBold.
- **Logo**: Muro wordmark, bottom center, 18px, Warm Gray.

#### Stories (1080 x 1920)

```
┌─────────────────────────────┐
│  "Still guessing?"          │
│  Inter Bold 56px            │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │  BEFORE: swatch chaos │  │
│  │  (top photo)          │  │
│  │                       │  │
│  ├───────────────────────┤  │
│  │  animated arrow ↓     │  │
│  ├───────────────────────┤  │
│  │                       │  │
│  │  AFTER: phone showing │  │
│  │  color on wall        │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  [CTA pill]                 │
│  "Try Muro free"            │
│                             │
│  [Muro logo]                │
└─────────────────────────────┘
```

- Vertical stack. Before image top 45%. After image bottom 45%. 10% center band with directional arrow.
- Safe zones respected: 200px top padding, 340px bottom padding.

#### Reels Cover (1080 x 1920)

Same as Stories but headline and CTA positioned within the tighter safe zone (250px top, 420px bottom). Swatch image fills background at 30% opacity; phone mockup centered.

### Color Direction

- **Background (left/before)**: Desaturated with a `#F0EDE8` warm off-white overlay at 40% opacity.
- **Background (right/after)**: Clean Muro White `#FAFAF8`.
- **Featured wall color**: Benjamin Moore "Hale Navy" `#3C4F6E` — a safe, dramatic choice that reads well on screen.
- **Paint swatches visible**: Include recognizable chips in Sherwin-Williams Agreeable Gray `#C7BFB2`, BM White Dove `#F0EBE0`, SW Accessible Beige `#C7B9A1`, BM Revere Pewter `#B5AA9A`.

### Spacing

- Outer padding: 60px.
- Gap between before/after sections (Stories): 24px.
- Text-to-image gap: 32px.
- CTA pill padding: 16px vertical, 32px horizontal, 24px border-radius.

---

## Design 2: "The $400 Mistake"

### Concept

Split-screen showing the same living room wall painted in a color that looked good on the swatch but terrible on the wall (before) versus the room visualized correctly through Muro first (after). Targets the fear of wasting money on the wrong color.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│  "$400 mistake"    "$0 to   │
│  Inter Bold 44px    preview"│
│  Regret Red        Success  │
│                    Green    │
│ ┌────────────┬────────────┐ │
│ │            │            │ │
│ │  BEFORE    │  AFTER     │ │
│ │  Bad color │  Right     │ │
│ │  on wall   │  color     │ │
│ │  (real     │  previewed │ │
│ │   photo)   │  in Muro   │ │
│ │            │            │ │
│ └────────────┴────────────┘ │
│                             │
│  "The average paint redo    │
│   costs $380-$500"          │
│  Inter Regular 22px         │
│                             │
│  [Muro · See it before you  │
│   paint it]                 │
└─────────────────────────────┘
```

- **50/50 vertical split** with a 4px white divider line.
- Left side: warm-toned room photo with a regrettable yellow-green wall. Subtle red-tinted overlay at 8% opacity.
- Right side: same room composition, wall color corrected to a flattering sage. Phone frame overlay in bottom-right corner showing the Muro UI.
- **Before/After labels**: Top of each panel, pill badges — "BEFORE" on Regret Red, "AFTER" on Success Green, Inter SemiBold 16px, white text.
- **Stat line**: Centered below image. Inter Regular 22px, Warm Gray.

#### Stories (1080 x 1920)

```
┌─────────────────────────────┐
│                             │
│  "This was a $400 mistake"  │
│  Inter Bold 52px            │
│  Regret Red                 │
│                             │
│  ┌───────────────────────┐  │
│  │  BEFORE               │  │
│  │  (bad yellow-green    │  │
│  │   living room)        │  │
│  └───────────────────────┘  │
│          ↓ swipe feel ↓     │
│  ┌───────────────────────┐  │
│  │  AFTER                │  │
│  │  (corrected sage      │  │
│  │   + phone overlay)    │  │
│  └───────────────────────┘  │
│                             │
│  "This was free"            │
│  Inter Bold 40px            │
│  Success Green              │
│                             │
│  [CTA: Download Muro]       │
└─────────────────────────────┘
```

#### Reels Cover (1080 x 1920)

Before/after stacked vertically, headline `"$400 vs. $0"` centered over images. Muro logo and CTA within bottom safe zone.

### Color Direction

- **Regrettable wall color**: Sherwin-Williams "Funky Yellow" `#C9B64C` — reads sickly under common warm LED lighting.
- **Corrected wall color**: Benjamin Moore "Sage Wisdom" `#8B9A7E` — universally flattering sage green.
- **Room tones**: Warm wood floor `#A08060`, linen sofa `#E8E0D4`, brass accents `#C5A55A`.
- **Overlay tints**: Before panel — `#EF4444` at 6% opacity. After panel — `#22C55E` at 4% opacity.

### Typography

- **"$400 mistake"**: Inter Bold 44px, `#EF4444`.
- **"$0 to preview"**: Inter Bold 44px, `#22C55E`.
- **Stat line**: Inter Regular 22px, `#8C8C88`.
- **Before/After pills**: Inter SemiBold 16px, white on colored backgrounds.

### Spacing

- Outer padding: 60px.
- Split divider: 4px, `#FAFAF8`.
- Headline to image: 28px.
- Image to stat: 24px.
- Stat to footer: 20px.

---

## Design 3: "North-Facing Room Trap"

### Concept

The same "white" paint shown in two lighting conditions — a south-facing room where it looks crisp and clean, versus a north-facing room where it reads dingy gray/yellow. Muro's visualization shows the correct rendering for YOUR room's light. Targets the fear that colors will look completely different in your actual space.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│  "Same paint. Different     │
│   room. Different color."   │
│  Inter Bold 40px            │
│                             │
│ ┌────────────┬────────────┐ │
│ │            │            │ │
│ │  SOUTH     │  NORTH     │ │
│ │  FACING    │  FACING    │ │
│ │            │            │ │
│ │  Bright,   │  Muddy,    │ │
│ │  crisp     │  yellow    │ │
│ │  white     │  cast      │ │
│ │            │            │ │
│ │  ☀️ icon    │  🌥️ icon   │ │
│ └────────────┴────────────┘ │
│                             │
│  "BM Chantilly Lace OC-65"  │
│  "LRV 92 — but lighting     │
│   changes everything"       │
│                             │
│  [Muro sees what your       │
│   walls actually see]       │
└─────────────────────────────┘
```

- **Side-by-side rooms**, identical composition, different color temperature grading.
- Left panel: warm daylight, high contrast. Right panel: cool, flat light, slight yellow-green color shift.
- **Sun/cloud icons**: Simple line-art, 32px, positioned bottom-left of each panel.
- **Color name callout**: Centered, Inter Medium 24px, Soft Charcoal. LRV detail in Warm Gray 18px.

#### Stories (1080 x 1920)

Vertical stack: south-facing room top, "Same paint" label in center divider, north-facing room bottom. Swipe-up CTA: "See how colors look in YOUR light."

#### Reels Cover (1080 x 1920)

Full bleed north-facing room as background (the "problem"). Centered text overlay: `"Your white might not be white."` Phone mockup showing correct visualization overlaid bottom-center.

### Color Direction

- **Paint color**: Benjamin Moore Chantilly Lace `#F5F0E7` (OC-65, LRV 92).
- **South-facing render**: True white reading, warm sunlight tones. Color temp ~5500K feel.
- **North-facing render**: Shifts to `#E8E3D2` — noticeable yellow-gray cast. Color temp ~7500K feel.
- **Room furnishing tones**: Light oak `#C4A872`, white linen `#F2EDE4`, matte black accents `#1A1A1A`.

### Typography

- **Headline**: Inter Bold 40px, Soft Charcoal `#2D2D2D`.
- **Color name**: Inter Medium 24px, Soft Charcoal.
- **LRV detail**: Inter Regular 18px, Warm Gray `#8C8C88`.
- **Directional labels** ("South Facing" / "North Facing"): Inter SemiBold 18px, white, on semi-transparent dark pills (`#2D2D2D` at 70%).

### Spacing

- Outer padding: 60px.
- Headline to image: 32px.
- Panel gap (divider): 4px white.
- Image to color callout: 28px.
- Color name to LRV line: 8px.
- LRV line to CTA: 24px.

---

## Design 4: "Swipe to Transform"

### Concept

An interactive-feeling carousel post (or Stories sequence) showing a single bare room that gets "painted" swipe by swipe in different trending colors. Each slide shows the same room with a different wall color and rates it on a mood scale. Targets the desire to experiment without commitment.

### Layout Structure

#### Feed (1080 x 1080) — Carousel, 6 slides

**Slide 1 (Hook):**
```
┌─────────────────────────────┐
│                             │
│  Full-bleed photo:          │
│  bare, unpainted room       │
│  (drywall/primer gray)      │
│                             │
│  ┌─────────────────┐        │
│  │ "This room needs │       │
│  │  color. Swipe →" │       │
│  └─────────────────┘        │
│                             │
│         ← swipe →           │
│                             │
│  Muro logo, bottom-left     │
└─────────────────────────────┘
```

**Slides 2-5 (Color options):**
```
┌─────────────────────────────┐
│                             │
│  Same room, wall painted    │
│  in featured color          │
│                             │
│  ┌─────────────────────┐    │
│  │ Color swatch circle │    │
│  │ "SW Agreeable Gray" │    │
│  │  SW 7029 · LRV 60  │    │
│  └─────────────────────┘    │
│                             │
│  MOOD: ████████░░ Calm      │
│  (progress-bar style)       │
│                             │
│  "2 of 4 → swipe for more" │
└─────────────────────────────┘
```

**Slide 6 (CTA):**
```
┌─────────────────────────────┐
│                             │
│  "Why guess when you        │
│   can see it?"              │
│  Inter Bold 48px            │
│                             │
│  [4 mini thumbnails of      │
│   the 4 colors shown]       │
│                             │
│  [Download Muro — Free]     │
│  (Pill CTA button)          │
│                             │
│  "See it before you         │
│   paint it"                 │
│                             │
│  [App Store badge]          │
└─────────────────────────────┘
```

#### Stories (1080 x 1920)

Each color gets its own Story frame. Same layout adapted vertically — room photo top 60%, color info card bottom 40% on Muro White background.

#### Reels Cover (1080 x 1920)

Slide 1 layout adapted vertically. Bare room fills frame, headline overlay centered.

### Color Direction (4 Featured Colors)

| Slide | Color | Manufacturer | Hex | LRV | Mood |
|-------|-------|-------------|-----|-----|------|
| 2 | Agreeable Gray | Sherwin-Williams 7029 | `#C7BFB2` | 60 | Calm |
| 3 | Hale Navy | Benjamin Moore HC-154 | `#3C4F6E` | 8 | Dramatic |
| 4 | Alabaster | Sherwin-Williams 7008 | `#F0EBE0` | 82 | Airy |
| 5 | Evergreen Fog | Sherwin-Williams 9130 | `#8B9A7E` | 30 | Grounded |

- **Bare room walls**: Primer gray `#D4D0CC`.
- **Mood bar colors**: Match the featured paint color at full saturation. Empty portion: `#E5E5E3`.

### Typography

- **Slide headline**: Inter Bold 48px, white with dark text-shadow (`0 2px 8px rgba(0,0,0,0.5)`).
- **Color name**: Inter SemiBold 28px, Soft Charcoal.
- **Color code + LRV**: Inter Regular 18px, Warm Gray.
- **Mood label**: Inter Medium 20px, Soft Charcoal.
- **Pagination text**: Inter Regular 16px, Warm Gray.

### Spacing

- Outer padding: 60px.
- Color info card: 40px internal padding, 16px border-radius, `#FAFAF8` background, subtle shadow `0 2px 12px rgba(0,0,0,0.08)`.
- Mood bar: 8px height, 16px border-radius, full width minus 120px (for label).
- Slide counter to bottom: 32px.

---

## Design 5: "The 3 AM Panic"

### Concept

A relatable meme-format design showing someone at 3 AM staring at 47 browser tabs of paint colors (before) versus peacefully sleeping after using Muro to see the colors on their actual walls (after). Humorous, shareable, targets the anxiety spiral of paint decision paralysis.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│                             │
│  "Choosing paint colors:    │
│   a horror story"           │
│  Inter Bold 40px            │
│                             │
│ ┌───────────────────────┐   │
│ │ 3:47 AM               │   │
│ │                       │   │
│ │ Illustration: person  │   │
│ │ in bed, phone glow on │   │
│ │ face, surrounded by   │   │
│ │ floating paint swatches│   │
│ │                       │   │
│ │ "Is Accessible Beige  │   │
│ │  too beige? Or not    │   │
│ │  beige enough?"       │   │
│ └───────────────────────┘   │
│         ↓                   │
│ ┌───────────────────────┐   │
│ │ Same person, sleeping │   │
│ │ peacefully. Phone     │   │
│ │ shows Muro app with   │   │
│ │ selected color.       │   │
│ │                       │   │
│ │ "Downloaded Muro.     │   │
│ │  Saw it on my walls.  │   │
│ │  Picked in 5 minutes."│   │
│ └───────────────────────┘   │
│                             │
│  [Muro logo]                │
└─────────────────────────────┘
```

- **Two stacked panels** with thin divider, rounded corners (16px).
- Top panel: dark background `#1A1A2E` simulating nighttime. Phone screen glow effect (radial gradient from center, light blue `#93C5FD` at 15%).
- Bottom panel: warm morning tones, soft `#FDF6EC` background.
- **Before text** (panicked thought): Inter Regular Italic 20px, white at 90%.
- **After text** (resolved): Inter Medium 20px, Soft Charcoal.

#### Stories (1080 x 1920)

Top panel takes 55% of safe area, bottom panel 35%, with divider text "The next morning..." in center 10%.

#### Reels Cover (1080 x 1920)

Top panel (the 3 AM scene) fills the frame. Headline overlay at top. Punchline text `"There's a better way"` centered.

### Color Direction

- **Night scene background**: Deep navy `#1A1A2E`. Phone glow: `#93C5FD` at 15% radial.
- **Floating swatch colors**: SW Accessible Beige `#C7B9A1`, BM Revere Pewter `#B5AA9A`, SW Agreeable Gray `#C7BFB2`, BM Edgecomb Gray `#C9BFA8`, SW Alabaster `#F0EBE0`. All at 60% opacity, scattered.
- **Morning scene background**: Warm cream `#FDF6EC`.
- **Phone screen color (resolved)**: BM Simply White `#F1ECE1` shown on wall in Muro UI.

### Typography

- **Headline**: Inter Bold 40px, Soft Charcoal.
- **Time stamp "3:47 AM"**: Inter SemiBold 18px, Regret Red `#EF4444`.
- **Panic thought**: Inter Regular Italic 20px, `#FFFFFFE6` (white 90%).
- **Resolution text**: Inter Medium 20px, Soft Charcoal.
- **Divider text**: Inter Medium 16px, Warm Gray.

### Spacing

- Outer padding: 60px.
- Panel internal padding: 32px.
- Panel corner radius: 16px.
- Gap between panels: 16px.
- Time stamp to thought text: 12px.

---

## Design 6: "Undertone Revealed"

### Concept

A seemingly simple white or gray paint chip shown at center, then zoomed in / "x-rayed" to reveal the hidden undertone (pink, green, blue, yellow). Before: "It's just gray." After: "It's gray with a pink undertone — and here's how that looks on your wall at 6 PM." Educational and transformative.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│                             │
│  "Every gray has a secret"  │
│  Inter Bold 44px            │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │  Large paint chip     │  │
│  │  centered, appearing  │  │
│  │  neutral gray         │  │
│  │                       │  │
│  │  Magnifying circle    │  │
│  │  reveals pink         │  │
│  │  undertone zone       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  "Repose Gray SW 7015"      │
│  "Undertone: warm pink"     │
│                             │
│  ┌───────────┬────────────┐ │
│  │ Tiny wall │ Tiny wall  │ │
│  │ morning   │ evening    │ │
│  └───────────┴────────────┘ │
│                             │
│  "Muro shows the            │
│   undertone on YOUR walls"  │
└─────────────────────────────┘
```

- **Paint chip**: Centered, 480x320px with subtle drop shadow. Presented flat on white background.
- **Magnifying circle**: 200px diameter, positioned overlapping the chip. Inside the circle, the chip color is pushed to reveal the undertone — amplified saturation. Border: 3px `#2D2D2D`.
- **Mini wall previews**: Two 440x200px rounded rectangles showing the color on walls in morning (cool light) and evening (warm light).

#### Stories (1080 x 1920)

```
┌─────────────────────────────┐
│                             │
│  "It looks gray. But..."   │
│                             │
│  ┌───────────────────────┐  │
│  │  Large paint chip,    │  │
│  │  full width           │  │
│  │  with magnifier       │  │
│  └───────────────────────┘  │
│                             │
│  "It's actually pink."      │
│                             │
│  ┌───────────────────────┐  │
│  │  Wall render:         │  │
│  │  the pink undertone   │  │
│  │  visible at 6 PM      │  │
│  │  warm light           │  │
│  └───────────────────────┘  │
│                             │
│  [CTA: Reveal your          │
│   color's secret]           │
└─────────────────────────────┘
```

#### Reels Cover (1080 x 1920)

Giant paint chip fills center. Headline top. Magnifier circle over chip reveals undertone. Text at bottom within safe zone.

### Color Direction

- **Featured paint**: Sherwin-Williams Repose Gray `#B5ADA5` (SW 7015).
- **Revealed undertone**: Warm pink — amplified to `#C9A8A0` inside the magnifier circle.
- **Morning wall render**: Color appears as `#BCB4AC` — cool, neutral.
- **Evening wall render**: Color appears as `#C4AEA6` — pink undertone becomes visible under warm 2700K light simulation.
- **Background**: Muro White `#FAFAF8`.
- **Magnifier border**: Soft Charcoal `#2D2D2D`.

### Typography

- **Headline**: Inter Bold 44px, Soft Charcoal.
- **Color name**: Inter SemiBold 24px, Soft Charcoal.
- **Undertone label**: Inter Medium 20px, `#C9A8A0` (the undertone color itself).
- **Time-of-day labels**: Inter Regular 16px, Warm Gray. Below each mini render.

### Spacing

- Outer padding: 60px.
- Headline to chip: 40px.
- Chip to color name: 28px.
- Color name to undertone label: 8px.
- Undertone label to mini renders: 24px.
- Gap between mini renders: 8px.
- Mini renders to CTA: 24px.

---

## Design 7: "Color Confidence Score"

### Concept

A dashboard-style graphic showing a "Color Confidence Score" going from low (guessing from swatches) to high (visualized on your actual wall). Before: the score sits at 23% with warning indicators. After: score jumps to 94% with green indicators. Gamifies the decision-making process and reframes the app as a confidence builder.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│  "How confident are you     │
│   in your paint choice?"    │
│  Inter Bold 40px            │
│                             │
│  ┌──────────────────────┐   │
│  │   WITHOUT MURO       │   │
│  │                      │   │
│  │   ◐ 23%              │   │
│  │   (circular gauge,   │   │
│  │    red/orange zone)  │   │
│  │                      │   │
│  │   ✗ Haven't seen it  │   │
│  │     on real walls    │   │
│  │   ✗ Chose from tiny  │   │
│  │     2-inch chip      │   │
│  │   ✗ Lighting unknown │   │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │   WITH MURO          │   │
│  │                      │   │
│  │   ◉ 94%              │   │
│  │   (circular gauge,   │   │
│  │    green zone)       │   │
│  │                      │   │
│  │   ✓ Visualized on    │   │
│  │     YOUR wall        │   │
│  │   ✓ Full-wall preview│   │
│  │   ✓ Tested in your   │   │
│  │     room's light     │   │
│  └──────────────────────┘   │
│                             │
│  [Muro · See it before you  │
│   paint it]                 │
└─────────────────────────────┘
```

- **Two cards** stacked, each with a circular progress gauge and checklist.
- Top card: subtle red-tinted background `#FEF2F2`. Gauge in Regret Red.
- Bottom card: subtle green-tinted background `#F0FDF4`. Gauge in Success Green.
- **Circular gauges**: 120px diameter, 12px stroke width. Percentage number centered inside, Inter Bold 36px.
- **Checklist items**: ✗ marks in `#EF4444`, ✓ marks in `#22C55E`. Text: Inter Regular 18px.

#### Stories (1080 x 1920)

Same two cards expanded vertically with more breathing room. Gauge size increases to 160px. Additional stat: "People who visualize first are 3x less likely to repaint."

#### Reels Cover (1080 x 1920)

Top gauge (23%, red) large and centered in upper half. Bottom gauge (94%, green) in lower center. Big bold numbers, minimal text. Headline within top safe zone.

### Color Direction

- **Without Muro card bg**: `#FEF2F2` (rose-tinted white).
- **Gauge stroke (low)**: Gradient from `#EF4444` to `#F97316` (red to orange).
- **With Muro card bg**: `#F0FDF4` (green-tinted white).
- **Gauge stroke (high)**: Gradient from `#22C55E` to `#16A34A` (green spectrum).
- **Gauge track (empty portion)**: `#E5E5E3`.
- **Card borders**: 1px `#E5E5E3`, 16px border-radius.

### Typography

- **Headline**: Inter Bold 40px, Soft Charcoal.
- **Card titles** ("WITHOUT MURO" / "WITH MURO"): Inter SemiBold 16px, uppercase, letter-spacing 2px.
- **Gauge percentage**: Inter Bold 36px, matching gauge color.
- **Checklist items**: Inter Regular 18px, Soft Charcoal.

### Spacing

- Outer padding: 60px.
- Headline to first card: 32px.
- Card internal padding: 28px.
- Gap between cards: 16px.
- Gauge to checklist: 20px.
- Checklist item spacing: 12px.
- Second card to footer: 24px.

---

## Design 8: "Real Room, Real Color"

### Concept

A before/after slider-style design showing a user's actual (staged) room. The "before" half is the room with blank/white walls and question marks. The "after" half shows the same room with a beautiful color applied, complete with the Muro phone UI overlaid to show "this is how you preview." The slider divider is a prominent vertical line the viewer "wants to drag." Targets the desire to see exactly what it'll look like in YOUR space, not a model home.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│  "Your room. Your color.    │
│   Zero guesswork."          │
│  Inter Bold 40px            │
│                             │
│ ┌────────────┰────────────┐ │
│ │            ┃            │ │
│ │  BEFORE    ┃  AFTER     │ │
│ │            ┃            │ │
│ │  White     ┃  Deep teal │ │
│ │  walls,    ┃  accent    │ │
│ │  ? marks   ┃  wall,     │ │
│ │  floating  ┃  styled    │ │
│ │            ┃            │ │
│ │            ┃            │ │
│ └────────────┸────────────┘ │
│                             │
│  ◀──── drag ────▶ (visual)  │
│                             │
│  "BM Narragansett Green     │
│   HC-157 · LRV 11"         │
│                             │
│  [Muro logo + CTA pill]     │
└─────────────────────────────┘
```

- **Slider divider**: 4px vertical line, `#FAFAF8`, with a 40px circular handle centered on it (white circle, 2px shadow).
- **Before side**: Room photo with white/primer walls. Floating `?` symbols scattered (Inter Bold 60px, `#C7BFB2` at 50%).
- **After side**: Same room, accent wall painted in BM Narragansett Green. Slightly elevated saturation (+5%).
- **Phone mockup**: Small (200px tall), overlaid in the bottom-right corner of the "after" panel, showing Muro UI with the teal color selected.

#### Stories (1080 x 1920)

Horizontal slider concept maintained but room photo fills more vertical space (70% of safe area). Color info below. CTA at bottom.

#### Reels Cover (1080 x 1920)

Before room as full background at 60% opacity. After room centered with rounded corners and a subtle glow/border. Headline top, CTA bottom.

### Color Direction

- **Before walls**: Flat primer white `#E8E5E0`.
- **After accent wall**: BM Narragansett Green `#3A5C52` (HC-157, LRV 11) — rich, dramatic teal-green.
- **Room styling**: Mid-century modern. Walnut furniture `#6B4226`, cream textiles `#F0E8D8`, brass lamp `#C8A84E`, green plant accents `#4A7A5B`.
- **Question marks**: `#C7BFB2` at 50% opacity, various sizes (40-80px), slightly rotated.
- **Slider handle**: `#FFFFFF` with shadow `0 2px 8px rgba(0,0,0,0.25)`.

### Typography

- **Headline**: Inter Bold 40px, Soft Charcoal.
- **Color name**: Inter SemiBold 22px, Soft Charcoal.
- **Color details** (code + LRV): Inter Regular 18px, Warm Gray.
- **"Drag" hint**: Inter Regular 14px, Warm Gray, with ◀▶ arrows.
- **Floating question marks**: Inter Bold 40-80px, `#C7BFB2` at 50%.

### Spacing

- Outer padding: 60px.
- Headline to image: 28px.
- Slider image height: 600px (feed), proportional for Stories.
- Image to drag hint: 16px.
- Drag hint to color name: 20px.
- Color name to details: 8px.
- Details to CTA: 24px.

---

## Design 9: "The Paint Store Paralysis"

### Concept

A first-person POV photo standing in a paint store aisle, staring at an overwhelming wall of color chips (the "before" — paralysis). This transforms into a calm, clean phone screen showing 3 curated color options on your actual wall (the "after" — clarity). Visual metaphor for going from overwhelm to confidence.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│                             │
│  Full-bleed background:     │
│  Paint store aisle,         │
│  hundreds of color chips    │
│  (slightly blurred,         │
│   darkened at edges)        │
│                             │
│     ┌─────────────────┐     │
│     │                 │     │
│     │  Phone mockup   │     │
│     │  showing Muro:  │     │
│     │                 │     │
│     │  3 colors on    │     │
│     │  a real wall    │     │
│     │                 │     │
│     │  Clean, simple  │     │
│     │                 │     │
│     └─────────────────┘     │
│                             │
│  "3,500 chips at the store. │
│   You only need to see 3."  │
│                             │
│  Inter Bold 32px, white     │
│                             │
│  [Muro logo, white]         │
└─────────────────────────────┘
```

- **Background**: Paint store aisle photo, full bleed. Apply Gaussian blur (8px) and dark overlay (`#000000` at 35%) to push it back.
- **Phone mockup**: Centered, 380px wide, natural perspective tilt (5-8 degrees). Shows Muro UI with three color options displayed on a wall.
- **Glow effect**: Subtle radial white glow behind the phone (`#FFFFFF` at 10%, 500px radius).
- **Text**: Bottom third, centered, white with text-shadow.

#### Stories (1080 x 1920)

```
┌─────────────────────────────┐
│                             │
│  "3,500 chips at the store" │
│  Inter Bold 48px, white     │
│                             │
│  Paint store background     │
│  (full bleed, blurred,      │
│   dark overlay)             │
│                             │
│     ┌─────────────────┐     │
│     │  Phone mockup   │     │
│     │  (larger, ~480px│     │
│     │   wide)         │     │
│     └─────────────────┘     │
│                             │
│  "You only need to see 3"   │
│  Inter Bold 40px            │
│  Success Green              │
│                             │
│  [Download Muro — Free]     │
│                             │
└─────────────────────────────┘
```

#### Reels Cover (1080 x 1920)

Paint store background fills frame (heavier blur, 12px). Phone centered. Headline and CTA within safe zones. Numbers "3,500" and "3" in large contrasting type.

### Color Direction

- **Background overlay**: `#000000` at 35%.
- **Phone screen colors** (shown in Muro UI): SW Agreeable Gray `#C7BFB2`, BM Pale Oak `#CEC1B0`, SW Accessible Beige `#C7B9A1` — three popular, safe neutrals.
- **Text**: Pure white `#FFFFFF` with shadow `0 2px 12px rgba(0,0,0,0.6)`.
- **Number "3"**: Success Green `#22C55E`, larger size (80px) for emphasis.
- **Number "3,500"**: Regret Red `#EF4444`, slightly smaller (60px).
- **Phone glow**: `#FFFFFF` at 10%.

### Typography

- **Primary text**: Inter Bold 32px (feed) / 48px (Stories), white.
- **"3,500"**: Inter Bold 60px, `#EF4444`.
- **"3"**: Inter Bold 80px, `#22C55E`.
- **Subtext**: Inter Regular 20px, white at 80%.

### Spacing

- No outer padding (full bleed).
- Phone mockup: centered horizontally, vertically positioned at 40% from top.
- Text block: 60px from bottom (feed), within safe zone (Stories/Reels).
- Phone to text: 40px.
- Line spacing in text block: 8px.

---

## Design 10: "Before You Buy a Single Can"

### Concept

A receipt/cost breakdown design. The "before" shows a receipt listing paint costs, supplies, primer, rollers, painter's tape — totaling $400+. The "after" shows the same receipt but with "Visualization: $0 (Muro)" at the top, and a stamp-like overlay saying "CONFIDENT." Reframes the decision as financial responsibility, not just aesthetics.

### Layout Structure

#### Feed (1080 x 1080)

```
┌─────────────────────────────┐
│                             │
│  "Before you buy a single   │
│   can of paint..."          │
│  Inter Bold 40px            │
│                             │
│  ┌──────────┬──────────┐    │
│  │  RECEIPT  │ RECEIPT  │    │
│  │  #1       │ #2       │    │
│  │           │          │    │
│  │ Paint     │ Muro     │    │
│  │ $45/gal   │ Preview  │    │
│  │ ×3        │ $0   ✓   │    │
│  │ Primer    │ ───────  │    │
│  │ $32       │ Paint    │    │
│  │ Supplies  │ $45/gal  │    │
│  │ $28       │ ×2 (knew │    │
│  │ ───────── │  exact   │    │
│  │ Repaint   │  amount) │    │
│  │ bc wrong  │ Supplies │    │
│  │ color:    │ $28      │    │
│  │ +$167     │ ──────── │    │
│  │ ═════════ │ Repaint: │    │
│  │ $417      │ $0       │    │
│  │           │ ════════ │    │
│  │           │ $118     │    │
│  │           │ CONFIDENT│    │
│  └──────────┴──────────┘    │
│                             │
│  "Saved: $299"              │
│  Inter Bold 32px            │
│  Success Green              │
│                             │
│  [Muro logo]                │
└─────────────────────────────┘
```

- **Two receipt cards** side by side, styled to look like actual receipts.
- **Receipt style**: Slightly off-white `#F8F6F0` background, monospace-feel text (use Inter at lighter weight — or override to JetBrains Mono / IBM Plex Mono 400 for the receipt body only).
- **Left receipt**: Items in Soft Charcoal. Total in Regret Red, large. Has a crumpled/angled tilt (2-3 degrees).
- **Right receipt**: Items in Soft Charcoal. "Muro Preview $0" line highlighted in Success Green. Total in Success Green. Flat/straight alignment. "CONFIDENT" stamp: rotated -15 degrees, Success Green border, 3px, rounded, Inter Bold 24px.

#### Stories (1080 x 1920)

Receipts stacked vertically instead of side-by-side. Left receipt (expensive) on top, transition text "With Muro..." in middle, right receipt (affordable) on bottom. Savings callout and CTA at bottom.

#### Reels Cover (1080 x 1920)

Both receipts overlap slightly at center of frame, angled. The "confident" receipt on top, partially covering the expensive one. Headline at top, savings number huge at bottom.

### Color Direction

- **Receipt background**: `#F8F6F0` (aged paper).
- **Receipt border/shadow**: `#D4D0CC` border 1px, shadow `0 2px 8px rgba(0,0,0,0.08)`.
- **Receipt text**: `#2D2D2D` (body), `#8C8C88` (secondary items).
- **Expensive total**: `#EF4444`, Inter Bold (or receipt mono) 28px.
- **Smart total**: `#22C55E`, same size.
- **"CONFIDENT" stamp**: `#22C55E` border 3px, text `#22C55E`, rotated -15 degrees, 80% opacity.
- **Savings callout**: `#22C55E` on white background.
- **Page background**: Muro White `#FAFAF8`.

### Typography

- **Headline**: Inter Bold 40px, Soft Charcoal.
- **Receipt body**: IBM Plex Mono Regular 16px OR Inter Regular 16px (if keeping single font family).
- **Receipt totals**: Same font, Bold, 28px.
- **"CONFIDENT" stamp**: Inter Bold 24px, uppercase, letter-spacing 3px.
- **Savings text**: Inter Bold 32px, Success Green.

### Spacing

- Outer padding: 60px.
- Receipt internal padding: 24px.
- Receipt width: 440px each (feed) with 16px gap.
- Receipt corner radius: 8px (subtle, paper-like).
- Item line-height: 28px.
- Divider lines: 1px dashed `#D4D0CC`.
- Receipts to savings text: 28px.
- Savings to logo: 20px.

---

## Export-Ready Production Specifications

### File Format & Quality

| Format | File Type | Quality | Color Profile |
|--------|----------|---------|---------------|
| Instagram Feed | PNG or JPEG | PNG preferred, JPEG at 95% | sRGB |
| Instagram Stories | PNG or JPEG | PNG preferred, JPEG at 95% | sRGB |
| Reels Cover | JPEG | 90% quality (sufficient for cover) | sRGB |

### Exact Canvas Sizes

| Format | Width | Height | DPI | Bleed |
|--------|-------|--------|-----|-------|
| **Instagram Feed** | 1080 px | 1080 px | 72 | None required |
| **Instagram Stories** | 1080 px | 1920 px | 72 | None required |
| **Reels Cover** | 1080 px | 1920 px | 72 | None required |

### Safe Zone Specifications

#### Feed (1080 x 1080)

```
┌──────────────────────────────────┐
│  60px padding all sides          │
│  ┌──────────────────────────┐    │
│  │                          │    │
│  │   SAFE ZONE              │    │
│  │   960 x 960 px           │    │
│  │                          │    │
│  │                          │    │
│  └──────────────────────────┘    │
│                                  │
└──────────────────────────────────┘
```

#### Stories / Reels (1080 x 1920)

```
┌──────────────────────────────────┐
│  200px top (Stories)             │
│  250px top (Reels)               │
│  ┌──────────────────────────┐    │
│  │  60px                    │    │
│  │  side     SAFE ZONE      │    │
│  │  padding                 │    │
│  │  each     960 x variable │    │
│  │  side                    │    │
│  └──────────────────────────┘    │
│  340px bottom (Stories)          │
│  420px bottom (Reels)            │
│                                  │
└──────────────────────────────────┘
```

- **Stories safe zone**: 960 x 1380 px (centered)
- **Reels safe zone**: 960 x 1250 px (centered, shifted slightly up)

### Naming Convention

```
muro-{design-number}-{design-slug}-{format}.{ext}

Examples:
muro-01-swatch-graveyard-feed.png
muro-01-swatch-graveyard-stories.png
muro-01-swatch-graveyard-reels-cover.jpg
muro-02-400-dollar-mistake-feed.png
muro-05-3am-panic-stories.png
muro-10-before-you-buy-feed.png
```

### Layer Organization (for Figma/Photoshop)

```
📁 Design [Number] - [Name]
├── 📁 Feed (1080x1080)
│   ├── 📁 Background
│   ├── 📁 Photography / Illustration
│   ├── 📁 Before-After Split
│   ├── 📁 Typography
│   ├── 📁 UI Elements (pills, badges, gauges)
│   ├── 📁 Phone Mockup
│   └── 📁 Brand (logo, CTA)
├── 📁 Stories (1080x1920)
│   ├── 📁 Safe Zone Guide (locked)
│   └── ... (same sublayers)
└── 📁 Reels Cover (1080x1920)
    ├── 📁 Safe Zone Guide (locked)
    └── ... (same sublayers)
```

### Color Tokens (Design System)

Copy-paste ready for Figma variables or CSS custom properties:

```css
:root {
  /* Brand */
  --muro-white: #FAFAF8;
  --muro-accent: #3B82F6;

  /* Text */
  --text-primary: #2D2D2D;
  --text-secondary: #8C8C88;
  --text-on-dark: #FFFFFF;

  /* Semantic */
  --color-success: #22C55E;
  --color-success-bg: #F0FDF4;
  --color-danger: #EF4444;
  --color-danger-bg: #FEF2F2;

  /* Surfaces */
  --surface-receipt: #F8F6F0;
  --surface-card: #FAFAF8;
  --surface-night: #1A1A2E;
  --surface-morning: #FDF6EC;

  /* Shadows */
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.08);
  --shadow-phone: 0 4px 24px rgba(0, 0, 0, 0.15);
  --shadow-text: 0 2px 8px rgba(0, 0, 0, 0.5);
}
```

### Accessibility Notes

- All text on image backgrounds must meet WCAG AA contrast (4.5:1 for body, 3:1 for large text).
- White text on dark overlays: ensure overlay opacity is at least 35% on `#000000`.
- Avoid conveying meaning through color alone — pair with icons or labels (checkmarks + color, not just green/red).
- Before/After labels must be present as text, not just implied by position.
