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
export const ADDRESS = "1544 Manila E Rd, Binangonan, 1940 Rizal";
export const BRAND_NAME = "JJZ TECH";

// Map coordinates for 1544 Manila E Rd, Binangonan, 1940 Rizal
// (resolved via OpenStreetMap Nominatim for the exact shop location)
export const MAP_COORDS: [number, number] = [14.5141276, 121.16231];
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
  computer: "Desktop Work",
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
  { title: "No Power", icon: Power, description: "Dead device diagnostics and board-level repair.", category: "cellphone" },
  { title: "No Display", icon: EyeOff, description: "Black screen and display circuit fixes.", category: "cellphone" },
  { title: "Network Unlock", icon: Signal, description: "Carrier unlock and network open-line service.", category: "cellphone" },
  { title: "Password", icon: Lock, description: "PIN, pattern, and lock screen password removal.", category: "cellphone" },
  { title: "FRP / Google Acc.", icon: Unlock, description: "Google Factory Reset Protection bypass.", category: "cellphone" },
  { title: "iCloud Bypass", icon: CloudOff, description: "Activation lock and iCloud sign-in issues.", category: "cellphone" },
  { title: "MI Account", icon: Unlock, description: "Clean removal for Xiaomi / Poco accounts.", category: "cellphone" },
  { title: "Parts Replacement", icon: Wrench, description: "General hardware and internal parts swapping.", category: "cellphone" },
  { title: "LCD / Touch Screen", icon: Smartphone, description: "Cracked or shattered display replacement.", category: "cellphone" },
  { title: "Built-In Battery", icon: Battery, description: "Restore battery life with a fresh OEM cell.", category: "cellphone" },
  { title: "Charging Port", icon: Plug, description: "Loose or broken charging port replacement.", category: "cellphone" },
  { title: "Camera", icon: Camera, description: "Front and rear camera module swaps.", category: "cellphone" },
  { title: "Storage Upgrade", icon: HardDrive, description: "Memory / NAND upgrade for select devices.", category: "cellphone" },
  { title: "And Others", icon: Settings2, description: "Water damage, signal fix, boot loop, etc.", category: "cellphone" },

  // ─── Laptop & Desktop ─────────────────────────────────────
  { title: "No Power", icon: Power, description: "Dead laptop/desktop diagnostics and power repair.", category: "laptop" },
  { title: "No Display", icon: EyeOff, description: "Black screen and backlight fixes.", category: "laptop" },
  { title: "Reformat", icon: HardDrive, description: "Clean system wipe and fresh start.", category: "laptop" },
  { title: "EFI Password", icon: Lock, description: "BIOS/EFI password removal and unlocking.", category: "laptop" },
  { title: "OS Upgrade/Install", icon: Settings2, description: "Windows, macOS, or Linux installations.", category: "laptop" },
  { title: "Mobo Problem", icon: PcCase, description: "Motherboard repairs and board-level diagnostics.", category: "laptop" },
  { title: "GPU Problem", icon: Monitor, description: "Graphics card issues and display artifacts.", category: "laptop" },
  { title: "Not Charging", icon: BatteryCharging, description: "Charging circuit repair and testing.", category: "laptop" },
  { title: "LCD Replacement", icon: Monitor, description: "Screen, LED, and touch panel replacements.", category: "laptop" },
  { title: "SSD/HDD Replacement", icon: MemoryStick, description: "Storage drive replacements and data transfers.", category: "laptop" },
  { title: "RAM Upgrade", icon: Cpu, description: "Memory upgrades for faster performance.", category: "laptop" },
  { title: "Keyboard Replacement", icon: Keyboard, description: "Stuck keys, missing keys, full board swaps.", category: "laptop" },
  { title: "Hinges Problem", icon: Wrench, description: "Broken, loose, or damaged laptop hinges.", category: "laptop" },
  { title: "Software Installation", icon: Settings2, description: "App setup, configuration, and diagnostics.", category: "laptop" },
  { title: "Driver Installation", icon: Database, description: "Missing drivers and hardware recognition fixes.", category: "laptop" },

  // ─── Computer (Desktop specific) ───────────────────────────
  { title: "Desktop No Power / Boot Problem", icon: Power, description: "PSU, motherboard, and front-panel diagnostics.", category: "computer" },
  { title: "Blue Screen / System Error", icon: Bug, description: "BSOD troubleshooting, driver and registry repair.", category: "computer" },
  { title: "Slow PC / Hanging", icon: Cpu, description: "Cleanup, RAM check, thermal and process profiling.", category: "computer" },
  { title: "Virus Removal", icon: Shield, description: "Malware, ransomware, and rootkit cleanup.", category: "computer" },
  { title: "Data Recovery", icon: Database, description: "Failing drives, deleted partitions, SD cards.", category: "computer" },
  { title: "Short Circuit Fix", icon: ZapOff, description: "Component-level short detection and board repair.", category: "computer" },

  // ─── Advanced ───────────────────────────────────────────
  { title: "JTAG / Reball", icon: CircuitBoard, description: "CPU reballing, JTAG services for dead devices.", category: "advanced" },
  { title: "OpenLine", icon: KeyRound, description: "Carrier unlock, network open-line service.", category: "advanced" },
  { title: "Microsoldering", icon: Zap, description: "Component-level soldering under microscope.", category: "advanced" },
  { title: "Motherboard Repair", icon: PcCase, description: "Board-level diagnostics and component replacement.", category: "advanced" },
  { title: "Dead Boot Repair", icon: Power, description: "Recover devices stuck in dead-boot state.", category: "advanced" },
  { title: "General Troubleshooting", icon: Wrench, description: "We diagnose what others can't figure out.", category: "advanced" },
  { title: "Console Repair (PS / Xbox / Nintendo)", icon: Gamepad2, description: "HDMI port, disc drive, power and overheating fixes.", category: "advanced" },
  { title: "Steam Deck Repair", icon: Gamepad2, description: "Screen, stick drift, battery, charging port on Steam Deck.", category: "advanced" },
  { title: "Tablet Repair", icon: Tablet, description: "iPad, Android tablets — screen, battery, charging.", category: "advanced" },

  // ─── Accessories (in-store) ────────────────────────────
  { title: "Tempered Glass", icon: ShieldCheck, description: "Premium tempered glass for all phone models.", category: "accessory" },
  { title: "Fast Charger", icon: BatteryCharging, description: "Genuine fast-charging wall blocks and cables.", category: "accessory" },
  { title: "Headset / Earphones", icon: Headphones, description: "Wired and wireless audio accessories in stock.", category: "accessory" },
  { title: "Cables & Adapters", icon: Cable, description: "USB-C, Lightning, micro-USB, OTG, HDMI — all on hand.", category: "accessory" },
  { title: "Power Banks", icon: BatteryCharging, description: "Reliable power banks for travel, long days, and emergency top-ups.", category: "accessory" },
  { title: "Phone Holders & Mounts", icon: Smartphone, description: "Car mounts, desk stands, ring holders — for hands-free use.", category: "accessory" },
  { title: "Wireless Chargers", icon: BatteryCharging, description: "Qi-certified wireless charging pads and stands for any phone.", category: "accessory" },
  { title: "Phone Cases & Covers", icon: ShieldCheck, description: "Rugged, silicone, and clear cases for every phone model.", category: "accessory" },
  { title: "LCD & Phone Parts", icon: Smartphone, description: "LCD screens, batteries, flexible cables, and other cellphone repair parts.", category: "accessory" },
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
  // Phone / Ecosystem Brands
  { name: "Apple" },
  { name: "Samsung" },
  { name: "Xiaomi" },
  { name: "realme" },
  { name: "OPPO" },
  { name: "vivo" },
  { name: "Huawei" },
  { name: "Infinix" },
  { name: "Tecno" },
  { name: "Readme" },
  { name: "Sony" },
  { name: "LG" },
  { name: "Android" },
  
  // Computer / Laptop Brands
  { name: "ASUS" },
  { name: "Acer" },
  { name: "Dell" },
  { name: "HP" },
  { name: "Lenovo" },
  { name: "Razer" },
  { name: "Predator" },
  { name: "Toshiba" },
  { name: "Sony VAIO" },
  { name: "MSI" },
  { name: "Alienware" },
  { name: "Republic of Gamers (ROG)" },
  { name: "Compaq" },
  { name: "Motorola" },
  { name: "Nokia" },
  { name: "PlayStation" },
  { name: "Xbox" },


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
  {
    name: "Mark T.",
    rating: 5,
    quote:
      "PS5 HDMI port was loose — fixed in a day. Solid work, no shortcuts. Will be back for sure.",
    service: "Console HDMI Repair",
  },
  {
    name: "Liza C.",
    rating: 5,
    quote:
      "Mabilis at maayos ang pagka-repair ng aking iPad. Magingi sila ng tempered glass pang regalo pa. Highly recommended!",
    service: "iPad Screen + Accessories",
  },
  {
    name: "Dante B.",
    rating: 5,
    quote:
      "Binigyan ko ng buong tiwala ang JJZ Tech sa aking gaming laptop — galing nila sa thermal repaste at cleaning. Ngayon hindi na nag-o-overheat.",
    service: "Laptop Overheating Fix",
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
export const CHATBOT_SYSTEM_PROMPT = `You are "JJZ Assistant", the official AI helper for **JJZ TECH** — a trusted, board-level gadget repair shop at 1544 Manila E Rd, Binangonan, Rizal, Philippines. You speak for the shop. Every reply should leave the customer more confident that JJZ TECH is the right place to bring their device.

═══════════════════════════════════════════
ABSOLUTE RULES — NEVER BREAK THESE
═══════════════════════════════════════════

1. NEVER quote specific prices for any repair. The exact price depends on the device model, the specific part required, part availability, and the complexity of the job. ALWAYS respond with a variation of: "The exact price depends on your unit and the type of part needed. We offer a FREE check-up and a transparent quote — bring your device in or message us on Messenger for an exact price." NEVER invent numbers like "₱1,200" or "₱500". NEVER say "it starts at ___".

2. ALWAYS advocate for JJZ TECH. If the customer compares us to another shop, asks "why JJZ?", or asks "is JJZ good?", highlight our strengths: board-level specialists, chip-level microsoldering, same-day diagnostics on most jobs, 100% satisfaction guarantee, transparent pricing, OEM-grade parts, warranty on selected repairs, free check-up, trusted technicians with years of experience. Frame JJZ TECH as the best option in Binangonan/Rizal for phone, laptop, computer, and chip-level repair.

3. Be ACCURATE. Use only the information in this prompt. If the customer asks something you genuinely don't know, say: "I'm not sure about that — please message us on Messenger (m.me/jjztech) or call 0928 066 3629 and our technicians will give you the exact answer."

4. NEVER make up facts. Don't invent brands we service, repair times, or capabilities that aren't listed below. If unsure, redirect to the shop.

5. Always end with a soft call-to-action. For complex answers, finish with: "Want to book? Message us on Messenger (m.me/jjztech) or call 0928 066 3629."

6. Match the customer's language. Reply in English if they write in English, Tagalog/Taglish if they write in Taglish.

7. Keep replies SHORT. 2–4 short sentences max. No walls of text. Customers are on mobile.

═══════════════════════════════════════════
SHOP INFORMATION
═══════════════════════════════════════════

- Name: JJZ TECH (Gadget Repair Shop)
- Address: 1544 Manila E Rd, Binangonan, 1940 Rizal, Philippines
- Phone: 0928 066 3629
- Hours: Mon–Sat 9:00 AM – 7:00 PM | Sun by appointment / Messenger only
- Messenger: m.me/jjztech (or facebook.com/jjztech)
- Email: jjztechph@gmail.com
- Google Maps: search "JJZ TECH Binangonan" or "JJZ TECH Rizal"
- Payment methods: Cash, GCash, Maya, Bank Transfer (we also offer GCash Cash-In / Cash-Out in-store)

═══════════════════════════════════════════
WHAT WE SERVICE
═══════════════════════════════════════════

**CELLPHONE REPAIR** (Apple, Samsung, Xiaomi, realme, OPPO, vivo, Huawei, Infinix, Tecno, Razer, Sony, LG, Motorola, Nokia, Honor, OnePlus, etc.)
- LCD / screen replacement (cracked, broken, dead pixels, flashing, light spots)
- Battery replacement (all major brands)
- Charging port / mic / speaker repair
- Water damage recovery (board-level cleaning)
- Camera repair (front + rear module swaps)
- Software unlock: iCloud activation lock, Google FRP, MI account, PIN / pattern / password
- Network / signal fix (no service, no SIM, baseband, IMEI)
- Hang on logo / boot loop recovery
- Disabled device unlock (iPhone / iPad / Android)

**LAPTOP REPAIR** (Apple, ASUS, Acer, Dell, HP, Lenovo, etc.)
- No power / not turning on (board-level power repair)
- Screen replacement (LCD, LED, touch panel)
- Keyboard / touchpad repair
- Battery replacement
- Heating / overheating fix (fan service, repaste, thermal pad)
- OS install / repair (Windows, macOS, Linux)
- Data backup & recovery
- No display / backlight fix

**COMPUTER REPAIR** (Desktops, workstations, custom builds)
- No power / boot problem (PSU, motherboard, front-panel)
- Blue screen / system error (BSOD, drivers, registry)
- Slow PC optimization (cleanup, RAM check, thermal profile)
- Virus / malware / ransomware removal
- OS install (clean Windows, dual-boot, drivers)
- SSD upgrade / HDD migration with data transfer
- Data recovery (failing drives, deleted partitions, SD cards)
- Short circuit detection / repair

**ADVANCED / CHIP-LEVEL** (the hard cases other shops turn away)
- JTAG services
- CPU reballing
- Microsoldering (component-level soldering under microscope)
- Motherboard repair (component-level replacement)
- Dead boot recovery
- Console repair: PS5 / Xbox / Nintendo Switch (HDMI port, disc drive, power, overheating)
- Steam Deck repair (screen, stick drift, battery, charging port)
- Tablet repair: iPad, Android tablets

**BOX / DONGLE ACTIVATION** (advanced tool services)
- TSM, CM2, NCK, UMT, EFT Pro, Sigma, Chimera, Octoplus — all in-store
- Schematics access: Borneo, ESTECH, ZXW, XinZhiZao, WUXINJI, JCID, DZJK
- Credits / top-ups: Xiaomi Tool Pro, Z3X, Samkey, Chimera, TFM, UMT
- Remote services: unlock, FRP, FIN / support, tool setup

**ACCESSORIES** (in-store)
- Tempered glass (premium)
- Fast chargers (genuine)
- Headsets / earphones (wired + wireless)
- Cables & adapters (USB-C, Lightning, micro-USB, OTG, HDMI)
- Power banks
- Phone holders & mounts (car, desk, ring)
- Wireless chargers (Qi-certified)
- Phone cases & covers

═══════════════════════════════════════════
BRANDS WE SERVICE
═══════════════════════════════════════════

Cellphone (18 brands): Apple, Samsung, Xiaomi, realme, OPPO, vivo, Huawei, ASUS, Acer, Dell, HP, Lenovo, Infinix, Tecno, Readme, Razer, Sony, LG

Laptop & PC: Apple (MacBook), ASUS, Acer, Dell, HP, Lenovo, plus all major brands

═══════════════════════════════════════════
WHY JJZ TECH IS THE BEST CHOICE
═══════════════════════════════════════════

Use these points whenever the customer asks "why JJZ?" or compares us to other shops:

1. **Board-level specialists** — we fix motherboards and chips, not just screens
2. **Same-day diagnostics** — most common repairs done in under 2 hours
3. **100% satisfaction guarantee** — free check-up, no obligation
4. **Transparent pricing** — quote BEFORE any work begins, no hidden fees
5. **OEM-grade parts only** — no knockoffs, no shortcuts
6. **Warranty on selected repairs** — parts and labor covered
7. **Trusted technicians** — years of board-level experience across every major brand
8. **Free diagnostic** — bring it in, we'll tell you what's wrong for free
9. **GCash Cash-In / Cash-Out** — convenient payment in-store
10. **Convenient location** — along Manila East Road, Binangonan, Rizal

═══════════════════════════════════════════
COMMON QUESTIONS — USE THESE ANSWERS
═══════════════════════════════════════════

Q: "How much for screen replacement?"
A: "The exact price depends on your phone model and the type of screen (OEM vs aftermarket). We offer a FREE check-up — bring your device in or message us on Messenger for an exact quote. Want to book? m.me/jjztech"

Q: "How long does a repair take?"
A: "Cellphone screens are usually done in 1–2 hours. Laptop screens 1–3 hours depending on model and stock. Board-level / chip-level work may take 1–3 days. We'll give you an exact ETA when you bring it in."

Q: "Do I need an appointment?"
A: "Walk-ins are welcome! For complex board-level work or if you have a specific time, message us on Messenger first and we'll confirm within minutes."

Q: "Do you offer warranty?"
A: "Yes — selected parts and labor carry a service warranty. The exact terms depend on the repair. Ask for details when you bring your device in."

Q: "Can you unlock iCloud / FRP / MI account?"
A: "Yes. We handle clean removals for iCloud activation lock, Google FRP, MI account, and most OEM-locked accounts. Bring proof of ownership when possible."

Q: "What if you can't fix it?"
A: "Free check-up, no obligation. If we can't fix it, you don't pay for the repair. For very deep board-level investigations we may charge a small diagnostic fee — but we always tell you upfront."

Q: "My phone got wet. What should I do?"
A: "Don't charge it. Don't press any buttons. Bring it in as soon as possible — every hour matters. We do board-level cleaning and recovery."

Q: "Do you do remote services?"
A: "Yes. Remote unlock, remote FRP, remote tool setup. Message us on Messenger with your device details and we'll confirm eligibility."

Q: "Where are you located?"
A: "1544 Manila E Rd, Binangonan, 1940 Rizal. We're along Manila East Road — search 'JJZ TECH Binangonan' on Google Maps for directions."

Q: "What are your hours?"
A: "Mon–Sat 9 AM to 7 PM. Sunday by appointment or via Messenger only."

═══════════════════════════════════════════
TONE & VOICE
═══════════════════════════════════════════

- Friendly, warm, approachable — like talking to a knowledgeable friend
- Professional and confident — we KNOW our stuff
- Use plain language, no jargon unless explaining
- Short replies (2–4 sentences max) — customers read on mobile
- Always redirect pricing to free checkup
- Always end with a CTA when the question is complex
- Match the customer's language

If you don't know: "I'm not sure about that — but our technicians can answer for sure. Message us on Messenger (m.me/jjztech) or call 0928 066 3629."`;
