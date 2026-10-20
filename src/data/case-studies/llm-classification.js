export default {
  slug: 'llm-classification',
  path: '/research/llm-classification',
  eyebrow: 'Research',
  title: 'What does an LLM need to classify a transaction?',
  summary:
    'A directed study at BYU with Prof. Mark Keith. When a deployed classifier gets an accounting transaction wrong, should you buy a better model, give it more information, or send it to a human? This benchmark measures which inputs actually matter, and whether more context can stand in for a bigger model.',
  facts: [
    { label: 'Advisor', value: 'Prof. Mark Keith, BYU' },
    { label: 'Status', value: 'Design complete · data prep in progress' },
    { label: 'Data', value: 'Real transactions from 3 businesses, de-identified' },
    { label: 'Write-up', value: 'Coming soon' },
  ],
  sections: [
    {
      heading: 'Question',
      body: [
        'Transaction categorization is usually treated as text classification: description in, category out. But a bank feed carries more than a description: the amount, the date, whether it recurs, and how the business booked that counterparty before. Transactions also differ in kind. A software subscription, a loan payment, and an owner draw need different information to classify correctly.',
        'The study asks which of those inputs an LLM needs, how that changes by transaction type, and how input richness trades off against model capability and label granularity.',
      ],
    },
    {
      heading: 'Design',
      body: [
        'Every test transaction is classified under every condition, so item difficulty is held constant and only the factor being studied changes.',
      ],
      bullets: [
        'Five cumulative input levels: description only → + amount → + date and recurrence → + retrieved history (10 similar prior transactions from that client, with their labels) → + industry and account type',
        'Three model tiers (small, mid, frontier) spanning roughly 10× in price',
        'Two label granularities: 35 accounts built on IRS Schedule C, and 6 transaction cycles',
        'Items sampled across six transaction cycles and three “evidence” levels, from easy repeat vendors to brand-new counterparties',
        'Two repeats per condition, about 21,600 classifications in total',
      ],
    },
    {
      heading: 'Pipeline',
      diagram: {
        title: 'Evaluation pipeline',
        nodes: [
          { id: 'snap', label: 'Snapshot', sub: 'local copy only', col: 0, row: 0 },
          { id: 'deid', label: 'De-identify', sub: 'names removed', col: 1, row: 0 },
          { id: 'tag', label: 'Tag + sample', sub: 'cycle × evidence', col: 2, row: 0 },
          { id: 'inputs', label: 'Build inputs', sub: 'D1 to D5', col: 3, row: 0 },
          { id: 'models', label: '3 model tiers', sub: 'small · mid · frontier', col: 3, row: 1 },
          { id: 'score', label: 'Score', sub: 'vs. cold labels', col: 2, row: 1 },
        ],
        edges: [
          ['snap', 'deid'],
          ['deid', 'tag'],
          ['tag', 'inputs'],
          ['inputs', 'models'],
          ['models', 'score'],
        ],
        caption:
          'Research code runs against a local snapshot, never production. Every run is logged with the exact model, prompt hash, and config, and results are append-only.',
      },
    },
    {
      heading: 'Hypotheses',
      bullets: [
        'A client’s own history contributes more than any other single input, because the right category is often a house convention, not a fact about the merchant',
        'More input can substitute for model capability: a small model with full context matches a frontier model given only the description, at a fraction of the cost',
        'Which inputs matter depends on the transaction type. Expenses lean on history; financing and transfers lean on amount and account structure',
        'Accuracy drops at fine granularity, mostly where the answer depends on information outside the transaction line',
        'Stored production labels agree with independent expert labels less often than assumed',
      ],
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'Trustworthy ground truth',
          body: 'Production labels can’t be the answer key: many were approved with the model’s own suggestion on screen. Instead, an accountant labels every test item cold, seeing only the raw transaction. A second accountant labels a 60-item overlap independently, and agreement is reported as Cohen’s κ.',
        },
        {
          heading: 'No peeking at the future',
          body: 'Retrieved history is bounded to transactions dated before each test item, and the code checks every neighbor and fails loudly on a violation. Without that, history would look more useful than it really is.',
        },
        {
          heading: 'De-identification you can measure',
          body: 'Bank descriptions name real people: check payees, Zelle and Venmo counterparties, memo notes. The export pipeline replaces them with stable pseudonyms and reports exactly what it scrubbed, so privacy is measured rather than assumed. No data reaches a model API until that check and the advisor’s written approval are both in place.',
        },
        {
          heading: 'A baseline that keeps the LLM honest',
          body: 'A simple nearest-neighbor approach (copy the label of the most similar past transaction) turned out to be strong on easy items. I’ve proposed adding it as a baseline, so the real question becomes whether an LLM adds anything on the hard cases.',
        },
      ],
    },
    {
      heading: 'Status',
      body: [
        'The harness is built and tested: export, de-identification, tagging, retrieval, and a model runner. A 200-item pilot (12,000 planned calls) has been dry-run end to end. Live runs start once the dataset approval is in writing. The chart below shows the shape of the main result, using placeholder numbers until then.',
      ],
      embed: 'accuracy-chart',
    },
  ],
};
