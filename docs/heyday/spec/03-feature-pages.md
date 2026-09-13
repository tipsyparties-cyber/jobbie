# Heyday site spec, part 3: feature pages

This part covers the 46 feature pages at `/features/[slug]`. Every page uses one template (T2 in the build prompt), and every word on it comes from `data/features.json`. The copy there is holding copy for Jem to edit: it says what each section is for, in words close to the final ones. Every feature shows "Coming soon" until Jem and Russell decide which are live. Statistics come only from `STATS-BANK.md`, by row number, and always print their source.

The pages by group: Get ahead 4, Get found 7, Win the client 11, Run the day 11, Get paid 6, Get rebooked 7. The AI page (`/features/ai`, T11) and the integrations index (`/integrations`, T10) are specified in part 2, not here.

## The template (T2), section by section

Sections run in this order on every feature page. Motion follows the build prompt's motion table: nothing moves unless it says so below, and reduced motion switches every movement off.

### 1. Breadcrumb
- **What it's for:** tells people where they are, and links back to the group and the index.
- **Layout:** one line under the header, left-aligned, Geist Mono 12.5px.
- **Holding copy:** "Features › {group.name} › {name}". The group name links to `/how-it-works/{group.id}`; "Features" links to `/features`.
- **Image:** none.
- **Icons and marks:** the group's section mark, small (16px) and still, before the group name.
- **Motion:** none.

