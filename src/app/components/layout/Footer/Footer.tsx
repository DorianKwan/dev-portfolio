import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  UpWorkIcon,
} from '~/app/components/icons';
import { theme } from '~/theme';
import { Availability, AvailabilityStatus } from './Availability';

interface FooterLink {
  to: string;
  icon: React.ReactNode;
  key: string;
}

const footerSocialData: FooterLink[] = [
  {
    to: 'https://www.github.com/DorianKwan',
    icon: <GithubIcon hoverColor={theme.colors.lightPurple} />,
    key: 'github',
  },
  {
    to: 'https://www.linkedin.com/in/brycesayerskwan',
    icon: <LinkedInIcon hoverColor={theme.colors.lightPurple} />,
    key: 'linkedin',
  },
  {
    to: 'https://www.upwork.com/freelancers/~01506f13ea9da3fc70?viewMode=1',
    icon: <UpWorkIcon hoverColor={theme.colors.lightPurple} />,
    key: 'upwork',
  },
  {
    to: 'mailto:bsayerskwan@gmail.com',
    icon: <EmailIcon hoverColor={theme.colors.lightPurple} />,
    key: 'email',
  },
];

export const Footer: React.FC = () => {
  const footerLinks = useMemo(() => {
    return footerSocialData.map(({ to, icon, key }) => {
      return (
        <FooterLinkWrapper key={key}>
          <FooterLink href={to} target="_blank">
            {icon}
          </FooterLink>
        </FooterLinkWrapper>
      );
    }, []);
  }, []);

  return (
    <StyledFooter>
      <Copyright>© 2024 Bryce Sayers-Kwan</Copyright>
      <FooterNav>
        <FooterLinks>{footerLinks}</FooterLinks>
      </FooterNav>
      <Availability availability={AvailabilityStatus.Available} />
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
    grid-template-columns: auto 1fr auto;
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

const FooterLink = styled(Link)``;
