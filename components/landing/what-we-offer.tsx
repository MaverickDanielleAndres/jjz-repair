import { Laptop, Monitor, Smartphone } from "lucide-react";
import {
  CELLPHONE_SERVICES,
  LAPTOP_SERVICES,
  COMPUTER_SERVICES,
} from "./site-data";

const cards = [
  {
    icon: Smartphone,
    title: "Cellphone Repair",
    summary: "Screen, battery, board-level, and software for every brand.",
    services: CELLPHONE_SERVICES,
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    summary: "No-power, screen, keyboard, OS — across all major brands.",
    services: LAPTOP_SERVICES,
  },
  {
    icon: Monitor,
    title: "Computer Repair",
    summary: "Boot issues, virus removal, SSD upgrades, data recovery.",
    services: COMPUTER_SERVICES,
  },
];

export function WhatWeOffer() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            What we offer
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Three device categories. One trusted shop.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Whether it’s a phone, laptop, or desktop — we diagnose, quote, and
            repair on the same visit whenever parts are in stock.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, summary, services }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-7 flex flex-col hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/5 transition-all"
            >
              <div className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                {title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
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
                className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                See all {services.length} services →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeOffer;
