import { caseStudies } from './data/case-studies';

/**
 * Every page on the site. The prerender script writes one HTML file per
 * route, and main.jsx / entry-server.jsx pick the page from the path.
 */

export const SITE_URL = 'https://johnnymcconkie.com';

const strip = (s) => s.replace(/\[\[TODO:[^\]]*\]\]/g, '').replace(/\s+/g, ' ').trim();

export const routes = [
  {
    path: '/',
    page: 'home',
    title: 'Johnny McConkie',
    description:
      'Johnny McConkie: full-stack engineer in Provo who usually ends up selling what he builds, too. Voley, LedgerLine, AttendEase. BYU Information Systems, December 2026.',
  },
  ...caseStudies.map((cs) => ({
    path: cs.path,
    page: 'case-study',
    slug: cs.slug,
    title: `${cs.title} · Johnny McConkie`,
    description: strip(cs.summary),
  })),
];

/** Strip trailing slashes and index.html so /work/voley/ and /work/voley match. */
export function normalizePath(path) {
  const clean = path.replace(/index\.html$/, '').replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

/**
 * Public URL for a route. Trailing slash so static hosts serve
 * /work/voley/index.html directly instead of falling back to the homepage.
 */
export const urlFor = (path) => (path === '/' ? '/' : `${path}/`);

export function findRoute(path) {
  return routes.find((r) => r.path === normalizePath(path)) ?? null;
}
