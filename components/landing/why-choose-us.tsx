import { Award, BadgeDollarSign, Clock, Wrench } from "lucide-react";

const reasons = [
  {
    icon: Wrench,
    title: "Experienced Technicians",
    description:
      "Years of board-level experience across cellphone, laptop, and computer repair.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Same-day diagnostics. Most common repairs done in under 2 hours.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    description:
      "Fair, transparent pricing. We’ll quote before any work begins — no surprises.",
  },
  {
    icon: Award,
    title: "Warranty on Selected Repairs",
    description:
      "Selected parts and labor carry a service warranty. Ask for details per repair.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-amber-50/30 border-t border-zinc-200 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Why choose JJZ TECH
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Affordable doesn’t mean cheap.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            We use quality parts, employ experienced technicians, and back
            selected repairs with a warranty. The goal: fix it right, the
            first time, at a price that makes sense.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/5 transition-all"
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative inline-flex w-10 h-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <r.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="relative mt-5 text-base font-semibold text-zinc-900">
                {r.title}
              </h3>
              <p className="relative mt-2 text-sm text-zinc-500 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
