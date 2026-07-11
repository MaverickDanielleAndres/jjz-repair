import {
  ADDRESS,
  BRAND,
  CONTACT,
  GEO,
  HOURS,
  SITE_URL,
} from "@/lib/site-constants";

/**
 * Serialize JSON-LD so it can be safely embedded via `dangerouslySetInnerHTML`.
 * Per Next.js guidance, replace `<` with `<` to neutralize any stray HTML
 * inside string fields.
 */
function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/**
 * `LocalBusiness` / `RepairShop` graph describing the shop itself.
 * Emitted once in the root layout so every page inherits the NAP graph.
 *
 * Reference: https://schema.org/RepairShop
 */
export function localBusinessJsonLd(): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "RepairShop", "ElectronicsStore"],
        "@id": `${SITE_URL}#business`,
        name: BRAND.displayName,
        alternateName: BRAND.alternateNames,
        legalName: BRAND.legalName,
        description:
          "Cellphone, laptop, and computer repair shop in Binangonan, Rizal. " +
          "Same-day diagnostics, board-level and chip-level repair, OEM-grade parts.",
        url: SITE_URL,
        logo: BRAND.logo,
        image: BRAND.logo,
        telephone: CONTACT.phoneTel,
        email: BRAND.email,
        priceRange: "₱₱",
        address: {
          "@type": "PostalAddress",
          streetAddress: ADDRESS.street,
          addressLocality: ADDRESS.locality,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.postal,
          addressCountry: ADDRESS.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          ADDRESS.formatted,
        )}`,
        openingHoursSpecification: HOURS.map((h) => {
          const spec: Record<string, unknown> = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.dayOfWeek,
          };
          if (h.opens && h.closes && !(h.opens === "00:00" && h.closes === "00:00")) {
            spec.opens = h.opens;
            spec.closes = h.closes;
          }
          return spec;
        }),
        sameAs: [
          CONTACT.facebookUrl,
          CONTACT.instagramUrl,
          CONTACT.tiktokUrl,
          CONTACT.messengerUrl,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: CONTACT.phoneTel,
            email: BRAND.email,
            areaServed: { "@type": "Country", name: "Philippines" },
            availableLanguage: ["en", "tl", "fil"],
          },
        ],
        knowsAbout: [
          "Cellphone repair",
          "Laptop repair",
          "Computer repair",
          "Microsoldering",
          "Motherboard repair",
          "iCloud unlock",
          "FRP removal",
          "Screen replacement",
          "Battery replacement",
          "Charging port repair",
          "Water damage recovery",
          "Console repair",
          "Steam Deck repair",
          "Tablet repair",
          "Box / Dongle activation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: BRAND.displayName,
        inLanguage: "en-PH",
        publisher: { "@id": `${SITE_URL}#business` },
      },
    ],
  });
}

/**
 * `FAQPage` schema for the FAQ section. Keep keys in sync with the
 * `faqs` array in `components/landing/faq.tsx`. If you change one, change
 * the other or the rich-result eligibility breaks.
 */
export function faqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  });
}

/**
 * `BreadcrumbList` for the in-page section anchors. Helps search engines
 * understand the page structure when individual sections are deep-linked.
 */
export function breadcrumbsJsonLd(
  items: Array<{ name: string; url: string }>,
): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  });
}
