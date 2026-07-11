"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Leaflet touches `window` on import — load only on the client to avoid
// SSR crashes.
const ShopMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-64 sm:min-h-72 lg:min-h-full rounded-2xl border border-zinc-200 bg-zinc-100 grid place-items-center text-sm text-zinc-500">
      Loading map…
    </div>
  ),
});

/**
 * Wrapper that defers mounting the Leaflet map until the section
 * approaches the viewport. The wrapper container is `h-full` so it
 * inherits the height from its parent grid cell — Leaflet does not
 * get to choose how tall the map is.
 */
export default function LazyShopMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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

  return (
    <div ref={ref} className="w-full h-full min-h-64 sm:min-h-72 lg:min-h-full">
      {shouldMount ? (
        <ShopMap />
      ) : (
        <div className="w-full h-full min-h-64 sm:min-h-72 lg:min-h-full rounded-2xl border border-zinc-200 bg-zinc-100 grid place-items-center text-sm text-zinc-500">
          Map will load as you scroll…
        </div>
      )}
    </div>
  );
}
