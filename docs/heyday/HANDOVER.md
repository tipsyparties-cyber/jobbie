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

## 3. THE JOB THAT IS HALF DONE

**Jem's new mark replaces the eight-ray sun everywhere.** Russell's
decision, and it is not "alongside".

### Done

- `src/lib/heyday-logo-paths.ts` — the mark's three sub-paths, split out
  of `logo/assets/heyday-mark-jem.svg` and named by geometry. The two
  nested curves are the arcs; the one spanning the diagonal with the rays
  is the burst.
- `src/components/heyday/heyday-logo.tsx` — `HeydayLogo`, exposing
  `.outer` / `.inner` / `.burst` inside `<g class="all">`, which is what
  every animation in the spec acts on.
- All seven animations in `globals.css`, taken from the spec verbatim.
- **Header**: Assemble once on load, click-round on hover.
- **Footer**: Spin.
- **DecorSuns**: the big marks in the hero and sections — the ones in
  `reference/screenshots/07-decor-suns-to-replace.png`.
- Favicon and app icon still point at `public/favicon.png`, which is a
  **160×153 screenshot crop**. The pack has proper files now
  (`logo/assets/heyday-favicon*.png`, up to 512, plus a full-bleed
  variant for the home-screen icon). **Swap those in — it is five
  minutes and it is the first thing to do.**

### Not done, and it needs a decision before it can be

Everything built on the **morph engine** still uses the old sun:

- `src/lib/heyday-mark.ts` + `heyday-shapes.json` — the engine
- `src/components/heyday/heyday-mark.tsx` — `HeydayMark`, `SectionMark`
- The six group section marks, plus the Loop and Infinity
- `MoreInfoSection` — the shape grows to fill a feature row
- The AI page's sun → Loop → Infinity as the levels rise
- The 404's bounce-and-become-the-Loop
- The leak check's per-group result marks
- The loading state (a spinning Loop)

**Why this is not a swap.** The morph works because all seven shapes are
*the same eight strokes and one core* on a 100-unit square — every point
has somewhere to travel to. Jem's new mark is three filled paths with a
different construction. The two systems do not interoperate.

**So somebody has to decide:**

1. Do the six groups still get their own marks? If so, what are they now?
2. If not, what does a group page's hero show, and what does the features
   index put beside each group heading?
3. What replaces `MoreInfoSection`'s grow — the shape swelling until the
   section is its colour? That is one of the nicest things on the site.
4. What replaces the Loop and Infinity on the AI page's three levels?

**Do not quietly drop the morph.** If the answer is that it goes, say so
to Russell explicitly, because it is a lot of the site's character and he
should choose to lose it rather than discover it gone.

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
