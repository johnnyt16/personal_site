import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Bakes the rendered markup into dist/index.html after `vite build`.
 *
 * The site is a resume: the text needs to be in the HTML for crawlers, for
 * visitors with JavaScript off, and so the largest paint doesn't wait on a
 * bundle. React hydrates the same markup on top.
 */
const root = process.cwd();
const distIndex = resolve(root, 'dist/index.html');

const { render } = await import(resolve(root, '.ssr/entry-server.js'));
const appHtml = render();

const html = readFileSync(distIndex, 'utf8');
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  throw new Error('prerender: could not find the #root mount point in dist/index.html');
}

writeFileSync(distIndex, html.replace(marker, `<div id="root">${appHtml}</div>`));
rmSync(resolve(root, '.ssr'), { recursive: true, force: true });

console.log(`prerendered ${appHtml.length} bytes of markup into dist/index.html`);
