import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { VoyageAIClient } from 'voyageai';
import { supabase } from '~/lib/supabase/client';
import type { Database } from '~/lib/supabase/database.types';

type RetrievedChunk =
  Database['public']['Functions']['match_corpus_chunks']['Returns'][number];

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const voyage = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY! });

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000; // 20 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) return true;

  record.count++;
  return false;
}

const VOYAGE_EMBEDDING_MODEL = 'voyage-4';

async function embedQuestion(question: string): Promise<number[]> {
  const result = await voyage.embed({
    input: [question],
    model: VOYAGE_EMBEDDING_MODEL,
    inputType: 'query',
  });

  const embedding = result.data?.[0]?.embedding;

  if (!embedding) throw new Error('Voyage returned no embedding');

  return embedding;
}

async function retrieveChunks(embedding: number[]): Promise<RetrievedChunk[]> {
  const { data, error } = await supabase
    .rpc('match_corpus_chunks', {
      query_embedding: embedding,
      match_count: 5,
      match_threshold: 0.5,
    })
    .overrideTypes<RetrievedChunk[], { merge: false }>();

  if (error) throw new Error(`Retrieval failed: ${error.message}`);

  return data ?? [];
}

function buildSystemPrompt(chunks: RetrievedChunk[]): string {
  const context = chunks
    .map(
      c => `[${c.doc_type}${c.section ? ` / ${c.section}` : ''}]\n${c.content}`,
    )
    .join('\n\n---\n\n');

  const basePrompt = `
    You are a conversational assistant representing Bryce Sayers-Kwan, a Senior Full-Stack Engineer. Answer questions about Bryce's professional background, experience, skills, and availability based solely on the context provided below.

    Guidelines:
    - Respond in first person as Bryce ("I", "my", "me")
    - Be concise — 2 to 5 sentences for simple questions; use a short list only when genuinely listing multiple items
    - Use markdown formatting: **bold** for emphasis, bullet lists when listing things, but no headers (no #)
    - Add a blank line between distinct points or paragraphs to aid readability
    - Only reference information present in the context — do not infer or invent details
    - If the context doesn't contain enough information to answer, respond only with: Sorry, I don't have information on "[topic]". Nothing else — no offers to help, no redirects, no follow-up questions
    - For questions unrelated to professional background, respond only with: Sorry, I only answer questions about my professional background
    - Keep responses conversational, not like a formal resume

    Context:
  `;

  return `${basePrompt.trim()}\n${context}`;
}

const ANTHROPIC_CHAT_MODEL = 'claude-haiku-4-5-20251001';

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

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const { question, history = [] } = req.body as {
    question?: string;
    history?: { role: 'user' | 'assistant'; content: string }[];
  };

  if (!question?.trim()) {
    return res.status(400).json({ error: 'question is required' });
  }

  try {
    const embedding = await embedQuestion(question);
    const chunks = await retrieveChunks(embedding);

    const result = streamText({
      model: anthropic(ANTHROPIC_CHAT_MODEL),
      system: buildSystemPrompt(chunks),
      messages: [...history, { role: 'user', content: question }],
      maxRetries: 1,
    });

    result.pipeTextStreamToResponse(res);
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
