import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(withBase(p), site).toString();
  const body = `# Surfer Element

> Surfer Element is a booking service in Tamraght, Morocco, representing
> three independent surf houses — SurfsHUB Tamraght, Cactus Surf & Skate
> House and Hakuna Matata Guest House. One multilingual site to compare the
> three houses, see real guest-review scores, and book with a locked-in
> price and a single deposit, instead of visiting three separate sites.

Surfer Element is paid by the three houses listed on this site and
represents only them — it is not an independent directory of every Tamraght
surf camp. All comparisons on this site are between these three houses only.

## Core pages

- [Home](${u('/')}): overview and the fastest way to the fit check or the full comparison
- [Compare the three houses](${u('/compare/')}): the full side-by-side comparison, alphabetical by default
- [Fit check](${u('/fit-check/')}): a short quiz matching a traveller to the house that fits them
- [Price lock](${u('/price-lock/')}): how the fixed, locked-in price works
- [SurfsHUB Tamraght](${u('/houses/surfshub-tamraght/')})
- [Cactus Surf & Skate House](${u('/houses/cactus-surf-skate-house/')})
- [Hakuna Matata Guest House](${u('/houses/hakuna-matata/')})
- [About / how it works](${u('/about/')})
- [FAQ](${u('/faq/')})
- [Contact](${u('/contact/')})
- [Tamraght guide](${u('/guide/')}): seasonal and logistics content (spots, months, getting to Tamraght)

This file is updated as new guide content is published.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
