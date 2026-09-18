'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { WeddingCollectionPanel } from '@/components/wedding-collection-panel';
import {
  WEDDING_WORK_PREVIEW_COUNT,
  getWeddingWorkItems,
  type WeddingWorkItem,
} from '@/lib/wedding-work-photos';

function TileVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

function EventTile({
  item,
  onOpen,
}: {
  item: WeddingWorkItem;
  onOpen: (item: WeddingWorkItem) => void;
}) {
  const hoverLabel = `${item.kind} ${item.location}`;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`${item.collection.title}. ${hoverLabel}`}
      className="group relative block aspect-4/5 w-full cursor-pointer overflow-hidden bg-mist text-left"
    >
      {item.preview === 'video' && item.previewVideo ? (
        <TileVideo src={item.previewVideo} />
      ) : (
        <Image
          src={item.collection.cover}
          alt={item.collection.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/45 max-md:bg-ink/25" />
      {item.preview === 'video' ? (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/50 text-white"
        >
          <svg viewBox="0 0 16 16" className="size-3 fill-current">
            <path d="M5 3.5v9l8-4.5-8-4.5Z" />
          </svg>
        </span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
          {item.kind}
        </p>
        <p className="mt-1.5 font-display text-xl leading-tight text-white uppercase md:text-2xl">
          {item.location}
        </p>
      </div>
    </button>
  );
}

function CollectionOverlay({
  item,
  onClose,
}: {
  item: WeddingWorkItem;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    overlayRef.current?.scrollTo({ top: 0 });
  }, [item.collection.slug]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      role="presentation"
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-90 overflow-y-auto bg-ink/55 p-4 md:p-8"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wedding-collection-title"
        className="relative mx-auto min-h-full w-full max-w-6xl bg-white shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close collection"
          className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/85 text-ink transition-colors hover:bg-white md:top-6 md:right-6"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>

        <div className="px-6 pt-16 pb-8 md:px-10 md:pt-20">
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            {item.kind}
          </p>
          <h3
            id="wedding-collection-title"
            className="mt-3 font-display text-4xl tracking-tight uppercase md:text-6xl"
          >
            {item.collection.title}
          </h3>
          <p className="mt-2 font-serif text-xl text-gold italic md:text-2xl">
            {item.location}
          </p>
        </div>

        <div className="px-6 pb-16 md:px-10">
          <WeddingCollectionPanel collection={item.collection} />
        </div>
      </div>
    </div>
  );
}

export function WeddingGallery() {
  const items = getWeddingWorkItems();
  const preview = items.slice(0, WEDDING_WORK_PREVIEW_COUNT);
  const remaining = items.slice(WEDDING_WORK_PREVIEW_COUNT);
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<WeddingWorkItem | null>(null);
  const visible = expanded ? items : preview;

  const closeOverlay = useCallback(() => setActiveItem(null), []);

  return (
    <div className="px-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {visible.map((item) => (
          <EventTile key={item.slug} item={item} onOpen={setActiveItem} />
        ))}
      </div>

      {remaining.length > 0 && !expanded ? (
        <div className="mt-8 text-center md:mt-10">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="cursor-pointer border border-ink/20 px-8 py-3 text-[11px] tracking-[0.32em] text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-gold"
          >
            View more
          </button>
        </div>
      ) : null}

      {activeItem ? (
        <CollectionOverlay item={activeItem} onClose={closeOverlay} />
      ) : null}
    </div>
  );
}
