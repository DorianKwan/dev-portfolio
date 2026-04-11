import { Component, createRef, type ErrorInfo, type ReactNode } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Blink } from '~/app/components/special/Blink';
import { BebasNeue, Cascadia } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA, pxToRem } from '~/theme/utils';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  isRefreshing: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, isRefreshing: false };
  private dialogRef = createRef<HTMLDialogElement>();

  static getDerivedStateFromError(): State {
    return { hasError: true, isRefreshing: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (!prevState.hasError && this.state.hasError) {
      this.dialogRef.current?.showModal();
      document.addEventListener('keyup', this.handleKeyUp);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  private handleRefresh = () => {
    this.setState({ isRefreshing: true });
    window.location.reload();
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') this.handleRefresh();
  };

  render() {
    const { hasError, isRefreshing } = this.state;

    if (hasError) {
      return (
        <StyledDialog
          ref={this.dialogRef}
          onCancel={(e: React.SyntheticEvent<HTMLDialogElement>) =>
            e.preventDefault()
          }>
          <Card>
            <div>
              <GlitchHeading data-text="FATAL ERROR">FATAL ERROR</GlitchHeading>
              <GlitchDescription>
                Hit enter or click the button to refresh the page.
              </GlitchDescription>
            </div>
            <TerminalBlock>
              <TerminalLine error>unhandled exception in render</TerminalLine>
              <TerminalLine>process exited with code 1</TerminalLine>
              <TerminalDivider />
              {isRefreshing ? (
                <TerminalLine>
                  restarting...
                  <Spinner />
                </TerminalLine>
              ) : (
                <TerminalForm
                  onSubmit={(e: React.SubmitEvent) => {
                    e.preventDefault();
                    this.handleRefresh();
                  }}>
                  <TerminalPromptSymbol>{'>'}</TerminalPromptSymbol>
                  <TerminalInputArea>
                    <TerminalInput
                      defaultValue="run --refresh"
                      size={13}
                      readOnly
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <BlinkWrapper>
                      <Blink>_</Blink>
                    </BlinkWrapper>
                  </TerminalInputArea>
                  <TerminalRunButton type="submit">↵</TerminalRunButton>
                </TerminalForm>
              )}
            </TerminalBlock>
          </Card>
        </StyledDialog>
      );
    }

    return this.props.children;
  }
}

// Quiet for most of the cycle — brief burst around 60–70% and again near 88–94%
const glitch1 = keyframes`
  0%, 58%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0) skewX(0deg); }
  60%            { clip-path: inset(8% 0 78% 0);  transform: translateX(-3px) skewX(-1.5deg); }
  61.5%          { clip-path: inset(52% 0 32% 0); transform: translateX(3px)  skewX(1deg);    }
  63%            { clip-path: inset(24% 0 62% 0); transform: translateX(-2px) skewX(-0.5deg); }
  64.5%          { clip-path: inset(70% 0 14% 0); transform: translateX(2px)  skewX(1.5deg);  }
  66%, 86%       { clip-path: inset(0 0 100% 0); transform: translateX(0) skewX(0deg); }
  88%            { clip-path: inset(38% 0 48% 0); transform: translateX(-3px) skewX(1deg);    }
  89.5%          { clip-path: inset(12% 0 76% 0); transform: translateX(3px)  skewX(-1.5deg); }
  91%            { clip-path: inset(62% 0 22% 0); transform: translateX(-2px) skewX(0.5deg);  }
  92.5%          { clip-path: inset(0 0 100% 0); transform: translateX(0) skewX(0deg); }
`;

// Offset slightly so the two layers don't fire in sync
const glitch2 = keyframes`
  0%, 55%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0) skewX(0deg); }
  57%            { clip-path: inset(45% 0 42% 0); transform: translateX(3px)  skewX(1.5deg);  }
  58.5%          { clip-path: inset(18% 0 68% 0); transform: translateX(-3px) skewX(-1deg);   }
  60%            { clip-path: inset(72% 0 16% 0); transform: translateX(2px)  skewX(0.5deg);  }
  61.5%          { clip-path: inset(30% 0 56% 0); transform: translateX(-2px) skewX(-1.5deg); }
  63%, 83%       { clip-path: inset(0 0 100% 0); transform: translateX(0) skewX(0deg); }
  85%            { clip-path: inset(56% 0 28% 0); transform: translateX(-3px) skewX(-0.5deg); }
  86.5%          { clip-path: inset(6% 0 82% 0);  transform: translateX(3px)  skewX(1deg);    }
  88%            { clip-path: inset(42% 0 44% 0); transform: translateX(-2px) skewX(-1.5deg); }
  89.5%          { clip-path: inset(0 0 100% 0); transform: translateX(0) skewX(0deg); }
`;

const StyledDialog = styled.dialog`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  max-width: 100dvw;
  max-height: 100dvh;
  width: 100dvw;
  height: 100dvh;

  &::backdrop {
    background: ${hexToRGBA(theme.colors.background, 0.85)};
    backdrop-filter: blur(4px);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  background: ${theme.colors.background};
  border: ${pxToRem(1)} solid ${hexToRGBA(theme.colors.white, 0.1)};
  box-shadow:
    0 0 60px ${hexToRGBA(theme.colors.lightPurple, 0.08)},
    0 20px 60px ${hexToRGBA(theme.colors.black, 0.8)};
  padding: 3rem 4rem 3.5rem 4rem;
  width: 100%;
  max-width: 40rem;
`;

const GlitchHeading = styled.h2`
  position: relative;
  font-family: ${BebasNeue.style.fontFamily};
  font-size: clamp(3.5rem, 8vw, 6rem);
  color: ${theme.colors.white};
  letter-spacing: 0.1rem;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.background};
    overflow: hidden;
  }

  &::before {
    left: 3px;
    text-shadow: -2px 0 ${theme.colors.lightPurple};
    animation: ${glitch1} 4s steps(1) infinite;
  }

  &::after {
    left: -3px;
    text-shadow: 2px 0 ${theme.colors.lightBlue};
    animation: ${glitch2} 4s steps(1) infinite;
    animation-delay: 300ms;
  }
`;

const GlitchDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.copyText};
`;

const TerminalBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: ${hexToRGBA(theme.colors.white, 0.02)};
  border: ${pxToRem(1)} solid ${hexToRGBA(theme.colors.white, 0.08)};
  padding: 1rem 2rem 0.75rem 2rem;
  text-align: left;
  width: 100%;
  max-width: 30rem;
`;

const TerminalLine = styled.p<{ error?: boolean }>`
  font-family: ${Cascadia.style.fontFamily};
  font-size: 0.9rem;
  color: ${({ error, theme }) =>
    error ? theme.colors.errorText : hexToRGBA(theme.colors.white, 0.6)};
  line-height: 1.8;

  &::before {
    content: '> ';
    color: ${theme.colors.lightPurple};
  }
`;

const TerminalDivider = styled.hr`
  border: none;
  border-top: ${pxToRem(1)} solid ${hexToRGBA(theme.colors.white, 0.06)};
  margin: 0.5rem 0;
`;

const TerminalForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TerminalPromptSymbol = styled.span`
  color: ${theme.colors.lightPurple};
  font-family: ${Cascadia.style.fontFamily};
  font-size: 0.9rem;
  user-select: none;
  flex-shrink: 0;
`;

const TerminalInputArea = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const TerminalInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${hexToRGBA(theme.colors.white, 0.8)};
  font-family: ${Cascadia.style.fontFamily};
  font-size: 0.9rem;
  width: fit-content;
  cursor: default;
`;

const BlinkWrapper = styled.span`
  font-size: 1.2rem;
  line-height: 1;
  position: relative;
  left: -1.75rem;
`;

const spin = keyframes`
  0%   { content: '|'; }
  25%  { content: '/'; }
  50%  { content: '-'; }
  75%  { content: '\\\\'; }
`;

const Spinner = styled.span`
  &::after {
    content: '|';
    animation: ${spin} 0.5s steps(4) infinite;
    color: ${theme.colors.lightPurple};
    margin-left: 0.4rem;
  }
`;

const pulse = keyframes`
  0%, 100% { color: ${theme.colors.lightPurple}; border-color: ${theme.colors.lightPurple}; }
  50%       { color: ${hexToRGBA(theme.colors.lightPurple, 0.35)}; border-color: ${hexToRGBA(theme.colors.lightPurple, 0.35)}; }
`;

const TerminalRunButton = styled.button`
  flex-shrink: 0;
  background: transparent;
  border: ${pxToRem(1)} solid ${hexToRGBA(theme.colors.lightPurple, 0.4)};
  color: ${hexToRGBA(theme.colors.lightPurple, 0.4)};
  font-family: ${Cascadia.style.fontFamily};
  font-size: 1.25rem;
  padding: 0 1.5rem;
  cursor: pointer;
  animation: ${pulse} 1.2s ease-in-out infinite;

  &:hover,
  &:focus {
    animation: none;
    color: ${theme.colors.lightPurple};
    border-color: ${theme.colors.lightPurple};
  }
`;
