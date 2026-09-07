export type Project = {
  slug: string;
  title: string;
  client: string;
  service: string;
  category: 'experiential' | 'events' | 'weddings';
  year: string;
  image: string;
  gallery: string[];
  description: string;
  featured?: boolean;
};

const img = (id: string, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80${extra}`;

export const projects: Project[] = [
  {
    slug: 'k-swiss-x-karen-civil',
    title: 'K-Swiss x Karen Civil',
    client: 'K-Swiss / Foot Locker',
    service: 'Campaign Activation',
    category: 'experiential',
    year: '2019',
    image: img('photo-1556906781-9a412961c28c'),
    gallery: [
      img('photo-1556906781-9a412961c28c'),
      img('photo-1460353581641-37baddab0fa2'),
      img('photo-1515886657613-9f3515b0c78f'),
    ],
    description:
      'On-site management for the We Are The West campaign, bringing West Coast brand builders into a live Foot Locker activation.',
    featured: true,
  },
  {
    slug: 'karen-civil-day-barclays',
    title: 'Karen Civil Day',
    client: 'Barclays Center',
    service: 'Community Activation',
    category: 'experiential',
    year: '2019',
    image: img('photo-1470229722913-7c0e2dbbafd3'),
    gallery: [
      img('photo-1470229722913-7c0e2dbbafd3'),
      img('photo-1501281668745-f7f57925c3b4'),
      img('photo-1429962714451-bb934ecdc4ec'),
    ],
    description:
      'A landmark celebration at Barclays Center — production, talent flow, and brand presence for a city-scale cultural moment.',
    featured: true,
  },
  {
    slug: 'training-with-canelo',
    title: 'Training With Canelo',
    client: 'Hennessy / Golden Boy',
    service: 'Experiential',
    category: 'experiential',
    year: '2018',
    image: img('photo-1549719386-74dfcbf7dbed'),
    gallery: [
      img('photo-1549719386-74dfcbf7dbed'),
      img('photo-1599058917212-d750089bc07e'),
      img('photo-1517836357463-d25dfeac3438'),
    ],
    description:
      'An exclusive training experience in partnership with Hennessy and Golden Boy Boxing — access, hospitality, and on-site coordination.',
    featured: true,
  },
  {
    slug: 'nfl-honors',
    title: 'NFL Honors',
    client: 'NFL',
    service: 'Corporate Event',
    category: 'events',
    year: '2020',
    image: img('photo-1461896836934-ffe607ba6851'),
    gallery: [
      img('photo-1461896836934-ffe607ba6851'),
      img('photo-1574629810360-7efbbe195018'),
      img('photo-1540575467063-178a50c2df87'),
    ],
    description:
      'Red-carpet logistics and talent support for NFL Man of the Year appearances at Honors.',
    featured: true,
  },
  {
    slug: 'iheart-whats-your-why',
    title: "What's Your Why?",
    client: 'iHeartRadio',
    service: 'Community Activation',
    category: 'experiential',
    year: '2019',
    image: img('photo-1503676260728-1c00da094a0b'),
    gallery: [
      img('photo-1503676260728-1c00da094a0b'),
      img('photo-1427504494785-3a9ca7044f45'),
      img('photo-1524178232363-1fb2b075b655'),
    ],
    description:
      'Surprise school visits produced with iHeartRadio — tightly timed, camera-ready, and built around community impact.',
  },
  {
    slug: 'tedx-bethesda',
    title: 'TEDxBethesda',
    client: 'TEDx',
    service: 'Conference',
    category: 'events',
    year: '2018',
    image: img('photo-1505373877841-8d25f7d46678'),
    gallery: [
      img('photo-1505373877841-8d25f7d46678'),
      img('photo-1475721027785-f74eccf877e2'),
      img('photo-1591115765373-5207764f72e7'),
    ],
    description:
      'Stage, speaker, and guest experience for a ideas-driven conference environment.',
  },
  {
    slug: 'hair-and-the-blog-awards',
    title: 'Hair & The Blog Awards',
    client: 'Hair & The Blog',
    service: 'Awards Event',
    category: 'events',
    year: '2021',
    image: img('photo-1511795409834-ef04bbd61622'),
    gallery: [
      img('photo-1511795409834-ef04bbd61622'),
      img('photo-1464366400600-7168b8af9bc3'),
      img('photo-1514525253161-7a46d19cd819'),
    ],
    description:
      'Full event production for an awards night — creative direction, run-of-show, and on-site management.',
  },
  {
    slug: 'shaunie-oneal-love-affair',
    title: 'Love Affair',
    client: "Shaunie O'Neal",
    service: 'Social Event',
    category: 'events',
    year: '2019',
    image: img('photo-1519671482677-4af276e153c0'),
    gallery: [
      img('photo-1519671482677-4af276e153c0'),
      img('photo-1414235077428-338989a2e8c0'),
      img('photo-1558618666-fcd25c85cd64'),
    ],
    description:
      'An intimate, high-touch celebration with hospitality, design, and talent coordination at the center.',
  },
  {
    slug: 'garden-vow',
    title: 'The Garden Vow',
    client: 'Private Client',
    service: 'Full-Service Wedding',
    category: 'weddings',
    year: '2024',
    image: img('photo-1519741497674-611481863552'),
    gallery: [
      img('photo-1519741497674-611481863552'),
      img('photo-1465495976277-4387d4b0b4c6'),
      img('photo-1520854221256-17451cc331bf'),
    ],
    description:
      'A garden ceremony and candlelit reception designed around quiet luxury and personal ritual.',
  },
  {
    slug: 'champagne-hour',
    title: 'Champagne Hour',
    client: 'Private Client',
    service: 'Wedding Design',
    category: 'weddings',
    year: '2025',
    image: img('photo-1519167758481-83f550bb49b3'),
    gallery: [
      img('photo-1519167758481-83f550bb49b3'),
      img('photo-1478146896981-b80fe45c8bbf'),
      img('photo-1519225421980-715cb0215aed'),
    ],
    description:
      'Tablescapes, lighting, and a toast moment composed as a single visual story.',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
export const weddingProjects = projects.filter(
  (project) => project.category === 'weddings',
);
