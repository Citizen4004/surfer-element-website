import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Tamraght guide posts: Markdown files in src/content/guide/<slug>.md,
// served at /guide/<slug>/ (src/pages/guide/[slug].astro). English only for
// now. `lang` and `translationKey` already exist in the schema so the
// translation pass can add /de/guide/<slug>/ etc. without restructuring:
// widen `lang` to the six locales, group translations by `translationKey`,
// and only then emit hreflang between posts that actually exist in each
// language. Until then guide posts emit NO hreflang alternates, and the
// header language switcher only shows English as a link (see Layout.astro).
//
// Cross-field rules that need the filename/body (slug === filename, related
// slugs exist, no stray H1, no [NEEDS SOURCE] markers, house disclosure) are
// enforced at build time in src/lib/guide.ts, so a bad post fails the build
// with a message naming the file instead of shipping.

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const guide = defineCollection({
  // id = filename without extension (NOT frontmatter `slug`), so slug and
  // filename are checked against each other instead of one silently winning.
  loader: glob({
    pattern: ['**/*.md', '!**/_*'], // files starting with _ are ignored
    base: './src/content/guide',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z
      .object({
        // H1 on the page. Not used for <title> (see seoTitle).
        title: z.string().min(10).max(110),
        // <title>, og:title, twitter:title. Include the brand suffix yourself
        // if you want one ("... | Surfer Element"); it is not appended.
        seoTitle: z.string().min(10).max(60),
        // meta description, og:description, twitter:description.
        description: z.string().min(70).max(155),
        // Must equal the filename (src/content/guide/<slug>.md). Kebab-case.
        slug: z.string().regex(kebab, 'slug must be kebab-case (a-z, 0-9, hyphens)'),

        // Calendar dates, YYYY-MM-DD (unquoted or quoted).
        published: z.coerce.date(),
        // Last substantive edit. Defaults to `published` when omitted.
        updated: z.coerce.date().optional(),
        // Date every dated fact in the post (distances, prices, scores,
        // seasons) was last checked against its source. Required: a post
        // with facts and no check date does not ship (DESIGN.md 7.2).
        factsCheckedOn: z.coerce.date(),

        // The byline is the agency, never a person. The only accepted value
        // is the agency name, so a fabricated author cannot be added.
        author: z.literal('Surfer Element').default('Surfer Element'),

        // The main guide for a topic; listed first on /guide/.
        pillar: z.boolean().default(false),
        // Slug of the pillar post this one sits under. Adds it to the
        // breadcrumb (Home > Guide > Pillar > Post) and BreadcrumbList schema.
        // Leave out for a post that is not part of that hub (it then reads
        // Home > Guide > Post). Unknown slugs fail the build.
        parent: z.string().regex(kebab).optional(),
        // Place the post is about, e.g. "Taghazout, Morocco". Emitted as
        // BlogPosting.about (a Place). It is never attached to the agency's
        // Organization node, which carries no address or location.
        aboutPlace: z.string().min(3).max(80).optional(),
        // Slugs of other guide posts to list under "Related guides".
        // Unknown slugs fail the build; draft targets are skipped quietly.
        related: z.array(z.string().regex(kebab)).max(6).default([]),
        // Rendered as a visible "Quick answers" block AND emitted as
        // FAQPage JSON-LD. Plain text only (no markdown), because the same
        // string goes into the schema.
        faq: z
          .array(
            z.object({
              question: z.string().min(8).max(200),
              answer: z.string().min(20).max(1200),
            }),
          )
          .max(10)
          .default([]),

        // Optional hero. Decorative by default: `illustrative: true` adds an
        // "Illustration, not a photograph" caption and is the only value
        // allowed for generated/stock art. `false` is reserved for a real
        // photo supplied by the user (assets/<site>/photos/manifest.md).
        // src is a path relative to this file, e.g. ../../assets/guide/x.jpg
        heroImage: z
          .object({
            src: image(),
            alt: z.string().min(8).max(200),
            illustrative: z.boolean(),
          })
          .optional(),

        // The disclosure note is shown automatically whenever the title,
        // description, FAQ or body names SurfsHUB, Cactus or Hakuna Matata.
        // Set true to force it on a post that discusses the houses without
        // naming them.
        mentionsHouses: z.boolean().default(false),

        // true = excluded from /guide/, sitemap.xml, llms.txt and the
        // production build. `astro dev` still renders drafts (noindex).
        // Required, no default, so publishing is always an explicit choice.
        draft: z.boolean(),

        // i18n slots. Only 'en' is accepted today.
        lang: z.literal('en').default('en'),
        translationKey: z.string().regex(kebab).optional(),
      })
      .refine((d) => !d.updated || d.updated >= d.published, {
        message: '`updated` cannot be earlier than `published`',
        path: ['updated'],
      }),
});

export const collections = { guide };
