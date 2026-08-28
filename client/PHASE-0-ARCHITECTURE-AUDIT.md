# Phase 0 — Architecture Audit (READ ONLY)

## 1. Architecture Map

### Routing (App.tsx)

| Route               | Component             | Uses PageFrame?       | Chrome system            |
| ------------------- | --------------------- | --------------------- | ------------------------ |
| `/`                 | `Home.tsx`            | Yes (`dark noHeader`) | SiteChrome               |
| `/inventory`        | `Inventory.tsx`       | Yes                   | SiteChrome               |
| `/inventory/:id`    | `VehicleDetail.tsx`   | Yes                   | SiteChrome               |
| `/dealer`           | `DealerDashboard.tsx` | No (custom)           | AmbientBackground only   |
| `/financing`        | `ServicePage.tsx`     | Yes                   | SiteChrome               |
| `/trade-in`         | `ServicePage.tsx`     | Yes                   | SiteChrome               |
| `/diaspora`         | `ServicePage.tsx`     | Yes                   | SiteChrome               |
| `/about`            | `ServicePage.tsx`     | Yes                   | SiteChrome               |
| `/contact`          | `ServicePage.tsx`     | Yes                   | SiteChrome               |
| `/legal`            | `LegalTrust.tsx`      | **No**                | Tailwind utility classes |
| `/404` and fallback | `NotFound.tsx`        | No                    | Tailwind utility classes |

### Two Parallel Page Systems

- **System A (SiteChrome):** Home, Inventory, VehicleDetail, ServicePage, DealerDashboard
  - Centralized CSS in `index.css`
  - Custom CSS classes (`.original-*`, `.site-header`, `.vehicle-card`, etc.)
  - Single `Logo` (image-based, in SiteChrome.tsx)
- **System B (Tailwind utilities):** LegalTrust, NotFound, About, Contact, Financing, TradeIn, Diaspora
  - These 5 individual pages (About, Contact, Financing, TradeIn, Diaspora) are **dead code** — not routed. They were superseded by ServicePage.
  - Each has its own `<header>`/`<footer>` duplicating SiteChrome
  - Use Tailwind utility classes directly
  - Use a different `Logo` component (text + image, in Logo.tsx)
  - Both systems use different color values for the same brand elements (`#0b1f3a` vs `#0a1728`)

### Shared Components (SiteChrome.tsx)

- `Logo` — image-based brand lockup (brand-mark + brand-wordmark)
- `ThemeToggle` — light/dark mode toggle
- `SiteHeader` — header with nav, theme toggle, mobile menu
- `MakeBadge` — make logo/ badge with Simple Icons
- `StatusPill` — status indicator
- `VehicleCard` — vehicle card with image, specs, price, CTAs
- `Footer` — site footer
- `AmbientBackground` — background orbits and glows
- `PageFrame` — wrapper with header + main + footer

### Library / Data

- `lib/stock.ts` — Single source of truth: 70 vehicles (6 curated + 64 generated), leads (4), reservations (3), trade-ins (3), finance requests (3), sales (4), staff (4)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `lib/carImages.ts` — Image path mapping (potentially unused — stock.ts has its own imageSet)
- `lib/vehiclePdf.ts` — PDF generation for vehicle overview (uses jsPDF + QRCode)

### Contexts

- `ThemeContext.tsx` — Light/dark theme with localStorage (`document.documentElement.classList`)
- `LanguageContext.tsx` — EN/SW translation context with 100+ translation keys (LanguageToggle only rendered on System B pages)

### Hooks

- `useMobile.tsx` — Mobile breakpoint detection (768px)
- `usePersistFn.ts` — Persistent function reference
- `useComposition.ts` — IME composition handling

### Build System

- Vite 7, React 19, Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@import "tailwindcss"` + `@import "tw-animate-css"` in index.css
- `@theme inline` for custom font tokens
- No test files (0 tests in repo)
- `pnpm` workspace at root, `client/` is the app root

---

## 2. Page-by-Page UX Audit

### Home (`Home.tsx`)

- **Hero:** Uses `.original-hero` with dark navy background. H1 uses "Premium verified cars for Nairobi roads" in kinetic lockup with `#ff5961` red (not `var(--red)`). No H2 or trust bar visible.
- **Search deck:** Has search input with `aria-label="Search vehicles"` but no visible `<label>`. Make select has `aria-label="Filter by make"`.
- **Stat strip:** Shows 96% duty-paid, 48 hrs, KES, Nairobi — trust signals present.
- **Featured inventory:** 4 featured vehicles in grid (filtered, non-Reserved).
- **CTA section:** "Request the inspection file. We will show it." — vague microcopy per Plerdy audit.
- **Issues:** H1 split across spans (accessibility), no clear primary CTA hierarchy, "View details" CTA is small on cards, trust signals below the fold.

