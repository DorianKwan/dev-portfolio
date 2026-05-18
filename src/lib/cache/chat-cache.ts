import { redis } from '~/lib/redis/client';

const RESPONSE_TTL = 60 * 60 * 24; // 24 hours
const EMBEDDING_TTL = 60 * 60 * 24; // 24 hours

function normalizeQuestion(question: string): string {
  return question.toLowerCase().trim().replace(/\s+/g, ' ');
}

function responseCacheKey(question: string): string {
  return 'chat:v1:' + normalizeQuestion(question);
}

function embeddingCacheKey(question: string): string {
  return 'embedding:v1:' + normalizeQuestion(question);
}

export async function getChatResponse(
  question: string,
): Promise<string | null> {
  return redis.get<string>(responseCacheKey(question));
}

export async function setChatResponse(
  question: string,
  response: string,
): Promise<void> {
  await redis.set(responseCacheKey(question), response, { ex: RESPONSE_TTL });
}

export async function getEmbedding(question: string): Promise<number[] | null> {
  return redis.get<number[]>(embeddingCacheKey(question));
}

export async function setEmbedding(
  question: string,
  embedding: number[],
): Promise<void> {
  await redis.set(embeddingCacheKey(question), embedding, {
    ex: EMBEDDING_TTL,
  });
}
