import type { CSSProperties } from 'react';
import Image from 'next/image';
import { featuredBrandLogos } from '@/lib/brands';

export function LogoMarquee({
  title = 'Brands We’ve Worked With',
}: {
  title?: string;
}) {
  const loop = [...featuredBrandLogos, ...featuredBrandLogos];

  return (
    <section className="bg-paper overflow-hidden py-4 md:py-5">
      <p className="mb-4 text-center text-[11px] tracking-[0.36em] text-ink/50 uppercase">
        {title}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-mist to-transparent" />
        <div className="marquee-track flex items-center gap-14 px-8 md:gap-16">
          {loop.map((brand, index) => {
            const scale = 'scale' in brand ? brand.scale : 1;

            return (
              <span
                key={`${brand.name}-${index}`}
                className="flex h-[calc(1.75rem*var(--logo-scale))] shrink-0 items-center justify-center md:h-[calc(2.25rem*var(--logo-scale))]"
                style={{ '--logo-scale': scale } as CSSProperties}
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  unoptimized={brand.src.endsWith('.svg')}
                  className="h-full w-auto max-w-40 object-contain object-center grayscale mix-blend-multiply opacity-90 md:max-w-48"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
