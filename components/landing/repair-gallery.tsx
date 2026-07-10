import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { GALLERY_IMAGES } from "./site-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function RepairGallery() {
  return (
    <section
      id="gallery"
      className="bg-stone-50 text-zinc-900 border-t border-stone-200"
    >
      <ScrollReveal
        variant="scaleUp"
        amount={0.3}
        className="relative pt-20 md:pt-28 pb-6 text-center px-6"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
          Repair gallery
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
          A look inside the shop.
        </h2>
        <p className="mt-4 text-zinc-600 max-w-xl mx-auto leading-relaxed">
          From cracked screens to board-level work — see the kinds of repairs
          we do every day. Scroll through.
        </p>
      </ScrollReveal>

      <ScrollReveal variant="fade" amount={0.1} delay={0.15}>
        <ZoomParallax images={GALLERY_IMAGES} />
      </ScrollReveal>

      <div className="h-24 md:h-32 bg-white" aria-hidden />
    </section>
  );
}

export default RepairGallery;
