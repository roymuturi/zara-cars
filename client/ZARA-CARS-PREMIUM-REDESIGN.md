# Zara Cars — Premium "Liquid Showroom" Redesign Brief for Kilo CLI

> **Purpose:** This document is the implementation brief for redesigning the Zara Cars website into a premium automotive digital showroom while preserving existing business logic, routes, inventory functionality, and real content.
>
> **Repository:** https://github.com/roymuturi/zara-cars
>
> **Live site:** https://zara-cars.pages.dev/
>
> **Design direction:** Premium automotive editorial + restrained Liquid Glass / frosted glass.
>
> **Important:** This is NOT a request to make every component glassy. The desired result is **quietly expensive, cinematic, trustworthy, highly usable, and conversion-focused**.

---

## 0. NON-NEGOTIABLE EXECUTION RULES

### Do not do this

- Do not blindly redesign the entire application in one pass.
- Do not rewrite business logic unnecessarily.
- Do not invent vehicle information, prices, policies, trust claims, financing terms, or functionality.
- Do not create a new visual pattern every time a page needs something.
- Do not append endless CSS overrides.
- Do not use `!important` as a design-system fix.
- Do not make every surface translucent.
- Do not make every component rounded/pill-shaped.
- Do not use excessive glow, gradients, animation, blur, or decorative effects.
- Do not replace Sora + DM Sans with another typography system.
- Do not turn the dealership into a generic SaaS dashboard.
- Do not sacrifice accessibility or conversion clarity for aesthetics.
- Do not break URL/query-string behaviour, inventory filtering, WhatsApp flows, forms, or existing routes.

### Core philosophy

> **Premium means restraint, not decoration.**

The cars, photography, price, verification, and buying journey must remain the visual and UX priorities.

---

# 1. PRODUCT / BRAND NORTH STAR

## Desired product feeling

Zara Cars should feel like:

- a premium digital automotive showroom
- cinematic but calm
- trustworthy
- precise
- modern African/Kenyan without resorting to clichés
- expensive without looking ostentatious
- transparent rather than salesy
- highly polished
- extremely easy to navigate

### Design metaphor

Think:

> **A premium automotive showroom made from deep navy space, automotive photography, subtle light, brushed-metal accents, and carefully controlled glass surfaces.**

Call this design language:

# ZARA CARS — LIQUID SHOWROOM

---

# 2. BRAND POSITIONING

The core proposition should be communicated quickly:

> **Verified cars. Clear decisions.**

Supporting proposition:

> Premium, inspected vehicles with transparent drive-away pricing. Browse available stock, reserve online, or talk to a Zara Cars specialist.

Keep the existing phrase:

> **CLICK. CLICK. DRIVE.**

but use it as a secondary brand signature rather than the main H1.

Do NOT make the main hero headline cryptic.

---

# 3. UX PRIORITIES

Every page should reinforce this funnel:

```text
LANDING
   ↓
UNDERSTAND ZARA CARS
   ↓
SEARCH / BROWSE
   ↓
INVENTORY
   ↓
VEHICLE DETAIL
   ↓
TRUST / VERIFICATION
   ↓
PRICE / FINANCE
   ↓
RESERVE / WHATSAPP / VIEWING
   ↓
LEAD / PURCHASE
```

Secondary funnels:

```text
TRADE-IN
   ↓
VALUATION
   ↓
USE VALUE TOWARD PURCHASE
```

```text
FINANCE
   ↓
AFFORDABILITY
   ↓
VEHICLE
   ↓
ENQUIRY
```

```text
DIASPORA
   ↓
REMOTE VERIFICATION
   ↓
RESERVATION
   ↓
PAYMENT / CLEARING / DELIVERY
```

---

# 4. DESIGN SYSTEM

## 4.1 Typography

Keep:

- **Sora** — display headings, vehicle names, prices, major statements
- **DM Sans** — body, labels, forms, metadata, navigation

Do not add more font families unless there is an explicit, documented reason.

Remove unused font imports.

Typography should be:

- bold but not oversized everywhere
- highly legible
- generous in line-height
- carefully contrasted
- consistent across all pages

---

# 5. COLOUR SYSTEM

The existing navy/red identity is strong. Unify it rather than replacing it.

Use a single source of truth.

Recommended tokens:

```css
:root {
  --ink: #07111F;
  --ink-2: #0D1B2A;
  --surface-solid: #16233A;

  --text: #F4F6F8;
  --text-2: #B4BEC9;
  --text-3: #748190;

  --red: #D92F3D;
  --red-hover: #B92331;

  --gold: #C9A24B;

  --green: #49B982;

  --line: rgba(255,255,255,.12);
  --line-strong: rgba(255,255,255,.18);

  --glass: rgba(255,255,255,.055);
  --glass-hover: rgba(255,255,255,.085);
}
```

