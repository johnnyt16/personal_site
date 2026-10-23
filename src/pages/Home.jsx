import { profile, experience, experienceIntro, education, other, tools, sections } from '../data/resume';
import { projects } from '../data/work';
import Sidebar from '../components/Sidebar';
import WorkCard from '../components/WorkCard';
import AccuracyChart from '../components/AccuracyChart';
import { research, accuracy } from '../data/research';
import { moreProjects } from '../data/projects';
import ExternalIcon from '../components/ExternalIcon';
import { useActiveSection } from '../lib/useActiveSection';

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

export default function Home() {
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>
      <Sidebar active={active} />

      <main id="main" className="content">
        <Section id="about" title="About">
          <div className="prose">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="work" title="Selected work">
          <ul className="cards">
            {projects.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </ul>
        </Section>

        <Section id="projects" title="More projects">
          <ul className="projects">
            {moreProjects.map((p) => (
              <li className="project" key={p.title}>
                <p className="card-meta">{p.kind}</p>
                <h3 className="project-title">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer">
                      {p.title}
                      <ExternalIcon />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="project-body">{p.body}</p>
                {p.links && (
                  <p className="project-links">
                    <span>Client sites:</span>
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
                <ul className="tags" aria-label="Stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="research" title="Research">
          <p className="section-lede">{research.summary}</p>
          <ul className="cards">
            <WorkCard p={research.card} />
          </ul>
          {/* The chart joins the home page once it shows real results. */}
          {!accuracy.placeholder && <AccuracyChart compact />}
          {research.paperUrl && (
            <p className="research-links">
              <a className="button" href={research.paperUrl}>Read the paper</a>
            </p>
          )}
        </Section>

        <Section id="experience" title="Experience">
          <p className="section-lede">{experienceIntro}</p>
          <ul className="entries">
            {experience.map((e) => (
              <li className="entry" key={e.org}>
                <p className="entry-period">{e.period}</p>
                <div>
                  <h3 className="entry-title">{e.role}</h3>
                  <p className="entry-role">{e.org}</p>
                  <p className="entry-body">{e.result}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education & more">
          <ul className="entries">
            <li className="entry">
              <p className="entry-period">{education.period}</p>
              <div>
                <h3 className="entry-title">{education.school}</h3>
                <p className="entry-body">{education.degree}</p>
                <p className="entry-body">{education.detail}</p>
              </div>
            </li>
          </ul>
          <ul className="plain-list">
            {other.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="tools">
            <span className="tools-label">Tools</span> {tools}
          </p>
        </Section>

        <footer className="footer">
          <p>
            Set in Source Serif and Inter. Built with React and Vite, hosted on Railway.
            <span className="footer-egg">
              {' '}Press <kbd>`</kbd> for a terminal.
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
}
