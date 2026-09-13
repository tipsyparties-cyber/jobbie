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
