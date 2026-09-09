import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

export function HomeAbout() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-28 md:py-36">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 font-display text-[38vw] leading-none text-gold/20 select-none md:left-[74%]"
      >
        E13
      </p>
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8">
        <div>
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            About
          </p>
          <Reveal>
            <h2 className="mt-6 max-w-xl font-display text-6xl leading-[0.86] tracking-tight uppercase md:text-8xl lg:text-[6.75rem]">
              Taking Your
              <br />
              Vision
              <br />
              Further
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120} className="md:pt-24 md:pl-10 lg:pl-16">
          <p className="max-w-md text-lg leading-8 text-ink/75">
            ELMNT13 brings together strategy, creativity and management to turn
            ideas into memorable experiences. We see the full vision, understand
            how every brand element matters and handle the creative direction
            and execution to make it happen.
          </p>
          <div className="mt-10">
            <GoldLink href="/about">Learn more</GoldLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
