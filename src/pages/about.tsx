import { useMemo } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCode,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import {
  Circles,
  Heading,
  Page,
  PageContainer,
  PageContentWrapper,
  PageText,
  PageTextHighlight,
} from '~/app/components';
import { AboutCard } from '~/app/components/page-specific';
import { hexToRGBA, theme } from '~/theme';

// must use a require here or NextJS will error out
// https://github.com/vercel/next.js/issues/51949
const { library } = require('@fortawesome/fontawesome-svg-core');

library.add(faSchool, faCode, faBriefcase);

const aboutCardData = [
  {
    icon: <FontAwesomeIcon icon="school" />,
    title: 'Schooling',
    text: 'Graduated from  Lighthouse Labs in 2017 with a Web Development Diploma, funded by the First Nations Technology Council.',
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

  return (
    <Page>
      <PageContainer>
        <Circles />
        <PageContentWrapper gap="2rem">
          <Heading>About</Heading>
          <CardGrid>{cards}</CardGrid>
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
