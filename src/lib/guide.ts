import { getCollection, type CollectionEntry } from 'astro:content';

export type GuideEntry = CollectionEntry<'guide'>;

export const guidePath = (slug: string) => `/guide/${slug}/`;

/** YYYY-MM-DD from a Date parsed by the content schema (UTC midnight). */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const updatedOf = (e: GuideEntry) => e.data.updated ?? e.data.published;

const HOUSE_NAMES = /SurfsHUB|Cactus Surf|Hakuna Matata/i;

/** True when the post names a house (or opts in), so the disclosure shows. */
export function needsDisclosure(e: GuideEntry): boolean {
  if (e.data.mentionsHouses) return true;
  const text = [
    e.data.title,
    e.data.description,
    ...e.data.faq.flatMap((f) => [f.question, f.answer]),
    e.body ?? '',
  ].join('\n');
  return HOUSE_NAMES.test(text);
}

function validate(entries: GuideEntry[]) {
  const slugs = new Set(entries.map((e) => e.data.slug));
  for (const e of entries) {
    const where = `src/content/guide/${e.id}.md`;
    if (e.data.slug !== e.id) {
      throw new Error(`${where}: frontmatter slug "${e.data.slug}" must equal the filename ("${e.id}").`);
    }
    for (const r of e.data.related) {
      if (r === e.data.slug) throw new Error(`${where}: "related" lists the post itself.`);
      if (!slugs.has(r)) throw new Error(`${where}: related slug "${r}" does not match any guide post.`);
    }
    const body = e.body ?? '';
    // Fenced code is stripped so a "# comment" inside a code block is fine.
    const prose = body.replace(/```[\s\S]*?```/g, '');
    if (/^# \S/m.test(prose)) {
      throw new Error(`${where}: body contains an H1 ("# ..."). The title is the H1; start the body at H2 ("## ...").`);
    }
    if (/\[NEEDS SOURCE/i.test(body)) {
      throw new Error(`${where}: body still contains a [NEEDS SOURCE] marker. Resolve it (fact-checker) before building.`);
    }
  }
}

/**
 * Guide posts, pillar first, then most recently updated. Drafts are only
 * returned when includeDrafts is true (post pages in `astro dev`); the
 * index, sitemap.xml, llms.txt and related-guides lists never pass it.
 */
export async function getGuides({ includeDrafts = false } = {}): Promise<GuideEntry[]> {
  const all = await getCollection('guide');
  validate(all);
  return all
    .filter((e) => includeDrafts || !e.data.draft)
    .sort(
      (a, b) =>
        Number(b.data.pillar) - Number(a.data.pillar) ||
        updatedOf(b).getTime() - updatedOf(a).getTime() ||
        a.data.title.localeCompare(b.data.title),
    );
}
