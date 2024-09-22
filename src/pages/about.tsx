import { useMemo } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCode,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import {
  AboutCard,
  Circles,
  Heading,
  Page,
  PageContainer,
  PageContentWrapper,
} from '~/app/components';
import { hexToRGBA, theme } from '~/theme';

// must use a require here or NextJS will error out
// https://github.com/vercel/next.js/issues/51949
const { library } = require('@fortawesome/fontawesome-svg-core');

library.add(faSchool, faCode, faBriefcase);

const aboutCardData = [
  {
    icon: <FontAwesomeIcon icon="school" />,
    title: 'Schooling',
    text: 'I graduated from  Lighthouse Labs in 2017 with a Web Development Diploma, funded by the First Nations Technology Council.',
  },
  {
    icon: <FontAwesomeIcon icon="code" />,
    title: 'My Journey',
    text: 'After graduating, I worked at various start-ups and digital marketing agencies before discovering my passion for building custom web applications.',
  },
  {
    icon: <FontAwesomeIcon icon="briefcase" />,
    title: 'Current',
    text: 'I`m currently a Senior Software Engineer at CasperLabs, a web3 development company, where I lead the front-end team building ProveAI.',
  },
];

const skillImages = [
  {
    key: 'typescript',
    src: '/png/typescript.png',
    alt: 'TypeScript brand image',
  },
  {
    key: 'javascript',
    src: '/png/javascript.png',
    alt: 'JavaScript brand image',
  },
  {
    key: 'react',
    src: '/png/react.png',
    alt: 'React brand image',
  },
  {
    key: 'nodejs',
    src: '/png/nodejs.png',
    alt: 'Node brand image',
  },
  {
    key: 'redux',
    src: '/png/redux.png',
    alt: 'Redux brand image',
  },
  {
    key: 'git',
    src: '/png/git.png',
    alt: 'Git brand image',
  },
  {
    key: 'docker',
    src: '/png/docker.png',
    alt: 'Docker brand image',
  },
  {
    key: 'kubernetes',
    src: '/png/kubernetes.png',
    alt: 'Kubernetes brand image',
  },
  {
    key: 'postgres',
    src: '/png/postgres.png',
    alt: 'Postgres brand image',
  },
];

const About: React.FC = () => {
  const cards = useMemo(() => {
    return aboutCardData.map(({ icon, title, text }) => {
      return (
        <AboutCard key={title} title={title} icon={icon}>
          <CardText>{text}</CardText>
        </AboutCard>
      );
    });
  }, []);

  const skillLogos = useMemo(() => {
    return skillImages.map(({ key, src, alt }) => {
      return <Image key={key} src={src} alt={alt} width={75} height={75} />;
    });
  }, []);

  return (
    <Page>
      <PageContainer>
        <Circles />
        <PageContentWrapper gap="2rem">
          <Heading>About</Heading>
          <CardGrid>{cards}</CardGrid>
          <Skills>{skillLogos}</Skills>
        </PageContentWrapper>
      </PageContainer>
    </Page>
  );
};

export default About;

const CardGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-rows: 1fr 1fr 1fr;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: unset;
  }
`;

const CardText = styled.p`
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
  line-height: 1.75;
`;

const Skills = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  gap: 1.75rem;
  flex-wrap: wrap;
`;
