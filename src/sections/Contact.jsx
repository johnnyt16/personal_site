import { profile } from '../data/resume';
import Reveal from '../components/Reveal';
import { DownloadIcon, MailIcon, LinkedInIcon, ArrowIcon } from '../components/Icons';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal className="contact-card">
          <div className="contact-glow" aria-hidden="true" />
          <p className="kicker" data-reveal>Contact</p>
          <h2 className="contact-title" data-reveal>
            Let&rsquo;s build <span className="grad">something.</span>
          </h2>
          <p className="contact-sub" data-reveal>
            I graduate in December 2026 and I&rsquo;m looking for a role where building the
            product and owning the outcome are the same job. The fastest way to reach me is email.
          </p>

          <a className="contact-email" href={`mailto:${profile.email}`} data-reveal>
            {profile.email}
            <ArrowIcon />
          </a>

          <div className="contact-actions" data-reveal>
            <a className="btn btn-grad btn-lg" href={`mailto:${profile.email}`}>
              <MailIcon />
              Email me
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon />
              LinkedIn
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.resumeUrl} download>
              <DownloadIcon />
              Resume PDF
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