### Inventory (`Inventory.tsx`)

- **Header:** "Find the one that fits." — has typo risk ("Find the onethat fits." per Plerdy, currently has line break). Uses `section-kicker` + `<h1>`.
- **Make rail:** Horizontal scrollable make logo buttons with drag/swipe support. Has "All makes" button and dots indicator.
- **Filters:** Has compact dropdowns for Make, Status, Body, Max price. Also has a price-range-filter defined in CSS but not wired up in JSX.
- **Sort:** Dropdown with options including "Company: A-Z" (unusual sort).
- **View toggle:** Grid/list switch.
- **Results:** Shows count ("X units match your search").
- **Card:** Full VehicleCard component (shared).
- **Mobile:** Make rail collapses to block, filters stack.
- **Issues:** `useRoute` not used for params (uses `window.location.search` directly), no active filter chips, mobile filter drawer not implemented, list view has concatenated labels.

### Vehicle Detail (`VehicleDetail.tsx`)

- Gallery with main image + thumbnail strip, video card placeholder.
- Price section with drive-away price, finance note, breakdown toggle.
- Quick specs (grid), detail actions (WhatsApp, viewing, download PDF).
- Trust grid, full spec table, related vehicles.
- Scroll to top on `params?.id` change.
- **Issues:** No sticky purchase panel, video is a placeholder, no mobile sticky action bar, no reservation modal wired up in visible code.

### Dealer Dashboard (`DealerDashboard.tsx`)

- 8 views: overview, stock, leads, reservations, trade-ins, finance, sales, team.
- Uses AmbientBackground, Logo, StatusPill, ThemeToggle from SiteChrome.
- Sidebar navigation on desktop, collapsible on mobile.
- Data is static from `lib/stock.ts`.
- Uses `.dealer-*` CSS classes (solid surfaces with some glass).
- **Issues:** Some tables have glass surfaces (against MD guidance), sidebar has backdrop-filter.

### ServicePage (`ServicePage.tsx`)

- Handles finance, trade-in, diaspora, about, contact with content-driven approach.
- Uses `PageFrame`, `button`, `service-hero`, `service-orbit-card` CSS classes.
- Each type has eyebrow, title, intro, 3 actions, and a 3-step process.
- **Issues:** No language toggle, no `useTranslation`, hardcoded English content, no mobile sticky action bar.

### LegalTrust (`LegalTrust.tsx`)

- **Separate styling system:** Uses Tailwind utility classes directly
- Own header with nav links, own footer
- Uses `Logo` from Logo.tsx (different from SiteChrome Logo)
- Has `LanguageToggle` and `useTranslation`
- Light background (`#f8fafc`), dark text — completely different aesthetic from rest of site

### NotFound (`NotFound.tsx`)

- Uses Tailwind utility classes, centered card with backdrop-blur
- No SiteChrome chrome

### Dead Page Files (not routed)

- `About.tsx`, `Contact.tsx`, `Financing.tsx`, `TradeIn.tsx`, `Diaspora.tsx`
- These existed before ServicePage was created and still contain full implementations with their own chrome
- Should be removed or repurposed

---

## 3. Design-System Audit

### Color Tokens (CSS — `:root` in index.css:6-7)

```
Light:  --ink: #0a1728  --red: #d92f3d  --red-deep: #b92231  --paper: #edf3f6  --line: rgba(10,23,40,.13)  --muted: #667585  --surface: rgba(226,238,244,.70)  --glass-border: rgba(255,255,255,.84)  --primary: #d92f3d  --background: #edf3f6  --foreground: #0a1728
Dark:   --ink: #f5f6f2  --red: #f05a62  --red-deep: #d92f3d  --paper: #0b1523  --line: rgba(255,255,255,.13)  --muted: #95a4b4  --surface: rgba(17,31,48,.72)  --glass-border: rgba(255,255,255,.18)  --primary: #f05a62  --background: #0b1523  --foreground: #f5f6f2
```

### Missing from MD spec tokens

