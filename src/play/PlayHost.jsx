import { lazy, Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODE_EVENT, TERMINAL_EVENT, isPlay } from '../lib/mode';

// Neither chunk (nor the physics library) downloads until it's used.
const Gravity = lazy(() => import('./Gravity'));
const Terminal = lazy(() => import('./Terminal'));
const Palette = lazy(() => import('./Palette'));

const typingInField = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

/** Mounts play mode, the terminal, and the ⌘K menu on demand, outside #root. */
export default function PlayHost() {
  const [play, setPlay] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onMode = () => setPlay(isPlay());
    const onTerminal = () => {
      setPalette(false);
      setTerminal(true);
    };
    const onPalette = () => setPalette(true);
    // Easter egg: backtick opens the terminal from anywhere.
    const onKey = (e) => {
      // ⌘K / Ctrl+K: the command menu, from anywhere.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((open) => !open);
        return;
      }
      if (e.key === '`' && !e.metaKey && !e.ctrlKey && !e.altKey && !typingInField(e.target)) {
        e.preventDefault();
        setTerminal((open) => !open);
      }
    };
    window.addEventListener(MODE_EVENT, onMode);
    window.addEventListener(TERMINAL_EVENT, onTerminal);
    window.addEventListener('site:palette', onPalette);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(MODE_EVENT, onMode);
      window.removeEventListener(TERMINAL_EVENT, onTerminal);
      window.removeEventListener('site:palette', onPalette);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!play && !terminal && !palette) return null;

  return createPortal(
    <Suspense fallback={null}>
      {play && <Gravity />}
      {terminal && <Terminal onClose={() => setTerminal(false)} />}
      {palette && <Palette onClose={() => setPalette(false)} />}
    </Suspense>,
    document.body
  );
}
