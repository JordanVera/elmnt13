'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { footerLinks } from '@/lib/site';
import { cn } from '@/lib/cn';

const EASE = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-4.5" aria-hidden="true">
      <span
        className={cn(
          'absolute inset-x-0 top-0 h-px origin-center bg-gold transition-transform duration-300',
          open && 'top-1.5 rotate-45',
        )}
      />
      <span
        className={cn(
          'absolute inset-x-0 top-1.5 h-px bg-gold transition-opacity duration-300',
          open && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'absolute inset-x-0 top-3 h-px origin-center bg-gold transition-transform duration-300',
          open && 'top-1.5 -rotate-45',
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
            'mx-auto flex w-full items-center justify-between rounded-full px-3 py-2 sm:px-4',
            skip ? 'transition-none' : 'transition-all duration-300',
            solid
              ? 'max-w-5xl border border-white/15 bg-black/50 shadow-lg shadow-black/25 backdrop-blur-xl'
              : 'max-w-6xl border border-transparent bg-transparent',
          )}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center pl-1"
          >
            <Image
              src="/logo.png"
              alt="ELMNT13"
              width={160}
              height={48}
              className="h-10 w-auto sm:h-12"
            />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full cursor-pointer"
          >
            <MenuIcon open={menuOpen} />
          </button>
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
                {footerLinks.map((link) => {
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
