import { Gift } from "lucide-react";
import { PAYMENT_METHODS } from "./site-data";

export function PaymentInfo() {
  return (
    <section className="bg-amber-50/30 border-t border-amber-100/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
              Payment accepted
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
              Pay your way.
            </h2>
            <p className="mt-3 text-zinc-600 text-sm md:text-base leading-relaxed">
              Cash, e-wallets, or bank transfer. We also offer GCash Cash-In /
              Cash-Out in-store.
            </p>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PAYMENT_METHODS.map((m) => (
              <li
                key={m.name}
                className="flex flex-col items-stretch overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
              >
                <div
                  data-placeholder={`Paste ${m.name} logo here`}
                  className="relative w-full aspect-square"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, transparent 0 8px, rgba(245,158,11,0.05) 8px 16px)",
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-amber-900/60">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-7 h-7"
                      aria-hidden
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M3 16l4-4 3 3 5-5 4 4 5-5" />
                    </svg>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900/70">
                      Paste logo
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2 text-center border-t border-zinc-200">
                  <span className="text-sm font-semibold text-zinc-800">
                    {m.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Special offer banner */}
        <div className="mt-10 rounded-2xl bg-linear-to-r from-amber-400 to-amber-600 p-6 md:p-8 text-zinc-950 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-lg shadow-amber-500/20">
          <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white/30 shrink-0">
            <Gift className="w-6 h-6" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold opacity-80">
              Limited time
            </p>
            <p className="mt-1 text-lg md:text-xl font-bold">
              FREE check-up on all devices.
            </p>
            <p className="mt-1 text-sm opacity-80">
              Bring your gadget in — we&apos;ll diagnose it for free, no
              obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentInfo;
