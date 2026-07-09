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
    tint: "#1f3a5f",
    description:
      "TSM, CM2, NCK, UMT, EFT Pro, Sigma, Chimera, Octoplus — all activations handled in-store.",
  },
  {
    id: "schematics",
    label: "Schematics",
    icon: Layers,
    image: "",
    tint: "#3a2f1a",
    description:
      "Borneo, ESTECH, ZXW, XinZhiZao, WUXINJI, JCID, DZJK — board-level reference for tricky repairs.",
  },
  {
    id: "credits",
    label: "Credits Service",
    icon: KeyRound,
    image: "",
    tint: "#5a3a1a",
    description:
      "Instant top-ups for Xiaomi Tool Pro, Z3X, Samkey, Chimera, TFM, UMT and many more.",
  },
  {
    id: "chip-level",
    label: "Chip-Level Repair",
    icon: CircuitBoard,
    image: "",
    tint: "#27201a",
    description:
      "Dead boot, short circuit, no display, water damage, motherboard, microsoldering.",
  },
  {
    id: "remote",
    label: "Remote Services",
    icon: Radio,
    image: "",
    tint: "#1a3a3f",
    description:
      "Remote unlock, FRP, FIN / support, and tool setup — anywhere in the Philippines.",
  },
  {
    id: "software",
    label: "Software Services",
    icon: Unlock,
    image: "",
    tint: "#2a1a4a",
    description:
      "iOS / Android / MI account, pattern / PIN / passcode, IMEI / baseband, network unlock, custom ROM.",
  },
  {
    id: "jtag-reball",
    label: "JTAG / Reball",
    icon: Wrench,
    image: "",
    tint: "#4a1a1a",
    description:
      "CPU reball, open-line, board-level micro-soldering for devices other shops turn away.",
  },
  {
    id: "console",
    label: "Console Repair",
    icon: Gamepad2,
    image: "",
    tint: "#1a4a2a",
    description:
      "PS5 / Xbox / Nintendo Switch — HDMI port, disc drive, power, overheating.",
  },
  {
    id: "tablet",
    label: "Tablet Repair",
    icon: Tablet,
    image: "",
    tint: "#2a2a4a",
    description: "iPad, Android tablets — screen, battery, charging, software.",
  },
  {
    id: "motherboard",
    label: "Motherboard Repair",
    icon: Layers,
    image: "",
    tint: "#3f1a3a",
    description:
      "Board-level diagnostics and component-level repair for phones, laptops, and consoles.",
  },
  {
    id: "openline",
    label: "OpenLine",
    icon: Lock,
    image: "",
    tint: "#1a2a3f",
    description:
      "Carrier unlock, network open-line service for any model and any carrier.",
  },
  {
    id: "microsoldering",
    label: "Microsoldering",
    icon: Zap,
    image: "",
    tint: "#5a4a1a",
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
