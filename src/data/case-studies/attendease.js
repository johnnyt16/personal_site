export default {
  slug: 'attendease',
  path: '/work/attendease',
  eyebrow: 'Case study',
  title: 'AttendEase',
  summary:
    'A facial-recognition attendance system for schools, started through BYU’s Crocker Innovation Fellowship. I built the mobile app, the web frontend, and the school admin architecture.',
  facts: [
    { label: 'Role', value: 'Technical Co-founder' },
    { label: 'Timeline', value: 'Jan 2025 – Mar 2026' },
    { label: 'Stack', value: 'Vite, Node.js, PostgreSQL, AWS' },
    { label: 'Results', value: '[[TODO: pilots, schools, or users, if any]]' },
  ],
  sections: [
    {
      heading: 'Problem',
      body: [
        'Teachers spend class time taking roll, and schools want reliable attendance and security records. [[TODO: confirm framing and who the buyer was]]',
      ],
    },
    {
      heading: 'What I built',
      body: [
        'Cameras identify students as they enter, and attendance is recorded automatically. I built the mobile app, the web frontend, and the school admin architecture, and contributed to the database design. I also supported sales and outreach with educators and administrators.',
      ],
    },
    {
      heading: 'Architecture',
      diagram: {
        title: 'AttendEase architecture',
        nodes: [
          { id: 'cam', label: 'Classroom camera', sub: 'entry point', col: 0, row: 0 },
          { id: 'rec', label: 'Recognition', sub: 'AWS', col: 1, row: 0 },
          { id: 'api', label: 'API', sub: 'Node.js', col: 2, row: 0 },
          { id: 'db', label: 'PostgreSQL', sub: 'schools, rosters', col: 2, row: 1 },
          { id: 'web', label: 'Admin web app', sub: 'Vite', col: 3, row: 0 },
          { id: 'mobile', label: 'Mobile app', sub: 'teachers', col: 3, row: 1 },
        ],
        edges: [
          ['cam', 'rec'],
          ['rec', 'api'],
          ['api', 'db', true],
          ['api', 'web', true],
          ['api', 'mobile', true],
        ],
        caption: 'Camera frames are matched against enrolled students and attendance is written to the school’s roster. [[TODO: confirm components, and which AWS service did recognition]]',
      },
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'Student privacy',
          body: '[[TODO: how consent, data retention, and FERPA were handled]]',
        },
        {
          heading: 'Modeling schools',
          body: 'The admin side had to represent schools, classes, teachers, and students, with the right people seeing the right rosters. [[TODO: confirm and add the key design decision]]',
        },
        {
          heading: 'Accuracy in a real classroom',
          body: '[[TODO: lighting, angles, crowds at the door, and how you handled misses]]',
        },
      ],
    },
    {
      heading: 'What I’d do differently',
      bullets: ['[[TODO: one or two lessons in your own words, and why the project ended]]'],
    },
  ],
};
