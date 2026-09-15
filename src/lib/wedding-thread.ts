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

/** Smooth cubic spline through waypoints (Catmull–Rom → Bézier). */
function smoothPath(points: Point[], tension = 0.92) {
  if (points.length < 2) return '';

  const pad = [points[0], ...points, points[points.length - 1]!];
  let d = `M ${n(points[0]!.x)} ${n(points[0]!.y)}`;
  const t = tension / 6;

  for (let i = 1; i < pad.length - 2; i++) {
    const p0 = pad[i - 1]!;
    const p1 = pad[i]!;
    const p2 = pad[i + 1]!;
    const p3 = pad[i + 2]!;

    d += cubic(
      p1.x + (p2.x - p0.x) * t,
      p1.y + (p2.y - p0.y) * t,
      p2.x - (p3.x - p1.x) * t,
      p2.y - (p3.y - p1.y) * t,
      p2.x,
      p2.y,
    );
  }

  return d;
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
  if (side === 'left') return width * (compact ? 0.28 : 0.22);
  if (side === 'right') return width * (compact ? 0.72 : 0.78);
  return width * 0.5;
}

function flowWaypoints(
  width: number,
  height: number,
  knotX: number,
  knotY: number,
  compact: boolean,
): Point[] {
  const startY = Math.min(height * 0.06, 88);
  const left = width * (compact ? 0.27 : 0.23);
  const right = width * (compact ? 0.73 : 0.77);
  const center = width * 0.5;
  const bowSize = compact ? 38 : 52;

  return [
    { x: center, y: startY },
    { x: left, y: height * 0.12 },
    { x: right, y: height * 0.22 },
    { x: left, y: height * 0.33 },
    { x: right, y: height * 0.44 },
    { x: left, y: height * 0.55 },
    { x: right, y: height * 0.66 },
    { x: left, y: height * 0.76 },
    { x: (left + knotX) / 2, y: knotY - bowSize * 1.05 },
    { x: knotX, y: knotY - bowSize * 0.35 },
    { x: knotX, y: knotY },
  ];
}

export function buildWeddingThread(
  width: number,
  height: number,
  knots: Array<Pick<KnotPlan, 'kind' | 'side' | 'y' | 'word'>>,
  compact: boolean,
): ThreadPlan | null {
  if (width < 40 || height < 200 || knots.length === 0) return null;

  const knotInput = knots[knots.length - 1]!;
  const knotX = sideX(knotInput.side, width, compact);
  const knotY = knotInput.y;
  const bowSize = compact ? 38 : 52;

  const flow = smoothPath(
    flowWaypoints(width, height, knotX, knotY, compact),
    0.95,
  );
  const bow = bowKnot(knotX, knotY, bowSize);
  const d = `${flow}${bow.d}`;

  const fullLength = measure(d);
  if (fullLength <= 0) return null;

  const beforeBow = measure(flow);

  return {
    d,
    width,
    height,
    length: fullLength,
    knots: [
      {
        kind: knotInput.kind,
        side: knotInput.side,
        x: knotX,
        y: knotY,
        size: bowSize,
        word: knotInput.word,
        tiedAt: Math.min(
          0.992,
          (beforeBow + (fullLength - beforeBow) * 0.35) / fullLength,
        ),
      },
    ],
  };
}
