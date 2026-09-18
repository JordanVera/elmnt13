import {
  weddingCollections,
  type WeddingCollection,
} from '@/lib/wedding-gallery';

export type WeddingWorkTile = {
  slug: string;
  kind: string;
  location: string;
  preview: 'photo' | 'video';
  previewVideo?: string;
};

export const weddingWorkTiles: WeddingWorkTile[] = [
  {
    slug: 'teagan-proposal',
    kind: 'Proposal',
    location: 'Houston, TX',
    preview: 'photo',
  },
  {
    slug: 'mookie-wedding',
    kind: 'Wedding',
    location: 'Los Angeles, CA',
    preview: 'photo',
  },
  {
    slug: 'christian-wedding',
    kind: 'Wedding',
    location: 'Los Cabos, MX',
    preview: 'video',
    previewVideo: '/weddings/KENDRAANDCHRISTIANWEDDINGSNEAKPEAKWIDE_comp.mp4',
  },
  {
    slug: 'christian-engagement',
    kind: 'Engagement Shoot',
    location: 'Miami, FL',
    preview: 'photo',
  },
  {
    slug: 'christian-proposal',
    kind: 'Proposal',
    location: 'Houston, TX',
    preview: 'photo',
  },
  {
    slug: 'mookie-proposal',
    kind: 'Proposal',
    location: 'Nashville, TN',
    preview: 'photo',
  },
];

export type WeddingWorkItem = WeddingWorkTile & {
  collection: WeddingCollection;
};

export function getWeddingWorkItems(): WeddingWorkItem[] {
  const bySlug = new Map(
    weddingCollections.map((collection) => [collection.slug, collection]),
  );

  return weddingWorkTiles.flatMap((tile) => {
    const collection = bySlug.get(tile.slug);
    return collection ? [{ ...tile, collection }] : [];
  });
}
