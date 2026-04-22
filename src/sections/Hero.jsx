import { motion } from 'motion/react';
import TextType from '../components/TextType';
import ShinyText from '../components/ShinyText';
import MagneticButton from '../components/MagneticButton';
import { LocationIcon } from '../components/Icons';

const bioWords = 'Full-stack engineer and founder of'.split(' ');
const bioTail = '. I design, build, and ship websites, web apps, and production systems for businesses — from first conversation to launch.'.split(' ');

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
              "I build custom websites and systems for businesses.",
              "I ship production software, not prototypes.",
              "I replace the tech nobody wants to touch.",
              "I turn messy problems into working products."
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
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.025, delayChildren: 1.0 } } }}
        >
          <p className="hero-bio-stagger">
            {bioWords.map((word, i) => (
              <motion.span
                key={i}
                className="hero-word"
                variants={{
                  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                {word}{' '}
              </motion.span>
            ))}
            <motion.span
              className="hero-word"
              variants={{
                hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <ShinyText
                text="Forge Development"
                speed={3}
                color="#8b8b9e"
                shineColor="#e4e4e7"
              />
            </motion.span>
            {bioTail.map((word, i) => (
              <motion.span
                key={`t${i}`}
                className="hero-word"
                variants={{
                  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </p>
        </motion.div>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <MagneticButton>
            <a href="#portfolio" className="cta-btn cta-primary">See My Work</a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="cta-btn cta-secondary">Work With Me</a>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
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