The MD recommends `--ink`, `--ink-2`, `--surface-solid`, `--text`, `--text-2`, `--text-3`, `--red`, `--red-hover`, `--gold`, `--green`, `--line`, `--line-strong`, `--glass`, `--glass-hover`. The current system has `--ink`, `--red`, `--red-deep` but no `--gold`, `--green`, `--red-hover`, `--surface-solid`, etc.

### Typography

- Sora (display): `font-display` variable, used for headings, vehicle names, prices
- DM Sans (body): `font-sans`, default body font
- EB Garamond (serif): `font-serif`, imported but used inconsistently (hero titles, detail headings, section headings)
- Font sizes are applied via many scattered CSS overrides, not a consistent scale

### Spacing

- No consistent spacing scale. Padding/margins are ad-hoc: 12px, 14px, 16px, 17px, 18px, 19px, 22px, 24px, 26px, 32px, 35px, etc.
- No CSS custom properties for spacing

### Radius

- `--radius: 1.1rem` defined but inconsistently applied
- Many hardcoded values: 5px, 8px, 9px, 10px, 11px, 12px, 13px, 14px, 15px, 16px, 18px, 20px, 21px, 22px, 23px, 24px, 26px, 27px, 28px, 29px, 32px

### Shadows

- `--shadow: 0 22px 70px rgba(10, 23, 40, .13)` — but most elements use their own hardcoded box-shadow values

### Button System

- `.button` base (999px radius, 46px height)
- `.button-red` (primary)
- `.button-dark`
- `.button-quiet` (secondary/ghost)
- `.button-outline`
- `.button.wide`
- SiteChrome has additional buttons: `.vehicle-whatsapp`, `.view-details`, `.dealer-login-button`, `.whatsapp-button`

### Form Controls

- Styled via shared CSS selectors (`.search-input-wrap input`, `.modal-card input`, `.select-wrap select`, etc.)
- No dedicated form control primitive component
- Some pages (LegalTrust, About, etc.) use Tailwind form classes

---

## 4. Technical Debt List

1. **842-line CSS file** with massive cascade-dependent overrides
2. **7 CSS comment sections** labeled "polish pass", "pass", etc. — each appends new overrides instead of consolidating
3. **Zero test files** — no regression safety net
4. **Two competing styling systems:** index.css (custom classes) vs Tailwind utility classes (LegalTrust, NotFound, About, Contact, Financing, TradeIn, Diaspora)
5. **Two Logo components:** SiteChrome.Logo (image-based) vs Logo.tsx (icon + wordmark)
6. **Two header systems:** `.site-header` (SiteChrome) vs Tailwind headers in dead page files
7. **Dead code:** 5 page files (About, Contact, Financing, TradeIn, Diaspora) not routed in App.tsx
8. **carImages.ts** may be unused (stock.ts has its own imageSet)
9. **LanguageContext** has 100+ translation keys but is only consumed on dead System B pages
10. **Hardcoded WhatsApp number** `254700000000` repeated across 8+ files
11. **Map.tsx** imports but no page uses `<MapView>`
12. **ManusDialog.tsx** imports but no page uses it
13. **`!important`** used in CSS (line 442: `border-bottom: 0 !important`)
14. **CSS `classna...` truncation:** VehicleDetail.tsx line 20 is extremely long (8.7KB on one line)

---

## 5. Component Duplication List

| Component              | Location                                                           | Used                                 | Notes                                                 |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------- |
| `Logo` (image badge)   | SiteChrome.tsx:9                                                   | All System A pages                   | `<img src={imageSet.brandMark} alt="Zara Cars logo">` |
| `Logo` (icon+wordmark) | Logo.tsx:20                                                        | Dead pages (LegalTrust, About, etc.) | Different aesthetic, Tailwind classes                 |
| `ThemeToggle`          | SiteChrome.tsx:13                                                  | System A only                        | Light/dark toggle                                     |
| `MakeBadge`            | SiteChrome.tsx:51                                                  | Inventory, VehicleCard               | Uses Simple Icons + inline style vars                 |
| `StatusPill`           | SiteChrome.tsx:58                                                  | VehicleCard, VehicleDetail           | Status colored pills                                  |
| `VehicleCard`          | SiteChrome.tsx:63                                                  | Home, Inventory                      | Full card component                                   |
| `SiteHeader`           | SiteChrome.tsx:26                                                  | PageFrame                            | Nav + mobile menu                                     |
| `Footer`               | SiteChrome.tsx:68                                                  | PageFrame                            | Site footer                                           |
| Header/nav             | LegalTrust, About, Contact, TradeIn, Financing                     | Dead pages                           | Tailwind classes                                      |
| Footer                 | LegalTrust, About, Contact, TradeIn, Financing, Diaspora           | Dead pages                           | Tailwind classes                                      |
| WhatsApp button        | Home.tsx, SiteChrome.tsx, Financing.tsx, TradeIn.tsx, Diaspora.tsx | Multiple                             | Different classes/styles                              |

