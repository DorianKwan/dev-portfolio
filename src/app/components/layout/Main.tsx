import React from 'react';
import styled from '@emotion/styled';

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

const StyledMain = styled.main`
  padding: 2.5rem 4rem;
  background-color: #ddd;
`;
