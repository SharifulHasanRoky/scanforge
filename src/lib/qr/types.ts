// QR code content type definitions and string builders.
// Each builder turns a structured payload into the standard string a QR encoder
// consumes. Builders are pure functions so they can also run in a Web Worker.

export type QrTypeId =
  | "url"
  | "text"
  | "wifi"
  | "vcard"
  | "email"
  | "phone"
  | "sms"
  | "whatsapp"
  | "location"
  | "social"
  | "event"
  | "app";

export type QrType = {
  id: QrTypeId;
  label: string;
  short: string;
  icon: string; // lucide icon name
  desc: string;
};

export const QR_TYPES: QrType[] = [
  { id: "url", label: "URL / Website", short: "URL", icon: "Link", desc: "Turn any link into a scannable QR code." },
  { id: "text", label: "Plain Text", short: "Text", icon: "Type", desc: "Encode notes, instructions or messages." },
  { id: "wifi", label: "Wi-Fi", short: "Wi-Fi", icon: "Wifi", desc: "Share network credentials instantly." },
  { id: "vcard", label: "Contact (vCard)", short: "vCard", icon: "Contact", desc: "Share contact details as a vCard." },
  { id: "email", label: "Email", short: "Email", icon: "Mail", desc: "Pre-fill a recipient, subject and body." },
  { id: "phone", label: "Phone Call", short: "Phone", icon: "Phone", desc: "Start a call to a chosen number." },
  { id: "sms", label: "SMS", short: "SMS", icon: "MessageSquare", desc: "Pre-fill an SMS message." },
  { id: "whatsapp", label: "WhatsApp", short: "WhatsApp", icon: "MessageCircle", desc: "Open a WhatsApp chat." },
  { id: "location", label: "Location", short: "Location", icon: "MapPin", desc: "Open a map destination." },
  { id: "social", label: "Social Media", short: "Social", icon: "Share2", desc: "Link to a social profile." },
  { id: "event", label: "Calendar Event", short: "Event", icon: "Calendar", desc: "Add an event to a calendar." },
  { id: "app", label: "App Download", short: "App", icon: "Smartphone", desc: "Link to App Store / Play Store." },
];

export type WifiPayload = {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
};
export type VcardPayload = {
  firstName: string;
  lastName: string;
  org: string;
  title: string;
  phone: string;
  email: string;
  url: string;
  address: string;
};
export type EmailPayload = { to: string; subject: string; body: string };
export type SmsPayload = { to: string; body: string };
export type LocationPayload = { lat: string; lng: string; query: string };
export type SocialPayload = {
  platform: "facebook" | "instagram" | "youtube" | "tiktok" | "linkedin" | "x" | "other";
  handle: string;
};
export type EventPayload = {
  title: string;
  location: string;
  start: string; // datetime-local
  end: string;
  description: string;
};
export type AppPayload = { ios: string; android: string };

const escWifi = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");

const escVcard = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

function toICSDate(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  if (isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    "T" +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds()) +
    "Z"
  );
}

export function buildWifi(p: WifiPayload): string {
  if (!p.ssid.trim()) return "";
  const parts = [
    `T:${p.encryption === "nopass" ? "nopass" : p.encryption}`,
    `S:${escWifi(p.ssid)}`,
  ];
  if (p.encryption !== "nopass" && p.password) parts.push(`P:${escWifi(p.password)}`);
  if (p.hidden) parts.push("H:true");
  return `WIFI:${parts.join(";")};;`;
}

export function buildVcard(p: VcardPayload): string {
  const name = `${p.lastName};${p.firstName}`.replace(/^;/, "");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escVcard(name)}`,
    p.firstName || p.lastName ? `FN:${escVcard(`${p.firstName} ${p.lastName}`.trim())}` : "",
    p.org ? `ORG:${escVcard(p.org)}` : "",
    p.title ? `TITLE:${escVcard(p.title)}` : "",
    p.phone ? `TEL;TYPE=CELL:${p.phone}` : "",
    p.email ? `EMAIL:${p.email}` : "",
    p.url ? `URL:${p.url}` : "",
    p.address ? `ADR:;;${escVcard(p.address)}` : "",
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildEmail(p: EmailPayload): string {
  const params = new URLSearchParams();
  if (p.subject) params.set("subject", p.subject);
  if (p.body) params.set("body", p.body);
  const q = params.toString();
  return `mailto:${p.to}${q ? `?${q}` : ""}`;
}

export function buildSms(p: SmsPayload): string {
  return `SMSTO:${p.to}:${p.body}`;
}

export function buildWhatsatsapp(number: string, message: string): string {
  const clean = number.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}${message ? `?${new URLSearchParams({ text: message }).toString()}` : ""}`;
}

export function buildLocation(p: LocationPayload): string {
  if (p.lat && p.lng) {
    return `https://www.google.com/maps?q=${encodeURIComponent(p.lat)},${encodeURIComponent(p.lng)}`;
  }
  if (p.query) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`;
  return "";
}

export function buildSocial(p: SocialPayload): string {
  const h = p.handle.trim().replace(/^@/, "");
  switch (p.platform) {
    case "facebook":
      return h ? `https://facebook.com/${h}` : "https://facebook.com";
    case "instagram":
      return h ? `https://instagram.com/${h}` : "https://instagram.com";
    case "youtube":
      return h ? `https://youtube.com/${h}` : "https://youtube.com";
    case "tiktok":
      return h ? `https://tiktok.com/@${h}` : "https://tiktok.com";
    case "linkedin":
      return h ? `https://linkedin.com/in/${h}` : "https://linkedin.com";
    case "x":
      return h ? `https://x.com/${h}` : "https://x.com";
    default:
      return h.startsWith("http") ? h : `https://${h}`;
  }
}

export function buildEvent(p: EventPayload): string {
  if (!p.title) return "";
  const start = toICSDate(p.start);
  const end = toICSDate(p.end) || start;
  if (!start) return "";
  const lines = [
    "BEGIN:VEVENT",
    `SUMMARY:${p.title.replace(/\n/g, " ")}`,
    p.location ? `LOCATION:${p.location.replace(/\n/g, " ")}` : "",
    `DTSTART:${start}`,
    end ? `DTEND:${end}` : "",
    p.description ? `DESCRIPTION:${p.description.replace(/\n/g, "\\n")}` : "",
    "END:VEVENT",
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildApp(p: AppPayload): string {
  if (p.ios && p.android) return p.ios;
  return p.ios || p.android || "";
}

// Ensure URLs have a scheme so scanners treat them as links.
export function normalizeUrl(u: string): string {
  const v = u.trim();
  if (!v) return "";
  if (/^(https?|mailto:|tel:|sms:|WIFI:|BEGIN:VCARD|BEGIN:VEVENT)/i.test(v)) return v;
  if (/^[\w.+-]+@[\w-]+\.\w+/.test(v)) return `mailto:${v}`;
  if (/^\+?\d[\d\s-]{4,}$/.test(v)) return `tel:${v}`;
  return `https://${v}`;
}

// Relative luminance helper for contrast validation.
export function luminance(hex: string): number {
  const h = hex.replace("#", "");
  if (h.length < 6) return 0;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}
