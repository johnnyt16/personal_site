# johnnymcconkie.com

Personal site / interactive resume. React + Vite, GSAP ScrollTrigger for the
scroll reveals and stat counters, Geist for type.

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
`dist/index.html`, so the resume text is in the HTML for crawlers and for
visitors with JavaScript off. React hydrates that markup.

## Behaviour notes

- The finished state is the CSS default. GSAP only hides things when motion is
  allowed, so `prefers-reduced-motion`, no-JS, and crawlers all get the full page.
- The hero load-in is pure CSS, so it plays before hydration.
