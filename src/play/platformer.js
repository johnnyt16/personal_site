/**
 * A tiny platformer that runs on top of the real page.
 *
 * - Every line of text, row, and button is a one-way platform.
 * - Down while standing on a row opens it; anywhere else it drops through.
 * - Jump again in mid-air to fire the jetpack (fuel refills on the ground).
 * - Coins sit on metrics and text lines. Collect them all to win.
 * - A bug flies after you. Stomp it, or lose a heart when it touches you.
 *
 * Positions are in document coordinates; the camera is the window's scroll.
 * Plain canvas + requestAnimationFrame, no dependencies.
 */

// ─── Sprites ──────────────────────────────────────────────────────
// Player (10×14, facing right). c cap · s skin · e eye · h hair · b shirt · p pants · f shoes · j jetpack
const HEAD = ['...cccc...', '..cccccc..', '..cccccccc', '..hsssss..', '..hssess..', '...sssss..'];
const BODY = ['..jbbbb...', '.jjbbbbb..', '.jjsbbbbs.', '..jbbbb...'];
const BODY_UP = ['.sjbbbb.s.', '.jjbbbbb..', '.jjbbbb...', '..jbbbb...'];
const LEGS = {
  idle: ['...pppp...', '...p..p...', '...p..p...', '..ff..ff..'],
  runA: ['...pppp...', '..pp..pp..', '.pp....pp.', '.f......f.'],
  runB: ['...pppp...', '....pp....', '...pp.p...', '...ff.f...'],
  jump: ['...pppp...', '..pp..pp..', '..p....p..', '..f....f..'],
};
const PLAYER = {
  idle: [...HEAD, ...BODY, ...LEGS.idle],
  runA: [...HEAD, ...BODY, ...LEGS.runA],
  runB: [...HEAD, ...BODY, ...LEGS.runB],
  jump: [...HEAD, ...BODY_UP, ...LEGS.jump],
};
// The bug (12×8). k shell edge · r shell · w eye · g wing
const BUG_TOP = ['..k......k..', '...k....k...', '..kkkkkkkk..', '.kwkrrrrkwk.', 'kkrrrrrrrrkk', '.krrrrrrrrk.'];
const BUG = {
  a: ['gg........gg', ...BUG_TOP, '..k.k..k.k..'],
  b: ['............', ...BUG_TOP, '.k..k..k..k.'],
};

const PX = 3; // screen pixels per sprite pixel
const SPRITE_W = 10 * PX;
const SPRITE_H = 14 * PX;

// ─── Feel ─────────────────────────────────────────────────────────
const W = 18; // player hitbox
const H = SPRITE_H - 2;
const ACCEL = 0.9;
const AIR_ACCEL = 0.55;
const MAX_RUN = 4.4;
const FRICTION = 0.78;
const GRAVITY = 0.62;
const JUMP_V = -12.4;
const MAX_FALL = 15;
const COYOTE = 6;
const BUFFER = 7;
const JET_THRUST = 1.35;
const JET_MAX_UP = -6.2;
const JET_BURN = 1.3; // fuel per frame (100 = full tank, about 1.3s of thrust)
const JET_REFILL = 2.5;
const HEARTS = 3;
const STEP = 1000 / 60;

const SKIP = '.walk-ui, .sr-only, .skip, script, style, svg, [aria-hidden="true"]';
const BOXES = '.row-button, .icon-button, .theme-toggle, .footer-term, .button, .demo, .chart, figure, .facts > div, .cs-contact';

function hidden(el) {
  if (el.closest(SKIP)) return true;
  if (el.closest('.row:not(.is-open) .row-panel')) return true;
  return getComputedStyle(el).visibility === 'hidden';
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  const text = v('--text', '#1b1a18');
  const accent = v('--accent', '#9a3412');
  return {
    c: accent, b: accent, h: text, p: text, f: text, e: text, s: '#f2c29b', j: v('--muted', '#57554f'),
    k: text, r: '#dc2626', w: v('--bg', '#fbfaf7'), g: v('--muted', '#57554f'),
    coin: '#e0a400',
  };
}

