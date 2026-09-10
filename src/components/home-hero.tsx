'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ENTRANCE_DURATION = 1.12;
const FIRST_STATEMENT_DELAY = 0.2;
/** Long enough to read most of the first line before the second enters. */
const SECOND_STATEMENT_DELAY = 1.1;

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
            className="h-8 w-auto md:h-12"
            priority
            loading="eager"
          />
        </Link>
      </motion.div>

      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden px-6 text-paper">
        <h1 className="mx-auto flex w-max max-w-full flex-col items-start font-display text-[11.5vw] leading-[0.86] tracking-tight text-white uppercase md:text-[9vw] lg:text-[8rem] xl:text-[9.75rem] 2xl:text-[11.5rem]">
          <HeroStatement
            eyebrow="We See"
            headline="The Vision."
            delay={FIRST_STATEMENT_DELAY}
            skip={skip}
            from="right"
          />
          <HeroStatement
            eyebrow="We Handle"
            headline="The Details."
            delay={SECOND_STATEMENT_DELAY}
            skip={skip}
            className="mt-[0.14em] ml-[0.8em]"
            from="left"
          />
        </h1>
      </section>
    </div>
  );
}

function HeroStatement({
  eyebrow,
  headline,
  delay,
  skip,
  className,
  from,
}: {
  eyebrow: string;
  headline: string;
  delay: number;
  skip: boolean;
  className?: string;
  from: 'left' | 'right';
}) {
  return (
    <span className={cn('flex flex-col items-start', className)}>
      <HeroLine
        from={from}
        delay={delay}
        skip={skip}
        className="font-serif text-[0.36em] font-normal tracking-normal text-gold italic normal-case"
      >
        {eyebrow}
      </HeroLine>
      <HeroLine
        from={from}
        delay={delay}
        skip={skip}
        className="whitespace-nowrap"
      >
        {headline}
      </HeroLine>
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
  children: ReactNode;
  from: 'left' | 'right';
  delay: number;
  skip: boolean;
  className?: string;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [enterX, setEnterX] = useState<number | null>(() => (skip ? 0 : null));
  const ready = skip || enterX !== null;

  useLayoutEffect(() => {
    if (skip) return;

    const measure = () => {
      const el = lineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setEnterX(
        from === 'right'
          ? window.innerWidth - rect.left
          : -(rect.left + rect.width),
      );
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [from, skip]);

  return (
    <span className={cn('block', !ready && 'invisible')}>
      <motion.span
        key={ready ? 'ready' : 'pending'}
        ref={!ready ? lineRef : undefined}
        className={cn('block', className)}
        initial={skip || enterX === null ? false : { x: enterX }}
        animate={{ x: 0 }}
        transition={{
          duration: skip ? 0 : ENTRANCE_DURATION,
          delay: skip ? 0 : delay,
          ease: EASE_LUXE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
