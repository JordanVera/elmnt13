import Image from 'next/image';

export function HomeHero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center bg-ink px-6 text-paper">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 md:top-12">
        <div className="hero-logo">
          <Image
            src="/logo.png"
            alt="ELMNT13 Marketing | Management"
            width={258}
            height={62}
            preload
            className="h-auto w-64 max-w-[80vw]"
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl py-16">
        <h1 className="font-display text-[13vw] leading-[0.82] tracking-tight uppercase md:text-[8.4vw]">
          <span className="hero-mask block">
            <span className="hero-line font-serif text-[0.42em] font-normal tracking-normal normal-case italic text-gold">
              We See
            </span>
          </span>
          <span className="hero-mask block text-right">
            <span
              className="hero-line from-right"
              style={{ animationDelay: '0.05s' }}
            >
              the Vision.
            </span>
          </span>
          <span className="hero-mask mt-[0.12em] block">
            <span
              className="hero-line font-serif text-[0.42em] font-normal tracking-normal normal-case italic text-gold"
              style={{ animationDelay: '0.42s' }}
            >
              We Handle
            </span>
          </span>
          <span className="hero-mask block text-right">
            <span
              className="hero-line from-right"
              style={{ animationDelay: '0.48s' }}
            >
              the Details.
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
