# Zara Cars — Post-Redesign Polish Pass
## Density, Typography, Iconography, Scroll-to-Section UX, and Final Premium Refinement

> **This is a follow-up implementation brief for the CURRENT redesigned Zara Cars site.**
>
> Do NOT restart the redesign. Do NOT undo the Liquid Showroom direction.
>
> The new visual direction is broadly correct, but the current result is too spacious and, in places, too quiet. The objective of this pass is to make the site feel **intentional, dense enough to feel designed, easier to scan, more responsive to user actions, and more premium** without making it cluttered.
>
> Treat this as a **polish/compression + interaction reliability pass**, not a rebrand.

---

# 0. CURRENT PROBLEMS OBSERVED

The current redesign has four major issues that must be addressed:

## A. Excessive vertical whitespace

Some sections have large empty areas between meaningful content blocks.

This makes the site feel:

- generic
- unfinished
- template-driven
- less premium
- visually disconnected
- longer than necessary

The screenshot example is particularly obvious in the lower half of the page: the content finishes, then there is too much empty vertical space before the footer content becomes active.

### Important nuance

Do NOT simply reduce every margin/padding value globally.

Instead:

1. identify which spacing is intentional
2. identify which spacing is caused by:
   - oversized section padding
   - `min-height`
   - `100vh` / `100svh`
   - `justify-content: space-between`
   - excessive grid/flex gaps
   - empty grid tracks
   - spacer elements
   - overly large footer padding
   - excessive top/bottom padding on CTA sections
   - repeated section wrappers
3. compress only the problematic structures

---

## B. Some icons are too small

Several UI icons are visually subordinate to their surrounding text and controls.

The interface currently has cases where an icon looks more like a tiny decoration than a meaningful control affordance.

This is especially noticeable in:

- WhatsApp buttons
- navigation
- feature/trust items
- arrow actions
- footer actions
- filter controls
- form controls

Icons should be clearly legible at normal viewing distance.

---

## C. Some text is too small

Small:

- metadata
- footer text
- utility labels
- CTA labels
- supporting copy
- filter labels

makes the interface feel weaker and less accessible.

Premium does NOT mean microscopic.

The correct feeling is:

> precise + restrained + readable

not:

> tiny + sparse

---

## D. CTA buttons do not always reveal their destination content

Some actions navigate to:

- Finance
- Contact
- Trade-in

but do not automatically pan/scroll the user to the relevant form.

A user should never click:

> Apply for financing

and land at the top of a page wondering where the form is.

The same applies to:

> Contact us
> Contact team
> Sell / Trade in
> Start trade-in
> Request valuation
> Apply for finance

Where a page contains a known destination section, the action should take the user directly to it.

---

# 1. DESIGN OBJECTIVE FOR THIS PASS

The desired feeling is:

> **Premium, compact, deliberate.**

Not:

> spacious because we don't know what to put there.

The user should perceive:

```text
Hierarchy
+
Rhythm
+
Density
+
Breathing room
```

The site needs breathing room, but it should not have dead space.

---

# 2. THE 3-RULE SPACING SYSTEM

Use three conceptual spacing levels.

## Tight

Used inside components.

Examples:

- icon + label
- title + metadata
- button internals
- input labels

Target range:

```text
4–12px
```

## Standard

Used between related blocks.

Examples:

- heading → paragraph
- card content groups
- form fields
- trust items

Target range:

```text
16–32px
```

## Section

Used between major content sections.

Target range:

```text
48–80px
```

Avoid automatically using:

```text
96px
120px
144px
160px
```

between ordinary sections.

Those larger values should be reserved for intentionally cinematic hero composition only.

---

# 3. COMPRESSION PASS — WHAT TO INSPECT

Search the entire project for:

```text
min-height
100vh
100svh
100dvh
space-between
gap:
row-gap:
column-gap:
padding-top
padding-bottom
margin-top
margin-bottom
py-
pt-
pb-
my-
mt-
mb-
```

Look specifically for:

- full viewport sections that don't need to be full viewport
- wrappers stretching because of flex behaviour
- sections with both large padding AND large child gaps
- footer layouts with excessive vertical padding
- empty or mostly empty grid columns
- giant `min-height` values on CTA sections
- duplicated wrapper padding
- nested containers each contributing vertical spacing

