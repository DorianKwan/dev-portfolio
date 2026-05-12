import styled from '@emotion/styled';
import type { GetStaticProps } from 'next';
import { Heading } from '~/app/components/common/Heading/Heading';
import { Page } from '~/app/components/layout/Page/Page';
import { PageContainer } from '~/app/components/page-shared/shared.styled';
import {
  Project,
  ProjectCard,
} from '~/app/components/page-specific/showcase/ProjectCard';
import { sanityClient } from '~/lib/sanity/client';
import { projectsQuery } from '~/lib/sanity/queries';
import { theme } from '~/theme/theme';

interface ShowcaseProps {
  projects: Project[];
}

const Showcase = ({ projects }: ShowcaseProps) => {
  return (
    <Page>
      <PageContainer>
        <Heading marginBottom="4rem">Showcase</Heading>
        <ShowcaseGrid>
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </ShowcaseGrid>
      </PageContainer>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<ShowcaseProps> = async () => {
  const projects = await sanityClient.fetch<Project[]>(projectsQuery);

  return {
    props: { projects },
    revalidate: 60,
  };
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
