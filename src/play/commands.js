import { profile, experience, education, funFacts, tools } from '../data/resume';
import { projects } from '../data/work';
import { moreProjects } from '../data/projects';
import { caseStudies } from '../data/case-studies';
import { classifyTransaction, AUTO_APPROVE } from '../lib/classify';
import { urlFor } from '../routes';
import { enterPlay, exitPlay, isPlay, setTheme, startWalk } from '../lib/mode';

/**
 * Terminal commands. Each one prints lines through `io`:
 *   io.print(line, delayMs)  — a line is a string, a segment, or an array of segments
 *   io.sleep(ms), io.clear(), io.close(), io.history
 * A segment is { text, cls?, href? }. cls maps to a color in play.css.
 */

const seg = (text, cls, href) => ({ text, cls, href });
const pad = (s, n) => s + ' '.repeat(Math.max(1, n - s.length));
const strip = (s) => s.replace(/\[\[TODO:[^\]]*\]\]/g, '').trim();

// Everything `open` knows about, keyed by the name you type.
const targets = {
  ...Object.fromEntries(caseStudies.map((cs) => [cs.slug === 'llm-classification' ? 'research' : cs.slug, { kind: 'case', cs }])),
  ...Object.fromEntries(
    moreProjects.map((p) => [p.title.toLowerCase().split(' ')[0].replace(/[^a-z]/g, ''), { kind: 'project', p }])
  ),
  resume: { kind: 'resume' },
};

export const BOOT = [
  [seg('johnny-os 1.0.26', 'bold'), seg(' (tty1)', 'dim')],
  [seg('[ ok ] ', 'ok'), seg(`mounting /work: ${caseStudies.length} case studies, ${moreProjects.length} side projects`)],
  [seg('[ ok ] ', 'ok'), seg('loading ledgerline classifier (demo mode)')],
  [seg('[ ok ] ', 'ok'), seg('calibrating gravity')],
  '',
  [seg('Type '), seg('help', 'lime'), seg(' to see what this terminal can do, or '), seg('whoami', 'lime'), seg(' to start.')],
];

const HELP = [
  ['whoami', 'who you’re talking to'],
  ['ls [work|projects]', 'list what I’ve built'],
  ['open <name>', 'read about a project, e.g. open voley'],
  ['classify "<text>"', 'run a bank transaction through LedgerLine'],
  ['experience', 'where I’ve worked'],
  ['fun-facts', 'the stuff that didn’t fit on the page'],
  ['contact', 'ways to reach me'],
  ['gravity', 'knock the page over'],
  ['run', 'drop a little guy onto the page'],
  ['theme <light|dark|play>', 'change the look'],
  ['clear · history · exit', ''],
];

