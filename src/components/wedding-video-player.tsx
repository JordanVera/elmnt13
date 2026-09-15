type WeddingVideoPlayerProps = {
  url: string;
  poster?: string;
  title: string;
};

function resolveVideo(url: string) {
  const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (gdriveMatch) {
    return {
      kind: 'iframe' as const,
      src: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`,
    };
  }

  if (url.includes('galleries.vidflow.co')) {
    return { kind: 'iframe' as const, src: url };
  }

  return { kind: 'video' as const, src: url };
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
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
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
