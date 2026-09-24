import { useEffect, useRef } from 'react';

/**
 * Lightweight Three.js accent: a wireframe icosahedron that turns slowly and
 * solidifies as the hero scrolls away. Loaded lazily and only on machines that
 * passed canRenderWebGL(), so it can never block or slow first paint.
 *
 * Purely decorative — it carries no text and is hidden from assistive tech.
 */
export default function HeroObject() {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed || !el) return;

      const size = el.clientWidth || 300;
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.2;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size, false);
      el.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.45, 1);

      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0x5ad3f5, transparent: true, opacity: 0.85 })
      );

      const solid = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          color: 0x11405f,
          emissive: 0x06202f,
          shininess: 40,
          flatShading: true,
          transparent: true,
          opacity: 0,
        })
      );

      const key = new THREE.DirectionalLight(0x9fe6ff, 1.6);
      key.position.set(2, 3, 4);

      const group = new THREE.Group();
      group.add(solid, wire);
      scene.add(group, key, new THREE.AmbientLight(0x2a5a7a, 0.7));

      // Scroll progress across the first viewport drives wireframe -> solid.
      let progress = 0;
      const onScroll = () => {
        progress = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const onResize = () => {
        const s = el.clientWidth || 300;
        renderer.setSize(s, s, false);
      };
      window.addEventListener('resize', onResize);

      // Pause the loop when the hero is off screen.
      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(el);

      let raf = 0;
      const clock = new THREE.Clock();

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;

        const t = clock.getElapsedTime();
        group.rotation.y = t * 0.18;
        group.rotation.x = Math.sin(t * 0.12) * 0.22;

        solid.material.opacity = progress;
        wire.material.opacity = 0.85 - progress * 0.55;

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        wire.geometry.dispose();
        wire.material.dispose();
        solid.material.dispose();
        geometry.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mount} style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
}
