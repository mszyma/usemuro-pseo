#!/usr/bin/env python3
"""
convert_aco_csv.py - Konwertuje pliki CSV z ACO interior designers na format JSON Numero

Źródło: https://github.com/kdybicz/adobe-swatch-for-interior-designers
Obsługuje: Beckers, Dulux, Flügger, Magnat (format CSV)
"""

import json
import re
import sys
from pathlib import Path


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


def parse_csv_file(
    filepath: str, manufacturer: str, collection_name: str = "Main Collection"
) -> dict:
    """Parsuje plik CSV i konwertuje do formatu Numero."""

    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    converted_colors = []

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Obsługuj różne formaty CSV
        parts = line.split(",")

        if len(parts) >= 3:
            # Format: name, code, hex
            if len(parts) == 3:
                name = parts[0].strip()
                code = parts[1].strip()
                hex_value = parts[2].strip()
            else:
                # Może być: name, hex (bez kodu)
                name = parts[0].strip()
                hex_value = parts[-1].strip()
                code = name[:20]  # Użyj nazwy jako kodu

            if not hex_value.startswith("#") and not hex_value.lower().startswith(
                "rgb"
            ):
                hex_value = "#" + hex_value

            hex_color, rgb = parse_hex_color(hex_value)

            # Generuj ID
            safe_code = re.sub(r"[^a-zA-Z0-9]", "-", code)
            color_id = f"{manufacturer.lower()}-{safe_code.lower()}"
            color_id = re.sub(r"-+", "-", color_id).strip("-")[:50]

            # Oblicz LRV z RGB
            lrv = (
                (rgb["r"] * 0.2126 + rgb["g"] * 0.7152 + rgb["b"] * 0.0722) / 255 * 100
            )

            # Określ kategorię
            category = determine_category(rgb)

            converted_colors.append(
                {
                    "id": color_id,
                    "code": code[:20],
                    "name": name,
                    "hexColor": hex_color,
                    "rgb": rgb,
                    "lrv": round(lrv, 1),
                    "category": category,
                }
            )

    # Informacje o producencie
    manufacturer_info = {
        "dulux": {
            "displayName": "Dulux",
            "country": "Wielka Brytania/Australia",
            "region": "uk",
        },
        "beckers": {
            "displayName": "Beckers",
            "country": "Szwecja",
            "region": "skandynawia",
        },
        "flugger": {
            "displayName": "Flügger",
            "country": "Dania",
            "region": "skandynawia",
        },
        "magnat": {"displayName": "Magnat", "country": "Polska", "region": "polska"},
    }

    info = manufacturer_info.get(
        manufacturer.lower(),
        {"displayName": manufacturer.title(), "country": "", "region": ""},
    )

    result = {
        "manufacturer": manufacturer.lower(),
        "displayName": info["displayName"],
        "displayNamePL": info["displayName"],
        "displayNameDE": info["displayName"],
        "displayNameEN": info["displayName"],
        "country": info["country"],
        "region": info["region"],
        "website": f"https://www.{manufacturer.lower()}.com",
        "source": "kdybicz/adobe-swatch-for-interior-designers GitHub repository",
        "lastUpdated": "2025-01-12",
        "totalColors": len(converted_colors),
        "collections": [
            {
                "id": f"{manufacturer.lower()}-{collection_name.lower().replace(' ', '-')}",
                "name": collection_name,
                "colors": converted_colors,
            }
        ],
    }

    return result


def determine_category(rgb: dict) -> str:
    """Określa kategorię koloru na podstawie wartości RGB."""
    r, g, b = rgb["r"], rgb["g"], rgb["b"]

    max_c = max(r, g, b)
    min_c = min(r, g, b)
    diff = max_c - min_c

    lightness = max_c / 255.0
    if max_c == 0:
        saturation = 0
    else:
        saturation = diff / max_c

    if lightness > 0.90 and saturation < 0.15:
        return "white"
    if lightness < 0.15:
        return "black"
    if saturation < 0.15:
        return "neutral"

    h = 0
    if diff != 0:
        if max_c == r:
            h = (g - b) / diff + (0 if g >= b else 6)
        elif max_c == g:
            h = (b - r) / diff + 2
        else:
            h = (r - g) / diff + 4
        h /= 6

    if 0.0 <= h < 0.083:
        return "red"
    elif 0.083 <= h < 0.17:
        return "orange"
    elif 0.17 <= h < 0.25:
        return "yellow"
    elif 0.25 <= h < 0.42:
        return "green"
    elif 0.42 <= h < 0.58:
        return "blue"
    elif 0.58 <= h < 0.75:
        return "purple"
    else:
        return "red"


def main():
    if len(sys.argv) < 4:
        print(
            "Usage: python convert_aco_csv.py <input_file.csv> <output_file.json> <manufacturer> [collection_name]"
        )
        print(
            "Example: python convert_aco_csv.py dulux.csv dulux_colors.json dulux 'EasyCare'"
        )
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    manufacturer = sys.argv[3]
    collection_name = sys.argv[4] if len(sys.argv) > 4 else "Main Collection"

    print(f"Converting {input_file} for manufacturer: {manufacturer}")

    result = parse_csv_file(input_file, manufacturer, collection_name)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {result['totalColors']} colors to {output_file}")


if __name__ == "__main__":
    main()
