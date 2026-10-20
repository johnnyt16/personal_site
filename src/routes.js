/**
 * Every page on the site. The prerender script writes one HTML file per
 * route, and main.jsx / entry-server.jsx pick the page from the path.
 */

export const SITE_URL = 'https://johnnymcconkie.com';

export const routes = [
  {
    path: '/',
    page: 'home',
    title: 'Johnny McConkie',
    description:
      'Johnny McConkie builds software products and sells them. Full-stack and AI product engineer in Provo, Utah. BYU Information Systems, December 2026.',
  },
];

/** Strip trailing slashes and index.html so /work/voley/ and /work/voley match. */
export function normalizePath(path) {
  const clean = path.replace(/index\.html$/, '').replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function findRoute(path) {
  return routes.find((r) => r.path === normalizePath(path)) ?? null;
}
