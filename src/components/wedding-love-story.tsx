import { Reveal } from '@/components/reveal';

export function WeddingLoveStory() {
  return (
    <section id="story" className="scroll-mt-8 bg-white px-6 py-16 md:py-2">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2>
            <span className="block text-xl tracking-[.3em] text-stone uppercase">
              Allow us to be
            </span>
            <span className="mt-1 block font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,6.4vw,4.75rem)] leading-[1.12] tracking-tight">
              a part of your{' '}
              <span className="font-serif text-gold whitespace-nowrap">
                love story
              </span>
            </span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-black md:mt-10">
            We love <span className="font-serif">love,</span> so your love
            matters to us. We listen closely to what you desire, seek to
            understand what’s most important and bring our creativity and
            perspective to push your ideas beyond the expected, create the
            unimaginable and take your vision further. Because when it comes to
            your love story, we believe what you envision is only the beginning
            of what it can truly become.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
