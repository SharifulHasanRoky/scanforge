"""Convert public/og-image.svg to a real 1200×630 PNG.

Facebook / Twitter / LinkedIn / Slack reject SVG OG images, so we rasterise
the existing SVG into a PNG that every social platform accepts.

Strategy: parse the SVG with cairosvg (bundled with Pillow's SVG support)
and write a high-DPI PNG.
"""
import os
import sys

ROOT = "/home/z/my-project"
SRC = os.path.join(ROOT, "public/og-image.svg")
DST = os.path.join(ROOT, "public/og-image.png")

if not os.path.exists(SRC):
    print(f"✗ source not found: {SRC}", file=sys.stderr)
    sys.exit(1)

try:
    import cairosvg
except ImportError:
    print("cairosvg not installed, trying pip install…", file=sys.stderr)
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "cairosvg"])
    import cairosvg

# Render at 1x exactly 1200x630 (SVG already declares these dimensions).
cairosvg.svg2png(url=SRC, write_to=DST, output_width=1200, output_height=630)

size = os.path.getsize(DST)
print(f"✓ wrote {DST} ({size} bytes)")

# Sanity-check the PNG is not blank.
from PIL import Image
img = Image.open(DST).convert("L")
hist = img.histogram()
non_white_ratio = 1 - hist[255] / sum(hist)
print(f"  dimensions: {img.size}, non-white ratio: {non_white_ratio:.3f}")
if non_white_ratio < 0.05:
    print("  ⚠ image is nearly blank — investigate", file=sys.stderr)
    sys.exit(2)
