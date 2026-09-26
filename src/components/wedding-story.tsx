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
    <div className="mt-5 max-w-3xl md:mt-6">
      {services?.length ? (
        <p className="text-[10px] tracking-[0.18em] text-stone uppercase md:text-[11px] md:tracking-[0.22em]">
          {services.join(' · ')}
        </p>
      ) : null}

      {description?.length ? (
        <div className={cn(services?.length ? 'mt-5 md:mt-6' : undefined, 'space-y-3 md:space-y-4')}>
          {description.map((block, index) => {
            const isLead = block.style === 'lead';
            return (
              <p
                key={block._key ?? index}
                className={
                  isLead
                    ? 'font-serif text-base leading-snug text-gold italic md:text-lg'
                    : 'text-sm leading-6 text-ink/75 md:text-base md:leading-7'
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
            services?.length || description?.length ? 'mt-5 md:mt-6' : undefined,
            'space-y-1',
          )}
        >
          {credits.map((credit) => (
            <li
              key={`${credit.role}-${credit.name}`}
              className="text-xs tracking-wide text-ink/50 md:text-sm"
            >
              <span className="text-[10px] tracking-[0.16em] text-gold uppercase md:text-[11px] md:tracking-[0.18em]">
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
