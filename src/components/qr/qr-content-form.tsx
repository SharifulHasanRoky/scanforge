"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  buildWifi,
  buildVcard,
  buildEmail,
  buildSms,
  buildWhatsatsapp,
  buildLocation,
  buildSocial,
  buildEvent,
  buildApp,
  normalizeUrl,
  type QrTypeId,
  type WifiPayload,
  type VcardPayload,
  type EmailPayload,
  type SmsPayload,
  type LocationPayload,
  type SocialPayload,
  type EventPayload,
  type AppPayload,
} from "@/lib/qr/types";
import { BRAND } from "@/lib/brand";

type Props = {
  type: QrTypeId;
  onData: (data: string, name: string) => void;
  seed?: { content: string; nonce: number } | null;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function QrContentForm({ type, onData, seed }: Props) {
  // Per-type state so switching types preserves entries.
  const [url, setUrl] = useState<string>(BRAND.url);
  const [text, setText] = useState("ScanForge — free QR & barcode workspace.");
  const [wifi, setWifi] = useState<WifiPayload>({
    ssid: "MyNetwork",
    password: "",
    encryption: "WPA",
    hidden: false,
  });
  const [vcard, setVcard] = useState<VcardPayload>({
    firstName: "Ada",
    lastName: "Lovelace",
    org: "ScanForge",
    title: "Founder",
    phone: "+1 555 0100",
    email: "ada@example.com",
    url: BRAND.url as string,
    address: "221B Baker St, London",
  });
  const [email, setEmail] = useState<EmailPayload>({ to: "", subject: "", body: "" });
  const [phone, setPhone] = useState("+1 555 0123");
  const [sms, setSms] = useState<SmsPayload>({ to: "", body: "" });
  const [waNumber, setWaNumber] = useState("");
  const [waMsg, setWaMsg] = useState("");
  const [loc, setLoc] = useState<LocationPayload>({ lat: "", lng: "", query: "Eiffel Tower, Paris" });
  const [social, setSocial] = useState<SocialPayload>({ platform: "instagram", handle: "" });
  const [event, setEvent] = useState<EventPayload>({
    title: "Product Launch",
    location: "Online",
    start: "",
    end: "",
    description: "",
  });
  const [app, setApp] = useState<AppPayload>({ ios: "", android: "" });

  // Reopen a saved code: seed the appropriate field from the saved content.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!seed) return;
    if (type === "url") setUrl(seed.content);
    else setText(seed.content);
  }, [seed?.nonce]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    let data = "";
    let name = "";
    switch (type) {
      case "url": {
        const normalized = normalizeUrl(url);
        data = normalized;
        // Safer hostname extraction: new URL() throws on partial input
        // like "https://" or whitespace-only, which previously crashed the
        // whole workspace with a client-side exception.
        let hostname = "URL QR";
        if (normalized) {
          try {
            const h = new URL(normalized).hostname.replace(/^www\./, "");
            if (h) hostname = h;
          } catch {
            hostname = url.trim() || "URL QR";
          }
        }
        name = hostname;
        break;
      }
      case "text":
        data = text;
        name = text ? text.slice(0, 24) : "Text QR";
        break;
      case "wifi":
        data = buildWifi(wifi);
        name = wifi.ssid ? `${wifi.ssid} Wi-Fi` : "Wi-Fi QR";
        break;
      case "vcard":
        data = buildVcard(vcard);
        name = `${vcard.firstName} ${vcard.lastName}`.trim() || "vCard QR";
        break;
      case "email":
        data = buildEmail(email);
        name = email.to ? `Email → ${email.to}` : "Email QR";
        break;
      case "phone":
        data = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";
        name = phone ? `Call ${phone}` : "Phone QR";
        break;
      case "sms":
        data = buildSms(sms);
        name = sms.to ? `SMS → ${sms.to}` : "SMS QR";
        break;
      case "whatsapp":
        data = buildWhatsatsapp(waNumber, waMsg);
        name = waNumber ? `WhatsApp ${waNumber}` : "WhatsApp QR";
        break;
      case "location":
        data = buildLocation(loc);
        name = loc.query || "Location QR";
        break;
      case "social":
        data = buildSocial(social);
        name = `${social.platform} QR`;
        break;
      case "event":
        data = buildEvent(event);
        name = event.title || "Event QR";
        break;
      case "app":
        data = buildApp(app);
        name = "App QR";
        break;
    }
    onData(data, name);
  }, [type, url, text, wifi, vcard, email, phone, sms, waNumber, waMsg, loc, social, event, app, onData]);

  switch (type) {
    case "url":
      return (
        <Field label="Website URL">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://your-site.com" />
          <p className="text-[11px] text-muted-foreground">A link is encoded directly — no redirect server, no expiry from our side.</p>
        </Field>
      );
    case "text":
      return (
        <Field label="Text content">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Type any text…" />
        </Field>
      );
    case "wifi":
      return (
        <div className="space-y-3">
          <Field label="Network name (SSID)">
            <Input value={wifi.ssid} onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })} />
          </Field>
          <Field label="Encryption">
            <Select value={wifi.encryption} onValueChange={(v) => setWifi({ ...wifi, encryption: v as WifiPayload["encryption"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA / WPA2 / WPA3</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">No password</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {wifi.encryption !== "nopass" && (
            <Field label="Password">
              <Input value={wifi.password} onChange={(e) => setWifi({ ...wifi, password: e.target.value })} />
            </Field>
          )}
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={wifi.hidden} onCheckedChange={(v) => setWifi({ ...wifi, hidden: v })} />
            Hidden network
          </label>
        </div>
      );
    case "vcard":
      return (
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name"><Input value={vcard.firstName} onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })} /></Field>
          <Field label="Last name"><Input value={vcard.lastName} onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })} /></Field>
          <Field label="Organisation"><Input value={vcard.org} onChange={(e) => setVcard({ ...vcard, org: e.target.value })} /></Field>
          <Field label="Title"><Input value={vcard.title} onChange={(e) => setVcard({ ...vcard, title: e.target.value })} /></Field>
          <Field label="Phone"><Input value={vcard.phone} onChange={(e) => setVcard({ ...vcard, phone: e.target.value })} /></Field>
          <Field label="Email"><Input value={vcard.email} onChange={(e) => setVcard({ ...vcard, email: e.target.value })} /></Field>
          <Field label="Website"><Input value={vcard.url} onChange={(e) => setVcard({ ...vcard, url: e.target.value })} /></Field>
          <Field label="Address"><Input value={vcard.address} onChange={(e) => setVcard({ ...vcard, address: e.target.value })} /></Field>
        </div>
      );
    case "email":
      return (
        <div className="space-y-3">
          <Field label="To"><Input value={email.to} onChange={(e) => setEmail({ ...email, to: e.target.value })} placeholder="name@example.com" /></Field>
          <Field label="Subject"><Input value={email.subject} onChange={(e) => setEmail({ ...email, subject: e.target.value })} /></Field>
          <Field label="Body"><Textarea value={email.body} onChange={(e) => setEmail({ ...email, body: e.target.value })} rows={3} /></Field>
        </div>
      );
    case "phone":
      return <Field label="Phone number"><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 0100" /></Field>;
    case "sms":
      return (
        <div className="space-y-3">
          <Field label="To"><Input value={sms.to} onChange={(e) => setSms({ ...sms, to: e.target.value })} placeholder="+1 555 0100" /></Field>
          <Field label="Message"><Textarea value={sms.body} onChange={(e) => setSms({ ...sms, body: e.target.value })} rows={3} /></Field>
        </div>
      );
    case "whatsapp":
      return (
        <div className="space-y-3">
          <Field label="Phone number (with country code)">
            <Input value={waNumber} onChange={(e) => setWaNumber(e.target.value)} placeholder="14155550100" />
          </Field>
          <Field label="Pre-filled message">
            <Textarea value={waMsg} onChange={(e) => setWaMsg(e.target.value)} rows={2} />
          </Field>
        </div>
      );
    case "location":
      return (
        <div className="space-y-3">
          <Field label="Search query (address / place)">
            <Input value={loc.query} onChange={(e) => setLoc({ ...loc, query: e.target.value })} placeholder="Eiffel Tower, Paris" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Latitude (optional)"><Input value={loc.lat} onChange={(e) => setLoc({ ...loc, lat: e.target.value })} placeholder="48.8584" /></Field>
            <Field label="Longitude (optional)"><Input value={loc.lng} onChange={(e) => setLoc({ ...loc, lng: e.target.value })} placeholder="2.2945" /></Field>
          </div>
        </div>
      );
    case "social":
      return (
        <div className="space-y-3">
          <Field label="Platform">
            <Select value={social.platform} onValueChange={(v) => setSocial({ ...social, platform: v as SocialPayload["platform"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="x">X</SelectItem>
                <SelectItem value="other">Other / custom URL</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Username or handle">
            <Input value={social.handle} onChange={(e) => setSocial({ ...social, handle: e.target.value })} placeholder="your-handle" />
          </Field>
        </div>
      );
    case "event":
      return (
        <div className="space-y-3">
          <Field label="Event title"><Input value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} /></Field>
          <Field label="Location"><Input value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start">
              <Input type="datetime-local" value={event.start} onChange={(e) => setEvent({ ...event, start: e.target.value })} />
            </Field>
            <Field label="End">
              <Input type="datetime-local" value={event.end} onChange={(e) => setEvent({ ...event, end: e.target.value })} />
            </Field>
          </div>
          <Field label="Description"><Textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} rows={2} /></Field>
        </div>
      );
    case "app":
      return (
        <div className="space-y-3">
          <Field label="Apple App Store URL"><Input value={app.ios} onChange={(e) => setApp({ ...app, ios: e.target.value })} placeholder="https://apps.apple.com/…" /></Field>
          <Field label="Google Play URL"><Input value={app.android} onChange={(e) => setApp({ ...app, android: e.target.value })} placeholder="https://play.google.com/…" /></Field>
        </div>
      );
    default:
      return null;
  }
}
