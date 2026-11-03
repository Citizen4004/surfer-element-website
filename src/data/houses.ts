// Single source of truth for house data, so the comparison grid, home page,
// house profile pages and fit-check results never drift out of sync.
// Sourced from pipeline/tamraght-surf-agency/strategy/brand-strategy.md
// "What guests actually say" (Booking.com, checked 2026-11-03).

export interface House {
  slug: string;
  name: string;
  accentVar: string;
  checkedDate: string;
  score: number;
  scoreLabel: string;
  reviews: number;
  subscores: { label: string; value: number }[];
  theme: string;
  goodFitIf: string[];
  notAFitIf: string[];
  takesKids: boolean;
  signatureMoment: string;
  rooms: string;
  staffLanguages: string;
}

export const houses: House[] = [
  {
    slug: 'cactus-surf-skate-house',
    name: 'Cactus Surf & Skate House',
    accentVar: '--house-cactus',
    checkedDate: '2026-11-03',
    score: 8.5,
    scoreLabel: 'Très bien',
    reviews: 182,
    subscores: [
      { label: 'Staff', value: 8.9 },
      { label: 'Value for money', value: 8.7 },
      { label: 'Location', value: 7.9 },
    ],
    theme:
      'Guests consistently describe Cactus as lively and social; more than one review compares the house to a flatshare of surfers. The reception team is mentioned as multilingual: reviews note Arabic, German, Spanish and English all being spoken there. With close to four times as many reviews as either of the other two houses, there is a lot of guest history behind these numbers.',
    goodFitIf: [
      'you want to meet a lot of people quickly and don’t mind a busier house',
      'you like the idea of skateboarding available alongside surfing',
      'you’re travelling solo or with friends and want a classic, high-energy hostel scene',
    ],
    notAFitIf: [
      'you’re hoping for a quiet, low-key week',
      'you’re travelling with children — Cactus doesn’t take kids',
    ],
    takesKids: false,
    signatureMoment: 'a social evening or the skate setup',
    rooms: 'Shared dorm bed is the base package (6- and 8-bed dorms with lockers). A private double is available as a paid upgrade.',
    staffLanguages: 'Cactus’s own reception is reported to speak Arabic, German, Spanish and English.',
  },
  {
    slug: 'hakuna-matata',
    name: 'Hakuna Matata Guest House',
    accentVar: '--house-hkm',
    checkedDate: '2026-11-03',
    score: 8.9,
    scoreLabel: 'Superbe',
    reviews: 36,
    subscores: [
      { label: 'Staff', value: 9.6 },
      { label: 'Value for money', value: 9.4 },
      { label: 'Location', value: 9.3 },
    ],
    theme:
      'Reviewers describe the house as small, new and a little bohemian, with rooftop jam sessions and bonfires coming up often. Hosts are named across reviews — Sara, Safwan and Simo appear, among others — suggesting a newer, more varied team than the other two houses. With the fewest reviews of the three (it’s also the newest), it scores highest on both location and value for money.',
    goodFitIf: [
      'you want something small, new and a bit bohemian',
      'you’d rather be in a smaller house than a bigger hostel',
      'you’re a couple or a pair of friends rather than looking for a big group scene',
    ],
    notAFitIf: [
      'you want the most social, highest-energy house of the three — that’s Cactus',
      'you’re travelling with children — Hakuna Matata doesn’t take kids',
    ],
    takesKids: false,
    signatureMoment: 'a rooftop jam session, bonfire or coworking corner',
    rooms: 'A 4-bed women-only dorm, a 4-bed mixed dorm, a twin with shared bath, a triple with private bath, and a garden-view double/twin deluxe room, per its Booking.com listing.',
    staffLanguages: 'Not formally stated, though guest reviews show hosts handling English, French and German-speaking guests directly.',
  },
  {
    slug: 'surfshub-tamraght',
    name: 'SurfsHUB Tamraght',
    accentVar: '--house-surfshub',
    checkedDate: '2026-11-03',
    score: 9.3,
    scoreLabel: 'Fabuleux',
    reviews: 49,
    subscores: [
      { label: 'Staff', value: 9.8 },
      { label: 'Value for money', value: 9.4 },
      { label: 'Location', value: 8.8 },
    ],
    theme:
      'Guests consistently describe the house as feeling like home. The same two staff members are named repeatedly across many different reviews — Badr and Khadija come up again and again, pointing to a small, stable core team rather than rotating staff. Shared breakfast and dinner are mentioned often as the social centre of the stay. Several reviews note, approvingly, that the house has a clear no-parties policy, and that children are genuinely welcome.',
    goodFitIf: [
      'you want the week to feel calm, organised and looked after',
      'you’re travelling with kids — SurfsHUB is the only one of the three houses that takes children',
      'you’re travelling solo and want to feel safe and settled',
      'you’d rather avoid a party atmosphere entirely',
    ],
    notAFitIf: [
      'you’re hoping for a big, busy, highly social hostel scene — that’s Cactus',
      'you want the newest, smallest, most bohemian option — that’s Hakuna Matata',
    ],
    takesKids: true,
    signatureMoment: 'the shared table / a calm evening',
    rooms: 'Shared dorm bed is the base package. Private rooms are a paid upgrade. SurfsHUB’s own published room list includes mixed and women-only dorms, doubles, triples and a twin.',
    staffLanguages: 'Not stated on its public listing — ask us before booking and we’ll check.',
  },
];

export const housesAlphabetical = [...houses].sort((a, b) => a.name.localeCompare(b.name));

// Each house's exact Booking.com listing URL hasn't been captured in the
// pipeline yet (local-market-specialist/founder still need to confirm the
// canonical permalink per house — see citations/tamraght-citations.md).
// Until then, "See the reviews on Booking.com" links go to a real,
// functioning Booking.com search for the house's name rather than a dead
// href="#" anchor. Replace with the confirmed listing URL per house once
// it's available.
export function bookingSearchUrl(houseName: string): string {
  // houseName already includes "Tamraght" for some houses (e.g. "SurfsHUB
  // Tamraght") but not others, so append only "Morocco" rather than
  // "Tamraght Morocco" to avoid a redundant, odd-looking query string.
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${houseName} Morocco`)}`;
}

export const pricing = [
  { nights: 3, beginner: 150, intermediate: 180 },
  { nights: 5, beginner: 250, intermediate: 300 },
  { nights: 7, beginner: 350, intermediate: 420 },
];
