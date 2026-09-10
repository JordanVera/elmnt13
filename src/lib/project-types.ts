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
