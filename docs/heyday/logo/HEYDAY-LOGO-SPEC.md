# Heyday logo specification

Everything needed to use the Heyday logo correctly, without redrawing anything.

The mark is Jem's own drawing. It was traced to vector from their high-resolution file
and checked against the original by overlay: **98.7% of pixels match**. Do not redraw it,
re-trace it, or "clean it up" — use the supplied vector.

Live reference (every item below, rendered): the brand system page in the pack.

---

## 1. The mark

**File: `assets/heyday-mark-jem.svg`** — this is the master. Everything else is derived from it.

- `viewBox="0 0 100 100"`, one `<path>`, `fill-rule="evenodd"` (**required** — without it the
  counters fill in and the mark becomes a blob).
- The drawing occupies roughly x 0.5–98.7, y 0.5–99.4 inside that box. There is no built-in padding.
- It is a **single colour**. Never multicolour it, never gradient it, never outline it.

### Its three parts

The path is three sub-paths, in this order. Split on `M` to address them separately
(needed for the animations):

| Order | Part | What it is |
|---|---|---|
| 1 | `outer` | The outer arc — the big open ring |
| 2 | `burst` | The nine-ray burst and the diagonal cut |
| 3 | `inner` | The inner arc — the smaller ring inside |

```js
const SUBS = MARK.split('M').filter(s => s.trim()).map(s => 'M' + s)
const PARTS = { outer: SUBS[0], burst: SUBS[1], inner: SUBS[2] }
```

When the parts are drawn separately, each `<path>` still needs `fill-rule="evenodd"`.

### Clipping

For anything that scales, rotates or grows the mark, give the SVG room:
`viewBox="-16 -16 132 132"` plus `overflow:visible`. A `0 0 100 100` box clips the
beat and spin animations at the corners.

---

## 2. The wordmark

**Live text, not an image: DM Sans Bold, lowercase, letter-spacing −0.02em.**

```css
.wm{ font: 700 26px/1 "DM Sans", system-ui, sans-serif; letter-spacing: -.02em; }
```

Always lowercase: **heyday**. Not Heyday, not HEYDAY, not HeyDay.

Load DM Sans from Google Fonts (`family=DM+Sans:opsz,wght@9..40,700`). For a logo *file*
(not a web page) convert the letters to outlines so it can't fall back.

PNG fallbacks exist — `assets/heyday-wordmark-dmsans.png`, `-cream.png` — but prefer live text on the web.

### The lockup

Mark first, then the word, **3px apart** — tight, so the mark reads as part of the word
rather than an icon sitting beside it. Vertically centred:

```html
<a class="brand" href="/" aria-label="Heyday, home">
  <span class="sunmark"><!-- heyday-mark-jem.svg --></span>
  <span class="wm" role="img" aria-label="Heyday"></span>
</a>
```
```css
.brand{ display:flex; align-items:center; gap:3px; text-decoration:none }
.brand .sunmark{ width:24px; height:24px; color:var(--blue) }
.wm::after{ content:"heyday" }
```

Mark 24px in the header, 26px in the footer. The mark sits on the **left**.
The burst's rays already reach out to the right, so the optical gap is smaller than the number —
don't add more air to "make it breathe". At mark:word 28:26 the gap is 3; scale it with the mark
(gap = mark ÷ 9.3), never as a fixed figure.
(`proto_template.html` currently has the word first — that is out of date; mark first wins.)

### The lockup as a ready-made file

Where a single logo image is wanted rather than markup, use these. The letters are
**already converted to outlines**, so there is no font to load and nothing to fall back to.
This is what replaces any old asterisk-and-Heyday logo image still in the build.

| File | Mark | Word | For |
|---|---|---|---|
| `heyday-lockup.svg` | blue | ink | **the default** — cream or paper grounds |
| `heyday-lockup-paper.svg` | paper | paper | colour grounds (green, blue, purple) |
| `heyday-lockup-sky-on-dark.svg` | sky | paper | dark grounds — the footer |
| `heyday-lockup-ink.svg` | ink | ink | one-colour, where colour isn't available |
| `heyday-lockup-blue.svg` / `-green.svg` / `-purple.svg` / `-cream.svg` | one colour throughout | | |
| `heyday-lockup-large.svg` | blue | ink | 112px mark — print, or raster exports |
| `heyday-lockup-2x.png` / `-3x.png` | blue | ink | anywhere that won't take an SVG |
| `heyday-lockup-paper-2x.png` | paper | paper | as above, on colour |

Proportions inside the file: mark 28, gap 3, word 26px DM Sans Bold at −0.02em tracking,
mark vertically centred on the word's line box. Scale the whole file — never re-space the parts.

Prefer the live markup below on the website (it can animate, and the word stays selectable
text). Use the file for everything else.

### The lockup animates

On page load the mark in front of the wordmark plays **Assemble**, in blue.
The word does not move — only the mark.

