/**
 * PLACEHOLDER DATA. Replace with real results once live runs finish, then
 * set placeholder: false.
 *
 * x: cumulative input level (D1 description only ... D5 full context).
 * Each series is one model tier; values are accuracy from 0 to 1.
 */
export const accuracy = {
  placeholder: true,
  title: 'Accuracy by input level and model tier',
  xLabel: 'Input level (cumulative)',
  x: ['D1', 'D2', 'D3', 'D4', 'D5'],
  xNames: ['Description only', '+ Amount', '+ Date & recurrence', '+ Retrieved history', '+ Industry & account'],
  series: [
    { id: 'small', label: 'Small model', values: [0.55, 0.59, 0.61, 0.78, 0.8] },
    { id: 'mid', label: 'Mid model', values: [0.62, 0.66, 0.68, 0.82, 0.84] },
    { id: 'frontier', label: 'Frontier model', values: [0.68, 0.71, 0.73, 0.85, 0.87] },
  ],
};

export const research = {
  summary:
    'A directed study with Prof. Mark Keith at BYU. When an LLM miscategorizes a financial transaction, is the fix a bigger model or better information? I’m building a benchmark on real, de-identified bookkeeping data to find out.',
  href: '/research/llm-classification/',
  paperUrl: null, // set when the write-up is published
};
