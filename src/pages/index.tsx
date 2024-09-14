import styled from '@emotion/styled';
import {
  Page,
  Heading,
  LinkButton,
  GithubIcon,
  LinkedInIcon,
  DownloadIcon,
} from '~/app/components';
import { hexToRGBA } from '~/theme';

const Home: React.FC = () => {
  return (
    <Page>
      <HomeContainer>
        <HomeWrapper>
          <Heading type="h2">Hi, my name is Bryce</Heading>
          <Heading type="h3" fontSize="1.5rem">
            and I'm a
          </Heading>
          <Heading>Software Engineer</Heading>
          <WelcomeText>
            I develop highly composable, accessible, and intuitive custom web
            applications. I'm known for a strong attention to detail, a
            relentless drive for excellence, and exceptional analytical skills.
            <CTAText>
              If you'd like to work with me check out these links below
            </CTAText>
          </WelcomeText>
          <CTAContainer>
            <LinkButton href="https://github.com/DorianKwan">
              <GithubIcon size="1.25rem" />
              View my Github
            </LinkButton>
            <LinkButton href="https://linkedin.com/in/brycesayerskwan">
              <LinkedInIcon size="1.25rem" />
              View my Linkedin
            </LinkButton>
            <LinkButton
              href="https://github.com/DorianKwan"
              buttonType="secondary">
              <DownloadIcon size="1.25rem" />
              Download my Resume
            </LinkButton>
          </CTAContainer>
        </HomeWrapper>
      </HomeContainer>
    </Page>
  );
};

export default Home;

const HomeContainer = styled.section`
  display: grid;
  place-items: center;
  height: 100%;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 100ch;
  margin-top: -2rem;

  > * {
    width: fit-content;
  }
`;

const WelcomeText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.copyText};
  text-align: center;
  margin-bottom: 1rem;
`;

const CTAText = styled.span`
  margin-top: 0.75rem;
  display: inline-block;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
