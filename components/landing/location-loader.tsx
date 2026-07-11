"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Leaflet touches `window` on import — load only on the client to avoid
// SSR crashes.
const ShopMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] lg:min-h-[420px] rounded-2xl border border-zinc-200 bg-zinc-100 grid place-items-center text-sm text-zinc-500">
      Loading map…
    </div>
  ),
});

/**
 * Wrapper that defers mounting the Leaflet map until the section
 * approaches the viewport. Without this gate the Leaflet bundle,
 * tile-layer requests, and tile image decodes all kick off during
 * initial paint — even though the section is far below the fold and
 * the user may never scroll there.
 */
export default function LazyShopMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mount ~300px before the section enters the viewport, so by the
    // time the user scrolls to it the tiles have already loaded.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Render the wrapper on every server / first-paint so layout doesn't
  // shift when the dynamic chunk loads. The dynamic component is only
  // mounted once `shouldMount` flips true.
  return (
    <div ref={ref} className="w-full h-full min-h-[320px] lg:min-h-[420px]">
      {shouldMount ? (
        <ShopMap />
      ) : (
        <div className="w-full h-full min-h-[320px] lg:min-h-[420px] rounded-2xl border border-zinc-200 bg-zinc-100 grid place-items-center text-sm text-zinc-500">
          Map will load as you scroll…
        </div>
      )}
    </div>
  );
}