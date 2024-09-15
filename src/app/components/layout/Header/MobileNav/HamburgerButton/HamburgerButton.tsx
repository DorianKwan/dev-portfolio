import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { hexToRGBA, pxToRem } from '~/theme';

interface HamburgerButtonProps {
  readonly isOpen: boolean;
  readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const transition = useMemo(() => {
    return {
      ease: 'easeInOut',
      duration: 0.4,
    };
  }, []);

  return (
    <FramerButton
      initial={false}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      animate={isOpen ? 'open' : 'closed'}>
      <HamburgerLine
        style={{
          left: '50%',
          top: '35%',
          x: '-50%',
          y: '-50%',
        }}
        variants={{
          open: {
            rotate: ['0deg', '0deg', '45deg'],
            top: ['35%', '50%', '50%'],
          },
          closed: {
            rotate: ['45deg', '0deg', '0deg'],
            top: ['50%', '50%', '35%'],
          },
        }}
        transition={transition}
      />
      <HamburgerLine
        style={{
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
        }}
        variants={{
          open: {
            rotate: ['0deg', '0deg', '-45deg'],
          },
          closed: {
            rotate: ['-45deg', '0deg', '0deg'],
          },
        }}
        transition={transition}
      />
      <HamburgerLine
        style={{
          left: '50%',
          bottom: '35%',
          x: '-50%',
          y: '50%',
        }}
        variants={{
          open: {
            rotate: ['0deg', '0deg', '-45deg'],
            bottom: ['35%', '50%', '50%'],
          },
          closed: {
            rotate: ['45deg', '0deg', '0deg'],
            bottom: ['50%', '50%', '35%'],
          },
        }}
        transition={transition}
      />
    </FramerButton>
  );
};

const FramerButton = styled(motion.button)`
  position: relative;
  height: 3.75rem;
  width: 3.75rem;
  background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0)};
  transition: background-color ease-in-out 300ms;
  border: none;
  border-radius: 15%;
  padding: 0;
  z-index: 999;

  &:hover {
    background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.1)};
  }
`;

const HamburgerLine = styled(motion.span)`
  position: absolute;
  height: ${pxToRem(3)};
  width: 2rem;
  background-color: white;
`;
