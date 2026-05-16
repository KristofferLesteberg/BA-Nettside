# ProjectCard Redesign — Session Handoff

This document captures every decision made, everything implemented, and what remains.
Pick up from here in a new session without losing context.

---

## What this redesign is about

The old `ProjectCard` was a vertical card that:
- Showed client name as the main heading (project title was never rendered — a bug)
- Displayed description (4 chars truncated — broken and pointless)
- Used bi-color linje badges that won't scale to future linjer
- Had status colors that semantically clashed (green on NEW, blue on COMPLETE)
- Had text-only action buttons ("Endre status", "Fjern")
- Was not responsive — no mobile consideration
- Had no way to view full project details

---

## Final design decisions

### Layout
- **Desktop:** horizontal row — Left (identity) | divider | Middle (metadata) | divider | Right (actions)
- **Mobile:** vertical card with collapsible accordion sections

### Left zone
- `project.title` as the main heading (`heading-4`)
- `clientForename clientSurname` + optional `organizationName` label below (secondary, `text-muted`)
- `#` + first 8 chars of `project.id` below that (faint, monospace)

### Middle zone (hidden on mobile, `hidden md:flex`)
Two vertical dividers (`w-px self-stretch bg-border`) flank this entire section so it disappears cleanly on mobile along with its borders.

Inside, two sub-groups separated by a mini divider:
1. **Badges:** status badge + linje badge (icon + neutral style)
2. **Date + Price:** stacked vertically in a `flex-col`
   - Date row: `FaCalendarDays` icon + nb-NO formatted string
   - Price row: `FaCoins` icon + compact price range + " kr"

### Right zone (actions)
Three icon-only buttons (`btn btn-ghost p-2`, icons at `w-5 h-5`):
- `FaEye` — opens the detail drawer
- `RiProgress3Line` (from `react-icons/ri`) — opens status dropdown
- `FaTrash` — opens delete confirmation popup (existing `usePopUp`)

### Status colors
New dedicated tokens added to `app/globals.css` `@theme` block:
```css
--color-status-new:             #4338ca;   /* indigo */
--color-status-new-bg:          #e0e7ff;
--color-status-progress:        #c2410c;   /* orange */
--color-status-progress-bg:     #ffedd5;
/* COMPLETE reuses --color-success / --color-success-bg (green) */
```
New badge classes in `@layer components`:
```css
.badge-status-new      { background: var(--color-status-new-bg);        color: var(--color-status-new); }
.badge-status-progress { background: var(--color-status-progress-bg);   color: var(--color-status-progress); }
```
Mapping:
- `NEW` → `badge badge-status-new`
- `IN_PROGRESS` → `badge badge-status-progress`
- `COMPLETE` → `badge badge-success`

### Linje badges
All linjer use `badge badge-neutral` (one static color, scales to any number of future linjer).
Each linje gets a unique icon for differentiation:
- `BUILDING` → `FaHelmetSafety` + "Bygg"
- `CONSTRUCTION` → `FaRoad` + "Anlegg"

**Important:** `FaHardHat` does not exist in `react-icons/fa6`. The correct name is `FaHelmetSafety`.

### Date format
```ts
new Date(iso).toLocaleDateString('nb-NO', {
  weekday: 'short',
  day:     'numeric',
  month:   'long',
  year:    'numeric',
})
// → "man. 26. april 2026"
```

### Price format
Compact adaptive format — "kr" appended once to the whole range string:

```ts
function formatPrice(kr: number): string {
  if (kr < 5000) return kr.toLocaleString('nb-NO')
  const base      = Math.floor(kr / 1000)
  const remainder = kr % 1000
  if (remainder < 150) return `${base}k`
  if (remainder >= 850) return `${base + 1}k`
  return `${base}.5k`
}

const priceRange = `${formatPrice(project.minPrice)} – ${formatPrice(project.maxPrice)} kr`
// e.g. "49k – 52k kr" / "2 300 – 4 800 kr" / "123.5k – 350k kr"
```

Threshold logic: remainder within 150 of a whole thousand → round to whole; otherwise snap to .5k.

**Watch out:** `nb-NO` locale uses a Unicode narrow no-break space (` `) as the thousands separator, not a regular space. String matching on formatted numbers will fail silently unless you account for this.

### Detail drawer
- Implemented in `ProjectDrawer.tsx`
- Slide in from the right, `max-w-md`, full height
- `selectedProject` state lives in `FilteredProjectGrid`, not in `ProjectCard`
- `onView` callback passed from `FilteredProjectGrid` → `ProjectCard`
- Closes on: backdrop click, Escape key
- **Read-only** — admins must not edit project data, only the client/user should
- Shows: title, client name, status badge, linje badge, ID, submission date (full nb-NO), full price (exact numbers with `nb-NO` formatting), billing address, description (full, `whitespace-pre-wrap`), email, phone, project address, organization name/number

### Mobile accordion (NOT YET IMPLEMENTED)
This is the remaining work. The card on mobile should show:

**Always visible (no interaction needed):**
- Project title
- Client name + organization (if any)
- Project ID
- Status badge + linje badge
- The three icon action buttons

**Collapsible section "Detaljer" (tap to expand):**
- Submission date
- Price range
- `billingAddress`

**Collapsible section "Kontakt" (tap to expand):**
- `clientEmail`
- `clientPhone`
- `address` (project site address)

Implementation notes for the accordion:
- Both sections can be open simultaneously (independent toggle state)
- Use `useState` for each section's open state inside `ProjectCard`
- The accordion sections should only render on mobile — wrap them in `md:hidden`
- The middle zone (`hidden md:flex`) already hides on mobile, so the accordion fills that gap

---

## Files changed

| File | Change |
|---|---|
| `app/globals.css` | Added `--color-status-new/bg` and `--color-status-progress/bg` tokens + `.badge-status-new` and `.badge-status-progress` classes |
| `CLAUDE.md` | Added comment style convention to Key Conventions |
| `components/admin/Projects/ProjectCard.tsx` | Full rewrite — horizontal row layout, new status/linje badges, date/price formatting, icon-only actions, `onView` prop |
| `components/admin/Projects/ProjectDrawer.tsx` | New file — read-only slide-in detail drawer |
| `components/admin/Projects/FilteredProjectGrid.tsx` | Added `ProjectDrawer` import, `selectedProject` state, `onView={setSelectedProject}` on each card, `<ProjectDrawer>` at the bottom of the return |

---

## Pending git staging

These files are ready to be committed (staged or unstaged, check with `git status`):
- `app/globals.css`
- `CLAUDE.md`
- `components/admin/Projects/ProjectCard.tsx`
- `components/admin/Projects/ProjectDrawer.tsx`
- `components/admin/Projects/FilteredProjectGrid.tsx`

Suggested commit sequence (natural dev history):
1. `Add project status color tokens` — globals.css + CLAUDE.md
2. `Rework ProjectCard into horizontal row layout and add detail drawer` — the three component files

---

## Key gotchas

- `FaHardHat` does not exist in `react-icons/fa6` — use `FaHelmetSafety`
- `RiProgress3Line` comes from `react-icons/ri`, not `fa6`
- `nb-NO` locale output contains ` ` (narrow no-break space) — raw string matching will silently fail
- The status dropdown positioning changed from `bottom-0` (old) to `top-full mt-1` (new)
- `SerializedProject` type is exported from `ProjectCard.tsx` and imported in both `FilteredProjectGrid.tsx` and `ProjectDrawer.tsx`
- The drawer renders in `FilteredProjectGrid`, not inside `ProjectCard` — keeps `ProjectCard` stateless about drawer open/close
