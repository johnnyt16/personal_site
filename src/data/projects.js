/**
 * "More projects" on the home page: smaller builds, freelance work, and
 * side projects. Compact by design; the case studies carry the depth.
 */

export const moreProjects = [
  {
    title: 'Forge Development',
    href: 'https://theforgedev.com',
    kind: 'Freelance web & systems development',
    body: 'My freelance studio. I design, build, host, and maintain websites and internal systems for local businesses, with no upfront cost to the client.',
    stack: ['Next.js', 'Web design', 'Hosting & upkeep'],
    links: [
      { label: 'Yura’s Roofing', href: 'https://www.yurasroofing.com' },
      { label: 'Big Star Built', href: 'https://www.bigstarbuilt.com' },
      { label: 'Aldana’s Construction', href: 'https://www.aldanasconstruction.com' },
      { label: 'Kiley Harrison Insurance', href: 'https://www.kileyharrisoninsurance.com' },
      { label: 'Urban Forest Landscape', href: 'https://www.urbanforestlandscape.com' },
      { label: 'Blackout Med Kits', href: 'https://blackoutmedkits.com' },
    ],
  },
  {
    title: 'Contractor CRM',
    kind: 'Forge system build',
    body: 'A mobile-first CRM for a one-person concrete contractor who runs the business from a truck: leads, bids, follow-ups, and won jobs. Follow-ups are tap-to-text links instead of an SMS provider, a deliberate choice after Voley’s run-in with carrier compliance.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Playwright'],
  },
  {
    title: 'Catalyst',
    kind: 'Autonomous LLM trading agent · side project',
    body: 'A Python agent that researches stocks overnight with GPT-4 and live web search, builds a watchlist, and trades through every US market session. A position manager checks every open trade every 10 seconds, scaling out at multiple profit targets with trailing stops, a daily loss kill switch, and hard caps on API spend.',
    stack: ['Python', 'OpenAI', 'Tavily', 'Alpaca API', 'SQLAlchemy'],
  },
];
