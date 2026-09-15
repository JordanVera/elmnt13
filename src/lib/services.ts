export type ServiceOption = {
  name: string;
  description: string;
  href?: string;
};

export type ServiceCategory = {
  id: 'experiential' | 'events';
  title: string;
  short: string;
  description: string;
  stageTitle: string;
  stageItems: Array<{ label: string; href?: string; suffix?: string }>;
  image: string;
  imageAlt: string;
  options: ServiceOption[];
};

export type ServiceOffering = ServiceOption & {
  categoryId: ServiceCategory['id'];
  categoryTitle: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'experiential',
    title: 'Experiential Marketing',
    short: 'Connect with your audience, differently',
    description:
      'We create intentional experiences designed around the brand, the audience and the objective. From concept through execution, we shape how the brand shows up, how audiences engage with it and how the experience drives meaningful, measurable results.',
    stageTitle: 'Experiences',
    image: '/work/k-swiss-x-karen-civil/K-Swiss_ST_20131-scaled.jpg',
    imageAlt: 'K-Swiss brand activation produced by ELMNT13',
    stageItems: [
      { label: 'Pop Ups' },
      { label: 'Retail Experiences' },
      { label: 'Product Launches' },
      { label: 'Campaigns' },
      { label: 'Sponsorship Activations' },
      { label: 'Community Engagement & More' },
    ],
    options: [
      {
        name: 'Brand Activations',
        description:
          'Connecting brands, campaigns and initiatives with audiences through intentional experiences designed to drive engagement and strengthen brand relationships.',
      },
      {
        name: 'Experiential Strategy',
        description:
          'Defining the goals, audience, messaging and desired outcomes that shape the direction and vision of an experiential campaign or initiative.',
      },
      {
        name: 'Concept Development',
        description:
          'Developing experiential ideas and concepts that turn strategy into opportunities for audience engagement.',
      },
      {
        name: 'Experiential Design',
        description:
          'Establishing the creative direction, visual approach and brand elements that shape how the concept looks, feels and comes to life.',
      },
      {
        name: 'Production & Execution',
        description:
          'Coordinating the production, vendors and logistics required to execute the developed strategy, approved concept and experiential design.',
      },
    ],
  },
  {
    id: 'events',
    title: 'Event Management',
    short: 'Curate an experience worth remembering',
    description:
      'From the initial concept through execution, we thoughtfully manage every element, ensuring each detail reflects the vision, brand and intended guest experience.',
    stageTitle: 'Events',
    image: '/work/8th-annual-live-civil-brunch/MG_3398-1-scaled.jpeg',
    imageAlt: 'Live Civil Brunch event produced by ELMNT13',
    stageItems: [
      { label: 'Corporate' },
      { label: 'Conferences & Meetings' },
      { label: 'Awards & Recognition' },
      { label: 'Church & Ministry' },
      { label: 'Nonprofit & Community' },
      { label: 'Social & Milestone' },
      { label: 'Weddings', href: '/weddings', suffix: ' & More' },
    ],
    options: [
      {
        name: 'Concept & Creative Direction',
        description:
          'Developing the concept and creative vision that shape the overall look, feel and direction of the event.',
      },
      {
        name: 'Event Design',
        description:
          'Creating the physical environment, visual elements and intentional details that carry the creative vision and brand throughout the event.',
      },
      {
        name: 'Planning & Coordination',
        description:
          'Planning and coordinating timelines, vendors, event elements and logistics to ensure every detail is organized and on track leading up to the event.',
      },
      {
        name: 'Event Setup & Execution',
        description:
          'Managing the physical setup and installation of event elements to execute the approved event design and create the intended attendee experience.',
      },
      {
        name: 'On-Site Event Management',
        description:
          'Managing the event in real time to ensure timelines, vendors, staff and event elements remain coordinated and the event runs seamlessly from start to finish.',
      },
    ],
  },
];

export const serviceOfferings: ServiceOffering[] = serviceCategories.flatMap(
  (category) =>
    category.options.map((option) => ({
      ...option,
      categoryId: category.id,
      categoryTitle: category.title,
    })),
);

export const serviceApproach = [
  {
    number: '01',
    title: 'Vision',
    body: 'After we understand the goals, audience and constraints, we shape a strategy that holds the full experience in view — so every later decision has somewhere to land.',
  },
  {
    number: '02',
    title: 'Design',
    body: 'We develop the concept, creative direction and the details that carry the brand through every touchpoint, then refine until the idea is ready to be built.',
  },
  {
    number: '03',
    title: 'Delivery',
    body: 'We coordinate production, vendors and on-site management so the approved vision is executed with precision — from first install to last light.',
  },
] as const;

export const inquiryServices = {
  'Experiential Marketing': [
    'Brand Activations',
    'Experiential Strategy',
    'Concept Development',
    'Experiential Design',
    'Production & Execution',
  ],
  'Event Management': [
    'Concept & Creative Direction',
    'Event Design',
    'Planning & Coordination',
    'Event Setup & Execution',
    'On-Site Event Management',
  ],
  Wedding: [
    'Proposals',
    'Full-Service Wedding Planning',
    'Wedding Design',
    'Wedding Celebrations',
    'Wedding Weekend Experiences',
  ],
} as const;
