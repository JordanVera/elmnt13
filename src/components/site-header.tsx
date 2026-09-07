'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navLinks } from '@/lib/site';
import { cn } from '@/lib/cn';

const EASE = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-5" aria-hidden="true">
      <span
        className={cn(
          'absolute top-1/2 left-1/2 h-px w-4 origin-center -translate-x-1/2 bg-gold transition-transform duration-300',
          open ? '-translate-y-1/2 rotate-45' : '-translate-y-1.5',
        )}
      />
      <span
        className={cn(
          'absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-gold transition-opacity duration-300',
          open && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'absolute top-1/2 left-1/2 h-px w-4 origin-center -translate-x-1/2 bg-gold transition-transform duration-300',
          open ? '-translate-y-1/2 -rotate-45' : 'translate-y-1.5',
        )}
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const skip = Boolean(reduceMotion);
  const transition = skip ? { duration: 0 } : EASE;
  const solid = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence>
        {menuOpen ? (
          <motion.button
            key="menu-backdrop"
            type="button"
            aria-label="Close menu"
            initial={skip ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={skip ? undefined : { opacity: 0 }}
            transition={transition}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-sm"
          />
        ) : null}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
        <div
          className={cn(
            'relative mx-auto w-full',
            skip ? 'transition-none' : 'transition-all duration-300',
            solid ? 'max-w-5xl' : 'max-w-6xl',
          )}
        >
          {solid ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-white/15 bg-black/50 shadow-lg shadow-black/25 backdrop-blur-xl"
            />
          ) : null}
          <div className="relative flex items-center justify-between py-2 pr-5 pl-4 sm:pr-6 sm:pl-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex shrink-0 items-center"
            >
              <Image
                src="/logo.png"
                alt="ELMNT13"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              key="site-menu"
              id="site-menu"
              aria-label="Primary"
              initial={skip ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={skip ? undefined : { opacity: 0, y: -8 }}
              transition={transition}
              className={cn(
                'mx-auto mt-2 w-full overflow-hidden rounded-3xl border border-white/15 bg-black/50 p-3 shadow-xl backdrop-blur-xl',
                solid ? 'max-w-5xl' : 'max-w-6xl',
              )}
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block rounded-xl px-3 py-2.5 font-display text-sm tracking-[0.18em] uppercase transition hover:bg-white/10',
                          active
                            ? 'text-white'
                            : 'text-white hover:text-white/80',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
