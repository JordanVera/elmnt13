import Image from "next/image";
import { featuredBrandLogos } from "@/lib/brands";

export function LogoMarquee({ title = "Brands We’ve Worked With" }: { title?: string }) {
  const loop = [...featuredBrandLogos, ...featuredBrandLogos];

  return (
    <section className="overflow-hidden bg-mist py-16 md:py-20">
      <p className="mb-10 text-center text-[11px] tracking-[0.36em] text-ink/50 uppercase">
        {title}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-mist to-transparent" />
        <div className="marquee-track flex items-center gap-16 px-8 md:gap-20">
          {loop.map((brand, index) => (
            <span
              key={`${brand.name}-${index}`}
              className="flex h-12 shrink-0 items-center justify-center md:h-14"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                unoptimized={brand.src.endsWith(".svg")}
                className="h-full w-auto max-w-50 object-contain object-center opacity-90 md:max-w-60"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
