import type { ChatMessage } from '~/services/chat-service';

const VALID_ROLES = new Set(['user', 'assistant']);
const MAX_HISTORY_ITEMS = 10;
const MAX_HISTORY_ITEM_LENGTH = 1000;

export function sanitizeHistory(raw: unknown[]): ChatMessage[] {
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
