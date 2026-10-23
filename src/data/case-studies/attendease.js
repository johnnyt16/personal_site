export default {
  slug: 'attendease',
  path: '/work/attendease',
  eyebrow: 'Case study',
  title: 'AttendEase',
  summary:
    'A facial-recognition attendance system for schools, started through BYU’s Crocker Innovation Fellowship. I built the mobile app, the web frontend, and the school admin architecture.',
  facts: [
    { label: 'Role', value: 'Technical Co-founder' },
    { label: 'Timeline', value: '2024 – 2025' },
    { label: 'Stack', value: 'Python, Vite, Node.js, PostgreSQL, AWS EC2' },
    { label: 'Results', value: '~99% agreement with manual attendance in a school pilot' },
  ],
  sections: [
    {
      heading: 'Problem',
      body: [
        'Teachers spend the start of every class taking roll, and schools need reliable attendance records for funding, safety, and compliance. We sold to public and charter schools, where those records carry real weight.',
      ],
    },
    {
      heading: 'What I built',
      body: [
        'Cameras recognize enrolled students as they arrive, and attendance is recorded automatically. I built the mobile app, the web frontend, and the school admin architecture, and worked on the database design. I also joined sales and outreach with educators and administrators.',
      ],
      bullets: [
        'Recognition service in Python, built on open-source face-recognition libraries and trained on each school’s enrolled students, running on AWS EC2',
        'Web admin for school staff to manage classes, rosters, and attendance records',
        'Mobile app for teachers',
        'Consent workflow: students whose families opted out were tracked by an anonymous ID, with no name or personal information stored',
      ],
    },
    {
      heading: 'Architecture',
      diagram: {
        title: 'AttendEase architecture',
        nodes: [
          { id: 'cam', label: 'Classroom camera', sub: 'entry point', col: 0, row: 0 },
          { id: 'rec', label: 'Recognition', sub: 'Python on EC2', col: 1, row: 0 },
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
        caption:
          'Camera frames are matched against a school’s enrolled students on EC2, and attendance is written to that school’s rosters for staff and teachers to see.',
      },
    },
    {
      heading: 'Hard parts and decisions',
      subsections: [
        {
          heading: 'Student privacy',
          body: 'Schools sent permission forms home, and about 75% of families opted in. Rather than drop the other 25% from attendance, we tracked them by anonymous ID numbers and never stored their names or personal details. Attendance stayed complete without collecting data families hadn’t agreed to.',
        },
        {
          heading: 'A database that fits every school',
          body: 'The database was one of the hardest parts of the project. Every school organizes classes, periods, and rosters differently, so the schema had to support heavy per-school customization while keeping keys and relationships strict enough that one school’s data could never leak into another’s.',
        },
        {
          heading: 'Proving it worked',
          body: 'In a pilot with a private school in Utah, we ran the system side by side with manual attendance and it agreed about 99% of the time.',
        },
      ],
    },
    {
      heading: 'Why it ended',
      body: [
        'Most of the team graduated and started full-time jobs. The product had potential, but edtech is a hard sale with long cycles, and taking it further would have needed more funding and a serious time commitment the team wasn’t ready to make.',
      ],
    },
    {
      heading: 'What I learned',
      bullets: [
        'Design for privacy from the start. The opt-out path shaped the data model, and adding it later would have been far harder',
        'Accuracy wins the pilot; a sales cycle and budget process win the contract. In edtech the second is the bottleneck',
        'Multi-tenant data modeling is product design. Getting each school’s structure right mattered as much as recognition accuracy',
      ],
    },
  ],
};
