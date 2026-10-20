import { profile, work, experience, education, other, tools, sections } from '../data/resume';
import Sidebar from '../components/Sidebar';
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

function Entry({ e }) {
  return (
    <li className="entry">
      <p className="entry-period">{e.period}</p>
      <div>
        <h3 className="entry-title">{e.title}</h3>
        <p className="entry-role">{e.role}</p>
        <p className="entry-body">{e.body}</p>
        {e.stack && <p className="entry-stack">{e.stack}</p>}
      </div>
    </li>
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
            {profile.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="work" title="Work">
          <ul className="entries">
            {work.map((e) => (
              <Entry key={e.title} e={e} />
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ul className="entries">
            {experience.map((e) => (
              <Entry key={e.title} e={e} />
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education">
          <ul className="entries">
            <Entry e={education} />
          </ul>
          <ul className="plain-list">
            {other.map((o) => (
              <li key={o}>{o}</li>
            ))}
            <li>Tools: {tools}</li>
          </ul>
        </Section>

        <footer className="footer">
          <p>
            Set in Source Serif and Inter. Built with React and Vite, hosted on Railway.
          </p>
        </footer>
      </main>
    </div>
  );
}
