// Per-barcode-format SEO landing content. Config-driven so adding a new
// dedicated barcode landing page is a single object edit — no new component.
// Each entry powers: H1, meta, "what is" definition, spec table, use cases,
// how-to steps, FAQ (visible + JSON-LD), and the BarcodeWorkspace pre-seed.
// Facts follow GS1 general specifications; no fabricated statistics.

export type BarcodeLandingContent = {
  /** BARCODE_FORMATS id in src/lib/barcode/formats.ts (pre-selects the tool). */
  formatId: string;
  slug: string; // route path segment, e.g. "ean-13-barcode"
  /** Primary keyword, used as title core and HowTo name. */
  primaryKeyword: string;
  h1: string;
  /** ≤160 chars, primary + secondary keywords. */
  metaDescription: string;
  /** Short hero subtitle. */
  subtitle: string;
  /** "What is X" section heading (grammatical control, e.g. "What is an EAN-13 barcode?"). */
  whatIsTitle: string;
  /** Definition block (2-3 paragraphs, answer-first for AEO). */
  whatIs: string[];
  /** Symbol spec table (GEO-citable, GS1-based facts). */
  specs: { label: string; value: string }[];
  /** Use cases by audience. */
  useCases: { title: string; body: string }[];
  /** How-to steps (also rendered as HowTo schema). */
  howTo: { step: string; text: string }[];
  /** FAQ pairs (visible + FAQPage JSON-LD). Answers 30-80 words, answer-first. */
  faqs: { q: string; a: string }[];
};

