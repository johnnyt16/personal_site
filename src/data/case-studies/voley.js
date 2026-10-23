export default {
  slug: 'voley',
  path: '/work/voley',
  eyebrow: 'Case study',
  title: 'Voley',
  site: { label: 'letsvoley.com', href: 'https://www.letsvoley.com' },
  summary:
    'A communications platform for independent insurance agencies, built on an official HawkSoft integration. I was the technical lead and also the one selling it.',
  facts: [
    { label: 'Role', value: 'Co-founder & Technical Lead' },
    { label: 'Timeline', value: 'Feb 2025 – Apr 2026' },
    { label: 'Team', value: 'Me + 5 contract developers' },
    { label: 'Stack', value: 'Next.js, Node.js, PostgreSQL, Twilio' },
    { label: 'Results', value: '30 agencies signed · $42K in grants · keynote, Insurtech Utah 2025' },
  ],
  sections: [
    {
      heading: 'Problem',
      body: [
        'Independent insurance agencies had no central place to communicate with clients. Agents texted from personal phones, nobody else in the office could see or pick up the thread, and every conversation had to be logged into HawkSoft, their agency management system, by hand.',
      ],
    },
    {
      heading: 'What I built',
      body: [
        'A shared inbox for the whole agency, on the agency’s own business number, where every conversation syncs into the client’s record in HawkSoft automatically through an official two-way API integration.',
        'I owned the architecture and the product roadmap, managed five contract developers, and wrote code alongside them. I also ran carrier A2P 10DLC registration and compliance for every agency.',
      ],
      bullets: [
        'Two-way SMS and MMS on agency numbers, via Twilio',
        'Official two-way HawkSoft integration: messages land on the client record, no manual logging',
        'Internal team chat, so agents can hand off and discuss a client in context',
        'Web chat for agency websites, feeding the same inbox',
        'Automated review requests and messaging automations',
        'Mobile app for agents on the go',
        'VoIP calling, built and tested but never released to users',
      ],
    },
    {
      heading: 'Architecture',
      diagram: {
        title: 'Voley system architecture',
        nodes: [
          { id: 'staff', label: 'Agency staff', sub: 'web + mobile app', col: 0, row: 0 },
          { id: 'clients', label: 'Clients', sub: 'text or web chat', col: 0, row: 1 },
          { id: 'app', label: 'Voley apps', sub: 'Next.js', col: 1, row: 0 },
          { id: 'twilio', label: 'Twilio', sub: 'SMS · MMS · 10DLC', col: 1, row: 1 },
          { id: 'api', label: 'API service', sub: 'Node.js', col: 2, row: 0.5 },
          { id: 'db', label: 'PostgreSQL', sub: 'messages, agencies', col: 3, row: 0 },
          { id: 'hawksoft', label: 'HawkSoft API', sub: 'client records', col: 3, row: 1 },
        ],
        edges: [
          ['staff', 'app', true],
          ['clients', 'twilio', true],
          ['app', 'api', true],
          ['twilio', 'api', true],
          ['api', 'db', true],
          ['api', 'hawksoft', true],
        ],
        caption:
          'An inbound text arrives through Twilio, is stored, matched to the client in HawkSoft, and shows up in the agency’s shared inbox. Replies travel the same path back.',
      },
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'Partnering with HawkSoft',
          body: 'The integration itself wasn’t the hardest engineering on the project. The real lesson was working as a small startup alongside a much larger company: earning official partner status, building against production APIs we didn’t control, and meeting their standards for anything that touched agencies’ client records.',
        },
        {
          heading: 'Running a team while selling',
          body: 'I broke the roadmap into tasks matched to each developer’s strengths, ran check-ins every two weeks, and reviewed and wrote code myself. The same weeks, I was cold-calling agencies and running demos, so the team needed clear specs that didn’t depend on me being in the room.',
        },
        {
          heading: 'Selling it',
          body: 'I built the pipeline myself through cold outreach and technical demos. 54% of cold-call conversations turned into demos, and 45% of demos turned into signed letters of intent. We signed 30 agencies, and 12 committed to onboarding. We won $42K in grants, including $17K across three BYU Miller Grants, and I gave the keynote at Insurtech Utah 2025.',
        },
        {
          heading: 'A dependency we didn’t control',
          body: 'Texting from a business number requires carrier approval under A2P 10DLC. Those rules tightened in February 2025, right as we launched, and registrations kept failing. The agencies waiting to migrate were blocked on approvals we never got.',
        },
      ],
    },
    {
      heading: 'Why we shut it down',
      body: [
        'We could have kept grinding. But between the compliance wall, lukewarm follow-through after signing, and a ceiling of maybe 50 to 100 agencies, the math didn’t work. Agencies on other management systems didn’t have the same problem, so growing beyond HawkSoft would have meant building a different product. We were running low on money and decided our time was worth more elsewhere.',
      ],
    },
    {
      heading: 'What I learned',
      subsections: [
        {
          heading: 'A letter of intent is not demand',
          body: 'People will sign something that costs them nothing. The real signal is someone paying or changing how they work. Our top of funnel looked great, but fewer than 10% of the agencies that signed letters of intent ever actually used the product. A product that asks a team to change how it operates is a much harder sell than it looks, especially in an established industry like insurance.',
        },
        {
          heading: 'Know what you don’t control',
          body: 'Our core feature depended on carrier approval. Working around it was possible, but would have cost more time and money than we had. Today I treat any external approval or platform dependency as a day-one risk, before writing code against it.',
        },
        {
          heading: 'Validate the pain, not just the gap',
          body: 'Agencies on other management systems had no tool like ours, which looked like an open market. But their systems worked differently, and the problem we solved barely existed for them.',
        },
      ],
    },
  ],
};
