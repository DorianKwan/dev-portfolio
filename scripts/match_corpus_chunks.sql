--- Semantic Vector Similarity Match
CREATE OR REPLACE FUNCTION match_corpus_chunks(
  query_embedding VECTOR(1024),
  match_count     INT   DEFAULT 5,
  match_threshold FLOAT DEFAULT 0.5
)
RETURNS TABLE (
  id          UUID,
  content     TEXT,
  source_file TEXT,
  doc_type    TEXT,
  section     TEXT,
  similarity  FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content,
    source_file,
    doc_type,
    section,
    1 - (embedding <=> query_embedding) AS similarity
  FROM corpus_chunks
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
