import { redis } from '~/lib/redis/client';
import { getChatResponse, setChatResponse } from './chat-cache';

jest.mock('~/lib/redis/client', () => ({
  redis: { get: jest.fn(), set: jest.fn() },
}));

const mockGet = redis.get as jest.Mock;
const mockSet = redis.set as jest.Mock;

describe('chat-cache', () => {
  beforeEach(() => {
    mockGet.mockResolvedValue(null);
    mockSet.mockResolvedValue('OK');
  });

  describe('getChatResponse', () => {
    it('returns the cached string when Redis has a value', async () => {
      mockGet.mockResolvedValue('cached answer');

      const result = await getChatResponse('What is your experience?');

      expect(result).toBe('cached answer');
    });

    it('returns null on a cache miss', async () => {
      const result = await getChatResponse('unknown question');

      expect(result).toBeNull();
    });

    it('uses a chat:v1: prefixed key', async () => {
      await getChatResponse('What is your experience?');

      expect(mockGet).toHaveBeenCalledWith(expect.stringMatching(/^chat:v1:/));
    });
  });

  describe('setChatResponse', () => {
    it('writes the response to Redis with a 24-hour TTL', async () => {
      await setChatResponse('What is your experience?', 'I have 5 years');

      expect(mockSet).toHaveBeenCalledWith(
        expect.any(String),
        'I have 5 years',
        { ex: 86400 },
      );
    });
  });

  describe('cache key normalization', () => {
    it('converts the question to lowercase', async () => {
      await getChatResponse('WHAT IS YOUR EXPERIENCE?');

      expect(mockGet).toHaveBeenCalledWith('chat:v1:what is your experience?');
    });

    it('trims leading and trailing whitespace', async () => {
      await getChatResponse('  what is your experience?  ');

      expect(mockGet).toHaveBeenCalledWith('chat:v1:what is your experience?');
    });

    it('collapses multiple spaces into one', async () => {
      await getChatResponse('what  is   your experience?');

      expect(mockGet).toHaveBeenCalledWith('chat:v1:what is your experience?');
    });

    it('produces the same key for differently-cased and spaced variants', async () => {
      await getChatResponse('What Is Your Experience?');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const keyA = mockGet.mock.calls[0][0] as string;

      await getChatResponse('  what  is  your  experience?  ');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const keyB = mockGet.mock.calls[1][0] as string;

      expect(keyA).toBe(keyB);
    });
  });
});