## Colour rules

### Navy

Primary environment.

### Red

Primary action colour.

Use for:

- primary CTA
- active action
- key interactive emphasis

There should be ONE primary Zara red.

Do not maintain competing values such as multiple near-identical reds.

### Gold

Use extremely sparingly.

Gold means:

- Verified
- Premium
- Exceptional
- Special selection

Do NOT use gold for every CTA, heading, border, icon, and badge.

### Green

Use for:

- verified/success
- operational success
- confirmed states

### Text

Prefer off-white rather than pure white.

Prefer near-black/deep navy rather than pure black.

---

# 6. LIQUID GLASS SYSTEM

## The most important rule

> **Glass is a foreground material, not the background of the entire website.**

When everything is glass, nothing feels special.

## Glass is allowed on

1. Global header
2. Hero search deck
3. Selected featured vehicle surfaces
4. Modal
5. Vehicle-detail sticky purchase panel
6. Floating/mobile action surfaces

Potentially:

- small floating utility controls

## Glass is NOT allowed on dense operational UI

Use solid/near-solid surfaces for:

- dealer dashboard rows
- stock tables
- lead rows
- finance tables
- trade-in tables
- dense data grids
- dense forms
- operational reporting

---

## 6.1 Primary glass recipe

Create one reusable `GlassPanel` / equivalent primitive.

```css
.glass-panel {
  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.085),
      rgba(255,255,255,.035)
    );

  border: 1px solid rgba(255,255,255,.12);

  box-shadow:
    0 24px 80px rgba(0,0,0,.28),
    inset 0 1px 0 rgba(255,255,255,.08);

  backdrop-filter: blur(24px) saturate(130%);
  -webkit-backdrop-filter: blur(24px) saturate(130%);
}
```

Hover:

```css
.glass-panel:hover {
  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.11),
      rgba(255,255,255,.045)
    );

  border-color: rgba(255,255,255,.18);
}
```

Use this as a starting point, not a requirement to copy blindly.

## Specular highlight

A subtle inner highlight may be used:

```css
.glass-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;

  background:
    linear-gradient(
      115deg,
      rgba(255,255,255,.10),
      transparent 30%
    );

  opacity: .6;
}
```

Do not allow the highlight to become visually obvious.

## Glass hierarchy

```text
BACKGROUND
  ↓
solid dark environment
  ↓
photography / ambient light
  ↓
glass surface
  ↓
content
  ↓
CTA
```

Light should appear to exist **behind** the glass, not be painted onto every card.

---

# 7. AMBIENT LIGHT / BACKGROUND

Existing ambient/orbit concepts can remain, but reduce them substantially.

Use:

- very soft red ambient light
- very soft cool/blue ambient light
- subtle radial gradients
- deep navy background

Avoid:

- obvious glowing circles
- bright neon blobs
- strong animated borders
- excessive orbit lines
- moving backgrounds that compete with vehicle photography

The user should feel the atmosphere before noticing the effect.

---

# 8. GEOMETRY

Use controlled radii.

Recommended starting system:

```text
Small controls:     10–12px
Inputs:             12–14px
Buttons:            12–14px
Cards:              18px
Large panels:       24–28px
Hero imagery:       24px
Modals:             24px
```

Pills are reserved for:

- status badges
- filter chips
- compact tags

Do not make the entire website pill-shaped.

---

# 9. MOTION SYSTEM

Motion must be calm and intentional.

### Micro

150–200ms

- buttons
- icons
- filters

### Component

250–350ms

- cards
- panels
- menus

### Cinematic

600–900ms

- hero imagery
- major page entrance

Avoid continuous floating/bouncing effects.

The vehicle photograph should be the primary animation.

Suggested hero entrance:

```text
vehicle image:
1.02 scale → 1.00

headline:
fade + 8–12px vertical movement

search panel:
fade + 12px vertical movement

then stop.
```

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 10. GLOBAL SITE CHROME

Create ONE consistent public-facing chrome system.

Use the existing `SiteChrome` as the source of truth where possible.

All public pages must feel like one application:

- Home
- Inventory
- Vehicle Detail
- Financing
- Trade-in
- Diaspora
- About
- Contact
- Legal & Trust
- Services

Shared:

- logo
- header
- navigation
- theme controls
- mobile navigation
- page container
- buttons
- footer
- WhatsApp action
- typography
- spacing
- colour tokens

Remove duplicated page-specific headers/footers where they reproduce the same global functionality.

A user must never feel they navigated into a different website.

---

# 11. HOME PAGE REDESIGN

## Hero

Replace the current cryptic primary headline with:

# Verified cars.
# Clear decisions.

Supporting copy:

