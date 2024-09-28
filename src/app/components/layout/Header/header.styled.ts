import styled from '@emotion/styled';
import Link from 'next/link';
import { BebasNeue } from '~/app/fonts';

export const Logo = styled(Link)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
  transition: color 250ms ease-in-out;
  font-family: ${BebasNeue.style.fontFamily};

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightPurple};
  }
`;
