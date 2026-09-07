"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { MenuOverlay } from "@/components/menu-overlay";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isWeddings = pathname.startsWith("/weddings");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.72 : 24;
      setScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showBar = !isHome || scrolled || open;
  const lightHero = isWeddings && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          showBar
            ? "bg-ink/90 py-4 backdrop-blur-md"
            : "bg-transparent py-7",
        )}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
          <div
            className={cn(
              "transition-all duration-500",
              isHome && !showBar
                ? "absolute left-1/2 -translate-x-1/2"
                : "relative left-0 translate-x-0",
              isHome && showBar ? "opacity-100" : "",
            )}
          >
            <Logo
              inverted={!lightHero}
              variant={isWeddings ? "weddings" : "main"}
              href={isWeddings ? "/weddings" : "/"}
            />
          </div>

          {(!isHome || showBar) && <div />}

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "relative z-[60] flex h-10 w-10 flex-col items-end justify-center gap-1.5 transition-opacity duration-500",
              isHome && !showBar ? "opacity-0 pointer-events-none" : "opacity-100",
            )}
          >
            <span
              className={cn(
                "block h-px w-7 origin-center transition-transform duration-300",
                lightHero ? "bg-ink" : "bg-gold",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 transition-opacity duration-300",
                lightHero ? "bg-ink" : "bg-gold",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-7 origin-center transition-transform duration-300",
                lightHero ? "bg-ink" : "bg-gold",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </button>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
