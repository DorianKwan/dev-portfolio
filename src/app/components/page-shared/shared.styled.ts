import styled from '@emotion/styled';
import { hexToRGBA, theme } from '~/theme';

export const PageContainer = styled.section`
  display: grid;
  place-items: center;
  height: 100%;
`;

export const PageContentWrapper = styled.div<{
  maxWidth?: React.CSSProperties['width'];
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: ${({ maxWidth }) => maxWidth ?? '105ch'};
  margin-top: -2rem;
  text-align: center;

  > * {
    width: fit-content;
  }
`;

export const PageText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.copyText};
  margin-bottom: 1rem;
`;

export const PageTextHighlight = styled.span`
  margin-top: 0.75rem;
  display: block;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
`;

export const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;
