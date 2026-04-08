import { Heading } from '~/app/components/common/Heading/Heading';
import { LinkButton } from '~/app/components/common/LinkButton/LinkButton';
import { Page } from '~/app/components/layout/Page/Page';
import { CTAContainer, PageContainer, PageContentWrapper, PageText, PageTextHighlight } from '~/app/components/page-shared/shared.styled';
import { GithubIcon } from '~/app/components/icons/GithubIcon';
import { LinkedInIcon } from '~/app/components/icons/LinkedInIcon';
import { DownloadIcon } from '~/app/components/icons/DownloadIcon';

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
            I develop highly composable, accessible, and intuitive custom web
            applications. I'm known for having a strong attention to detail, a
            relentless drive for excellence, and exceptional analytical skills.
            <PageTextHighlight>
              If you'd like to work with me check out these links below
            </PageTextHighlight>
          </PageText>
          <CTAContainer>
            <LinkButton href="https://github.com/DorianKwan" external>
              <GithubIcon size="1.25rem" />
              View my Github
            </LinkButton>
            <LinkButton href="https://linkedin.com/in/brycesayerskwan" external>
              <LinkedInIcon size="1.25rem" />
              View my Linkedin
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
