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

---

## Addendum 5 — flock tuning from a real screenshot, 2026-09-10

First actual screenshot of the running site arrived. Three problems visible,
all fixed:

### 1. Trails read as straight lines

The wave amplitude was a **fixed 16px**, which is nothing against a
~1000px-tall viewport, so the arc term dominated and the trails looked
straight. Now two stacked sines with amplitude as a **fraction of viewport
height** (`h * 0.085`), matching how the background murmuration is built —
which is what Russ pointed at as the reference for the motion.

```
wave = sin(f*4.2 - t*1.15 + phase) * amp * f^0.55
     + sin(f*9.0 - t*1.90 + phase*1.7) * amp*0.3 * f^0.85
bob  = sin(t*0.45 + phase) * h*0.02
```

Lesson: any amplitude that should read against the viewport must be expressed
as a fraction of it, never as a pixel constant.

### 2. Colour was doing the work, not white

Trails read as violet/blue/orange lines. Brief was *white* with an iridescent
glow. Inverted the layering — the bloom got much wider and softer while the
white core got brighter and thicker:

| Layer | Was | Now |
|---|---|---|
| outer bloom | colour 0.16 @ 11px | colour 0.30 @ **26px** |
| inner bloom | colour 0.40 @ 4px | colour 0.38 @ 10px |
| core | white 0.85 @ 1.4px | white **0.98 @ 2.4px** |

The white core reads as bright because it sits inside the tinted bloom rather
than directly on the page. Head nodes are now white dots with a tinted rim and
a coloured bloom, rather than coloured dots.

### 3. Colours too saturated, and there should be six

Palette moved into the same pale register as the background blobs:
yellow-white, purple-white, blue-white, purple-white, pearl, green-white.

The **pearl** entry is Russ's "white white". A pure white glow on an off-white
ground is invisible, so it carries a neutral silver bloom instead.

Creatures 4 -> 6, so flock stages 1..6 with convergence at **stage 7**.
Copy re-paced across six beats. Sections 19 -> **21**.

### Still outstanding

The right-hand dot rail is now **21 dots**. Flagged twice; unaddressed.

---

## Addendum 6 — the neural orb, 2026-09-10

Continues straight out of the flock convergence. Four more stages (8..11):
the trails angle upward and brighten, while the convergence point swells into
a neural sphere that fills the screen and blows out to white.

### Components

`CONVERGE`, `MERGE_STAGE` (7) and `ORB_STAGES` (4) are now exported from
`flock.tsx`, so `neural-orb.tsx` grows from exactly the point the trails meet
rather than duplicating the coordinate.

### The sphere

170 nodes on a Fibonacci sphere (even coverage, no polar clumping). Edges are
computed **once at mount**: the sphere is rigid, so which nodes are neighbours
never changes under rotation — only their projected positions do. Per frame
the loop just yaws, tilts, projects orthographically, and draws.

Depth drives both alpha and node size, so the far side of the sphere sits back.

### Why the network is ink, not white

A white network on a white orb is invisible, the same problem as the "white
white" trail in Addendum 5. Nodes and edges are drawn in `rgba(10,10,10,…)`,
which also keeps the orb consistent with the binary intro and the murmuration
— everything structural on this site is ink on light.

### Growth and whiteout

```
r        = 14 + progress^2 * diagonal * 0.62      (accelerating, runs away at the end)
bloom    = white radial, widening and brightening with progress
rim      = conic gradient through the six trail colours, slowly turning
network  = fades in to progress 0.72, then back out
whiteout = progress 0.8 -> 1.0 fills the viewport pure white
```

Progress is eased toward its stage target at 0.05/frame, so growth reads as
continuous rather than stepping between sections.

The rim uses `createConicGradient`, guarded with a `typeof` check — without it
the orb simply has no rim rather than throwing.

### Trails during the orb stages

`rise` = the same 0..1 progress. It adds `f^1.2 * rise * h * 0.6` to the arc,
pushing each tail down relative to its head so the trails read as climbing.
Stroke alpha is multiplied by `1 + rise*0.6` (brightening), then faded out
from `rise` 0.45 onward so they are absorbed into the orb.

### Copy

The CTA moved off `flock-converge` and onto `orb-4`, which is the actual
climax — two CTAs four steps apart made no sense. Converge keeps its headline
and supporting line.

### Sections now 25 — this needs a decision

The right-hand dot rail renders one dot per section and is now at **25**.
Flagged in Addenda 3 and 5 and still unaddressed. At this count it is no
longer a nitpick; it wants grouping, shrinking, or hiding during the
flock/orb run.

---

## Addendum 7 — stipple trails, grid and background murmuration removed, 2026-09-10

From a second screenshot. Russ wanted the grid lines and the background dot
animation gone, and the trails rebuilt in that dot style.

Reversal of Addendum 2's background decision, deliberately: the murmuration
was a separate full-screen layer behind everything. The stipple texture is now
carried **by the trails themselves** instead. Same aesthetic, one less layer,
and the dots now mean something — they are the trail.

### Removed

- The three vertical rules in `(home)/page.tsx` (`w-px bg-ink/8`).
- `<Murmuration />` unmounted from the root layout, and its import dropped.

`src/components/layout/murmuration.tsx` is **kept on disk**, unmounted. It is
a working component and may be wanted again; deleting it would throw the work
away for no gain.

Note `hero.tsx` also contains three vertical rules, but it is dead code
(Addendum 1) and was left alone.

### Trails rebuilt as stipple

Each trail is now 720 ink grains (300 on mobile) scattered around a
centreline, inside the soft coloured bloom:

| Property | Rule |
|---|---|
| position along tail | `random()^1.35` — biased to the head, so it is dense at the front and dissolves behind |
| lateral offset | sum of three uniforms ~ normal — dense core, thin fringe |
| spread | `h*0.006 + f^0.85 * h*0.05` — tight at the head, dispersing toward the tail |
| alpha | `(1-|off|)^1.8 * (1 - f*0.55)`, fixed at creation, bucketed into 7 groups |
| colour | ink; the bloom underneath carries the iridescence |

