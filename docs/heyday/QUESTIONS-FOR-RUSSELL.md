# Questions for Russell

**Written overnight, 14 September 2026.** The whole site is built. These are
the things I could not decide for you, in the order I'd tackle them.

Nothing here is blocking — every one of them has a visible placeholder on
the page right now, so the site works and nothing is pretending to be
finished. But a few of them are on a lot of pages at once.

---

## 1. The five that are on the most pages

These have the widest reach, so they're worth answering first even if the
answer is "leave it for now".

### 1.1 Do we credit Flashquotes by name?

**Where:** the homepage stats band, the goal tabs, the Instant quotes page,
the Win the client group page, and the quote calculator. Five places.

Row 1 of the stats bank — *"quotes sent within 4 hours book 25% more
often"* — is **Flashquotes' own published data**, and Flashquotes is a
direct competitor. It's the single most persuasive number available to us,
and it's the engine of the calculator on the Quotes page.

Right now every use of it says so, including the words "vendor data, from a
direct rival", and the feature page carries `[crediting a rival: Jem and
Russell to decide]` in the source line.

**Three options:**

| | What happens |
|---|---|
| **Credit them** (current) | Honest, and the number is strong. But we send readers the name of a rival who does the quoting bit well. |
| **Swap to row 2** | Harvard Business Review, "seven times as likely to qualify a lead within an hour". Independent, stronger provenance, but it measured leads *qualified*, not bookings — so it says less. |
| **Drop the number** | Safest, weakest. |

**My view:** credit them. The number is about reply speed, not about
Flashquotes, and a site that quotes a rival by name is a site people
believe on everything else. But it's your call and it's genuinely arguable.

### 1.2 The plan names — Solo, Crew, Operator

Every one is marked "(suggested name)" on the pricing page and in the
comparison table. They're mine, from the three stages in the brief. If you
have better ones, changing them is one line in `src/lib/pricing.ts`.

### 1.3 Support hours

`[support hours to confirm]` appears on **pricing, help, switching, the
compare pages, and the resources hub**. Even a rough answer ("9–9 weekdays,
weekends during event season") would remove six placeholders.

### 1.4 What the trial actually is

`[trial to confirm]` is on the pricing page and every compare page. The
question is narrower than it looks: **is there a free trial at launch, or
does early access go straight to a paid plan?** HoneyBook gives 30 days
with no card; Jobber's is shorter. Whatever we say, the compare pages need
it because the rivals' trials are listed beside ours.

### 1.5 The phone number

`[PHONE TBC]`. The header is already built to **hide the phone entirely
until there's a real number** — it checks whether the placeholder is still
in place. So this one costs nothing to leave, but it's the only thing
stopping the header matching the brief exactly.

---

## 2. Decisions only you and Jem can make

### 2.1 The About story

`/about` has the headings and the placeholder: *"[Heyday's story: Jem and
Russell to write. It doesn't mention Tipsy Parties unless they decide it
should.]"*

I have deliberately not written a founding story. Two reasons: it would be
invented, and the Tipsy Parties question is yours.

**The question underneath it:** does Heyday say where it came from? There's
a real argument that "built by people who ran this exact business for ten
years" is the strongest thing we could say, and right now the site can't
say it. The brief forbids naming Tipsy Parties until you both decide.

### 2.2 The three people on the About page

Three placeholder portraits with `[Name TBC]` and `[Role TBC]`. Is it three
people? Two? Do you want photographs on the site at all?

### 2.3 Prices

`[PRICE TBC]` in about twelve places. I know this isn't ready. Worth saying:
the **card fees** matter more than the plan prices for launch, because the
pricing page promises to show them before sign-up — that's a Jobber habit
worth copying and it's currently four `[TBC]`s.

---

## 3. Things I decided, that you should look at and overrule if wrong

I made these calls to keep moving. Each is one line to change.

### 3.1 The hero is the prototype's, not the chain

You asked for a chain of cards, then saw the prototype and asked for that
instead. It's now the prototype's: blue panel, cards rising through it one
at a time, dots underneath. **The chain is gone.** If you want it back it's
in git history at commit `0313503`'s parent.

### 3.2 /contact has no form

A form that stores and sends nothing — which is all any form here may do
until the privacy notice exists — is worse than no form, because someone
types a real question and never hears back. The page says why and points at
early access. **If you'd rather have a form that goes to an email address,
tell me the address and it's twenty minutes.**

### 3.3 /login has no password box

Same reasoning, sharper: there are no accounts, so a sign-in form could
only collect passwords it has nowhere to send. Some of those would be
passwords people reuse elsewhere. The page explains itself.

### 3.4 The guides and blog are empty

Three guide titles and two post titles, all marked "Coming soon", plus one
sample article that says SAMPLE at the top and is noindex.

I did not write the guides. A guide on pricing a class, written by someone
who has never priced one, is filler that gets linked and quoted and
eventually believed. **If you want a real one, the pricing-calculator page
has most of a guide in it already** — I could turn that into "How to price
a class" quite honestly, because the maths is real.

### 3.5 /terms and /privacy are structures, not documents

Both carry a NOT YET LEGAL TEXT sticker and a section-by-section outline of
what belongs in each. They're noindex.

**The privacy notice is the load-bearing one.** Until it exists, no form on
the site may store anything — that's what's keeping the early-access form
disabled. It's the single unblock that turns the site from a brochure into
something that collects sign-ups.

The section a lawyer should spend most time on is **"the AI, and who is
responsible for what it sends"**. Level 3 sends messages in a customer's
name. That's a genuinely novel liability question and I'd not guess at it.

### 3.6 Check Cherry's comparison page is thin, on purpose

The other four compare pages are detailed. Check Cherry's says, in as many
words, that we haven't audited them to the same depth and won't publish a
rival's weaknesses we haven't checked. **Either give me time to audit them
properly, or leave it as it is** — but don't let me fill it in from
guesswork.

---

## 4. Two things worth a look before launch

### 4.1 Every rival fact needs rechecking on the day

The compare pages carry facts read from HoneyBook's and Jobber's own pages
on **13 September 2026**, and each page says "check again before
publishing". Prices in particular move. The date is a single constant in
`src/lib/compare.ts`.

### 4.2 The prototype comparison

`node scripts/vs-prototype.mjs` (with the dev server running) reports what
the prototype says that each live page doesn't. Most templates are now
90%+; the homepage is 83% and the two biggest templates are around 72–77%.
Most of what's left is illustration detail — the prototype draws specific
example screens and ours describe them.

**That's a real difference and worth a decision:** do you want me to draw
the product screens properly as SVG, the way the workflow-builder still is
drawn? It would take a while and it's the single biggest remaining visual
gap between our site and the prototype.

---

## 5. Where everything is

- **`docs/heyday/SITE-PLAN.md`** — every route, its template, and its status.
- **`docs/heyday/DECISIONS-NEEDED.md`** — the pack's own list, which this
  document does not replace.
- **`npm run dev:fresh`** — starts the dev server with a clean build.
  Use this one; plain `npm run dev` can serve a stale stylesheet.
- **`npm run build:safe`** — builds without killing a running dev server.
- **`node scripts/crawl.mjs`** — checks every page loads and has proper
  metadata. 107 pages, all passing.
- **`node scripts/vs-prototype.mjs`** — the prototype comparison above.

---

## 6. Added later — the new master logo

**I need the vector.**

The new logo is in as the favicon and it looks right in a browser tab.
But the file I had to work from is a **160×153 screenshot crop**, taken
from the image in chat, because no source file was available.

That is genuinely fine for a favicon — a tab renders it at 16 or 32px.
It is not fine for anything else:

- **The home-screen icon** is 180px, so a 160px source is already being
  stretched. It currently points at the same file and is passable rather
  than good.
- **The crop has the rounded cream tile baked in.** iOS applies its own
  mask to a home-screen icon, so a tile that is already rounded shows a
  pale halo at the corners. A full-bleed version fixes it.
- **Share images** are 1200×630 and would be unusable from this.

**What would help, in order:** the SVG. Failing that, a PNG at 512px or
more, ideally two — one with the tile and one of the mark alone on
transparency.

**A second question while the logo is open:** the site still uses the
eight-ray sun from the brief pack — in the header, the footer, the group
marks, the 404 and the morphing shapes. Is the new mark replacing that
too, or is it a logo that sits alongside the sun the way a wordmark does?
That answer changes a lot more than the favicon, so it is worth being
explicit about.

---

## 7. ANSWERED — the logo, 14 September 2026

Russell's answers to the two questions in section 6. **These are decided.
Do not re-ask them.**

### 7.1 The new mark REPLACES the eight-ray sun everywhere

Not alongside it. Everywhere.

That is a bigger job than a favicon swap, because the sun currently does
real work across the site, not just decoration:

- `HeydayMark` — morphs out of the sun into each of the six group shapes
- `heyday-mark.ts` / `heyday-shapes.json` — the morph engine, 8 strokes
  and a core on a 100-unit square, ported from Jem's motion script
- The six section marks, plus Infinity and the Loop
- `DecorSuns` — the large sage/lavender/sky marks in the hero and the
  sections (these are the ones in Russell's screenshot)
- The footer's slow cycle through the six shapes
- The 404's bounce-and-become-the-Loop
- The AI page's sun → Loop → Infinity as the levels rise
- The loading state (a spinning Loop)
- `MoreInfoSection` — the shape grows to fill the row
- The leak check's per-group result marks

**The open question this creates:** the morph only works because all
seven shapes are the same eight strokes and one core, so every point has
somewhere to travel to. If the new mark is not built on that skeleton,
the morph cannot be kept — and the group shapes, the Loop and Infinity
all have to be rethought with it. Read `docs/heyday/logo/HEYDAY-LOGO-SPEC.md`
before touching any of this, and if the two systems are incompatible,
say so rather than quietly dropping the morph.

### 7.2 The header logo animates with "the assemble version"

The assemble animation from the logo pack, not the bounce it does now.

`docs/heyday/logo/HEYDAY-LOGO-SPEC.md` should describe it. Build from
that rather than from a guess.

### 7.3 Also asked, in the same message

Animate some of the icons used around the site. No further detail given,
so use judgement and keep it to the motion table's spirit: movement lands
one point, and anything not listed stays still.

---

## 8. The logo swap is finished — two things for Jem

**Done, 15 September 2026.** The mark is everywhere the sun was; the
header lockup is the spec's geometry with the word as live lowercase
text; the favicon and app icon are the pack's files. Full account in
`HANDOVER.md` § 3.

### 8.1 The morph is gone, and you should know before you notice

The sun used to fold into six group shapes, a Loop and an Infinity. That
was a lot of the site's character and it has gone.

It is not a coding decision. The logo spec forbids redrawing the mark
(§ 7), and § 8 says the six section shapes "need redrawing from this
mark" — so there is nothing to morph into yet.

A group is now told apart by **its colour and its number**. The grow on
the feature rows survived: the mark floods its colour out to fill the
section, which is the same idea by other means.

**If Jem draws six shapes from the new mark, the morph comes back.** The
engine is still in git history. That is the only route back and it is
Jem's call.

### 8.2 Transparent favicon, or the blue tile?

The logo spec leaves this open (§ 5, "Still open"). The **blue tile** is
shipped, because that is the colouring you asked for. Say if you'd rather
have the transparent mark — it is five filenames.

### 8.3 DM Sans is now loaded for one word

The spec requires the wordmark in DM Sans Bold, and the site did not have
it. It loads at one weight and is used by one component, so it is one
font file. Worth knowing it is there.

---

## 9. Homepage section 9, the AI dial — built 15 September 2026

Built from your section 9 pack, which is now saved at
`docs/heyday/reference/section-9`. The three static panels (Draft, Draft and
train, Autopilot) are gone from the homepage; the old spec text is kept in
`spec/01-global-and-home.md`, marked superseded.

### 9.1 I fixed one thing in the reference build

The reference rotates the needle the wrong way. At "assistant" it points
down and to the right, away from the assistant stop; at "semi-auto" it points
below the dial. The coloured fill in the same file is right, so it was only
the needle's starting angle. The site's needle points at the stop each level
names. Everything else (geometry, timings, copy) is taken from the reference
unchanged.

### 9.2 "Sam" is an invented name, and the site has a rule against those

The task card says "Suggested: Sam, ops" and "Sam and the client sent
tracking". It is shipped exactly as your pack wrote it, because the pack says
not to rewrite the copy. But every other product picture on the site follows
the brief's rule that people are roles, never names, since an invented name
reads as an invented customer. If you want it consistent, "Suggested: your
ops lead" and "Your ops lead and the client sent tracking" is a two-line
change.

### 9.3 The level names — marked [needs approval] in the pack

"Assistant / Semi-automatic / Fully automatic" is shipped. The pack notes
"Remind me / Ask me / Just do it" as the warmer alternative.

**Worth knowing before you decide:** the `/features/ai` page still calls the
three levels "Draft", "Draft and train" and "Autopilot". So right now the
homepage and the AI page use different names for the same three settings.
Whichever names you approve, that page needs changing to match. I have not
touched it, because it was not in the pack.

### 9.4 New copy under the dial — mine, not the pack's (16 September 2026)

You said the section needed more copy selling the fact that the customer is
in control of how automated everything is. I added three points under the
panel. They are holding copy and you should change them freely:

- **You set it, and you can unset it.** Start where you're comfortable. Move
  it up when it has earned it, and move it back down whenever you want.
- **One job at a time, not all or nothing.** Let quoting run itself while
  payments still wait for your say-so. Every part of the work has its own
  setting.
- **Nothing happens quietly.** Every automatic action is written down — what
  it did, what it cost and who it told — so you can check it after the fact.

Each one describes something the site already says elsewhere rather than a
new promise: the dial's own three levels, the pack's line that the same three
choices apply to every job task, and the fully automatic card that writes
down what it did. **One thing to confirm: "move it back down whenever you
want."** The `/features/ai` page says level 3 has one switch to stop it and
each message type is switched on separately, which is where I take that from
— but if turning a level back down is not going to work that way, say so and
it comes out.

### 9.5 The yellow footer breaks a palette rule, deliberately (16 September 2026)

You asked for a yellow footer in the shape of the all.inn one. It is built:
yellow ground, the link columns, a round "Up" button top right, and the
wordmark across the full width at the bottom. The block above it is paper
(white) instead of sage.

**Two things in A2 that this touches:**

1. **"Yellow is highlights only, never a ground."** Overruled by you, and
   noted in the footer's own comment so nobody quietly reverts it.
2. **"Orange never touches yellow."** This one I handled rather than broke:
   the footer's "Start free trial" button is now the `dark` (ink) button
   instead of the orange one. The button set already had `dark` for exactly
   this case. Every other orange button on the site is untouched.

If you would rather the footer keep an orange button, tell me — but the two
colours side by side is the thing the brief is most explicit about.

### 9.6 The footer is orange now — and why not purple (17 September 2026)

You asked whether to try purple, and what would best separate Heyday from
HoneyBook. Purple is the wrong way round:

**Every pastel on this site was taken from honeybook.com.** The SaaS brief
lists them: cream, sage, blue, yellow, paper and lavender. The design brief
says outright that "the colours alone won't set us apart", and
`src/lib/palette.ts` says the same at the top of the file. So a lavender
footer would be a HoneyBook colour on the biggest block of the page.

**Orange and ink are the only colours here that are Heyday's own.** The
first thing the brief names as what makes the site look like Heyday and not
HoneyBook is "Heyday orange (#F26B2A) for every action". So the footer is
orange, with the wordmark and all its text in ink.

Two rules kept while doing it: orange is a fill and never text, so ink sits
on it at about 6:1; and no faded ink, because ink at 60% over orange drops
to roughly 3.5:1 and stops being readable. Nothing yellow may go in this
footer, and the call to action stays the ink button.

**Switching is one word** in `site-footer.tsx` — `bg-orange`, `bg-yellow`,
`bg-lavender` or `bg-cream` — if you want to see any of the others.

**The brief's own list of what actually separates you from HoneyBook**, none
of which is colour: orange on every action; thin ink outlines and hard
offset shadows with no blur; buttons whose corners round off on hover;
grotesque type with a mono for small labels and no serif; airy 56px
overlapping sheets; the rising cards in the hero; and our own icon set. All
seven are already built.
