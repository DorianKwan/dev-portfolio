import { useMemo } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkButton } from '../../common';
import { pxToRem } from '~/theme';

export enum ProjectType {
  Project = 'project',
  CaseStudy = 'case-study',
  Website = 'website',
}

export interface Project {
  readonly title: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly description: string;
  readonly type: ProjectType;
  readonly viewUrl?: string;
  readonly githubUrl?: string;
}

interface ProjectCardProps {
  readonly project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, imageUrl, imageAlt, description, type, viewUrl, githubUrl } =
    project;

  const cardActions = useMemo(() => {
    const actions: React.ReactNode[] = [];

    if (viewUrl) {
      switch (type) {
        case ProjectType.CaseStudy:
          actions.push(
            <LinkButton href={viewUrl}>
              <FontAwesomeIcon icon="book-open" />
              View Case Study
            </LinkButton>,
          );
        case ProjectType.Project:
          break;
        case ProjectType.Website:
          actions.push(
            <LinkButton href={viewUrl}>
              View Site
              <FontAwesomeIcon icon="arrow-up-right-from-square" />
            </LinkButton>,
          );
        default:
          break;
      }
    }

    if (githubUrl) {
      actions.push(
        <LinkButton href={githubUrl} buttonType="secondary">
          <FontAwesomeIcon icon={['fab', 'github']} />
          View Repo
        </LinkButton>,
      );
    }
    return actions;
  }, [type, githubUrl]);

  return (
    <Card>
      <CardHeader>
        <CardImage src={imageUrl} alt={imageAlt} />
        <CardHeading>{title}</CardHeading>
      </CardHeader>
      <CardSection>
        <CardDescription>{description}</CardDescription>
        <CardActions>{cardActions}</CardActions>
      </CardSection>
    </Card>
  );
};

const Card = styled.article`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1.25rem;
  max-width: ${pxToRem(500)};
  background-color: ${({ theme }) => theme.colors.aboutCardBg};
  border-radius: 1rem;
  padding: 2rem;
`;

const CardImage = styled.img`
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  max-height: ${pxToRem(240)};
`;

const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeading = styled.h2``;

const CardDescription = styled.p`
  height: 100%;
`;

const CardSection = styled.section`
  display: grid;
  gap: 1.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 1rem;

  a {
    width: fit-content;
  }
`;