> Premium, inspected vehicles with transparent drive-away pricing. Browse available stock, reserve online, or talk to a Zara Cars specialist.

Primary:

> **Browse available cars**

Secondary:

> **Sell or trade in**

Trust line:

```text
✓ Verified paperwork
✓ Drive-away pricing
✓ 48-hour reservation
```

Secondary brand signature:

> CLICK. CLICK. DRIVE.

## Hero composition

Use:

- one strong vehicle image
- cinematic crop
- dark navy environment
- subtle ambient light
- minimal glass
- restrained search panel

Do not animate everything.

## Suggested structure

```text
ZARA CARS
Navigation

Verified cars.
Clear decisions.

Supporting copy

[ Browse available cars ]
[ Sell or trade in ]

✓ Verified paperwork
✓ Drive-away pricing
✓ 48-hour reservation

[ Search make, model, stock... ] [ Find ]

Featured vehicle imagery
```

Then:

1. trust metrics
2. featured vehicles
3. Zara Standard
4. why Zara Cars
5. trade-in/finance paths
6. final CTA

---

# 12. ZARA STANDARD

Elevate the trust proposition into a branded component.

## The Zara Standard

```text
01 — Paperwork verified
02 — Condition inspected
03 — Duty / clearing explained
04 — Drive-away price confirmed
```

Supporting idea:

> No mystery costs. No mystery condition.

Do not invent claims beyond what the actual business supports.

This section should be visually premium and highly scannable.

---

# 13. INVENTORY PAGE

The inventory page is one of the most commercially important pages.

Preserve:

- search
- make filtering
- status filtering
- body type
- price range
- sorting
- grid/list
- URL query parameters
- existing inventory data

Improve:

- hierarchy
- filtering
- card design
- price prominence
- trust
- CTA visibility
- accessibility
- mobile filtering

---

## Inventory header

Use:

```text
Find your next car.

Browse verified stock with transparent pricing.

[ Search by make, model, stock... ]

24 cars available
```

Do not use a typo such as:

> Find the onethat fits.

---

## Filter system

Desktop:

```text
Make
Body type
Price
Mileage
Year
Fuel
Transmission
Status
```

Use a sticky top bar or persistent left rail depending on available layout.

Show active filters:

```text
Toyota ×
SUV ×
KES 3M–5M ×

Clear all filters
```

Show:

> 24 cars matching your search

Consider:

> Save search

if the existing product architecture can support it cleanly.

---

# 14. VEHICLE CARD

The vehicle is the product. Photography should dominate.

Recommended hierarchy:

```text
IMAGE

READY TO VIEW · ZC-0194
LAVINGTON

2021 Toyota Harrier

2.0L Hybrid · Automatic · 68,000 km

KES 4,850,000
From KES 89,000/mo

View vehicle →
```

Optional:

```text
WhatsApp
```

## Critical fixes

Do not allow labels to concatenate:

Bad:

```text
Ready to viewZC-0194Lavington
```

Good:

```text
READY TO VIEW
ZC-0194
LAVINGTON
```

or:

```text
READY TO VIEW · ZC-0194 · LAVINGTON
```

## Card semantics

Make the entire vehicle card clickable where appropriate.

Use proper semantic HTML:

- `article`
- heading
- link

Avoid making visually important cards behave like non-semantic divs.

## Hover

Subtle:

- image scale 1–2%
- border becomes slightly brighter
- arrow appears or shifts
- no excessive glow

---

# 15. CARD CTA HIERARCHY

Primary:

> **View vehicle**

Secondary:

> **WhatsApp**

Optional:

> **Reserve**

Do not give four or five equal visual CTAs.

The Plerdy audit recommends stronger card-level CTAs, per-card contact actions, prominent pricing, trust badges, and clearer reservation affordances. Preserve these recommendations during implementation.

---

# 16. VEHICLE DETAIL PAGE

This should be the strongest page in the entire site.

Desired feeling:

> premium automotive product page

Think:

- Porsche editorial
- Apple product-page clarity
- luxury dealership trust

Do not copy another brand's visual identity.

---

## Desktop structure

```text
← Inventory

┌──────────────────────────────┬───────────────────────────┐
│                              │ READY TO VIEW             │
│                              │                           │
│                              │ 2021 TOYOTA HARRIER       │
│        LARGE GALLERY         │                           │
│                              │ KES 4,850,000             │
│                              │                           │
│                              │ From KES XX,XXX/mo        │
│                              │                           │
│                              │ [ Reserve this car ]      │
│                              │ [ WhatsApp specialist ]   │
│                              │ [ Book a viewing ]        │
└──────────────────────────────┴───────────────────────────┘
```

The purchase panel may use glass.

The rest of the page should use solid or restrained surfaces.

