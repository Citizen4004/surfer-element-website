# Surfer Element — surferelement.com

Booking site for Surfer Element, a booking service representing three
independent surf houses in Tamraght, Morocco (SurfsHUB Tamraght, Cactus Surf
& Skate House, Hakuna Matata Guest House). Built with [Astro](https://astro.build)
as a static site, deployed to GitHub Pages.

The full strategy, brand, design-system and content research behind this
site lives in the separate `seo-agents-system` project
(`pipeline/tamraght-surf-agency/`) — this repo is the actual product code
built from that research, specifically from `design/DESIGN.md`,
`design/tokens.css` and `drafts/tamraght/core-pages/*.md`.

## Run it locally

```sh
npm install
npm run dev
```

Opens at `http://localhost:4321`.

```sh
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and deploys it to GitHub Pages via GitHub Actions. No manual deploy
step needed.

### Pointing surferelement.com at GitHub Pages (DNS)

The repo has a `public/CNAME` file containing `surferelement.com`, so Pages
is ready for the custom domain as soon as DNS is pointed at it. At your
domain registrar, add these records for `surferelement.com` (an apex/root
domain, so **A records**, not a CNAME, since most registrars don't allow a
CNAME on the apex):

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

If you'd rather serve from `www.surferelement.com` instead of the bare
domain, use a CNAME record there instead:

```
CNAME   www   <your-github-username>.github.io
```

(and set up a redirect from the apex, or just use the A records above for
the apex and add this as a second option — most people pick one or the
other.) GitHub's own docs on this: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

DNS propagation can take anywhere from a few minutes to 24 hours. Once it's
live, GitHub Pages auto-provisions an HTTPS certificate for the domain — no
action needed beyond checking the "Enforce HTTPS" box in the repo's Pages
settings once it's available (it's greyed out until DNS resolves).

## What's built vs. genuinely still pending

**Built:**
- Full site structure, all 11 core pages, in English, following
  `DESIGN.md`'s component system and equal-weight rules exactly (the
  three-house comparison grid, guest-evidence blocks sourced to real
  Booking.com data, the price-lock panel, the interactive fit-check quiz).
- Routing structure ready for the other five languages (German, French,
  Spanish, Italian, Dutch) via Astro's built-in i18n routing
  (`astro.config.mjs`) — English has no URL prefix, the others would be
  `/de/`, `/fr/`, `/es/`, `/it/`, `/nl/`. **No translations exist yet** —
  that's a known, separate follow-up, not done in this build.
- Technical SEO: `robots.txt` (explicitly allows AI crawlers — GPTBot,
  ClaudeBot, Google-Extended, PerplexityBot, CCBot, Applebot-Extended,
  anthropic-ai), `llms.txt`, `sitemap.xml` (English pages only, for now).

**Genuinely still pending — none of this is invented or faked anywhere in
the code:**
- **Payment processor.** Not decided yet. The contact page has a plain
  contact form (not wired to any backend — needs a form-handling service or
  a real booking system) and a "book via contact" flow instead of a real
  checkout. Do not add a payment button until a processor is chosen and
  actually integrated.
- **Phone/WhatsApp number.** The contact page explicitly says this is
  pending rather than showing a placeholder number.
- **Street address.** Same — explicitly marked pending on the About and
  Contact pages and in the footer, not invented.
- **Real photography.** Every photo slot on every page is a placeholder
  frame per `DESIGN.md §9` ("Photos from [house] coming soon") — no stock
  or generated images standing in as real ones. See
  `pipeline/tamraght-surf-agency/design/tamraght-missing-photos.md` in the
  main project for the full shot list.
- **Cancellation policy, team bios, five languages' translations** — all
  explicitly marked pending in the relevant pages, not invented.
- **The mobile "by question" comparison view** (DESIGN.md §7.1) currently
  falls back to the same stacked card view as "by house" — the toggle
  exists and is accessible, but the true transposed-table view isn't built
  yet. Noted as a follow-up in `compare.astro`.

## Design system

`src/styles/tokens.css` is a direct copy of the design tokens from the main
project (`pipeline/tamraght-surf-agency/design/tokens.css`) — colors,
type scale, spacing. `src/styles/global.css` implements the component
styles described in `DESIGN.md` on top of those tokens. If the design
system changes, update both the source file in the main project and this
copy (or set up a build step to sync them automatically, if this project
grows enough to justify it).
