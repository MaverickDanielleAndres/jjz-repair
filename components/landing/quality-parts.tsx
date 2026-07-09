import {
  Battery,
  CircuitBoard,
  Cpu,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PlaceholderImage } from "./placeholder-image";

const parts = [
  {
    icon: Sparkles,
    title: "Screens & LCDs",
    blurb: "OEM-grade replacements for every major brand — iPhone, Samsung, Xiaomi, more.",
    price: "From ₱1,200",
    imageLabel: "Screens & LCDs",
    imageVariant: "amber" as const,
  },
  {
    icon: Battery,
    title: "Batteries",
    blurb: "Genuine, calibrated cells with proper adhesive reseal.",
    price: "From ₱650",
    imageLabel: "Batteries",
    imageVariant: "slate" as const,
  },
  {
    icon: Plug,
    title: "Charging Ports",
    blurb: "Lightning, USB-C, micro-USB — board-level soldering.",
    price: "From ₱500",
    imageLabel: "Charging ports",
    imageVariant: "dark" as const,
  },
  {
    icon: CircuitBoard,
    title: "Motherboards",
    blurb: "Component-level repair, reball, microsoldering — for the hard cases.",
    price: "Quote on request",
    imageLabel: "Motherboards",
    imageVariant: "amber" as const,
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
    <section className="bg-amber-50/30 border-t border-amber-100/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
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
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {parts.map(
            ({
              icon: Icon,
              title,
              blurb,
              price,
              imageLabel,
              imageVariant,
            }) => (
              <article
                key={title}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10 transition-all"
              >
                <PlaceholderImage
                  label={imageLabel}
                  icon={Icon}
                  variant={imageVariant}
                  aspect="square"
                  className="rounded-none border-0"
                />
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
                  <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed flex-1">
                    {blurb}
                  </p>
                  <p className="mt-3 font-display text-lg font-bold text-amber-600">
                    {price}
                  </p>
                </div>
              </article>
            ),
          )}
        </div>

        {/* Guarantee strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {guarantees.map(({ icon: Icon, title, blurb }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QualityParts;