export function createWalker(canvas) {
  const ctx = canvas.getContext('2d');
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const input = { left: false, right: false, jump: false, down: false };

  // While playing, the desktop sidebar scrolls with the page. If it stayed
  // sticky, standing on it would drag the camera along forever.
  root.classList.add('walking');

  let platforms = [];
  let rows = [];
  let coins = [];
  let particles = [];
  let colors = readColors();
  let raf = 0;
  let acc = 0;
  let last = performance.now();
  let frame = 0;
  let state = 'playing'; // playing | won | lost
  let hearts = HEARTS;

  const me = { x: 0, y: 0, vx: 0, vy: 0, face: 1, ground: false, coyote: 0, buffer: 0, dropUntil: 0, fuel: 100, jetting: false, invuln: 0, safe: null };
  const bug = { x: 0, y: 0, vx: 0, vy: 0, alive: false, respawnAt: 150 };

  // ─── World ──────────────────────────────────────────────────────
  function measure() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    const lines = [];

    // One platform per rendered line of text.
    const walker = document.createTreeWalker(document.getElementById('root'), NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.textContent.trim() && n.parentElement && !hidden(n.parentElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    const range = document.createRange();
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) {
        if (r.width < 6 || r.height < 6) continue;
        // Stand on the glyphs, not the top of the line box.
        lines.push({ x1: r.left + sx, x2: r.right + sx, y: r.top + sy + r.height * 0.18, anchor: n.parentElement });
      }
    }
    // Merge pieces of the same visual line into one walkable span.
    lines.sort((a, b) => a.y - b.y || a.x1 - b.x1);
    const merged = [];
    for (const l of lines) {
      const prev = merged[merged.length - 1];
      if (prev && Math.abs(prev.y - l.y) < 4 && l.x1 - prev.x2 < 16) prev.x2 = Math.max(prev.x2, l.x2);
      else merged.push({ ...l });
    }

    platforms = merged.filter((p) => p.x2 - p.x1 >= 14);
    rows = [];
    for (const el of document.querySelectorAll(BOXES)) {
      if (hidden(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 10) continue;
      platforms.push({ x1: r.left + sx, x2: r.right + sx, y: r.top + sy });
      if (el.matches('.row-button')) rows.push({ el, x1: r.left + sx, x2: r.right + sx, top: r.top + sy, bottom: r.bottom + sy });
    }
    const floor = Math.max(document.documentElement.scrollHeight, window.innerHeight + sy);
    platforms.push({ x1: -1e5, x2: 1e5, y: floor, floor: true });

    // Coins follow their anchor element, so opening a row moves them too.
    for (const c of coins) {
      if (!c.el.isConnected || hidden(c.el)) {
        c.off = true;
        continue;
      }
      const r = c.el.getBoundingClientRect();
      c.off = false;
      c.x = r.left + sx + r.width * c.fx;
      c.y = r.top + sy + c.dy;
    }
  }

  function placeCoins() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    coins = [];
    const add = (el, x, y) => {
      const r = el.getBoundingClientRect();
      coins.push({ el, fx: r.width ? (x - (r.left + sx)) / r.width : 0.5, dy: y - (r.top + sy), x, y, got: false });
    };
    // One on every bold metric.
    document.querySelectorAll('.row-metric').forEach((el) => {
      if (hidden(el)) return;
      const r = el.getBoundingClientRect();
      add(el, r.left + sx + r.width / 2, r.top + sy - 20);
    });
    // Then a spread of text lines: every third line, skipping crowded spots.
    const lines = platforms.filter((p) => !p.floor && p.anchor && p.x2 - p.x1 >= 50);
    lines.forEach((p, i) => {
      if (i % 3) return;
      const x = p.x1 + (p.x2 - p.x1) * (0.25 + ((i * 0.37) % 0.5));
      const y = p.y - 22;
      if (coins.some((c) => Math.abs(c.x - x) < 60 && Math.abs(c.y - y) < 40)) return;
      add(p.anchor, x, y);
    });
  }

  function spawn() {
    const target = document.querySelector('.name, .page-title, h1');
    const r = target?.getBoundingClientRect();
    me.x = (r ? r.left + 24 : 40) + window.scrollX;
    me.y = (r ? r.top : 0) + window.scrollY - H - 30;
    me.vx = me.vy = 0;
    me.fuel = 100;
    me.jetting = false;
    me.safe = null;
  }

  function spawnBug() {
    // Enter from the screen edge farthest from the player, just above view.
    const sx = window.scrollX;
    const fromRight = me.x - sx < window.innerWidth / 2;
    bug.x = sx + (fromRight ? window.innerWidth + 20 : -20);
    bug.y = window.scrollY + 40 + Math.random() * 120;
    bug.vx = bug.vy = 0;
    bug.alive = true;
  }

  function burst(x, y, color, n = 10) {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      particles.push({ x, y, vx: (Math.random() - 0.5) * 5, vy: -Math.random() * 4, life: 24 + Math.random() * 12, color });
    }
  }

  // ─── Simulation ─────────────────────────────────────────────────
  function step() {
    frame++;
    if (state !== 'playing') return;

    const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    if (dir) {
      me.vx += dir * (me.ground ? ACCEL : AIR_ACCEL);
      me.vx = Math.max(-MAX_RUN, Math.min(MAX_RUN, me.vx));
      me.face = dir;
    } else if (me.ground) {
      me.vx *= FRICTION;
      if (Math.abs(me.vx) < 0.05) me.vx = 0;
    }

    me.coyote = me.ground ? COYOTE : Math.max(0, me.coyote - 1);
    me.buffer = Math.max(0, me.buffer - 1);
    if (me.buffer > 0 && me.coyote > 0) {
      me.vy = JUMP_V;
      me.buffer = 0;
      me.coyote = 0;
    }
    if (!input.jump && me.vy < -4 && !me.jetting) me.vy *= 0.6;

    // Jetpack.
    if (me.jetting && me.fuel > 0 && !me.ground) {
      me.vy = Math.max(JET_MAX_UP, me.vy - JET_THRUST);
      me.fuel = Math.max(0, me.fuel - JET_BURN);
      if (frame % 2 === 0) particles.push({ x: me.x + W / 2 - me.face * 8, y: me.y + H - 10, vx: (Math.random() - 0.5) * 1.5, vy: 2 + Math.random() * 2, life: 14, color: Math.random() < 0.5 ? '#f59e0b' : '#ef4444' });
    }
    if (me.fuel <= 0) me.jetting = false;

    me.vy = Math.min(MAX_FALL, me.vy + GRAVITY);
    const prevBottom = me.y + H;
    me.x += me.vx;
    me.y += me.vy;

    // Ceiling: the jetpack can't carry him off the top of the page.
    if (me.y < 0) { me.y = 0; me.vy = Math.max(0, me.vy); }

    const minX = window.scrollX;
    const maxX = document.documentElement.clientWidth + window.scrollX - W;
    if (me.x < minX) { me.x = minX; me.vx = 0; }
    if (me.x > maxX) { me.x = maxX; me.vx = 0; }

    // Land on the highest one-way platform crossed this frame.
    me.ground = false;
    if (me.vy >= 0) {
      let land = null;
      const dropping = frame < me.dropUntil;
      for (const p of platforms) {
        if (dropping && !p.floor) continue;
        if (me.x + W <= p.x1 + 3 || me.x >= p.x2 - 3) continue;
        // A few px of tolerance so small layout shifts never let him sink through.
        if (prevBottom > p.y + 4 || me.y + H < p.y) continue;
        if (!land || p.y < land.y) land = p;
      }
      if (land) {
        me.y = land.y - H;
        me.vy = 0;
        me.ground = true;
        me.jetting = false;
        me.safe = { x: me.x, y: me.y };
      }
    }
    if (me.ground) me.fuel = Math.min(100, me.fuel + JET_REFILL);

    // Fell way past where he last stood: put him back instead of a long plunge.
    if (!me.ground && me.safe && me.y > me.safe.y + window.innerHeight * 0.85) {
      me.x = me.safe.x;
      me.y = me.safe.y - 4;
      me.vx = me.vy = 0;
      me.invuln = Math.max(me.invuln, 40);
    }

    // Coins.
    for (const c of coins) {
      if (c.got || c.off) continue;
      if (Math.abs(me.x + W / 2 - c.x) < 18 && Math.abs(me.y + H / 2 - c.y) < 30) {
        c.got = true;
        if (c.el.matches('.row-metric')) c.el.classList.add('metric-hit');
        burst(c.x, c.y, colors.coin, 8);
        if (coins.every((k) => k.got)) state = 'won';
      }
    }

    stepBug();

    me.invuln = Math.max(0, me.invuln - 1);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.life--;
    }
    particles = particles.filter((p) => p.life > 0);

    // Camera: keep him a little above the middle of the screen.
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const target = Math.max(0, Math.min(maxScroll, me.y - window.innerHeight * 0.45));
    const delta = target - window.scrollY;
    if (Math.abs(delta) > 2) window.scrollTo(window.scrollX, reduced ? target : window.scrollY + delta * 0.12);
  }

  function stepBug() {
    if (!bug.alive) {
      if (frame >= bug.respawnAt) spawnBug();
      return;
    }
    const got = coins.filter((c) => c.got).length;
    const speed = Math.min(2.6, 1.15 + got * 0.07);
    const dx = me.x + W / 2 - bug.x;
    const dy = me.y + H / 2 - bug.y;
    const dist = Math.hypot(dx, dy) || 1;
    bug.vx += ((dx / dist) * speed - bug.vx) * 0.05;
    bug.vy += ((dy / dist) * speed - bug.vy) * 0.05;
    bug.x += bug.vx;
    bug.y += bug.vy + (reduced ? 0 : Math.sin(frame / 9) * 0.6);

    const hit = Math.abs(me.x + W / 2 - bug.x) < W / 2 + 15 && Math.abs(me.y + H / 2 - bug.y) < H / 2 + 10;
    if (!hit) return;

    const stomp = me.vy > 1 && me.y + H - (bug.y - 12) < 16;
    if (stomp) {
      bug.alive = false;
      bug.respawnAt = frame + 180;
      me.vy = -9;
      burst(bug.x, bug.y, colors.r, 14);
    } else if (me.invuln === 0) {
      hearts--;
      me.invuln = 100;
      const away = Math.sign(me.x + W / 2 - bug.x) || 1;
      me.vx = away * 6;
      me.vy = -7;
      bug.vx = -away * 4;
      bug.vy = -2;
      burst(me.x + W / 2, me.y + H / 2, colors.r, 8);
      if (hearts <= 0) state = 'lost';
    }
  }

  // ─── Drawing ────────────────────────────────────────────────────
  function drawSprite(rows, x, y, flip) {
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
      if (c.got || c.off) continue;
      const x = c.x - sx;
      const y = c.y - sy + (reduced ? 0 : Math.sin(frame / 12 + c.x) * 3);
      if (y < -20 || y > window.innerHeight + 20) continue;
      ctx.fillStyle = colors.coin;
      ctx.strokeStyle = colors.k;
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

    for (const p of particles) {
      ctx.globalAlpha = Math.min(1, p.life / 12);
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x - sx), Math.round(p.y - sy), 3, 3);
    }
    ctx.globalAlpha = 1;

    if (bug.alive) {
      drawSprite(BUG[Math.floor(frame / 5) % 2 ? 'a' : 'b'], bug.x - 18 - sx, bug.y - 12 - sy, bug.vx < 0);
    }

    // Blink while invulnerable.
    if (me.invuln === 0 || Math.floor(frame / 4) % 2) {
      let pose = 'idle';
      if (!me.ground) pose = 'jump';
      else if (Math.abs(me.vx) > 0.4) pose = Math.floor(frame / 6) % 2 ? 'runA' : 'runB';
      drawSprite(PLAYER[pose], me.x + W / 2 - SPRITE_W / 2 - sx, me.y + H - SPRITE_H - sy, me.face < 0);
    }
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

  // ─── Input ──────────────────────────────────────────────────────
  function toggleRowUnderfoot() {
    const cx = me.x + W / 2;
    const feet = me.y + H;
    const row = rows.find((r) => cx > r.x1 && cx < r.x2 && feet >= r.top - 3 && feet <= r.bottom + 2);
    if (!row) return false;
    row.el.click();
    row.el.classList.add('walk-bumped');
    setTimeout(() => row.el.classList.remove('walk-bumped'), 220);
    me.vy = -3; // a little hop so it reads as an action
    setTimeout(measure, 60);
    setTimeout(measure, 400); // rows animate open; re-measure as they settle
    return true;
  }

  function press(action, down) {
    if (action === 'jump' && down && !input.jump) {
      if (me.ground || me.coyote > 0) me.buffer = BUFFER;
      else if (me.fuel > 5) me.jetting = true; // jump again in the air: jetpack
    }
    if (action === 'jump' && !down) me.jetting = false;
    if (action === 'down' && down && !input.down && me.ground && !toggleRowUnderfoot()) me.dropUntil = frame + 14;
    input[action] = down;
  }

  const keyMap = {
    ArrowLeft: 'left', KeyA: 'left',
    ArrowRight: 'right', KeyD: 'right',
    ArrowUp: 'jump', KeyW: 'jump', Space: 'jump',
    ArrowDown: 'down', KeyS: 'down',
  };
  const typing = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
  const onKeyDown = (e) => {
    const a = keyMap[e.code];
    if (!a || typing(e.target) || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    if (!e.repeat) press(a, true);
  };
  const onKeyUp = (e) => {
    const a = keyMap[e.code];
    if (a) press(a, false);
  };

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

  function reset() {
    document.querySelectorAll('.metric-hit').forEach((el) => el.classList.remove('metric-hit'));
    hearts = HEARTS;
    state = 'playing';
    particles = [];
    me.invuln = 0;
    measure();
    placeCoins();
    spawn();
    bug.alive = false;
    bug.respawnAt = frame + 150;
  }

  // Opt-in hook for automated playtests: set window.__WALK_DEBUG first.
  if (window.__WALK_DEBUG) {
    window.__walk = () => ({ x: Math.round(me.x), y: Math.round(me.y), ground: me.ground, fuel: Math.round(me.fuel), hearts, state, coins: coins.filter((c) => c.got).length, total: coins.length, bug: bug.alive });
  }

  // Let the un-stuck sidebar settle before the first measurement.
  requestAnimationFrame(() => {
    resize();
    reset();
    raf = requestAnimationFrame(loop);
  });
  const remeasure = setInterval(() => {
    measure();
    colors = readColors();
  }, 500);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('resize', resize);

  return {
    press,
    reset,
    hud: () => ({ got: coins.filter((c) => c.got).length, total: coins.length, hearts, fuel: me.fuel, state }),
    destroy() {
      cancelAnimationFrame(raf);
      clearInterval(remeasure);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', resize);
      root.classList.remove('walking');
      document.querySelectorAll('.metric-hit').forEach((el) => el.classList.remove('metric-hit'));
    },
  };
}
