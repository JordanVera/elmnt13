'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BUBBLES = [
  { id: 1, x: 50, r: 3.2, delay: 0.05, duration: 2.7, drift: 2.4 },
  { id: 2, x: 44, r: 2.1, delay: 0.4, duration: 3.2, drift: -1.8 },
  { id: 3, x: 57, r: 2.6, delay: 0.75, duration: 2.5, drift: 1.6 },
  { id: 4, x: 48, r: 1.7, delay: 1.1, duration: 3.5, drift: -2.2 },
  { id: 5, x: 53, r: 3.6, delay: 1.45, duration: 2.3, drift: 1.2 },
  { id: 6, x: 46, r: 1.9, delay: 1.8, duration: 3.0, drift: 2.0 },
  { id: 7, x: 55, r: 2.4, delay: 0.22, duration: 2.8, drift: -1.4 },
  { id: 8, x: 51, r: 1.5, delay: 2.1, duration: 3.3, drift: 1.8 },
] as const;

const FIZZ = [
  { id: 21, x: 49, r: 2.8, delay: 0, duration: 1.05, drift: -2.5 },
  { id: 22, x: 54, r: 3.4, delay: 0.07, duration: 0.9, drift: 3 },
  { id: 23, x: 46, r: 2.2, delay: 0.12, duration: 1.15, drift: 1.8 },
  { id: 24, x: 52, r: 3.8, delay: 0.05, duration: 0.85, drift: -1.6 },
] as const;

const SPARKS = [
  { id: 1, angle: -72 },
  { id: 2, angle: -28 },
  { id: 3, angle: 8 },
  { id: 4, angle: 46 },
  { id: 5, angle: 88 },
  { id: 6, angle: 138 },
  { id: 7, angle: 188 },
  { id: 8, angle: 228 },
] as const;

const glassVariants: Variants = {
  hidden: (dir: number) => ({
    x: `${dir * 78}vw`,
    rotate: dir * 26,
    opacity: 0,
  }),
  approach: (dir: number) => ({
    x: dir * 52,
    rotate: dir * 8,
    opacity: 1,
    transition: { duration: 2.15, ease: [0.45, 0.02, 0.18, 1] },
  }),
  clink: (dir: number) => ({
    x: dir * -8,
    rotate: dir * -13,
    transition: { type: 'spring', stiffness: 380, damping: 14, mass: 0.7 },
  }),
  hold: (dir: number) => ({
    x: dir * -8,
    y: [0, -8, 0],
    rotate: [dir * -13, dir * -11.5, dir * -13],
    transition: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
  }),
};

export function ChampagneToast() {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const [toasted, setToasted] = useState(false);
  const skipMotion = Boolean(reduceMotion);

  useEffect(() => {
    let cancelled = false;

    async function play() {
      if (skipMotion) {
        controls.set('clink');
        setToasted(true);
        return;
      }

      await controls.start('approach');
      if (cancelled) return;
      await controls.start('clink');
      if (cancelled) return;
      setToasted(true);
      await controls.start('hold');
    }

    void play();
    return () => {
      cancelled = true;
    };
  }, [controls, skipMotion]);

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-blush">
      <Image
        src="/weddings-hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-blush/60" />
      <div
        className="pointer-events-none absolute top-[28%] left-1/2 h-[36vh] w-[min(80vw,32rem)] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center px-6 pt-10 pb-28">
        <h1 className="text-center">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block font-serif text-3xl italic text-ink md:text-6xl"
              initial={skipMotion ? false : { y: '115%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: skipMotion ? 0 : 0.95,
                delay: skipMotion ? 0 : 2.05,
                ease: EASE_LUXE,
              }}
            >
              To your
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="font-display block text-7xl tracking-tight text-ink uppercase md:text-9xl"
              initial={skipMotion ? false : { y: '115%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: skipMotion ? 0 : 1.05,
                delay: skipMotion ? 0 : 2.18,
                ease: EASE_LUXE,
              }}
            >
              Love.
            </motion.span>
          </span>
        </h1>

        <div
          className="relative mt-2 flex w-full items-end justify-center md:mt-4"
          aria-hidden="true"
        >
          <motion.div
            className="-mr-10 md:-mr-16"
            custom={-1}
            variants={glassVariants}
            initial={skipMotion ? 'clink' : 'hidden'}
            animate={controls}
            style={{ originX: 0.5, originY: 0.68 }}
          >
            <ChampagneFlute
              side="left"
              toasted={toasted}
              reduceMotion={skipMotion}
            />
          </motion.div>
          <motion.div
            className="-ml-10 md:-ml-16"
            custom={1}
            variants={glassVariants}
            initial={skipMotion ? 'clink' : 'hidden'}
            animate={controls}
            style={{ originX: 0.5, originY: 0.68 }}
          >
            <ChampagneFlute
              side="right"
              toasted={toasted}
              reduceMotion={skipMotion}
            />
          </motion.div>
          <SparkBurst active={toasted && !skipMotion} />
        </div>
      </div>
    </section>
  );
}

