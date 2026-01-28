#!/usr/bin/env python3
"""
Convert Jotun ACO (Adobe Color) files to Numero JSON format.

Jotun ACO files contain color data in Adobe's binary format.
This script parses all ACO files in the Jotun directory structure
and converts them to Numero's color JSON format.
"""

import json
import os
import re
import struct
import sys
from pathlib import Path
from typing import Optional


def parse_aco_color_data(filepath: Path) -> Optional[tuple]:
    """
    Parse Jotun ACO file and extract RGB color.

    Jotun's ACO files have a non-standard format:
    - Position 0-1: Version major (0001)
    - Position 2-3: Version minor (0001)
    - Position 4-7: Color count (big-endian 32-bit)
    - Position 8-9: Unknown marker
    - Position 10-11: Unknown marker
    - Position 6-11: RGB values as 16-bit big-endian
    """
    try:
        with open(filepath, "rb") as f:
            data = f.read()

        if len(data) < 12:
            return None

        # Extract RGB values from position 6-11 (16-bit big-endian)
        r = struct.unpack(">H", data[6:8])[0]
        g = struct.unpack(">H", data[8:10])[0]
        b = struct.unpack(">H", data[10:12])[0]

        # Normalize from 0-65535 to 0-255
        r8 = min(255, int(r / 256))
        g8 = min(255, int(g / 256))
        b8 = min(255, int(b / 256))

        return (r8, g8, b8)

    except Exception as e:
        print(f"Error parsing {filepath}: {e}")
        return None


def extract_color_info_from_filename(filename: str) -> tuple:
    """
    Extract color code and name from Jotun filename.

    Formats:
    - "Jotun-0288-Mexico.aco" -> code="0288", name="Mexico"
    - "0263 BONDEBLÅ.aco" -> code="0263", name="BONDEBLÅ"
    - "Jotun-12075-Soothing-Beige.aco" -> code="12075", name="Soothing Beige"

    Returns tuple of (code, name).
    """
    # Remove .aco extension
    name = filename.replace(".aco", "")

    # Try Jotun format: Jotun-XXXXX-Name or Jotun-XXXX-Name
    jotun_match = re.match(r"^Jotun-(\d+)(?:-(.*))?$", name)
    if jotun_match:
        code = jotun_match.group(1)
        name_part = jotun_match.group(2)
        if name_part:
            # Convert hyphenated name to title Case
            name = name_part.replace("-", " ").title()
        else:
            name = f"Jotun {code}"
        return code, name

    # Try simple format: XXXX NAME
    simple_match = re.match(r"^(\d+)\s+(.+)$", name)
    if simple_match:
        code = simple_match.group(1)
        name = simple_match.group(2).title()
        return code, name

    # Fallback: use filename as name, generate code from hash
    return "", name


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


def create_color_object(
    code: str, name: str, hex_color: str, collection: str = ""
) -> dict:
    """Create a color object in Numero format."""
    r, g, b = hex_to_rgb(hex_color)

    # Determine category from RGB values
    category = categorize_color(r, g, b)

    obj = {
        "id": f"jotun-{code}" if code else f"jotun-{name.lower().replace(' ', '-')}",
        "code": code or "",
        "name": name,
        "nameDE": "",  # German name not available
        "hexColor": hex_color,
        "rgb": {"r": r, "g": g, "b": b},
        "lrv": calculate_lrv(r, g, b),
        "category": category,
    }

    if collection:
        obj["collection"] = collection

    return obj


def categorize_color(r: int, g: int, b: int) -> str:
    """Categorize color based on RGB values."""
    # Calculate brightness and color characteristics
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

    # Calculate hue-like characteristics
    if r >= g and r >= b:
        if r - min_val > max(g, b) - min(r, g, b):
            return "red"
    if g >= r and g >= b:
        if g - min_val > max(r, b) - min(r, g, b):
            return "green"
    if b >= r and b >= g:
        if b - min_val > max(r, g) - min(r, g, b):
            return "blue"

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

    # Brown/taupe (high red, moderate green, low blue)
    if r > g > b and r > 100:
        return "brown"

    return "neutral"


def process_directory(base_path: str) -> list:
    """Process all ACO files in directory structure."""
    colors = []
    base = Path(base_path)

    # Define collection mappings
    collection_paths = {
        "Canvas Collection 2024": "Canvas Collection 2024",
        "Interior Colour Collection/Blue Shades": "Interior Colour Collection - Blue Shades",
        "Interior Colour Collection/Green Shades": "Interior Colour Collection - Green Shades",
        "Interior Colour Collection/Neutral Shades": "Interior Colour Collection - Neutral Shades",
        "Interior Colour Collection/Red Shades": "Interior Colour Collection - Red Shades",
        "Interior Colour Collection/Yellow Shades": "Interior Colour Collection - Yellow Shades",
        "Jotashield Best Exterior Colours": "Jotashield Best Exterior Colours",
        # "Jotun Kids Collection 2023": "Jotun Kids Collection 2023",  # Skipped - non-standard format
        # "Together Collection 2022": "Together Collection 2022",  # Skipped - non-standard format
        "Nuances Collection 2025": "Nuances Collection 2025",
        "Our Most Beautiful Colours 2025": "Our Most Beautiful Colours 2025",
        "Stories Collection 2023": "Stories Collection 2023",
    }

    for collection_path, collection_name in collection_paths.items():
        collection_dir = base / collection_path
        if not collection_dir.exists():
            continue

        aco_files = list(collection_dir.glob("*.aco"))
        print(f"Processing {collection_name}: {len(aco_files)} files...")

        for aco_file in aco_files:
            # Parse the ACO file
            rgb = parse_aco_color_data(aco_file)

            if rgb:
                # Extract code and name from filename
                code, name = extract_color_info_from_filename(aco_file.name)
                hex_color = rgb_to_hex(*rgb)

                color_obj = create_color_object(
                    code=code,
                    name=name,
                    hex_color=hex_color,
                    collection=collection_name,
                )
                colors.append(color_obj)
            else:
                print(f"  Warning: Could not parse {aco_file.name}")

    return colors


def main():
    base_path = (
        "/Users/mario4/Code/walls/kolory/raw/skandynawia/Adobe_Photoshop_November_2024"
    )
    output_path = "/Users/mario4/Code/walls/kolory/skandynawia/jotun_colors.json"

    print(f"Converting Jotun ACO files from:")
    print(f"  {base_path}")
    print()

    # Process all collections
    colors = process_directory(base_path)

    # Sort by code
    colors.sort(key=lambda x: (x.get("code", ""), x.get("name", "")))

    # Create output
    result = {
        "manufacturer": "Jotun",
        "country": "Norway (Scandinavia)",
        "source": "Adobe Photoshop color palettes November 2024",
        "totalColors": len(colors),
        "colors": colors,
    }

    # Write output
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print()
    print(f"✓ Converted {len(colors)} colors to:")
    print(f"  {output_path}")

    # Print summary by collection
    collections = {}
    for color in colors:
        collection = color.get("collection", "Unknown")
        collections[collection] = collections.get(collection, 0) + 1

    print()
    print("Summary by collection:")
    for collection, count in sorted(collections.items()):
        print(f"  {collection}: {count} colors")

    # Print category distribution
    categories = {}
    for color in colors:
        category = color.get("category", "unknown")
        categories[category] = categories.get(category, 0) + 1

    print()
    print("Summary by category:")
    for category, count in sorted(categories.items()):
        print(f"  {category}: {count} colors")


if __name__ == "__main__":
    main()
