import { Reveal } from '@/components/reveal';
import { WeddingServicesGrid } from '@/components/wedding-services-grid';
import { weddingServices } from '@/lib/weddings';

export function WeddingServicesSection() {
  return (
    <section id="services" className="scroll-mt-8 bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
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
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-14 text-[15px] tracking-[0.36em] text-gold uppercase md:mt-16">
            Services
          </p>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight uppercase md:text-7xl">
            With you for the
            <span className="text-gold -mt-5 block font-serif text-4xl tracking-normal normal-case italic md:ml-16 md:text-6xl">
              moments that matter
            </span>
          </h2>
        </Reveal>

        <WeddingServicesGrid services={weddingServices} />
      </div>
    </section>
  );
}
