import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Runs before every build: refreshes the "contributions in the last year"
 * count from the public GitHub profile. Any failure (offline, markup
 * change, rate limit) keeps the last known value, so a build never breaks
 * over this.
 */
const USER = 'johnnyt16';
const file = resolve(process.cwd(), 'src/data/github.json');
const previous = JSON.parse(readFileSync(file, 'utf8'));

try {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { 'User-Agent': 'johnnymcconkie.com build' },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = (await res.text()).replace(/\s+/g, ' ');
  const match = text.match(/([\d,]+) contributions? in the last year/i);
  if (!match) throw new Error('count not found in page');
  const contributions = Number(match[1].replace(/,/g, ''));
  if (!Number.isFinite(contributions) || contributions <= 0) throw new Error(`implausible count ${match[1]}`);

  writeFileSync(file, `${JSON.stringify({ user: USER, contributions, fetchedAt: new Date().toISOString().slice(0, 10) }, null, 2)}\n`);
  console.log(`github: ${contributions} contributions in the last year`);
} catch (err) {
  console.warn(`github: kept last known value (${previous.contributions}): ${err.message}`);
}
