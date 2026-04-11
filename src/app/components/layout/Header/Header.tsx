import React from 'react';
import styled from '@emotion/styled';
import { ShowOnDesktop } from '~/app/components/common/common.styled';
import { LinkButton } from '~/app/components/common/LinkButton/LinkButton';
import { Blink } from '~/app/components/special/Blink';
import { theme } from '~/theme/theme';
import { DesktopNav } from './DesktopNav/DesktopNav';
import { Logo } from './header.styled';
import { MobileNav } from './MobileNav/MobileNav';

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
  width: 100%;
  height: 6rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 ${({ theme }) => theme.layoutSpacing.md};
  margin-bottom: 2rem;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    place-items: center;
    gap: 0.5rem;
    margin: 0;

    > a:first-of-type {
      justify-self: start;
    }

    > div:last-of-type {
      justify-self: end;
    }
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
