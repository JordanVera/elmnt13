'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  serviceCategories,
  type ServiceCategory,
  type ServiceOption,
} from '@/lib/services';
import { GoldLink } from '@/components/gold-link';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

type OptionBeat = {
  kind: 'option';
  categoryId: ServiceCategory['id'];
  optionIndex: number;
  option: ServiceOption;
};

type TypesBeat = {
  kind: 'types';
  categoryId: ServiceCategory['id'];
};

type Beat = OptionBeat | TypesBeat;

const beats: Beat[] = serviceCategories.flatMap((category) => [
  ...category.options.map((option, optionIndex) => ({
    kind: 'option' as const,
    categoryId: category.id,
    optionIndex,
    option,
  })),
  { kind: 'types' as const, categoryId: category.id },
]);

const COUNT = beats.length;
const PIN_HEIGHT = `calc(100dvh + ${(COUNT - 1) * 62}vh)`;

function typesLabel(category: ServiceCategory) {
  return category.id === 'experiential'
    ? 'Types of experiences'
    : 'Types of events';
}

function CategoryHeading({
  category,
  selected,
  onSelect,
  alwaysOpen = false,
}: {
  category: ServiceCategory;
  selected: boolean;
  onSelect: () => void;
  alwaysOpen?: boolean;
}) {
  const words = category.title.split(' ');
  const open = alwaysOpen || selected;

  return (
    <li className={cn(!alwaysOpen && !selected && 'max-lg:hidden')}>
      <button
        type="button"
        onClick={onSelect}
        aria-current={selected ? 'true' : undefined}
        className="w-full cursor-pointer text-left"
      >
        <span
          className={cn(
            'font-display block leading-[0.86] tracking-tight uppercase transition-[font-size,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            open
              ? 'text-[clamp(2.15rem,5.8vw,5.75rem)] text-paper'
              : 'text-[clamp(1.2rem,2.2vw,2.15rem)] text-paper/28 hover:text-paper/55',
          )}
        >
          {words.map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </span>
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:grid-rows-[1fr]',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-4 max-w-md font-serif text-lg italic text-gold sm:mt-5 sm:text-2xl md:text-3xl">
            {category.short}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-paper/55 max-lg:hidden lg:mt-5">
            {category.description}
          </p>
          <div className="mt-6 max-lg:hidden lg:mt-8">
            <GoldLink href="/contact" inverted>
              Start an inquiry
            </GoldLink>
          </div>
        </div>
      </div>
    </li>
  );
}

function OptionsList({
  category,
  activeIndex,
  expandAll,
  onSelect,
}: {
  category: ServiceCategory;
  activeIndex: number;
  expandAll: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <ul>
      {category.options.map((option, index) => {
        const selected = expandAll || index === activeIndex;

        return (
          <li
            key={option.name}
            className={cn(
              'border-b border-white/10',
              !expandAll && !selected && 'max-sm:hidden',
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-expanded={selected}
              aria-current={selected ? 'true' : undefined}
              className="flex w-full cursor-pointer items-start justify-between gap-4 py-3 text-left md:py-3.5"
            >
              <span className="min-w-0">
                <span
                  className={cn(
                    'font-display block tracking-tight uppercase transition-[color,font-size,line-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    selected
                      ? 'text-[clamp(1.35rem,3.2vw,3.15rem)] leading-[0.95] text-paper'
                      : 'text-sm text-paper/35 hover:text-paper/70 lg:text-lg',
                  )}
                >
                  {option.name}
                </span>
                <span
                  className={cn(
                    'grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:grid-rows-[1fr]',
                    selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <span className="min-h-0 overflow-hidden">
                    <span className="mt-3 block max-w-xl text-sm leading-6 text-paper/60 max-md:line-clamp-4 md:mt-4 md:leading-7">
                      {option.description}
                    </span>
                  </span>
                </span>
              </span>
              <span
                className={cn(
                  'mt-1 shrink-0 text-lg text-gold transition-transform duration-500',
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
  );
}

function TypesPanel({
  category,
  animate,
}: {
  category: ServiceCategory;
  animate: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
        {typesLabel(category)}
      </p>
      <ul className="mt-6">
        {category.stageItems.map((item, index) => (
          <motion.li
            key={item.label}
            initial={animate ? { opacity: 0, y: 18 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animate ? 0.55 : 0,
              delay: animate ? 0.08 + index * 0.055 : 0,
              ease: EASE,
            }}
            className="border-b border-white/10"
          >
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-baseline justify-between gap-4 py-2.5 md:py-3.5"
              >
                <span className="font-display text-[clamp(1.15rem,2.2vw,1.85rem)] leading-none tracking-tight text-gold uppercase">
                  {item.label}
                </span>
                <span className="text-[11px] tracking-[0.22em] text-gold/70 uppercase">
                  View
                </span>
              </Link>
            ) : (
              <span className="flex items-baseline gap-5 py-2.5 md:py-3.5">
                <span className="w-6 shrink-0 text-[11px] tracking-[0.18em] text-gold/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(1.15rem,2.2vw,1.85rem)] leading-none tracking-tight text-paper uppercase">
                  {item.label}
                </span>
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const skip = reduceMotion === true;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (skip) return;

    let frame = 0;
    let section: HTMLElement | null = null;

    const update = () => {
      const node = section ?? sectionRef.current;
      if (!node) return;
      section = node;

      const range = node.offsetHeight - window.innerHeight;
      const progress =
        range <= 0
          ? 0
          : Math.min(1, Math.max(0, -node.getBoundingClientRect().top / range));

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const next = Math.min(
        COUNT - 1,
        Math.max(0, Math.floor(progress * COUNT)),
      );
      setActiveIndex((current) => (current === next ? current : next));
    };

    const attach = () => {
      if (sectionRef.current) {
        update();
        return;
      }
      frame = window.requestAnimationFrame(attach);
    };

    attach();
    window.addEventListener('scroll', update, { passive: true, capture: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
    };
  }, [skip]);

  const beat = beats[activeIndex] ?? beats[0];
  const activeCategory =
    serviceCategories.find((category) => category.id === beat.categoryId) ??
    serviceCategories[0];
  const showingTypes = beat.kind === 'types';
  const activeOptionIndex = beat.kind === 'option' ? beat.optionIndex : 0;

  function scrollToIndex(index: number) {
    const section = sectionRef.current;
    if (!section) return;

    if (skip) {
      const category = serviceCategories.find(
        (item) => item.id === beats[index]?.categoryId,
      );
      document.getElementById(category?.id ?? '')?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
      return;
    }

    const start = window.scrollY + section.getBoundingClientRect().top;
    const range = section.offsetHeight - window.innerHeight;
    const top = start + range * ((index + 0.35) / COUNT);
    window.scrollTo({ top, behavior: skip ? 'auto' : 'smooth' });
  }

  function scrollToCategory(id: ServiceCategory['id']) {
    if (skip) {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    const index = beats.findIndex((item) => item.categoryId === id);
    if (index >= 0) scrollToIndex(index);
  }

  function scrollToOption(
    categoryId: ServiceCategory['id'],
    optionIndex: number,
  ) {
    const index = beats.findIndex(
      (item) =>
        item.kind === 'option' &&
        item.categoryId === categoryId &&
        item.optionIndex === optionIndex,
    );
    if (index >= 0) scrollToIndex(index);
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-paper motion-reduce:h-auto"
      style={skip ? undefined : { height: PIN_HEIGHT }}
    >
      <h1 className="sr-only">Services</h1>
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:items-stretch motion-reduce:overflow-visible">
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute top-0 left-0 z-20 h-px w-full origin-left bg-gold motion-reduce:hidden"
          style={{ transform: 'scaleX(0)' }}
        />

        {skip ? (
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            {serviceCategories.map((category, index) => (
              <div
                key={category.id}
                id={category.id}
                className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-20"
              >
                <div>
                  {index === 0 ? (
                    <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                      Discover our services
                    </p>
                  ) : null}
                  <nav
                    aria-label={category.title}
                    className={index === 0 ? 'mt-8 lg:mt-14' : undefined}
                  >
                    <ul>
                      <CategoryHeading
                        category={category}
                        selected
                        alwaysOpen
                        onSelect={() => scrollToCategory(category.id)}
                      />
                    </ul>
                  </nav>
                </div>
                <div className="min-w-0">
                  <OptionsList
                    category={category}
                    activeIndex={0}
                    expandAll
                    onSelect={(optionIndex) =>
                      scrollToOption(category.id, optionIndex)
                    }
                  />
                  <div className="mt-14">
                    <TypesPanel category={category} animate={false} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 content-start gap-7 px-6 pt-20 pb-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:content-center lg:items-center lg:gap-20 lg:px-10 lg:pt-20 lg:pb-10">
            <div>
              <p className="max-w-xs text-[11px] leading-5 tracking-[0.28em] text-gold uppercase">
                Discover our services
              </p>
              <nav aria-label="Service practices" className="mt-8 lg:mt-14">
                <ul className="space-y-8 lg:space-y-10">
                  {serviceCategories.map((category) => (
                    <CategoryHeading
                      key={category.id}
                      category={category}
                      selected={category.id === activeCategory.id}
                      onSelect={() => scrollToCategory(category.id)}
                    />
                  ))}
                </ul>
              </nav>
            </div>

            <div className="min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeCategory.id}-${showingTypes ? 'types' : 'options'}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {showingTypes ? (
                    <TypesPanel category={activeCategory} animate />
                  ) : (
                    <OptionsList
                      category={activeCategory}
                      activeIndex={activeOptionIndex}
                      expandAll={false}
                      onSelect={(optionIndex) =>
                        scrollToOption(activeCategory.id, optionIndex)
                      }
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
