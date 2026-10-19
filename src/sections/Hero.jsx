import { profile, stats } from '../data/resume';
import { CountUp } from '../components/Reveal';
import { DownloadIcon, ArrowRightIcon, PinIcon, MicIcon } from '../components/Icons';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-in" style={{ '--d': 0 }}>
            <span className="pulse" aria-hidden="true" />
            {profile.status}
          </p>

          <h1 className="hero-title hero-in" style={{ '--d': 1 }}>
            {profile.headline[0]}{' '}
            <span className="grad">{profile.headline[1]}</span>
          </h1>

          <p className="hero-intro hero-in" style={{ '--d': 2 }}>
            {profile.intro}
          </p>

          <div className="hero-ctas hero-in" style={{ '--d': 3 }}>
            <a className="btn btn-grad btn-lg" href="#work">
              See my work
              <ArrowRightIcon />
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.resumeUrl} download>
              <DownloadIcon />
              Resume PDF
            </a>
          </div>
        </div>

        <div className="hero-photo hero-in" style={{ '--d': 2 }}>
          <div className="photo-ring">
            <img
              src="/headshot.jpg"
              alt="Johnny McConkie"
              width="960"
              height="1440"
              fetchPriority="high"
            />
          </div>

          <div className="float-chip chip-a">
            <span className="dot-live" aria-hidden="true" />
            <span>
              <strong>BookKeeper AI</strong>
              <small>Live · 3 clients</small>
            </span>
          </div>

          <div className="float-chip chip-b">
            <MicIcon />
            <span>
              <strong>Keynote</strong>
              <small>Insurtech Utah 2025</small>
            </span>
          </div>

          <p className="photo-caption">
            <span className="photo-name">{profile.name}</span>
            <span className="photo-loc">
              <PinIcon /> {profile.location}
            </span>
          </p>
        </div>
      </div>

      <div className="wrap">
        <dl className="stats hero-in" style={{ '--d': 4 }}>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt className="stat-label">{s.label}</dt>
              <dd className="stat-value">
                <CountUp {...s} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
