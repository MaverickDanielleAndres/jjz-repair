"use client";

import Image from "next/image";
import {
  Battery,
  CircuitBoard,
  Cpu,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";

const parts = [
  {
    icon: Sparkles,
    title: "Screens & LCDs",
    blurb: "OEM-grade replacements for every major brand — iPhone, Samsung, Xiaomi, more.",
    price: "Affordable pricing",
    imageLabel: "Screens & LCDs",
    imageSrc: "/screenlcd.jpg",
  },
  {
    icon: Battery,
    title: "Batteries",
    blurb: "Genuine, calibrated cells with proper adhesive reseal.",
    price: "Affordable pricing",
    imageLabel: "Batteries",
    imageSrc: "/batteries.jpg",
  },
  {
    icon: Plug,
    title: "Charging Ports",
    blurb: "Lightning, USB-C, micro-USB — board-level soldering.",
    price: "Affordable pricing",
    imageLabel: "Charging ports",
    imageSrc: "/charginports.png",
  },
  {
    icon: CircuitBoard,
    title: "Motherboards",
    blurb: "Component-level repair, reball, microsoldering — for the hard cases.",
    price: "Affordable pricing",
    imageLabel: "Motherboards",
    imageSrc: "/motherboards.jpg",
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Quality parts only",
    blurb: "OEM-grade components on every repair — no knockoffs.",
  },
  {
    icon: Cpu,
    title: "Trusted technicians",
    blurb: "Years of board-level experience across every major brand.",
  },
];

export function QualityParts() {
  return (
    <section className="bg-amber-50/30 border-t border-amber-100/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal
          variant="fadeUp"
          amount={0.4}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Our finest parts
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            We use quality parts.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Screens, batteries, charging ports, and motherboards — sourced
            from trusted suppliers, backed by a parts warranty.
          </p>
        </ScrollReveal>

        <StaggerReveal
          amount={0.15}
          staggerDelay={0.1}
          className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {parts.map(
            ({ icon: Icon, title, blurb, price, imageLabel, imageSrc }, i) => (
              <StaggerItem
                key={title}
                variant={i % 2 === 0 ? "scaleIn" : "fadeUp"}
                className="h-full"
              >
                <SpotlightCard
                  className="!p-0 group flex flex-col overflow-hidden hover:shadow-xl hover:shadow-amber-500/10 transition-all h-full"
                  spotlightColor="rgba(245, 158, 11, 0.18)"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-zinc-900">
                    <Image
                      src={imageSrc}
                      alt={imageLabel}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                        Premium
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-zinc-900">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed flex-1">
                      {blurb}
                    </p>
                    <p className="mt-3 font-display text-base font-bold text-amber-600">
                      {price}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ),
          )}
        </StaggerReveal>

        {/* Guarantee strip */}
        <StaggerReveal
          amount={0.3}
          staggerDelay={0.15}
          delay={0.3}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4"
        >
          {guarantees.map(({ icon: Icon, title, blurb }) => (
            <StaggerItem key={title} variant="fadeUp">
              <SpotlightCard
                className="!p-5 flex items-start gap-4 hover:shadow-md hover:shadow-amber-500/5 transition-all"
                spotlightColor="rgba(245, 158, 11, 0.18)"
              >
                <div className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">{blurb}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

export default QualityParts;