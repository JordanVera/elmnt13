import { HomeAbout } from '@/components/home-about';
import { HomeHero } from '@/components/home-hero';
import { HomeServices } from '@/components/home-services';
import { ContactCta } from '@/components/contact-cta';
import { LogoMarquee } from '@/components/logo-marquee';
import { WorkCarousel } from '@/components/work-carousel';

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      {/* <HomeAbout /> */}
      <LogoMarquee />
      <HomeServices />
      <WorkCarousel />
      <ContactCta />
    </main>
  );
}
