import { Reveal } from "@/components/reveal";

export function DetailsMoment({
  line = "Love is in the details",
  tone = "blush",
}: {
  line?: string;
  tone?: "blush" | "ink";
}) {
  const words = line.split(" ");
  const dark = tone === "ink";

  return (
    <section
      className={
        dark
          ? "flex min-h-[70vh] items-center bg-ink px-6 py-28"
          : "flex min-h-[70vh] items-center bg-blush px-6 py-28"
      }
    >
      <Reveal className="mx-auto max-w-6xl text-center">
        <p
          className={
            dark
              ? "font-serif text-5xl leading-tight text-paper italic md:text-8xl"
              : "font-serif text-5xl leading-tight text-ink italic md:text-8xl"
          }
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={
                word.toLowerCase() === "details"
                  ? "text-gold not-italic font-display uppercase tracking-tight"
                  : "inline-block px-[0.12em]"
              }
            >
              {word}{" "}
            </span>
          ))}
        </p>
        <span className="gold-rule mx-auto mt-10 block h-px w-32 bg-gold" />
      </Reveal>
    </section>
  );
}
