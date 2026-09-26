import Link from 'next/link';
import { cn } from '@/lib/cn';
import { externalLinkProps } from '@/lib/site';
import type {
  WeddingCredit,
  WeddingPortableBlock,
  WeddingPortableLink,
  WeddingPortableSpan,
} from '@/lib/wedding-work-photos';

const STORY_LINK_CLASS =
  'underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold';

function spanClassName(span: WeddingPortableSpan) {
  const marks = span.marks ?? [];
  return cn(
    marks.includes('em') && 'italic',
    marks.includes('strong') && 'font-semibold',
  );
}

function resolveLinkMark(
  marks: string[] | undefined,
  markDefs: WeddingPortableLink[] | undefined,
): WeddingPortableLink | undefined {
  if (!marks?.length || !markDefs?.length) return undefined;

  const linkKey = marks.find((mark) => mark !== 'em' && mark !== 'strong');
  if (!linkKey) return undefined;

  return markDefs.find((def) => def._key === linkKey && def._type === 'link');
}

function renderSpan(
  span: WeddingPortableSpan,
  markDefs: WeddingPortableLink[] | undefined,
  key: string | number,
) {
  const link = resolveLinkMark(span.marks, markDefs);
  const className = spanClassName(span);

  if (link?.href) {
    const href = link.href.startsWith('#')
      ? `/weddings${link.href}`
      : link.href;
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          key={key}
          href={href}
          className={cn(STORY_LINK_CLASS, className)}
          {...externalLinkProps(href)}
        >
          {span.text}
        </a>
      );
    }

    return (
      <Link key={key} href={href} className={cn(STORY_LINK_CLASS, className)}>
        {span.text}
      </Link>
    );
  }

  return (
    <span key={key} className={className || undefined}>
      {span.text}
    </span>
  );
}

const TEAGAN_SLUG = 'teagan-and-issy-proposal';

function blockText(block: WeddingPortableBlock) {
  return (block.children ?? [])
    .map((span) => span.text)
    .join('')
    .trim();
}

function StoryBlock({ block }: { block: WeddingPortableBlock }) {
  const isLead = block.style === 'lead';

  return (
    <p
      className={
        isLead
          ? 'mb-3 break-inside-avoid font-serif text-base leading-snug text-gold italic md:mb-4 md:text-lg'
          : 'mb-3 break-inside-avoid text-sm leading-6 text-ink/75 md:mb-4 md:text-base md:leading-7'
      }
    >
      {(block.children ?? []).map((span, spanIndex) =>
        renderSpan(span, block.markDefs, span._key ?? spanIndex),
      )}
    </p>
  );
}

export function WeddingStory({
  slug,
  services,
  description,
  credits,
}: {
  slug?: string;
  services?: string[];
  description?: WeddingPortableBlock[];
  credits?: WeddingCredit[];
}) {
  if (!services?.length && !description?.length && !credits?.length) {
    return null;
  }

  const experienceIndex =
    slug === TEAGAN_SLUG
      ? (description ?? []).findIndex(
          (block) => blockText(block).toUpperCase() === 'THE EXPERIENCE',
        )
      : -1;
  const splitAtExperience = experienceIndex > 0;

  return (
    <div className="mt-5 w-full md:mt-6">
      {services?.length ? (
        <p className="text-[10px] tracking-[0.18em] text-stone uppercase md:text-[11px] md:tracking-[0.22em]">
          {services.join(' · ')}
        </p>
      ) : null}

      {description?.length ? (
        splitAtExperience ? (
          <div
            className={cn(
              services?.length ? 'mt-5 md:mt-6' : undefined,
              'grid w-full grid-cols-1 gap-x-5 md:grid-cols-2 md:gap-x-10',
            )}
          >
            <div>
              {description.slice(0, experienceIndex).map((block, index) => (
                <StoryBlock key={block._key ?? index} block={block} />
              ))}
            </div>
            <div>
              {description.slice(experienceIndex).map((block, index) => (
                <StoryBlock
                  key={block._key ?? experienceIndex + index}
                  block={block}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              services?.length ? 'mt-5 md:mt-6' : undefined,
              'w-full columns-1 gap-x-5 md:columns-2 md:gap-x-10',
            )}
          >
            {description.map((block, index) => (
              <StoryBlock key={block._key ?? index} block={block} />
            ))}
          </div>
        )
      ) : null}

      {credits?.length ? (
        <ul
          className={cn(
            services?.length || description?.length
              ? 'mt-5 md:mt-6'
              : undefined,
            'w-full space-y-1',
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
