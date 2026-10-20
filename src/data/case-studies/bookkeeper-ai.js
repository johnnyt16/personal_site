export default {
  slug: 'bookkeeper-ai',
  path: '/work/bookkeeper-ai',
  eyebrow: 'Case study',
  title: 'BookKeeper AI',
  summary:
    'A bookkeeping platform I built and use to run bookkeeping and payroll for clients. An LLM-backed engine categorizes incoming business transactions.',
  facts: [
    { label: 'Role', value: 'Builder & Operator [[TODO: confirm role wording]]' },
    { label: 'Timeline', value: 'Oct 2025 – now' },
    { label: 'Stack', value: 'Next.js, PostgreSQL, LLMs, Railway' },
    { label: 'Results', value: 'Live in production for 3 clients' },
  ],
  sections: [
    {
      heading: 'Problem',
      body: [
        'Most of the time in small-business bookkeeping goes to categorizing transactions: reading a cryptic bank description and deciding which expense category it belongs to. It’s repetitive, but it needs judgment. [[TODO: confirm this framing]]',
      ],
    },
    {
      heading: 'What I built',
      body: [
        'A Next.js app on Railway with a PostgreSQL transaction store. Bank transactions come in by CSV import, an LLM-backed engine assigns each one a category, and I review and export the books. I run the clients’ bookkeeping and payroll end to end on the platform.',
      ],
      bullets: [
        'CSV bank-transaction import',
        'LLM categorization with fallback logic',
        'Excel export',
        '[[TODO: how payroll runs: in the platform or through a provider]]',
      ],
    },
    {
      heading: 'Architecture',
      diagram: {
        title: 'BookKeeper AI architecture',
        nodes: [
          { id: 'csv', label: 'Bank CSV', sub: 'client exports', col: 0, row: 0 },
          { id: 'import', label: 'Import', sub: 'Next.js', col: 1, row: 0 },
          { id: 'llm', label: 'Categorizer', sub: 'LLM + fallback', col: 2, row: 0 },
          { id: 'db', label: 'PostgreSQL', sub: 'transactions', col: 2, row: 1 },
          { id: 'review', label: 'Review', sub: 'me, per client', col: 3, row: 0 },
          { id: 'export', label: 'Excel export', sub: 'books, reports', col: 3, row: 1 },
        ],
        edges: [
          ['csv', 'import'],
          ['import', 'llm'],
          ['llm', 'db', true],
          ['llm', 'review'],
          ['review', 'export'],
        ],
        caption: 'Imported transactions are normalized, categorized, stored, and reviewed before export. [[TODO: confirm components and flow]]',
      },
    },
    {
      heading: 'Try it',
      body: [
        'Type a bank transaction description and get back a Schedule C category. This version runs on simple rules in your browser; the production engine uses an LLM with fallback logic.',
      ],
      embed: 'classify-demo',
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'When the model isn’t sure',
          body: 'Bank descriptions are often too vague to categorize on their own. The engine falls back when the LLM’s answer can’t be trusted. [[TODO: what the fallback is (rules, vendor history, manual queue) and how you decide to use it]]',
        },
        {
          heading: 'What data to send the model',
          body: 'How much context the model needs (description alone, amount, vendor history) is the question my BYU research study is now measuring. [[TODO: what the production prompt actually includes]]',
        },
        {
          heading: 'Operating it myself',
          body: 'Because I run clients’ books on the platform, every miscategorization is my problem to fix. [[TODO: one concrete change you made because of running it yourself]]',
        },
      ],
    },
    {
      heading: 'What I’d do differently',
      bullets: ['[[TODO: one or two lessons in your own words]]'],
    },
  ],
};
