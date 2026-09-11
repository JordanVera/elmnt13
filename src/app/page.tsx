import { HomeAbout } from '@/components/home-about';
import { HomeHero } from '@/components/home-hero';
import { HomeServices } from '@/components/home-services';
import { ContactCta } from '@/components/contact-cta';
import { LogoMarquee } from '@/components/logo-marquee';
import { WorkCarousel } from '@/components/work-carousel';
import { getFeaturedProjects, getProjects } from '@/lib/projects';

export default async function HomePage() {
  const featured = await getFeaturedProjects();
  const slides = featured.length ? featured : (await getProjects()).slice(0, 4);

  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <LogoMarquee />
      <HomeServices />
      <WorkCarousel projects={slides} />
      <ContactCta kicker="Let's Make It Happen" />
    </main>
  );
}
