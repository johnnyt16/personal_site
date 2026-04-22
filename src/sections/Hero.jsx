import { motion } from 'motion/react';
import TextType from '../components/TextType';
import ShinyText from '../components/ShinyText';
import { LocationIcon } from '../components/Icons';

export default function Hero() {
  return (
    <section className="hero" id="hero">
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
            <LocationIcon />
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
              "I build websites and systems for businesses that need to work.",
              "I ship production software, not prototypes.",
              "I replace the tech nobody wants to touch.",
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
            Builder and engineer behind{' '}
            <ShinyText
              text="Forge Development"
              speed={3}
              color="#8b8b9e"
              shineColor="#e4e4e7"
            />
            . I build and ship production software — from business websites to
            full-stack platforms — working directly with clients to turn messy
            problems into working systems.
          </p>
        </motion.div>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.33, 1, 0.68, 1] }}
        >
          <a href="#portfolio" className="cta-btn cta-primary">See My Work</a>
          <a href="#contact" className="cta-btn cta-secondary">Work With Me</a>
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
  );
}
