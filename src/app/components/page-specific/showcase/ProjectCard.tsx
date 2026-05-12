import { useMemo } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { SanityImageSource } from '@sanity/image-url';
import Image from 'next/image';
import { urlForImage } from '~/lib/sanity/image';
import { hexToRGBA, pxToRem } from '~/theme/utils';
import { LinkButton } from '../../common/LinkButton/LinkButton';

export enum ProjectType {
  Project = 'project',
  CaseStudy = 'case-study',
  Website = 'website',
}

export interface SanityProjectImage {
  asset: SanityImageSource;
  alt?: string;
}

export interface Project {
  readonly _id: string;
  readonly title: string;
  readonly image: SanityProjectImage;
  readonly description: string;
  readonly type: ProjectType;
  readonly viewUrl?: string;
  readonly githubUrl?: string;
}

interface ProjectCardProps {
  readonly project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, image, description, type, viewUrl, githubUrl } = project;

  const imageUrl = urlForImage(image.asset)
    .width(500)
    .height(240)
    .fit('crop')
    .url();

  const cardActions = useMemo(() => {
    const actions: React.ReactNode[] = [];

    if (viewUrl) {
      switch (type) {
        case ProjectType.CaseStudy:
          actions.push(
            <LinkButton key="case-study" href={viewUrl} external>
              <FontAwesomeIcon icon="book-open" />
              View Case Study
            </LinkButton>,
          );
          break;
        case ProjectType.Website:
          actions.push(
            <LinkButton key="view-site" href={viewUrl} external>
              <FontAwesomeIcon icon="arrow-up-right-from-square" />
              View Site
            </LinkButton>,
          );
          break;
        default:
          break;
      }
    }

    if (githubUrl) {
      actions.push(
        <LinkButton
          key="github"
          href={githubUrl}
          buttonType="secondary"
          external>
          <FontAwesomeIcon icon={['fab', 'github']} />
          View Repo
        </LinkButton>,
      );
    }
    return actions;
  }, [viewUrl, type, githubUrl]);

  return (
    <Card>
      <CardHeader>
        <CardImageWrapper>
          <Image
            src={imageUrl}
            alt={image.alt ?? ''}
            loading="eager"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 768px) 500px, 100vw"
          />
        </CardImageWrapper>
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

const CardImageWrapper = styled.div`
  position: relative;
  height: ${pxToRem(240)};
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.05)};
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
  grid-template-rows: 1fr auto;
  gap: 1.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 1rem;

  a {
    width: fit-content;
  }
`;
