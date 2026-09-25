import 'server-only';
import { cache } from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { weddingCollectionsQuery } from '@/sanity/lib/queries';
import type {
  WeddingCredit,
  WeddingPortableBlock,
  WeddingWorkItem,
} from '@/lib/wedding-work-photos';

type SanityWedding = {
  slug: string | null;
  title: string | null;
  kind: string | null;
  location: string | null;
  services: string[] | null;
  description: WeddingPortableBlock[] | null;
  credits: Array<{ role?: string | null; name?: string | null } | null> | null;
  cover: string | null;
  gallery: Array<string | null> | null;
  video: string | null;
  poster: string | null;
  previewVideo: string | null;
};

function nonempty<T>(items: T[] | null | undefined): T[] | undefined {
  return items && items.length > 0 ? items : undefined;
}

function toCredits(
  credits: SanityWedding['credits'],
): WeddingCredit[] | undefined {
  const items = (credits ?? [])
    .flatMap((credit) =>
      credit?.role && credit?.name
        ? [{ role: credit.role, name: credit.name }]
        : [],
    );
  return items.length > 0 ? items : undefined;
}

function toWeddingWorkItem(doc: SanityWedding): WeddingWorkItem | null {
  if (!doc.slug || !doc.title || !doc.cover || !doc.kind || !doc.location) {
    return null;
  }

  return {
    slug: doc.slug,
    kind: doc.kind,
    location: doc.location,
    preview: doc.previewVideo ? 'video' : 'photo',
    previewVideo: doc.previewVideo ?? undefined,
    services: nonempty(doc.services),
    description: nonempty(doc.description),
    credits: toCredits(doc.credits),
    collection: {
      slug: doc.slug,
      title: doc.title,
      cover: doc.cover,
      photos: (doc.gallery ?? []).filter((url): url is string => Boolean(url)),
      video: doc.video ?? undefined,
      poster: doc.poster ?? undefined,
    },
  };
}

export const getWeddingCollections = cache(async (): Promise<WeddingWorkItem[]> => {
  const docs = await sanityFetch<SanityWedding[]>(weddingCollectionsQuery);
  return docs
    .map(toWeddingWorkItem)
    .filter((item): item is WeddingWorkItem => item !== null);
});
