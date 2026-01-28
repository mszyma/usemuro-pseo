# Dokumentacja Źródeł Kolorów Producentów Farb

## ⚠️ WAŻNE - Status Danych

**Niniejsze pliki zawierają REPREZENTATYWNE PRÓBKI kolorów**, które zostały wygenerowane na podstawie:
1. Dokumentacji metodologicznej (`how_to_get_colors.md`)
2. Znanych systemów kolorystycznych producentów
3. Standardowych wzorników branżowych (RAL, NCS)

**Aby uzyskać PEŁNE, OFICJALNE kolory producentów, należy pobrać je bezpośrednio z poniższych źródeł.**

---

## 🇺🇸 USA

### 1. Behr
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.behr.com |
| **Sekcja kolorów** | https://www.behr.com/color/ |
| **Pliki do pobrania** | https://www.behr.com/color/color-palettes/ |
| **Formaty** | HTML, wtyczka do przeglądarki |
| **Bezpośredni URL do palet** | https://www.behr.com/static/media/dfn/images/Behr-Color-Palette.pdf |

**Instrukcja pobierania:**
```bash
# Pobranie palety PDF
curl -o behr_palette.pdf "https://www.behr.com/static/media/dfn/images/Behr-Color-Palette.pdf"

# Ekstrakcja kolorów z PDF (wymaga narzędzi OCR)
# Lub ręczne przepisanie z przeglądarki
```

**API/Automatyzacja:**
- Brak publicznego API
- Wymagany scraping z poszanowaniem `robots.txt`

---

### 2. Valspar
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.valspar.com |
| **Sekcja kolorów** | https://www.valspar.com/color/ |
| **Narzędzie online** | https://www.valspar.com/color-visualizer/ |
| **Pliki do pobrania** | https://www.valspar.com/color/color-palettes/ |

**Instrukcja pobierania:**
1. Otwórz https://www.valspar.com/color/color-palettes/
2. Wybierz kolekcję (Reserve, Ultra, ProClassic)
3. Pobierz plik PDF lub użyj wizualizera online
4. Ekstrahuj wartości HEX z pliku

---

### 3. Sherwin-Williams (już w projekcie)
**Status:** ✅ Istnieje w projekcie

| Parametr | Wartość |
|----------|---------|
| **Plik w projekcie** | `WallColorAI/MuroPackage/Sources/MuroFeature/Resources/Colors/sherwin_williams_colors.json` |
| **Strona** | https://www.sherwin-williams.com |
| **Biblioteka BIM** | https://www.sherwin-williams.com/painting-contractors/specifications/specification-sites/bim-library |
| **Palety do pobrania** | https://www.sherwin-williams.com/painting-contractors/color/color-tools/downloadable-color-palettes |

---

### 4. Benjamin Moore (już w projekcie)
**Status:** ✅ Istnieje w projekcie

| Parametr | Wartość |
|----------|---------|
| **Plik w projekcie** | `WallColorAI/MuroPackage/Sources/MuroFeature/Resources/Colors/benjamin_moore_colors.json` |
| **Strona** | https://www.benjaminmoore.com |
| **Palety do pobrania** | https://www.benjaminmoore.com/en-us/architects-designers/download-benjamin-moore-color-palettes |
| **Formaty** | .ACO, .ASE, .ACB, .SKM |

---

## 🇬🇧 WIELKA BRYTANIA

### 5. Farrow & Ball
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.farrow-ball.com |
| **Kolory** | https://www.farrow-ball.com/colours/ |
| **Aplikacja** | Farrow & Ball Color App (iOS/Android) |
| **Uwaga** | Ograniczone zasoby cyfrowe - wymaga ręcznej ekstrakcji |

**Instrukcja pobierania:**
1. Odwiedź https://www.farrow-ball.com/colours/
2. Każdy kolor ma stronę np. `https://www.farrow-ball.com/colours/181/all-white/`
3. Ekstrahuj HEX z atrybutu CSS `background-color`
4. Alternatywnie: użyj wtyczki do przeglądarki do ekstrakcji kolorów

