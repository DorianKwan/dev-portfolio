import styled from '@emotion/styled';
import { theme } from '~/theme';

export const ShowOnDesktop = styled.div`
  display: none;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: block;
  }
`;

export const ShowOnMobile = styled.div`
  display: block;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: none;
  }
`;
