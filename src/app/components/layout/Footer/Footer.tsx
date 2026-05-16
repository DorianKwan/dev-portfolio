import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { GithubIcon } from '~/app/components/icons/GithubIcon';
import { LinkedInIcon } from '~/app/components/icons/LinkedInIcon';
import { theme } from '~/theme/theme';
import { pxToRem } from '~/theme/utils';
import { Availability, AvailabilityStatus } from './Availability/Availability';

interface FooterLink {
  to: string;
  icon: React.ReactNode;
  key: string;
  ariaLabel: string;
}

const footerSocialData: FooterLink[] = [
  {
    to: 'https://www.github.com/DorianKwan',
    icon: <GithubIcon hoverColor={theme.colors.lightPurple} />,
    key: 'github',
    ariaLabel: 'GitHub profile',
  },
  {
    to: 'https://www.linkedin.com/in/brycesayerskwan',
    icon: <LinkedInIcon hoverColor={theme.colors.lightPurple} />,
    key: 'linkedin',
    ariaLabel: 'LinkedIn profile',
  },
];

export const Footer: React.FC = () => {
  const footerLinks = useMemo(() => {
    return footerSocialData.map(({ to, icon, key, ariaLabel }) => {
      return (
        <FooterLinkWrapper key={key}>
          <FooterLink
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}>
            {icon}
          </FooterLink>
        </FooterLinkWrapper>
      );
    }, []);
  }, []);

  return (
    <StyledFooter>
      <AvailabilityWrapper>
        <Availability availability={AvailabilityStatus.Available} />
      </AvailabilityWrapper>
      <FooterNav>
        <FooterLinks>{footerLinks}</FooterLinks>
      </FooterNav>
      <Copyright>© 2026 Bryce Sayers-Kwan</Copyright>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer<{ stickToBottom?: boolean }>`
  width: 100%;
  display: grid;
  place-items: center;
  gap: 2rem;
  background: transparent;
  padding: 2rem ${({ theme }) => theme.layoutSpacing.md};

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    height: 6rem;
    grid-template-columns: ${pxToRem(225)} 1fr ${pxToRem(225)};
    padding: 0 ${({ theme }) => theme.layoutSpacing.md};
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

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.copyrightText};

  &:first-of-type {
    order: 3;

    @media only screen and (min-width: ${theme.breakpoints.md}) {
      order: initial;
      margin-left: auto;
    }
  }
`;

const FooterNav = styled.nav`
  display: flex;
  align-items: center;
`;

const FooterLinks = styled.ul`
  display: flex;
  gap: 1.5rem;
`;

const FooterLinkWrapper = styled.li``;

const FooterLink = styled(Link)`
  color: white;
`;

const AvailabilityWrapper = styled.div`
  order: 2;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    order: initial;
    margin-right: auto;
  }
`;
