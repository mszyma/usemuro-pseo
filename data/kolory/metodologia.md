# Metodologia Pobierania Kolorów Producentów Farb dla Numero

## Spis Treści

1. [Przegląd](#przegląd)
2. [Struktura Katalogów](#struktura-katalogów)
3. [Źródła Danych - USA](#źródła-danych---usa)
4. [Źródła Danych - Wielka Brytania](#źródła-danych---wielka-brytania)
5. [Źródła Danych - DACH (Niemcy, Austria, Szwajcaria)](#źródła-danych---dach-niemcy-austria-szwajcaria)
6. [Źródła Danych - Francja](#źródła-danych---francja)
7. [Źródła Danych - Włochy](#źródła-danych---włochy)
8. [Źródła Danych - Hiszpania](#źródła-danych---hiszpania)
9. [Źródła Danych - Skandynawia i Beneluks](#źródła-danych---skandynawia-i-beneluks)
10. [Formaty Plików i Konwersja](#formaty-plików-i-konwersja)
11. [Automatyzacja Pobierania](#automatyzacja-pobierania)
12. [Trendy Kolorystyczne 2025](#trendy-kolorystyczne-2025)
13. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)

---

## Przegląd

Niniejszy dokument opisuje kompleksową metodologię pobierania i przetwarzania danych kolorystycznych od globalnych producentów farb dla aplikacji Numero. Metodologia obejmuje:

- **21 producentów** z **6 regionów** geograficznych
- **5802+ kolorów** w pełnych kolekcjach
- **62 kolekcje** tematyczne
- Wsparcie dla **wielu formatów plików** (ASE, ACO, CSV, Excel, JSON)

### Cele

1. Zebranie oficjalnych danych kolorystycznych bezpośrednio od producentów
2. Standaryzacja formatu danych dla aplikacji Numero
3. Utrzymanie aktualności danych poprzez automatyzację
4. Integracja trendów kolorystycznych 2025/2026

---

## Struktura Katalogów

```
kolory/
├── README.md                      ← Przewodnik użytkownika
├── metodologia.md                 ← Ten plik
├── COLOR_SOURCES.md               ← Dokumentacja źródeł (autogenerowany)
├── manufacturers.json             ← Indeks producentów z metadanymi
├── trending_colors.json           ← 50-100 trending colors (dla prostszej wersji app)
├── raw/                           ← Surowe pliki źródłowe (do archiwizacji)
│   ├── usa/
│   ├── uk/
│   ├── dach/
│   ├── francja/
│   ├── wlochy/
│   ├── hiszpania/
│   └── skandynawia/
├── processed/                     ← Przetworzone pliki JSON
│   ├── usa/
│   ├── uk/
│   └── dach/
├── scripts/                       ← Skrypty do pobierania i konwersji
│   ├── download_all.sh            ← Główny skrypt pobierania
│   ├── convert_ase.py             ← Konwersja ASE → JSON
│   ├── convert_aco.py             ← Konwersja ACO → JSON
│   ├── convert_csv.py             ← Konwersja CSV/Excel → JSON
│   └── update_trending.py         ← Aktualizacja trending colors
└── docs/                          ← Dokumentacja
    └── format_specification.md    ← Specyfikacja formatu danych
```

---

## Źródła Danych - USA

### 1. Sherwin-Williams
**Status:** ✅ Gotowe do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona pobierania** | https://www.sherwin-williams.com/painting-contractors/color/color-tools/downloadable-color-palettes |
| **Formaty** | .ACO, .ASE, AutoCAD |
| **Kolekcje** | 2000+ kolorów |
| **Bezpośredni link** | https://www.sherwin-williams.com/CategoryDisplay?categoryId=22681 |

**Instrukcja pobierania:**
```bash
# Pobranie palet Adobe
curl -L "https://www.sherwin-williams.com/wcsstore/SherwinWilliamsAssetStore/images/colors/adobe/sherwin-williams-colors.ase" \
  -o raw/usa/sherwin-williams.ase
```

### 2. Benjamin Moore
**Status:** ✅ Gotowe do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona pobierania** | https://www.benjaminmoore.com/en-us/architects-designers/download-benjamin-moore-color-palettes |
| **Formaty** | .ASE, .ACO, .ACB, .SKM |
| **Kolekcje** | 4000+ kolorów |

**Instrukcja pobierania:**
```bash
# Benjamin Moore Color Palettes (wymaga rejestracji)
# Pobierz ręcznie ze strony lub użyj skryptu
```

### 3. Behr
**Status:** ⚠️ Wymaga dalszej analizy

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.behr.com/pro/colors/color-services/ |
| **Formaty** | PDF, wtyczki BIM |
| **Uwaga** | Głównie dla profesjonalistów (Behr Pro) |

### 4. PPG Paints (Voice of Color)
**Status:** ✅ Gotowe do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona pobierania** | https://www.ppgpaints.com/designers/professional-color-tools/palette-downloads |
| **Formaty** | .ACO, .ASE, .ACB, Excel (.XLS) z LRV |

---

## Źródła Danych - Wielka Brytania

### 5. Dulux Trade (AkzoNobel)
**Status:** ✅ Wtyczki BIM dostępne

| Parametr | Wartość |
|----------|---------|
| **Strona wtyczek** | https://www.duluxtradepaintexpert.co.uk/en/dulux-trade-colour-plugins |
| **Platformy** | Revit, ArchiCAD, SketchUp |
| **Formaty** | .ADSKLIB (Revit), wtyczki |

### 6. Farrow & Ball
**Status:** ⚠️ Ograniczone zasoby cyfrowe

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.farrow-ball.com/paint/free-colour-card |
| **Uwaga** | Głównie fizyczne wzorniki, ograniczone pliki do pobrania |
| **Alternatywa** | Użyć konwersji z NCS lub danych społecznościowych |

### 7. Little Greene
**Status:** ✅ Pliki do pobrania dostępne

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.littlegreene.com/colour-library/ |
| **Formaty** | .ASE, .XLS z LRV |

### 8. Crown Paints
**Status:** ⚠️ Wymaga dalszej analizy

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.crownpaints.co.uk/professionals/colour-tools |

---

## Źródła Danych - DACH (Niemcy, Austria, Szwajcaria)

### 9. Sto
**Status:** ✅ **PRZETWORZONE** - 800 kolorów

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.sto.com/en/portfolio/stocolor-system/stocolor-system.html |
| **Formaty** | .ACO, .ASE, CSV, JSON, Excel |
| **Ilość kolorów** | 1000+ |
| **Źródło w projekcie** | `dach/sto_colors.json` z pliku `StoColorSystem.aco` |

**Pliki źródłowe:**
- `StoColorSystem.aco` - główna paleta (800 kolorów)
- Dostępne również: CSV, JSON na stronie producenta

### 10. Caparol
**Status:** ✅ **PRZETWORZONE** - 3488 kolorów

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.caparol.de/service/digitaler-service/farbtonkollektionen |
| **Formaty** | Excel, ZIP z kolekcjami |
| **Ilość kolorów** | 3488 |
| **Źródło w projekcie** | `dach/caparol_colors.json` z pliku `Caparol_Farbwerte.xlsx` |

**Kolekcje w pliku:**
- 3D-System plus (1357 kolorów)
- 3D-System alt (272 kolory)
- CaparolColor Compact (227 kolorów)
- CaparolColor (196 kolorów)
- Fassade A1 (500 kolorów)
- Histolith (359 kolorów)
- LackChamp (324 kolory)
- I wiele innych...

### 11. Brillux
**Status:** ✅ **PRZETWORZONE** - 1514 kolorów

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.brillux.com/service/software/color-libraries/ |
| **Formaty** | .AI, Excel, CSV |
| **Ilość kolorów** | 1514 |
| **Źródło w projekcie** | `dach/brillux_colors.json` z pliku `brillux-scala-standard-rgb.csv` |

### 12. Alpina
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.alpina-farben.de/farben/ |
| **Formaty** | .ASE |

### 13. Keimfarben
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.keim.com/en-at/services/downloads/ |
| **Formaty** | .ASE, .CSV, BIM (.RFA) |
| **Uwaga** | Wymaga rejestracji |

---

## Źródła Danych - Francja

### 14. Seigneurie Gauthier (PPG)
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **System** | Chromatic® System |
| **Strona** | https://www.seigneuriegauthier.com/chromatic-system |
| **Ilość kolorów** | 1170+ |
| **Formaty** | .ASE, Excel |

### 15. Tollens (Grupa Cromology)
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.tollens.com/coules-et-tendances/nuancier-couleurs/nuancier-cromology |
| **Formaty** | .ASE, symulator AR |

### 16. Zolpan (Grupa Cromology)
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.zolpan.fr/colorimetrie/outils-couleurs/telecharger-nos-nuanciers-numeriques |
| **Formaty** | .ASE, .ZIP, Photoshop, Illustrator, SketchUp |

### 17. V33
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.v33.com/coules/ |
| **Formaty** | .ASE |

---

## Źródła Danych - Włochy

### 18. San Marco
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://en.san-marco.com/texture-libraries-for-bim-and-cad |
| **Formaty** | .ADSKLIB (Revit), .MAT (3ds Max), .JPG |

### 19. Oikos
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.oikos-paint.it |
| **Platformy** | BIMobject, Syncronia |
| **Formaty** | .ADSKLIB, .JPG |

### 20. Valpaint
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.valpaint.it/colours/ |
| **Formaty** | .ASE |

### 21. MaxMeyer
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.maxmeyer.it/coules/ |
| **Formaty** | .ASE |

---

## Źródła Danych - Hiszpania

### 22. Titanlux (AkzoNobel)
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.titanlux.es/inspiracion/colores |
| **Platformy** | Bimetica, BIMobject |
| **Formaty** | .ASE, .RFA (BIM) |

### 23. Montó Pinturas
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.montado.es |
| **Standard** | GDO-BIM |
| **Ilość profili** | 210+ |

### 24. Isaval
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.isaval.es/colores/ |
| **Formaty** | .ASE |

---

## Źródła Danych - Skandynawia i Beneluks

### 25. Jotun (Norwegia)
**Status:** ✅ Wtyczki dostępne

| Parametr | Wartość |
|----------|---------|
| **Strona** | https://www.jotun.com/id-en/decorative/jotun-digital-colour-palette |
| **Formaty** | .ACO (Photoshop), .ASE (Illustrator) |
| **Pobieranie** | https://www.jotun.com/contentassetsjot03/.../adobe_photoshop_november_2024.zip |

### 26. Tikkurila (Finlandia/PPG)
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **System** | Symphony (2436 kolorów) |
| **Strona** | https://www.tikkurila.com |

### 27. Sikkens (AkzoNobel)
**Status:** ⏳ Do pobrania

| Parametr | Wartość |
|----------|---------|
| **System** | Colormap FD (8500+ kolorów) |
| **Strona** | https://www.sikkens.com |

---

## Formaty Plików i Konwersja

### Formaty źródłowe

| Format | Opis | Narzędzie do odczytu |
|--------|------|---------------------|
| `.ASE` | Adobe Swatch Exchange | Python struct |
| `.ACO` | Adobe Color | Python struct |
| `.CSV` | Comma Separated Values | pandas |
| `.XLS/XLSX` | Microsoft Excel | pandas openpyxl |
| `.JSON` | JavaScript Object Notation | json |
| `.ADSKLIB` | Autodesk Library | Revit API |
| `.RFA` | Revit Family | Revit API |

### Schemat Konwersji

```
┌─────────────────────────────────────────────────────────────┐
│                    FORMATY ŹRÓDŁOWE                          │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│   ASE/ACO   │   CSV/Excel │  ADSKLIB    │      JSON         │
│  (Adobe)    │  (dane LRV) │   (BIM)     │   (dokumentacja)  │
└──────┬──────┴──────┬──────┴──────┬──────┴────────┬──────────┘
       │             │             │               │
       ▼             ▼             ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                  SKRYPTY KONWERSJI                           │
│  convert_ase.py | convert_csv.py | parse_bim.py | manual    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              STANDARDOWY FORMAT NUMERO                        │
│  {                                                         │
│    "manufacturer": "caparol",                               │
│    "displayName": "Caparol",                                │
│    "displayNamePL": "Caparol",                              │
│    "displayNameDE": "Caparol",                              │
│    "country": "Niemcy",                                     │
│    "region": "dach",                                        │
│    "collections": [{                                        │
│      "id": "caparol-3d-system-plus",                        │
│      "name": "3D System Plus",                              │
│      "colors": [{                                           │
│        "id": "cap-3d-001",                                  │
│        "code": "3D-001",                                    │
│        "name": "Weiß",                                      │
│        "nameDE": "Weiß",                                    │
│        "hexColor": "FFFFFF",                                │
│        "rgb": {"r": 255, "g": 255, "b": 255},               │
│        "lrv": 95.0,                                         │
│        "category": "white"                                  │
│      }]                                                     │
│    }]                                                       │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Automatyzacja Pobierania

### Główny Skrypt Pobierania

```bash
#!/bin/bash
# download_all.sh - Pobiera wszystkie palety kolorów

set -e

BASE_DIR="/Users/mario4/Code/walls/kolory"
RAW_DIR="$BASE_DIR/raw"
PROCESSED_DIR="$BASE_DIR/processed"

# USA
echo "📦 Pobieranie kolorów USA..."
mkdir -p "$RAW_DIR/usa"
curl -L "https://www.sherwin-williams.com/..." -o "$RAW_DIR/usa/sherwin-williams.ase"
# ... więcej producentów

# UK
echo "📦 Pobieranie kolorów UK..."
mkdir -p "$RAW_DIR/uk"

# DACH
echo "📦 Pobieranie kolorów DACH..."
mkdir -p "$RAW_DIR/dach"

# Konwersja
echo "🔄 Konwersja plików..."
python3 "$BASE_DIR/scripts/convert_all.py"

echo "✅ Gotowe!"
```

### Konwersja ASE na JSON

```python
#!/usr/bin/env python3
"""
convert_ase.py - Konwertuje pliki ASE na format JSON Numero
"""

import struct
import json
from pathlib import Path

def parse_ase_file(filepath):
    """Parsuje plik Adobe Swatch Exchange."""
    with open(filepath, 'rb') as f:
        # Nagłówek ASE
        signature = f.read(4)
        version = struct.unpack('>H', f.read(2))[0]
        block_count = struct.unpack('>I', f.read(4))[0]
        
        colors = []
        for _ in range(block_count):
            block_type = struct.unpack('>H', f.read(2))[0]
            block_length = struct.unpack('>I', f.read(4))[0]
            
            if block_type == 0x0001:  # Kolor
                name_length = struct.unpack('>H', f.read(2))[0]
                name = f.read(name_length * 2).decode('utf-16-be')[:-1]
                
                color_model = f.read(4).decode('ascii')
                values = []
                for _ in range(4):
                    values.append(struct.unpack('>f', f.read(4))[0])
                
                color_type = struct.unpack('>H', f.read(2))[0]
                
                if color_model == 'RGB ':
                    r, g, b = int(values[0]*255), int(values[1]*255), int(values[2]*255)
                    hex_color = f"{r:02x}{g:02x}{b:02x}".upper()
                    
                    colors.append({
                        'id': f"color-{len(colors)+1:04d}",
                        'code': name.replace(' ', '-').lower()[:20],
                        'name': name,
                        'hexColor': hex_color,
                        'rgb': {'r': r, 'g': g, 'b': b}
                    })
        
        return colors

def convert_ase_to_json(ase_path, output_path, manufacturer):
    """Główna funkcja konwersji."""
    colors = parse_ase_file(ase_path)
    
    result = {
        'manufacturer': manufacturer,
        'displayName': manufacturer.title(),
        'displayNamePL': manufacturer.title(),
        'displayNameDE': manufacturer.title(),
        'country': '',
        'region': '',
        'website': '',
        'lastUpdated': '2025-01-12',
        'totalColors': len(colors),
        'collections': [{
            'id': f"{manufacturer}-main",
            'name': 'Main Collection',
            'colors': colors
        }]
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    import sys
    convert_ase_to_json(sys.argv[1], sys.argv[2], sys.argv[3])
```

---

## Trendy Kolorystyczne 2025

### Kolory Roku 2025 według Producentów

| Producent | Kolor Roku 2025 | HEX | Kategoria |
|-----------|-----------------|-----|-----------|
| **Pantone** | Mocha Mousse | #9A6E4A | brown |
| **Sherwin-Williams** | Grounded (SW 6089) | #8B7355 | red-brown |
| **Sherwin-Williams** | Color Capsule Collection | - | 8 colors |
| **Benjamin Moore** | Cinnamon Slate (2113-40) | #8E7C6B | purple-brown |
| **Behr** | Rumors | #7B6B63 | neutral |
| **Dulux** | Colour Forecast 2025 | - | 3 palettes |
| **Caparol** | Trend 2025 | - | brown tones |
| **Jotun** | 128 colors palette | - | various |

### Kolekcja Trending Colors dla Numero

Utworzono plik `trending_colors.json` zawierający **50-100** najbardziej trendy kolorów 2025:

```json
{
  "name": "Trending Colors 2025",
  "description": "Najbardziej trendy kolory 2025 według globalnych producentów",
  "sourceYear": 2025,
  "colors": [
    {
      "id": "trend-001",
      "name": "Mocha Mousse",
      "brand": "Pantone",
      "hexColor": "9A6E4A",
      "category": "brown",
      "lrv": 25.0,
      "source": "Pantone Color of the Year 2025"
    },
    // ... więcej kolorów
  ]
}
```

---

## Rozwiązywanie Problemów

### Problem: Brak dostępu do plików

**Rozwiązanie:**
1. Sprawdź czy wymagana jest rejestracja
2. Użyj alternatywnych źródeł (BIMobject, agregatory)
3. Skontaktuj się z producentem bezpośrednio

### Problem: Format pliku nieczytelny

**Rozwiązanie:**
1. Sprawdź wersję formatu (np. ASE v1 vs v2)
2. Użyj odpowiedniego parsera
3. Skonsultuj dokumentację formatu

### Problem: Brakujące dane LRV

**Rozwiązanie:**
1. Oblicz LRV z wartości RGB:
   ```
   LRV = (R×0.2126 + G×0.7152 + B×0.0722) / 255 × 100
   ```
2. Znajdź dane w innych źródłach producenta
3. Użyj danych zbliżonych z RAL/NCS

---

## Historia Aktualizacji

| Wersja | Data | Autor | Opis |
|--------|------|-------|------|
| 1.0 | 2025-01-12 | Numero Team | Utworzenie dokumentacji |
| 1.1 | 2025-01-12 | Numero Team | Dodanie 3 producentów DACH (5802 kolory) |
| 1.2 | 2025-01-12 | Numero Team | Dodanie metodologii trendów 2025 |

---

*Ostatnia aktualizacja: 2025-01-12*
