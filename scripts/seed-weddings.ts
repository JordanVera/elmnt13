/**
 * Seed the 6 wedding collections into Sanity.
 *
 * Usage:
 *   npm run seed:weddings
 *
 * Requires SANITY_API_TOKEN in .env.local (write-access token from
 * https://sanity.io/manage → project → API → Tokens).
 *
 * All local cover/gallery images are uploaded to Sanity as image assets.
 * Video/poster URLs (external or local /public paths) are stored as plain
 * strings — no upload needed for video files.
 *
 * Re-running is safe: images are deduplicated by source path via the
 * SOURCE_NAME tag, and documents are created-or-replaced by a stable ID.
 */

import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { weddingSeedData, type WeddingSeed } from './wedding-seed-data';

// ─── Sanity client ────────────────────────────────────────────────────────────

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!token) {
  throw new Error(
    'Missing SANITY_API_TOKEN — create a write-access token at https://sanity.io/manage',
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-01',
  token,
  useCdn: false,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SOURCE_NAME = 'elmnt13-weddings-seed';
const UPLOAD_CONCURRENCY = 3;

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageRef = {
  _type: 'image';
  _key?: string;
  asset: { _type: 'reference'; _ref: string };
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function weddingDocumentId(slug: string) {
  return `wedding-${slug}`;
}

/** Collect every unique image path across all weddings (covers + galleries). */
function uniqueImagePaths() {
  const paths = new Set<string>();
  for (const w of weddingSeedData) {
    paths.add(w.cover);
    for (const src of w.gallery) paths.add(src);
  }
  return [...paths];
}

function contentTypeFor(filePath: string) {
  return (
    CONTENT_TYPES[path.extname(filePath).toLowerCase()] ??
    'application/octet-stream'
  );
}

function filenameFor(sourcePath: string) {
  if (sourcePath.startsWith('http')) {
    const url = new URL(sourcePath);
    return `${url.hostname}${url.pathname}`.replaceAll('/', '-');
  }
  return sourcePath.replaceAll('/', '-').replace(/^-/, '');
}

function imageKey(sourcePath: string, index: number) {
  const base = filenameFor(sourcePath)
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(-40);
  return `img-${index}-${base || 'asset'}`;
}

// ─── Concurrency pool ─────────────────────────────────────────────────────────

async function mapPool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
) {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await fn(items[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return results;
}

// ─── Retry ────────────────────────────────────────────────────────────────────

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 8) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const statusCode =
        error && typeof error === 'object' && 'statusCode' in error
          ? Number(error.statusCode)
          : undefined;
      const message = error instanceof Error ? error.message : String(error);
      const retryable =
        (statusCode !== undefined &&
          (statusCode === 429 || statusCode >= 500)) ||
        /429|50[0-9]|ECONNRESET|ETIMEDOUT|fetch failed|upstream server|Bad Gateway|gateway/i.test(
          message,
        );
      if (!retryable || attempt === attempts) throw error;
      const delay = Math.min(attempt * 2000, 15000);
      console.warn(`  Retry ${attempt}/${attempts} for ${label} in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

// ─── Asset management ─────────────────────────────────────────────────────────

async function loadExistingAssets() {
  const assets = await client.fetch<Array<{ _id: string; sourceId?: string }>>(
    `*[_type == "sanity.imageAsset" && source.name == $name]{
      _id,
      "sourceId": source.id
    }`,
    { name: SOURCE_NAME },
  );
  const map = new Map<string, string>();
  for (const asset of assets) {
    if (asset.sourceId) map.set(asset.sourceId, asset._id);
  }
  return map;
}

async function uploadImage(sourcePath: string): Promise<string> {
  if (sourcePath.startsWith('http')) {
    const response = await fetch(sourcePath);
    if (!response.ok) {
      throw new Error(`Failed to download ${sourcePath}: ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client.assets.upload('image', buffer, {
      filename: filenameFor(sourcePath),
      contentType: response.headers.get('content-type') ?? 'image/jpeg',
      source: { id: sourcePath, name: SOURCE_NAME },
    });
    return asset._id;
  }

  const filePath = path.join(PUBLIC_DIR, sourcePath.replace(/^\//, ''));
  const buffer = await readFile(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: filenameFor(sourcePath),
    contentType: contentTypeFor(filePath),
    source: { id: sourcePath, name: SOURCE_NAME },
  });
  return asset._id;
}

function toImageRef(
  assetId: string | undefined,
  sourcePath: string,
  index?: number,
): ImageRef | undefined {
  if (!assetId) return undefined;
  return {
    _type: 'image',
    ...(index === undefined ? {} : { _key: imageKey(sourcePath, index) }),
    asset: { _type: 'reference', _ref: assetId },
  };
}

// ─── Document builder ─────────────────────────────────────────────────────────

function toDocument(wedding: WeddingSeed, assets: Map<string, string>) {
  const cover = toImageRef(assets.get(wedding.cover), wedding.cover);
  if (!cover) {
    throw new Error(`Missing cover image asset for "${wedding.slug}"`);
  }

  const gallery = wedding.gallery
    .map((src, i) => toImageRef(assets.get(src), src, i))
    .filter((ref): ref is ImageRef => Boolean(ref));

  return {
    _id: weddingDocumentId(wedding.slug),
    _type: 'wedding',
    title: wedding.title,
    slug: { _type: 'slug', current: wedding.slug },
    kind: wedding.kind,
    location: wedding.location,
    cover,
    gallery,
    ...(wedding.video ? { video: wedding.video } : {}),
    ...(wedding.poster ? { poster: wedding.poster } : {}),
    ...(wedding.previewVideo ? { previewVideo: wedding.previewVideo } : {}),
    sortOrder: wedding.sortOrder,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  const totalImages = weddingSeedData.reduce(
    (sum, w) => sum + 1 + w.gallery.length,
    0,
  );
  console.log(
    `\nSeeding ${weddingSeedData.length} wedding collections into ${projectId}/${dataset}`,
  );
  console.log(
    `Total images to consider: ${totalImages} across ${weddingSeedData.length} weddings\n`,
  );

  // 1. Collect all unique image paths
  const imagePaths = uniqueImagePaths();

  // 2. Check which assets are already uploaded
  const assets = await loadExistingAssets();
  console.log(`Found ${assets.size} previously uploaded seed images`);

  const missing = imagePaths.filter((src) => !assets.has(src));
  console.log(
    `Uploading ${missing.length} new images (${imagePaths.length} unique total)\n`,
  );

  // 3. Upload missing images
  let uploaded = 0;
  await mapPool(missing, UPLOAD_CONCURRENCY, async (sourcePath) => {
    const assetId = await withRetry(sourcePath, () => uploadImage(sourcePath));
    assets.set(sourcePath, assetId);
    uploaded += 1;
    if (uploaded % 20 === 0 || uploaded === missing.length) {
      console.log(`  Uploaded ${uploaded}/${missing.length} images`);
    }
  });

  if (missing.length > 0) console.log('');

  // 4. Build and write documents
  const docs = weddingSeedData.map((w) => toDocument(w, assets));

  const chunkSize = 10;
  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
    let tx = client.transaction();

    // if (i === 0 ) {
    //   return;
    // }

    for (const doc of chunk) {
      tx = tx.createOrReplace(doc);
    }
    await withRetry(`weddings ${i + 1}–${i + chunk.length}`, () => tx.commit());
    console.log(
      `Wrote weddings ${i + 1}–${Math.min(i + chunkSize, docs.length)}`,
    );
  }

  console.log(`\nDone. Seeded ${docs.length} wedding collections.`);
  for (const w of weddingSeedData) {
    console.log(
      `  ✓ ${w.title} (${w.kind}, ${w.location}) — ${w.gallery.length} photos`,
    );
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
