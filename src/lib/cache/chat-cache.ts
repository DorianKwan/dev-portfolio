import { redis } from '~/lib/redis/client';

const TTL = 60 * 60 * 24; // 24 hours

function cacheKey(question: string): string {
  return 'chat:v1:' + question.toLowerCase().trim().replace(/\s+/g, ' ');
}

export async function getChatResponse(
  question: string,
): Promise<string | null> {
  return redis.get<string>(cacheKey(question));
}

export async function setChatResponse(
  question: string,
  response: string,
): Promise<void> {
  await redis.set(cacheKey(question), response, { ex: TTL });
}
