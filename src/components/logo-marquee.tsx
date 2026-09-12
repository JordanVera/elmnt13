import type { ReactNode } from 'react';
import { BrandLogo } from '@/components/brand-logo';
import { Reveal } from '@/components/reveal';
import { featuredBrandLogos } from '@/lib/brands';

export function LogoMarquee({
  title = 'Brands We’ve Worked With',
  action,
}: {
  title?: string;
  action?: ReactNode;
}) {
  const loop = [...featuredBrandLogos, ...featuredBrandLogos];

  return (
    <div className="border-t border-b border-stone/20">
      <section
        className={
          action
            ? ' bg-white overflow-hidden pt-4 pb-3 md:pt-5 md:pb-3.5'
            : ' !bg-white overflow-hidden py-4 md:py-5'
        }
      >
        <Reveal>
          <p className="mb-4 text-center text-[15px] tracking-[0.36em] text-stone uppercase">
            {title}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="relative">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-mist to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-mist to-transparent" /> */}
            <div className="marquee-track flex items-center">
              {loop.map((brand, index) => (
                <span
                  key={`${brand.name}-${index}`}
                  className="flex h-10 shrink-0 items-center justify-center px-7 md:h-11 md:px-8"
                >
                  <BrandLogo brand={brand} size="marquee" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        {action ? (
          <div className="mt-2.5 flex justify-center px-6">{action}</div>
        ) : null}
      </section>
    </div>
  );
}
