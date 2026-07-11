"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Quote } from "lucide-react";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-marquee";
import { TESTIMONIALS } from "./site-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

const first = TESTIMONIALS.slice(0, 3);
const second = TESTIMONIALS.slice(3, 6);
const third = TESTIMONIALS.slice(6, 9);

export function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

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
        className="mt-8 relative [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[520px] overflow-hidden"
      >
        {/* Desktop / Tablet view: Multiple columns */}
        <div className="hidden md:flex justify-center gap-3 w-full">
          <TestimonialsColumn testimonials={first} duration={18} onTestimonialClick={setSelectedTestimonial} />
          <TestimonialsColumn
            testimonials={second}
            duration={22}
            onTestimonialClick={setSelectedTestimonial}
          />
          <TestimonialsColumn
            className="hidden lg:block"
            testimonials={third}
            duration={20}
            onTestimonialClick={setSelectedTestimonial}
          />
        </div>

        {/* Mobile view: 1 column containing ALL testimonials moving much faster */}
        <div className="flex md:hidden justify-center w-full">
          <TestimonialsColumn 
            testimonials={TESTIMONIALS} 
            duration={35} 
            onTestimonialClick={setSelectedTestimonial} 
          />
        </div>
      </ScrollReveal>

      {/* Modal for enlarged testimonial */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl z-10 mx-auto max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-amber-500/30" />
                <span className="text-amber-400 text-lg tracking-widest">
                  {"★".repeat(Math.round(selectedTestimonial.rating))}
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-zinc-800 leading-relaxed font-medium mb-8">
                “{selectedTestimonial.quote}”
              </p>
              
              <div className="mt-4">
                <p className="text-base font-bold text-zinc-900">
                  {selectedTestimonial.name}
                </p>
                <p className="text-sm text-zinc-500 mt-0.5">
                  {selectedTestimonial.service}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Testimonials;
