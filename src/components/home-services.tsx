import Link from 'next/link';
import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

export function HomeServices() {
  return (
    <section className="bg-ink px-6 py-20 text-paper md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
          Services
        </p>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <h2 className="text-left font-display text-7xl leading-[0.88] tracking-tight text-white uppercase md:text-8xl">
              Experiential
              <br />
              Marketing
            </h2>
            <p className="mt-6 max-w-lg text-left font-serif text-2xl italic text-gold md:text-3xl">
              Creating immersive brand experiences that connect, engage and
              drive impact.
            </p>
            <p className="mt-6 max-w-md text-stone leading-8 tracking-wide">
              Brand Activations · Product Launches · Campaigns · Sponsorship
              Activations · Community Activations & More
            </p>
          </Reveal>
          <Reveal delay={140} className="md:pt-24 md:text-right">
            <h2 className="font-display text-7xl leading-[0.88] tracking-tight text-white uppercase md:text-8xl">
              Event
              <br />
              Management
            </h2>
            <p className="mt-6 font-serif text-2xl italic text-gold md:ml-auto md:max-w-md md:text-3xl">
              From the initial concept to the final detail, we thoughtfully
              manage every element.
            </p>
            <p className="mt-6 text-stone leading-8 tracking-wide md:ml-auto md:max-w-md">
              Corporate Events · Conferences · Church Events · Milestones ·{' '}
              <Link
                href="/weddings"
                className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
              >
                Weddings
              </Link>{' '}
              & More
            </p>
          </Reveal>
        </div>
        <div className="mt-16">
          <GoldLink
            href="/services"
            inverted
            className="text-[15px] hover:!text-white"
          >
            Explore services
          </GoldLink>
        </div>
      </div>
    </section>
  );
}
