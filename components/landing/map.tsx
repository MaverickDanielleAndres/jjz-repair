"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import L from "leaflet";
// Co-locate Leaflet's CSS with its consumer so it only loads when the
// map mounts. The import statement is statically analysable by Next.js,
// so the CSS is bundled into the map's chunk rather than the global
// stylesheet.
import "leaflet/dist/leaflet.css";
import {
  MAP_COORDS,
  MAP_ZOOM,
  ADDRESS,
  BRAND_NAME,
} from "./site-data";

const TILE_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const SHOP_IMAGE = "/location.png";

const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS,
)}`;

/**
 * The fullscreen image modal. Renders via createPortal into document.body
 * so it escapes any DOM containment from Leaflet's popup (which has
 * overflow: hidden) and is always on top of every map layer.
 */
function ShopImageModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view of ${BRAND_NAME}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "grid",
        placeItems: "center",
        // Translucent dark overlay instead of `backdrop-filter: blur` —
        // a full-viewport backdrop-filter is one of the most expensive
        // paint operations a browser can do; a solid 88% black overlay
        // is visually identical to the user but costs almost nothing.
        background: "rgba(10,10,10,.88)",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(96vw, 1080px)",
          maxHeight: "92vh",
          borderRadius: 16,
          overflow: "hidden",
          background: "#0a0a0a",
          boxShadow: "0 40px 80px rgba(0,0,0,.55)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
          }}
        >
          <Image
            src={SHOP_IMAGE}
            alt={`${BRAND_NAME} storefront`}
            fill
            sizes="(max-width: 1024px) 96vw, 1080px"
            className="object-contain"
            priority
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enlarged view"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 40,
            height: 40,
            borderRadius: 9999,
            background: "rgba(255,255,255,.25)",
            color: "#fff",
            border: 0,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

/**
 * React content rendered inside the Leaflet popup. Clicking the shop photo
 * opens a portal-mounted modal at document.body so it escapes the popup's
 * overflow: hidden boundary.
 */
function ShopMapPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        role="dialog"
        aria-label={`${BRAND_NAME} location details`}
        style={{
          fontFamily: "inherit",
          width: 240,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge ${BRAND_NAME} photo`}
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            height: 120,
            padding: 0,
            border: 0,
            cursor: "pointer",
            background: "#f4f4f5",
            overflow: "hidden",
          }}
        >
          <img
            src={SHOP_IMAGE}
            alt={BRAND_NAME}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: "rgba(255,255,255,.9)",
              color: "#18181b",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,.15)",
            }}
          >
            <Maximize2 size={12} strokeWidth={2} />
          </span>
        </button>
        <div style={{ padding: "12px 14px 14px" }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>
            {BRAND_NAME}
          </p>
          <p
            style={{
              margin: "4px 0 10px",
              fontSize: 12,
              color: "#52525b",
              lineHeight: 1.4,
            }}
          >
            {ADDRESS}
          </p>
          <a
            href={googleMapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "8px 12px",
              background: "#f59e0b",
              color: "#0a0a0a",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 9999,
              textDecoration: "none",
            }}
          >
            Get directions →
          </a>
        </div>
      </div>

      {open && <ShopImageModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default function ShopMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const popupRootRef = useRef<Root | null>(null);
  const popupHostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;
    if (mapRef.current) return; // already initialized

    try {
      const map = L.map(containerRef.current, {
        center: MAP_COORDS,
        zoom: MAP_ZOOM,
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTR,
        maxZoom: 19,
      }).addTo(map);

      // Custom marker using the location.png
      const icon = L.icon({
        iconUrl: SHOP_IMAGE,
        iconSize: [56, 56],
        iconAnchor: [28, 56],
        popupAnchor: [0, -56],
        className: "rounded-full drop-shadow-lg",
      });

      // Render the React popup into a detached host div so it can carry
      // its own state (modal open/close) without re-creating the Leaflet
      // popup on every interaction.
      const popupHost = document.createElement("div");
      popupHostRef.current = popupHost;
      const root = createRoot(popupHost);
      popupRootRef.current = root;
      root.render(<ShopMapPopup />);

      L.marker(MAP_COORDS, { icon })
        .addTo(map)
        .bindPopup(popupHost, { maxWidth: 260 });

      // Force a resize after mount to fix zero-height container issues
      setTimeout(() => {
        map.invalidateSize();
        setReady(true);
      }, 100);
    } catch (err) {
      console.error("[ShopMap] init failed", err);
      setTimeout(() => setFailed(true), 0);
    }

    return () => {
      // Unmount the React tree bound to the Leaflet popup. Deferred to the
      // next tick so we don't synchronously unmount during a render cycle
      // (which produces the "Attempted to synchronously unmount a root while
      // React was already rendering" warning).
      const root = popupRootRef.current;
      const host = popupHostRef.current;
      popupRootRef.current = null;
      popupHostRef.current = null;
      if (root) {
        setTimeout(() => {
          root.unmount();
          // Detach the host element from Leaflet's popup container.
          host?.parentNode?.removeChild(host);
        }, 0);
      }
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
      <div ref={containerRef} className="absolute inset-0" />
      {!ready && !failed && (
        <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
          Loading map…
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500 p-4 text-center">
          Map failed to load.{" "}
          <a
            href={googleMapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 underline ml-1"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}