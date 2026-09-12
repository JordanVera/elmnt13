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
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-white px-6 pb-24 "
      >
        <div className="relative mx-auto max-w-6xl text-center">
          <Reveal>
            <h2 className="font-display text-5xl leading-[0.9] tracking-tight text-ink uppercase md:text-7xl">
              Why clients choose <span className="text-gold">US</span>
            </h2>
          </Reveal>

          <div className="relative mt-6 md:mt-8">
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
                  className="col-start-1 row-start-1 font-serif text-5xl leading-[1.2] text-ink"
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

          {/* <div
            className="mx-auto mt-12 hidden h-px w-36 bg-gold  md:block"
            aria-hidden="true"
          /> */}
        </div>
      </section>
    </>
  );
}
