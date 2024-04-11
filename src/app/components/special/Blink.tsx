import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Blink: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledBlink>{children}</StyledBlink>;
};

const blink = keyframes`
  50% {
    opacity: 1;
  }
`;

const StyledBlink = styled.span`
  opacity: 0;
  animation: ${blink} 0.85s steps(1) infinite;
  color: ${({ theme }) => theme.colors.pink};
`;