---

## 6. CSS Duplication List

### `.site-header` — 8+ duplicate/override blocks (lines 31, 228, 267, 304, 442, 492-541, 657-677, 762-777)

Each "pass" or "polish" section redefines the header background, box-shadow, backdrop-filter, border, brand sizing.

### `.stock-capsule` — DUPLICATE DEFINITION

- Line 130: First definition (inline-flex, gap: 7px, padding: 4px 7px 4px 4px, border, background rgba(12,31,47,.68), box-shadow, backdrop-filter: blur(16px))
- Line 154: Second definition (display: flex, gap: 5px, flex-wrap: wrap) — overrides display/gap but leaves orphaned padding/border/background/backdrop-filter from line 130

### `.make-badge` — 3 duplicate blocks

- Line 215: Full definition (display, gap, b, small, .make-logo-button, .make-rail, etc.)
- Lines 729-731: Override (gap: 10px, b size, small size)
- Lines 823-828: Near-identical duplicate of 729-734 (same overrides)

### `.make-badge-svg` — 3 duplicate definitions

- Line 223: Width 22px, height 22px
- Line 732: Width 22px, height 22px (exact duplicate)
- Line 826: Width 22px, height 22px (exact duplicate)

### `.brand-mark` — 7+ definitions

Lines 34 (36px), 547 (44px), 667 (64px), 770 (64px), 744 (48px), 780 (76px), 833 (48px), 838 (52px), 697 (60px)

### `.brand-wordmark` — 8+ definitions

Various font sizes: 15px, 18px, 22px, 24px, 26px, 28px, 30px, 36px — scattered across multiple "pass" sections

### `.vehicle-card-body .eyebrow` — 3 definitions

- Line 143: font-size: 11px
- Line 708: font-size: 12px
- Line 800: font-size: 12px (exact duplicate of 708)

### `.vehicle-card-body h3` — 3 definitions

- Line 145: font-size: 21px
- Line 709: font-size: 22px
- Line 801: font-size: 22px (exact duplicate of 709)

### `.vehicle-price-row strong` — 3 definitions

- Line 152: font-size: 17px
- Line 714: font-size: 19px
- Line 806: font-size: 18px

### `.inventory-filters` — 4 definitions

- Line 176: Base definition (display, flex-wrap, gap, padding, border, background, box-shadow, backdrop-filter)
- Line 232: Override background + backdrop-filter
- Line 277: Override grid-template-columns
- Line 715: Override label font-size
- Line 809: Duplicate label font-size (exact duplicate of 715)

### `.metric-strip` — 5 definitions

- Line 109: Full definition
- Lines 705-707: Typography overrides (font-size, gap)
- Lines 815-816: Duplicate overrides (exact duplicate of 705-707)

### `.make-logo-button` — 3 definitions

- Line 215: Base (padding: 12px 20px, gap: 8px)
- Line 737: Override (padding: 9px 13px, gap: 9px)
- Line 829: Override (padding: 8px 12px, gap: 8px)

---

## 7. Hardcoded Colour List

### Red variants (should be unified to var(--red)):

| Hex       | Context                                                                        | Should be                |
| --------- | ------------------------------------------------------------------------------ | ------------------------ |
| `#d92f3d` | `:root --red`                                                                  | var(--red)               |
| `#d91e2a` | `.make-rail-all` active/hover, `.make-rail-dots` active, `.make-rail-hint` svg | var(--red)               |
| `#ff5961` | `.original-hero h1 span`, `.landing-chrome em`, `.original-hero-link`          | var(--red) or --red-deep |
| `#ff5a64` | dark `.view-details`, `.hero-kinetic-lockup span:nth-child(2)`                 | var(--red)               |
| `#b92231` | `var(--red-deep)` light                                                        | Keep as var(--red-deep)  |
| `#b5212a` | `.view-details:hover`                                                          | var(--red-deep)          |
| `#b91621` | Dead pages button hover                                                        | var(--red-deep)          |
| `#ff5a64` | Dark mode view-details                                                         | var(--red)               |
| `#ff7f87` | Dark mode price strong                                                         | var(--red)               |
| `#ff8990` | Dark mode section kicker                                                       | var(--red)               |

