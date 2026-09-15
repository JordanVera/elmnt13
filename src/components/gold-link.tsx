import Link from 'next/link';
import { cn } from '@/lib/cn';

type GoldLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
};

export function GoldLink({
  href,
  children,
  className,
  inverted,
}: GoldLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase transition-colors duration-500',
        inverted
          ? 'text-gold hover:text-gold-bright'
          : 'text-ink hover:text-gold',
        className,
      )}
    >
      <span>{children}</span>
      <span className="h-px w-8 origin-left scale-x-100 bg-current transition-transform duration-500 group-hover:scale-x-150" />
    </Link>
  );
}
