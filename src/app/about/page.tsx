import type { Metadata } from 'next';
import { BrandsSection } from '@/components/brands-section';
import { CountUp } from '@/components/count-up';
import { DetailsMoment } from '@/components/details-moment';
import { Reveal } from '@/components/reveal';
import { WhyChoose } from '@/components/why-choose';
import { stats } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ELMNT13 is a creative marketing and management company where vision drives the work and the details shape the outcome. Since 2012.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-white px-6 pt-20 pb-20 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            About
          </p>
          <Reveal>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight uppercase md:text-7xl">
              Vision drives the work.
              <span className="mt-3 block font-serif text-4xl tracking-normal normal-case italic md:text-6xl">
                Details shape the outcome.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 max-w-2xl text-lg leading-8 text-ink/75">
              ELMNT13 is a creative marketing and management company where
              vision drives the work and the details shape the outcome. Since
              2012, we’ve partnered with brands, organizations and individuals
              to bring ideas to life through strategy, creativity and
              management. We see the full vision, understand how every brand
              element matters and handle the creative direction and execution
              needed to create a memorable experience.
            </p>
          </Reveal>
        </div>
      </section>

      <BrandsSection />
      <WhyChoose />
      <DetailsMoment
        line="We take your vision further"
        highlight="vision"
        tone="ink"
      />

      <section className="bg-mist px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-7xl leading-none tracking-tight text-ink md:text-8xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-[11px] tracking-[0.22em] text-ink/50 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
