import { useId } from 'react';
import Rich from './Rich';

/**
 * Box-and-arrow architecture diagram as inline SVG.
 *
 * Nodes sit on a grid (col = step in the flow, row = lane). The same data
 * renders twice: left-to-right for wide screens and top-to-bottom for
 * phones, so labels never shrink below a readable size. CSS shows one.
 */
const BOX = { w: 156, h: 56 };

function layout(nodes, vertical) {
  const gapMain = vertical ? 44 : 52;
  const gapCross = vertical ? 20 : 26;
  const pos = {};
  for (const n of nodes) {
    const main = n.col * ((vertical ? BOX.h : BOX.w) + gapMain);
    const cross = n.row * ((vertical ? BOX.w : BOX.h) + gapCross);
    const x = vertical ? cross : main;
    const y = vertical ? main : cross;
    pos[n.id] = { x, y, cx: x + BOX.w / 2, cy: y + BOX.h / 2 };
  }
  const xs = Object.values(pos);
  return {
    pos,
    width: Math.max(...xs.map((p) => p.x)) + BOX.w + 2,
    height: Math.max(...xs.map((p) => p.y)) + BOX.h + 2,
  };
}

/** Point where the line from a box's center toward (tx, ty) leaves the box, plus padding. */
function exit(p, tx, ty, pad) {
  const dx = tx - p.cx;
  const dy = ty - p.cy;
  const t = Math.min((BOX.w / 2 + pad) / Math.abs(dx || 1e-9), (BOX.h / 2 + pad) / Math.abs(dy || 1e-9));
  return [p.cx + dx * t, p.cy + dy * t];
}

function Flow({ nodes, edges, vertical, markerId, className }) {
  const { pos, width, height } = layout(nodes, vertical);

  return (
    <svg className={className} viewBox={`-1 -1 ${width} ${height}`} width={width} aria-hidden="true">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="dg-arrow" />
        </marker>
      </defs>

      {edges.map(([from, to, both]) => {
        const a = pos[from];
        const b = pos[to];
        const [x1, y1] = exit(a, b.cx, b.cy, 3);
        const [x2, y2] = exit(b, a.cx, a.cy, 3);
        return (
          <line
            key={`${from}-${to}`}
            className="dg-edge"
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            markerEnd={`url(#${markerId})`}
            markerStart={both ? `url(#${markerId})` : undefined}
          />
        );
      })}

      {nodes.map((n) => {
        const p = pos[n.id];
        return (
          <g key={n.id} transform={`translate(${p.x} ${p.y})`}>
            <rect className="dg-box" width={BOX.w} height={BOX.h} rx="8" />
            <text className="dg-label" x={BOX.w / 2} y={n.sub ? 24 : 33} textAnchor="middle">
              {n.label}
            </text>
            {n.sub && (
              <text className="dg-sub" x={BOX.w / 2} y={42} textAnchor="middle">
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function Diagram({ title, nodes, edges, caption }) {
  const id = useId().replace(/:/g, '');
  const label = (nid) => nodes.find((n) => n.id === nid).label;
  const description = edges
    .map(([a, b, both]) => `${label(a)} ${both ? 'exchanges data with' : 'sends to'} ${label(b)}`)
    .join('. ');

  return (
    <figure className="diagram">
      <div role="img" aria-label={`${title}. ${description}.`}>
        <Flow nodes={nodes} edges={edges} vertical={false} markerId={`${id}h`} className="dg dg-h" />
        <Flow nodes={nodes} edges={edges} vertical markerId={`${id}v`} className="dg dg-v" />
      </div>
      {caption && (
        <figcaption>
          <Rich text={caption} />
        </figcaption>
      )}
    </figure>
  );
}
