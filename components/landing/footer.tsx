import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "./brand-icons";
import {
  ADDRESS,
  BRAND_NAME,
  EMAIL_TO,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MESSENGER_URL,
  NAV_ITEMS,
  PHONE_DISPLAY,
  PHONE_TEL,
  TIKTOK_URL,
} from "./site-data";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer } from "./section-header";

const linkColumns = [
  {
    title: "Services",
    links: [
      { label: "Cellphone Repair", href: "#services" },
      { label: "Laptop Repair", href: "#services" },
      { label: "Computer Repair", href: "#services" },
      { label: "Console & Steam Deck", href: "#services" },
      { label: "Accessories", href: "#services" },
    ],
  },
  {
    title: "Advanced",
    links: [
      { label: "Box / Dongle Activation", href: "#solutions" },
      { label: "Schematics", href: "#solutions" },
      { label: "Credits Service", href: "#solutions" },
      { label: "Chip-Level Repair", href: "#solutions" },
      { label: "Remote Services", href: "#solutions" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Why JJZ TECH", href: "#why" },
      { label: "Gallery", href: "#gallery" },
      { label: "Testimonials", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Location", href: "#location" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-amber-50/40 text-zinc-700 border-t border-amber-100 overflow-hidden jjz-defer">
      {/* Soft amber accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
      />

      {/* Main footer grid */}
      <SectionContainer className="relative py-10 md:py-12">
        <StaggerReveal
          amount={0.1}
          staggerDelay={0.06}
          className="grid grid-cols-2 md:grid-cols-12 gap-8 text-center md:text-left"
        >
          {/* Brand col */}
          <StaggerItem variant="fadeUp" className="col-span-2 md:col-span-4 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-nobg.png"
                alt={BRAND_NAME}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div className="text-left">
                <p className="font-display text-base font-bold text-zinc-900 tracking-tight">
                  {BRAND_NAME}
                </p>
                <p className="text-[10px] text-amber-600">
                  Gadget Repair Services
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-600 leading-relaxed max-w-xs">
              Your trusted partner in gadget repair &amp; solutions. Cellphone,
              laptop, computer — same-day service, fair prices, quality parts.
            </p>
            <ul className="mt-4 space-y-2 text-xs flex flex-col items-center md:items-start text-center md:text-left w-full">
              <li className="flex flex-row items-center justify-center md:justify-start gap-1.5 md:gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{ADDRESS}</span>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex flex-row items-center justify-center md:justify-start gap-1.5 md:gap-2 hover:text-amber-700"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" /> 
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL_TO}`}
                  className="flex flex-row items-center justify-center md:justify-start gap-1.5 md:gap-2 hover:text-amber-700"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600" /> 
                  <span>{EMAIL_TO}</span>
                </a>
              </li>
            </ul>
          </StaggerItem>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <StaggerItem key={col.title} variant="fadeUp" className="md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-1.5 text-xs">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-zinc-700 hover:text-amber-700"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}

          {/* Social + hours col */}
          <StaggerItem variant="fadeUp" className="md:col-span-2 flex flex-col items-center md:items-start">
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
              Connect
            </h4>
            <ul className="mt-3 flex gap-1.5">
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-zinc-200 hover:bg-amber-500 hover:border-amber-500 hover:text-zinc-950 transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Messenger"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-zinc-200 hover:bg-amber-500 hover:border-amber-500 hover:text-zinc-950 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-zinc-200 hover:bg-amber-500 hover:border-amber-500 hover:text-zinc-950 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-zinc-200 hover:bg-amber-500 hover:border-amber-500 hover:text-zinc-950 transition-colors"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>

            <h4 className="mt-4 text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
              Hours
            </h4>
            <ul className="mt-2 text-xs space-y-0.5 text-zinc-700">
              <li>Mon – Sat · 9 AM – 7 PM</li>
              <li className="text-zinc-500">Sun · by appointment</li>
            </ul>
          </StaggerItem>
        </StaggerReveal>
      </SectionContainer>

      {/* Bottom strip */}
      <div className="relative border-t border-amber-100/80 bg-white/40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p>{ADDRESS}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
