/**
 * Site mode: light → dark → play → light. Light and dark persist across
 * visits; play is a one-visit party trick and never does.
 */

export const MODE_EVENT = 'site:mode';
export const TERMINAL_EVENT = 'site:terminal';

const root = () => document.documentElement;

export function effectiveTheme() {
  return root().dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function setTheme(theme) {
  root().dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
}

export const isPlay = () => root().dataset.mode === 'play';

export function enterPlay() {
  root().dataset.mode = 'play';
  window.dispatchEvent(new CustomEvent(MODE_EVENT, { detail: 'play' }));
}

export function exitPlay(theme = 'light') {
  delete root().dataset.mode;
  setTheme(theme);
  window.dispatchEvent(new CustomEvent(MODE_EVENT, { detail: theme }));
}

export function cycleMode() {
  if (isPlay()) return exitPlay('light');
  if (effectiveTheme() === 'light') return setTheme('dark');
  enterPlay();
}

export const openTerminal = () => window.dispatchEvent(new Event(TERMINAL_EVENT));
export const startWalk = () => window.dispatchEvent(new Event('site:walk'));
