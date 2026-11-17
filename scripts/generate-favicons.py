"""Generate favicon.ico and apple-touch-icon.png from public/logo.svg.

Next.js metadata in src/app/layout.tsx references /favicon.ico and
/apple-touch-icon.png — they need to exist as raster assets.
"""
import os
import sys
import subprocess

ROOT = "/home/z/my-project"
SRC = os.path.join(ROOT, "public/logo.svg")
ICO = os.path.join(ROOT, "public/favicon.ico")
APPLE = os.path.join(ROOT, "public/apple-touch-icon.png")
FAV32 = os.path.join(ROOT, "public/favicon-32.png")
FAV16 = os.path.join(ROOT, "public/favicon-16.png")
WEBMANIFEST = os.path.join(ROOT, "public/site.webmanifest")

if not os.path.exists(SRC):
    print(f"✗ source not found: {SRC}", file=sys.stderr)
    sys.exit(1)

try:
    import cairosvg
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "cairosvg", "pillow"])
    import cairosvg
    from PIL import Image

# Render the SVG at high res, then down-sample to icon sizes.
TMP = "/tmp/scanforge-logo-512.png"
cairosvg.svg2png(url=SRC, write_to=TMP, output_width=512, output_height=512)

src = Image.open(TMP).convert("RGBA")

# apple-touch-icon.png — 180×180 with white-ish background (Apple rounds corners).
apple = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
apple.paste(src.resize((180, 180)), (0, 0))
apple.save(APPLE, "PNG")
print(f"✓ {APPLE} ({os.path.getsize(APPLE)} bytes)")

# 32×32 and 16×16 PNGs.
src.resize((32, 32), Image.LANCZOS).save(FAV32, "PNG")
src.resize((16, 16), Image.LANCZOS).save(FAV16, "PNG")
print(f"✓ {FAV32} ({os.path.getsize(FAV32)} bytes)")
print(f"✓ {FAV16} ({os.path.getsize(FAV16)} bytes)")

# favicon.ico — multi-resolution ICO (16, 32, 48).
src.resize((48, 48), Image.LANCZOS).save(ICO, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"✓ {ICO} ({os.path.getsize(ICO)} bytes)")

# Web manifest.
manifest = """{
  "name": "ScanForge — Free QR & Barcode Generator",
  "short_name": "ScanForge",
  "description": "Free QR code and barcode generator. Create, customise and download codes — no signup, no watermark.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#10b981",
  "icons": [
    { "src": "/logo.svg", "type": "image/svg+xml", "sizes": "any" },
    { "src": "/favicon-32.png", "type": "image/png", "sizes": "32x32" },
    { "src": "/favicon-16.png", "type": "image/png", "sizes": "16x16" },
    { "src": "/apple-touch-icon.png", "type": "image/png", "sizes": "180x180" }
  ]
}
"""
with open(WEBMANIFEST, "w") as f:
    f.write(manifest)
print(f"✓ {WEBMANIFEST} ({os.path.getsize(WEBMANIFEST)} bytes)")
