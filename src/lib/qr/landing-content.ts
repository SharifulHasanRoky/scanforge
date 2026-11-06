// Per-QR-type SEO landing content. Config-driven so adding a new dedicated
// landing page is a single object edit + a view entry — no new component.
// Each entry powers: H1, meta, "what is", use cases, FAQ (visible + JSON-LD),
// how-to steps, and the QR workspace pre-seed.

export type QrLandingContent = {
  typeId: import("./types").QrTypeId;
  slug: string; // hash view id, e.g. "wifi-qr"
  /** Primary keyword, used as H1 and title core. */
  primaryKeyword: string;
  h1: string;
  /** ≤155 chars, primary + secondary keywords. */
  metaDescription: string;
  /** Short hero subtitle. */
  subtitle: string;
  /** "What is X" definition block (2-3 paragraphs, answer-first for AEO). */
  whatIs: string[];
  /** Use cases by audience. */
  useCases: { title: string; body: string }[];
  /** How-to steps (also rendered as HowTo schema). */
  howTo: { step: string; text: string }[];
  /** FAQ pairs (visible + FAQPage JSON-LD). */
  faqs: { q: string; a: string }[];
};

export const QR_LANDING_CONTENT: Record<string, QrLandingContent> = {
  "wifi-qr": {
    typeId: "wifi",
    slug: "wifi-qr",
    primaryKeyword: "wifi qr code generator",
    h1: "Free Wi-Fi QR Code Generator",
    metaDescription:
      "Free Wi-Fi QR code generator. Create a QR code for your WiFi network so guests can connect instantly — enter SSID and password, download PNG/SVG/PDF. No signup, no watermark.",
    subtitle:
      "Create a QR code for your Wi-Fi network so guests connect instantly — no password typing, no mistakes. Free, no signup, no watermark.",
    whatIs: [
      "A Wi-Fi QR code is a QR code that encodes your wireless network credentials (SSID, password and encryption type) in a standardised format. When a phone camera scans it, the operating system offers to join the network automatically — the user never has to type the password.",
      "The format is defined by the WIFI: URI scheme (e.g. WIFI:T:WPA;S:MyNetwork;P:secret;;). ScanForge builds this string for you from a simple form, so the resulting QR code works with both Android and iOS cameras out of the box.",
      "Wi-Fi QR codes are static — the credentials are encoded directly in the image, so the code never expires and needs no server. If you change your Wi-Fi password, generate a new QR code.",
    ],
    useCases: [
      { title: "Cafés & restaurants", body: "Print a Wi-Fi QR on each table or menu so customers connect without asking staff for the password." },
      { title: "Hotels & Airbnbs", body: "Place a Wi-Fi QR in each room so guests connect the moment they arrive — no front-desk calls." },
      { title: "Offices & co-working", body: "Display a Wi-Fi QR at reception or in meeting rooms for visitors and contractors." },
      { title: "Home & events", body: "Share your home Wi-Fi with friends and family at parties without spelling out a long password." },
      { title: "Schools & campuses", body: "Distribute a guest Wi-Fi QR across campus so students and visitors connect without IT tickets." },
      { title: "Retail & salons", body: "Offer free Wi-Fi via a QR code at the counter — a small courtesy that increases dwell time." },
    ],
    howTo: [
      { step: "Open the Wi-Fi QR generator", text: "Go to the QR generator and select the Wi-Fi content type from the type selector." },
      { step: "Enter your network details", text: "Type your network name (SSID), password and choose WPA/WPA2/WPA3, WEP or no password. Mark the network as hidden if applicable." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, add a logo — for example your café logo. Raise error correction to Q or H if you add a logo." },
      { step: "Download and print", text: "Export as PNG for screens, SVG for vector, or PDF for print. Place the printed QR where guests can scan it." },
    ],
    faqs: [
      { q: "How do I create a QR code for my Wi-Fi?", a: "Open the Wi-Fi QR generator, enter your network name (SSID) and password, choose the encryption type (WPA/WPA2/WPA3 for most modern networks), then download the QR code as PNG, SVG or PDF. When someone scans it with their phone camera, they will be offered to join your network automatically — no password typing." },
      { q: "Do Wi-Fi QR codes work on both iPhone and Android?", a: "Yes. The WIFI: URI format used by ScanForge is supported by iOS 11+ and most modern Android camera apps. When scanned, both platforms prompt the user to join the network with the pre-filled credentials." },
      { q: "Is a Wi-Fi QR code secure?", a: "A Wi-Fi QR code encodes your password directly in the image, so anyone who scans it can join your network. Only share it with people you trust, and avoid posting it publicly online. For guest networks, consider using a separate SSID isolated from your main devices." },
      { q: "Can I create a Wi-Fi QR code without a password?", a: "Yes. Select 'No password' as the encryption type and the QR code will only encode the SSID, suitable for open networks. The phone will connect without prompting for credentials." },
      { q: "Does the Wi-Fi QR code expire?", a: "No. ScanForge generates static Wi-Fi QR codes — the credentials are encoded directly in the image and never expire on our side. If you change your Wi-Fi password, simply generate a new QR code. The old one will no longer work because it encodes the old password." },
      { q: "Can I add my logo to a Wi-Fi QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "vcard-qr": {
    typeId: "vcard",
    slug: "vcard-qr",
    primaryKeyword: "vcard qr code generator",
    h1: "Free vCard QR Code Generator",
    metaDescription:
      "Free vCard QR code generator. Create a contact-sharing QR code with name, phone, email, company and address. Add to business cards. Download PNG/SVG/PDF. No signup, no watermark.",
    subtitle:
      "Share your contact details with one scan. Generate a vCard QR code for business cards, email signatures and networking — free, no signup, no watermark.",
    whatIs: [
      "A vCard QR code is a QR code that encodes a vCard (VCF) — the industry-standard electronic business card format. When scanned, the phone opens the contact as a ready-to-save entry with name, phone, email, organisation, title, URL and address pre-filled, eliminating manual typing.",
      "vCard 3.0 is the most widely supported version and is what ScanForge generates. The QR encodes the full BEGIN:VCARD … END:VCARD block, so scanners on both iOS and Android add it directly to the address book.",
      "vCard QR codes are static — the contact data is encoded directly in the image. They are ideal for business cards, conference badges, real-estate signage, email signatures and reception desks.",
    ],
    useCases: [
      { title: "Business cards", body: "Print a vCard QR on your business card so recipients save your full contact with one scan — no manual entry." },
      { title: "Conferences & events", body: "Put a vCard QR on your badge or lanyard so new contacts scan and save instantly during networking." },
      { title: "Real estate", body: "Add a vCard QR to property signage so prospective buyers save the agent's contact on the spot." },
      { title: "Email signatures", body: "Embed a vCard QR in your email signature so recipients scan to add you to their address book." },
      { title: "Reception & front desk", body: "Display a vCard QR at reception so visitors save the right contact person on their phones." },
      { title: "Consultants & freelancers", body: "Share your vCard QR on proposals and invoices so clients always have your latest details." },
    ],
    howTo: [
      { step: "Open the vCard QR generator", text: "Go to the QR generator and select the Contact (vCard) content type." },
      { step: "Fill in your contact details", text: "Enter your first and last name, organisation, title, phone, email, website and address. Only filled fields are encoded." },
      { step: "Customise the design (optional)", text: "Add your company logo, change colours and dot pattern. Raise error correction to Q or H if you add a logo." },
      { step: "Download and share", text: "Export as PNG for digital use, SVG for vector, or PDF for print on business cards and signage." },
    ],
    faqs: [
      { q: "How do I create a vCard QR code for free?", a: "Open the vCard QR generator, fill in your name, phone, email, organisation, title, website and address, then download the QR code as PNG, SVG or PDF. When someone scans it, your full contact opens as a ready-to-save entry on their phone — completely free, no signup, no watermark." },
      { q: "What is a vCard?", a: "A vCard (VCF, Virtual Contact File) is the industry-standard electronic business card format. Version 3.0 is the most widely supported. A vCard QR code encodes the full BEGIN:VCARD block, so scanners on iOS and Android add the contact directly to the address book with all fields pre-filled." },
      { q: "Does a vCard QR code work on iPhone and Android?", a: "Yes. Both iOS and Android camera apps recognise the vCard format encoded in the QR and open the contact as a ready-to-save entry. The user reviews the fields and taps Save to add it to their address book." },
      { q: "Can I add a photo to a vCard QR code?", a: "ScanForge encodes text vCard fields (name, phone, email, org, title, URL, address). Embedded photos inflate the payload and reduce scannability, so we recommend keeping the vCard text-only. To brand your QR visually, add a logo via the Design tab instead." },
      { q: "How much information fits in a vCard QR code?", a: "A QR code holds up to ~4,000 alphanumeric characters, which is plenty for a full vCard. However, the more data you encode, the denser the QR and the harder it is to scan from a distance. Keep fields concise and use error correction level M or Q for the best balance." },
      { q: "Can I update my vCard QR code later?", a: "A vCard QR is static — the contact data is encoded directly in the image and cannot be edited after generation. If your details change, generate a new QR code. Business cards already printed with the old QR will keep sharing the old contact." },
    ],
  },

  "whatsapp-qr": {
    typeId: "whatsapp",
    slug: "whatsapp-qr",
    primaryKeyword: "whatsapp qr code generator",
    h1: "Free WhatsApp QR Code Generator",
    metaDescription:
      "Free WhatsApp QR code generator. Create a QR code that opens a WhatsApp chat with your number and a pre-filled message. Download PNG/SVG/PDF. No signup, no watermark, no daily limit.",
    subtitle:
      "Let customers start a WhatsApp chat with one scan. Generate a WhatsApp QR code with a pre-filled message for support, sales and contact — free, no signup, no watermark.",
    whatIs: [
      "A WhatsApp QR code is a QR code that encodes a wa.me link (e.g. https://wa.me/14155550100?text=Hello) — when scanned, it opens a WhatsApp chat with your number and an optional pre-filled message ready to send.",
      "The format works on both iPhone and Android: scanning the QR opens WhatsApp directly (or the WhatsApp Web page on desktop), pre-fills the recipient and message, and the user just taps send. This makes it ideal for customer support, sales enquiries, restaurant ordering and event contact.",
      "WhatsApp QR codes are static — the wa.me link is encoded directly in the image, so it never expires and needs no server. The phone number must include the country code without any + or leading zeros.",
    ],
    useCases: [
      { title: "Customer support", body: "Print a WhatsApp QR on packaging or receipts so customers start a support chat with one scan — no phone number to type." },
      { title: "Restaurants & cafés", body: "Let customers place orders or ask questions via WhatsApp by scanning a QR on the table or menu." },
      { title: "Sales & enquiries", body: "Add a WhatsApp QR to ads, flyers and product pages so prospects message you instantly — high conversion." },
      { title: "Real estate", body: "Put a WhatsApp QR on property signage so buyers message the agent directly with questions about a listing." },
      { title: "Events & conferences", body: "Display a WhatsApp QR so attendees message organisers for help, schedules or networking." },
      { title: "Freelancers & consultants", body: "Share your WhatsApp QR on proposals and social profiles so clients reach you on their preferred channel." },
    ],
    howTo: [
      { step: "Open the WhatsApp QR generator", text: "Go to the QR generator and select the WhatsApp content type from the type selector." },
      { step: "Enter your phone number", text: "Type your WhatsApp number with the country code but no + or leading zeros (e.g. 14155550100 for US +1)." },
      { step: "Add a pre-filled message (optional)", text: "Write a default message like 'Hi, I have a question about your product' so the chat opens ready to send." },
      { step: "Download and share", text: "Export as PNG for screens, SVG for vector, or PDF for print. Place the QR where customers can scan it." },
    ],
    faqs: [
      { q: "How do I create a WhatsApp QR code for free?", a: "Open the WhatsApp QR generator, enter your phone number with country code (no + or leading zeros, e.g. 14155550100), optionally add a pre-filled message, then download the QR as PNG, SVG or PDF. When scanned, it opens a WhatsApp chat with your number and the message ready to send — completely free, no signup, no watermark." },
      { q: "What number format does a WhatsApp QR code need?", a: "Use the full international number with country code, but without the + symbol, spaces or leading zeros. For example, a US number +1 (415) 555-0100 becomes 14155550100. A UK number +44 7700 900123 becomes 447700900123. ScanForge cleans common formatting automatically." },
      { q: "Does a WhatsApp QR code work on iPhone and Android?", a: "Yes. The wa.me link encoded in the QR is recognised by both iOS and Android. Scanning opens WhatsApp directly to a chat with your number and the pre-filled message; the user just reviews and taps send." },
      { q: "Can I pre-fill a message in the WhatsApp chat?", a: "Yes. Type your default message in the 'Pre-filled message' field and the QR encodes it as the text parameter. When scanned, WhatsApp opens with the message in the input box — the user can edit it before sending or send it as-is." },
      { q: "Does the WhatsApp QR code expire?", a: "No. ScanForge generates static WhatsApp QR codes — the wa.me link is encoded directly in the image and never expires on our side. As long as your WhatsApp number stays active, the QR keeps working." },
      { q: "Can I add my logo to a WhatsApp QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },
};

export const QR_LANDING_VIEWS = Object.keys(QR_LANDING_CONTENT) as string[];
