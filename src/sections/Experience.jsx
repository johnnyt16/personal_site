import AnimatedContent from '../components/AnimatedContent';

const experiences = [
  {
    num: '01',
    role: 'Co-founder & Technical Lead',
    company: 'Voley',
    period: 'Feb 2025 – Present',
    desc: 'Co-founded a SaaS platform for the insurance industry. Secured a partnership with HawkSoft, won $17K in grants through the Crocker Innovation Fellowship, and built the full-stack product from scratch — Next.js, Node.js, PostgreSQL, Redis, and Socket.IO. Closed real paying customers.',
  },
  {
    num: '02',
    role: 'Project Manager',
    company: 'Premium Surface Solutions',
    period: 'Apr 2024 – Sep 2024',
    desc: 'Led sales and project management for a construction services company. Built the lead generation process, designed the estimate workflow, and managed client relationships from first contact through delivery.',
  },
  {
    num: '03',
    role: 'Sales Representative',
    company: 'Sunrun',
    period: 'Apr 2023 – Feb 2024',
    desc: 'Generated $1.2M in revenue as a top-performing sales rep, ranking in the top 5 out of 197 representatives. Developed consultative sales skills and a deep understanding of customer acquisition.',
  },
  {
    num: '04',
    role: 'Database Operations',
    company: 'BYU Continuing Education',
    period: 'Oct 2022 – Apr 2023',
    desc: 'Built SQL automation tools that improved data processing efficiency by 700%. Managed database operations and reporting for the university\'s continuing education programs.',
  },
];

export default function Experience() {
  return (
    <section className="content-section" id="experience">
      <AnimatedContent distance={60} duration={0.7}>
        <div className="section-label">
          <span>Experience</span>
        </div>
      </AnimatedContent>

      <div className="process-timeline">
        {experiences.map((exp, i) => (
          <AnimatedContent key={exp.num} distance={40} duration={0.6} delay={0.1 + i * 0.12}>
            <div className="process-step">
              <div className="process-marker">
                <span className="process-num">{exp.num}</span>
                {i < experiences.length - 1 && <div className="process-line" />}
              </div>
              <div className="process-body">
                <h3 className="process-title">{exp.role}</h3>
                <p className="experience-meta">{exp.company} · {exp.period}</p>
                <p className="process-desc">{exp.desc}</p>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
