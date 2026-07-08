"use client";

import StaggeredMenu, {
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem,
} from "@/components/ui/staggered-menu";
import { NAV_ITEMS, SOCIAL_ITEMS } from "./site-data";

const navItems: StaggeredMenuItem[] = NAV_ITEMS.map((n) => ({
  label: n.label,
  ariaLabel: n.ariaLabel,
  link: n.href,
}));

const socialItems: StaggeredMenuSocialItem[] = SOCIAL_ITEMS.map((s) => ({
  label: s.label,
  link: s.href,
}));

export function Header() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <StaggeredMenu
        position="right"
        items={navItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        logoUrl="/logo.png"
        menuButtonColor="#0a0a0a"
        openMenuButtonColor="#0a0a0a"
        colors={["#f59e0b", "#fcd34d", "#0a0a0a"]}
        accentColor="#f59e0b"
        changeMenuColorOnOpen
      />
    </div>
  );
}

export default Header;
