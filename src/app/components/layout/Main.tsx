import React from 'react';
import styled from '@emotion/styled';
import { theme } from '~/theme';

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

const StyledMain = styled.main`
  background: transparent;
  color: ${({ theme }) => theme.colors.white};

  padding: 2rem ${({ theme }) => theme.layoutSpacing.md};

  @media only screen and (min-width: ${theme.breakpoints.lg}) {
    padding: 2.5rem ${({ theme }) => theme.layoutSpacing.lg};
  }

  @media only screen and (min-width: ${theme.breakpoints.xxl}) {
    padding: 2.5rem ${({ theme }) => theme.layoutSpacing.xxl};
  }

  @media only screen and (min-width: ${theme.breakpoints.xxxl}) {
    padding: 2.5rem ${({ theme }) => theme.layoutSpacing.xxxl};
  }
`;
