import { Redis } from '@upstash/redis';

// NOTE: if switching to a TCP provider; add a singleton pattern
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
