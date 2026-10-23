/**
 * A tiny platformer that runs on top of the real page. Every visible
 * block (headings, paragraphs, rows, buttons) is a one-way platform.
 * Standing on a row and pressing down opens it, like going down a pipe;
 * anywhere else, down drops through. Coins float over each bold metric.
 * Plain canvas + requestAnimationFrame, no deps.
 *
 * Positions are in document coordinates; the camera is the window's own
 * scroll position.
 */

// ─── Sprite (10×14, facing right) ─────────────────────────────────
// c cap · s skin · e eye · h hair · b shirt · p pants · f shoes
const HEAD = [
  '...cccc...',
  '..cccccc..',
  '..cccccccc',
  '..hsssss..',
  '..hssess..',
  '...sssss..',
];
const BODY = ['...bbbb...', '..bbbbbb..', '..sbbbbs..', '...bbbb...'];
const BODY_JUMP = ['.s.bbbb.s.', '..bbbbbb..', '...bbbb...', '...bbbb...'];
const LEGS = {
  idle: ['...pppp...', '...p..p...', '...p..p...', '..ff..ff..'],
  runA: ['...pppp...', '..pp..pp..', '.pp....pp.', '.f......f.'],
  runB: ['...pppp...', '....pp....', '...pp.p...', '...ff.f...'],
  jump: ['...pppp...', '..pp..pp..', '..p....p..', '..f....f..'],
};
const FRAMES = {
  idle: [...HEAD, ...BODY, ...LEGS.idle],
  runA: [...HEAD, ...BODY, ...LEGS.runA],
  runB: [...HEAD, ...BODY, ...LEGS.runB],
  jump: [...HEAD, ...BODY_JUMP, ...LEGS.jump],
};
const PX = 3; // screen pixels per sprite pixel
const SPRITE_W = 10 * PX;
const SPRITE_H = 14 * PX;

// ─── Feel ─────────────────────────────────────────────────────────
const W = 18; // hitbox
const H = SPRITE_H - 2;
const ACCEL = 0.9;
const AIR_ACCEL = 0.55;
const MAX_RUN = 4.4;
const FRICTION = 0.78;
const GRAVITY = 0.62;
const JUMP_V = -12.4;
const MAX_FALL = 15;
const COYOTE = 6; // frames you can still jump after walking off a ledge
const BUFFER = 7; // frames a jump press is remembered before landing
const STEP = 1000 / 60;

const PLATFORMS =
  'h1, h2, h3, p, li, .row-button, .icon-button, .theme-toggle, .button, figure, .demo, .facts > div, .footer';
const OPENABLE = '.row-button';

function visible(el) {
  if (el.closest('.walk-ui, .g-bar, .term-backdrop, .pal-backdrop, [aria-hidden="true"]')) return false;
  if (el.closest('.row:not(.is-open) .row-panel')) return false;
  return getComputedStyle(el).visibility !== 'hidden';
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  const play = document.documentElement.dataset.mode === 'play';
  return {
    c: play ? '#ff3ea5' : v('--accent', '#9a3412'),
    b: play ? '#38e1ff' : v('--accent', '#9a3412'),
    h: v('--text', '#1b1a18'),
    p: v('--text', '#1b1a18'),
    f: v('--text', '#1b1a18'),
    e: v('--text', '#1b1a18'),
    s: '#f2c29b',
    coin: play ? '#c6ff3d' : '#e0a400',
    coinEdge: v('--text', '#1b1a18'),
  };
}

