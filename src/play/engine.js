import Matter from 'matter-js';

const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Query, Sleeping, Events } = Matter;

/**
 * Gravity mode, outside React.
 *
 * capture() measures every visible word and small control on the page and
 * builds a look-alike copy of each inside `layer`. The real page is never
 * touched: it's hidden underneath while the copies fall, so React's DOM
 * can't get out of sync and screen readers still see the real content.
 */

// Elements that fall as one piece instead of word by word.
const CHUNKS = '.button, .theme-toggle, .tags li, .demo-chip, .badge, .now-label, .toc-line, .chart-flag, svg.dg, .chart-plot > svg';
const SKIP = '.sr-only, .skip, script, style, noscript, [aria-hidden="true"]:not(.toc-line)';
const MAX_BODIES = 420;
const PALETTE = ['#ff3ea5', '#c6ff3d', '#38e1ff', '#9b7bff', '#ffb547'];

// Computed styles a detached copy needs to look like the original.
const BOX_PROPS = [
  'font', 'letterSpacing', 'textTransform', 'color', 'background', 'border', 'borderRadius',
  'padding', 'display', 'alignItems', 'justifyContent', 'gap', 'whiteSpace', 'lineHeight', 'boxShadow',
];
const CHILD_PROPS = ['font', 'color', 'fill', 'stroke', 'strokeWidth', 'width', 'height', 'display', 'margin', 'background', 'borderRadius'];

const inView = (r) => r.width > 0.5 && r.height > 0.5 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;

function copyStyles(from, to, props) {
  const cs = getComputedStyle(from);
  for (const p of props) to.style[p] = cs[p];
}

function makeChunk(el, rect) {
  const copy = el.cloneNode(true);
  copyStyles(el, copy, BOX_PROPS);
  const src = el.querySelectorAll('*');
  const dst = copy.querySelectorAll('*');
  src.forEach((s, i) => copyStyles(s, dst[i], CHILD_PROPS));
  copy.style.listStyle = 'none';
  copy.removeAttribute('id');
  copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  return { node: copy, rect };
}

function collectWords(root, chunkEls) {
  const items = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p || !n.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if (p.closest(SKIP) || chunkEls.some((c) => c.contains(p))) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const cs = getComputedStyle(n.parentElement);
    if (cs.visibility === 'hidden' || cs.opacity === '0') continue;
    // Visually-hidden text (clipped to a 1px box) shouldn't fall either.
    const box = n.parentElement.getBoundingClientRect();
    if (box.width <= 1 || box.height <= 1) continue;
    for (const m of n.textContent.matchAll(/\S+/g)) {
      range.setStart(n, m.index);
      range.setEnd(n, m.index + m[0].length);
      const rect = range.getBoundingClientRect();
      if (!inView(rect)) continue;
      const span = document.createElement('span');
      span.textContent = m[0];
      span.style.font = cs.font;
      span.style.letterSpacing = cs.letterSpacing;
      span.style.textTransform = cs.textTransform;
      span.style.color = cs.color;
      span.style.lineHeight = `${rect.height}px`;
      span.style.whiteSpace = 'pre';
      items.push({ node: span, rect, word: true });
    }
  }
  return items;
}

export function capture(root, layer) {
  // A chunk may itself be aria-hidden (decorative); only skip it if an ancestor is.
  const chunkEls = [...root.querySelectorAll(CHUNKS)].filter((el) => !el.parentElement?.closest(SKIP));
  const chunks = chunkEls
    .map((el) => ({ el, rect: el.getBoundingClientRect() }))
    .filter(({ rect }) => inView(rect))
    .map(({ el, rect }) => makeChunk(el, rect));

  let items = [...chunks, ...collectWords(root, chunkEls)];
  // Very long pages: keep the biggest pieces, they make the best pile.
  if (items.length > MAX_BODIES) {
    items = items.sort((a, b) => b.rect.width * b.rect.height - a.rect.width * a.rect.height).slice(0, MAX_BODIES);
  }

  for (const it of items) {
    const n = it.node;
    n.classList.add('g-piece');
    n.style.position = 'absolute';
    n.style.left = '0';
    n.style.top = '0';
    n.style.margin = '0';
    n.style.width = `${it.rect.width}px`;
    n.style.height = `${it.rect.height}px`;
    n.style.boxSizing = 'border-box';
    n.style.transform = `translate(${it.rect.left}px, ${it.rect.top}px)`;
    it.origin = { x: it.rect.left + it.rect.width / 2, y: it.rect.top + it.rect.height / 2 };
    layer.appendChild(n);
  }
  return items;
}

