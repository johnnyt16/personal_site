# johnnymcconkie.com

Personal site. React + Vite, prerendered to static HTML at build time.

## Editing content

**All copy lives in `src/data/resume.js`** and mirrors
`public/Johnny-McConkie-Resume.pdf`. Update both together.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build + prerender into dist/index.html
npm run preview  # serve dist/
npm run lint
```

`npm run build` runs a second SSR pass and bakes the rendered markup into
`dist/index.html`, so the text is in the HTML for crawlers and for visitors
with JavaScript off. React hydrates that markup.
