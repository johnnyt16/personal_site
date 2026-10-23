import { useEffect, useRef, useState } from 'react';
import { createWalker } from './platformer';
import { profile } from '../data/resume';
import './walk.css';

/** Holds a direction while a touch button is pressed. */
function Pad({ action, label, children, walker }) {
  const set = (down) => (e) => {
    e.preventDefault();
    walker.current?.press(action, down);
  };
  return (
    <button
      type="button"
      className="walk-pad"
      aria-label={label}
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
}

export default function Walker({ onClose }) {
  const canvas = useRef(null);
  const walker = useRef(null);
  const [score, setScore] = useState({ got: 0, total: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    walker.current = createWalker(canvas.current, {
      onCoin: (got, total) => setScore({ got, total }),
      onAllCoins: () => setDone(true),
    });
    setScore({ got: 0, total: walker.current.total() });
    const onKey = (e) => {
      if (e.key === 'Escape' && !document.querySelector('.term, .pal')) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      walker.current?.destroy();
    };
  }, [onClose]);

  return (
    <>
      <canvas ref={canvas} className="walk-canvas" aria-hidden="true" />

      <div className="walk-ui walk-hud" role="status">
        <span className="walk-score">
          <span className="walk-coin" aria-hidden="true" /> {score.got}/{score.total}
          <span className="sr-only"> metrics collected</span>
        </span>
        <span className="walk-help">
          {done ? (
            <>
              All collected. <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Beat your website')}`}>Say hi →</a>
            </>
          ) : (
            <>
              <kbd>←</kbd>
              <kbd>→</kbd> run · <kbd>↑</kbd> jump · <kbd>↓</kbd> on a row opens it
            </>
          )}
        </span>
        <span className="walk-help-touch">{done ? 'All collected!' : 'Grab every ◆ · ↓ on a row opens it'}</span>
        <button type="button" className="walk-close" onClick={onClose} aria-label="Stop playing">
          ✕
        </button>
      </div>

      <div className="walk-ui walk-pads">
        <div>
          <Pad action="left" label="Run left" walker={walker}>◀</Pad>
          <Pad action="right" label="Run right" walker={walker}>▶</Pad>
        </div>
        <div>
          <Pad action="down" label="Open row or drop down" walker={walker}>▼</Pad>
          <Pad action="jump" label="Jump" walker={walker}>▲</Pad>
        </div>
      </div>
    </>
  );
}
