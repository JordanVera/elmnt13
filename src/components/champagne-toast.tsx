import Image from 'next/image';

export function ChampagneToast() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-blush px-6">
      <Image
        src="/weddings-hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-blush/45" />
      <div className="pointer-events-none absolute inset-0 z-1 flex items-end justify-center gap-2 pb-[18vh] md:gap-6">
        <div className="glass-left origin-bottom">
          <Flute mirror={false} />
        </div>
        <div className="glass-right origin-bottom">
          <Flute mirror />
        </div>
      </div>
      <h1 className="relative z-10 text-center">
        <span className="block font-serif text-2xl italic  md:text-6xl">
          To your
        </span>
        <span className="font-display mt-2 block text-6xl tracking-tight uppercase md:text-9xl">
          Love.
        </span>
      </h1>
    </section>
  );
}

function Flute({ mirror }: { mirror: boolean }) {
  return (
    <svg
      viewBox="0 0 120 320"
      className="h-[46vh] w-auto drop-shadow-xl md:h-[58vh]"
      style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`liquid-${mirror ? 'r' : 'l'}`}
          x1="0"
          x2="0"
          y1="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#e8c98a" />
          <stop offset="100%" stopColor="#f6e7c2" />
        </linearGradient>
        <linearGradient
          id={`glass-${mirror ? 'r' : 'l'}`}
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <path
        d="M38 18 C38 18 36 128 56 168 L56 268 L40 268 L40 278 L80 278 L80 268 L64 268 L64 168 C84 128 82 18 82 18 Z"
        fill={`url(#glass-${mirror ? 'r' : 'l'})`}
        stroke="#c4a574"
        strokeWidth="1.4"
      />
      <path
        d="M42 78 C42 120 50 150 58 164 L62 164 C70 150 78 120 78 78 Z"
        fill={`url(#liquid-${mirror ? 'r' : 'l'})`}
        opacity="0.9"
      />
      <ellipse
        cx="60"
        cy="18"
        rx="22"
        ry="6"
        fill="none"
        stroke="#c4a574"
        strokeWidth="1.6"
      />
    </svg>
  );
}
