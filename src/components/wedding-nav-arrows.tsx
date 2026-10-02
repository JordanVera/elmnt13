import { cn } from '@/lib/cn';

export function WeddingArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn('size-6 md:size-7', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 3.5L5.5 8 10 12.5" />
    </svg>
  );
}

export function WeddingArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn('size-6 md:size-7', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 3.5L10.5 8 6 12.5" />
    </svg>
  );
}

export const weddingNavArrowButtonClass = cn(
  'flex cursor-pointer items-center justify-center text-gold transition-colors hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-30',
);

export const weddingNavArrowPosition = {
  prev: 'left-4 md:left-8',
  next: 'right-4 md:right-8',
} as const;
