'use client';

import { useState } from 'react';
import { brandCategories } from '@/lib/brands';
import { BrandLogo } from '@/components/brand-logo';
import { LogoMarquee } from '@/components/logo-marquee';
import { Reveal } from '@/components/reveal';

export function BrandsSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      <LogoMarquee
        showBorders={!open}
        action={
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="cursor-pointer text-[11px] tracking-[0.32em] text-stone uppercase transition-colors hover:text-ink"
            aria-expanded={open}
          >
            {open ? 'Close list' : 'View all'}
          </button>
        }
      />
      {open ? (
        <div className=" px-6 pb-8">
          <div className="mx-auto max-w-6xl text-left">
            <div className="mt-8 space-y-14">
              {brandCategories.map((category, index) => (
                <Reveal key={category.id} delay={index * 60}>
                  <section aria-labelledby={`brands-${category.id}`}>
                    <h3
                      id={`brands-${category.id}`}
                      className={`pb-3 text-[15px] tracking-[0.32em] text-stone uppercase ${
                        category.id === 'personal'
                          ? 'border-b-[0.5px] border-ink/10'
                          : ''
                      }`}
                    >
                      {category.label}
                    </h3>
                    <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {category.logos.map((brand) => (
                        <li
                          key={brand.name}
                          className="flex items-center justify-center"
                        >
                          <BrandLogo brand={brand} />
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="mt-12 cursor-pointer text-[11px] tracking-[0.32em] text-stone uppercase transition-colors hover:text-ink mx-auto block text-center pb-4"
            aria-expanded={open}
          >
            {open ? 'Close list' : 'View all'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
