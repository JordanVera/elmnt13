import { featuredBrands } from "@/lib/brands";

export function LogoMarquee({ title = "Brands We’ve Worked With" }: { title?: string }) {
  const loop = [...featuredBrands, ...featuredBrands];

  return (
    <section className="overflow-hidden bg-mist py-16 md:py-20">
      <p className="mb-10 text-center text-[11px] tracking-[0.36em] text-ink/50 uppercase">
        {title}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-mist to-transparent" />
        <div className="marquee-track flex items-center gap-16 px-8">
          {loop.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-display shrink-0 text-2xl tracking-[0.18em] text-ink/70 uppercase md:text-3xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
