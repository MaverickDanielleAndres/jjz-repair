import {
  Battery,
  Camera,
  CircuitBoard,
  Cpu,
  Database,
  Droplets,
  EyeOff,
  Headphones,
  KeyRound,
  Keyboard,
  type LucideIcon,
  Lock,
  MemoryStick,
  MicVocal,
  Monitor,
  PcCase,
  Phone,
  Plug,
  Power,
  RotateCcw,
  ScanLine,
  Settings2,
  Shield,
  ShieldCheck,
  Signal,
  Smartphone,
  Sparkles,
  Thermometer,
  Unlock,
  Usb,
  Wifi,
  Wrench,
  Zap,
  ZapOff,
  Bug,
  Cable,
  Cctv,
  Gamepad2,
  HardDrive,
  HardDriveDownload,
  Tablet,
  Tv,
  Boxes,
  BatteryCharging,
  CloudOff,
  KeySquare,
  Router,
  ShoppingBag,
  type Icon as LucideIconType,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// Contact + identity
// ─────────────────────────────────────────────────────────────────────
export const MESSENGER_URL = "https://m.me/jjztech";
export const PHONE_DISPLAY = "0928 066 3629";
export const PHONE_TEL = "+639280663629";
export const EMAIL_TO = "jjztechph@gmail.com";
export const ADDRESS = "1544 Manila E Rd, Binangonan, Rizal";
export const BRAND_NAME = "JJZ TECH";

// Map coordinates for 1544 Manila E Rd, Binangonan, Rizal
// (resolved via OpenStreetMap Nominatim for the exact shop location)
export const MAP_COORDS: [number, number] = [14.5179341, 121.1587085];
export const MAP_ZOOM = 17;

// Social links — fill in real handles
export const FACEBOOK_URL = "https://facebook.com/jjztech";
export const INSTAGRAM_URL = "https://instagram.com/jjztech";
export const TIKTOK_URL = "https://tiktok.com/@jjztech";
export const MESSENGER_HANDLE_URL = MESSENGER_URL;

// ─────────────────────────────────────────────────────────────────────
// Services — comprehensive catalog matching belowheader.png + extras
// ─────────────────────────────────────────────────────────────────────
export type ServiceCategory =
  | "cellphone"
  | "laptop"
  | "computer"
  | "advanced"
  | "accessory";

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  cellphone: "Cellphone",
  laptop: "Laptop",
  computer: "Computer",
  advanced: "Advanced",
  accessory: "Accessories",
};

export type Service = {
  title: string;
  icon: LucideIcon;
  description: string;
  category: ServiceCategory;
  keywords?: string[];
};

