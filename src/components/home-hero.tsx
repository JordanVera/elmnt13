'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);

  return (
    <section className="relative flex min-h-dvh flex-col justify-center bg-ink px-6 pt-24 pb-28 text-paper">
      <h1 className="mx-auto flex w-full max-w-7xl justify-center font-display text-[11.5vw] leading-[0.86] tracking-tight uppercase md:text-[9vw] lg:text-[8rem] xl:text-[9.75rem] 2xl:text-[11.5rem]">
        <span className="flex w-max max-w-full flex-col items-start">
          <HeroLine
            from="right"
            delay={0.18}
            skip={skip}
            className="font-serif text-[0.36em] font-normal tracking-[0.12em] text-gold italic normal-case"
            wrapperClassName="w-full"
          >
            We See
          </HeroLine>
          <HeroLine
            from="right"
            delay={0.28}
            skip={skip}
            className="items-center gap-[0.16em]"
            wrapperClassName="min-w-max"
          >
            {/* <GoldDash /> */}
            The Vision.
          </HeroLine>
          <HeroLine
            from="right"
            delay={0.52}
            skip={skip}
            className="font-serif text-[0.36em] font-normal tracking-[0.12em] text-gold italic normal-case"
            wrapperClassName="mt-[0.14em] w-full"
          >
            We Handle
          </HeroLine>
          <HeroLine
            from="right"
            delay={0.62}
            skip={skip}
            className="items-center gap-[0.16em]"
            wrapperClassName="min-w-max"
          >
            The Details.
            {/* <GoldDash /> */}
          </HeroLine>
        </span>
      </h1>
    </section>
  );
}

// function GoldDash() {
//   return (
//     <span
//       aria-hidden="true"
//       className="mb-[0.12em] inline-block h-[0.07em] w-[0.72em] shrink-0 bg-gold"
//     />
//   );
// }

function HeroLine({
  children,
  from,
  delay,
  skip,
  className,
  wrapperClassName,
}: {
  children: ReactNode;
  from: 'left' | 'right';
  delay: number;
  skip: boolean;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <span className={cn('block overflow-hidden', wrapperClassName)}>
      <motion.span
        className={cn('flex w-full items-center whitespace-nowrap', className)}
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
