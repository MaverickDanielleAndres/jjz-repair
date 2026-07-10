"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-marquee";
import { TESTIMONIALS } from "./site-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const first = TESTIMONIALS.slice(0, 3);
const second = TESTIMONIALS.slice(3, 6);
const third = TESTIMONIALS.slice(6, 9);

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="bg-amber-50/30 border-t border-amber-100/50 py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <ScrollReveal
          variant="fadeDown"
          amount={0.4}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Customers we&apos;ve helped.
          </h2>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Real feedback from walk-in customers and Messenger inquiries — in
            English and Tagalog.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal
        variant="fadeUp"
        amount={0.15}
        delay={0.15}
        className="mt-12 flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden"
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