function ChampagneFlute({
  side,
  toasted,
  reduceMotion,
}: {
  side: 'left' | 'right';
  toasted: boolean;
  reduceMotion: boolean;
}) {
  const clipId = `${side}-liquid-bowl`;
  const bubbleId = `${side}-bubble-glint`;

  return (
    <div className="relative h-[38vh] w-[calc(38vh*2/3)] md:h-[50vh] md:w-[calc(50vh*2/3)]">
      <Image
        src="/champagne-flute.png"
        alt=""
        fill
        sizes="(min-width: 768px) 33vh, 25vh"
        className="object-contain drop-shadow-xl"
        preload
      />
      <div className="absolute top-[31%] left-1/2 w-[46%] -translate-x-1/2 text-center">
        <p className="font-display text-[clamp(0.55rem,1.15vh,0.8rem)] tracking-[0.32em] text-[#fff6e4]">
          ELMNT13
        </p>
        <p className="font-serif text-[clamp(0.7rem,1.55vh,1.05rem)] italic text-white/90">
          Weddings
        </p>
      </div>
      <svg
        viewBox="0 0 100 150"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M38 28 C36 40 37 52 41 62 C45 72 48 78 50 80 C52 78 55 72 59 62 C63 52 64 40 62 28 C58 24 42 24 38 28 Z" />
          </clipPath>
          <radialGradient id={bubbleId} cx="32%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#fff6d6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {BUBBLES.map((bubble) => (
            <Bubble
              key={bubble.id}
              fillId={bubbleId}
              bubble={bubble}
              reduceMotion={reduceMotion}
              start={76}
              end={30}
            />
          ))}
          {toasted
            ? FIZZ.map((bubble) => (
                <Bubble
                  key={bubble.id}
                  fillId={bubbleId}
                  bubble={bubble}
                  reduceMotion={reduceMotion}
                  start={74}
                  end={29}
                  once
                />
              ))
            : null}
        </g>
      </svg>
    </div>
  );
}

function Bubble({
  fillId,
  bubble,
  reduceMotion,
  start,
  end,
  once = false,
}: {
  fillId: string;
  bubble: { x: number; r: number; delay: number; duration: number; drift: number };
  reduceMotion: boolean;
  start: number;
  end: number;
  once?: boolean;
}) {
  if (reduceMotion) {
    return (
      <circle
        cx={bubble.x}
        cy={start - (start - end) * 0.4}
        r={bubble.r}
        fill={`url(#${fillId})`}
        opacity="0.55"
      />
    );
  }

  return (
    <motion.circle
      r={bubble.r}
      fill={`url(#${fillId})`}
      initial={{ cy: start, cx: bubble.x, opacity: 0 }}
      animate={{
        cy: [start, end],
        cx: [bubble.x, bubble.x + bubble.drift, bubble.x],
        opacity: [0, 0.85, 0],
      }}
      transition={{
        duration: bubble.duration,
        delay: bubble.delay,
        repeat: once ? 0 : Infinity,
        ease: 'linear',
      }}
    />
  );
}

function SparkBurst({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      className="absolute top-[10%] left-1/2 z-20 h-28 w-28 -translate-x-1/2"
      initial={{ opacity: 0, scale: 0.35 }}
      animate={{ opacity: [0, 1, 0], scale: [0.35, 1.2, 1.7] }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {SPARKS.map((spark) => (
        <span
          key={spark.id}
          className="absolute top-1/2 left-1/2 h-px w-8 origin-left bg-linear-to-r from-gold-bright to-transparent"
          style={{ transform: `rotate(${spark.angle}deg)` }}
        />
      ))}
      <span className="absolute top-1/2 left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-bright shadow-[0_0_22px_rgba(221,196,154,1)]" />
    </motion.div>
  );
}
