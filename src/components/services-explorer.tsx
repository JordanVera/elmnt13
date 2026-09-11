'use client';

import { useState } from 'react';
import Link from 'next/link';
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
                  'font-display min-w-0 text-lg tracking-tight uppercase transition-colors duration-300 md:text-xl lg:text-2xl',
                  selected ? 'text-gold' : 'text-white hover:text-white/70',
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
                <span className="mb-3 block max-w-xl pr-10 text-sm leading-6 text-stone md:mb-4 md:leading-7">
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
  return (
    <div className="mt-10 lg:mt-14">
      <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
        {typesLabel(category)}
      </p>
      <p className="mt-4 max-w-4xl text-base leading-8 tracking-wide text-stone">
        {category.stageItems.map((item, index) => (
          <span key={item.label}>
            {index > 0 ? ' · ' : null}
            {item.href ? (
              <Link
                href={item.href}
                className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
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

function CategorySection({ category }: { category: ServiceCategory }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-20">
        <div>
          <CategoryTitle category={category} id={`${category.id}-title`} />
          <p className="mt-3 max-w-md font-serif text-base italic text-gold sm:mt-5 sm:text-2xl md:text-3xl">
            {category.short}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone lg:mt-5">
            {category.description}
          </p>
        </div>
        <div className="min-w-0">
          <OptionsList
            category={category}
            openIndex={openIndex}
            onToggle={(index) =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        </div>
      </div>
      <TypesRow category={category} />
    </section>
  );
}

export function ServicesExplorer() {
  return (
    <div className="bg-ink px-6 pt-20 pb-20 text-paper md:pt-24 md:pb-24">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
          Services
        </p>
        <h1 className="sr-only">Services</h1>
        <div className="mt-8 space-y-20 lg:mt-14 lg:space-y-28">
          {serviceCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
