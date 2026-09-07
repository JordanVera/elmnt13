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
  { id: 1, x: 90, r: 6.2, delay: 0.05, duration: 2.8, drift: 2 },
  { id: 2, x: 84, r: 4.4, delay: 0.45, duration: 3.3, drift: -2 },
  { id: 3, x: 96, r: 5.1, delay: 0.85, duration: 2.6, drift: 3 },
  { id: 4, x: 88, r: 3.6, delay: 1.2, duration: 3.6, drift: -1 },
  { id: 5, x: 93, r: 7.0, delay: 1.55, duration: 2.4, drift: 1 },
  { id: 6, x: 86, r: 3.2, delay: 1.9, duration: 3.1, drift: 2 },
  { id: 7, x: 94, r: 4.8, delay: 0.25, duration: 2.9, drift: -3 },
  { id: 8, x: 91, r: 3.8, delay: 2.2, duration: 3.4, drift: 2 },
  { id: 9, x: 85, r: 5.4, delay: 2.55, duration: 2.7, drift: -2 },
  { id: 10, x: 97, r: 3.4, delay: 1.05, duration: 3.2, drift: 1 },
] as const;

const FIZZ = [
  { id: 21, x: 88, r: 5.5, delay: 0, duration: 1.15, drift: -3 },
  { id: 22, x: 94, r: 6.8, delay: 0.06, duration: 1.0, drift: 4 },
  { id: 23, x: 86, r: 4.2, delay: 0.12, duration: 1.2, drift: 2 },
  { id: 24, x: 92, r: 7.4, delay: 0.08, duration: 0.95, drift: -2 },
  { id: 25, x: 90, r: 3.8, delay: 0.18, duration: 1.3, drift: 3 },
  { id: 26, x: 97, r: 4.6, delay: 0.14, duration: 1.1, drift: -4 },
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
    rotate: dir * -24,
    opacity: 0,
  }),
  approach: (dir: number) => ({
    x: dir * 36,
    rotate: dir * -6,
    opacity: 1,
    transition: { duration: 1.85, ease: EASE_LUXE },
  }),
  clink: (dir: number) => ({
    x: dir * -14,
    rotate: dir * 13,
    transition: { type: 'spring', stiffness: 420, damping: 13, mass: 0.65 },
  }),
  hold: (dir: number) => ({
    x: dir * -14,
    y: [0, -8, 0],
    rotate: [dir * 13, dir * 11.5, dir * 13],
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
        className="pointer-events-none absolute top-[28%] left-1/2 h-[36vh] w-[min(80vw,32rem)] -translate-x-1/2 rounded-full bg-gold/25 blur-3xl"
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
                delay: skipMotion ? 0 : 1.55,
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
                delay: skipMotion ? 0 : 1.68,
                ease: EASE_LUXE,
              }}
            >
              Love.
            </motion.span>
          </span>
        </h1>

        <div
          className="relative mt-4 flex w-full items-end justify-center md:mt-6"
          aria-hidden="true"
        >
          <motion.div
            className="origin-bottom -mr-6 md:-mr-10"
            custom={-1}
            variants={glassVariants}
            initial={skipMotion ? 'clink' : 'hidden'}
            animate={controls}
            style={{ originX: 0.5, originY: 0.94 }}
          >
            <ChampagneFlute
              side="left"
              toasted={toasted}
              reduceMotion={skipMotion}
            />
          </motion.div>
          <motion.div
            className="origin-bottom -ml-6 md:-ml-10"
            custom={1}
            variants={glassVariants}
            initial={skipMotion ? 'clink' : 'hidden'}
            animate={controls}
            style={{ originX: 0.5, originY: 0.94 }}
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
  const id = side;

  return (
    <svg
      viewBox="0 0 180 520"
      className="h-[38vh] w-auto drop-shadow-2xl md:h-[48vh]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.72" />
          <stop offset="42%" stopColor="#edf4f8" stopOpacity="0.08" />
          <stop offset="70%" stopColor="#9eb4c4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f6e7b0" />
          <stop offset="22%" stopColor="#e8c45d" />
          <stop offset="68%" stopColor="#c9962e" />
          <stop offset="100%" stopColor="#a6741c" />
        </linearGradient>
        <linearGradient id={`${id}-liquid-side`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="38%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#6e430c" stopOpacity="0.28" />
        </linearGradient>
        <radialGradient id={`${id}-foot`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#c4a574" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id={`${id}-bubble`} cx="32%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#fff6d6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </radialGradient>
        <clipPath id={`${id}-liquid-clip`}>
          <path d="M58 102 C56 150 64 204 83 240 C86 246 88 250 90 251 C92 250 94 246 97 240 C116 204 124 150 122 102 C110 96 98 94 90 94 C82 94 70 96 58 102 Z" />
        </clipPath>
      </defs>

      <ellipse cx="90" cy="506" rx="46" ry="7" fill="#0a0a0a" opacity="0.18" />

      <path
        d="M76 466 C50 474 38 488 38 498 C38 510 62 520 90 520 C118 520 142 510 142 498 C142 488 130 474 104 466 Z"
        fill={`url(#${id}-foot)`}
        stroke="#c4a574"
        strokeWidth="1.3"
      />
      <ellipse
        cx="90"
        cy="496"
        rx="48"
        ry="8"
        fill="none"
        stroke="#f0dfc0"
        strokeWidth="1"
      />
      <ellipse
        cx="90"
        cy="492"
        rx="18"
        ry="3.2"
        fill="#ffffff"
        opacity="0.28"
      />

      <path
        d="M86.4 266 L87.4 466 L92.6 466 L93.6 266 Z"
        fill={`url(#${id}-glass)`}
        stroke="#c4a574"
        strokeWidth="1.15"
      />
      <path
        d="M89 270 L89.6 462"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <circle cx="90" cy="392" r="2.6" fill="#ffffff" opacity="0.7" />
      <circle
        cx="90"
        cy="392"
        r="2.6"
        fill="none"
        stroke="#d4b896"
        strokeWidth="0.6"
      />

      <path
        d="M50 48 C46 90 44 134 52 180 C60 226 74 252 84 266 C87 270 90 273 90 273 C90 273 93 270 96 266 C106 252 120 226 128 180 C136 134 134 90 130 48 C118 38 102 32 90 32 C78 32 62 38 50 48 Z"
        fill={`url(#${id}-glass)`}
        stroke="#c4a574"
        strokeWidth="1.5"
      />
      <path
        d="M56 52 C52 92 51 134 58 178 C65 220 78 246 88 260 C89 262 90 263 90 263 C90 263 91 262 92 260 C102 246 115 220 122 178 C129 134 128 92 124 52"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.8"
        opacity="0.28"
      />

      <g clipPath={`url(#${id}-liquid-clip)`}>
        <rect
          x="50"
          y="94"
          width="80"
          height="170"
          fill={`url(#${id}-liquid)`}
        />
        <rect
          x="50"
          y="94"
          width="80"
          height="170"
          fill={`url(#${id}-liquid-side)`}
        />
        <ellipse cx="90" cy="100" rx="32" ry="8" fill="#f8edc4" />
        <ellipse cx="90" cy="98" rx="28" ry="5.5" fill="#fff6d8" opacity="0.55" />
        <ellipse cx="76" cy="97" rx="11" ry="2.6" fill="#ffffff" opacity="0.5" />

        {BUBBLES.map((bubble) => (
          <Bubble
            key={bubble.id}
            id={id}
            bubble={bubble}
            reduceMotion={reduceMotion}
            start={236}
            end={104}
          />
        ))}
        {toasted
          ? FIZZ.map((bubble) => (
              <Bubble
                key={bubble.id}
                id={id}
                bubble={bubble}
                reduceMotion={reduceMotion}
                start={230}
                end={100}
                once
              />
            ))
          : null}
      </g>

      <ellipse
        cx="90"
        cy="100"
        rx="32"
        ry="8"
        fill="none"
        stroke="#ead28a"
        strokeWidth="1.1"
        opacity="0.85"
      />

      <path
        d="M62 58 C58 108 62 158 72 206"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.34"
      />
      <path
        d="M66 72 C64 118 68 166 76 208"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M120 66 C122 124 116 176 106 218"
        fill="none"
        stroke="#1c2833"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.1"
      />

      <text
        x="90"
        y="142"
        textAnchor="middle"
        fill="#f7edd2"
        style={{ fontFamily: 'var(--font-syne), sans-serif' }}
        fontSize="9"
        letterSpacing="2.2"
        fontWeight="700"
      >
        ELMNT13
      </text>
      <text
        x="90"
        y="158"
        textAnchor="middle"
        fill="#fff8e8"
        style={{ fontFamily: 'var(--font-cormorant), serif' }}
        fontSize="12"
        fontStyle="italic"
        letterSpacing="0.8"
      >
        Weddings
      </text>

      <ellipse
        cx="90"
        cy="38"
        rx="40"
        ry="9"
        fill="none"
        stroke="#d9bf93"
        strokeWidth="2.2"
      />
      <ellipse
        cx="90"
        cy="38"
        rx="36"
        ry="7"
        fill="rgba(255,255,255,0.16)"
        stroke="#f4e6c8"
        strokeWidth="1"
      />
      <ellipse cx="76" cy="36" rx="13" ry="2.4" fill="#ffffff" opacity="0.5" />

      <ellipse cx="57" cy="92" rx="2.4" ry="3.8" fill="#ffffff" opacity="0.32" />
      <ellipse cx="61" cy="126" rx="1.7" ry="2.6" fill="#ffffff" opacity="0.24" />
      <ellipse cx="122" cy="108" rx="2" ry="3.1" fill="#ffffff" opacity="0.2" />
    </svg>
  );
}

function Bubble({
  id,
  bubble,
  reduceMotion,
  start,
  end,
  once = false,
}: {
  id: string;
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
        fill={`url(#${id}-bubble)`}
        opacity="0.7"
      />
    );
  }

  return (
    <motion.circle
      r={bubble.r}
      fill={`url(#${id}-bubble)`}
      initial={{ cy: start, cx: bubble.x, opacity: 0, scale: 0.7 }}
      animate={{
        cy: [start, end],
        cx: [bubble.x, bubble.x + bubble.drift, bubble.x],
        opacity: [0, 0.95, 0],
        scale: [0.75, 1, 1.05],
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
      className="absolute top-[8%] left-1/2 z-20 h-28 w-28 -translate-x-1/2"
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
