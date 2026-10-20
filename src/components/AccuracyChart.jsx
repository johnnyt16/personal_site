import { useEffect, useState } from 'react';
import { accuracy } from '../data/research';

/**
 * Line chart: accuracy (y) by data volume (x), one line per input type.
 * Identity is never color alone: legend, direct end labels, and a distinct
 * marker shape per series. Hover/focus a column for exact values; the
 * table below carries the same numbers for screen readers.
 */
// Two geometries: wide leaves room for end labels; narrow (phones) drops
// them, since the legend already names every line.
const WIDE = { W: 560, H: 300, M: { top: 16, right: 132, bottom: 44, left: 44 } };
const NARROW = { W: 360, H: 260, M: { top: 16, right: 16, bottom: 44, left: 40 } };
const Y_MIN = 0.5; // placeholder range; revisit when real data lands
const Y_MAX = 1;
const SHAPES = ['circle', 'square', 'diamond'];

const pct = (v) => `${Math.round(v * 100)}%`;

function Marker({ shape, x, y, className }) {
  if (shape === 'square') return <rect className={className} x={x - 4.5} y={y - 4.5} width="9" height="9" rx="1.5" />;
  if (shape === 'diamond') return <path className={className} d={`M${x} ${y - 6}L${x + 6} ${y}L${x} ${y + 6}L${x - 6} ${y}Z`} />;
  return <circle className={className} cx={x} cy={y} r="4.5" />;
}

export default function AccuracyChart({ compact = false }) {
  const [hover, setHover] = useState(null);
  const [narrow, setNarrow] = useState(false);
  const { x, xNames, series, xLabel, title, placeholder } = accuracy;
  const { W, H, M } = narrow ? NARROW : WIDE;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const sx = (i) => M.left + (i / (x.length - 1)) * plotW;
  const sy = (v) => M.top + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * plotH;
  const ticks = [0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const colW = plotW / (x.length - 1);

  return (
    <figure className={`chart${compact ? ' chart-compact' : ''}`}>
      <div className="chart-head">
        <p className="chart-title">{title}</p>
        {placeholder && <span className="chart-flag">Placeholder data</span>}
      </div>

      <ul className="chart-legend">
        {series.map((s, i) => (
          <li key={s.id}>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <Marker shape={SHAPES[i]} x={8} y={8} className={`s${i + 1} chart-dot`} />
            </svg>
            {s.label}
          </li>
        ))}
      </ul>

      <div className="chart-plot">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" onMouseLeave={() => setHover(null)}>
          {ticks.map((t) => (
            <g key={t}>
              <line className="chart-grid" x1={M.left} x2={M.left + plotW} y1={sy(t)} y2={sy(t)} />
              <text className="chart-axis" x={M.left - 8} y={sy(t) + 4} textAnchor="end">
                {pct(t)}
              </text>
            </g>
          ))}
          {x.map((v, i) => (
            <text key={v} className="chart-axis" x={sx(i)} y={H - M.bottom + 20} textAnchor="middle">
              {v}
            </text>
          ))}
          <text className="chart-axis chart-axis-title" x={M.left + plotW / 2} y={H - 6} textAnchor="middle">
            {xLabel}
          </text>

          {hover !== null && <line className="chart-crosshair" x1={sx(hover)} x2={sx(hover)} y1={M.top} y2={M.top + plotH} />}

          {series.map((s, i) => (
            <g key={s.id}>
              <polyline className={`s${i + 1} chart-line`} points={s.values.map((v, j) => `${sx(j)},${sy(v)}`).join(' ')} />
              {s.values.map((v, j) => (
                <Marker key={j} shape={SHAPES[i]} x={sx(j)} y={sy(v)} className={`s${i + 1} chart-dot`} />
              ))}
              {!narrow && (
                <text className="chart-end-label" x={sx(x.length - 1) + 12} y={sy(s.values.at(-1)) + 4}>
                  {s.label}
                </text>
              )}
            </g>
          ))}

          {/* Hit targets: one full-height column per x value, wider than the marks. */}
          {x.map((v, i) => (
            <rect
              key={v}
              className="chart-hit"
              x={sx(i) - colW / 2}
              y={M.top}
              width={colW}
              height={plotH}
              onMouseEnter={() => setHover(i)}
            />
          ))}
        </svg>

        {hover !== null && (
          <div
            className="chart-tip"
            style={{ left: `${(sx(hover) / W) * 100}%`, transform: hover === x.length - 1 ? 'translateX(-105%)' : 'translateX(8px)' }}
          >
            <p className="chart-tip-head">
              {x[hover]} · {xNames[hover]}
            </p>
            {series.map((s, i) => (
              <p key={s.id}>
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                  <Marker shape={SHAPES[i]} x={8} y={8} className={`s${i + 1} chart-dot`} />
                </svg>
                {s.label} <strong>{pct(s.values[hover])}</strong>
              </p>
            ))}
          </div>
        )}
      </div>

      <p className="chart-key">
        {x.map((v, i) => (
          <span key={v}>
            <strong>{v}</strong> {xNames[i].replace(/^\+ /, '+\u00a0')}
          </span>
        ))}
      </p>

      <details className="chart-table">
        <summary>View as table</summary>
        <table>
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr>
              <th scope="col">Model</th>
              {x.map((v, i) => (
                <th scope="col" key={v} title={xNames[i]}>
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {series.map((s) => (
              <tr key={s.id}>
                <th scope="row">{s.label}</th>
                {s.values.map((v, j) => (
                  <td key={j}>{pct(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
