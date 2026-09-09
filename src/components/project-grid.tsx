'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Project } from '@/lib/projects';

const PAGE_SIZE = 12;

export function ProjectGrid({ items }: { items: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div>
      <div className="-mb-3 columns-2 md:columns-3 gap-3">
        {visible.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative mb-3 block break-inside-avoid overflow-hidden bg-mist"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={1500}
              sizes="33vw"
              className="transition-transform duration-700 group-hover:scale-105"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
              <p className="text-[10px] tracking-[0.28em] text-gold uppercase sm:text-[11px]">
                {project.service}
              </p>
              <p className="mt-1.5 font-display text-base leading-tight text-white uppercase sm:mt-2 sm:text-xl lg:text-2xl">
                {project.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="cursor-pointer border border-ink/20 px-8 py-3 text-[11px] tracking-[0.32em] text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-gold"
          >
            Show more
          </button>
        </div>
      ) : null}
    </div>
  );
}
