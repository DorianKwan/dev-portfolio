import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { getIsMobileNavOpen } from '~/app/store/selectors/app-selectors';
import { useAppSelector } from '~/app/store/hooks';

interface AppWrapperProps {
  readonly children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const isMobileNavOpen = useAppSelector(getIsMobileNavOpen);

  return (
    <AnimatePresence>
      <Wrapper
        disableScroll={isMobileNavOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}>
        {children}
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled(motion.div, {
  shouldForwardProp: props => props !== 'disableScroll',
})<{ disableScroll?: boolean }>`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  height: ${({ disableScroll }) => (disableScroll ? '100vh' : 'initial')};
  overflow-y: ${({ disableScroll }) => (disableScroll ? 'hidden' : 'initial')};
`;
