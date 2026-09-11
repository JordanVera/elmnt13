import { Reveal } from '@/components/reveal';

const reasons = [
  'We approach every project with intention.',
  'We consider every detail.',
  'We think beyond the expected.',
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl text-center">
        <Reveal>
          <h2 className="font-display !text-[15px] text-ink uppercase">
            Why clients choose{' '}
            <span className="bg-gold/25 px-[0.18em] py-[0.04em]">ELMNT13</span>
          </h2>
        </Reveal>

        <div className="relative mt-6 md:mt-8">
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[260px] w-[140vw] -translate-x-1/2 -translate-y-1/2 md:h-[340px]"
          >
            <defs>
              <linearGradient id="why-wave-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--gold)" />
                <stop offset="45%" stopColor="var(--gold-bright)" />
                <stop offset="100%" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
            <path
              className="gold-wave"
              d="M-60 210 C 200 210, 280 36, 520 48 S 780 286, 960 240 S 1220 52, 1500 168"
              fill="none"
              stroke="url(#why-wave-gold)"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </svg>

          <ul className="relative z-0 space-y-8 md:space-y-12">
            {reasons.map((line, index) => (
              <li key={line}>
                <Reveal delay={index * 90}>
                  <p className="font-serif text-[clamp(2.25rem,6.8vw,5.75rem)] leading-[0.92] text-ink">
                    {line}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
