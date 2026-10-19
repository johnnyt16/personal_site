import { useEffect, useState } from 'react';
import { profile, nav } from '../data/resume';
import { DownloadIcon } from './Icons';

/** Floating pill nav. Tightens up once the page scrolls. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-pill">
        <a href="#top" className="header-mark" aria-label="Back to top">
          <span className="header-mono">JM</span>
        </a>

        <nav className="header-nav" aria-label="Sections">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn-sm btn-light" href={profile.resumeUrl} download>
          <DownloadIcon />
          Resume
        </a>
      </div>
    </header>
  );
}
