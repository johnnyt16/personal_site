/**
 * Single source of truth for every piece of content on the site.
 * The interactive page and the plain-text resume both read from here,
 * so the two versions can never drift apart.
 *
 * Anything wrapped in TODO() renders as a visible amber marker on the page.
 */

export const TODO = (note) => ({ __todo: note });
export const isTodo = (v) => !!v && typeof v === 'object' && '__todo' in v;

export const profile = {
  name: 'Johnny McConkie',
  headline: TODO('paste your new LinkedIn headline'),
  oneLiner:
    'I build software end to end and handle the business side around it: customers, sales, and operations.',
  location: 'Provo, Utah',
  email: TODO('email address'),
  linkedin: TODO('LinkedIn URL'),
  // Drop the file at public/Johnny-McConkie-Resume.pdf and this link goes live.
  resumeUrl: '/Johnny-McConkie-Resume.pdf',
  resumeTodo: TODO('add your PDF at public/Johnny-McConkie-Resume.pdf'),
};

export const projects = [
  {
    id: 'bookkeeper',
    index: '01',
    kind: 'FEATURED',
    title: 'BookKeeper AI',
    subtitle: 'AI-assisted bookkeeping platform + LLM research',
    status: 'Live, in production',
    meta: 'Built and operated',
    summary:
      'An AI-assisted bookkeeping platform I built and run. It is live and used by an accounting client.',
    stack: ['Next.js', 'PostgreSQL', 'Railway'],
    bullets: [
      'CSV bank-transaction import.',
      'LLM transaction categorization with fallback logic.',
      'Excel export.',
    ],
    research: {
      label: 'RESEARCH',
      body:
        'Directed research study with BYU Prof. Mark Keith testing which input dimensions an LLM needs to accurately categorize business transactions, evaluated against the IRS Schedule C taxonomy.',
      status: TODO('add status or findings when available'),
    },
  },
  {
    id: 'voley',
    index: '02',
    kind: 'FOUNDER',
    title: 'Voley',
    subtitle: 'Communications platform for insurance agencies',
    status: 'Wound down',
    meta: ['Founder', ' · ', 'Feb 2025 – ', TODO('end date')],
    summary:
      'Client SMS/MMS/VoIP, internal team messaging, and compliance for insurance agencies, integrated directly with HawkSoft’s agency management system.',
    stack: ['HawkSoft API', 'SMS/MMS', 'VoIP', 'Compliance'],
    bullets: [
      'Led product and engineering end to end; ran in production with agency teams.',
      'Secured 17 LOIs and converted 2 to paying customers.',
      'Wound down after carrier A2P 10DLC registration blocked the ability to scale SMS.',
    ],
    link: { label: 'HawkSoft API partnership — PR Newswire', href: null, todo: TODO('PR Newswire link') },
    lesson: TODO('one sentence in my words'),
  },
  {
    id: 'attendease',
    index: '03',
    kind: 'CO-FOUNDER',
    title: 'AttendEase',
    subtitle: 'Intelligent camera system for schools',
    status: 'Founded via Crocker Innovation Fellowship',
    meta: ['Technical Co-Founder', ' · ', 'Jan 2025 – ', TODO('end date')],
    summary:
      'Facial recognition that automates school attendance and security tracking. Founded through BYU’s Crocker Innovation Fellowship.',
    stack: ['Web app', 'Mobile app', 'Database architecture'],
    bullets: [
      'Led the web app, mobile app, and database architecture.',
      'Supported sales and outreach with educators and administrators.',
    ],
  },
  {
    id: 'contractor-crm',
    index: '04',
    kind: 'BUILT, NOT LAUNCHED',
    title: 'Contractor CRM',
    subtitle: 'Lead-to-review pipeline for concrete contractors',
    status: 'Built, not launched',
    meta: 'Solo build',
    summary:
      'Meta webhook lead intake, pipeline board, AI-drafted follow-up messages delivered in a daily digest, and a post-job review flow.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Railway'],
    bullets: [
      'Designed around a hard constraint: no programmatic SMS, to avoid the A2P 10DLC issues that ended Voley.',
      'Built largely with autonomous overnight Claude Code runs.',
    ],
  },
  {
    id: 'big-star',
    index: '05',
    kind: 'OPERATIONS',
    title: 'Big Star Concrete & Design',
    subtitle: 'Sales, estimating, marketing, and client communication',
    status: 'Utah contractor',
    meta: [TODO('my title'), ' · ', TODO('dates')],
    summary:
      'I run sales, estimating, marketing, and client communication for a Utah contractor.',
    stack: ['Meta Ads', 'Zapier', 'Lead automation'],
    bullets: [
      'Built the Meta lead-ad funnel and lead-intake automation (Zapier SMS + email alerts).',
    ],
  },
];

export const earlier = [
  {
    role: 'Automation Engineer',
    org: 'EXO. Solutions',
    period: 'Dec 2024 – Sep 2025',
    detail: 'AI automation for service businesses across lead gen, engagement, and retention.',
  },
  {
    role: 'Project Manager',
    org: 'Premium Surface Solutions',
    period: 'Apr – Sep 2024',
    detail:
      'Ran sales and projects end to end; improved the on-site sales process, raising close efficiency ~40%.',
  },
  {
    role: 'Sales Representative',
    org: 'Sunrun',
    period: 'Apr – Sep 2023',
    detail:
      'Closed $1.2M in residential solar contracts (36 systems); consistently top 5 in the office.',
  },
];

export const skills = [
  {
    label: 'ENGINEERING',
    items: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Railway', 'API integrations'],
  },
  {
    label: 'AI',
    items: ['LLM application development', 'LLM evaluation', 'AI automation'],
  },
  {
    label: 'BUSINESS',
    items: ['Sales', 'Customer discovery', 'Project management', 'Meta ads'],
  },
];

export const education = {
  degree: 'B.S. Information Systems',
  school: 'Brigham Young University',
  detail: 'Graduating December 2026',
  honors: [
    'BYU Crocker Innovation Fellow',
    'BYU Sloan Speech Showcase finalist (2022)',
    'Eagle Scout',
  ],
  languages: [
    { name: 'English', level: null },
    { name: 'Spanish', level: TODO('proficiency') },
  ],
};

export const freelance = {
  name: 'Forge Development',
  body: 'I build, host, and maintain websites for local businesses.',
  clients: TODO('client links if desired'),
};

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