```html
<span class="sunmark a-assemble">
  <svg viewBox="-16 -16 132 132" overflow="visible">
    <g class="all">
      <path class="outer" d="…" fill="#93B7E8" fill-rule="evenodd"/>
      <path class="burst" d="…" fill="#93B7E8" fill-rule="evenodd"/>
      <path class="inner" d="…" fill="#93B7E8" fill-rule="evenodd"/>
    </g>
  </svg>
</span>
```

Assemble is defined in section 6. It runs once, about 0.75s, and settles into the
resting mark — so the header looks right from the first frame onwards and there is
no empty state. Do not loop it, and do not replay it on navigation within the site;
once per page load is the whole effect.

Under `prefers-reduced-motion` it does not play (the media query in section 6 covers this),
and the header renders as the plain resting lockup.

---

## 3. Colour

| Name | Hex | Use |
|---|---|---|
| cream | `#F2E9E1` | page ground, circles |
| paper | `#FBF9F6` | cards, circles, the mark reversed |
| sage (green) | `#9AAD92` | circles, the mark |
| blue | `#93B7E8` | the mark's default, circles |
| sky | `#AEC9EE` | the mark on dark grounds (footer) |
| lavender (purple) | `#D6D0F5` | circles, the mark |
| ink | `#0A0A0A` | type only |
| orange | `#F26B2A` | **actions only — never the logo** |
| yellow | `#FCFC72` | never next to orange, never the logo |

**Rules:** no black logo. No orange logo. No yellow logo. Yellow never touches orange.

### Every colourway

Circle colours: purple, blue, green, cream, white.
Mark colours: green, white, cream, purple, blue.
Same on same is skipped. That is 20 pairings:

| Circle | Mark can be |
|---|---|
| Purple `#D6D0F5` | green, white, cream, blue |
| Blue `#93B7E8` | green, white, cream, purple |
| Green `#9AAD92` | white, cream, purple, blue |
| Cream `#F2E9E1` | green, white, purple, blue |
| White `#FBF9F6` | green, cream, purple, blue |

Each works both with the curved word and with the mark on its own.

Two pairings are near-invisible and are **texture, not logo**: white on cream, cream on white.
The three that carry hardest at small sizes: white on green, white on blue, green on cream.

In a circle the mark sits at **72%** of the circle's width (mark alone) or **78%**
when the curved word is also present.

---

## 4. The curved wordmark

The word follows the outside of the outer arc, like "LIFESTYLE" on Jem's reference.

The outer arc was fitted by least squares to a circle:

```
centre (46.2, 46.8)   radius 47.4      (in the mark's own 0–100 coordinates)
```

Built as SVG text on a path, in a `0 0 100 100` box:

```
mark_scale = 0.78         scale applied to the mark, translated to keep it centred
                          tx = 50 − 46.2·s,  ty = 50 − 46.8·s
R          = 47.4·s + gap + font_size·0.55      the text baseline circle
gap        = 0.4          air between arc and letters
font_size  = 7.4 px       DM Sans Bold
tracking   = 0.26em
arc        = 165° → 285°, startOffset 50%, text-anchor middle   (rotated left, centred on the arc)
```

```html
<defs><path id="c1" d="M{x0} {y0}A{R} {R} 0 0 1 {x1} {y1}" fill="none"/></defs>
<text ...><textPath href="#c1" startOffset="50%" text-anchor="middle">heyday</textPath></text>
```

where `x = 50 + R·cos(angle)`, `y = 50 + R·sin(angle)`.

**Still open:** whether the curved version is the primary logo or badge-only.
Until Jem decides, the horizontal lockup (section 2) is the primary.

---

## 5. Favicons and app icons

Two families. Both are the mark alone — no word, it is illegible at these sizes.

**Transparent** (the mark on nothing, current default in the prototypes):

| File | Size | Note |
|---|---|---|
| `heyday-favicon-16.png` | 16 | burst only — the arcs close up at 16 |
| `heyday-favicon-28.png` | 28 | |
| `heyday-favicon-32.png` | 32 | |
| `heyday-favicon-48.png` | 48 | |
| `heyday-favicon-64.png` | 64 | |
| `heyday-favicon-180.png` | 180 | apple-touch |
| `heyday-favicon-512.png` | 512 | master; every smaller one is derived from it |
| `heyday-favicon.svg` | any | |
| `heyday-favicon-small.svg` | ≤32 | simplified |

**Blue tile** (mark reversed out of a solid blue circle) — the alternative:
`heyday-favicon-tile-{16,28,32,48,180,512}.png`.

