import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { BrandLogo as BrandLogoData } from '@/lib/brands';

export function BrandLogo({
  brand,
  className = 'h-full w-auto max-w-full object-contain object-center grayscale mix-blend-multiply',
}: {
  brand: BrandLogoData;
  className?: string;
}) {
  const scale = 'scale' in brand && brand.scale ? brand.scale : 1;

  return (
    <span
      className="flex h-[calc(3.25rem*var(--logo-scale))] w-full items-center justify-center md:h-[calc(3.75rem*var(--logo-scale))]"
      style={{ '--logo-scale': scale } as CSSProperties}
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