export function createWalker(canvas, { onCoin, onAllCoins }) {
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const input = { left: false, right: false, jump: false, down: false };

  let platforms = [];
  let coins = [];
  let colors = readColors();
  let raf = 0;
  let acc = 0;
  let last = performance.now();
  let frame = 0;

  // Spawn just above the top-left of what's on screen, so he drops in.
  const name = document.querySelector('.name, .page-title, h1');
  const nr = name?.getBoundingClientRect();
  const me = {
    x: (nr ? nr.left + 24 : 40) + window.scrollX,
    y: window.scrollY - H - 10,
    vx: 0,
    vy: 0,
    face: 1,
    ground: false,
    coyote: 0,
    buffer: 0,
    dropUntil: 0,
    on: null, // the platform underfoot
  };

  function measure() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    platforms = [];
    for (const el of document.querySelectorAll(PLATFORMS)) {
      // A row's <li> and <h3> share their top edge with its button; keep
      // only the button so standing there always means "on an openable row".
      if (el.matches('.row, .row-head') || !visible(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 24 || r.height < 6) continue;
      platforms.push({ x1: r.left + sx, x2: r.right + sx, y: r.top + sy, el: el.matches(OPENABLE) ? el : null });
    }
    const floor = Math.max(document.documentElement.scrollHeight, window.innerHeight + sy);
    platforms.push({ x1: -1e4, x2: 1e4, y: floor, floor: true });

    // One coin per bold metric, keyed so collected coins stay collected.
    const seen = new Map(coins.map((c) => [c.key, c]));
    coins = [];
    document.querySelectorAll('.row-metric').forEach((el, i) => {
      if (!visible(el)) return;
      const r = el.getBoundingClientRect();
      const key = el.textContent + i;
      const prev = seen.get(key);
      coins.push({ key, el, x: r.left + sx + r.width / 2, y: r.top + sy - 22, got: prev?.got ?? false });
    });
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    measure();
  }

  function step() {
    frame++;
    const ground = me.ground;

    // Horizontal: accelerate toward input, slide to a stop without it.
    const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    if (dir) {
      me.vx += dir * (ground ? ACCEL : AIR_ACCEL);
      me.vx = Math.max(-MAX_RUN, Math.min(MAX_RUN, me.vx));
      me.face = dir;
    } else if (ground) {
      me.vx *= FRICTION;
      if (Math.abs(me.vx) < 0.05) me.vx = 0;
    }

    // Jump with coyote time and input buffering, so it feels forgiving.
    me.coyote = ground ? COYOTE : Math.max(0, me.coyote - 1);
    me.buffer = Math.max(0, me.buffer - 1);
    if (me.buffer > 0 && me.coyote > 0) {
      me.vy = JUMP_V;
      me.buffer = 0;
      me.coyote = 0;
    }
    // Let go early for a short hop.
    if (!input.jump && me.vy < -4) me.vy *= 0.6;

    me.vy = Math.min(MAX_FALL, me.vy + GRAVITY);

    const prevBottom = me.y + H;
    me.x += me.vx;
    me.y += me.vy;

    const maxX = document.documentElement.clientWidth + window.scrollX - W;
    if (me.x < window.scrollX) { me.x = window.scrollX; me.vx = 0; }
    if (me.x > maxX) { me.x = maxX; me.vx = 0; }

    // Land on the highest one-way platform crossed this frame.
    me.ground = false;
    me.on = null;
    if (me.vy >= 0) {
      let land = null;
      const dropping = frame < me.dropUntil;
      for (const p of platforms) {
        if (dropping && !p.floor) continue;
        const overlap = me.x + W > p.x1 + 3 && me.x < p.x2 - 3;
        // A few px of tolerance so small layout shifts never let him sink through.
        if (!overlap || prevBottom > p.y + 4 || me.y + H < p.y) continue;
        // Highest wins; on a tie, prefer the one that can be opened.
        if (!land || p.y < land.y - 0.5 || (Math.abs(p.y - land.y) <= 0.5 && p.el && !land.el)) land = p;
      }
      if (land) {
        me.y = land.y - H;
        me.vy = 0;
        me.ground = true;
        me.on = land;
      }
    }

    // Coins.
    for (const c of coins) {
      if (c.got) continue;
      if (Math.abs(me.x + W / 2 - c.x) < 18 && Math.abs(me.y + H / 2 - c.y) < 30) {
        c.got = true;
        c.el.classList.add('metric-hit');
        const got = coins.filter((k) => k.got).length;
        onCoin(got, coins.length);
        if (got === coins.length) onAllCoins();
      }
    }

    // Camera: keep him a bit above the middle of the screen.
    const target = Math.max(0, me.y - window.innerHeight * 0.45);
    const delta = target - window.scrollY;
    if (Math.abs(delta) > 2) window.scrollTo(window.scrollX, reduced ? target : window.scrollY + delta * 0.12);
  }

  function drawSprite(name, x, y, flip) {
    const rows = FRAMES[name];
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      for (let col = 0; col < row.length; col++) {
        const ch = row[col];
        if (ch === '.') continue;
        ctx.fillStyle = colors[ch];
        const cx = flip ? row.length - 1 - col : col;
        ctx.fillRect(Math.round(x + cx * PX), Math.round(y + r * PX), PX, PX);
      }
    }
  }

  function draw() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const c of coins) {
      if (c.got) continue;
      const bob = reduced ? 0 : Math.sin(frame / 12 + c.x) * 3;
      const x = c.x - sx;
      const y = c.y - sy + bob;
      if (y < -20 || y > window.innerHeight + 20) continue;
      ctx.fillStyle = colors.coin;
      ctx.strokeStyle = colors.coinEdge;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x + 6, y);
      ctx.lineTo(x, y + 8);
      ctx.lineTo(x - 6, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    let pose = 'idle';
    if (!me.ground) pose = 'jump';
    else if (Math.abs(me.vx) > 0.4) pose = Math.floor(frame / 6) % 2 ? 'runA' : 'runB';
    drawSprite(pose, me.x + W / 2 - SPRITE_W / 2 - sx, me.y + H - SPRITE_H - sy, me.face < 0);
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    acc += Math.min(now - last, 100);
    last = now;
    while (acc >= STEP) {
      step();
      acc -= STEP;
    }
    draw();
  }

  const keyMap = {
    ArrowLeft: 'left', KeyA: 'left',
    ArrowRight: 'right', KeyD: 'right',
    ArrowUp: 'jump', KeyW: 'jump', Space: 'jump',
    ArrowDown: 'down', KeyS: 'down',
  };
  const typing = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);

  function press(action, down) {
    if (action === 'jump' && down && !input.jump) me.buffer = BUFFER;
    if (action === 'down' && down && !input.down && me.ground) {
      if (me.on?.el) {
        // Standing on a row: open it (or close it) instead of dropping.
        const row = me.on.el;
        row.click();
        row.classList.add('walk-bumped');
        setTimeout(() => row.classList.remove('walk-bumped'), 220);
        me.vy = -3; // a little hop so it reads as an action
        setTimeout(measure, 60);
        setTimeout(measure, 400); // rows animate open; re-measure as they settle
      } else {
        me.dropUntil = frame + 14;
      }
    }
    input[action] = down;
  }
  const onKeyDown = (e) => {
    const a = keyMap[e.code];
    if (!a || typing(e.target) || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    press(a, true);
  };
  const onKeyUp = (e) => {
    const a = keyMap[e.code];
    if (a) press(a, false);
  };

  // Opt-in hook for automated playtests: set window.__WALK_DEBUG first.
  if (window.__WALK_DEBUG) {
    window.__walk = () => ({
      x: Math.round(me.x),
      y: Math.round(me.y),
      ground: me.ground,
      on: me.on?.el?.querySelector('.row-title')?.textContent ?? (me.on?.floor ? 'floor' : me.on ? 'platform' : null),
      coins: coins.map((c) => [Math.round(c.x), Math.round(c.y), c.got]),
    });
  }

  resize();
  const remeasure = setInterval(() => {
    measure();
    colors = readColors();
  }, 500);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(loop);

  return {
    press,
    total: () => coins.length,
    destroy() {
      cancelAnimationFrame(raf);
      clearInterval(remeasure);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', resize);
      document.querySelectorAll('.metric-hit').forEach((el) => el.classList.remove('metric-hit'));
    },
  };
}
