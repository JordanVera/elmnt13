'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/reveal';

const reasons = [
  'We approach every project with intention.',
  'We consider every detail.',
  'We think beyond the expected.',
];

const HOLD_MS = 3800;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function WhyChoose() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      setIndex((current) => (current + 1) % reasons.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [inView, paused]);

  const line = reasons[index];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 pt-24 pb-12 md:pt-32 md:pb-16"
    >
      <div className="relative mx-auto max-w-6xl text-center">
        <Reveal>
          <h2 className="font-display text-5xl leading-[0.9] tracking-tight text-ink uppercase md:text-7xl">
            Why clients choose <span className="text-gold">ELMNT13</span>
          </h2>
        </Reveal>

        <div className="relative mt-6 md:mt-8">
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[100px] w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2 md:h-[140px]"
          >
            <defs>
              <linearGradient id="why-wave-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--gold)" />
                <stop offset="45%" stopColor="var(--gold-bright)" />
                <stop offset="100%" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
            <path
              className="gold-wave"
              d="M-60 210 C 200 210, 280 36, 520 48 S 780 286, 960 240 S 1220 52, 1500 168"
              fill="none"
              stroke="url(#why-wave-gold)"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </svg>

          <div
            className="relative z-10 grid overflow-hidden"
            style={{ perspective: 900 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {reasons.map((reason) => (
              <p
                key={reason}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 font-serif text-[clamp(0.95rem,3.4vw,2.5rem)] leading-[1.2] text-ink"
              >
                {reason}
              </p>
            ))}

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={line}
                aria-live="polite"
                className="col-start-1 row-start-1 font-serif text-[clamp(0.95rem,3.4vw,2.5rem)] leading-[1.2] text-ink"
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: 82 }
                }
                animate={
                  reduceMotion ? { opacity: 1 } : { opacity: 1, rotateX: 0 }
                }
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: -82 }
                }
                transition={{
                  duration: reduceMotion ? 0.35 : 0.65,
                  ease: EASE,
                }}
                style={{
                  transformOrigin: 'center',
                  backfaceVisibility: 'hidden',
                }}
              >
                {line}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
