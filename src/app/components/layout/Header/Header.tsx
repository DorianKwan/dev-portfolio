import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { Blink, LinkButton, ShowOnDesktop } from '~/app/components';
import { theme } from '~/theme';
import { BebasNeue } from '~/app/fonts';

interface NavigationLink {
  name: string;
  to: string;
  key: string;
}

const navigationLinks: NavigationLink[] = [
  {
    name: 'Home',
    to: '/',
    key: 'home',
  },
  {
    name: 'About',
    to: '/about',
    key: 'about',
  },
  {
    name: 'Showcase',
    to: '/showcase',
    key: 'showcase',
  },
  {
    name: 'Experience',
    to: '/experience',
    key: 'experience',
  },
  {
    name: 'Contact',
    to: '/contact',
    key: 'contact',
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navLinks = useMemo(
    () =>
      navigationLinks.map(({ name, to, key }) => {
        return (
          <NavLinkListItem key={key}>
            <NavLink href={to} current={pathname === to}>
              {name}
            </NavLink>
          </NavLinkListItem>
        );
      }),
    [pathname],
  );

  return (
    <StyledHeader>
      <Logo href="/">
        Bryce Sayers-Kwan<Blink>_</Blink>
      </Logo>
      <DesktopNav>
        <NavLinks>{navLinks}</NavLinks>
      </DesktopNav>
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

const Logo = styled(Link)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
  transition: color 250ms ease-in-out;
  font-family: ${BebasNeue.style.fontFamily};

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightPurple};
  }
`;

const DesktopNav = styled.nav`
  display: none;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: block;
  }
`;

const MobileNav = styled.nav``;

const NavLinks = styled.ul`
  display: flex;
  gap: 1.5rem;
`;

const NavLinkListItem = styled.li``;

// we don't want to forward current to the DOM attributes
const NavLink = styled(Link, {
  shouldForwardProp: props => props !== 'current',
})<{
  current?: boolean;
}>`
  font-size: 1.75rem;
  font-family: ${BebasNeue.style.fontFamily};
  color: ${({ current, theme }) =>
    current ? theme.colors.lightPurple : theme.colors.white};
  border-bottom: ${({ current, theme }) =>
    current ? `0.125rem ${theme.colors.lightPurple} solid` : 'none'};
  transition: color 250ms ease-in-out;
  padding: 0.125rem 0;
  font-weight: ${({ current, theme }) => (current ? 'bold' : 'normal')};

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightPurple};
  }
`;
