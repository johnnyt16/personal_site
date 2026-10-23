import { useRef } from 'react';
import { profile, sections } from '../data/resume';
import github from '../data/github.json';
import ThemeToggle from './ThemeToggle';
import ExternalIcon from './ExternalIcon';
import { MailIcon, LinkedInIcon, GitHubIcon, FileIcon } from './Icons';
import { openTerminal } from '../lib/mode';

const contacts = [
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', href: profile.github, Icon: GitHubIcon, external: true },
  { label: 'Resume (PDF)', href: profile.resumeUrl, Icon: FileIcon },
];

/** Sticky left column on desktop; a compact intro block on phones. */
export default function Sidebar({ active }) {
  // Easter egg for touch devices: tap the name five times for the terminal.
  const taps = useRef([]);
  function onNameTap() {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 1500), now];
    if (taps.current.length >= 5) {
      taps.current = [];
      openTerminal();
    }
  }

  return (
    <header className="sidebar">
      <div>
        <h1 className="name" onClick={onNameTap}>
          {profile.name}
        </h1>
        <p className="line">{profile.line}</p>
        <p className="intro">{profile.intro}</p>
        <p className="status">
          <span className="status-dot" aria-hidden="true" />
          {profile.status}
        </p>
        <p className="gh">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <span className="num">{github.contributions.toLocaleString('en-US')}</span> GitHub contributions in the last year
            <ExternalIcon />
          </a>
        </p>

        <nav className="toc" aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                  <span className="toc-line" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-foot">
        <ul className="contact">
          {contacts.map((c) => {
            const Icon = c.Icon;
            return (
              <li key={c.label}>
                <a
                  className="icon-button"
                  href={c.href}
                  aria-label={c.label}
                  title={c.label}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Icon />
                </a>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
        </ul>
        <p className="kbd-hint">
          <button type="button" className="kbd-link" onClick={() => window.dispatchEvent(new Event('site:palette'))}>
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </button>{' '}
          to jump around ·{' '}
          <button type="button" className="kbd-link" onClick={openTerminal}>
            <kbd>`</kbd>
          </button>{' '}
          for a terminal
        </p>
      </div>
    </header>
  );
}
