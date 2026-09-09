import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

export function HomeServices() {
  return (
    <section className="bg-ink px-6 py-20 text-paper md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
          Services
        </p>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <h2 className="text-left font-display text-6xl leading-[0.88] tracking-tight uppercase md:text-7xl">
              Experiential
              <br />
              Marketing
            </h2>
            <p className="mt-6 max-w-lg text-left font-serif text-2xl italic text-gold md:text-3xl">
              Creating immersive brand experiences that connect, engage and
              drive impact.
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 tracking-wide text-paper/55">
              Brand activations · Product launches · Campaign activations ·
              Sponsorship activations · Community activations & more
            </p>
          </Reveal>
          <Reveal delay={140} className="md:pt-24 md:text-right">
            <h2 className="font-display text-6xl leading-[0.88] tracking-tight uppercase md:text-7xl">
              Event
              <br />
              Management
            </h2>
            <p className="mt-6 font-serif text-2xl italic text-gold md:ml-auto md:max-w-sm">
              From first concept to last light.
            </p>
            <p className="mt-6 text-sm leading-7 tracking-wide text-paper/55 md:ml-auto md:max-w-md">
              Corporate events · Conferences · Church events · Milestones ·
              Weddings & more
            </p>
          </Reveal>
        </div>
        <div className="mt-16">
          <GoldLink href="/services" inverted>
            Explore services
          </GoldLink>
        </div>
      </div>
    </section>
  );
}
