import AnimatedContent from '../components/AnimatedContent';
import DecryptedText from '../components/DecryptedText';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '../components/Icons';

export default function Contact() {
  return (
    <footer className="footer-section" id="contact">
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
          <p className="footer-subtitle">Have a project in mind? I typically respond within 24 hours.</p>

          <a href="mailto:johntaylormcc@gmail.com" className="cta-btn cta-primary cta-lg">
            Start a Project
          </a>

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

          <p className="footer-forge">Forge Development · Salt Lake City, UT</p>
        </div>
      </AnimatedContent>
    </footer>
  );
}
