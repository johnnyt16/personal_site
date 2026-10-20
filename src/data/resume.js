/**
 * Home page content. Mirrors public/Johnny-McConkie-Resume.pdf, so update
 * both together. Project cards live in ./work.js, case studies in
 * ./case-studies/.
 *
 * Wrap anything unverified in [[TODO: note]]. It renders as a visible
 * marker, and `npm run todos` lists every one.
 */

export const profile = {
  name: 'Johnny McConkie',
  positioning: 'I build software products and sell them.',
  proof: [
    { value: '30', label: 'agencies sold' },
    { value: '$42K', label: 'raised' },
    { value: '$1.2M', label: 'closed in sales' },
  ],
  now: 'Finishing my B.S. at BYU in December 2026. Looking for full-stack AI product engineering, forward-deployed engineering, or product roles, available January 2027.',
  about: [
    'I’m a full-stack engineer who also does the selling. At Voley I was the technical lead: I built the platform and its official HawkSoft integration, then sold it to 30 insurance agencies through cold outreach and demos.',
    'Today I build and operate BookKeeper AI, a platform I use to run bookkeeping and payroll for clients, and I’m running a directed study at BYU on how input data affects LLM classification accuracy.',
    'Before software I sold residential solar and ran sales for a concrete contractor.',
  ],
  email: 'johntaylormcc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mcconkiejohn',
  github: 'https://github.com/johnnyt16',
  resumeUrl: '/Johnny-McConkie-Resume.pdf',
};

export const experienceIntro =
  'Three years of selling and running operations, before and alongside the software.';

export const experience = [
  {
    org: 'Big Star Concrete & Premium Surface Solutions',
    role: 'Sales & Project Manager',
    period: '2024 – now',
    result: 'Built an on-site estimating process that raised sales efficiency 25% and shortened quote-to-close.',
  },
  {
    org: 'Sunrun',
    role: 'Residential Sales',
    period: '2023 – 2024',
    result: '$1.2M closed across 36 accounts in 10 months. Top 5 of 197 reps for eight straight weeks.',
  },
  {
    org: 'BYU Continuing Education',
    role: 'Database Operations',
    period: '2022 – 2023',
    result: 'SQL automation that cut a two-week team process to two days; adopted as standard practice.',
  },
];

export const education = {
  school: 'Brigham Young University',
  degree: 'B.S. Information Systems, Minor in Entrepreneurship',
  period: 'Dec 2026',
  detail: '3.7 major GPA · Crocker Innovation Fellow',
};

export const other = [
  'Two-year service mission in Quito, Ecuador; led and trained 150+ missionaries',
  'Conversational Spanish',
  'BYU Sloan Speech Showcase finalist',
  'Eagle Scout',
];

export const tools =
  'TypeScript, Python, SQL, Next.js, Node.js, PostgreSQL, AWS, Twilio, Railway, LLM integration and evaluation';

/** Home page sections, in order. Drives the sidebar nav. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];