/** Physics world for the captured pieces. Returns controls for the overlay. */
export function createWorld(items, layer) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const engine = Engine.create({ enableSleeping: true });
  engine.gravity.y = 1.1;

  for (const it of items) {
    const { width: w, height: h } = it.rect;
    // Created dynamic, then frozen: Matter can't un-freeze a body that was
    // born static (it never recorded a real mass to restore).
    it.body = Bodies.rectangle(it.origin.x, it.origin.y, Math.max(w, 4), Math.max(h, 4), {
      restitution: 0.25,
      friction: 0.35,
      frictionAir: 0.012,
      chamfer: { radius: Math.min(4, h / 3) },
    });
    Body.setStatic(it.body, true);
  }

  const wall = { isStatic: true, render: { visible: false } };
  const T = 400;
  const bounds = [
    Bodies.rectangle(W / 2, H + T / 2, W * 3, T, wall),
    Bodies.rectangle(-T / 2, H / 2, T, H * 4, wall),
    Bodies.rectangle(W + T / 2, H / 2, T, H * 4, wall),
    Bodies.rectangle(W / 2, -H - T / 2, W * 3, T, wall),
  ];

  // A round "hand" that follows the cursor and shoves pieces around.
  const hand = Bodies.circle(-200, -200, 34, { isStatic: true });
  Composite.add(engine.world, [...items.map((i) => i.body), ...bounds, hand]);

  const mouse = Mouse.create(layer);
  const grab = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, damping: 0.1 } });
  Composite.add(engine.world, grab);

  const pieces = items.map((i) => i.body);
  const onMove = () => {
    if (grab.body) {
      Body.setPosition(hand, { x: -200, y: -200 });
      return;
    }
    Body.setPosition(hand, { x: mouse.position.x, y: mouse.position.y });
    const p = mouse.position;
    for (const b of Query.region(pieces, { min: { x: p.x - 60, y: p.y - 60 }, max: { x: p.x + 60, y: p.y + 60 } })) {
      Sleeping.set(b, false);
    }
  };
  Events.on(grab, 'mousemove', onMove);

  let raf = 0;
  let running = true;
  let last = performance.now();
  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    if (!running) return;
    Engine.update(engine, Math.min(now - last, 32));
    last = now;
    for (const it of items) {
      const { x, y } = it.body.position;
      it.node.style.transform = `translate(${x - it.rect.width / 2}px, ${y - it.rect.height / 2}px) rotate(${it.body.angle}rad)`;
    }
  };
  raf = requestAnimationFrame(tick);

  const timers = [];

  return {
    count: items.length,

    /** Release everything, in a quick random cascade, with a little spin. */
    drop() {
      running = true;
      last = performance.now();
      items.forEach((it) => {
        timers.push(
          setTimeout(() => {
            Body.setStatic(it.body, false);
            Body.setAngularVelocity(it.body, (Math.random() - 0.5) * 0.08);
            Body.setVelocity(it.body, { x: (Math.random() - 0.5) * 2, y: Math.random() * 1.5 });
            if (it.word && Math.random() < 0.4) it.node.style.color = PALETTE[(Math.random() * PALETTE.length) | 0];
          }, Math.random() * 650)
        );
      });
    },

    /** Fly every piece home, then resolve. */
    rebuild() {
      running = false;
      timers.forEach(clearTimeout);
      return new Promise((resolve) => {
        const start = performance.now();
        const DUR = 900;
        const from = items.map((it) => ({ x: it.body.position.x, y: it.body.position.y, a: it.body.angle, delay: Math.random() * 250 }));
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          let done = true;
          items.forEach((it, i) => {
            const f = from[i];
            const t = Math.min(1, Math.max(0, (now - start - f.delay) / DUR));
            if (t < 1) done = false;
            const k = ease(t);
            const x = f.x + (it.origin.x - f.x) * k;
            const y = f.y + (it.origin.y - f.y) * k;
            const a = f.a * (1 - k);
            it.node.style.transform = `translate(${x - it.rect.width / 2}px, ${y - it.rect.height / 2}px) rotate(${a}rad)`;
          });
          if (done) resolve();
          else requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },

    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      Events.off(grab, 'mousemove', onMove);
      Mouse.clearSourceEvents?.(mouse);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      layer.replaceChildren();
    },
  };
}
