import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectSeedData, type ProjectSeed } from './project-seed-data';

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
  throw new Error('Missing SANITY_API_TOKEN');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-01',
  token,
  useCdn: false,
});

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SOURCE_NAME = 'elmnt13-seed';
const UPLOAD_CONCURRENCY = 2;

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

type ImageRef = {
  _type: 'image';
  _key?: string;
  asset: { _type: 'reference'; _ref: string };
};

function projectDocumentId(slug: string) {
  return `project-${slug}`;
}

function uniqueImagePaths() {
  const paths = new Set<string>();
  for (const project of projectSeedData) {
    paths.add(project.image);
    for (const src of project.gallery) paths.add(src);
  }
  return [...paths];
}

function contentTypeFor(filePath: string) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
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
        (statusCode !== undefined && (statusCode === 429 || statusCode >= 500)) ||
        /429|50[0-9]|ECONNRESET|ETIMEDOUT|fetch failed|upstream server|Bad Gateway|gateway/i.test(
          message,
        );
      if (!retryable || attempt === attempts) throw error;
      const delay = Math.min(attempt * 2000, 15000);
      console.warn(`Retry ${attempt}/${attempts} for ${label} in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

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

async function uploadImage(sourcePath: string) {
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

function toDocument(
  project: ProjectSeed,
  index: number,
  assets: Map<string, string>,
) {
  const image = toImageRef(assets.get(project.image), project.image);
  if (!image) {
    throw new Error(`Missing cover image for ${project.slug}`);
  }

  const gallery = project.gallery
    .map((src, galleryIndex) => toImageRef(assets.get(src), src, galleryIndex))
    .filter((ref): ref is ImageRef => Boolean(ref));

  return {
    _id: projectDocumentId(project.slug),
    _type: 'project',
    title: project.title,
    slug: { _type: 'slug', current: project.slug },
    client: project.client,
    service: project.service,
    category: project.category,
    year: project.year,
    image,
    gallery,
    featured: Boolean(project.featured),
    description: project.description,
    sortOrder: index,
  };
}

async function ensureStudioCors() {
  const origin = 'http://localhost:3000';
  const response = await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!response.ok) {
    console.warn(`Could not list CORS origins (${response.status})`);
    return;
  }
  const entries = (await response.json()) as Array<{ origin?: string }>;
  if (entries.some((entry) => entry.origin === origin)) {
    return;
  }
  const create = await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, allowCredentials: true }),
    },
  );
  if (!create.ok) {
    console.warn(`Could not add CORS origin ${origin} (${create.status})`);
    return;
  }
  console.log(`Added CORS origin ${origin}`);
}

async function seed() {
  console.log(
    `Seeding ${projectSeedData.length} projects into ${projectId}/${dataset}`,
  );
  await ensureStudioCors();

  const imagePaths = uniqueImagePaths();
  const assets = await loadExistingAssets();
  console.log(`Found ${assets.size} previously uploaded seed images`);

  const missing = imagePaths.filter((src) => !assets.has(src));
  console.log(`Uploading ${missing.length} images (${imagePaths.length} unique)`);

  let uploaded = 0;
  await mapPool(missing, UPLOAD_CONCURRENCY, async (sourcePath) => {
    const assetId = await withRetry(sourcePath, () => uploadImage(sourcePath));
    assets.set(sourcePath, assetId);
    uploaded += 1;
    if (uploaded % 10 === 0 || uploaded === missing.length) {
      console.log(`Uploaded ${uploaded}/${missing.length} images`);
    }
  });

  const docs = projectSeedData.map((project, index) =>
    toDocument(project, index, assets),
  );

  const chunkSize = 20;
  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
    let tx = client.transaction();
    for (const doc of chunk) {
      tx = tx.createOrReplace(doc);
    }
    await withRetry(`projects ${i + 1}-${i + chunk.length}`, () => tx.commit());
    console.log(`Wrote projects ${i + 1}-${Math.min(i + chunkSize, docs.length)}`);
  }

  console.log(`Done. Seeded ${docs.length} projects.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
