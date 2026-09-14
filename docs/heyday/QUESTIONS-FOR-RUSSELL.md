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
