import Image from 'next/image';
import { WeddingFilmBanner } from '@/components/wedding-film-banner';
import { weddingProjects } from '@/lib/projects';

export function WeddingGallery() {
  return (
    <section className="bg-paper max-w-7xl mx-auto">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-14">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
          Work
        </p>
        <h2 className="mt-4 font-display text-4xl tracking-tight uppercase md:text-6xl">
          Moments Then,
          <br />
          Memories Now
        </h2>
      </div>
      <div className="grid md:grid-cols-12 md:h-[min(82vh,860px)] gap-2">
        {weddingProjects.map((project, index) => (
          <div
            key={project.slug}
            className={
              index === 0
                ? 'relative aspect-4/5 overflow-hidden md:col-span-7 md:aspect-auto md:h-full'
                : 'relative aspect-4/5 overflow-hidden md:col-span-5 md:aspect-auto md:h-full'
            }
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes={
                index === 0
                  ? '(max-width: 768px) 100vw, 58vw'
                  : '(max-width: 768px) 100vw, 42vw'
              }
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto py-2">
        <WeddingFilmBanner />
      </div>
    </section>
  );
}
