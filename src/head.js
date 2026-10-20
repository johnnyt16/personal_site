import { SITE_URL } from './routes';

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Per-page <head> tags, written into each prerendered HTML file. */
export function renderHead(route) {
  const url = SITE_URL + (route.path === '/' ? '/' : route.path);
  const title = escape(route.title);
  const description = escape(route.description);

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
  ].join('\n    ');
}
