# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
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
| `(header-footer)` | Header + Footer | `/`, `/produkter`, `/produkter/[productId]`, `/prosjekter`, `/kontakt-oss` |
| `(header)` | Header only | `/admin` |
| `(form-pages)` | Minimal | All form routes — see table below |

**Form-page routes** (all under `(form-pages)`):

| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin login |
| `/admin/nytt-produkt/[id]` | Create product (draft-first flow) |
| `/admin/oppdater-produkt/[id]` | Edit product |
| `/admin/ny-anmeldelse` | Create review |
| `/admin/oppdater-anmeldelse/[id]` | Edit review |
| `/admin/ny-kontakt` | Create contact person |
| `/admin/oppdater-kontakt/[id]` | Edit contact person |
| `/bestill-produkt/[id]` | Public product order form |
| `/prosjekter/[id]` | Public project request detail (with client verification gate) |
| `/prosjekter/bestill-prosjekt` | Public project request form (multi-step) |

`/style-test` is an ungrouped dev-only component showcase page.

### Data Layer

- **Database**: SQLite in dev (`file:./dev.db`), PostgreSQL in production — both via Prisma with separate adapters (`@prisma/adapter-better-sqlite3`, `@prisma/adapter-pg`)
- **Singleton client**: `app/lib/prisma.ts` — always import from here
- **Schema**: `prisma/schema.prisma` — see models below
- **Mutations** go through Server Actions in `actions/` — validated with Zod schemas from `app/lib/schemas.ts`

### Prisma Models & Enums

**Enums:**

| Enum | Values | Used in |
|------|--------|---------|
| `EducationField` | `PLUMBER`, `CONCRETE`, `CARPENTER`, `CONSTRUCTION` | `Product`, `ProjectRequest` |
| `Status` | `NEW`, `IN_PROGRESS`, `COMPLETE` | `ProjectRequest` |
| `OrderStatus` | `NEW`, `IN_CONTACT`, `COMPLETED` | `ProductOrder` |

**Models:**

| Model | Key fields |
|-------|-----------|
| `Product` | `id`, `title`, `description`, `price` (Decimal), `amount` (Int, stock), `draft` (Boolean, default `true`), `educationField` (enum, optional), `measures` (Json), `publishedAt`, `contactPersonId` |
| `ProductImage` | `id` (String/UUID), `productId`, `sortOrder` (Int) |
| `ProjectRequest` | `id`, `identityType`, `forename`, `surname`, `email`, `phone`, address fields, org fields, `title`, `description`, `budget`, `educationField`, `status` (Status enum) |
| `ProductOrder` | `id`, `clientName`, `clientEmail`, `clientPhone`, `amount`, `extraDetails`, `status` (OrderStatus enum), `productId` |
| `ClientReview` | `id`, `name`, `role`, `orgName`, `orgURL`, `imageId` (String, optional), `message`, `createdAt` |
| `ContactPerson` | `id`, `name`, `email`, `phone`, `title` |

`Product.draft = true` means unpublished — the public product detail page sends draft products to `notFound()`. `Product.amount` tracks stock; the order form prevents ordering more than available.

### Actions (`actions/`)

| File | Key exports |
|------|------------|
| `products.ts` | `getAllProducts`, `getProductById`, `createDraftProduct`, `updateProduct`, `publishProduct`, `addImageToProduct`, `updateProductAmount`, `deleteProduct` |
| `contact.ts` | `getAllContacts`, `getContactById`, `createContactPerson`, `updateContactPerson`, `deleteContactPerson` |
| `reviews.ts` | `getAllReviews`, `getReviewById`, `createReview`, `updateReview`, `deleteReview` |
| `projects.ts` | `getAllProjects`, `getProjectById`, `createProject`, `verifyProjectClient`, `updateProjectStatus`, `deleteProject` |
| `orderProduct.ts` | `getAllOrders`, `getOrderById`, `createProductOrder`, `deleteOrder`, `UpdateOrder` |
| `email.ts` | `sendOrderEmail`, `sendProjectEmail` — called automatically inside `createProductOrder` / `createProject` |
| `pdf.ts` | `generateProjectPdf(id)` — renders project request as PDF via `@react-pdf/renderer` |

