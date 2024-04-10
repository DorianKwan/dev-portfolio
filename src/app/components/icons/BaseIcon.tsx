import styled from '@emotion/styled';

export const BaseIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return <StyledIconWrapper>{icon}</StyledIconWrapper>;
};

const StyledIconWrapper = styled.div`
  svg {
    height: 2rem;
    width: 2rem;
    color: white;
  }
`;
