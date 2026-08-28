## Objective

- Implement the ZARA-CARS-PREMIUM-REDESIGN.md plan across all 11 phases

## Important Details

- `client/src/index.css`: ~1035 lines, Tailwind CSS v4 (`@import "tailwindcss"`), single stylesheet
- Design tokens: `--ink`, `--red`, `--red-deep`, `--primary` for light/dark; `--gold`, `--green`, `--red-hover`, `--text` family, `--glass`, `--glass-border`, `--surface-solid`, `--paper`, `--background`
- Zero test files; `pnpm` workspace at root, `client/` is app root
- MD spec: deep ink `#0A1728`, Zara red `#d92f3d`, gold `#c9a24b`, green `#49b982`

## Work State — ALL 11 PHASES COMPLETE

### Completed (all phases)

- **Phase 0**: Architecture audit → `client/PHASE-0-ARCHITECTURE-AUDIT.md`
- **Phase 1**: Design tokens (`:root`/`.dark`), primitives (`.glass-panel`, `.btn*`, `.form-control*`, `.status-badge*`, `.trust-badge*`, `.page-container`, `.section-heading`/`section-kicker`), `@theme inline` consolidation
- **Phase 2**: CSS consolidation — merged `.stock-capsule` 3→1, `.make-badge` 3→1, `.make-badge-svg` 3→1; unified all reds (`#d91e2a`, `#ff5961`, `#ff5a64`) → `var(--red)`; replaced `#0b1f3a` backgrounds with `var(--surface-solid)`; replaced grayscale text colors with `var(--text-2)`/`var(--text-3)`
- **Phase 3**: Removed dead pages (About, Contact, Financing, TradeIn, Diaspora, Logo.tsx); rewrote LegalTrust & NotFound with PageFrame; exported WhatsAppButton + LanguageToggle from SiteChrome; added phone link to header
- **Phase 4**: Home hero `red-line` on "Premium", StatStrip CSS variables, Zara Standard trust grid, landing-chrome LanguageToggle
- **Phase 5**: Inventory `red-line` heading, `aria-label` on clear-filters/sort
- **Phase 6**: VehicleDetail modal `role="dialog"`, gallery thumbnail aria-labels, form input id/htmlFor, related car alt texts
- **Phase 7**: ServicePage color unification (`#ff9ca1` → `var(--red)`), base CSS for service-grid/steps/CTA, hero-wash gradient fix
- **Phase 8**: All pages use PageFrame + SiteChrome unified chrome
- **Phase 9**: Accessibility pass — modal ARIA, profile avatar aria-labels, notification/search aria-labels, form labels
- **Phase 10**: Responsive QA — `.page-container` in mobile media query, Zara Standard grid responsive, trust-cta-row mobile
- **Phase 11**: Visual polish — price `var(--font-serif)`, dark mode for Zara Standard section, gold/amber color token unification, WhatsAppButton CSS

### Key files modified

- `client/src/index.css` — tokens, primitives, consolidation, dark mode
- `client/src/components/SiteChrome.tsx` — WhatsAppButton export, LanguageToggle, phone link, header restructure
- `client/src/pages/Home.tsx` — removed dead pages, red-line hero, Zara Standard grid
- `client/src/pages/LegalTrust.tsx` — full rewrite using PageFrame
- `client/src/pages/NotFound.tsx` — full rewrite using PageFrame
- `client/src/pages/VehicleDetail.tsx` — accessibility improvements
- `client/src/pages/Inventory.tsx` — red-line, aria-labels
- `client/src/pages/DealerDashboard.tsx` — modal ARIA, avatar aria-labels, search aria-label

### Deleted files (dead code)

- `client/src/pages/About.tsx`, `Contact.tsx`, `Financing.tsx`, `TradeIn.tsx`, `Diaspora.tsx` (routed via ServicePage)
- `client/src/components/Logo.tsx` (replaced by SiteChrome's Logo export)

### Verification

- `npx vite build` — PASS
- `npx tsc --noEmit` — PASS

## Relevant Files

- `client/src/App.tsx` — route definitions (ServicePage for /financing, /trade-in, /diaspora, /about, /contact; LegalTrust for /legal; NotFound catch-all)
- `client/src/components/SiteChrome.tsx` — unified component library exports
- `client/src/pages/ServicePage.tsx` — unified page for finance/trade-in/diaspora/about/contact
- `client/src/lib/stock.ts` — single source of truth for vehicles, leads, reservations, trade-ins, finance, sales, staff
- `client/tsconfig.json` — path alias `@/`
- `client/PHASE-0-ARCHITECTURE-AUDIT.md` — Phase 0 audit deliverable
- `client/ZARA-CARS-PREMIUM-REDESIGN.md` — full 11-phase redesign spec (read only)
