import { useEffect, useRef, useState } from 'react';
import { capture, createWorld } from './engine';
import { exitPlay, openTerminal } from '../lib/mode';
import './play.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

/**
 * Play mode overlay: knock the page down, rebuild it, and the controls
 * bar. The page keeps whatever light/dark theme it was in.
 */
export default function Gravity() {
  const layer = useRef(null);
  const world = useRef(null);
  const [phase, setPhase] = useState('intact'); // intact | fallen | rebuilding
  const [still] = useState(reducedMotion);

  async function drop() {
    if (still || !layer.current) return;
    await settle(); // let layout settle before measuring
    const items = capture(document.getElementById('root'), layer.current);
    document.documentElement.classList.add('play-fallen');
    world.current = createWorld(items, layer.current);
    setPhase('fallen');
    setTimeout(() => world.current?.drop(), 350);
  }

  function restoreNow() {
    world.current?.destroy();
    world.current = null;
    window.getSelection?.()?.removeAllRanges();
    document.documentElement.classList.remove('play-fallen');
    setPhase('intact');
  }

  async function rebuild() {
    if (!world.current) return;
    setPhase('rebuilding');
    await world.current.rebuild();
    restoreNow();
  }

  async function exit() {
    if (world.current) await rebuild();
    exitPlay('light');
  }

  // Fall on entry. Dropping is async, so guard against unmount mid-way.
  useEffect(() => {
    let live = true;
    settle().then(() => live && drop());
    return () => {
      live = false;
      restoreNow();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !document.querySelector('.term')) exit();
    };
    // The pile is laid out for this viewport; on resize, just put the page back.
    const onResize = () => world.current && restoreNow();
    // The terminal's `gravity` command, when play mode is already on.
    const onDrop = () => !world.current && drop();
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    window.addEventListener('site:drop', onDrop);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('site:drop', onDrop);
    };
  });

  return (
    <>
      <div ref={layer} className={`g-layer${phase === 'intact' ? ' is-idle' : ''}`} aria-hidden="true" />

      <div className="g-bar" role="toolbar" aria-label="Play mode">
        <span className="g-hint">
          {still
            ? 'Gravity is off: your device asks for reduced motion.'
            : phase === 'fallen'
              ? 'Grab, throw, or shove things around.'
              : 'Play mode.'}
        </span>
        {!still &&
          (phase === 'intact' ? (
            <button type="button" className="g-btn g-btn-hot" onClick={drop}>
              Drop it
            </button>
          ) : (
            <button type="button" className="g-btn g-btn-hot" onClick={rebuild} disabled={phase === 'rebuilding'}>
              Rebuild
            </button>
          ))}
        <button type="button" className="g-btn" onClick={openTerminal}>
          <span aria-hidden="true">&gt;_</span> Terminal
        </button>
        <button type="button" className="g-btn" onClick={exit} aria-label="Exit play mode">
          Exit
        </button>
      </div>
    </>
  );
}
