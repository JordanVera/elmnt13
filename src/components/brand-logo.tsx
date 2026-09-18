import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { BrandLogo as BrandLogoData } from '@/lib/brands';

export const brandLogoImageClassName =
  'h-full w-full object-contain object-center grayscale mix-blend-multiply';

type Frame = {
  /** Height a logo gets when its aspect ratio equals `refRatio`. */
  height: number;
  /** Hard cap on rendered width so ultra-wide wordmarks stay inside their cell. */
  maxWidth: number;
  /** Tall/square marks may exceed `height` by this factor before being capped. */
  tallCap: number;
  /** Wide wordmarks never drop below this fraction of `height` (unless width-capped). */
  minHeightRatio: number;
  refRatio: number;
};

type Preset = { base: Frame; md: Frame };

// Logos are sized so their rendered *area* stays roughly constant across
// aspect ratios (h ∝ sqrt(refRatio / ratio)), rather than sharing one fixed
// height. Otherwise square marks (Target, NFL) look huge next to wide
// wordmarks (Toyota, Under Armour) that get squeezed by the width cap.
const presets: Record<'grid' | 'marquee', Preset> = {
  grid: {
    base: { height: 50, maxWidth: 140, tallCap: 1.2, minHeightRatio: 0.42, refRatio: 1.8 },
    md: { height: 60, maxWidth: 190, tallCap: 1.2, minHeightRatio: 0.42, refRatio: 1.8 },
  },
  marquee: {
    base: { height: 32, maxWidth: 130, tallCap: 1.1, minHeightRatio: 0.45, refRatio: 1.8 },
    md: { height: 36, maxWidth: 150, tallCap: 1.1, minHeightRatio: 0.45, refRatio: 1.8 },
  },
};

function fit(brand: BrandLogoData, frame: Frame) {
  const ratio = brand.width / brand.height;
  const scale = brand.scale ?? 1;

  let height = frame.height * Math.sqrt(frame.refRatio / ratio) * scale;
  height = Math.min(height, frame.height * frame.tallCap);
  height = Math.max(height, frame.height * frame.minHeightRatio);

  let width = height * ratio;
  if (width > frame.maxWidth) {
    width = frame.maxWidth;
    height = width / ratio;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

export function BrandLogo({
  brand,
  size = 'grid',
  className = brandLogoImageClassName,
}: {
  brand: BrandLogoData;
  size?: keyof typeof presets;
  className?: string;
}) {
  const preset = presets[size];
  const base = fit(brand, preset.base);
  const md = fit(brand, preset.md);

  const style = {
    '--logo-w': `${base.width}px`,
    '--logo-h': `${base.height}px`,
    '--logo-w-md': `${md.width}px`,
    '--logo-h-md': `${md.height}px`,
  } as CSSProperties;

  return (
    <span
      title={brand.name}
      style={style}
      className="flex h-(--logo-h) w-(--logo-w) max-w-full shrink-0 items-center justify-center md:h-(--logo-h-md) md:w-(--logo-w-md)"
    >
      <Image
        src={brand.src}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        unoptimized={brand.src.endsWith('.svg')}
        className={className}
      />
    </span>
  );
}
