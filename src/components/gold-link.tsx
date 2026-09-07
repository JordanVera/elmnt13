import Link from "next/link";
import { cn } from "@/lib/cn";

type GoldLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
};

export function GoldLink({ href, children, className, inverted }: GoldLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase",
        inverted ? "text-gold" : "text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "h-px w-8 origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-150",
          inverted ? "bg-gold" : "bg-ink",
        )}
      />
    </Link>
  );
}
