/**
 * Every piece of content on the site. Mirrors
 * public/Johnny-McConkie-Resume.pdf, so update both together.
 */

export const profile = {
  name: 'Johnny McConkie',
  intro: [
    'I’m a founder and software engineer in Provo, Utah, finishing a B.S. in Information Systems at BYU in December 2026.',
    'I build products end to end and handle the business around them: selling to customers, raising money, and running operations. Right now I build and operate BookKeeper AI and study how input data affects LLM classification accuracy.',
  ],
  email: 'johntaylormcc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mcconkiejohn',
  resumeUrl: '/Johnny-McConkie-Resume.pdf',
};

export const work = [
  {
    title: 'BookKeeper AI',
    // TODO(johnny): confirm the role wording for BookKeeper AI.
    role: 'Builder & Operator',
    period: '2025 – now',
    body: 'A bookkeeping platform serving three clients. An LLM-backed engine categorizes incoming business transactions, and I run the clients’ bookkeeping and payroll on top of it.',
    stack: 'Next.js, PostgreSQL, Railway',
  },
  {
    title: 'Voley',
    role: 'Co-founder & Technical Lead',
    period: '2025 – 2026',
    body: 'Built a two-way SMS platform for independent insurance agencies, with an official API integration into HawkSoft. I owned the architecture, roadmap, A2P 10DLC compliance, and a team of five contract developers. Sold 30 agencies through cold outreach and demos, raised $42K from industry investors and BYU Miller Grants, and gave the keynote at Insurtech Utah 2025.',
    stack: 'Next.js, Node.js, PostgreSQL, Twilio',
  },
  {
    title: 'AttendEase',
    role: 'Technical Co-founder',
    period: '2025 – 2026',
    body: 'A facial-recognition attendance system for schools. I built the mobile app, web frontend, and school admin architecture, and contributed to the database design.',
    stack: 'Vite, Node.js, PostgreSQL, AWS',
  },
  {
    title: 'LLM evaluation research',
    role: 'Directed study with Prof. Mark Keith, BYU',
    period: 'Ongoing',
    body: 'A framework for measuring how the type and volume of input data affect LLM classification accuracy, benchmarked on business transactions against the IRS Schedule C taxonomy.',
  },
];

export const experience = [
  {
    title: 'Big Star Concrete & Premium Surface Solutions',
    role: 'Sales & Project Manager',
    period: '2024 – now',
    body: 'Designed an on-site estimating process that raised sales efficiency 25% and shortened the quote-to-close cycle. Built the CRM lead tracker and follow-up cadence.',
  },
  {
    title: 'Sunrun',
    role: 'Residential Sales',
    period: '2023 – 2024',
    body: 'Closed $1.2M across 36 accounts in 10 months. Top 5 of 197 reps for eight straight weeks.',
  },
  {
    title: 'BYU Continuing Education',
    role: 'Database Operations',
    period: '2022 – 2023',
    body: 'Built a SQL automation pipeline that cut a recurring two-week process to two days. It became standard practice.',
  },
];

export const education = {
  title: 'Brigham Young University',
  role: 'B.S. Information Systems, Marriott School of Business',
  period: '2026',
  body: 'Minor in Entrepreneurship. 3.7 major GPA. Crocker Innovation Fellow.',
};

export const other = [
  'Two-year service mission in Quito, Ecuador; led and trained 150+ missionaries',
  'Conversational Spanish',
  'BYU Sloan Speech Showcase finalist',
  'Eagle Scout',
];

export const tools =
  'TypeScript, Python, SQL, Next.js, Node.js, PostgreSQL, AWS, Twilio, Railway, LLM integration and evaluation';