All mutating actions check `getServerSession` first and throw `'Ikke autorisert'` if no session.

### Auth

NextAuth v4 configured in `app/lib/auth.ts`:
- **Google OAuth** — admin accounts must have their email listed in `ADMIN_EMAILS` env var (comma-separated); unlisted Google accounts are rejected in the `signIn` callback
- **Credentials provider** — `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars; bypasses the email allowlist
- **JWT sessions** with 1-hour max age
- Sign-in and error pages both redirect to `/admin/login`
- Protected admin routes check session with `useSession()` on the client side

### `app/lib/` Modules

| File | Purpose |
|------|---------|
| `prisma.ts` | Singleton Prisma client |
| `auth.ts` | NextAuth config |
| `schemas.ts` | Zod validation schemas (products, projects, reviews, contacts) |
| `api-response.ts` | Typed `ApiResponse<T>` return shape for Server Actions |
| `images.ts` | Image upload pipeline — Sharp WebP conversion, UUID filenames, stored in `public/images/`, Prisma metadata; separate helpers for product images and review images |
| `mail.ts` | Nodemailer SMTP wrapper (`sendMail()`); uses `MAIL_*` env vars |
| `product-utils.ts` | `isProductPublishable()` — checks that `educationField`, `title`, `description` are non-empty before allowing publish |
| `education-fields.ts` | `EDUCATION_FIELD_LABELS` (Norwegian labels) and `EDUCATION_FIELD_OPTIONS` arrays for the `EducationField` enum |
| `types.ts` | `ProductCardData` — product with serialised `price` and `publishedAt` for client components |

### Key Conventions

- Path alias `@/*` resolves to the repo root — use it for all imports
- Server Actions return a typed `ApiResponse` shape (see `app/lib/api-response.ts`)
- Image processing uses Sharp; uploads handled by `react-dropzone` + `react-easy-crop` on the client; image reordering uses `@dnd-kit`
- `next.config.ts` enables React Compiler, standalone output, and `serverExternalPackages: ['@react-pdf/renderer']` — don't change these
- Comments should be sparse — only when the why isn't obvious from the code. No block dividers, no section headers in comments, no emoji.

### Environment Variables

Required in `.env`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma connection string (`file:./dev.db` in dev) |
| `NEXTAUTH_SECRET` | NextAuth JWT secret |
| `NEXTAUTH_URL` | App base URL (`http://localhost:3000/` in dev) |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `ADMIN_EMAILS` | Comma-separated list of Google emails allowed to sign in as admin |
| `ADMIN_USERNAME` | Credentials-provider fallback username |
| `ADMIN_PASSWORD` | Credentials-provider fallback password |
| `ADMIN_EMAIL` | Single admin email address that receives order/project notification emails |
| `MAIL_HOST` | SMTP host |
| `MAIL_PORT` | SMTP port |
| `MAIL_USER` | SMTP username |
| `MAIL_PASS` | SMTP password |

### Component Structure

```
components/
  admin/            # Admin UI (product form, review form, contact form, order list, …)
    Orders/         # Order management table + status controls
    Projects/       # Project list, detail, PDF document component
  products/         # Public product UI (OrderProductForm)
  projects/         # Public project UI (OrderProjectForm, ClientVerificationGate, updateProject)
  shared/           # Reused across all pages
    input/          # address-input, ReviewImageInput, price-range (rc-slider), checkbox, orgNumberInput
    products/       # ProductCard, ProductDetail, FilteredProductsGrid, ProductsGrid
    AppToaster.tsx  # react-hot-toast instance — already in (header-footer) layout
    BackBtn.tsx     # Back-navigation button; props: handleOnClick?, text?
    PopUp.tsx       # usePopUp() hook — returns { open, close, popUpElement }; renders via portal
    ImageCarousel.tsx
    ReviewsCarousel.tsx
    Header.tsx
    Footer.tsx
    Spinner.tsx
    CopyButton.tsx
    LinjeDropdown.tsx
    providers.tsx   # SessionProvider wrapper — used in root layout
```

**Key patterns:**

- **Toasts** — use `toast()` / `toast.success()` / `toast.error()` from `react-hot-toast`; `AppToaster` is mounted in the layout so no additional setup needed.
- **Modals** — use `const { open, close, popUpElement } = usePopUp()` from `@/components/shared/PopUp`; render `{popUpElement}` at the top of the component; call `open({ title, subtitle, yesLabel, noLabel, onYes, onNo })`.
- **Image upload** — client side uses `react-dropzone` to pick files and `react-easy-crop` for cropping; the cropped blob is sent to a Server Action that calls `app/lib/images.ts` helpers.
- **Phone numbers** — use the `react-phone-number-input` component; validated with `libphonenumber-js`.
- **Product draft flow** — `createDraftProduct()` creates an empty draft immediately on page load; the form then edits it in place. On discard, `deleteProduct()` is called.
- **Project request flow** — multi-step form (`Page1Schema` → `Page2Schema`); after submission the client can view their request at `/prosjekter/[id]` by passing a verification gate (`ClientVerificationGate` checks forename, surname, email).
- **Email** — `sendOrderEmail` / `sendProjectEmail` are called inside the relevant `create*` action; they send two emails: one to `ADMIN_EMAIL`, one to the client.
- **PDF** — `generateProjectPdf(id)` (auth-gated) returns a PDF blob of a project request, rendered with `@react-pdf/renderer`; the component lives in `components/admin/Projects/ProjectPdfDocument`.

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

**Project status** (for `ProjectRequest.status`):
- `--color-status-new` / `--color-status-new-bg` — indigo
- `--color-status-progress` / `--color-status-progress-bg` — orange
- `COMPLETE` reuses `--color-success` / `--color-success-bg`

**Spacing**: `--spacing-xs` (0.5rem) → `--spacing-section` (6rem)

**Border radius**: `--radius-sm` (4px) → `--radius-full` (9999px)

### Component Classes (`@layer components`)

Prefer these over writing raw Tailwind for common UI elements:

**Buttons** — base `.btn` + one variant:
`.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-error`, `.btn-success`, `.btn-warning`, `.btn-info`, `.btn-icon`

**Inputs** — `.input` (full-width by default). Modifiers: `.border-error` (red focus ring), `.view-only` (non-interactive read state)

**Cards** — `.card` (white + border), `.card-subtle` (surface bg, no border), `.card-accented` (primary-colored border)

**Badges** — `.badge` + variant: `.badge-primary`, `.badge-secondary`, `.badge-neutral`, `.badge-success`, `.badge-error`, `.badge-warning`, `.badge-info`, `.badge-status-new`, `.badge-status-progress`

**Typography** — `.heading-1` through `.heading-4`, `.label` (uppercase small caps), `.body-text`, `.small-text`

**Background helpers** (mirrors elevation scale) — `.bg-sunken`, `.bg-page`, `.bg-subtle`, `.bg-muted`, `.bg-float`, `.bg-overlay`

**Text helpers** — `.text-muted`, `.text-faint`

**Border helpers** — `.border-default`, `.border-strong`, `.border-primary`

### Tailwind 4 sizing gotcha

The `@theme` block defines custom `--spacing-xs/sm/md/lg/xl/section` tokens. In Tailwind 4, named size utilities like `max-w-sm`, `max-w-md`, `max-w-lg` resolve to these custom tokens (e.g. `max-w-md` → 1.5rem), **not** the Tailwind default breakpoint sizes. Always use **numeric** utilities (`max-w-120`, `w-96`, etc.) or arbitrary values (`max-w-[480px]`) for explicit pixel/rem sizes. Responsive breakpoint *prefixes* (`sm:`, `md:`, `lg:`) are unaffected and work normally.

### Custom Utilities (`@utility`)

- `.shadow-t-md` / `.shadow-b-md` / `.shadow-y-md` — directional shadows (top, bottom, both)
- `.animate-fade-in` — 150ms scale+fade in
- `.animate-popup-in` / `.animate-popup-out` — 200ms overlay fade (use `forwards` fill on out)
- `.animate-dropdown-in` / `.animate-dropdown-out` — 150ms dropdown slide+fade (used in `ProductCard` controls)
- `.contact-highlight` — 1.2s pulse ring on the contact card (used in `ProductDetail` scroll-to-contact flow)
