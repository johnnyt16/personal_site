import { projects } from '../data/resume';
import RenderCard from '../components/RenderCard';
import Todo, { Value } from '../components/Todo';
import { ArrowIcon } from '../components/Icons';

function Project({ p }) {
  return (
    <RenderCard>
      <div className="rc-head" data-render>
        <span className="rc-index">{p.index}</span>
        <span className="rc-kind">{p.kind}</span>
        <span className="rc-status">{p.status}</span>
      </div>

      <h3 className="rc-title" data-render>
        {p.title}
      </h3>
      <p className="rc-subtitle" data-render>
        {p.subtitle}
      </p>
      <p className="rc-meta" data-render>
        <Value of={p.meta} />
      </p>

      <p className="rc-summary" data-render>
        {p.summary}
      </p>

      {p.bullets?.length > 0 && (
        <ul className="rc-list" data-render>
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}

      {p.research && (
        <div className="rc-panel" data-render>
          <span className="anno rc-panel-label">{p.research.label}</span>
          <p>{p.research.body}</p>
          <p style={{ marginTop: 8 }}>
            <Value of={p.research.status} />
          </p>
        </div>
      )}

      {p.lesson && (
        <div className="rc-panel" data-render>
          <span className="anno rc-panel-label">Lesson</span>
          <p>
            <Value of={p.lesson} />
          </p>
        </div>
      )}

      {p.stack?.length > 0 && (
        <div className="rc-stack" data-render>
          {p.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      )}

      {p.link && (
        <p data-render>
          {p.link.href ? (
            <a className="rc-link" href={p.link.href} target="_blank" rel="noreferrer">
              {p.link.label} <ArrowIcon />
            </a>
          ) : (
            <span className="anno">
              {p.link.label} <Todo note={p.link.todo.__todo} />
            </span>
          )}
        </p>
      )}
    </RenderCard>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">01</span>
          <h2 className="section-title">Selected work</h2>
          <span className="section-note">{projects.length} projects</span>
        </div>

        {projects.map((p) => (
          <Project key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