**Przykładowe strony kolorów:**
- All White: https://www.farrow-ball.com/colours/181/all-white/
- Stiffkey Blue: https://www.farrow-ball.com/colours/45/stiffkey-blue/
- India Yellow: https://www.farrow-ball.com/colours/200/india-yellow/

---

### 6. Little Greene
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.littlegreene.com |
| **Biblioteka kolorów** | https://www.littlegreene.com/colour-library/ |
| **Pliki do pobrania** | https://www.littlegreene.com/colour-library/colour-cards/ |
| **Formaty** | .ASE (Adobe Swatch Exchange), .XLS |

**Instrukcja pobierania:**
1. Idź do https://www.littlegreene.com/colour-library/
2. Pobierz plik `.ase` lub `.xls`
3. Użyj narzędzia do konwersji:
```python
# Przykładowy kod do odczytu pliku ASE
import struct

def read_ase_file(filename):
    with open(filename, 'rb') as f:
        # Parsowanie formatu Adobe Swatch Exchange
        pass
```

---

### 7. Crown Paints
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.crownpaints.co.uk |
| **Kolory** | https://www.crownpaints.co.uk/colours/ |
| **Narzędzie** | Crown Colour Visualiser |

---

### 8. Dulux Trade (już w projekcie)
**Status:** ✅ Istnieje w projekcie

| Parametr | Wartość |
|----------|---------|
| **Plik w projekcie** | `WallColorAI/MuroPackage/Sources/MuroFeature/Resources/Colors/dulux_colors.json` |
| **Strona** | https://www.dulux.co.uk |
| **Wtyczki BIM** | https://www.duluxtradepaintexpert.co.uk/en/dulux-trade-colour-plugins |

---

## 🇩🇪🇦🇹🇨🇭 DACH (Niemcy, Austria, Szwajcaria)

### 9. Sto
**Status:** ✅ **PRZETWORZONE** - 800 kolorów

| Parametr | Wartość |
|----------|---------|
| **Plik w projekcie** | `dach/sto_colors.json` |
| **Ilość kolorów** | 800 |
| **Kolekcje** | 1 (StoColor 800) |
| **Strona główna** | https://www.sto.com |
| **System kolorów** | https://www.sto.com/en/portfolio/stocolor-system/stocolor-system.html |
| **Format źródłowy** | ACO (Adobe Color) |
| **Plik źródłowy** | `StoColorSystem.aco` |

**Pobieranie dodatkowych danych:**
- AutoCAD Color Palette: https://www.stocorp.com/wp-content/uploads/2016/03/stocolor800_autocad.zip
- Photoshop & Illustrator: https://www.stocorp.com/wp-content/uploads/2016/03/stocolor800_illustrator_photoshop.zip

**Instrukcja pobierania (OFICJALNE DANE JSON!):**
```bash
# 1. Idź do strony pobierania Sto
open https://www.sto.com/en/service/downloads

# 2. Pobierz pliki:
# - StoColor System (CSV/JSON)
# - StoColor Xpress (CSV)
# - 3D System Plus (Excel)

# 3. Przykładowy format CSV:
# code,name,hex,rgb_r,rgb_g,rgb_b,lrv,category
# S 0102-Y50R,Sto Weiß,#F2F0E8,242,240,232,86.0,white
```

**Bezpośrednie linki (mogą wymagać rejestracji):**
- https://www.sto.com/group/en/downloads.html
- https://www.sto.com/en/service/stocolor-system.html

---

### 10. Caparol
**Status:** ✅ **PRZETWORZONE** - 3488 kolorów

| Parametr | Wartość |
|----------|---------|
| **Plik w projekcie** | `dach/caparol_colors.json` |
| **Ilość kolorów** | 3488 |
| **Kolekcje** | 27 |
| **Strona główna** | https://www.caparol.de |
| **Kolekcje** | https://www.caparol.de/gestaltung/farbtonkollektionen/ |
| **Format źródłowy** | Excel (Caparol_Farbwerte.xlsx) |
| **Plik źródłowy** | `Caparol_Farbwerte.xlsx` |

**Kolekcje w pliku:**
- 3D-System plus (1357 kolorów)
- 3D-System alt (272 kolory)
- CaparolColor Compact (227 kolorów)
- CaparolColor (196 kolorów)
- Fassade A1 (500 kolorów)
- Histolith (359 kolorów)
- LackChamp (324 kolory)
- I wiele innych...

