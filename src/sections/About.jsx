import AnimatedContent from '../components/AnimatedContent';
import { LocationIcon } from '../components/Icons';

const techStack = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python',
  'PostgreSQL', 'AWS', 'Docker', 'WebSockets', 'REST APIs',
  'Claude / LLMs', 'Git & CI/CD',
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
              src="/IMG_1794.jpeg"
              alt="Johnny McConkie"
              className="profile-photo"
            />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">Johnny McConkie</h3>
            <p className="profile-location">
              <LocationIcon size={14} />
              Salt Lake City, UT
            </p>
            <p className="profile-bio">
              I'm a self-taught full-stack engineer and the founder of Forge
              Development. I build websites, web apps, and production systems
              for businesses — end-to-end, from architecture to launch. I care
              about shipping things that actually work, scale, and get used.
            </p>
            <div className="profile-tags">
              <span className="profile-tag">Forge Development</span>
              <span className="profile-tag">Full-Stack Engineering</span>
              <span className="profile-tag">Systems Architecture</span>
              <span className="profile-tag">AI Agents & LLMs</span>
              <span className="profile-tag">Product & Sales</span>
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
