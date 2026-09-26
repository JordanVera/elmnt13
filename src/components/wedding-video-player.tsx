type WeddingVideoPlayerProps = {
  url: string;
  poster?: string;
  title: string;
};

type ResolvedVideo =
  | { kind: 'iframe'; src: string }
  | { kind: 'video'; src: string };

function youtubeStartSeconds(value: string | null) {
  if (!value) return null;
  if (/^\d+$/.test(value)) return Number(value);

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match || !match[0]) return null;

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

function youtubeEmbed(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^(www|m)\./, '');
  let id: string | null = null;

  if (host === 'youtu.be') {
    id = parsed.pathname.split('/').filter(Boolean)[0] ?? null;
  } else if (
    host === 'youtube.com' ||
    host === 'youtube-nocookie.com' ||
    host === 'music.youtube.com'
  ) {
    if (parsed.pathname === '/watch') {
      id = parsed.searchParams.get('v');
    } else {
      const [kind, value] = parsed.pathname.split('/').filter(Boolean);
      if (kind && value && ['embed', 'shorts', 'live', 'v'].includes(kind)) {
        id = value;
      }
    }
  }

  if (!id || !/^[\w-]{11}$/.test(id)) return null;

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  const start =
    youtubeStartSeconds(parsed.searchParams.get('start')) ??
    youtubeStartSeconds(parsed.searchParams.get('t'));
  if (start) embed.searchParams.set('start', String(start));

  return embed.toString();
}

function resolveVideo(url: string): ResolvedVideo {
  const trimmed = url.trim();
  const youtube = youtubeEmbed(trimmed);
  if (youtube) return { kind: 'iframe', src: youtube };

  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (gdriveMatch) {
    return {
      kind: 'iframe',
      src: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`,
    };
  }

  if (trimmed.includes('galleries.vidflow.co')) {
    return { kind: 'iframe', src: trimmed };
  }

  return { kind: 'video', src: trimmed };
}

export function WeddingVideoPlayer({
  url,
  poster,
  title,
}: WeddingVideoPlayerProps) {
  const resolved = resolveVideo(url);

  if (resolved.kind === 'iframe') {
    return (
      <div className="relative aspect-video overflow-hidden bg-ink">
        <iframe
          src={resolved.src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-ink">
      <video
        controls
        playsInline
        poster={poster}
        className="aspect-video w-full object-cover"
      >
        <source src={resolved.src} type="video/mp4" />
      </video>
    </div>
  );
}
