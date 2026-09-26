'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  externalLinkProps,
  heroNavLinks,
  navLinks,
  weddingNavLinks,
} from '@/lib/site';
import { cn } from '@/lib/cn';

const EASE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };
const SCROLL_THRESHOLD = 16;

function isActive(pathname: string, href: string, hash = '') {
  if (href.startsWith('#')) return hash === href;
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
  const [hash, setHash] = useState('');
  const skip = Boolean(reduceMotion);
  const transition = skip ? { duration: 0 } : EASE;
  const isHome = pathname === '/';
  const isWeddings = pathname === '/weddings';
  const showHeroNav = isHome && !scrolled && !menuOpen;
  const links = isWeddings ? weddingNavLinks : navLinks;

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
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
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
        {showHeroNav ? (
          <motion.nav
            key="hero-nav"
            aria-label="Primary"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={skip ? undefined : { opacity: 0, y: -72, x: 48 }}
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-50 hidden justify-center px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] md:flex"
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
            aria-label={isWeddings ? 'Weddings' : 'Primary'}
            initial={skip ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={skip ? undefined : { opacity: 0 }}
            transition={
              skip ? { duration: 0 } : { duration: 0.32, ease: EASE.ease }
            }
            onClick={() => setMenuOpen(false)}
            className={cn(
              'fixed inset-0 z-40 flex flex-col justify-end px-6 pt-28 pb-16 sm:justify-center sm:pb-24 lg:px-12 lg:pt-24 xl:px-20',
              isWeddings ? 'bg-paper' : 'bg-ink',
            )}
          >
            {!isWeddings && (
              <motion.div
                initial={skip ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={skip ? { duration: 0 } : { ...EASE, delay: 0.04 }}
                className="pointer-events-none absolute inset-x-0 top-10 flex justify-center lg:top-14"
              >
                <Link
                  href={'/'}
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuOpen(false);
                  }}
                  className="pointer-events-auto"
                >
                  <Image
                    src={'/logo.png'}
                    alt="ELMNT13"
                    width={180}
                    height={54}
                    className="h-10 w-auto xl:h-12"
                  />
                </Link>
              </motion.div>
            )}

            <div
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex w-full max-w-5xl flex-col lg:max-w-352 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
            >
              <nav aria-label={isWeddings ? 'On this page' : 'Primary'}>
                <ul className="flex flex-col gap-1 lg:gap-0">
                  {links.map((link, index) => {
                    const active = isActive(pathname, link.href, hash);
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
                            {...externalLinkProps(link.href)}
                            onClick={(event) => {
                              if (!isWeddings || !link.href.startsWith('#')) {
                                setMenuOpen(false);
                                return;
                              }

                              event.preventDefault();
                              const id = link.href.slice(1);
                              setMenuOpen(false);
                              setHash(link.href);
                              window.setTimeout(() => {
                                document
                                  .getElementById(id)
                                  ?.scrollIntoView({ behavior: 'smooth' });
                                window.history.replaceState(
                                  null,
                                  '',
                                  link.href,
                                );
                              }, 80);
                            }}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'block py-2 font-display text-4xl tracking-tight uppercase transition-colors sm:text-6xl lg:py-1 lg:text-7xl lg:leading-none xl:text-[5.5rem]',
                              active
                                ? 'text-gold'
                                : isWeddings
                                  ? 'text-ink hover:text-gold'
                                  : 'text-white hover:text-gold',
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>

                {isWeddings ? (
                  <motion.div
                    initial={skip ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      skip
                        ? { duration: 0 }
                        : { ...EASE, delay: 0.05 + links.length * 0.05 }
                    }
                    className="mt-8 border-t border-ink/15 pt-6"
                  >
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="group inline-flex flex-col"
                    >
                      <span className="text-[11px] tracking-[0.32em] text-stone uppercase lg:text-sm">
                        Go to
                      </span>
                      <span className="font-display mt-1 text-3xl tracking-tight text-ink uppercase transition-colors group-hover:text-gold lg:text-5xl">
                        ELMNT13
                      </span>
                    </Link>
                  </motion.div>
                ) : null}
              </nav>

              <motion.aside
                initial={skip ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={skip ? { duration: 0 } : { ...EASE, delay: 0.28 }}
                aria-hidden="true"
                className="hidden shrink-0 lg:block"
              >
                <p
                  className={cn(
                    'flex flex-col items-end leading-[0.82] tracking-tight',
                    isWeddings ? 'text-ink' : 'text-white',
                  )}
                >
                  <span className="font-sans mr-14 text-[2.1em] tracking-tighter uppercase">
                    Taking your
                  </span>
                  <span className="font-display mr-12 text-8xl font-bold uppercase">
                    Vision
                  </span>
                  <span className="-mt-6 font-serif text-6xl text-gold italic normal-case xl:text-7xl">
                    further
                  </span>
                </p>
              </motion.aside>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
