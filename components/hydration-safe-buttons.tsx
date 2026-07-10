"use client";

import { useEffect } from "react";

/**
 * Strips browser-injected autofill detection attributes (`fdprocessedid`)
 * after hydration. Chromium adds these to interactive elements at runtime,
 * which causes a server/client HTML mismatch in React's hydration check.
 *
 * This component renders nothing — it just runs once on mount and walks
 * the DOM removing those attributes so the rendered tree stays in sync.
 *
 * Place once near the root of the app (e.g. in the root layout's body).
 */
export function HydrationSafeButtons() {
  useEffect(() => {
    const ATTRS = ["fdprocessedid"];
    const strip = () => {
      const all = document.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(","));
      all.forEach((el) => {
        ATTRS.forEach((a) => el.removeAttribute(a));
      });
    };
    // Run once on mount.
    strip();
    // Re-run on a microtask + a short delay — Chromium may add the
    // attribute a tick or two after the initial hydration.
    queueMicrotask(strip);
    const t = window.setTimeout(strip, 50);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}

export default HydrationSafeButtons;