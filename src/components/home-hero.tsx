'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);

  return (
    <section className="relative flex min-h-dvh flex-col justify-center bg-ink px-6 text-paper">
      <h1 className="mx-auto flex w-full max-w-6xl flex-col items-center py-16 font-display text-[12vw] leading-[0.86] tracking-tight uppercase md:text-[7.6vw]">
        <HeroPair>
          <HeroLine
            from="left"
            delay={0.18}
            skip={skip}
            className="font-serif text-[0.62em] font-normal tracking-normal normal-case italic text-gold"
          >
            We See
          </HeroLine>
          <HeroLine from="right" delay={0.28} skip={skip}>
            the Vision.
          </HeroLine>
        </HeroPair>
        <HeroPair className="mt-[0.08em]">
          <HeroLine
            from="left"
            delay={0.52}
            skip={skip}
            className="font-serif text-[0.62em] font-normal tracking-normal normal-case italic text-gold"
          >
            We Handle
          </HeroLine>
          <HeroLine from="right" delay={0.62} skip={skip}>
            the Details.
          </HeroLine>
        </HeroPair>
      </h1>
    </section>
  );
}

function HeroPair({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex w-full flex-col items-center md:flex-row md:items-baseline md:justify-center md:gap-[0.18em]',
        className,
      )}
    >
      {children}
    </span>
  );
}

function HeroLine({
  children,
  from,
  delay,
  skip,
  className,
}: {
  children: string;
  from: 'left' | 'right';
  delay: number;
  skip: boolean;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={cn('block text-center md:text-left', className)}
        initial={skip ? false : { x: from === 'left' ? '-110%' : '110%' }}
        animate={{ x: '0%' }}
        transition={{
          duration: skip ? 0 : 1.28,
          delay: skip ? 0 : delay,
          ease: EASE_LUXE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
