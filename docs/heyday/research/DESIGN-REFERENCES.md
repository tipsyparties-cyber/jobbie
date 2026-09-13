# Design references: anyone.com, allinnhomeofstudents.com, themagic8.co.uk

Researched 13 Sep 2026. Method: downloaded each page's HTML, CSS and JS with curl, read the actual rules, then rendered each page in headless Chromium (Playwright) at 1440x900 to measure computed styles, hover states and animation frames. Everything below is quoted from the source or measured in the browser, unless it is marked **INFERRED**.

Working files (from the research session, not included in this pack): `anyone-hero-lottie.json` (the hero animation, extracted), `shots/*.png` (screenshots and hero frames), raw CSS/JS in `any/`, `ai/`, `m8/`.

---

## 1. anyone.com (homepage)

Stack: Next.js (pages router) + MUI v5/v6 with Emotion (`css-xxxx` classes). The hero animation is played by **lottie-react** (`useLottie`, `LottiePlayer`, `loadAnimation`, found in the lazy-loaded chunk `3062.f1aa520cced676bb.js`), which uses the lottie-web **SVG renderer** (the rendered DOM is an `<svg>` full of `__lottie_element_N` clipPaths). No GSAP, Swiper, Framer Motion, canvas or WebGL is used in the hero.

### 1a. The hero animation on the right-hand side

**What it is:** it is **not** a marquee, a card grid or scrolling columns. It is a **single Lottie (After Effects) animation, stored as inline JSON** in the page bundle, and it loops for ever. A large cartoon cat (static, cut off at the right edge) "pushes" a stack of tall white **property-journey cards** that slide up through the frame **one at a time**. In order, the frames show: "For sale" (house illustration), "Deed" (a contract being signed with a pen), "Viewing" (house plus a calendar reading "12 February, 13:00"), and a keys-handover card. When each card arrives, the cat's paw taps it, a lavender circle ripples out, and the inner illustrations pop in with scale and opacity.

How it's mounted (from `pages/index-817aaa68680fdd04.js`):
```js
$=L()(()=>Promise.all([s.e(4254),s.e(3062)]).then(s.t.bind(s,83062,23)),{ssr:!1})   // next/dynamic, client only
...
(0,M.jsx)(I.A,{sx:a.animation,children:(0,M.jsx)($,{animationData:N,loop:!0})})
// styles:
animation:{display:{xs:"none",lg:"block"},height:900,width:1480,position:"absolute",right:0,top:0}
```
Compiled CSS:
```css
.css-1iek96{height:900px;width:1480px;position:absolute;right:0;top:0;}
@media (min-width:0px){.css-1iek96{display:none;}}
@media (min-width:1280px){.css-1iek96{display:block;}}   /* hidden below 1280px */
```
Hero container (the animation is clipped by it):
```css
.css-xvz1mn{display:flex;flex-direction:column;z-index:1;position:relative;background-color:#F9F7EB;align-items:center;overflow:hidden;}
@media (min-width:950px){.css-xvz1mn{height:712px;border-top-left-radius:56px;border-top-right-radius:56px;padding-inline:0px;padding-top:116px;padding-bottom:56px;text-align:left;}}
@media (min-width:0px){.css-xvz1mn{height:auto;border-top-left-radius:32px;border-top-right-radius:32px;padding-inline:16px;padding-top:48px;padding-bottom:32px;text-align:center;}}
```
The rendered SVG: `viewBox="0 0 2960 1424" preserveAspectRatio="xMidYMid meet"`, measured at 1480x712 px. So the composition plays at exactly **50% scale** (1 comp px = 0.5 screen px).

Lottie file header (measured): `{"v":"5.7.0","fr":60,"ip":101,"op":820,"w":2960,"h":1424}`, and `meta.tc` (the background colour) is `#f9f7eb`. Frames 101 to 820 at 60 fps give a **seamless loop of 719 frames, about 12.0 s**. Font inside: Athletics Medium (text layers, e.g. "Viewing" at size 96).

Top-level layers (comp coordinates; halve them for screen px):
- `1013`: the background precomp (the cat), 3800x1800, scale 80%, anchor [1900,900], position [1656,720]. Static, except its paw sub-layers (see below).
- Five card layers, each a 700x1000 precomp (white rounded rect `rc` size [700,1000], radius 32; on screen that is **350x500 px, radius 16 px**). All sit at **x = 2012** (card centre), and each one follows the same y path, **staggered by 180 frames (3 s)**:

