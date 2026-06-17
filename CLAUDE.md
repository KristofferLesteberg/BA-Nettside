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
| `(header)` | Header only | `/admin`, `/preview-produkt/[id]` |
| `(form-pages)` | Minimal | All form routes — see table below |

**Form-page routes** (all under `(form-pages)`):

| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin login |
| `/admin/nytt-produkt` | Create product (draft-first flow) |
| `/admin/oppdater-produkt/[id]` | Edit product |
| `/admin/ny-anmeldelse` | Create review |
| `/admin/oppdater-anmeldelse/[id]` | Edit review |
| `/admin/ny-kontakt` | Create contact person |
| `/admin/oppdater-kontakt/[id]` | Edit contact person |
| `/produkter/[productId]/bestill` | Public product order form |
| `/prosjekter/[id]` | Public project request detail (with client verification gate) |
| `/prosjekter/bestill-prosjekt` | Public project request form (multi-step) |

Other top-level routes: `/style-test` (ungrouped dev-only component showcase), `/email-test` (dev-only email template preview), `app/images/[id]/route.ts` (image-serving route handler, see Image Handling below), `app/api/auth/[...nextauth]` (NextAuth handler), `app/robots.ts` / `app/sitemap.ts` (SEO metadata, see below), `app/not-found.tsx` (generic 404; several routes also have their own local `not-found.tsx`).

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
| `Product` | `id`, `title`, `description`, `price` (Decimal), `amount` (Int, stock), `draft` (Boolean, default `true`), `educationField` (enum, optional), `measures` (Json), `publishedAt`, `isSeeded` (Boolean), `contactPersonId` |
| `ProductImage` | `id` (String/UUID), `productId`, `sortOrder` (Int) |
| `ProjectRequest` | `id`, `clientForename`, `clientSurname`, `clientEmail`, `clientPhone`, `address`, `billingAddress`, org fields, `title`, `description`, `minPrice`/`maxPrice`, `educationField`, `status` (Status enum), `isSeeded` |
| `ProductOrder` | `id`, `clientName`, `clientEmail`, `clientPhone`, `amount`, `extraDetails`, `status` (OrderStatus enum), `isSeeded`, `productId` (optional — nullable so the order survives product deletion), `snapshotTitle`/`snapshotPrice`/`snapshotContact` (Json, captured at order time so history survives product/contact deletion), `notes` (relation to `OrderNote`) |
| `OrderNote` | `id`, `orderId` (cascade delete with order), `text`, `authorName` (optional), `createdAt` — powers the order notes timeline UI |
| `ClientReview` | `id`, `name`, `role`, `orgName`, `orgURL`, `imageId` (String, optional), `message`, `isSeeded`, `createdAt` |
| `ContactPerson` | `id`, `name`, `email`, `phone`, `title`, `isSeeded` |
| `NotificationRecipient` | `id`, `name`, `email` (unique), `createdAt` — admins who receive order/project notification emails (replaces the old single `ADMIN_EMAIL` env var; managed via the admin control panel) |
| `AppConfig` | `key` (String, id), `value` (String), `updatedAt` — generic key/value store for runtime-configurable settings (see `app/lib/app-config.ts`) |
| `EmailQueue` | `id` (UUID), `to`, `subject`, `body`, `status` (`PENDING`/`SENT`/`FAILED`), `attempts`, `lastAttemptAt`, `createdAt` — outbox for `sendMail()`, retried via `flushEmailQueue()` |

`Product.draft = true` means unpublished — the public product detail page sends draft products to `notFound()`. `Product.amount` tracks stock; the order form prevents ordering more than available. `isSeeded` flags demo/test data created by the seeding tools (see Admin Control Panel below) so it can be filtered or bulk-deleted separately from real data.

### Actions (`actions/`)

