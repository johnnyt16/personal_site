import { cycleMode } from '../lib/mode';

/**
 * Cycles light → dark → play. A saved light/dark choice is applied before
 * paint by the inline script in index.html. All three icons are always
 * rendered and CSS shows the one for the next step, so server and client
 * markup match.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycleMode}
      aria-label="Switch mode: light, dark, or play"
      title="Light · Dark · ???"
    >
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="icon-spark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
        <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
      </svg>
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
