/**
 * Work rows on the home page. One line each by default (title, role,
 * years, one bolded metric); click to expand detail, stack, and links.
 *
 * Media is used by the case-study pages: drop the file at `src` under
 * public/ (see public/work/README.md), then set `ready: true`.
 */

export const projects = [
  {
    slug: 'voley',
    featured: true,
    title: 'Voley',
    role: 'Co-founder & Technical Lead',
    period: '2025–26',
    metric: '30 agencies signed · $42K in grants',
    detail: 'A shared texting inbox for independent insurance agencies, built on an official two-way HawkSoft integration.',
    highlights: [
      'Led five contract developers while running sales myself',
      'Signed 30 agencies through cold outreach; 54% of calls turned into demos',
      'Won $42K in grants and gave the keynote at Insurtech Utah 2025',
    ],
    stack: 'Next.js · Node.js · PostgreSQL · Twilio',
    links: [
      { label: 'Case study', href: '/work/voley/' },
      { label: 'letsvoley.com', href: 'https://www.letsvoley.com', external: true },
    ],
    media: { type: 'image', src: '/work/voley.webp', alt: 'Voley inbox showing a two-way text conversation with an insurance client', ready: false },
  },
  {
    slug: 'ledgerline',
    featured: true,
    title: 'LedgerLine',
    role: 'Builder & Operator',
    period: '2025–now',
    metric: '50%+ less bookkeeping time',
    detail: 'The private platform I run three clients’ books on.',
    highlights: [
      'History first, Claude second, and a human for anything under 85% confidence',
      'Cut monthly bookkeeping time by more than half',
      'Try the classifier in the case study’s live demo',
    ],
    stack: 'Next.js · PostgreSQL · Prisma · Claude API · Railway',
    links: [{ label: 'Case study + live demo', href: '/work/ledgerline/' }],
    media: { type: 'image', src: '/work/ledgerline.webp', alt: 'LedgerLine transaction list with suggested categories and confidence scores', ready: false },
  },
  {
    slug: 'attendease',
    featured: true,
    title: 'AttendEase',
    role: 'Technical Co-founder',
    period: '2025–26',
    metric: '~99% match with manual roll',
    detail: 'Facial-recognition attendance for schools, started through BYU’s Crocker Innovation Fellowship.',
    highlights: [
      'Built the mobile app, web frontend, and multi-school admin system',
      'Matched manual attendance about 99% of the time in a school pilot',
      'Families who opted out were tracked by anonymous ID, with no personal data stored',
    ],
    stack: 'Python · Node.js · PostgreSQL · AWS EC2',
    links: [{ label: 'Case study', href: '/work/attendease/' }],
    media: { type: 'image', src: '/work/attendease.webp', alt: 'AttendEase admin dashboard showing a class attendance roster', ready: false },
  },
  {
    slug: 'forge',
    title: 'Forge Development',
    role: 'Freelance',
    period: 'Ongoing',
    metric: '6 client sites live',
    detail: 'My freelance studio: websites and internal systems for local businesses.',
    highlights: ['Six live client sites, from a roofing company to insurance agencies', 'Systems work too, like the contractor CRM below'],
    stack: 'Next.js · TypeScript · Prisma · PostgreSQL',
    clients: [
      { label: 'Yura’s Roofing', href: 'https://www.yurasroofing.com' },
      { label: 'Big Star Built', href: 'https://www.bigstarbuilt.com' },
      { label: 'Aldana’s Construction', href: 'https://www.aldanasconstruction.com' },
      { label: 'Kiley Harrison Insurance', href: 'https://www.kileyharrisoninsurance.com' },
      { label: 'Urban Forest Landscape', href: 'https://www.urbanforestlandscape.com' },
      { label: 'Blackout Med Kits', href: 'https://blackoutmedkits.com' },
    ],
    links: [{ label: 'theforgedev.com', href: 'https://theforgedev.com', external: true }],
  },
];
