import { useId, useState } from 'react';
import ExternalIcon from './ExternalIcon';

/**
 * One-line row that expands in place: title, role, years, one bolded
 * metric. The panel's content is always in the HTML (for crawlers); when
 * collapsed it's visibility:hidden, so it's out of the tab order and the
 * accessibility tree until opened.
 */
export default function Row({ item }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;

  return (
    <li className={`row${open ? ' is-open' : ''}`}>
      <h3 className="row-head">
        <button type="button" className="row-button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
          <span className="row-title">{item.title}</span>
          <span className="row-role">{item.role}</span>
          <span className="row-metric">{item.metric}</span>
          <span className="row-period">{item.period}</span>
          <svg className="row-chevron" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </h3>

      <div className="row-panel" id={panelId} role="region" aria-label={item.title}>
        <div className="row-panel-inner">
          <p className="row-detail">{item.detail}</p>
          {item.highlights && (
            <ul className="row-highlights">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {item.clients && (
            <p className="row-clients">
              Client sites:{' '}
              {item.clients.map((c, i) => (
                <span key={c.href}>
                  {i > 0 && ', '}
                  <a href={c.href} target="_blank" rel="noreferrer">
                    {c.label}
                  </a>
                </span>
              ))}
            </p>
          )}
          {item.stack && <p className="row-stack">{item.stack}</p>}
          {item.links && (
            <p className="row-links">
              {item.links.map((l) =>
                l.external ? (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                    <ExternalIcon />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a key={l.href} href={l.href}>
                    {l.label} <span aria-hidden="true">→</span>
                  </a>
                )
              )}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
