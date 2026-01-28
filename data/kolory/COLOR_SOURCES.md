# COLOR_SOURCES.md

## Overview

This document catalogs all sources of paint color data used in the Numero application, including download URLs, file formats, processing scripts, and metadata about each manufacturer.

---

## USA Manufacturers

### Sherwin-Williams

| Property | Value |
|----------|-------|
| **Source URL** | https://github.com/glamp/sherwin-williams |
| **File** | `data/colors.json` |
| **Format** | JSON (name + hex) |
| **Raw Download** | https://raw.githubusercontent.com/glamp/sherwin-williams/main/data/colors.json |
| **Colors** | 1,526 |
| **Collections** | 1 |
| **License** | MIT |

**Conversion Script:** `convert_sherwin.py`
**Output File:** `usa/sherwin_williams_colors.json`

**Sample Data:**
```json
{
  "name": "Mulberry Silk",
  "hex": "#94766C"
}
```

---

### Benjamin Moore

| Property | Value |
|----------|-------|
| **Source URL** | https://github.com/hakyim/benjamin-moore-css |
| **File** | `colors.json` |
| **Format** | JSON (extended schema) |
| **Raw Download** | https://raw.githubusercontent.com/hakyim/benjamin-moore-css/main/colors.json |
| **Colors** | 4,118 |
| **Collections** | 1 |
| **Fields** | number, name, family, hex, contrastColor, toolURL, etc. |

**Conversion Script:** `convert_benjamin_moore.py`
**Output File:** `usa/benjamin_moore_colors.json`

**Sample Data:**
```json
{
  "number": "100",
  "name": "Golden Beige",
  "family": "Orange",
  "hex": "F1D4C0"
}
```

---

### Behr

| Property | Value |
|----------|-------|
| **Website** | https://www.behr.com |
| **Status** | Pending download |
| **Expected Colors** | ~800 |
| **Format** | HTML / PDF |

**Source:** https://www.behr.com/color/color-palettes/

---

## Scandinavia Manufacturers

### Jotun (Norway)

| Property | Value |
|----------|-------|
| **Website** | https://www.jotun.com |
| **Download Page** | https://www.jotun.com/id-en/decorative/jotun-digital-colour-palette |
| **File** | `jotun_photoshop.zip` |
| **Format** | ACO (Adobe Color - custom binary format) |
| **Download Date** | November 2024 |
| **Colors** | 1,213 |
| **Collections** | 10 |

**Collections Processed:**
- Canvas Collection 2024 (23 colors)
- Interior Colour Collection - Blue Shades (156 colors)
- Interior Colour Collection - Green Shades (204 colors)
- Interior Colour Collection - Neutral Shades (213 colors)
- Interior Colour Collection - Red Shades (177 colors)
- Interior Colour Collection - Yellow Shades (191 colors)
- Jotashield Best Exterior Colours (70 colors)
- Nuances Collection 2025 (30 colors)
- Our Most Beautiful Colours 2025 (128 colors)
- Stories Collection 2023 (21 colors)

**Collections Skipped:**
- Jotun Kids Collection 2023 (non-standard format)
- Together Collection 2022 (non-standard format)

**Raw Location:** `raw/skandynawia/Adobe_Photoshop_November_2024/`
**Conversion Script:** `convert_jotun_aco.py`
**Output File:** `skandynawia/jotun_colors.json`

**ACO File Format (Jotun custom):**
```
Position 0-1: Version major (0001)
Position 2-3: Version minor (0001)
Position 6-11: RGB values (16-bit big-endian)
```

---

## DACH Manufacturers

### Caparol (Germany)

| Property | Value |
|----------|-------|
| **Website** | https://www.caparol.de |
| **File** | `Caparol_Farbwerte.xlsx` |
| **Format** | Excel (XLSX) |
| **Colors** | 3,488 |
| **Collections** | 27 |

**Raw Location:** `raw/dach/Caparol_Farbwerte.xlsx`
**Output File:** `dach/caparol_colors.json`

---

### Brillux (Germany)

