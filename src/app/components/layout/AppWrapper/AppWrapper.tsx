import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatWidget } from '~/app/components/page-specific/chat/ChatWidget';
import { ContactDrawer } from '~/app/components/page-specific/contact/ContactDrawer';
import { useAppSelector } from '~/app/store/hooks';
import { getIsMobileNavOpen } from '~/app/store/selectors/app-selectors';

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
        <ContactDrawer />
        <ChatWidget />
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
