import { useEffect, useRef, useState } from 'react';
import type { Message } from './chat.types';

const makeWelcome = (): Message => ({
  role: 'assistant',
  content: `Hi, I'm Bryce — well, a RAG-powered approximation of him. The real one is out there interviewing, but I can answer anything about his background, experience, and skills in the meantime. Ask away.`,
  ts: Date.now(),
});

export interface ChatStreamState {
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  isGenerating: boolean;
  isTypewriting: boolean;
  renderedContent: string;
  showTypingIndicator: boolean;
  isStreamingLast: boolean;
  dotsRef: React.RefObject<HTMLDivElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleSubmit: (e: React.FormEvent) => void;
  handleSuggestion: (text: string) => void;
}

export function useChatStream(): ChatStreamState {
  const [messages, setMessages] = useState<Message[]>(() => [makeWelcome()]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTypewriting, setIsTypewriting] = useState(false);
  const [renderedContent, setRenderedContent] = useState('');
  const streamTargetRef = useRef('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasGeneratingRef = useRef(false);
  const dotsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // When generating starts: reset and kick off typewriter
  useEffect(() => {
    if (!isGenerating) return;

    streamTargetRef.current = '';

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRenderedContent('');
    setIsTypewriting(true);

    wasGeneratingRef.current = true;
  }, [isGenerating]);

  // Run interval while typewriting; clean up when done
  useEffect(() => {
    if (!isTypewriting) return;

    intervalRef.current = setInterval(() => {
      setRenderedContent(prev => {
        const target = streamTargetRef.current;
        const isFinalLength = prev.length >= target.length;

        if (isFinalLength) return prev;

        return target.slice(0, prev.length + 2);
      });
    }, 20);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTypewriting]);

  // Stop typewriter once stream is done and content is fully rendered
  useEffect(() => {
    if (!isTypewriting || isGenerating) return;

    const isStreamDone =
      renderedContent.length >= streamTargetRef.current.length;
    const hasStreamContent = streamTargetRef.current.length > 0;

    if (isStreamDone && hasStreamContent) {
      setIsTypewriting(false);
    }
  }, [isTypewriting, isGenerating, renderedContent]);

  // Restore focus after typewriting finishes (input was disabled during generation)
  useEffect(() => {
    const isStreamedGenerationDone =
      wasGeneratingRef.current && !isGenerating && !isTypewriting;

    if (isStreamedGenerationDone) {
      wasGeneratingRef.current = false;
      inputRef.current?.focus();
    }
  }, [isGenerating, isTypewriting]);

  const showTypingIndicator = isGenerating && renderedContent === '';

  // Scroll to dots when they appear
  useEffect(() => {
    if (showTypingIndicator) {
      dotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showTypingIndicator]);

  // Follow streaming text as it types in
  useEffect(() => {
    if (isTypewriting && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [renderedContent, isTypewriting]);

  const isStreamingLast =
    isTypewriting && messages[messages.length - 1]?.role === 'assistant';

  async function submit(question: string) {
    if (!question.trim() || isGenerating) return;

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
    setRenderedContent('');

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

      streamTargetRef.current = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '', ts }]);

      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        streamTargetRef.current = accumulated;
      }

      setMessages(prev => {
        const next = [...prev];
        const last = next[next.length - 1];

        if (last?.role === 'assistant') {
          next[next.length - 1] = { ...last, content: accumulated };
        }

        return next;
      });
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Something went wrong.';

      setMessages(prev => {
        const last = prev[prev.length - 1];

        if (last?.role === 'assistant' && last.content === '') {
          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: text, ts: Date.now() },
          ];
        }

        return [...prev, { role: 'assistant', content: text, ts: Date.now() }];
      });
    } finally {
      setIsGenerating(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submit(input.trim());
  };

  const handleSuggestion = (text: string) => {
    void submit(text);
  };

  return {
    messages,
    input,
    setInput,
    isGenerating,
    isTypewriting,
    renderedContent,
    showTypingIndicator,
    isStreamingLast,
    dotsRef,
    listRef,
    inputRef,
    handleSubmit,
    handleSuggestion,
  };
}
