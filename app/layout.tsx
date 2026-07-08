import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    title: "JJZ TECH — Gadget Repair Services",
    description:
      "Fast, affordable gadget repair in Binangonan, Rizal. Cellphone, laptop, computer — same-day service.",
    type: "website",
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
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}
