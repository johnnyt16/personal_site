import { caseStudies } from '../data/case-studies';
import { projects } from '../data/work';
import { profile } from '../data/resume';
import ThemeToggle from '../components/ThemeToggle';
import Media from '../components/Media';
import Diagram from '../components/Diagram';
import Rich from '../components/Rich';

function Paragraphs({ body }) {
  return (Array.isArray(body) ? body : [body]).map((p) => (
    <p key={p}>
      <Rich text={p} />
    </p>
  ));
}

function Block({ s }) {
  return (
    <section className="cs-section">
      <h2>{s.heading}</h2>
      {s.body && <Paragraphs body={s.body} />}
      {s.bullets && (
        <ul className="cs-bullets">
          {s.bullets.map((b) => (
            <li key={b}>
              <Rich text={b} />
            </li>
          ))}
        </ul>
      )}
      {s.subsections?.map((sub) => (
        <div className="cs-sub" key={sub.heading}>
          <h3>{sub.heading}</h3>
          <Paragraphs body={sub.body} />
        </div>
      ))}
      {s.diagram && <Diagram {...s.diagram} />}
    </section>
  );
}

export default function CaseStudy({ slug }) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const project = projects.find((p) => p.slug === slug);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <a href="/#work" className="back">
          <span aria-hidden="true">←</span> {profile.name}
        </a>
        <ThemeToggle />
      </header>

      <main id="main" className="narrow case-study">
        <p className="eyebrow">{cs.eyebrow}</p>
        <h1 className="page-title">{cs.title}</h1>
        <p className="cs-summary">{cs.summary}</p>

        <dl className="facts">
          {cs.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                <Rich text={f.value} />
              </dd>
            </div>
          ))}
        </dl>

        {project && <Media media={project.media} title={cs.title} className="cs-media" />}

        {cs.sections.map((s) => (
          <Block key={s.heading} s={s} />
        ))}

        <nav className="cs-next" aria-label="More work">
          <a href={next.path}>
            <span className="eyebrow">Next</span>
            <span className="cs-next-title">{next.title} →</span>
          </a>
        </nav>

        <footer className="cs-contact">
          <p>Want to talk about this work?</p>
          <a className="button button-primary" href={`mailto:${profile.email}`}>Email me</a>
        </footer>
      </main>
    </>
  );
}
