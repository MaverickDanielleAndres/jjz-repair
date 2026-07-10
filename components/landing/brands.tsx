"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { ScrollReveal, StaggerReveal } from "@/components/ui/scroll-reveal";
import { SUPPORTED_BRANDS } from "./site-data";

export function Brands() {
  // Build logo descriptors for the LogoCloud. The component tries
  // `<slug>.svg / .png / .webp / .jpg` in `/public/brands/` and falls back
  // to a typographic placeholder, so a missing file won't break the page.
  const logos = SUPPORTED_BRANDS.map((brand) => ({
    src: `/brands/${brand.name.toLowerCase()}.svg`,
    alt: `${brand.name} logo`,
  }));

  return (
    <section className="bg-stone-100/70 border-y border-stone-200 py-6 md:py-8">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal
          variant="fadeUp"
          amount={0.5}
          className="text-center text-xs md:text-sm uppercase tracking-[0.25em] text-amber-700 font-semibold"
        >
          We service all major brands
        </ScrollReveal>

        {/* Marquee — gives a sense of motion, only a few names visible at once.
            `duration` and `durationOnHover` are functions of the slider's
            measured size, so the marquee runs faster on phones/tablets
            (where the visible window is shorter) and slower on desktop. */}
        <ScrollReveal
          variant="fadeLeft"
          amount={0.2}
          delay={0.1}
          className="relative mt-3 md:mt-4"
        >
          <InfiniteSlider
            gap={40}
            duration={(size) => (size < 640 ? 18 : size < 1024 ? 24 : 32)}
            durationOnHover={(size) =>
              size < 640 ? 36 : size < 1024 ? 46 : 60
            }
          >
            {SUPPORTED_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center min-w-[110px] h-9 px-4"
              >
                <span className="text-zinc-800 font-bold text-base md:text-lg tracking-tight whitespace-nowrap select-none hover:text-amber-600 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </InfiniteSlider>
        </ScrollReveal>

        {/* LogoCloud — bento-style grid below the marquee with cross
            dividers, checkered backgrounds, and corner Plus icons.
            Powered by the SUPPORTED_BRANDS list; each logo resolves from
            /public/brands/<slug>.<ext>. Tighter gap on mobile/tablet so the
            section doesn't feel airy. */}
        <ScrollReveal
          variant="scaleUp"
          amount={0.15}
          delay={0.2}
          className="mt-2 md:mt-3"
        >
          <LogoCloud logos={logos} />
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Brands;