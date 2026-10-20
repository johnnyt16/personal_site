/**
 * Flips between light and dark, overriding the OS setting. The choice is
 * applied before paint by the inline script in index.html. Both icons are
 * always rendered and CSS shows the right one, so server and client markup
 * match.
 */
function toggle() {
  const el = document.documentElement;
  const current =
    el.dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  el.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Storage blocked: the toggle still works for this visit.
  }
}

export default function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
