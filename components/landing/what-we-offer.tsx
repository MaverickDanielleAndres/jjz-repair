import { ArrowRight, Gamepad2, Laptop, Monitor, Smartphone, Wrench } from "lucide-react";
import {
  CELLPHONE_SERVICES,
  COMPUTER_SERVICES,
  LAPTOP_SERVICES,
} from "./site-data";
import { PlaceholderImage } from "./placeholder-image";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const cards = [
  {
    icon: Smartphone,
    title: "Cellphone Repair",
    summary: "Screen, battery, board-level, and software for every brand.",
    services: CELLPHONE_SERVICES,
    imageLabel: "Cellphone repair",
    imageVariant: "amber" as const,
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    summary: "No-power, screen, keyboard, OS — across all major brands.",
    services: LAPTOP_SERVICES,
    imageLabel: "Laptop repair",
    imageVariant: "slate" as const,
  },
  {
    icon: Monitor,
    title: "Computer Repair",
    summary: "Boot issues, virus removal, SSD upgrades, data recovery.",
    services: COMPUTER_SERVICES,
    imageLabel: "Computer repair",
    imageVariant: "dark" as const,
  },
];

export function WhatWeOffer() {
  return (
    <section className="bg-white border-t border-zinc-200 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Our services
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Three device categories. One trusted shop.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Whether it&apos;s a phone, laptop, or desktop — we diagnose, quote, and
            repair on the same visit whenever parts are in stock.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(
            ({ icon: Icon, title, summary, services, imageLabel, imageVariant }) => (
              <SpotlightCard
                key={title}
                className="!p-0 group flex flex-col overflow-hidden rounded-2xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all"
                spotlightColor="rgba(245, 158, 11, 0.18)"
              >
                <PlaceholderImage
                  label={imageLabel}
                  icon={Icon}
                  variant={imageVariant}
                  aspect="video"
                  className="rounded-none border-0 group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                    {summary}
                  </p>
                  <ul className="mt-5 space-y-1.5 text-sm text-zinc-700">
                    {services.slice(0, 5).map((s) => (
                      <li key={s.title} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#services"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700"
                  >
                    See all {services.length} services
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            ),
          )}
        </div>

        {/* Console & accessories strip */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-linear-to-r from-amber-50 to-amber-100/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-white border border-amber-200 text-amber-700 shrink-0">
            <Gamepad2 className="w-7 h-7" strokeWidth={1.8} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold">
              Also servicing
            </p>
            <h3 className="mt-1 text-lg md:text-xl font-bold text-zinc-900">
              Consoles & handhelds
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              PlayStation, Xbox, Nintendo, Steam Deck — HDMI ports, disc drives,
              power issues, overheating.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800"
          >
            <Wrench className="w-4 h-4" /> Inquire now
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhatWeOffer;
