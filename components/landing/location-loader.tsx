"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` on import — load only on the client to avoid SSR crashes.
const ShopMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] lg:min-h-[420px] rounded-2xl border border-zinc-200 bg-zinc-100 grid place-items-center text-sm text-zinc-500">
      Loading map…
    </div>
  ),
});

export default ShopMap;
