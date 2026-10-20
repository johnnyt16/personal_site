import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { findRoute, normalizePath } from './routes';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Production builds ship prerendered markup, so hydrate it rather than
// re-rendering from scratch. If the host served markup for a different
// route (e.g. a fallback to the homepage), render fresh instead.
const path = normalizePath(window.location.pathname);
const route = findRoute(path);
const builtFor = container.dataset.route;

if (container.hasChildNodes() && (builtFor === path || (!route && builtFor === '/404'))) {
  hydrateRoot(container, app);
} else {
  container.textContent = '';
  if (route) document.title = route.title;
  createRoot(container).render(app);
}
