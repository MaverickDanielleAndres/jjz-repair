"use client";

import {
  CircuitBoard,
  Cpu,
  Gamepad2,
  KeyRound,
  Layers,
  Lock,
  Radio,
  Tablet,
  Unlock,
  Wrench,
  Zap,
} from "lucide-react";
import {
  FeatureCarousel,
  type CarouselFeature,
} from "@/components/ui/feature-carousel";

const features: CarouselFeature[] = [
  {
    id: "box-dongle",
    label: "Box / Dongle Activation",
    icon: Cpu,
    image: "",
    description:
      "TSM, CM2, NCK, UMT, EFT Pro, Sigma, Chimera, Octoplus — all activations handled in-store.",
  },
  {
    id: "schematics",
    label: "Schematics",
    icon: Layers,
    image: "",
    description:
      "Borneo, ESTECH, ZXW, XinZhiZao, WUXINJI, JCID, DZJK — board-level reference for tricky repairs.",
  },
  {
    id: "credits",
    label: "Credits Service",
    icon: KeyRound,
    image: "",
    description:
      "Instant top-ups for Xiaomi Tool Pro, Z3X, Samkey, Chimera, TFM, UMT and many more.",
  },
  {
    id: "chip-level",
    label: "Chip-Level Repair",
    icon: CircuitBoard,
    image: "",
    description:
      "Dead boot, short circuit, no display, water damage, motherboard, microsoldering.",
  },
  {
    id: "remote",
    label: "Remote Services",
    icon: Radio,
    image: "",
    description:
      "Remote unlock, FRP, FIN / support, and tool setup — anywhere in the Philippines.",
  },
  {
    id: "software",
    label: "Software Services",
    icon: Unlock,
    image: "",
    description:
      "iOS / Android / MI account, pattern / PIN / passcode, IMEI / baseband, network unlock, custom ROM.",
  },
  {
    id: "jtag-reball",
    label: "JTAG / Reball",
    icon: Wrench,
    image: "",
    description:
      "CPU reball, open-line, board-level micro-soldering for devices other shops turn away.",
  },
  {
    id: "console",
    label: "Console Repair",
    icon: Gamepad2,
    image: "",
    description:
      "PS5 / Xbox / Nintendo Switch — HDMI port, disc drive, power, overheating.",
  },
  {
    id: "tablet",
    label: "Tablet Repair",
    icon: Tablet,
    image: "",
    description: "iPad, Android tablets — screen, battery, charging, software.",
  },
  {
    id: "motherboard",
    label: "Motherboard Repair",
    icon: Layers,
    image: "",
    description:
      "Board-level diagnostics and component-level repair for phones, laptops, and consoles.",
  },
  {
    id: "openline",
    label: "OpenLine",
    icon: Lock,
    image: "",
    description:
      "Carrier unlock, network open-line service for any model and any carrier.",
  },
  {
    id: "microsoldering",
    label: "Microsoldering",
    icon: Zap,
    image: "",
    description:
      "Component-level soldering under microscope for the jobs that need real precision.",
  },
];

export function AdvancedSolutions() {
  return (
    <section
      id="solutions"
      className="bg-white border-t border-zinc-200 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">
            Advanced solutions
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Beyond the standard repair.
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Box & dongle activations, schematics, credit services, and
            chip-level work for the hard cases. No job is too deep.
          </p>
        </div>

        <div className="mt-10">
          <FeatureCarousel features={features} accent="#27201a" />
        </div>
      </div>
    </section>
  );
}

export default AdvancedSolutions;
