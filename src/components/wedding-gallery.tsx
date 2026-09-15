'use client';

import { useState } from 'react';
import { WeddingCollectionPanel } from '@/components/wedding-collection-panel';
import { cn } from '@/lib/cn';
import { weddingCollections } from '@/lib/wedding-gallery';

export function WeddingGallery() {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    weddingCollections[0]?.slug ?? null,
  );

  const activeCollection = weddingCollections.find(
    (collection) => collection.slug === activeSlug,
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
          Work
        </p>
        <h2 className="mt-4 font-display text-4xl tracking-tight uppercase md:text-6xl">
          Moments Then,
          <br />
          Memories Now
        </h2>
      </div>

      <div className="mx-auto max-w-7xl border-t border-ink/10 px-6">
        {weddingCollections.map((collection) => {
          const isActive = collection.slug === activeSlug;

          return (
            <button
              key={collection.slug}
              type="button"
              onClick={() => setActiveSlug(collection.slug)}
              className={cn(
                'grid w-full cursor-pointer gap-3 border-b border-ink/10 py-6 text-left transition-colors md:grid-cols-[1fr_auto] md:items-center md:gap-8',
                isActive ? 'bg-paper' : 'hover:bg-paper/60',
              )}
            >
              <div>
                <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                  Collection
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-tight uppercase md:text-3xl">
                  {collection.title}
                </h3>
              </div>
              <p className="text-sm tracking-[0.16em] text-ink/50 uppercase">
                {collection.photos.length} photos
                {collection.video ? ' · film' : ''}
              </p>
            </button>
          );
        })}
      </div>

      {activeCollection ? (
        <div className="mx-auto max-w-7xl px-6 py-16">
          <WeddingCollectionPanel collection={activeCollection} />
        </div>
      ) : null}

      {/* <div className="mx-auto max-w-7xl px-6 py-3">
        <WeddingFilmBanner />
      </div> */}
    </section>
  );
}
