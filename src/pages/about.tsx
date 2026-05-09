import styled from '@emotion/styled';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Heading } from '~/app/components/common/Heading/Heading';
import { Page } from '~/app/components/layout/Page/Page';
import { PageContainer } from '~/app/components/page-shared/shared.styled';
import { theme } from '~/theme/theme';
import { hexToRGBA, pxToRem } from '~/theme/utils';

const About: React.FC = () => {
  return (
    <Page>
      <PageContainer>
        <Heading>About</Heading>
        <AboutLayout>
          <PhotoWrapper>
            <Image
              src="/images/me.jpg"
              alt="Bryce Sayers-Kwan"
              fill
              priority
              loading="eager"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(min-width: 768px) 380px, 90vw"
            />
          </PhotoWrapper>
          <ProfileContent>
            <Heading type="h2">Bryce Sayers-Kwan</Heading>
            <Title>Senior Software Engineer</Title>
            <Location>
              <FontAwesomeIcon icon={faLocationDot} />
              Reno, NV, USA
            </Location>
            <Bio>
              <p>
                I&apos;m a full-stack software engineer. I started in 2017
                attending Lighthouse Labs, where I built the foundation of my
                technical stack. Since then, I've grown into a senior developer
                who loves solving complex problems and shipping work that makes
                someone's day. I've worked at startups, custom development
                shops, digital marketing agencies, and mid-sized companies.
              </p>
            </Bio>
          </ProfileContent>
        </AboutLayout>
      </PageContainer>
    </Page>
  );
};

export default About;

const AboutLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  max-width: ${pxToRem(1000)};
  padding: 2rem 1rem 0 1rem;
  z-index: 1;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    flex-direction: row;
    align-items: flex-start;
    gap: 4rem;
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: min(${pxToRem(300)}, 90vw);
  aspect-ratio: 1;
  flex-shrink: 0;
  border-radius: 1rem;
  overflow: hidden;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    width: ${pxToRem(340)};
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    text-align: left;
    padding-top: 0.5rem;
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.5)};
  margin: 0;
`;

const Location = styled.p`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.4)};
  margin: 0.25rem 0 0.75rem;

  svg {
    font-size: 0.85rem;
  }

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    justify-content: flex-start;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 0.975rem;
    line-height: 1.75;
    color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
    margin: 0;
  }
`;
