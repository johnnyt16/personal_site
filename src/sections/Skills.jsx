import { skills } from '../data/resume';
import { RenderGroup } from '../components/RenderCard';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2 className="section-title">Skills</h2>
          <span className="section-note">Build &middot; Evaluate &middot; Sell</span>
        </div>

        <RenderGroup className="skills-grid">
          {skills.map((group) => (
            <div className="skill-col" key={group.label} data-render>
              <span className="anno">{group.label}</span>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </RenderGroup>
      </div>
    </section>
  );
}
