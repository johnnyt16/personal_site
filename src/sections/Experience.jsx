import { earlier } from '../data/resume';
import { RenderGroup } from '../components/RenderCard';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2 className="section-title">Earlier experience</h2>
          <span className="section-note">2023 &ndash; 2025</span>
        </div>

        <RenderGroup className="timeline">
          {earlier.map((e) => (
            <div className="tl-item" key={e.org} data-render>
              <p className="tl-role">
                {e.role} &middot; <span className="tl-org">{e.org}</span>
              </p>
              <p className="tl-period">{e.period}</p>
              <p className="tl-detail">{e.detail}</p>
            </div>
          ))}
        </RenderGroup>
      </div>
    </section>
  );
}
