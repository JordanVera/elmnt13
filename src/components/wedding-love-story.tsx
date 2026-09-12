import { Reveal } from '@/components/reveal';

export function WeddingLoveStory() {
  return (
    <section id="story" className="scroll-mt-8 bg-white px-6 py-12 md:py-14">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="leading-[1.05]">
            <span className="block font-display text-4xl tracking-tight uppercase md:text-6xl">
              allow us to be
            </span>
            <span className="mt-1 block font-serif text-4xl italic md:text-6xl">
              a part of your love story
            </span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-black md:text-2xl md:leading-9">
            We love love, and we’d be honored to be part of yours. We understand
            that being trusted with your wedding means being trusted with one of
            the most meaningful moments of your life. Your vision matters to us,
            which is why we consider every detail and curate every moment with
            the care and intention it deserves.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
