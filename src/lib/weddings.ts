export type WeddingService = {
  title: string;
  kicker: string;
  description: string;
  details: readonly string[];
};

export const weddingServices: readonly WeddingService[] = [
  {
    title: 'Proposals',
    kicker: 'She said yes',
    description:
      'The beginning of forever deserves a moment of its own. We bring your proposal to life by transforming your vision and story into an unforgettable experience.',
    details: ['Planning', 'Design', 'Execution'],
  },
  {
    title: 'Pre-Wedding Celebrations',
    kicker: 'Before the aisle',
    description:
      'There’s so much to celebrate leading up to “I do.” We plan, design and execute each occasion, making every chapter a memorable part of your love story.',
    details: ['Engagement Party', 'Bridal Shower', 'Bachelor(ette) Party'],
  },
  {
    title: 'Wedding Design',
    kicker: 'A setting that reflects you',
    description:
      'Your wedding should be as beautiful as the love it celebrates. We bring your style and ideas together to create a setting that looks and feels like everything you’ve dreamed of.',
    details: ['Creative Direction', 'Decor & Design', 'Styling'],
  },
  {
    title: 'Full-Service Wedding Planning',
    kicker: 'From Yes to I Do',
    description:
      'There’s so much to look forward to between “yes” and “I do.” From the first decision to the final send-off, we’re by your side making sure it all comes together beautifully.',
    details: ['Planning', 'Coordination', 'Execution'],
  },
  {
    title: 'Wedding Weekends',
    kicker: 'More than a day',
    description:
      'One day doesn’t always feel like enough. We extend the celebration beyond the wedding day, creating more time to gather, celebrate and make memories with the people you love.',
    details: [
      'Welcome Event',
      'Day Party',
      'Yacht Experience',
      'After Party',
      'Farewell Event',
    ],
  },
  {
    title: 'Destination Weddings',
    kicker: 'Wherever love takes you',
    description:
      'A celebration shouldn’t feel complicated because it takes you miles away. We make celebrating from afar feel effortless, so you can enjoy your wedding journey just as much as the destination you desire.',
    details: ['Planning', 'Logistics', 'Multi-Day Experience'],
  },
];
