import type { Metadata } from 'next';
import { NotFoundPage } from '@/components/not-found-page';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'This page is off the itinerary. Return to ELMNT13 — creative marketing and event management since 2012.',
};

export default function NotFound() {
  return (
    <main>
      <NotFoundPage />
    </main>
  );
}
