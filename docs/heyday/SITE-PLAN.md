# Heyday site plan

Every route, its template, where its words come from, and what it says about
itself. Written for Phase 0 of `HEYDAY-JOBBIE-FULL-SITE-PROMPT.md` section 7,
from sections 3 to 5 of that prompt.

**Pack:** built against `heyday-brief-pack (3)`, which drops everything to do
with the marketplace — that is a separate site, in its own repo, with its own
look. Its address here is `[marketplace URL]` until it is settled.

**Totals:** 46 feature pages, 6 group pages, 7 stories, 5 compare pages, 3
tools, and 25 fixed routes — **94 routes** from **16 templates**.

**Status** means what the page says about the product, not whether the page is
built. Every feature is "Coming soon" until Jem and Russell decide otherwise
(prompt section 1).

---

## 1. Templates

| | Template | Used by | Motion it carries |
|---|---|---|---|
| T1 | Home | `/` | Rising cards, two sideways scrolls, sticky scroll, workflow builder, more-info |
| T2 | Feature page | 46 | Sticky scroll, Heyday line, stickers |
| T3 | Group page | 6 | Section mark morph, Heyday line, one more-info |
| T4 | All features | 1 | Section marks, pinned jump links |
| T5 | How it works | 1 | Sticky scroll, Heyday line |
| T6 | Who it's for | 1 | Rotating line, Heyday line, swipe row |
| T7 | Story page | 7 | Sticky scroll |
| T8 | Pricing | 1 | None beyond rise; the table holds still |
| T9 | Compare | 6 | Heyday line on the switching plan |
| T10 | Integrations | 1 + n | Rise only |
| T11 | The AI | 1 | Sticky scroll, mark morph through the three levels |
| T12 | Resources hub | 1 | Rise only |
| T13 | Free tool / template | 4 | Rise only |
| T14 | Leak-check quiz | 1 | Heyday line as progress, section marks in results |
| T15 | Guide / blog / What's new | 4 | None — articles stay still |
| T16 | Company and utility | 11 | None, or a single sun bounce |

---

## 2. Routes

### Home and product

| Route | Template | Words from | Status |
|---|---|---|---|
| `/` | T1 | Design brief B4; SaaS brief 3.7 | Live |
| `/how-it-works` | T5 | SaaS brief 3.3 | Live |
| `/how-it-works/get-ahead` | T3 | `groups.ts` | Live |
| `/how-it-works/get-found` | T3 | `groups.ts` | Live |
| `/how-it-works/win-the-client` | T3 | `groups.ts` | Live |
| `/how-it-works/run-the-day` | T3 | `groups.ts` | Live |
| `/how-it-works/get-paid` | T3 | `groups.ts` | Live |
| `/how-it-works/get-rebooked` | T3 | `groups.ts` | Live |
| `/features` | T4 | `features.ts` | Live |
| `/features/ai` | T11 | SaaS brief 3.8 | Coming soon |
| `/integrations` | T10 | `integrations.ts` | Live |
| `/integrations/[slug]` | T10 | `integrations.ts` | Stripe and Zapier connected at Tipsy; all others Coming soon |
| `/whats-new` | T15 | `updates.ts` | Live, and empty until early access |

### The 46 feature pages — `/features/[slug]`, template T2

All from `data/features.json`. Every one says **Coming soon**.

**Get ahead (4)** — `ai-setup-assistant`, `policies-and-procedures`, `team`,
`integrations`

**Get found (7)** — `booking-page`, `marketplace-listing`, `sell-everywhere`,
`campaigns`, `ads-that-know-which-bookings-pay`, `guest-capture`, `partners`

**Win the client (11)** — `enquiries`, `missed-call-capture`, `ai-receptionist`,
`replies-that-write-themselves`, `quotes`, `follow-ups`, `online-booking`,
`classes-and-tickets`, `packages-and-memberships`,
`contracts-and-e-signatures`, `group-bookings`

**Run the day (11)** — `client-portal`, `inbox`, `client-records`,
`call-notes`, `scheduling`, `shift-offers`, `checklists-and-kit-lists`,
`on-the-day`, `tasks`, `hiring-and-onboarding`, `time-tracking`

**Get paid (6)** — `payments`, `tips`, `invoicing`, `team-pay-and-expenses`,
`profit-per-job`, `reporting`

