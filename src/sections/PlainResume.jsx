import {
  profile,
  projects,
  earlier,
  skills,
  education,
  freelance,
  isTodo,
} from '../data/resume';
import { Value } from '../components/Todo';

/**
 * The 30-second version. No animation, no cards, no chrome — just every fact
 * on the page in scannable order. This is what the "Skip to plain resume"
 * link jumps to, and what prints.
 */
export default function PlainResume() {
  return (
    <section className="plain" id="plain-resume" aria-label="Plain text resume">
      <div className="wrap">
        <p className="plain-banner">Plain resume &mdash; everything above, without the animation</p>

        <h2>{profile.name}</h2>
        <p>
          <Value of={profile.headline} />
        </p>
        <p>{profile.oneLiner}</p>

        <div className="plain-contact">
          <span>{profile.location}</span>
          {isTodo(profile.email) ? (
            <span>
              Email: <Value of={profile.email} />
            </span>
          ) : (
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          )}
          {isTodo(profile.linkedin) ? (
            <span>
              LinkedIn: <Value of={profile.linkedin} />
            </span>
          ) : (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          <a href={profile.resumeUrl} download>
            Download Resume (PDF)
          </a>
        </div>

        <h3>Selected work</h3>
        {projects.map((p) => (
          <div key={p.id}>
            <h4>
              {p.title} &mdash; <span><Value of={p.meta} /></span>
            </h4>
            <p>{p.summary}</p>
            {p.bullets?.length > 0 && (
              <ul>
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {p.research && (
              <ul>
                <li>
                  {p.research.body} <Value of={p.research.status} />
                </li>
              </ul>
            )}
            {p.lesson && (
              <ul>
                <li>
                  Lesson: <Value of={p.lesson} />
                </li>
              </ul>
            )}
            {p.link && (
              <ul>
                <li>
                  {p.link.href ? (
                    <a href={p.link.href} target="_blank" rel="noreferrer">
                      {p.link.label}
                    </a>
                  ) : (
                    <>
                      {p.link.label} <Value of={p.link.todo} />
                    </>
                  )}
                </li>
              </ul>
            )}
            {p.stack?.length > 0 && <p>Stack: {p.stack.join(', ')}</p>}
          </div>
        ))}

        <h3>Earlier experience</h3>
        {earlier.map((e) => (
          <div key={e.org}>
            <h4>
              {e.role}, {e.org} <span>{e.period}</span>
            </h4>
            <p>{e.detail}</p>
          </div>
        ))}

        <h3>Skills</h3>
        {skills.map((g) => (
          <p key={g.label}>
            <strong>{g.label}:</strong> {g.items.join(', ')}
          </p>
        ))}

        <h3>Education &amp; honors</h3>
        <h4>
          {education.degree}, {education.school} <span>{education.detail}</span>
        </h4>
        <ul>
          {education.honors.map((h) => (
            <li key={h}>{h}</li>
          ))}
          <li>
            Languages:{' '}
            {education.languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && ', '}
                {l.name} {l.level && <Value of={l.level} />}
              </span>
            ))}
          </li>
        </ul>

        <h3>Freelance work</h3>
        <h4>{freelance.name}</h4>
        <p>
          {freelance.body} <Value of={freelance.clients} />
        </p>
      </div>
    </section>
  );
}
