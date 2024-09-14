import styled from '@emotion/styled';
import Link, { LinkProps } from 'next/link';
import { BebasNeue } from '~/app/fonts';
import { hexToRGBA, pxToRem } from '~/theme';

type ButtonType = 'primary' | 'secondary';

interface LinkButtonProps extends LinkProps {
  readonly children: React.ReactNode;
  readonly buttonType?: ButtonType;
  readonly className?: string;
  readonly external?: boolean;
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

const StyledLinkButton = styled(Link)<LinkButtonProps>`
  background: ${({ buttonType, theme }) =>
    buttonType === 'secondary' ? theme.colors.black : theme.colors.bluePurple};
  color: ${({ theme }) => theme.colors.white};
  border: ${pxToRem(1)} solid;
  border-color: ${({ buttonType, theme }) =>
    buttonType === 'secondary' ? theme.colors.white : theme.colors.bluePurple};
  padding: 0.75rem 2.25rem;
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.325rem;

  :hover {
    filter: brightness(125%);
  }
`;