| File | Key exports |
|------|------------|
| `products.ts` | `getAllProducts`, `getProductById`, `createDraftProduct`, `updateProduct`, `publishProduct`, `addImageToProduct`, `updateProductAmount`, `deleteProduct` |
| `contact.ts` | `getAllContacts`, `getContactById`, `createContactPerson`, `updateContactPerson`, `deleteContactPerson` |
| `reviews.ts` | `getAllReviews`, `getReviewById`, `createReview`, `updateReview`, `deleteReview` |
| `projects.ts` | `getAllProjects`, `getProjectById`, `createProject`, `verifyProjectClient`, `updateProjectClient`, `updateProject`, `updateProjectStatus`, `deleteProject` |
| `orderProduct.ts` | `getAllOrders`, `getOrderById`, `createProductOrder`, `deleteOrder`, `UpdateOrder`, `getOrdersByProductId` |
| `orderNotes.ts` | `createOrderNote(orderId, data)`, `deleteOrderNote(id)` |
| `notificationRecipients.ts` | `getNotificationRecipients`, `addNotificationRecipient`, `deleteNotificationRecipient` |
| `controlPanel.ts` | `getAllAppConfig` (re-export), `saveAppConfig`, `deleteSeeded*` (Products/Orders/Projects/Reviews/ContactPersons), `deleteAllSeeded`, `deleteAll*` (Products/Orders/Projects/Reviews/ContactPersons), `deleteEverything` |
| `seed.ts` | `seedProducts`, `seedContactPersons`, `seedReviews`, `seedProjects`, `seedOrders` — generate demo data flagged `isSeeded: true` |
| `email.ts` | `sendOrderEmail`, `sendProjectEmail` — called automatically inside `createProductOrder` / `createProject` |
| `pdf.ts` | `generateProjectPdf(id)` — renders project request as PDF via `@react-pdf/renderer` |

All mutating actions check `getServerSession` first and throw `'Ikke autorisert'` if no session.

### Auth

NextAuth v4 configured in `app/lib/auth.ts`. Admin credentials and the OAuth allowlist are no longer plain env vars — they're read through `getAppConfig()` (`app/lib/app-config.ts`), which checks the `AppConfig` DB table first and falls back to env vars (and then hardcoded defaults) if no row exists yet:

