import { Reveal } from '@/components/reveal';
import { WeddingGallery } from '@/components/wedding-work-gallery';

export function WeddingWorkSection() {
  return (
    <section id="work" className="scroll-mt-8 bg-white py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            Work
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight uppercase md:text-6xl">
            Moments Then,
            <br />
            <span className="font-serif text-gold normal-case italic">
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
