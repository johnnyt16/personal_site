import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * The "schematic to shipped" primitive.
 *
 * Markup renders in its FINISHED state by default. When motion is allowed,
 * GSAP knocks it back to wireframe on mount and plays it forward once as the
 * card scrolls in: outline draws, corner ticks appear, fill comes up, then
 * anything marked [data-render] fades up.
 *
 * With reduced motion, no JS, or a failed hydrate, the finished card is
 * simply already there.
 */
export default function RenderCard({ children, className = '' }) {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;

    const ctx = gsap.context((self) => {
      const outline = self.selector('.rc-outline');
      const ticks = self.selector('.rc-tick');
      const fill = self.selector('.rc-fill');
      const items = self.selector('[data-render]');

      // Wireframe state. pathLength="1" on the rect makes this unit math.
      gsap.set(outline, { strokeDashoffset: 1 });
      gsap.set(ticks, { opacity: 0 });
      gsap.set(fill, { opacity: 0 });
      gsap.set(items, { opacity: 0, y: 14 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: 'top 84%', once: true },
        })
        .to(outline, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' })
        .to(ticks, { opacity: 1, duration: 0.25, stagger: 0.05 }, '-=0.45')
        .to(fill, { opacity: 1, duration: 0.45, ease: 'power1.out' }, '-=0.3')
        .to(items, { opacity: 1, y: 0, duration: 0.45, stagger: 0.055, ease: 'power2.out' }, '-=0.2');
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <article ref={root} className={`rcard ${className}`.trim()}>
      <div className="rc-fill" aria-hidden="true" />
      <svg className="rc-svg" aria-hidden="true" preserveAspectRatio="none">
        <rect className="rc-outline" x="0" y="0" width="100%" height="100%" rx="3" pathLength="1" />
      </svg>
      <span className="rc-ticks" aria-hidden="true">
        <i className="rc-tick tl" />
        <i className="rc-tick tr" />
        <i className="rc-tick bl" />
        <i className="rc-tick br" />
      </span>
      {children}
    </article>
  );
}

/**
 * Same reveal, minus the card chrome — for sections that are lists rather
 * than cards (timeline, skills, education).
 */
export function RenderGroup({ children, className = '' }) {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;

    const ctx = gsap.context((self) => {
      const items = self.selector('[data-render]');
      gsap.set(items, { opacity: 0, y: 14 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
