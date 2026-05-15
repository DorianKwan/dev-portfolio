import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import { VoyageAIClient } from 'voyageai';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CORPUS_DIR = join(process.cwd(), 'corpus');
const CHUNK_SIZE = 1500; // characters (~375 tokens)
const CHUNK_OVERLAP = 400; // characters
const EMBED_BATCH = 8; // chunks per Voyage API call
const MODEL = 'voyage-4';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

const voyage = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY! });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Chunk {
  content: string;
  source_file: string;
  doc_type: string;
  section: string | null;
  chunk_index: number;
  content_hash: string;
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function walkDir(dir: string): string[] {
  const entries = readdirSync(dir);

  return entries.flatMap(entry => {
    const full = join(dir, entry);

    return statSync(full).isDirectory() ? walkDir(full) : [full];
  });
}

function docTypeFromPath(filePath: string): string {
  const rel = relative(CORPUS_DIR, filePath);

  return rel.split('/')[0]; // resume | journal | faq | projects
}

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

function chunkText(text: string, size: number, overlap: number): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = start + size;
    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
  }

  return chunks.filter(c => c.length > 50);
}

function parseFile(filePath: string): Chunk[] {
  const raw = readFileSync(filePath, 'utf-8')
    .replace(/^---+\s*$/gm, '')
    .trim();
  const source_file = relative(process.cwd(), filePath);
  const doc_type = docTypeFromPath(filePath);

  // Split on ## headings, keep the heading with its content
  const sections = raw.split(/(?=^## )/m).filter(s => s.trim());

  const chunks: Chunk[] = [];

  for (const section of sections) {
    const headingMatch = section.match(/^##\s+(.+)/m);
    const sectionTitle = headingMatch ? headingMatch[1].trim() : null;
    const body = section.trim();

    const texts =
      body.length > CHUNK_SIZE
        ? chunkText(body, CHUNK_SIZE, CHUNK_OVERLAP)
        : [body];

    for (const text of texts) {
      chunks.push({
        content: text,
        source_file,
        doc_type,
        section: sectionTitle,
        chunk_index: chunks.length,
        content_hash: createHash('sha256').update(text).digest('hex'),
      });
    }
  }

  return chunks;
}

// ---------------------------------------------------------------------------
// Embedding
// ---------------------------------------------------------------------------

async function embedBatch(texts: string[]): Promise<number[][]> {
  const result = await voyage.embed({
    input: texts,
    model: MODEL,
    inputType: 'document',
  });

  return result.data!.map(d => d.embedding!);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const files = walkDir(CORPUS_DIR).filter(f => f.endsWith('.md'));

  console.log(`Found ${files.length} corpus files`);

  const allChunks = files.flatMap(parseFile);

  console.log(`Generated ${allChunks.length} chunks`);

  // Filter out chunks already in the DB
  const hashes = allChunks.map(c => c.content_hash);

  const { data: existing } = await supabase
    .from('corpus_chunks')
    .select('content_hash')
    .in('content_hash', hashes);

  const existingSet = new Set(
    (existing ?? []).map((r: { content_hash: string }) => r.content_hash),
  );

  const newChunks = allChunks.filter(c => !existingSet.has(c.content_hash));

  if (newChunks.length === 0) {
    console.log('Nothing new to ingest — corpus is up to date.');
    return;
  }

  console.log(
    `Embedding ${newChunks.length} new chunks (${existingSet.size} already exist)...`,
  );

  // Embed in batches
  for (let i = 0; i < newChunks.length; i += EMBED_BATCH) {
    const batch = newChunks.slice(i, i + EMBED_BATCH);
    const embeddings = await embedBatch(batch.map(c => c.content));

    const rows = batch.map((chunk, j) => ({
      ...chunk,
      embedding: embeddings[j],
    }));

    const { error } = await supabase.from('corpus_chunks').insert(rows);
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);

    console.log(
      `  Ingested chunks ${i + 1}–${Math.min(i + EMBED_BATCH, newChunks.length)} / ${newChunks.length}`,
    );
  }

  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
