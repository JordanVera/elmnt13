'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { WeddingCollection } from '@/lib/wedding-gallery';
import { WeddingVideoPlayer } from '@/components/wedding-video-player';

const GRID_GAP = 12;

function photoRatio(url: string) {
  const match = url.match(/-(\d+)x(\d+)\.[a-z0-9]+(?:\?|$)/i);
  if (!match) return 1;

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return 1;

  return width / height;
}

type JustifiedPhoto = {
  src: string;
  index: number;
  ratio: number;
};

function buildRows(
  photos: string[],
  containerWidth: number,
  targetHeight: number,
) {
  const items: JustifiedPhoto[] = photos.map((src, index) => ({
    src,
    index,
    ratio: photoRatio(src),
  }));
  const rows: JustifiedPhoto[][] = [];
  let index = 0;

  while (index < items.length) {
    const row: JustifiedPhoto[] = [];
    let ratioSum = 0;

    while (index < items.length) {
      const item = items[index];
      const nextSum = ratioSum + item.ratio;
      const nextCount = row.length + 1;
      const height = (containerWidth - GRID_GAP * (nextCount - 1)) / nextSum;

      if (row.length > 0 && height < targetHeight) break;

      row.push(item);
      ratioSum = nextSum;
      index += 1;

      if (height <= targetHeight) break;
    }

    rows.push(row);
  }

  return rows;
}

function PhotoGrid({
  photos,
  onSelect,
}: {
  photos: string[];
  onSelect: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => setWidth(node.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const targetHeight = width < 700 ? 180 : 220;
  const rows = width > 0 ? buildRows(photos, width, targetHeight) : [];

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GRID_GAP }}>
      {rows.map((row, rowIndex) => {
        const isLast = rowIndex === rows.length - 1;
        const ratioSum = row.reduce((sum, item) => sum + item.ratio, 0);
        const justified = (width - GRID_GAP * (row.length - 1)) / ratioSum;
        const fillRow = !(isLast && justified > targetHeight);
        const height = fillRow ? justified : targetHeight;

        return (
          <div
            key={row[0]?.index ?? rowIndex}
            className="flex"
            style={{ gap: GRID_GAP, height }}
          >
            {row.map((item) => (
              <button
                key={`${item.src}-${item.index}`}
                type="button"
                onClick={() => onSelect(item.index)}
                className="group relative min-w-0 cursor-pointer overflow-hidden bg-mist"
                style={
                  fillRow
                    ? { flex: `${item.ratio} ${item.ratio} 0%` }
                    : { width: height * item.ratio, flex: '0 0 auto' }
                }
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

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
          {/* <p className="mt-4 text-sm text-ink/55">
            {collection.photos.length} photos · film included
          </p> */}
        </div>
      ) : null}

      <PhotoGrid photos={collection.photos} onSelect={setActiveIndex} />

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