---

## Vehicle detail sections

1. Gallery
2. Price / purchase panel
3. Key specifications
4. Why this car
5. Zara Standard / verification
6. Condition report
7. Full specifications
8. What's included
9. Finance
10. Similar vehicles

---

# 17. VEHICLE TRUST / VERIFICATION

Create a clear verification experience.

Example:

```text
ZARA VERIFIED

01 Paperwork
Verified

02 Condition
Inspected

03 Pricing
Transparent

04 Availability
Ready to view
```

Do not claim verification that is not actually performed.

---

# 18. VEHICLE REPORT

If supported by the existing business/data model, introduce:

> **Download vehicle report**

Possible report contents:

- inspection
- condition
- paperwork
- mileage
- auction sheet
- duty/clearing information
- pricing breakdown

Do not fabricate any fields that do not exist.

If email capture is added, keep it lightweight and explain why the email is required.

---

# 19. RESERVATION

Promote the existing reservation concept.

Where business rules support it:

> **Reserve for 48 hours**

Explain:

- what reservation means
- what happens after reservation
- whether payment is required
- whether reservation is refundable
- how the buyer is contacted

Do not invent policy details.

---

# 20. WHATSAPP

WhatsApp is an important conversion channel and should remain prominent.

Per vehicle, generate contextual messages such as:

> Hi Zara Cars, I'm interested in the 2021 Toyota Harrier — ZC-0214.

Use:

> **WhatsApp a specialist**

rather than generic “Chat”.

On mobile, consider a persistent action bar:

```text
[ WhatsApp ] [ Reserve ]
```

On other pages:

```text
[ WhatsApp ] [ Call ] [ Browse stock ]
```

Do not let the floating WhatsApp control obscure content or accessibility controls.

---

# 21. FINANCING PAGE

The financing page should feel integrated with Zara Cars, not like a separate application.

Use one global header/footer.

Recommended hero:

# Finance your next car.

> Explore indicative monthly payments and connect with the Zara Cars team for available financing options.

Calculator:

```text
CAR PRICE
KES 4,500,000

DEPOSIT
KES 900,000

TERM
48 months

────────────────────

ESTIMATED MONTHLY
KES XX,XXX

[ Explore financing options ]
```

Use sliders where useful, but always show visible numeric values.

Explicitly label every control.

Do not present an indicative calculation as a guaranteed loan offer.

Preserve actual finance logic/data.

---

# 22. TRADE-IN PAGE

Turn the form into a progressive valuation experience if technically appropriate.

Suggested sequence:

```text
01 Vehicle
02 Mileage
03 Condition
04 Photos
05 Contact
06 Estimate / next step
```

Then:

> Estimated market range

Only show an actual valuation if the underlying system supports it.

Otherwise:

> Request your valuation

Then:

> Use your trade-in value toward your next Zara Cars vehicle.

---

# 23. DIASPORA PAGE

This is a high-trust journey.

Hero:

# Buy your next car in Kenya — from anywhere.

Then a simple timeline:

```text
01 Choose
02 Verify
03 Reserve
04 Clear
05 Deliver
```

Explain the real process clearly.

Emphasize:

- remote communication
- verification
- paperwork
- payment process
- clearing
- delivery

Do not invent operational promises.

---

# 24. ABOUT PAGE

Use an editorial structure rather than a generic card grid.

Suggested:

```text
Our story

The problem we wanted to solve

Our standard

How we verify

The people

The showroom

Why Zara Cars
```

Keep the locally grounded story about the market relying on:

- WhatsApp forwards
- Facebook screenshots
- yard visits

if it accurately reflects the existing content.

The goal is to position Zara Cars as:

> a more transparent, structured way to buy a vehicle.

---

# 25. CONTACT PAGE

Make physical showroom conversion obvious.

Primary:

> **Book a visit**

Secondary:

> WhatsApp
> Call
> Directions

Keep actual location/contact information unchanged unless explicitly updated from source data.

---

# 26. LEGAL & TRUST

Do not hide trust only inside the Legal page.

Keep the full Legal & Trust page.

Also surface concise trust cues throughout the buying journey.

Potential global language:

> Verified by design.

Use only claims supported by actual business operations.

---

# 27. DEALER DASHBOARD

The dashboard is operational UI.

It should NOT receive the same glass treatment as the marketing site.

Use:

- solid surfaces
- crisp rows
- strong contrast
- compact spacing
- clear status colours
- readable tables

Glass may be used for high-level floating controls, but dense data remains solid.

---

# 28. ACCESSIBILITY — P0

Perform a complete accessibility pass.

Minimum requirements:

