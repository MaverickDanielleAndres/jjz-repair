import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HydrationSafeButtons } from "@/components/hydration-safe-buttons";
import { SuppressExtensionErrors } from "@/components/suppress-extension-errors";
import {
  BRAND,
  CONTACT,
  SITE_URL,
} from "@/lib/site-constants";
import { localBusinessJsonLd } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Mobile / PWA viewport. Theme color matches the brand amber accent so
 * the URL bar and mobile chrome blend with the site.
 */
export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

const TITLE =
  "JJZ TECH — Cellphone & Gadget Repair in Binangonan, Rizal";
const DESCRIPTION =
  "Cellphone, laptop & computer repair in Binangonan, Rizal. " +
  "Same-day diagnostics, OEM-grade parts, board-level specialists. " +
  "Free check-up. Call 0928 066 3629.";

export const metadata: Metadata = {
  // Resolves relative URLs in `openGraph.images`, `twitter.images`, etc.
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BRAND.legalName}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND.legalName,
  keywords: [
    "JJZ TECH",
    "JJZ-repair",
    "JJZ repair",
    "jjztech",
    "cellphone repair Binangonan",
    "cellphone repair near me",
    "cellphone repair Rizal",
    "phone repair Binangonan",
    "laptop repair Binangonan",
    "computer repair Binangonan",
    "laptop repair Rizal",
    "computer repair Rizal",
    "gadget repair Binangonan",
    "gadget repair Rizal",
    "iPhone repair Binangonan",
    "iPhone repair Rizal",
    "Samsung repair Binangonan",
    "MacBook repair Binangonan",
    "screen replacement Binangonan",
    "battery replacement Binangonan",
    "motherboard repair Rizal",
    "microsoldering Philippines",
    "iCloud unlock Binangonan",
    "FRP removal Rizal",
    "Manila East Road repair shop",
    "Tayuman gadget repair",
    "phone repair near Binangonan",
  ],
  authors: [{ name: BRAND.legalName, url: SITE_URL }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  category: "Local Business",
  classification: "Electronics Repair Shop",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo-nobg.png", type: "image/png" },
    ],
    shortcut: "/logo-nobg.png",
    apple: "/logo-nobg.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: BRAND.legalName,
    images: [
      {
        url: "/logo-nobg.png",
        width: 512,
        height: 512,
        alt: `${BRAND.legalName} — Gadget Repair Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo-nobg.png"],
  },
  facebook: {
    appId: undefined,
  },
  other: {
    "geo.region": "PH-RIZ",
    "geo.placename": "Binangonan, Rizal, Philippines",
    "geo.position": `14.5141276;121.16231`,
    ICBM: "14.5141276, 121.16231",
    "business:contact_data:street_address": "1544 Manila East Road",
    "business:contact_data:locality": "Binangonan",
    "business:contact_data:region": "Rizal",
    "business:contact_data:postal_code": "1940",
    "business:contact_data:country_name": "Philippines",
    "business:contact_data:phone_number": CONTACT.phoneTel,
    "business:contact_data:email": BRAND.email,
    // Verification tags belong here once you've claimed the property in
    // Google Search Console / Bing Webmaster Tools. Leave empty until you
    // have a real token — bogus values just trigger warnings.
    // "google-site-verification": "",
    // "msvalidate.01": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" crossOrigin="use-credentials" />

        {/* Resource hints. The hero `<Image>` above the fold is served
            from `/_next/image` — warming that connection cuts ~100ms off
            LCP on first paint. `dns-prefetch` is the fallback for
            browsers without preconnect support. The hero `<Image
            preload>` prop already emits a matching `<link rel="preload">`
            at the top of <head>, so we don't add one here too. */}
        <link rel="preconnect" href={SITE_URL} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={SITE_URL} />

        {/* LocalBusiness / RepairShop structured data. Emitted once at the
            root so every route inherits the same NAP graph. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: localBusinessJsonLd() }}
        />

        {/* Pre-React console filter — runs before any client-side JS so
            browser-extension noise (MetaMask, password managers, etc.) is
            suppressed from the very first script. Without this, errors
            fired before React hydrates would still show in the console. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(typeof window==='undefined')return;var p=/MetaMask|chrome-extension|ethereum|fdprocessedid|window\\.ethereum|Receiving end does not exist|Unchecked runtime\\.lastError|MaxListenersExceededWarning|Resetting the streams|ObjectMultiplex|A tree hydrated but some attributes|Hydration failed because the initial UI does not match|attribute did not match|Text content does not match server-rendered HTML/i;var isNoise=function(){var m=Array.prototype.map.call(arguments,function(x){if(x&&x.stack)return x.stack;if(x&&x.message)return x.message;return typeof x==='string'?x:String(x)}).join(' ');return p.test(m)};var oe=console.error.bind(console),ow=console.warn.bind(console),oi=console.info.bind(console);console.error=function(){if(isNoise.apply(null,arguments))return;oe.apply(console,arguments)};console.warn=function(){if(isNoise.apply(null,arguments))return;ow.apply(console,arguments)};console.info=function(){if(isNoise.apply(null,arguments))return;oi.apply(console,arguments)};window.addEventListener('error',function(e){if(e&&e.filename&&/chrome-extension:/.test(e.filename)){e.preventDefault();e.stopImmediatePropagation();return false}})}catch(_){}})();`,
          }}
        />

        {/* Pre-hydration DOM scrub — runs SYNCHRONOUSLY during HTML
            parsing (before React boots) and strips any attributes that
            browser extensions (LastPass, 1Password, Chrome autofill)
            have already injected onto interactive elements. Without
            this, React's hydration check fires before the React-side
            MutationObserver in HydrationSafeButtons can clean them up,
            which is what produces the "tree hydrated but some attributes
            of the server rendered HTML didn't match the client properties"
            error in the console. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=['fdprocessedid','data-extension-id','data-lastpass-icon-added','data-kwgh-uid','data-form-type'];var clean=function(el){if(!el||!el.removeAttribute)return;for(var i=0;i<a.length;i++){if(el.hasAttribute&&el.hasAttribute(a[i]))el.removeAttribute(a[i])}if(el.querySelectorAll){var subs=el.querySelectorAll('['+a.join('],[')+']');for(var j=0;j<subs.length;j++){for(var k=0;k<a.length;k++){subs[j].removeAttribute(a[k])}}}};clean(document);document.addEventListener('DOMContentLoaded',function(){clean(document)});new MutationObserver(function(ms){for(var x=0;x<ms.length;x++){var m=ms[x];if(m.type==='attributes'&&a.indexOf(m.attributeName)>=0){m.target.removeAttribute(m.attributeName)}else if(m.type==='childList'){for(var y=0;y<m.addedNodes.length;y++)clean(m.addedNodes[y])}}}}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:a})}catch(_){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans overflow-x-clip max-w-full">
        <HydrationSafeButtons />
        <SuppressExtensionErrors />
        {children}
      </body>
    </html>
  );
}