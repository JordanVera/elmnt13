import { Reveal } from "@/components/reveal";

export function DetailsMoment({
  line = "Love is in the details",
  tone = "blush",
  highlight = "details",
  compact = false,
  showRule = true,
  layout = "inline",
}: {
  line?: string;
  tone?: "blush" | "ink" | "paper";
  highlight?: string;
  compact?: boolean;
  showRule?: boolean;
  layout?: "inline" | "tagline";
}) {
  const words = line.split(" ");
  const dark = tone === "ink";
  const heightClass = compact ? "min-h-[38vh] py-14 md:py-16" : "min-h-[70vh] py-20";

  return (
    <section
      className={
        dark
          ? `flex ${heightClass} items-center bg-ink px-6`
          : tone === "paper"
            ? `flex ${heightClass} items-center bg-white px-6`
            : `flex ${heightClass} items-center bg-blush px-6`
      }
    >
      <Reveal className="mx-auto max-w-6xl text-center">
        {layout === "tagline" ? (
          <p className="text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block font-sans text-[0.38em] font-light tracking-[0.22em] text-white/90 uppercase">
              We take your
            </span>
            <span className="mt-2 block">
              <span className="font-display font-bold text-white uppercase">
                Vision
              </span>{" "}
              <span className="font-serif text-gold italic normal-case">
                further
              </span>
            </span>
          </p>
        ) : (
          <p
            className={
              dark
                ? "font-serif text-5xl leading-tight text-white italic md:text-8xl"
                : "font-serif text-5xl leading-tight text-ink italic md:text-8xl"
            }
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={
                  word.toLowerCase() === highlight.toLowerCase()
                    ? "text-gold not-italic font-display uppercase tracking-tight"
                    : "inline-block px-[0.12em]"
                }
              >
                {word}{" "}
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
