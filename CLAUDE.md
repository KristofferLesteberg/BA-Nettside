# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npx prisma studio          # Browse database
npx prisma migrate dev     # Apply migrations (dev)
npx prisma generate        # Regenerate Prisma client after schema changes
```

No test suite is configured.

## Architecture

Next.js 15 App Router app with TypeScript, Prisma ORM, NextAuth v4, and Tailwind CSS 4.

### Route Groups & Layouts

Three layout groups control which chrome wraps each page:

| Group | Layout | Routes |
|-------|--------|--------|
| `(header-footer)` | Header + Footer | Public pages (`/`, `/produkter`, `/prosjekter`, `/kontakt-oss`) |
| `(header)` | Header only | Admin panel (`/admin`) |
| `(form-pages)` | Minimal | Admin sub-pages (add/edit forms) |

### Data Layer

- **Database**: SQLite in dev (`file:./dev.db`), PostgreSQL in production — both via Prisma
- **Singleton client**: `app/lib/prisma.ts` — always import from here
- **Schema**: `prisma/schema.prisma` — models are `Product`, `ProductImage`, `ProjectRequest`, `ProductOrder`, `ClientReview`, `ContactPerson`
- **Mutations** go through Server Actions in `actions/` — validated with Zod schemas from `app/lib/schemas.ts`

### Auth

NextAuth v4 configured in `app/lib/auth.ts`:
- Google OAuth provider (for admin login)
- Credentials provider (email/password admin fallback)
- JWT sessions with 1-hour max age
- Protected admin routes check session with `useSession()` on the client side

### Key Conventions

- Path alias `@/*` resolves to the repo root — use it for all imports
- Server Actions return a typed `ApiResponse` shape (see `app/lib/api-response.ts`)
- Image processing uses Sharp; uploads handled by `react-dropzone` + `react-easy-crop` on the client
- `next.config.ts` enables React Compiler and standalone output mode — don't disable these

### Environment Variables

Required in `.env`: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, plus SMTP vars for Nodemailer (`MAIL_*`).

## Styling System

All design tokens and component classes live in [app/globals.css](app/globals.css). Tailwind CSS 4 is used — the `@theme` block replaces `tailwind.config.js`.

### Design Tokens (`@theme`)

Always use these CSS variables instead of raw values:

**Brand colors**
- `--color-primary` / `--color-primary-hover` — Agder red (`#c0392b` / `#a93226`)
- `--color-secondary` / `--color-secondary-hover` — Agder dark blue (`#1a5276` / `#154360`)

**Surface elevation scale** (use in order, lowest → highest)
| Variable | Level | Use for |
|----------|-------|---------|
| `--color-surface-sunken` | −1 | Inset areas, input backgrounds |
| `--color-bg` | 0 | Page background |
| `--color-surface` | 1 | Cards, panels, header |
| `--color-surface-raised` | 2 | Hover states |
| `--color-surface-float` | 3 | Dropdowns, popovers |
| `--color-surface-overlay` | 4 | Modals, dialogs |

**Text**: `--color-text`, `--color-text-muted`, `--color-text-faint`, `--color-text-on-primary`

**Border**: `--color-border` (default), `--color-border-strong`

**Semantic**: `--color-success/error/warning/info` and matching `*-bg` variants

**Spacing**: `--spacing-xs` (0.5rem) → `--spacing-section` (6rem)

**Border radius**: `--radius-sm` (4px) → `--radius-full` (9999px)

### Component Classes (`@layer components`)

Prefer these over writing raw Tailwind for common UI elements:

**Buttons** — base `.btn` + one variant:
`.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-error`, `.btn-success`, `.btn-warning`, `.btn-info`, `.btn-icon`

**Inputs** — `.input` (full-width by default). Modifiers: `.border-error` (red focus ring), `.view-only` (non-interactive read state)

**Cards** — `.card` (white + border), `.card-subtle` (surface bg, no border), `.card-accented` (primary-colored border)

**Badges** — `.badge` + variant: `.badge-primary`, `.badge-secondary`, `.badge-neutral`, `.badge-success`, `.badge-error`, `.badge-warning`, `.badge-info`

**Typography** — `.heading-1` through `.heading-4`, `.label` (uppercase small caps), `.body-text`, `.small-text`

**Background helpers** (mirrors elevation scale) — `.bg-sunken`, `.bg-page`, `.bg-subtle`, `.bg-muted`, `.bg-float`, `.bg-overlay`

**Text helpers** — `.text-muted`, `.text-faint`

**Border helpers** — `.border-default`, `.border-strong`, `.border-primary`

### Custom Utilities (`@utility`)

- `.shadow-t-md` / `.shadow-b-md` / `.shadow-y-md` — directional shadows (top, bottom, both)
- `.animate-fade-in` — 150ms scale+fade in
- `.animate-popup-in` / `.animate-popup-out` — 200ms overlay fade (use `forwards` fill on out)
