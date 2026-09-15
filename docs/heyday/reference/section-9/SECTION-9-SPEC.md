# Homepage section 9 — the AI dial

Lifted from `spec/01-global-and-home.md`, which is the authority. The working build it
describes is `reference/autonomy-dial.html` — open that first; it is the reference, not a mock-up.

Why it matters: Jobber and HoneyBook both sell automation as all-or-nothing. Every product in
Heyday runs at a level the owner sets, and the system asks to be trusted with more rather than
taking it. This section is where that lands.

---

### 9. How much it does for you (the three levels)
- **What it's for:** the single biggest reason to choose Heyday over Jobber or HoneyBook. They sell automation as all-or-nothing. Every product in Heyday runs at a level the owner sets, and they move it, not us. This section has to land that in one screen.
- **Layout:** a heading, then the dial and the task card described below. One line beneath naming the products the levels apply to. (An earlier draft had three static panels on the HeydayLine — the dial replaces them.)
- **Holding copy:**
  - **Label:** `{ the ai }`
  - **Heading:** "AI that works the way you want it to."
  - **Line:** "As much or as little as you want. Not just replies — quoting, pricing, taking bookings, ordering supplies, chasing money and every job task run at a level you set. Start where you're comfortable. Move it up when it's earned it."
  - **Note on the heading:** it is "the way **you want it to**", not "the way you do". The claim is control, not imitation — every AI product on earth says it learns your style; almost none let you decide how far it goes. Do not soften this back to "works the way you do" in a later draft.
  - **Why the heading leads with AI:** it is the word people recognise and search for, and both rivals lead with it. But the heading alone shrinks the claim to written replies, which is a fraction of what this is. **The line underneath is doing the real work** — it has to name the non-message things, or the section reads as "AI writes your emails" and the whole differentiator is lost. Never cut that line for length.
  - **The panels:**
    - **Assistant** — "It tells you what needs doing, and who should do it. You do it." Beneath, smaller: "Nothing happens without you."
    - **Semi-automatic** — "It gets everything ready and waits. You read it, you approve it, it goes." Beneath: "One click instead of twenty minutes."
    - **Fully automatic** — "It does it, and writes down what it did." Beneath: "For the jobs you've stopped thinking about."
  - **The line beneath:** "The same three choices on quoting, pricing, bookings, ordering, chasing money and every job task."
  - **Button:** "See how it works →" (ghost), linking to `/features/ai`.
- **Important:** the first level is **not** "off". Say so in the copy — it still tells you what needs doing and offers to hand it to someone. There is no dead setting at the bottom of the dial, and that is the point.
- **The image — a dial you can turn.** This replaces the three static panels. Working prototype: `reference/autonomy-dial.html`, which is the reference build, not a mock-up.
  - **The dial.** A 180° semicircular gauge, drawn in SVG on a 300×200 viewBox, centre (150,158), radius 108. A cream track, a coloured fill over it, a needle from the centre, and a paper hub. Three marked stops at the left, top and right, captioned `assistant`, `semi-auto`, `fully auto`.
  - **The fill colour changes with the level:** sage at assistant, blue at semi-auto, lavender at fully auto. The fill runs from the left stop to the needle, so the arc reads as "how much of this you have handed over".
  - **Turning it.** Three chips under the dial, one per level, and the whole thing is operable by keyboard — they are buttons with `aria-pressed`, not a drag-only control. A slider that can only be dragged fails for half the people using it.
  - **On first view only**, the dial sweeps the whole range once — assistant, then fully auto, then settles back on semi-auto — so a still screenshot is not the whole story but a reader who scrolls past learns it is a range. Fires from an IntersectionObserver at 40% visibility, roughly 260ms / 1150ms / 2100ms. It never loops.
  - **Motion values.** Six things move, and each one is doing a job — take them from the reference build rather than re-inventing:
    - the **fill** transitions `stroke-dashoffset .75s cubic-bezier(.22,1,.36,1)` and its colour `.45s`;
    - the **needle** `transform .75s cubic-bezier(.34,1.32,.5,1)` — a slight overshoot, because a real dial settles rather than stopping dead;
    - the **stop dot** for the live level takes that level's colour and scales to 1.45 on a spring, so the eye has somewhere to land;
    - a **ring pulses out of the hub** when the needle arrives (r 14→38, fading, .75s), which is what makes it feel like the dial clicked into place;
    - the **sentence and the task card** change over rather than snapping — 9px rise and fade, .42s — and the animation restarts on every change, so repeated clicks always animate;
    - the **card's flag** pops from .82 scale, which draws the eye to the one word that changed ("Needs doing" → "Ready for you" → "Done").
  - Everything above is disabled under `prefers-reduced-motion`, including the opening sweep. Nothing loops, and nothing moves unless the reader moved it.
  - **Default position: semi-automatic**, the middle. It is the most representative level and it means the page at rest shows the approve-and-go story, which is the one that sells.
- **Beside the dial: the same task, three ways.** This is what makes the dial mean anything — do not ship the dial with abstract copy next to it. One real task ("arrange transport for Friday's job"), shown as a card that changes with the level:
  - **Assistant** — a "Needs doing" flag, "Transport not arranged", the job details, and a suggested owner with an Assign button. It has still told you, and offered to delegate.
  - **Semi-automatic** — a "Ready for you" flag, "Van hire, 8am–6pm Friday", "£48.20 · cheapest of 3 quotes", and Approve / Change. Beneath a dashed rule, the trust line: **"You have approved this 11 times without changing it. Shall I start doing it myself?"**
  - **Fully automatic** — a "Done" flag, what it booked, "£48.20 paid and logged to the job · Sam and the client sent tracking", then **"Did I get this right?"** with Yes / Nearly / No.
  - Those last two cards carry the two ideas that make this product different — it asks to be promoted, and it asks whether it got it right. They belong in the image, not in a paragraph underneath.
- **Layout:** two columns inside one bordered panel — dial and chips on the left (max 340px), the level sentence and the task card on the right. One column under 760px, dial first.
- **Do not:** let the card height jump as the level changes. Reserve the space; a panel that resizes under the pointer feels broken.
- **Do not:** let this become only about written replies. The heading says AI because that is the recognisable word; the section is about every automated action in Heyday. If a draft of this page ends up with three panels all about email, it has gone wrong.
- **[needs approval]** Level names. "Assistant / Semi-automatic / Fully automatic" is the current wording. Alternatives considered: "Remind me / Ask me / Just do it", which is warmer but less clear in a nav or a settings screen where the same three words have to work.
