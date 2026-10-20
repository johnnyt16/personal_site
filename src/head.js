import { SITE_URL, urlFor } from './routes';
import { profile } from './data/resume';

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: 'John Taylor McConkie',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og.png`,
  jobTitle: 'Software Engineer',
  description: profile.positioning,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Provo', addressRegion: 'UT', addressCountry: 'US' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Brigham Young University' },
  sameAs: [profile.linkedin, profile.github],
};

/** Per-page <head> tags, written into each prerendered HTML file. */
export function renderHead(route) {
  const url = SITE_URL + urlFor(route.path);
  const title = escape(route.title);
  const description = escape(route.description);
  const image = `${SITE_URL}/og.png`;

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.path === '/' ? 'profile' : 'article'}" />`,
    `<meta property="og:site_name" content="${escape(profile.name)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(profile.name)}: ${escape(profile.positioning)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];

  if (route.path === '/') {
    // JSON in a script tag: escape "<" so no string can close the tag early.
    tags.push(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`);
  }

  return tags.join('\n    ');
}
