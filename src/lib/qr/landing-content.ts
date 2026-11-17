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

  "text-qr": {
    typeId: "text",
    slug: "text-qr",
    primaryKeyword: "text qr code generator",
    h1: "Free Text QR Code Generator",
    metaDescription:
      "Free text QR code generator. Encode any plain text — notes, instructions, serial numbers, captions — into a scannable QR code. Download PNG/SVG/PDF. No signup, no watermark.",
    subtitle:
      "Encode any plain text — notes, instructions, serial numbers, captions — into a static QR code that scans on every phone. Free, no signup, no watermark.",
    whatIs: [
      "A text QR code is a QR code whose payload is plain text rather than a URL, vCard or Wi-Fi string. When scanned, the phone's native camera app shows the text in a preview bubble — the user reads it, copies it, or dismisses it. No internet connection is required and no app needs to be opened.",
      "ScanForge encodes the exact UTF-8 text you type, up to the QR code's maximum capacity (around 2,953 bytes of plain text at the lowest error-correction level). It is ideal for short notes, instructions, Wi-Fi fallback hints, serial numbers, captions and hidden surprises that should not require a hosting URL.",
      "Text QR codes are static — the text lives directly in the image and never expires on our side. They are best used for short, self-contained messages because very long text produces a denser QR that needs a higher error-correction level and a larger physical size to scan reliably.",
    ],
    useCases: [
      { title: "Museum & exhibit labels", body: "Print a text QR beside an exhibit so visitors scan and read a longer description without a web page." },
      { title: "Escape rooms & scavenger hunts", body: "Hide text QR codes as clues — players scan to read the next riddle or instruction." },
      { title: "Manufacturing & inventory", body: "Encode serial numbers, batch IDs or maintenance notes on equipment that scans even when offline." },
      { title: "Education & classrooms", body: "Print text QR codes on worksheets so students scan to reveal answers, hints or extra reading." },
      { title: "Packaging & product inserts", body: "Encode care instructions, allergen notes or a thank-you message directly on the box — no URL needed." },
      { title: "Personal & gifts", body: "Add a hidden text QR to a gift card with a personal message the recipient scans to read." },
    ],
    howTo: [
      { step: "Open the text QR generator", text: "Go to the QR generator and select the Plain Text content type from the type selector." },
      { step: "Type or paste your text", text: "Enter the message, note or serial. The live preview updates instantly and shows the QR density." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, or add a logo. For longer text, raise error correction to Q or H so the code stays scannable." },
      { step: "Download and print", text: "Export as PNG for screens, SVG for vector, or PDF for print. Larger QR codes scan more reliably from far away." },
    ],
    faqs: [
      { q: "How do I create a QR code for plain text?", a: "Open the text QR generator, type or paste your text, then download the QR as PNG, SVG or PDF. When scanned, the phone displays the text directly in the camera preview — completely free, no signup, no watermark, no internet required." },
      { q: "How much text can a QR code hold?", a: "Up to around 2,953 bytes of UTF-8 text at the lowest error-correction level (L). For readability we recommend keeping text under 300 characters; longer text produces a denser QR that needs a larger print size and a higher error-correction level to scan reliably." },
      { q: "Does a text QR code need internet to scan?", a: "No. The text is encoded directly in the QR image, so it scans and displays even when the phone is offline. The camera app reads the payload without making any network request." },
      { q: "Does a text QR code expire?", a: "No. ScanForge generates static text QR codes — the text is encoded directly in the image and never expires on our side. The QR keeps working forever as long as the image is intact." },
      { q: "Can I include line breaks and emojis in a text QR code?", a: "Yes. ScanForge encodes UTF-8 text, so line breaks, emojis and most Unicode characters are preserved. Modern phone cameras render the preview with the original formatting." },
      { q: "Can I add my logo to a text QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "sms-qr": {
    typeId: "sms",
    slug: "sms-qr",
    primaryKeyword: "sms qr code generator",
    h1: "Free SMS QR Code Generator",
    metaDescription:
      "Free SMS QR code generator. Create a QR code that opens a pre-filled SMS to your number with a ready-to-send message. Download PNG/SVG/PDF. No signup, no watermark.",
    subtitle:
      "Let people text you with one scan. Generate an SMS QR code that opens a pre-filled message to your number — free, no signup, no watermark.",
    whatIs: [
      "An SMS QR code is a QR code that encodes an smsto: URI (e.g. smsto:+15550100:Hello) — when scanned, the phone opens the native messaging app with both the recipient number and a pre-filled body. The user reviews the message and taps send, which makes SMS QR codes ideal for fast opt-in flows like keyword subscriptions.",
      "ScanForge builds the smsto: string for you from a simple number-and-message form. Both iOS and Android support the format natively, so the same QR works on either platform without a separate app.",
      "SMS QR codes are static — the destination number and body are encoded directly in the image, so they never expire on our side. They are commonly used for keyword-based opt-ins (e.g. scan to text JOIN to 5550100), customer feedback, donation drives and event check-ins.",
    ],
    useCases: [
      { title: "Marketing opt-ins", body: "Print an SMS QR with a keyword body (e.g. JOIN) so leads opt into your SMS list by tapping send." },
      { title: "Customer feedback", body: "Add an SMS QR on receipts or signage so customers text feedback to a known number with one tap." },
      { title: "Donations & fundraising", body: "Let supporters scan to open a pre-filled donation keyword like GIVE10 to your short code." },
      { title: "Events & RSVPs", body: "Print SMS QR codes on invitations so guests text YES or NO to confirm attendance." },
      { title: "Service requests", body: "Allow visitors to scan and text a service request (e.g. MAINTENANCE) to a facilities number." },
      { title: "Schools & parents", body: "Send SMS QR codes home so parents text ABSENT or LATE to the attendance line." },
    ],
    howTo: [
      { step: "Open the SMS QR generator", text: "Go to the QR generator and select the SMS content type from the type selector." },
      { step: "Enter the recipient number", text: "Type the phone number including the country code (e.g. +1 555 0100) so international scanners can also send." },
      { step: "Write the pre-filled message", text: "Compose the body — usually a short keyword like JOIN or a default feedback line. Keep it concise." },
      { step: "Download and place", text: "Export as PNG, SVG or PDF. Place the QR where scanners can comfortably tap send." },
    ],
    faqs: [
      { q: "How do I create a QR code for SMS?", a: "Open the SMS QR generator, enter the recipient phone number (with country code), type the pre-filled message body, then download the QR as PNG, SVG or PDF. When scanned, the phone opens the messaging app with the number and message ready to send — completely free, no signup, no watermark." },
      { q: "Does the SMS send automatically when scanned?", a: "No — and this is a safety feature. Scanning opens the messaging app with the number and body pre-filled; the user reviews the message and taps send. The QR never sends an SMS without explicit user action." },
      { q: "Should I include the country code in an SMS QR code?", a: "Yes. The smsto: format works best with the full international number. A printed QR is often scanned by visitors whose SIM would not recognise a local short code, so always include the country code (e.g. +1 for the US, +44 for the UK)." },
      { q: "Does the SMS QR code work on iPhone and Android?", a: "Yes. The smsto: URI format is supported by both iOS and Android. Scanning opens the native messaging app with the recipient and body pre-filled, ready to send." },
      { q: "Does the SMS QR code expire?", a: "No. ScanForge generates static SMS QR codes — the number and body are encoded directly in the image and never expire on our side. The QR keeps working as long as the phone number stays active." },
      { q: "Can I add my logo to an SMS QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "social-qr": {
    typeId: "social",
    slug: "social-qr",
    primaryKeyword: "social media qr code generator",
    h1: "Free Social Media QR Code Generator",
    metaDescription:
      "Free social media QR code generator. Create one QR code that links to your Instagram, Facebook, TikTok, X, LinkedIn or YouTube profile. Download PNG/SVG/PDF. No signup, no watermark.",
    subtitle:
      "One QR code, every profile. Link to your Instagram, TikTok, YouTube or X handle so followers scan once and connect — free, no signup, no watermark.",
    whatIs: [
      "A social media QR code is a QR code that links to a social profile URL — Instagram, Facebook, TikTok, X (Twitter), LinkedIn, YouTube or a custom handle. When scanned, it opens the platform's app (if installed) or the profile page in the browser, so a single QR replaces a pile of platform-specific codes.",
      "ScanForge builds the correct profile URL for each platform from your handle alone, so you do not need to construct it yourself. For platforms without a fixed URL pattern (or for a link-tree), use the Other option and paste any URL you want.",
      "Social QR codes are static — the profile link is encoded directly in the image and never expires on our side. They are ideal for printed business cards, storefront windows, event signage, packaging and posters where followers should connect after a single scan.",
    ],
    useCases: [
      { title: "Business cards", body: "Add a social QR so contacts scan once and follow you on Instagram, LinkedIn or TikTok without typing." },
      { title: "Retail & storefronts", body: "Place a social QR at the counter so customers follow your brand while waiting in line." },
      { title: "Events & conferences", body: "Print a social QR on badges, banners and lanyards so attendees connect during and after the event." },
      { title: "Packaging & inserts", body: "Add a social QR to product packaging so buyers follow your brand for tutorials, drops and support." },
      { title: "Restaurants & cafés", body: "Encourage guests to follow your Instagram or TikTok for menu updates and behind-the-scenes content." },
      { title: "Creators & artists", body: "Use one social QR on posters, stickers and merch so fans land on your main profile in one scan." },
    ],
    howTo: [
      { step: "Open the social QR generator", text: "Go to the QR generator and select the Social Media content type from the type selector." },
      { step: "Pick the platform", text: "Choose Instagram, Facebook, TikTok, X, LinkedIn, YouTube or Other. Enter your handle (without the @)." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, or add your brand logo. Raise error correction to Q or H if you add a logo." },
      { step: "Download and place", text: "Export as PNG, SVG or PDF. Place the QR where your audience can comfortably scan and follow." },
    ],
    faqs: [
      { q: "How do I create a QR code for social media?", a: "Open the social QR generator, pick the platform (Instagram, TikTok, YouTube, X, LinkedIn, Facebook), type your handle without the @, then download the QR as PNG, SVG or PDF. When scanned, it opens the profile in the platform's app or browser — completely free, no signup, no watermark." },
      { q: "Can one QR code link to all my social profiles?", a: "ScanForge generates a QR for one platform per code. To point to a hub that lists all your profiles, use the Other option and paste the URL of your link-tree (e.g. a Linktree or your own landing page). The QR then opens that hub on every scan." },
      { q: "Should I type the @ in my handle?", a: "No. Enter the handle without the @ — ScanForge builds the full profile URL for you. Including the @ usually produces a broken URL on most platforms." },
      { q: "Does a social QR code open the app or the browser?", a: "Both work. On phones with the platform's app installed, scanning opens the app and lands on your profile. Without the app, it opens the platform's mobile web profile. Both paths lead the user to your account." },
      { q: "Does the social QR code expire?", a: "No. ScanForge generates static social QR codes — the profile link is encoded directly in the image and never expires on our side. The QR keeps working as long as the profile URL stays valid." },
      { q: "Can I add my logo to a social QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "event-qr": {
    typeId: "event",
    slug: "event-qr",
    primaryKeyword: "event qr code generator",
    h1: "Free Event QR Code Generator",
    metaDescription:
      "Free event QR code generator. Create a calendar event QR code so guests scan and add your event to their calendar with title, date, location and notes. Download PNG/SVG/PDF. No signup.",
    subtitle:
      "Let guests add your event to their calendar with one scan. Generate a vEvent QR code with title, date, location and notes — free, no signup, no watermark.",
    whatIs: [
      "An event QR code is a QR code that encodes a vEvent (VCS / ICS-lite) payload — when scanned, the phone opens a calendar preview pre-filled with the event title, start and end times, location and notes. The user confirms with one tap to add it to their own calendar.",
      "ScanForge builds the BEGIN:VEVENT … END:VEVENT block for you from a simple form. The format works on both iOS and Android calendars, so a single QR adds the event on either platform without a separate file download.",
      "Event QR codes are static — the event details are encoded directly in the image, so they never expire on our side. They are ideal for printed invitations, posters, conference badges and event signage where guests should add the event to their calendar in one tap.",
    ],
    useCases: [
      { title: "Weddings & parties", body: "Print an event QR on invitations so guests add the date, time and venue to their calendar in one tap." },
      { title: "Conferences & meetups", body: "Display an event QR on badges and signage so attendees add sessions to their calendar instantly." },
      { title: "Webinars & online events", body: "Send an event QR in confirmation emails so attendees add the webinar to their calendar with the join link in notes." },
      { title: "Concerts & shows", body: "Print event QR codes on tickets and posters so fans add the show to their calendar with venue and time pre-filled." },
      { title: "Schools & classes", body: "Send parents an event QR for parent-teacher meetings and exams so they add the date with one tap." },
      { title: "Open houses & viewings", body: "Add an event QR to real-estate listings so buyers add the open-house slot to their calendar." },
    ],
    howTo: [
      { step: "Open the event QR generator", text: "Go to the QR generator and select the Event content type from the type selector." },
      { step: "Fill in the event details", text: "Enter the title, start and end date/time, location and optional notes (e.g. a join link)." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, or add your brand logo. Raise error correction to Q or H if you add a logo." },
      { step: "Download and place", text: "Export as PNG, SVG or PDF. Add the QR to invitations, tickets and signage where guests can scan." },
    ],
    faqs: [
      { q: "How do I create a QR code for a calendar event?", a: "Open the event QR generator, enter the title, start and end times, location and optional notes, then download the QR as PNG, SVG or PDF. When scanned, the phone shows a calendar preview pre-filled with your event — one tap adds it. Completely free, no signup, no watermark." },
      { q: "What calendar format does the QR code use?", a: "ScanForge encodes the event as a vEvent (VCS / ICS-lite) payload — the BEGIN:VEVENT … END:VEVENT block. Both iOS Calendar and Google Calendar on Android recognise it and add the event with title, date, location and notes in one tap." },
      { q: "Does the event QR code work on iPhone and Android?", a: "Yes. The vEvent format is supported by iOS Calendar, Google Calendar and most third-party calendars. Scanning opens the calendar app with the event pre-filled, ready to add." },
      { q: "Does the event QR code expire?", a: "No. ScanForge generates static event QR codes — the event details are encoded directly in the image and never expire on our side. The QR keeps working even after the event date, although scanning it then would add a past event to the calendar." },
      { q: "Can I include a video-call link in the event QR?", a: "Yes. Put the join link (Zoom, Meet, Teams, etc.) in the notes field. When the calendar event opens, the join link appears in the event description and most calendar apps render it as a tappable URL at the event time." },
      { q: "Can I add my logo to an event QR code?", a: "Yes. Upload a PNG, JPG or SVG logo in the Design tab. Keep the logo under 30% of the code area and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },

  "app-qr": {
    typeId: "app",
    slug: "app-qr",
    primaryKeyword: "app download qr code generator",
    h1: "Free App Download QR Code Generator",
    metaDescription:
      "Free app download QR code generator. Create one QR code that routes iPhone users to the App Store and Android users to Google Play. Download PNG/SVG/PDF. No signup, no watermark.",
    subtitle:
      "One QR for both app stores. Generate an app download QR so iPhone users land on the App Store and Android users on Google Play — free, no signup, no watermark.",
    whatIs: [
      "An app download QR code is a QR code that encodes a single URL pointing to your app. On iOS it routes the scanner to the App Store product page; on Android it routes to Google Play — both platforms open the native store app and the install page in one tap.",
      "ScanForge builds the link for you from the app name and your App Store / Play Store URLs. If you have a single landing page (e.g. a branch.io or firebase dynamic-link URL) that already does platform routing, paste that as a custom URL instead.",
      "App QR codes are static — the destination URL is encoded directly in the image and never expires on our side. They are ideal for printed packaging, in-store signage, event banners and ads where a single scan should land the user on the correct app store for their device.",
    ],
    useCases: [
      { title: "Product packaging", body: "Print an app QR on your packaging so buyers install your companion app on either iPhone or Android." },
      { title: "Retail signage", body: "Display an app QR at the counter or in the window so passers-by install your loyalty or shopping app." },
      { title: "Event booths & demos", body: "Print an app QR on booth banners so attendees install your event or product app on the spot." },
      { title: "Print & OOH ads", body: "Add an app QR to flyers, posters and billboards so the ad drives installs from both platforms with one code." },
      { title: "Conferences & meetups", body: "Display an app QR on badges and slides so attendees install your event or networking app instantly." },
      { title: "Restaurants & cafés", body: "Add an app QR to tables so guests install your ordering or loyalty app while waiting." },
    ],
    howTo: [
      { step: "Open the app QR generator", text: "Go to the QR generator and select the App Download content type from the type selector." },
      { step: "Paste your store URLs", text: "Add your App Store URL (apps.apple.com/…) and Google Play URL (play.google.com/store/apps/details?id=…)." },
      { step: "Customise the design (optional)", text: "Change colours, dot pattern, or add your app icon as a logo. Raise error correction to Q or H if you add a logo." },
      { step: "Download and place", text: "Export as PNG, SVG or PDF. Add the QR to packaging, signage and ads where users can scan and install." },
    ],
    faqs: [
      { q: "How do I create a QR code for app download?", a: "Open the app QR generator, paste your App Store and Google Play URLs, then download the QR as PNG, SVG or PDF. When scanned, the phone opens the correct store for its platform — completely free, no signup, no watermark." },
      { q: "Does one QR code work on both iPhone and Android?", a: "Yes. ScanForge builds a single URL that the phone's camera opens in its native browser, which then routes to the correct store for the platform. If you have a platform-routing service (branch.io, Firebase Dynamic Links, your own redirect), paste its URL as a custom link instead." },
      { q: "Do I need to publish my app to generate the QR?", a: "You need at least one public store URL. If only one platform is live yet, leave the other blank and the QR will route to whichever URL you provide — add the second later by regenerating the QR." },
      { q: "Does the app QR code expire?", a: "No. ScanForge generates static app QR codes — the destination URL is encoded directly in the image and never expires on our side. The QR keeps working as long as the store URL stays valid." },
      { q: "Can I track installs from the QR code?", a: "Static QR codes cannot track scans — the URL is encoded directly in the image with no redirect server. If you need install attribution, use a platform-routing service URL (branch.io, AppsFlyer OneLink) as the destination and the QR will surface that tracking on every scan." },
      { q: "Can I add my logo to an app QR code?", a: "Yes — and it is especially effective to use your app icon as the logo. Upload a PNG, JPG or SVG in the Design tab, keep it under 30% of the code area, and raise error correction to level Q or H so the code stays scannable. We automatically hide the dots behind the logo." },
    ],
  },
};

export const QR_LANDING_VIEWS = Object.keys(QR_LANDING_CONTENT) as string[];