| Property | Value |
|----------|-------|
| **Website** | https://www.brillux.com |
| **File** | `brillux-scala-standard-rgb.csv` |
| **Format** | CSV |
| **Colors** | 1,514 |
| **Collections** | 1 (Scala) |

**Raw Location:** `raw/dach/brillux-scala-standard-rgb.csv`
**Output File:** `dach/brillux_colors.json`

---

### Sto (Germany)

| Property | Value |
|----------|-------|
| **Website** | https://www.sto.com |
| **File** | `StoColorSystem.aco` |
| **Format** | ACO (Adobe Color) |
| **Colors** | 800 |
| **Collections** | 1 |

**Output File:** `dach/sto_colors.json`

---

### Alpina (Germany)

| Property | Value |
|----------|-------|
| **Website** | https://www.alpina-farben.de |
| **Status** | Pending |
| **Expected Colors** | ~300 |

---

### Keimfarben (Germany)

| Property | Value |
|----------|-------|
| **Website** | https://www.keimfarben.com |
| **Status** | Pending |
| **Expected Colors** | ~400 |

---

## UK Manufacturers

### Farrow & Ball

| Property | Value |
|----------|-------|
| **Website** | https://www.farrow-ball.com |
| **Status** | Pending |
| **Expected Colors** | ~132 |
| **Format** | HTML |

---

### Little Greene

| Property | Value |
|----------|-------|
| **Website** | https://www.littlegreene.com |
| **Status** | Pending |
| **Expected Colors** | ~220 |
| **Format** | ASE |

---

### Crown Paints

| Property | Value |
|----------|-------|
| **Website** | https://www.crownpaints.co.uk |
| **Status** | Pending |
| **Expected Colors** | ~400 |

---

## France Manufacturers

### Seigneurie Gauthier

| Property | Value |
|----------|-------|
| **Website** | https://www.seigneuriegauthier.com |
| **Status** | Pending |
| **Expected Colors** | ~1,170 |

---

### Tollens

| Property | Value |
|----------|-------|
| **Website** | https://www.tollens.com |
| **Status** | Pending |
| **Expected Colors** | ~1,500 |

---

### Zolpan

| Property | Value |
|----------|-------|
| **Website** | https://www.zolpan.fr |
| **Status** | Pending |
| **Expected Colors** | ~1,500 |

---

### V33

| Property | Value |
|----------|-------|
| **Website** | https://www.v33.com |
| **Status** | Pending |
| **Expected Colors** | ~300 |

---

## Italy Manufacturers

### San Marco

| Property | Value |
|----------|-------|
| **Website** | https://en.san-marco.com |
| **Status** | Pending |
| **Expected Colors** | ~500 |

---

### Oikos

| Property | Value |
|----------|-------|
| **Website** | https://www.oikos-paint.it |
| **Status** | Pending |
| **Expected Colors** | ~500 |

---

### Valpaint

| Property | Value |
|----------|-------|
| **Website** | https://www.valpaint.it |
| **Status** | Pending |
| **Expected Colors** | ~500 |

---

### MaxMeyer

| Property | Value |
|----------|-------|
| **Website** | https://www.maxmeyer.it |
| **Status** | Pending |
| **Expected Colors** | ~300 |

---

## Spain Manufacturers

### Titanlux

| Property | Value |
|----------|-------|
| **Website** | https://www.titanlux.es |
| **Status** | Pending |
| **Expected Colors** | ~500 |

---

### Montó Pinturas

| Property | Value |
|----------|-------|
| **Website** | https://www.montado.es |
| **Status** | Pending |
| **Expected Colors** | ~210 |

---

### Isaval

| Property | Value |
|----------|-------|
| **Website** | https://www.isaval.es |
| **Status** | Pending |
| **Expected Colors** | ~200 |

---

## Statistics

### Current Status (2025-01-12)

| Region | Manufacturers | Colors | Completed |
|--------|---------------|--------|-----------|
| USA | 4 | 6,444 | 2 |
| Scandinavia | 1 | 1,213 | 1 |
| DACH | 5 | 5,802 | 3 |
| UK | 3 | 752 | 0 |
| France | 4 | 3,470 | 0 |
| Italy | 4 | 1,800 | 0 |
| Spain | 3 | 910 | 0 |
| **Total** | **24** | **20,391** | **6** |

