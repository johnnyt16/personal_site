export default {
  slug: 'voley',
  path: '/work/voley',
  eyebrow: 'Case study',
  title: 'Voley',
  summary:
    'A two-way texting platform for independent insurance agencies, integrated with HawkSoft. I was the technical lead and also the one selling it.',
  facts: [
    { label: 'Role', value: 'Co-founder & Technical Lead' },
    { label: 'Timeline', value: 'Feb 2025 – Apr 2026' },
    { label: 'Team', value: 'Me + 5 contract developers' },
    { label: 'Stack', value: 'Next.js, Node.js, PostgreSQL, Twilio' },
    { label: 'Results', value: '30 agencies sold · 12 began migrating · $42K raised' },
  ],
  sections: [
    {
      heading: 'Problem',
      body: [
        'Clients of independent insurance agencies want to text their agent. In practice that meant agents texting from personal phones, with no record in the agency management system and no way for the rest of the office to pick up the thread. [[TODO: confirm this framing matches what agencies told you]]',
      ],
    },
    {
      heading: 'What I built',
      body: [
        'A shared two-way SMS inbox on the agency’s business number, with every conversation synced into the client’s record in HawkSoft, the leading agency management system, through an official two-way API integration.',
        'I owned the architecture and the product roadmap, and managed five contract developers. I also handled carrier A2P 10DLC registration and compliance for programmatic messaging.',
      ],
      bullets: [
        'Two-way SMS on agency numbers via Twilio',
        'Official HawkSoft integration: messages and client records sync both ways',
        'A2P 10DLC brand and campaign registration for each agency',
        '[[TODO: list any other shipped features, e.g. MMS, VoIP, internal team messaging]]',
      ],
    },
    {
      heading: 'Architecture',
      diagram: {
        title: 'Voley system architecture',
        nodes: [
          { id: 'staff', label: 'Agency staff', sub: 'browser', col: 0, row: 0 },
          { id: 'clients', label: 'Clients', sub: 'their phones', col: 0, row: 1 },
          { id: 'app', label: 'Web app', sub: 'Next.js', col: 1, row: 0 },
          { id: 'twilio', label: 'Twilio', sub: 'SMS · A2P 10DLC', col: 1, row: 1 },
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
        caption: 'Inbound texts arrive from Twilio, are stored, matched to a HawkSoft client, and pushed to the agency’s inbox. Replies go back the same way. [[TODO: confirm components and data flow]]',
      },
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'A2P 10DLC compliance',
          body: 'US carriers require every business sending programmatic texts from a 10-digit number to register a brand and a campaign. I ran that process for each agency. Approval timelines and rejections were outside our control, and they gated how fast an agency could go live. [[TODO: confirm this is what limited scaling and led to winding down]]',
        },
        {
          heading: 'Becoming an official HawkSoft integration',
          body: 'Agencies live in HawkSoft, so a texting tool that didn’t write back to the client record was a non-starter. We built an official two-way integration rather than a one-way export. [[TODO: the hardest technical detail, e.g. matching phone numbers to client records, duplicate handling, sync conflicts]]',
        },
        {
          heading: 'Leading five contract developers',
          body: '[[TODO: how you split the work, ran reviews, and kept quality up while also selling]]',
        },
        {
          heading: 'Selling it',
          body: 'I sold 30 agencies through cold outreach and technical demos, and 12 began migrating onto the platform. I raised $25K from insurance-industry investors and $17K across three BYU Miller Grants, and gave the keynote at Insurtech Utah 2025. [[TODO: why 12 of 30 migrated, and what blocked the rest]]',
        },
      ],
    },
    {
      heading: 'What I’d do differently',
      bullets: [
        'Treat carrier registration as a day-one product risk and start it before building the inbox. [[TODO: confirm in your words]]',
        '[[TODO: one or two more lessons in your own words]]',
      ],
    },
  ],
};
