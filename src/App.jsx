import { motion } from 'motion/react';
import Aurora from './components/Aurora';
import TextType from './components/TextType';
import DecryptedText from './components/DecryptedText';
import ShinyText from './components/ShinyText';
import SpotlightCard from './components/SpotlightCard';
import ScrollVelocity from './components/ScrollVelocity';
import AnimatedContent from './components/AnimatedContent';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

function App() {
  return (
    <>
      <Aurora />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-inner">
            <motion.p
              className="hero-name"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="hero-name-text">Johnny McConkie</span>
              <span className="hero-name-dot">&middot;</span>
              <span className="hero-name-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Salt Lake City
              </span>
            </motion.p>

            <motion.div
              className="hero-typing-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <TextType
                text={[
                  "I build systems that replace the ones nobody wants to touch.",
                  "I ship production software to real businesses.",
                  "I solve problems in boring, regulated industries.",
                  "I architect enterprise infrastructure from scratch."
                ]}
                className="hero-tagline"
                typingSpeed={40}
                deletingSpeed={25}
                pauseDuration={2000}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                cursorClassName="hero-cursor"
              />
            </motion.div>

            <motion.div
              className="hero-bio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.33, 1, 0.68, 1] }}
            >
              <p>
                Cofounder at Voley. I build and ship production software, work directly with
                customers, and spend most of my time turning messy problems into working systems.
              </p>
            </motion.div>

            <motion.div
              className="hero-scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Scroll Velocity Marquee ── */}
        <div className="marquee-section">
          <ScrollVelocity
            texts={['SHIP FAST \u00b7 BUILD SYSTEMS \u00b7 SOLVE HARD PROBLEMS \u00b7 REPLACE LEGACY SYSTEMS \u00b7 OWN OUTCOMES \u00b7']}
            velocity={40}
            className="marquee-text"
          />
        </div>

        {/* ── What I've Built ── */}
        <section className="content-section">
          <AnimatedContent distance={60} duration={0.7}>
            <div className="section-label">
              <span>What I've Built Recently</span>
            </div>
          </AnimatedContent>

          <div className="projects-grid">
            <AnimatedContent distance={60} duration={0.7} delay={0.1}>
              <SpotlightCard className="project-card card-voley" spotlightColor="rgba(74, 144, 226, 0.12)">
                <div className="project-content">
                  <div className="project-header">
                    <img src="/voley-logo.png" alt="Voley" className="project-logo" />
                    <div className="project-header-right">
                      <span className="project-tag tag-voley">Active</span>
                      <a href="https://letsvoley.com" target="_blank" rel="noopener noreferrer" className="project-visit-btn">
                        Visit <ArrowUpRightIcon />
                      </a>
                    </div>
                  </div>
                  <p className="project-desc">
                    Enterprise VOIP, SMS, and team messaging platform for insurance agencies.
                  </p>
                  <ul className="project-details">
                    <li>Designed and implemented the core real-time messaging architecture</li>
                    <li>Built backend systems, WebSocket layer, and telephony integrations from scratch</li>
                    <li>Deployed to paying agencies, replacing decades-old phone systems</li>
                    <li>Own the product end-to-end: infrastructure, shipping, and customer onboarding</li>
                  </ul>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            <AnimatedContent distance={60} duration={0.7} delay={0.2}>
              <SpotlightCard className="project-card card-attendease" spotlightColor="rgba(245, 146, 27, 0.10)">
                <div className="project-content">
                  <div className="project-header">
                    <img src="/attendease-logo.png" alt="AttendEase" className="project-logo" />
                    <div className="project-header-right">
                      <span className="project-tag tag-attendease">Deployed</span>
                      <a href="https://attend-ease.com" target="_blank" rel="noopener noreferrer" className="project-visit-btn">
                        Visit <ArrowUpRightIcon />
                      </a>
                    </div>
                  </div>
                  <p className="project-desc">
                    Automated attendance and security software for private K-12 schools.
                  </p>
                  <ul className="project-details">
                    <li>Led system architecture and full-stack development from concept to production</li>
                    <li>Deployed in live school environments processing hundreds of check-ins daily</li>
                    <li>Designed with FERPA and real-world operational constraints from day one</li>
                  </ul>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            <AnimatedContent distance={60} duration={0.7} delay={0.3}>
              <SpotlightCard className="project-card card-junzi" spotlightColor="rgba(255, 255, 255, 0.06)">
                <div className="project-content">
                  <div className="project-header">
                    <img src="/Bold Italic Multipurpse Typography Logo Design Brand Identity Clean Comic Style for Design Company (2000 x 1000 px).png" alt="Junzi" className="project-logo" />
                    <div className="project-header-right">
                      <span className="project-tag tag-junzi">Live</span>
                      <a href="https://www.bejunzi.com" target="_blank" rel="noopener noreferrer" className="project-visit-btn">
                        Visit <ArrowUpRightIcon />
                      </a>
                    </div>
                  </div>
                  <p className="project-desc">
                    A public discourse platform built to surface truth through structured debate, not popularity.
                  </p>
                  <ul className="project-details">
                    <li>Inspired by Greek philosophy and the lack of foundational reasoning in modern discourse</li>
                    <li>Structured around dialectic and finding truth, not surfacing popular opinion</li>
                    <li>Full-stack Next.js app with authentication, drafts, and threaded discussion architecture</li>
                    <li>Designed for substantive, long-form debate over reactive hot takes</li>
                  </ul>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            <AnimatedContent distance={60} duration={0.7} delay={0.4}>
              <SpotlightCard className="project-card card-infra" spotlightColor="rgba(168, 85, 247, 0.10)">
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-name">Infrastructure & Internal Systems</h3>
                    <span className="project-tag tag-infra">Ongoing</span>
                  </div>
                  <ul className="project-details">
                    <li>Multi-tenant SaaS architectures with isolated customer environments</li>
                    <li>Custom rate limiting, webhook ingestion, and authentication services</li>
                    <li>CI/CD pipelines, deployment automation, and monitoring built from production needs</li>
                    <li>Reusable patterns extracted from real systems, not demos</li>
                  </ul>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          </div>
        </section>

        {/* ── AI Philosophy ── */}
        <section className="content-section">
          <AnimatedContent distance={60} duration={0.7}>
            <div className="section-label">
              <span>How I Use AI</span>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={40} duration={0.7} delay={0.1}>
            <div className="ai-section">
              <p className="ai-lead">
                I use AI daily to move faster —{' '}
                <ShinyText
                  text="not to avoid thinking."
                  speed={3}
                  color="#8b8b9e"
                  shineColor="#e4e4e7"
                />
              </p>
              <p className="ai-body">
                I design systems, make the architectural tradeoffs, and use AI to accelerate
                execution: scaffolding services, exploring edge cases, and speeding up implementation
                once decisions are made. The leverage comes from knowing what to ask for, what to
                reject, and how to integrate outputs into real production systems.
              </p>
              <p className="ai-body ai-closer">
                AI rewards people who understand architecture, constraints, and failure modes.
                The craft still matters.
              </p>
            </div>
          </AnimatedContent>
        </section>

        {/* ── How I Work ── */}
        <section className="content-section">
          <AnimatedContent distance={60} duration={0.7}>
            <div className="section-label">
              <span>How I Work</span>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={40} duration={0.7} delay={0.1}>
            <ul className="principles">
              <li>
                <span className="principle-marker" />
                Design systems end-to-end before writing code
              </li>
              <li>
                <span className="principle-marker" />
                Ship quickly and iterate with real users
              </li>
              <li>
                <span className="principle-marker" />
                Own both technical decisions and customer outcomes
              </li>
              <li>
                <span className="principle-marker" />
                Use contractors to scale execution, not outsource judgment
              </li>
              <li>
                <span className="principle-marker" />
                Build for boring, regulated industries where software has real consequences
              </li>
            </ul>
          </AnimatedContent>
        </section>

        {/* ── About / Profile ── */}
        <section className="content-section profile-section">
          <AnimatedContent distance={60} duration={0.7}>
            <div className="section-label">
              <span>About Me</span>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={40} duration={0.7} delay={0.1}>
            <div className="profile-card">
              <div className="profile-photo-wrapper">
                <img
                  src="/IMG_1794.jpeg"
                  alt="Johnny McConkie"
                  className="profile-photo"
                />
              </div>
              <div className="profile-info">
                <h3 className="profile-name">Johnny McConkie</h3>
                <p className="profile-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Washington, DC
                </p>
                <p className="profile-bio">
                  I'm a builder and self-taught engineer who is passionate about taking products
                  from idea and architecture to code, launch, and iteration. I've been shipping
                  real software for years, learning quickly as I go and solving problems as
                  they show up in production. I care less about polish and hype and more about
                  building things that actually work, scale, and get used.
                </p>
                <div className="profile-tags">
                  <span className="profile-tag">Founder</span>
                  <span className="profile-tag">Systems Architecture</span>
                  <span className="profile-tag">Real-Time Infrastructure</span>
                  <span className="profile-tag">Enterprise SaaS</span>
                  <span className="profile-tag">Product & Sales</span>
                  <span className="profile-tag">AI-Augmented Development</span>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </section>

        {/* ── Footer / Dock ── */}
        <footer className="footer-section">
          <AnimatedContent distance={40} duration={0.7}>
            <div className="footer-inner">
              <p className="footer-cta">
                <DecryptedText
                  text="Let's build something together."
                  animateOn="view"
                  speed={40}
                  sequential={true}
                  revealDirection="center"
                  className="footer-decrypted"
                  encryptedClassName="footer-encrypted"
                />
              </p>
              <p className="footer-subtitle">Got an idea, a problem, or just want to talk shop? Reach out.</p>
              <div className="footer-links">
                <a href="https://github.com/johnnyt16" target="_blank" rel="noopener noreferrer" className="footer-link">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/mcconkiejohn/" target="_blank" rel="noopener noreferrer" className="footer-link">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:johntaylormcc@gmail.com" className="footer-link">
                  <EmailIcon />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </AnimatedContent>
        </footer>
      </main>
    </>
  );
}

export default App;
