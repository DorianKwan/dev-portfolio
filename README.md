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
| Headless CMS    | Sanity                          |
| Email           | Resend                          |
| Testing         | Jest + React Testing Library    |
| Package manager | pnpm                            |
| Deployment      | Vercel                          |

---

## Pages

- **`/`** — Home
- **`/about`** — About me
- **`/experience`** — Work history, skills, and timeline (tab-toggled via query params)
- **`/showcase`** — Projects (content managed via Sanity)
- **`/contact`** — CTA to open a slide-in drawer contact form, accessible from the header
- **`/studio`** — Sanity Studio (embedded, content editor)

---

## Local Setup

**Prerequisites:** Node 20+, pnpm

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
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=your_sender_email
RECEIVER_EMAIL=your_receiver_email

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

- **Resend** — required for the contact form (`/api/contact`). Without this key the form will error; everything else works fine without it.
- **Sanity** — required for the Showcase page and Studio. Without these vars the Showcase will render empty and `/studio` will not load. Create a project at [sanity.io/manage](https://sanity.io/manage) or via `pnpm dlx sanity@latest init`.

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
src/
├── app/
│   ├── components/
│   │   ├── common/        # Shared UI (Button, Heading, etc.)
│   │   ├── icons/         # SVG icon components
│   │   ├── layout/        # Page shell, Header, Nav
│   │   └── page-specific/ # Per-page feature components
│   └── studio/            # Sanity Studio (App Router route)
├── lib/
│   └── sanity/            # Sanity client, GROQ queries, image builder
├── pages/                 # Next.js pages + API routes (Pages Router)
├── store/                 # Redux store + slices
└── theme/                 # Design tokens + utils

sanity/
└── schemaTypes/           # Sanity document schemas
```
