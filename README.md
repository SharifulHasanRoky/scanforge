# ScanForge — Free QR Code & Barcode Workspace

> **Create QR Codes & Barcodes. Free. In Seconds.**
> Scan. Connect. Create.

The world's free QR code & barcode workspace — a browser-first platform to
create, customise, generate, download, print, save and manage QR codes and
barcodes. 100% free forever. No watermarks, no daily quotas, no mandatory
signup for generation.

---

## ✨ Features

### QR Code Generator (12 content types)
URL · Plain Text · Wi-Fi · vCard · Email · Phone · SMS · WhatsApp · Location ·
Social Media · Calendar Event · App Download.

### Custom QR Designer
- Dot patterns (square / dots / rounded / classy / extra-rounded)
- Custom eye frames & dots
- Solid colour or linear gradient
- Logo upload with size control and background-dot removal
- Error correction L / M / Q / H
- Quiet-zone (margin) control
- 6 design presets
- **Scan-reliability validation**: contrast-ratio check + live `jsQR` decode
  test that re-reads the generated QR before claiming it's scannable

### Barcode Generator (15 formats)
- **Retail**: EAN-13, EAN-8, UPC-A, UPC-E
- **General-purpose**: Code 128, Code 39, Code 93, Codabar, Interleaved 2 of 5
- **Industrial / shipping**: ITF-14, GS1-128, MSI
- **2D matrix**: Data Matrix, PDF417, Aztec

Format-specific validation, GS1 check-digit computation, and an honest notice
that generating a barcode image does **not** register a real GS1-issued GTIN.

### Bulk Generator
- Paste rows (one per line) or import a CSV (PapaParse)
- Sequential-number mode (prefix / suffix / start / count)
- Batch preview grid, live progress, cancellation
- Invalid-row detection and skipping
- Export as ZIP of PNGs (JSZip) or label-sheet PDF (jsPDF, A4 grid)
- 100% in-browser — your data never leaves your device

### Exports
PNG · SVG (true vector for 1D barcodes) · PDF (print-ready A4) · Print · ZIP

### Optional Accounts
- First 3 generations never prompt for signup
- After the 3rd, a **dismissible** invitation — never a paywall or block
- Registration: Full name / Email / Phone / Password
- **No OTP, no email verification, no phone verification**
- bcrypt-hashed passwords, HMAC-signed httpOnly session cookies
- Dashboard: saved QR codes & barcodes, projects, folders, account settings
- Account deletion cascades to all user data

### SEO & Content
- Optimised metadata, Open Graph, Twitter cards, robots, canonical
- Homepage with hero, tool grid, advantages, honest competitor comparison, FAQ
- Learn page with practical guides (QR vs barcode, static vs dynamic, etc.)

---

## 🧱 Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Database**: Prisma ORM (SQLite)
- **QR**: `qr-code-styling` (generation) + `jsqr` (decode validation)
- **Barcode**: `jsbarcode` (1D) + `bwip-js` (2D matrix)
- **Bulk**: `papaparse` (CSV) + `jszip` (ZIP) + `jspdf` (PDF)
- **Auth**: `bcryptjs` + HMAC session cookies (no external auth service)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or [Bun](https://bun.sh))
- A package manager: `npm`, `pnpm`, `yarn`, or `bun`

### Install & Run

```bash
# 1. Install dependencies
bun install        # or: npm install

# 2. Copy env and set values
cp .env.example .env
# Edit .env — set AUTH_SECRET to a long random string:
#   openssl rand -base64 32

# 3. Push the Prisma schema to the database
bun run db:push    # or: npx prisma db push

# 4. Start the dev server
bun run dev        # or: npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
bun run build
bun run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # register, login, logout, me, delete
│   │   ├── codes/         # saved QR/barcode CRUD
│   │   └── projects/      # project CRUD
│   ├── layout.tsx         # root layout + SEO metadata
│   ├── page.tsx           # hash-routed single-page app
│   └── globals.css        # brand design tokens
├── components/
│   ├── auth/              # signup/login modal
│   ├── barcode/           # barcode workspace
│   ├── bulk/              # bulk generator
│   ├── dashboard/         # user dashboard
│   ├── home/              # homepage + learn page
│   ├── qr/                # QR workspace, designer, preview
│   └── site/              # header, footer, logo
├── lib/
│   ├── auth.ts            # session cookie + HMAC
│   ├── brand.ts           # brand constants
│   ├── db.ts              # Prisma client
│   ├── store.ts           # Zustand store (view, counter, popup, guest codes)
│   ├── qr/                # QR content builders, designer engine, exports
│   └── barcode/           # barcode formats + validation
prisma/
└── schema.prisma          # User, SavedCode, Project, Folder
```

---

## 🔒 Privacy & Security

- Static QR & barcode generation runs **entirely in your browser**
- Uploaded logos and CSV files for bulk generation stay on your device
- Only codes you explicitly save to your account are stored on the server
- Passwords are hashed with bcrypt; sessions are signed HMAC cookies
- `.env`, `db/*.db`, and `.zscripts/` are git-ignored — never committed

---

## 📜 License

MIT — free to use, modify and distribute.

---

## ⚠️ Honest Scope Notes

This is a strong, genuinely-usable MVP. Natural next phases:

- **Dynamic QR** (redirect server + scan analytics) — requires backend
  infrastructure that can be maintained long-term
- **Google AdSense** placement integration
- **Dedicated SEO landing pages** per keyword cluster (currently represented as
  homepage sections due to the single-route constraint of this build)
- **GS1 Digital Link** QR support
- **Camera scanning** for QR testing on mobile

---

**THE WORLD'S FREE QR CODE & BARCODE WORKSPACE.**
**FREE FOREVER. NO FORCED WATERMARKS. NO DAILY GENERATION QUOTAS.**
