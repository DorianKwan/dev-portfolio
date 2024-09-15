import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styled from '@emotion/styled';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme';
import { navigationLinks } from '../navigation.data';

export const DesktopNav = () => {
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
    <Nav>
      <NavLinks>{navLinks}</NavLinks>
    </Nav>
  );
};

const Nav = styled.nav`
  display: none;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: block;
  }
`;

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
  position: relative;
  font-size: 1.75rem;
  font-family: ${BebasNeue.style.fontFamily};
  color: ${({ current, theme }) =>
    current ? theme.colors.lightPurple : theme.colors.white};
  border-bottom: ${({ current, theme }) =>
    current ? `0.25rem ${theme.colors.lightPurple} solid` : 'none'};
  transition: color 250ms ease-in-out;
  padding: 0.125rem 0;
  font-weight: ${({ current, theme }) => (current ? 'bold' : 'normal')};

  &::after {
    content: '';
    position: absolute;
    height: 0.25rem;
    width: 0;
    bottom: -0.25rem;
    left: 0;
    background-color: ${theme.colors.lightPurple};
    transition: width 250ms ease-in-out;
  }

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightPurple};

    &::after {
      width: 100%;
    }
  }
`;