Do NOT globally change all spacing.

Fix the causes.

---

# 4. SECTION DENSITY RULE

Each section should answer:

> What content is this section helping the user understand or act on?

If a section contains:

- one tiny label
- one heading
- one sentence
- one button

and then creates a huge empty block,

compress it.

A premium composition can be visually calm while remaining information-dense.

---

# 5. FOOTER POLISH

The screenshot shows a particularly important footer issue.

The footer currently has:

- large vertical breathing room
- relatively small text
- small utility links
- a large empty feeling around the main columns

The footer should feel like the deliberate end of the product experience.

Use approximately:

```text
Top footer padding:
48–64px desktop

Column gap:
32–56px

Footer bottom padding:
24–32px
```

Avoid turning the footer into a huge blank terminal section.

## Footer hierarchy

Primary:

**ZARA CARS**

Secondary:

> Verified cars for real Kenyan roads.

Links:

- Browse stock
- Contact team
- Trust & verification

Action:

**Dealer workspace →**

Then a compact bottom row:

> © 2026 Zara Cars Kenya

and:

> Built around clarity, not pressure.

---

# 6. FOOTER TYPOGRAPHY

Do not let footer text fall below comfortable readability.

Recommended starting sizes:

```text
Footer navigation:        14–15px
Footer supporting copy:   14–16px
Footer legal/meta:        13–14px
Footer CTA:               14–15px
```

Use muted colour for hierarchy, not tiny text.

---

# 7. BODY TEXT MINIMUMS

Adopt these as starting values.

```text
Primary body:         16px
Secondary body:       15px
Important metadata:   14px
Small metadata:       13px minimum where genuinely necessary
Buttons:              14–15px
Navigation:           14–15px
Form labels:          14–15px
```

Do not use 11–12px text for normal interactive or decision-making information.

---

# 8. VEHICLE INFORMATION TYPOGRAPHY

Vehicle cards should have a clean type hierarchy.

Recommended:

```text
Vehicle title:        18–22px
Price:                20–28px
Key specs:            14–15px
Status:               12–13px
Location/code:        12–13px
CTA:                  14–15px
Monthly estimate:     13–14px
```

The exact values should follow the existing typography scale rather than creating arbitrary one-off sizes.

---

# 9. ICON SIZE SYSTEM

Create/use one icon sizing system.

## Inline icon

```text
16–18px
```

Examples:

- small metadata
- tiny utility text

## Standard action icon

```text
20px
```

Examples:

- buttons
- navigation actions
- arrows
- WhatsApp controls

## Prominent icon

```text
24px
```

Examples:

- trust features
- action tiles
- filter controls
- contact cards

## Feature icon

```text
28–32px
```

Examples:

- large trust/feature modules

Do NOT enlarge every icon.

The problem is inconsistency and undersizing, not a universal requirement for giant icons.

---

# 10. ICON + TEXT ALIGNMENT

Use:

```css
display: inline-flex;
align-items: center;
gap: 8px;
```

Do not allow icons to sit too close to labels.

For standard controls:

```text
icon
8px
label
```

For larger feature rows:

```text
icon
10–12px
label
```

---

# 11. BUTTON SIZING

Primary actions should not look like tiny text links.

Recommended:

```text
Height:        44–48px desktop
Height:        44–52px mobile
Horizontal:    16–22px padding
Text:          14–15px
Icon:          18–20px
```

For major hero CTAs:

```text
Height:
48–52px
```

Do not inflate buttons unnecessarily.

---

# 12. TOUCH TARGETS

Interactive controls should have comfortable hit areas.

Target:

```text
44px minimum
```

for primary interactive controls.

This includes:

- buttons
- nav controls
- filters
- icon buttons
- close buttons
- carousel controls

The visible icon may be 20px while its click target is 44px.

---

# 13. SCROLL-TO-FORM SYSTEM

This is a functional UX requirement.

Implement a **consistent hash-anchor system**.

Do not individually hack each button with duplicated scroll code.

Create a reusable mechanism.

---

# 14. FORM DESTINATION IDS

Use stable, semantic IDs.

