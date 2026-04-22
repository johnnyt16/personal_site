import AnimatedContent from '../components/AnimatedContent';
import SpotlightCard from '../components/SpotlightCard';

const services = [
  {
    title: 'Business Websites',
    desc: 'Professional sites for insurance agencies, local services, and professional firms. Fast, mobile-first, and built to convert.',
    details: [
      'Custom design and development — no templates',
      'SEO-optimized and performance-tuned from day one',
      'CMS integration so you can update content yourself',
    ],
    tag: 'Web',
    tagClass: 'tag-web',
    cardClass: 'card-web',
    spotlightColor: 'rgba(34, 197, 94, 0.12)',
    accentColor: '#22c55e',
  },
  {
    title: 'Web Applications & SaaS',
    desc: 'Custom apps, dashboards, and multi-tenant platforms built for scale.',
    details: [
      'Full-stack development from database to deployment',
      'Real-time features, authentication, and role-based access',
      'Multi-tenant architecture for SaaS products',
    ],
    tag: 'Apps',
    tagClass: 'tag-apps',
    cardClass: 'card-apps',
    spotlightColor: 'rgba(74, 144, 226, 0.12)',
    accentColor: '#4A90E2',
  },
  {
    title: 'Legacy System Replacement',
    desc: 'Audit, redesign, and migrate the systems your team has outgrown.',
    details: [
      'Technical audit of existing systems and pain points',
      'Phased migration plan — no big-bang rewrites',
      'Modern stack replacement with zero downtime transition',
    ],
    tag: 'Migration',
    tagClass: 'tag-migration',
    cardClass: 'card-migration',
    spotlightColor: 'rgba(245, 146, 27, 0.10)',
    accentColor: '#F5921B',
  },
  {
    title: 'AI Integration',
    desc: 'Add AI-powered features to your existing products or build new AI-first workflows.',
    details: [
      'AI agents, LLM integration, and intelligent automation',
      'Custom tooling built on Claude, GPT, and open-source models',
      'Workflow automation that saves hours, not minutes',
    ],
    tag: 'AI',
    tagClass: 'tag-ai',
    cardClass: 'card-ai',
    spotlightColor: 'rgba(168, 85, 247, 0.10)',
    accentColor: '#A855F7',
  },
];

export default function Services() {
  return (
    <section className="content-section" id="services">
      <AnimatedContent distance={60} duration={0.7}>
        <div className="section-label">
          <span>Services</span>
        </div>
      </AnimatedContent>

      <div className="services-grid">
        {services.map((s, i) => (
          <AnimatedContent key={s.title} distance={60} duration={0.7} delay={0.1 + i * 0.1}>
            <SpotlightCard className={`service-card ${s.cardClass}`} spotlightColor={s.spotlightColor}>
              <div className="service-content">
                <div className="service-header">
                  <h3 className="service-title">{s.title}</h3>
                  <span className={`project-tag ${s.tagClass}`}>{s.tag}</span>
                </div>
                <p className="service-desc">{s.desc}</p>
                <ul className="service-details">
                  {s.details.map((d) => (
                    <li key={d} style={{ '--bullet-color': s.accentColor }}>{d}</li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
