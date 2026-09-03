import Image from "next/image";
import { Gift } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer } from "./section-header";

type PaymentMethod = { name: string; image: string };

const PAYMENT_METHODS: PaymentMethod[] = [
  { name: "GCash", image: "/gcash.jpg" },
  { name: "Maya", image: "/maya.png" },
  { name: "Bank Transfer", image: "/transfer.png" },
  { name: "Cash", image: "/cash-payment.png" },
];

export function PaymentInfo() {
  return (
    <section className="bg-amber-50/30 border-t border-amber-100/40 py-12 md:py-16 jjz-defer overflow-hidden">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <ScrollReveal variant="fadeLeft" amount={0.4}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">
              Payment accepted
            </p>
            <h2 className="mt-2 font-display text-xl sm:text-2xl md:text-[1.6rem] font-bold tracking-tight text-zinc-900">
              Pay your way.
            </h2>
            <p className="mt-2 text-zinc-600 text-xs md:text-sm leading-relaxed">
              Cash, e-wallets, or bank transfer. We also offer GCash Cash-In /
              Cash-Out in-store.
            </p>
          </ScrollReveal>

          {/*
            Single row of 4 tiles on desktop (2x2 on mobile). Each tile
            is fixed at ~60px tall (`h-12` image area + label band) so
            the row stays compact regardless of column width.
          */}
          <StaggerReveal
            amount={0.2}
            staggerDelay={0.1}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {PAYMENT_METHODS.map((m) => (
              <StaggerItem
                key={m.name}
                variant="scaleIn"
                className="flex flex-col items-stretch overflow-hidden rounded-lg border border-zinc-200 bg-white hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-center h-12 px-2 bg-white">
                  <Image
                    src={m.image}
                    alt={`${m.name} payment logo`}
                    width={40}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <div className="px-2 py-1 text-center border-t border-zinc-200 bg-white">
                  <span className="text-[11px] font-semibold text-zinc-700">
                    {m.name}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        {/* Special offer banner */}
        <div className="mt-6 rounded-2xl bg-linear-to-r from-amber-400 to-amber-600 p-4 md:p-5 text-zinc-950 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-md shadow-amber-500/20">
          <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/30 shrink-0">
            <Gift className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-80">
              Limited time
            </p>
            <p className="mt-0.5 text-base md:text-lg font-bold">
              FREE check-up on all devices.
            </p>
            <p className="mt-0.5 text-xs opacity-80">
              Bring your gadget in — we'll diagnose it for free, no
              obligation.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default PaymentInfo;
