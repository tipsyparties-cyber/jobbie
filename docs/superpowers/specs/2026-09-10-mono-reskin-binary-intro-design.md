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

---

## Addendum — findings during implementation, 2026-09-10

Corrections to §4 and §5 above. The original text is left intact; these
supersede it where they conflict.

### `hero.tsx` is dead code

Nothing imports `src/components/home/hero.tsx`. The real home hero is the
section with `id: "hero"` inside the `sections` array in
`src/app/(home)/page.tsx`. **The deletion described in §5 therefore does not
apply and was not carried out** — `hero.tsx` is left exactly as it was.

### The home page is a section stepper, not a scrolling page

`(home)/page.tsx` renders `fixed inset-0 overflow-hidden` and steps between
14 sections via wheel / touch / keyboard / mouse-at-bottom-edge, with a
1500ms throttle. There is no document scroll on the home page at all.

### The intro slot already existed

`currentSection === -1` was already a dedicated pre-intro state: the logo
faded in centred at 6rem, held 1.5s, flew to the top-left at 1.5rem, and
then `currentSection` advanced to 0. The binary intro drops into exactly
this slot rather than adding a new section to the array.

### The home page has no Navbar

`Navbar` is mounted only in `(site)/layout.tsx`. `(home)/layout.tsx` is a
passthrough; the home page has its own `HomeMenu` hamburger, fixed top-right.
So §4's header change splits in two:

- **Home page (done)** — `Contact` top-left, wordmark rises to top-centre,
  `HomeMenu` hamburger top-right.
- **`(site)` pages via `navbar.tsx` (not yet done)** — same arrangement, to
  follow with the palette work.

### Intro is self-contained so the site stays working

The palette flip (§1) has not happened yet, so the rest of the site is still
white-text-on-warm-blobs. To avoid a half-flipped, unreadable site, the intro
paints its own opaque `#F4F6F8` ground, and that ground fades out as the
wordmark rises. The wordmark animates `color` from `#0A0A0A` to `#FFFFFF`
across the same moment.

**Both of these are temporary.** When §1 lands, the ground becomes permanent
and the colour transition is removed.

### Additions not in the original design

- **Skip on interaction.** Any wheel / touch / key during the intro jumps
  straight to the resolved state. Without it the user is held for ~5s with no
  way out. Previously `navigate()` could advance to section 0 while the logo
  intro was still playing; it now routes to the skip instead.
- **`HomeMenu` held back until the intro finishes**, since its white bars
  would otherwise sit invisible — but still clickable — on the off-white
  ground.

### Timings as built

```
0     -> 1000ms   fill      rain fills, columns staggered up to 260ms
1000  -> 2200ms   hold      full noise density
2200  -> 3600ms   fizzle    non-mask digits extinguish, randomly staggered
3900ms            resolve   canvas hands off to the DOM wordmark
+800ms            rise      wordmark travels to header centre (1.2s, 0.3s delay)
```

### Performance approach

`'0'` and `'1'` are pre-rendered into 24 small canvases (2 chars x 12 alpha
steps) at mount, so the per-frame hot loop is `drawImage` rather than
`fillText`. Cells are 18px desktop / 22px mobile — roughly 6,400 cells on a
1920x1080 viewport. 2% of the field flips character each frame for the
flicker.
