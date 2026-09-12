"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const REVEAL_DURATION = 0.9;
export const REVEAL_OFFSET = 28;

const viewport = { once: true, amount: 0.18, margin: "0px 0px -8% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds */
  delay?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: REVEAL_OFFSET }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewport, once }}
      transition={{
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
