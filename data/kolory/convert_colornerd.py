#!/usr/bin/env python3
"""
convert_colornerd.py - Konwertuje pliki z colornerd (jpederson/colornerd) na format JSON Numero

Źródło: https://github.com/jpederson/colornerd
Obsługuje: Behr, Farrow & Ball, Valspar, PPG, Sherwin-Williams, Benjamin Moore, i wiele innych
"""

import json
import re
import sys
from pathlib import Path
from typing import Optional


def parse_hex_color(hex_value: str) -> tuple[str, dict]:
    """Parsuje wartość hex z różnych formatów."""
    hex_value = hex_value.strip()

    # Usuń "#" jeśli istnieje
    if hex_value.startswith("#"):
        hex_value = hex_value[1:]

    # Format: #RRGGBB lub #RGB
    if len(hex_value) == 6:
        r = int(hex_value[0:2], 16)
        g = int(hex_value[2:4], 16)
        b = int(hex_value[4:6], 16)
    elif len(hex_value) == 3:
        r = int(hex_value[0] * 2, 16)
        g = int(hex_value[1] * 2, 16)
        b = int(hex_value[2] * 2, 16)
    else:
        # Format rgb(r, g, b)
        rgb_match = re.match(r"rgb\((\d+),\s*(\d+),\s*(\d+)\)", hex_value)
        if rgb_match:
            r, g, b = map(int, rgb_match.groups())
        else:
            # Fallback - biały kolor
            r, g, b = 255, 255, 255

    hex_color = f"{r:02x}{g:02x}{b:02x}".upper()
    return hex_color, {"r": r, "g": g, "b": b}


def parse_colornerd_file(filepath: str, manufacturer: str) -> dict:
    """Parsuje plik colornerd JSON i konwertuje do formatu Numero."""

    with open(filepath, "r", encoding="utf-8") as f:
        colors = json.load(f)

    converted_colors = []

    for color in colors:
        hex_value = color.get("hex", "#FFFFFF")
        label = color.get("label", "")
        name = color.get("name", "")

        hex_color, rgb = parse_hex_color(hex_value)

        # Generuj ID
        color_id = f"{manufacturer.lower()}-{label.lower().replace(' ', '-').replace('/', '-')}"
        color_id = re.sub(r"[^a-z0-9-]", "", color_id)
        if not color_id.startswith(f"{manufacturer.lower()}-"):
            color_id = f"{manufacturer.lower()}-{color_id}"

        # Oblicz LRV z RGB
        lrv = (rgb["r"] * 0.2126 + rgb["g"] * 0.7152 + rgb["b"] * 0.0722) / 255 * 100

        # Określ kategorię na podstawie koloru
        category = determine_category(rgb)

        converted_colors.append(
            {
                "id": color_id[:50],  # Ogranicz długość ID
                "code": label[:20],
                "name": name,
                "hexColor": hex_color,
                "rgb": rgb,
                "lrv": round(lrv, 1),
                "category": category,
            }
        )

    # Informacje o producencie
    manufacturer_info = {
        "behr": {"displayName": "Behr", "country": "USA", "region": "usa"},
        "farrow-ball": {
            "displayName": "Farrow & Ball",
            "country": "Wielka Brytania",
            "region": "uk",
        },
        "valspar": {"displayName": "Valspar", "country": "USA", "region": "usa"},
        "sherwin-williams": {
            "displayName": "Sherwin-Williams",
            "country": "USA",
            "region": "usa",
        },
        "benjamin-moore": {
            "displayName": "Benjamin Moore",
            "country": "USA",
            "region": "usa",
        },
        "ppg": {"displayName": "PPG Paints", "country": "USA", "region": "usa"},
    }

    info = manufacturer_info.get(
        manufacturer.lower(),
        {"displayName": manufacturer.title(), "country": "", "region": ""},
    )

    result = {
        "manufacturer": manufacturer.lower().replace("-", "_"),
        "displayName": info["displayName"],
        "displayNamePL": info["displayName"],
        "displayNameDE": info["displayName"],
        "displayNameEN": info["displayName"],
        "country": info["country"],
        "region": info["region"],
        "website": f"https://www.{manufacturer.lower().replace('-', '')}.com",
        "source": "jpederson/colornerd GitHub repository",
        "lastUpdated": "2025-01-12",
        "totalColors": len(converted_colors),
        "collections": [
            {
                "id": f"{manufacturer.lower().replace('-', '_')}-main",
                "name": "Main Collection",
                "colors": converted_colors,
            }
        ],
    }

    return result


def determine_category(rgb: dict) -> str:
    """Określa kategorię koloru na podstawie wartości RGB."""
    r, g, b = rgb["r"], rgb["g"], rgb["b"]

    # Oblicz HSV dla lepszej klasyfikacji
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    diff = max_c - min_c

    # Jasność
    lightness = max_c / 255.0

    # Nasycenie
    if max_c == 0:
        saturation = 0
    else:
        saturation = diff / max_c

    # Białe (wysoka jasność, niskie nasycenie)
    if lightness > 0.90 and saturation < 0.15:
        return "white"

    # Czarne (niska jasność)
    if lightness < 0.15:
        return "black"

    # Neutrale (niskie nasycenie)
    if saturation < 0.15:
        return "neutral"

    # Określ hue dla kolorowych
    h = 0
    if diff != 0:
        if max_c == r:
            h = (g - b) / diff + (0 if g >= b else 6)
        elif max_c == g:
            h = (b - r) / diff + 2
        else:
            h = (r - g) / diff + 4
        h /= 6

    # Mapowanie hue na kategorie
    if 0.0 <= h < 0.083:  # Czerwony
        return "red"
    elif 0.083 <= h < 0.17:  # Pomarańczowy
        return "orange"
    elif 0.17 <= h < 0.25:  # Żółty
        return "yellow"
    elif 0.25 <= h < 0.42:  # Zielony
        return "green"
    elif 0.42 <= h < 0.58:  # Cyjan/Niebieski
        return "blue"
    elif 0.58 <= h < 0.75:  # Fioletowy
        return "purple"
    else:  # Różowy/Magenta
        return "red"


def main():
    if len(sys.argv) < 3:
        print(
            "Usage: python convert_colornerd.py <input_file.json> <output_file.json> <manufacturer>"
        )
        print("Example: python convert_colornerd.py behr.json behr_colors.json behr")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    manufacturer = sys.argv[3] if len(sys.argv) > 3 else "manufacturer"

    print(f"Converting {input_file} for manufacturer: {manufacturer}")

    result = parse_colornerd_file(input_file, manufacturer)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {result['totalColors']} colors to {output_file}")


if __name__ == "__main__":
    main()
