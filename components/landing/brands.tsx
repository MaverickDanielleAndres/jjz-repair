"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { ScrollReveal, StaggerReveal } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";
import { SUPPORTED_BRANDS } from "./site-data";

export function Brands() {
  // Build logo descriptors for the LogoCloud. The component tries
  // `<slug>.svg / .png / .webp / .jpg` in `/public/brands/` and falls back
  // to a typographic placeholder, so a missing file won't break the page.
  const logos = SUPPORTED_BRANDS.map((brand) => ({
    src: `/brands/${encodeURIComponent(brand.name.toLowerCase())}.svg?v=2`,
    alt: `${brand.name} logo`,
  }));

  return (
    <section className="bg-stone-100/70 border-y border-stone-200 py-8 md:py-10 overflow-hidden">
      <SectionContainer>
        <ScrollReveal
          variant="fadeUp"
          amount={0.5}
          className="text-center text-[11px] md:text-xs uppercase tracking-[0.22em] text-amber-700 font-semibold"
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
            duration={(size) => (size < 640 ? 36 : size < 1024 ? 48 : 64)}
            durationOnHover={(size) =>
              size < 640 ? 72 : size < 1024 ? 92 : 120
            }
          >
            {SUPPORTED_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center min-w-[110px] h-9 px-4"
              >
                <span className="text-zinc-800 font-bold text-sm md:text-base tracking-tight whitespace-nowrap select-none hover:text-amber-700 transition-colors">
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
          className="mt-3 md:mt-4"
        >
          <LogoCloud logos={logos} />
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

export default Brands;
