import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

export function HomeAbout() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-28 md:py-36">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[38vw] leading-none text-gold/20 select-none"
      >
        E13
      </p>
      <div className="relative mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
          About
        </p>
        <Reveal>
          <h2 className="mt-6 max-w-3xl">
            <span className="block font-serif text-5xl italic md:text-7xl">
              Your Vision.
            </span>
            <span className="mt-2 block font-display text-6xl tracking-tight uppercase md:text-8xl">
              Experienced.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 max-w-xl text-lg leading-8 text-ink/75">
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
