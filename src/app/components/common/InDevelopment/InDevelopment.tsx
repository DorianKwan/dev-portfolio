import styled from '@emotion/styled';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Circles,
  Heading,
  PageContainer,
  PageContentWrapper,
} from '~/app/components';
import { hexToRGBA } from '~/theme';

// must use a require here or NextJS will error out
// https://github.com/vercel/next.js/issues/51949
const { library } = require('@fortawesome/fontawesome-svg-core');

library.add(faCode);

interface InDevelopmentProps {
  title: string;
}

export const InDevelopment: React.FC<InDevelopmentProps> = ({ title }) => {
  return (
    <PageContainer>
      <Circles />
      <PageContentWrapper>
        <Heading>{title}</Heading>
        <ContentWrapper>
          <FontAwesomeIcon icon="code" />
          <Text>Under construction. Check in later.</Text>
        </ContentWrapper>
      </PageContentWrapper>
    </PageContainer>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;

  svg {
    width: 8rem;
    height: 8rem;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
  font-size: 1.25rem;
`;

const CirclesWrapper = styled.div``;
