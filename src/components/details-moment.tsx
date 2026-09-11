import { Reveal } from '@/components/reveal';

export function DetailsMoment({
  line = 'Love is in the details',
  tone = 'blush',
  highlight = 'details',
  compact = false,
  showRule = true,
  layout = 'inline',
}: {
  line?: string;
  tone?: 'blush' | 'ink' | 'paper';
  highlight?: string;
  compact?: boolean;
  showRule?: boolean;
  layout?: 'inline' | 'tagline';
}) {
  const words = line.split(' ');
  const dark = tone === 'ink';
  const heightClass =
    compact && layout === 'tagline'
      ? 'py-8 md:py-10'
      : compact
        ? 'min-h-[38vh] py-14 md:py-16'
        : 'min-h-[70vh] py-20';

  return (
    <section
      className={
        dark
          ? `flex ${heightClass} items-center bg-ink px-6`
          : tone === 'paper'
            ? `flex ${heightClass} items-center bg-white px-6`
            : `flex ${heightClass} items-center bg-blush px-6`
      }
    >
      <Reveal
        className={`mx-auto max-w-6xl ${layout === 'tagline' ? 'text-left' : 'text-center'}`}
      >
        {layout === 'tagline' ? (
          <div className="inline-block text-left">
            <h2 className="mt-6 flex w-full max-w-xl flex-col items-start text-6xl leading-[0.8] tracking-tight uppercase md:text-7xl lg:text-8xl">
              <span className="font-sans text-[0.5em] leading-none tracking-tighter uppercase">
                We take your
              </span>
              <span className=" font-bebas font-bold">Vision</span>
              <span className=" font-serif normal-case text-gold ml-26">
                further
              </span>
            </h2>
          </div>
        ) : (
          <p
            className={
              dark
                ? 'font-serif text-5xl leading-tight text-white italic md:text-8xl'
                : 'font-serif text-5xl leading-tight text-ink italic md:text-8xl'
            }
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={
                  word.toLowerCase() === highlight.toLowerCase()
                    ? 'text-gold not-italic font-display uppercase tracking-tight'
                    : 'inline-block px-[0.12em]'
                }
              >
                {word}{' '}
              </span>
            ))}
          </p>
        )}
        {showRule ? (
          <span className="gold-rule mx-auto mt-10 block h-px w-32 bg-gold" />
        ) : null}
      </Reveal>
    </section>
  );
}
