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

---

## Addendum 2 — the palette flip and the murmuration, 2026-09-10

§1, §2 and §6 are now implemented, plus the `(site)` half of §4.

### Background: blobs kept, murmuration added

Russ asked for the existing drift movement to stay but the *shapes* to become
a starling murmuration (reference image 5). A blurred CSS blob cannot be a
murmuration, so the background is now two layers:

1. **The five blobs, unchanged in motion.** Same `drift-1`..`drift-5`
   keyframes, same 12/15/13/16/14s durations, same `blur(100px)`. Only the
   fills changed — from blue/purple/orange to white plus low-saturation
   iridescence (pale pink, cyan, gold, lavender) over `#F4F6F8`.
2. **`<Murmuration />`, a new canvas layer** inside `.bg-blobs`, mounted from
   the root layout so it appears on every page.

The murmuration is ~5,200 particles (1,800 on mobile) distributed along an
undulating ribbon. Two sine terms of different frequency give the S-curve;
a third modulates the band's width along its length, which produces the dark
knot a real murmuration has. Lateral offset is drawn from the sum of three
uniforms, approximating a normal distribution — dense core, thin fringe.

Positions snap to a 2px grid. That is the "tech, not wildlife" part of the
brief: it stipples like the reference but reads as sampled data.

**Performance:** each particle's alpha derives from its lateral offset, which
never changes, so alpha is fixed at creation. Particles are bucketed into 8
alpha groups once, and the render loop sets `fillStyle` 8 times per frame
rather than 5,200 times. Bucket 0 is invisible fringe and is skipped. DPR is
capped at 1.5 — the background never needs retina density.

### Class sweep

Applied mechanically across 30 files, with three different rules because
`text-white` and `bg-white` needed opposite treatment:

| Pattern | Rule | Why |
|---|---|---|
| `text-white*` | -> `text-ink*`, opacity unchanged | white-on-dark and ink-on-light are roughly symmetric |
| `border-white/15,20,10,50` | -> `border-ink/10,12,8,25` | borders need less opacity when dark-on-light |
| `bg-white/5..60` | -> `bg-white/45..85`, stays white | these are glass surfaces, not text; on off-white they must get *more* opaque, not invert |
| `rgba(0,0,0,0.12)` shadows | -> `rgba(10,10,10,0.06)` | shadows soften on a light ground |
| `rgba(255,255,255,0.15)` insets | -> `rgba(255,255,255,0.9)` | the inset top highlight stays white and strengthens |

Totals: 162 text, 24 border, 44 background.

**The trap this created.** The `bg-white` rule is right for panels and wrong
for hairlines. Three vertical rules, both hamburger bars, the custom cursor
and two sets of section dots were `bg-white` used as *ink*, and the sweep made
them more opaque white — invisible on off-white. Fixed in a second pass to
`bg-ink` / `bg-ink/8`. Any future sweep of this kind must separate
"white as surface" from "white as mark" before running.

### Canvas particle systems

`neural-network`, `particle-canvas`, `particle-journey` and `why-us-canvas`
had their `ctx.*Style` colours changed from white to `rgba(10, 10, 10, …)`.
Restricted to lines containing `ctx.` so the white inset highlights inside
`shadow-[…]` class strings were not caught.

### Intro no longer needs its temporary compensations

Addendum 1 described an off-white ground that faded out and a wordmark that
animated black-to-white, both temporary until the palette landed. The palette
has now landed, so the wordmark stays `#0A0A0A` throughout. The ground is
kept — but it is now the same colour as the site, so its fade-out simply
reveals the murmuration and blobs rather than changing the page colour.

### Gotcha: Turbopack served stale CSS

After `globals.css` was rewritten, the dev server kept serving the previous
stylesheet — still containing `#C4BAB0` and `#E8652E` — **under an unchanged
chunk hash**. A plain edit did not invalidate it. Fixed by stopping the
server, `rm -rf .next`, and restarting.

Because the chunk URL does not change, a browser that already loaded the old
CSS will keep it. **Hard reload is required**, not a normal refresh.

---

## Addendum 3 — the flock, 2026-09-10

New section sequence after the hero, from davidecattaneo.it/en#case-histories:
trails fly in from the left one at a time as you advance, each with a
labelled head node, until they all converge on a single point.

### Glow had to become chroma

The reference works because it is **glowing green on near-black**. Glow is
additive — nothing out-brightens an off-white page, so it cannot be
reproduced on this ground. Russ specified off-white, so each trail carries its
identity as **saturated colour** instead: a wide soft coloured halo, a mid
coloured stroke, and a near-white 1.4px core. Reads as "white iridescent"
without pretending to emit light.

Four identities, one each: violet `150,120,235`, blue `90,170,240`,
orange `245,150,90`, yellow `235,195,80`.

### Mapped onto the stepper, not onto scroll

The home page does not scroll — it steps. "More appear as you scroll"
therefore means one more trail per step. Implemented by mirroring the existing
`particleShape` pattern exactly: sections carry a `flockStage`, and a
persistent `<Flock stage>` layer sits outside the `AnimatePresence` swap so
trails survive section changes and accumulate rather than restarting.

```
flock-1        stage 1   first trail
flock-2        stage 2   second
flock-3        stage 3   third
flock-4        stage 4   fourth
flock-converge stage 5   all four merge to one point, headline + CTA
```

Sections go from 14 to 19; the five are inserted directly after `hero`.
`navigate()` is untouched.

### Motion

Each tail is 96 points. Three terms stacked:
- an arc, `f^1.5 * sweep`, giving the long lazy curve as it recedes left
- a wave, `sin(f*9 - t*2.1 + phase)` with amplitude growing toward the tip, so
  the head stays steady and the tail whips — it reads as swimming
- a slow whole-body bob

Arrival eases at 0.045/frame and merge at 0.055, so trails glide in but snap
together decisively. Labels fade once merge passes 0.35, or four labels pile
up on one point.

### Copy

Written to track the animation: one thread, then another, then "most
businesses run every one of them separately", "four systems, four directions,
nothing joined up", resolving on "We bring them together." Labels come from
the site's own benefit language — TIME SAVING, DATA INSIGHTS, SCALABILITY,
ACCURACY.

### Known consequence

The right-hand dot rail now has **19 dots** rather than 14. Not addressed —
flagged for Russ, since it may want grouping or hiding.

---

## Addendum 4 — flock repositioned, 2026-09-10

Addendum 3 placed the flock *after* the `hero` headline section, reading
Russ's "after the hero section" as the "We use ai & automation" headline.
He meant after the **binary intro** — he refers to the intro as the hero.

The five flock sections now sit at indices 0-4, ahead of `hero`:

```
binary intro (currentSection -1)
  0  flock-1
  1  flock-2
  2  flock-3
  3  flock-4
  4  flock-converge
  5  hero          "We use ai & automation…"
  6  positioning
  ... unchanged
```

So the first thing after the wordmark rises into the header is the first
trail flying in. Section count stays 19; only the order changed.

**Terminology note for future sessions:** to Russ, "the hero section" means
the binary intro screen, not the headline section whose id is literally
`hero`.
