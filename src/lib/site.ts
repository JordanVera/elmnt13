export const site = {
  name: 'ELMNT13',
  tagline: 'We see the vision. We handle the details.',
  email: 'info@elmnt13.com',
  founded: 2012,
};

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  // { href: '/weddings', label: 'Weddings' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
] as const;

export const heroNavLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
] as const;

export const socialLinks = [
  { href: 'https://www.instagram.com/elmnt13/', label: 'Instagram' },
  { href: 'https://www.facebook.com/elmnt13llc', label: 'Facebook' },
  { href: 'https://www.tiktok.com/elmnt13', label: 'TikTok' },
  { href: 'https://www.youtube.com/elmnt13', label: 'YouTube' },
  { href: 'https://www.linkedin.com/company/elmnt13', label: 'LinkedIn' },
] as const;

export const stats = [
  { value: 14, suffix: '+', label: `Years`, label2: `in business` },
  { value: 500, suffix: '+', label: `Curated`, label2: `experiences` },
  { value: 100, suffix: '+', label: `Brands`, label2: `+ clients` },
  { value: 90, suffix: '%', label: `Repeat +`, label2: `referral business` },
] as const;
