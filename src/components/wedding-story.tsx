import { cn } from '@/lib/cn';
import type {
  WeddingCredit,
  WeddingPortableBlock,
  WeddingPortableSpan,
} from '@/lib/wedding-work-photos';

function spanClassName(span: WeddingPortableSpan) {
  const marks = span.marks ?? [];
  return cn(
    marks.includes('em') && 'italic',
    marks.includes('strong') && 'font-semibold',
  );
}

export function WeddingStory({
  services,
  description,
  credits,
}: {
  services?: string[];
  description?: WeddingPortableBlock[];
  credits?: WeddingCredit[];
}) {
  if (!services?.length && !description?.length && !credits?.length) {
    return null;
  }

  return (
    <div className="mt-8 max-w-3xl">
      {services?.length ? (
        <p className="text-[11px] tracking-[0.22em] text-stone uppercase">
          {services.join(' · ')}
        </p>
      ) : null}

      {description?.length ? (
        <div className={cn(services?.length && 'mt-8', 'space-y-5')}>
          {description.map((block, index) => {
            const isLead = block.style === 'lead';
            return (
              <p
                key={block._key ?? index}
                className={
                  isLead
                    ? 'font-serif text-xl leading-snug text-gold italic md:text-2xl'
                    : 'text-base leading-7 text-ink/75 md:text-lg md:leading-8'
                }
              >
                {(block.children ?? []).map((span, spanIndex) => {
                  const className = spanClassName(span);
                  return (
                    <span
                      key={span._key ?? spanIndex}
                      className={className || undefined}
                    >
                      {span.text}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      ) : null}

      {credits?.length ? (
        <ul
          className={cn(
            (services?.length || description?.length) && 'mt-8',
            'space-y-1',
          )}
        >
          {credits.map((credit) => (
            <li
              key={`${credit.role}-${credit.name}`}
              className="text-sm tracking-wide text-ink/50"
            >
              <span className="text-[11px] tracking-[0.18em] text-gold uppercase">
                {credit.role}
              </span>
              {': '}
              {credit.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
