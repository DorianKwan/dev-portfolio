import {
  Heading,
  LinkButton,
  Page,
  CTAContainer,
  PageContainer,
  PageContentWrapper,
  PageText,
  PageTextHighlight,
} from '~/app/components';

const Contact: React.FC = () => {
  return (
    <Page>
      <PageContainer>
        <PageContentWrapper maxWidth="85ch">
          <Heading>Let's Connect</Heading>
          <PageText>
            If you have a project idea, team that needs developer assistance, or
            believe I might be a good fit for a role you're hiring for.
            <PageTextHighlight>Get in touch with me!</PageTextHighlight>
          </PageText>
          <CTAContainer>
            <LinkButton
              href="mailto:bsayerskwan@gmail.com"
              gap="0.75rem"
              padding="0.75rem 3rem"
              maxWidth="15rem">
              Say hi <span>👋</span>
            </LinkButton>
          </CTAContainer>
        </PageContentWrapper>
      </PageContainer>
    </Page>
  );
};

export default Contact;
