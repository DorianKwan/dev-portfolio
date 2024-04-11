import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  UpWorkIcon,
} from '@/app/components/icons';
import { theme } from '@/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

interface FooterLink {
  to: string;
  icon: React.ReactNode;
  key: string;
}

const footerLinkData: FooterLink[] = [
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
  const footerLinks = footerLinkData.map(({ to, icon, key }) => {
    return (
      <FooterLinkWrapper key={key}>
        <FooterLink href={to} target="_blank">
          {icon as any}
        </FooterLink>
      </FooterLinkWrapper>
    );
  }, []);

  return (
    <StyledFooter>
      <FooterNav>
        <FooterLinks>{footerLinks}</FooterLinks>
      </FooterNav>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  height: 6rem;
  background: ${({ theme }) => theme.colors.background};
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
