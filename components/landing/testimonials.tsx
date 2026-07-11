"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-marquee";
import { TESTIMONIALS } from "./site-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

const first = TESTIMONIALS.slice(0, 3);
const second = TESTIMONIALS.slice(3, 6);
const third = TESTIMONIALS.slice(6, 9);

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="bg-amber-50/30 border-t border-amber-100/50 py-12 md:py-16 overflow-hidden"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="Testimonials"
          title="Customers we've helped."
          lede="Real feedback from walk-in customers and Messenger inquiries — in
          English and Tagalog."
        />
      </SectionContainer>

      <ScrollReveal
        variant="fadeUp"
        amount={0.15}
        delay={0.15}
        className="mt-8 flex justify-center gap-3 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[520px] overflow-hidden"
      >
        <TestimonialsColumn testimonials={first} duration={18} />
        <TestimonialsColumn
          className="hidden md:block"
          testimonials={second}
          duration={22}
        />
        <TestimonialsColumn
          className="hidden lg:block"
          testimonials={third}
          duration={20}
        />
      </ScrollReveal>
    </section>
  );
}

export default Testimonials;
