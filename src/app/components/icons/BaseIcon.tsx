import styled from '@emotion/styled';

export const BaseIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return <StyledIconWrapper>{icon}</StyledIconWrapper>;
};

const StyledIconWrapper = styled.div`
  svg {
    height: 2rem;
    width: 2rem;
    color: white;
    transition: color 250ms ease-in-out;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.pink};
    }
  }
`;
