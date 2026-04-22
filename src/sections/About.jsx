import AnimatedContent from '../components/AnimatedContent';
import { LocationIcon } from '../components/Icons';

export default function About() {
  return (
    <section className="content-section profile-section" id="about">
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
              <LocationIcon size={14} />
              Salt Lake City, UT
            </p>
            <p className="profile-bio">
              I'm a builder and self-taught engineer who takes products from idea and
              architecture to code, launch, and iteration. I run Forge Development — a
              one-person studio where I build websites, web apps, and production systems
              for businesses. I care less about polish and hype and more about building
              things that actually work, scale, and get used.
            </p>
            <div className="profile-tags">
              <span className="profile-tag">Forge Development</span>
              <span className="profile-tag">Systems Architecture</span>
              <span className="profile-tag">Real-Time Infrastructure</span>
              <span className="profile-tag">Enterprise SaaS</span>
              <span className="profile-tag">Product & Sales</span>
              <span className="profile-tag">AI Agents & LLMs</span>
              <span className="profile-tag">Claude Code</span>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
