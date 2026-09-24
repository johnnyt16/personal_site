import { profile, nav } from '../data/resume';
import { DownloadIcon, MailIcon } from './Icons';

/**
 * Always-visible header. The Resume and Contact actions live here so they are
 * on screen without scrolling at every viewport, phones included.
 */
export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#top" className="header-mark">
          JM<span>.</span>
        </a>

        <nav className="header-nav" aria-label="Sections">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary" href={profile.resumeUrl} download>
            <DownloadIcon />
            Resume
          </a>
          <a className="btn" href="#contact">
            <MailIcon />
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
