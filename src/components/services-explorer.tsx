'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { serviceCategories, type ServiceCategory } from '@/lib/services';
import { cn } from '@/lib/cn';

function typesLabel(category: ServiceCategory) {
  return category.id === 'experiential'
    ? 'Types of experiences'
    : 'Types of events';
}

function CategoryTitle({
  category,
  id,
}: {
  category: ServiceCategory;
  id: string;
}) {
  const words = category.title.split(' ');

  return (
    <h2
      id={id}
      className="font-display leading-[0.86] tracking-tight text-[clamp(1.55rem,6.5vw,5.75rem)] text-white uppercase"
    >
      {words.map((word) => (
        <span key={word} className="block">
          {word}
        </span>
      ))}
    </h2>
  );
}

function OptionsList({
  category,
  openIndex,
  onToggle,
}: {
  category: ServiceCategory;
  openIndex: number | null;
  onToggle: (index: number) => void;
}) {
  return (
    <ul>
      {category.options.map((option, index) => {
        const selected = index === openIndex;

        return (
          <li key={option.name} className="border-b border-white/10">
            <button
              type="button"
              id={`${category.id}-option-${index}`}
              onClick={() => onToggle(index)}
              aria-expanded={selected}
              aria-controls={`${category.id}-option-${index}-panel`}
              className="flex w-full cursor-pointer items-start justify-between gap-4 py-3 text-left md:py-3.5"
            >
              <span
                className={cn(
                  'font-display block min-w-0 tracking-tight uppercase transition-[color,font-size,line-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  selected
                    ? 'text-[clamp(1.2rem,4.6vw,3.15rem)] leading-[0.95] text-gold'
                    : 'text-lg text-white hover:text-white/70 md:text-xl lg:text-2xl',
                )}
              >
                {option.name}
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
            <div
              id={`${category.id}-option-${index}-panel`}
              role="region"
              aria-labelledby={`${category.id}-option-${index}`}
              aria-hidden={!selected}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <p className="min-h-0 overflow-hidden">
                <span className="mb-3 block max-w-xl pr-10 text-stone leading-8 tracking-wide md:mb-4">
                  {option.description}
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TypesRow({ category }: { category: ServiceCategory }) {
  const isEvents = category.id === 'events';

  return (
    <div className={cn('mt-10 lg:mt-14', isEvents && 'lg:text-right')}>
      <p className="text-[11px] tracking-[0.32em] text-white uppercase">
        {typesLabel(category)}
      </p>
      <p className="mt-4 w-full text-base leading-8 tracking-wide text-gold">
        {category.stageItems.map((item, index) => (
          <span key={item.label}>
            {index > 0 ? ' · ' : null}
            {item.href ? (
              <Link
                href={item.href}
                className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              item.label
            )}
            {item.suffix}
          </span>
        ))}
      </p>
    </div>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isEvents = category.id === 'events';

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`}>
      <Reveal delay={index * 80}>
        <div
          className={cn(
            'grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-20',
            isEvents && 'lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]',
          )}
        >
          <div className={cn(isEvents && 'lg:order-2 lg:text-right')}>
            <CategoryTitle category={category} id={`${category.id}-title`} />
            <p
              className={cn(
                'mt-3 max-w-md font-serif text-base italic text-gold sm:mt-5 sm:text-2xl md:text-3xl',
                isEvents && 'lg:ml-auto',
              )}
            >
              {category.short}
            </p>
            <p
              className={cn(
                'mt-4 max-w-md text-stone leading-8 tracking-wide lg:mt-5',
                isEvents && 'lg:ml-auto',
              )}
            >
              {category.description}
            </p>
          </div>
          <div className={cn('min-w-0', isEvents && 'lg:order-1')}>
            <OptionsList
              category={category}
              openIndex={openIndex}
              onToggle={(optionIndex) =>
                setOpenIndex((current) =>
                  current === optionIndex ? null : optionIndex,
                )
              }
            />
          </div>
        </div>
        <TypesRow category={category} />
      </Reveal>
    </section>
  );
}

export function ServicesExplorer() {
  return (
    <div className="bg-ink px-6 pt-20 pb-20 text-paper md:pt-24 md:pb-24">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            Services
          </p>
          <h1 className="sr-only">Services</h1>
        </Reveal>
        <div className="mt-8 space-y-20 lg:mt-14 lg:space-y-28">
          {serviceCategories.map((category, index) => (
            <CategorySection
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
