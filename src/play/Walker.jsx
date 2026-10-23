import { useEffect, useRef, useState } from 'react';
import { createWalker } from './platformer';
import { profile } from '../data/resume';
import './walk.css';

/** Holds a control down while a touch button is pressed. */
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
  const [hud, setHud] = useState({ got: 0, total: 0, hearts: 3, fuel: 100, state: 'playing' });

  useEffect(() => {
    walker.current = createWalker(canvas.current);
    // The game runs outside React; sample its HUD a few times a second.
    const poll = setInterval(() => setHud(walker.current.hud()), 100);
    const onKey = (e) => {
      if (e.key === 'Escape' && !document.querySelector('.term, .pal')) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearInterval(poll);
      window.removeEventListener('keydown', onKey);
      walker.current?.destroy();
    };
  }, [onClose]);

  const over = hud.state !== 'playing';

  return (
    <>
      <canvas ref={canvas} className="walk-canvas" aria-hidden="true" />

      <div className="walk-ui walk-hud" role="status">
        <span className="walk-hearts" aria-label={`${hud.hearts} of 3 hearts left`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`walk-heart${i < hud.hearts ? '' : ' is-empty'}`} aria-hidden="true" />
          ))}
        </span>
        <span className="walk-score">
          <span className="walk-coin" aria-hidden="true" /> {hud.got}/{hud.total}
          <span className="sr-only"> coins</span>
        </span>
        <span className="walk-fuel" aria-label={`Jetpack fuel ${Math.round(hud.fuel)}%`}>
          <span style={{ width: `${hud.fuel}%` }} />
        </span>
        <span className="walk-help">
          <kbd>←</kbd>
          <kbd>→</kbd> run · <kbd>↑</kbd> jump, again to fly · <kbd>↓</kbd> on a row opens it · stomp the bug
        </span>
        <span className="walk-help-touch">▲▲ to fly</span>
        <button type="button" className="walk-close" onClick={onClose} aria-label="Stop playing">
          ✕
        </button>
      </div>

      {over && (
        <div className="walk-ui walk-end" role="dialog" aria-modal="false" aria-label={hud.state === 'won' ? 'You win' : 'Game over'}>
          {hud.state === 'won' ? (
            <>
              <p className="walk-end-title">You win.</p>
              <p className="walk-end-sub">
                All {hud.total} coins, {hud.hearts} {hud.hearts === 1 ? 'heart' : 'hearts'} left. That’s more thorough than most recruiters.
              </p>
            </>
          ) : (
            <>
              <p className="walk-end-title">The bug got you.</p>
              <p className="walk-end-sub">
                {hud.got} of {hud.total} coins. Bugs happen; I fix them for a living.
              </p>
            </>
          )}
          <div className="walk-end-actions">
            <button type="button" className="walk-btn walk-btn-hot" onClick={() => walker.current?.reset()} autoFocus>
              Play again
            </button>
            {hud.state === 'won' && (
              <a className="walk-btn" href={`mailto:${profile.email}?subject=${encodeURIComponent('Beat your website')}`}>
                Say hi
              </a>
            )}
            <button type="button" className="walk-btn" onClick={onClose}>
              Quit
            </button>
          </div>
        </div>
      )}

      {!over && (
        <div className="walk-ui walk-pads">
          <div>
            <Pad action="left" label="Run left" walker={walker}>◀</Pad>
            <Pad action="right" label="Run right" walker={walker}>▶</Pad>
          </div>
          <div>
            <Pad action="down" label="Open row or drop down" walker={walker}>▼</Pad>
            <Pad action="jump" label="Jump, or fly with the jetpack" walker={walker}>▲</Pad>
          </div>
        </div>
      )}
    </>
  );
}