export const EVERYTHING: Service[] = [
  // ─── Cellphone ─────────────────────────────────────────
  {
    title: "LCD / Screen Replacement",
    icon: Smartphone,
    description:
      "Cracked or shattered display? OEM-grade replacement, same-day turnaround on most models.",
    category: "cellphone",
    keywords: ["screen", "lcd", "display", "broken", "glass"],
  },
  {
    title: "Battery Replacement",
    icon: Battery,
    description: "Restore full-day battery life with a fresh OEM cell.",
    category: "cellphone",
    keywords: ["battery", "power", "drain"],
  },
  {
    title: "Charging Port / Mic / Speaker",
    icon: Plug,
    description: "Loose charging, muffled audio, dead mic — fixed.",
    category: "cellphone",
    keywords: ["charging", "port", "mic", "speaker", "audio"],
  },
  {
    title: "Water Damage",
    icon: Droplets,
    description:
      "Board-level cleaning and recovery for liquid-damaged devices.",
    category: "cellphone",
    keywords: ["water", "liquid", "wet", "submerged"],
  },
  {
    title: "Camera Repair",
    icon: Camera,
    description: "Front and rear camera module swaps and calibration.",
    category: "cellphone",
    keywords: ["camera", "lens"],
  },
  {
    title: "Software / Unlock / Bypass",
    icon: Unlock,
    description:
      "iCloud, FRP, pattern, PIN, MI account — clean removals on all models.",
    category: "cellphone",
    keywords: ["unlock", "bypass", "icloud", "frp", "google", "mi", "account"],
  },
  {
    title: "Network / Signal Fix",
    icon: Signal,
    description: "No-service, no-SIM, baseband and IMEI repair.",
    category: "cellphone",
    keywords: ["network", "signal", "imei", "baseband", "sim"],
  },
  {
    title: "Hang on Logo",
    icon: RotateCcw,
    description: "Boot-loop and stuck-on-logo recovery.",
    category: "cellphone",
    keywords: ["boot", "loop", "hang", "logo", "stuck"],
  },
  {
    title: "iPhone / iPad Disabled",
    icon: Lock,
    description: "Disabled-device unlock, activation lock support.",
    category: "cellphone",
    keywords: ["iphone", "ipad", "disabled", "locked"],
  },
  {
    title: "iCloud Issue",
    icon: CloudOff,
    description: "Activation lock, iCloud sign-in, Find My iPhone issues.",
    category: "cellphone",
    keywords: ["icloud", "apple", "find my", "activation"],
  },

  // ─── Laptop ─────────────────────────────────────────────
  {
    title: "No Power / Not Turning On",
    icon: Power,
    description: "Dead laptop diagnostics, board-level power repair.",
    category: "laptop",
    keywords: ["power", "dead", "turn on", "boot"],
  },
  {
    title: "Screen Replacement",
    icon: Monitor,
    description: "LCD, LED, and touch panel swaps for all major brands.",
    category: "laptop",
    keywords: ["screen", "lcd", "led", "display"],
  },
  {
    title: "Keyboard / Touchpad Repair",
    icon: Keyboard,
    description: "Stuck keys, missing keys, touchpad not responding.",
    category: "laptop",
    keywords: ["keyboard", "touchpad", "keys"],
  },
  {
    title: "Battery Replacement",
    icon: Battery,
    description: "Genuine battery cells with proper calibration.",
    category: "laptop",
  },
  {
    title: "Heating / Overheating Fix",
    icon: Thermometer,
    description: "Fan service, repaste, thermal pad replacement.",
    category: "laptop",
    keywords: ["heat", "hot", "fan", "thermal"],
  },
  {
    title: "OS Install / Windows Repair",
    icon: Settings2,
    description: "Clean Windows, macOS, Linux installs and boot repair.",
    category: "laptop",
    keywords: ["os", "windows", "macos", "linux", "install"],
  },
  {
    title: "Data Backup & Recovery",
    icon: HardDriveDownload,
    description: "Recover lost files, clone failing drives.",
    category: "laptop",
    keywords: ["data", "backup", "recovery", "files"],
  },
  {
    title: "No Display / Backlight Fix",
    icon: EyeOff,
    description: "Black screen, dim display, backlight circuit repair.",
    category: "laptop",
    keywords: ["display", "backlight", "black screen"],
  },

  // ─── Computer ───────────────────────────────────────────
  {
    title: "No Power / Boot Problem",
    icon: Power,
    description: "PSU, motherboard, and front-panel diagnostics.",
    category: "computer",
  },
  {
    title: "Blue Screen / System Error",
    icon: Bug,
    description: "BSOD troubleshooting, driver and registry repair.",
    category: "computer",
    keywords: ["bsod", "blue screen", "error", "crash"],
  },
  {
    title: "Slow PC / Hanging",
    icon: Cpu,
    description: "Cleanup, RAM check, thermal and process profiling.",
    category: "computer",
    keywords: ["slow", "lag", "hanging", "freeze"],
  },
  {
    title: "Virus Removal",
    icon: Shield,
    description: "Malware, ransomware, and rootkit cleanup.",
    category: "computer",
    keywords: ["virus", "malware", "ransomware"],
  },
  {
    title: "Format / OS Installation",
    icon: HardDrive,
    description: "Clean Windows install, dual-boot, driver setup.",
    category: "computer",
  },
  {
    title: "Hard Drive / SSD Upgrade",
    icon: MemoryStick,
    description: "NVMe / SATA SSD migration with data transfer.",
    category: "computer",
    keywords: ["ssd", "hdd", "upgrade", "storage"],
  },
  {
    title: "Data Recovery",
    icon: Database,
    description: "Failing drives, deleted partitions, SD cards.",
    category: "computer",
  },
  {
    title: "Short Circuit Fix",
    icon: ZapOff,
    description: "Component-level short detection and board repair.",
    category: "computer",
    keywords: ["short", "circuit", "smoke", "burnt"],
  },

  // ─── Advanced ───────────────────────────────────────────
  {
    title: "JTAG / Reball",
    icon: CircuitBoard,
    description: "CPU reballing, JTAG services for dead devices.",
    category: "advanced",
    keywords: ["jtag", "reball", "cpu", "chip"],
  },
  {
    title: "OpenLine",
    icon: KeyRound,
    description: "Carrier unlock, network open-line service.",
    category: "advanced",
  },
  {
    title: "Microsoldering",
    icon: Zap,
    description: "Component-level soldering under microscope.",
    category: "advanced",
    keywords: ["microsoldering", "solder", "board"],
  },
  {
    title: "Motherboard Repair",
    icon: PcCase,
    description: "Board-level diagnostics and component replacement.",
    category: "advanced",
    keywords: ["motherboard", "board", "logic"],
  },
  {
    title: "Dead Boot Repair",
    icon: Power,
    description: "Recover devices stuck in dead-boot state.",
    category: "advanced",
  },
  {
    title: "General Troubleshooting",
    icon: Wrench,
    description: "We diagnose what others can't figure out.",
    category: "advanced",
  },
  {
    title: "Console Repair (PS / Xbox / Nintendo)",
    icon: Gamepad2,
    description: "HDMI port, disc drive, power and overheating fixes.",
    category: "advanced",
    keywords: ["ps5", "ps4", "xbox", "nintendo", "switch", "console"],
  },
  {
    title: "Steam Deck Repair",
    icon: Gamepad2,
    description: "Screen, stick drift, battery, charging port on Steam Deck.",
    category: "advanced",
    keywords: ["steam", "deck", "valve"],
  },
  {
    title: "Tablet Repair",
    icon: Tablet,
    description: "iPad, Android tablets — screen, battery, charging.",
    category: "advanced",
    keywords: ["tablet", "ipad"],
  },

  // ─── Accessories (in-store) ────────────────────────────
  {
    title: "Tempered Glass",
    icon: ShieldCheck,
    description: "Premium tempered glass for all phone models.",
    category: "accessory",
  },
  {
    title: "Fast Charger",
    icon: BatteryCharging,
    description: "Genuine fast-charging wall blocks and cables.",
    category: "accessory",
    keywords: ["charger", "cable", "adapter"],
  },
  {
    title: "Headset / Earphones",
    icon: Headphones,
    description: "Wired and wireless audio accessories in stock.",
    category: "accessory",
  },
  {
    title: "Cables & Adapters",
    icon: Cable,
    description: "USB-C, Lightning, micro-USB, OTG, HDMI — all on hand.",
    category: "accessory",
  },
];