### 2. Hero
- **What it's for:** names the owner's pain in their words, then names the feature in the words people search for.
- **Layout:** two columns at 1024px and up (copy left, picture right); one column below, with the picture under the buttons. It sits on the page's first ground colour, with the 56px rounded top over the header area as on other marketing pages.
- **Holding copy:**
  - **H1:** `pain`.
  - **The line under it:** `searchLine`. Use the same words in the page `<title>` and meta description.
  - **Intro:** `intro`.
  - **Status chip** beside the H1: "Coming soon" (or "Live" once Jem and Russell decide).
  - **Buttons:** "Join early access" (primary, while the feature is coming soon; "Start free trial" once it's live) and "Book a demo" (ghost).
  - **"Only on Heyday" sticker** by the H1 when `onlyOnHeyday` is true.
- **Image:** a `ScreenIllustration` in a panel (1px ink outline, 40px corners, hard offset shadow), drawn from `howItWorks[0].screen` at hero size and labelled "Illustration · example data". Follow-ups uses the workflow-builder still instead (see the special cases).
- **Icons and marks:** the feature's small icon (`icon`) as a tilted sticker overlapping the panel's top-left corner.
- **Motion:** the copy never moves (it must be readable on the first frame). The picture has the gentle parallax (±60px). The sticker straightens on hover.

### 3. Saves / Increases / Reduces
- **What it's for:** the outcome in one glance, before any detail.
- **Layout:** up to three small cards in a row, joined by the Heyday line; they stack at phone width.
- **Holding copy:** `outcomes.saves`, `outcomes.increases` and `outcomes.reduces`, only those present, in that order. Each card has a Geist Mono label ("Saves", "Increases", "Reduces").
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the cards are stickers (tilted, straighten on hover). They rise in with the 150ms stagger.

### 4. The proof
- **What it's for:** one real statistic that shows the pain is real.
- **Layout:** a full-width panel with the number in large type and the source in small print underneath.
- **Holding copy:** `StatBlock` for each row in `stats`, using the statistic and source wording from `STATS-BANK.md`: the claim, then "Source: …, year, who it covers", linked. If `stats` is empty, leave the section out.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** rises in once it's in view.

### 5. What it's costing you
- **What it's for:** makes the pain personal, with the maths shown.
- **Layout:** a panel with three rows: the inputs, the maths and the result (the result in large type). Where the result mentions a calculator, add the small calculator under it: fields for the visitor's own numbers and a live result, with no email needed.
- **Holding copy:** `example.inputs`, `example.maths` and `example.result`. Always print "Example numbers" as the label. If `example` is null, leave the section out.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the panel rises in. The calculator itself doesn't animate.

### 6. How it works
- **What it's for:** shows the feature working, step by step.
- **Layout:** jump links first (one per block, pinned under the header while you're in the section). Then the sticky scroll: copy blocks on the left, one per `howItWorks` item, each at least 80vh tall; a panel on the right that stays put while its picture changes to match the block in view. At phone width there's no sticking: each picture sits above its block.
- **Holding copy:** each block shows `label` (Geist Mono), `heading` and `line`, then a small text link: "Join early access →" (Jobber repeats its trial button after every section, and we copy that).
- **Image:** one `ScreenIllustration` per block, drawn from that block's `screen` description and labelled "Illustration · example data". The panel's ground takes the group's colour (on Run the day's ink, the picture sits on a paper card).
- **Icons and marks:** none.
- **Motion:** the sticky scroll (design brief B7): the picture cross-fades in 0.4s and the new picture rises 16px.

### 7. For your kind of business
- **What it's for:** lets a caterer, a class host and a cleaner each see themselves on the page.
- **Layout:** three cards in a row (stacking at phone width), each with the kind of business as a Geist Mono label and one sentence.
- **Holding copy:** `situations[].business` and `situations[].situation`.
- **Image:** a `HoldingImage` slot on each card (4:3), with an art-direction note, for example "A bartender mid-pour at an outdoor wedding".
- **Icons and marks:** none.
- **Motion:** the cards rise in with the 150ms stagger; pictures have the parallax.

### 8. A customer quote
- **What it's for:** proof from a real customer, once there is one.
- **Layout:** one large quote in a panel, with a name line under it.
- **Holding copy:** "Placeholder: a real customer quote goes here once one is approved." Signed "Placeholder". Never invent a quote, a name or a number.
- **Image:** a round `HoldingImage` slot for the customer's photo.
- **Icons and marks:** none.
- **Motion:** rises in.

### 9. FAQ
- **What it's for:** answers the questions that stop people signing up. Jobber's pages don't have one; HoneyBook's do.
- **Layout:** an accordion, one question per row, full width.
- **Holding copy:** `faq[].q` and `faq[].a`. The answers describe how the feature works; the status chip in the hero says whether it's live yet.
- **Image:** none.
- **Icons and marks:** a plus that turns into a minus on each row.
- **Motion:** each answer opens with a 0.2s height transition (instant with reduced motion). Only the heading rises in.

### 10. Related features
- **What it's for:** keeps people exploring.
- **Layout:** a row of four cards (swipeable at phone width), each with the feature's small icon, name and H1.
- **Holding copy:** from `related`: each card shows that feature's `name` and `pain`, and links to `/features/{slug}`.
- **Image:** none.
- **Icons and marks:** each card has its feature's small icon (the `-small` version at 24px).
- **Motion:** the cards rise in with the 150ms stagger.

### 11. Closing call to action
- **What it's for:** one last, clear next step.
- **Layout:** an ink block with cream text and the 56px rounded top, overlapping the section above. Above the buttons, a one-line pricing strip: "Pick the plan that fits. [PRICE TBC]" linking to `/pricing`.
- **Holding copy:** "Ready for your Heyday?", then "Join early access" (primary) and "Book a demo" (ghost, cream outline).
- **Image:** none.
- **Icons and marks:** the Heyday sun, small, beside the heading.
- **Motion:** the page's background fades to ink as this block arrives. The sun bounces once when the block comes into view.

## Every feature page

| Group | Feature | Slug | Icon | Only on Heyday | Existing jobbie page |
|---|---|---|---|---|---|
| Get ahead | AI setup assistant | `ai-setup-assistant` | hd-ai-setup-assistant | Yes | – |
| Get ahead | Policies and procedures | `policies-and-procedures` | hd-policies-and-procedures | Yes | – |
| Get ahead | Team management | `team` | hd-team | No | `team` (rewrite) |
| Get ahead | Integrations | `integrations` | hd-integrations | No | – |
| Get found | Booking page and mini-site | `booking-page` | hd-booking-page | No | `booking-page` (rewrite) |
| Get found | Get listed on the Heyday marketplace | `marketplace-listing` | hd-marketplace-listing | Yes | – |
| Get found | Sell everywhere, one diary | `sell-everywhere` | hd-sell-everywhere | Yes | – |
| Get found | Campaigns and off-peak offers | `campaigns` | hd-campaigns | No | `campaigns` (rewrite) |
| Get found | Ads that know which bookings pay | `ads-that-know-which-bookings-pay` | hd-ads-that-know-which-bookings-pay | Yes | – |
| Get found | Guest capture at events | `guest-capture` | hd-guest-capture | Yes | – |
| Get found | Partners and cross-promotion | `partners` | hd-partners | Yes | – |
| Win the client | Enquiries and lead types | `enquiries` | hd-enquiries | No | `enquiries` (rewrite) |
| Win the client | Missed-call capture | `missed-call-capture` | hd-missed-calls | Yes | – |
| Win the client | AI receptionist | `ai-receptionist` | hd-ai-receptionist | No | – |
| Win the client | Replies that write themselves | `replies-that-write-themselves` | hd-ai-replies | No | – |
| Win the client | Instant quotes | `quotes` | hd-instant-quotes | No | `quotes` (rewrite) |
| Win the client | Follow-ups and autoresponders | `follow-ups` | hd-automations | No | `follow-ups` (rewrite) |
| Win the client | Online booking and instant book | `online-booking` | hd-online-booking | No | `online-booking` (rewrite) |
| Win the client | Classes, tickets and private groups | `classes-and-tickets` | hd-classes-and-tickets | Yes | – |
| Win the client | Packages, memberships and regulars | `packages-and-memberships` | hd-packages-and-memberships | No | – |
| Win the client | Contracts and e-signatures | `contracts-and-e-signatures` | hd-contracts-and-e-signatures | No | – |
| Win the client | Group bookings and split payments | `group-bookings` | hd-group-bookings | Yes | – |
| Run the day | Client portal and event planning | `client-portal` | hd-client-portal | No | `client-portal` (rewrite) |
| Run the day | One inbox | `inbox` | hd-one-inbox | No | `inbox` (rewrite) |
| Run the day | Client records | `client-records` | hd-client-records | No | `client-records` (rewrite) |
| Run the day | Call notes and follow-ups | `call-notes` | hd-call-notes | Yes | – |
| Run the day | Scheduling and one diary | `scheduling` | hd-scheduling | No | `scheduling` (rewrite) |
| Run the day | Shift offers and staffing | `shift-offers` | hd-team-and-shifts | No | `staff-allocation` (rewrite, then redirect to `shift-offers`) |
| Run the day | Checklists, shopping and kit lists | `checklists-and-kit-lists` | hd-checklists-and-kit-lists | No | – |
| Run the day | On the day | `on-the-day` | hd-on-the-day | No | `job-tracking` (rewrite, then redirect to `on-the-day`) |
| Run the day | Tasks | `tasks` | hd-tasks | Yes | – |
| Run the day | Hiring and onboarding | `hiring-and-onboarding` | hd-hiring-and-onboarding | Yes | – |
| Run the day | Time tracking | `time-tracking` | hd-time-tracking | No | `time-tracking` (rewrite) |
| Get paid | Payments and deposits | `payments` | hd-payments | No | `payments` (rewrite) |
| Get paid | Tips by QR and tap | `tips` | hd-tips | No | – |
| Get paid | Invoicing and chasing | `invoicing` | hd-invoicing | No | `invoicing` (rewrite) |
| Get paid | Team pay and expenses | `team-pay-and-expenses` | hd-team-pay-and-expenses | No | – |
| Get paid | Profit per job | `profit-per-job` | hd-profit-per-job | No | `job-costing` (rewrite, then redirect to `profit-per-job`) |
| Get paid | Reports and the Command Centre | `reporting` | hd-reports | No | `reporting` (rewrite) |
| Get rebooked | Reviews | `reviews` | hd-reviews | No | `reviews` (rewrite) |
| Get rebooked | Referrals | `referrals` | hd-referrals | No | `referrals` (rewrite) |
| Get rebooked | Gift vouchers | `gift-vouchers` | hd-gift-vouchers | Yes | – |
| Get rebooked | Loyalty | `loyalty` | hd-loyalty | Yes | – |
| Get rebooked | Fill quiet dates | `fill-quiet-dates` | hd-fill-quiet-dates | Yes | – |
| Get rebooked | Waiting lists | `waiting-lists` | hd-waiting-lists | Yes | – |
| Get rebooked | Complaints settled fairly | `complaints` | hd-complaints | Yes | – |

Where the existing slug and the new slug differ, rewrite the old page as the new one and redirect the old URL. The old `job-tracking` page is replaced by On the day.

## Icons

Every feature page has its own small icon in `assets/heyday-family-sprite.svg`, drawn by the family rules (design brief, A7).
- The original eleven keep their names (for example `hd-instant-quotes`).
- The other 35 are named after their page's slug, for example `hd-gift-vouchers`. Pages that use one of the original eleven keep it; Shift offers, for example, uses `hd-team-and-shifts`.
- Each has a `-small` version for 24px and under.
- The `icon` field in `data/features.json` gives the exact name for every page.

## Special cases

- **Instant quotes (`quotes`):** follows SaaS brief section 3.9 exactly.
  - The proof is Flashquotes' statistic (`STATS-BANK.md` row 1), "QUOTES SENT WITHIN 4 HOURS BOOK 25% MORE OFTEN", in large type straight after the hero, with its source in small print. Crediting a direct rival is Jem's and Russell's call; if they'd rather not, use row 2 (the Harvard Business Review finding) instead.
  - The worked example uses Flashquotes' booking rates (22%, 18%, 16%) and ends with the small calculator.
  - The How it works blocks show the interactive quote: the customer changes guests, hours or the package and ticks add-ons, and the price updates live.
- **Follow-ups and autoresponders (`follow-ups`):** this is the settings studio, Jobber's "Automations" equivalent. Its hero picture is the workflow-builder still (`assets/heyday-workflow-builder-still.svg`), not a drawn screen, and its first How it works block uses the same still. There is no separate Automations page in the page list; if Jem wants one, it uses the still too.
- **Replies that write themselves:** the How it works blocks are the three AI levels. The third (autopilot) is marked "Coming soon" on its picture.
- **Integrations (`integrations`):** its card in menus and on the index links to `/integrations` (T10) rather than a feature page. Use this entry's copy as the intro of that page.
- **The "Only on Heyday" sticker:** any feature with `onlyOnHeyday: true` gets a tilted sticker reading "Only on Heyday" beside the H1, and the same tag on its card in the features index and in the Only on Heyday filter. It counts towards the three-stickers-per-screen limit, so on those pages the Saves / Increases / Reduces cards sit straight.
- **Numbers:** every figure in `example` is labelled "Example numbers". `[to confirm]` in an FAQ answer stays visible as a placeholder until Jem and Russell decide.
