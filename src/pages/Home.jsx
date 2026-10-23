import { useEffect } from 'react';
import { experience, education, research, life, sections } from '../data/resume';
import { projects } from '../data/work';
import { sideProjects } from '../data/projects';
import ExternalIcon from '../components/ExternalIcon';
import Sidebar from '../components/Sidebar';
import Row from '../components/Row';
import { useActiveSection } from '../lib/useActiveSection';
import { openTerminal, startWalk } from '../lib/mode';

function Section({ id, title, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <h2 className="section-title" id={`${id}-title`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Fade sections in as they scroll into view. The inline script in
 * index.html only arms this (html.reveal) when motion is allowed, and
 * disarms it if this bundle never runs, so content can't stay hidden.
 */
function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('reveal')) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -10% 0px' }
    );
    document.querySelectorAll('.section').forEach((s) => io.observe(s));
    root.classList.add('reveal-ready');
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  const active = useActiveSection(sections.map((s) => s.id));
  useReveal();

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>
      <Sidebar active={active} />

      <main id="main" className="content">
        <Section id="work" title="Work">
          <ul className="rows">
            {projects.map((p) => (
              <Row key={p.slug} item={p} />
            ))}
          </ul>
        </Section>

        <Section id="projects" title="Projects">
          <ul className="rows">
            {sideProjects.map((p) => (
              <Row key={p.slug} item={p} />
            ))}
          </ul>
        </Section>

        <Section id="research" title="Research">
          <ul className="rows">
            <Row item={research} />
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ul className="rows">
            {experience.map((e) => (
              <Row key={e.slug} item={e} />
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education">
          <div className="edu">
            <h3 className="edu-school">
              {education.school}
              <span className="row-period">{education.period}</span>
            </h3>
            <p className="edu-degree">{education.college}</p>
            <p className="edu-degree">{education.degree}</p>
            <dl className="edu-list">
              <div>
                <dt>Honors</dt>
                <dd>{education.honors.join(' · ')}</dd>
              </div>
              <div>
                <dt>Coursework</dt>
                <dd>{education.coursework.join(' · ')}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section id="life" title="Off the clock">
          <ul className="life">
            {life.map((l) => (
              <li key={l.text}>
                {l.text}
                {l.link && (
                  <>
                    {' '}
                    <a href={l.link.href} target="_blank" rel="noreferrer">
                      {l.link.label}
                      <ExternalIcon />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <footer className="footer">
          <span>Source Serif &amp; Inter · React + Vite · Railway</span>
          <span className="footer-eggs">
            <button type="button" className="footer-term" onClick={startWalk} aria-label="Play a little platformer on this page" title="Run around">
              <svg viewBox="0 0 10 14" width="12" height="17" aria-hidden="true" shapeRendering="crispEdges">
                <path d="M3 0h4v1h1v1h2v1H2V1h1zM2 3h6v3H3V5H2zM3 6h4v1H3zM2 7h6v3H2zM3 10h4v1H3zM3 11h1v2H3zM6 11h1v2H6zM2 13h2v1H2zM6 13h2v1H6z" fill="currentColor" />
              </svg>
            </button>
            <button type="button" className="footer-term" onClick={openTerminal} aria-label="Open the terminal" title="Terminal">
              ›_
            </button>
          </span>
        </footer>
      </main>
    </div>
  );
}
