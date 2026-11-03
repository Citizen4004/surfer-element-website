// Locale formatting for dates and scores (DESIGN.md §5). English only for
// now; pass the page locale here once the other five languages ship.
export function formatCheckedDate(iso: string, locale = 'en-GB'): string {
  // Parse as a calendar date, not a UTC instant, so it never shifts a day.
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m - 1, d)));
}

export function formatScore(n: number, locale = 'en-GB'): string {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);
}

/** Cut text at a word boundary, for teaser lines (never mid-word). */
export function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s—-]+$/, '') + '…';
}