Finance:

```html
<section id="finance-form">
```

Contact:

```html
<section id="contact-form">
```

Trade-in:

```html
<section id="trade-in-form">
```

Vehicle enquiry where applicable:

```html
<section id="vehicle-enquiry">
```

Reservation:

```html
<section id="reservation-form">
```

Do not use generated/random IDs.

These IDs are part of the interaction contract.

---

# 15. TARGET SCROLL BEHAVIOUR

When the user clicks a CTA:

```text
Apply for financing
```

navigate to:

```text
/finance#finance-form
```

When they click:

```text
Contact team
```

navigate to:

```text
/contact#contact-form
```

When they click:

```text
Sell or trade in
```

navigate to:

```text
/trade-in#trade-in-form
```

Then the destination page should:

1. render
2. detect the hash
3. scroll to the target
4. account for the sticky header
5. focus an appropriate heading/field when helpful

---

# 16. CSS SCROLL MARGIN

Use:

```css
[id] {
  scroll-margin-top: 96px;
}
```

But do NOT blindly apply it to every ID.

Prefer targeted rules:

```css
#finance-form,
#contact-form,
#trade-in-form,
#vehicle-enquiry,
#reservation-form {
  scroll-margin-top: 104px;
}
```

Adjust this to the actual fixed header height.

Desktop and mobile may need different offsets.

---

# 17. REACT HASH-SCROLL BEHAVIOUR

If using React Router, do not assume browser hash navigation alone will always produce the intended result after route rendering.

Implement a shared helper/hook where appropriate.

Conceptually:

```ts
useEffect(() => {
  const hash = window.location.hash.replace('#', '');

  if (!hash) return;

  requestAnimationFrame(() => {
    const target = document.getElementById(hash);

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}, [location.pathname, location.hash]);
```

Use the actual project's router/location APIs.

Do not install a new scrolling library unless it is truly necessary.

Native `scrollIntoView()` is preferred.

---

# 18. IMPORTANT — DO NOT BREAK EXISTING NAVIGATION

A CTA may currently:

```text
navigate("/finance")
```

Change it to:

```text
navigate("/finance#finance-form")
```

ONLY where the destination page actually contains that target.

Likewise:

```text
/contact#contact-form
/trade-in#trade-in-form
```

Do not add hashes pointing to missing elements.

---

# 19. BUTTON DESTINATION AUDIT

Search the project for:

```text
Finance
Apply
Contact
Contact team
Trade-in
Sell
Trade
Valuation
Reserve
Book
Request
Enquire
WhatsApp
```

For each CTA document:

```text
CTA
→ route
→ section ID
→ scroll behaviour
```

Find and fix all broken or incomplete CTA destinations.

---

# 20. PAGES TO TEST

At minimum:

## Finance

Hero CTA:

> Apply for financing

must land at:

```text
#finance-form
```

## Contact

CTA:

> Contact team

must land at:

```text
#contact-form
```

## Trade-in

CTA:

> Sell or trade in

must land at:

```text
#trade-in-form
```

## Vehicle detail

Where there is an enquiry/reservation CTA, it must navigate or scroll to the appropriate form/action area.

---

# 21. PRESERVE QUERY PARAMETERS

Do not break inventory query behaviour.

For example:

```text
/inventory?make=Toyota
```

must continue to work.

If a CTA needs a hash:

```text
/inventory?make=Toyota#results
```

preserve the query parameters.

Do not overwrite existing search/filter state.

---

# 22. URL BEHAVIOUR

Ensure:

```text
Back
Forward
Reload
Direct link with hash
```

all behave correctly.

A user must be able to copy:

```text
/finance#finance-form
```

and load directly into the finance form area.

---

# 23. FOCUS AFTER SCROLL

For accessibility and clarity, consider focusing the form heading after navigation.

A useful pattern:

```html
<h2
  id="finance-form-heading"
  tabIndex="-1"
>
  Apply for financing
</h2>
```

After scrolling:

```ts
heading.focus({ preventScroll: true });
```

Only do this when it improves accessibility and does not create a poor screen-reader experience.

Do not move focus randomly.

---

# 24. FORM SECTIONS NEED STRONGER VISUAL ANCHORING

