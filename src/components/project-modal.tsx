'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

export function ProjectModal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : EASE;

  const close = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return (
    <motion.div
      ref={overlayRef}
      role="presentation"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
      onClick={(event) => {
        if (event.target === overlayRef.current) close();
      }}
      className="fixed inset-0 z-90 flex items-stretch justify-center bg-ink/55 p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={transition}
        className="relative h-full w-full overflow-y-auto bg-white shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/85 text-ink transition-colors hover:bg-white md:top-6 md:right-6"
        >
          <CloseIcon />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function CloseIcon() {
  return (
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
  );
}
