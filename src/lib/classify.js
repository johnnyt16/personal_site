/**
 * Transaction → Schedule C category, for the BookKeeper AI demo.
 *
 * THE SEAM: set VITE_CLASSIFY_ENDPOINT at build time (a Railway variable on
 * this service) to a URL that accepts
 *     POST { "description": string }
 * and returns
 *     { "line": "22", "category": "Supplies", "confidence": 0.91, "rationale": string }
 * The endpoint holds any model API key server-side. Nothing secret ever
 * ships in this bundle. With no endpoint set, a local keyword mock answers.
 */

const ENDPOINT = import.meta.env.VITE_CLASSIFY_ENDPOINT;
export const isMock = !ENDPOINT;

export const MAX_LENGTH = 200;

export async function classifyTransaction(description, { signal } = {}) {
  const text = description.trim().slice(0, MAX_LENGTH);
  if (!text) throw new Error('Enter a transaction description.');

  if (isMock) return mockClassify(text, signal);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: text }),
    signal,
  });
  if (!res.ok) throw new Error(`Classifier returned ${res.status}.`);
  const data = await res.json();
  return { ...data, source: 'api' };
}

/* ─── Mock layer ─────────────────────────────────────────────── */

// Schedule C, Part II expense lines. Order matters: first match wins.
const RULES = [
  { line: '24b', category: 'Deductible meals', words: ['coffee', 'cafe', 'restaurant', 'grill', 'pizza', 'doordash', 'grubhub', 'chipotle', 'starbucks', 'diner'] },
  { line: '24a', category: 'Travel', words: ['airline', 'delta', 'united', 'southwest', 'hotel', 'marriott', 'hilton', 'airbnb', 'expedia'] },
  { line: '9', category: 'Car and truck expenses', words: ['shell', 'chevron', 'exxon', 'maverik', 'fuel', 'gas station', 'uber', 'lyft', 'parking', 'jiffy lube'] },
  { line: '8', category: 'Advertising', words: ['google *ads', 'google ads', 'facebk', 'meta ads', 'facebook', 'yelp', 'linkedin ads', 'mailchimp'] },
  { line: '11', category: 'Contract labor', words: ['upwork', 'fiverr', 'contractor', 'freelance'] },
  { line: '15', category: 'Insurance (other than health)', words: ['insurance', 'state farm', 'geico', 'progressive', 'allstate', 'premium'] },
  { line: '17', category: 'Legal and professional services', words: ['attorney', 'law firm', 'legal', 'cpa', 'accounting', 'legalzoom'] },
  { line: '25', category: 'Utilities', words: ['comcast', 'xfinity', 'verizon', 'at&t', 't-mobile', 'power', 'electric', 'water', 'internet'] },
  { line: '20b', category: 'Rent or lease: other business property', words: ['rent', 'lease', 'regus', 'wework'] },
  { line: '18', category: 'Office expense', words: ['adobe', 'microsoft', 'google *gsuite', 'workspace', 'zoom', 'slack', 'notion', 'dropbox', 'quickbooks', 'software', 'staples', 'office depot'] },
  { line: '22', category: 'Supplies', words: ['home depot', 'lowes', 'lowe’s', 'amazon', 'costco', 'supply', 'supplies'] },
  { line: '23', category: 'Taxes and licenses', words: ['dmv', 'license', 'irs', 'state tax', 'permit'] },
  { line: '16b', category: 'Interest: other', words: ['interest charge', 'finance charge', 'loan interest'] },
  { line: '10', category: 'Commissions and fees', words: ['stripe', 'square fee', 'paypal fee', 'merchant fee', 'commission'] },
];

const wait = (ms, signal) =>
  new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(t);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

async function mockClassify(text, signal) {
  await wait(450, signal);
  const lower = text.toLowerCase();

  // A keyword must start at a word boundary, so "rent" doesn't match "current".
  const starts = (w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(lower);

  for (const rule of RULES) {
    const hit = rule.words.find(starts);
    if (hit) {
      return {
        line: rule.line,
        category: rule.category,
        confidence: 0.86,
        rationale: `Matched “${hit}”, which usually indicates ${rule.category.toLowerCase()}.`,
        source: 'mock',
      };
    }
  }

  return {
    line: '27a',
    category: 'Other expenses',
    confidence: 0.32,
    rationale: 'No strong signal in the description. In production this would go to manual review.',
    source: 'mock',
  };
}