A user should immediately recognize:

> I've reached the form.

Use:

```text
small eyebrow
↓
large heading
↓
short explanation
↓
form
```

Example:

```text
FINANCING

Let's work out what fits.

Tell us what you're looking for and
we'll help you explore suitable options.

[ form ]
```

This can use one glass panel or solid premium surface.

Do not create enormous empty space before the form.

---

# 25. SECTION RHYTHM

A strong page rhythm should resemble:

```text
Hero
↓
Small gap
Trust
↓
Medium gap
Primary content
↓
Medium gap
Supporting content
↓
Medium gap
CTA
↓
Compact footer
```

Not:

```text
Hero
↓
huge blank area
↓
content
↓
huge blank area
↓
content
↓
huge blank area
↓
footer
```

---

# 26. HERO EXCEPTION

The hero may remain more spacious.

That is intentional.

Allow:

```text
hero:
72–120px internal breathing space
```

depending on viewport.

But after the hero, the spacing system should become noticeably tighter.

This contrast creates hierarchy.

---

# 27. SECTION TITLES

Do not let a heading float far away from its related content.

Preferred:

```text
Eyebrow
8–12px
Heading
12–16px
Supporting copy
20–28px
Content
```

Avoid:

```text
Heading

[80px empty]

Content
```

---

# 28. CARD GRID DENSITY

For inventory:

Prefer:

```text
16–24px
```

grid gap.

Do not use excessive card gaps unless the viewport requires it.

Desktop should feel like a premium collection, not a set of isolated floating objects.

---

# 29. FILTER DENSITY

Filters should be compact but legible.

Recommended:

```text
Filter chip height: 36–40px
Horizontal padding: 12–14px
Text: 13–14px
Icon: 16–18px
Gap: 8px
```

On mobile:

Use a filter drawer rather than pushing filters vertically through an enormous page.

---

# 30. HEADER DENSITY

The header should remain elegant but not consume unnecessary vertical space.

Target:

```text
Desktop:
72–80px

Mobile:
64–72px
```

Do not reduce the header below a comfortable touch target.

---

# 31. MOBILE SPECIFICALLY

The current "too much whitespace" problem can become worse on mobile.

Audit:

- stacked sections
- footer
- cards
- forms
- CTA areas
- filter drawers

Mobile should not have giant vertical gaps simply because desktop spacing values were carried over.

Use tighter responsive spacing.

---

# 32. RESPONSIVE SPACING TOKENS

Use something conceptually like:

```css
--section-space-desktop: 72px;
--section-space-tablet: 56px;
--section-space-mobile: 40px;

--component-gap-desktop: 24px;
--component-gap-mobile: 16px;

--content-gap-desktop: 32px;
--content-gap-mobile: 20px;
```

Tune based on actual layouts.

Do not mechanically apply these to every element.

---

# 33. EMPTY SPACE DIAGNOSTIC CHECKLIST

When you find a huge empty area, ask:

### 1.
Is the parent `min-height` too large?

### 2.
Is the parent using `100vh` unnecessarily?

### 3.
Is `justify-content: space-between` distributing free height?

### 4.
Are there nested wrappers with padding?

### 5.
Does an invisible/empty element still occupy height?

### 6.
Is a grid row being stretched?

### 7.
Is the footer pushed downward by a giant preceding section?

### 8.
Are there large `py-*`, `mt-*`, or `mb-*` values from multiple design systems?

Fix the root cause rather than adding another override.

---

# 34. NO "SPACER DIVS"

Remove decorative spacer elements such as:

```html
<div class="h-32"></div>
```

when their only purpose is creating empty space.

Spacing must come from component/layout rules.

---

# 35. NO MIN-HEIGHT ABUSE

Do not use:

```css
min-height: 100vh;
```

for ordinary sections unless there is a clear product/design reason.

The following generally should NOT be forced to viewport height:

- trust sections
- form sections
- CTA sections
- about sections
- contact sections
- footer
- inventory results
- finance forms
- trade-in forms

The hero is the most likely appropriate place for viewport-driven composition.

---

# 36. PREMIUM DENSITY

The goal is approximately:

```text
80% intentional whitespace
20% breathing room
```

