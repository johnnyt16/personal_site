import Media from './Media';
import Rich from './Rich';

/** Whole card is one link to the case study; the title carries the href. */
export default function WorkCard({ p }) {
  return (
    <li className="card">
      <Media media={p.media} title={p.title} className="card-media" />
      <div className="card-body">
        <p className="card-meta">
          <Rich text={p.role} /> · {p.period}
        </p>
        <h3 className="card-title">
          <a href={p.href}>
            {p.title}
            <svg className="card-arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 11L11 5M6 5h5v5" />
            </svg>
          </a>
        </h3>
        <p className="card-outcome">
          <Rich text={p.outcome} />
        </p>
        <ul className="tags" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
