/**
 * Selected Work cards on the home page. Each links to a case study.
 *
 * Media: drop the file at the `src` path under public/ (see
 * public/work/README.md for sizes), then set `ready: true`. Until then the
 * card shows a labeled placeholder.
 */

export const projects = [
  {
    slug: 'voley',
    href: '/work/voley/',
    site: { label: 'letsvoley.com', href: 'https://www.letsvoley.com' },
    title: 'Voley',
    role: 'Co-founder & Technical Lead',
    period: '2025 – 2026',
    outcome: 'Shared inbox for insurance agencies on an official HawkSoft integration. 30 agencies signed, $42K raised.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Twilio'],
    media: { type: 'image', src: '/work/voley.webp', alt: 'Voley inbox showing a two-way text conversation with an insurance client', ready: false },
  },
  {
    slug: 'ledgerline',
    href: '/work/ledgerline/',
    title: 'LedgerLine',
    role: 'Builder & Operator',
    period: '2025 – now',
    outcome: 'Private bookkeeping platform with history-first, LLM-backed categorization. Cut bookkeeping effort for 3 clients by more than half.',
    stack: ['Next.js', 'PostgreSQL', 'Claude API', 'Railway'],
    media: { type: 'image', src: '/work/ledgerline.webp', alt: 'LedgerLine transaction list with suggested categories and confidence scores', ready: false },
  },
  {
    slug: 'attendease',
    href: '/work/attendease/',
    title: 'AttendEase',
    role: 'Technical Co-founder',
    period: '2025 – 2026',
    outcome: 'Facial-recognition attendance for schools. ~99% agreement with manual roll in a school pilot.',
    stack: ['Python', 'Node.js', 'PostgreSQL', 'AWS'],
    media: { type: 'image', src: '/work/attendease.webp', alt: 'AttendEase admin dashboard showing a class attendance roster', ready: false },
  },
];