This is conceptual, not a literal ratio.

The important principle is:

> Every empty area should feel designed.

---

# 37. VISUAL HIERARCHY AFTER COMPRESSION

After reducing whitespace, preserve:

### Level 1

Vehicle / hero / primary message

### Level 2

Price / CTA / trust

### Level 3

Specifications / supporting information

### Level 4

Utility metadata

Never compress spacing so much that everything becomes equally dense.

---

# 38. CTA SIZE + ICON FIX

Every important CTA should pass this test:

At normal desktop viewing:

> Can I immediately identify this as clickable?

At mobile:

> Can I comfortably tap this without precision?

If not, increase:

- height
- padding
- icon size
- contrast

before increasing font weight.

---

# 39. FOOTER SCREENSHOT-SPECIFIC FIX

For the footer shown in the current implementation:

### Reduce

- empty area above footer columns
- excessive vertical padding
- distance between logo and copy
- excessive vertical separation inside the right-side dealer workspace panel

### Increase

- footer link text size slightly
- WhatsApp icon slightly
- dealer workspace icon slightly
- visual grouping of links

### Preserve

- light premium surface
- navy text
- restrained gold action
- red brand accent
- subtle border
- clean footer divider

Do NOT turn this footer into a dark footer unless there is a broader deliberate design decision.

---

# 40. DEALER WORKSPACE CARD

Current card:

> FOR MODERN DEALERSHIPS
>
> Dealer workspace →

The card is visually large relative to its amount of content.

Do one of:

1. reduce vertical padding
2. slightly increase content density
3. add one concise supporting line

Preferred:

```text
FOR MODERN DEALERSHIPS

Dealer workspace
Manage listings, leads and inventory.

[ Open workspace → ]
```

Only add the supporting line if the product actually supports those functions.

Do not invent functionality.

---

# 41. WHATSAPP BUTTON

The current gold WhatsApp treatment can remain.

However:

- icon should be approximately 18–20px
- text should be approximately 14–15px
- button height should feel substantial
- tap target must be at least 44px
- icon/text gap should be approximately 8px

Do not make WhatsApp visually tiny.

---

# 42. TEXT CONTRAST

Do not solve tiny text problems by making text darker while keeping it microscopic.

The hierarchy should be:

```text
size
+
weight
+
contrast
+
spacing
```

Use all four.

---

# 43. ICON STYLE CONSISTENCY

Use one coherent icon family.

Do not mix:

- outlined icons
- filled icons
- random SVG styles
- emoji
- inconsistent stroke widths

unless a particular brand mark requires it.

Recommended:

```text
stroke-based
simple
clean
1.75–2px visual stroke
```

Keep icon semantics consistent.

---

# 44. ICON OPTICAL WEIGHT

A mathematically 20px icon can still look too small.

When needed:

- move from 18 → 20px
- increase stroke weight slightly
- increase container size
- give it more contrast

Do not simply scale every icon to 32px.

---

# 45. ACCESSIBILITY AFTER SIZE CHANGES

After increasing text/icons:

check:

- line wrapping
- button heights
- mobile card heights
- header fit
- footer fit
- focus states
- contrast

Larger text should improve usability without causing overflow.

---

# 46. PAGE-BY-PAGE DENSITY AUDIT

Do this for every route.

## Home

Check:

- hero
- search deck
- trust bar
- featured inventory
- Zara Standard
- secondary CTA
- footer

## Inventory

Check:

- heading → filters
- filters → result count
- result count → cards
- card grid gaps
- bottom CTA
- footer

## Vehicle Detail

Check:

- gallery → purchase panel
- purchase panel → specs
- specs → trust
- trust → report
- report → related vehicles
- mobile sticky CTA

## Finance

Check:

- hero → calculator
- calculator → supporting explanation
- form → trust/FAQ
- footer

## Trade-in

Check:

- intro → form
- form steps
- valuation/next step
- footer

## Contact

Check:

- intro → contact form
- contact options
- location
- trust
- footer

## Diaspora

Check:

- hero → process
- process → trust
- trust → contact
- footer

## About

Check:

- story
- standard
- process
- team
- showroom
- CTA

## Legal & Trust

Check:

- heading
- trust blocks
- legal content
- contact/CTA
- footer

## Dealer Dashboard

Check:

- tables
- cards
- filters
- forms
- density
- readability

Dashboard should remain substantially denser than marketing pages.

---

# 47. PAGE-LEVEL "DEAD SPACE" RULE

For each page:

1. capture a full-page screenshot
2. locate the 3 largest empty regions
3. determine whether each is:
   - intentional
   - necessary
   - accidental
4. compress accidental regions
5. repeat

Do not simply judge spacing from CSS values alone.

Judge the rendered composition.

---

# 48. RENDERED QA IS REQUIRED

After implementation, inspect:

```text
1440px
1280px
1024px
768px
390px
360px
```

Do not assume desktop fixes automatically work on mobile.

---

# 49. FUNCTIONAL QA — SCROLLING

Test:

```text
Home → Finance CTA
Home → Trade-in CTA
Home → Contact CTA
Inventory → Contact
Vehicle → enquiry
Vehicle → reservation
Finance → form
Trade-in → form
Contact → form
```

For every CTA verify:

```text
click
↓
correct route
↓
correct hash (where needed)
↓
page renders
↓
target scrolls into view
↓
header does not obscure it
↓
appropriate focus state
```

---

# 50. HASH SCROLL EDGE CASES

Test:

### Direct URL

```text
/finance#finance-form
```

### Same-page anchor

```text
/contact#contact-form
```

### Navigation from another route

```text
/
↓
/finance#finance-form
```

### Reload

```text
/finance#finance-form
reload
```

### Back button

Hash navigation must not produce confusing navigation history.

Use the project's router correctly.

---

# 51. SMOOTH SCROLL

Use smooth scrolling where appropriate.

Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Do not animate form scrolling aggressively.

A subtle 300–500ms movement is sufficient.

---

# 52. VISUAL QUALITY BAR

After the pass, the site should feel:

### Before

```text
premium
+
too much whitespace
+
tiny details
+
occasional disconnected interactions
```

### After

```text
premium
+
intentional density
+
clear hierarchy
+
comfortable typography
+
stronger icons
+
reliable scroll actions
```

---

# 53. DO NOT OVER-COMPRESS

There is an opposite failure mode.

Do NOT make the website:

- cramped
- dashboard-like
- crowded
- visually anxious

The desired state is:

> **Calm but full.**

That is the exact design target.

---

# 54. KILO IMPLEMENTATION PLAN

## PHASE A — READ-ONLY AUDIT

Do not modify files.

Inspect:

- current spacing
- current icon sizes
- current text sizes
- current section heights
- current footer
- current CTA destinations
- existing hashes
- router setup
- scroll helpers
- form IDs
- header height
- responsive rules

Produce:

```text
1. Top 20 whitespace causes
2. Top 20 undersized typography/icon instances
3. All CTA → route mappings
4. Missing scroll targets
5. Components that should be shared
6. CSS/layout root causes
```

---

# 55. KILO PHASE B — SPACING / DENSITY

Implement only the visual density pass.

Goals:

- remove accidental dead space
- preserve hero breathing room
- compact footer
- tighten standard section spacing
- remove spacer elements
- reduce unnecessary min-heights
- reduce redundant nested padding
- improve inventory/card density
- improve form density

Do not redesign colours.

Do not redesign glass.

Do not change business logic.

Run build/typecheck/lint.

---

# 56. KILO PHASE C — TYPOGRAPHY / ICONS

Implement:

- minimum readable text scale
- stronger CTA text
- readable footer
- vehicle metadata scale
- consistent icon sizing
- icon/text alignment
- touch targets

Do not create random font sizes.

Use the existing design-token system.

Run visual QA at desktop and mobile.

---

# 57. KILO PHASE D — SCROLL TO DESTINATION

Implement a reusable hash-scroll system.

Steps:

1. inspect router
2. inspect navigation helpers
3. create/extend shared scroll utility
4. add stable IDs to forms
5. append hashes to relevant links
6. scroll after destination renders
7. account for sticky header
8. optionally focus destination heading
9. respect reduced motion
10. test direct hash URLs

Do not install unnecessary dependencies.

---

# 58. KILO PHASE E — PAGE-BY-PAGE QA