**Get rebooked (7)** — `reviews`, `referrals`, `gift-vouchers`, `loyalty`,
`fill-quiet-dates`, `waiting-lists`, `complaints`

Two are built differently: `follow-ups` uses the workflow-builder still as its
hero picture, and every page whose `onlyOnHeyday` is true carries the "Only on
Heyday" sticker beside its H1.

`existingJobbieSlug` maps each one onto the 20 pages already in `features.ts`,
so those are rewritten rather than duplicated.

### Who it's for, and the stories

| Route | Template | Status |
|---|---|---|
| `/who-its-for` | T6 | Live |
| `/stories` | T7 (index) | Live |
| `/stories/tipsy-parties` | T7 | Real. Approved numbers only; `[needs approval]` figures stay out |
| `/stories/[6 others]` | T7 | Labelled **Example**. No invented names, quotes, logos or numbers |

### Pricing and compare

| Route | Template | Status |
|---|---|---|
| `/pricing` | T8 | `[PRICE TBC]` throughout |
| `/compare` | T9 (hub) | Live |
| `/compare/honeybook` | T9 | Facts dated, re-checked on the day of publishing |
| `/compare/jobber` | T9 | As above |
| `/compare/check-cherry` | T9 | As above |
| `/compare/flashquotes` | T9 | As above |
| `/compare/spreadsheets` | T9 | Live |

### Resources

| Route | Template | Status |
|---|---|---|
| `/resources` | T12 | Live |
| `/tools` | T13 (index) | Live |
| `/tools/pricing-calculator` | T13 | Live, no email wall |
| `/tools/quote-template` | T13 | Live, no email wall |
| `/tools/leak-check` | T14 | Live, no email wall |
| `/templates` | T13 | Live |
| `/guides`, `/guides/[slug]` | T15 | One sample, unpublished and not indexed |
| `/blog`, `/blog/[slug]` | T15 | One sample. Author stays `[TBC]` |

### Company and utility

| Route | Template | Status |
|---|---|---|
| `/about` | T16 | Rewritten: built by people who run an events business |
| `/security` | T16 | Only what is true; everything else `[to confirm]` |
| `/help` | T16 | `[support hours to confirm]`, setup call `[to confirm]` |
| `/contact` | T16 | `[PHONE TBC]` |
| `/demo` | T16 | Calendar placeholder |
| `/early-access` | T16 | The form stores and sends nothing yet |
| `/login` | T16 | Placeholder — Heyday opens with early access |
| `/for-ai` | T16 plain | Plain text, no motion |
| `/terms`, `/privacy` | T16 plain | Kept, marked for legal review |
| `not-found` | T16 | Sun bounces into the Loop |
| `/styleguide` | — | Every component and every kind of motion. Not indexed |

### Removed, with redirects

| Old route | Goes to | Why |
|---|---|---|
| `/services` | `/features` | Agency page |
| `/projects` | `/stories` | Presents Tipsy as an agency's client |
| `/projects/tipsy-parties` | `/stories/tipsy-parties` | As above |
| `/blog/demystifying-ai-automation` | `/blog` | Agency post |

### Not at launch

A reviews page, a referral or partner programme, careers, a status page, a
full help centre, and more free tools. Each arrives when it is real.

---

## 3. Data files

| File | Holds |
|---|---|
| `site.ts` | The product name, `[PHONE TBC]` and every other site-wide placeholder |
| `groups.ts` | The six groups: name, promise, steps, colour, shape |
| `features.ts` | The 46, from `data/features.json` |
| `stories.ts` | The seven |
| `compare.ts` | Five rivals, each row dated |
| `integrations.ts` | Name, category, status |
| `tools.ts` | The three tools and the templates |
| `faqs.ts` | Shared questions |
| `nav.ts` | The header panels and the footer |
| `updates.ts` | What's new — empty at launch |

---

## 4. Open conflict to settle

**The hero copy.** Design brief B3 and `BUILD-NEXT` Phase 1 both say to keep
the hero as it stood on 13 September: *"Do what you love, Heyday runs the
rest."*

That line has since been changed in this session, at Russell's direction. He
judged "the rest" an overclaim — it promises everything the owner does not
enjoy, and for a cleaning business that includes the cleaning, which Heyday
never does. The hero now reads:

> { Your heyday, your way }
> **You didn't start a business to have an admin job.**
> Heyday is you ×1000, running 24/7. Everything, always, instantly.

