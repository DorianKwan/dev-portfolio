export type TimelineBullet = {
  text: string;
  subBullets?: string[];
};

export type TimelineEntry = {
  key: string;
  title: string;
  time: string;
  bullets: TimelineBullet[];
};

export const timelineData: TimelineEntry[] = [
  {
    key: 'early-stage',
    title: 'Early Career',
    time: '2017 – 2019',
    bullets: [
      {
        text: 'Graduated from Lighthouse Labs',
        subBullets: [
          'Learning JavaScript, Node.js, express, PostgreSQL, & CSS',
        ],
      },
      {
        text: 'Full Stack Engineer at Predicted Property',
        subBullets: ['Ruby on Rails, Sidekiq, Redis, & MySQL'],
      },
    ],
  },
  {
    key: 'freelancing',
    title: 'Freelancing',
    time: '2019 – 2023',
    bullets: [
      {
        text: 'Contracting for digital marketing agencies',
        subBullets: ['Cossette, DDB Canada, Mercenary Digital'],
      },
      {
        text: 'Developed pixel-perfect websites',
        subBullets: ['with WordPress, PHP, & CSS/SASS'],
      },
      {
        text: 'Progressed to Senior Web Developer at Mercenary Digital',
      },
    ],
  },
  {
    key: 'launchcode',
    title: 'Launchcode',
    time: '2020 – 2022',
    bullets: [
      {
        text: 'Full-stack engineer at a custom software development agency',
        subBullets: [
          'TypeScript, React, Node.js, PostgreSQL, Docker, & Kubernetes',
        ],
      },
      {
        text: 'Progressed to leading technical interviews and built the engineer onboarding program',
      },
    ],
  },
  {
    key: 'casper-labs',
    title: 'Casper Labs',
    time: '2022 – 2024',
    bullets: [
      {
        text: 'Founded engineering stack and systems on a greenfield team',
        subBullets: [
          'Chose: TypeScript, React, NestJS, styled-components, Docker, & PostgreSQL',
        ],
      },
      {
        text: 'Led development of an IBM-partnered AI governance and compliance audit system',
      },
      {
        text: 'Acted as de facto tech lead',
        subBullets: [
          'Architecture reviews, cross-stack refactors, mentoring',
          'Migrated to Shadcn, Tailwind, TanStack Query, & TanStack Router',
        ],
      },
    ],
  },
  {
    key: 'prove-ai',
    title: 'Prove AI',
    time: '2024 – 2026',
    bullets: [
      {
        text: 'Save project timeline by building a production-ready backup application',
      },
      {
        text: 'Prototyped and evaluated AI/LLM systems',
        subBullets: [
          'Python, Nvidia Guardrails, Evaluation frameworks, & NIMs',
        ],
      },
      {
        text: 'Built and open-sourced a turn-key AI observability stack',
        subBullets: ['LiteLLM, OpenTelemetry, & Prometheus'],
      },
    ],
  },
];
