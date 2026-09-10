import Link from 'next/link';
import { stats } from '@/lib/site';
import type { Metadata } from 'next';
import { Reveal } from '@/components/reveal';
import { CountUp } from '@/components/count-up';
import { WhyChoose } from '@/components/why-choose';
import { BrandsSection } from '@/components/brands-section';
import { DetailsMoment } from '@/components/details-moment';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ELMNT13 is a creative marketing and management company where vision drives the work and the details shape the outcome. Since 2012.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white px-6 pt-20 pb-20 md:pt-24 md:pb-28">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[2%] -translate-y-1/2 font-serif text-[34vw] leading-none text-gold/15 select-none md:text-[26vw] lg:right-[4%]"
        >
          E13
        </p>
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-end gap-4 md:mb-14">
            <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
              About ELMNT13
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-gold md:w-14" />
          </div>
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
            <Reveal>
              <h1 className="max-w-md font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-normal not-italic uppercase tracking-[0.02em]">
                Vision led.
                <br />
                Details driven.
                <span className="mt-3 block text-[clamp(1.85rem,3.8vw,2.75rem)] normal-case italic text-gold">
                  Experience Focused.
                </span>
              </h1>
            </Reveal>
            <Reveal
              delay={120}
              className="md:border-l md:border-gold/50 md:pl-10 lg:pl-14"
            >
              <p className="max-w-lg text-base leading-8 text-ink/80 md:text-[17px]">
                At ELMNT13, we do more than plan and produce events — we bring
                visions to life. Through strategic planning, creative design and
                seamless execution, we create experiences that are intentional,
                elevated and unforgettable.
              </p>
              <div className="mt-10">
                <Link
                  href="#about-more"
                  className="group inline-flex items-center gap-5"
                >
                  <span className="border border-gold px-7 py-3 text-[11px] tracking-[0.32em] uppercase transition-colors group-hover:bg-gold/10">
                    Learn more
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-gold transition-all group-hover:w-14"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div id="about-more">
        <BrandsSection />
      </div>
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
