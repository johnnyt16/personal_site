import { ventures } from '../data/resume';
import Reveal from '../components/Reveal';
import { trackSpotlight } from '../lib/motion';

function Venture({ v }) {
  return (
    <article
      className={`card spot venture v-${v.id}${v.featured ? ' is-featured' : ''}`}
      onPointerMove={trackSpotlight}
      data-reveal
    >
      <div className="venture-top">
        {v.logo ? (
          <img className="venture-logo" src={v.logo} alt={v.title} loading="lazy" />
        ) : (
          <h3 className="venture-name">{v.title}</h3>
        )}
        <span className={`badge${v.live ? ' badge-live' : ''}`}>
          {v.live && <span className="dot-live" aria-hidden="true" />}
          {v.status}
        </span>
      </div>

      {v.logo && <h3 className="sr-only">{v.title}</h3>}

      <p className="venture-role">
        {v.role} <span>·</span> {v.period}
      </p>

      <p className="venture-tagline">{v.tagline}</p>
      <p className="venture-summary">{v.summary}</p>

      {v.highlights && (
        <ul className="venture-highlights">
          {v.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      <div className="tags">
        {v.stack.map((s) => (
          <span className="tag" key={s}>
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="kicker" data-reveal>Selected work</p>
          <h2 className="section-title" data-reveal>
            Things I&rsquo;ve <span className="grad">built and shipped.</span>
          </h2>
          <p className="section-sub" data-reveal>
            Two startups, a live AI product, and research on how language models handle
            real business data. I wrote the code and I sat in the sales meetings.
          </p>
        </Reveal>

        <Reveal className="bento">
          {ventures.map((v) => (
            <Venture key={v.id} v={v} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