The centreline maths was extracted into `headPos` / `offsetAt` / `spreadAt` so
the smooth bloom path and the grains sample the same curve, rather than each
having their own copy.

**Performance:** grain alpha is fixed at creation, so grains are bucketed once
and `fillStyle` is set 7 times per trail per frame instead of 720. The
per-frame trail alpha rides on `globalAlpha` on top. 6 trails x 720 = 4,320
grains, against the 5,200 the removed background murmuration was costing —
a net reduction.

### Why the grains are ink and not white or coloured

Same constraint as everywhere else on this site. Pale grains on off-white
vanish; the murmuration read well precisely because it was ink. So the
grains are ink and the colour lives in the bloom around them.

---

## Addendum 8 — colour removed, 2026-09-10

Russ: "lets get rid of the colours and just do black and white and off white
for now". This reverses the iridescence decision in §1/§2 and Addenda 5-7.

| Where | Was | Now |
|---|---|---|
| background blobs | pale pink / cyan / gold / lavender | white through pale grey |
| `gradient-hero` | faint pink and lavender stops | neutral grey stops |
| flock blooms | six pale tints | pure white, all six |
| flock head rim | the creature's tint | ink at 0.55 |
| orb rim | conic gradient through the six tints | ink hairline, fading toward the whiteout |

### Two knock-on fixes, not optional

Removing the tints broke two things that had been relying on them:

1. **The flock bloom got more opaque** (0.30/0.34 -> 0.45/0.55). A coloured
   bloom separates itself from off-white by hue; a white one has only
   lightness to work with and was nearly invisible at the old values.
2. **The head rim and the orb rim became ink.** Both were previously drawn in
   the creature's tint. White-on-white has no edge at all, so without an ink
   rim the head dot and the orb outline simply vanish.

Same principle as everywhere else here: on a light ground, structure is ink;
white can only ever be a glow.

### Kept deliberately

`rgb` stays a per-creature field on `Creature` rather than being deleted, and
`murmuration.tsx` stays on disk. Russ said "for now" — both let colour and the
background dot field come back without restructuring.

The remaining greys (`#6B7078`, `#DCE0E5`, `rgba(230,234,239)`) carry the same
faint cool cast as the `#F4F6F8` ground. That is the off-white family, not
hue.

---

## Addendum 9 — the climb, 2026-09-10

After the merge stage the formation should ascend like a rising graph, lifting
slightly while staying mid-page.

### The tail exponent was backwards

Addendum 6 added the upward bias as `f^1.2 * rise * h * 0.6`. With f = 0 at
the head and 1 at the tail, an exponent **above 1** makes the slope zero at
the head and steepest at the tail — flat at the front, plunging at the back.
That reads as a droop, not a climb.

Now `f^0.7`. Below 1, the slope is steepest at the head and flattens toward
the tail, so the trail lies shallow far-left and rakes up sharply into the
head — the hockey-stick shape of an ascending graph.

```
exponent > 1   head ──────╮          flat at head, steep at tail  (droop)
                           ╰────
exponent < 1        ╭───── head      shallow at tail, steep at head (climb)
               ─────╯
```

### The convergence point now lifts

`convergeAt(rise)` returns `{ x: 0.52, y: 0.5 - rise * 0.085 }`, exported from
`flock.tsx` and used by **both** the flock and the orb. 0.085 is deliberately
small: Russ asked for it to stay mid-page and move up only slightly.

The orb had been pinned to the static `CONVERGE`. Without this it would have
stayed put while the trails climbed away from it, and the formation would have
come apart.

### Rise is now eased in the flock too

The flock previously computed `rise` straight from the stage number while the
orb eased its `progress` at 0.05/frame. During a section change the trails
would jump to the new angle while the orb was still travelling. The flock now
eases `riseEased` at the same 0.05, so the two stay locked together.

---

## Addendum 10 — climb scrapped, undulation carries the stages, 2026-09-10

Reverses the angle change from Addendum 9. The progression device for the orb
stages is now **undulation speed**, not tail angle.

### Removed

The `f^0.7 * rise * h * 0.62` climb term is gone. The tail shape no longer
changes across the orb stages at all.

**Kept:** the small upward lift of the convergence point, `convergeAt(rise)`
with `CLIMB = 0.085`. Russ said "scrap the angle change" and separately asked
in the same message to "move it up slightly" — the lift is a position, not an
angle, so it stays. Trivial to remove if that reading is wrong.

### Speed is integrated, not multiplied

```
dt         = clamped frame delta
wavePhase += dt * (1 + rise * 2.2)      // 1x at merge -> 3.2x at full orb
```

`offsetAt` now takes `wavePhase` instead of raw elapsed time. This matters:
multiplying elapsed time by a changing speed makes `sin(k·t)` jump every time
`k` moves, so every section change would have snapped the wave to a new phase.
Integrating speed over time is continuous by construction.

`dt` is clamped to 50ms so a backgrounded tab returning does not fast-forward
the wave through a huge jump.

### The head undulates now

The wave envelopes were `f^0.55` and `f^0.85`, both **zero at f = 0** — so the
head never moved and only the tail whipped. They are now `0.22 + 0.78·f^0.55`
and `0.15 + 0.85·f^0.85`, giving the head about a fifth of the amplitude. The
head now swims rather than being towed.

### Merge damping relaxed

Post-merge damping went from `1 - merge*0.85` (15% left) to `1 - merge*0.5`
(50% left), and the bob from `1 - merge` to `1 - merge*0.6`. With the
undulation now carrying the later stages, damping it almost to nothing at the
exact moment it becomes the main event made no sense.

### Cleanup

`time` and its `start` clock are gone from the flock's frame loop — `wavePhase`
is the only clock it needs. Lint back to the 7 pre-existing warnings.

