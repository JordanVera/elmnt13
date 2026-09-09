import { Reveal } from '@/components/reveal';

const reasons = [
  'We approach every project with intention.',
  'We see the whole vision.',
  'We consider every detail.',
  'We think beyond the expected.',
];

export function WhyChoose() {
  return (
    <section className="bg-paper px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-serif text-2xl italic text-ink md:text-3xl">
            Why clients choose ELMNT13
          </p>
        </Reveal>
        <ul className="mt-10 font-display text-[clamp(1.85rem,5.2vw,5.5rem)] leading-[0.88] tracking-tight uppercase md:mt-14">
          {reasons.map((line, index) => (
            <li key={line}>
              <Reveal delay={index * 90}>
                <span className="block cursor-default py-[0.06em] transition-colors duration-500 hover:text-gold">
                  {line}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
