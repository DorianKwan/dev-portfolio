export const PREFERRED_SKILLS = new Set([
  'TypeScript',
  'React',
  'TanStack Query / Router',
  'Zustand',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
  'Shadcn',
  'Tailwind',
  'pnpm',
  'ESLint',
  'Prettier',
  'Claude Code',
]);

export type SkillCategory = {
  label: string;
  skills: string[];
};

export const skillsData: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Ruby'],
  },
  {
    label: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TanStack Query / Router',
      'Zustand',
      'Redux (RTK)',
    ],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'NestJS', 'Express', 'Koa', 'FastAPI', 'Rails'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'],
  },
  {
    label: 'Infrastructure',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Pulumi', 'CI/CD', 'Monorepo'],
  },
  {
    label: 'Styling',
    skills: [
      'Shadcn',
      'Tailwind',
      'styled-components',
      'SASS / PostCSS',
      'CSS',
    ],
  },
  {
    label: 'Tooling',
    skills: [
      'pnpm',
      'ESLint',
      'Prettier',
      'Husky',
      'Storybook',
      'Vitest',
      'Claude Code',
    ],
  },
  {
    label: 'AI & Observability',
    skills: [
      'OpenTelemetry',
      'LiteLLM',
      'Prometheus',
      'Guardrails',
      'NIMs',
      'Evaluations',
      'RAG',
    ],
  },
];
