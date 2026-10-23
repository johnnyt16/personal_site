/**
 * Side projects on the home page, below Work. Same row format: one line
 * collapsed, details on expand. The terminal reads this list too.
 */

export const sideProjects = [
  {
    slug: 'catalyst',
    title: 'Catalyst',
    role: 'Autonomous LLM trading agent',
    period: '2025–26',
    metric: '24/7 research → trade loop',
    detail: 'A Python agent that researches stocks overnight with GPT-4 and live web search, then trades through every US market session.',
    highlights: [
      'A position manager checks every open trade every 10 seconds and scales out at three profit targets',
      'Trailing stops, a daily loss kill switch, and hard caps on API spend',
    ],
    stack: 'Python · OpenAI · Tavily · Alpaca API · SQLAlchemy',
  },
  {
    slug: 'weather',
    title: 'Weather market bot',
    role: 'Kalshi markets',
    period: '2026',
    metric: '~190-member forecast ensemble',
    detail: 'Prices Kalshi daily-high-temperature markets with a calibrated multi-model weather ensemble, and posts maker-only orders only when the edge clears fees.',
    highlights: [
      'Five forecast models, each bias-corrected at the station that settles the market',
      'Paper-trades until it beats the market’s own odds on Brier score',
    ],
    stack: 'Python · Open-Meteo · Kalshi API · Railway',
  },
  {
    slug: 'groundwork',
    title: 'Groundwork',
    role: 'CRM for a concrete contractor',
    period: '2026',
    metric: 'built for a phone in a truck',
    detail: 'A Forge client build: leads, bids, follow-ups, and won jobs for a one-person concrete contractor.',
    highlights: [
      'Follow-ups are tap-to-text links, not an SMS provider: a lesson from Voley’s carrier fight',
      'Unit, integration, and Playwright end-to-end tests',
    ],
    stack: 'Next.js · TypeScript · Prisma · PostgreSQL · Railway',
  },
  {
    slug: 'deals',
    title: 'Dirt bike deal finder',
    role: 'Side project',
    period: '',
    metric: 'checks every 10 minutes',
    detail: 'Scrapes KSL Classifieds and Craigslist for powersports listings, prices each against a market-value table, and sends me the good ones on Telegram.',
    highlights: ['Fuzzy-matches listing titles to make and model, then scores the discount', 'Backs off on its own when a site rate-limits it'],
    stack: 'Python · rapidfuzz · SQLite · Telegram · Railway',
  },
  {
    slug: 'junzi',
    title: 'Junzi',
    role: 'Side project',
    period: '',
    metric: '',
    detail: 'A public discourse platform built to surface truth through structured debate, not popularity.',
  },
];
