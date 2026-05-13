--- Query used in Supabase
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE corpus_chunks (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  content      TEXT        NOT NULL,
  embedding    VECTOR(1024),
  source_file  TEXT        NOT NULL,
  doc_type     TEXT        NOT NULL,
  section      TEXT,
  chunk_index  INTEGER     NOT NULL,
  content_hash TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON corpus_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 10);

CREATE UNIQUE INDEX ON corpus_chunks (content_hash);

ALTER TABLE corpus_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON corpus_chunks
  FOR SELECT USING (true);
