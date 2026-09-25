'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { WeddingCollection } from '@/lib/wedding-gallery';
import { WeddingVideoPlayer } from '@/components/wedding-video-player';

export function WeddingCollectionPanel({
  collection,
}: {
  collection: WeddingCollection;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto =
    activeIndex === null ? null : collection.photos[activeIndex];

  useEffect(() => {
    setActiveIndex(null);
  }, [collection.slug]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        setActiveIndex(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => {
          if (index === null || collection.photos.length === 0) return index;
          return Math.min(index + 1, collection.photos.length - 1);
        });
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => {
          if (index === null || collection.photos.length === 0) return index;
          return Math.max(index - 1, 0);
        });
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [activeIndex, collection.photos.length]);

  return (
    <div>
      {collection.video ? (
        <div className="mb-10">
          <WeddingVideoPlayer
            url={collection.video}
            poster={collection.poster}
            title={collection.title}
          />
          <p className="mt-4 text-sm text-ink/55">
            {collection.photos.length} photos · film included
          </p>
        </div>
      ) : null}

      <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
        {collection.photos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden bg-mist"
          >
            <Image
              src={photo}
              alt=""
              width={900}
              height={1200}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ width: '100%', height: 'auto' }}
            />
          </button>
        ))}
      </div>

      {activePhoto && activeIndex !== null
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
              onClick={() => setActiveIndex(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${collection.title} photo ${activeIndex + 1} of ${collection.photos.length}`}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 z-10 cursor-pointer border border-white/30 px-4 py-2 text-[11px] tracking-[0.28em] text-white uppercase transition-colors hover:border-gold hover:text-gold md:top-6 md:right-6"
              >
                Close
              </button>

              <button
                type="button"
                aria-label="Previous photo"
                disabled={activeIndex === 0}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((index) =>
                    index === null ? index : index - 1,
                  );
                }}
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer border border-white/30 px-3 py-3 text-[11px] tracking-[0.28em] text-white uppercase transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 md:left-4 md:px-4"
              >
                Prev
              </button>

              <button
                type="button"
                aria-label="Next photo"
                disabled={activeIndex === collection.photos.length - 1}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((index) =>
                    index === null ? index : index + 1,
                  );
                }}
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer border border-white/30 px-3 py-3 text-[11px] tracking-[0.28em] text-white uppercase transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 md:right-4 md:px-4"
              >
                Next
              </button>

              <div
                className="relative h-[92vh] w-[calc(100vw-1.5rem)] md:w-[calc(100vw-7rem)]"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={activePhoto}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
                <p className="absolute inset-x-0 bottom-3 text-center text-[11px] tracking-[0.28em] text-white/70 uppercase">
                  {activeIndex + 1} / {collection.photos.length}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
