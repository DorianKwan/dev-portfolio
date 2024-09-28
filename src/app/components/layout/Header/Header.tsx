import React from 'react';
import styled from '@emotion/styled';
import { Blink, LinkButton, ShowOnDesktop } from '~/app/components';
import { theme } from '~/theme';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Logo } from './header.styled';

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo href="/">
        Bryce Sayers-Kwan<Blink>_</Blink>
      </Logo>
      <DesktopNav />
      <MobileNav />
      <ShowOnDesktop>
        <LinkButton href="/contact">Let's Connect</LinkButton>
      </ShowOnDesktop>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 6rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 ${({ theme }) => theme.layoutSpacing.md};
  margin-bottom: 2rem;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;
    margin: 0;
  }

  @media only screen and (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.layoutSpacing.lg};
  }

  @media only screen and (min-width: ${theme.breakpoints.xxl}) {
    padding: 0 ${({ theme }) => theme.layoutSpacing.xxl};
  }

  @media only screen and (min-width: ${theme.breakpoints.xxxl}) {
    padding: 0 ${({ theme }) => theme.layoutSpacing.xxxl};
  }
`;
