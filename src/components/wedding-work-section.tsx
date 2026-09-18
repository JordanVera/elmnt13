import { Reveal } from '@/components/reveal';
import { WeddingGallery } from '@/components/wedding-work-gallery';

export function WeddingWorkSection() {
  return (
    <section id="work" className="scroll-mt-8 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            Work
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-5xl leading-[0.95] tracking-tight lowercase md:text-7xl">
            Moments Then,{' '}
            <span className="font-serif text-5xl tracking-normal lowercase text-gold italic md:text-7xl">
              Memories Now
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-6xl md:mt-12">
        <WeddingGallery />
      </div>
    </section>
  );
}
