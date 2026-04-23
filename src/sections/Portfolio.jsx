import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedContent from '../components/AnimatedContent';
import SpotlightCard from '../components/SpotlightCard';
import TiltCard from '../components/TiltCard';
import { ArrowUpRightIcon } from '../components/Icons';

const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const featured = [
  {
    id: 'voley',
    title: 'Voley',
    logo: '/voley-logo.png',
    tag: 'Active',
    tagClass: 'tag-voley',
    cardClass: 'card-voley',
    spotlightColor: 'rgba(74, 144, 226, 0.12)',
    link: 'https://letsvoley.com',
    desc: 'Enterprise VOIP, SMS, and team messaging platform for insurance agencies.',
    details: [
      'Designed and implemented the core real-time messaging architecture',
      'Built backend systems, WebSocket layer, and telephony integrations from scratch',
      'Deployed to paying agencies, replacing decades-old phone systems',
      'Own the product end-to-end: infrastructure, shipping, and customer onboarding',
    ],
  },
  {
    id: 'accounting',
    title: 'Accounting Automation Platform',
    name: 'Accounting Automation Platform',
    tag: 'Private',
    tagClass: 'tag-private',
    cardClass: 'card-accounting',
    spotlightColor: 'rgba(34, 197, 94, 0.12)',
    private: true,
    desc: 'Custom internal automation system for an accounting firm — imports, categorizes, and reconciles transactions across multiple client businesses.',
    details: [
      'Automated import and categorization of transactions using ML-trained classification models',
      'Multi-business support with isolated ledgers, custom chart of accounts, and role-based access',
      'Generates client-ready reports, financial summaries, and reconciliation documents',
      'Replaced hours of manual bookkeeping per client with near-instant processing',
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
    desc: 'Automated attendance and security software for private K-12 schools.',
    details: [
      'Led system architecture and full-stack development from concept to production',
      'Deployed in live school environments processing hundreds of check-ins daily',
      'Designed with FERPA and real-world operational constraints from day one',
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
    desc: 'My web development studio — I build production sites and apps for businesses end-to-end.',
    details: [
      'Business websites, web applications, and legacy system replacements',
      'End-to-end delivery from discovery through launch and iteration',
      'Serving insurance agencies, professional services, and local businesses',
      'Every project shipped on time with direct client communication',
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
    details: [
      'Multi-tenant SaaS architectures with isolated customer environments',
      'Custom rate limiting, webhook ingestion, and authentication services',
      'CI/CD pipelines, deployment automation, and monitoring built from production needs',
      'Reusable patterns extracted from real systems, not demos',
    ],
  },
];

const clientSites = [
  {
    id: 'yuras',
    name: "Yura's Roofing",
    type: 'Roofing Contractor',
    desc: 'Service pages, project gallery, and quote request funnel for a residential roofing company.',
    gradient: 'linear-gradient(135deg, #1a3a2a, #0d1f17)',
    ref: 'https://www.yurasroofing.com',
  },
  {
    id: 'bigstar',
    name: 'Big Star Built',
    type: 'General Contractor',
    desc: 'Lead generation site with service breakdowns, project showcases, and contact forms.',
    gradient: 'linear-gradient(135deg, #2a2a1a, #1a1a0f)',
    ref: 'https://www.bigstarbuilt.com',
  },
  {
    id: 'aldanas',
    name: "Aldana's Construction",
    type: 'Construction',
    desc: 'Clean contractor site with service area pages, past work galleries, and mobile-first design.',
    gradient: 'linear-gradient(135deg, #1a2a3a, #0f1a24)',
    ref: 'https://www.aldanasconstruction.com',
  },
  {
    id: 'kiley',
    name: 'Kiley Harrison Insurance',
    type: 'Insurance Agency',
    desc: 'Multi-line agency site with quote funnels, carrier info, and agent bios.',
    gradient: 'linear-gradient(135deg, #2e1a2a, #1e0f1a)',
    ref: 'https://www.kileyharrisoninsurance.com',
  },
  {
    id: 'keystone',
    name: 'Keystone Insurance',
    type: 'Insurance Agency',
    desc: 'Professional agency site with policy breakdowns, online quoting, and client resources.',
    gradient: 'linear-gradient(135deg, #1a2a2a, #0f1a1a)',
    ref: 'https://keystoneinsurance.com',
  },
  {
    id: 'urbanforest',
    name: 'Urban Forest Landscape',
    type: 'Landscaping',
    desc: 'Portfolio-driven site with service pages, project galleries, and seasonal booking.',
    gradient: 'linear-gradient(135deg, #1a3a2a, #0d1f17)',
    ref: 'https://www.urbanforestlandscape.com',
  },
];

const tabs = [
  { label: 'Featured', value: 'featured' },
  { label: 'Client Sites', value: 'sites' },
  { label: 'All', value: 'all' },
];

export default function Portfolio() {
  const [tab, setTab] = useState('featured');

  const showFeatured = tab === 'featured' || tab === 'all';
  const showSites = tab === 'sites' || tab === 'all';

  return (
    <section className="content-section" id="portfolio">
      <AnimatedContent distance={60} duration={0.7}>
        <div className="section-label">
          <span>Portfolio</span>
        </div>
      </AnimatedContent>

      <div className="portfolio-filters">
        {tabs.map((t) => (
          <button
            key={t.value}
            className={`filter-btn${tab === t.value ? ' filter-active' : ''}`}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showFeatured && (
          <motion.div
            key="featured"
            className="projects-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {featured.map((p) => (
              <TiltCard key={p.id}>
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
                        {p.private ? (
                          <span className="project-private-badge">
                            <LockIcon /> Private
                          </span>
                        ) : p.link ? (
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-visit-btn">
                            Visit <ArrowUpRightIcon />
                          </a>
                        ) : null}
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
              </TiltCard>
            ))}
          </motion.div>
        )}

        {showFeatured && showSites && (
          <div className="portfolio-divider" />
        )}

        {showSites && (
          <motion.div
            key="sites"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, delay: showFeatured ? 0.1 : 0 }}
          >
            {tab === 'all' && (
              <div className="sites-subheader">
                <span>Client Websites</span>
              </div>
            )}
            <div className="sites-grid">
              {clientSites.map((site, i) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <TiltCard tiltAmount={8}>
                    <div className="site-card">
                      <div className="site-preview" style={{ background: site.gradient }}>
                        <span className="site-preview-label">{site.name.split(' ')[0]}</span>
                      </div>
                      <div className="site-info">
                        <div className="site-info-header">
                          <h4 className="site-name">{site.name}</h4>
                          {site.ref && (
                            <a href={site.ref} target="_blank" rel="noopener noreferrer" className="site-ref-link">
                              View <ArrowUpRightIcon />
                            </a>
                          )}
                        </div>
                        <span className="site-type">{site.type}</span>
                        <p className="site-desc">{site.desc}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
            <p className="sites-more">
              I've built many more across different industries — <a href="#contact">reach out</a> for examples in yours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
