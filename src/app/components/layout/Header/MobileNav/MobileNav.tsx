import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useMobileNav } from '~/hooks';
import { BebasNeue } from '~/app/fonts';
import { Blink } from '~/app/components/special';
import { theme } from '~/theme';
import { HamburgerButton } from './HamburgerButton';
import { navigationLinks } from '../navigation.data';
import { Logo } from '../header.styled';
import { Footer } from '../../Footer';

const navVariants = {
  open: {
    y: 0,
    transition: {
      type: 'slide',
      ease: 'linear',
      duration: 0.4,
    },
  },
  closed: {
    y: '-100%',
    transition: {
      type: 'slide',
      ease: 'linear',
      duration: 0.4,
      delay: 0.4,
    },
  },
};

const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.4 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const footerVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000 },
      delay: 0.7,
      duration: 0.9,
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.2,
    },
  },
};

interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = () => {
  const { isOpen, toggleIsOpen, pathname, lastPath } = useMobileNav();

  const navLinks = useMemo(() => {
    return navigationLinks.map(({ name, to, key }, index) => {
      return (
        <NavLinkListItem
          key={key}
          current={pathname === to || lastPath === to} // lastPath to stop resizing jitter on click
          index={index}
          variants={menuItemVariants}>
          <NavLink href={to} current={pathname === to}>
            {name}
          </NavLink>
        </NavLinkListItem>
      );
    });
  }, [pathname, lastPath]);

  const animation = isOpen ? 'open' : 'closed';

  return (
    <MobileNavWrapper>
      <HamburgerButton isOpen={isOpen} setIsOpen={toggleIsOpen} />
      <Nav initial={false} animate={animation} variants={navVariants}>
        <LogoWrapper>
          <Logo href="/">
            Bryce Sayers-Kwan<Blink>_</Blink>
          </Logo>
        </LogoWrapper>
        <NavList variants={menuVariants}>{navLinks}</NavList>
        <FooterWrapper animate={animation} variants={footerVariants}>
          <Footer />
        </FooterWrapper>
      </Nav>
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

const LogoWrapper = styled.div`
  padding-left: 2rem;
`;

const FooterWrapper = styled(motion.div)``;

const Nav = styled(motion.nav)`
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 3rem;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bluePurple};
  padding-top: 1.5rem;
`;

const NavList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 2rem;
`;

const NavLinkListItem = styled(motion.li, {
  shouldForwardProp: props => props !== 'current' && props !== 'index',
})<{ current?: boolean; index: number }>`
  padding-bottom: ${({ current, index }) =>
    current && index !== 0 ? '1rem' : 'initial'};
  // transition required to smooth animation when switching routes
  transition: padding-bottom ease-in-out 2000ms;
`;

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
