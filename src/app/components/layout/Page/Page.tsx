import styled from '@emotion/styled';

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

const StyledPage = styled.div`
  height: 100%;
`;
