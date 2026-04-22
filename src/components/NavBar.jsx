import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const links = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="navbar-inner">
            <a href="#hero" className="navbar-brand" onClick={(e) => handleClick(e, '#hero')}>
              JM
            </a>

            <div className="navbar-links">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="navbar-link" onClick={(e) => handleClick(e, l.href)}>
                  {l.label}
                </a>
              ))}
            </div>

            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
              <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="navbar-mobile"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="navbar-mobile-link" onClick={(e) => handleClick(e, l.href)}>
                    {l.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
