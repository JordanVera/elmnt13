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
  markDefs: [];
  children: PortableSpan[];
};

const INLINE_MARK = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
const LEAD_BLOCK = /^\*([^*]+)\*$/;

function parseInline(text: string, keyPrefix: string): PortableSpan[] {
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

/**
 * Convert editorial copy into Sanity portable text.
 * Blank lines separate blocks. A paragraph wrapped in *asterisks*
 * becomes an italic lead. Inline *italic* and **bold** also work.
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
      return {
        _type: 'block',
        _key: keyPrefix,
        style: 'lead',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: `${keyPrefix}-s0`,
            text: lead[1],
            marks: [],
          },
        ],
      };
    }

    return {
      _type: 'block',
      _key: keyPrefix,
      style: 'normal',
      markDefs: [],
      children: parseInline(paragraph, keyPrefix),
    };
  });
}
