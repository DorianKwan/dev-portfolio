import { useState } from 'react';
import { Heading } from '~/app/components/common/Heading/Heading';
import { LinkButton } from '~/app/components/common/LinkButton/LinkButton';
import { Page } from '~/app/components/layout/Page/Page';
import {
  CTAContainer,
  PageContainer,
  PageContentWrapper,
  PageText,
  PageTextHighlight,
} from '~/app/components/page-shared/shared.styled';
import { ContactDrawer } from '~/app/components/page-specific/contact/ContactDrawer';

const Contact: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Page>
      <PageContainer>
        <PageContentWrapper maxWidth="85ch">
          <Heading>Let&apos;s Connect</Heading>
          <PageText>
            If you have a project idea, a team that needs developer assistance,
            or believe I might be a good fit for a role you&apos;re hiring for.
            <PageTextHighlight>Get in touch with me!</PageTextHighlight>
          </PageText>
          <CTAContainer>
            <LinkButton
              href="#"
              gap="0.75rem"
              padding="0.75rem 3rem"
              onClick={e => {
                e.preventDefault();
                setIsDrawerOpen(true);
              }}>
              Say hi <span>👋</span>
            </LinkButton>
          </CTAContainer>
        </PageContentWrapper>
      </PageContainer>
      <ContactDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Page>
  );
};

export default Contact;