---

## Addendum 11 — the head glows instead of being outlined, 2026-09-10

Addendum 8 gave the head an ink rim, because with the tints removed a white
dot inside a white bloom had no edge. It worked, but it read as a **drawn ring**
— exactly the opposite of a light source. Screenshot confirmed a visible dark
circle outline.

### Now

No stroke anywhere on the head. Three filled layers, all gradient except the
smallest:

```
halo   radial, r 42, 0.62 -> 0.30 -> 0     wide soft falloff
glow   radial, r 12, 1.00 -> 0.85 -> 0     inner brightness
bead   solid white disc, r 4.5             crisp centre
```

The bead is filled and never stroked. Stroking is what created the ring.

### What actually makes it read on a light page

Not an edge — **contrast against the stipple**. The grains' `f` is biased
toward the head, so the densest, darkest part of the trail is exactly where the
head sits, and a pure white centre punches through it. This is why the draw
order matters: bloom, then stipple, then head. The head must go last.

### Standing limitation, restated

The reference Russ gave (a neon line on dark navy) glows because glow is
additive and the ground is dark. On `#F4F6F8` nothing can out-brighten white,
so this will always be a softer effect than the reference. It reads as a bright
bead in a haze, not as emitted light. Unchanged from Addenda 3 and 6 — the only
way to get the reference's actual punch is a dark section.

---

## Addendum 12 — the orb absorbs us, 2026-09-10

Brief: after the merge, the orb should grow on scroll so it feels like it is
**coming toward the viewer and swallowing them**, revealing the intricacy of
what it is made of. Reference is a geodesic lattice with bright vertices and
sparkle motes suspended inside.

### Trails scale with the approach — the load-bearing change

An orb that grows while the trails stay the same size reads as the orb
*inflating*, not as the viewer moving closer. Everything about a trail now
scales by `approach = 1 + rise * 2.4`:

| | scaled by |
|---|---|
| tail length | `approach` |
| stipple spread | `approach` |
| grain size | `1 + (approach-1) * 0.65` |
| bloom widths (30 / 13) | `approach` |
| head halo / glow / bead radii | `approach` |

Grains grow slightly slower than the geometry so the stipple coarsens
believably instead of turning into blocks.

### The trails had to stop fading early

They previously faded out from `rise` 0.45 — barely after the orb starts
moving. But the trails growing *is* the approach cue, so fading them there
deleted the effect. They now hold to `rise` 0.86.

### Orb interior

- **Vertices** scale with orb radius (`min(4.5, 0.5 + r/110)`) instead of
  staying a fixed pixel size, so coming closer genuinely resolves more detail.
- **260 sparkle motes** suspended inside the shell, each twinkling on its own
  rate and phase, depth-faded. These make the interior read as a volume with
  something in it rather than a hollow wireframe.
  Uniform fill inside a sphere needs `r = cbrt(u)`; using `u` directly piles
  everything at the centre and leaves the outer volume empty.
- **Structure now intensifies all the way in** — `netStrength` was fading out
  after progress 0.72 to allow the whiteout, which hid the lattice at exactly
  the moment the orb is closest.

### The whiteout is now a wash

Reduced from a full opaque white fill to a maximum of **0.3 alpha**. Blanking
the screen to solid white would erase the very structure the viewer is
supposed to be absorbed into. This softens Addendum 6's "brilliant white"
ending deliberately — the two briefs conflict, and this one is later.

### Standing limitation

The reference is white lattice on black. Here it is ink lattice on off-white,
so the motes *darken* as they twinkle rather than sparkling with light. On a
light ground that is the only direction available.

---

## Addendum 13 — trails now scale with the orb, 2026-09-10

Screenshot showed the orb filling the screen while the trails entering from
the left were still thin threads. They were growing on the wrong curve.

### The mismatch

| | curve | merge -> full |
|---|---|---|
| orb radius | `progress^2 * diag * 0.62` | 14px -> ~1380px |
| trails (before) | `1 + rise * 2.4` **linear** | x1 -> x2.4 |

Linear against quadratic: the orb accelerates away while the trails creep.

### Split into girth and length

One scale could not do the job, because the two axes fail in opposite ways.

- **`girthScale = 1 + rise² * 9`** — spread, grain size, bloom widths. Squared,
  so it tracks the orb's own acceleration.
- **`lengthScale = 1 + rise * 2.2`** — tail length only, and deliberately
  gentle. Grain `f` is biased toward the head, so stretching the tail as hard
  as the girth pushes most grains off-screen left and the stipple **thins out
  exactly when it should look densest**.

Grain size takes `1 + (girth-1) * 0.32` rather than full girth, so the stipple
coarsens without turning into blocks.

```
        rise   girth   length   orb radius   head
merge   0.00    x1.0     x1.0        14px    100%
orb-1   0.25    x1.6     x1.6        99px    100%
orb-2   0.50    x3.3     x2.1       355px     56%
orb-3   0.75    x6.1     x2.7       782px      0%
orb-4   1.00   x10.0     x3.2      1380px      0%
```

### Heads fade instead of growing

Scaling the head glow with the girth would stack six white blooms an order of
magnitude larger over the centre of the orb, wiping out the lattice that the
approach exists to reveal. The heads have merged into the orb by then anyway,
so they fade out from `rise` 0.3 and are gone by 0.75, while the tails carry on
growing.

---

## Addendum 14 — the intro is page 1 and is reachable, 2026-09-11

The binary intro was a one-shot: it played at `currentSection === -1` on load
and could never be returned to, because `navigate()` bailed on `next < 0`.
Russ wants it as page 1, scrollable back to.

### Changes

- **`navigate` lower bound is now `-1`.** Reaching it calls `goToIntro()`,
  which resets `introResolved` and `logoDone` and sets the section to -1.
  Resetting `logoDone` unmounts and remounts `BinaryIntro`, so the rain
  actually replays rather than showing the already-resolved wordmark.