**Instrukcja pobierania:**
```bash
# 1. Otwórz stronę kolekcji
open https://www.caparol.de/service/digitaler-service/farbtonkollektionen

# 2. Pobierz archiwum ZIP dla 3D System Plus
# 3. Ekstrahuj plik Excel/XLSX
# 4. Wartości w arkuszu: kod, nazwa, HEX, RGB, LRV
```

---

### 11. Brillux
**Status:** ✅ **PRZETWORZONE** - 1514 kolorów

| Parametr | Wartość |
|----------|---------|
| **Plik w projekcie** | `dach/brillux_colors.json` |
| **Ilość kolorów** | 1514 |
| **Kolekcje** | 1 (Scala) |
| **Strona główna** | https://www.brillux.com |
| **Biblioteki kolorów** | https://www.brillux.com/service/software/color-libraries/ |
| **Format źródłowy** | CSV (brillux-scala-standard-rgb.csv) |
| **Plik źródłowy** | `brillux-scala-standard-rgb.csv` |

**System Scala zawiera:**
- 1514 kolorów z wartościami RGB
- Wartości HBW (Light Reflectance)
- Kody RAL dla wielu kolorów

**Instrukcja pobierania:**
1. Idź do https://www.brillux.com/service/software/color-libraries/
2. Pobierz biblioteki dla programów:
   - Adobe Illustrator (.ai)
   - Excel (.xlsx)
   - CSV (.csv)
3. System Scala zawiera 2000+ kolorów

---

### 12. Alpina
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.alpina-farben.de |
| **Kolory** | https://www.alpina-farben.de/farben/ |
| **Formaty** | .ASE |

---

### 13. Keimfarben
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.keimfarben.com |
| **Kolory** | https://www.keimfarben.com/colour-system/ |
| **BIM objects** | https://www.bimstore.co/brand/keim |
| **Formaty** | .ASE, .RFA (Revit) |

---

## 🇫🇷 FRANCJA

### 14. Seigneurie Gauthier
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.seigneuriegauthier.com |
| **System Chromatic** | https://www.seigneuriegauthier.com/chromatic-system |
| **Kolory** | https://www.seigneuriegauthier.com/coules |
| **Formaty** | .ASE, Excel |

**Uwaga:** System Chromatic zawiera 1170+ kolorów

---

### 15. Tollens
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.tollens.com |
| **Wzornik Cromology** | https://www.tollens.com/coules-et-tendances/nuancier-couleurs/nuancier-cromology |
| **Aplikacja** | Tollens Simulateur (iOS/Android) |

---

### 16. Zolpan
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.zolpan.fr |
| **Nuanciers** | https://www.zolpan.fr/colorimetrie/outils-couleurs/telecharger-nos-nuanciers-numeriques |
| **Formaty** | .ASE, ZIP |

---

### 17. V33
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.v33.com |
| **Kolory** | https://www.v33.com/coules/ |
| **Formaty** | .ASE |

---

## 🇮🇹 WŁOCHY

### 18. San Marco
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://en.san-marco.com |
| **Biblioteki CAD/BIM** | https://en.san-marco.com/texture-libraries-for-bim-and-cad |
| **Formaty** | .ADSKLIB (Autodesk), .MAT (3ds Max), .JPG (textury) |

**Instrukcja pobierania:**
1. Idź do https://en.san-marco.com/texture-libraries-for-bim-and-cad
2. Pobierz biblioteki dla:
   - Autodesk Revit (.adsklib)
   - 3ds Max (.mat)
   - Tekstury (.jpg)
3. Ekstrahuj wartości kolorów z plików

---

### 19. Oikos
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.oikos-paint.it |
| **BIM objects** | https://www.syncronia.com/en/3d-bim-cad-models-paints/oikosdecopaint |
| **Pobieranie** | https://www.bimobject.com/en-us/oikos |
| **Formaty** | .ADSKLIB, .JPG |

---

### 20. Valpaint
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.valpaint.it |
| **Kolory** | https://www.valpaint.it/colours/ |
| **Formaty** | .ASE |

---

