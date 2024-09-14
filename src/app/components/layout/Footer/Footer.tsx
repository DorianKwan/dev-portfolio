import React from 'react';
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
    icon: <GithubIcon />,
    key: 'github',
  },
  {
    to: 'https://www.linkedin.com/in/brycesayerskwan',
    icon: <LinkedInIcon />,
    key: 'linkedin',
  },
  {
    to: 'https://www.upwork.com/freelancers/~01506f13ea9da3fc70',
    icon: <UpWorkIcon />,
    key: 'upwork',
  },
  {
    to: 'mailto:bsayerskwan@gmail.com',
    icon: <EmailIcon />,
    key: 'email',
  },
];

export const Footer: React.FC = () => {
  const footerLinks = footerSocialData.map(({ to, icon, key }) => {
    return (
      <FooterLinkWrapper key={key}>
        <FooterLink href={to} target="_blank">
          {icon}
        </FooterLink>
      </FooterLinkWrapper>
    );
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

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-items: center;
  height: 6rem;
  background: transparent;
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

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.copyrightText};
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
