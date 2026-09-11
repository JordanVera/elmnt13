export type WeddingService = {
  title: string;
  kicker: string;
  description: string;
  details: readonly string[];
};

export const weddingServices: readonly WeddingService[] = [
  {
    title: 'Proposals',
    kicker: 'The beginning',
    description:
      'The beginning of forever deserves its own moment. We thoughtfully plan and design a proposal that feels personal, intentional and true to your love story.',
    details: ['Planning', 'Design', 'Execution'],
  },
  {
    title: 'Full-Service Wedding Planning',
    kicker: 'From Yes to I do',
    description:
      "Your wedding day is one of the moments you'll remember forever. We thoughtfully plan and manage every detail, taking your vision further while allowing you to be fully present and enjoy every moment.",
    details: ['Ceremony', 'Cocktail Hour', 'Reception'],
  },
  {
    title: 'Wedding Design',
    kicker: 'A Setting that reflects you',
    description:
      'Your love story deserves a setting that reflects you. We translate your vision into a thoughtfully designed wedding, bringing every visual element together to create a setting that feels personal, intentional and distinctly yours.',
    details: ['Creative Direction', 'Decor', 'Styling'],
  },
  {
    title: 'Wedding Celebrations',
    kicker: 'Every chapter',
    description:
      'There are so many moments worth celebrating before you say “I do.” We thoughtfully plan, design and execute every celebration before the aisle, making each chapter a memorable part of your love story.',
    details: [
      'Engagement Parties',
      'Bridal Showers',
      'Bachelor & Bachelorette Parties',
    ],
  },
  {
    title: 'Wedding Weekend Experiences',
    kicker: 'More than a day',
    description:
      'The celebration doesn’t have to begin and end with the wedding day. We curate experiences throughout the weekend that give you and your guests more opportunities to celebrate, connect and enjoy every moment together.',
    details: [
      'Welcome Parties',
      'Day Parties',
      'Yacht Experiences',
      'After Parties',
      'Farewell Events',
    ],
  },
  {
    title: 'Destination Weddings',
    kicker: 'Love travels',
    description:
      'Planning a wedding away from home comes with its own set of details. From finding the perfect destination to coordinating travel logistics, we thoughtfully plan, design and manage every element of your wedding, ensuring your vision travels with you and your celebration feels seamless wherever you choose to say “I do.”',
    details: [
      'Destination Sourcing',
      'Travel Logistics',
      'Multi-Day Planning',
    ],
  },
];
