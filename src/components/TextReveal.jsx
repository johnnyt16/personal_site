import { motion } from 'motion/react';

const TextReveal = ({ text, className = '', delay = 0, staggerDelay = 0.03, tag = 'h1' }) => {
  const Tag = tag;
  const words = text.split(' ');

  return (
    <Tag className={className} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + wordIndex * staggerDelay * 3
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
