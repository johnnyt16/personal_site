/**
 * PLACEHOLDER DATA. Replace with real results from the study.
 *
 * x: how much labeled data the model sees (e.g. examples in the prompt).
 * Each series is one input type; values are accuracy from 0 to 1.
 */
export const accuracy = {
  placeholder: true,
  xLabel: 'Labeled examples in prompt',
  x: [0, 10, 50, 200],
  series: [
    { id: 'desc', label: 'Description only', values: [0.58, 0.66, 0.71, 0.73] },
    { id: 'amount', label: '+ Amount', values: [0.63, 0.72, 0.78, 0.8] },
    { id: 'history', label: '+ Merchant history', values: [0.7, 0.8, 0.86, 0.89] },
  ],
};

export const research = {
  summary:
    'A directed study with Prof. Mark Keith at BYU. I’m measuring how the type and volume of input data change LLM accuracy when categorizing business transactions into IRS Schedule C categories.',
  href: '/research/llm-classification/',
  paperUrl: null, // set when the write-up is published
};
