/**
 * Transaction → category, for the LedgerLine demo. Mirrors the production
 * flow: ambiguous descriptions skip the model, known vendors resolve from
 * history, everything else gets a model guess with a confidence score, and
 * anything under the auto-approve threshold goes to review.
 *
 * THE SEAM: set VITE_CLASSIFY_ENDPOINT at build time (a Railway variable on
 * this service) to a URL that accepts
 *     POST { "description": string }
 * and returns
 *     { "method": "history" | "model" | "ambiguous",
 *       "line": "22", "category": "Supplies",
 *       "confidence": 0.91, "rationale": string }
 * The endpoint holds any model API key server-side. Nothing secret ever
 * ships in this bundle. With no endpoint set, a local mock answers.
 */

const ENDPOINT = import.meta.env.VITE_CLASSIFY_ENDPOINT;
export const isMock = !ENDPOINT;

export const MAX_LENGTH = 200;
export const AUTO_APPROVE = 0.85;

export async function classifyTransaction(description, { signal } = {}) {
  const text = description.trim().slice(0, MAX_LENGTH);
  if (!text) throw new Error('Enter a transaction description.');

  const result = isMock ? await mockClassify(text, signal) : await callEndpoint(text, signal);
  return { ...result, needsReview: result.method === 'ambiguous' || result.confidence < AUTO_APPROVE };
}

async function callEndpoint(text, signal) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: text }),
    signal,
  });
  if (!res.ok) throw new Error(`Classifier returned ${res.status}.`);
  return { ...(await res.json()), source: 'api' };
}

/* ─── Mock layer ─────────────────────────────────────────────── */

// Bank lines with no usable signal. Production never sends these to a model.
const AMBIGUOUS = /^(check|chk|deposit|misc deposit|wire|wire ref|transfer|online transfer)\b/;

// A pretend client's categorized history: vendor prefix → how they booked it.
const HISTORY = [
  { vendor: 'adobe', line: '18', category: 'Office expense' },
  { vendor: 'home depot', line: '22', category: 'Supplies' },
  { vendor: 'google *ads', line: '8', category: 'Advertising' },
  { vendor: 'state farm', line: '15', category: 'Insurance (other than health)' },
];

// Stand-in for the model: keyword hints with a made-up confidence.
// Schedule C Part II lines. First match wins.
const HINTS = [
  { line: '24b', category: 'Deductible meals', confidence: 0.78, words: ['coffee', 'cafe', 'restaurant', 'grill', 'pizza', 'doordash', 'grubhub', 'starbucks', 'diner'] },
  { line: '24a', category: 'Travel', confidence: 0.9, words: ['airline', 'delta', 'united', 'southwest', 'hotel', 'marriott', 'hilton', 'airbnb', 'expedia'] },
  { line: '9', category: 'Car and truck expenses', confidence: 0.88, words: ['shell', 'chevron', 'exxon', 'maverik', 'fuel', 'uber', 'lyft', 'parking', 'jiffy lube'] },
  { line: '8', category: 'Advertising', confidence: 0.9, words: ['facebk', 'meta ads', 'facebook', 'yelp', 'linkedin ads', 'mailchimp'] },
  { line: '11', category: 'Contract labor', confidence: 0.86, words: ['upwork', 'fiverr', 'contractor', 'freelance'] },
  { line: '15', category: 'Insurance (other than health)', confidence: 0.87, words: ['insurance', 'geico', 'progressive', 'allstate', 'premium'] },
  { line: '17', category: 'Legal and professional services', confidence: 0.86, words: ['attorney', 'law firm', 'legal', 'cpa', 'accounting', 'legalzoom'] },
  { line: '25', category: 'Utilities', confidence: 0.91, words: ['comcast', 'xfinity', 'verizon', 'at&t', 't-mobile', 'power', 'electric', 'water', 'internet'] },
  { line: '20b', category: 'Rent or lease: other business property', confidence: 0.8, words: ['rent', 'lease', 'regus', 'wework'] },
  { line: '18', category: 'Office expense', confidence: 0.89, words: ['microsoft', 'workspace', 'zoom', 'slack', 'notion', 'dropbox', 'quickbooks', 'software', 'staples', 'office depot'] },
  { line: '22', category: 'Supplies', confidence: 0.74, words: ['lowes', 'amazon', 'costco', 'supply', 'supplies'] },
  { line: '23', category: 'Taxes and licenses', confidence: 0.88, words: ['dmv', 'license', 'irs', 'state tax', 'permit'] },
  { line: '10', category: 'Commissions and fees', confidence: 0.86, words: ['stripe', 'square fee', 'paypal fee', 'merchant fee', 'commission'] },
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

  if (AMBIGUOUS.test(lower)) {
    return {
      method: 'ambiguous',
      line: null,
      category: 'Needs a human',
      confidence: 0,
      rationale: 'Checks, deposits, and transfers carry no usable description, so they skip the model and go straight to review.',
      source: 'mock',
    };
  }

  const known = HISTORY.find((h) => starts(h.vendor));
  if (known) {
    return {
      method: 'history',
      line: known.line,
      category: known.category,
      confidence: 0.97,
      rationale: `This client has booked “${known.vendor.toUpperCase()}” as ${known.category.toLowerCase()} before, so history answers without a model call.`,
      source: 'mock',
    };
  }

  for (const hint of HINTS) {
    const hit = hint.words.find(starts);
    if (hit) {
      return {
        method: 'model',
        line: hint.line,
        category: hint.category,
        confidence: hint.confidence,
        rationale: `No history for this vendor. The model reads “${hit}” as ${hint.category.toLowerCase()}.`,
        source: 'mock',
      };
    }
  }

  return {
    method: 'model',
    line: '27a',
    category: 'Other expenses',
    confidence: 0.32,
    rationale: 'No history and no strong signal in the description, so the model’s best guess comes with low confidence.',
    source: 'mock',
  };
}
