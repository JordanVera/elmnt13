import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { BrandLogo as BrandLogoData } from '@/lib/brands';

export const brandLogoImageClassName =
  'h-full w-full object-contain object-center grayscale mix-blend-multiply';

const logoFrameClassName = {
  grid: 'h-12 w-full md:h-14',
  marquee: 'h-8 w-28 md:h-9 md:w-32',
} as const;

export function BrandLogo({
  brand,
  size = 'grid',
  className = brandLogoImageClassName,
}: {
  brand: BrandLogoData;
  size?: keyof typeof logoFrameClassName;
  className?: string;
}) {
  const scale = brand.scale ?? 1;

  return (
    <span
      title={brand.name}
      className={`flex shrink-0 items-center justify-center ${logoFrameClassName[size]}`}
    >
      <Image
        src={brand.src}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        unoptimized={brand.src.endsWith('.svg')}
        className={className}
        style={
          scale !== 1
            ? ({ transform: `scale(${scale})` } as CSSProperties)
            : undefined
        }
      />
    </span>
  );
}
