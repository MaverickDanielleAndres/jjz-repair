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

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-700">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 text-center">
        {/* Logo */}
        <a
          href="#home"
          aria-label="Back to top"
          className="inline-flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt={BRAND_NAME}
            width={120}
            height={120}
            className="h-20 w-20 md:h-24 md:w-24 object-contain"
          />
        </a>

        <p className="mt-4 font-display text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
          {BRAND_NAME}
        </p>
        <p className="mt-2 max-w-xl mx-auto text-sm md:text-base text-zinc-600">
          Your trusted partner in gadget repair & solutions. Cellphone, laptop,
          computer — same-day service, fair prices, quality parts.
        </p>

        {/* Contact row */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <li className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            {ADDRESS}
          </li>
          <li>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-1.5 hover:text-amber-700"
            >
              <Phone className="w-4 h-4 text-amber-600" /> {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${EMAIL_TO}`}
              className="inline-flex items-center gap-1.5 hover:text-amber-700"
            >
              <Mail className="w-4 h-4 text-amber-600" /> {EMAIL_TO}
            </a>
          </li>
        </ul>

        {/* Nav links */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-zinc-700">
          {NAV_ITEMS.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-amber-700">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <ul className="mt-6 flex items-center justify-center gap-3">
          <SocialBtn href={FACEBOOK_URL} label="Facebook">
            <FacebookIcon className="w-4 h-4" />
          </SocialBtn>
          <SocialBtn href={MESSENGER_URL} label="Messenger" highlight>
            <MessageCircle className="w-4 h-4" />
          </SocialBtn>
          <SocialBtn href={INSTAGRAM_URL} label="Instagram">
            <InstagramIcon className="w-4 h-4" />
          </SocialBtn>
          <SocialBtn href={TIKTOK_URL} label="TikTok">
            <TikTokIcon className="w-4 h-4" />
          </SocialBtn>
        </ul>

        <p className="mt-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          1544 Manila E Rd, Binangonan, Rizal, Philippines
        </p>
      </div>
    </footer>
  );
}

function SocialBtn({
  href,
  label,
  children,
  highlight,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={
          "inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors " +
          (highlight
            ? "bg-amber-500 text-zinc-950 border-amber-500 hover:bg-amber-400"
            : "bg-white text-zinc-600 border-zinc-200 hover:border-amber-300 hover:text-amber-700")
        }
      >
        {children}
      </a>
    </li>
  );
}

export default Footer;