| layer | ref | keyframes (t = frame : y) |
|---|---|---|
| 1028 | card asset 2 | 0: 2048 -> 100: 688 -> 150: 688 -> 300: -772 |
| 1030 | asset 6 | 180: 2048 -> 280: 688 -> 330: 688 -> 480: -772 |
| 1032 | asset 8 | 360 -> 460 -> 510 -> 660 (same y values) |
| 1034 | asset 10 | 540 -> 640 -> 690 -> 840 (ends at -692) |
| 1036 | asset 2 again | 720 -> 820 -> 870 -> 1020 (a repeat of the first card, which makes the loop seamless) |

Easing on the moves: `"o":{"x":0.333,"y":0},"i":{"x":0.667,"y":1}`, which is **cubic-bezier(0.333, 0, 0.667, 1)**, a symmetric ease-in-out.

Per-card motion in seconds and screen pixels: **rise 1.67 s** (680 px, from below the hero to resting just below centre), **hold 0.83 s**, then **exit upward over 2.5 s** (730 px, out through the top of the clipped hero). A new card starts every **3 s**, so the next card is rising while the previous one is still leaving.

Inner "pop" animations inside each card (asset 2 example):
```
L608 (ripple circle) s: t280 [0,0] -> t330 [528,528]   o: t280 0 -> t300 12 -> t320 0     ease o:{x:.77} i:{x:.18}
L609 s: t280 [140,140] -> t340 [200,200]; o: 0 -> 100
L610 p: t280 y 953.9 -> t340 y 893.9 (rises 60 comp px = 30 px); o: 0 -> 100
L298 s: 60% -> 100%, o: 0 -> 100 (t280-340);  L297 s: 0% -> 100%
L295/L239 s: 100% -> 80%, o: 100 -> 0 (t300-320)   // outgoing elements shrink and fade
```
Easing on these: out `x:0.77,y:0`, in `x:0.18,y:1`, which is **cubic-bezier(0.77, 0, 0.18, 1)**. That is the same curve the site uses for its CSS transitions.

Cat paw tap (asset 1, layer 1000; there is one paw layer per 180-frame slot: 988/991/994/997/1000):
```
p: t820 [3356,1204] -> t840 [3184,1124] -> t870 [3356,1204]     r: 0 -> -6deg -> 0      ease cubic-bezier(0.77,0,0.18,1)
```
So the paw moves in by about 86x40 px on screen and tilts -6° over 0.33 s, then returns over 0.5 s, timed to each card's arrival.

Main colours in the Lottie (fill/stroke counts): #232323, #303030, #ffffff, #aca364 (stroke), #c37d43, #e2dcb4 (stroke), #91502d, #cec693, #f9bc6a, #9ab54b, #e6e3ff, **#6755ed** (brand purple dot and pen), #446331, #f2f0e0, #ffcc74, #e8a99f. Calendar numerals #b4aaff.

- **Direction and speed:** vertical, bottom to top, one card at a time. It is not continuous; each card eases in, holds, then eases out. There are no opposing columns.
- **Fade masks:** none. The edges are simply clipped by the hero's `overflow:hidden` (712 px tall, 56 px top corners).
- **Hover behaviour:** none. It is `loop:true` only, with no interactivity config.
- **Reduced motion:** no `prefers-reduced-motion` handling was found.

**Line motif behind the hero.** Four huge rounded-rectangle outlines, drawn as absolutely positioned inline SVGs (visible from 950px up), make the faint crossing lines on the beige ground:
```html
<svg viewBox="0 0 644 796" class="top-right"><rect width="643" height="795" x="0.5" y="0.5" fill="#F9F7EB" stroke="#E6E4CF" rx="59.5"/></svg>
```
```css
.css-32pwsg{inset:0;width:100%;height:100%;position:absolute;}
.css-32pwsg .top-left{width:644px;bottom:120px;left:-15%;}
.css-32pwsg .bottom-left{width:960px;height:796px;bottom:-380px;left:7.5%;}
.css-32pwsg .middle{width:644px;bottom:-530px;right:20%;}
.css-32pwsg .top-right{width:644px;top:-630px;right:8%;}
```