Prompt section 1 puts "what Jem says in this session" above the written briefs,
so the newer instruction wins and the current copy stands. Recorded here
because the briefs still describe the older line, and the next person to read
them will otherwise think it was missed.

Everything else in B3 is followed: the header stays, the letters still assemble
on load, and the right-hand side of the hero becomes `RisingCards`.

---

## 5. Progress — read this first when resuming

Built on branch `redesign/mono-binary-intro`. **63 static routes** so far.

### Done

| Phase | What | Commit |
|---|---|---|
| 0 | Pack in, SITE-PLAN, tokens, fonts, agency removed, wordmark | `f8167d6` |
| — | Pack 3: the marketplace splits off | `b09cb0c` |
| 1 | The whole design system, and `/styleguide` | `0e2b321` |
| — | Pack 4: Tipsy off the site, A9 loses its extras | `a68a84d` |
| 2a | The header, all three panels | `614c514` |
| 2b | Hero: rising cards, decorative suns | `e7e5338` |
| 2c | The footer | `ed73eeb` |
| 3 | Feature template, 46 feature pages, index, 6 group pages | `2dac2b8` |

### What exists, and where

- **Design system:** `components/ui/button.tsx` (A4), `ui/surfaces.tsx`
  (Panel, Card, Sticker, StatusChip — A5), `components/heyday/motion.tsx`
  (SectionReveal, RevealGroup, Parallax — A6), `heyday-mark.tsx` +
  `lib/heyday-mark.ts` (A11, the ported engine), `heyday-line.tsx` (A8),
  `icon.tsx` (A7), `rising-cards.tsx` (A9), `more-info-section.tsx` (A12),
  `decor-suns.tsx` (A10).
- **Data:** `lib/site.ts` (name, placeholders, CTAs), `lib/groups.ts` (the
  six), `lib/heyday-features.ts` (reads the pack's JSON directly — do NOT
  retype it), `lib/stats-bank.ts`, `lib/nav.ts`, `lib/hero-cards.ts`,
  `lib/palette.ts`.
- **Templates:** `components/heyday/feature-page.tsx` (T2).
- **Check everything at once:** `/styleguide`.

### Still to build, in order

| Phase | What |
|---|---|
| 2 (rest) | The homepage's other sections, B4 items 2–12: what Heyday is, the two sideways scrolls, the sticky scroll, the feature rows with more-info, the workflow builder, the story row, the closing block |
| 4 | `/features/ai` (T11), `/how-it-works` (T5), `/who-its-for` (T6), `/stories` + 7 stories (T7) |
| 5 | `/pricing` (T8), `/compare` + 5 (T9), `/integrations` (T10) |
| 6 | `/resources` (T12), 3 tools + quiz (T13, T14), `/templates`, guides and blog (T15) |
| 7 | About, Security, Help, Contact, Demo, Early access, Login, `/for-ai`, `/terms`, `/privacy`, 404, `/whats-new` — and the redirects already in `next.config.ts` |
| 8 | Whole-site pass: links, search metadata, sitemap, robots, keyboard, contrast, reduced motion, 400px |

### Standing rules, learned the hard way

- **The dev server is port 3001**, and `upandup` on 3000 is a different
  site. The browser tab says "Heyday" or "upandup" — that is the only cue.
- **Editing `globals.css` serves stale CSS.** Stop the server, `rm -rf
  .next`, restart, hard-reload.
- **Lint baseline is 7 warnings**, all in old unmounted components.
  Anything above that is new. The React compiler rejects `set-state-in-
  effect` and mutating a ref'd DOM node's style — both have bitten already.
- **Claude cannot see the running site.** Verify with typecheck, lint, HTTP
  status and greps of the served HTML; ask Russell for screenshots.
- **Tipsy Parties is never named on the site.**
- **No invented customers, numbers, prices, ratings or quotes.** Statistics
  come from `lib/stats-bank.ts` by row number and print their source.

---

## 6. Session close — 14 September 2026

Four more commits after the table in section 5:

| What | Commit |
|---|---|
| Handover written into this file | `b8c8dac` |
| Hero cards rebuilt as a CHAIN, not a window | `24c12a8` |
| Hard edges; the strip runs under the header | `0e7fc60` |

### What the hero cards are now

One connected strip of eight cards, stepped up by exactly one card at a time
and holding. Russell rejected the first build — a window with one card
rising at a time — and he was right: that reads as a slideshow of unrelated
screens, where a chain reads as steps in a sequence, and the sequence is the
hero's whole argument.

