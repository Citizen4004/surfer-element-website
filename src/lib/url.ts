// Base-aware internal link helper.
//
// This site is deployed two ways from the same build output:
//  - Right now, before surferelement.com's DNS is pointed at GitHub Pages:
//    served at https://citizen4004.github.io/surfer-element-website/ (a
//    project-page subpath).
//  - Once DNS is live and the custom domain is verified in the repo's Pages
//    settings: served at https://surferelement.com/ (root), via the
//    public/CNAME file already in this repo.
//
// `base` in astro.config.mjs is toggled between these two via the
// USE_CUSTOM_DOMAIN env var set in .github/workflows/deploy.yml (Astro's
// own documented pattern for this exact situation). Every internal link in
// this codebase must go through withBase() rather than a hardcoded leading
// slash, or it breaks under whichever of the two isn't currently active.
export const base = import.meta.env.BASE_URL;

const baseNoTrailingSlash = base.endsWith('/') ? base.slice(0, -1) : base;

export function withBase(path: string): string {
  // `path` is always written as an absolute app path, e.g. "/compare/".
  const trimmedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseNoTrailingSlash}${trimmedPath}`;
}

/**
 * The inverse of withBase(): given Astro.url.pathname (which already
 * includes `base` when one is configured), strip the base prefix back off
 * to get the logical app path, e.g. for rebuilding a URL in another
 * language. Deliberately does NOT use string-length slicing on `base`
 * itself, since import.meta.env.BASE_URL's trailing slash is inconsistent
 * with Astro.url.pathname's — that mismatch previously produced mangled
 * paths (e.g. "/dee/" instead of "/de/"). Stripping the non-trailing-slash
 * form and falling back to "/" is robust to that.
 */
export function stripBase(pathname: string): string {
  if (baseNoTrailingSlash && pathname.startsWith(baseNoTrailingSlash)) {
    return pathname.slice(baseNoTrailingSlash.length) || '/';
  }
  return pathname;
}