**How to rebuild it:** the cheapest faithful option is to reuse the extracted `anyone-hero-lottie.json` pattern with `lottie-react` (only if you have your own artwork; the JSON is their IP). A Framer Motion equivalent: a 350x500 white card (radius 16) at a fixed x, `animate={{ y: [from 680px below, 0, 0, -730px] }}`, `times=[0, .333, .5, 1]` over a 3 s window per card (1.67 s / 0.83 s / 2.5 s), `ease: [0.333, 0, 0.667, 1]`, with each card delayed 3 s after the previous one, repeating every 12 s. Inner items pop with `scale 0 -> 1`, `opacity 0 -> 1`, `ease [0.77, 0, 0.18, 1]`, duration 1 s, starting as the card lands. Put a `overflow:hidden` hero with `border-radius: 56px 56px 0 0` around it.

### 1b. The overall style

**Fonts** (all **self-hosted custom fonts, none from Google Fonts**):
```
YoungAnyone 400   /static/fonts/YoungAnyone/YoungAnyone.woff2   (bespoke display serif, used for h1–h7)
Athletics 400/500/700/800  /static/fonts/Athletics/Athletics-*.woff2  (body/UI grotesk; licence not checked)
Inter 400/500/700/800      /static/fonts/Inter/Inter-*.woff2           (loaded too; Inter IS available on Google Fonts)
@font-face{font-family:Athletics_Fallback;src:local("Arial");ascent-override:77.47%;descent-override:21.22%;line-gap-override:24.18%;size-adjust:98.63%}
```
Theme typography (quoted from `_app` chunk):
```js
s="Athletics,Athletics_Fallback,ui-sans-serif", l="YoungAnyone,YoungAnyone_Fallback,ui-sans-serif", u="@media (max-width:949px)"
h1:{fontFamily:l,fontSize:80,fontWeight:400,lineHeight:"140%",[u]:{fontSize:48}}
h2:{...fontSize:64,[u]:{fontSize:36}}  h3:{fontSize:56 -> 40}  h4:{48 -> 32}  h5:{40 -> 28}  h6:{36 -> 24}
h7:{fontSize:24,lineHeight:"32px",[u]:{fontSize:18,lineHeight:"28px"}}
subtitle1:{fontSize:40 -> 28}  subtitle3:{24 -> 20}  subtitle2Medium:{fontSize:32,fontWeight:500 -> 24}
p1Medium:{fontSize:18,fontWeight:500,lineHeight:"140%",[u]:{fontSize:16}}  p2Medium:{16/500 -> 14}
p3:{fontSize:14,fontWeight:400}  p4:{12/400}  p3Medium:{14/500}  p4Medium:{12/500}
```
The homepage h1 is overridden to 60px at ≥950px (`.css-26oxnl h1{font-size:60px}`, max-width 730px). The subtitle is `18px/140% 500, color: rgba(35,35,35,0.8)`, max-width 540px.

**Colours (light palette, quoted):**
```js
primary:{main:"#2C2C2C",p600:"#4B4B4B",p500:"#727272",p400:"#A6A6A6",p300:"#E8E8E8",p200:"#F3F3F3",p100:"#FFFFFF"}
secondary:{main:"#6755ED",p600:"#8271FF",p500:"#9B8DFF",p400:"#B4AAFF",p300:"#CDC6FF",p200:"#E6E3FF",p100:"#F2F1FF"}
tertiary:{main:"#FFE937",p600:"#F4DF0E",p500:"#FFEC0D",p400:"#FFF941",p300:"#FEFF86",p200:"#FCFFC1",p100:"#FEFFE7",p50:"#FFFEF6"}
text:{primary:"#232323",secondary:rgba(#232323,.6)}
beige300:"#E6E4CF",beige200:"#F2F0E0",beige150:"#F9F7EB",beige100:"#FFFEF6", marblePink:"#F9D3CD", champagne:"#F9E9CA",
forestGreen:"#1B3A29", terracotta:"#BB5C46", chocolate:"#3F3D56", yellow:"#FD0"
```
The page ground is white #FFFFFF, the hero ground is #F9F7EB, thin rules are #E6E4CF or #E8E8E8, the accent is purple #6755ED, and the CTA is yellow #FFE937.

**Motion curve used everywhere:** `cubic-bezier(0.77, 0, 0.18, 1)` (theme `easeInOut`), with 250 ms for buttons and 300 ms for links and the header.

