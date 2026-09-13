'use client';

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  buildWeddingThread,
  type KnotKind,
  type KnotSide,
  type ThreadPlan,
} from '@/lib/wedding-thread';

const SPRING = { stiffness: 52, damping: 24, mass: 0.42, restDelta: 0.001 };

export function KnotMarker({
  kind,
  side,
  word,
}: {
  kind: KnotKind;
  side: KnotSide;
  word: string;
}) {
  return (
    <div
      data-knot={kind}
      data-side={side}
      data-word={word}
      className="pointer-events-none h-20 md:h-24"
      aria-hidden="true"
    />
  );
}

export function TieTheKnot({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const tiedRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const [plan, setPlan] = useState<ThreadPlan | null>(null);
  const [tiedCount, setTiedCount] = useState(0);
  const skip = Boolean(reduceMotion);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end 0.72'],
  });
  const progress = useSpring(scrollYProgress, SPRING);
  const dashOffset = useTransform(progress, (value) => {
    if (!plan) return 0;
    return plan.length * (1 - value);
  });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const width = wrap.clientWidth;
      const height = wrap.scrollHeight;
      const compact = width < 768;
      const knots = Array.from(
        wrap.querySelectorAll<HTMLElement>('[data-knot]'),
      ).map((node) => ({
        kind: node.dataset.knot as KnotKind,
        side: node.dataset.side as KnotSide,
        word: node.dataset.word ?? '',
        y: node.offsetTop + node.offsetHeight * 0.45,
      }));

      const next = buildWeddingThread(width, height, knots, compact);
      setPlan((current) => {
        if (
          current &&
          next &&
          current.width === next.width &&
          current.height === next.height &&
          current.d === next.d
        ) {
          return current;
        }
        return next;
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!plan) return;
    const value = skip ? 1 : progress.get();
    const path = pathRef.current;
    if (path) {
      const at = path.getPointAtLength(plan.length * value);
      tipRef.current?.setAttribute('cx', String(at.x));
      tipRef.current?.setAttribute('cy', String(at.y));
      glowRef.current?.setAttribute('cx', String(at.x));
      glowRef.current?.setAttribute('cy', String(at.y));
    }
    const nextTied = plan.knots.filter((knot) => value >= knot.tiedAt).length;
    tiedRef.current = nextTied;
    setTiedCount(nextTied);
  }, [plan, progress, skip]);

  useMotionValueEvent(progress, 'change', (value) => {
    const path = pathRef.current;
    if (!path || !plan) return;

    const at = path.getPointAtLength(
      Math.max(0, Math.min(plan.length, plan.length * value)),
    );
    tipRef.current?.setAttribute('cx', String(at.x));
    tipRef.current?.setAttribute('cy', String(at.y));
    glowRef.current?.setAttribute('cx', String(at.x));
    glowRef.current?.setAttribute('cy', String(at.y));

    const nextTied = plan.knots.filter((knot) => value >= knot.tiedAt).length;
    if (nextTied !== tiedRef.current) {
      tiedRef.current = nextTied;
      setTiedCount(nextTied);
    }
  });

  return (
    <div ref={wrapRef} className="relative">
      {children}

      {plan ? (
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
          viewBox={`0 0 ${plan.width} ${plan.height}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`${uid}-thread`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#ddc49a" />
              <stop offset="45%" stopColor="#c4a574" />
              <stop offset="100%" stopColor="#ddc49a" />
            </linearGradient>
            <filter
              id={`${uid}-glow`}
              x="-20%"
              y="-4%"
              width="140%"
              height="108%"
            >
              <feGaussianBlur stdDeviation="1.15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            ref={pathRef}
            d={plan.d}
            stroke={`url(#${uid}-thread)`}
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${uid}-glow)`}
            strokeDasharray={plan.length}
            style={{ strokeDashoffset: skip ? 0 : dashOffset }}
            opacity={skip ? 0.42 : 0.92}
          />
          <motion.path
            d={plan.d}
            stroke="#fff6e4"
            strokeWidth="0.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={plan.length}
            style={{ strokeDashoffset: skip ? 0 : dashOffset }}
            opacity={skip ? 0.2 : 0.38}
          />

          {skip ? null : (
            <>
              <circle
                ref={glowRef}
                r="7"
                fill="#ddc49a"
                opacity="0.18"
              />
              <circle
                ref={tipRef}
                r="2.15"
                fill="#f7edd4"
                stroke="#c4a574"
                strokeWidth="0.6"
              />
            </>
          )}
        </svg>
      ) : null}

      {plan
        ? plan.knots.map((knot, index) => {
            const tied = skip || index < tiedCount;
            return (
              <span
                key={`${knot.word}-${knot.y}`}
                className="pointer-events-none absolute z-10"
                style={{ left: knot.x, top: knot.y }}
                aria-hidden="true"
              >
                <KnotSparkle active={tied} delay={index * 0.04} />
                <span
                  className="absolute top-4 font-serif text-[12px] tracking-[0.2em] text-gold italic transition-opacity duration-700 md:text-[13px]"
                  style={{
                    opacity: tied ? 0.88 : 0,
                    left: knot.side === 'right' ? 'auto' : 22,
                    right: knot.side === 'right' ? 22 : 'auto',
                  }}
                >
                  {knot.word}
                </span>
              </span>
            );
          })
        : null}
    </div>
  );
}

function KnotSparkle({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  return (
    <span className="absolute top-0 left-0">
      {[
        { x: -14, y: -18, size: 11, rotate: -18 },
        { x: 13, y: -9, size: 8, rotate: 22 },
        { x: -3, y: 13, size: 7, rotate: 8 },
      ].map((spark, index) => (
        <motion.span
          key={spark.size}
          className="absolute text-gold-bright"
          style={{
            width: spark.size,
            height: spark.size,
            marginLeft: -spark.size / 2,
            marginTop: -spark.size / 2,
          }}
          initial={false}
          animate={
            active
              ? {
                  opacity: [0, 1, 0.85],
                  x: spark.x,
                  y: spark.y,
                  scale: [0.2, 1.15, 1],
                  rotate: spark.rotate,
                }
              : { opacity: 0, x: 0, y: 0, scale: 0.2 }
          }
          transition={{
            duration: 0.85,
            delay: delay + index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
            <path
              d="M8 0c.45 3.35 1.55 5.45 4.2 6.2C9.55 6.95 8.45 9.05 8 16c-.45-3.35-1.55-5.45-4.2-6.2C6.45 9.05 7.55 6.95 8 0Z"
              fill="currentColor"
            />
          </svg>
        </motion.span>
      ))}
    </span>
  );
}
