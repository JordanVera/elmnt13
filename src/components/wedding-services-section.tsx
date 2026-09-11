import { WeddingServicesGrid } from '@/components/wedding-services-grid';
import { weddingServices } from '@/lib/weddings';

export function WeddingServicesSection() {
  return (
    <section id="services" className="scroll-mt-8 bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] tracking-[0.36em] text-gold uppercase">
          With you for the moments that matter
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl italic md:text-6xl">
          from yes to I do
        </h2>
        <WeddingServicesGrid services={weddingServices} />
      </div>
    </section>
  );
}
