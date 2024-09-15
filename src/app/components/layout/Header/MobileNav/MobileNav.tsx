import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import {
  getIsMobileNavOpen,
  setIsMobileNavOpen,
  useAppDispatch,
  useAppSelector,
} from '~/app/store';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme';
import { HamburgerButton } from './HamburgerButton';
import { navigationLinks } from '../navigation.data';

interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(getIsMobileNavOpen);

  const setIsOpen = useCallback(() => {
    dispatch(setIsMobileNavOpen(!isOpen));
  }, [isOpen]);

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
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
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
  font-size: 4.5rem;
  color: ${({ current, theme }) =>
    current ? theme.colors.lightPurple : theme.colors.white};
  border-bottom: ${({ current, theme }) =>
    current ? `0.5rem ${theme.colors.lightPurple} solid` : 'none'};
  transition: color 250ms ease-in-out;

  &::after {
    content: '';
    position: absolute;
    height: 0.5rem;
    width: 0;
    bottom: -0.5rem;
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
