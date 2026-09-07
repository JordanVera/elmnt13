import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center text-paper">
      <p className="text-[11px] tracking-[0.36em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl uppercase">Lost the vision.</h1>
      <Link href="/" className="mt-8 text-[11px] tracking-[0.32em] text-gold uppercase">
        Back home
      </Link>
    </main>
  );
}
