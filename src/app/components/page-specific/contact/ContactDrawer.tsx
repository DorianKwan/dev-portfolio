import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA } from '~/theme/utils';
import { ContactForm } from './ContactForm';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleExitComplete = () => {
    dialogRef.current?.close();
    document.body.style.overflow = '';
  };

  // Intercept native Escape close so we can animate out first
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Dialog ref={dialogRef} onCancel={handleCancel}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
            />
            <DrawerPanel
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}>
              <DrawerHeader>
                <DrawerTitle>Get In Touch</DrawerTitle>
                <CloseButton onClick={onClose} aria-label="Close contact form">
                  ✕
                </CloseButton>
              </DrawerHeader>
              <ContactForm onClose={onClose} />
            </DrawerPanel>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  overflow: hidden;

  &::backdrop {
    display: none;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${hexToRGBA(theme.colors.background, 0.8)};
  backdrop-filter: blur(2px);
`;

const DrawerPanel = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: 100%;
  max-width: 30rem;
  background: ${theme.colors.background};
  border-left: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    padding: 2.5rem;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DrawerTitle = styled.h2`
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 2rem;
  color: ${theme.colors.white};
  letter-spacing: 0.05em;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.15)};
  color: ${hexToRGBA(theme.colors.white, 0.6)};
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    color 200ms ease-in-out,
    border-color 200ms ease-in-out;

  &:hover,
  &:focus {
    color: ${theme.colors.white};
    border-color: ${hexToRGBA(theme.colors.white, 0.4)};
  }
`;
