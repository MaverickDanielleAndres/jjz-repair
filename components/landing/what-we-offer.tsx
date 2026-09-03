"use client";

import Image from "next/image";
import { ArrowRight, Gamepad2, Laptop, Monitor, Smartphone, Wrench } from "lucide-react";
import {
  CELLPHONE_SERVICES,
  COMPUTER_SERVICES,
  LAPTOP_SERVICES,
} from "./site-data";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

const cards = [
  {
    icon: Smartphone,
    title: "Cellphone Repair",
    summary: "Screen, battery, board-level, and software for every brand.",
    services: CELLPHONE_SERVICES,
    imageLabel: "Cellphone repair",
    imageSrc: "/cellphonerepair.jpg",
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    summary: "No-power, screen, keyboard, OS — across all major brands.",
    services: LAPTOP_SERVICES,
    imageLabel: "Laptop repair",
    imageSrc: "/laptoprepair.jpeg",
  },
  {
    icon: Monitor,
    title: "Desktop Work",
    summary: "Boot issues, virus removal, SSD upgrades, data recovery.",
    services: COMPUTER_SERVICES,
    imageLabel: "Desktop work",
    imageSrc: "/computerrepair.png",
  },
];

export function WhatWeOffer() {
  return (
    <section className="bg-white border-t border-zinc-200 py-12 md:py-16 overflow-hidden">
      <SectionContainer>
        <SectionHeader
          eyebrow="Our services"
          title={<>Three device categories.<br className="hidden sm:block" /> One trusted shop.</>}
          lede="Whether it's a phone, laptop, or desktop — we diagnose, quote, and repair on the same visit whenever parts are in stock."
        />

        <StaggerReveal
          amount={0.15}
          staggerDelay={0.12}
          className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-fr"
        >
          {cards.map(
            ({ icon: Icon, title, summary, services, imageLabel, imageSrc }, i) => (
              <StaggerItem
                key={title}
                variant={i === 0 ? "fadeLeft" : i === 1 ? "fadeUp" : "fadeRight"}
                className="flex"
              >
                <SpotlightCard
                  className="!p-0 group grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-amber-500/10 transition-all h-full w-full"
                  spotlightColor="rgba(245, 158, 11, 0.18)"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                    <Image
                      src={imageSrc}
                      alt={imageLabel}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 grid grid-rows-[auto_auto_1fr_auto] gap-0 h-full">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 shrink-0">
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                      {summary}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-zinc-700">
                      {services.slice(0, 5).map((s) => (
                        <li key={s.title} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          {s.title}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 flex items-end">
                      <a
                        href="#services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
                      >
                        See all {services.length} services
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ),
          )}
        </StaggerReveal>

        {/* Console & accessories strip */}
        <ScrollReveal
          variant="fadeUp"
          amount={0.4}
          delay={0.3}
          className="mt-6 rounded-xl border border-zinc-200 bg-linear-to-r from-amber-50 to-amber-100/50 p-4 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-4"
        >
          <div className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-white border border-amber-200 text-amber-700 shrink-0">
            <Gamepad2 className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
              Also servicing
            </p>
            <h3 className="mt-0.5 text-sm md:text-base font-bold text-zinc-900">
              Consoles & handhelds
            </h3>
            <p className="mt-0.5 text-xs text-zinc-600">
              PlayStation, Xbox, Nintendo, Steam Deck — HDMI ports, disc drives,
              power issues, overheating.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800"
          >
            <Wrench className="w-3 h-3" /> Inquire now
          </a>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

export default WhatWeOffer;
