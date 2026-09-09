export const featuredBrandLogos = [
  { name: "K-Swiss", src: "/brands/k-swiss.svg", width: 250, height: 169 },
  { name: "Foot Locker", src: "/brands/foot-locker.svg", width: 1048, height: 214 },
  { name: "Hennessy", src: "/brands/hennessy.svg", width: 185, height: 108, scale: 1.35 },
  { name: "Golden Boy", src: "/brands/golden-boy.svg", width: 353, height: 76 },
  { name: "iHeartRadio", src: "/brands/iheartradio.svg", width: 599, height: 192 },
  { name: "NFL", src: "/brands/nfl.svg", width: 135, height: 96 },
  { name: "Barclays Center", src: "/brands/barclays-center.png", width: 1304, height: 645 },
  { name: "TEDx", src: "/brands/tedx.svg", width: 400, height: 119 },
  { name: "Karen Civil", src: "/brands/karen-civil.png", width: 183, height: 156 },
  { name: "Hair & The Blog", src: "/brands/hair-and-the-blog.png", width: 1586, height: 553 },
  { name: "King Me", src: "/brands/king-me.svg", width: 204, height: 50 },
  { name: "Headlines by De'Franco", src: "/brands/headlines.svg", width: 202, height: 48 },
] as const;

export const featuredBrands = featuredBrandLogos.map((brand) => brand.name);

export const allBrands = [
  ...featuredBrands,
  "Golden Boy Boxing",
  "CBS",
  "The Good Guys",
  "Bwagz",
  "Walk With Wagner",
  "NFL Honors",
  "Christian Kirksey",
  "Bobby Wagner",
  "Shaunie O'Neal",
  "Foot Locker North Park",
  "Green Bay Packers",
  "Jacksonville Jaguars",
  "Young Sheldon",
  "Boss Babe",
  "Mister Green",
  "If & Co.",
  "Dallas NorthPark",
  "San Diego",
] as const;
