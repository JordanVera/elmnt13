import { stats } from '@/lib/site';
import { Reveal } from '@/components/reveal';
import { CountUp } from '@/components/count-up';

export function AboutStats() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative grid grid-cols-2 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
          >
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gold/25" />
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gold/25" />
          </div>

          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 80}
              className="relative px-4 py-10 text-center md:px-6 md:py-14"
            >
              <p className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-none tracking-tight text-ink">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mx-auto mt-5 max-w-[12rem] font-serif text-base leading-snug text-stone italic md:text-lg">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
