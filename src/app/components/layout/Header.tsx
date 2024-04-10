import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

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
      <Logo href="/">Bryce Sayers-Kwan</Logo>
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
  background: grey;
  color: white;
  padding: 0 4rem;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  color: white;

  &:hover {
    text-decoration: none;
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
  color: white;
  border-bottom: ${({ current }) =>
    current ? '0.125rem white solid' : 'none'};

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    border-bottom: 0.125rem white solid;
  }
`;
