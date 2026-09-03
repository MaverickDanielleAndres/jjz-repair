import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { GALLERY_IMAGES } from "./site-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

export function RepairGallery() {
  return (
    <section
      id="gallery"
      className="bg-stone-50 text-zinc-900 border-t border-stone-200"
    >
      <SectionContainer>
        <ScrollReveal
          variant="scaleUp"
          amount={0.3}
          className="relative pt-12 md:pt-16 pb-4 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">
            Repair gallery
          </p>
          <h2 className="mt-2 font-display text-xl sm:text-2xl md:text-[1.6rem] lg:text-[1.75rem] font-bold tracking-tight">
            A look inside the shop.
          </h2>
          <p className="mt-2.5 text-zinc-600 max-w-md mx-auto leading-relaxed text-xs sm:text-sm">
            From cracked screens to board-level work — see the kinds of repairs
            we do every day. Scroll through.
          </p>
        </ScrollReveal>
      </SectionContainer>

      <ScrollReveal variant="fade" amount={0.1} delay={0.15}>
        <ZoomParallax images={GALLERY_IMAGES} />
      </ScrollReveal>

      <div className="h-16 md:h-20 bg-white" aria-hidden />
    </section>
  );
}

export default RepairGallery;
