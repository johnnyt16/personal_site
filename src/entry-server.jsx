import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { routes, SITE_URL } from './routes';
export { renderHead } from './head';

/** Used by scripts/prerender.js to bake each page into its own HTML file. */
export function render(path) {
  return renderToString(<App path={path} />);
}
