export type PortableLink = {
  _type: 'link';
  _key: string;
  href: string;
};

export type PortableSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

export type PortableBlock = {
  _type: 'block';
  _key: string;
  style: 'normal' | 'lead';
  markDefs: PortableLink[];
  children: PortableSpan[];
};

const INLINE_MARK = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const LEAD_BLOCK = /^\*([^*]+)\*$/;

function parseDecorators(text: string, keyPrefix: string): PortableSpan[] {
  const children: PortableSpan[] = [];
  let lastIndex = 0;
  let spanIndex = 0;

  for (const match of text.matchAll(INLINE_MARK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      children.push({
        _type: 'span',
        _key: `${keyPrefix}-s${spanIndex}`,
        text: text.slice(lastIndex, index),
        marks: [],
      });
      spanIndex += 1;
    }

    children.push({
      _type: 'span',
      _key: `${keyPrefix}-s${spanIndex}`,
      text: match[1] ?? match[2] ?? '',
      marks: match[1] ? ['strong'] : ['em'],
    });
    spanIndex += 1;
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length || children.length === 0) {
    children.push({
      _type: 'span',
      _key: `${keyPrefix}-s${spanIndex}`,
      text: text.slice(lastIndex),
      marks: [],
    });
  }

  return children;
}

function parseInline(
  text: string,
  keyPrefix: string,
): { children: PortableSpan[]; markDefs: PortableLink[] } {
  const markDefs: PortableLink[] = [];
  const children: PortableSpan[] = [];
  let spanIndex = 0;
  let linkIndex = 0;
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      const before = parseDecorators(
        text.slice(lastIndex, index),
        `${keyPrefix}-s${spanIndex}`,
      );
      children.push(...before);
      spanIndex += before.length;
    }

    const linkKey = `${keyPrefix}-l${linkIndex}`;
    linkIndex += 1;
    markDefs.push({
      _type: 'link',
      _key: linkKey,
      href: match[2],
    });

    const linkText = match[1] ?? '';
    const inner = parseDecorators(linkText, `${keyPrefix}-s${spanIndex}`);
    for (const child of inner) {
      children.push({
        ...child,
        marks: [...child.marks, linkKey],
      });
    }
    spanIndex += inner.length;
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length || (children.length === 0 && markDefs.length === 0)) {
    const rest = parseDecorators(text.slice(lastIndex), `${keyPrefix}-s${spanIndex}`);
    children.push(...rest);
  }

  return { children, markDefs };
}

/**
 * Convert editorial copy into Sanity portable text.
 * Blank lines separate blocks. A paragraph wrapped in *asterisks*
 * becomes an italic lead. Inline *italic*, **bold**, and [links](/path) work.
 */
export function markdownToBlocks(slug: string, markdown: string): PortableBlock[] {
  const paragraphs = markdown
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, ' ').trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => {
    const keyPrefix = `${slug}-b${index}`;
    const lead = paragraph.match(LEAD_BLOCK);

    if (lead) {
      const { children, markDefs } = parseInline(lead[1], keyPrefix);
      return {
        _type: 'block',
        _key: keyPrefix,
        style: 'lead',
        markDefs,
        children,
      };
    }

    const { children, markDefs } = parseInline(paragraph, keyPrefix);
    return {
      _type: 'block',
      _key: keyPrefix,
      style: 'normal',
      markDefs,
      children,
    };
  });
}