**Buttons (measured in the browser):**
| button | size | bg | text | border | radius | padding | font | hover |
|---|---|---|---|---|---|---|---|---|
| Header "Find an agent" (outlined) | 146x44 | #FFFFFF | #6755ED | 1px solid #6755ED | 8px | 12px 24px | Athletics 500 16px/22.4px | bg/colour transition 0.25s |
| Header "Account" (filled) | 138x44 | #6755ED | #F2F1FF | none | 8px | 12px 24px | same | `:hover{background-color:#8271FF}` `:active{#6755ED}` |
| "Discover homes" (yellow, inside search) | 165x44 | #FFE937 | #2C2C2C | none | 12px | 16px | same | `:hover{background-color:#FFE937}` `:active{background-color:#F4DF0E}`, no shadow |
| Large "Find an agent" further down | 216x56 | #6755ED | #F2F1FF | none | 12px | 16px 32px | same | `:hover{background-color:#8271FF}` |
| City chip ("New York") | 98x30 | #FFFFFF | #232323 | 1px solid #E6E4CF | 12px | 4px 6px | 500 14–16px | bg transition |

All buttons use `text-transform:none` and `box-shadow:none` (the MUI elevation shadows are overridden to none on hover and active). Transition: `background-color 250ms cubic-bezier(0.77,0,0.18,1), color 250ms ...`.

**Search bar card:** an outer dark shell `background-color:#2C2C2C;border-radius:24px` (width 670px) holding an inner bar `background:#F3F3F3;border-radius:20px;height:68px;padding:12px;border:3px solid #2C2C2C` plus a strip of white stats text ("31M+ homes · 4.6M+ agents …", 14px) inside the dark shell's bottom lip.

**Nav links:** `color:#4B4B4B` (Athletics 400 16px); `:hover{color:#6755ED}` over `color 300ms cubic-bezier(0.77,0,0.18,1)`. The header is white, sticky, 92px tall (80px on mobile).

**Sections:** each section is a "sheet" with big top radii that stacks over the previous one: `border-top-left-radius:56px;border-top-right-radius:56px` (32px on mobile). Examples: `.css-utzsca` (white), `.css-xvz1mn` (beige). Section padding-bottom is 124px (80px on mobile). The container is MUI `maxWidth lg`, 1280px, with 24px gutters.

**Feel:** friendly and illustrated rather than techy. It pairs a warm serif display face with a clean grotesk, uses a cream ground, large soft radii (12/16/20/24/56), a thick 3px dark outline on the search bar, and a flat look with no drop shadows. The only "grid/line" motif is the faint #E6E4CF rounded-rect outlines behind the hero. The layout is airy, not dense.

---

## 2. allinnhomeofstudents.com — buttons

Stack: WordPress (block theme "allinn") + WP Rocket (the CSS is inlined as "used CSS"). GSAP 3.12.2 (+ScrollTrigger, ScrollToPlugin, SplitText) and a Lenis-style smooth-scroll class in `js/index.js` are loaded, but **no JS touches the buttons**. The only button-adjacent JS is a tiles `mouseenter` handler that toggles `.-active` on tiles. **The hover effect is pure CSS.**

### The hover effect, exactly
**Only the corner radius animates:** it goes from **8px (.5rem) to 28px (1.75rem)**, turning the rounded rectangle into a pill, over **0.2s ease-in-out**. There is no background fill, no arrow motion, no text roll, no scale and no shadow. Measured during hover: 8.06 → 10.67 (50 ms) → 18.13 (100 ms) → 27.09 (150 ms) → 28.22px (250 ms). The arrow is static; the screenshots at rest and on hover are identical except for the corners.

