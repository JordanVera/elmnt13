'use client';

import { useState } from 'react';
import { allBrands, featuredBrands } from '@/lib/brands';
import { LogoMarquee } from '@/components/logo-marquee';

export function BrandsSection() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <LogoMarquee />
      <div className="bg-mist px-6 pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="text-[11px] tracking-[0.32em] text-ink/60 uppercase transition-colors hover:text-ink"
            aria-expanded={open}
          >
            {open ? 'Close list' : 'View all'}
          </button>
          {open ? (
            <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 text-left sm:grid-cols-3 md:grid-cols-4">
              {allBrands.map((brand) => (
                <li
                  key={brand}
                  className="border-t border-ink/10 pt-3 font-display text-sm tracking-[0.16em] uppercase"
                >
                  {brand}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