### Completed Files

| File | Colors | Format |
|------|--------|--------|
| `usa/sherwin_williams_colors.json` | 1,526 | JSON |
| `usa/benjamin_moore_colors.json` | 4,118 | JSON |
| `skandynawia/jotun_colors.json` | 1,213 | JSON |
| `dach/caparol_colors.json` | 3,488 | JSON |
| `dach/brillux_colors.json` | 1,514 | JSON |
| `dach/sto_colors.json` | 800 | JSON |

**Total Completed:** 12,659 colors

---

## Color Schema

All converted color files follow this schema:

```json
{
  "manufacturer": "Sherwin-Williams",
  "country": "USA",
  "source": "GitHub repository URL",
  "url": "https://github.com/...",
  "totalColors": 1526,
  "colors": [
    {
      "id": "sherwin-williams-0001",
      "code": "SW 0001",
      "name": "Color Name",
      "nameDE": "",
      "hexColor": "#FFFFFF",
      "rgb": {"r": 255, "g": 255, "b": 255},
      "lrv": 92.5,
      "category": "white",
      "collection": "Collection Name"
    }
  ]
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (format: `{manufacturer}-{code}`) |
| `code` | String | Manufacturer's color code (e.g., "SW 0001", "100") |
| `name` | String | Color name in original language |
| `nameDE` | String | Color name in German (if available) |
| `hexColor` | String | Hex color value (6 characters, uppercase) |
| `rgb` | Object | Red, Green, Blue values (0-255) |
| `lrv` | Number | Light Reflectance Value (0-100) |
| `category` | String | Color category (white, neutral, black, red, orange, yellow, green, blue, purple, brown) |
| `collection` | String | Collection/series name (if available) |

---

## LRV Calculation

Light Reflectance Value is calculated using the standard formula:

```
LRV = (R×0.2126 + G×0.7152 + B×0.0722) / 255 × 100
```

This formula accounts for human perception of brightness (green appears brighter than red at the same luminance).

---

## Color Categorization

Colors are automatically categorized based on RGB values:

| Category | Criteria |
|----------|----------|
| **white** | High brightness (>200), low saturation (<30) |
| **black** | Low brightness (<50), low saturation (<30) |
| **neutral** | Low saturation (<30), medium brightness |
| **red** | Red dominant, high saturation |
| **orange** | Red > Green > Blue, medium saturation |
| **yellow** | Red ≈ Green > Blue, high brightness |
| **green** | Green dominant |
| **blue** | Blue dominant |
| **purple** | Blue > Red > Green |
| **brown** | Red > Green > Blue, lower brightness |

---

## File Formats

### JSON
Human-readable format with full metadata. Used for final output.

### ACO (Adobe Color)
Binary format used by Adobe Photoshop/Illustrator. Structure:
- Header: version (2 bytes), color count (4 bytes)
- Color entries: block type, length, color data (RGB 16-bit)

### ASE (Adobe Swatch Exchange)
Binary format for color swatches. Supports multiple color spaces.

### CSV
Simple comma-separated values with headers.

### XLSX
Excel spreadsheet format with multiple sheets for collections.

---

## Conversion Scripts

### `convert_jotun_aco.py`
Parses Jotun's custom ACO format and converts to Numero JSON.

### `convert_sherwin.py`
Converts GitHub Sherwin-Williams JSON to Numero format.

### `convert_benjamin_moore.py`
Converts GitHub Benjamin Moore JSON to Numero format with family-based categorization.

---

## Updating Color Data

To add new manufacturers:

1. Download color data from manufacturer's website or GitHub
2. Analyze file format (JSON, CSV, Excel, ACO, ASE)
3. Write conversion script following existing patterns
4. Run script to generate Numero JSON format
5. Update `manufacturers.json` with new entry
6. Update this document

---

## License Notes

- Color data is property of respective manufacturers
- GitHub repositories may have different licenses
- Always verify usage terms before redistribution
- Data in this project is for educational/development purposes
