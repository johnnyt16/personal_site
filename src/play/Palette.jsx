import { useEffect, useMemo, useRef, useState } from 'react';
import { profile, sections } from '../data/resume';
import { caseStudies } from '../data/case-studies';
import { urlFor } from '../routes';
import { effectiveTheme, enterPlay, exitPlay, isPlay, openTerminal, setTheme, startWalk } from '../lib/mode';
import './palette.css';

const onHome = () => window.location.pathname === '/';

function jump(id) {
  if (onHome()) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.location.href = `/#${id}`;
}

function buildItems(flash) {
  return [
    ...sections.map((s) => ({ group: 'Jump to', label: s.label, run: () => jump(s.id) })),
    { group: 'Jump to', label: 'Education', run: () => jump('education') },
    ...caseStudies.map((cs) => ({
      group: 'Read',
      label: cs.slug === 'llm-classification' ? 'Research study' : `${cs.title} case study`,
      keywords: cs.slug,
      run: () => (window.location.href = urlFor(cs.path)),
    })),
    {
      group: 'Contact',
      label: 'Copy email address',
      hint: profile.email,
      keep: true,
      run: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          flash('Copied to clipboard');
        } catch {
          flash(profile.email);
        }
      },
    },
    { group: 'Contact', label: 'Send an email', run: () => (window.location.href = `mailto:${profile.email}`) },
    { group: 'Contact', label: 'Open resume (PDF)', keywords: 'cv', run: () => window.open(profile.resumeUrl, '_blank', 'noopener') },
    { group: 'Contact', label: 'LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    { group: 'Contact', label: 'GitHub', run: () => window.open(profile.github, '_blank', 'noopener') },
    {
      group: 'Fun',
      label: 'Toggle dark mode',
      keywords: 'theme light',
      run: () => (isPlay() ? exitPlay(effectiveTheme()) : setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark')),
    },
    { group: 'Fun', label: 'Play mode', keywords: 'gravity physics', run: () => !isPlay() && enterPlay() },
    { group: 'Fun', label: 'Run around the page', keywords: 'game play walk jump mario', run: startWalk },
    { group: 'Fun', label: 'Open terminal', keywords: 'console shell', run: openTerminal },
  ];
}

/** Every query character must appear in order; earlier, tighter matches rank higher. */
function score(item, q) {
  if (!q) return 1;
  const hay = `${item.label} ${item.keywords ?? ''} ${item.group}`.toLowerCase();
  if (hay.includes(q)) return 100 - hay.indexOf(q);
  let i = 0;
  let gaps = 0;
  for (const ch of q) {
    const j = hay.indexOf(ch, i);
    if (j === -1) return 0;
    gaps += j - i;
    i = j + 1;
  }
  return Math.max(1, 50 - gaps);
}

export default function Palette({ onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const input = useRef(null);
  const list = useRef(null);

  const items = useMemo(() => buildItems(setToast), []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((it) => ({ it, s: score(it, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => (q ? b.s - a.s : 0))
      .map((r) => r.it);
  }, [items, query]);

  useEffect(() => {
    const prev = document.activeElement;
    input.current?.focus();
    return () => prev?.focus?.();
  }, []);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  function choose(item) {
    item.run();
    if (!item.keep) onClose();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  }

  return (
    <div className="pal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command menu">
        <input
          ref={input}
          className="pal-input"
          placeholder="Type a command or search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="pal-list"
          aria-activedescendant={results[active] ? `pal-${active}` : undefined}
          autoComplete="off"
          spellCheck="false"
        />
        <ul className="pal-list" id="pal-list" role="listbox" ref={list}>
          {results.length === 0 && <li className="pal-empty">No matches.</li>}
          {results.map((it, i) => {
            const header = !query && it.group !== results[i - 1]?.group ? it.group : null;
            return (
              <li key={`${it.group}-${it.label}`} role="presentation">
                {header && <p className="pal-group">{header}</p>}
                <div
                  id={`pal-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === active}
                  className={`pal-item${i === active ? ' is-active' : ''}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(it)}
                >
                  <span>{it.label}</span>
                  {it.hint && <span className="pal-hint">{it.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="pal-foot" aria-live="polite">
          {toast || (
            <>
              <kbd>↑</kbd>
              <kbd>↓</kbd> to move · <kbd>↵</kbd> to run · <kbd>esc</kbd> to close
            </>
          )}
        </p>
      </div>
    </div>
  );
}
