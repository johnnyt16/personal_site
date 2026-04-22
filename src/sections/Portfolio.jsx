import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedContent from '../components/AnimatedContent';
import SpotlightCard from '../components/SpotlightCard';
import { ArrowUpRightIcon } from '../components/Icons';

const projects = [
  {
    id: 'voley',
    title: 'Voley',
    logo: '/voley-logo.png',
    tag: 'Active',
    tagClass: 'tag-voley',
    cardClass: 'card-voley',
    spotlightColor: 'rgba(74, 144, 226, 0.12)',
    link: 'https://letsvoley.com',
    category: 'client',
    desc: 'Enterprise VOIP, SMS, and team messaging platform for insurance agencies.',
    details: [
      'Designed and implemented the core real-time messaging architecture',
      'Built backend systems, WebSocket layer, and telephony integrations from scratch',
      'Deployed to paying agencies, replacing decades-old phone systems',
      'Own the product end-to-end: infrastructure, shipping, and customer onboarding',
    ],
  },
  {
    id: 'forge',
    title: 'Forge Development',
    name: 'Forge Development',
    tag: 'Active',
    tagClass: 'tag-forge',
    cardClass: 'card-forge',
    spotlightColor: 'rgba(34, 197, 94, 0.12)',
    link: 'https://theforgedev.com',
    category: 'client',
    desc: 'My web development studio — I build production sites and apps for businesses end-to-end.',
    details: [
      'Business websites, web applications, and legacy system replacements',
      'End-to-end delivery from discovery through launch and iteration',
      'Serving insurance agencies, professional services, and local businesses',
      'Every project shipped on time with direct client communication',
    ],
  },
  {
    id: 'attendease',
    title: 'AttendEase',
    logo: '/attendease-logo.png',
    tag: 'Deployed',
    tagClass: 'tag-attendease',
    cardClass: 'card-attendease',
    spotlightColor: 'rgba(245, 146, 27, 0.10)',
    link: 'https://attend-ease.com',
    category: 'client',
    desc: 'Automated attendance and security software for private K-12 schools.',
    details: [
      'Led system architecture and full-stack development from concept to production',
      'Deployed in live school environments processing hundreds of check-ins daily',
      'Designed with FERPA and real-world operational constraints from day one',
    ],
  },
  {
    id: 'junzi',
    title: 'Junzi',
    logo: '/Bold Italic Multipurpse Typography Logo Design Brand Identity Clean Comic Style for Design Company (2000 x 1000 px).png',
    tag: 'Live',
    tagClass: 'tag-junzi',
    cardClass: 'card-junzi',
    spotlightColor: 'rgba(255, 255, 255, 0.06)',
    link: 'https://www.bejunzi.com',
    category: 'personal',
    desc: 'A public discourse platform built to surface truth through structured debate, not popularity.',
    details: [
      'Inspired by Greek philosophy and the lack of foundational reasoning in modern discourse',
      'Structured around dialectic and finding truth, not surfacing popular opinion',
      'Full-stack Next.js app with authentication, drafts, and threaded discussion architecture',
      'Designed for substantive, long-form debate over reactive hot takes',
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure & Internal Systems',
    name: 'Infrastructure & Internal Systems',
    tag: 'Ongoing',
    tagClass: 'tag-infra',
    cardClass: 'card-infra',
    spotlightColor: 'rgba(168, 85, 247, 0.10)',
    category: 'personal',
    details: [
      'Multi-tenant SaaS architectures with isolated customer environments',
      'Custom rate limiting, webhook ingestion, and authentication services',
      'CI/CD pipelines, deployment automation, and monitoring built from production needs',
      'Reusable patterns extracted from real systems, not demos',
    ],
  },
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Client Work', value: 'client' },
  { label: 'Personal Projects', value: 'personal' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section className="content-section" id="portfolio">
      <AnimatedContent distance={60} duration={0.7}>
        <div className="section-label">
          <span>Portfolio</span>
        </div>
      </AnimatedContent>

      <div className="portfolio-filters">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' filter-active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className={`project-card ${p.cardClass}`} spotlightColor={p.spotlightColor}>
                <div className="project-content">
                  <div className="project-header">
                    {p.logo ? (
                      <img src={p.logo} alt={p.title} className="project-logo" />
                    ) : (
                      <h3 className="project-name">{p.name || p.title}</h3>
                    )}
                    <div className="project-header-right">
                      <span className={`project-tag ${p.tagClass}`}>{p.tag}</span>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-visit-btn">
                          Visit <ArrowUpRightIcon />
                        </a>
                      )}
                    </div>
                  </div>
                  {p.desc && <p className="project-desc">{p.desc}</p>}
                  <ul className="project-details">
                    {p.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
