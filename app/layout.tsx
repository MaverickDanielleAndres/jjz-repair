import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HydrationSafeButtons } from "@/components/hydration-safe-buttons";
import { SuppressExtensionErrors } from "@/components/suppress-extension-errors";

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

export const metadata: Metadata = {
  // Resolves relative URLs in `openGraph.images`, `twitter.images`, etc.
  // Without this Next.js falls back to http://localhost:3000 and logs a warning.
  metadataBase: new URL("https://jjztech.ph"),
  title: "JJZ TECH — Gadget Repair Services | Binangonan, Rizal",
  description:
    "Fast, affordable gadget repair in 1544 Manila E Rd, Binangonan, Rizal. Cellphone, laptop, and computer repair — same-day diagnostics, quality parts, trusted technicians. Message us 24/7.",
  keywords: [
    "JJZ TECH",
    "gadget repair",
    "cellphone repair",
    "laptop repair",
    "computer repair",
    "Binangonan",
    "Rizal",
    "Tayuman",
    "Manila East Road",
    "phone repair near me",
  ],
  authors: [{ name: "JJZ TECH" }],
  icons: {
    icon: [
      { url: "/logo-nobg.png", type: "image/png" },
    ],
    shortcut: "/logo-nobg.png",
    apple: "/logo-nobg.png",
  },
  openGraph: {
    title: "JJZ TECH — Gadget Repair Services",
    description:
      "Fast, affordable gadget repair in Binangonan, Rizal. Cellphone, laptop, computer — same-day service.",
    type: "website",
    images: ["/logo-nobg.png"],
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
        {/* Pre-React console filter — runs before any client-side JS so
            browser-extension noise (MetaMask, password managers, etc.) is
            suppressed from the very first script. Without this, errors
            fired before React hydrates would still show in the console. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;var p=/MetaMask|chrome-extension:.*\\\\binpage\\\\.js|ethereum|fdprocessedid|window\\\\.ethereum|Receiving end does not exist|Unchecked runtime\\\\.lastError|MaxListenersExceededWarning|Resetting the streams/i;var a=function(){var m=Array.prototype.slice.call(arguments).map(function(x){if(x&&x.stack)return x.stack;if(x&&x.message)return x.message;if(typeof x==='string')return x;try{return JSON.stringify(x)}catch(_){return String(x)}}).join(' ');return p.test(m)};var oe=console.error.bind(console),ow=console.warn.bind(console),oi=console.info.bind(console);console.error=function(){if(a.apply(null,arguments))return;oe.apply(console,arguments)};console.warn=function(){if(a.apply(null,arguments))return;ow.apply(console,arguments)};console.info=function(){if(a.apply(null,arguments))return;oi.apply(console,arguments)};window.addEventListener('error',function(e){if(e&&e.filename&&/chrome-extension:/.test(e.filename)){e.preventDefault();e.stopImmediatePropagation();return false}})})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans overflow-x-hidden">
        <HydrationSafeButtons />
        <SuppressExtensionErrors />
        {children}
      </body>
    </html>
  );
}