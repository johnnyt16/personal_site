import { profile, work, experience, education, other, tools } from './data/resume';

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

function Section({ title, children }) {
  return (
    <section className="section" aria-labelledby={title.toLowerCase()}>
      <h2 className="section-title" id={title.toLowerCase()}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <main className="page">
      <header className="intro">
        <h1 className="name">{profile.name}</h1>
        {profile.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.resumeUrl}>Resume (PDF)</a>
        </p>
      </header>

      <Section title="Work">
        <ul className="entries">
          {work.map((e) => (
            <Entry key={e.title} e={e} />
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="entries">
          {experience.map((e) => (
            <Entry key={e.title} e={e} />
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="entries">
          <Entry e={education} />
        </ul>
      </Section>

      <Section title="Other">
        <ul className="plain-list">
          {other.map((o) => (
            <li key={o}>{o}</li>
          ))}
          <li>Tools: {tools}</li>
        </ul>
      </Section>

      <footer className="footer">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </main>
  );
}
