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
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

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
    description:
      "iPad, Android tablets — screen, battery, charging, software.",
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
      className="bg-stone-50 border-t border-stone-200 py-12 md:py-16"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="Advanced solutions"
          title="Beyond the standard repair."
          lede="Box & dongle activations, schematics, credit services, and
          chip-level work for the hard cases. No job is too deep."
        />

        <ScrollReveal
          variant="scaleUp"
          amount={0.15}
          delay={0.2}
          className="mt-6"
        >
          <FeatureCarousel features={features} accentBg="#1a1d24" />
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

export default AdvancedSolutions;
