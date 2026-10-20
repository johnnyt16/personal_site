import { profile, sections } from '../data/resume';
import ThemeToggle from './ThemeToggle';

/** Sticky left column on desktop; plain intro block on mobile. */
export default function Sidebar({ active }) {
  return (
    <header className="sidebar">
      <div>
        <h1 className="name">
          <a href="/">{profile.name}</a>
        </h1>
        <p className="positioning">{profile.positioning}</p>

        <p className="proof">
          {profile.proof.map((p, i) => (
            <span key={p.label}>
              {i > 0 && <span className="proof-sep" aria-hidden="true"> · </span>}
              <strong>{p.value}</strong> {p.label}
            </span>
          ))}
        </p>

        <nav className="toc" aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                  <span className="toc-line" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <p className="now">
          <span className="now-label">Now</span>
          {profile.now}
        </p>

        <div className="sidebar-foot">
          <ul className="actions">
            <li>
              <a className="button button-primary" href={`mailto:${profile.email}`}>Email</a>
            </li>
            <li>
              <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <a className="button" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>
              <a className="button" href={profile.resumeUrl}>Resume</a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
