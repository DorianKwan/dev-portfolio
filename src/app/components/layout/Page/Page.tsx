import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledPage
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0 }}>
      {children}
    </StyledPage>
  );
};

const StyledPage = styled(motion.section)`
  height: 100%;
`;
