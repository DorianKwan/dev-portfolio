import styled from '@emotion/styled';
import { Heading, LinkButton, Page } from '~/app/components';
import { hexToRGBA, theme } from '~/theme';

const Contact: React.FC = () => {
  return (
    <Page>
      <ContactContainer>
        <ContactWrapper>
          <Heading>Let's Connect</Heading>
          <ConnectText>
            If you have a project idea, team that needs developer assistance or
            believe I might be a good fit for a role you're hiring for
            <CTAText>Get in touch with me!</CTAText>
          </ConnectText>
          <CTAContainer>
            <LinkButton
              href="mailto:bsayerskwan@gmail.com"
              gap="0.75rem"
              padding="0.75rem 3rem">
              Say hi <span>👋</span>
            </LinkButton>
          </CTAContainer>
        </ContactWrapper>
      </ContactContainer>
    </Page>
  );
};

export default Contact;

const ContactContainer = styled.section`
  display: grid;
  place-items: center;
  height: 100%;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 85ch;
  margin-top: -2rem;
  text-align: center;

  > * {
    width: fit-content;
  }
`;

const ConnectText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.copyText};
  margin-bottom: 1rem;
`;

const CTAText = styled.span`
  margin-top: 0.75rem;
  display: block;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;
