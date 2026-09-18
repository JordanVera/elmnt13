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
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
              About
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-6 flex w-full max-w-xl flex-col items-start text-6xl leading-[0.8] tracking-tight uppercase md:text-7xl lg:text-8xl">
              <span className="font-sans text-[0.5em] leading-none tracking-tighter uppercase">
                We take your
              </span>
              <span className=" font-bebas font-bold">Vision</span>
              <span className=" font-serif normal-case text-gold ml-26">
                further
              </span>
            </h2>
          </Reveal>
        </div>
        <Reveal
          delay={120}
          className="md:col-span-5 md:col-start-6 mt-14 -ml-8"
        >
          <p className="max-w-md text-lg leading-8 text-black">
            ELMNT13 is a creative marketing and management company known for
            transforming ideas into thoughtfully developed concepts and elevated
            brand experiences. We pair creative thinking with a discerning eye
            for detail, maximizing the opportunity to strengthen brands, elevate
            their presence and create lasting impact.
          </p>
          <div className="mt-10">
            <GoldLink href="/about" className="text-[15px]">
              Learn more
            </GoldLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
