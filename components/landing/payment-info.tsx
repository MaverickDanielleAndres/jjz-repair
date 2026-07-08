import {
  Banknote,
  CreditCard,
  Gift,
  Smartphone,
  Wallet,
} from "lucide-react";
import { PAYMENT_METHODS } from "./site-data";

const ICONS: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Cash: Banknote,
  GCash: Smartphone,
  Maya: Wallet,
  "Bank Transfer": CreditCard,
};

export function PaymentInfo() {
  return (
    <section className="bg-white border-t border-zinc-200 py-16 md:py-20">
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
            {PAYMENT_METHODS.map((m) => {
              const Icon = ICONS[m.name] ?? Banknote;
              return (
                <li
                  key={m.name}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-amber-300 transition-colors"
                >
                  <Icon
                    className="w-6 h-6 text-amber-600"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-zinc-800 text-center">
                    {m.name}
                  </span>
                </li>
              );
            })}
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
              Bring your gadget in — we’ll diagnose it for free, no
              obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentInfo;
