export default {
  slug: 'llm-classification',
  path: '/research/llm-classification',
  eyebrow: 'Research',
  title: 'How much data does an LLM need to categorize a transaction?',
  summary:
    'A directed study at BYU, advised by Prof. Mark Keith, measuring how the type and volume of input data affect LLM classification accuracy on business transactions labeled with the IRS Schedule C taxonomy.',
  facts: [
    { label: 'Advisor', value: 'Prof. Mark Keith, BYU' },
    { label: 'Status', value: 'In progress' },
    { label: 'Benchmark', value: 'Business transactions → Schedule C categories' },
    { label: 'Write-up', value: 'Coming soon [[TODO: link when ready]]' },
  ],
  chart: true,
  sections: [
    {
      heading: 'Question',
      body: [
        'Teams using LLMs to categorize transactions have to decide what to send the model: just the bank description, or also the amount, the merchant, and past history. More context costs more and isn’t always better. This study measures which inputs actually move accuracy, and how much labeled data it takes.',
      ],
    },
    {
      heading: 'Method',
      body: [
        'The framework holds the model and task fixed and varies the input: its type (which fields are included) and its volume (how many examples or how much history the model sees). Each condition is scored against ground-truth Schedule C labels.',
      ],
      bullets: [
        'Dataset: [[TODO: source and number of transactions]]',
        'Input types: [[TODO: the actual conditions, e.g. description only, + amount, + merchant, + history]]',
        'Models: [[TODO]]',
        'Metrics: accuracy [[TODO: plus macro F1 or others?]]',
      ],
    },
    {
      heading: 'Pipeline',
      diagram: {
        title: 'Evaluation pipeline',
        nodes: [
          { id: 'data', label: 'Labeled data', sub: 'Schedule C labels', col: 0, row: 0 },
          { id: 'build', label: 'Input builder', sub: 'type × volume', col: 1, row: 0 },
          { id: 'llm', label: 'LLM classifier', sub: 'fixed prompt', col: 2, row: 0 },
          { id: 'score', label: 'Scoring', sub: 'vs. ground truth', col: 3, row: 0 },
        ],
        edges: [
          ['data', 'build'],
          ['build', 'llm'],
          ['llm', 'score'],
        ],
        caption: 'Each condition is a different input configuration run through the same classifier and scored against the labels.',
      },
    },
    {
      heading: 'Early results',
      body: ['[[TODO: replace the placeholder chart data and summarize what you found]]'],
    },
  ],
};