Check every route.

For each page record:

```text
Whitespace:
PASS / FIXED

Typography:
PASS / FIXED

Icons:
PASS / FIXED

CTA destination:
PASS / FIXED

Mobile:
PASS / FIXED

Build:
PASS / FAIL
```

---

# 59. READY-TO-PASTE KILO PROMPT — CURRENT TASK

Use this prompt for the implementation pass:

```text
Read ZARA-CARS-POLISH-PASS.md completely before making changes.

The Zara Cars redesign is already implemented.

DO NOT restart the redesign.
DO NOT change the overall brand direction.
DO NOT redesign the colour system.
DO NOT replace the Liquid Showroom aesthetic.

We now need a professional post-redesign polish pass.

Primary problems to solve:

1. Too much vertical whitespace between sections.
2. Footer feels too tall and empty.
3. Some icons are too small.
4. Some text is too small.
5. Some buttons/controls have weak visual/tap affordance.
6. Certain CTAs navigate to pages but do not scroll users to the relevant form/section.
7. Some sections likely have accidental height caused by min-height, viewport sizing, flex distribution, spacer elements, or duplicated padding.

FIRST:
Inspect the current implementation and identify root causes.

Do not blindly reduce all spacing.

Search for:
- min-height
- 100vh
- 100svh
- 100dvh
- space-between
- oversized gap
- oversized padding
- spacer elements
- nested wrappers
- duplicate section padding

Then implement a controlled density pass.

TARGET:
The site should feel "calm but full", not sparse and generic.

Typography:
- body ~16px
- secondary body ~15px
- important metadata ~14px
- small metadata ~13px minimum where necessary
- navigation ~14–15px
- buttons ~14–15px
- vehicle title ~18–22px
- vehicle price ~20–28px

Icons:
- inline 16–18px
- standard controls 20px
- prominent feature icons 24px
- larger feature icons 28–32px

Touch targets:
- minimum 44px

Buttons:
- 44–48px desktop
- 44–52px mobile

Spacing:
- tight internal 4–12px
- standard 16–32px
- section 48–80px
- larger hero spacing is allowed
- ordinary sections should not use giant empty gaps

Footer:
- compact its vertical padding
- improve link readability
- strengthen grouping
- preserve current light premium appearance
- keep dealer workspace card but reduce dead space inside it

NEXT:
Implement reliable route-to-form scrolling.

Add stable IDs:
#finance-form
#contact-form
#trade-in-form
#vehicle-enquiry
#reservation-form

Update relevant CTAs to use route + hash.

Examples:
 /finance#finance-form
 /contact#contact-form
 /trade-in#trade-in-form

Implement shared hash scrolling using the existing router/location architecture.

Requirements:
- works after route navigation
- works on direct URL
- works after reload
- accounts for sticky header
- smooth where appropriate
- respects prefers-reduced-motion
- does not break query parameters
- does not point to missing targets

Use scroll-margin-top around the actual header height.

After scrolling, optionally focus the destination heading where appropriate for accessibility.

Then perform a complete QA pass at:
1440
1280
1024
768
390
360

Check:
- no overflow
- no new wrapping problems
- no giant gaps
- readable footer
- readable metadata
- icon sizes
- CTA sizes
- form destination scrolling
- mobile sticky controls
- header offset
- accessibility

Run:
- typecheck
- lint
- build

Do not add unnecessary dependencies.

Do not append redundant CSS overrides.

Fix root causes instead.

Report:
1. whitespace causes fixed
2. icon/text sizes changed
3. CTA scroll targets added
4. components/utilities created or reused
5. files changed
6. build/typecheck/lint result
7. any remaining visual issues
```

---

# 60. FINAL KILO QUALITY BAR

The finished site should NOT look:

```text
empty
spacious for the sake of spacing
generic
template-like
tiny
fussy
over-designed
```

It SHOULD look:

```text
premium
calm
dense enough to feel intentional
clear
precise
automotive
high-trust
easy to act on
```

The ideal visual feeling is:

> **A premium showroom with breathing room — not an empty gallery.**

And the ideal interaction feeling is:

> **I clicked something, and Zara Cars took me exactly where I expected to go.**
