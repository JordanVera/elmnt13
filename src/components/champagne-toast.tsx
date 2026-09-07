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
  { id: 1, x: 82, r: 1.5, delay: 0.05, duration: 3.6, drift: 3 },
  { id: 2, x: 96, r: 2.4, delay: 0.45, duration: 2.9, drift: -2 },
  { id: 3, x: 108, r: 1.8, delay: 0.9, duration: 3.3, drift: 2 },
  { id: 4, x: 88, r: 1.2, delay: 1.3, duration: 4.1, drift: -3 },
  { id: 5, x: 102, r: 2.1, delay: 1.7, duration: 3.0, drift: 1 },
  { id: 6, x: 76, r: 1.4, delay: 2.1, duration: 3.8, drift: 4 },
  { id: 7, x: 112, r: 1.7, delay: 0.25, duration: 3.5, drift: -1 },
  { id: 8, x: 92, r: 2.8, delay: 2.5, duration: 2.6, drift: 2 },
  { id: 9, x: 84, r: 1.1, delay: 1.1, duration: 4.4, drift: -2 },
  { id: 10, x: 104, r: 1.6, delay: 1.95, duration: 3.2, drift: 3 },
] as const;

const FIZZ = [
  { id: 21, x: 86, r: 1.3, delay: 0, duration: 1.4, drift: -4 },
  { id: 22, x: 98, r: 2.0, delay: 0.08, duration: 1.15, drift: 3 },
  { id: 23, x: 110, r: 1.5, delay: 0.14, duration: 1.3, drift: 5 },
  { id: 24, x: 90, r: 1.1, delay: 0.2, duration: 1.5, drift: -2 },
  { id: 25, x: 78, r: 1.8, delay: 0.1, duration: 1.25, drift: 2 },
  { id: 26, x: 106, r: 1.2, delay: 0.22, duration: 1.35, drift: -3 },
] as const;

const SPARKS = [
  { id: 1, angle: -70 },
  { id: 2, angle: -30 },
  { id: 3, angle: 10 },
  { id: 4, angle: 50 },
  { id: 5, angle: 90 },
  { id: 6, angle: 140 },
  { id: 7, angle: 190 },
  { id: 8, angle: 230 },
] as const;

const glassVariants: Variants = {
  hidden: (dir: number) => ({
    x: `${dir * 72}vw`,
    rotate: dir * -22,
    opacity: 0,
  }),
  approach: (dir: number) => ({
    x: dir * 28,
    rotate: dir * -5,
    opacity: 1,
    transition: { duration: 1.8, ease: EASE_LUXE },
  }),
  clink: (dir: number) => ({
    x: dir * -10,
    rotate: dir * 13.5,
    transition: { type: 'spring', stiffness: 380, damping: 14, mass: 0.72 },
  }),
  hold: (dir: number) => ({
    x: dir * -10,
    y: [0, -7, 0],
    rotate: [dir * 13.5, dir * 12, dir * 13.5],
    transition: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
  }),
};

