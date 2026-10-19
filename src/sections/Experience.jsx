import { experience } from '../data/resume';
import Reveal from '../components/Reveal';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap split">
        <Reveal className="section-head sticky-head">
          <p className="kicker" data-reveal>Experience</p>
          <h2 className="section-title" data-reveal>
            Sales floors, job sites, <span className="grad">and SQL.</span>
          </h2>
          <p className="section-sub" data-reveal>
            Before and alongside the startups: closing deals, running projects, and
            automating the boring parts.
          </p>
        </Reveal>

        <Reveal as="ol" className="timeline">
          {experience.map((e) => (
            <li className="tl-item" key={e.org} data-reveal>
              <span className="tl-dot" aria-hidden="true" />
              <p className="tl-period">{e.period}</p>
              <h3 className="tl-role">{e.role}</h3>
              <p className="tl-org">{e.org}</p>
              <ul className="tl-points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
