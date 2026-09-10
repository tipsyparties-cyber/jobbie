# Monochrome re-skin + binary intro — design

Date: 2026-09-10
Branch: `redesign/mono-binary-intro`
Baseline: `2f82f4a` on `master` (pre-redesign design is fully recoverable there)

## Goal

Re-skin the site from its current warm palette (white text on a coloured
blob field, orange accent) to black text on off-white, greyscale
everywhere, with colour surviving only as low-saturation iridescence in
the blurred background. Add a new full-screen binary-rain intro section
that resolves into the `up+up` wordmark.

Layout, transitions, animation timings and particle counts are preserved
throughout. Exactly one thing is deleted — see §5.

## Reference images

1. Iridescent soap bubble on pale blue-grey — the ambient colour licence
2. White-on-white luminous circular forms ("COYOTE") — the background field
3. + 4. Greyscale binary digits, dense at top fading downward, shapes formed
   by density alone — the intro section and the mono palette

## 1. Palette

| Token | Current | New |
|---|---|---|
| ground | `#C4BAB0` warm blob base | `#F4F6F8` cool off-white |
| body text | `white` | `#0A0A0A` near-black |
| `--color-accent` | `#E8652E` orange | removed; black or grey per use site |
| `cream` `peach` `coral` `lavender` `silver` | warm pastels | greyscale ramp |
| `--shadow-neo*` | tuned for cream | recomputed for `#F4F6F8` |

Roughly 230 `text-white` / `bg-white` / `border-white` utilities across 25
files invert to black and grey. Six hardcoded hex values in components
(`neo-card`, `project-card`, `comparison`) get tokenised on the way past.

Accent is currently load-bearing in: `not-found` 404 label, diagnostic-form
required asterisks and focus rings, comparison checkmarks and panel border,
project-teaser link, service-section ticks, project-card ticks. Each becomes
black or a grey, decided per site — none become a colour.

## 2. Background field

All five blobs keep their exact `drift-1`..`drift-5` keyframes and durations
(12s / 15s / 13s / 16s / 14s) and their `blur(100px)`. Only fills change:
white through `#E8ECF0`, carrying a very low-saturation iridescent tint —
pink, cyan, pale gold. Behind the blur these read as light moving under the
page, never as coloured shapes.

**This is the only place any colour exists on the site.**

## 3. New first section — binary intro

Full viewport, first thing on the home page. Canvas, monospace digits on a
~16px grid.

```
Phase 1  rain fills the screen, top to bottom
Phase 2  digits inside the up+up letterforms hold hard black;
         every digit outside fades to pale grey
         -> the wordmark emerges out of the noise (density, never an outline)
Phase 3  the field fizzles out a few digits at a time, randomly staggered,
         Matrix-style, until only up+up remains
Phase 4  up+up rises into the header and settles dead centre
```

The letterform mask is produced by rendering `up+up` to an offscreen canvas
and reading its pixel alpha, so the mask is font-accurate rather than an
approximation. Fewer, larger cells on mobile.

`prefers-reduced-motion`: static wordmark, no rain. `globals.css` already
has the media block; this must honour it rather than rely on it, since the
animation is canvas-driven and CSS cannot neutralise it.

Phase 4 happens automatically at the end of the sequence, not on scroll.

## 4. Header

`Contact` (left) · `up+up` (centre) · hamburger (right). Site-wide, so every
page is consistent. On the home page the centred logo arrives from the
binary section; elsewhere it is simply present from first paint.

## 5. Existing hero — the one deletion

`hero.tsx` currently opens by fading `up+up` in at centre (6rem) and flying
it to the top-left at 1.5rem. That stage is removed, because the wordmark
now arrives from the binary section instead. Without this deletion the
wordmark introduces itself twice in a row.

Everything else in the hero survives unretimed:
- seeded-random headline float-up from `100vh` (`FloatingWords`)
- `RotatingWord` at 6s
- `ScrollChevron`
- three vertical rules and the concentric-circle SVG (`data-parallax="0.3"`)

## 6. Canvas animations

`particle-canvas` (2000 stipple points), `neural-network`, `particle-journey`,
`why-us-canvas` recolour to black and grey on white. Same motion, same
particle counts, same durations.

## Non-goals

- No layout changes
- No typography changes — Cormorant Garamond display + Inter body stay, as do
  all sizes and weights. Colour only.
- No new components beyond the binary intro
- No retiming of any existing animation

## Decision log

- **Wordmark is `up+up`, not `up&up`.** `&` appears only in the repo name
  `upandup`. Code and page title both use `up+up`. Confirmed with Russ.
- **Density hold chosen over freeze-and-settle and full-drain.** Density hold
  is the only one that reads as reference images 3 and 4 rather than as
  Matrix; it keeps the page pale throughout (full-drain needs ~1s of solid
  black, harsh on a near-white site); and it degrades gracefully — a slow
  device still shows digits and a wordmark.
- **Binary intro is a separate first section, not folded into the hero.**
  Russ's call. Consequence is §5.
- **Iridescence confined to the blurred ambient field.** Rejected both strict
  monochrome (loses reference image 1 entirely) and mono-plus-one-accent
  (most usable, least like the references).
- **Typography left alone.** Offered a tighter single sans to match the
  starker COYOTE/binary feel; Russ chose to keep as-is for now.
