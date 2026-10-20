import { useRef, useState } from 'react';
import { classifyTransaction, isMock, MAX_LENGTH, AUTO_APPROVE } from '../lib/classify';

const EXAMPLES = ['HOME DEPOT #4407', 'SQ *BLUE COPPER COFFEE PROVO UT', 'DELTA AIR 0067', 'ADOBE *CREATIVE CLOUD', 'CHECK 1043', 'XYZ HOLDINGS LLC'];

const STEPS = [
  { id: 'ambiguous', label: 'Pre-filter' },
  { id: 'history', label: 'History' },
  { id: 'model', label: 'Model' },
  { id: 'review', label: 'Review' },
];

/** Which pipeline steps a result passed through, for the step strip. */
function path(r) {
  if (r.method === 'ambiguous') return ['ambiguous', 'review'];
  if (r.method === 'history') return ['ambiguous', 'history'];
  return r.needsReview ? ['ambiguous', 'history', 'model', 'review'] : ['ambiguous', 'history', 'model'];
}

export default function ClassifyDemo() {
  const [text, setText] = useState('');
  const [state, setState] = useState({ status: 'idle' });
  const controller = useRef(null);

  async function run(value) {
    controller.current?.abort();
    const c = new AbortController();
    controller.current = c;
    setState({ status: 'loading' });
    try {
      const result = await classifyTransaction(value, { signal: c.signal });
      setState({ status: 'done', result });
    } catch (err) {
      if (err.name !== 'AbortError') setState({ status: 'error', message: err.message });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    run(text);
  }

  function pickExample(ex) {
    setText(ex);
    run(ex);
  }

  const r = state.result;
  const visited = r ? path(r) : [];
  const stopped = visited.at(-1);

  return (
    <div className="demo">
      <form onSubmit={onSubmit} className="demo-form">
        <label htmlFor="txn" className="demo-label">
          Bank transaction description
        </label>
        <div className="demo-row">
          <input
            id="txn"
            className="demo-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_LENGTH}
            placeholder="e.g. SQ *BLUE COPPER COFFEE PROVO UT"
            autoComplete="off"
            spellCheck="false"
          />
          <button className="button button-primary" type="submit" disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Categorizing…' : 'Categorize'}
          </button>
        </div>
      </form>

      <div className="demo-examples">
        <span>Try:</span>
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" className="demo-chip" onClick={() => pickExample(ex)}>
            {ex}
          </button>
        ))}
      </div>

      <div className="demo-result" aria-live="polite">
        {state.status === 'done' && (
          <>
            <ol className="demo-steps" aria-label="Pipeline path">
              {STEPS.map((s) => (
                <li
                  key={s.id}
                  className={visited.includes(s.id) ? (s.id === stopped ? 'is-stop' : 'is-passed') : undefined}
                >
                  {s.label}
                </li>
              ))}
            </ol>
            {r.line && <p className="demo-line">Schedule C line {r.line}</p>}
            <p className="demo-category">{r.category}</p>
            {r.method !== 'ambiguous' && (
              <p className="demo-confidence">
                Confidence {Math.round(r.confidence * 100)}%
                <span className="demo-bar" aria-hidden="true">
                  <span style={{ width: `${Math.round(r.confidence * 100)}%` }} />
                  <i style={{ left: `${AUTO_APPROVE * 100}%` }} />
                </span>
                <span className={`demo-verdict${r.needsReview ? ' is-review' : ''}`}>
                  {r.needsReview ? 'Sent to review' : 'Auto-approved'}
                </span>
              </p>
            )}
            <p className="demo-rationale">{r.rationale}</p>
          </>
        )}
        {state.status === 'error' && <p className="demo-error">{state.message}</p>}
        {state.status === 'idle' && <p className="demo-hint">Results appear here, with the path the transaction took.</p>}
        {state.status === 'loading' && <p className="demo-hint">Categorizing…</p>}
      </div>

      {isMock && (
        <p className="demo-note">
          Demo mode: a small pretend history and keyword rules in your browser stand in for the client database and the
          model. Auto-approve threshold: {Math.round(AUTO_APPROVE * 100)}%.
        </p>
      )}
    </div>
  );
}