### 21. MaxMeyer
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.maxmeyer.it |
| **Kolory** | https://www.maxmeyer.it/colours/ |
| **Formaty** | .ASE |

---

## 🇪🇸 HISZPANIA

### 22. Titanlux
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.titanlux.es |
| **Karty kolorów** | https://www.titanlux.es/inspiracion/colores |
| **BIM objects** | https://www.bimobject.com/en-us/titanlux |
| **Formaty** | .ASE, .RFA |

---

### 23. Montó
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.montado.es |
| **BIM Library** | http://bimetica.com (platforma Bimetica) |
| **Standard** | GDO-BIM (210+ profili) |

**Instrukcja pobierania:**
1. Idź na https://bimetica.com
2. Wyszukaj "Montó" lub "Montomix"
3. Pobierz obiekty BIM w formacie .RFA (Revit)

---

### 24. Isaval
**Status:** `pending` - do pobrania

| Parametr | Wartość |
|----------|---------|
| **Strona główna** | https://www.isaval.es |
| **Kolory** | https://www.isaval.es/colores/ |
| **Linia Rheco** | https://www.isaval.es/rheco/ |
| **Formaty** | .ASE |

---

## 🛠️ NARZĘDZIA DO EKSTRAKCJI KOLORÓW

### Konwersja plików ASE (Adobe Swatch Exchange)

```python
#!/usr/bin/env python3
"""
ASE Parser - Ekstraktor kolorów z plików Adobe Swatch Exchange
"""

import struct
import json

def parse_ase_file(filepath):
    """Parsuje plik .ASE i zwraca listę kolorów"""
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
                
                # Konwersja na HEX
                if color_model == 'RGB ':
                    r, g, b = int(values[0]*255), int(values[1]*255), int(values[2]*255)
                    hex_color = f"#{r:02x}{g:02x}{b:02x}"
                    colors.append({
                        'name': name,
                        'hex': hex_color,
                        'rgb': {'r': r, 'g': g, 'b': b}
                    })
        
        return colors

if __name__ == '__main__':
    import sys
    colors = parse_ase_file(sys.argv[1])
    print(json.dumps(colors, indent=2))
```

### Ekstrakcja z Excel/CSV

```python
import pandas as pd
import json

def excel_to_json(excel_file, output_file):
    """Konwertuje plik Excel na format JSON aplikacji"""
    df = pd.read_excel(excel_file)
    
    # Mapowanie kolumn (dostosuj do formatu producenta)
    colors = []
    for _, row in df.iterrows():
        colors.append({
            'id': f"custom-{row['Kod']}".lower().replace(' ', '-'),
            'code': row['Kod'],
            'name': row['Nazwa'],
            'nameDE': row['NazwaDE'],
            'hexColor': row['HEX'].replace('#', ''),
            'rgb': {
                'r': row['R'],
                'g': row['G'],
                'b': row['B']
            },
            'lrv': row.get('LRV', None),
            'category': categorize_color(row['R'], row['G'], row['B'])
        })
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({'manufacturer': 'custom', 'colors': colors}, f, indent=2)

def categorize_color(r, g, b):
    """Kategoryzuje kolor na podstawie wartości RGB"""
    from colorsys import rgb_to_hsv
    h, s, v = rgb_to_hsv(r/255, g/255, b/255)
    
    if v > 0.95 and s < 0.1:
        return 'white'
    elif v < 0.15:
        return 'black'
    elif s < 0.15:
        return 'neutral'
    elif 0 <= h < 30/360:
        return 'red'
    elif 30/360 <= h < 60/360:
        return 'yellow'
    elif 60/360 <= h < 150/360:
        return 'green'
    elif 150/360 <= h < 270/360:
        return 'blue'
    elif 270/360 <= h < 330/360:
        return 'purple'
    else:
        return 'orange'
```

### Web Scraping (BeautifulSoup)

