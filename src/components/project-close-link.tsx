import Link from 'next/link';

export function ProjectCloseLink() {
  return (
    <Link
      href="/work"
      aria-label="Close and return to work"
      className="fixed top-3 left-3 z-50 flex size-9 items-center justify-center rounded-full bg-white/20 text-gold backdrop-blur-md transition-colors hover:bg-white/35 sm:top-4 sm:left-5"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
      </svg>
    </Link>
  );
}