- clear H1 hierarchy
- explicit form labels
- useful `aria-label`s
- semantic headings
- semantic links/buttons
- visible keyboard focus
- keyboard navigation
- accessible modals
- Escape key handling
- focus trapping where appropriate
- sufficient colour contrast
- sufficiently large tap targets
- labelled sliders
- visible slider values
- accessible select controls
- meaningful link names
- reduced-motion support

Example:

```tsx
<label htmlFor="inventory-search">
  Search inventory
</label>

<input
  id="inventory-search"
  placeholder="Search by model, location or stock"
/>
```

Do not rely on placeholder text as the only label.

---

# 29. RESPONSIVE DESIGN

Do not simply collapse desktop into mobile.

Design mobile deliberately.

Target:

- 1440px
- 1280px
- 1024px
- 768px
- 390px
- 360px

Mobile priorities:

1. vehicle imagery
2. vehicle name
3. price
4. key specs
5. WhatsApp
6. reserve
7. browse/filter

Consider a mobile sticky action bar.

Vehicle detail:

```text
┌──────────────────────────────┐
│ WhatsApp       Reserve       │
└──────────────────────────────┘
```

Ensure it does not cover page content.

---

# 30. BUTTON SYSTEM

Create one consistent button system.

## Primary

Zara red.

Use for:

- Browse available cars
- Reserve
- Submit lead
- primary conversion

## Secondary

Transparent/outlined or subdued surface.

Use for:

- Sell/trade in
- Finance
- secondary navigation

## Tertiary

Text/ghost.

Use for:

- low-priority navigation
- utility actions

Button copy should be action-oriented:

Prefer:

- Browse available stock
- View vehicle
- Reserve this car
- WhatsApp a specialist
- Book a viewing
- Request vehicle file

Avoid vague:

- Click here
- Learn more everywhere
- View unit when “View vehicle” is clearer

---

# 31. SEARCH / FORM SYSTEM

Every field must have:

- visible label
- useful placeholder
- clear focus state
- validation
- error message
- success message where applicable

Example:

```text
Search inventory
[ Search by model, location or registration ]

No results:
No vehicles match those filters.
[ Clear all filters ]
```

---

# 32. CSS ARCHITECTURE CLEANUP

This is a critical technical task.

Before visual redesign:

1. Find duplicated selectors.
2. Merge duplicate selector definitions.
3. Preserve the effective final visual behaviour when consolidating.
4. Remove obsolete overrides.
5. Replace repeated hardcoded colours with tokens.
6. Remove redundant near-identical red values.
7. Consolidate glass rules.
8. Reduce unnecessary `.dark` duplication.
9. Keep one canonical definition for each component.
10. Do not increase specificity merely to make the new design work.

The existing stylesheet has accumulated repeated/overriding rules. Fix the architecture rather than adding another layer.

After cleanup, produce a short diff summary:

```text
Selectors merged:
...

Lines removed:
...

Colours unified:
...

Glass surfaces consolidated:
...
```

---

# 33. DESIGN TOKENS / COMPONENT PRIMITIVES

Create/reuse primitives for:

```text
Button
GlassPanel
StatusBadge
SectionHeading
VehicleCard
PriceDisplay
TrustBadge
SearchField
FilterChip
PageHeader
SiteHeader
SiteFooter
MobileActionBar
Modal
```

Before creating a new component, check whether an existing primitive can be extended.

Do not create:

```text
PremiumButton
LuxuryButton
FancyButton
GlassButton2
HeroButtonFinal
```

if one Button system can handle variants.

---

# 34. PAGE CONTAINER / SPACING

Use one layout system.

