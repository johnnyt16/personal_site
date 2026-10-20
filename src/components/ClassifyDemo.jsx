import { useRef, useState } from 'react';
import { classifyTransaction, isMock, MAX_LENGTH } from '../lib/classify';

const EXAMPLES = ['SQ *BLUE COPPER COFFEE PROVO UT', 'ADOBE *CREATIVE CLOUD', 'GOOGLE *ADS8443', 'HOME DEPOT #4407', 'UPWORK ESCROW INC', 'CHECKCARD 0412 XYZ LLC'];

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
            <p className="demo-line">Schedule C line {r.line}</p>
            <p className="demo-category">{r.category}</p>
            <p className="demo-confidence">
              Confidence {Math.round(r.confidence * 100)}%
              <span className="demo-bar" aria-hidden="true">
                <span style={{ width: `${Math.round(r.confidence * 100)}%` }} />
              </span>
            </p>
            <p className="demo-rationale">{r.rationale}</p>
          </>
        )}
        {state.status === 'error' && <p className="demo-error">{state.message}</p>}
        {state.status === 'idle' && <p className="demo-hint">Results appear here.</p>}
      </div>

      {isMock && (
        <p className="demo-note">
          Demo mode: answers come from simple keyword rules in your browser, not the production model.
        </p>
      )}
    </div>
  );
}
