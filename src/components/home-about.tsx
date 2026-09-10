import Link from 'next/link';
import { Reveal } from '@/components/reveal';

export function HomeAbout() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 md:py-20 lg:py-24">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[1%] hidden -translate-y-1/2 font-serif text-[22vw] leading-none text-gold/25 select-none md:block lg:right-[3%] lg:text-[16rem]"
      >
        E13
      </p>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-end gap-3 md:absolute md:top-0 md:right-0 md:mb-0">
          <p className="text-[11px] tracking-[0.36em] text-ink/45 uppercase">
            About ELMNT13
          </p>
          <span className="gold-rule h-px w-10 bg-gold" aria-hidden="true" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_auto_minmax(0,1fr)] md:pt-8 lg:gap-14">
          <Reveal>
            <h2 className="font-display text-6xl leading-[0.86] tracking-tight uppercase md:text-7xl lg:text-[5.5rem]">
              Vision Led.
              <br />
              Details Driven.
              <span className="mt-[-0.08em] block font-serif text-[0.42em] leading-[1.05] tracking-normal text-gold italic normal-case">
                Experience Focused.
              </span>
            </h2>
          </Reveal>

          <div
            aria-hidden="true"
            className="hidden self-stretch md:block w-px bg-ink/15"
          />

          <Reveal delay={120} className="relative z-10">
            <p className="max-w-md text-lg leading-8 text-ink/75">
              At ELMNT13, we do more than plan and produce events — we bring
              visions to life. Through strategic planning, creative design and
              seamless execution, we create experiences that are intentional,
              elevated and unforgettable.
            </p>
            <div className="mt-10 flex items-center gap-5">
              <Link
                href="/about"
                className="inline-flex border border-ink/25 px-6 py-3 text-[11px] tracking-[0.32em] text-ink uppercase transition-colors hover:border-ink"
              >
                Learn more
              </Link>
              <span aria-hidden="true" className="flex items-center text-gold">
                <span className="h-px w-8 bg-gold" />
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
