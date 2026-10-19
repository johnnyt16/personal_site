/**
 * Single source of truth for every piece of content on the site.
 * Mirrors public/Johnny-McConkie-Resume.pdf. Update both together.
 */

export const profile = {
  name: 'Johnny McConkie',
  fullName: 'John Taylor McConkie',
  role: 'Founder & Engineer',
  headline: ['I build software', 'and the businesses around it.'],
  intro:
    'Founder and engineer in Provo, Utah. I ship production software end to end, then go sell it, run it, and support the customers using it. Studying Information Systems at BYU, graduating December 2026.',
  location: 'Provo, Utah',
  email: 'johntaylormcc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mcconkiejohn',
  resumeUrl: '/Johnny-McConkie-Resume.pdf',
  status: 'Open to roles starting 2027',
};

export const stats = [
  { value: 30, label: 'Insurance agencies sold on Voley' },
  { value: 42, prefix: '$', suffix: 'K', label: 'Raised from investors and grants' },
  { value: 1.2, prefix: '$', suffix: 'M', decimals: 1, label: 'Solar revenue closed in 10 months' },
  { value: 150, suffix: '+', label: 'Missionaries led and trained in Ecuador' },
];

export const ventures = [
  {
    id: 'bookkeeper',
    title: 'BookKeeper AI',
    role: 'Founder & Engineer',
    period: 'Oct 2025 – Present',
    status: 'Live',
    live: true,
    tagline: 'AI bookkeeping platform, live with paying clients.',
    summary:
      'A bookkeeping platform I built and run myself. An LLM-backed engine classifies incoming business transactions automatically, and I handle client bookkeeping and payroll end to end on top of it.',
    highlights: [
      'Serving 3 clients in production',
      'LLM categorization engine for business transactions',
      'Bookkeeping and payroll run entirely on the platform',
    ],
    stack: ['Next.js', 'PostgreSQL', 'LLMs', 'Railway'],
    featured: true,
  },
  {
    id: 'voley',
    title: 'Voley',
    logo: '/voley-logo.png',
    role: 'Co-founder & Technical Lead',
    period: 'Feb 2025 – Apr 2026',
    status: 'B2B SaaS · Insurtech',
    tagline: 'Two-way texting for independent insurance agencies.',
    summary:
      'Architected and shipped a two-way SMS platform for independent agencies, with an official two-way API integration into HawkSoft, the leading agency management system. Owned the roadmap, managed 5 contract developers, and handled carrier A2P 10DLC registration and compliance.',
    highlights: [
      '30 agencies sold through cold outreach and demos; 12 began migrating',
      '$25K from insurance-industry investors + $17K in three BYU Miller Grants',
      'Keynote speaker, Insurtech Utah 2025',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Twilio', 'HawkSoft API'],
  },
  {
    id: 'attendease',
    title: 'AttendEase',
    logo: '/attendease-logo.png',
    role: 'Technical Co-founder',
    period: 'Jan 2025 – Mar 2026',
    status: 'Crocker Innovation Fellowship',
    tagline: 'Facial-recognition attendance for schools.',
    summary:
      'Built the mobile app, web frontend, and school admin architecture for a camera system that takes attendance automatically, and contributed to the database design.',
    stack: ['Vite', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'research',
    title: 'LLM Evaluation Research',
    role: 'Directed Study · BYU',
    period: 'In progress',
    status: 'Advised by Prof. Mark Keith',
    tagline: 'How much data does an LLM actually need?',
    summary:
      'Building an evaluation framework that measures how the type and volume of input data affect LLM classification accuracy, benchmarked on business transaction categorization against the IRS Schedule C taxonomy.',
    stack: ['Python', 'LLM evaluation', 'Statistics'],
  },
];

export const experience = [
  {
    role: 'Sales & Project Manager',
    org: 'Big Star Concrete & Premium Surface Solutions',
    period: 'Apr 2024 – Present',
    points: [
      'Designed a real-time, on-site estimating process that raised sales efficiency 25% and shortened the quote-to-close cycle.',
      'Built a CRM-based lead tracker and follow-up cadence to systematize the pipeline.',
    ],
  },
  {
    role: 'Residential Sales Representative',
    org: 'Sunrun',
    period: 'Apr 2023 – Feb 2024',
    points: [
      'Generated $1.2M in revenue from 36 accounts in 10 months.',
      'Ranked top 5 of 197 reps for 8 consecutive weeks.',
    ],
  },
  {
    role: 'Database Operations',
    org: 'BYU Continuing Education',
    period: 'Oct 2022 – Apr 2023',
    points: [
      'Built a SQL automation pipeline that cut a recurring two-week team process to two days; adopted as standard practice.',
    ],
  },
];

export const sideBuilds = [
  {
    title: 'Contractor CRM',
    body: 'Lead-to-review pipeline for concrete contractors: Meta webhook lead intake, pipeline board, AI-drafted follow-ups in a daily digest, and a post-job review flow. Built largely with autonomous Claude Code runs.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Forge Development',
    logo: '/forge-logo.png',
    body: 'I build, host, and maintain websites for local businesses.',
    stack: ['Web design', 'Hosting'],
  },
];

export const skills = [
  { label: 'Languages & Data', items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Excel / VBA'] },
  {
    label: 'Frameworks & Infra',
    items: ['Next.js', 'Node.js', 'React', 'Vite', 'PostgreSQL', 'REST APIs', 'Webhooks', 'Twilio', 'AWS', 'Railway'],
  },
  { label: 'AI', items: ['LLM integration', 'LLM evaluation', 'Prompt design', 'Claude Code'] },
  { label: 'Business', items: ['B2B sales', 'Fundraising', 'Product roadmap', 'Managing developers', 'Compliance'] },
];

export const education = {
  school: 'Brigham Young University',
  college: 'Marriott School of Business',
  degree: 'B.S. Information Systems',
  minors: 'Minors in Entrepreneurship & Statistics',
  period: 'Expected Dec 2026',
  gpa: '3.7 major GPA',
  coursework: ['Advanced Database', 'Database Modeling', 'Statistics', 'Programming', 'Information Security'],
};

export const beyond = [
  { title: 'Service mission, Quito, Ecuador', body: 'Two years. Led and trained 150+ missionaries.' },
  { title: 'Crocker Innovation Fellow', body: 'BYU’s fellowship for student founders.' },
  { title: 'Keynote, Insurtech Utah 2025', body: 'Invited keynote speaker, representing Voley.' },
  { title: 'Sloan Speech Showcase finalist', body: 'BYU Marriott School.' },
  { title: 'Eagle Scout', body: 'Boy Scouts of America.' },
  { title: 'Spanish, conversational', body: 'Plus BYU A.I. Association member.' },
];

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
];
