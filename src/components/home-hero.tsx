'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);

  return (
    <section className="relative flex min-h-dvh flex-col justify-center bg-ink px-6 text-paper">
      <h1 className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center py-16 font-display text-[12vw] leading-[0.86] tracking-tight uppercase md:w-max md:grid-cols-[auto_auto] md:items-baseline md:gap-x-[0.16em] md:text-[7.4vw]">
        <HeroLine
          from="left"
          delay={0.18}
          skip={skip}
          className="font-serif text-[0.66em] font-normal tracking-normal normal-case italic text-gold"
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
          className="font-serif text-[0.66em] font-normal tracking-normal normal-case italic text-gold"
          wrapperClassName="mt-[0.08em] md:mt-0"
        >
          We Handle
        </HeroLine>
        <HeroLine
          from="right"
          delay={0.62}
          skip={skip}
          wrapperClassName="mt-[0.08em] md:mt-0"
        >
          the Details.
        </HeroLine>
      </h1>
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
        'block min-w-max',
        from === 'left' ? 'md:justify-self-end' : 'md:justify-self-start',
        wrapperClassName,
      )}
    >
      <span
        className={cn(
          'block overflow-hidden text-center',
          from === 'left' ? 'md:text-right' : 'md:text-left',
        )}
      >
        <motion.span
          className={cn('block whitespace-nowrap', className)}
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
    </span>
  );
}
