import AnimatedContent from '../components/AnimatedContent';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We talk through your goals, constraints, and timeline. I ask the questions most developers skip — who uses this, what breaks if it fails, and what does success actually look like.',
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Before any code is written, I map out the system: data models, integrations, deployment strategy, and edge cases. You get a clear picture of what\'s being built and why.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'I work in short cycles with regular check-ins. You see real progress every week — not wireframes and placeholder text, but working software.',
  },
  {
    num: '04',
    title: 'Ship & Iterate',
    desc: 'We launch, gather real feedback, and improve. I don\'t disappear after delivery — I make sure it works in the real world and iterate based on what we learn.',
  },
];

export default function Process() {
  return (
    <section className="content-section" id="process">
      <AnimatedContent distance={60} duration={0.7}>
        <div className="section-label">
          <span>How I Work</span>
        </div>
      </AnimatedContent>

      <div className="process-timeline">
        {steps.map((step, i) => (
          <AnimatedContent key={step.num} distance={40} duration={0.6} delay={0.1 + i * 0.12}>
            <div className="process-step">
              <div className="process-marker">
                <span className="process-num">{step.num}</span>
                {i < steps.length - 1 && <div className="process-line" />}
              </div>
              <div className="process-body">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
