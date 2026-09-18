export type BrandLogo = {
  name: string;
  src: string;
  /** Intrinsic width of the artwork (PNGs are trimmed to their visible bounds). */
  width: number;
  /** Intrinsic height of the artwork (PNGs are trimmed to their visible bounds). */
  height: number;
  /** Optional manual nudge on top of the automatic equal-area sizing. */
  scale?: number;
};

function logo(
  name: string,
  src: string,
  width: number,
  height: number,
  scale?: number,
): BrandLogo {
  return scale
    ? { name, src, width, height, scale }
    : { name, src, width, height };
}

export const featuredBrandLogos: BrandLogo[] = [
  logo('Nike', '/brands/nike.svg', 240, 94),
  logo('NFL', '/brands/nfl.png', 1638, 2182),
  logo('Target', '/brands/target.png', 107, 146),
  logo("McDonald's", '/brands/mcdonalds.png', 600, 480),
  logo('Toyota', '/brands/toyota.svg', 251, 42),
  logo('T-Mobile', '/brands/tmobile.png', 930, 195),
  logo('Verizon', '/brands/verizon.png', 364, 80),
  logo('Uber', '/brands/uber.png', 1536, 533),
  logo('MLB', '/brands/mlb.png', 576, 292),
  logo('Forbes', '/brands/forbes.png', 996, 250),
  logo('ESSENCE', '/brands/essence.png', 576, 118),
  logo('VH1', '/brands/vh1.png', 358, 141),
  logo('Mountain Dew', '/brands/mountain-dew.png', 601, 415),
  logo("Raising Cane's", '/brands/raising-canes.png', 1898, 914),
  logo('Jordan', '/brands/jordan.png', 120, 112),
  logo('Kroger', '/brands/kroger.png', 562, 444),
];