Quoted CSS:
```css
body .wp-block-button__link{align-items:center;appearance:none;background-color:var(--wp--preset--color--base);border-radius:.5rem;
  color:var(--wp--preset--color--white);cursor:pointer;display:inline-flex;font-size:1rem;font-weight:600;gap:.5rem;height:3.375rem;
  justify-content:center;line-height:1.45;padding:0 1.375rem;transition:border-radius .2s ease-in-out;width:100%}
body .wp-block-button__link:focus,body .wp-block-button__link:hover{border-radius:1.75rem;color:var(--wp--preset--color--white)}
body .wp-block-button__link:after{content:var(--icon-icon-arrow-button);font-family:icons!important;font-size:1.25rem;font-style:normal;
  font-weight:400!important;line-height:1;text-transform:none;-webkit-font-smoothing:antialiased}
body .wp-block-button__link span{font-size:1rem;font-weight:600;line-height:2}
/* outlined variant ("View the floor plan") */
body .wp-block-button.is-style-alternative .wp-block-button__link{background-color:transparent;border:.0625rem solid var(--wp--preset--color--brown-400);color:var(--wp--preset--color--brown-500)}
body .wp-block-button.is-style-alternative .wp-block-button__link:after{content:none}
/* in the room cards the arrow is removed and height is 3rem on some breakpoints */
body .wp-site-blocks .block-rooms__item-button .wp-block-button__link{height:3rem;line-height:1.45;padding-left:1.25rem;padding-right:1.25rem}
body .wp-site-blocks .block-rooms__item-button .wp-block-button__link:after{content:none!important}
body .wp-site-blocks .block-rooms__item-button .wp-block-button__link{height:3.375rem;padding-left:1.375rem;padding-right:1.375rem}
```
Markup:
```html
<a href="#apply-now" class="wp-block-button__link wp-element-button"><span> Apply now </span></a>
<button class="wp-block-button block-rooms__item-button -floor-plan is-style-alternative"><span class="wp-block-button__link"><span> View the floor plan </span></span></button>
```
Tokens:
```
--wp--preset--color--base:#2C111D  (= brown-700)     --wp--preset--color--white:#FFFFFF
--wp--preset--color--brown-400:#543945               --wp--preset--color--brown-500:#402531     --wp--preset--color--brown-200:#A48995
--icon-icon-arrow-button:"\f103"   (a thin right arrow "→" from their "icons" icon font)
```
Measured (html font-size ≈ 16.128px, so rem values are slightly larger than nominal):
| | "Apply now →" (filled) | "View the floor plan" (outlined) |
|---|---|---|
| size | 151x54 (height 3.375rem) | 186x54 |
| background | #2C111D | transparent |
| text | #FFFFFF | #402531 (stays this colour on hover because the variant selector is more specific) |
| border | none | 1px solid #543945 |
| radius | 8px → 28px on hover/focus | 8px → 28px |
| padding | 0 1.375rem (22px) | same |
| gap text↔arrow | .5rem (8px) | no arrow |
| font | "Stabil Grotesk" 600, 16px, span line-height 1.2–2 | same |
| arrow | ::after, icons font, 20px, glyph \f103 | none |

Fonts: `Stabil Grotesk` (500 = StabilGrotesk-Regular.woff2, 600 = StabilGrotesk-Medium.woff2), `Labil Grotesk` 600, `ABC Gaisyr` 500. All are **self-hosted** from `/wp-content/themes/allinn/assets/fonts/`. None are Google Fonts. Foundry and licence were not checked (the "ABC" prefix suggests Dinamo; **INFERRED**).

Related hover patterns on the same site, for reference:
```css
body .wp-site-blocks .block-footer__up-button{... border-radius:50%; height:4rem; width:4rem; transition:transform .3s ease-in-out}
body .wp-site-blocks .block-footer__up-button:hover{transform:scale(1.1)}
body .wp-site-blocks .block-rooms__item-nav-button{border:.0625rem solid transparent;border-radius:.375rem;height:2.3125rem;font-size:.75rem;
  transition:color .3s ease,border-color .3s ease,background-color .3s ease}
body .wp-site-blocks .block-rooms__item-nav-button:hover{background-color:rgba(84,57,69,.051);color:var(--wp--preset--color--brown-500)}
```

Tailwind rebuild: `inline-flex h-[54px] items-center justify-center gap-2 rounded-lg px-[22px] font-semibold text-white bg-[#2C111D] transition-[border-radius] duration-200 ease-in-out hover:rounded-[28px] focus-visible:rounded-[28px]` (add a `→` icon at 20px). For the outlined version: `bg-transparent border border-[#543945] text-[#402531]`.

---

## 3. themagic8.co.uk — cards and UI

Stack: Next.js (app router, Turbopack) + **Tailwind v4** + **Framer Motion** (`motion.div`). Everything is client-rendered.

**Font:** `cabinetGrotesk` (Cabinet Grotesk, self-hosted woff/woff2 at weights 300/400/700/800/900, `font-display:block`). It is a free font from Indian Type Foundry / Fontshare, **not on Google Fonts**. Body: `html{font-family:var(--font-cabinet-grotesk, ui-sans-serif, system-ui, sans-serif...)}`, text #000.

