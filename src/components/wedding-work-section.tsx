import { Reveal } from '@/components/reveal';
import { WeddingGallery } from '@/components/wedding-work-gallery';
import { getWeddingCollections } from '@/lib/wedding-collections';

export async function WeddingWorkSection() {
  const items = await getWeddingCollections();

  return (
    <section id="work" className="scroll-mt-8 bg-white pt-4 pb-6 md:pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            Work
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[2rem] leading-[0.95] tracking-tight lowercase md:text-5xl">
            Moments Then, <br />
            <span className="font-serif text-[2rem] tracking-normal lowercase text-gold italic md:text-7xl">
              Memories Now
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-6xl md:mt-12">
        <WeddingGallery items={items} />
      </div>
    </section>
  );
}
