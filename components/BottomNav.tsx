"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "الرئيسية", icon: "🏠" },
  { href: "/orders", label: "طلباتي", icon: "📋" },
  { href: "/cart", label: "السلة", icon: "🛒" },
  { href: "/warehouse", label: "المستودع", icon: "🏪" },
  { href: "/login", label: "حسابي", icon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--card-bg)] safe-area-pb">
      <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <a
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition ${
                active ? "text-accent" : "text-[var(--text-secondary)]"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className={active ? "font-medium" : ""}>{link.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
