import { lazy, Suspense, useEffect, useState } from 'react';
import { canRenderWebGL, onIdle } from '../lib/motion';

const HeroObject = lazy(() => import('./HeroObject'));

/**
 * Static schematic sphere. This is what everyone sees first, and it is the
 * only thing low-power devices, reduced-motion visitors and no-JS visitors
 * ever see. Cheap inline SVG, no network cost.
 */
function SchematicSphere() {
  return (
    <svg className="hero-visual-fallback" viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="rgba(90,211,245,0.55)" strokeWidth="0.75">
        <circle cx="100" cy="100" r="66" />
        <ellipse cx="100" cy="100" rx="66" ry="22" />
        <ellipse cx="100" cy="100" rx="66" ry="44" />
        <ellipse cx="100" cy="100" rx="22" ry="66" />
        <ellipse cx="100" cy="100" rx="44" ry="66" />
        <line x1="100" y1="20" x2="100" y2="180" strokeDasharray="3 5" opacity="0.5" />
        <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="3 5" opacity="0.5" />
      </g>
    </svg>
  );
}

export default function HeroVisual() {
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    if (!canRenderWebGL()) return;
    return onIdle(() => setEnhance(true));
  }, []);

  return (
    <div className="hero-visual">
      {enhance ? (
        <Suspense fallback={<SchematicSphere />}>
          <HeroObject />
        </Suspense>
      ) : (
        <SchematicSphere />
      )}
    </div>
  );
}
