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
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const skip = Boolean(reduceMotion);
  const transition = skip ? { duration: 0 } : EASE;
  const showMenuButton = pastHero || menuOpen;

  useEffect(() => {
    setMenuOpen(false);

    const firstSection = document.querySelector('#main section');
    if (!firstSection) {
      setPastHero(true);
      return;
    }

    const update = () => {
      setPastHero(
        firstSection.getBoundingClientRect().bottom < window.innerHeight * 0.55,
      );
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
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

  useEffect(() => {
    if (!pastHero) setMenuOpen(false);
  }, [pastHero]);

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

      <AnimatePresence>
        {showMenuButton ? (
          <motion.div
            key="menu-toggle"
            initial={skip ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={skip ? undefined : { opacity: 0, y: -8 }}
            transition={transition}
            className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4"
          >
            <div className="mx-auto flex max-w-5xl flex-col">
              <div className="flex items-center justify-between rounded-full border border-white/15 bg-black/50 px-3 py-2 shadow-lg shadow-black/25 backdrop-blur-xl sm:px-4">
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
                  className="flex h-11 w-11 items-center justify-center rounded-full text-black"
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
                    className="mt-2 w-full overflow-hidden rounded-3xl border border-white/15 bg-black/80 p-3 shadow-xl backdrop-blur-xl"
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
                                  : 'text-white hover:text-white-bright',
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showMenuButton ? null : (
          <motion.header
            key="bottom-nav"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={skip ? undefined : { opacity: 0, y: 12 }}
            transition={transition}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <nav
              aria-label="Primary"
              className="pointer-events-auto mx-auto flex max-w-md items-center justify-between rounded-2xl border border-white/10 bg-white/20 px-5 py-2.5 backdrop-blur-xl sm:px-8 sm:py-3"
            >
              <ul className="flex w-full items-center justify-between gap-2">
                {footerLinks.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href} className="shrink-0">
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'font-bold text-[10px] uppercase transition-colors sm:text-[11px] sm:tracking-[0.22em]',
                          active
                            ? 'text-black-bright'
                            : 'text-black hover:text-black-bright',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
