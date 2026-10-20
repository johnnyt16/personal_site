import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

/**
 * Bakes every route into its own HTML file after `vite build`, so
 * /work/voley is served as dist/work/voley/index.html: real markup for
 * crawlers and a fast first paint. React hydrates the same markup on top.
 */
const root = process.cwd();
const dist = resolve(root, 'dist');

const { render, renderHead, routes } = await import(resolve(root, '.ssr/entry-server.js'));
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const ROOT_MARKER = '<div id="root"></div>';
const HEAD_BLOCK = /<!--head-->[\s\S]*?<!--\/head-->/;

if (!template.includes(ROOT_MARKER) || !HEAD_BLOCK.test(template)) {
  throw new Error('prerender: index.html is missing the #root mount point or the <!--head--> block');
}

function page(path, head) {
  return template
    .replace(HEAD_BLOCK, head)
    .replace(ROOT_MARKER, `<div id="root">${render(path)}</div>`);
}

for (const route of routes) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`;
  const out = resolve(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(route.path, renderHead(route)));
}

writeFileSync(
  resolve(dist, '404.html'),
  page('/404', renderHead({ path: '/404', title: 'Not found · Johnny McConkie', description: 'Page not found.' }))
);

rmSync(resolve(root, '.ssr'), { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes + 404`);