### Green (WhatsApp):

| `#25d366`, `#166534`, `#15803d`, `#f0fdf4` | WhatsApp buttons (hardcoded) | Should use `--green` token |

### Other hardcoded colors:

| Hex                                                                         | Count   | Context                                          |
| --------------------------------------------------------------------------- | ------- | ------------------------------------------------ |
| `#0b1f3a`                                                                   | ~25     | Dark navy (used in dead pages, some CSS, footer) |
| `#0a1728`                                                                   | Several | `--ink` light value                              |
| `#526273`                                                                   | 3+      | `.make-badge small` text                         |
| `#8b99a7`                                                                   | 2       | `.make-rail-all span`                            |
| `#bd1624`                                                                   | 2       | `.make-rail-all` hover text                      |
| `#c8d2d5`                                                                   | 2       | Gallery placeholder bg                           |
| `#5087a2`, `#1574a8`, `#6591aa`                                             | Several | Various blue accents                             |
| `#329961`                                                                   | 1       | `.verification-list svg`                         |
| `#daf1e1`, `#2e9760`                                                        | 2       | Modal success bg/text                            |
| `#f0fdf4`                                                                   | 1       | WhatsApp hover                                   |
| `#5d6b79`, `#768492`, `#748190`, `#7e8b98`, `#8995a0`, `#9aa5b1`, `#95a4b4` | Many    | Various muted text variants                      |

---

## 8. Glass Usage Map

### Glass on ALLOWED surfaces (per MD spec):

| Surface              | Line          | backdrop-filter                             |
| -------------------- | ------------- | ------------------------------------------- |
| `.site-header`       | 267, 304, 492 | blur(26px) saturate(1.25)                   |
| `.search-deck`       | 94, 229       | blur(26px) saturate(1.18)                   |
| `.modal-card`        | 183, 233      | blur(30px) saturate(1.18)                   |
| `.inventory-toolbar` | 176, 229      | blur(26px) saturate(1.18)                   |
| `.vehicle-card`      | 123, 229      | blur(22px) — questionable (mass, not modal) |

### Glass on DISALLOWED / questionable surfaces:

| Surface                    | Line     | Issue                                     |
| -------------------------- | -------- | ----------------------------------------- |
| `.vehicle-row`             | 176, 229 | Dense data row — should be solid          |
| `.gallery-shell`           | 181, 229 | Gallery shell — could be solid            |
| `.info-card`               | 182, 229 | Info card — could be solid                |
| `.spec-section`            | 182, 229 | Spec section — could be solid             |
| `.dealer-panel`            | 188, 229 | Dealer panel — should be solid            |
| `.stock-summary-row > div` | 229      | Dealer metric — should be solid           |
| `.dealer-sidebar`          | 188      | Operational UI — should be solid          |
| `.stock-capsule`           | 130      | Small badge — excessive                   |
| `.hero-vehicle-frame`      | 76       | Hero frame — acceptable with restraint    |
| `.make-logo-button`        | 215      | Button — questionable                     |
| `.context-label`           | 170      | Context label — questionable              |
| `.service-orbit-card`      | 198      | Feature card — acceptable                 |
| `.landing-chrome`          | 205      | Landing chrome — acceptable               |
| `.filter-compact select`   | 178      | Form control — questionable               |
| `.original-feature-card`   | 211      | Featured card — acceptable with restraint |
| `.original-save-button`    | 338      | Button — questionable                     |
| `.original-stock-tag`      | 337      | Small tag — questionable                  |

Total backdrop-filter usages: **40+ instances** across 30+ selectors

---

## 9. Accessibility Issues

### P0 (Critical)

1. **H1 fragmentation (Home):** `.hero-kinetic-lockup` uses multiple `<span>` children, breaking screen reader announcement. Plerdy confirms H1 reads as "CLICKCLICKDRIVE".
2. **Missing form labels:** Search inputs on Home and Inventory rely on `aria-label` only, no visible `<label>`.
3. **No visible `<label>` for filter selects:** Inventory make, status, body, price, sort selects have no associated labels.
4. **Vehicle card semantics:** VehicleCard wraps Link around image+badges only; price/specs/CTA are siblings inside `<article>`, breaking tab order per Plerdy.
5. **No skip links** on any page.

### High

