import { Reveal } from '@/components/reveal';
import { WeddingWorkGallery } from '@/components/wedding-work-gallery';
import { getWeddingProjects } from '@/lib/projects';

export async function WeddingWorkSection() {
  const weddingProjects = await getWeddingProjects();

  return (
    <section id="work" className="scroll-mt-8 bg-white px-6 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
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

        <WeddingWorkGallery projects={weddingProjects} />
      </div>
    </section>
  );
}
