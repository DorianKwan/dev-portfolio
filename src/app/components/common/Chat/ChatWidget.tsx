import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { getIsChatOpen } from '~/app/store/selectors/app-selectors';
import { setIsChatOpen } from '~/app/store/slices/app-slice';
import { theme } from '~/theme/theme';
import {
  BotBubble,
  CloseButton,
  Dot,
  Dots,
  FAB,
  InputRow,
  MarkdownContent,
  MessageMeta,
  MessagesList,
  Panel,
  PanelHeader,
  PanelTitle,
  SendButton,
  TextInput,
  UserBubble,
  WidgetRoot,
} from './chat.styles';
import { ChatSuggestions } from './ChatSuggestions';
import { useChatStream } from './useChatStream';
import { ChatIcon } from '../../icons/ChatIcon';

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const ChatWidget = () => {
  const isOpen = useAppSelector(getIsChatOpen);
  const dispatch = useAppDispatch();

  const {
    messages,
    input,
    setInput,
    isGenerating,
    renderedContent,
    showTypingIndicator,
    isStreamingLast,
    dotsRef,
    listRef,
    inputRef,
    handleSubmit,
    handleSuggestion,
    sendMessage,
  } = useChatStream();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, inputRef]);

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
    const el = inputRef.current;

    if (!el) return;

    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [input, inputRef]);

  useEffect(() => {
    const vv = window.visualViewport;

    if (!vv) return;

    const update = () =>
      document.documentElement.style.setProperty(
        '--visual-height',
        `${vv.height}px`,
      );

    vv.addEventListener('resize', update);
    update();

    return () => vv.removeEventListener('resize', update);
  }, []);

  const showSuggestions = messages.length === 1 && !isGenerating;

  return (
    <WidgetRoot $isOpen={isOpen}>
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

            <MessagesList ref={listRef}>
              {messages.map((msg, idx) => {
                const isLast = idx === messages.length - 1;
                const isThisStreaming = isStreamingLast && isLast;
                const content = isThisStreaming ? renderedContent : msg.content;
                const showCursor = isThisStreaming;

                if (msg.role === 'assistant') {
                  if (isThisStreaming && content === '') return null;
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <BotBubble key={idx}>
                      <MessageMeta>Bryce · {formatTime(msg.ts)}</MessageMeta>
                      <MarkdownContent>
                        <ReactMarkdown>
                          {content + (showCursor ? '▋' : '')}
                        </ReactMarkdown>
                      </MarkdownContent>
                    </BotBubble>
                  );
                }

                return (
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
                <BotBubble ref={dotsRef} key="typing">
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

              <ChatSuggestions
                visible={showSuggestions}
                onSelect={handleSuggestion}
              />
            </MessagesList>

            <InputRow onSubmit={e => void handleSubmit(e)} noValidate>
              <TextInput
                id="chat"
                ref={inputRef}
                value={input}
                rows={1}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask a question..."
                disabled={isGenerating}
                aria-label="Your question"
                enterKeyHint="send"
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