Recommended conceptual scale:

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
```

Large sections should have generous whitespace.

Do not independently invent padding values on every page.

---

# 35. IMAGE DIRECTION

Vehicle photography is the primary visual asset.

Prioritize:

- clean cropping
- consistent aspect ratios
- large imagery
- high-resolution images
- subtle image transitions
- dark overlays only when necessary for readability

Do not place excessive UI over the car.

The car should remain recognizable and desirable.

---

# 36. PREMIUM ≠ MORE EFFECTS

Before adding any effect ask:

> Does this improve hierarchy, depth, trust, or interaction?

If no:

**Do not add it.**

Avoid:

- excessive glow
- excessive blur
- animated particles
- floating objects everywhere
- decorative rings
- multiple gradients competing
- giant shadows
- unnecessary 3D effects

---

# 37. CONVERSION PRINCIPLES

Every page should answer:

1. What is Zara Cars?
2. What is available?
3. Why should I trust it?
4. What does it cost?
5. What can I do next?

The primary action should be visually obvious.

Do not make:

```text
Browse
Finance
Trade-in
Contact
WhatsApp
Reserve
Book
Learn more
```

all equally dominant.

---

# 38. TRUST HIERARCHY

Trust signals should be visible near decision points.

Examples:

```text
Verified
Duty paid
Ready to view
Inspection
Drive-away pricing
48-hour reservation
```

Only display claims supported by the actual system/business.

Trust should appear:

- hero
- inventory
- vehicle detail
- reservation
- finance/trade-in
- footer

---

# 39. AB TEST IDEAS

If analytics are available, test:

### Test 1 — Hero

A:
Current/brand-led headline

B:
Verified cars. Clear decisions.

Measure:

- inventory clicks
- WhatsApp clicks
- vehicle-detail clicks

### Test 2 — Card CTA

A:
View vehicle

B:
View vehicle + WhatsApp

Measure:

- detail CTR
- WhatsApp starts

### Test 3 — Price prominence

A:
Current price treatment

B:
Large price + monthly estimate

Measure:

- detail CTR
- enquiry starts

### Test 4 — Trust bar

A:
Current trust presentation

B:
Trust bar immediately below hero

Measure:

- reservation conversion
- WhatsApp conversion

Do not implement analytics/A-B infrastructure unless it already exists or is explicitly requested.

---

# 40. IMPLEMENTATION PHASES

## PHASE 0 — READ ONLY / ARCHITECTURE AUDIT

**Do not modify files.**

Inspect the entire repository.

Audit:

- routes
- pages
- components
- contexts
- hooks
- lib
- CSS
- Tailwind
- theme system
- forms
- inventory
- vehicle detail
- finance
- trade-in
- diaspora
- about
- contact
- legal
- services
- dashboard
- modals
- mobile behaviour

Produce:

1. architecture map
2. page-by-page UX audit
3. design-system audit
4. technical debt list
5. component duplication list
6. CSS duplication list
7. hardcoded colour list
8. glass usage map
9. accessibility issues
10. conversion issues
11. proposed migration plan

Do not implement yet.

---

# 41. PHASE 1 — DESIGN SYSTEM FOUNDATION

Implement only:

- colour tokens
- typography tokens
- spacing
- radius
- shadows
- glass material
- button variants
- form controls
- status badges
- core component primitives

Do not redesign all pages yet.

Do not change business logic.

Remove obsolete styles instead of overriding them.

---

# 42. PHASE 2 — CSS CONSOLIDATION

Clean:

`client/src/index.css`

Tasks:

- merge duplicate selectors
- remove obsolete overrides
- unify colours
- unify glass
- unify dark mode
- remove unused font imports
- reduce unnecessary specificity
- preserve intended behaviour

Do not redesign page layouts during this phase unless necessary to make the new design tokens work.

---

# 43. PHASE 3 — GLOBAL CHROME

Unify:

- SiteChrome
- header
- navigation
- footer
- mobile navigation
- theme
- global CTA treatment

Remove duplicate headers/footers from individual pages.

Verify every public route.

---

# 44. PHASE 4 — HOME

Implement the new:

> Verified cars. Clear decisions.

hero.

Then:

- search deck
- trust bar
- featured stock
- Zara Standard
- why Zara Cars
- finance/trade-in paths
- final CTA

Use restrained Liquid Glass.

---

# 45. PHASE 5 — INVENTORY

Implement:

- improved filtering
- active chips
- result count
- clear filters
- stronger card hierarchy
- large price
- monthly estimate
- WhatsApp action
- full-card link semantics
- mobile filter drawer

Preserve existing filter/query logic.

---

# 46. PHASE 6 — VEHICLE DETAIL

Implement:

- cinematic gallery
- sticky purchase panel
- price hierarchy
- trust/verification
- Zara Standard
- report access if supported
- reservation CTA
- WhatsApp
- booking
- specifications
- related vehicles
- mobile sticky actions

This is the highest-priority conversion page.

---

# 47. PHASE 7 — FINANCE / TRADE-IN / DIASPORA

Unify visual language.

Finance:

- calculator
- visible values
- clear CTA

Trade-in:

- progressive flow where appropriate

Diaspora:

- remote buying timeline
- trust-first content

Preserve business logic.

---

# 48. PHASE 8 — ABOUT / CONTACT / LEGAL / SERVICES

Convert all pages to the same design system.

Do not make them feel like separate templates.

---

# 49. PHASE 9 — ACCESSIBILITY

Run a dedicated pass after visual implementation.

Check:

- keyboard
- focus
- screen-reader semantics
- labels
- ARIA
- contrast
- touch targets
- modals
- sliders
- reduced motion

---

# 50. PHASE 10 — RESPONSIVE QA

Check every route at:

```text
1440
1280
1024
768
390
360
```

Check:

- overflow
- clipping
- image crops
- sticky elements
- mobile navigation
- buttons
- forms
- modals
- cards
- filter drawers
- typography

---

# 51. PHASE 11 — VISUAL QA

For every route ask:

### Brand

Does it feel like Zara Cars?

### Premium

Is the design restrained?

### Glass

Is glass being used only where it creates depth?

### Typography

Is hierarchy obvious?

### Vehicle

Is the car the visual focus?

### Price

Can I find the price immediately?

### Trust

Can I understand why I should trust the seller?

### CTA

Can I tell what to do next?

### Mobile

Does the mobile experience feel intentionally designed?

---

# 52. KILO AGENT RULES

Add these principles to project-level instructions/custom agent rules:

```text
ZARA CARS DESIGN RULES

