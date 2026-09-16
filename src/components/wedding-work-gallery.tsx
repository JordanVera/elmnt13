import Image from 'next/image';
import { WeddingFilmBanner } from '@/components/wedding-film-banner';
import { cn } from '@/lib/cn';
import { getWeddingWorkPhotos } from '@/lib/wedding-work-photos';

const MOSAIC_BREAK = 24;
const WIDE_SLOTS = new Set([0, 3, 6, 7, 8, 9]);

function tileClass(index: number) {
  return WIDE_SLOTS.has(index % 12) ? 'col-span-2' : '';
}

function Mosaic({
  photos,
  offset = 0,
}: {
  photos: ReturnType<typeof getWeddingWorkPhotos>;
  offset?: number;
}) {
  return (
    <div className="grid auto-rows-28 grid-cols-2 gap-0.75 bg-gold/20 p-0.75 sm:auto-rows-36 sm:grid-cols-4 lg:auto-rows-44 lg:grid-cols-6">
      {photos.map((photo, index) => {
        const wide = WIDE_SLOTS.has((index + offset) % 12);

        return (
          <figure
            key={photo.src}
            className={cn(
              'group relative h-full min-h-0 overflow-hidden bg-mist',
              tileClass(index + offset),
            )}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes={
                wide
                  ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw'
                  : '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw'
              }
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-ink/70 via-ink/10 to-transparent px-3 py-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-[10px] tracking-[0.28em] text-gold uppercase">
                {photo.title}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export function WeddingGallery() {
  const photos = getWeddingWorkPhotos();
  const opening = photos.slice(0, MOSAIC_BREAK);
  const closing = photos.slice(MOSAIC_BREAK);

  return (
    <div>
      <Mosaic photos={opening} />
      <div className="py-0.75">
        <WeddingFilmBanner />
      </div>
      {closing.length > 0 ? (
        <Mosaic photos={closing} offset={opening.length} />
      ) : null}
    </div>
  );
}
