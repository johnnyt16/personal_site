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
    href: '/work/voley',
    title: 'Voley',
    role: 'Co-founder & Technical Lead',
    period: '2025 – 2026',
    outcome: 'Two-way texting for insurance agencies. Sold to 30 agencies; built the official HawkSoft integration.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Twilio'],
    media: { type: 'image', src: '/work/voley.webp', alt: 'Voley inbox showing a two-way text conversation with an insurance client', ready: false },
  },
  {
    slug: 'bookkeeper-ai',
    href: '/work/bookkeeper-ai',
    title: 'BookKeeper AI',
    role: 'Builder & Operator [[TODO: confirm role wording]]',
    period: '2025 – now',
    outcome: 'Bookkeeping platform with LLM transaction categorization, running books and payroll for 3 clients.',
    stack: ['Next.js', 'PostgreSQL', 'LLMs', 'Railway'],
    media: { type: 'image', src: '/work/bookkeeper-ai.webp', alt: 'BookKeeper AI transaction list with suggested categories', ready: false },
  },
  {
    slug: 'attendease',
    href: '/work/attendease',
    title: 'AttendEase',
    role: 'Technical Co-founder',
    period: '2025 – 2026',
    outcome: 'Facial-recognition attendance for schools. Built the mobile app, web app, and admin system.',
    stack: ['Vite', 'Node.js', 'PostgreSQL', 'AWS'],
    media: { type: 'image', src: '/work/attendease.webp', alt: 'AttendEase admin dashboard showing a class attendance roster', ready: false },
  },
];
