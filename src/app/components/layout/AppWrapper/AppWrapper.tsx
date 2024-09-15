import styled from '@emotion/styled';
import { getIsMobileNavOpen, useAppSelector } from '~/app/store';

interface AppWrapperProps {
  readonly children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const isMobileNavOpen = useAppSelector(getIsMobileNavOpen);

  return <Wrapper disableScroll={isMobileNavOpen}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ disableScroll?: boolean }>`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  height: ${({ disableScroll }) => (disableScroll ? '100vh' : 'initial')};
  overflow-y: ${({ disableScroll }) => (disableScroll ? 'hidden' : 'initial')};
`;
