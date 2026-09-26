import { Reveal } from '@/components/reveal';
import { WeddingServicesGrid } from '@/components/wedding-services-grid';
import { weddingServices } from '@/lib/weddings';

export function WeddingServicesSection() {
  return (
    <section id="services" className="scroll-mt-8 bg-white px-6 pt-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* <Reveal>
          <div className="flex md:items-center">
            <p className="max-w-3xl text-lg text-center mx-auto leading-8 text-black">
              May your story be filled with moments worth celebrating, from the
              beginning of a new chapter to the forever you’re building
              together. Wherever you are in your story, we’re here to make what
              happens next unforgettable. From when you say{' '}
              <span className="font-serif">“yes”</span> to when you say{' '}
              <span className="font-serif">“I do”</span>, we consider every
              element with intention, creating memories that feel beautifully
              and distinctly yours.
            </p>
          </div>
        </Reveal> */}

        <Reveal delay={80}>
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            Services
          </p>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="font-[family-name:var(--font-playfair)] text-[1.75rem] leading-[1.05] tracking-tight lowercase md:text-5xl md:leading-[0.95]">
            With you for the
            <br />
            <span className="ml-5 inline-block font-serif text-[clamp(2rem,6.4vw,1.9rem)] leading-[1.05] tracking-normal text-gold lowercase italic md:ml-14 md:text-7xl">
              moments that matter
            </span>
          </h2>
        </Reveal>

        <WeddingServicesGrid services={weddingServices} />
      </div>
    </section>
  );
}
