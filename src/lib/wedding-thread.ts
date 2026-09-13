export type KnotKind = 'bow' | 'infinity' | 'cinch';
export type KnotSide = 'left' | 'right' | 'center';

export type Point = { x: number; y: number };

export type KnotPlan = {
  kind: KnotKind;
  side: KnotSide;
  x: number;
  y: number;
  size: number;
  word: string;
};

export type ThreadPlan = {
  d: string;
  width: number;
  height: number;
  knots: Array<KnotPlan & { tiedAt: number }>;
  length: number;
};

const KAPPA = 0.5522847498;

function n(value: number) {
  return value.toFixed(1);
}

function cubic(
  c1x: number,
  c1y: number,
  c2x: number,
  c2y: number,
  x: number,
  y: number,
) {
  return `C ${n(c1x)} ${n(c1y)} ${n(c2x)} ${n(c2y)} ${n(x)} ${n(y)}`;
}

function measure(d: string) {
  if (typeof document === 'undefined') return 0;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  return path.getTotalLength();
}

function sCurve(from: Point, to: Point, amp: number) {
  const mid = {
    x: (from.x + to.x) / 2 + amp,
    y: (from.y + to.y) / 2,
  };
  const rise1 = mid.y - from.y;
  const rise2 = to.y - mid.y;

  return (
    cubic(
      from.x + amp * 0.85,
      from.y + rise1 * 0.28,
      mid.x - amp * 0.35,
      mid.y - rise1 * 0.22,
      mid.x,
      mid.y,
    ) +
    cubic(
      mid.x + amp * 0.35,
      mid.y + rise2 * 0.22,
      to.x - amp * 0.85,
      to.y - rise2 * 0.28,
      to.x,
      to.y,
    )
  );
}

function circularLoop(cx: number, cy: number, r: number, wind: 1 | -1) {
  const k = r * KAPPA;
  const top = { x: cx, y: cy - r };
  const side = { x: cx + wind * r, y: cy };
  const bottom = { x: cx, y: cy + r };
  const other = { x: cx - wind * r, y: cy };

  return {
    d: [
      cubic(top.x + wind * k, top.y, side.x, side.y - k, side.x, side.y),
      cubic(side.x, side.y + k, bottom.x + wind * k, bottom.y, bottom.x, bottom.y),
      cubic(bottom.x - wind * k, bottom.y, other.x, other.y + k, other.x, other.y),
      cubic(other.x, other.y - k, top.x - wind * k, top.y, top.x, top.y),
      cubic(
        top.x + wind * k * 0.35,
        top.y + r * 0.55,
        cx + wind * r * 0.12,
        cy + r * 0.7,
        cx,
        cy + r * 1.15,
      ),
    ].join(''),
    entry: top,
    exit: { x: cx, y: cy + r * 1.15 },
  };
}

function bowKnot(cx: number, cy: number, s: number) {
  const d = [
    cubic(
      cx - s * 0.12,
      cy - s * 0.72,
      cx - s * 1.28,
      cy - s * 1.02,
      cx - s * 1.32,
      cy - s * 0.22,
    ),
    cubic(
      cx - s * 1.36,
      cy + s * 0.58,
      cx - s * 0.28,
      cy + s * 0.42,
      cx,
      cy + s * 0.02,
    ),
    cubic(
      cx + s * 0.28,
      cy - s * 0.42,
      cx + s * 1.36,
      cy - s * 0.58,
      cx + s * 1.32,
      cy + s * 0.22,
    ),
    cubic(
      cx + s * 1.28,
      cy + s * 1.02,
      cx + s * 0.12,
      cy + s * 0.72,
      cx + s * 0.04,
      cy + s * 0.1,
    ),
    cubic(
      cx - s * 0.46,
      cy - s * 0.04,
      cx - s * 0.4,
      cy + s * 0.46,
      cx,
      cy + s * 0.32,
    ),
    cubic(
      cx + s * 0.4,
      cy + s * 0.18,
      cx + s * 0.22,
      cy - s * 0.16,
      cx,
      cy + s * 0.14,
    ),
    cubic(
      cx - s * 0.1,
      cy + s * 0.62,
      cx + s * 0.08,
      cy + s * 0.98,
      cx,
      cy + s * 1.22,
    ),
  ].join('');

  return { d, end: { x: cx, y: cy + s * 1.22 } };
}

export function sideX(side: KnotSide, width: number, compact: boolean) {
  const inset = compact ? 0.28 : 0.5;
  if (side === 'left') return width * (compact ? 0.28 : 0.22);
  if (side === 'right') return width * (compact ? 0.72 : 0.78);
  return width * inset;
}

export function buildWeddingThread(
  width: number,
  height: number,
  knots: Array<Pick<KnotPlan, 'kind' | 'side' | 'y' | 'word'>>,
  compact: boolean,
): ThreadPlan | null {
  if (width < 40 || height < 200) return null;

  const knotInput = knots[knots.length - 1];
  const size = compact ? 32 : 46;
  const knot = {
    kind: knotInput?.kind ?? 'bow',
    side: knotInput?.side ?? 'center',
    word: knotInput?.word ?? 'forever',
    x: knotInput ? sideX(knotInput.side, width, compact) : width * 0.5,
    y: Math.min(
      Math.max(knotInput?.y ?? height * 0.9, height * 0.72),
      height - size * 2.4,
    ),
    size,
    tiedAt: 0,
  };

  const start = { x: width * 0.5, y: Math.min(height * 0.06, 88) };
  const left = width * (compact ? 0.3 : 0.26);
  const right = width * (compact ? 0.7 : 0.74);
  const loopR = Math.min(compact ? 48 : 78, width * 0.1);
  const loop1 = { x: left, y: height * 0.26 };
  const loop2 = { x: right, y: height * 0.56 };
  const wave = width * (compact ? 0.16 : 0.2);

  const first = circularLoop(loop1.x, loop1.y, loopR, -1);
  const second = circularLoop(loop2.x, loop2.y, loopR, 1);
  const bow = bowKnot(knot.x, knot.y, size);

  const approach = sCurve(start, first.entry, -wave * 0.65);
  const bridge = sCurve(first.exit, second.entry, wave);
  const finish = sCurve(second.exit, { x: knot.x, y: knot.y }, -wave * 0.55);

  const d = `M ${n(start.x)} ${n(start.y)}${approach}${first.d}${bridge}${second.d}${finish}${bow.d}`;
  const fullLength = measure(d);
  if (fullLength <= 0) return null;

  const beforeBow = measure(
    `M ${n(start.x)} ${n(start.y)}${approach}${first.d}${bridge}${second.d}${finish}`,
  );

  return {
    d,
    width,
    height,
    length: fullLength,
    knots: [
      {
        ...knot,
        tiedAt: Math.min(0.985, (beforeBow + (fullLength - beforeBow) * 0.4) / fullLength),
      },
    ],
  };
}