- **The dot rail gains a first dot** for the intro, which replays it on click.
  Remaining dots renumber to `Section i+2`.

### The trap this would have hit

Skipping was previously triggered by input in *any* direction. Scrolling up to
reach the intro fires more upward wheel events as the trackpad decelerates —
those would have hit the skip branch and killed the replay in the same gesture
that requested it. Skip is now `dir === 1` only: scroll down to skip forward,
scroll up does nothing.

### Race fixed while here

The hand-off effect (`logoDone && currentSection === -1` -> advance to 0 after
500ms) had no cleanup. A pending timer from a previous run could fire after
the user had scrolled back to the intro and yank them forward. It now clears
on unmount.

---

## Addendum 15 — the wordmark climbs as code, 2026-09-11

Russ disliked seeing the wordmark turn from code into black text mid-page and
*then* move. It should stay code the whole way, climb the page by characters
fading in above it and out below it — the same mechanism that revealed it —
and only become black once it is in the header.

### Mask is sampled through a transform, not rebuilt

The mask is built **once** at a reference size and centre position, and stored
as a `Uint8Array` of alpha (a quarter of the ImageData's memory). Each frame
`inMask(px, py)` maps the screen point back into that reference space:

```
scale = 1 + (0.42 - 1) * lift
cy    = h/2 + (HEADER_Y - h/2) * lift
mx    = w/2 + (px - w/2) / scale
my    = h/2 + (py - cy)  / scale
```

Re-rendering the wordmark offscreen and re-reading its pixels every frame
would be far too slow, and is unnecessary — moving the sample point gives the
same answer. Cell membership then changes as the wordmark moves, and because
every cell already eases toward its target, characters fade in above it and
out below it for free. No new animation code.

### It cannot shrink to header size

The header logo is 1.5rem ≈ 24px. Cells are 18px. A 24px wordmark is barely
one cell tall, so a code form of it cannot exist. It shrinks to `TRAVEL_SCALE`
0.42 — still several cells tall and legible as characters — and the caller
swaps in the real logo on arrival.

### Scroll drives the climb

Consistent with Russ's earlier "things shouldn't progress until you scroll".
The intro auto-plays fill -> emerge -> fizzle, then **holds**. Scrolling down
sets `travel`, which starts the climb; `onArrived` fires at `lift > 0.97`.

Scrolling *up* does nothing during the intro — as in Addendum 14, acting on
any direction meant the momentum of the scroll that returned you to the intro
immediately restarted the climb.

### The black logo no longer moves

It now sits at its final header position permanently and just fades in on
arrival. The old centre-to-header rise is gone: the code does the travelling,
so a second animated black wordmark would only duplicate it.

Dropped with it: `viewportWidth` state, the `wordmarkSize`/`MASK_WEIGHT`
imports in the page, and `skipIntro`.

---

## Addendum 16 — the matrix stays, 2026-09-11

Correction to Addendum 15. The field was still fizzling out before the climb,
so the wordmark travelled across a blank page rather than *through* the code.

### Fizzle removed entirely

`T_FIZZLE`, `Cell.fizzleAt` and the fizzle branch are gone. After the emerge
phase every cell holds one of exactly two targets, for the rest of the intro:

```
target = isMask ? 1 : GHOST_ALPHA
```

Because `isMask` is recomputed each frame against the wordmark's current
position, the climb needs no extra code at all: cells ahead of the wordmark
darken to 1, cells behind settle back to the field. That *is* the logo moving
through the matrix.

### Field alpha raised

`GHOST_ALPHA` 0.14 -> **0.2**. At 0.14 the field was a trace; it is now the
medium the logo travels through, so it has to stay clearly present. Contrast
against the wordmark is still 5:1.

### Timeline shortened

Losing the fizzle removes ~1.1s of waiting:

```
0     -> 900ms   fill     rain fills, columns staggered
900   -> 1900ms  emerge   mask darkens, field settles to 0.2
2100ms           settled  waits here for a scroll
on scroll        climb    lift eases to 1, arrival at 0.97
```

---

## Addendum 17 — one comet, not six threads and a ball, 2026-09-11

Screenshot showed six visibly parallel strands ending at a separate sphere.
Two independent causes.

### 1. The trails never actually united

`offsetAt` kept **45% of each trail's sweep** (`1 - merge*0.55`) and **50% of
its own wave phase** (`1 - merge*0.5`) at full merge. Six different centrelines
cannot overlay, so they stayed parallel behind a shared head no matter how
close the heads got.

Split into two parts that cross-fade:

```
solo  = 1 - merge     own sweep, own phase, own bob   -> 0 on merge
united= merge         one shared wave, no per-creature phase
```

At merge every trail lands on exactly the same curve, so six sets of grains
overlay into one tail at six times the density.

Also dropped the tail-narrowing on merge from `1 - merge*0.75` to
`1 - merge*0.25`. Squeezing to a quarter width was right when it converged to
a point; now it is one united tail and should stay substantial.

### 2. The orb read as a separate object

Three cues, all removed:

- **The rim.** An ink hairline circle — the single strongest "this is a
  separate object" signal. Gone; the lattice already describes the sphere.
- **The body's hard edge.** Its outer gradient stop sat at 0.1-0.4 alpha, so
  the disc ended abruptly exactly where the tail met it. Now 0.
- **The thread join.** The tail's width at the head was unrelated to the orb's
  size, so a thin thread met a large ball. `spreadAt` now adds
  `orbRadius * 0.8 * e^(-5f) * merge`, flaring the tail to the nucleus width at
  its head and decaying fast along its length.

`orbRadius` moved into `flock.tsx` and is imported by `neural-orb.tsx`. Both
need it and two copies would drift apart, undoing the join silently.

---

## Addendum 18 — filaments, not stipple, 2026-09-11

New reference: crisp fibre-optic lines fanning out and converging to a sharp
point, with a bright bead at the head. This **reverses Addendum 7's stipple**,
deliberately — Russ has now seen both and chose lines.

### Rendering

`drawStipple` and the whole grain system (720 grains per trail, alpha buckets,
`spreadAt`, `Grain`) are gone, replaced by `drawLine`: a 130-point path,
stroked twice.

| Layer | Purpose |
|---|---|
| white, 5px x girth, 0.55 alpha | seats the filament against the page's blob texture so a bare hairline does not get lost in it |
| ink, 1.3px x girth, 0.62 alpha | the filament itself |

Far lighter than the stipple: 6 paths of 130 points, against 4,320 grains.

### Convergence is a point again

The wave envelope started at **0.22 at f = 0**, which kept the heads apart and
blunted the meeting into a bundle of parallel threads. It is now 0.05, and the
arc is `f^1.4`, so every term pinches to ~nothing at the head. All six lines
genuinely meet at one point and fan out behind it.

The whole-flock bob is now **phase-free** — shared by every trail — so it
breathes as one body instead of jittering the lines apart at the very point
they are supposed to meet.

### Uniting reverted

Addendum 17 collapsed all six onto one shared centreline at merge. That was
too strong for this reference, which shows the lines staying individual and
crossing behind the meeting point. The `solo`/`united` cross-fade is gone;
each trail keeps its own sweep and phase throughout, and the pinch does the
converging.

### Sweeps widened

`0.06..0.24` -> `0.05, 0.30, -0.26, 0.44, -0.40, 0.16`. Larger and of mixed
sign, so the tails fan widely and cross one another rather than running
parallel.

---

## Addendum 19 — the lead filament runs ahead, 2026-09-11

After the merge, one filament elongates away from the pack on a straight neck
with the orb on its nose, still joined to the others at the knot. Reference is
the same fibre-optic image: a tight convergence with one line paying out to a
bright bead.

### Three pieces

- **`leadHeadAt(rise)`** — the lead's head target, `convergeAt(rise).x + rise *
  0.18`. The rest still target the knot, so the lead pulls away while staying
  attached.
- **`leadNeck(rise, lenScale)`** — the fraction of the lead's length that is
  dead straight.
- **`offsetAt` takes a `neck`** and remaps `f` to start beyond it:
  `f' = max(0, (f - neck) / (1 - neck))`.

That remap is the part that matters. Without it the lead's whole filament would
just translate right along with its head, arriving at the knot already curving.
With it, the first stretch is perfectly straight and the curve only begins past
the neck — the line pays out taut from the knot.

`neck` is multiplied by `s.merge`, so it opens up as the flock converges rather
than existing while the trails are still flying in separately.

### The orb moved to the lead's head

`neural-orb.tsx` now reads `leadHeadAt` instead of `convergeAt`. The nucleus
belongs on the nose of the filament that ran ahead, not back at the knot with
the rest of the pack.

### Geometry as built (1920 wide)

```
        rise   lead ahead of knot   neck fraction
merge   0.00                 0px           0.000
orb-1   0.25                86px           0.031
orb-2   0.50               173px           0.045
orb-3   0.75               259px           0.054
orb-4   1.00               346px           0.059
```

The neck fraction stays small because the tail is also lengthening — 346px of
neck against a 3.0x viewport-width tail.

---

## Addendum 20 — softer wordmark against the field, 2026-09-11

The field sat at 0.2 alpha against a solid 1.0 wordmark — a 5:1 gap. The field
read as washed out and the logo as stamped on top of it.

### Narrower gap

```
             field   mark   grey values (on white)   ratio
before        0.20   1.00          206  vs   10      5.0:1
after         0.26   0.68          191  vs   88      2.6:1
```

Still clearly readable on a light ground, but the wordmark now sits *in* the
matrix rather than on top of it.

### Feathered edges

`inMask` returned a boolean, so every cell snapped between the two alphas and
the letterforms had a hard, stepped edge. Replaced with `maskAt`, which samples
**four corners of the cell** and returns coverage 0..1. The target is then
interpolated:

```
target = FIELD_ALPHA + (MARK_ALPHA - FIELD_ALPHA) * coverage
```

Cells straddling an edge land at 0.25 / 0.5 / 0.75 coverage, so the wordmark
feathers into the field instead of stepping. Four array reads per cell —
about 25k per frame, negligible.

### Fill phase is uniform now

It used to draw mask cells at 1.0 and the rest at 0.72 *during the rain*, so
the wordmark was faintly present before it was supposed to emerge. The fill is
now a flat `FILL_ALPHA` (0.44) everywhere, and the wordmark separates out only
at the emerge phase.

---

## Addendum 21 — the wordmark becomes an invisible solid, 2026-09-11

Russ on the previous version: "I don't want all the code apart from the up and
up logo faded, that's too basic." Correct — weighting the letterforms dark and
fading everything else is a stencil, however well tuned the contrast is.

### The wordmark is no longer drawn at all

It is now an **invisible solid the code runs into**, and it shows itself only
through what the code does on contact:

| Behaviour | Mechanism |
|---|---|
| **Settle** — characters resting against it stop churning while the rest of the field keeps flickering | `cl.frozen` set from mask coverage; the churn loop skips frozen cells |
| **Pile** — characters stack on its upper surfaces | probe one and two cells *below*; those cells get `+PILE_GAIN` |
| **Shadow** — cells it shelters thin out | probe one and two cells *above*; those get `-SHADOW_LOSS` |

Stillness is the primary cue. The shape is inferred from behaviour rather than
painted in.

### One weight, not two

```
                        alpha   grey on white
open field              0.420   152
settled on the form     0.546   121
piled on top of it      0.630   101
in its shadow           0.189   209

previously: field 0.26 (grey 191) vs wordmark 0.68 (grey 88)
```

Everything now sits around one weight and deviates from it, rather than the
field being suppressed so the mark can stand out.

### Travels for free

All four probes run against the form's *current* transformed position, so the
pile and the shadow move with the wordmark as it climbs to the header. No
additional code for the travel.

### Cost

Per cell: one 4-sample coverage read plus up to four single-point probes. The
probes are skipped entirely for cells inside the form. Roughly 50k array reads
a frame at 1920x1080 — negligible, and they are plain `Uint8Array` indexes.

### Risk worth watching

This is a subtler effect and legibility is not guaranteed. If `up+up` does not
read, the dials in order of effect are `SETTLE_GAIN`, `PILE_GAIN`,
`SHADOW_LOSS` — all at the top of the file.

---

## Addendum 22 — the code is displaced by the form, 2026-09-11

Addendum 21 was not legible. Stillness, pile-up and shadow are too weak a
signal on their own, and they vanish entirely in a still screenshot.

### Negative space instead

The form is solid, so the code **cannot be where it is**:

| | |
|---|---|
| **Void** | cells inside hold no character at all — `target = 0` |
| **Rim** | the ring touching the surface crowds to `0.777` alpha against the field's `0.42` |
| **Push** | rim characters are shoved outward along the surface normal, `0.5` of a cell |
| **Settle** | those jammed characters stop churning |

```
inside the form   empty
rim (touching)    grey  65
open field        grey 152
```

The wordmark is the shape of the absence. A clean hole in a dense field reads
instantly, and it is the honest consequence of the thing being solid — nothing
is faded to achieve it.

### The normal comes free

The four neighbour probes already needed for "is this cell touching the form"
also give the direction away from it:

```
pushX = (left - right) * cell * PUSH
pushY = (up   - down ) * cell * PUSH
```

Form on the left pushes right. No distance field, no gradient pass — four
`Uint8Array` reads that were being taken anyway.

### Three approaches tried, for the record

1. **Stencil** — mark dark, field faded. Legible but crude; Russ: "too basic".
2. **Behavioural** — one weight, revealed by stillness/pile/shadow. Sophisticated
   but not legible.
3. **Displacement** — void plus crowded, pushed rim. Legible *and* the most
   literal reading of "the code is hitting something invisible but solid".

---

## Addendum 23 — reverted to the stencil, 2026-09-11

Russ: "it's not as good as the original." `binary-intro.tsx` restored to
`0a4e7a2` — the version in the screenshot he was working from:

```
mask cells   alpha 1.0   (hard black)
field        alpha 0.2   (grey)
```

Everything else in the intro is unchanged: u/p/+ characters, the persistent
matrix, the scroll-driven climb to the header, and the mask sampled through an
inverse transform.

### Three alternatives were tried and rejected. Do not re-propose them blind.

| Commit | Approach | Verdict |
|---|---|---|
| `65052e3` | softer stencil, 0.68 vs 0.26, feathered edges | not asked for again |
| `5688263` | one weight; stillness, pile-up, shadow | **not legible** |
| `5930bba` | void plus crowded, outward-pushed rim | **worse than the stencil** |

Each is a single `git checkout <sha> -- src/components/home/binary-intro.tsx`
away if any of it is wanted later.

The lesson is that Russ's "too basic" was about the *look*, not a request to
weaken the signal. Two of the three replacements were more conceptually
interesting and both read worse on the page. Legibility first; a mechanism that
has to be explained is not working.

---

## Addendum 24 — the rain actually falls, 2026-09-11

Russ clarified: "too basic" was about **the animation**, not the reveal
mechanism. Addenda 20-22 were all chasing the wrong thing and were reverted.

### The flaw

Nothing moved. It was called rain, but:

- the fill was a **staggered alpha ramp** — a wipe, not falling
- the "churn" was random character swaps **scattered across a static grid**

Every cell held a fixed position and only changed opacity. There was no motion
in the piece at all.

### Real drops

Each column now carries a drop with its own speed, a bright leading character,
and a tail fading out behind it:

```
columns             107 on a 1920 viewport
speed               7-24 rows/sec, re-rolled on every restart
tail                15 rows
crossing time       8.6s slowest, 2.5s fastest
```

Restarting above the top at a fresh speed keeps the columns drifting out of
sync instead of settling into a visible pattern.

### Two details that matter

**The drop is added raw, not eased.** The standing field still eases at
0.18/frame so it settles smoothly, but the rain is added on top of `cl.alpha`
undamped. Easing it would smear the streak into a travelling glow and lose the
movement entirely.

**Flicker moved to the drop head.** Characters now churn where the drop is
passing — `0.45` chance per frame within 1.2 rows of the head — which is where
flicker belongs. Background churn dropped from 2% of cells per frame to 0.6%,
just enough that the standing field is not frozen.

### Weights

```
standing field   grey 221      (was 206 — lowered, the drops carry the weight now)
drop mid-tail    grey 186
drop head        grey  30
wordmark         grey  10
```

The wordmark still sits at full black and stays the darkest thing on screen, so
the reveal is unaffected by the rain running over it.

---

## Addendum 25 — the head is a paper aeroplane, 2026-09-11

The glowing bead at each filament's head is now a paper plane.

### Drawn, not an asset

Two filled triangles in unit coordinates, nose at `(1, 0)`, scaled and rotated
into place:

```
near wing   (1,0) -> (-0.85,-0.62) -> (-0.34,0)     ink 0.88
far wing    (1,0) -> (-0.34,0)     -> (-0.85,0.62)  ink 0.50
```

The two weights are what make it read as **folded paper** rather than a flat
triangle — the far wing is in shade. Filled only, never stroked: at 11px a
stroke closes the shape into a blob.

### It banks with the line

The heading comes from the slope of the filament just behind the nose:

```
y0 = offsetAt(f = 0)
y1 = offsetAt(f = 0.02)
angle = atan2(y0 - y1, 0.02 * tailLength)
```

Sampled a short distance back rather than differentiated analytically, which
stays stable when the wave is moving quickly. The plane therefore noses up and
down with the undulation instead of always flying flat.

### Sizing

11px base, scaling to ~21px as the orb approaches, though the heads fade out
from `rise` 0.3 and are gone by 0.75 — so in practice it is only ever seen
between 11 and about 15px.

The soft halo stays behind it (30px, down from 34) for luminosity; the plane
itself is ink, consistent with the rule that structure is ink and glow is white.

---

## Addendum 26 — design plan and handover, 2026-09-12

Russ asked for a recommended plan. This supersedes nothing; it sets the order
for the next phase.

### The core problem

**The animation occupies 11 of 26 screens.** Binary intro, six flock stages,
the convergence and four orb stages all come before the visitor reaches the
"We use ai & automation" headline. Eleven screens of abstraction before the
site says what it sells — the opposite of the "simplicity of info" Russ likes
in nominal.so, and the thing most at odds with reading as an established firm.

The fix is not to cut the animation. **Scroll-linked animation self-regulates;
a stepper cannot.** On a scroll page someone in a hurry passes the whole
sequence in seconds while someone curious gets all of it. The stepper forces
everyone through at one pace, 26 gestures deep. That is a stronger argument for
converting than the feel is.

### Plan, in dependency order

1. **Convert the home page to real scroll.** Everything else depends on it.
   Currently `fixed inset-0` with a wheel-hijacked stepper.
2. **Scroll-link the animation and compress it.** The flock's 11 sections
   become ~3 viewport-heights. All geometry already takes a 0-1 progress value
   — only the *source* of that number changes, from an integer stage to
   accumulated scroll.
3. **Restructure to ~9 sections**, nominal.so-shaped: hero → what we do →
   proof → case study → how it works → CTA → footer. `why-us` alone currently
   spans five screens and is one section.
4. **Palette.** Cream default ground, one or two colour grounds marking
   structure. **After** the restructure — retuning white-on-colour canvases is
   the expensive part and should happen once.
5. **Fly-over grid into the takeoff**, leading into the orb. Where the flight
   metaphor pays off and the paper planes become the point rather than a
   detail.

### Content, not code — for Russ

Cut the eight borrowed McKinsey / Deloitte / Gartner / Forrester stats. A
company quoting the market rather than its own results reads as having nothing
of its own. Replace with client logos, own numbers, named testimonials. This
will do more for "legit and robust" than every visual decision listed above.
Cannot be invented here.

### References gathered this session

| Source | What Russ wants from it |
|---|---|
| nominal.so | long scroll, sparse information, professional restraint. Trust comes from 15+ client logos, own metrics, attributed testimonials, a compliance badge |
| davidecattaneo.it/en#case-histories | lines bound to scroll *offset*, not a timer — move as much as you scroll, reverse when you scroll back |
| revertai.com.br | perspective grid flown over, then a take-off. Pairs with the paper-plane heads: the site's language becomes flight |
| Polyera (screenshot) | numbered arc navigator — replaces the 26-dot rail. Needs the section count down first; works at 5-6, breaks at 26 |
| hers / sage diagram / Apple card / cream swatch | chalky desaturated palette. **All put white marks on a mid-tone ground** |

### Why a mid-tone ground matters

The whole session fought one constraint: **nothing out-brightens white**. On
off-white the comet could not glow, the head could not emit light, sparkle
motes had to darken instead of sparkle, and the orb lattice had to be ink. A
sage or periwinkle ground gives *both* directions — white and ink. It is an
unlock, not a reskin.

Russ pushed back on using a single hero colour and is right: nominal.so is
neutrals *plus* accents. The discipline is that colour must carry a **role** —
one ground per full screen, signalling where you are, never decoration.

### Open decisions

- stepper vs real scroll (plan assumes scroll)
- how far to cut 26 sections
- which colours take which roles
- whether the arc navigator replaces the dot rail

### Dot rail

Still 26 dots down the right edge, up from 14 at the start of the session.
Flagged five times, never addressed. Resolved by item 3, or by the arc
navigator.

---

## Addendum 27 — the synthesis, 2026-09-12

Brief: SaaS-professional, tells the story, memorable, aesthetically considered,
structured like gsap.com and nominal.so, keeping the filament/orb flight AND
the morphing particle shapes, losing none of the existing copy.

### The structural mistake

Animation and information are **separated**. Eleven screens of abstract flight,
then all the copy. Professional sites do not open with an overture.

### The move: braid them

The flight sequence becomes a **continuous scroll-linked layer underneath the
whole page**, advancing between content sections. Scrolling to read about the
services also draws the threads together.

This is the gsap.com lesson: there, the animation *is* the product demo, never
ornament. Here the flight already argues the same thing the copy does —
separate processes, converged, one system that learns. "Every process starts as
a single thread" -> "We bring them together" is the sales pitch. It is simply
in the wrong place, running before the content instead of through it.

### Structure — nominal.so's shape, existing content, nothing dropped

| # | Section | Flight state | Ground |
|---|---|---|---|
| 1 | Hero — code rain resolves to up+up, one line on what we do, CTA | — | cream |
| 2 | Positioning — "smart people with smarter systems" | thread 1 enters | paper |
| 3 | Benefits — all 10 glyph cards as one grid | threads 2-6 enter | mist |
| 4 | Services — 9 agents + 3 tools carousel | convergence | sage |
| 5 | Why us — 5 particle shapes morph on scroll | orb grows | sage |
| 6 | Proof — Tipsy case study + own numbers | takeoff / grid | periwinkle |
| 7 | How it works | orb settles | paper |
| 8 | Contact | — | cream |
| 9 | Footer | — | — |

25 sections -> 9. Nothing lost:

- 11 flight screens become a background layer, not screens of their own
- 10 benefit glyph cards become one grid rather than one screen
- 5 `why-us` screens become **one** section where the particle field morphs
  question -> brain -> orb -> head -> infinity as you scroll through it. Spread
  across five screens nobody notices it; concentrated, it is the most
  impressive thing on the site
- the comparison, ai-team and automation-tools content folds into Services
- the 8 borrowed stats are **cut** — replaced by own proof in section 6

### Why this is memorable rather than merely tidy

nominal.so is professional but visually unremarkable — its credibility comes
from logos, metrics and testimonials, not design. gsap.com is memorable because
its animation demonstrates the product.

up+up can have both: nominal.so's information structure carrying gsap.com's
demonstrative animation. The flight is not decoration once it runs under the
argument — it *is* the argument, in motion.

### Dependencies, unchanged

Real scroll is still the prerequisite: a background layer advancing between
sections needs scroll offset, not discrete wheel steps. Colour grounds are
already built (Addendum 26 / commit `9f371a2`) and carry straight over.

### Caveat

gsap.com was not fetched — a scroll-animation site yields nothing useful as
markdown. Its structure here is from prior knowledge: animated hero that
demonstrates the product, sections each showing one capability with a live
example, heavy scroll-triggered reveals. Worth confirming with Russ.

---

## Addendum 28 — gsap.com seen properly: type-led on near-black, 2026-09-12

Screenshots of gsap.com (Addendum 27 guessed at its structure; this replaces
that guess).

### What it actually is

- **Near-black ground**, cream type. Not a light site.
- **Type is the hero.** "Animate anything" fills most of the viewport. No
  illustration competes with it.
- **Tiny animated accents tucked into the letterforms** — a gradient pinwheel
  above the A, a purple squiggle inside the h. Small, saturated, glowing.
- **One huge sentence per section**, enormous whitespace, no decoration.
  Information arrives in a few very large statements, not much small text.
- **`{ Why GSAP® }` curly-brace labels** — a cheap, memorable motif.
- Thin nav, outlined CTA with an icon.

### Why the dark ground changes everything

The whole session lost to one constraint: **nothing out-brightens white**. On
off-white the comet could not glow, the paper plane could not catch light,
sparkle motes had to darken rather than sparkle, the orb lattice had to be ink,
and the neon reference could not be reproduced at all.

**On near-black every one of those works as originally asked for.**

### And the colours return, correctly

Russ's first palette instinct — white-yellow, white-purple, white-blue
iridescent trails — was abandoned because pale tints vanish on off-white. On
near-black they **glow**. They do not work as section grounds on a dark site,
but as small luminous accents they are precisely the gsap pinwheel/squiggle
move.

The sage/cream/periwinkle grounds built in Addendum 26 (`9f371a2`) are
therefore probably superseded. The colours survive; their role changes from
ground to accent.

### Russ's own addition

> "the rest of the site apart from the showcase section will need some form of
> animation, either in the foreground that changes to the background, but flows
> all the way through"

So the flight does not merely run underneath the page — it **changes depth**.
Foreground where copy is sparse (hero, transitions), receding behind the type
where a section is carrying words. Depth becomes the mechanism for letting the
animation be the star at some moments and the setting at others, without ever
stopping.

### Revised direction

1. Near-black ground, cream type
2. Type-led sections — few words, very large
3. Flight animation continuous, shifting fore/background by depth
4. Iridescent colour as small glowing accents, not grounds
5. Curly-brace label motif
6. Particle morphs (question/brain/orb/head/infinity) become luminous on dark
7. Structure from Addendum 27 still stands — 9 sections, nothing lost

### Note

Every visual decision from Addenda 1-26 was made against a **light** ground and
should be re-examined, not carried across. The ink-on-light rule that shaped
the filaments, the orb, the stipple and the code matrix inverts entirely.

---

## Addendum 29 — the synergy brain, 2026-09-12

Russ's idea, and the strongest one of the session. Also his framing correction:
**"I don't want to rebuild, I want to transform."** Correct — the components
exist; what is missing is connective logic, not new machinery.

### The sequence

Inverts nominal.so's hero, where agents shrink *into* the header:

1. A central form — the neural orb — reads as unity / synergy / a brain
2. On scroll the agents **burst out of it**, brainstorm-style, and hold around
   it, so you can read what is inside the synergy
3. Scrolling on, they **draw back into it**
4. It pulses and glows, then **morphs into the next shape** — the existing
   particle morphs: question, brain, orb, head, infinity

### Why this is better than Addendum 27's "braid"

The braid ran the flight animation *alongside* the copy. This makes the
animation **carry the information**: the things flying out are Customer
Service Agent, Sales Agent, Finance Agent, Compliance Agent, Reporting Agent
and the rest. The visitor learns the product by watching it.

That is the gsap.com lesson applied properly — animation as demonstration, not
ornament. It also answers the standing objection that eleven screens of
abstract flight never say what up+up sells.

Inverting the direction matters too. Shrinking *in* says "we consolidate".
Expanding *out and back* says "one system, many capabilities" — and the
**return** is what sells the synergy, because you see the agents belong to
something.

### Inventory — this is recombination

| Exists | Role |
|---|---|
| `neural-orb.tsx` | the synergy brain |
| `service-carousel.tsx` (9 agents, 3 tools) | what bursts out |
| `particle-canvas.tsx` (5 morph shapes) | what it becomes |
| `flock.tsx` | the many-to-one argument, already made |
| `GROUNDS` / palette (`9f371a2`) | accents on dark |

New code: the emanate-and-return path, scroll-linked. Roughly eighty lines
against components that already work.

### Dependencies

- **Scroll-linked progress.** A burst that expands on scroll and returns on
  further scroll cannot run on discrete wheel steps. Same prerequisite as
  everywhere else.
- **Dark ground** (Addendum 28) so the pulse and glow actually read.

### Open

- Do the agents appear as text labels, cards, or glyphs? The carousel has
  names and descriptions; the glyph set has icons.
- Does the orb morph in place, or does the morph target replace it?
- Where does this sit — it is a strong candidate for the hero itself rather
  than a mid-page section.
