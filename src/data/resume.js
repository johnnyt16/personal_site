/**
 * Home page content. Mirrors public/Johnny-McConkie-Resume.pdf, so update
 * both together. Work rows live in ./work.js, case studies in
 * ./case-studies/, terminal-only extras in ../play/commands.js.
 *
 * Wrap anything unverified in [[TODO: note]]. It renders as a visible
 * marker, and `npm run todos` lists every one.
 */

export const profile = {
  name: 'Johnny McConkie',
  line: 'Full-stack engineer in Provo. I usually end up selling what I build, too.',
  intro:
    'I like building things, so I build a lot of them: two startups, an AI bookkeeping platform, client websites, a couple of trading bots, and whatever’s next.',
  status: 'Graduating BYU Dec 2026 · open to engineering roles starting Jan 2027',
  positioning: 'Full-stack engineer in Provo. I usually end up selling what I build, too.',
  email: 'johntaylormcc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mcconkiejohn',
  github: 'https://github.com/johnnyt16',
  resumeUrl: '/Johnny-McConkie-Resume.pdf',
};

export const research = {
  slug: 'llm-classification',
  title: 'LLM classification study',
  role: 'Directed study, BYU',
  period: '2026',
  metric: '60-condition benchmark',
  detail: 'When an LLM miscategorizes a financial transaction, is the fix a bigger model or better information?',
  highlights: [
    'Five input levels × three model tiers × two label granularities',
    'Real, de-identified bookkeeping data, scored against cold accountant labels',
  ],
  stack: 'Python · LLM evaluation · Experimental design',
  links: [{ label: 'Read about the study', href: '/research/llm-classification/' }],
};

export const experience = [
  {
    slug: 'big-star',
    title: 'Big Star Concrete',
    role: 'Sales & Project Manager',
    period: '2024–now',
    metric: '+25% sales efficiency',
    detail:
      'Sales and project management for Big Star Concrete & Premium Surface Solutions. Designed an on-site estimating process that shortened quote-to-close, and built the CRM lead tracker and follow-up cadence.',
  },
  {
    slug: 'sunrun',
    title: 'Sunrun',
    role: 'Residential Sales',
    period: '2023–24',
    metric: '$1.2M closed · top 5 of 197 reps',
    detail: '36 accounts in 10 months, and top 5 of 197 reps for eight straight weeks.',
  },
  {
    slug: 'byu-ce',
    title: 'BYU Continuing Education',
    role: 'Database Operations',
    period: '2022–23',
    metric: '2 weeks → 2 days',
    detail: 'A SQL automation pipeline that cut a recurring team process from two weeks to two days. It became standard practice.',
  },
];

export const education = {
  school: 'Brigham Young University',
  period: 'Dec 2026',
  college: 'Marriott School of Business',
  degree: 'B.S. Information Systems · Minor in Entrepreneurship · 3.7 major GPA',
  honors: ['Crocker Innovation Fellow', 'BYU Sloan Speech Showcase finalist', 'Three BYU Miller Grants', 'BYU A.I. Association'],
  coursework: ['Advanced Database', 'Database Modeling', 'Statistics', 'Programming', 'Information Security'],
};

/** "Off the clock" section. */
export const life = [
  { text: 'Guitarist in ruca83', link: { label: 'linktr.ee/ruca83', href: 'https://linktr.ee/ruca83' } },
  { text: 'Two-year mission in Quito, Ecuador, where I led and trained 150+ missionaries. Conversational Spanish.' },
  { text: 'Eagle Scout and avid outdoorsman' },
];

/** Terminal-only: `fun-facts`. Kept off the page on purpose. */
export const funFacts = [
  'Guitarist in ruca83: linktr.ee/ruca83',
  'Two-year service mission in Quito, Ecuador; led and trained 150+ missionaries',
  'Conversational Spanish',
  'Eagle Scout and avid outdoorsman',
  'BYU Sloan Speech Showcase finalist',
];

export const tools =
  'TypeScript, Python, SQL, Next.js, Node.js, PostgreSQL, AWS, Twilio, Railway, LLM integration and evaluation';

/** Home page sections, in order. Drives the sidebar nav. */
export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'life', label: 'Off the clock' },
];
