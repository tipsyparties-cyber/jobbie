Claude Code: this is the design direction for the Heyday host software site (the jobbie repo, branch `redesign/mono-binary-intro`). Read it all, then read `AGENTS.md` in the repo, because this Next.js version has breaking changes. Build Part A and Part B in the order in Part C. Commit to the current branch as you go.

# Heyday: design direction for the host software site

**From:** Jem, with Claude, 13 September 2026.
**Read with:** `HEYDAY-SAAS-WEBSITE-BRIEF.md` (the copy, the six groups, the features) and `BUILD-NEXT-HEYDAY-SAAS.md` (the task list).
**The brand is spelled Heyday**, one word, as on the live hero. The older briefs say "Hey Day". Read those as Heyday.

**Pictures that go with this brief** (in `~/Projects/heyday-upandup-brief/assets/`, and copyable from the Heyday brand page, https://claude.ai/code/artifact/9a9a37bb-88d9-40b5-9059-0128a67552d3):
- `heyday-hero-still.svg`: a still frame of the hero animation. Reference only.
- `heyday-workflow-builder-still.svg`: the placeholder for the workflow-builder demo video. It goes on the site as `public/placeholders/workflow-builder.svg`.
- `heyday-mark.svg`: the Heyday sun, the brand mark. It goes on the site as `public/brand/heyday-mark.svg`.
- `heyday-family-sprite.svg`: the mark and the 11 feature icons drawn from it, each with a small version. It goes on the site as `public/icons/heyday-family.svg`.
- `heyday-mark-motion.js`: the exact points for every shape the mark turns into, and a small engine that morphs between them. It goes in the site as `src/lib/heyday-mark-motion.js` (A11).
- `heyday-section-marks.svg`: still versions of the section shapes, for places that don't animate. It goes on the site as `public/icons/heyday-section-marks.svg`.
- The mark page, with every animation and the more-info section working: https://claude.ai/code/artifact/83c4116a-5aaf-4c2f-bff3-93baef24a1df. All four new files (the mark, the motion, the section marks and the small icons) have copy buttons there.

---

## The idea in one line

**Heyday runs the whole workflow, not just the paperwork.** HoneyBook and Jobber both say "all-in-one", so that phrase alone isn't ours. What they leave out is our edge: the team who deliver the job, their shifts and pay, classes alongside services, the aftercare, and the marketplace.

The design should make you *see* one workflow running from the first hello to the next booking. It should feel fun, positive and bright, because that's what "Heyday" sounds like.

Lines to use:
- "One workflow for your whole business, from the first hello to the next booking."
- "Everything between the enquiry and the encore, in one workflow."
- "The whole workflow, not just the paperwork."

## What makes it look like Heyday and not HoneyBook

The pastel colours in `src/lib/palette.ts` came from honeybook.com (the file says so), so the colours alone won't set us apart. These things will:

- **Heyday orange (#F26B2A) for every action:** buttons, active states, the connectors between workflow steps, and one accent in each icon.
- **Thin ink outlines and hard offset shadows with no blur** (from themagic8.co.uk). This replaces soft shadows, glass and neumorphism.
- **Buttons whose corners round off on hover** (from allinnhomeofstudents.com), instead of floating pills.
- **Grotesque type with a monospace for small labels.** No serif. Cormorant Garamond reads wedding-soft, which is HoneyBook's territory.
- **Airy sections that overlap with 56px rounded tops, and faint outline shapes behind them** (from anyone.com).
- **Rising cards in the hero** that show the workflow moving.
- **Our own icon set,** joined by an orange line.

Result: techy, confident and gender-neutral, still warm.

---

# Part A: the design system

Everything in Part A applies across the whole site.

## A1. Name, wordmark, symbol

- **Wordmark:** Jem's chunky, rounded Heyday wordmark, `assets/heyday-wordmark.png`. `src/components/ui/wordmark.tsx` still shows the text "jobbie"; make it show this wordmark (as a CSS mask, so it can take a colour), keeping it in that one component. Don't redraw it.
- **The mark: the Heyday sun** (Jem's direction, 13 September).
  - **What it is:** four double-ended arrows crossing at the centre make eight rays around a core.
  - **Its colour:** always one colour, rays and core together, and never black or orange. It takes the colour that suits where it sits (A11).
  - **What it says:** sunshine, which is the name. It's also work flowing both ways between the business, its customers and its team, which is the tech.
  - **File:** `public/brand/heyday-mark.svg`.
- **Where it goes:**
  - the favicon and app icon: a blue sun on a cream tile (the mark page also shows paper on blue, paper on sage and blue on yellow);
  - next to the wordmark in the header;
  - the section marks and the more-info sections (A11, A12);
  - as the parent of every feature icon (A7).
- **It changes shape** (A11): the same eight arrows fold into a flat shape for each part of the business (the section marks), and it bounces now and then.
- **Retired:** the four earlier symbol ideas on the brand page (Sunrise, Hey bubble, H arch, Day dial).

## A2. Colour

The core colours, and the rules for using them. The rest of jobbie's palette (sage, blue, sky, lavender) is in B2.

| Token | Colour | Use |
|---|---|---|
| ink | #0A0A0A | Text, outlines, offset shadows, icon strokes |
| cream | #F2E9E1 | Resting ground |
| paper | #FBF9F6 | Cards |
| **orange** | **#F26B2A** | **Every button and active state** |
| yellow | #FCFC72 | Highlights only (a marker behind a phrase, a sticker) |

Rules:
- **Orange is a fill, never a text colour.** Orange text on cream fails contrast. Buttons are orange with *ink* text. Ink on orange passes WCAG AA (about 6:1). White on orange doesn't.
- **Yellow and orange never touch.** Don't put an orange button on a yellow ground or a yellow highlight next to an orange button. Where they'd meet, the button goes ink.

## A3. Type

- **Hero headline:** keep Plus Jakarta Sans, the stand-in for PP Mori in `src/lib/fonts.ts`.
- **Headings, buttons and card titles:** Cabinet Grotesk, the face Magic8 uses.
  - It's free from Fontshare, not Google, so self-host it with `next/font/local`. Check the licence page before shipping.
  - Google fallback if you'd rather not self-host: Schibsted Grotesk.
- **Body:** Inter, as now.
- **Small labels, step numbers, stat sources and the braced labels like `{ why Heyday }`:** Geist Mono (Google Fonts), 12–13px, letter-spacing 0.02em. This is the "techy" note. Use it sparingly.
- **Remove Cormorant Garamond from the Heyday pages.**

## A4. Buttons: the corners round off on hover

Measured from allinnhomeofstudents.com: only the corner radius changes. It goes from 8px to a full pill in 0.2s, ease-in-out. Nothing lifts, glows or changes colour. The styling is Magic8's: a 1px ink outline.

Rewrite `src/components/ui/button.tsx`:
- **Remove:** the glass style, the uppercase text, the `whileHover y: -2` lift, and the `^` caret.
- **Size and shape:** height 54px (48px on phones), padding 0 22px, radius 8px, 1px solid ink border.
- **Text:** Cabinet Grotesk 600 at 16px, sentence case.
- **Arrow:** a static "→" with an 8px gap, on the main call to action only.
- **Hover and keyboard focus:** radius 28px, with `transition: border-radius .2s ease-in-out`. In Tailwind: `rounded-lg hover:rounded-[28px] focus-visible:rounded-[28px] transition-[border-radius] duration-200 ease-in-out`.
- **Focus ring:** a visible 2px ink outline, offset 3px, as well as the radius change.

Variants:
- `primary`: orange fill, ink text. Examples: "Start free trial", "Join early access".
- `dark`: ink fill, cream text. Use on yellow grounds.
- `ghost`: transparent, ink text, ink outline. Example: "Book a demo".

## A5. Cards: thin outline, hard shadow

Measured from themagic8.co.uk. Replace `neo-card.tsx` (the neumorphic shadows) with these three:

- **Panel** (big content blocks, the sticky-scroll frame, the workflow-builder frame):
  - 1px ink border, 40px radius, paper background, padding 40px 24px.
  - Shadow `6px 10px 0 0` in ink at 8% opacity.
- **Card** (feature cards, sideways-scroll cards, story cards, hero cards):
  - 2px ink border, 16px radius.
  - Shadow `11px 11px 0 0` in ink at 8% opacity.
- **Sticker** (playful moments: group icons, stat callouts):
  - The same as the card, but tilted −8°. It straightens on hover in 0.5s with `cubic-bezier(.4,0,.2,1)`.
  - Magic8 tilts to −12°; −8° reads calmer. Use no more than three stickers per screen.

Shadows never blur. Hovering a card doesn't move it; only stickers change on hover.

## A6. The rise, with parallax (from mariamontessori.org)

Content rises into place as you scroll down, sinks away when you scroll back up, and rises again on the way down.

- **Start:** 2em (32px) below its final place, and transparent.
- **Trigger:** when the element's top passes 90% of the viewport height. In framer-motion: `viewport={{ once: false, margin: "0px 0px -10% 0px" }}`.
- **Timing:** 0.75s with `cubic-bezier(.215,.61,.355,1)`.
- **Stagger:** siblings in a group step by 150ms, capped at the seventh item. Use `delay: Math.min(i, 6) * 0.15`, so a long grid doesn't make people wait.
- **Where it goes:** update `src/components/ui/section-reveal.tsx` to this spec. It's currently `once: true`, 40px, 0.8s. Add a `RevealGroup` for staggered children.
- **Parallax:** images and illustrations inside a section move a little faster than the page, so they "scroll up slightly faster".
  - Use `useScroll({ target, offset: ["start end", "end start"] })` and `y = useTransform(p, [0, 1], [60, -60])`.
  - Keep it within ±60px, and only on pictures, never on text.
- **Never on the hero:** it must be readable on the first frame.
- **Reduced motion:** everything simply shows, with no rise and no parallax.

## A7. The icon family

These are the small icons, for the app, cards and menus. The big flat shapes for sections are the section marks in A11.

Every feature icon comes from the Heyday sun: it's the sun with one part turned orange and reshaped into the feature.
- **Reports, Tasks and Automations** are made from the sun's own arrows.
- **The other eight** sit bottom right, where two arrows were taken out.

**The file:** `public/icons/heyday-family.svg`.
- It holds `hd-mark` and one icon for every feature page, 46 in all. The first eleven are instant quotes, online booking, one inbox, payments, team and shifts, reviews, missed calls, AI replies, automations, reports and tasks.
- The other 35 are named `hd-` plus the feature's slug. `data/features.json` gives each page's icon.
- Each feature also has a `-small` version, which is the orange piece on its own.

**Using one:** `<svg class="h-16 w-16"><use href="/icons/heyday-family.svg#hd-instant-quotes" /></svg>`.
- The ink arrows use `currentColor`.
- The orange piece has a halo in the colour behind the icon. Set `--hd-ko` to that colour, for example `style="--hd-ko:#FBF9F6"` on a paper card.

**Sizes:** use the full icon at 40px and up (feature cards, section heads). At 24px and under (menus, buttons, lists), use the `-small` version.

**Rules for any new icon:**
- Start from the mark's 100-unit drawing (A11).
- Keep at least four ink arrows, each with its arrowhead.
- Add exactly one orange piece, drawn in thick rounded strokes or as a solid shape, with the halo.
- No gradients and no second colour.

**The six group icons** use these until Jem wants custom ones:

| Group | Icon |
|---|---|
| Get ahead | `hd-automations` |
| Get found | `hd-online-booking` |
| Win the client | `hd-instant-quotes` |
| Run the day | `hd-team-and-shifts` |
| Get paid | `hd-payments` |
| Get rebooked | `hd-reviews` |

## A8. The Heyday line (the "one workflow" device)

- **What it is:** a 2px ink line with 10px dots at each step. The current step's dot fills orange and grows to 14px. Connectors between steps get a small orange "+" (as in the workflow-builder still).
- **Where it appears:**
  - Under the hero cards, as the step indicator.
  - As the progress bar on both sideways-scroll sections.
  - Joining the icons in the six-group rail.
- **Why:** it's the visual version of "one workflow". Every time an icon or card appears in a row, it's on the line.

## A9. The hero's rising cards (from anyone.com, in our own art)

anyone.com's hero has tall white cards rising one at a time through a rounded panel on the right. It's a Lottie file and it's their artwork, so **copy the pattern and the timing, never the file or the art.** Ours is DOM plus framer-motion; no Lottie or Rive is needed.

Build one component, `RisingCards`:
- **Panel:** the right half of the hero, clipped, with 56px rounded top corners. Behind the cards sit three or four faint 1px rounded-rectangle outlines (paper at 55% opacity on a coloured ground).
- **Cards:** 300×420, paper, 2px ink border, 16px radius, hard shadow (A5).
- **Motion, per card:**
  - **Rise:** about 680px over 1.67s.
  - **Hold:** 0.83s.
  - **Leave:** upward, about 730px, over 2.5s.
  - Use `cubic-bezier(0.333, 0, 0.667, 1)` for the motion.
  - Build it as framer-motion keyframes at 0%, 33% and 50%, then 100% for the exit.
- **Rhythm:** a new card every 3s. The loop lasts the number of cards × 3s.
- **No extras:** the cards simply scroll up and away. There's no ripple, no pop-in and no sun peeking in, and each card shows all its details the whole time.
- **Screen sizes:**
  - 1280px and wider: the animation runs.
  - Narrower: one card sits still, with the Heyday line under it.
  - Reduced motion: the loop stops on one card.
- **Pausing:** stop when the hero is off screen or the tab is hidden.
- **Accessibility:** one `aria-label` on the panel describes it ("Example workflow: an enquiry becomes a booked, paid, staffed and reviewed job"). The moving cards are `aria-hidden`.

## A10. Section shape

The site uses the anyone.com overlap. Each section after the hero has 56px rounded top corners and sits 56px up over the one before, so the page reads as a stack of cards.

- The colour fades between sections (see B2).

**Decorative suns instead of orbs:** wherever the old site used blurred orbs or blobs, use Heyday suns instead.
- Use different sizes, each in one colour (A11), and at most three per screen.
- One may run across a section edge, to link two sections, as in the homepage hero (spec part 1, homepage section 2).
- They sit behind text and never make it harder to read.
- They turn slowly with the dial click, and drift with a gentle parallax. With reduced motion, they're still.

## A11. The mark in motion, and the section marks

The same eight arrows and core fold into a flat shape for each part of the business, like the Wellness Festival poster Jem shared. Every section of the site gets its own shape in its own colour, and they're obviously one family.

**Files:**
- **`src/lib/heyday-mark-motion.js`** (from `assets/heyday-mark-motion.js`, or copy it from the mark page):
  - It holds the exact points for every shape, and a small engine that morphs between them, in plain JavaScript.
  - Port it into a `HeydayMark` component, using a ref and `requestAnimationFrame` or framer-motion's `useAnimationFrame`. No library is needed.
- **`public/icons/heyday-section-marks.svg`:** still versions of the shapes, for places that don't animate.

**The drawing** (a 100-unit square):
- The sun is four lines through the centre at 0°, 45°, 90° and 135°, with tips 40 from the centre.
- Stroke 8, with round ends.
- Each tip has an arrowhead 11 long, at ±40°.
- The core has a radius of 10, in the same colour as the rays.

**The sun's colour:** always one colour, and never black or orange.
- **In a group's section,** it takes that group's colour: Signal lavender, Connect blue, Paid sage, Loop sky. Where the group's colour is ink or orange (Run the day, Get ahead), it's blue.
- **On plain grounds:** blue #93B7E8 on cream and paper, paper #FBF9F6 on blue, sage and sky, and sky #AEC9EE on ink.
- **When it morphs into a shape,** its colour blends into the shape's colour.
- **In code:** pass the sun colour as a prop. `heyday-mark-motion.js` takes it as `new Mark(svg, wrap, shape, {sun: colour})`.

**The shapes for the host software site:**

| Section | Shape | What the arrows do | Colour |
|---|---|---|---|
| Get ahead | Sunrise | The lower arrows lie down into a horizon under a half sun | Orange #F26B2A |
| Get found | Signal | One half turns into signal waves; the other half keeps pointing out | Lavender #D6D0F5 |
| Win the client | Connect | The sun splits in half and the halves pull apart, joined by a line | Blue #93B7E8 |
| Run the day | Dial | The rays become the hours, and two arrows become the hands, at ten past ten | Ink |
| Get paid | Paid | The rays close into a ring around a tick | Sage #9AAD92 |
| Get rebooked | Loop | The arrows chase each other round, spinning | Sky #AEC9EE |
| It runs itself | Infinity | The arrows flow along a figure-eight | Ink |

**Colour notes:**
- The section marks use jobbie's own palette, unchanged.
- Yellow never makes a shape, because it's too pale to see on paper. It stays a highlight.
- Lavender is pale too, so the Signal section sits on a cream ground rather than paper.

**The rules for a new shape:**
- Always the same eight strokes and one core. Nothing is ever added.
- Strokes can bend, move, shorten or tuck into the core.
- Any stroke that's still a ray keeps its arrowhead.
- One flat colour, which is the section's colour.
- It must read at 120px.

**How the morph works:**
- Each stroke is 17 points. A morph moves every point to its place in the next shape in 0.9s, with `cubic-bezier(.65,0,.35,1)`.
- The colour blends at the same time.
- Always go back through the sun between two shapes, so people see where each one comes from.
- The Loop spins at 60° a second, and the Infinity flows, while they're showing.

**Small moves:**
- **Dial click:** a 45° turn in 0.7s, with a small overshoot.
- **Bounce:** 0.7s. It hops up 12%, squashes on landing (scale 1.08 wide, 0.92 tall), then settles. Set the transform origin near the bottom.

**Where it plays:**
- **Header:** the mark bounces once on load, and that's all.
- **Sections with a shape:** each starts as the sun and changes into its shape as it scrolls into view, with the rise timing (A6).
- **Footer:** the mark slowly cycles through the six shapes.
- **Favicon:** the sun, static.

It only animates while it's on screen. With reduced motion, it shows the finished shape, still.

## A12. More info: the shape grows into the page

Jem's idea: each section's shape sits beside the headline. Press "more info" and the shape grows until the whole section is its colour.

**At rest:**
- **Left:** a headline with a highlighted phrase, one line, and a ghost button, "How it fits together →".
- **Right:** the section's shape in its colour.
- About every 7 seconds, it turns back into the sun, bounces, and turns back.

**When someone presses the button:**
1. **The shape grows** around its own core, slowly at first, then fast, over 0.9s.
   - The final scale is the distance from the core to the section's farthest corner, divided by 46% of the shape's width, plus 8%.
   - As it grows, the core swells to a radius of 46, so the gaps between the arrows close.
2. **The detail layer switches on** underneath, in the same colour, and the shape resets behind it.
3. **The detail rises in** over 0.45s:
   - four small cards with the small icons;
   - a stat with its source, where one is approved;
   - a "Back" button.

**"Back":** the content fades out in 0.2s, then the shape, still huge, shrinks home in 0.7s.

**How to build it:**
- Put the detail layer in the same grid cell as the resting content, so the section is tall enough for either.
- Give the section `overflow: hidden` and `isolation: isolate`, so its 40px rounded corners clip the growing shape.

**Accessibility:**
- The button has `aria-expanded` and `aria-controls`.
- The hidden layer is `inert`.
- When it opens, focus moves to "Back". When it closes, focus returns to the button.
- Esc closes it.
- With reduced motion, it simply swaps.
- On ink sections (Run the day), the text is cream.

**Where it goes:**
- **The jobbie homepage feature rows** (B4 item 6): each of the four "Stop…" rows, with its group's shape.
- **Group and feature pages:** each can open with its group's shape.

---

# Part B: the host software site (jobbie)

## B1. Feel

- **Structure:** anyone.com. Airy, one idea per screen, big friendly headlines, lots of room.
- **Finish:** Magic8's outlines and hard shadows make it techier than anyone.com, which on its own reads as illustrated and soft.
- **Energy:** bright, fun and positive, through motion and orange, not through more colour.

## B2. Colour on jobbie

- **Grounds** (the existing palette): cream #F2E9E1, paper #FBF9F6, sage #9AAD92, blue #93B7E8, sky #AEC9EE and lavender #D6D0F5.
- **Yellow #FCFC72:** as a highlight marker behind one phrase per screen (the "highlighted phrase inside each headline" look the site already has).
- **Orange #F26B2A:** actions only.
- **Keep the fading grounds.** The ground map in `palette.ts` and `gsap-structure` fades the page colour between sections; keep that behaviour.
  - Suggested order: cream (hero), sky, paper, lavender, cream, sage (tinted, text on paper cards), blue, cream.
  - The final call to action is an ink block with cream text and an orange button.

## B3. What stays, what goes

- **Keep the header** with the three dropdown panels (commit 8aebdb3). Restyle its buttons to A4. "Book a demo" is ghost; "Start free trial" is primary.
- **The hero copy is new** (Jem, 13 September). It replaces the live "Do what you love, Heyday runs the rest.":
  - **Label:** `{ easy automation, your way }`
  - **Headline:** "You didn't start a business to have an admin job."
  - **Line:** "Think of Heyday as you, times a thousand. Always on, always instant."
  - **Small line:** "From the first hello to the next booking. Automate as much or as little as you want."
- **Replace the scatter animation's right-hand side with `RisingCards`.** `hero-motion.tsx` (594b770) has the letter scatter. Keep the letters assembling on load if Jem likes it, but the right half of the hero becomes `RisingCards`.
- **Replace:** `button.tsx` (A4), `neo-card.tsx` (A5), `section-reveal.tsx` (A6), and the glass panels on the Heyday pages.
- **Take off the Heyday homepage** anything that doesn't fit this direction, if it's still there. That means the neural, particle, flock and murmuration canvases, and the binary intro. Leave the files; just don't render them on the homepage.

## B4. The homepage, in order

The copy comes from `HEYDAY-SAAS-WEBSITE-BRIEF.md` section 3.7, "Homepage copy". This order places the four devices Jem asked for.

1. **Header** (kept).
2. **Hero:**
   - **Left:** the label, headline, line and small line (B3), then "Start free trial" (primary, with arrow) and "Book a demo" (ghost).
   - **Right:** `RisingCards` with the eight workflow cards (B5). See `heyday-hero-still.svg`.
3. **What Heyday is:** the plain description and search wording, with feature links and the business-type marquee (spec part 1, homepage section 3).
4. **Statement:** `{ why Heyday }` and "Six apps, a group chat and your evenings. That's how most small businesses run. It doesn't have to be." One big sentence, lots of space.
5. **Sideways scroll 1, "How Heyday runs your day"** (B6): the twelve steps of the real flow, grouped under the six group names, on the Heyday line. Heading: "One workflow for your whole business, from the first hello to the next booking."
6. **The feature rows, kept as Russell chose them** (the design record's Addendum 34):
   - These are the four "Stop…" rows, with the highlighted phrase inside each headline, alternating sides, and no dividers.
   - Jem's change (13 September): each row's soft gradient form becomes the section mark of that row's group, and the row's button grows the mark into the row (A12).
   - In order:
     - instant quotes: Win the client, the Connect shape, blue;
     - one inbox: Run the day, the Dial, ink;
     - payments: Get paid, the Paid shape, sage;
     - shift offers: Run the day, the Dial, ink.
7. **What it does, as a sticky scroll** (B7): "One place for the whole job, from first hello to five stars." The capabilities scroll on the left, and the picture on the right changes to match each one.
8. **"Build it your way"** (B8): the workflow builder, using the placeholder still.
9. **The AI:** three cards (Draft, Draft and train, Autopilot, the last marked coming soon), in panel style, on the Heyday line from left to right, to show the levels going up.
10. **Sideways scroll 2, "Only on Heyday"** (B6): the features neither Jobber nor HoneyBook has (brief section 3.8, part 3). Show the eight strongest, and mark anything not built "coming soon".
11. **Who it's for and example stories:** the seven story cards in a swipeable row, all labelled Example. It isn't pinned; people swipe or drag it.
12. **Grows with you:** the four stages as stickers on the Heyday line.
13. **Sell everywhere:** "Selling on Airbnb, ClassBento or Togather? Keep them." This block is a solid block in jobbie's own blue #93B7E8, with ink text, as the bridge to the marketplace. jobbie uses only its own colours. It's a preview of the marketplace and the visual bridge between the two sites.
14. **Switching:** three steps.
15. **Closing:** "Ready for your Heyday?" on an ink block, with the two buttons.
16. **Footer:** with "Make your day a Heyday." (the marketplace tagline), linking to the Heyday marketplace.

Keep the two sideways sections apart (5 and 10). Two in a row would feel like the page had taken over the scroll.

## B5. The hero cards: the whole workflow

Eight cards, one per step, looping. The example data is marked as examples in the panel's label. Each card has:
- a Geist Mono step label, for example "STEP 2";
- the step's icon in a cream tile;
- a title;
- two or three label and value rows;
- an orange status pill.

| # | Title | Rows (example) | Pill |
|---|---|---|---|
| 1 | New enquiry | From: Website · Party: 80 guests · Date: Sat 14 June | Replied in 40s |
| 2 | Instant quote | Package: Signature bar · Hours: 4 · Total: $1,450 | Sent in 8 seconds |
| 3 | Booked | Deposit: $450 paid · Terms: Signed | Confirmed |
| 4 | Team confirmed | Bartenders: 2 of 2 · Kit list: Ready | Shift filled |
| 5 | The day | Arrive: 5:30pm · Travel: 24 min | Checked in |
| 6 | Paid | Balance: $1,000 · Tips: $120 | Paid in full |
| 7 | New review | ★★★★★ · "Best party we've had" | Referral sent |
| 8 | Rebooked | Next: Birthday, March · Client since: 2025 | Booked again |

The Heyday line under the panel shows the eight steps, with the current one lit. It's the same line the sideways sections use.

## B6. Sideways scroll: for things people mustn't miss

Jem's words: "use the sideways scroll as you scroll down too to share info we dont want people to miss". The section pins, and scrolling down moves the cards sideways, so every card gets seen.

Build one component, `SideScroll`, used for sections 5 and 10:
- **Structure:**
  - The outer section is tall. Its height is the track's overflow plus one viewport.
  - Inside it, a `sticky top-0 h-screen overflow-hidden` wrapper holds the track.
  - The track's `x` comes from `useTransform(scrollYProgress, [0, 1], [0, -(trackWidth - viewportWidth)])`. Measure the widths with a ResizeObserver.
- **Cards:** the A5 card style, about 360px wide with a 24px gap. Each card has:
  - an icon;
  - a Geist Mono label: the group name on section 5, "Only on Heyday" on section 9;
  - a title of three to six words;
  - two lines of copy;
  - a stat where one is approved (from `STATS-BANK.md`, with its source in Geist Mono).
- **Progress:** the Heyday line along the bottom fills orange as you go.
- **Phones (under 768px) and reduced motion:** no pinning. It becomes a normal horizontal row with `scroll-snap-type: x mandatory` and a visible "swipe" hint.
- **Keyboard:** each card can take focus. When a card takes focus, scroll the window to the point that brings it into view. The next section must also be reachable without stepping through every card, so add a "Skip" link before the track.
- **Section 5 content:** the twelve steps from brief section 3.3, "the whole flow, in the order it really happens", titled by step and grouped under Get ahead, Get found, Win the client, Run the day, Get paid and Get rebooked. Say "It runs itself" at the end, as the thread through all six.
- **Section 10 content:** from brief section 3.8, part 3:
  - AI autopilot levels
  - missed-call messages by caller type
  - AI setup assistant
  - lead types with replies to match
  - fill quiet dates
  - group bookings with split payments
  - referral code first, then the review
  - sell everywhere, in one diary

## B7. Sticky scroll (from HoneyBook's automation section)

The copy scrolls; the picture beside it stays put, and its contents change to match the copy.

- **Wide screens (1024px and up):**
  - Two columns. The copy is on the left. Each block is at least 80vh tall, with the text centred vertically.
  - On the right is a panel (A5), `sticky top-24 h-[calc(100vh-8rem)]`.
- **Changing the picture:** each copy block uses `useInView({ amount: 0.6 })` to set the active index. The panel's contents cross-fade over 0.4s, and the new picture rises 16px as it comes in.
- **Ground:** the panel's ground takes each group's colour as its block comes in (A11's table), so the change is obvious. On ink (Run the day), the picture sits on a paper card.
- **The blocks:** the "What it does" capabilities (SaaS brief 3.7, item 6), rewritten for hosts, with classes and tickets, and gift vouchers, added (`BUILD-NEXT-HEYDAY-SAAS.md` Phase 6).
  - Group them into six blocks, one per group.
  - Each block has the group's label in Geist Mono, a heading, two lines, and links to its feature pages.
- **The pictures, one per block:**
  - Get ahead: the setup assistant filling in prices (coming soon).
  - Get found: the booking page with the instant quote.
  - Win the client: the quote the customer adjusts.
  - Run the day: one client thread (email, WhatsApp, a text and a call note, with an AI draft), then a shift offer with three people ranked and the first yes taking it.
  - Get paid: a deposit, a balance reminder by WhatsApp, and "Paid" ticking over.
  - Get rebooked: a thumbs up, then a referral code, then the review ask.
- **The pictures for now:** SVG screens drawn in the same style as `heyday-workflow-builder-still.svg`, with a paper app window, ink outlines and orange for the one active thing. Label each "Illustration · example data". Real screenshots replace them later.
- **Phones:** no sticking. Each picture sits above its copy block.

## B8. "Build it your way": the workflow builder

Jem's words: "drag and drop the items in their workflow then click each item to customise it … eventually it would be like a demo video but for now do a placeholder as an image but representative of how it would look if we took a still of the video".

- **Heading:** "Build it your way."
- **Line under it:** "Drag in a step. Click it to make it yours. Heyday runs it every time."
- **The picture:** `public/placeholders/workflow-builder.svg`, in a panel (A5) on a blue #93B7E8 ground.
  - The still already shows the Workflows tab.
  - It shows the "Add a step" list (triggers, actions, logic).
  - A flow runs from "Enquiry arrives" through "Quote accepted?" to yes and no branches, with a step being dragged into an empty slot.
  - The "Customise step" panel is open on "WhatsApp nudge", showing chips for when, wait, send, by, to, unless and only between, plus an AI suggestion.
- **Three short points beside it,** each with an icon on the Heyday line:
  - "Start from a ready-made workflow for your kind of business."
  - "Every step says what it does in plain words."
  - "Test it on yourself before it goes live."
- **Build it as a `WorkflowDemo` component** that takes a `poster` and an optional `src`. For now it renders the poster as an image with a small "Demo video coming soon" chip.
- **When the video exists:** `<video autoPlay muted loop playsInline preload="none" poster=…>`. With reduced motion, show the poster and a play button instead of autoplaying.
- **What the video should show** (for later, 30–45 seconds, silent, with captions burned in, 1440×900 at 2x):
  - dragging "Ask for review" into the empty slot;
  - clicking "WhatsApp nudge";
  - changing "Wait" from 2 days to 1 day;
  - switching "By" from WhatsApp to email and back;
  - pressing "Test run";
  - the nudge arriving on a phone.

## B9. Feature pages

Every feature page follows the template in the SaaS brief (section 5.5): a headline, a data fact with its source, and then the rest.

On top of that template, each page uses:
- the feature's icon, as a sticker next to the headline;
- a short sticky scroll (B7) of three blocks for "how it works";
- the Heyday line showing where the feature sits in the six groups;
- the rise (A6) throughout.

The Quotes page keeps its interactive quote and the worked example of lost revenue (brief section 3.9).

---

# Part C: build order, and checks

1. **Tokens and fonts:**
   - Add orange, the Heyday ink shadow value and Geist Mono.
   - Add Cabinet Grotesk with `next/font/local` (or Schibsted Grotesk from Google).
   - Remove Cormorant from the Heyday pages.
2. **Components:** `Button` (A4), `Panel`, `Card` and `Sticker` (A5), `SectionReveal` and `RevealGroup` (A6), `Icon` using the family sprite (A7), `HeydayLine` (A8), `HeydayMark` (A11) and `MoreInfoSection` (A12).
3. **Copy the pictures in:**
   - the mark to `public/brand/heyday-mark.svg`;
   - the family to `public/icons/heyday-family.svg`;
   - the section marks to `public/icons/heyday-section-marks.svg`;
   - the motion file to `src/lib/heyday-mark-motion.js`;
   - the workflow still to `public/placeholders/workflow-builder.svg`.
   - Then make the favicon from the mark.
4. **`HeydayMark`** (A11), **`RisingCards`** (A9), then the hero (B4 item 2, B5), then **`MoreInfoSection`** (A12).
5. **`SideScroll`** (B6), then sections 5 and 10.
6. **The sticky scroll** (B7), with its six placeholder screens.
7. **`WorkflowDemo`** (B8).
8. **The rest of the homepage,** in B4 order, then the feature pages (B9).

**Check before each commit:**
- The build passes.
- At 400px wide nothing scrolls sideways, except the swipe rows.
- With reduced motion on in the OS, nothing rises, pins or loops, and everything is readable.
- Every button and card can be reached and seen with the keyboard.
- The hero is readable on the first frame.
- No orange text anywhere.
- No yellow touching orange.
- Numbers marked `[needs approval]` in the SaaS brief stay out.

**Send Jem screenshots of the finished homepage** at 1440px and at 400px.