- **Google OAuth** — admin accounts must have their email listed in the `ADMIN_EMAIL_ALLOWLIST` config key (falls back to the `ADMIN_EMAILS` env var, comma-separated); unlisted Google accounts are rejected in the `signIn` callback
- **Credentials provider** — username/password come from the `ADMIN_USERNAME`/`ADMIN_PASSWORD` config keys (falling back to the env vars of the same name); bypasses the email allowlist
- **JWT sessions** — lifetime is controlled by the `SESSION_LIFETIME_SECONDS` config key (default 3600s), stamped onto a custom `token.sessionExp` field rather than relying on NextAuth's built-in `maxAge` (NextAuth's `encode()` overwrites `token.exp` after the callback runs). The outer cookie `maxAge` is fixed at 7 days as a ceiling.
- **Session invalidation** — `bumpSessionInvalidation()` writes `SESSION_INVALIDATED_AT`; any JWT issued (`iat`) before that timestamp is rejected in the `jwt` callback, effectively force-logging-out all sessions (used by the control panel's "force logout" action)
- Sign-in and error pages both redirect to `/admin/login`
- Protected admin routes check session with `useSession()` on the client side

### Admin Control Panel & Seeding

`components/admin/AdminControlPanel.tsx` opens `components/admin/ControlPanel/ControlPanelModal.tsx`, which has three sections:
- `ConfigSection.tsx` — edits `AppConfig` values (session lifetime, email retry limit, hide-test-data toggle, force logout) via `controlPanel.ts`
- `SeedSection.tsx` — generates demo data via `seed.ts` (`seedProducts`, `seedOrders`, `seedProjects`, `seedReviews`, `seedContactPersons`), all flagged `isSeeded: true`
- `DeleteSection.tsx` — bulk-deletes via `controlPanel.ts` (`deleteAllSeeded`, per-model `deleteSeeded*`/`deleteAll*`, or `deleteEverything`)

`HIDE_TEST_DATA` (an `AppConfig` key) lets admins hide seeded rows from regular admin views without deleting them.

### Image Handling

Images are no longer served through Next's built-in static handling alone — uploads and serving both go through dedicated code:

- **Upload/processing** (`app/lib/images.ts`) — Sharp converts uploads to WebP and writes them to a flat `images/` directory at the project root (created by the Docker entrypoint script, not committed). Product images: resized to fit inside 2000×2000, no enlarging, 80% quality (`uploadProductImage`, `uploadProductImages`, `syncProductImages`, `deleteProductImage`, `deleteAllProductImages`). Review images: cropped to 400×400 cover/center, 85% quality (`uploadReviewImage`, `deleteReviewImage`).
- **Serving** (`app/images/[id]/route.ts`) — a route handler, not a Server Action: validates the requested filename against `^[a-zA-Z0-9-]+\.webp$`, reads it from the `images/` directory, and returns it with a one-year immutable `Cache-Control` header. Returns 404 for invalid patterns or missing files.
- `next.config.ts` tunes `images.deviceSizes`/`images.imageSizes`/`images.minimumCacheTTL` for this fixed set of image use cases (product photos, thumbnails) rather than the Next.js defaults.

### Email

- `app/lib/mail.ts` — `sendMail()` writes every outgoing email to the `EmailQueue` table first, then attempts immediate SMTP delivery via Nodemailer (`MAIL_*` env vars); on failure it leaves the row `PENDING` and increments `attempts`. `flushEmailQueue()` retries all `PENDING` rows under `EMAIL_MAX_RETRY_ATTEMPTS` (default 5) attempts, marking rows `FAILED` once exhausted; it's opportunistically called after any successful send.
- `app/lib/email-templates.ts` — shared HTML building blocks (`emailShell`, `emailSection`, `emailRow`, `emailParagraph`, `emailDivider`, `emailSignOff`) used to compose order/project notification emails.
- `actions/email.ts` (`sendOrderEmail`, `sendProjectEmail`) sends to every address in the `NotificationRecipient` table (not a single hardcoded admin address) plus the client.
- `/email-test` is a dev-only page for previewing these templates.

### `app/lib/` Modules

| File | Purpose |
|------|---------|
| `prisma.ts` | Singleton Prisma client |
| `auth.ts` | NextAuth config — reads admin credentials/allowlist/session lifetime from `app-config.ts` |
| `schemas.ts` | Zod validation schemas (products, projects, reviews, contacts) |
| `api-response.ts` | Typed `ApiResponse<T>` return shape for Server Actions |
| `images.ts` | Image upload pipeline — Sharp WebP conversion, UUID filenames, stored in the `images/` dir, served via `app/images/[id]/route.ts`; separate helpers for product images and review images |
| `mail.ts` | Nodemailer SMTP wrapper backed by the `EmailQueue` table (see Email above) |
| `product-utils.ts` | `isProductPublishable()` — checks that `educationField`, `title`, `description` are non-empty before allowing publish; `formatPrice()` |
| `education-fields.ts` | `EDUCATION_FIELD_LABELS` (Norwegian labels) and `EDUCATION_FIELD_OPTIONS` arrays for the `EducationField` enum |
| `types.ts` | `ProductCardData` — product with serialised `price` and `publishedAt` for client components |
| `icons.tsx` | Centralized icon re-exports (react-icons fa6/ri/gi) under semantic names (`IconDelete`, `IconEdit`, `IconStepOrder`, `EDUCATION_FIELD_ICONS`, etc.) — **always import icons from here, never from `react-icons` directly** |
| `app-config.ts` | `getAppConfig`, `setAppConfig`, `getAllAppConfig`, `bumpSessionInvalidation` — reads/writes the `AppConfig` table, with env var and hardcoded fallbacks; tolerates the table not existing yet (pending migration) |
| `app-config-keys.ts` | `CONFIG_KEYS` — the canonical set of `AppConfig` keys (session lifetime, admin credentials, allowlist, email retry limit, hide-test-data, session invalidation timestamp) |
| `brand-colors.ts` | `BRAND` color constants shared by the PDF document and email templates |
| `email-templates.ts` | HTML email building blocks (see Email above) |
| `seed-data.ts` | Static seed data (e.g. `SEED_PRODUCT_TITLES` per `EducationField`) used by `actions/seed.ts` |

### Key Conventions

- Path alias `@/*` resolves to the repo root — use it for all imports
- Server Actions return a typed `ApiResponse` shape (see `app/lib/api-response.ts`)
- Image processing uses Sharp; uploads handled by `react-dropzone` + `react-easy-crop` on the client; image reordering uses `@dnd-kit`
- Icons always come from `app/lib/icons.tsx` — never import `react-icons` directly in components
- `next.config.ts` enables React Compiler, standalone output, `serverExternalPackages: ['@react-pdf/renderer']`, a tuned `images` config for the fixed image pipeline above, and a 20MB Server Actions body size limit (for image uploads) — don't change these without reason
- Comments should be sparse — only when the why isn't obvious from the code. No block dividers, no section headers in comments, no emoji.

### Environment Variables

Required in `.env`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma connection string (`file:./dev.db` in dev) |
| `NEXTAUTH_SECRET` | NextAuth JWT secret |
| `NEXTAUTH_URL` | App base URL (`http://localhost:3000/` in dev); also used as the sitemap's base URL |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `ADMIN_EMAILS` | Fallback comma-separated allowlist of Google emails allowed to sign in as admin — overridden by the `ADMIN_EMAIL_ALLOWLIST` `AppConfig` key once set |
| `ADMIN_USERNAME` | Fallback credentials-provider username — overridden by the `ADMIN_USERNAME` `AppConfig` key once set |
| `ADMIN_PASSWORD` | Fallback credentials-provider password — overridden by the `ADMIN_PASSWORD` `AppConfig` key once set |
| `MAIL_HOST` | SMTP host |
| `MAIL_PORT` | SMTP port |
| `MAIL_USER` | SMTP username |
| `MAIL_PASS` | SMTP password |

Note: there is no `ADMIN_EMAIL` env var anymore — notification recipients are managed in the DB via the `NotificationRecipient` model / `actions/notificationRecipients.ts`.

### Component Structure

```
components/
  admin/            # Admin UI (product form, review form, contact form, order list, …)
    ControlPanel/   # AppConfig editor, seeding tools, bulk-delete tools (see Admin Control Panel)
    Orders/         # Order management table, status controls, notes timeline
    Projects/       # Project list, detail, drawer, PDF document component
  landing/          # Landing-page-only sections (process steps, scroll-snap behavior)
  products/         # Public product UI (OrderProductForm, order success screen)
  projects/         # Public project UI (OrderProjectForm, ClientVerificationGate, prerequisites form, order success screen, updateProject)
  shared/           # Reused across all pages
    input/          # address-input, ReviewImageInput, price-range (rc-slider), price-input, checkbox, orgNumberInput
    products/       # ProductCard, PublicProductCard, ProductDetail, FilteredProductsGrid, ProductsGrid
    AppToaster.tsx  # react-hot-toast instance — already in (header-footer) layout
    BackBtn.tsx     # Back-navigation button; props: handleOnClick?, text?
    PopUp.tsx       # usePopUp() hook — returns { open, close, popUpElement }; renders via portal
    FilterPanel.tsx # Shared sort/filter control panel used by the products/orders/projects grids
    Pagination.tsx  # searchParams-driven pagination control
    ImagesPreview.tsx
    ImageCarousel.tsx
    ReviewsCarousel.tsx
    ContactDropdown.tsx
    MotionDiv.tsx / MotionLi.tsx / MotionUl.tsx  # framer-motion wrappers for list/element animations
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
- **Order notes** — `components/admin/Orders/OrderNotesTimeline.tsx` renders `OrderNote` rows as a timeline; `AddNoteModal.tsx` creates new notes via `createOrderNote`.
- **Pagination & filtering** — list pages (products/orders/projects) read sort/filter/page state from URL `searchParams` (via `FilterPanel`/`Pagination`) so state survives navigation and refresh.
- **Email** — `sendOrderEmail` / `sendProjectEmail` are called inside the relevant `create*` action; they queue (via `app/lib/mail.ts`) one email per row in `NotificationRecipient`, plus one to the client.
- **PDF** — `generateProjectPdf(id)` (auth-gated) returns a PDF blob of a project request, rendered with `@react-pdf/renderer`; the component lives in `components/admin/Projects/ProjectPdfDocument`. Shares brand colors with email templates via `app/lib/brand-colors.ts`.

## SEO / Metadata

- `app/robots.ts` — disallows `/admin/`, `/prosjekter/`, `/produkter/*/bestill`; points to the sitemap
- `app/sitemap.ts` — `force-dynamic`; lists static pages plus every published product (via `getAllProducts`), using `NEXTAUTH_URL` as the base URL

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