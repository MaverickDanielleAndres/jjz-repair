"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
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

export default function ShopMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
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

      const popupHtml = `
        <div style="font-family: inherit;">
          <div style="position: relative; width: 100%; height: 120px; background: #f4f4f5;">
            <img src="${SHOP_IMAGE}" alt="${BRAND_NAME}" style="width:100%; height:100%; object-fit: cover;" />
          </div>
          <div style="padding: 12px 14px 14px;">
            <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0a0a0a;">${BRAND_NAME}</p>
            <p style="margin: 4px 0 10px; font-size: 12px; color: #52525b; line-height: 1.4;">${ADDRESS}</p>
            <a
              href="${googleMapsDirections}"
              target="_blank"
              rel="noopener noreferrer"
              style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px; background: #f59e0b; color: #0a0a0a; font-size: 12px; font-weight: 600; border-radius: 9999px; text-decoration: none;"
            >
              Get directions →
            </a>
          </div>
        </div>
      `;

      L.marker(MAP_COORDS, { icon })
        .addTo(map)
        .bindPopup(popupHtml, { maxWidth: 240 })
        .on("click", () => {
          // open on click; default behavior
        });

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
