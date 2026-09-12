'use client';

import { useState } from 'react';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/cn';
import type { WeddingService } from '@/lib/weddings';

const COLUMNS = 3;
const ROW_COUNT = 2;

function ServiceCard({
  service,
  index,
  colIndex,
  totalCount,
  expanded,
  rowExpanded,
  onToggle,
  onClose,
}: {
  service: WeddingService;
  index: number;
  colIndex: number;
  totalCount: number;
  expanded: boolean;
  rowExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const isLastColumn = colIndex === COLUMNS - 1;
  const isLastCell = index === totalCount - 1;
  const allowHoverReveal = !rowExpanded || expanded;

  return (
    <Reveal delay={index * 40} className="h-full">
      <div
        className={cn(
          'group relative h-full min-h-64 md:min-h-80',
          !isLastCell && 'border-b border-gold md:border-b-0',
          !isLastColumn && 'md:border-r md:border-gold',
          expanded && 'bg-blush/40',
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className={cn(
            'flex h-full w-full cursor-pointer flex-col justify-between p-8 text-left transition-colors duration-500 md:p-10',
            !expanded && allowHoverReveal && 'hover:bg-blush/40',
            'focus-visible:bg-blush/40 focus-visible:outline-none',
          )}
        >
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              {service.kicker}
            </p>
            <h3 className="mt-3 font-display text-2xl tracking-tight uppercase md:text-3xl">
              {service.title}
            </h3>
          </div>

          <div
            className={cn(
              'grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              expanded
                ? 'mt-6 grid-rows-[1fr] opacity-100'
                : allowHoverReveal
                  ? 'mt-0 grid-rows-[0fr] opacity-0 group-hover:mt-6 group-hover:grid-rows-[1fr] group-hover:opacity-100'
                  : 'mt-0 grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="text-base leading-7 text-stone md:text-lg md:leading-8">
                {service.description}
              </p>
              <p className="mt-4 text-sm tracking-[0.16em] text-stone uppercase">
                {service.details.join(' · ')}
              </p>
            </div>
          </div>
        </button>

        {expanded ? (
          <button
            type="button"
            aria-label="Close service details"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute top-8 right-8 z-10 cursor-pointer text-lg text-gold md:top-10 md:right-10"
          >
            ×
          </button>
        ) : (
          <span
            className={cn(
              'pointer-events-none absolute top-8 right-8 text-lg text-gold transition-transform duration-500 md:top-10 md:right-10',
              allowHoverReveal && 'group-hover:rotate-45',
            )}
            aria-hidden="true"
          >
            +
          </span>
        )}
      </div>
    </Reveal>
  );
}

export function WeddingServicesGrid({
  services,
}: {
  services: readonly WeddingService[];
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const expandedRow =
    expandedIndex !== null ? Math.floor(expandedIndex / COLUMNS) : null;

  return (
    <div className="mt-10 border-x border-gold">
      {Array.from({ length: ROW_COUNT }, (_, row) => (
        <div
          key={row}
          className={cn(
            'grid grid-cols-1 md:grid-cols-3 md:items-stretch',
            row === 0 && 'border-b border-gold',
          )}
        >
          {services
            .slice(row * COLUMNS, row * COLUMNS + COLUMNS)
            .map((service, colIndex) => {
              const index = row * COLUMNS + colIndex;
              const rowExpanded = expandedRow === row;

              return (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  colIndex={colIndex}
                  expanded={expandedIndex === index}
                  rowExpanded={rowExpanded}
                  onToggle={() =>
                    setExpandedIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  onClose={() => setExpandedIndex(null)}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
}