All raster sizes are built from the 512: crop to the drawing, fit to the box with
**1px of air each side** (the tile has none — the circle bleeds to the edge).
Do not scale a small one up.

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
```

At 32 both families read clearly. At 16 the tile is easier to spot but you lose the detail.
**Still open:** transparent vs blue tile as the shipped favicon.

### App icon

`heyday-badge-{64,180,512}.png` — the mark in paper on a blue circle, mark at 72% of the circle.
`heyday-badge-ink-512.png` is the dark variant (sky mark on ink) — for dark app surfaces only,
not a logo colourway.

---

## 6. Motion

Seven animations. All act on the three sub-paths, so the markup must expose them as
`.outer`, `.inner`, `.burst` inside a `<g class="all">`.

```css
.outer,.inner,.burst,.all{ transform-box: fill-box; transform-origin: center }
```

| Name | Runs | What it does | Where it belongs |
|---|---|---|---|
| **Signal** | loops | Both arcs pulse outward, one after the other | Loading state; header while a page is working |
| **Assemble** | once | Burst springs up from the middle, arcs fade in behind it | **The header lockup, on page load** (see section 2); page transitions |
| **Click round** | once | Whole mark turns 45° | Hover |
| **Together** | once | Arcs in from the left, burst from the lower right, meeting on the diagonal | Something completes — booking confirmed, form sent |
| **Spin** | loops | Whole mark turns slowly, all of a piece | Long wait; footer |
| **Sunrise** | once | Whole mark rises up from behind an invisible horizon | First page load only |
| **Beat** | loops | Whole mark swells every couple of seconds | Header; a button that's waiting |

```css
/* Signal */
.a-signal .outer{ animation: pulse 2.4s ease-in-out infinite }
.a-signal .inner{ animation: pulse 2.4s ease-in-out .28s infinite }
@keyframes pulse{ 0%,60%,100%{transform:scale(1);opacity:1} 25%{transform:scale(1.07);opacity:.55} }

/* Assemble */
.a-assemble .burst{ animation: spring .7s cubic-bezier(.34,1.5,.64,1) both }
.a-assemble .outer{ animation: fadein .5s .22s both }
.a-assemble .inner{ animation: fadein .5s .34s both }
@keyframes spring{ from{transform:scale(.25);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes fadein{ from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }

/* Click round */
.a-click .all{ animation: click45 .8s cubic-bezier(.34,1.3,.64,1) both }
@keyframes click45{ from{transform:rotate(0)} to{transform:rotate(45deg)} }

/* Together */
.a-together .outer,.a-together .inner{ animation: fromleft .7s cubic-bezier(.215,.61,.355,1) both }
.a-together .inner{ animation-delay:.08s }
.a-together .burst{ animation: fromright .7s cubic-bezier(.215,.61,.355,1) both }
@keyframes fromleft{ from{transform:translate(-22px,0);opacity:0} to{transform:none;opacity:1} }
@keyframes fromright{ from{transform:translate(18px,12px);opacity:0} to{transform:none;opacity:1} }

/* Spin */
.a-spin .all{ animation: turn 12s linear infinite }
@keyframes turn{ to{transform:rotate(360deg)} }

/* Sunrise — the svg is clipped at the horizon and the mark travels up through it.
   12% puts the horizon just under the burst's lowest point, so nothing is cut at rest. */
.a-sunrise{ clip-path: inset(0 0 12% 0) }
.a-sunrise .all{ animation: risesun 2.1s cubic-bezier(.25,.65,.25,1) both }
@keyframes risesun{ from{transform:translateY(108px)} to{transform:translateY(0)} }

/* Beat */
.a-beat .all{ animation: beat 2.6s ease-in-out infinite }
@keyframes beat{ 0%,62%,100%{transform:scale(1)} 74%{transform:scale(1.18)} 86%{transform:scale(.96)} }

@media (prefers-reduced-motion:reduce){ .outer,.inner,.burst,.all{ animation:none !important } }
```

Notes:
- Every animation works in every colourway. Nothing depends on a particular colour.
- `Beat` and `Spin` need the `-16 -16 132 132` viewBox or they clip.
- `Sunrise` shows an empty circle for its first moments. That reads as deliberate on a
  load screen and as a broken image anywhere else. Load screen only.
- To replay a once-only animation, remove the class, force a reflow, add it back:
  `el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls)`.

---

## 7. Rules

**Do:**
- Use the supplied vector, at one colour, with `fill-rule="evenodd"`.
- Keep clear space of at least the mark's own radius around it.
- Reverse it to paper or sky on dark grounds.

**Don't:**
- Redraw, re-trace, stretch, skew, or rotate it (except the Click round and Spin animations).
- Recolour it orange, yellow or black.
- Add a stroke, shadow, glow or gradient.
- Put the word inside the circle — the word goes beside it, or curved outside the arc.
- Use the wordmark in any face but DM Sans Bold, or in any case but lowercase.

---

## 8. Still to do

- Jem to choose: curved logo as primary, or badge-only.
- Jem to choose: transparent favicon or blue tile.
- Convert the chosen curved logo's text to outlines and add the outlined file to the pack.
- The six section shapes and the 46 feature icons are still drawn from the **old** sun
  and need redrawing from this mark.

Files in `assets/` not covered here — `heyday-mark.svg`, `heyday-family-sprite.svg`,
`heyday-section-marks.svg`, `heyday-mark-motion.js`, `heyday-hero-still.svg` — are from
earlier passes and have **not** been checked against this spec. Where they disagree with
this document, this document is right.
