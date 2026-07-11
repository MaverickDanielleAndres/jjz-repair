"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import StaggeredMenu, {
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem,
} from "@/components/ui/staggered-menu";
import { BRAND_NAME, NAV_ITEMS, SOCIAL_ITEMS } from "./site-data";

const navItems: StaggeredMenuItem[] = NAV_ITEMS.map((n) => ({
  label: n.label,
  ariaLabel: n.ariaLabel,
  link: n.href,
}));

const socialItems: StaggeredMenuSocialItem[] = SOCIAL_ITEMS.map((s) => ({
  label: s.label,
  link: s.href,
}));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerBarRef = useRef<HTMLDivElement>(null);

  // Slide the nav down from above on mount so the hero intro has a
  // matching first beat (nav from top, left from left, right from right).
  // Long duration + soft "expo.out" easing so it lands softly without
  // any visible "edgy" stop. Transform-only so the nav is never hidden
  // if GSAP is interrupted.
  //
  // useLayoutEffect (NOT useEffect) — runs synchronously during the
  // hydration commit, BEFORE the browser paints. Combined with the inline
  // `style={{ transform: 'translateY(-100px)' }}` on the bar below, this
  // eliminates the SSR → "visible at y:0" → "snap to y:-100" → "animate
  // down" flash. The bar is already at y:-100 on first paint, and GSAP
  // animates it down from there.
  useLayoutEffect(() => {
    if (!headerBarRef.current) return;
    // Promote the nav bar to its own composited layer for the duration
    // of the intro tween. Drop the hint when the tween finishes so we
    // don't keep an idle GPU layer around for the lifetime of the page.
    headerBarRef.current.style.willChange = "transform";
    const tween = gsap.fromTo(
      headerBarRef.current,
      { y: -100 },
      {
        y: 0,
        duration: 1.4,
        ease: "expo.out",
        onComplete: () => {
          if (headerBarRef.current) headerBarRef.current.style.willChange = "";
        },
      },
    );
    return () => {
      if (headerBarRef.current) headerBarRef.current.style.willChange = "";
      tween.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (typeof document === "undefined") return;
    document
      .querySelector<HTMLButtonElement>("[data-menu-toggle]")
      ?.click();
  };

  return (
    <>
      {/* Top bar — always visible nav links + hamburger. The inline
          `transform: translateY(-100px)` mirrors the GSAP `from` state so
          the bar is already off-screen on first paint; useLayoutEffect
          then animates it down smoothly. */}
      <div
        ref={headerBarRef}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ transform: "translateY(-100px)" }}
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-6 md:px-8 pt-2 md:pt-3">
          <div className="flex items-center justify-between gap-2 rounded-full border border-zinc-200 bg-white/90 backdrop-blur-md shadow-sm px-2 md:px-3 py-1.5 pointer-events-auto">
            {/* Logo + brand */}
            <a
              href="#home"
              className="flex items-center gap-1.5 shrink-0"
              aria-label={BRAND_NAME}
            >
              <Image
                src="/logo-nobg.png"
                alt={BRAND_NAME}
                width={36}
                height={36}
                className="h-7 w-7 md:h-8 md:w-8 object-contain"
                priority
              />
              <span className="hidden sm:inline font-display text-sm md:text-base font-bold text-zinc-900 tracking-tight">
                JJZ <span className="text-amber-500">TECH</span>
              </span>
            </a>

            {/* Center — JJZ REPAIR name on mobile/tablet, full nav on desktop */}
            <div className="flex-1 flex items-center justify-center md:justify-center">
              {/* Mobile + tablet: brand name fills the middle */}
              <span className="md:hidden font-display text-sm font-bold text-zinc-900 tracking-tight select-none">
                JJZ <span className="text-amber-500">REPAIR</span>
              </span>
              {/* Desktop: full nav links */}
              <nav
                className="hidden md:flex items-center gap-0.5"
                aria-label="Primary"
              >
                {NAV_ITEMS.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="px-2.5 py-1 rounded-full text-[13px] font-medium text-zinc-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right — Plus / X toggle (clicks the StaggeredMenu's internal button) */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center gap-1 h-8 md:h-9 px-2.5 md:px-3 rounded-full border border-zinc-200 bg-white text-zinc-900 text-[13px] font-semibold hover:bg-amber-50 hover:border-amber-300 transition-colors"
              suppressHydrationWarning
            >
              {menuOpen ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Staggered full-screen menu overlay — header (logo + toggle) hidden */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <StaggeredMenu
          className="jjz-staggered-menu--no-header"
          position="right"
          items={navItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          logoUrl="/logo-nobg.png"
          menuButtonColor="#0a0a0a"
          openMenuButtonColor="#0a0a0a"
          colors={["#f59e0b", "#fcd34d", "#fef3c7"]}
          accentColor="#f59e0b"
          changeMenuColorOnOpen
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
      </div>
    </>
  );
}

export default Header;
