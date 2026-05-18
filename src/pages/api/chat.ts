import { Ratelimit } from '@upstash/ratelimit';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatResponse, setChatResponse } from '~/lib/cache/chat-cache';
import { redis } from '~/lib/redis/client';
import { type ChatMessage, streamChatResponse } from '~/services/chat-service';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
});

const MAX_QUESTION_LENGTH = 2000;
const MAX_HISTORY_ITEMS = 10;
const MAX_HISTORY_ITEM_LENGTH = 1000;
const VALID_ROLES = new Set(['user', 'assistant']);

function sanitizeHistory(raw: unknown[]): ChatMessage[] {
  return (Array.isArray(raw) ? raw : [])
    .filter(
      (item): item is { role: 'user' | 'assistant'; content: string } =>
        typeof item === 'object' &&
        item !== null &&
        'role' in item &&
        'content' in item &&
        VALID_ROLES.has((item as { role: unknown }).role as string) &&
        typeof (item as { content: unknown }).content === 'string',
    )
    .slice(-MAX_HISTORY_ITEMS)
    .map(item => ({
      role: item.role,
      content: item.content.slice(0, MAX_HISTORY_ITEM_LENGTH),
    }));
}

async function streamAndCache(
  result: Awaited<ReturnType<typeof streamChatResponse>>,
  question: string,
  res: NextApiResponse,
) {
  let accumulated = '';
  const reader = result.textStream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      accumulated += value;
      res.write(value);
    }

    if (accumulated) {
      await setChatResponse(question, accumulated);
    }
  } finally {
    res.end();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ??
    req.socket.remoteAddress ??
    'unknown';

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const { question, history = [] } = req.body as {
    question?: string;
    history?: unknown[];
  };

  if (!question?.trim()) {
    return res.status(400).json({ error: 'question is required' });
  }

  if (typeof question !== 'string' || question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: 'question is too long' });
  }

  const sanitizedHistory = sanitizeHistory(history);

  try {
    const isFirstMessage = sanitizedHistory.length === 0;

    // only cache initial message
    if (isFirstMessage) {
      const cached = await getChatResponse(question);
      if (cached) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(cached);
        return;
      }
    }

    const result = await streamChatResponse(question, sanitizedHistory);

    if (isFirstMessage) {
      await streamAndCache(result, question, res);
    } else {
      result.pipeTextStreamToResponse(res);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    const isOverloaded =
      msg.includes('Overloaded') ||
      msg.includes('529') ||
      msg.includes('overloaded');
    const userMessage = isOverloaded
      ? 'The AI is a bit overloaded right now — try again in a moment.'
      : 'Something went wrong. Please try again.';

    if (!res.headersSent) {
      res.status(isOverloaded ? 503 : 500).json({ error: userMessage });
    }
  }
}

export const config = {
  api: { responseLimit: false },
};
