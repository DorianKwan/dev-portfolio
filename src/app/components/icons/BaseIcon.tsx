import styled from '@emotion/styled';
export interface IconProps {
  hoverColor?: React.CSSProperties['color'];
  size?: React.CSSProperties['height'] | React.CSSProperties['width'];
}

interface BaseIconProps extends IconProps {
  icon: React.ReactNode;
}

export const BaseIcon: React.FC<BaseIconProps> = ({ icon, ...iconProps }) => {
  return <StyledIconWrapper {...iconProps}>{icon}</StyledIconWrapper>;
};

const StyledIconWrapper = styled.div<IconProps>`
  svg {
    height: ${({ size }) => size ?? '2rem'};
    width: ${({ size }) => size ?? '2rem'};
    color: white;
    transition: color 250ms ease-in-out;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      color: ${({ hoverColor }) => hoverColor ?? 'initial'};
    }
  }
`;
