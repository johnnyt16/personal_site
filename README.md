# johnnymcconkie.com

Interactive resume. React + Vite, GSAP ScrollTrigger for the scroll-driven
"schematic to shipped" reveals, and a lazy Three.js wireframe accent on the hero.

## Editing content

**All copy lives in `src/data/resume.js`.** The animated page and the plain
resume at `#plain-resume` both read from it, so they can't drift apart.

Anything still unwritten is wrapped in `TODO('...')` and renders as a visible
amber marker on the page. Replace the `TODO(...)` call with a plain string to
clear it.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build + prerender into dist/index.html
npm run preview  # serve dist/
npm run lint
```

`npm run build` runs a second SSR pass and bakes the rendered markup into
`dist/index.html`, so the resume text is in the HTML for crawlers and for
visitors with JavaScript off. React hydrates that markup.

## Behaviour notes

- The finished state is the CSS default. GSAP only hides things when motion is
  allowed, so `prefers-reduced-motion`, no-JS, and crawlers all get the full page.
- The Three.js hero accent is skipped entirely on reduced motion, viewports under
  768px, devices reporting <4 cores or <4GB, and anything without WebGL. It loads
  on `requestIdleCallback`, never on the critical path.
- Drop the resume PDF at `public/Johnny-McConkie-Resume.pdf`.