export function ChampagneToast() {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const [toasted, setToasted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function play() {
      if (reduceMotion) {
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
  }, [controls, reduceMotion]);

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-blush px-6">
      <Image
        src="/weddings-hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-linear-to-b from-blush/70 via-blush/50 to-blush/80" />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-[42vh] w-[min(70vw,28rem)] rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />

      <h1 className="relative z-20 -mt-[18vh] text-center md:-mt-[12vh]">
        <span className="block overflow-hidden">
          <motion.span
            className="block font-serif text-2xl italic text-ink/80 md:text-6xl"
            initial={reduceMotion ? false : { y: '110%' }}
            animate={toasted ? { y: '0%' } : undefined}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            To your
          </motion.span>
        </span>
        <span className="mt-2 block overflow-hidden">
          <motion.span
            className="font-display block text-6xl tracking-tight text-ink uppercase md:text-9xl"
            initial={reduceMotion ? false : { y: '110%' }}
            animate={toasted ? { y: '0%' } : undefined}
            transition={{ duration: 1, delay: 0.08, ease: EASE_LUXE }}
          >
            Love.
          </motion.span>
        </span>
      </h1>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[62vh] items-end justify-center pb-[max(5.5rem,12vh)]"
        aria-hidden="true"
      >
        <motion.div
          className="origin-bottom -mr-5 md:-mr-8"
          custom={-1}
          variants={glassVariants}
          initial={reduceMotion ? 'clink' : 'hidden'}
          animate={controls}
          style={{ originX: 0.5, originY: 0.94 }}
        >
          <ChampagneFlute
            side="left"
            toasted={toasted}
            reduceMotion={Boolean(reduceMotion)}
          />
        </motion.div>
        <motion.div
          className="origin-bottom -ml-5 md:-ml-8"
          custom={1}
          variants={glassVariants}
          initial={reduceMotion ? 'clink' : 'hidden'}
          animate={controls}
          style={{ originX: 0.5, originY: 0.94 }}
        >
          <ChampagneFlute
            side="right"
            toasted={toasted}
            reduceMotion={Boolean(reduceMotion)}
          />
        </motion.div>

        <SparkBurst active={toasted && !reduceMotion} />
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
      className="h-[46vh] w-auto drop-shadow-2xl md:h-[58vh]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.58" />
          <stop offset="48%" stopColor="#e8f2f8" stopOpacity="0.1" />
          <stop offset="78%" stopColor="#c5d5e0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.38" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f8ebc4" />
          <stop offset="28%" stopColor="#edd089" />
          <stop offset="72%" stopColor="#d4a84a" />
          <stop offset="100%" stopColor="#b8862f" />
        </linearGradient>
        <linearGradient id={`${id}-liquid-light`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#7a4e12" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={`${id}-foot`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c4a574" stopOpacity="0.35" />
        </radialGradient>
        <clipPath id={`${id}-liquid-clip`}>
          <path d="M56 118 C54 158 62 208 82 244 C86 250 88 253 90 254 C92 253 94 250 98 244 C118 208 126 158 124 118 C112 112 100 110 90 110 C80 110 68 112 56 118 Z" />
        </clipPath>
        <clipPath id={`${id}-bowl-clip`}>
          <path d="M52 46 C48 88 46 130 52 176 C58 222 72 250 84 266 C87 270 90 272 90 272 C90 272 93 270 96 266 C108 250 122 222 128 176 C134 130 132 88 128 46 C116 38 102 34 90 34 C78 34 64 38 52 46 Z" />
        </clipPath>
      </defs>

      <ellipse cx="90" cy="508" rx="44" ry="6" fill="#0a0a0a" opacity="0.16" />

      <path
        d="M78 468 C54 474 42 488 42 498 C42 510 64 518 90 518 C116 518 138 510 138 498 C138 488 126 474 102 468 Z"
        fill={`url(#${id}-foot)`}
        stroke="#c4a574"
        strokeWidth="1.2"
      />
      <ellipse
        cx="90"
        cy="498"
        rx="46"
        ry="7"
        fill="none"
        stroke="#e8d5b0"
        strokeWidth="0.8"
        opacity="0.7"
      />

      <path
        d="M87 268 L87.8 468 L92.2 468 L93 268 Z"
        fill={`url(#${id}-glass)`}
        stroke="#c4a574"
        strokeWidth="1.1"
      />
      <path
        d="M89.2 272 L89.6 464"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <circle cx="90" cy="390" r="2.1" fill="#ffffff" opacity="0.55" />
      <circle
        cx="90"
        cy="390"
        r="2.1"
        fill="none"
        stroke="#c4a574"
        strokeWidth="0.5"
        opacity="0.5"
      />

      <path
        d="M52 46 C48 88 46 130 52 176 C58 222 72 250 84 266 C87 270 90 272 90 272 C90 272 93 270 96 266 C108 250 122 222 128 176 C134 130 132 88 128 46 C116 38 102 34 90 34 C78 34 64 38 52 46 Z"
        fill={`url(#${id}-glass)`}
        stroke="#c4a574"
        strokeWidth="1.35"
      />

      <g clipPath={`url(#${id}-liquid-clip)`}>
        <path
          d="M56 118 C54 158 62 208 82 244 C86 250 88 253 90 254 C92 253 94 250 98 244 C118 208 126 158 124 118 C112 112 100 110 90 110 C80 110 68 112 56 118 Z"
          fill={`url(#${id}-liquid)`}
        />
        <path
          d="M56 118 C54 158 62 208 82 244 C86 250 88 253 90 254 C92 253 94 250 98 244 C118 208 126 158 124 118 C112 112 100 110 90 110 C80 110 68 112 56 118 Z"
          fill={`url(#${id}-liquid-light)`}
        />
        <ellipse
          cx="90"
          cy="114"
          rx="34"
          ry="6"
          fill="#f7efd2"
          opacity="0.55"
        />
        <ellipse
          cx="78"
          cy="112"
          rx="10"
          ry="2.4"
          fill="#ffffff"
          opacity="0.45"
        />

        {BUBBLES.map((bubble) => (
          <Bubble
            key={bubble.id}
            bubble={bubble}
            reduceMotion={reduceMotion}
            start={242}
            end={118}
          />
        ))}
        {toasted
          ? FIZZ.map((bubble) => (
              <Bubble
                key={bubble.id}
                bubble={bubble}
                reduceMotion={reduceMotion}
                start={236}
                end={114}
                once
              />
            ))
          : null}

        <circle cx="72" cy="116" r="1.3" fill="#ffffff" opacity="0.55" />
        <circle cx="90" cy="113" r="1.8" fill="#ffffff" opacity="0.4" />
        <circle cx="108" cy="116" r="1.1" fill="#ffffff" opacity="0.5" />
        <circle cx="98" cy="118" r="0.8" fill="#ffffff" opacity="0.45" />
      </g>

      <path
        d="M60 58 C58 100 60 150 70 200"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M64 70 C62 110 66 160 74 206"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M118 64 C120 120 116 170 108 214"
        fill="none"
        stroke="#2a3340"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.08"
      />

      <g clipPath={`url(#${id}-bowl-clip)`}>
        <text
          x="90"
          y="148"
          textAnchor="middle"
          fill="#5c4318"
          opacity="0.72"
          style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          fontSize="8.4"
          letterSpacing="2.4"
          fontWeight="700"
        >
          ELMNT13
        </text>
        <text
          x="90"
          y="162"
          textAnchor="middle"
          fill="#7a5a28"
          opacity="0.8"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
          fontSize="11"
          fontStyle="italic"
          letterSpacing="0.6"
        >
          Weddings
        </text>
      </g>

      <ellipse
        cx="90"
        cy="40"
        rx="39"
        ry="8"
        fill="none"
        stroke="#d4b896"
        strokeWidth="2"
      />
      <ellipse
        cx="90"
        cy="40"
        rx="35"
        ry="6.2"
        fill="rgba(255,255,255,0.12)"
        stroke="#f2e4c8"
        strokeWidth="0.9"
      />
      <ellipse
        cx="78"
        cy="38"
        rx="12"
        ry="2.2"
        fill="#ffffff"
        opacity="0.45"
      />

      <ellipse cx="58" cy="96" rx="2.2" ry="3.4" fill="#ffffff" opacity="0.28" />
      <ellipse cx="62" cy="128" rx="1.5" ry="2.4" fill="#ffffff" opacity="0.22" />
      <ellipse cx="120" cy="108" rx="1.8" ry="2.8" fill="#ffffff" opacity="0.18" />
    </svg>
  );
}

function Bubble({
  bubble,
  reduceMotion,
  start,
  end,
  once = false,
}: {
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
        cy={start - (start - end) * 0.45}
        r={bubble.r}
        fill="#ffffff"
        opacity="0.35"
      />
    );
  }

  return (
    <motion.circle
      cx={bubble.x}
      r={bubble.r}
      fill="#ffffff"
      stroke="#f7efd2"
      strokeWidth="0.3"
      initial={{ cy: start, opacity: 0 }}
      animate={{
        cy: [start, end],
        cx: [bubble.x, bubble.x + bubble.drift, bubble.x],
        opacity: [0, 0.75, 0],
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
      className="absolute bottom-[46%] left-1/2 z-20 h-24 w-24 -translate-x-1/2"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.25, 1.6] }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {SPARKS.map((spark) => (
        <span
          key={spark.id}
          className="absolute top-1/2 left-1/2 h-px w-7 origin-left bg-linear-to-r from-gold-bright to-transparent"
          style={{ transform: `rotate(${spark.angle}deg)` }}
        />
      ))}
      <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-bright shadow-[0_0_18px_rgba(221,196,154,0.9)]" />
    </motion.div>
  );
}
