import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Staggered fade-up for every [data-reveal] child as the group scrolls in.
 *
 * Markup renders in its finished state. GSAP only hides it after hydrate when
 * motion is allowed, so no-JS, reduced motion and crawlers get the full page.
 */
export default function Reveal({ as = 'div', children, className, ...rest }) {
  const Tag = as;
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;

    const ctx = gsap.context((self) => {
      const items = self.selector('[data-reveal]');
      gsap.set(items, { opacity: 0, y: 28, filter: 'blur(6px)' });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        clearProps: 'filter',
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <Tag ref={root} className={className} {...rest}>
      {children}
    </Tag>
  );
}

function format(n, decimals) {
  return decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US');
}

/** Number that counts up from zero the first time it scrolls into view. */
export function CountUp({ value, prefix = '', suffix = '', decimals = 0 }) {
  const el = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !el.current) return;

    const node = el.current;
    const state = { n: 0 };
    node.textContent = prefix + format(0, decimals) + suffix;

    const tween = gsap.to(state, {
      n: value,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => {
        node.textContent = prefix + format(state.n, decimals) + suffix;
      },
      scrollTrigger: { trigger: node, start: 'top 90%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      node.textContent = prefix + format(value, decimals) + suffix;
    };
  }, [reduced, value, prefix, suffix, decimals]);

  return <span ref={el}>{prefix + format(value, decimals) + suffix}</span>;
}
