import { useMemo } from 'react';
import styled from '@emotion/styled';
import {
  Heading,
  Page,
  PageContainer,
  Project,
  ProjectCard,
  ProjectType,
} from '~/app/components';
import { theme } from '~/theme';

const showcaseData: Project[] = [
  {
    title: 'Developer Portfolio: Take a look at this site itself',
    imageUrl: '/png/portfolio.png',
    imageAlt: 'image of my portfolio application',
    description:
      'Take a look at this site`s repository!  It`s the most up to date public code of mine.  Developed using NextJS, React, styled-component & Vite.',
    type: ProjectType.Project,
    githubUrl: 'https://github.com/DorianKwan/dev-portfolio',
  },
  {
    title: 'Test Your Knowledge Quiz: For Fun Application',
    imageUrl: '/png/quiz.png',
    imageAlt: 'image of a simple quiz application',
    description:
      'Take a look at this for fun project I developed using Create React App.  It`s a simple quiz app that focuses on a simple and beautiful UI.',
    type: ProjectType.Project,
    githubUrl: 'https://github.com/DorianKwan/quiz-app',
  },
  {
    title: 'Steelhaus: Scheduling, real-time data visualization & optimization',
    imageUrl: '/png/steelhaus.png',
    imageAlt: 'image of steelhaus project scheduling application',
    description:
      'Hardware to track machine data, software to make sense of it and easy to understand UI that anyone can use.  An application developed while at Launchcode.',
    type: ProjectType.CaseStudy,
    viewUrl: 'https://lc.dev/projects/steelhaus/',
  },
  {
    title: 'Caret Legal: Digital Marketing WordPress Re-brand',
    imageUrl: '/png/caret.png',
    imageAlt: 'image of the caret legal site',
    description:
      'WordPress side re-brand / re-theme done in 2022 on the side working with Mercenary Digital.  I lead the project, including client-relations, and delivered delivered on time.',
    type: ProjectType.Website,
    viewUrl: 'https://caretlegal.com/',
  },
];

const Showcase: React.FC = () => {
  const projects = useMemo(() => {
    return showcaseData.map(project => {
      return <ProjectCard key={project.title} project={project} />;
    });
  }, []);

  return (
    <Page>
      <PageContainer>
        <Heading marginBottom="4rem">Showcase</Heading>
        <ShowcaseGrid>{projects}</ShowcaseGrid>
      </PageContainer>
    </Page>
  );
};

export default Showcase;

const ShowcaseGrid = styled.section`
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;
