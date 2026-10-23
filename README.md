# johnnymcconkie.com

Personal site. React 19 + Vite 7, prerendered to static HTML per route at
build time, served by Railway. No router or animation libraries.

## Where things live

| What | File |
| --- | --- |
| Home page copy, experience, education | `src/data/resume.js` |
| Work rows | `src/data/work.js` |
| Side projects | `src/data/projects.js` |
| Case studies | `src/data/case-studies/*.js` |
| Research chart data (placeholder) | `src/data/research.js` |
| Classifier demo + API seam | `src/lib/classify.js` |
| Routes and page metadata | `src/routes.js`, `src/head.js` |
| Project screenshots / videos | `public/work/` (see `public/work/README.md`) |
| OG card and touch icon sources | `scripts/og/` |

`src/data/resume.js` mirrors `public/Johnny-McConkie-Resume.pdf`; update
both together.

## TODOs

Unverified claims are written as `[[TODO: note]]` inside the data files and
render as a yellow marker on the page. List every one with:

```bash
npm run todos
```

## Adding a page

Add a case-study file under `src/data/case-studies/`, register it in
`src/data/case-studies/index.js`, and it gets a route, a prerendered HTML
file, and a sitemap entry automatically.

## The classifier demo

With no configuration the LedgerLine demo answers from a small pretend
history and keyword rules in the browser. To use the real pipeline, deploy an
endpoint (for example a second Railway service) that accepts
`POST { "description": string }` and returns
`{ "method": "history" | "model" | "ambiguous", "line", "category", "confidence", "rationale" }`
(full contract in `src/lib/classify.js`), allow this site's origin
in its CORS headers, then set `VITE_CLASSIFY_ENDPOINT` on this service and
redeploy. Keep the model API key on the endpoint; nothing secret belongs in
this repo or bundle.

## Play mode and the terminal

The theme toggle cycles light → dark → play. Play mode recolors the page and
drops everything visible into a physics pile (Matter.js, in `src/play/`). The
backtick key opens a terminal from any page; commands live in
`src/play/commands.js`. ⌘K / Ctrl+K opens a command menu
(`src/play/Palette.jsx`). The pixel-guy button in the footer (or `run` in
the terminal, or ⌘K) starts a small platformer on the page itself
(`src/play/platformer.js`): every line of text is a platform, ↓ on a row
opens it, jumping again in mid-air fires a jetpack, coins sit on metrics
and text lines, and a bug chases you. Collect every coin to win; three
hits and it's over. Both load only when used, and play mode is never
saved, so a reload is always the normal site. With reduced motion on, play
mode recolors but nothing falls.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build + prerender every route + sitemap
npm run preview  # serve dist/
npm run lint
npm run todos    # list unverified claims
npm run og       # re-render public/og.png and apple-touch-icon.png (needs Chrome)
```
