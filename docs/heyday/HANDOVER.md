# Handover — read this first

**Written 15 September 2026, at the end of the session that built the site.**

Everything is committed and pushed to `redesign/mono-binary-intro` on
`github.com/tipsyparties-cyber/jobbie`. Working tree clean.

---

## 1. Read these, in this order

| | |
|---|---|
| This file | Where things stand, and the one job that is half done |
| `QUESTIONS-FOR-RUSSELL.md` | What is waiting on a decision. **Section 7 is answered — do not re-ask it** |
| `SITE-PLAN.md` § 7 | Every route, the checking scripts, the two dev traps |
| `logo/HEYDAY-LOGO-SPEC.md` | The new mark and its seven animations |
| `reference/site/pages.html` | **The prototype.** Every template as a working page |
| `reference/screenshots/` | Russell's own screenshots, saved because the chat ones do not survive |

---

## 2. Where the site is

**112 routes. All 200. Typecheck, build and lint pass** — lint at the
7-warning baseline, all seven in old unmounted components.

Phases 0–8 are done. The homepage, 46 feature pages, six group pages, the
AI page, How it works, Who it's for, seven stories, pricing, five
comparisons, thirteen integration pages, three working tools, templates,
guides, blog, and every company and utility page.

### Run it

```bash
npm run dev:fresh     # port 3001. USE THIS ONE
npm run build:safe    # build without killing a running dev server
```

Then, with it running:

```bash
node scripts/crawl.mjs         # status, title, description, h1, every page
node scripts/vs-prototype.mjs  # each page against its reference page
```

### Two traps that have each cost real time

1. **Editing `globals.css` while the dev server runs serves the OLD
   stylesheet.** The page renders with markup that has no rules behind
   it, which looks like broken HTML — see
   `reference/screenshots/08-stale-css-symptom.png` for what that looks
   like, because it is not obvious. `dev:fresh` avoids it. Diagnosis is
   in AGENTS.md.
2. **`next build` deletes `.next`,** which is what a running dev server
   reads from, so a plain build leaves the preview showing a 500.
   `build:safe` builds elsewhere. This caught me out twice.

---

## 3. THE LOGO REPLACEMENT — DONE, AND WHAT IT COST

**Jem's new mark replaces the eight-ray sun everywhere.** Russell's
decision, and it was not "alongside". It is now done.

### What the mark does now

| Where | Motion |
|---|---|
| Header lockup | Assemble on load, Click round on hover |
| Footer | Spin |
| Group pages, closing blocks, the homepage's last block | Together, once, as they arrive |
| "It runs itself", the AI page's Autopilot level, "See every feature" | Spin |
| The AI page's middle level | Beat |
| 404 | Click round — a wrong turn |
| Everything small: menus, breadcrumbs, pricing rows, quiz results, holding images | Still |

All seven animations are in `globals.css`, taken from the spec verbatim,
and the styleguide shows them side by side with where each belongs.

### The morph is gone. Russell should know that.

The old sun could fold into six group shapes, a Loop and an Infinity.
That is gone, and it was a lot of the site's character. **It was not
dropped to save effort** — two lines in the logo spec rule it out:

- § 7, Don't: *"Redraw, re-trace, stretch, skew, or rotate it (except the
  Click round and Spin animations)."* A morph into six other shapes is
  redrawing it.
- § 8, Still to do: *"The six section shapes and the 46 feature icons are
  still drawn from the **old** sun and need redrawing from this mark."*
  So there is nothing to morph into until Jem draws them.

The morph also only worked because all seven shapes were *the same eight
strokes and one core* on a 100-unit square. The new mark is three filled
paths. The two systems never could have interoperated.

**What took its place, one for one:**

| Was | Now |
|---|---|
| Six group shapes | One mark in six colours. A group is told apart by its **colour and its number**, both of which were already in the data |
| The group page's hero morphing out of the sun | The mark at 260px in the group's colour, arriving on Together |
| `MoreInfoSection`'s grow — the best thing on the site | **Kept.** A disc behind the mark fades in as it scales, so the colour floods out of it; the mark fades into the flood. The disc is what the old engine's `boost` was doing |
| The homepage closing block's pass through six shapes | Together, once |
| Loop and Infinity on the AI levels | Beat, then Spin |
| The footer's cycle through six shapes | Spin |

**If Jem draws six new section shapes from this mark, the morph can come
back** — the engine is in git at `920f2a6`, in `src/lib/heyday-mark.ts`
and `heyday-shapes.json`. That is the only thing that would bring it
back, and it is Jem's call, not a coding problem.

### The lockup was wrong, and is fixed

Two things Russell spotted in the header, both real:

