"use client";

import { useEffect } from "react";

/**
 * Filters out noisy errors that come from browser extensions (MetaMask,
 * password managers, etc.) instead of our app. The MetaMask inpage.js
 * script gets injected into every page and tries to `connect()` itself,
 * which fails with "MetaMask extension not found" — that's not our bug.
 *
 * Suppressing these errors at the console layer keeps the dev console
 * focused on real app issues.
 */
export function SuppressExtensionErrors() {
  useEffect(() => {
    const isExtensionNoise = (...args: unknown[]): boolean => {
      const message = args
        .map((a) => {
          if (a instanceof Error) return a.stack ?? a.message;
          if (typeof a === "string") return a;
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");

      return (
        // MetaMask inpage.js self-connect failure
        /MetaMask extension not found/i.test(message) ||
        /Failed to connect to MetaMask/i.test(message) ||
        // 1Password, LastPass, etc. inject form-detection scripts
        /fdprocessedid/i.test(message) ||
        // Wallet / dApp connector probes
        /window\.ethereum/i.test(message) ||
        /ethereum\.request/i.test(message) ||
        // Generic extension-related rejections
        /chrome-extension:.*\binpage\.js/i.test(message) ||
        // Chrome runtime.lastError — emitted by the browser itself when a
        // content-script's chrome.runtime.connect / sendMessage has no
        // listener (very common with crypto wallets). We can't prevent them,
        // but we can stop them from polluting our console.
        /Unchecked runtime\.lastError/i.test(message) ||
        /Receiving end does not exist/i.test(message) ||
        // Content-script stream warnings — these come from injected scripts
        // that pile up EventEmitter listeners in the page context.
        /MaxListenersExceededWarning/i.test(message) ||
        /Resetting the streams/i.test(message)
      );
    };

    const originalError = console.error.bind(console);
    const originalWarn = console.warn.bind(console);
    const originalInfo = console.info.bind(console);
    const originalWindowError = window.onerror;

    console.error = (...args: unknown[]) => {
      if (isExtensionNoise(...args)) return;
      originalError(...args);
    };
    console.warn = (...args: unknown[]) => {
      if (isExtensionNoise(...args)) return;
      originalWarn(...args);
    };
    // MetaMask's inpage.js logs `Failed to connect to MetaMask` via
    // console.info — must be filtered or it leaks through as a console
    // message even though it's not technically an error.
    console.info = (...args: unknown[]) => {
      if (isExtensionNoise(...args)) return;
      originalInfo(...args);
    };

    window.onerror = (msg, src, lineno, colno, error) => {
      const text = `${msg ?? ""} ${src ?? ""}`;
      if (isExtensionNoise(text, error ?? "")) {
        return true; // suppress
      }
      if (typeof originalWindowError === "function") {
        return originalWindowError(msg, src, lineno, colno, error);
      }
      return false;
    };

    // Listen for the native `error` event too. Some browser extensions
    // dispatch errors as DOM events with a `filename` pointing at the
    // extension — `window.onerror` doesn't always fire for those.
    const onErrorEvent = (e: ErrorEvent) => {
      if (e?.filename && /chrome-extension:/.test(e.filename)) {
        e.preventDefault();
        e.stopImmediatePropagation?.();
      }
    };
    window.addEventListener("error", onErrorEvent, true);

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isExtensionNoise(event.reason)) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
      window.onerror = originalWindowError;
      window.removeEventListener("error", onErrorEvent, true);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}

export default SuppressExtensionErrors;