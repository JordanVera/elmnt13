import { Reveal } from '@/components/reveal';
import { serviceCategories } from '@/lib/services';

export function ServicesHero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden bg-ink px-6 pt-14 pb-20 text-paper md:pt-20 md:pb-24">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[42vw] leading-none text-gold/[0.07] select-none"
      >
        E13
      </p>
      <div className="relative mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
          From concept to completion
        </p>
        <Reveal>
          <h1 className="mt-6 font-display text-[18vw] leading-[0.8] tracking-tight uppercase md:text-[10vw]">
            Services
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-8 max-w-xl font-serif text-3xl italic text-gold md:text-5xl">
            Strategy to the last light.
          </p>
          <p className="mt-6 max-w-lg text-sm leading-7 text-paper/55 md:text-base md:leading-8">
            Experiential marketing and event management, explored as you scroll
            — one offering at a time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesIntro() {
  return (
    <section className="bg-paper px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
          Our services
        </p>
        <Reveal>
          <h2 className="mt-4 max-w-3xl font-display text-4xl tracking-tight uppercase md:text-6xl">
            Two practices.
            <span className="mt-2 block font-serif text-3xl tracking-normal normal-case italic md:text-5xl">
              One standard of care.
            </span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
          {serviceCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 100}>
              <article>
                <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-3xl tracking-tight uppercase md:text-4xl">
                  {category.title}
                </h3>
                <p className="mt-4 font-serif text-2xl italic text-gold">
                  {category.short}
                </p>
                <p className="mt-6 max-w-md text-sm leading-7 text-ink/70">
                  {category.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
