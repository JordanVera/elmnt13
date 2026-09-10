'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { heroNavLinks, navLinks } from '@/lib/site';
import { cn } from '@/lib/cn';

const EASE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };
const SCROLL_THRESHOLD = 16;

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
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
          open ? 'opacity-0' : 'opacity-100',
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
  const isHome = pathname === '/';
  const showHeroNav = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="flex items-start justify-center px-5 pt-4 sm:px-8 sm:pt-5">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="pointer-events-auto flex shrink-0 items-center"
          >
            <Image
              src="/logo.png"
              alt="ELMNT13"
              width={160}
              height={48}
              className="h-10 w-auto"
              priority
              loading="eager"
            />
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {showHeroNav ? (
          <motion.nav
            key="hero-nav"
            aria-label="Primary"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={skip ? undefined : { opacity: 0, y: -72, x: 48 }}
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))]"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
              {heroNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] tracking-[0.32em] hover:text-white uppercase transition-colors text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showHeroNav ? null : (
          <motion.button
            key="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            initial={
              skip || !isHome ? false : { opacity: 0, scale: 0.72, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={skip ? undefined : { opacity: 0, scale: 0.72 }}
            transition={
              skip
                ? { duration: 0 }
                : { ...EASE, delay: isHome && !menuOpen ? 0.08 : 0 }
            }
            onClick={() => setMenuOpen((open) => !open)}
            className=" bg-white/20 rounded-full bg-blur-2xl fixed top-3 right-3 z-50 flex h-9 w-9 cursor-pointer items-center justify-center sm:top-4 sm:right-5"
          >
            <MenuIcon open={menuOpen} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="site-menu"
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Primary"
            initial={skip ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={skip ? undefined : { opacity: 0 }}
            transition={
              skip ? { duration: 0 } : { duration: 0.32, ease: EASE.ease }
            }
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink/95 px-6 pt-28 pb-16 sm:justify-center sm:pb-24"
          >
            <nav onClick={(event) => event.stopPropagation()}>
              <ul className="mx-auto flex w-full max-w-5xl flex-col gap-1">
                {navLinks.map((link, index) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <motion.div
                        initial={skip ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          skip
                            ? { duration: 0 }
                            : { ...EASE, delay: 0.05 + index * 0.05 }
                        }
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'block py-2 font-display text-4xl tracking-tight uppercase transition-colors sm:text-6xl',
                            active ? 'text-gold' : 'text-white hover:text-gold',
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