**Colours:**
```css
.bg-oppi-orange{background-color:#ffa149}  .bg-oppi-blue{background-color:#aeacff}  .bg-oppi-green{background-color:#84e482}
.bg-oppi-pink{background-color:#ffd3e8}    .bg-oppi-yellow{background-color:#ffea70}  .bg-gray-75{background-color:#f8f7f4}
.bg-black{background-color:#000}  .bg-white{background-color:#fff}  .border-black{border-color:#000}
```
Layout: a split screen. The left half is solid orange #ffa149 holding a pile of tilted cards; the right half is the content column (`bg-gray-75` = #f8f7f4) with an xl:border-l black divider.

### Cards (quoted classes + measured computed values)
**Content card ("Welcome to The Magic 8"):**
```html
<div class="rounded-[40px] border border-black bg-white px-5 py-10 shadow-[6px_10px_0_0] shadow-black/[0.08] md:px-6">
  <div class="mb-4 flex items-center space-x-4 md:mb-6"><svg width="25" height="22">…</svg><h3 class="text-base font-semibold">Welcome to The Magic 8</h3></div>
  <h4 class="mb-4 text-3xl lg:text-4xl font-bold">For ideas that need to be shared</h4>
  <div class="text-lg lg:text-xl"><p>…</p></div>
</div>
```
```css
.rounded-\[40px\]{border-radius:40px}
.shadow-\[6px_10px_0_0\]{--tw-shadow:6px 10px 0 0 var(--tw-shadow-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}
.shadow-black\/\[0\.08\]{--tw-shadow-color:#00000014}
```
Measured: **border 1px solid #000, radius 40px, background #fff, box-shadow `6px 10px 0 0 rgba(0,0,0,0.08)`** (a hard offset shadow with no blur at 8% black), padding 40px 24px (md), about 656 px wide. The small label is a 25x22 multi-coloured card icon followed by the label in Cabinet 600 16px/24px, with a 16px gap (`space-x-4`). The heading is 700 36px/40px (30px on mobile). The body is 400 20px/28px (18px on mobile). No hover on these cards.

**Tilted hero cards (left half):** a shared base, `ej`:
```
relative flex min-h-[160px] transform items-center overflow-hidden rounded-2xl border-black p-3 text-center
shadow-[12px_6px_0px_0px_rgba(0,0,0,0.08)] md:min-h-[198px] md:w-[302px]
```
- Orange cards: `bg-oppi-orange w-[234px] -rotate-[20deg] border` and `w-[244px] rotate-[14deg] border`. Measured: 1px solid #000, **radius 16px** (`--radius-2xl:1rem`), shadow `12px 6px 0 0 rgba(0,0,0,0.08)`, bg #ffa149, plus an overlay `absolute inset-0 bg-white/10`. Heading: 700 36px/30px.
- White "Build my 8" card: `group w-[262px] -rotate-6 md:-rotate-12 border-2 bg-white pb-6 md:pb-8 !shadow-[11px_11px_0px_0px_rgba(0,0,0,0.08)] duration-500 ease-in-out hover:rotate-0 cursor-pointer`. Measured: **2px solid #000, radius 16px, shadow `11px 11px 0 0 rgba(0,0,0,0.08)`**. Heading "Build my 8" is 900 40px/35px (30px on mobile).

**Card hover (the only card hover):** the white card **straightens from -12deg to 0deg** over **0.5s cubic-bezier(.4,0,.2,1)** (`.hover\:rotate-0:hover{rotate:none}`, `.duration-500{transition-duration:.5s}`, `--ease-in-out:cubic-bezier(.4,0,.2,1)`). The **shadow does not change**: it measured `11px 11px 0 0 rgba(0,0,0,.08)` both at rest and on hover, and the card does not move or scale. At the same time, its "GO!" pill inverts through `group-hover`.

**Entrance animation (Framer Motion, quoted):**
```js
eG=(e=.3,t=1)=>({hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:e,staggerDirection:t}}})
e$=(e=.3,t=150)=>({hidden:{y:t,opacity:0},visible:{opacity:1,transition:{ease:"easeOut",duration:e},y:0}})
eB={initial:"hidden",whileInView:"visible",viewport:{once:!0}}
eR={variants:eG(),...eB}, eF={variants:e$(.5)}, eH={variants:eG(1.8),...eB}, eq={variants:e$(.8)}, eW={variants:eG(2.6),...eB}, eX={variants:e$(1.2)}
```
Each of the three cards fades and rises **150px → 0** with `easeOut`. Durations are 0.5 s, 0.8 s and 1.2 s, and the parents' staggerChildren values are 0.3 s, 1.8 s and 2.6 s. This runs once, when the cards come into view.

