# Paste this into Claude Code

Build homepage section 9 — the AI dial.

## Read these first, in this order

1. `heyday-section-9/reference/autonomy-dial.html` — open it in a browser and turn the dial. This is
   a working reference build, not a mock-up. The geometry, the motion values and the copy in it are
   all correct; take them from here rather than reinventing them.
2. `heyday-section-9/SECTION-9-SPEC.md` — the written spec. Where it and the reference disagree, the
   spec wins.

## Then, before writing any code

Read the existing site's design system and match it. Do not import anything from the reference build's
stylesheet — it is standalone on purpose, and its CSS is throwaway. Specifically:

- Use the project's existing colour tokens, not the hex values hard-coded in the reference.
- Use the project's existing type scale, heading component and section-label component. The reference
  sets fonts inline; your build must not.
- Use the project's existing card/panel component for the bordered container and for the task card,
  including its border weight, corner radius and hard-shadow offset. If the site's cards are 2px ink
  border, 16px radius and an 11px hard shadow, this section's cards are too — no bespoke values.
- Use the project's existing button and chip components for the three level buttons and for the
  Approve / Change / Yes / Nearly / No controls.
- Match the vertical rhythm of the sections either side of it. This section should not be taller,
  tighter or more padded than its neighbours.
- Match how other sections reveal on scroll. The dial's own motion is specified separately below;
  the section's arrival should use whatever the site already does.

The only thing that should be genuinely new CSS is the dial SVG itself.

## What the section contains

- Section label, heading and line — copy exactly as specified. **Do not rewrite the copy.** The line
  beneath the heading must keep the list of non-message things (quoting, pricing, bookings, ordering,
  chasing money); without it the section collapses into "AI writes your emails" and the point is lost.
- The dial, with three stops and three level buttons.
- Beside it, the level sentence and one real task card, both changing with the level.
- One closing line.

## Things that will be got wrong if not said

- The three levels are **buttons with `aria-pressed`**, not a drag-only slider. Keyboard and screen
  reader users must be able to change the level.
- **Default position is semi-automatic**, the middle. The page at rest shows the approve-and-go story.
- **The card must not change height between levels.** Reserve the space; a panel that resizes under the
  pointer reads as broken.
- The opening sweep runs **once**, on first scroll into view, and never loops.
- All motion is disabled under `prefers-reduced-motion`, including the opening sweep.
- The mark in `reference/heyday-mark-jem.svg` needs `fill-rule="evenodd"` or it fills in solid.

## When you are done

Show the section at 1440px, 900px and 390px wide. Check it against the section above and below it in
the live page — if it reads as a different designer's work, it is not finished.
