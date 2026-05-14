# bsayerskwan.dev

My personal portfolio site — built to show who I am, what I've shipped, and how I work.

**[bsayerskwan.dev](https://bsayerskwan.dev)**

## Homepage

<img width="1917" height="911" alt="Screenshot 2026-05-08 191847" src="https://github.com/user-attachments/assets/9176655d-4757-447d-9c24-d63439dc5d34" />

## Experience / Online Resume

<img width="1896" height="910" alt="Screenshot 2026-05-08 191906" src="https://github.com/user-attachments/assets/4800436f-f1e7-4821-86c0-67854a4c41c7" />

---

## Stack

| Layer           | Tech                            |
| --------------- | ------------------------------- |
| Framework       | Next.js 16 (Pages Router)       |
| Language        | TypeScript 6                    |
| Styling         | Emotion (styled-components API) |
| Animation       | Framer Motion                   |
| State           | Redux Toolkit                   |
| Email           | Resend                          |
| Testing         | Jest + React Testing Library    |
| Package manager | pnpm                            |
| Deployment      | Vercel                          |

### Ask Me Bot

| Layer      | Tech                     |
| ---------- | ------------------------ |
| Embeddings | Voyage AI (`voyage-4`)   |
| Vector DB  | Supabase (pgvector)      |
| LLM        | Claude Haiku (Anthropic) |
| Streaming  | Vercel AI SDK            |

---

## Pages

- **`/`** — Home
- **`/experience`** — Work history, skills, and timeline (tab-toggled via query params)
- **`/showcase`** — Projects
- **`/about`** — About me
- **`/contact`** — CTA to contact me via email form

A slide-in contact drawer is accessible from the header on every page.

---

## Local Setup

**Prerequisites:** Node 22+, pnpm

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` at the root (see `.env.example` for all keys):

```env
# Contact form (Resend)
RESEND_API_KEY=
SENDER_EMAIL=
RECEIVER_EMAIL=

# Ask Me Bot
ANTHROPIC_API_KEY=
VOYAGE_API_KEY=
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

- **Resend** — required for the contact form (`/api/contact`). Without this the form will error; everything else works fine.
- **Anthropic + Voyage AI + Supabase** — required for the Ask Me chat bot. Without these the `/api/chat` route will fail. See [Corpus & Ingestion](#corpus--ingestion) below.

---

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm lint         # Lint
pnpm lint:fix     # Lint + auto-fix
pnpm tsc          # Type check (no emit)
pnpm ingest       # Embed corpus docs and upsert into Supabase
```

---

## Corpus & Ingestion

The Ask Me bot uses RAG — markdown documents in `corpus/` are chunked, embedded via Voyage AI, and stored in Supabase (pgvector). The ingest script is incremental: it hashes each chunk and skips anything already in the database. **Corpus docs for this site are git ignored**. But here is the structure:

```
corpus/
├── availability/    # Current availability and what I'm looking for
├── background/      # Personal background
├── conversational/  # Conversational responses to unrelated questions
├── culture/         # Engineering culture and motivations
├── faq/             # Common questions
├── journal/         # Technical write-ups and project retrospectives
├── leadership/      # Leadership and team experience
├── opinions/        # Engineering opinions
├── projects/        # Project descriptions
├── resume/          # Experience and skills (structured)
└── skills/          # Skills detail
```

To re-embed after adding or editing documents:

```bash
# Incremental — only embeds new chunks
pnpm ingest

# Full reset — clear the table first, then re-ingest
# Run in Supabase SQL editor: truncate table corpus_chunks;
pnpm ingest
```

---

## Git Hooks

Husky runs checks automatically:

- **commit-msg** — enforces [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, etc.)
- **pre-push** — runs lint, tests, type check, and a full build before any push

Commit format: `type(optional-scope): subject` — max 100 chars.

---

## Project Structure

```
corpus/                # RAG source documents (markdown)
scripts/
└── ingest.ts          # Corpus embedding + Supabase ingestion script
src/
├── app/
│   ├── components/
│   │   ├── common/    # Shared UI (Button, Heading, Chat, etc.)
│   │   ├── icons/     # SVG icon components
│   │   ├── layout/    # Page shell, Header, Nav
│   │   └── page-specific/ # Per-page feature components
│   └── fonts.ts
├── lib/
│   └── supabase/      # Supabase client + generated database types
├── pages/             # Next.js pages + API routes (Pages Router)
├── store/             # Redux store + slices
└── theme/             # Design tokens + utils
```
