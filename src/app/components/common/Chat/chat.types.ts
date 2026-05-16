export type Message = {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
};
