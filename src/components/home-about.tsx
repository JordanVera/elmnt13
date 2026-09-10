import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

export function HomeAbout() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:py-24">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[0%] -translate-y-1/2 font-serif text-[28vw] leading-none text-gold/20 select-none"
      >
        E13
      </p>
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-6">
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            About
          </p>
          <Reveal>
            <h2 className="mt-6 max-w-xl text-6xl leading-[0.86] tracking-tight uppercase md:text-7xl lg:text-8xl">
              <span className="font-sans text-[0.58em] tracking-[0.06em] uppercase">
                We take your
              </span>
              <br />
              <span className="font-bebas font-bold">Vision</span>
              <br />
              <span className="font-serif normal-case text-gold">further</span>
            </h2>
          </Reveal>
        </div>
        <Reveal
          delay={120}
          className="md:col-span-5 md:col-start-7 md:-ml-8 md:pt-24 lg:-ml-12"
        >
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
