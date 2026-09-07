"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/cn";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const pathname = usePathname();

  return (
    <div
      id="site-menu"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "translate-y-0" : "pointer-events-none -translate-y-full",
      )}
    >
      <nav className="flex h-full flex-col justify-end px-8 pb-16 pt-28 md:px-16">
        <ul className="space-y-2">
          {navLinks.map((link, index) => {
            const active = pathname === link.href;
            return (
              <li
                key={link.href}
                style={{ transitionDelay: open ? `${120 + index * 70}ms` : "0ms" }}
                className={cn(
                  "translate-y-6 opacity-0 transition-all duration-700",
                  open && "translate-y-0 opacity-100",
                )}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "font-display text-5xl uppercase leading-none tracking-tight transition-colors md:text-7xl",
                    active ? "text-gold" : "text-paper hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-16 font-serif text-xl italic text-gold/80">
          We see the vision. We handle the details.
        </p>
      </nav>
    </div>
  );
}