1. Premium means restraint, not decoration.
2. Glass is a foreground material, not a global background.
3. Never add glass merely because a component exists.
4. Never create a new colour when an existing token can be used.
5. Never create a new radius when the existing system can solve the problem.
6. Never append CSS overrides when the existing rule can be corrected.
7. Prefer removing obsolete CSS over increasing specificity.
8. Red is the primary action colour.
9. Gold is reserved for premium/verified moments.
10. Vehicle photography is the primary visual asset.
11. Typography remains Sora + DM Sans.
12. Every public page must feel like the same Zara Cars product.
13. Dense operational data uses solid surfaces.
14. Cards should have obvious semantic and interactive affordance.
15. Mobile is a first-class design target.
16. Accessibility is part of premium quality.
17. Do not invent business claims or functionality.
18. Preserve existing routes and business logic unless explicitly instructed.
19. Do not redesign multiple unrelated systems in one task.
20. Before adding a component, check existing primitives.
21. Before adding CSS, check whether a token/component already solves the problem.
22. Do not use !important as a normal styling technique.
23. Do not add animation unless it improves hierarchy or feedback.
24. Do not make all CTAs visually equal.
25. The interface must get out of the way of the cars, price, trust, and decision.
```

---

# 53. KILO WORKFLOW

For each phase use:

```text
ANALYZE
   ↓
PLAN
   ↓
IMPLEMENT
   ↓
CHECK
   ↓
TEST
   ↓
REVIEW
```

Do not let Kilo make a huge uncontrolled batch of changes.

After each phase:

1. inspect diff
2. run typecheck/lint
3. run build
4. inspect affected routes
5. fix regressions
6. proceed to next phase

---

# 54. PHASE PROMPT — READY TO PASTE

Use this for Phase 0:

```text
You are the lead product designer, UX architect and senior frontend engineer for Zara Cars.

Goal:
Transform the existing Zara Cars website into a premium automotive digital showroom called "Zara Cars — Liquid Showroom".

Read the project's ZARA-CARS-PREMIUM-REDESIGN.md instructions before doing anything.

IMPORTANT:
Do not modify files in this task.

Inspect the entire repository and current application.

Audit:
- every route
- every page
- shared components
- CSS architecture
- Tailwind usage
- design tokens
- typography
- colours
- dark/light themes
- glass effects
- responsive behaviour
- accessibility
- vehicle cards
- inventory filters
- vehicle detail
- finance
- trade-in
- diaspora
- about
- contact
- legal/trust
- services
- dealer dashboard
- modals
- forms
- navigation
- footer
- WhatsApp flows

Identify:
1. duplicated CSS
2. duplicated components
3. competing design systems
4. hardcoded colours
5. redundant red values
6. excessive backdrop-filter usage
7. page-specific headers/footers
8. accessibility issues
9. CTA hierarchy problems
10. conversion friction
11. inconsistent spacing/radius/shadows
12. inconsistent typography
13. technical risks

Do not implement.

Produce:
- architecture map
- page-by-page audit
- design-system audit
- technical debt list
- glass usage map
- accessibility checklist
- conversion checklist
- recommended implementation order
- files that should be changed in each phase

Do not invent functionality.
Do not propose a rewrite unless there is a concrete reason.
```

---

# 55. PHASE PROMPT — DESIGN SYSTEM

```text
Read ZARA-CARS-PREMIUM-REDESIGN.md completely.

Implement PHASE 1 only.

Create the Zara Cars Liquid Showroom design system.

Use:
- deep navy environment
- Sora + DM Sans
- Zara red as primary action
- restrained champagne gold for verified/premium
- off-white typography
- subtle emerald success
- restrained Liquid Glass

Create canonical design tokens and reusable primitives.

Glass is permitted only on:
- global header
- hero search deck
- selected featured vehicle surfaces
- modal
- vehicle-detail purchase panel
- floating action surfaces

Do not apply glass to dense data tables.

Do not change business logic.

Do not create duplicate CSS systems.

Remove obsolete rules rather than appending overrides.

Run lint/typecheck/build after changes.

