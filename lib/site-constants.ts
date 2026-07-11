/**
 * Canonical identity / contact / location facts for JJZ TECH.
 *
 * Source of truth for SEO-related surfaces (metadata, JSON-LD, sitemap,
 * robots). Kept separate from `components/landing/site-data.ts` so server
 * metadata never has to import anything from a client-side component tree.
 */
export const SITE_URL = "https://jjztech.ph";

export const BRAND = {
  legalName: "JJZ TECH",
  /** Brand name with the hyphenated spellings customers also search for. */
  displayName: "JJZ TECH",
  alternateNames: ["JJZ Tech", "JJZ-repair", "JJZ Repair", "JJZTECH"],
  tagline: "Cellphone, Laptop & Computer Repair in Binangonan, Rizal",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-nobg.png`,
  email: "jjztechph@gmail.com",
} as const;

export const CONTACT = {
  phoneDisplay: "0928 066 3629",
  phoneTel: "+639280663629",
  messengerUrl: "https://m.me/jjztech",
  facebookUrl: "https://facebook.com/jjztech",
  instagramUrl: "https://instagram.com/jjztech",
  tiktokUrl: "https://tiktok.com/@jjztech",
} as const;

export const ADDRESS = {
  street: "1544 Manila East Road",
  locality: "Binangonan",
  region: "Rizal",
  country: "PH",
  /** Single-line for display + schema `streetAddress`. */
  formatted: "1544 Manila E Rd, Binangonan, Rizal, Philippines",
  /** Comma-separated for `addressLocality, addressRegion, addressCountry`. */
  postal: "1940",
} as const;

/** OpenStreetMap coordinates used by the on-site Leaflet map. */
export const GEO = {
  latitude: 14.5179341,
  longitude: 121.1587085,
} as const;

export const HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  {
    dayOfWeek: ["Sunday"],
    opens: "00:00",
    closes: "00:00",
    description: "By appointment only — message us on Messenger",
  },
] as const;
