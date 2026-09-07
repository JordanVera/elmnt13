'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);

  return (
    <section className="relative flex min-h-dvh flex-col justify-center bg-ink px-6 text-paper">
      <div className="mx-auto w-full max-w-6xl py-16">
        <h1 className="font-display text-[13vw] leading-[0.82] tracking-tight uppercase md:text-[8.4vw]">
          <HeroLine
            from="left"
            delay={0.18}
            skip={skip}
            className="font-serif text-[0.42em] font-normal tracking-normal normal-case italic text-gold"
          >
            We See
          </HeroLine>
          <HeroLine from="right" delay={0.28} skip={skip}>
            the Vision.
          </HeroLine>
          <HeroLine
            from="left"
            delay={0.52}
            skip={skip}
            className="font-serif text-[0.42em] font-normal tracking-normal normal-case italic text-gold"
            wrapperClassName="mt-[0.12em]"
          >
            We Handle
          </HeroLine>
          <HeroLine from="right" delay={0.62} skip={skip}>
            the Details.
          </HeroLine>
        </h1>
      </div>
    </section>
  );
}

function HeroLine({
  children,
  from,
  delay,
  skip,
  className,
  wrapperClassName,
}: {
  children: string;
  from: 'left' | 'right';
  delay: number;
  skip: boolean;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <span
      className={cn(
        'block overflow-hidden',
        from === 'right' && 'text-right',
        wrapperClassName,
      )}
    >
      <motion.span
        className={cn('block', className)}
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
