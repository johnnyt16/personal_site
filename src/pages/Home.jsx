import { useEffect } from 'react';
import { experience, education, research, sections } from '../data/resume';
import { projects } from '../data/work';
import Sidebar from '../components/Sidebar';
import Row from '../components/Row';
import { useActiveSection } from '../lib/useActiveSection';
import { openTerminal } from '../lib/mode';

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
          {education.map((line) => (
            <p className="edu" key={line}>
              {line}
            </p>
          ))}
        </Section>

        <footer className="footer">
          <span>Source Serif &amp; Inter · React + Vite · Railway</span>
          <button type="button" className="footer-term" onClick={openTerminal} aria-label="Open the terminal">
            ›_
          </button>
        </footer>
      </main>
    </div>
  );
}
