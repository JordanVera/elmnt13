'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);

  return (
    <div className="relative min-h-dvh bg-ink">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.92,
          delay: 0.12,
          ease: EASE_LUXE,
        }}
      >
        <Link
          href="/"
          className="pointer-events-auto flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="ELMNT13"
            width={160}
            height={48}
            className="h-8 w-auto md:h-16"
            priority
            loading="eager"
          />
        </Link>
      </motion.div>

      <section className="relative flex min-h-dvh flex-col justify-center px-6 text-paper">
        <h1 className="mx-auto flex w-full max-w-7xl justify-center font-display text-[11.5vw] leading-[0.86] tracking-tight text-white uppercase md:text-[9vw] lg:text-[8rem] xl:text-[9.75rem] 2xl:text-[11.5rem]">
          <span className="flex w-max max-w-full flex-col items-start">
            <HeroLine
              from="left"
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
              className="items-center gap-[0.16em] text-white"
              wrapperClassName="min-w-max"
            >
              {/* <GoldDash /> */}
              The Vision.
            </HeroLine>
            <HeroLine
              from="left"
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
              className="items-center gap-[0.16em] text-white"
              wrapperClassName="min-w-max"
            >
              The Details.
              {/* <GoldDash /> */}
            </HeroLine>
          </span>
        </h1>
      </section>
    </div>
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