- `MOVE` 0.55s, `HOLD` 1.15s in `rising-cards.tsx`. Quick step, long hold,
  because the hold is where the card is read.
- The loop is seamless because the first card is rendered again at the end,
  so the reset lands on the same card and cannot be seen.
- **No gradient mask.** A fade reads as mist. Real page furniture does the
  clipping, which is how anyone.com gets a hard edge.

### The one decision open, for Russell

**The bottom of the strip is a hard cut, not an occlusion.**

The top is genuinely covered by the header, which is opaque and fixed at
z-100. The bottom should be covered by the next section sliding over it, as
anyone.com does — but the sections are transparent by design, because the
ground colour fades between them on one fixed layer behind everything.

1. **Give the section after the hero an opaque background** in its own
   ground colour. The cards get properly occluded; that one boundary stops
   fading.
2. **Leave the hard cut.** Visually very close, nothing else changes.

### Where to pick up

Phase 4, per section 5: `/features/ai` (T11), `/how-it-works` (T5),
`/who-its-for` (T6), `/stories` and the seven stories (T7).

Before that, Russell should read the 46 feature pages. They all come from
one template and one data file, so a wrong shape is wrong forty-six times,
and it is far cheaper to fix before phases 4–8 lean on the same patterns.

---

## 7. Build complete — 14 September 2026, overnight

All eight phases are done. **107 pages**, every one returning 200, every
one with a title, a meta description and exactly one `<h1>`.

### What exists

| Phase | What | Routes |
|---|---|---|
| 0–1 | The design system, `/styleguide` | 1 |
| 2 | Header, footer, the homepage rebuilt from the prototype | 1 |
| 3 | The features index, six group pages, 46 feature pages | 53 |
| 4 | `/features/ai`, `/how-it-works`, `/who-its-for`, `/stories` + 7 | 11 |
| 5 | `/pricing`, `/compare` + 5, `/integrations` + 13 | 21 |
| 6 | `/resources`, `/tools` + 3, `/templates`, `/guides`, `/blog` | 9 |
| 7 | About, security, help, contact, demo, early access, login, for-AI, legal, 404 | 11 |
| 8 | sitemap, robots, the crawl and the prototype comparison | — |

### The three scripts, and what they are for

Run the dev server first (`npm run dev:fresh`).

- **`node scripts/crawl.mjs`** — follows every internal link from `/` and
  checks status, title, description and heading structure. This is the one
  that catches a broken link, because a wrong href is still a valid href
  and nothing else on the stack looks at them.
- **`node scripts/vs-prototype.mjs`** — reduces each reference page and its
  live counterpart to visible text and reports what the prototype says that
  the page does not. Content, not markup: the two are built completely
  differently and identical markup was never the goal.
- **`node scripts/check-links.mjs`** — the same link check without a
  server, for literal hrefs only.

### Two traps that cost real time, now fixed in the tooling

1. **Editing `globals.css` while the dev server runs serves the OLD
   stylesheet** under an unchanged chunk hash. The page renders with markup
   that has no rules behind it, which looks like broken HTML — so the time
   goes on hunting a layout bug that isn't there. `npm run dev:fresh`
   avoids it; AGENTS.md has the two-command diagnosis.
2. **`next build` deletes `.next`,** which is what a running dev server
   reads from, so every production build left the preview showing a 500.
   `npm run build:safe` builds elsewhere.

### What is deliberately incomplete

Everything in `docs/heyday/QUESTIONS-FOR-RUSSELL.md`. The short version:

- Every price, the trial, support hours and the phone number are
  placeholders, visible exactly as written.
- `/about`'s story is unwritten, because it is Jem and Russell's and
  because the Tipsy Parties question is theirs.
- `/terms` and `/privacy` are section-by-section structures marked for
  legal review, not documents. **The privacy notice is the load-bearing
  one** — until it exists no form on the site may store anything, which is
  what keeps the early-access form disabled.
- The guides and blog have titles and one labelled sample. No filler.
- `/whats-new` is empty.

### The one open visual question

The prototype draws specific product screens as SVG; ours describe what
each screen shows, labelled as an illustration. That is honest and it is
also the biggest remaining visual difference between the two. Drawing them
properly is the single largest piece of work left, and it needs Russell to
say whether it is worth it — question 4.2.