### Buttons
```html
<!-- inside card -->
<button class="rounded-full px-[31px] py-[10px] bg-black text-white transition duration-300 ease-in-out hover:bg-white hover:text-black
  group-hover:bg-white group-hover:text-black border border-black min-w-[122px] text-lg font-black md:min-w-[140px] md:text-xl">GO!</button>
<!-- wide CTA -->
<button class="rounded-full px-[31px] py-[10px] bg-oppi-orange text-black transition duration-300 ease-in-out hover:bg-black hover:text-white
  group-hover:bg-black border border-black group-hover:text-white ...">Build my 8</button>
```
- The black "GO!" pill (900 20px) inverts to white bg / black text over 0.3s cubic-bezier(.4,0,.2,1).
- The wide "Build my 8" CTA is full width, orange #ffa149, 1px black border, fully rounded, Cabinet 600 24px/32px. It inverts to black bg / white text on hover over 0.3 s.

### Header pill (top right)
```html
<header class="fixed inset-x-0 z-50 flex items-center justify-between p-4 md:items-start">
 <nav><button class="absolute right-3 top-3 z-50 flex h-12 w-12 items-center justify-center rounded-full border-white bg-black text-white md:h-auto md:w-auto md:border md:px-8 md:py-4">
   <ul class="flex items-center divide-x text-lg font-bold">
     <li class="pr-4"><a class="underline hover:no-underline" href="/order-your-pack">Order pack</a></li>
     <li class="pl-4 underline hover:no-underline">Help</li>
 </ul></button></nav></header>
```
Measured: 226x62 px, **bg #000, text #fff, 1px border #fff** (invisible on white, it shows only against the orange), `rounded-full`, **padding 16px 32px**, fixed 12px from the top and right. Links are Cabinet **700 18px/28px, underlined, underline removed on hover**, separated by a 1px vertical divider (`divide-x`; no divide colour class is set, so it uses the default border colour. The screenshot shows it as a light/white line on the black pill, and the exact value was not measured: **INFERRED**). A 16px gap sits either side of the divider. On mobile it collapses to a 48x48 black circle with an 18px icon. The logo sits top left: an "X" mark plus "The Magic 8" (146x24 SVG).

### Tailwind v4 tokens it relies on (quoted)
```
--text-base:1rem/1.5  --text-lg:1.125rem/1.75rem  --text-xl:1.25rem/1.75rem  --text-3xl:1.875rem/2.25rem  --text-4xl:2.25rem/2.5rem
--font-weight-semibold:600 --bold:700 --extrabold:800 --black:900
--radius-2xl:1rem  --ease-in-out:cubic-bezier(.4,0,.2,1)  --default-transition-duration:.15s
```

**Recipe:** a neo-brutalist-lite look. Use a 1px (or 2px for the hero card) pure black border, radius 16px (small cards) or 40px (content panels), and a hard offset shadow `Xpx Ypx 0 0 rgba(0,0,0,.08)` with no blur (6/10, 11/11, 12/6 and 12/12 all appear). Use a flat white or orange fill, heavy Cabinet Grotesk headings (700–900) with tight leading (30–35px), pill buttons that invert black/white on hover, and a rotate-to-0 hover on the playful card.

---

## Could not be determined / caveats
- anyone.com: which card precomp (asset 2/6/8/10) maps to which title. The frames show "For sale", "Deed", "Viewing" and keys, but only "Viewing" is a live text layer (asset 2); the other titles are baked into shapes. The Lottie JSON and illustrations are anyone.com's assets, so build your own art.
- anyone.com: Athletics's foundry and licence were not checked. YoungAnyone looks bespoke (**INFERRED** from the name).
- allinn: the icon-font glyph `\f103` is identified only visually (a thin "→"). The foundry for Stabil/Labil Grotesk is not confirmed.
- Magic8: the `divide-x` line colour is from Tailwind v4's default border colour (the theme defines `--color-gray-200`). It was not measured directly because the divider is drawn as `border-inline-end` on the first `li`, which read 0px on the left side.
