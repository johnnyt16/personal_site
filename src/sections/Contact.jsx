import AnimatedContent from '../components/AnimatedContent';
import DecryptedText from '../components/DecryptedText';
import { GitHubIcon, LinkedInIcon, EmailIcon, PhoneIcon } from '../components/Icons';

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
          <p className="footer-subtitle">Whether it's a project, an opportunity, or just a conversation — I'd love to hear from you.</p>

          <a href="mailto:johntaylormcc@gmail.com" className="cta-btn cta-primary cta-lg">
            Get in Touch
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
            <a href="tel:+18018548750" className="footer-link">
              <PhoneIcon />
              <span>(801) 854-8750</span>
            </a>
          </div>

          <p className="footer-forge">John McConkie · Utah</p>
        </div>
      </AnimatedContent>
    </footer>
  );
}
