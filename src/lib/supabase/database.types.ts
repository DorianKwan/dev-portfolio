export interface Database {
  public: {
    Tables: {
      corpus_chunks: {
        Row: {
          id: string;
          content: string;
          embedding: number[];
          source_file: string;
          doc_type: string;
          section: string | null;
          chunk_index: number;
          content_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          embedding?: number[];
          source_file: string;
          doc_type: string;
          section?: string | null;
          chunk_index: number;
          content_hash: string;
          created_at?: string;
        };
        Update: Partial<
          Database['public']['Tables']['corpus_chunks']['Insert']
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      match_corpus_chunks: {
        Args: {
          query_embedding: number[];
          match_count?: number;
          match_threshold?: number;
        };
        Returns: Array<{
          id: string;
          content: string;
          source_file: string;
          doc_type: string;
          section: string | null;
          similarity: number;
        }>;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
