import { Ratelimit } from '@upstash/ratelimit';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatResponse, setChatResponse } from '~/lib/cache/chat-cache';
import { streamChatResponse } from '~/services/chat-service';
import handler from './chat';

jest.mock('@upstash/ratelimit', () => {
  const MockRatelimit = jest
    .fn()
    .mockImplementation(() => ({ limit: jest.fn() })) as jest.Mock & {
    slidingWindow: jest.Mock;
  };

  MockRatelimit.slidingWindow = jest.fn().mockReturnValue({});
  return { Ratelimit: MockRatelimit };
});

jest.mock('~/lib/redis/client', () => ({ redis: {} }));

jest.mock('~/lib/cache/chat-cache', () => ({
  getChatResponse: jest.fn(),
  setChatResponse: jest.fn(),
}));

jest.mock('~/services/chat-service', () => ({
  streamChatResponse: jest.fn(),
}));

jest.mock('~/lib/utils/sanitize-history', () => ({
  sanitizeHistory: jest.fn((raw: unknown[]) =>
    Array.isArray(raw)
      ? raw.filter(
          (item): item is { role: 'user' | 'assistant'; content: string } =>
            typeof item === 'object' &&
            item !== null &&
            'role' in item &&
            'content' in item,
        )
      : [],
  ),
}));

type RatelimitInstance = { limit: jest.Mock };

const ratelimitInstance = (
  Ratelimit as unknown as jest.MockedClass<new () => RatelimitInstance>
).mock.results[0]?.value as RatelimitInstance;

const getChatResponseMock = getChatResponse as jest.Mock;
const setChatResponseMock = setChatResponse as jest.Mock;
const streamChatResponseMock = streamChatResponse as jest.Mock;

function makeStreamResult(chunks: string[] = ['Hello world']) {
  const read = jest.fn();
  for (const chunk of chunks) {
    read.mockResolvedValueOnce({ done: false, value: chunk });
  }
  read.mockResolvedValue({ done: true, value: undefined });
  return {
    textStream: { getReader: jest.fn().mockReturnValue({ read }) },
    pipeTextStreamToResponse: jest.fn(),
  };
}

const mockReq = (overrides: Partial<NextApiRequest> = {}): NextApiRequest =>
  ({
    method: 'POST',
    headers: { 'x-forwarded-for': '127.0.0.1' },
    socket: { remoteAddress: '127.0.0.1' },
    body: { question: 'What is your experience?', history: [] },
    ...overrides,
  }) as NextApiRequest;

const mockRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    write: jest.fn(),
    end: jest.fn(),
    setHeader: jest.fn(),
    headersSent: false,
  };
  return res as unknown as NextApiResponse & typeof res;
};

describe('/api/chat', () => {
  beforeEach(() => {
    ratelimitInstance.limit.mockResolvedValue({ success: true });
    getChatResponseMock.mockResolvedValue(null);
    setChatResponseMock.mockResolvedValue(undefined);
    streamChatResponseMock.mockResolvedValue(makeStreamResult());
  });

  describe('method guard', () => {
    it('returns 405 for non-POST requests', async () => {
      const res = mockRes();
      await handler(mockReq({ method: 'GET' }), res);
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });

  describe('rate limiting', () => {
    it('returns 429 when the rate limit is exceeded', async () => {
      ratelimitInstance.limit.mockResolvedValueOnce({ success: false });
      const res = mockRes();
      await handler(mockReq(), res);
      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.json).toHaveBeenCalledWith({ error: 'Too many requests' });
    });
  });

  describe('input validation', () => {
    it('returns 400 when question is missing', async () => {
      const res = mockRes();
      await handler(mockReq({ body: { history: [] } }), res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'question is required' });
    });

    it('returns 400 when question is whitespace only', async () => {
      const res = mockRes();
      await handler(mockReq({ body: { question: '   ', history: [] } }), res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 400 when question exceeds 2000 characters', async () => {
      const res = mockRes();
      await handler(
        mockReq({ body: { question: 'a'.repeat(2001), history: [] } }),
        res,
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'question is too long' });
    });
  });

  describe('cache hit', () => {
    it('returns the cached response without calling the service', async () => {
      getChatResponseMock.mockResolvedValue('cached answer');
      const res = mockRes();
      await handler(mockReq(), res);
      expect(res.end).toHaveBeenCalledWith('cached answer');
      expect(streamChatResponseMock).not.toHaveBeenCalled();
    });

    it('does not check the cache when history is present', async () => {
      const res = mockRes();
      await handler(
        mockReq({
          body: {
            question: 'Follow up?',
            history: [
              { role: 'user', content: 'Hello' },
              { role: 'assistant', content: 'Hi' },
            ],
          },
        }),
        res,
      );
      expect(getChatResponseMock).not.toHaveBeenCalled();
    });
  });

  describe('streaming', () => {
    it('streams chunks to the client and caches the result for first messages', async () => {
      const mockResult = makeStreamResult(['chunk1', ' chunk2']);
      streamChatResponseMock.mockResolvedValue(mockResult);

      const res = mockRes();
      await handler(mockReq(), res);

      expect(res.write).toHaveBeenCalledWith('chunk1');
      expect(res.write).toHaveBeenCalledWith(' chunk2');
      expect(setChatResponseMock).toHaveBeenCalledWith(
        'What is your experience?',
        'chunk1 chunk2',
      );
      expect(res.end).toHaveBeenCalled();
    });

    it('pipes the stream directly and skips caching for follow-up messages', async () => {
      const mockResult = makeStreamResult();
      streamChatResponseMock.mockResolvedValue(mockResult);

      const res = mockRes();
      await handler(
        mockReq({
          body: {
            question: 'Follow up?',
            history: [
              { role: 'user', content: 'Hello' },
              { role: 'assistant', content: 'Hi' },
            ],
          },
        }),
        res,
      );

      expect(mockResult.pipeTextStreamToResponse).toHaveBeenCalledWith(res);
      expect(setChatResponseMock).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('returns 500 for unexpected errors', async () => {
      streamChatResponseMock.mockRejectedValue(new Error('unexpected'));
      const res = mockRes();
      await handler(mockReq(), res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Something went wrong. Please try again.',
      });
    });

    it('returns 503 for Anthropic overloaded errors', async () => {
      streamChatResponseMock.mockRejectedValue(
        new Error('Anthropic API Overloaded'),
      );
      const res = mockRes();
      await handler(mockReq(), res);
      expect(res.status).toHaveBeenCalledWith(503);
      expect(res.json).toHaveBeenCalledWith({
        error: 'The AI is a bit overloaded right now — try again in a moment.',
      });
    });

    it('does not attempt to write an error response if headers are already sent', async () => {
      streamChatResponseMock.mockRejectedValue(new Error('late error'));
      const res = mockRes();
      res.headersSent = true;
      await handler(mockReq(), res);
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
