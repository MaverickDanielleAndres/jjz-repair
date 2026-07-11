const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/landing/site-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace BRAND_NAME
content = content.replace('export const BRAND_NAME = "JJZ TECH";', 'export const BRAND_NAME = "JJZ-TECH";');

// Replace EVERYTHING array
const everythingNew = `export const EVERYTHING: Service[] = [
  // ─── Cellphone ─────────────────────────────────────────
  {
    title: "LCD / Touch Screen Replacement",
    icon: Smartphone,
    description: "Cracked or shattered display? OEM-grade replacement, same-day turnaround on most models.",
    category: "cellphone",
    keywords: ["screen", "lcd", "display", "broken", "glass", "touch screen", "lcd/touch screen", "parts replacement"],
  },
  {
    title: "Built-In Battery Replacement",
    icon: Battery,
    description: "Restore full-day battery life with a fresh OEM cell.",
    category: "cellphone",
    keywords: ["battery", "power", "drain", "built-in", "built-in battery", "parts replacement"],
  },
  {
    title: "Charging Port & Parts Replacement",
    icon: Plug,
    description: "Loose charging, dead mic, or other faulty parts — we replace them all.",
    category: "cellphone",
    keywords: ["charging", "port", "charging port", "mic", "speaker", "audio", "parts replacement"],
  },
  {
    title: "Water Damage",
    icon: Droplets,
    description: "Board-level cleaning and recovery for liquid-damaged devices.",
    category: "cellphone",
    keywords: ["water", "liquid", "wet", "submerged"],
  },
  {
    title: "Camera Repair",
    icon: Camera,
    description: "Front and rear camera module swaps and calibration.",
    category: "cellphone",
    keywords: ["camera", "lens", "parts replacement"],
  },
  {
    title: "Software / Password / Bypass",
    icon: Unlock,
    description: "FRP, Google Acc, iCloud bypass, MI account, pattern, PIN — clean removals on all models.",
    category: "cellphone",
    keywords: ["unlock", "bypass", "icloud", "icloud bypass", "frp", "google acc", "frp/google acc", "mi account", "password", "pin"],
  },
  {
    title: "Network Unlock / Signal Fix",
    icon: Signal,
    description: "No-service, network unlock, baseband and IMEI repair.",
    category: "cellphone",
    keywords: ["network", "network unlock", "signal", "imei", "baseband", "sim"],
  },
  {
    title: "Hang on Logo",
    icon: RotateCcw,
    description: "Boot-loop and stuck-on-logo recovery.",
    category: "cellphone",
    keywords: ["boot", "loop", "hang", "logo", "stuck"],
  },
  {
    title: "No Power / No Display (Phone)",
    icon: Power,
    description: "Dead device diagnostics, board-level repair, and black screen fixes.",
    category: "cellphone",
    keywords: ["no power", "no display", "dead", "black screen"],
  },
  {
    title: "iPhone / iPad Disabled",
    icon: Lock,
    description: "Disabled-device unlock, activation lock support.",
    category: "cellphone",
    keywords: ["iphone", "ipad", "disabled", "locked"],
  },
  {
    title: "Storage Upgrade",
    icon: HardDrive,
    description: "Upgrade internal memory for iPhones and select Androids.",
    category: "cellphone",
    keywords: ["storage", "storage upgrade", "memory", "nand"],
  },

  // ─── Laptop & Desktop ─────────────────────────────────────
  {
    title: "No Power / Not Turning On",
    icon: Power,
    description: "Dead laptop/desktop diagnostics, board-level power repair.",
    category: "laptop",
    keywords: ["no power", "dead", "turn on", "boot"],
  },
  {
    title: "No Display / GPU Problem",
    icon: EyeOff,
    description: "Black screen, backlight fix, GPU issues, and display circuit repair.",
    category: "laptop",
    keywords: ["no display", "backlight", "black screen", "gpu problem", "gpu", "graphics"],
  },
  {
    title: "LCD Replacement",
    icon: Monitor,
    description: "LCD, LED, and touch panel swaps for all major brands.",
    category: "laptop",
    keywords: ["screen", "lcd", "lcd replacement", "led", "display"],
  },
  {
    title: "Keyboard & Hinges Replacement",
    icon: Keyboard,
    description: "Stuck keys, missing keys, and broken laptop hinges.",
    category: "laptop",
    keywords: ["keyboard", "keyboard replacement", "hinges problem", "hinges", "touchpad", "keys"],
  },
  {
    title: "Not Charging / Battery Issue",
    icon: Battery,
    description: "Genuine battery replacements and charging circuit repair.",
    category: "laptop",
    keywords: ["battery", "not charging", "power"],
  },
  {
    title: "Heating / Overheating Fix",
    icon: Thermometer,
    description: "Fan service, repaste, thermal pad replacement.",
    category: "laptop",
    keywords: ["heat", "hot", "fan", "thermal"],
  },
  {
    title: "OS Upgrade / Reformat / Install",
    icon: Settings2,
    description: "Clean Windows, macOS installs, reformats, software and driver installation.",
    category: "laptop",
    keywords: ["os upgrade/install", "windows", "macos", "reformat", "software installation", "driver installation", "install"],
  },
  {
    title: "SSD/HDD & RAM Upgrade",
    icon: MemoryStick,
    description: "NVMe/SATA SSD replacements, RAM upgrades, and data transfers.",
    category: "laptop",
    keywords: ["ssd/hdd replacement", "ssd", "hdd", "ram upgrade", "ram", "storage", "memory"],
  },
  {
    title: "Mobo Problem / EFI Password",
    icon: PcCase,
    description: "Motherboard repairs, BIOS/EFI password removal, and board diagnostics.",
    category: "laptop",
    keywords: ["mobo problem", "mobo", "motherboard", "efi password", "efi", "bios", "locked"],
  },

  // ─── Computer (Desktop specific) ───────────────────────────
  {
    title: "Desktop No Power / Boot Problem",
    icon: Power,
    description: "PSU, motherboard, and front-panel diagnostics.",
    category: "computer",
    keywords: ["desktop", "no power"],
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
    title: "Data Recovery",
    icon: Database,
    description: "Failing drives, deleted partitions, SD cards.",
    category: "computer",
    keywords: ["data recovery", "files"],
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
  {
    title: "Power Banks",
    icon: BatteryCharging,
    description: "Reliable power banks for travel, long days, and emergency top-ups.",
    category: "accessory",
  },
  {
    title: "Phone Holders & Mounts",
    icon: Smartphone,
    description: "Car mounts, desk stands, ring holders — for hands-free use.",
    category: "accessory",
  },
  {
    title: "Wireless Chargers",
    icon: BatteryCharging,
    description: "Qi-certified wireless charging pads and stands for any phone.",
    category: "accessory",
    keywords: ["wireless", "qi", "charger", "charging pad"],
  },
  {
    title: "Phone Cases & Covers",
    icon: ShieldCheck,
    description: "Rugged, silicone, and clear cases for every phone model.",
    category: "accessory",
    keywords: ["case", "cover", "casing", "protection"],
  },
];`;

content = content.replace(/export const EVERYTHING: Service\[\] = \[\s*\/\/ ─── Cellphone[\s\S]*?\];/m, everythingNew);

const brandsNew = `export const SUPPORTED_BRANDS: Brand[] = [
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

  // Telecom & Payment Services
  { name: "GCASH" },
  { name: "MAYA" },
  { name: "DITO Telecommunity" },
  { name: "Smart" },
  { name: "Globe" },
  { name: "Sun Cellular" },
];`;

content = content.replace(/export const SUPPORTED_BRANDS: Brand\[\] = \[\s*\{ name: "Apple" \}[\s\S]*?\];/m, brandsNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done site-data.ts');
