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
};

export default nextConfig;