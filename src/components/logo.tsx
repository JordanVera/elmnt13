import Link from 'next/link';
import { cn } from '@/lib/cn';

type LogoProps = {
  href?: string;
  className?: string;
  variant?: 'main' | 'weddings' | 'mark';
  inverted?: boolean;
};

export function Logo({
  href = '/',
  className,
  variant = 'main',
  inverted = false,
}: LogoProps) {
  const color = inverted ? 'text-paper' : 'text-gold';

  const wordmark =
    variant === 'mark' ? (
      <span className={cn('font-display text-sm tracking-[0.28em]', color)}>
        E13
      </span>
    ) : variant === 'weddings' ? (
      <span className={cn('flex flex-col leading-none', color)}>
        <span className="font-display text-[11px] tracking-[0.42em]">
          ELMNT13
        </span>
        <span className="font-serif text-xl italic tracking-[0.12em]">
          Weddings
        </span>
      </span>
    ) : (
      <img
        src="/logo.png"
        alt="ELMNT13"
        className={cn('h-8 w-auto', color)}
        // style={{ filter: inverted ? 'invert(1)' : 'none' }}
      />
    );

  if (!href) {
    return <span className={className}>{wordmark}</span>;
  }

  return (
    <Link
      href={href}
      className={cn('inline-flex', className)}
      aria-label="ELMNT13 home"
    >
      {wordmark}
    </Link>
  );
}
