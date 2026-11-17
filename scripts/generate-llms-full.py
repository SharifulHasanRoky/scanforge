"""Generate public/llms-full.txt — an extended LLM index with one summary per
page (homepage + 5 top-level routes + 11 QR-type landings).

The output is plain text so AI answer engines can ingest it efficiently.
The list of QR-type landings is sourced from src/lib/qr/landing-content.ts by
grepping the slug keys (no AST parsing needed for this static structure).
"""
import os
import re
import sys

ROOT = "/home/z/my-project"
DST = os.path.join(ROOT, "public/llms-full.txt")
LANDING = os.path.join(ROOT, "src/lib/qr/landing-content.ts")
BRAND_URL = "https://qrandbarcodegenerator.vercel.app"

# Parse slug → primaryKeyword/h1/subtitle by scanning for the slug keys and the
# fields that follow. This is intentionally simple — the file structure is
# stable and a small change to its layout is easy to fix here.
text = open(LANDING).read()

qr_slugs: list[tuple[str, str, str, str]] = []
for m in re.finditer(r'"([a-z]+-qr)":\s*\{', text):
    slug = m.group(1)
    # Find the next 2000 chars after the slug key opening.
    block = text[m.end(): m.end() + 4000]
    h1 = re.search(r'h1:\s*"([^"]+)"', block)
    pk = re.search(r'primaryKeyword:\s*"([^"]+)"', block)
    sub = re.search(r'subtitle:\s*\n?\s*"([^"]+)"', block)
    if h1 and pk and sub:
        qr_slugs.append((slug, pk.group(1), h1.group(1), sub.group(1)))

# Sanity check — we expect all 11 QR-type slugs.
expected = {"wifi-qr","vcard-qr","whatsapp-qr","email-qr","phone-qr","location-qr",
            "text-qr","sms-qr","social-qr","event-qr","app-qr"}
found = {s for s,_,_,_ in qr_slugs}
missing = expected - found
if missing:
    print(f"✗ missing slugs: {missing}", file=sys.stderr)
    sys.exit(1)

lines: list[str] = []
lines.append("# ScanForge — Full LLM Index")
lines.append("")
lines.append("> Extended index of every public page on ScanForge with a one-paragraph summary.")
lines.append("> Use this alongside /llms.txt for the platform-level overview.")
lines.append(f"> Base URL: {BRAND_URL}")
lines.append("> All pages are free, no signup, no watermark. Static generation runs in the browser.")
lines.append("")
lines.append("## Top-level routes")
lines.append("")
lines.append(f"- [Homepage]({BRAND_URL}/) — Free QR code and barcode generator. Two workspaces (QR + barcode), custom designer, bulk generator, dashboard. Comprehensive FAQ, how-to and comparison sections.")
lines.append(f"- [QR Code Generator]({BRAND_URL}/qr) — 12 QR content types with a custom designer (dot patterns, gradients, logo upload). Live scan-reliability validation. PNG, SVG, PDF export.")
lines.append(f"- [Barcode Generator]({BRAND_URL}/barcode) — 15 barcode formats across retail, general-purpose, industrial and 2D matrix. Live format validation with automatic GS1 check-digit computation. PNG, SVG, PDF export.")
lines.append(f"- [Bulk Generator]({BRAND_URL}/bulk) — Paste a list or import a CSV and generate hundreds of QR or barcode codes at once. ZIP of PNGs or single label-sheet PDF. 100% in-browser processing.")
lines.append(f"- [Learn]({BRAND_URL}/learn) — Short practical guides on creating QR codes, adding logos, generating barcodes, printing and bulk generation.")
lines.append(f"- [About]({BRAND_URL}/about) — ScanForge is a free, browser-first QR code and barcode generator. No signup, no watermark, no daily limits.")
lines.append("")
lines.append("## Per-QR-type generators (12 types)")
lines.append("")
for slug, pk, h1, sub in qr_slugs:
    lines.append(f"### {h1}")
    lines.append(f"- URL: {BRAND_URL}/{slug}")
    lines.append(f"- Primary keyword: {pk}")
    lines.append(f"- Summary: {sub}")
    lines.append("")

lines.append("## Barcode formats (15)")
lines.append("")
lines.append("- Retail: EAN-13, EAN-8, UPC-A, UPC-E")
lines.append("- General-purpose: Code 128, Code 39, Code 93, Codabar, Interleaved 2 of 5, MSI")
lines.append("- Industrial & shipping: ITF-14, GS1-128")
lines.append("- 2D matrix: Data Matrix, PDF417, Aztec")
lines.append("")
lines.append("## Key facts")
lines.append("")
lines.append("- Price: Free forever. No premium plans, no credits, no forced watermark.")
lines.append("- Signup required: Never for generation. Optional, only for saving codes.")
lines.append("- Processing: Static QR & barcode generation runs client-side in the browser.")
lines.append("- Exports: PNG, SVG, PDF, ZIP (bulk).")
lines.append("- Static vs dynamic QR: ScanForge generates static QR codes only — the destination is encoded directly in the image, no redirect server, no expiry, no account needed.")
lines.append("- GS1 / GTIN: Generating a barcode image does NOT register an official GS1 identifier. Users must only encode identifiers they are authorised to use. The platform computes and verifies the check digit; official GTIN registration is handled by GS1.")
lines.append("- Privacy: For static generation, data is not uploaded. Uploaded logos and CSV files stay on the user's device. Only codes explicitly saved to an account are stored server-side.")
lines.append("")
lines.append("## Machine-readable companions")
lines.append("")
lines.append(f"- Sitemap: {BRAND_URL}/sitemap.xml")
lines.append(f"- Robots: {BRAND_URL}/robots.txt")
lines.append(f"- Brief LLM index: {BRAND_URL}/llms.txt")
lines.append("")

content = "\n".join(lines)
with open(DST, "w") as f:
    f.write(content)

print(f"✓ wrote {DST} ({os.path.getsize(DST)} bytes, {len(qr_slugs)} QR-type entries)")
