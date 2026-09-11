'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { SlideLine } from '@/components/slide-line';
import { cn } from '@/lib/cn';

const FIRST_LINE_DELAY = 0.15;
const SECOND_LINE_DELAY = 0.95;

function StatementTypography({
  dark,
  active,
  skip,
}: {
  dark: boolean;
  active: boolean;
  skip: boolean;
}) {
  return (
    <h2
      aria-label="Love is in the details"
      className="mx-auto flex w-max max-w-full flex-col items-start overflow-hidden"
    >
      <SlideLine
        from="left"
        delay={FIRST_LINE_DELAY}
        skip={skip}
        active={active}
        className={cn(
          'font-serif text-[clamp(2.5rem,7.5vw,5.75rem)] leading-[0.95] italic',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        Love is in the
      </SlideLine>
      <SlideLine
        from="right"
        delay={SECOND_LINE_DELAY}
        skip={skip}
        active={active}
        className="mt-1 ml-[0.42em] font-display text-[clamp(3.25rem,10.5vw,8rem)] leading-[0.88] tracking-tight text-gold uppercase"
      >
        details
      </SlideLine>
    </h2>
  );
}

export function DetailsMoment({
  tone = 'blush',
  compact = false,
  layout = 'inline',
}: {
  tone?: 'blush' | 'ink' | 'paper';
  compact?: boolean;
  layout?: 'inline' | 'tagline';
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);
  const dark = tone === 'ink';

  useEffect(() => {
    if (skip) {
      setActive(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -4% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [skip]);

  const heightClass =
    compact && layout === 'tagline'
      ? 'py-8 md:py-10'
      : compact
        ? 'min-h-[38vh] py-14 md:py-16'
        : layout === 'inline'
          ? 'py-6 md:py-8'
          : 'min-h-[70vh] py-20';

  return (
    <section
      ref={sectionRef}
      className={
        dark
          ? `flex ${heightClass} items-center overflow-hidden bg-ink px-6`
          : tone === 'paper'
            ? `flex ${heightClass} items-center overflow-hidden bg-white px-6`
            : `flex ${heightClass} items-center overflow-hidden bg-blush px-6`
      }
    >
      <div
        className={`mx-auto w-full max-w-6xl ${layout === 'tagline' ? 'text-left' : 'text-center'}`}
      >
        {layout === 'tagline' ? (
          <Reveal>
            <p className="-mt-2 text-center text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              <span className="block font-sans text-6xl! font-light tracking-[0em] text-black uppercase">
                We take your
              </span>
              <span className="mt-2 block ml-100!">
                <span className="font-display font-bold text-black uppercase">
                  Vision
                </span>{' '}
                <span className="font-serif text-gold italic normal-case">
                  further
                </span>
              </span>
            </p>
          </Reveal>
        ) : (
          <StatementTypography dark={dark} active={active} skip={skip} />
        )}
      </div>
    </section>
  );
}
