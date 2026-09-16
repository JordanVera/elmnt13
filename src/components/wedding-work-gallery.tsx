'use client';

import { useState } from 'react';
import Image from 'next/image';
import { WeddingFilmBanner } from '@/components/wedding-film-banner';
import { cn } from '@/lib/cn';
import { getWeddingWorkPhotos } from '@/lib/wedding-work-photos';

const PREVIEW_SRCS = [
  '/weddings/collections/teagan-proposal/photos/frame-001.jpg',
  '/weddings/collections/christian-engagement/photos/001.jpg',
  '/weddings/collections/christian-proposal/photos/frame-001.jpg',
  '/weddings/collections/mookie-proposal/photos/040.jpg',
  '/weddings/collections/mookie-wedding/photos/frame-001.jpg',
] as const;

const PREVIEW_TILE_CLASS = [
  'aspect-video md:col-start-1 md:row-start-1 md:aspect-auto',
  'hidden md:col-start-2 md:row-span-2 md:row-start-1 md:block md:aspect-auto',
  'aspect-video md:col-start-3 md:row-start-1 md:aspect-auto',
  'aspect-video md:col-start-1 md:row-start-2 md:aspect-auto',
  'aspect-video md:col-start-3 md:row-start-2 md:aspect-auto',
];

function PhotoTile({
  photo,
  sizes,
  className,
}: {
  photo: ReturnType<typeof getWeddingWorkPhotos>[number];
  sizes: string;
  className?: string;
}) {
  return (
    <figure className={cn('group relative overflow-hidden', className)}>
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-ink/70 via-ink/10 to-transparent px-3 py-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="text-[10px] tracking-[0.28em] text-gold uppercase">
          {photo.title}
        </span>
      </figcaption>
    </figure>
  );
}

function PreviewGrid({
  photos,
}: {
  photos: ReturnType<typeof getWeddingWorkPhotos>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 md:aspect-8/3 md:grid-cols-3 md:grid-rows-2 md:gap-3">
      {photos.map((photo, index) => (
        <PhotoTile
          key={photo.src}
          photo={photo}
          className={cn('h-full min-h-0', PREVIEW_TILE_CLASS[index])}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ))}
    </div>
  );
}

function PhotoGrid({
  photos,
}: {
  photos: ReturnType<typeof getWeddingWorkPhotos>;
}) {
  return (
    <div className="columns-2 gap-2 md:columns-3 md:gap-3 lg:columns-4">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className="group relative mb-2 w-full break-inside-avoid overflow-hidden md:mb-3"
        >
          <Image
            src={photo.src}
            alt={photo.title}
            width={900}
            height={1200}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-ink/70 via-ink/10 to-transparent px-3 py-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="text-[10px] tracking-[0.28em] text-gold uppercase">
              {photo.title}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function WeddingGallery() {
  const photos = getWeddingWorkPhotos();
  const previewSrc = new Set<string>(PREVIEW_SRCS);
  const bySrc = new Map(photos.map((photo) => [photo.src, photo]));
  const preview = PREVIEW_SRCS.map((src) => bySrc.get(src)).filter(
    (photo): photo is NonNullable<typeof photo> => Boolean(photo),
  );
  const remaining = photos.filter((photo) => !previewSrc.has(photo.src));
  const [expanded, setExpanded] = useState(false);
  const hasMore = remaining.length > 0;

  return (
    <div>
      <PreviewGrid photos={preview} />

      <div className="py-2 md:py-3">
        <WeddingFilmBanner />
      </div>

      {hasMore ? (
        <div className="mt-8 text-center md:mt-10">
          {!expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="cursor-pointer border border-ink/20 px-8 py-3 text-[11px] tracking-[0.32em] text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-gold"
            >
              View more
            </button>
          ) : null}
        </div>
      ) : null}

      {expanded && hasMore ? (
        <div className="mt-10 md:mt-12">
          <PhotoGrid photos={remaining} />
        </div>
      ) : null}
    </div>
  );
}
