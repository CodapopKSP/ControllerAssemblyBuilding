#!/usr/bin/env python3
"""
Build sprite sheets and mapping files for modules and containers.

Usage examples:
  python3 build_sprites.py --target all
  python3 build_sprites.py --target modules --module-pad 2
  python3 build_sprites.py --target containers --container-pad 2
"""

import argparse
import json
import math
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent


def write_sprite_map(map_path: Path, meta_name: str, map_name: str, width: int, height: int, mapping: dict) -> None:
    content = (
        f"window.{meta_name} = " + json.dumps({"width": width, "height": height}, separators=(",", ":")) + ";\n"
        f"window.{map_name} = " + json.dumps(mapping, separators=(",", ":")) + ";\n"
    )
    map_path.write_text(content)


def build_modules_sprite(pad: int) -> None:
    module_data_text = (ROOT / "moduleData.js").read_text()
    entries = []
    for block in re.findall(r"\{[^\{\}]*?image:\s*\"[^\"]+\"[^\{\}]*?\}", module_data_text, flags=re.S):
        img_match = re.search(r'image:\s*"([^"]+)"', block)
        light_match = re.search(r'image_light:\s*"([^"]+)"', block)
        if img_match:
            entries.append((img_match.group(1), light_match.group(1) if light_match else None))

    paired_entries = [pair for pair in entries if pair[1]]
    single_entries = [pair for pair in entries if not pair[1]]
    ordered_entries = paired_entries + single_entries

    ordered_paths = []
    seen = set()
    for image_path, image_light_path in ordered_entries:
        if image_path not in seen:
            ordered_paths.append(image_path)
            seen.add(image_path)
        if image_light_path and image_light_path not in seen:
            ordered_paths.append(image_light_path)
            seen.add(image_light_path)

    def resolve_source(rel_path: str) -> Path:
        # Source images live in modules/source_images after migration.
        if rel_path.startswith("modules/"):
            return ROOT / "modules" / "source_images" / rel_path[len("modules/") :]
        return ROOT / rel_path

    images = {}
    for rel_path in ordered_paths:
        src = resolve_source(rel_path)
        if src.exists():
            images[rel_path] = Image.open(src).convert("RGBA")
        else:
            print(f"warning: missing module sprite source: {rel_path} -> {src}")

    if not images:
        raise RuntimeError("No module source images found.")

    # Keep normal/light pairs on matching cell sizes to prevent light-toggle jitter.
    cell_size = {}
    for image_path, image_light_path in ordered_entries:
        if image_path not in images:
            continue
        width = images[image_path].width
        height = images[image_path].height
        if image_light_path and image_light_path in images:
            width = max(width, images[image_light_path].width)
            height = max(height, images[image_light_path].height)
            cell_size[image_light_path] = (width, height)
        cell_size[image_path] = (width, height)

    for rel_path, img in images.items():
        cell_size.setdefault(rel_path, (img.width, img.height))

    max_w = max(w for w, _ in cell_size.values())
    max_h = max(h for _, h in cell_size.values())
    count = len(ordered_paths)
    cols = 2
    rows = math.ceil(count / cols)
    sheet_w = cols * max_w + (cols + 1) * pad
    sheet_h = rows * max_h + (rows + 1) * pad
    sheet = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))

    mapping = {}
    for index, rel_path in enumerate(ordered_paths):
        if rel_path not in images:
            continue
        cell_w, cell_h = cell_size[rel_path]
        col = index % cols
        row = index // cols
        cell_x = pad + col * (max_w + pad)
        cell_y = pad + row * (max_h + pad)
        img = images[rel_path]

        # Center image in its cell.
        draw_x = cell_x + (cell_w - img.width) // 2
        draw_y = cell_y + (cell_h - img.height) // 2
        sheet.alpha_composite(img, (draw_x, draw_y))

        mapping[rel_path] = {"x": cell_x, "y": cell_y, "w": cell_w, "h": cell_h}

    out_sprite = ROOT / "modules" / "sprite.png"
    out_map = ROOT / "moduleSpriteMap.js"
    sheet.save(out_sprite, optimize=True)
    write_sprite_map(out_map, "moduleSpriteSheetMeta", "moduleSpriteMap", sheet_w, sheet_h, mapping)
    print(f"built modules sprite: {out_sprite} ({sheet_w}x{sheet_h}), entries={len(mapping)}")


def build_containers_sprite(pad: int) -> None:
    container_dir = ROOT / "containers"
    source_dir = container_dir / "source_images"
    png_files = sorted(source_dir.glob("*.png")) if source_dir.exists() else []
    if not png_files:
        png_files = sorted([p for p in container_dir.glob("*.png") if p.name != "sprite.png"])
    if not png_files:
        raise RuntimeError("No container PNG files found.")

    images = [(f"containers/{p.name}", Image.open(p).convert("RGBA")) for p in png_files]
    max_w = max(img.width for _, img in images)
    max_h = max(img.height for _, img in images)
    count = len(images)
    cols = math.ceil(math.sqrt(count))
    rows = math.ceil(count / cols)
    sheet_w = cols * max_w + (cols + 1) * pad
    sheet_h = rows * max_h + (rows + 1) * pad
    sheet = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))

    mapping = {}
    for index, (rel_path, img) in enumerate(images):
        col = index % cols
        row = index // cols
        x = pad + col * (max_w + pad)
        y = pad + row * (max_h + pad)
        sheet.alpha_composite(img, (x, y))
        mapping[rel_path] = {"x": x, "y": y, "w": img.width, "h": img.height}

    out_sprite = container_dir / "sprite.png"
    out_map = ROOT / "containerSpriteMap.js"
    sheet.save(out_sprite, optimize=True)
    write_sprite_map(out_map, "containerSpriteSheetMeta", "containerSpriteMap", sheet_w, sheet_h, mapping)
    print(f"built containers sprite: {out_sprite} ({sheet_w}x{sheet_h}), entries={len(mapping)}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build sprite sheets for modules and containers.")
    parser.add_argument("--target", choices=["modules", "containers", "all"], default="all")
    parser.add_argument("--module-pad", type=int, default=0, help="Padding pixels between module cells.")
    parser.add_argument("--container-pad", type=int, default=2, help="Padding pixels between container cells.")
    args = parser.parse_args()

    if args.target in ("modules", "all"):
        build_modules_sprite(args.module_pad)
    if args.target in ("containers", "all"):
        build_containers_sprite(args.container_pad)


if __name__ == "__main__":
    main()
