import { profile, isTodo } from '../data/resume';
import { Value } from '../components/Todo';
import HeroVisual from '../components/HeroVisual';
import { DownloadIcon, MailIcon, LinkedInIcon, PinIcon } from '../components/Icons';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <span className="hero-corner tl" aria-hidden="true" />
      <span className="hero-corner tr" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div>
          <p className="hero-tag anno">Strategic projects &middot; Technical operations</p>

          <h1 className="hero-name">{profile.name}</h1>

          <p className="hero-headline">
            <Value of={profile.headline} />
          </p>

          <p className="hero-oneliner">{profile.oneLiner}</p>

          <div className="hero-meta">
            <span className="anno" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <PinIcon />
              {profile.location}
            </span>
            {isTodo(profile.linkedin) ? (
              <span className="anno">
                LinkedIn <Value of={profile.linkedin} />
              </span>
            ) : (
              <a className="rc-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon /> LinkedIn
              </a>
            )}
          </div>

          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg" href={profile.resumeUrl} download>
              <DownloadIcon />
              Download Resume (PDF)
            </a>
            <a className="btn btn-lg" href="#contact">
              <MailIcon />
              Contact
            </a>
          </div>

          <p className="hero-todo-note">
            <Value of={profile.resumeTodo} />
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
