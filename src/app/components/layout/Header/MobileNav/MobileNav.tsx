import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useMobileNav } from '~/hooks';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme';
import { HamburgerButton } from './HamburgerButton';
import { navigationLinks } from '../navigation.data';

interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = () => {
  const pathname = usePathname();
  const { isOpen, toggleIsOpen } = useMobileNav();

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
    <MobileNavWrapper>
      <HamburgerButton isOpen={isOpen} setIsOpen={toggleIsOpen} />
      {isOpen && (
        <Nav>
          <NavList>{navLinks}</NavList>
        </Nav>
      )}
    </MobileNavWrapper>
  );
};

const MobileNavWrapper = styled.div`
  z-index: 2;
  display: block;

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    display: none;
  }
`;

const Nav = styled(motion.nav)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bluePurple};
  padding-top: 6rem;
  padding-left: 2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavLinkListItem = styled.li``;

const NavLink = styled(Link, {
  shouldForwardProp: props => props !== 'current',
})<{
  current?: boolean;
}>`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${BebasNeue.style.fontFamily};
  color: ${({ current, theme }) =>
    current ? theme.colors.lightPurple : theme.colors.white};
  border-bottom: ${({ current, theme }) =>
    current ? `0.25rem ${theme.colors.lightPurple} solid` : 'none'};
  transition: color 250ms ease-in-out;
  font-size: 2rem;

  @media only screen and (min-width: ${theme.breakpoints.xs}) {
    font-size: 2.5rem;
    border-bottom: ${({ current, theme }) =>
      current ? `0.3rem ${theme.colors.lightPurple} solid` : 'none'};
  }

  @media only screen and (min-width: ${theme.breakpoints.sm}) {
    font-size: 3rem;
    border-bottom: ${({ current, theme }) =>
      current ? `0.35rem ${theme.colors.lightPurple} solid` : 'none'};
  }

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    font-size: 3.5rem;
    border-bottom: ${({ current, theme }) =>
      current ? `0.4rem ${theme.colors.lightPurple} solid` : 'none'};
  }

  @media only screen and (min-width: ${theme.breakpoints.xmd}) {
    font-size: 4.5rem;
    border-bottom: ${({ current, theme }) =>
      current ? `0.5rem ${theme.colors.lightPurple} solid` : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    height: 0.25rem;
    bottom: -0.25rem;
    width: 0;
    left: 0;
    background-color: ${theme.colors.lightPurple};
    transition: width 250ms ease-in-out;

    @media only screen and (min-width: ${theme.breakpoints.xs}) {
      height: 0.3rem;
      bottom: -0.3rem;
    }

    @media only screen and (min-width: ${theme.breakpoints.sm}) {
      height: 0.35rem;
      bottom: -0.35rem;
    }

    @media only screen and (min-width: ${theme.breakpoints.md}) {
      height: 0.4rem;
      bottom: -0.4rem;
    }

    @media only screen and (min-width: ${theme.breakpoints.xmd}) {
      height: 0.5rem;
      bottom: -0.5rem;
    }
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
