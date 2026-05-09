import { Heading } from '~/app/components/common/Heading/Heading';
import { LinkButton } from '~/app/components/common/LinkButton/LinkButton';
import { DownloadIcon } from '~/app/components/icons/DownloadIcon';
import { LinkIcon } from '~/app/components/icons/LinkIcon';
import { Page } from '~/app/components/layout/Page/Page';
import {
  CTAContainer,
  PageContainer,
  PageContentWrapper,
  PageText,
  PageTextHighlight,
} from '~/app/components/page-shared/shared.styled';

const Home: React.FC = () => {
  return (
    <Page>
      <PageContainer>
        <PageContentWrapper>
          <Heading type="h2">Hi, my name is Bryce</Heading>
          <Heading type="h3" fontSize="1.5rem">
            and I'm a
          </Heading>
          <Heading>Software Engineer</Heading>
          <PageText>
            I build and scale production systems at early-stage startups. I own
            architecture end-to-end, ship under pressure, and build systems and
            teams that last—from first commit to a scaled engineering org.
            <PageTextHighlight>
              Check out the links below if you'd like to work together.
            </PageTextHighlight>
          </PageText>
          <CTAContainer>
            <LinkButton href="/experience">
              <LinkIcon size="1.25rem" />
              View my Experience
            </LinkButton>
            <LinkButton
              href="/pdf/resume.pdf"
              buttonType="secondary"
              rel="noopener noreferrer"
              locale={false}
              external
              download>
              <DownloadIcon size="1.25rem" />
              Download my Resume
            </LinkButton>
          </CTAContainer>
        </PageContentWrapper>
      </PageContainer>
    </Page>
  );
};

export default Home;
