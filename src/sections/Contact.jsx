import { profile, isTodo } from '../data/resume';
import { RenderGroup } from '../components/RenderCard';
import { Value } from '../components/Todo';
import { DownloadIcon, MailIcon, LinkedInIcon } from '../components/Icons';

export default function Contact() {
  const emailIsTodo = isTodo(profile.email);
  const linkedinIsTodo = isTodo(profile.linkedin);

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">05</span>
          <h2 className="section-title">Contact</h2>
        </div>

        <RenderGroup>
          <p className="contact-lead" data-render>
            Let&rsquo;s talk.
          </p>
          <p className="contact-sub" data-render>
            I&rsquo;m looking for a strategic projects or technical operations role where
            building and owning the outcome are the same job.
          </p>

          <div className="contact-actions" data-render>
            <a className="btn btn-primary btn-lg" href={profile.resumeUrl} download>
              <DownloadIcon />
              Download Resume (PDF)
            </a>

            {emailIsTodo ? (
              <span className="btn btn-lg" style={{ cursor: 'default' }}>
                <MailIcon />
                <Value of={profile.email} />
              </span>
            ) : (
              <a className="btn btn-lg" href={`mailto:${profile.email}`}>
                <MailIcon />
                {profile.email}
              </a>
            )}

            {linkedinIsTodo ? (
              <span className="btn btn-lg" style={{ cursor: 'default' }}>
                <LinkedInIcon />
                <Value of={profile.linkedin} />
              </span>
            ) : (
              <a className="btn btn-lg" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon />
                LinkedIn
              </a>
            )}
          </div>
        </RenderGroup>
      </div>
    </section>
  );
}
