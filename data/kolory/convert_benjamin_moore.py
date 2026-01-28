#!/usr/bin/env python3
"""
Convert Benjamin Moore colors to Numero format.

Source: https://github.com/hakyim/benjamin-moore-css
"""

import json
import re
from pathlib import Path


def hex_to_rgb(hex_color: str) -> tuple:
    hex_color = hex_color.lstrip("#")
    return (int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16))


def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02x}{g:02x}{b:02x}".upper()


def calculate_lrv(r: int, g: int, b: int) -> float:
    lrv = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255 * 100
    return round(lrv, 1)


def categorize_color(r: int, g: int, b: int) -> str:
    max_val = max(r, g, b)
    min_val = min(r, g, b)

    if max_val - min_val < 30:
        if max_val > 200:
            return "white"
        elif max_val < 50:
            return "black"
        else:
            return "neutral"

    if r > g and g > b:
        if r - g < 50:
            return "yellow"
        else:
            return "orange"

    if b > r and r > g:
        return "purple"
    if r > b and b > g:
        return "red"

    if r > g > b and r > 100:
        return "brown"

    if r >= g and r >= b:
        return "red"
    if g >= r and g >= b:
        return "green"
    if b >= r and b >= g:
        return "blue"

    return "neutral"


def bm_family_to_category(family: str) -> str:
    """Map Benjamin Moore family to category."""
    family_lower = family.lower() if family else ""

    if "gray" in family_lower or "grey" in family_lower:
        return "neutral"
    if "white" in family_lower:
        return "white"
    if "black" in family_lower:
        return "black"
    if "brown" in family_lower or "tan" in family_lower or "beige" in family_lower:
        return "brown"
    if (
        "orange" in family_lower
        or "copper" in family_lower
        or "terracotta" in family_lower
    ):
        return "orange"
    if "yellow" in family_lower or "gold" in family_lower or "mustard" in family_lower:
        return "yellow"
    if "red" in family_lower or "burgundy" in family_lower or "maroon" in family_lower:
        return "red"
    if "pink" in family_lower or "rose" in family_lower or "coral" in family_lower:
        return "red"
    if "green" in family_lower or "sage" in family_lower or "mint" in family_lower:
        return "green"
    if "blue" in family_lower or "navy" in family_lower or "teal" in family_lower:
        return "blue"
    if (
        "purple" in family_lower
        or "lavender" in family_lower
        or "violet" in family_lower
    ):
        return "purple"

    return "neutral"


def create_color_object(color: dict, index: int) -> dict:
    r, g, b = hex_to_rgb(color["hex"])
    category = bm_family_to_category(color.get("family", ""))

    obj = {
        "id": f"benjamin-moore-{color.get('number', str(index))}",
        "code": color.get("number", ""),
        "name": color.get("name", ""),
        "nameDE": "",
        "hexColor": color["hex"].upper(),
        "rgb": {"r": r, "g": g, "b": b},
        "lrv": calculate_lrv(r, g, b),
        "category": category,
    }

    return obj


def main():
    input_path = "/Users/mario4/Code/walls/kolory/usa/benjamin_moore_raw.json"
    output_path = "/Users/mario4/Code/walls/kolory/usa/benjamin_moore_colors.json"

    with open(input_path, "r", encoding="utf-8") as f:
        source_colors = json.load(f)

    print(f"Converting {len(source_colors)} Benjamin Moore colors...")

    colors = []
    for i, color in enumerate(source_colors):
        color_obj = create_color_object(color, i)
        colors.append(color_obj)

    result = {
        "manufacturer": "Benjamin Moore",
        "country": "USA",
        "source": "GitHub hakyim/benjamin-moore-css repository",
        "url": "https://github.com/hakyim/benjamin-moore-css",
        "totalColors": len(colors),
        "colors": colors,
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"✓ Converted {len(colors)} colors to:")
    print(f"  {output_path}")

    categories = {}
    for color in colors:
        cat = color.get("category", "unknown")
        categories[cat] = categories.get(cat, 0) + 1

    print("\nSummary by category:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count} colors")


if __name__ == "__main__":
    main()
