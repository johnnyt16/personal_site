import { profile, experience, experienceIntro, education, other, tools, sections } from '../data/resume';
import { projects } from '../data/work';
import Sidebar from '../components/Sidebar';
import WorkCard from '../components/WorkCard';
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

        <Section id="experience" title="Experience">
          <p className="section-lede">{experienceIntro}</p>
          <ul className="entries">
            {experience.map((e) => (
              <li className="entry" key={e.org}>
                <p className="entry-period">{e.period}</p>
                <div>
                  <h3 className="entry-title">
                    {e.role} <span className="entry-org">· {e.org}</span>
                  </h3>
                  <p className="entry-body">{e.result}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education">
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
            <li>Tools: {tools}</li>
          </ul>
        </Section>

        <footer className="footer">
          <p>Set in Source Serif and Inter. Built with React and Vite, hosted on Railway.</p>
        </footer>
      </main>
    </div>
  );
}
