import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public/weddings/collections');
const MANIFEST_PATH = path.join(process.cwd(), 'src/lib/wedding-gallery.ts');

type CollectionConfig = {
  slug: string;
  title: string;
  photos?: { source: 'json'; file: string };
  video?: { type: 'url' | 'gdrive'; value: string };
  poster?: { type: 'url'; value: string };
  extractPhotoFrames?: number;
};

const collections: CollectionConfig[] = [
  {
    slug: 'teagan-proposal',
    title: "Teagan's Proposal",
    video: {
      type: 'gdrive',
      value: 'https://drive.google.com/file/d/1WRjokRlFwTrUDoCELeqqN57HrFS4TXe9/view',
    },
    extractPhotoFrames: 12,
  },
  {
    slug: 'christian-proposal',
    title: "Christian's Proposal",
    video: {
      type: 'gdrive',
      value: 'https://drive.google.com/file/d/1Kb9utbofSb0yNodKJbMh2zt9ERLeXh89/view',
    },
    extractPhotoFrames: 12,
  },
  {
    slug: 'christian-wedding',
    title: "Christian's Wedding",
    photos: {
      source: 'json',
      file: 'scripts/scraped-urls/christian-wedding.json',
    },
    video: {
      type: 'url',
      value: 'https://galleries.vidflow.co/9youtphy',
    },
    poster: {
      type: 'url',
      value:
        'https://img.vidflow.co/studio/qkx4iiy6/deliverable/9youtphy/media/9tqec7v4/Screenshot2023-03-28at113815PM.png?width=1200&height=1200&optimize=image',
    },
  },
  {
    slug: 'christian-engagement',
    title: "Christian's Engagement Shoot",
    photos: {
      source: 'json',
      file: 'scripts/scraped-urls/christian-engagement.json',
    },
  },
  {
    slug: 'mookie-proposal',
    title: "Mookie's Proposal",
    photos: {
      source: 'json',
      file: 'scripts/scraped-urls/mookie-proposal.json',
    },
    video: {
      type: 'gdrive',
      value: 'https://drive.google.com/file/d/10I2Nk3UFhuhThiGkghhaZPQNqy_T1rMw/view',
    },
  },
  {
    slug: 'mookie-wedding',
    title: "Mookie's Wedding",
    video: {
      type: 'url',
      value: 'https://galleries.vidflow.co/briannaandmookie',
    },
    poster: {
      type: 'url',
      value:
        'https://img.vidflow.co/studio/qkx4iiy6/deliverable/egwdmc2m/media/tpgnqjfs/i-WWJ2VRJ-X5.jpeg?width=1200&height=1200&optimize=image',
    },
    extractPhotoFrames: 16,
  },
];

function run(command: string) {
  execSync(command, { stdio: 'inherit' });
}

function downloadUrl(url: string, dest: string) {
  if (existsSync(dest)) return;
  mkdirSync(path.dirname(dest), { recursive: true });
  run(`curl -sL "${url}" -o "${dest}"`);
}

function extractFramesFromUrl(videoUrl: string, photosDir: string, count: number) {
  mkdirSync(photosDir, { recursive: true });
  if (readdirSync(photosDir).some((name) => name.endsWith('.jpg'))) return;

  const tempDir = path.join(photosDir, '..', '.tmp-video');
  mkdirSync(tempDir, { recursive: true });
  const tempVideo = path.join(tempDir, 'source-video.%(ext)s');

  try {
    run(`yt-dlp -o "${tempVideo}" "${videoUrl}"`);
    const downloaded = readdirSync(tempDir).find((name) =>
      name.startsWith('source-video.'),
    );
    if (!downloaded) return;
    run(
      `ffmpeg -y -i "${path.join(tempDir, downloaded)}" -vf "fps=1/8" -frames:v ${count} "${photosDir}/frame-%03d.jpg"`,
    );
  } finally {
    if (existsSync(tempDir)) {
      for (const file of readdirSync(tempDir)) {
        execSync(`rm -f "${path.join(tempDir, file)}"`);
      }
      execSync(`rmdir "${tempDir}"`);
    }
  }
}

function normalizePixiesetUrl(url: string) {
  return url
    .replace('-xlarge.jpg', '-large.jpg')
    .replace('-medium.jpg', '-large.jpg');
}

function downloadPhotosFromJson(jsonPath: string, photosDir: string) {
  const urls = JSON.parse(readFileSync(jsonPath, 'utf8')) as string[];
  mkdirSync(photosDir, { recursive: true });

  urls.forEach((url, index) => {
    const normalized = normalizePixiesetUrl(url);
    const filename = `${String(index + 1).padStart(3, '0')}.jpg`;
    const dest = path.join(photosDir, filename);
    if (existsSync(dest)) return;
    try {
      downloadUrl(normalized, dest);
    } catch {
      // Skip failed downloads silently to keep the batch running.
    }
  });
}

function pickCover(photosDir: string, fallback?: string) {
  const photos = existsSync(photosDir)
    ? readdirSync(photosDir)
        .filter((name) => name.endsWith('.jpg'))
        .sort()
    : [];
  if (photos[0]) return path.join(photosDir, photos[0]);
  return fallback;
}

type BuiltCollection = {
  slug: string;
  title: string;
  cover: string;
  photos: string[];
  video?: string;
  poster?: string;
};

function externalVideoUrl(config: CollectionConfig['video']) {
  if (!config) return undefined;
  return config.value;
}

function externalPosterUrl(config: CollectionConfig['poster']) {
  if (!config) return undefined;
  return config.value;
}

function toPublicPath(absPath: string) {
  return absPath.replace(`${process.cwd()}/public`, '');
}

function buildCollection(config: CollectionConfig): BuiltCollection {
  const dir = path.join(ROOT, config.slug);
  const photosDir = path.join(dir, 'photos');
  const cover = path.join(dir, 'cover.jpg');

  mkdirSync(dir, { recursive: true });

  if (config.photos) {
    downloadPhotosFromJson(
      path.join(process.cwd(), config.photos.file),
      photosDir,
    );
  }

  if (config.extractPhotoFrames && config.video) {
    extractFramesFromUrl(
      config.video.value,
      photosDir,
      config.extractPhotoFrames,
    );
  }

  const photoFiles = existsSync(photosDir)
    ? readdirSync(photosDir)
        .filter((name) => name.endsWith('.jpg'))
        .sort()
        .map((name) => toPublicPath(path.join(photosDir, name)))
    : [];

  const coverSource =
    pickCover(photosDir) ??
    path.join(process.cwd(), 'public/weddings', `${config.slug}.jpg`);

  if (existsSync(coverSource) && !existsSync(cover)) {
    copyFileSync(coverSource, cover);
  }

  return {
    slug: config.slug,
    title: config.title,
    cover: toPublicPath(cover),
    photos: photoFiles,
    video: externalVideoUrl(config.video),
    poster: externalPosterUrl(config.poster),
  };
}

function writeManifest(items: BuiltCollection[]) {
  const body = `export type WeddingCollection = {
  slug: string;
  title: string;
  cover: string;
  photos: string[];
  video?: string;
  poster?: string;
};

export const weddingCollections: WeddingCollection[] = ${JSON.stringify(items, null, 2)};
`;

  writeFileSync(MANIFEST_PATH, body);
}

function main() {
  const built = collections.map(buildCollection);
  writeManifest(built);
  console.log(`Built ${built.length} wedding collections.`);
}

main();
