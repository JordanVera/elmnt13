import { stats } from '@/lib/site';
import { Reveal } from '@/components/reveal';
import { CountUp } from '@/components/count-up';

export function AboutStats() {
  return (
    <section className="bg-white px-6 pt-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="flex flex-wrap items-baseline justify-center gap-x-[0.18em] text-[clamp(2.75rem,11vw,5rem)] leading-none uppercase text-center">
          <span className="font-bebas tracking-tight text-ink">It</span>
          <span className="font-display font-bold text-ink">All</span>
          <span className="italic font-didot text-[0.92em] tracking-[0.01em] text-gold">
            Counts
          </span>
        </h2>

        <div className="relative grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 80}
              className={`relative px-2 py-8 text-center md:px-6 md:py-14 ${
                index !== stats.length - 1
                  ? 'after:absolute after:top-1/2 after:right-0 after:h-16 after:w-px after:-translate-y-1/2 after:bg-gold md:after:h-32 max-md:even:after:hidden'
                  : ''
              }`}
            >
              <p className="font-display text-[clamp(2.6rem,11vw,3.4rem)] leading-none tracking-tight text-ink whitespace-nowrap md:text-[8rem]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mx-auto mt-4 max-w-[12rem] font-sans text-sm leading-snug text-stone uppercase md:mt-5 md:text-lg">
                {stat.label} <br />
                {stat.label2}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