// Backwards-compatible flat lists used by the v1 sections.
export const CELLPHONE_SERVICES = EVERYTHING.filter(
  (s) => s.category === "cellphone",
);
export const LAPTOP_SERVICES = EVERYTHING.filter(
  (s) => s.category === "laptop",
);
export const COMPUTER_SERVICES = EVERYTHING.filter(
  (s) => s.category === "computer",
);
export const ALL_SERVICES = EVERYTHING;

// ─────────────────────────────────────────────────────────────────────
// Brands supported
// ─────────────────────────────────────────────────────────────────────
export type Brand = { name: string };

export const SUPPORTED_BRANDS: Brand[] = [
  { name: "Apple" },
  { name: "Samsung" },
  { name: "Xiaomi" },
  { name: "realme" },
  { name: "OPPO" },
  { name: "vivo" },
  { name: "Huawei" },
  { name: "ASUS" },
  { name: "Acer" },
  { name: "Dell" },
  { name: "HP" },
  { name: "Lenovo" },
  { name: "Infinix" },
];

// ─────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────
export type Testimonial = {
  name: string;
  rating: number;
  quote: string;
  service: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Maria S.",
    rating: 5,
    quote:
      "Brought my iPhone with a shattered screen — done in under 2 hours. Looks brand new.",
    service: "iPhone Screen Replacement",
  },
  {
    name: "Joshua R.",
    rating: 5,
    quote:
      "Laptop wouldn't turn on. JJZ diagnosed the motherboard issue the same day. Fair price, no surprises.",
    service: "Laptop Motherboard Repair",
  },
  {
    name: "Andrea P.",
    rating: 4.5,
    quote:
      "Unlocked my Xiaomi account in minutes. Quick, professional, and they explained everything.",
    service: "Mi Account Removal",
  },
  {
    name: "Carlos M.",
    rating: 5,
    quote:
      "Water-damaged phone — fully recovered. I thought it was dead. Saved all my photos.",
    service: "Water Damage Recovery",
  },
  {
    name: "Rina L.",
    rating: 5,
    quote:
      "Bought a tempered glass and a fast charger here. The tech even helped me set up my new phone.",
    service: "Accessories + Setup",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Payment methods
// ─────────────────────────────────────────────────────────────────────
export const PAYMENT_METHODS: { name: string }[] = [
  { name: "Cash" },
  { name: "GCash" },
  { name: "Maya" },
  { name: "Bank Transfer" },
];

// ─────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: "#home", ariaLabel: "Go to home" },
  { label: "Services", href: "#services", ariaLabel: "View our services" },
  {
    label: "Solutions",
    href: "#solutions",
    ariaLabel: "View advanced solutions",
  },
  { label: "Gallery", href: "#gallery", ariaLabel: "See repair gallery" },
  { label: "Reviews", href: "#reviews", ariaLabel: "Read customer reviews" },
  { label: "Location", href: "#location", ariaLabel: "Find our shop" },
  { label: "Contact", href: "#contact", ariaLabel: "Contact us" },
];

