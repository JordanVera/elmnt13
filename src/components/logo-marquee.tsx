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
        <div className="marquee-track flex items-center">
          {loop.map((brand, index) => (
            <span
              title={brand.name}
              key={`${brand.name}-${index}`}
              className="flex h-10 shrink-0 items-center justify-center px-7 md:h-11 md:px-8"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                unoptimized={brand.src.endsWith('.svg')}
                className="h-auto w-auto max-h-8 max-w-28 object-contain object-center grayscale mix-blend-multiply opacity-90 md:max-h-9 md:max-w-32"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