1. **The word was the old PNG, set with a capital H.** The spec is
   explicit: *"Always lowercase: heyday. Not Heyday, not HeyDay."* It is
   now live text in DM Sans Bold at −0.02em, which is also what lets it
   take `currentColor` and stay selectable.
2. **The mark was drawing a quarter smaller than the number said.** The
   spec's viewBox of `-16 -16 132 132` is 32% padding, so `size={28}`
   drew a 21px mark. `HeydayLogo` now grows the *box* by the padding
   instead, so `size` means the mark. Every small mark on the site was
   affected, not just the header.

Header is now mark 24, gap 3px, word 22. Footer is mark 26, gap 3px,
word 24 — the spec's own proportions.

### The favicon is the pack's files now

The 160×153 screenshot crop is gone. `public/favicon-{16,32,48,512}.png`
are the pack's, each built from its 512 rather than scaled from a smaller
one, and `apple-touch-icon.png` is the badge flattened onto its own blue
so iOS does not mask black corners onto it.

**The blue tile, not the transparent mark.** The spec leaves that open for
Jem, but Russell chose paper-on-blue when he asked for the favicon. One
rename away if Jem disagrees.

---

## 4. Decisions Russell made this session

Recorded so they are not re-litigated.

| Decision | Where |
|---|---|
| **The hero is the prototype's** — blue panel, cards rising through it, dots underneath. Not the chain. He asked for the chain, then saw the prototype and asked for that | `reference/screenshots/01-prototype-hero.png` |
| **The feature rows** — group label, highlighted phrase, ghost button, 320px shape, alternating sides | `02-prototype-feature-rows.png` |
| **The old way / the Heyday way** section, on the homepage after the statement | `04-anyone-com-old-vs-new.png` |
| Its **day-to-night is driven by the scroll**, not a timer, and finishes before you reach the next section | — |
| The **sky is the section's background**, not the cards' | `05-my-old-vs-new-v1.png` is the version he rejected |
| **The one-inbox animation** on `/features/inbox` | `03-anyone-com-inbox.png` |
| **The favicon is the new mark** | `06-new-master-logo.png` |
| **The new mark replaces the sun everywhere**, and the header uses Assemble | — |
| **The project is "Heyday Jobbie"** so it can be told from the marketplace project. The PRODUCT is still Heyday, one word, on every page | `src/lib/site.ts` — `PROJECT` |

---

## 5. Things I decided, that he may want to overrule

All in `QUESTIONS-FOR-RUSSELL.md` § 3, but the three worth knowing:

- **`/contact` has no form** and `/login` has no password box. A form that
  stores nothing is worse than none; an empty sign-in box collects
  passwords people reuse.
- **The guides and blog are empty** — titles and one labelled sample.
  I did not write filler.
- **`/terms` and `/privacy` are structures marked for legal review**, not
  documents. **The privacy notice is load-bearing**: until it exists, no
  form on the site may store anything, which is what keeps early access
  disabled.

---

## 6. The rules that shape the code

From the brief, and non-negotiable:

- **No invented customers, numbers, prices, ratings or quotes.** Every
  statistic comes from `src/lib/stats-bank.ts` by row number and prints
  its source, who it covers and what kind of evidence it is. Row 1 is a
  direct rival's own data and says so.
- **Every feature says "Coming soon".**
- **Placeholders stay visible**, exactly as written. `src/lib/site.ts`.
- **Tipsy Parties is never named on the site.**
- **No other company's logo** until Jem confirms. Use names.
- **Orange `#F26B2A` is a fill, never text**, and never touches yellow.
- **People in product illustrations are roles**, never invented names.
- **Nothing is drawn as a screenshot** of software that does not exist.
  Illustrations describe what a screen shows, labelled as illustrations.

---

## 7. How the code is shaped

Words live in data; pages come from templates. 46 feature pages are one
component and one JSON file, so the menu and the pages cannot disagree.

| | |
|---|---|
| `src/lib/` | features, groups, flow, stats-bank, compare, integrations, tools, stories, pricing, company, articles |
| `src/components/heyday/` | the design system and page furniture |
| `src/app/(home)/` | the homepage — 20 sheets |
| `src/app/(site)/` | everything else, one shell in the layout |

**`Sheet`** is the mechanic behind every marketing section: opaque, its
own colour, 56px rounded top, -56px margin, and it fades from the
previous sheet's colour as it arrives. That is what lets a section both
cover the one before it and still fade — which is what fixed the hero's
hard edge.

**`featureHref()`** throws at build time on an unknown slug. Seven
homepage links were wrong before it existed, because a wrong href is
still a valid href.
