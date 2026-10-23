import { lazy, Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODE_EVENT, TERMINAL_EVENT, isPlay } from '../lib/mode';

// Neither chunk (nor the physics library) downloads until it's used.
const Gravity = lazy(() => import('./Gravity'));
const Terminal = lazy(() => import('./Terminal'));

const typingInField = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

/** Mounts play mode and the terminal on demand, outside #root. */
export default function PlayHost() {
  const [play, setPlay] = useState(false);
  const [terminal, setTerminal] = useState(false);

  useEffect(() => {
    const onMode = () => setPlay(isPlay());
    const onTerminal = () => setTerminal(true);
    // Easter egg: backtick opens the terminal from anywhere.
    const onKey = (e) => {
      if (e.key === '`' && !e.metaKey && !e.ctrlKey && !e.altKey && !typingInField(e.target)) {
        e.preventDefault();
        setTerminal((open) => !open);
      }
    };
    window.addEventListener(MODE_EVENT, onMode);
    window.addEventListener(TERMINAL_EVENT, onTerminal);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(MODE_EVENT, onMode);
      window.removeEventListener(TERMINAL_EVENT, onTerminal);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!play && !terminal) return null;

  return createPortal(
    <Suspense fallback={null}>
      {play && <Gravity />}
      {terminal && <Terminal onClose={() => setTerminal(false)} />}
    </Suspense>,
    document.body
  );
}