export const SOCIAL_ITEMS = [
  { label: "Facebook", href: FACEBOOK_URL },
  { label: "Messenger", href: MESSENGER_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "TikTok", href: TIKTOK_URL },
];

// ─────────────────────────────────────────────────────────────────────
// Gallery — real images in /public
// ─────────────────────────────────────────────────────────────────────
export const GALLERY_IMAGES: { src: string; alt: string }[] = [
  {
    src: "/gallery%20(1).png",
    alt: "Phone repair work — JJZ TECH",
  },
  {
    src: "/gallery%20(2).png",
    alt: "Phone repair work — JJZ TECH",
  },
  {
    src: "/gallery%20(3).png",
    alt: "Phone repair work — JJZ TECH",
  },
  {
    src: "/gallery%20(4).png",
    alt: "Phone repair work — JJZ TECH",
  },
  {
    src: "/gallery%20(5).png",
    alt: "Phone repair work — JJZ TECH",
  },
  {
    src: "/gallery%20(6).png",
    alt: "Phone repair work — JJZ TECH",
  },
  {
    src: "/gallery%20(7).png",
    alt: "Phone repair work — JJZ TECH",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Chatbot — system prompt for the Gemini assistant
// ─────────────────────────────────────────────────────────────────────
export const CHATBOT_SYSTEM_PROMPT = `You are JJZ Assistant, the helpful AI concierge for JJZ TECH — a gadget repair shop located at 1544 Manila E Rd, Binangonan, Rizal, Philippines.

Shop details:
- Address: 1544 Manila E Rd, Binangonan, Rizal
- Phone: 0928 066 3629
- Hours: Mon–Sat 9:00 AM – 7:00 PM, Sun by appointment
- Messenger: m.me/jjztech
- We service cellphone, laptop, computer, tablets, and gaming consoles

What we do:
- Cellphone: LCD/screen replacement, battery, charging port, water damage, camera, software unlock / iCloud / FRP / MI account, network / signal fix, hang on logo, iPhone / iPad disabled
- Laptop: no power, screen, keyboard/touchpad, battery, overheating, OS install (Windows / macOS / Linux), data backup, backlight
- Computer: no power, blue screen, slow PC, virus removal, format / OS install, SSD upgrade, data recovery, short circuit
- Advanced: JTAG, reball, microsoldering, motherboard repair, dead boot, console repair (PS5 / Xbox / Nintendo), Steam Deck
- Accessories: tempered glass, fast charger, headsets, cables

Why choose us:
- 100% satisfaction guaranteed
- Fast service (same-day on most jobs)
- Affordable prices with transparent quotes
- Quality parts (OEM-grade)
- Trusted technicians with years of experience
- Warranty on selected repairs

Tone: friendly, concise, professional. Reply in the same language the user uses. If the user asks for a price, give a rough range and recommend they message us on Messenger or call for an exact quote. Always end complex answers with a soft call to action: "Want to book? Message us on Messenger or call 0928 066 3629."`;
