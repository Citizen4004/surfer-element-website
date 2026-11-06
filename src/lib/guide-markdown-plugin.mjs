// Markdown plugin for guide posts (wired in astro.config.mjs). Astro 7's
// default Markdown processor is Sätteri, so this is a Sätteri HAST plugin
// (same tree shape as rehype), not a unified/rehype plugin. A plain object
// is all Sätteri needs, so there is no extra dependency.
//
// 1. Prefixes root-relative links ("/compare/") with the configured `base`,
//    so authors write plain site paths and links still work under the
//    GitHub Pages subpath. Same job withBase() does for .astro files.
// 2. Wraps every Markdown <table> in a focusable, horizontally scrollable
//    region, so wide tables scroll on phones instead of breaking the layout.
//    Tables that need a real <caption> are written as raw HTML in the post,
//    already inside <div class="table-scroll" role="region" aria-labelledby=...>
//    (raw HTML bypasses this plugin, so those links must not be inside them).
// 3. Gives external links a rel: citations get "noopener noreferrer";
//    Booking.com links get "nofollow noopener noreferrer", the same rel the
//    house pages use for Booking.com.

export function guideMarkdownPlugin({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '');

  const fixHref = (href) => {
    if (typeof href !== 'string') return href;
    if (!href.startsWith('/') || href.startsWith('//')) return href;
    if (prefix && (href === prefix || href.startsWith(prefix + '/'))) return href;
    return prefix + href;
  };

  return {
    name: 'surfer-element-guide',
    element: {
      filter: ['a', 'table'],
      visit(node, ctx) {
        if (node.tagName === 'a') {
          const href = node.properties?.href;
          if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
            const booking = /^https?:\/\/([^/]+\.)?booking\.com(\/|$)/i.test(href);
            ctx.setProperty(node, 'rel', booking ? 'nofollow noopener noreferrer' : 'noopener noreferrer');
            return;
          }
          const fixed = fixHref(href);
          if (fixed !== href) ctx.setProperty(node, 'href', fixed);
          return;
        }
        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'], role: 'region', ariaLabel: 'Scrollable table', tabIndex: 0 },
          children: [],
        });
      },
    },
  };
}