export const brandCategories = [
  {
    id: 'personal',
    label: 'Personal Brands',
    logos: [
      logo('Mookie Betts', '/brands/mookie-betts.png', 640, 126),
      logo('Wyatt McClure', '/brands/wyatt-mcclure.png', 583, 256),
      logo("Shaunie O'Neal", '/brands/shaunie-oneal.png', 554, 242),
      logo('Christian Kirksey', '/brands/christian-kirksey.png', 638, 133),
      logo('Bobby Wagner', '/brands/bobby-wagner.png', 289, 77),
      logo('Steph Floss', '/brands/steph-floss.png', 363, 364),
      logo('Karen Civil', '/brands/karen-civil.png', 495, 429),
      logo('DJ Meel', '/brands/dj-meel.png', 431, 423),
      logo('Rob Hill Sr.', '/brands/rob-hill-sr.png', 274, 62),
      logo('Meechie DeFranco', '/brands/meechie-defranco.png', 522, 45),
      logo('Tiphani Montgomery', '/brands/tiphani-montgomery.png', 229, 103),
      logo('Jeff Johnson', '/brands/jeff-johnson.png', 208, 175),
      logo('J. Bolin', '/brands/j-bolin.png', 279, 99),
      logo('Shedeur Sanders', '/brands/shedeur-sanders.png', 999, 309),
    ],
  },
  {
    id: 'brands',
    label: 'Brands',
    logos: [
      logo('Jordan Brand', '/brands/jordan.png', 120, 112),
      logo('BODYARMOR', '/brands/bodyarmor.png', 1000, 147),
      logo('Beats by Dre', '/brands/beats-by-dre.png', 800, 800),
      logo('Kroger', '/brands/kroger.png', 562, 444),
      logo('Martell', '/brands/martell.png', 670, 465),
      logo('T-Mobile', '/brands/tmobile.png', 930, 195),
      logo('Seattle Seahawks', '/brands/seattle-seahawks.png', 886, 356),
      logo('Xhibition', '/brands/xhibition.png', 278, 40),
      logo('Avión Tequila', '/brands/avion-tequila.png', 2000, 1514),
      logo('Cleveland Cavaliers', '/brands/cleveland-cavaliers.png', 84, 121),
      logo('Reebok', '/brands/reebok.png', 223, 124),
      logo('Verizon', '/brands/verizon.png', 364, 80),
      logo('Foot Locker', '/brands/foot-locker.svg', 1048, 214),
      logo('Target', '/brands/target.png', 107, 146),
      logo('Main Event Entertainment', '/brands/main-event.png', 535, 133),
      logo('Nike', '/brands/nike.svg', 240, 94),
      logo('Cleveland Guardians', '/brands/cleveland-guardians.png', 1679, 2387),
      logo('Hennessy', '/brands/hennessy.svg', 185, 108),
      logo('Puma', '/brands/puma.png', 800, 398),
      logo("McDonald's", '/brands/mcdonalds.png', 600, 480),
      logo('Barclays Center', '/brands/barclays-center.png', 982, 478),
      logo('Cedar Point', '/brands/cedar-point.png', 556, 83),
      logo('Cleveland Browns', '/brands/cleveland-browns.png', 83, 94),
      logo('UNKNWN', '/brands/unknwn.png', 171, 97),
      logo('DTLR / Villa', '/brands/dtlr-villa.png', 593, 62),
      logo("D'Ussé", '/brands/dusse.png', 383, 84),
      logo("Raising Cane's", '/brands/raising-canes.png', 1898, 914),
      logo('K-Swiss', '/brands/k-swiss.png', 567, 157),
      logo('New Balance', '/brands/new-balance.svg', 24, 24),
      logo('Mountain Dew', '/brands/mountain-dew.png', 601, 415),
      logo('Under Armour', '/brands/under-armour.png', 800, 52),
      logo('Toyota', '/brands/toyota.svg', 251, 42),
      logo('Uber', '/brands/uber.png', 1536, 533),
      logo('Luc Belaire', '/brands/luc-belaire.svg', 542, 284),
      logo('Zoom', '/brands/zoom.svg', 24, 24),
      logo('A3C', '/brands/a3c.png', 267, 169),
      logo('McKinsey & Company', '/brands/mckinsey.png', 800, 249),
      logo('Los Angeles Dodgers', '/brands/dodgers.png', 2169, 1224),
    ],
  },
  {
    id: 'media',
    label: 'Media + Entertainment',
    logos: [
      logo('Forbes', '/brands/forbes.png', 996, 250),
      logo('The FADER', '/brands/the-fader.png', 298, 90),
      logo('Complex', '/brands/complex.png', 443, 114),
      logo('VH1', '/brands/vh1.png', 358, 141),
      logo('REVOLT', '/brands/revolt.png', 387, 98),
      logo('BET', '/brands/bet.png', 1000, 318),
      logo('Shade 45', '/brands/shade-45.png', 2000, 302),
      logo('Blavity Inc.', '/brands/blavity.png', 375, 62),
      logo('ESSENCE', '/brands/essence.png', 576, 118),
      logo('Radio One', '/brands/radio-one.png', 136, 40),
      logo('iHeartRadio', '/brands/i-heart.png', 3000, 356),
      logo('TEDx', '/brands/tedx.png', 548, 162),
    ],
  },
  {
    id: 'organizations',
    label: 'Organizations',
    logos: [
      logo('Obama–Biden Campaign', '/brands/obama-biden.png', 272, 310),
      logo(
        'Boys & Girls Clubs of America',
        '/brands/boys-girls-club.png',
        660,
        378,
      ),
      logo('City Year', '/brands/city-year.png', 197, 197),
      logo('YMCA', '/brands/ymca.png', 868, 664),
      logo(
        'Greater Cleveland Sports Commission',
        '/brands/greater-cleveland-sports-commission.png',
        310,
        163,
      ),
      logo('The City Mission', '/brands/the-city-mission.png', 525, 148),
      logo('United Way', '/brands/united-way.png', 3772, 1641),
      logo('The Lighthouse Church', '/brands/tlhc.png', 640, 84),
      logo('The Word Church', '/brands/the-word-church.png', 913, 844),
    ],
  },
] as const;
