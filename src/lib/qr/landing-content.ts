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
  "email-qr": {
    typeId: "email",
    slug: "email-qr",
    primaryKeyword: "email qr code generator",
    h1: "Free Email QR Code Generator",
    metaDescription:
      "Free email QR code generator. Create a QR code that opens an email to your address with subject and body pre-filled. Download PNG/SVG/PDF. No signup, no watermark, no daily limit.",
    subtitle:
      "Let people email you with one scan. Generate an email QR code with recipient, subject and body pre-filled — perfect for flyers, packaging and support materials.",
    whatIs: [
      "An email QR code is a QR code that encodes a mailto: URI — when scanned, it opens the user's default email app with the recipient address, subject line and message body pre-filled. The user just reviews and taps send, eliminating the need to type an email address or remember it later.",
      "The mailto: format supports three fields: the recipient address, an optional subject parameter and an optional body parameter. ScanForge builds the URI for you from a simple form, so the resulting QR code works with iOS Mail, Gmail, Outlook and every major email client.",
      "Email QR codes are static — the mailto link is encoded directly in the image, so the code never expires and needs no server. They are ideal for printed materials where a clickable email link is impossible: flyers, business cards, product packaging, posters and manuals.",
    ],
    useCases: [
      { title: "Printed flyers & posters", body: "Add an email QR to print materials so prospects contact you without typing your address — high-intent leads with zero friction." },
      { title: "Product packaging", body: "Put an email QR on packaging with a pre-filled subject like 'Feedback about [product]' so customers reach the right inbox." },
      { title: "Business cards", body: "Combine a vCard QR with an email QR so contacts can both save your details and email you instantly." },
      { title: "Support & manuals", body: "Print an email QR in user manuals and support docs with a pre-filled subject so tickets arrive categorised." },
      { title: "Real estate signage", body: "Add an email QR to property boards with a subject referencing the listing so enquiries are easy to track." },
      { title: "Events & conferences", body: "Display an email QR on slides and handouts so attendees contact organisers with a pre-filled subject line." },
    ],
    howTo: [
      { step: "Open the email QR generator", text: "Go to the QR generator and select the Email content type from the type selector." },
      { step: "Enter recipient and subject", text: "Type the email address that should receive messages, plus an optional subject line — e.g. 'Support request' so replies arrive categorised." },
      { step: "Add a pre-filled body (optional)", text: "Write a default message body so the user only edits it before sending. Leave empty for a blank email." },
      { step: "Download and place", text: "Export as PNG for screens, SVG for vector, or PDF for print. Add the QR to flyers, packaging or business cards." },
    ],
    faqs: [
      { q: "How do I create an email QR code for free?", a: "Open the email QR generator, enter the recipient address, add an optional subject and body, then download the QR as PNG, SVG or PDF. When scanned, it opens the user's email app with everything pre-filled — completely free, no signup, no watermark." },
      { q: "Does an email QR code open Gmail, Outlook or Apple Mail?", a: "It opens whichever email app the user has set as default on their phone — Gmail, Outlook, Apple Mail, Spark and others all handle the mailto: format. On desktop it opens the default mail client or prompts to choose one." },
      { q: "Can I pre-fill the subject and message body?", a: "Yes. Add a subject line and body text in the generator, and the QR encodes them as parameters of the mailto: link. When scanned, the email opens with the recipient, subject and body already filled — the user just reviews and sends." },
      { q: "Is an email QR code safe to print publicly?", a: "Generally yes — the QR encodes your email address, which is already public on your website. Be aware that a publicly visible address can attract spam over time; many businesses use a dedicated contact address (e.g. info@yourdomain) rather than a personal inbox." },
      { q: "Does the email QR code expire?", a: "No. ScanForge generates static email QR codes — the mailto link is encoded directly in the image and never expires on our side. The QR keeps working as long as the recipient email address stays active." },
      { q: "Can I add my logo to an email QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "phone-qr": {
    typeId: "phone",
    slug: "phone-qr",
    primaryKeyword: "phone qr code generator",
    h1: "Free Phone Number QR Code Generator",
    metaDescription:
      "Free phone QR code generator. Create a QR code that starts a phone call to your number with one scan. Download PNG/SVG/PDF. No signup, no watermark, no daily limit.",
    subtitle:
      "Make calling you effortless. Generate a phone QR code that starts a call with one scan — ideal for storefronts, vehicles, packaging and support materials.",
    whatIs: [
      "A phone QR code is a QR code that encodes a tel: URI — when scanned, the phone immediately offers to start a call to the encoded number. The user confirms and the dialer opens with the number pre-filled, removing the need to read, remember or type a phone number.",
      "The tel: format is supported universally by iOS and Android. ScanForge encodes the number in international format (with country code), which is the recommended approach for printed materials that may be scanned by international visitors.",
      "Phone QR codes are static — the tel link is encoded directly in the image, so the code never expires and needs no server. They work best in physical locations where a customer is likely to want to call: shop windows, vehicle wraps, product packaging and support documents.",
    ],
    useCases: [
      { title: "Shop windows & storefronts", body: "Display a phone QR on your window so passers-by call you instantly during or after opening hours." },
      { title: "Vehicle & fleet branding", body: "Print a phone QR on vans and delivery vehicles so prospects call while your brand is on the move." },
      { title: "Product packaging", body: "Add a phone QR for support hotlines so customers call the right department with one scan." },
      { title: "Business cards", body: "Pair a vCard QR with a phone QR so contacts can save your number or call you immediately." },
      { title: "Property & real estate", body: "Put a phone QR on yard signs so interested buyers call the agent about the specific listing." },
      { title: "Emergency & service info", body: "Add a phone QR to equipment, machinery and facilities so users reach service or emergency contacts instantly." },
    ],
    howTo: [
      { step: "Open the phone QR generator", text: "Go to the QR generator and select the Phone Call content type from the type selector." },
      { step: "Enter the phone number", text: "Type the number including the country code (e.g. +1 555 0100) so international visitors can call too." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, or add a logo — e.g. your brand mark. Raise error correction to Q or H if you add a logo." },
      { step: "Download and print", text: "Export as PNG for screens, SVG for vector, or PDF for print. Place the QR where callers can scan it easily." },
    ],
    faqs: [
      { q: "How do I create a QR code for a phone number?", a: "Open the phone QR generator, enter the number including the country code (e.g. +1 555 0100), then download the QR as PNG, SVG or PDF. When scanned, the phone offers to start a call to that number with one tap — completely free, no signup, no watermark." },
      { q: "Should I include the country code in a phone QR code?", a: "Yes, always include the country code. The tel: format works best with the full international number, and printed QR codes are often scanned by international visitors who cannot dial local short numbers." },
      { q: "Does a phone QR code start the call automatically?", a: "No — and this is a safety feature. Scanning opens the dialer with the number pre-filled and the user confirms the call with a tap. The phone never dials without explicit user action." },
      { q: "Does the phone QR code work on iPhone and Android?", a: "Yes. The tel: URI format is supported by all modern iOS and Android devices. Scanning opens the native dialer with the number pre-filled, ready to call." },
      { q: "Does the phone QR code expire?", a: "No. ScanForge generates static phone QR codes — the tel link is encoded directly in the image and never expires on our side. The QR keeps working as long as the phone number stays active." },
      { q: "Can I add my logo to a phone QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "location-qr": {
    typeId: "location",
    slug: "location-qr",
    primaryKeyword: "location qr code generator",
    h1: "Free Location QR Code Generator",
    metaDescription:
      "Free location QR code generator. Create a QR code that opens Google Maps at your address or coordinates. Download PNG/SVG/PDF. No signup, no watermark, no daily limit.",
    subtitle:
      "Guide people straight to your door. Generate a location QR code that opens Google Maps at your address or coordinates — free, no signup, no watermark.",
    whatIs: [
      "A location QR code is a QR code that encodes a Google Maps link — when scanned, it opens Maps centred on your address or coordinates with directions one tap away. It removes the most common navigation friction: typing an address into a maps app.",
      "ScanForge supports two input modes: a plain search query (e.g. an address or place name) or exact latitude and longitude coordinates. Coordinates are the most precise option and are recommended for venues that are hard to find by name, such as new buildings or rural locations.",
      "Location QR codes are static — the Maps link is encoded directly in the image, so the code never expires and needs no server. They are ideal for storefronts, event venues, hotel rooms, delivery notes and tourist information.",
    ],
    useCases: [
      { title: "Storefronts & offices", body: "Display a location QR at your entrance so visitors open directions to your exact door with one scan." },
      { title: "Events & weddings", body: "Add a location QR on invitations so guests navigate straight to the venue without typing the address." },
      { title: "Hotels & hospitality", body: "Place a location QR in confirmation emails and room cards so guests find annexes, pools and parking." },
      { title: "Delivery & logistics", body: "Print a location QR on delivery notes so drivers and customers locate drop-off points precisely." },
      { title: "Tourism & attractions", body: "Add location QRs to maps and brochures so tourists navigate between attractions effortlessly." },
      { title: "Real estate & listings", body: "Put a location QR on property signs so buyers navigate to the exact plot or building." },
    ],
    howTo: [
      { step: "Open the location QR generator", text: "Go to the QR generator and select the Location content type from the type selector." },
      { step: "Enter your address or coordinates", text: "Type a search query (address or place name), or enter exact latitude and longitude for maximum precision." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, or add a logo — e.g. your brand mark or a pin icon. Raise error correction to Q or H if you add a logo." },
      { step: "Download and place", text: "Export as PNG for screens, SVG for vector, or PDF for print. Add the QR to signage, invitations and packaging." },
    ],
    faqs: [
      { q: "How do I create a QR code for my location?", a: "Open the location QR generator, type your address or place name (or enter exact latitude and longitude), then download the QR as PNG, SVG or PDF. When scanned, it opens Google Maps centred on your location with directions one tap away — completely free, no signup, no watermark." },
      { q: "Should I use an address or GPS coordinates?", a: "Coordinates are the most precise option — recommended for new buildings, rural venues and places Google may not index yet. An address search query is easier to maintain and works well for well-known places. For maximum reliability, use coordinates." },
      { q: "Does the location QR code work with Apple Maps?", a: "The QR encodes a Google Maps link, which opens in Google Maps if installed. On iPhones without Google Maps, the link opens in the browser and offers to open Apple Maps. Both paths lead the user to the same destination." },
      { q: "Does the location QR code expire?", a: "No. ScanForge generates static location QR codes — the Maps link is encoded directly in the image and never expires on our side. The QR keeps working as long as the destination exists on Google Maps." },
      { q: "Can I track how many people scanned my location QR?", a: "A static location QR cannot track scans — the link is encoded directly in the image with no redirect server. For scan analytics you would need a dynamic QR service, which requires backend infrastructure to maintain the redirect URLs." },
      { q: "Can I add my logo to a location QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },
};

export const QR_LANDING_VIEWS = Object.keys(QR_LANDING_CONTENT) as string[];