```python
from bs4 import BeautifulSoup
import requests
import json

def scrape_farrow_ball():
    """Ekstrahuje kolory z Farrow & Ball"""
    base_url = "https://www.farrow-ball.com/colours/"
    
    colors = []
    for page in range(1, 50):  # Strony z kolorami
        url = f"{base_url}page/{page}/"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Znajdź wszystkie karty kolorów
        color_cards = soup.find_all('div', class_='colour-card')
        
        for card in color_cards:
            name = card.find('h3').text.strip()
            hex_value = card['data-colour-hex']
            code = card['data-colour-code']
            
            colors.append({
                'id': f"fb-{code.lower()}",
                'code': code,
                'name': name,
                'hexColor': hex_value.replace('#', '')
            })
    
    return colors
```

---

## 📊 TABELA PODSUMOWUJĄCA

| # | Producent | Kraj | Kolory | Kolekcje | Status |
|---|-----------|------|--------|----------|--------|
| 1 | Behr | USA | 800 | 6 | pending |
| 2 | Valspar | USA | 450 | 4 | pending |
| 3 | Sherwin-Williams | USA | - | - | ✅ w projekcie |
| 4 | Benjamin Moore | USA | - | - | ✅ w projekcie |
| 5 | Farrow & Ball | UK | 132 | 5 | pending |
| 6 | Little Greene | UK | 220 | 4 | pending |
| 7 | Crown | UK | 400 | 4 | pending |
| 8 | Dulux Trade | UK | - | - | ✅ w projekcie |
| **9** | **Sto** | **Niemcy** | **800** | **1** | **✅ PRZETWORZONE** |
| **10** | **Caparol** | **Niemcy** | **3488** | **27** | **✅ PRZETWORZONE** |
| **11** | **Brillux** | **Niemcy** | **1514** | **1** | **✅ PRZETWORZONE** |
| 12 | Alpina | Niemcy | 300 | 2 | pending |
| 13 | Keim | Niemcy | 400 | 3 | pending |
| 14 | Seigneurie | Francja | 1170 | 2 | pending |
| 15 | Tollens | Francja | 1500 | 2 | pending |
| 16 | Zolpan | Francja | 1500 | 2 | pending |
| 17 | V33 | Francja | 300 | 2 | pending |
| 18 | San Marco | Włochy | 500 | 3 | pending |
| 19 | Oikos | Włochy | 500 | 3 | pending |
| 20 | Valpaint | Włochy | 500 | 2 | pending |
| 21 | MaxMeyer | Włochy | 300 | 1 | pending |
| 22 | Titanlux | Hiszpania | 500 | 2 | pending |
| 23 | Montó | Hiszpania | 210 | 2 | pending |
| 24 | Isaval | Hiszpania | 200 | 2 | pending |
| | **RAZEM DACH** | | **5802** | **29** | **3/5** |

---

## 🔄 PLAN AKTUALIZACJI

### Krok 1: Pobierz dane źródłowe
```bash
# Utwórz katalog dla surowych danych
mkdir -p kolory/raw/{usa,uk,dach,francja,wlochy,hiszpania}

# Pobierz pliki od producentów
cd kolory/raw

# Przykład dla Sto (dostępny JSON!)
curl -o sto_colors.json "https://www.sto.com/download/stocolor-system.csv"

# Przykład dla Little Greene
curl -o little_greene.ase "https://www.littlegreene.com/downloads/colour-library.ase"
```

### Krok 2: Konwertuj do formatu Numero
```bash
# Użyj skryptu konwersji
python3 scripts/convert_ase.py raw/little_greene.ase uk/little_greene_colors.json
python3 scripts/excel_to_json.py raw/sto_colors.xlsx dach/sto_colors.json
```

### Krok 3: Waliduj
```bash
# Sprawdź format
python3 scripts/validate_colors.py uk/little_greene_colors.json
```

### Krok 4: Zaktualizuj manufacturers.json
```bash
# Dodaj informacje o źródle
python3 scripts/update_manufacturers.py --file uk/little_greene_colors.json --source "little_greene.ase z littlegreene.com"
```

---

## 📝 HISTORIA

| Wersja | Data | Autor | Opis |
|--------|------|-------|------|
| 1.0 | 2025-01-12 | Numero Team | Utworzenie dokumentacji źródeł |
| 1.1 | 2025-01-12 | Numero Team | Dodanie skryptów konwersji |

---

*Ten dokument służy jako przewodnik do pobierania OFICJALNYCH danych kolorystycznych od producentów farb.*
