export type WorkHistoryEntry = {
  key: string;
  company: string;
  role: string;
  time: string;
  bullets: string[];
};

export const workHistoryData: WorkHistoryEntry[] = [
  {
    key: 'prove-ai',
    company: 'Prove AI',
    role: 'Senior Software Engineer',
    time: 'May 2024 – Apr 2026',
    bullets: [
      "Saved project timeline (1+ month) by identifying critical deficiencies in a contracted team's codebase; provisioned a production-ready replacement as a contingency in three weeks — adopted by the business.",
      'Built and open-sourced a lightweight, turn-key AI observability stack using LiteLLM, OpenTelemetry Collector, and Prometheus to monitor LLM latency, token usage, and failures across AI workflows.',
      'Prototyped and evaluated AI/LLM systems including RAG pipelines, Nvidia NIM deployments, guardrails, model evaluation frameworks, and LLM data pipelines.',
      'Scaled the engineering team from 2 to 12 (600%) through three hiring rounds; designed and led technical interviews across Full-Stack Engineer, Senior Full-Stack Engineer, and Principal Applied AI Engineer roles.',
    ],
  },
  {
    key: 'casper-labs',
    company: 'Casper Labs',
    role: 'Senior Software Engineer',
    time: 'Aug 2022 – May 2024',
    bullets: [
      'Founded engineering stack and standards for a greenfield team: defined tech stack, app architecture, branching strategy, commit standards, PR workflows, app layer boundaries, and automated code quality enforcement.',
      'Led development of a core product — an IBM-partnered AI governance and compliance audit system (ISO 42001).',
      'Acted as de facto technical lead: wrote and delegated tickets, conducted architecture reviews, drove cross-stack refactors, and mentored junior and mid-level engineers.',
      'Integrated Auth0 Universal Login on a React SPA with multi-org and role-based access support.',
    ],
  },
  {
    key: 'launchcode',
    company: 'Launchcode',
    role: 'Full Stack Software Engineer',
    time: 'Mar 2020 – Apr 2022',
    bullets: [
      'Delivered a critical fintech investment management platform on time after inheriting it mid-build during a 75% team reduction; maintained and extended it post-launch.',
      'Led full-stack development of a real-time machining floor management system from scratch: live machine up/down tracking, efficiency scoring dashboard, and a job scheduler with cascading time adjustments.',
      'Co-developed a Cisco-partnered telehealth platform for automated caregiving for high-spectrum autism patients; integrated Webex APIs with Cisco touchscreen hardware for highly constrained, non-typical end users.',
      'Progressed from second-seat interviewer to independently leading the technical interview process; co-designed the structured interview format, built the onboarding program, and trained others to run both.',
    ],
  },
  {
    key: 'freelance',
    company: 'Freelance',
    role: 'Web Developer',
    time: 'Jun 2019 – Apr 2023',
    bullets: [
      'Delivered pixel-perfect, highly designed websites for digital marketing agencies including Cossette, DDB Canada, and Camp Pacific under tight deadlines.',
      'Converted complex editorial designs into responsive, accessible UIs; developed deep CSS fluency across viewport-relative units, ch-based typography, multi-breakpoint reflow, and accessibility-aware styling.',
      'Progressed to Senior Web Developer at Mercenary Digital — led projects end-to-end, estimated scope, mentored junior developers, and owned client communication.',
    ],
  },
  {
    key: 'predicted-property',
    company: 'Predicted Property',
    role: 'Full Stack Web Developer',
    time: 'Sep 2017 – May 2019',
    bullets: [
      'Rebuilt a data scraping pipeline from a single manually-run Ruby script to a Sidekiq worker queue scaling from 1 to 10 workers — cutting runtime by 80%, from 3–4 days to under half a day.',
      'Surfaced 800+ missed leads during an unstructured data cleanup project by validating addresses, standardizing phone numbers, and extracting leads from free-form input.',
    ],
  },
];
