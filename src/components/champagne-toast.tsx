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
import Link from 'next/link';
import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PIVOT_Y = 0.68;
const RIM_Y = 0.055;
const RIM_WIDTH = 0.262;
const SETTLE_BACK = 0.08;
const KISS_DEGREES = 11.5;

// Positive rotate tilts the top of the glass to the right. The left glass
// leans right (toward center) and the right glass leans left, with slightly
// different angles and heights so the toast reads as two hands, not a mirror.
const LEFT = {
  meetRotate: 13,
  settleRotate: 5.5,
  holdRotate: 4,
  meetY: -18,
  settleY: -10,
} as const;

const RIGHT = {
  meetRotate: -10,
  settleRotate: -4.5,
  holdRotate: -3,
  meetY: 12,
  settleY: 8,
} as const;

const PAGE_NAV = [
  { href: '#services', label: 'Services' },
  // { href: '#story', label: 'Story' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
] as const;

function poseFor(dir: number) {
  return dir < 0 ? LEFT : RIGHT;
}

function kissOffset(width: number, height: number, degrees: number) {
  const theta = (Math.abs(degrees) * Math.PI) / 180;
  const gap =
    width * (1 - RIM_WIDTH * Math.cos(theta)) -
    2 * (PIVOT_Y - RIM_Y) * height * Math.sin(theta);
  return -(gap / 2) * 0.96;
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

const STARS = [
  { id: 1, x: -26, y: -52, size: 20, delay: 0, rotate: -16 },
  { id: 2, x: 40, y: -34, size: 14, delay: 0.05, rotate: 22 },
  { id: 3, x: -50, y: 10, size: 17, delay: 0.08, rotate: 10 },
  { id: 4, x: 54, y: 24, size: 12, delay: 0.12, rotate: -14 },
  { id: 5, x: 8, y: 46, size: 18, delay: 0.03, rotate: 36 },
  { id: 6, x: -30, y: -12, size: 10, delay: 0.15, rotate: -28 },
  { id: 7, x: 28, y: -60, size: 12, delay: 0.1, rotate: 14 },
  { id: 8, x: -10, y: 34, size: 9, delay: 0.18, rotate: 4 },
  { id: 9, x: 64, y: -8, size: 9, delay: 0.2, rotate: 30 },
  { id: 10, x: -62, y: -30, size: 11, delay: 0.14, rotate: -8 },
] as const;

function getGlassVariants(meetX: number, settleX: number): Variants {
  return {
    hidden: (dir: number) => ({
      x: `${dir * 42}vw`,
      y: poseFor(dir).meetY * 0.35,
      rotate: -dir * 8,
      opacity: 0,
    }),
    clink: (dir: number) => {
      const pose = poseFor(dir);
      return {
        x: dir * meetX,
        y: pose.meetY,
        rotate: pose.meetRotate,
        opacity: 1,
        transition: { duration: 2.8, ease: EASE_LUXE },
      };
    },
    settle: (dir: number) => {
      const pose = poseFor(dir);
      return {
        x: dir * settleX,
        y: pose.settleY,
        rotate: pose.settleRotate,
        opacity: 1,
        transition: { duration: 1.15, delay: 0.18, ease: EASE_LUXE },
      };
    },
    hold: (dir: number) => {
      const pose = poseFor(dir);
      return {
        x: dir * settleX,
        y: [pose.settleY, pose.settleY - 4, pose.settleY],
        rotate: [pose.settleRotate, pose.holdRotate, pose.settleRotate],
        transition: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' },
      };
    },
  };
}

export function ChampagneToast() {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [toasted, setToasted] = useState(false);
  const [pose, setPose] = useState<{
    meetX: number;
    settleX: number;
    contactY: number;
  } | null>(null);
  const skipMotion = Boolean(reduceMotion);
  const ready = pose !== null;
  const glassVariants = useMemo(
    () => getGlassVariants(pose?.meetX ?? 0, pose?.settleX ?? 0),
    [pose],
  );

  useLayoutEffect(() => {
    const el = glassRef.current;
    if (!el) return;

    const update = () => {
      // Layout sizes, not the bounding box: the glass is already rotated and
      // translated in its `hidden` pose when this first runs.
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      if (width < 8 || height < 8) return;

      const meetX = kissOffset(width, height, KISS_DEGREES);

      let contactY = 0;
      const stage = stageRef.current;
      const section = sectionRef.current;
      if (stage && section) {
        const glassTop =
          stage.getBoundingClientRect().bottom -
          height -
          section.getBoundingClientRect().top;
        const theta = (KISS_DEGREES * Math.PI) / 180;
        const rimDrop = (PIVOT_Y - RIM_Y) * height * (1 - Math.cos(theta));
        contactY =
          glassTop +
          RIM_Y * height +
          (LEFT.meetY + RIGHT.meetY) / 2 +
          rimDrop;
      }

      setPose({ meetX, settleX: meetX + width * SETTLE_BACK, contactY });
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
        controls.set('settle');
        setToasted(true);
        return;
      }

      await controls.start('clink');
      if (cancelled) return;
      setToasted(true);
      await controls.start('settle');
      if (cancelled) return;
      await controls.start('hold');
    }

    void play();
    return () => {
      cancelled = true;
    };
  }, [controls, ready, skipMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden bg-white"
    >
      <div
        ref={stageRef}
        className="absolute inset-x-0 top-8 bottom-19 flex items-end justify-center md:bottom-24"
        aria-hidden="true"
      >
        <motion.div
          className="h-[92%] w-auto shrink-0 md:h-[96%]"
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
          className="h-[92%] w-auto shrink-0 md:h-[96%]"
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
      </div>

      <SparkBurst
        active={toasted && !skipMotion}
        contactY={pose?.contactY ?? 0}
      />

      <h1 className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <span className="block overflow-hidden pb-[0.32em]">
          <motion.span
            className="block font-serif text-[clamp(2.4rem,7vw,5.75rem)] leading-[1.12] italic text-ink"
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
            className="font-display block text-[clamp(4.75rem,18vw,13rem)] leading-[0.82] tracking-tight text-ink uppercase"
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

      <motion.nav
        aria-label="On this page"
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        initial={skipMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: skipMotion ? 0 : 0.85,
          delay: skipMotion ? 0 : 2.9,
          ease: EASE_LUXE,
        }}
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:gap-x-12">
          {PAGE_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] tracking-[0.32em] text-gold uppercase transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
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
        sizes="(min-width: 768px) 42vh, 34vh"
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

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        d="M8 0c.45 3.35 1.55 5.45 4.2 6.2C9.55 6.95 8.45 9.05 8 16c-.45-3.35-1.55-5.45-4.2-6.2C6.45 9.05 7.55 6.95 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SparkBurst({
  active,
  contactY,
}: {
  active: boolean;
  contactY: number;
}) {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute left-1/2 z-20"
      style={{ top: contactY > 0 ? contactY : '14%' }}
    >
      <motion.div
        className="absolute top-0 left-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 1.7] }}
        transition={{ duration: 1.1, ease: EASE_LUXE }}
      >
        {SPARKS.map((spark) => (
          <span
            key={spark.id}
            className="absolute top-1/2 left-1/2 h-px w-12 origin-left bg-linear-to-r from-gold-bright to-transparent"
            style={{ transform: `rotate(${spark.angle}deg)` }}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-bright shadow-[0_0_32px_rgba(221,196,154,1)]" />
      </motion.div>
      {STARS.map((star) => (
        <motion.span
          key={star.id}
          className="absolute top-0 left-0 text-gold-bright"
          style={{
            width: star.size,
            height: star.size,
            marginLeft: -star.size / 2,
            marginTop: -star.size / 2,
          }}
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0.1,
            rotate: star.rotate,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: star.x,
            y: star.y,
            scale: [0.1, 1.25, 1, 0.7],
            rotate: star.rotate + 40,
          }}
          transition={{
            duration: 1.6,
            delay: star.delay,
            ease: EASE_LUXE,
            opacity: { duration: 1.6, delay: star.delay, times: [0, 0.15, 0.7, 1] },
          }}
        >
          <SparkleIcon className="h-full w-full drop-shadow-[0_0_12px_rgba(221,196,154,0.95)]" />
        </motion.span>
      ))}
    </div>
  );
}
