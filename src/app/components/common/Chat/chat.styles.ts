import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA } from '~/theme/utils';

export const WidgetRoot = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  pointer-events: none;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      bottom: 0;
      background: ${theme.colors.background};
    `}

  @media (min-width: ${theme.breakpoints.sm}) {
    top: auto;
    bottom: 1.5rem;
    right: 1.5rem;
    left: auto;
    align-items: flex-end;
    gap: 0.75rem;
    background: none;
  }
`;

export const Panel = styled(motion.div)`
  width: 100%;
  height: var(--visual-height, 100dvh);
  transition: height 120ms ease-out;
  background: ${theme.colors.background};
  border-top: 1px solid ${hexToRGBA(theme.colors.white, 0.1)};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;

  @media (min-width: ${theme.breakpoints.sm}) {
    height: auto;
    transition: none;
    width: 40rem;
    max-width: calc(100vw - 3rem);
    border: 1px solid ${hexToRGBA(theme.colors.white, 0.1)};
    max-height: calc(100dvh - 8rem);
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
  flex-shrink: 0;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 1rem 1.25rem;
  }
`;

export const PanelTitle = styled.h2`
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.35rem;
  color: ${theme.colors.white};
  letter-spacing: 0.05em;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.15)};
  color: ${hexToRGBA(theme.colors.white, 0.6)};
  font-size: 1.25rem;
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

export const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: ${hexToRGBA(theme.colors.white, 0.1)} transparent;

  @media (min-width: ${theme.breakpoints.xxs}) {
    padding: 1.25rem;
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    min-height: 20rem;
    padding: 1.5rem 1rem 1rem 1.5rem;
  }
`;

const bubbleBase = css`
  max-width: 85%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.6;
  word-break: break-word;
  border-radius: 0.75rem;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0.625rem 0.875rem;
    font-size: 1.125rem;
    line-height: 1.75;
  }
`;

export const MessageMeta = styled.div<{ $isUser?: boolean }>`
  font-size: 0.75rem;
  color: ${({ $isUser }) =>
    hexToRGBA(theme.colors.white, $isUser ? 0.45 : 0.35)};
  margin-bottom: 0.3rem;
`;

export const MarkdownContent = styled.div`
  color: ${theme.colors.text};
  font-size: 0.875rem;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  p {
    margin: 0 0 0.6rem;
    font-size: 0.875rem;
    line-height: 1.6;

    @media (min-width: ${theme.breakpoints.sm}) {
      font-size: 1.125rem;
      line-height: 1.75;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: 600;
    color: ${theme.colors.white};
  }

  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 0.25rem 0 0.6rem;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  code {
    font-family: monospace;
    background: ${hexToRGBA(theme.colors.white, 0.1)};
    padding: 0.1em 0.35em;
    font-size: 0.82em;
  }
`;

export const BotBubble = styled.div`
  ${bubbleBase}
  align-self: flex-start;
  background: ${hexToRGBA(theme.colors.white, 0.05)};
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
`;

export const UserBubble = styled.div`
  ${bubbleBase}
  align-self: flex-end;
  background: ${theme.colors.bluePurple};
  border: 1px solid ${hexToRGBA(theme.colors.lightPurple, 0.3)};
  color: ${theme.colors.text};
  line-height: 1.75;
`;

export const Dots = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  height: 1.1rem;
`;

export const Dot = styled(motion.span)`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: ${hexToRGBA(theme.colors.white, 0.5)};
`;

export const InputRow = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
  flex-shrink: 0;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0.75rem 1rem;
  }
`;

export const TextInput = styled.input`
  flex: 1;
  background: ${hexToRGBA(theme.colors.white, 0.04)};
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.15)};
  color: ${hexToRGBA(theme.colors.white, 0.85)};
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 200ms ease-in-out;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0.75rem 1rem;
  }

  &::placeholder {
    color: ${hexToRGBA(theme.colors.white, 0.3)};
  }

  &:focus {
    border-color: ${theme.colors.lightPurple};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  width: 2.75rem;
  align-self: stretch;
  flex-shrink: 0;
  background: ${theme.colors.bluePurple};
  border: 1px solid ${hexToRGBA(theme.colors.lightPurple, 0.3)};
  color: ${theme.colors.white};
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 200ms ease-in-out;

  &:hover:not(:disabled) {
    filter: brightness(130%);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    width: 4rem;
  }
`;

export const FAB = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'flex')};
  pointer-events: auto;
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 50%;
  background: ${theme.colors.bluePurple};
  border: 1px solid ${hexToRGBA(theme.colors.lightPurple, 0.4)};
  color: ${theme.colors.white};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow:
    0 8px 32px ${hexToRGBA(theme.colors.lightPurple, 0.45)},
    0 2px 8px ${hexToRGBA(theme.colors.lightPurple, 0.2)};
  transition:
    filter 200ms ease-in-out,
    transform 200ms ease-in-out,
    box-shadow 200ms ease-in-out;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    filter: brightness(130%);
    transform: scale(1.06);
    box-shadow:
      0 12px 40px ${hexToRGBA(theme.colors.lightPurple, 0.6)},
      0 4px 12px ${hexToRGBA(theme.colors.lightPurple, 0.3)};
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    position: static;
    display: flex;
    bottom: auto;
    right: auto;
  }
`;
