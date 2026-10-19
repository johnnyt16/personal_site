import { education, beyond, sideBuilds } from '../data/resume';
import Reveal from '../components/Reveal';
import { trackSpotlight } from '../lib/motion';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker" data-reveal>About</p>
          <h2 className="section-title" data-reveal>
            School, service, <span className="grad">and side builds.</span>
          </h2>
        </Reveal>

        <Reveal className="about-grid">
          <article className="card spot edu-card" onPointerMove={trackSpotlight} data-reveal>
            <p className="badge">{education.period}</p>
            <h3 className="edu-school">{education.school}</h3>
            <p className="edu-college">{education.college}</p>
            <p className="edu-degree">{education.degree}</p>
            <p className="edu-minors">{education.minors}</p>

            <div className="edu-gpa">
              <span className="edu-gpa-num grad">3.7</span>
              <span className="edu-gpa-label">Major GPA</span>
            </div>

            <p className="mini-label">Coursework</p>
            <div className="tags">
              {education.coursework.map((c) => (
                <span className="tag" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </article>

          <div className="beyond" data-reveal>
            {beyond.map((b) => (
              <div className="beyond-item" key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="side-grid">
          {sideBuilds.map((s) => (
            <article className="card spot side-card" key={s.title} onPointerMove={trackSpotlight} data-reveal>
              <div className="side-top">
                {s.logo && <img src={s.logo} alt="" width="36" height="36" loading="lazy" />}
                <p className="mini-label">Side build</p>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="tags">
                {s.stack.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
