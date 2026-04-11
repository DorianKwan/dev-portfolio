import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA, pxToRem } from '~/theme/utils';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fallback>
          <FallbackHeading>Something went wrong</FallbackHeading>
          <FallbackText>
            An unexpected error occurred. Try refreshing the page.
          </FallbackText>
          <RefreshButton onClick={() => window.location.reload()}>
            Refresh Page
          </RefreshButton>
        </Fallback>
      );
    }

    return this.props.children;
  }
}

const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  height: 100%;
  text-align: center;
  padding: 2rem;
`;

const FallbackHeading = styled.h2`
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 3rem;
  color: ${theme.colors.white};
  letter-spacing: 0.1rem;
`;

const FallbackText = styled.p`
  color: ${hexToRGBA(theme.colors.white, 0.5)};
  font-size: 1.125rem;
`;

const RefreshButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2.5rem;
  background: ${theme.colors.bluePurple};
  color: ${theme.colors.white};
  border: ${pxToRem(1)} solid ${theme.colors.bluePurple};
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.325rem;
  cursor: pointer;
  transition: filter 200ms ease-in-out;
  margin-top: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    height: 0.25rem;
    width: 0;
    bottom: -0.125rem;
    left: 0;
    background-color: ${theme.colors.lightPurple};
    transition: width 250ms ease-in-out;
  }

  &:hover,
  &:focus {
    filter: brightness(125%);

    &::after {
      width: 100%;
    }
  }
`;
