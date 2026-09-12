import Image from 'next/image';
import { Reveal } from '@/components/reveal';
import { WeddingWorkVideo } from '@/components/wedding-work-video';
import { cn } from '@/lib/cn';
import type { Project } from '@/lib/project-types';

function GalleryPhoto({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={cn('relative aspect-square overflow-hidden bg-mist', className)}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
        className="object-cover"
      />
    </div>
  );
}

export function WeddingWorkGallery({ projects }: { projects: Project[] }) {
  const photos = projects.slice(0, 10);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        <Reveal className="col-span-2 row-span-2 aspect-square md:aspect-auto md:min-h-0">
          <WeddingWorkVideo className="aspect-square md:aspect-auto md:min-h-0 md:h-full" />
        </Reveal>

        {photos.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={(index + 1) * 60}
            className={cn(index === 0 && 'col-span-2 md:col-span-1')}
          >
            <GalleryPhoto project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <button
          type="button"
          className="cursor-pointer border border-ink/20 px-8 py-3 text-[11px] tracking-[0.32em] text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-gold"
        >
          View More
        </button>
      </Reveal>
    </>
  );
}