6. **LegalTrust.tsx** has its own header/footer (duplicated chrome) — inconsistent navigation.
7. **No `lang` switching** despite LanguageContext supporting EN/SW.
8. **DealerDashboard table inputs** have no `<label>` elements.
9. **Row action buttons** (row-arrow) in dealer tables have no `aria-label`.
10. **StatusPill** uses color alone to convey status (no text/icon distinction).
11. **Gallery buttons** in VehicleDetail use `alt=""` (acceptable for decorative, but labels lack context).
12. **`prefers-reduced-motion`** handled in CSS but no JS animations (framer-motion is a dependency but unused).

### Medium

13. **EB Garamond** font loaded but `--font-serif` only declared at line 314 (near end of file).
14. **Color contrast** on some muted text against glass backgrounds may be insufficient.
15. **Small touch targets** on card CTAs (especially "View details" links).

---

## 10. Conversion Issues

1. **Hero headline doesn't communicate value:** "Premium verified cars for Nairobi roads" — MD wants "Verified cars. Clear decisions."
2. **Multiple competing CTAs:** Home has Browse, Sell/trade, Find my car — no clear primary.
3. **Trust signals below the fold:** Stat strip is below hero on Home.
4. **Small "View details" CTA:** Plerdy flags this as low-affordance.
5. **No per-card WhatsApp on listing cards:** Plerdy recommends per-card contact.
6. **Inventory header typo risk:** "Find the one that fits." — Plerdy notes "Find the onethat fits." typo occurred.
7. **Price not prominent enough:** Card prices use small font; MD wants larger price + monthly estimate.
8. **No active filter chips:** Users can't see what's filtered.
9. **No "Save search" affordance.**
10. **LegalTrust uses completely different visual system** — feels like a different site.
11. **No reservation flow visible** beyond alert dialogs in VehicleDetail.
12. **Financing calculator uses fake inputs** — not connected to actual vehicle pricing.

---

## 11. Proposed Migration Plan

### Phase 0 (this audit): READ ONLY ✓

### Phase 1 — Design System Foundation

- Define canonical CSS tokens matching the MD spec (add `--gold`, `--green`, `--red-hover`, `--text`, `--text-2`, etc.)
- Create `.glass-panel` primitive and `.glass-panel:hover` variant
- Create `.button` variants (primary, secondary, tertiary) — consolidate existing `.button-*` rules
- Create `.status-pill`, `.trust-badge` primitives
- Create form control primitives
- Add `--spacing-*` and `--radius-*` tokens

### Phase 2 — CSS Consolidation

- Merge 8+ `.site-header` definitions into ONE
- Merge `.stock-capsule` duplicate definitions
- Merge `.make-badge` triple definitions
- Merge `.brand-mark` / `.brand-wordmark` multiple definitions
- Merge `.vehicle-card-body` typography duplicate blocks (lines 143, 708, 800 and equivalents)
- Merge `.inventory-filters` definitions
- Merge `.metric-strip` definitions
- Merge `.make-logo-button` definitions
- Replace hardcoded colors with CSS variables
- Remove `.dark` duplication where possible
- Consolidate `backdrop-filter` to allowed surfaces only

### Phase 3 — Global Chrome

- Remove dead page files (About, Contact, Financing, TradeIn, Diaspora — superseded by ServicePage)
- Route `/legal` through PageFrame (restyle LegalTrust to use SiteChrome)
- Update NotFound to use SiteChrome theme
- Unify header/footer across all public pages

### Phase 4 — Home

- Replace hero headline with "Verified cars. Clear decisions."
- Add trust bar near hero
- Add Zara Standard component
- Implement clear CTA hierarchy
- Apply restrained Liquid Glass

### Phase 5 — Inventory

- Add active filter chips
- Make VehicleCard a semantic full-card link
- Increase price prominence
- Add monthly estimate to cards
- Mobile filter drawer

### Phase 6 — Vehicle Detail

- Sticky purchase panel with glass
- Strong CTA hierarchy (Reserve, WhatsApp, View)
- Add Zara Standard/Verification experience
- Mobile sticky action bar

### Phase 7 — Finance / Trade-in / Diaspora

- Unify styling via ServicePage/PageFrame
- Add calculator with visible values
- Add diaspora timeline

### Phase 8 — About / Contact / Legal / Services

- Route all through PageFrame/SiteChrome
- Remove dead code files

### Phase 9 — Accessibility

- Fix H1 hierarchy, form labels, aria-labels
- Semantic cards, keyboard navigation
- Focus states, reduced motion

### Phase 10 — Responsive QA

- Verify all breakpoints

### Phase 11 — Visual QA

- Final polish pass per checklist