Report:
- files changed
- components created
- tokens created
- obsolete styles removed
- tests/build result
```

---

# 56. PHASE PROMPT — GLOBAL CHROME

```text
Read ZARA-CARS-PREMIUM-REDESIGN.md.

Implement PHASE 3 only.

Unify all public pages under one Zara Cars SiteChrome.

Use the existing SiteChrome as the source of truth where possible.

Unify:
- header
- navigation
- footer
- mobile navigation
- theme
- global buttons
- typography
- page container

Remove duplicate page-level headers/footers.

Do not alter business logic.

Do not redesign unrelated page content yet.

Verify:
Home
Inventory
Vehicle Detail
Financing
Trade-in
Diaspora
About
Contact
Legal & Trust
Services

Run build/typecheck/lint.

Report all duplicate chrome removed.
```

---

# 57. PHASE PROMPT — HOME

```text
Read ZARA-CARS-PREMIUM-REDESIGN.md.

Implement PHASE 4 only.

Redesign Home as the premium Zara Cars landing experience.

Primary H1:

Verified cars.
Clear decisions.

Supporting copy:

Premium, inspected vehicles with transparent drive-away pricing. Browse available stock, reserve online, or talk to a Zara Cars specialist.

Primary CTA:
Browse available cars

Secondary:
Sell or trade in

Trust:
Verified paperwork
Drive-away pricing
48-hour reservation

Keep CLICK. CLICK. DRIVE. as a secondary brand signature.

The hero must be cinematic and restrained.

Use one strong vehicle image.
Use deep navy environment.
Use subtle ambient light.
Use restrained glass.
Do not animate every element.

Preserve existing functionality.

After implementation:
- test desktop
- test mobile
- run build
- inspect diff
- report regressions
```

---

# 58. PHASE PROMPT — INVENTORY

```text
Read ZARA-CARS-PREMIUM-REDESIGN.md.

Implement PHASE 5 only.

Redesign Inventory as a premium automotive marketplace.

Preserve:
- search
- make
- status
- body type
- price
- sorting
- grid/list
- URL query parameters
- inventory data

Improve:
- filter hierarchy
- active filter chips
- result count
- clear all
- card hierarchy
- price prominence
- monthly estimate
- trust/status
- WhatsApp action
- accessibility
- mobile filtering

Entire vehicle card should be a semantic link/article pattern.

Fix concatenated labels.

Use:
READY TO VIEW · ZC-XXXX · LOCATION

Do not make every card glass.

Use glass only where it creates meaningful depth.

Run tests/build/typecheck/lint.
```

---

# 59. PHASE PROMPT — VEHICLE DETAIL

```text
Read ZARA-CARS-PREMIUM-REDESIGN.md.

Implement PHASE 6 only.

Make Vehicle Detail the highest-conversion page.

Preserve:
- gallery
- vehicle data
- price
- finance
- breakdown
- reserve
- WhatsApp
- viewing
- PDF/report functionality
- specifications
- trust
- related vehicles

Create:
- cinematic gallery
- sticky purchase panel
- clear price hierarchy
- Zara Standard
- verification experience
- mobile sticky actions
- strong reserve CTA
- WhatsApp specialist CTA
- viewing CTA

Primary:
Reserve this car

Secondary:
WhatsApp a specialist

Third:
Book a viewing

Do not invent trust claims or business rules.

Use glass primarily for the sticky purchase panel.

Run build/typecheck/lint.
```

---

# 60. PHASE PROMPT — ACCESSIBILITY

```text
Read ZARA-CARS-PREMIUM-REDESIGN.md.

Perform the complete accessibility phase.

Audit every public route.

Fix:
- H1 hierarchy
- form labels
- aria labels
- semantic links/buttons
- keyboard navigation
- focus states
- modal focus
- Escape handling
- colour contrast
- touch targets
- slider labels and values
- select controls
- reduced motion
- screen-reader semantics

Do not redesign visual styling except where accessibility requires it.

Run build/typecheck/lint.

Produce an accessibility checklist showing:
PASS
FIXED
REMAINING
```

---

# 61. FINAL QUALITY BAR

The finished Zara Cars website should communicate:

> **This is a serious automotive business.**
>
> **The cars are desirable.**
>
> **The prices are understandable.**
>
> **The vehicles are verified.**
>
> **The buying process is clear.**
>
> **I know what to do next.**

The visual result should be:

```text
Cinematic
        +
Precise
        +
Trustworthy
        +
Restrained Glass
        +
Automotive Editorial
        =
ZARA CARS
LIQUID SHOWROOM
```

The goal is NOT:

> "Make the website look glassy."

The goal is:

> **Make Zara Cars feel like a premium, transparent automotive buying experience — using Liquid Glass as one carefully controlled material inside a coherent design system.**
