import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { theme } from '@/theme';
import { Blink } from '../special';

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
    name: 'Skills',
    to: '/skills',
    key: 'skills',
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
      <Nav>
        <NavLinks>{navLinks}</NavLinks>
      </Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: 6rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 ${({ theme }) => theme.layoutSpacing.md};

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
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.white};
  transition: color 250ms ease-in-out;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.pink};
  }
`;

const Nav = styled.nav``;

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
  font-size: 1.125rem;
  color: ${({ current, theme }) =>
    current ? theme.colors.stringText : theme.colors.white};
  border-bottom: ${({ current, theme }) =>
    current ? `0.125rem ${theme.colors.stringText} solid` : 'none'};
  transition: color 250ms ease-in-out;
  padding: 0.125rem 0;
  font-weight: ${({ current, theme }) => (current ? 'bold' : 'normal')};

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${({ theme, current }) =>
      current ? theme.colors.stringText : theme.colors.pink};
  }
`;
