#!/usr/bin/env python3
"""Prosty konwerter CSV dla plików z adobe-swatch-for-interior-designers"""

import json
import re
import sys


def hex_to_rgb(hex_color):
    hex_color = hex_color.strip().lstrip("#")
    if len(hex_color) == 6:
        return {
            "r": int(hex_color[0:2], 16),
            "g": int(hex_color[2:4], 16),
            "b": int(hex_color[4:6], 16),
        }
    return {"r": 255, "g": 255, "b": 255}


def determine_category(rgb):
    r, g, b = rgb["r"], rgb["g"], rgb["b"]
    max_c = max(r, g, b)
    min_c = min(r, g, b)
    diff = max_c - min_c

    lightness = max_c / 255.0
    saturation = 0 if max_c == 0 else diff / max_c

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


def convert_csv_to_numero(csv_files, manufacturer, region, country, output_file):
    all_colors = []

    for csv_file in csv_files:
        try:
            with open(csv_file, "r", encoding="utf-8") as f:
                lines = f.readlines()

            for line in lines[1:]:  # Skip header
                line = line.strip()
                if not line:
                    continue

                parts = line.split(",")
                if len(parts) >= 3:
                    name = parts[0].strip()
                    hex_color = parts[2].strip()

                    if not hex_color:
                        continue

                    rgb = hex_to_rgb(hex_color)
                    hex_upper = hex_color.upper().lstrip("#")

                    # Calculate LRV
                    lrv = (
                        (rgb["r"] * 0.2126 + rgb["g"] * 0.7152 + rgb["b"] * 0.0722)
                        / 255
                        * 100
                    )

                    # Generate ID
                    safe_name = re.sub(r"[^a-zA-Z0-9]", "-", name.lower())[:30]
                    color_id = f"{manufacturer.lower()}-{safe_name}"

                    all_colors.append(
                        {
                            "id": color_id,
                            "code": name[:20],
                            "name": name,
                            "hexColor": hex_upper,
                            "rgb": rgb,
                            "lrv": round(lrv, 1),
                            "category": determine_category(rgb),
                        }
                    )
        except Exception as e:
            print(f"Error reading {csv_file}: {e}")

    result = {
        "manufacturer": manufacturer.lower(),
        "displayName": manufacturer,
        "displayNamePL": manufacturer,
        "displayNameDE": manufacturer,
        "displayNameEN": manufacturer,
        "country": country,
        "region": region,
        "website": f"https://www.{manufacturer.lower().replace(' ', '')}.com",
        "source": "kdybicz/adobe-swatch-for-interior-designers GitHub",
        "lastUpdated": "2025-01-12",
        "totalColors": len(all_colors),
        "collections": [
            {
                "id": f"{manufacturer.lower()}-main",
                "name": "Main Collection",
                "colors": all_colors,
            }
        ],
    }

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {len(all_colors)} colors to {output_file}")


if __name__ == "__main__":
    if len(sys.argv) < 5:
        print(
            "Usage: python convert_simple.py <csv_files> <manufacturer> <region> <country> <output>"
        )
        sys.exit(1)

    csv_files = sys.argv[1].split(",")
    manufacturer = sys.argv[2]
    region = sys.argv[3]
    country = sys.argv[4]
    output_file = sys.argv[5]

    convert_csv_to_numero(csv_files, manufacturer, region, country, output_file)
