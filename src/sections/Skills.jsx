import { skills } from '../data/resume';
import Reveal from '../components/Reveal';
import { trackSpotlight } from '../lib/motion';

const marquee = skills.flatMap((g) => g.items);

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker" data-reveal>Skills</p>
          <h2 className="section-title" data-reveal>
            The <span className="grad">toolkit.</span>
          </h2>
        </Reveal>

        <Reveal className="skills-grid">
          {skills.map((g) => (
            <div className="card spot skill-card" key={g.label} onPointerMove={trackSpotlight} data-reveal>
              <h3 className="skill-label">{g.label}</h3>
              <div className="tags">
                {g.items.map((s) => (
                  <span className="tag tag-lg" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
