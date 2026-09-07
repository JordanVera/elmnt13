'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import {
  serviceCategories,
  serviceOfferings,
  type ServiceCategory,
} from '@/lib/services';
import { GoldLink } from '@/components/gold-link';
import { cn } from '@/lib/cn';

const COUNT = serviceOfferings.length;
const PIN_HEIGHT = `calc(100dvh + ${(COUNT - 1) * 55}vh)`;

export function ServicesExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const skip = Boolean(reduceMotion);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (skip) return;
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(value * COUNT)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const active = serviceOfferings[activeIndex] ?? serviceOfferings[0];
  const activeCategory =
    serviceCategories.find((category) => category.id === active.categoryId) ??
    serviceCategories[0];

  function scrollToIndex(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const start = window.scrollY + section.getBoundingClientRect().top;
    const range = section.offsetHeight - window.innerHeight;
    const top = start + range * ((index + 0.35) / COUNT);
    window.scrollTo({ top, behavior: skip ? 'auto' : 'smooth' });
  }

  function scrollToCategory(id: ServiceCategory['id']) {
    const index = serviceOfferings.findIndex((item) => item.categoryId === id);
    if (index >= 0) scrollToIndex(index);
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-paper motion-reduce:h-auto"
      style={skip ? undefined : { height: PIN_HEIGHT }}
    >
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:items-stretch motion-reduce:overflow-visible">
        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-0 z-20 h-px w-full origin-left bg-gold"
          style={skip ? { scaleX: 1 } : { scaleX: scrollYProgress }}
        />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-display text-[22vw] leading-none tracking-tight text-gold/8 uppercase select-none"
        >
          {activeCategory.stageTitle}
        </p>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-10 pb-28 lg:grid-cols-[0.32fr_1fr_0.4fr] lg:gap-10 lg:py-0">
          <nav aria-label="Service practices">
            <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
              Discover our services
            </p>
            <ul className="flex gap-6 lg:mt-10 lg:block lg:space-y-8 lg:gap-0">
              {serviceCategories.map((category) => {
                const selected = category.id === active.categoryId;
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => scrollToCategory(category.id)}
                      className="text-left"
                    >
                      <span
                        className={cn(
                          'font-display block text-sm leading-[0.95] tracking-tight uppercase transition-colors duration-500 lg:text-3xl xl:text-4xl',
                          selected
                            ? 'text-gold'
                            : 'text-paper/35 hover:text-paper/70',
                        )}
                      >
                        {category.title}
                      </span>
                    </button>
                    <p
                      className={cn(
                        'mt-3 hidden max-w-[16rem] text-sm leading-6 text-paper/50 transition-opacity duration-500 lg:block',
                        selected ? 'opacity-100' : 'opacity-0',
                      )}
                    >
                      {category.short}
                    </p>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 max-lg:min-h-[48vh]">
            <p className="mb-5 text-[11px] tracking-[0.28em] text-paper/40 uppercase lg:mb-6">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(COUNT).padStart(2, '0')}
            </p>
            <ul>
              {serviceOfferings.map((offering, index) => {
                const selected = skip || index === activeIndex;
                return (
                  <li
                    key={offering.name}
                    className={cn(
                      'border-b border-white/10',
                      !skip && !selected && 'max-lg:hidden',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToIndex(index)}
                      aria-current={selected ? 'true' : undefined}
                      className="flex w-full items-start justify-between gap-4 py-3 text-left"
                    >
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'font-display block tracking-tight uppercase transition-[color,font-size,line-height] duration-500',
                            selected
                              ? 'text-2xl leading-[0.95] text-gold sm:text-4xl lg:text-[2.6rem]'
                              : 'text-sm text-paper/35 hover:text-paper/65 lg:text-base',
                          )}
                        >
                          {offering.name}
                        </span>
                        <span
                          className={cn(
                            'grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:grid-rows-[1fr]',
                            selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                          )}
                        >
                          <span className="min-h-0 overflow-hidden">
                            <span className="mt-4 block max-w-xl text-sm leading-7 text-paper/70">
                              {offering.description}
                            </span>
                          </span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          'mt-1 shrink-0 text-gold transition-transform duration-500',
                          selected ? 'rotate-45' : 'rotate-0',
                        )}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative hidden h-[72vh] max-h-160 overflow-hidden lg:block">
            {serviceCategories.map((category) => (
              <motion.div
                key={category.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: category.id === active.categoryId ? 1 : 0,
                }}
                transition={{
                  duration: skip ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 0px, 28vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/15 to-ink/10" />
              </motion.div>
            ))}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                {activeCategory.stageTitle}
              </p>
              <p className="mt-2 font-serif text-2xl italic text-paper">
                {activeCategory.short}
              </p>
              <div className="mt-5">
                <GoldLink href="/work" inverted>
                  See the work
                </GoldLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