async function classify(args, io) {
  const text = args.join(' ').replace(/^["']|["']$/g, '');
  if (!text) {
    io.print([seg('usage: ', 'dim'), seg('classify "SQ *BLUE COPPER COFFEE"')]);
    return;
  }
  io.print([seg('› ', 'pink'), seg(`classifying “${text}”`, 'dim')]);
  const r = await classifyTransaction(text);
  const step = (name, result, cls) => io.print([seg(`  ${pad(name, 14)}`, 'dim'), seg(result, cls)], 260);

  if (r.method === 'ambiguous') {
    await step('pre-filter', 'no usable description → skip the model', 'amber');
    await step('route', 'manual review queue', 'pink');
  } else {
    await step('pre-filter', 'pass', 'ok');
    if (r.method === 'history') {
      await step('history', `match: ${r.category}`, 'ok');
    } else {
      await step('history', 'no match', 'dim');
      await step('model', `${r.category} (${Math.round(r.confidence * 100)}%)`, 'cyan');
    }
    await step(
      `threshold ${Math.round(AUTO_APPROVE * 100)}%`,
      r.needsReview ? 'below → review queue' : 'above → auto-approved',
      r.needsReview ? 'pink' : 'ok'
    );
  }
  await io.print('', 120);
  io.print([seg('  result  ', 'dim'), seg(r.line ? `Schedule C line ${r.line} · ${r.category}` : r.category, 'lime')]);
  io.print([seg(`  ${r.rationale}`, 'dim')]);
}

function openTarget(name, io) {
  const t = targets[name];
  if (!t) {
    io.print([seg(`open: no such project: ${name || '(none)'}. `, 'err'), seg('try: ', 'dim'), seg(Object.keys(targets).join('  '), 'lime')]);
    return;
  }
  if (t.kind === 'resume') {
    io.print([seg('→ ', 'pink'), seg('Johnny-McConkie-Resume.pdf', 'lime', profile.resumeUrl)]);
    return;
  }
  if (t.kind === 'project') {
    const { p } = t;
    io.print([seg(p.title, 'bold'), seg(`  ${p.kind}`, 'dim')]);
    io.print(p.body);
    io.print([seg(p.stack.join(' · '), 'violet')]);
    if (p.href) io.print([seg('→ ', 'pink'), seg(p.href.replace(/^https?:\/\//, ''), 'lime', p.href)]);
    return;
  }
  const { cs } = t;
  io.print([seg(cs.title, 'bold'), seg(`  ${cs.eyebrow.toLowerCase()}`, 'dim')]);
  io.print(strip(cs.summary));
  io.print('');
  for (const f of cs.facts) io.print([seg(`  ${pad(f.label.toLowerCase(), 10)}`, 'cyan'), seg(strip(f.value))]);
  io.print('');
  io.print([seg('→ ', 'pink'), seg(`read the full case study at ${urlFor(cs.path)}`, 'lime', urlFor(cs.path))]);
  if (cs.site) io.print([seg('→ ', 'pink'), seg(cs.site.label, 'lime', cs.site.href)]);
}

export const COMMANDS = {
  help(_, io) {
    for (const [cmd, desc] of HELP) io.print([seg(`  ${pad(cmd, 26)}`, 'lime'), seg(desc, 'dim')]);
    io.print([seg('  tab completes, ↑ ↓ for history, esc closes. there may be other commands.', 'dim')]);
  },

  whoami(_, io) {
    io.print({ block: 'neofetch' });
  },

  ls(args, io) {
    const what = args[0];
    if (!what) {
      io.print([seg('work/  ', 'cyan'), seg('projects/  ', 'cyan'), seg('research/  ', 'cyan'), seg('resume.pdf  contact', '')]);
      return;
    }
    if (what.startsWith('work')) {
      for (const p of projects) io.print([seg(`  ${pad(p.slug, 14)}`, 'lime'), seg(p.metric, 'bold'), seg(` · ${p.role}`, 'dim')]);
    } else if (what.startsWith('project')) {
      for (const [key, t] of Object.entries(targets)) {
        if (t.kind === 'project') io.print([seg(`  ${pad(key, 14)}`, 'lime'), seg(t.p.kind, 'dim')]);
      }
    } else if (what.startsWith('research')) {
      io.print([seg('  research      ', 'lime'), seg('What does an LLM need to classify a transaction?', 'dim')]);
    } else {
      io.print([seg(`ls: ${what}: no such directory`, 'err')]);
      return;
    }
    io.print([seg('  open <name> for details', 'dim')]);
  },

  open(args, io) {
    openTarget((args[0] || '').toLowerCase(), io);
  },

  cat(args, io) {
    openTarget((args[0] || '').toLowerCase().replace(/\.(md|pdf|txt)$/, ''), io);
  },

  experience(_, io) {
    for (const e of experience) {
      io.print([seg(`  ${pad(e.period, 10)}`, 'dim'), seg(e.role, 'bold'), seg(` · ${e.title}`, 'dim')]);
      io.print([seg(`  ${' '.repeat(10)}`), seg(e.metric, 'lime')]);
    }
    io.print('');
    for (const line of education) io.print([seg(`  ${line}`, 'dim')]);
  },

  contact(_, io) {
    io.print([seg('  email     ', 'cyan'), seg(profile.email, 'lime', `mailto:${profile.email}`)]);
    io.print([seg('  linkedin  ', 'cyan'), seg('in/mcconkiejohn', 'lime', profile.linkedin)]);
    io.print([seg('  github    ', 'cyan'), seg('johnnyt16', 'lime', profile.github)]);
    io.print([seg('  resume    ', 'cyan'), seg('Johnny-McConkie-Resume.pdf', 'lime', profile.resumeUrl)]);
  },

  resume(_, io) {
    openTarget('resume', io);
  },

  classify,

  async gravity(_, io) {
    io.print([seg('› ', 'pink'), seg('releasing gravity…')]);
    await io.sleep(450);
    io.close();
    if (isPlay()) window.dispatchEvent(new Event('site:drop'));
    else enterPlay();
  },

  async run(_, io) {
    io.print([seg('› ', 'pink'), seg('spawning player 1…')]);
    await io.sleep(400);
    io.close();
    startWalk();
  },

  theme(args, io) {
    const t = args[0];
    if (t === 'play') {
      if (!isPlay()) enterPlay();
    } else if (t === 'light' || t === 'dark') {
      if (isPlay()) exitPlay(t);
      else setTheme(t);
    } else {
      io.print([seg('usage: theme <light|dark|play>', 'dim')]);
      return;
    }
    io.print([seg('[ ok ] ', 'ok'), seg(`theme set to ${t}`)]);
  },

  'fun-facts'(_, io) {
    for (const f of funFacts) io.print([seg('  ✦ ', 'pink'), seg(f)]);
    io.print('');
    io.print([seg('  tools  ', 'cyan'), seg(tools, 'dim')]);
  },

  history(_, io) {
    io.history.forEach((h, i) => io.print([seg(`  ${String(i + 1).padStart(3)}  `, 'dim'), seg(h)]));
  },

  echo(args, io) {
    io.print(args.join(' '));
  },

  date(_, io) {
    io.print(new Date().toString());
  },

  clear(_, io) {
    io.clear();
  },

  exit(_, io) {
    io.close();
  },

  // ─── Things people try ───────────────────────────────────────
  async sudo(args, io) {
    const what = args.join(' ').toLowerCase();
    if (/hire/.test(what)) {
      io.print([seg('[sudo] password for recruiter: ', 'dim'), seg('••••••••')]);
      await io.sleep(600);
      io.print([seg('[ ok ] ', 'ok'), seg('access granted. good call.')]);
      io.print([
        seg('→ ', 'pink'),
        seg('open an email to Johnny', 'lime', `mailto:${profile.email}?subject=${encodeURIComponent('Saw your site')}`),
      ]);
      return;
    }
    io.print([seg(`guest is not in the sudoers file. try `, 'err'), seg('sudo hire johnny', 'lime')]);
  },

  rm(args, io) {
    io.print([seg(`rm: ${args.join(' ') || 'nothing'}: permission denied. try `, 'err'), seg('gravity', 'lime'), seg(' instead.', 'err')]);
  },

  vim(_, io) {
    io.print([seg('you can’t exit vim. you can exit this, though: ', 'dim'), seg('exit', 'lime')]);
  },

  ping(_, io) {
    io.print([seg('pong. ', 'ok'), seg('real replies take about a day: '), seg('contact', 'lime')]);
  },
};

export const ALIASES = { neofetch: 'whoami', '?': 'help', man: 'help', cd: 'open', projects: 'ls', work: 'ls', funfacts: 'fun-facts', facts: 'fun-facts', walk: 'run', game: 'run', play: 'run' };

// Full blocks only, so it lines up in any monospace font.
export const NEOFETCH_ART = [
  '    ███  ███     ███',
  '    ███  ████   ████',
  '    ███  ███ ███ ███',
  '    ███  ███  █  ███',
  '███ ███  ███     ███',
  ' █████   ███     ███',
];

export const NEOFETCH_INFO = [
  ['Name', profile.name],
  ['Pitch', profile.line],
  ['Proof', `${projects[0].metric} · ${experience.find((e) => e.slug === 'sunrun').metric}`],
  ['Building', 'LedgerLine + LLM evaluation research'],
  ['School', 'BYU Information Systems, Dec 2026'],
  ['Based', 'Provo, Utah'],
  ['Status', 'Available January 2027'],
];

/** Names tab completion offers for the word after a command. */
export function completions(cmd) {
  if (cmd === 'open' || cmd === 'cat' || cmd === 'cd') return Object.keys(targets);
  if (cmd === 'ls') return ['work', 'projects', 'research'];
  if (cmd === 'theme') return ['light', 'dark', 'play'];
  if (cmd === 'sudo') return ['hire johnny'];
  return [];
}

export const COMMAND_NAMES = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
