#!/usr/bin/env python3
"""
Convert Sherwin-Williams colors from GitHub JSON to Numero format.

Source: https://github.com/glamp/sherwin-williams
"""

import json
import re
from pathlib import Path


def hex_to_rgb(hex_color: str) -> tuple:
    """Convert hex color string to RGB tuple."""
    hex_color = hex_color.lstrip("#")
    return (int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16))


def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB tuple to hex color string."""
    return f"#{r:02x}{g:02x}{b:02x}".upper()


def calculate_lrv(r: int, g: int, b: int) -> float:
    """
    Calculate Light Reflectance Value (LRV).

    Formula: LRV = (R×0.2126 + G×0.7152 + B×0.0722) / 255 × 100
    """
    lrv = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255 * 100
    return round(lrv, 1)


def categorize_color(r: int, g: int, b: int) -> str:
    """Categorize color based on RGB values."""
    max_val = max(r, g, b)
    min_val = min(r, g, b)

    # Check for grayscale
    if max_val - min_val < 30:
        if max_val > 200:
            return "white"
        elif max_val < 50:
            return "black"
        else:
            return "neutral"

    # Check for warm colors (yellow/orange/brown)
    if r > g and g > b:
        if r - g < 50:
            return "yellow"
        else:
            return "orange"

    # Check for purple/pink
    if b > r and r > g:
        return "purple"
    if r > b and b > g:
        return "red"

    # Brown/taupe
    if r > g > b and r > 100:
        return "brown"

    # Primary color checks
    if r >= g and r >= b:
        return "red"
    if g >= r and g >= b:
        return "green"
    if b >= r and b >= g:
        return "blue"

    return "neutral"


def extract_sw_code(name: str) -> str:
    """Try to extract SW color code from name."""
    # Look for patterns like "SW 1234" or "SW1234"
    match = re.search(r"SW\s*(\d{4})", name, re.IGNORECASE)
    if match:
        return match.group(1)
    return ""


def create_color_object(name: str, hex_color: str, index: int) -> dict:
    """Create a color object in Numero format."""
    r, g, b = hex_to_rgb(hex_color)
    sw_code = extract_sw_code(name)

    obj = {
        "id": f"sherwin-williams-{index + 1:04d}"
        if not sw_code
        else f"sherwin-williams-{sw_code}",
        "code": sw_code or "",
        "name": name,
        "nameDE": "",  # German name not available
        "hexColor": hex_color.upper(),
        "rgb": {"r": r, "g": g, "b": b},
        "lrv": calculate_lrv(r, g, b),
        "category": categorize_color(r, g, b),
    }

    return obj


def main():
    input_path = "/Users/mario4/Code/walls/kolory/usa/sherwin_williams_raw.json"
    output_path = "/Users/mario4/Code/walls/kolory/usa/sherwin_williams_colors.json"

    # Read source data
    with open(input_path, "r", encoding="utf-8") as f:
        source_colors = json.load(f)

    print(f"Converting {len(source_colors)} Sherwin-Williams colors...")

    # Convert to Numero format
    colors = []
    for i, color in enumerate(source_colors):
        color_obj = create_color_object(
            name=color["name"], hex_color=color["hex"], index=i
        )
        colors.append(color_obj)

    # Create output
    result = {
        "manufacturer": "Sherwin-Williams",
        "country": "USA",
        "source": "GitHub glamp/sherwin-williams repository",
        "url": "https://github.com/glamp/sherwin-williams",
        "totalColors": len(colors),
        "colors": colors,
    }

    # Write output
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"✓ Converted {len(colors)} colors to:")
    print(f"  {output_path}")

    # Print summary by category
    categories = {}
    for color in colors:
        category = color.get("category", "unknown")
        categories[category] = categories.get(category, 0) + 1

    print("\nSummary by category:")
    for category, count in sorted(categories.items()):
        print(f"  {category}: {count} colors")


if __name__ == "__main__":
    main()
