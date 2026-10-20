export default {
  slug: 'ledgerline',
  path: '/work/ledgerline',
  eyebrow: 'Case study',
  title: 'LedgerLine',
  summary:
    'A private bookkeeping platform I built and run for three client businesses. Rules and transaction history categorize most bank activity, an LLM handles the rest with a confidence score, and anything uncertain lands in a review queue.',
  facts: [
    { label: 'Role', value: 'Builder & Operator' },
    { label: 'Timeline', value: 'Oct 2025 – now' },
    { label: 'Stack', value: 'Next.js, PostgreSQL, Prisma, Claude API, Railway' },
    { label: 'Results', value: 'Bookkeeping effort cut by more than half for 3 clients' },
  ],
  sections: [
    {
      heading: 'Problem',
      body: [
        'I do the bookkeeping for three small businesses. Most of the work was categorizing bank transactions by hand: reading a cryptic description like “SQ *BLUE COPPER 0412” and deciding which account it belongs to, thousands of times. It’s repetitive, but it needs judgment, and the cost of a wrong answer shows up at tax time.',
      ],
    },
    {
      heading: 'What I built',
      body: [
        'LedgerLine is a Next.js app on Railway with a PostgreSQL transaction store. Bank activity comes in by CSV import and runs through a categorization pipeline that tries the cheapest, most reliable method first and only escalates when it has to.',
        'It isn’t a product with outside users. It’s the system I run my clients’ books on, which means I feel every miscategorization myself.',
      ],
      bullets: [
        'Rules tier: client-specific rules, then matches against that client’s own categorized history (exact descriptions, vendor names, and close variants)',
        'LLM tier: anything history can’t resolve goes to Claude with the client’s category list and examples, and comes back with a category and a confidence score',
        'Review queue: high-confidence results are approved automatically; everything else waits for me to approve or correct',
        'Transfers and checks with no usable description skip the model entirely and go straight to manual review',
        'Reporting on top of the database: charts, trends, and projections that weren’t practical when the books lived in spreadsheets',
        'Payroll runs in QuickBooks, with automations I built around it',
      ],
    },
    {
      heading: 'Architecture',
      diagram: {
        title: 'LedgerLine categorization pipeline',
        nodes: [
          { id: 'csv', label: 'Bank CSV', sub: 'per client', col: 0, row: 0 },
          { id: 'rules', label: 'Rules + history', sub: 'client’s own past', col: 1, row: 0 },
          { id: 'llm', label: 'Claude', sub: 'category + confidence', col: 2, row: 1 },
          { id: 'review', label: 'Review queue', sub: 'below 0.85', col: 3, row: 1 },
          { id: 'db', label: 'PostgreSQL', sub: 'books, reports', col: 3, row: 0 },
        ],
        edges: [
          ['csv', 'rules'],
          ['rules', 'db'],
          ['rules', 'llm'],
          ['llm', 'db'],
          ['llm', 'review'],
          ['review', 'db'],
        ],
        caption:
          'Each transaction exits at the first step that can answer it confidently. History matches and confident model answers go straight to the books; the rest wait in the review queue. Reports and projections run on the same database.',
      },
    },
    {
      heading: 'Try it',
      body: [
        'Type a bank transaction description and watch which path it takes. This version runs on simple rules in your browser, but the flow mirrors the real one: history first, then a model guess with a confidence score, then review.',
      ],
      embed: 'classify-demo',
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'History before models',
          body: 'Most transactions repeat: the same vendors, the same rent, the same software subscriptions. A client’s own history is the best predictor of how that client books something, so the pipeline checks it first. The model only sees what history can’t settle, which keeps cost down and keeps answers consistent with each client’s conventions.',
        },
        {
          heading: 'Deciding when a human looks',
          body: 'The model returns a confidence score, and a threshold decides what gets approved automatically. Set it too low and mistakes slip through; too high and the review queue becomes the old manual job. Tuning that line, and questioning whether a model’s self-reported confidence can be trusted at all, is what led to my research study.',
        },
        {
          heading: 'Automation with client data',
          body: 'These are real businesses’ finances. I automated aggressively where it was safe and kept manual approval steps where a mistake would matter, so speed never came at the cost of a client’s books being wrong.',
        },
      ],
    },
    {
      heading: 'Results',
      bullets: [
        'Cut the time and effort of monthly bookkeeping by more than half',
        'More consistent categorization, because each client’s past decisions drive future ones',
        'All three clients’ books in one database, which opened up reporting and projections we couldn’t do before',
      ],
    },
    {
      heading: 'What I’d do differently',
      bullets: [
        'Log every model call from day one (prompt, raw output, model version, and the final human label) so accuracy can be measured instead of estimated',
        'Treat model confidence as a hypothesis to validate, not a fact to threshold on',
      ],
    },
  ],
};
