import AnimatedContent from '../components/AnimatedContent';
import { LocationIcon } from '../components/Icons';

const techStack = [
  'Next.js', 'Node.js', 'TypeScript', 'Express', 'PostgreSQL',
  'MongoDB', 'Redis', 'AWS', 'Python', 'Socket.IO',
  'REST APIs', 'Git & CI/CD',
];

export default function About() {
  return (
    <section className="content-section profile-section" id="about">
      <AnimatedContent distance={60} duration={0.7}>
        <div className="section-label">
          <span>About</span>
        </div>
      </AnimatedContent>

      <AnimatedContent distance={40} duration={0.7} delay={0.1}>
        <div className="profile-card">
          <div className="profile-photo-wrapper">
            <img
              src="/headshot.jpg"
              alt="John McConkie"
              className="profile-photo"
            />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">John McConkie</h3>
            <p className="profile-location">
              <LocationIcon size={14} />
              Utah
            </p>
            <p className="profile-bio">
              Information Systems student at BYU's Marriott School of Business and
              co-founder of Voley, a SaaS platform for the insurance industry.
              I've built and shipped production software across the full stack, led
              consultative sales teams, and closed real customers. Bilingual in
              English and Portuguese. I care about shipping things that actually
              work, scale, and get used.
            </p>

            <div className="profile-education">
              <h4 className="tech-stack-label">Education</h4>
              <p className="profile-bio" style={{ marginBottom: 4 }}>
                <strong style={{ color: 'var(--text)' }}>Brigham Young University</strong> — Marriott School of Business
              </p>
              <p className="profile-bio" style={{ marginBottom: 4 }}>
                BS Information Systems, Computer Science · Minor in Entrepreneurship
              </p>
              <p className="profile-bio">
                Crocker Innovation Fellowship
              </p>
            </div>

            <div className="profile-tags">
              <span className="profile-tag">Full-Stack Engineering</span>
              <span className="profile-tag">SaaS Founder</span>
              <span className="profile-tag">Sales & GTM</span>
              <span className="profile-tag">Systems Architecture</span>
              <span className="profile-tag">AI & LLMs</span>
            </div>

            <h4 className="tech-stack-label">Tech Stack</h4>
            <div className="tech-stack-tags">
              {techStack.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
