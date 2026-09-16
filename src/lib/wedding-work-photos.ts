import { weddingCollections } from '@/lib/wedding-gallery';

export type WeddingWorkPhoto = {
  src: string;
  title: string;
  slug: string;
};

const HIGHLIGHTS: Record<string, string[]> = {
  'teagan-proposal': [
    '/weddings/collections/teagan-proposal/photos/frame-001.jpg',
    '/weddings/collections/teagan-proposal/photos/frame-005.jpg',
    '/weddings/collections/teagan-proposal/photos/frame-008.jpg',
    '/weddings/collections/teagan-proposal/photos/frame-011.jpg',
    '/weddings/collections/teagan-proposal/photos/frame-003.jpg',
    '/weddings/collections/teagan-proposal/photos/frame-010.jpg',
  ],
  'christian-proposal': [
    '/weddings/collections/christian-proposal/photos/frame-001.jpg',
    '/weddings/collections/christian-proposal/photos/frame-003.jpg',
    '/weddings/collections/christian-proposal/photos/frame-010.jpg',
    '/weddings/collections/christian-proposal/photos/frame-002.jpg',
    '/weddings/collections/christian-proposal/photos/frame-004.jpg',
  ],
  'christian-wedding': [
    '/weddings/collections/christian-wedding/photos/001.jpg',
    '/weddings/collections/christian-wedding/photos/025.jpg',
    '/weddings/collections/christian-wedding/photos/045.jpg',
    '/weddings/collections/christian-wedding/photos/080.jpg',
    '/weddings/collections/christian-wedding/photos/090.jpg',
    '/weddings/collections/christian-wedding/photos/110.jpg',
    '/weddings/collections/christian-wedding/photos/120.jpg',
    '/weddings/collections/christian-wedding/photos/150.jpg',
    '/weddings/collections/christian-wedding/photos/165.jpg',
    '/weddings/collections/christian-wedding/photos/052.jpg',
    '/weddings/collections/christian-wedding/photos/134.jpg',
    '/weddings/collections/christian-wedding/photos/033.jpg',
    '/weddings/collections/christian-wedding/photos/102.jpg',
    '/weddings/collections/christian-wedding/photos/178.jpg',
    '/weddings/collections/christian-wedding/photos/036.jpg',
  ],
  'christian-engagement': [
    '/weddings/collections/christian-engagement/photos/001.jpg',
    '/weddings/collections/christian-engagement/photos/012.jpg',
    '/weddings/collections/christian-engagement/photos/018.jpg',
    '/weddings/collections/christian-engagement/photos/030.jpg',
    '/weddings/collections/christian-engagement/photos/045.jpg',
    '/weddings/collections/christian-engagement/photos/035.jpg',
    '/weddings/collections/christian-engagement/photos/050.jpg',
    '/weddings/collections/christian-engagement/photos/060.jpg',
  ],
  'mookie-proposal': [
    '/weddings/collections/mookie-proposal/photos/040.jpg',
    '/weddings/collections/mookie-proposal/photos/048.jpg',
    '/weddings/collections/mookie-proposal/photos/055.jpg',
    '/weddings/collections/mookie-proposal/photos/070.jpg',
    '/weddings/collections/mookie-proposal/photos/085.jpg',
    '/weddings/collections/mookie-proposal/photos/062.jpg',
    '/weddings/collections/mookie-proposal/photos/078.jpg',
    '/weddings/collections/mookie-proposal/photos/092.jpg',
  ],
  'mookie-wedding': [
    '/weddings/collections/mookie-wedding/photos/frame-001.jpg',
    '/weddings/collections/mookie-wedding/photos/frame-008.jpg',
    '/weddings/collections/mookie-wedding/photos/frame-012.jpg',
    '/weddings/collections/mookie-wedding/photos/frame-015.jpg',
    '/weddings/collections/mookie-wedding/photos/frame-002.jpg',
    '/weddings/collections/mookie-wedding/photos/frame-016.jpg',
  ],
};

function interleave<T>(lists: T[][]): T[] {
  const result: T[] = [];
  const max = Math.max(0, ...lists.map((list) => list.length));

  for (let index = 0; index < max; index += 1) {
    for (const list of lists) {
      const item = list[index];
      if (item) result.push(item);
    }
  }

  return result;
}

export function getWeddingWorkPhotos(): WeddingWorkPhoto[] {
  const bySlug = new Map(
    weddingCollections.map((collection) => [collection.slug, collection.title]),
  );

  const grouped = weddingCollections.map((collection) => {
    const paths = HIGHLIGHTS[collection.slug] ?? [];
    return paths.map((src) => ({
      src,
      title: bySlug.get(collection.slug) ?? collection.title,
      slug: collection.slug,
    }));
  });

  return interleave(grouped);
}
