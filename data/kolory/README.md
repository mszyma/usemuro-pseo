# 🎨 Kolekcje Kolorów Producentów Farb dla Numero

## Przegląd

Ten katalog zawiera znormalizowane dane kolorystyczne od globalnych producentów farb, gotowe do integracji z aplikacją Numero.

## Struktura Katalogów

```
kolory/
├── metodologia.md           ← Pełna dokumentacja metodologii
├── manufacturers.json       ← Indeks wszystkich producentów
├── README.md               ← Ten plik
├── usa/
│   ├── behr_colors.json    ← Behr (USA)
│   └── valspar_colors.json ← Valspar (USA)
├── uk/
│   ├── farrow_ball_colors.json    ← Farrow & Ball (UK)
│   ├── little_greene_colors.json  ← Little Greene (UK)
│   └── crown_colors.json          ← Crown (UK)
├── dach/
│   ├── sto_colors.json          ← Sto (Niemcy)
│   ├── caparol_colors.json      ← Caparol (Niemcy)
│   ├── brillux_colors.json      ← Brillux (Niemcy)
│   ├── alpina_colors.json       ← Alpina (Niemcy)
│   └── keim_colors.json         ← Keim (Niemcy)
├── francja/
│   ├── seigneurie_colors.json   ← Seigneurie (Francja)
│   ├── tollens_colors.json      ← Tollens (Francja)
│   ├── zolpan_colors.json       ← Zolpan (Francja)
│   └── v33_colors.json          ← V33 (Francja)
├── wlochy/
│   ├── san_marco_colors.json    ← San Marco (Włochy)
│   ├── oikos_colors.json        ← Oikos (Włochy)
│   ├── valpaint_colors.json     ← Valpaint (Włochy)
│   └── maxmeyer_colors.json     ← MaxMeyer (Włochy)
└── hiszpania/
    ├── titanlux_colors.json     ← Titanlux (Hiszpania)
    ├── monto_colors.json        ← Montó (Hiszpania)
    └── isaval_colors.json       ← Isaval (Hiszpania)
```

## Statystyki

| Region | Producenci | Kolory | Kolekcje |
|--------|------------|--------|----------|
| 🇺🇸 USA | 2 | 1,250 | 10 |
| 🇬🇧 UK | 3 | 752 | 13 |
| 🇩🇪 DACH | 5 | 3,700 | 16 |
| 🇫🇷 Francja | 4 | 3,470 | 8 |
| 🇮🇹 Włochy | 4 | 1,800 | 9 |
| 🇪🇸 Hiszpania | 3 | 910 | 6 |
| **RAZEM** | **21** | **11,882** | **62** |

## Format Danych

Każdy plik zawiera pełne informacje o producentach i ich kolekcjach:

```json
{
  "manufacturer": "behr",
  "displayName": "Behr",
  "displayNamePL": "Behr",
  "displayNameDE": "Behr",
  "country": "USA",
  "region": "usa",
  "website": "https://www.behr.com",
  "collections": [
    {
      "id": "behr-premium-plus-ultra",
      "name": "Premium Plus Ultra",
      "nameDE": "Premium Plus Ultra",
      "description": "Najwyższej jakości farba...",
      "colors": [
        {
          "id": "behr-ppu-001",
          "code": "PPU10-12",
          "name": "Ultra Pure White",
          "nameDE": "Ultra Pure White",
          "hexColor": "FFFFFF",
          "rgb": {"r": 255, "g": 255, "b": 255},
          "lrv": 92.5,
          "category": "white",
          "collection": "behr-premium-plus-ultra"
        }
      ]
    }
  ]
}
```

## Pola Danych

| Pole | Opis |
|------|------|
| `id` | Unikalny identyfikator (format: `{producer}-{number}`) |
| `code` | Kod producenta (np. "PPU10-12", "SW 7015") |
| `name` | Nazwa koloru |
| `nameDE` | Nazwa po niemiecku |
| `hexColor` | Wartość HEX (6 znaków) |
| `rgb` | Wartości Red, Green, Blue (0-255) |
| `lrv` | Light Reflectance Value (0-100) |
| `category` | Kategoria: white, neutral, black, red, orange, yellow, green, blue, purple, brown |
| `collection` | ID kolekcji |

## Kategorie Kolorów

| Kategoria | Opis |
|-----------|------|
| **white** | Białe i prawie białe (V > 95%, S < 10%) |
| **neutral** | Szare, beżowe, taupe (S < 15%) |
| **black** | Czarne i ciemne szare (V < 15%) |
| **red** | Czerwień, burgund, róż |
| **orange** | Pomarańcz, koral, terakota |
| **yellow** | Żółty, złoto, musztarda |
| **green** | Zielony, szmaragd, mięta |
| **blue** | Niebieski, granatowy, błękit |
| **purple** | Fiolet, lawenda, śliwkowy |
| **brown** | Brąz, czekolada, orzech |

## Źródła Danych

Każdy plik zawiera link do strony producenta. Szczegółowe informacje o źródłach w [metodologia.md](metodologia.md).

## Aktualizacja

Dane są aktualizowane na podstawie oficjalnych stron producentów. Ostatnia aktualizacja: **2025-01-12**

## Licencja

Dane kolorystyczne są własnością odpowiednich producentów farb. Użycie zgodnie z polityką każdego producenta.

## Kontakt

W razie pytań lub uwag, prosimy o kontakt z zespołem Numero.
