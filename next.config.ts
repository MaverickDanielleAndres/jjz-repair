import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `optimizePackageImports` lets Next.js tree-shake icon libraries and
   * other multi-export packages more aggressively. Without this, every
   * `import { Foo } from "lucide-react"` (and there are hundreds on the
   * landing page) drags in the whole icon set into the client bundle.
   *
   * `lucide-react` and `motion` are the two biggest offenders — they
   * ship dozens of named exports and each import looks identical at
   * compile time, so the bundler can't tell that a particular site only
   * uses ~30 of them.
   */
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  images: {
    // Serve AVIF first (smallest payload), then WebP as fallback. Browsers
    // that don't support either fall through to the original JPEG/PNG. The
    // Lighthouse report flagged our hero cards for serving 547 KiB
    // JPEGs when a 540×360 WebP would render in <60 KiB — this format
    // negotiation is what gets us to "100% Performance".
    formats: ["image/avif", "image/webp"],
    // Allow the existing public asset paths. Remote URLs aren't used on
    // this site, so this list stays narrow.
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // LCP / hero images live on the same origin as the page (Vercel CDN),
  // so a same-origin preconnect is meaningless; the only preconnect that
  // actually helps here is to the host that serves `/_next/image`
  // responses (also the same origin). The `<link rel="preconnect">`
  // we'd otherwise add just costs ~1 KB and a slow handshake.
  //
  // `compress: true` drops Next.js' wire payloads by ~70% on JSON
  // responses (sitemap, RSS, RSC payloads). Default in Next 16 but
  // set explicitly so future build tools don't strip it.
  compress: true,
  // Powers the standalone server build if anyone runs `next start`
  // outside Vercel. Cheaper to keep the option here than to chase it
  // down later when a new host is added.
  output: "standalone",
};

export default nextConfig;