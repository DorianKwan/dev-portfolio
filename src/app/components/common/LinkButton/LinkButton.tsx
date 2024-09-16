import styled from '@emotion/styled';
import Link, { LinkProps } from 'next/link';
import { BebasNeue } from '~/app/fonts';
import { pxToRem, theme } from '~/theme';

type ButtonType = 'primary' | 'secondary';

interface LinkButtonProps extends LinkProps {
  readonly children: React.ReactNode;
  readonly buttonType?: ButtonType;
  readonly className?: string;
  readonly external?: boolean;
  readonly download?: boolean;
  readonly rel?: string;
  readonly locale?: string | false;
  readonly gap?: React.CSSProperties['gap'];
  readonly padding?: React.CSSProperties['padding'];
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  className,
  href,
  buttonType,
  external,
  ...restOfLinkButtonProps
}) => {
  return (
    <StyledLinkButton
      className={className}
      href={href}
      target={external ? '_blank' : ''}
      buttonType={buttonType}
      {...restOfLinkButtonProps}>
      {children}
    </StyledLinkButton>
  );
};

const StyledLinkButton = styled(Link, {
  shouldForwardProp: props => props !== 'buttonType' && props !== 'maxWidth',
})<LinkButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  place-content: center;
  width: 100%;
  gap: ${({ gap }) => gap ?? '1rem'};
  background: ${({ buttonType, theme }) =>
    buttonType === 'secondary' ? theme.colors.black : theme.colors.bluePurple};
  color: ${({ theme }) => theme.colors.white};
  border: ${pxToRem(1)} solid;
  border-color: ${({ buttonType, theme }) =>
    buttonType === 'secondary' ? theme.colors.white : theme.colors.bluePurple};
  padding: ${({ padding }) => padding ?? '0.75rem 1.5rem'};
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.325rem;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    max-width: 19.375rem;
  }

  &::after {
    content: '';
    position: absolute;
    height: 0.25rem;
    width: 0;
    bottom: -0.125rem;
    left: 0;
    background-color: ${({ buttonType }) =>
      buttonType === 'secondary'
        ? theme.colors.lightBlue
        : theme.colors.lightPurple};
    transition: width 250ms ease-in-out;
  }

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    filter: brightness(125%);

    &::after {
      width: 100%;
    }
  }
`;