export const BARCODE_LANDING_CONTENT: Record<string, BarcodeLandingContent> = {
  "ean-13-barcode": {
    formatId: "ean13",
    slug: "ean-13-barcode",
    primaryKeyword: "ean 13 barcode generator",
    h1: "Free EAN-13 Barcode Generator",
    metaDescription:
      "Free EAN-13 barcode generator. Create valid retail barcodes with automatic GS1 check-digit validation and download print-ready PNG, SVG or PDF. No signup.",
    subtitle:
      "Create valid EAN-13 retail barcodes with automatic GS1 check-digit validation. Download print-ready PNG, SVG or PDF — free, no signup, no watermark.",
    whatIsTitle: "What is an EAN-13 barcode?",
    whatIs: [
      "An EAN-13 barcode is the retail barcode used at point-of-sale almost everywhere in the world. It encodes exactly 13 digits — a GS1 prefix, a company prefix, an item reference and a final check digit — as the number GTIN-13. Every supermarket scanner can read it.",
      "The last digit is not free choice: it is a check digit computed from the first 12 digits with the GS1 algorithm (weights alternating 1 and 3). ScanForge validates your number as you type and tells you the correct check digit if yours does not match, so a mistyped product code never reaches your labels.",
      "EAN-13 is a GS1 standard: the company prefix must be licensed from GS1 and the item reference is assigned by you. Generating the image with ScanForge is free and instant, but the number you encode should be one you are authorised to use. An EAN-13 that starts with 0 is identical in meaning to a UPC-A code.",
    ],
    specs: [
      { label: "Digits", value: "13 (12 data + 1 check digit)" },
      { label: "GTIN name", value: "GTIN-13" },
      { label: "Type", value: "Linear (1D), GS1 standard" },
      { label: "Check digit", value: "GS1 algorithm, weights 1-3 alternating" },
      { label: "Nominal size", value: "≈ 37.29 × 25.93 mm at 100% magnification (80%–200% allowed)" },
      { label: "Quiet zones", value: "11 modules left, 7 modules right" },
      { label: "Used for", value: "Retail products at point-of-sale worldwide" },
    ],
    useCases: [
      { title: "Retail packaging", body: "Assign a GTIN-13 to each product variant so retailers and marketplaces can list and scan it at the till." },
      { title: "E-commerce listings", body: "Amazon, eBay and Google Shopping ask for a GTIN — an EAN-13 for each SKU keeps listings compliant." },
      { title: "Price tags & shelf labels", body: "Print EAN-13 barcodes on shelf-edge labels so staff can scan the product, not search by name." },
      { title: "Inventory & stock control", body: "Scan EAN-13 codes with a 2D imager or phone to count stock, receive deliveries and spot mismatches fast." },
      { title: "Magazines & books", body: "ISSN-13 and ISBN-13 are EAN-13 symbols with a fixed GS1 prefix — generate proofs and cover mock-ups." },
      { title: "Vouchers & coupons", body: "Coupon EAN-13 codes (prefix 99) let POS systems apply discounts automatically at checkout." },
    ],
    howTo: [
      { step: "Open the EAN-13 generator", text: "Go to the barcode generator and select EAN-13 from the format list — this page pre-selects it for you." },
      { step: "Enter your 13-digit number", text: "Type the 12 data digits plus check digit. ScanForge validates the check digit live and flags a mismatch with the correct value." },
      { step: "Adjust size & label", text: "Set bar width and height, toggle the human-readable number, and pick colours. Keep black on white for retail compliance." },
      { step: "Download and print", text: "Export PNG for mock-ups, SVG for vector printing, or PDF for label sheets. Respect the quiet zones when placing the code." },
    ],
    faqs: [
      { q: "How do I generate an EAN-13 barcode for free?", a: "Enter your 13-digit number in the generator above, and ScanForge renders the barcode instantly with automatic check-digit validation. You can download it as PNG, SVG or PDF without an account and without a watermark. If your check digit is wrong, the tool shows the correct value so your labels scan the first time." },
      { q: "What is the check digit in an EAN-13 code?", a: "The 13th digit is a check digit computed from the first 12 digits using the GS1 algorithm: digits are multiplied by alternating weights 1 and 3, summed, and the check digit makes the total a multiple of 10. It lets scanners detect mistyped numbers. ScanForge calculates it for you and warns you before printing an invalid code." },
      { q: "Do I need a GS1 licence to print an EAN-13 barcode?", a: "Yes, for products sold through retail. The company prefix inside the EAN-13 must be licensed from GS1, and the item reference is assigned by you. ScanForge generates the barcode image and validates its structure, but it cannot register numbers — only encode identifiers you are authorised to use." },
      { q: "What is the difference between EAN-13 and UPC-A?", a: "Both identify retail products with a GS1 GTIN. EAN-13 has 13 digits and is used worldwide; UPC-A has 12 digits and originated in North America. An EAN-13 starting with 0 carries exactly the same number as a UPC-A, so scanners read both. Many brands now license one GTIN and print either form." },
      { q: "What size should an EAN-13 barcode be printed?", a: "GS1 allows magnification between 80% and 200%. At 100% an EAN-13 measures about 37.29 × 25.93 mm including quiet zones. Smaller codes risk scan failures at the till; keep the symbol black on white and never squeeze the height below about 80% of the nominal, or scanners may not read it reliably." },
      { q: "Can I generate an EAN-13 barcode from just 12 digits?", a: "ScanForge expects the full 13-digit code, but if you enter 12 digits with a wrong check digit it will show the expected 13th digit — append it and the barcode renders. This makes it easy to derive the check digit for numbers you received from a GS1 company prefix without doing the maths by hand." },
    ],
  },

  "upc-a-barcode": {
    formatId: "upca",
    slug: "upc-a-barcode",
    primaryKeyword: "upc-a barcode generator",
    h1: "Free UPC-A Barcode Generator",
    metaDescription:
      "Free UPC-A barcode generator. Create valid 12-digit GTIN-12 retail barcodes with check-digit validation and download PNG, SVG or PDF. No signup, no watermark.",
    subtitle:
      "Create valid UPC-A retail barcodes (12-digit GTIN-12) with live check-digit validation. Download PNG, SVG or PDF — free, no signup, no watermark.",
    whatIsTitle: "What is a UPC-A barcode?",
    whatIs: [
      "A UPC-A barcode is the 12-digit retail barcode used across North American point-of-sale systems. It encodes a GTIN-12: a number-system digit, a 5-digit company prefix, a 5-digit item reference and a check digit. Every US and Canadian supermarket and most retailers scan it at the till.",
      "The final digit is a GS1 check digit calculated from the first 11 digits with weights alternating 3 and 1. ScanForge validates it live as you type and tells you the correct value when the number does not add up, so you never print a barcode the scanner rejects.",
      "UPC-A is the North American sibling of EAN-13: a UPC-A code is exactly an EAN-13 with a leading zero. Numbers come from a GS1 company prefix you license; ScanForge generates and validates the image but does not register identifiers, so only encode GTINs you are authorised to use.",
    ],
    specs: [
      { label: "Digits", value: "12 (11 data + 1 check digit)" },
      { label: "GTIN name", value: "GTIN-12" },
      { label: "Type", value: "Linear (1D), GS1 standard" },
      { label: "Check digit", value: "GS1 algorithm, weights 3-1 alternating" },
      { label: "Nominal size", value: "≈ 31.35 × 25.93 mm at 100% magnification (80%–200% allowed)" },
      { label: "Quiet zones", value: "9 modules left, 9 modules right" },
      { label: "Used for", value: "Retail products at point-of-sale in North America" },
    ],
    useCases: [
      { title: "US & Canada retail", body: "Put a UPC-A on every sellable unit so North American retailers can scan and list it at checkout." },
      { title: "Marketplace listings", body: "Amazon, Walmart and eBay US ask for a GTIN — a UPC-A per SKU keeps product listings compliant." },
      { title: "Weighed & variable items", body: "Number system 2 marks random-weight items like meat and produce that stores price at the counter." },
      { title: "Warehouse receiving", body: "Scan UPC-A carton labels during receiving so purchase orders match what physically arrives." },
      { title: "Coupons & promos", body: "UPC-A coupon codes (number system 5) let POS systems apply the discount rules automatically." },
      { title: "Product proofs & mock-ups", body: "Generate a dimensionally correct UPC-A for packaging design reviews before ordering print runs." },
    ],
    howTo: [
      { step: "Open the UPC-A generator", text: "Go to the barcode generator and select UPC-A from the format list — this page pre-selects it for you." },
      { step: "Enter your 12-digit number", text: "Type the GTIN-12. ScanForge validates length and check digit live and shows the correct check digit if yours is off." },
      { step: "Adjust size & label", text: "Set bar width, height and the human-readable digits. Standard black-on-white gives the most reliable retail scans." },
      { step: "Download and print", text: "Export PNG, SVG or PDF. Keep the quiet zones clear on the label so retail scanners read the code on the first pass." },
    ],
    faqs: [
      { q: "How do I create a UPC-A barcode for free?", a: "Type your 12-digit GTIN-12 into the generator above and the barcode renders instantly with automatic check-digit validation. Download it as PNG, SVG or PDF — no account, no watermark, no daily limit. If the check digit is wrong, ScanForge shows the correct value so you can fix it before printing." },
      { q: "How is the UPC-A check digit calculated?", a: "Multiply the digits in positions 1, 3, 5, 7, 9, 11 by 3 and add the digits in the even positions, then subtract the total from the next multiple of 10. The result is the 12th digit. ScanForge runs this check automatically while you type and refuses to render an invalid GTIN-12." },
      { q: "Do I need a GS1 company prefix for a UPC-A barcode?", a: "Yes for retail products. The company prefix embedded in the UPC-A is licensed from GS1 US, and you assign item references under it. ScanForge generates the barcode image and validates its structure, but registration of the number itself happens with GS1 — only encode identifiers you are authorised to use." },
      { q: "What is the difference between UPC-A and UPC-E?", a: "UPC-A is the full 12-digit retail symbol; UPC-E is its compressed version for very small packages, encoding the same GTIN in 6 data digits plus check digit. Convenience items like lipstick or chewing gum typically use UPC-E because a full UPC-A would be too large for the package." },
      { q: "What size should a UPC-A barcode be printed?", a: "GS1 allows magnification from 80% to 200%. At 100% a UPC-A is about 31.35 mm wide and 25.93 mm tall including quiet zones. Keep it black on white, never scale it below 80%, and leave the quiet zones unprinted so scanners can find the symbol's edges on the first pass." },
      { q: "Is a UPC-A barcode valid outside North America?", a: "Yes. Modern retail scanners worldwide read UPC-A because it is simply an EAN-13 with a leading zero — the same GTIN-12 in a shorter jacket. If you sell into Europe or Asia, ask your GS1 member organisation whether to print the UPC-A or the 13-digit EAN-13 form of the same number." },
    ],
  },

  "code-128-barcode": {
    formatId: "code128",
    slug: "code-128-barcode",
    primaryKeyword: "code 128 barcode generator",
    h1: "Free Code 128 Barcode Generator",
    metaDescription:
      "Free Code 128 barcode generator. Encode any ASCII text in a high-density 1D barcode for logistics and inventory. Download PNG, SVG or PDF. No signup.",
    subtitle:
      "Encode any letters, numbers or symbols in a Code 128 barcode — the logistics and inventory standard. Download PNG, SVG or PDF. Free, no signup, no watermark.",
    whatIsTitle: "What is a Code 128 barcode?",
    whatIs: [
      "Code 128 is a linear (1D) barcode that can encode the full ASCII character set — letters, digits, symbols and control characters — in a variable-length, high-density symbol. It is the workhorse of logistics, shipping and inventory because it can carry serial numbers, dates and batch codes that retail formats cannot.",
      "The symbol switches between three code sets: A for uppercase and control characters, B for upper and lowercase, and C for digit pairs at double density. A mandatory Mod-103 check character is added automatically inside the symbol — it protects against misreads but never appears in the human-readable text. ScanForge renders all of this for you from plain input.",
      "GS1-128 is the GS1 dialect of Code 128: it prefixes the data with an FNC1 marker and structures it with Application Identifiers like (01) for GTIN or (10) for batch. If you need that variant, use the dedicated GS1-128 format in the barcode generator instead.",
    ],
    specs: [
      { label: "Character set", value: "Full ASCII (128 characters)" },
      { label: "Length", value: "Variable, data-driven" },
      { label: "Type", value: "Linear (1D), self-checking" },
      { label: "Check character", value: "Mandatory Mod-103, hidden from human-readable text" },
      { label: "Code sets", value: "A (uppercase + control), B (mixed case), C (digit pairs)" },
      { label: "Related format", value: "GS1-128 (Code 128 + FNC1 + Application Identifiers)" },
      { label: "Used for", value: "Logistics, shipping, inventory, asset tracking" },
    ],
    useCases: [
      { title: "Shipping labels", body: "Print tracking numbers as Code 128 on parcels and pallets — carriers and 3PL scanners read it natively." },
      { title: "Inventory & asset tags", body: "Tag equipment, shelves and tools with serial or asset IDs that mix letters and numbers." },
      { title: "Batch & lot tracking", body: "Encode batch codes, expiry dates and line IDs on manufacturing paperwork and product labels." },
      { title: "Library & membership cards", body: "Libraries, gyms and clinics issue Code 128 member numbers on cards and ID badges." },
      { title: "Ticketing & vouchers", body: "Put unique alphanumeric ticket codes on printed tickets so staff can scan them at the door." },
      { title: "Internal order documents", body: "Barcode the order or picking-list number so warehouse staff scan instead of typing references." },
    ],
    howTo: [
      { step: "Open the Code 128 generator", text: "Go to the barcode generator and select Code 128 — this page pre-selects the format for you." },
      { step: "Type your data", text: "Enter any letters, numbers or symbols. Code 128 accepts full ASCII, and ScanForge renders the preview instantly." },
      { step: "Adjust size & label", text: "Set bar width and height, toggle the human-readable text and pick colours. Wider bars scan better from distance." },
      { step: "Download and print", text: "Export PNG for screens, SVG for vector printing, or PDF for label sheets. Keep the quiet zones clear around the symbol." },
    ],
    faqs: [
      { q: "How do I generate a Code 128 barcode for free?", a: "Type any text into the generator above and the Code 128 symbol renders instantly. Download it as PNG, SVG or PDF without an account and without a watermark. Code 128 accepts the full ASCII character set, so mixed alphanumeric data like tracking numbers or batch codes works out of the box." },
      { q: "What characters can a Code 128 barcode encode?", a: "All 128 ASCII characters — uppercase and lowercase letters, digits, punctuation and control characters — plus special shift codes that switch between the three code sets. This is why logistics systems prefer Code 128: a serial number like SN-2026-AB/07 encodes in one symbol without any workarounds." },
      { q: "Does Code 128 have a checksum?", a: "Yes. Every Code 128 symbol carries a mandatory Mod-103 check character that scanners use to detect misreads. It is computed from the encoded data and sits inside the symbol — it is not visible in the human-readable text and you never enter it manually. ScanForge adds it automatically." },
      { q: "What is the difference between Code 128 and GS1-128?", a: "Code 128 is the general-purpose symbology; GS1-128 is Code 128 with an FNC1 marker and GS1 Application Identifiers such as (01) for GTIN and (10) for batch, which tells supply-chain scanners what each data segment means. Use plain Code 128 for internal codes and GS1-128 for regulated supply-chain labels." },
      { q: "Is Code 128 better than Code 39?", a: "For most uses, yes. Code 128 encodes the full ASCII set at higher density, so the same data prints narrower and scans from smaller symbols. Code 39 only covers uppercase letters, digits and a few symbols, but some legacy industrial systems still require it. Choose Code 128 unless a partner explicitly specifies Code 39." },
      { q: "Why does my Code 128 barcode not scan?", a: "Check four things: print size (bars too thin for the scanner), contrast (always black on a light background), quiet zones (leave blank space on both sides) and print quality (low DPI blurs bar edges). ScanForge exports print-ready SVG and PDF so you can print at full resolution instead of stretching a small PNG." },
    ],
  },
};
