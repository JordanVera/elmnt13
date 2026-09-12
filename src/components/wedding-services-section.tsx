import { Reveal } from '@/components/reveal';
import { WeddingServicesGrid } from '@/components/wedding-services-grid';
import { weddingServices } from '@/lib/weddings';

export function WeddingServicesSection() {
  return (
    <section id="services" className="scroll-mt-8 bg-white px-6 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center leading-[1.05]">
            <span className="block font-display text-3xl tracking-tight uppercase md:text-5xl">
              with you for the
            </span>
            <span className="text-gold mt-1 block font-serif text-3xl italic md:text-5xl">
              moments that matter
            </span>
          </h2>
        </Reveal>
        <WeddingServicesGrid services={weddingServices} />
      </div>
    </section>
  );
}
