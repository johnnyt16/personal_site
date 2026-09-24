import { education, freelance } from '../data/resume';
import { RenderGroup } from '../components/RenderCard';
import { Value } from '../components/Todo';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2 className="section-title">Education &amp; honors</h2>
        </div>

        <RenderGroup className="two-col">
          <div data-render>
            <p className="edu-degree">{education.degree}</p>
            <p className="edu-school">{education.school}</p>
            <p className="edu-detail">{education.detail}</p>

            <span className="anno" style={{ display: 'block', marginBottom: 8 }}>
              Languages
            </span>
            <ul className="honor-list">
              {education.languages.map((l) => (
                <li key={l.name}>
                  {l.name} {l.level && <Value of={l.level} />}
                </li>
              ))}
            </ul>
          </div>

          <div data-render>
            <span className="anno" style={{ display: 'block', marginBottom: 10 }}>
              Honors
            </span>
            <ul className="honor-list">
              {education.honors.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </RenderGroup>

        <div style={{ marginTop: 40 }}>
          <RenderGroup>
            <div className="freelance" data-render>
              <span className="anno">Freelance work</span>
              <p className="freelance-name">{freelance.name}</p>
              <p>{freelance.body}</p>
              <p style={{ marginTop: 8 }}>
                <Value of={freelance.clients} />
              </p>
            </div>
          </RenderGroup>
        </div>
      </div>
    </section>
  );
}
