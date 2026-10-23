import { useEffect, useRef, useState } from 'react';
import { BOOT, COMMANDS, ALIASES, COMMAND_NAMES, NEOFETCH_ART, NEOFETCH_INFO, completions } from './commands';
import './play.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PROMPT = 'guest@mcconkie:~$';

/** Split "classify \"HOME DEPOT #44\"" into ['classify', 'HOME DEPOT #44']. */
function parse(input) {
  return (input.match(/"[^"]*"|'[^']*'|\S+/g) || []).map((t) => t.replace(/^["']|["']$/g, ''));
}

function Segment({ s }) {
  if (typeof s === 'string') return s;
  const cls = s.cls ? `t-${s.cls}` : undefined;
  if (s.href) {
    const external = /^(https?:|mailto:)/.test(s.href) || s.href.endsWith('.pdf');
    return (
      <a className={cls} href={s.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {s.text}
      </a>
    );
  }
  return <span className={cls}>{s.text}</span>;
}

function Neofetch() {
  return (
    <div className="nf">
      <pre className="nf-art" aria-hidden="true">
        {NEOFETCH_ART.join('\n')}
      </pre>
      <div className="nf-info">
        <p>
          <span className="t-lime t-bold">guest</span>
          <span className="t-dim">@</span>
          <span className="t-pink t-bold">mcconkie</span>
        </p>
        <p className="t-dim">{'─'.repeat(22)}</p>
        {NEOFETCH_INFO.map(([k, v]) => (
          <p key={k}>
            <span className="t-cyan t-bold">{k.padEnd(10)}</span>
            {v}
          </p>
        ))}
        <p className="nf-swatches" aria-hidden="true">
          {['pink', 'lime', 'cyan', 'violet', 'amber'].map((c) => (
            <span key={c} className={`sw sw-${c}`} />
          ))}
        </p>
      </div>
    </div>
  );
}

function Line({ line }) {
  if (line.block === 'neofetch') return <Neofetch />;
  if (line.cmd !== undefined) {
    return (
      <p className="term-line">
        <span className="t-lime">{PROMPT}</span> {line.cmd}
      </p>
    );
  }
  const segs = Array.isArray(line.segs) ? line.segs : [line.segs];
  return (
    <p className="term-line">
      {segs.map((s, i) => (
        <Segment key={i} s={s} />
      ))}
    </p>
  );
}

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(true);
  const [history, setHistory] = useState([]);
  const histIdx = useRef(-1);
  const inputRef = useRef(null);
  const screenRef = useRef(null);
  const nextId = useRef(0);
  const closing = useRef(false);
  const fast = useRef(reducedMotion());

  const sleep = (ms) => new Promise((r) => setTimeout(r, fast.current ? 0 : ms));
  const push = (line) => setLines((ls) => [...ls, { id: nextId.current++, ...line }]);

  const io = {
    print: async (l, delay = 28) => {
      await sleep(delay);
      if (closing.current) return;
      push(l && l.block ? l : { segs: l });
    },
    sleep,
    clear: () => setLines([]),
    close: () => {
      closing.current = true;
      onClose();
    },
    history,
  };

  // Boot sequence. Any key skips the animation.
  useEffect(() => {
    let live = true;
    const skip = () => (fast.current = true);
    window.addEventListener('keydown', skip, { once: true });
    (async () => {
      for (const l of BOOT) {
        await sleep(l === '' ? 60 : 140);
        if (!live) return;
        push({ segs: l });
      }
      setBusy(false);
    })();
    return () => {
      live = false;
      window.removeEventListener('keydown', skip);
    };
  }, []);

  useEffect(() => {
    screenRef.current?.scrollTo({ top: screenRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  // Keep focus inside the dialog; Escape closes.
  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      prev?.focus?.();
    };
  }, [onClose]);

  async function run(raw) {
    const text = raw.trim();
    push({ cmd: raw });
    if (!text) return;
    setHistory((h) => [...h, text]);
    histIdx.current = -1;

    const [name, ...args] = parse(text);
    const key = ALIASES[name.toLowerCase()] ?? name.toLowerCase();
    const cmd = COMMANDS[key];
    if (!cmd) {
      push({ segs: [{ text: `zsh: command not found: ${name}. `, cls: 'err' }, { text: 'try ', cls: 'dim' }, { text: 'help', cls: 'lime' }] });
      return;
    }
    setBusy(true);
    try {
      await cmd(args, { ...io, history: [...history, text] });
    } catch (err) {
      push({ segs: [{ text: `error: ${err.message}`, cls: 'err' }] });
    }
    if (!closing.current) setBusy(false);
  }

  function complete() {
    const parts = input.split(' ');
    if (parts.length === 1) {
      const hits = COMMAND_NAMES.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (hits.length === 1) setInput(`${hits[0]} `);
      else if (hits.length > 1) push({ segs: [{ text: hits.join('  '), cls: 'dim' }] });
      return;
    }
    const cmd = ALIASES[parts[0]] === 'open' ? 'open' : parts[0];
    const rest = parts.slice(1).join(' ').toLowerCase();
    const hits = completions(cmd).filter((c) => c.startsWith(rest));
    if (hits.length === 1) setInput(`${parts[0]} ${hits[0]}`);
    else if (hits.length > 1) push({ segs: [{ text: hits.join('  '), cls: 'dim' }] });
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (busy) return;
      const v = input;
      setInput('');
      run(v);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (!history.length) return;
      const up = e.key === 'ArrowUp';
      let i = histIdx.current === -1 ? history.length : histIdx.current;
      i = Math.min(history.length, Math.max(0, i + (up ? -1 : 1)));
      histIdx.current = i === history.length ? -1 : i;
      setInput(i === history.length ? '' : history[i]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === '`') {
      // Same key that opened it closes it.
      e.preventDefault();
      onClose();
    }
  }

  return (
    <div className="term-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="term" role="dialog" aria-modal="true" aria-label="Terminal">
        <div className="term-bar">
          <button type="button" className="term-dot term-dot-close" onClick={onClose} aria-label="Close terminal" />
          <span className="term-dot term-dot-min" aria-hidden="true" />
          <span className="term-dot term-dot-max" aria-hidden="true" />
          <span className="term-title">guest@mcconkie: ~</span>
        </div>

        <div className="term-screen" ref={screenRef} onClick={() => inputRef.current?.focus()}>
          <div role="log" aria-live="polite">
            {lines.map((l) => (
              <Line key={l.id} line={l} />
            ))}
          </div>

          <label className="term-input-row">
            <span className="t-lime">{PROMPT}</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              disabled={busy}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
