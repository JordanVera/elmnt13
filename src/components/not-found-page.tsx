'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GoldLink } from '@/components/gold-link';
import { cn } from '@/lib/cn';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MARQUEE_ITEMS = [
  'Experiential Marketing',
  'Event Management',
  'Brand Activations',
  'Weddings',
  'Corporate Events',
  'Product Launches',
  'Immersive Experiences',
  'We See the Vision',
  'We Handle the Details',
] as const;

export function NotFoundPage() {
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);

  return (
    <>
      <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-ink px-6 pt-24 pb-16 text-paper">
        <TableCard skip={skip} />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.p
            className="text-[11px] tracking-[0.36em] text-gold uppercase"
            initial={skip ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: skip ? 0 : 0.8,
              delay: skip ? 0 : 0.1,
              ease: EASE_LUXE,
            }}
          >
            404 — Off the itinerary
          </motion.p>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.88] tracking-tight uppercase md:mt-10">
            <span className="flex flex-col items-start">
              <HeroLine from="right" delay={0.2} skip={skip}>
                Not On
              </HeroLine>
              <HeroLine
                from="right"
                delay={0.32}
                skip={skip}
                className="font-serif text-[0.42em] font-normal tracking-[0.1em] text-gold italic normal-case"
              >
                The Guest
              </HeroLine>
              <HeroLine
                from="right"
                delay={0.44}
                skip={skip}
                className="mt-[0.06em]"
              >
                List.
              </HeroLine>
            </span>
          </h1>

          <motion.p
            className="mt-10 max-w-xl text-xl leading-relaxed text-paper/75 md:mt-12 md:text-2xl"
            initial={skip ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: skip ? 0 : 0.9,
              delay: skip ? 0 : 0.72,
              ease: EASE_LUXE,
            }}
          >
            Every detail matters — including this one. The page you&apos;re
            looking for has left the venue.
          </motion.p>

          <motion.span
            aria-hidden="true"
            className="gold-rule mt-10 block h-px w-24 origin-left bg-gold md:mt-12"
            initial={skip ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: skip ? 0 : 1.1,
              delay: skip ? 0 : 0.88,
              ease: EASE_LUXE,
            }}
          />

          <motion.nav
            aria-label="Helpful links"
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 md:mt-12"
            initial={skip ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: skip ? 0 : 0.8,
              delay: skip ? 0 : 1,
              ease: EASE_LUXE,
            }}
          >
            <GoldLink href="/" inverted>
              Return home
            </GoldLink>
            <GoldLink href="/work" inverted>
              View our work
            </GoldLink>
            <Link
              href="/contact"
              className="text-lg text-gold transition-colors hover:text-gold-bright md:text-xl"
            >
              Plan an event →
            </Link>
          </motion.nav>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        />
      </section>

      <section
        aria-hidden="true"
        className="overflow-hidden border-t border-gold/15 bg-ink py-5 text-gold/60"
      >
        <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-12 text-[11px] tracking-[0.32em] uppercase"
            >
              {item}
              <span className="size-1 rounded-full bg-gold/50" />
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function TableCard({ skip }: { skip: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-24 right-6 z-0 hidden sm:block md:top-28 md:right-10 lg:right-16"
      initial={skip ? false : { opacity: 0, rotate: -8, y: -20 }}
      animate={{ opacity: 1, rotate: 6, y: 0 }}
      transition={{
        duration: skip ? 0 : 1.1,
        delay: skip ? 0 : 0.55,
        ease: EASE_LUXE,
      }}
    >
      <div className="relative flex size-28 flex-col items-center justify-center border border-gold/30 bg-paper/5 backdrop-blur-sm md:size-32">
        <span className="font-display text-[10px] tracking-[0.28em] text-gold/70 uppercase">
          Table
        </span>
        <span className="mt-1 font-display text-4xl leading-none text-gold md:text-5xl">
          404
        </span>
        <span className="mt-2 font-serif text-xs text-paper/45 italic">
          Unassigned
        </span>
        <span className="absolute -top-px left-1/2 h-2 w-px -translate-x-1/2 bg-gold/40" />
      </div>
    </motion.div>
  );
}

function HeroLine({
  children,
  from,
  delay,
  skip,
  className,
}: {
  children: ReactNode;
  from: 'left' | 'right';
  delay: number;
  skip: boolean;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={cn('block whitespace-nowrap', className)}
        initial={skip ? false : { x: from === 'left' ? '-110%' : '110%' }}
        animate={{ x: '0%' }}
        transition={{
          duration: skip ? 0 : 1.12,
          delay: skip ? 0 : delay,
          ease: EASE_LUXE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
