const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/landing/site-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

const everythingNew = `export const EVERYTHING: Service[] = [
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
];`;

content = content.replace(/export const EVERYTHING: Service\[\] = \[\s*\/\/ ─── Cellphone[\s\S]*?\];/m, everythingNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done site-data.ts explicitly');
