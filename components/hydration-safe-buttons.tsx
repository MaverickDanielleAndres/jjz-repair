"use client";

import { useEffect } from "react";

/**
 * Strips browser-injected autofill detection attributes (`fdprocessedid`)
 * after hydration. Chromium and a number of password managers (LastPass,
 * 1Password, Dashlane) inject these onto interactive elements at runtime,
 * which causes a server/client HTML mismatch in React's hydration check.
 *
 * Strategy: run an inline pre-hydration sweep via a synchronous `<script>`
 * in the layout (see app/layout.tsx), plus a `MutationObserver` here that
 * watches the whole document for new attributes arriving after mount. This
 * component renders nothing.
 *
 * Place once near the root of the app (e.g. in the root layout's body).
 */
export function HydrationSafeButtons() {
  useEffect(() => {
    const ATTRS = [
      "fdprocessedid",
      // Other extension-injected attrs we've seen in the wild. Stripping
      // them is harmless — none of our app code reads them, and removing
      // them prevents hydration warnings from firing when they're added
      // by a content script after React has already hydrated.
      "data-extension-id",
      "data-lastpass-icon-added",
      "data-kwgh-uid",
      "data-form-type",
    ];

    const SELECTOR = ATTRS.map((a) => `[${a}]`).join(",");

    const strip = (root: ParentNode) => {
      const all = root.querySelectorAll(SELECTOR);
      all.forEach((el) => {
        ATTRS.forEach((a) => el.removeAttribute(a));
      });
    };

    // Run once on mount, then again on a microtask and a short delay —
    // Chromium may add the attribute a tick or two after the initial
    // hydration, especially on forms with autofill detection.
    strip(document);
    queueMicrotask(() => strip(document));
    const t = window.setTimeout(() => strip(document), 50);

    // Watch for any newly-added attribute so password managers that
    // inject attrs lazily (e.g. after a focus event) don't accumulate.
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes") {
          if (ATTRS.includes(m.attributeName ?? "")) {
            (m.target as Element).removeAttribute(m.attributeName ?? "");
          }
        } else if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1) strip(node as ParentNode);
          });
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ATTRS,
    });

    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return null;
}

export default HydrationSafeButtons;