/**
 * Renders text that may contain [[TODO: note]] markers. Each marker shows
 * as a visible highlighted tag so unverified claims can't slip by.
 */
const MARKER = /\[\[TODO:\s*([^\]]+)\]\]/g;

export default function Rich({ text }) {
  if (!text.includes('[[TODO')) return text;

  const parts = [];
  let last = 0;
  for (const m of text.matchAll(MARKER)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <mark className="todo" key={m.index}>
        TODO: {m[1].trim()}
      </mark>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
