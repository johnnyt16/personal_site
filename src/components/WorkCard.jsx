import Media from './Media';
import { showMedia } from '../lib/media';
import Rich from './Rich';
import ExternalIcon from './ExternalIcon';

/** Whole card is one link to the case study; the title carries the href. */
export default function WorkCard({ p }) {
  return (
    <li className={`card${showMedia(p.media) ? '' : ' card-text'}`}>
      <Media media={p.media} title={p.title} className="card-media" />
      <div className="card-body">
        <p className="card-meta">
          <Rich text={p.role} /> · {p.period}
        </p>
        <h3 className="card-title">
          <a href={p.href}>
            {p.title}
            <svg className="card-arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </h3>
        <p className="card-outcome">
          <Rich text={p.outcome} />
        </p>
        {p.site && (
          <a className="card-site" href={p.site.href} target="_blank" rel="noreferrer">
            {p.site.label}
            <ExternalIcon />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {p.stack && (
          <ul className="tags" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
