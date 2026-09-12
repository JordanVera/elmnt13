export type BrandLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
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
  logo('Nike', '/brands/nike.svg', 24, 9),
  logo('NFL', '/brands/nfl.svg', 134, 96),
  logo('Target', '/brands/target.png', 500, 500),
  logo("McDonald's", '/brands/mcdonalds.png', 800, 600),
  logo('Toyota', '/brands/toyota.svg', 251, 42),
  logo('T-Mobile', '/brands/tmobile.png', 1000, 447),
  logo('Verizon', '/brands/verizon.png', 399, 126),
  logo('Uber', '/brands/uber.png', 1536, 533),
  logo('MLB', '/brands/mlb.png', 576, 292),
  logo('Forbes', '/brands/forbes.png', 1000, 359),
  logo('ESSENCE', '/brands/essence.png', 626, 171),
  logo('VH1', '/brands/vh1.png', 358, 141),
  logo('Mountain Dew', '/brands/mountain-dew.svg', 281, 195),
  logo("Raising Cane's", '/brands/raising-canes.png', 151, 72),
  logo('Jordan', '/brands/jordan.png', 124, 124),
  logo('Kroger', '/brands/kroger.png', 562, 444),
];

export const brandCategories = [
  {
    id: 'personal',
    label: 'Personal Brands',
    logos: [
      logo('Mookie Betts', '/brands/mookie-betts.png', 640, 133),
      logo('Wyatt McClure', '/brands/wyatt-mcclure.png', 583, 256),
      logo("Shaunie O'Neal", '/brands/shaunie-oneal.png', 577, 251),
      logo('Christian Kirksey', '/brands/christian-kirksey.png', 640, 144),
      logo('Bobby Wagner', '/brands/bobby-wagner.png', 300, 94),
      logo('Steph Floss', '/brands/steph-floss.png', 363, 364),
      logo('Karen Civil', '/brands/karen-civil.png', 640, 640),
      logo('DJ Meel', '/brands/dj-meel.png', 431, 423),
      logo('Rob Hill Sr.', '/brands/rob-hill-sr.png', 299, 82),
      logo('Meechie DeFranco', '/brands/meechie-defranco.png', 526, 64),
      logo('Tiphani Montgomery', '/brands/tiphani-montgomery.png', 244, 123),
      logo('Jeff Johnson', '/brands/jeff-johnson.png', 210, 189),
      logo('J. Bolin', '/brands/j-bolin.png', 346, 136),
      logo('Shedeur Sanders', '/brands/shedeur-sanders.png', 1000, 562),
    ],
  },
  {
    id: 'brands',
    label: 'Brands',
    logos: [
      logo('Jordan Brand', '/brands/jordan.png', 124, 124),
      logo('BODYARMOR', '/brands/bodyarmor.png', 1000, 345),
      logo('Beats by Dre', '/brands/beats-by-dre.png', 396, 392),
      logo('Kroger', '/brands/kroger.png', 562, 444),
      logo('Martell', '/brands/martell.png', 280, 171),
      logo('T-Mobile', '/brands/tmobile.png', 1000, 447),
      logo('Seattle Seahawks', '/brands/seattle-seahawks.png', 1000, 406),
      logo('Xhibition', '/brands/xhibition.png', 278, 40),
      logo('Avión Tequila', '/brands/avion-tequila.png', 1000, 765, 1.35),
      logo('Cleveland Cavaliers', '/brands/cleveland-cavaliers.png', 216, 125),
      logo('Reebok', '/brands/reebok.png', 248, 148),
      logo('Verizon', '/brands/verizon.png', 399, 126),
      logo('Foot Locker', '/brands/foot-locker.svg', 1048, 214),
      logo('Target', '/brands/target.png', 500, 500),
      logo('Main Event Entertainment', '/brands/main-event.jpg', 800, 400),
      logo('Nike', '/brands/nike.svg', 24, 9),
      logo('Cleveland Guardians', '/brands/cleveland-guardians.png', 128, 128),
      logo('Hennessy', '/brands/hennessy.svg', 185, 108),
      logo('Puma', '/brands/puma.png', 24, 24),
      logo("McDonald's", '/brands/mcdonalds.png', 800, 600),
      logo('Barclays Center', '/brands/barclays-center.png', 1000, 494),
      logo('Cedar Point', '/brands/cedar-point.png', 585, 240),
      logo('Cleveland Browns', '/brands/cleveland-browns.png', 93, 105),
      logo('UNKNWN', '/brands/unknwn.png', 358, 141),
      logo('DTLR / Villa', '/brands/dtlr-villa.png', 600, 70),
      logo("D'Ussé", '/brands/dusse.png', 436, 115),
      logo("Raising Cane's", '/brands/raising-canes.png', 151, 72),
      logo('K-Swiss', '/brands/k-swiss.svg', 250, 169),
      logo('New Balance', '/brands/new-balance.svg', 24, 24),
      logo('Mountain Dew', '/brands/mountain-dew.svg', 281, 195),
      logo('Under Armour', '/brands/under-armour.png', 24, 24),
      logo('Toyota', '/brands/toyota.svg', 251, 42),
      logo('Uber', '/brands/uber.png', 1536, 533),
      logo('Luc Belaire', '/brands/luc-belaire.svg', 542, 284),
      logo('Zoom', '/brands/zoom.svg', 24, 24),
      logo('A3C', '/brands/a3c.png', 300, 300),
      logo('McKinsey & Company', '/brands/mckinsey.png', 800, 249),
      logo('Los Angeles Dodgers', '/brands/dodgers.png', 2400, 1400),
    ],
  },
  {
    id: 'media',
    label: 'Media + Entertainment',
    logos: [
      logo('Forbes', '/brands/forbes.png', 1000, 359),
      logo('The FADER', '/brands/the-fader.png', 299, 168),
      logo('Complex', '/brands/complex.png', 443, 114),
      logo('VH1', '/brands/vh1.png', 358, 141),
      logo('REVOLT', '/brands/revolt.png', 398, 127),
      logo('BET', '/brands/bet.png', 1000, 318),
      logo('Shade 45', '/brands/shade-45.png', 145, 40),
      logo('Blavity Inc.', '/brands/blavity.png', 1000, 187),
      logo('ESSENCE', '/brands/essence.png', 626, 171),
      logo('Radio One', '/brands/radio-one.png', 139, 49),
      logo('iHeartRadio', '/brands/iheartradio.svg', 599, 192),
      logo('TEDx', '/brands/tedx.svg', 400, 119),
    ],
  },
  {
    id: 'organizations',
    label: 'Organizations',
    logos: [
      logo('Obama–Biden Campaign', '/brands/obama-biden.png', 292, 329),
      logo(
        'Boys & Girls Clubs of America',
        '/brands/boys-girls-clubs.png',
        225,
        225,
      ),
      logo('City Year', '/brands/city-year.png', 225, 225),
      logo('YMCA', '/brands/ymca.png', 257, 196),
      logo(
        'Greater Cleveland Sports Commission',
        '/brands/greater-cleveland-sports-commission.png',
        310,
        163,
      ),
      logo('The City Mission', '/brands/the-city-mission.png', 525, 148),
      logo('United Way', '/brands/united-way.png', 345, 146),
      logo('The Lighthouse Church', '/brands/tlhc.png', 640, 84),
      logo('The Word Church', '/brands/the-word-church.png', 1672, 941),
    ],
  },
] as const;
