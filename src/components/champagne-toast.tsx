'use client';

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from 'react';
import Image from 'next/image';
import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MEET_ROTATE = -11;
const HOLD_ROTATE = -9.5;
const PIVOT_Y = 0.68;
const RIM_Y = 0.055;
const RIM_WIDTH = 0.262;

function kissOffset(width: number, height: number, degrees: number) {
  const theta = (Math.abs(degrees) * Math.PI) / 180;
  const gap =
    width * (1 - RIM_WIDTH * Math.cos(theta)) -
    2 * (PIVOT_Y - RIM_Y) * height * Math.sin(theta);
  return -(gap / 2) * 0.88;
}

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

function getGlassVariants(meetX: number): Variants {
  return {
    hidden: (dir: number) => ({
      x: `${dir * 42}vw`,
      rotate: dir * 8,
      opacity: 0,
    }),
    clink: (dir: number) => ({
      x: dir * meetX,
      rotate: dir * MEET_ROTATE,
      opacity: 1,
      transition: { duration: 2.8, ease: EASE_LUXE },
    }),
    hold: (dir: number) => ({
      x: dir * meetX,
      y: [0, -4, 0],
      rotate: [dir * MEET_ROTATE, dir * HOLD_ROTATE, dir * MEET_ROTATE],
      transition: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' },
    }),
  };
}

export function ChampagneToast() {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const glassRef = useRef<HTMLDivElement>(null);
  const [toasted, setToasted] = useState(false);
  const [meetX, setMeetX] = useState<number | null>(null);
  const skipMotion = Boolean(reduceMotion);
  const ready = meetX !== null;
  const glassVariants = useMemo(() => getGlassVariants(meetX ?? 0), [meetX]);

  useLayoutEffect(() => {
    const el = glassRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 8 || height < 8) return;
      setMeetX(kissOffset(width, height, Math.abs(MEET_ROTATE)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;

    async function play() {
      if (skipMotion) {
        controls.set('clink');
        setToasted(true);
        return;
      }

      await controls.start('clink');
      if (cancelled) return;
      setToasted(true);
      await controls.start('hold');
    }

    void play();
    return () => {
      cancelled = true;
    };
  }, [controls, ready, skipMotion]);

  return (
    <section className="relative min-h-dvh overflow-hidden bg-white">
      <div
        className="absolute inset-x-0 top-16 bottom-32 flex items-end justify-center md:bottom-40"
        aria-hidden="true"
      >
        <motion.div
          className="h-[90%] w-auto shrink-0"
          custom={-1}
          variants={glassVariants}
          initial={skipMotion ? 'clink' : 'hidden'}
          animate={controls}
          style={{ originX: 0.5, originY: PIVOT_Y }}
        >
          <ChampagneFlute
            ref={glassRef}
            side="left"
            toasted={toasted}
            reduceMotion={skipMotion}
          />
        </motion.div>
        <motion.div
          className="h-[90%] w-auto shrink-0"
          custom={1}
          variants={glassVariants}
          initial={skipMotion ? 'clink' : 'hidden'}
          animate={controls}
          style={{ originX: 0.5, originY: PIVOT_Y }}
        >
          <ChampagneFlute
            side="right"
            toasted={toasted}
            reduceMotion={skipMotion}
          />
        </motion.div>
        <SparkBurst active={toasted && !skipMotion} />
      </div>

      <h1 className="absolute inset-x-0 bottom-0 z-10 flex w-full flex-col items-center px-6 pb-8 text-center md:pb-12">
        <span className="block overflow-hidden pb-1">
          <motion.span
            className="block font-serif text-2xl italic text-ink md:text-4xl"
            initial={skipMotion ? false : { y: '115%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: skipMotion ? 0 : 1,
              delay: skipMotion ? 0 : 2.15,
              ease: EASE_LUXE,
            }}
          >
            To your
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span
            className="font-display block text-5xl tracking-tight text-ink uppercase md:text-7xl"
            initial={skipMotion ? false : { y: '115%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: skipMotion ? 0 : 1.1,
              delay: skipMotion ? 0 : 2.28,
              ease: EASE_LUXE,
            }}
          >
            Love.
          </motion.span>
        </span>
      </h1>
    </section>
  );
}

function ChampagneFlute({
  side,
  toasted,
  reduceMotion,
  ref,
}: {
  side: 'left' | 'right';
  toasted: boolean;
  reduceMotion: boolean;
  ref?: Ref<HTMLDivElement>;
}) {
  const clipId = `${side}-liquid-bowl`;
  const bubbleId = `${side}-bubble-glint`;

  return (
    <div ref={ref} className="relative aspect-2/3 h-full">
      <Image
        src="/champagne-flute.png"
        alt=""
        fill
        sizes="(min-width: 768px) 40vh, 32vh"
        className="object-contain drop-shadow-[0_24px_40px_rgba(10,10,10,0.12)]"
        preload
      />
      <div className="absolute top-[31%] left-1/2 w-[46%] -translate-x-1/2 text-center">
        <p className="font-display font-bold text-[clamp(0.65rem,1.35vh,0.95rem)] tracking-[0.32em] text-[#fff6e4]">
          ELMNT13
        </p>
        <p className="font-serif font-bold text-[clamp(0.85rem,1.8vh,1.2rem)] italic text-white/90">
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
  bubble: {
    x: number;
    r: number;
    delay: number;
    duration: number;
    drift: number;
  };
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
      className="absolute top-[18%] left-1/2 z-20 h-32 w-32 -translate-x-1/2"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 1.55] }}
      transition={{ duration: 0.85, ease: EASE_LUXE }}
    >
      {SPARKS.map((spark) => (
        <span
          key={spark.id}
          className="absolute top-1/2 left-1/2 h-px w-8 origin-left bg-linear-to-r from-gold-bright to-transparent"
          style={{ transform: `rotate(${spark.angle}deg)` }}
        />
      ))}
      <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-bright shadow-[0_0_22px_rgba(221,196,154,1)]" />
    </motion.div>
  );
}
