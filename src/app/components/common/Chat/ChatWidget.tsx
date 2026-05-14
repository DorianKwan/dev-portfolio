import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { BebasNeue } from '~/app/fonts';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { getIsChatOpen } from '~/app/store/selectors/app-selectors';
import { setIsChatOpen } from '~/app/store/slices/app-slice';
import { theme } from '~/theme/theme';
import { hexToRGBA } from '~/theme/utils';
import { ChatIcon } from '../../icons/ChatIcon';

type Message = { role: 'user' | 'assistant'; content: string; ts: number };

const makeWelcome = (): Message => ({
  role: 'assistant',
  content: `Hi, I'm Bryce — well, a RAG-powered approximation of him. The real one is out there interviewing, but I can answer anything about his background, experience, and skills in the meantime. Ask away.`,
  ts: Date.now(),
});

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const ChatWidget: React.FC = () => {
  const isOpen = useAppSelector(getIsChatOpen);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<Message[]>(() => [makeWelcome()]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const isMobile = window.matchMedia(
      `(max-width: ${theme.breakpoints.sm})`,
    ).matches;
    if (isOpen && isMobile) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) dispatch(setIsChatOpen(false));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = input.trim();

    if (!question || isGenerating) return;

    // Capture history before appending new message; skip welcome at index 0, cap at 10
    const history = messages
      .slice(1)
      .slice(-10)
      .map(({ role, content }) => ({ role, content }));

    setInput('');
    setMessages(prev => [
      ...prev,
      { role: 'user', content: question, ts: Date.now() },
    ]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });

      if (response.status === 429) {
        throw new Error(
          "You've reached the message limit — try again in a minute.",
        );
      }

      if (!response.ok) {
        const json = (await response.json()) as { error?: string };
        throw new Error(json.error ?? 'Something went wrong.');
      }

      if (!response.body) throw new Error('No response body.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const ts = Date.now();

      setMessages(prev => [...prev, { role: 'assistant', content: '', ts }]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Something went wrong.';
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: text, ts: Date.now() },
      ]);
    } finally {
      setIsGenerating(false);
      inputRef.current?.focus();
    }
  };

  const showTypingIndicator =
    isGenerating && messages[messages.length - 1]?.role === 'user';

  const isStreamingLast =
    isGenerating && messages[messages.length - 1]?.role === 'assistant';

  return (
    <WidgetRoot>
      <AnimatePresence>
        {isOpen && (
          <Panel
            key="chat-panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}>
            <PanelHeader>
              <PanelTitle>Ask Bryce</PanelTitle>
              <CloseButton
                onClick={() => dispatch(setIsChatOpen(false))}
                aria-label="Close chat">
                ✕
              </CloseButton>
            </PanelHeader>
            <MessagesList>
              {messages.map((msg, idx) => {
                const isLast = idx === messages.length - 1;
                const showCursor = isLast && isStreamingLast;

                return msg.role === 'assistant' ? (
                  // eslint-disable-next-line react/no-array-index-key
                  <BotBubble key={idx}>
                    <MessageMeta>Bryce · {formatTime(msg.ts)}</MessageMeta>
                    <MarkdownContent>
                      <ReactMarkdown>
                        {msg.content + (showCursor ? '▋' : '')}
                      </ReactMarkdown>
                    </MarkdownContent>
                  </BotBubble>
                ) : (
                  // eslint-disable-next-line react/no-array-index-key
                  <UserBubble key={idx}>
                    <MessageMeta $isUser>
                      You · {formatTime(msg.ts)}
                    </MessageMeta>
                    {msg.content}
                  </UserBubble>
                );
              })}
              {showTypingIndicator && (
                <BotBubble key="typing">
                  <Dots>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <Dot
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </Dots>
                </BotBubble>
              )}
              <div ref={bottomRef} />
            </MessagesList>
            <InputRow onSubmit={e => void handleSubmit(e)} noValidate>
              <TextInput
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isGenerating}
                aria-label="Your question"
              />
              <SendButton
                type="submit"
                disabled={isGenerating || !input.trim()}
                aria-label="Send message">
                →
              </SendButton>
            </InputRow>
          </Panel>
        )}
      </AnimatePresence>
      <FAB
        $isOpen={isOpen}
        onClick={() => dispatch(setIsChatOpen(!isOpen))}
        aria-label={isOpen ? 'Close chat' : 'Chat with Bryce'}>
        {isOpen ? '✕' : <ChatIcon />}
      </FAB>
    </WidgetRoot>
  );
};

const WidgetRoot = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  pointer-events: none;

  @media (min-width: ${theme.breakpoints.sm}) {
    bottom: 1.5rem;
    right: 1.5rem;
    left: auto;
    align-items: flex-end;
    gap: 0.75rem;
  }
`;

const Panel = styled(motion.div)`
  width: 100%;
  height: 100dvh;
  background: ${theme.colors.background};
  border-top: 1px solid ${hexToRGBA(theme.colors.white, 0.1)};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;

  @media (min-width: ${theme.breakpoints.sm}) {
    width: 40rem;
    max-width: calc(100vw - 3rem);
    border: 1px solid ${hexToRGBA(theme.colors.white, 0.1)};
    max-height: calc(100dvh - 8rem);
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
  flex-shrink: 0;
`;

const PanelTitle = styled.h2`
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.75rem;
  color: ${theme.colors.white};
  letter-spacing: 0.05em;
`;

const CloseButton = styled.button`
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

const MessagesList = styled.div`
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
  padding: 0.625rem 0.875rem;
  font-size: 1.125rem;
  line-height: 1.75;
  word-break: break-word;
  border-radius: 0.75rem;
`;

const MessageMeta = styled.div<{ $isUser?: boolean }>`
  font-size: 0.75rem;
  color: ${({ $isUser }) =>
    hexToRGBA(theme.colors.white, $isUser ? 0.45 : 0.35)};
  margin-bottom: 0.3rem;
`;

const MarkdownContent = styled.div`
  color: ${theme.colors.text};
  font-size: 1rem;

  p {
    margin: 0 0 0.6rem;

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

const BotBubble = styled.div`
  ${bubbleBase}
  align-self: flex-start;
  background: ${hexToRGBA(theme.colors.white, 0.05)};
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
`;

const UserBubble = styled.div`
  ${bubbleBase}
  align-self: flex-end;
  background: ${theme.colors.bluePurple};
  border: 1px solid ${hexToRGBA(theme.colors.lightPurple, 0.3)};
  color: ${theme.colors.text};
  line-height: 1.75;
`;

const Dots = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  height: 1.1rem;
`;

const Dot = styled(motion.span)`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: ${hexToRGBA(theme.colors.white, 0.5)};
`;

const InputRow = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${hexToRGBA(theme.colors.white, 0.08)};
  flex-shrink: 0;
`;

const TextInput = styled.input`
  flex: 1;
  background: ${hexToRGBA(theme.colors.white, 0.04)};
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.15)};
  color: ${hexToRGBA(theme.colors.white, 0.85)};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 200ms ease-in-out;

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

const SendButton = styled.button`
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

const FAB = styled.button<{ $isOpen: boolean }>`
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
