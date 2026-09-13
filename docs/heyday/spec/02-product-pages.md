# Heyday site spec, part 2: product pages

This part covers the pages that explain the product:
- How it works;
- the six group pages;
- the features index;
- the AI page;
- integrations, and every integration page;
- What's new.

Each page is set out section by section, with its layout, holding copy, image, icons and motion. All the copy is holding copy, written so each section's job is clear; Jem will edit it. Every feature is "Coming soon" until Jem and Russell decide otherwise. Anything in `[TBC]` stays a placeholder.

**Shared rules for every page in this part:**
- **Buttons:** follow A4 of the design brief. "Start free trial" is the primary button; it opens `/early-access` until the product exists. "Book a demo" is the ghost button.
- **Statistics:** each goes in a `StatBlock`, which prints the source, year and who it covers. Numbers refer to rows in `STATS-BANK.md`.
- **Background colour:** it fades between sections on these pages (B2).
- **Section shape:** every section after the hero overlaps the one above with 56px rounded tops (A10).
- **Reduced motion:** every movement listed here switches off, and the finished state shows.

---


**Icons:** every feature now has its own small icon. Where this file names a stand-in "until drawn", use the feature's `icon` from `data/features.json` instead.

## `/how-it-works`: How it works

- **Template:** T5
- **What this page is for:** it shows the whole workflow a business runs, from the first hello to the next booking, and what Heyday does at each of the 12 steps.
- **Title and description (for search):** "How Heyday works: one workflow from enquiry to rebooking" / "See how Heyday runs a whole events, class or service business in 12 steps, from getting found and quoting instantly to getting paid and rebooked."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (the 12 steps), sky #AEC9EE (it runs itself), cream #F2E9E1 (variations), paper #FBF9F6 (the six groups), lavender #D6D0F5 (proof), ink #0A0A0A (closing).

### 1. Hero

- **What it's for:** states the idea in one line and sets up the steps below.
- **Layout:** type-led, left-aligned. The headline takes about 7 of 12 columns. On the right, the Heyday sun sits large. Faint outline shapes sit behind (B1).
- **Holding copy:**
  - Label: `{ how it works }`
  - Headline: "One workflow for your whole business, from the **first hello to the next booking**."
  - Line: "Twelve steps, in the order they really happen. Here's what your customer does, what you do, and what Heyday does for you."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none. The mark is the picture.
- **Icons and marks:** `HeydayMark`, starting as the sun.
- **Motion:**
  - The headline is readable on the first frame, with no rise.
  - `HeydayMark` bounces once on load, then turns slowly through the six section shapes, pausing about 2.3s on each and going back through the sun between shapes (A11).

### 2. The 12 steps

- **What it's for:** the heart of the page. It walks through every step of a real booking, so a visitor sees the whole workflow in one place.
- **Layout:**
  - **1024px and up:** a two-column sticky scroll (B7).
    - **Left:** one block per step, each at least 80vh tall. Each block has three short columns: "Your customer", "You" and "Heyday".
    - **Right:** a panel, `sticky top-24`, whose picture changes with each step.
    - **Down the left edge:** the Heyday line, with one dot per step. The dot for the current step fills orange.
    - **Above each block:** a Geist Mono label showing the step number and its group.
  - **Phones:** the picture sits above each block, and nothing sticks.
- **Holding copy:**
  - Label: `{ the whole flow }`
  - Headline: "Twelve steps. **One workflow.**"
  - The blocks (the heading, then what the customer does, what you do and what Heyday does):

| Step (group) | Heading | Your customer | You | Heyday |
|---|---|---|---|---|
| 1 (Get ahead) | Get ahead of the game | Hasn't found you yet. | Get prices, packages, rules, your diary and your team ready, and move old customer lists across. | The AI setup assistant, starter settings for your kind of business, importing clients and bookings from old tools, and your booking page. |
| 2 (Get found) | Get found | Searches, sees an ad, asks a friend or an AI, spots you on a marketplace, or was a guest at one of your events. | Want to know which of those actually brings bookings. | Your booking page, a marketplace listing, ads that know which bookings pay, reviews, referrals, and guest capture at events. |
| 3 (Win the client) | Catch every enquiry | Gets in touch by form, email, WhatsApp, social or phone, usually while you're busy. | Are mid-job, and some calls get missed. | One inbox, an instant first reply, missed-call capture, knowing who's getting in touch, and lead types. |
| 4 (Win the client) | Quote instantly | Wants a price now, and will ask the next business if they don't get one. | Some jobs need a few questions or a visit first. | The instant quote they can adjust, AI-drafted quotes for bespoke requests, and booking a visit when one is needed. |
| 5 (Win the client) | Follow up automatically | Goes quiet to compare, ask a partner or wait for payday. | Don't have time to chase. | Follow-ups that change with the lead and stop the moment they reply, AI-drafted answers to their questions, and reminders when a checkout is left half done. |
| 6 (Win the client) | Win the client | Says yes, but only if the date is still free and booking is easy. | Need the date, the team and the deposit locked in. | Instant booking, or an instant check that the diary and the team are free, with the deposit and signed terms in the same step. |
| 7 (Run the day) | Plan it together | Changes guest numbers, makes choices and asks questions. | Keep track of it all, and of the balance due. | The client portal, reminders, change requests and balance chasing. |
| 8 (Run the day) | Staff it and get ready | Has nothing to do. | Someone has to deliver it with the right kit, and if you're short of people, hiring starts. | Shift offers to employees or subcontractors, clash and travel checks, shopping and kit lists, briefings, and hiring and onboarding. |
| 9 (Run the day) | The day | Enjoys it, or changes something at the last minute. | Your team turns up and delivers. | Reminders, travel times, check-in, alerts, emergency cover, and tips by QR or tap. |
| 10 (Get paid) | Get paid | Pays in stages: a deposit, the balance, extras and tips, a final invoice. | Pay your team too. | Deposits, balances, invoices, chasing, tips, and team pay and payouts. |
| 11 (Get rebooked) | Look after them | Is happiest the next day, or has a problem to raise. | Want the review, and want to fix any problem in private. | Next-day feedback. A thumbs up gets a referral code, then the review ask. A thumbs down gets "How can we improve?" and the complaint loop. |
| 12 (Get rebooked) | Get rebooked | Would book again if someone asked. | Repeat business slips away when nobody asks. | Win-back and anniversary messages, loyalty, memberships, gift vouchers, quiet-date offers, and cross-promotion. |

- **Image:** `ScreenIllustration`, one per step. Each is labelled "Illustration · example data".
  1. The setup assistant filling in a price list: packages, add-ons, a travel rule.
  2. The booking page on a phone, with the instant quote and a "Book now" button.
  3. The one inbox: a list of messages from email, WhatsApp, text and a missed call, each tagged "New enquiry", "Current customer" and so on.
  4. The customer's quote on a phone: guests, hours, date and add-on toggles, with a live total.
  5. A follow-up in the settings studio: "No reply after 2 days, send a friendly WhatsApp nudge, unless they've booked".
  6. Checkout: the date confirmed, a team-free check, the deposit, and a terms checkbox.
  7. The client portal: guest numbers, menu choices, a change request, and the balance due.
  8. A shift offer: three team members ranked, one "Accepted".
  9. On-the-day screen: check-in, arrival time, a travel estimate, and a QR tip jar.
  10. Payments: deposit paid, balance reminder sent, "Paid" ticking over, team payout queued.
  11. Feedback: a thumbs up leading to a referral code, then a review request.
  12. A win-back message draft: "It's been a year since your party…" with Send and Edit.
- **Icons and marks:** each block's label carries its group's small section mark: `hd-shape-sunrise`, `hd-shape-signal`, `hd-shape-connect`, `hd-shape-dial`, `hd-shape-paid` or `hd-shape-loop`, shown still at 20px.
- **Motion:**
  - `StickyScroll`: `useInView({ amount: 0.6 })` per block sets the active step. The panel cross-fades over 0.4s, and the new picture rises 16px.
  - The panel's ground changes to the step's group colour; on ink (Run the day), the picture sits on a paper card.
  - `HeydayLine` fills orange as you go.
  - `SectionReveal` on each block's heading.

### 3. It runs itself

- **What it's for:** shows the thread through all 12 steps: the owner moves from doing every step to overseeing the exceptions.
- **Layout:** a single wide panel (A5) on sky. The text is on the left. On the right, the Infinity shape.
- **Holding copy:**
  - Label: `{ throughout }`
  - Headline: "From doing every step to **overseeing the exceptions**."
  - Body: "Tasks that chase themselves, a Command Centre that shows what needs you today, reports and profit per job, and AI that drafts or sends, only as much as you allow."
  - Button: "See the AI" (ghost, to `/features/ai`).
- **Image:** none.
- **Icons and marks:** `HeydayMark` in the `inf` shape, with ink strokes.
- **Motion:**
  - `HeydayMark` morphs from the sun to Infinity as the section comes into view, then flows along the figure-eight while it's on screen.
  - `SectionReveal` on the text.

### 4. Not every business runs the same way

- **What it's for:** shows the flow fits every kind of business, not just events.
- **Layout:** four cards in a 2 by 2 grid (a single column on phones). The first and third are stickers (A5, tilted, straightening on hover), and the other two are plain cards, which keeps within the limit of three stickers per screen.
- **Holding copy:**
  - Label: `{ variations }`
  - Headline: "The same flow, **bent to fit you**."
  - Stickers:
    - **Classes, tickets and appointments:** "People book a seat or a slot straight away, so steps 4 and 5 are skipped."
    - **Some trades and bespoke jobs:** "A visit or a call comes between steps 3 and 4."
    - **Recurring work:** "A weekly clean or a monthly membership loops from step 10 back to step 7."
    - **Marketplace bookings:** "They arrive at step 6 already won. Heyday runs steps 7 to 12, and brings the customer back to book direct."
- **Image:** none.
- **Icons and marks:** small icons: `hd-online-booking-small` (classes), `hd-tasks-small` (visits), `hd-automations-small` (recurring), `hd-reviews-small` (marketplace).
- **Motion:** `RevealGroup`, rising at a 150ms stagger. The two stickers straighten on hover over 0.5s.

### 5. The six groups

- **What it's for:** sends people to the group page that matches their biggest need.
- **Layout:** six cards in a 3 by 2 grid (a single column on phones). Each card shows the group's section mark in its colour, the group name, its promise, and "See how →". The Heyday line runs along the top of the grid, joining the cards in order.
- **Holding copy:**
  - Label: `{ the six groups }`
  - Headline: "Six groups. **One workflow.**"
  - Cards:
    - **Get ahead:** "Ready before the first enquiry."
    - **Get found:** "People find you, and you know which efforts pay."
    - **Win the client:** "Every enquiry caught, priced, followed up and booked."
    - **Run the day:** "The planning, the team and the day itself, handled."
    - **Get paid:** "Every payment in, every payout out."
    - **Get rebooked:** "Happy customers come back and bring friends."
- **Image:** none.
- **Icons and marks:** `hd-shape-sunrise`, `hd-shape-signal`, `hd-shape-connect`, `hd-shape-dial`, `hd-shape-paid`, `hd-shape-loop` (still), about 72px.
- **Motion:**
  - `RevealGroup`, rising at a 150ms stagger.
  - Each card's mark morphs out of the sun when the card comes into view (A11).
  - `HeydayLine` draws across as the row appears.

### 6. Proof

- **What it's for:** one honest number about why speed matters in the early steps.
- **Layout:** a centred `StatBlock` on lavender, with the number large and the source in small print underneath.
- **Holding copy:**
  - Label: `{ why it matters }`
  - Stat (row 3): "Of 2,241 US companies audited, the average time to respond to a lead was **42 hours**, and 23% never responded."
  - Source line: "Harvard Business Review, 'The Short Life of Online Sales Leads', 2011. 2,241 US companies."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 7. Closing call to action

- **What it's for:** turns the visitor into an early-access sign-up or a demo.
- **Layout:** an ink block with cream text, centred, and the two buttons.
- **Holding copy:**
  - Headline: "Ready for **your Heyday**?"
  - Line: "Join early access, or book a demo and we'll walk you through your own workflow."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost, cream outline).
- **Image:** none.
- **Icons and marks:** a small `HeydayMark` above the headline, as the sun in cream strokes with an orange core.
- **Motion:** the mark bounces once when the section comes into view. `SectionReveal` on the text.

---

## `/how-it-works/get-ahead`: Get ahead

- **Template:** T3
- **What this page is for:** shows how Heyday gets a business ready before the first enquiry arrives: prices, rules, team and old data, set up in an afternoon.
- **Title and description (for search):** "Get ahead: set up your booking business in an afternoon | Heyday" / "Heyday's AI setup assistant, starter settings and imports get your prices, rules and team ready before the first enquiry."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (steps), cream #F2E9E1 (features), paper #FBF9F6 (the more-info section, which grows to orange #F26B2A), sky #AEC9EE (proof), cream #F2E9E1 (situations), paper #FBF9F6 (next group), ink #0A0A0A (closing).
- **Group colour and mark:** orange #F26B2A, Sunrise (`hd-shape-sunrise`). Because the ground is orange, nothing yellow goes on this page, and buttons on orange are ink.

### 1. Hero

- **What it's for:** names the group and its promise.
- **Layout:** type-led. The text is on the left. On the right, the Sunrise shape is large, about 360px.
- **Holding copy:**
  - Label: `{ get ahead }`
  - Headline: "Ready **before the first enquiry**."
  - Line: "Set up in an afternoon, with AI filling in the hard parts. Your prices, your rules, your team and your old customer lists, all in place before anyone asks."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none. The mark is the picture.
- **Icons and marks:** `HeydayMark`, starting as the sun and morphing into `sunrise`.
- **Motion:**
  - The headline has no rise.
  - `HeydayMark` morphs from the sun to Sunrise on load (0.9s), then bounces once.

### 2. The step in this group

- **What it's for:** shows where this group sits in the whole workflow.
- **Layout:** the Heyday line across the full width, with all 12 step dots. Step 1 is lit orange and labelled; the others are dimmed. A short caption sits under the lit dot.
- **Holding copy:**
  - Label: `{ step 1 of 12 }`
  - Headline: "Get ahead of the game."
  - Caption: "Before anyone asks, your prices, packages, rules, diary and team need to be ready, and your old customer lists need a home."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `HeydayLine` draws from left to right as the section comes into view, and the dot for step 1 fills orange and grows to 14px.

### 3. What's in Get ahead

- **What it's for:** lists the features in this group, each linking to its page.
- **Layout:** a grid of cards (A5), four across (two on tablets, one on phones). Each card has the small icon, the feature name, a one-line pain headline, and a "Coming soon" status chip.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "Everything that gets you **ready**."
  - Cards (the name, then the line):
    - **AI setup assistant:** "Stop spending weeks setting up software."
    - **Policies and procedures:** "Stop answering the same staff questions every week."
    - **Team management:** "Stop chasing your team for paperwork."
    - **Integrations and importing:** "Stop typing the same thing into three apps."
- **Image:** none.
- **Icons and marks:**
  - AI setup assistant: `hd-ai-replies`.
  - Policies and procedures: `hd-tasks`.
  - Team management: `hd-team-and-shifts`.
  - Integrations: `hd-automations`.
  - None of these four features has its own icon yet. Use these until they're drawn in the family style (A7).
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 4. More info: the AI setup assistant

- **What it's for:** opens up the group's headline feature, using the grow-into-the-page device.
- **Layout:** A12.
  - **At rest:** the text is on the left, and the Sunrise shape sits in orange on the right.
  - **When opened:** the section becomes orange, with four small cards and "Back".
- **Holding copy (at rest):**
  - Label: `{ get ahead }`
  - Headline: "Set up in an afternoon, **not a month**."
  - Line: "Point the assistant at your website, price list, old emails and policies. It fills in your quote form, automations and rules for you to check."
  - Button: "How it fits together →" (ghost).
- **Holding copy (opened):**
  - Headline: "The assistant does the typing. **You do the checking.**"
  - Four cards (the title, then the line):
    - **Reads what you have:** "Your website, price list, old emails and policies."
    - **Fills in the forms:** "Your quote questions, prices, packages and add-ons."
    - **Suggests your rules:** "Deposits, cancellations, travel and busy-date pricing."
    - **Waits for your OK:** "Nothing goes live until you've checked it."
  - Button: "Back" (ink).
- **Image:** none.
- **Icons and marks:** the cards use `hd-ai-replies`, `hd-instant-quotes`, `hd-automations` and `hd-tasks` on paper cards.
- **Motion:** `MoreInfoSection`.
  - **At rest:** about every 7 seconds, Sunrise turns into the sun, bounces and turns back.
  - **Opening:** the shape grows around its core to the farthest corner over 0.9s, the core swells to radius 46, then the cards rise in (0.45s).
  - **"Back":** reverses it (0.55s).

### 5. Proof

- **What it's for:** one sourced number about the time admin takes.
- **Layout:** a `StatBlock` on sky, left-aligned, with a short line under it.
- **Holding copy:**
  - Stat (row 20): "Small business owners spend **11 hours a week** on admin and finance tasks."
  - Source line: "American Express and Small Business Saturday UK, SME Business Barometer, July 2026. 1,000 UK business owners."
  - Line: "Setting up well once saves those hours every week after."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. What it looks like for you

- **What it's for:** two real situations from different kinds of business, so visitors see themselves.
- **Layout:** two cards side by side (stacked on phones), each with a holding image above the text.
- **Holding copy:**
  - Label: `{ for example }`
  - Headline: "Two businesses, **one afternoon**."
  - Card 1: "**A class host** adds three kinds of class, private group prices and a cancellation rule, all from the price list on their website." Tag: "Example".
  - Card 2: "**A cleaner** moves their client list across from a spreadsheet, and every client's address and access notes land on their record." Tag: "Example".
- **Image:**
  - Card 1: `HoldingImage` 4:3. Art direction: "A pottery teacher at a laptop in the studio, clay on the bench behind, mid-afternoon light."
  - Card 2: `HoldingImage` 4:3. Art direction: "A cleaner checking a phone in a van, kit in the back."
- **Icons and marks:** none.
- **Motion:** `RevealGroup`, rising at a 150ms stagger. `Parallax` (±60px) on the two images.

### 7. Next: Get found

- **What it's for:** moves the reader along the workflow to the next group.
- **Layout:** a wide link card. The Heyday line runs from this group's dot to the next. On the right is the next group's mark, still, in lavender.
- **Holding copy:**
  - Label: `{ next }`
  - Headline: "Next: **Get found** →"
  - Line: "People find you, and you know which efforts pay."
- **Image:** none.
- **Icons and marks:** `hd-shape-signal`, still.
- **Motion:** `HeydayLine` draws to the next dot. The card has no other motion.

### 8. Closing call to action

- Same as How it works, section 7: an ink block, "Ready for **your Heyday**?", with "Start free trial" and "Book a demo".
- **Motion:** the sun bounces once when the section comes into view.

---

## `/how-it-works/get-found`: Get found

- **Template:** T3
- **What this page is for:** shows how Heyday helps a business get found everywhere its customers look, and know which efforts actually bring bookings.
- **Title and description (for search):** "Get found: booking page, marketplace listing and ads that know what pays | Heyday" / "Your own booking page with instant quotes, a Heyday marketplace listing, one diary across the platforms you sell on, and ads that know which bookings pay."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (steps), sky #AEC9EE (features), cream #F2E9E1 (the more-info section, which grows to lavender #D6D0F5), sage #9AAD92 (proof, with the text on a paper card), cream #F2E9E1 (situations), paper #FBF9F6 (next group), ink #0A0A0A (closing).
- **Group colour and mark:** lavender #D6D0F5, Signal (`hd-shape-signal`). Lavender is pale, so the more-info section sits on cream at rest, not paper (A11 colour note).

### 1. Hero

- **What it's for:** names the group and its promise.
- **Layout:** type-led. The text is on the left; Signal is large on the right.
- **Holding copy:**
  - Label: `{ get found }`
  - Headline: "Be the one **they find**."
  - Line: "Your own booking page, a listing on the Heyday marketplace, one diary for every platform you sell on, and ads that know which bookings actually pay."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `HeydayMark`, morphing from the sun into `signal`.
- **Motion:** `HeydayMark` morphs on load, then bounces once. The headline has no rise.

### 2. The step in this group

- **What it's for:** shows where this group sits in the workflow.
- **Layout:** the Heyday line with 12 dots. Step 2 is lit.
- **Holding copy:**
  - Label: `{ step 2 of 12 }`
  - Headline: "Get found."
  - Caption: "People search, see an ad, ask a friend or an AI, spot you on a marketplace, or were a guest at one of your events."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `HeydayLine` draws, and the dot for step 2 fills orange.

### 3. What's in Get found

- **What it's for:** lists the features in this group.
- **Layout:** a grid of cards, four across (it wraps). Each card has a small icon, the name, a pain line and a "Coming soon" chip.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "Everywhere your **customers look**."
  - Cards (the name, then the line):
    - **Booking page and mini-site:** "Stop losing customers who only wanted a price."
    - **Get listed on the Heyday marketplace:** "Get found by people looking for something to do."
    - **Sell everywhere, one diary:** "Stop juggling five calendars."
    - **Campaigns and off-peak offers:** "Stop letting quiet weeks happen to you."
    - **Ads that know which bookings pay:** "Stop paying for clicks that never book."
    - **Guest capture at events:** "Every guest at your event is your next customer."
    - **Partners and cross-promotion:** "Get recommended by businesses your customers already love."
  - Put an "Only on Heyday" sticker on: Get listed, Sell everywhere, Ads that know which bookings pay, Guest capture, and Partners. That's five, over the three-per-screen limit, so give the sticker to the first three and show the other two as a Geist Mono tag instead.
- **Image:** none.
- **Icons and marks:**
  - Booking page, Get listed, Sell everywhere: `hd-online-booking`.
  - Campaigns: `hd-automations`.
  - Ads: `hd-reports`.
  - Guest capture, Partners: `hd-reviews`.
  - These features still need their own icons; use these until they're drawn.
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 4. More info: the booking page

- **What it's for:** opens up the group's headline feature.
- **Layout:** A12. At rest the ground is cream, and Signal sits in lavender. When opened, the section becomes lavender.
- **Holding copy (at rest):**
  - Label: `{ get found }`
  - Headline: "Stop losing customers **who only wanted a price**."
  - Line: "Your own booking page, on your own domain, with the instant quote and live availability built in."
  - Button: "How it fits together →" (ghost).
- **Holding copy (opened):**
  - Headline: "A page that **quotes and books** while you work."
  - Four cards (the title, then the line):
    - **Instant quote:** "Customers see a price in seconds and adjust it themselves."
    - **Live availability:** "Only the dates you and your team can do."
    - **Your own domain:** "It looks like your business, not ours."
    - **Tracked to the booking:** "See which link, ad or post each booking came from."
  - Button: "Back" (ink).
- **Image:** none.
- **Icons and marks:** the cards use `hd-instant-quotes`, `hd-online-booking`, `hd-automations` and `hd-reports`.
- **Motion:** `MoreInfoSection`, as on Get ahead.

### 5. Proof

- **What it's for:** one sourced number about reviews and being found.
- **Layout:** a `StatBlock` on a paper card over sage.
- **Holding copy:**
  - Stat (row 11): "**97%** of consumers read reviews for local businesses."
  - Source line: "BrightLocal, Local Consumer Review Survey 2026. 1,002 US adults."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. What it looks like for you

- **What it's for:** two real situations.
- **Layout:** two cards with holding images.
- **Holding copy:**
  - Label: `{ for example }`
  - Headline: "Found, **and booked**."
  - Card 1: "**A photo booth business** sells on two marketplaces and its own site, and every booking lands in one diary, so a date can't be sold twice." Tag: "Example".
  - Card 2: "**A private chef** puts a QR code on the menu card. Guests who loved dinner follow the business, or book their own." Tag: "Example".
- **Image:**
  - Card 1: `HoldingImage` 4:3. "A photo booth set up at a party, guests mid-laugh, prints coming out."
  - Card 2: `HoldingImage` 4:3. "A menu card on a dinner table with a small QR code, candlelight."
- **Icons and marks:** none.
- **Motion:** `RevealGroup`. `Parallax` on the images.

### 7. Next: Win the client

- **Layout:** as on Get ahead.
- **Holding copy:** "Next: **Win the client** →" / "Every enquiry caught, priced, followed up and booked."
- **Icons and marks:** `hd-shape-connect`, still.
- **Motion:** `HeydayLine` draws to the next dot.

### 8. Closing call to action

- As on Get ahead.

---

## `/how-it-works/win-the-client`: Win the client

- **Template:** T3
- **What this page is for:** shows how Heyday catches every enquiry, prices it instantly, follows it up and books it, even while the owner is busy.
- **Title and description (for search):** "Win the client: instant quotes, follow-ups and instant booking | Heyday" / "Catch every enquiry in one inbox, quote in seconds, follow up automatically and take the booking with a deposit and signed terms."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (steps), cream #F2E9E1 (features), paper #FBF9F6 (the more-info section, which grows to blue #93B7E8), lavender #D6D0F5 (proof), cream #F2E9E1 (situations), paper #FBF9F6 (next group), ink #0A0A0A (closing).
- **Group colour and mark:** blue #93B7E8, Connect (`hd-shape-connect`).

### 1. Hero

- **Layout:** type-led. The text is on the left; Connect is large on the right.
- **Holding copy:**
  - Label: `{ win the client }`
  - Headline: "Win the client, **even while you're busy**."
  - Line: "Every enquiry caught, priced, followed up and booked, in one workflow."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `HeydayMark`, morphing from the sun into `connect`.
- **Motion:** it morphs on load, then bounces once. The headline has no rise.

### 2. The steps in this group

- **What it's for:** shows the four steps this group covers.
- **Layout:** the Heyday line with 12 dots. Steps 3 to 6 are lit, each with a short caption underneath.
- **Holding copy:**
  - Label: `{ steps 3 to 6 of 12 }`
  - Headline: "Caught, priced, followed up, **booked**."
  - Captions:
    - **3. Catch every enquiry:** "Form, email, WhatsApp, social and phone, in one place."
    - **4. Quote instantly:** "A price now, before they ask the next business."
    - **5. Follow up automatically:** "Nudges that stop the moment they reply."
    - **6. Win the client:** "Instant booking, with the deposit and terms in the same step."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `HeydayLine` draws, and the dots for steps 3 to 6 fill in turn at a 150ms stagger.

### 3. What's in Win the client

- **What it's for:** lists the features in this group.
- **Layout:** a grid of cards, four across (it wraps). Each card has a small icon, the name, a pain line and a "Coming soon" chip.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "From first message to **booked**."
  - Cards (the name, then the line):
    - **Enquiries and lead types:** "Stop letting your best leads wait in a pile."
    - **Missed-call capture:** "Stop losing customers to voicemail."
    - **AI receptionist:** "Stop missing calls while you're working."
    - **Replies that write themselves:** "Stop writing the same email fifty times a week."
    - **Instant quotes:** "Stop losing bookings while you work out the price."
    - **Follow-ups and autoresponders:** "Stop chasing quotes that went quiet."
    - **Online booking and instant book:** "Let customers book while you sleep."
    - **Classes, tickets and private groups:** "Stop running your classes from a spreadsheet."
    - **Packages, memberships and regulars:** "Stop starting from zero every month."
    - **Contracts and e-signatures:** "Stop printing, signing and scanning."
    - **Group bookings and split payments:** "Let the group pay their own share."
  - Put an "Only on Heyday" sticker on Missed-call capture, Lead types and Group bookings (three).
- **Image:** none.
- **Icons and marks:**
  - Enquiries and lead types: `hd-one-inbox`.
  - Missed-call capture: `hd-missed-calls`.
  - AI receptionist and Replies: `hd-ai-replies`.
  - Instant quotes: `hd-instant-quotes`.
  - Follow-ups: `hd-automations`.
  - Online booking and Classes: `hd-online-booking`.
  - Packages and Group bookings: `hd-payments`.
  - Contracts: `hd-tasks`.
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 4. More info: instant quotes

- **What it's for:** opens up the group's headline feature.
- **Layout:** A12. At rest, Connect sits in blue. When opened, the section becomes blue.
- **Holding copy (at rest):**
  - Label: `{ win the client }`
  - Headline: "Stop losing bookings **while you work out the price**."
  - Line: "Customers see a price in seconds, change it themselves, and book with a deposit."
  - Button: "How it fits together →" (ghost).
- **Holding copy (opened):**
  - Headline: "Every enquiry caught, priced, **followed up and booked**."
  - Four cards (the title, then the line):
    - **Caught:** "Email, WhatsApp, texts and calls in one thread per client."
    - **Priced:** "A price in seconds that the customer can adjust themselves."
    - **Followed up:** "Follow-ups that change with the lead and stop the moment they reply."
    - **Booked:** "Instant booking, with the deposit and signed terms in the same step."
  - Stat (row 1): "Quotes sent within 4 hours book **25% more often**." Source: "Flashquotes, from 32,000+ quoted leads from 100+ operators (mobile bars, coffee carts, photo booths, DJs)."
  - Button: "Back" (ink).
- **Image:** none.
- **Icons and marks:** the cards use `hd-one-inbox`, `hd-instant-quotes`, `hd-ai-replies` and `hd-online-booking`.
- **Motion:** `MoreInfoSection`.

### 5. Proof

- **What it's for:** one sourced number about how fast replies win.
- **Layout:** a `StatBlock` on lavender.
- **Holding copy:**
  - Stat (row 2): "Firms that contacted a lead within an hour were **nearly seven times as likely to qualify it** as those that waited even an hour longer."
  - Source line: "Harvard Business Review, 'The Short Life of Online Sales Leads', 2011. 1.25 million US sales leads." The study measured leads qualified, not bookings. Say so, and don't stretch it.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. What it looks like for you

- **Layout:** two cards with holding images.
- **Holding copy:**
  - Label: `{ for example }`
  - Headline: "Booked **before the next business replies**."
  - Card 1 (the SaaS brief's own example): "**A couple** wants a cocktail bar for 80 guests on a Saturday in June, two hours from you. They see the price, pick the package and pay the deposit before you've finished your shift." Tag: "Example".
  - Card 2: "**A class host** has twelve seats in Saturday's pottery class, and a bachelorette party asking for a private session. Both book in the same diary." Tag: "Example".
- **Image:**
  - Card 1: `HoldingImage` 4:3. "A couple on a sofa looking at a phone together, smiling."
  - Card 2: `HoldingImage` 4:3. "A pottery class mid-session, hands on clay, a teacher leaning in."
- **Icons and marks:** none.
- **Motion:** `RevealGroup`. `Parallax` on the images.

### 7. Next: Run the day

- **Holding copy:** "Next: **Run the day** →" / "The planning, the team and the day itself, handled."
- **Icons and marks:** `hd-shape-dial`, still, in ink.
- **Motion:** `HeydayLine` draws to the next dot.

### 8. Closing call to action

- As on Get ahead.

---

## `/how-it-works/run-the-day`: Run the day

- **Template:** T3
- **What this page is for:** shows how Heyday handles the weeks between booking and the day, the team who deliver it, and the day itself.
- **Title and description (for search):** "Run the day: client portal, shift offers, kit lists and check-in | Heyday" / "Plan the event with your client, offer shifts to your team, check kit and travel, and see who's checked in on the day."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (steps), cream #F2E9E1 (features), paper #FBF9F6 (the more-info section, which grows to ink #0A0A0A with cream text), sage #9AAD92 (proof, on a paper card), cream #F2E9E1 (situations), paper #FBF9F6 (next group), blue #93B7E8 (closing). The closing block is blue, not ink, so there aren't two ink blocks on one page.
- **Group colour and mark:** ink #0A0A0A, Dial (`hd-shape-dial`).

### 1. Hero

- **Layout:** type-led. The text is on the left; the Dial is large on the right, in ink.
- **Holding copy:**
  - Label: `{ run the day }`
  - Headline: "The planning, the team and the day itself, **handled**."
  - Line: "Your client plans with you in one portal. Your team gets the shift, the brief and the kit list. On the day, you can see who's checked in."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `HeydayMark`, morphing from the sun into `dial`.
- **Motion:** it morphs on load, then bounces once.

### 2. The steps in this group

- **Layout:** the Heyday line. Steps 7 to 9 are lit, with captions.
- **Holding copy:**
  - Label: `{ steps 7 to 9 of 12 }`
  - Headline: "Planned, staffed, **delivered**."
  - Captions:
    - **7. Plan it together:** "Guest numbers, choices, questions and the balance, in one portal."
    - **8. Staff it and get ready:** "The right people, with the right kit."
    - **9. The day:** "Reminders, check-in, and cover if something changes."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `HeydayLine` draws, and steps 7 to 9 fill in turn.

### 3. What's in Run the day

- **Layout:** a grid of cards, four across (it wraps). Each card has a small icon, the name, a pain line and a "Coming soon" chip.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "Everything between **booked and done**."
  - Cards (the name, then the line):
    - **Client portal and event planning:** "Stop answering 'What time do you arrive?' again."
    - **One inbox:** "Stop checking five apps to find one message."
    - **Client records:** "Stop starting every conversation from scratch."
    - **Call notes and follow-ups:** "Stop scribbling notes during calls."
    - **Scheduling and one diary:** "Stop rebuilding your week every time something changes."
    - **Shift offers and staffing:** "Stop texting your whole team to fill one shift."
    - **Checklists, shopping and kit lists:** "Stop finding out on the day that something's missing."
    - **On the day:** "Stop worrying whether your team turned up."
    - **Tasks:** "Stop holding every to-do in your head."
    - **Hiring and onboarding:** "Stop drowning in applications."
    - **Time tracking:** "Stop guessing hours on a Friday."
- **Image:** none.
- **Icons and marks:**
  - Client portal, Scheduling: `hd-online-booking`.
  - One inbox, Call notes: `hd-one-inbox`.
  - Client records: `hd-reports`.
  - Shift offers, Hiring, Time tracking: `hd-team-and-shifts`.
  - Checklists, Tasks: `hd-tasks`.
  - On the day: `hd-tasks`, until it has its own icon.
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 4. More info: shift offers and staffing

- **Layout:** A12. At rest, the Dial sits in ink. When opened, the section becomes ink, and the text switches to cream.
- **Holding copy (at rest):**
  - Label: `{ run the day }`
  - Headline: "Stop texting your whole team to **fill one shift**."
  - Line: "Offer the job to the right people, and let the first yes take it. Clashes are caught before they happen."
  - Button: "How it fits together →" (ghost).
- **Holding copy (opened; cream text on ink, and the cards stay paper with ink text):**
  - Headline: "The right people, **in the right place**."
  - Four cards (the title, then the line):
    - **Offered, not chased:** "Shift offers go to employees or subcontractors, ranked by distance, reliability and rating."
    - **Clashes caught:** "Double bookings and impossible travel are flagged before you confirm."
    - **Briefed:** "Everyone gets the brief, the address and the kit list."
    - **Checked in:** "You see who's arrived on the day."
  - Button: "Back" (cream fill, ink text).
- **Image:** none.
- **Icons and marks:** the cards use `hd-team-and-shifts`, `hd-tasks`, `hd-one-inbox` and `hd-online-booking`.
- **Motion:** `MoreInfoSection`.

### 5. Proof

- **Layout:** a `StatBlock` on a paper card over sage.
- **Holding copy:**
  - Stat (row 14): "Text reminders raised attendance from **67.8% to 78.6%**."
  - Source line: "Cochrane systematic review, Gurol-Urganci and others, 2013. Eight trials, 6,615 people, healthcare appointments." Say that it's healthcare.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. What it looks like for you

- **Layout:** two cards with holding images.
- **Holding copy:**
  - Label: `{ for example }`
  - Headline: "Staffed, briefed, **there on time**."
  - Card 1: "**A caterer** staffs a wedding for the weekend. The offer goes out, the first three yeses take the shifts, and everyone gets the brief and the kit list." Tag: "Example".
  - Card 2: "**A client** changes guest numbers two weeks out. They do it in the portal, and the quote, the staffing and the shopping list update to match." Tag: "Example".
- **Image:**
  - Card 1: `HoldingImage` 4:3. "Catering staff plating up in a busy marquee kitchen."
  - Card 2: `HoldingImage` 4:3. "A person updating an event on a phone at a kitchen table."
- **Icons and marks:** none.
- **Motion:** `RevealGroup`. `Parallax` on the images.

### 7. Next: Get paid

- **Holding copy:** "Next: **Get paid** →" / "Every payment in, every payout out."
- **Icons and marks:** `hd-shape-paid`, still, in sage.
- **Motion:** `HeydayLine` draws to the next dot.

### 8. Closing call to action

- A blue block with ink text. Otherwise as on Get ahead.

---

## `/how-it-works/get-paid`: Get paid

- **Template:** T3
- **What this page is for:** shows how Heyday collects every payment and pays the team, without anyone chasing.
- **Title and description (for search):** "Get paid: deposits, balances, invoices and team pay | Heyday" / "Take deposits and balances online, chase overdue invoices by email and WhatsApp, share tips, pay your team and see the profit on every job."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (steps), cream #F2E9E1 (features), paper #FBF9F6 (the more-info section, which grows to sage #9AAD92), sky #AEC9EE (proof), cream #F2E9E1 (situations), paper #FBF9F6 (next group), ink #0A0A0A (closing).
- **Group colour and mark:** sage #9AAD92, Paid (`hd-shape-paid`).

### 1. Hero

- **Layout:** type-led. The text is on the left; Paid is large on the right.
- **Holding copy:**
  - Label: `{ get paid }`
  - Headline: "Every payment in. **Every payout out.**"
  - Line: "Deposits, balances, tips and team pay, without chasing anyone."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `HeydayMark`, morphing from the sun into `paid`.
- **Motion:** it morphs on load, then bounces once.

### 2. The step in this group

- **Layout:** the Heyday line. Step 10 is lit.
- **Holding copy:**
  - Label: `{ step 10 of 12 }`
  - Headline: "Get paid."
  - Caption: "Money arrives in stages: a deposit at booking, the balance before the day, extras and tips on the day, a final invoice after. Your team need paying too."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `HeydayLine` draws, and step 10 fills.

### 3. What's in Get paid

- **Layout:** a grid of cards (three across for six features). Each card has a small icon, the name, a pain line and a "Coming soon" chip.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "Money in, **money out**, no spreadsheets."
  - Cards (the name, then the line):
    - **Payments and deposits:** "Stop losing dates to no-shows."
    - **Tips by QR and tap:** "Stop leaving tips on the table."
    - **Invoicing and chasing:** "Stop spending your time chasing clients for payment."
    - **Team pay and expenses:** "Stop spending payday on spreadsheets."
    - **Profit per job:** "Stop guessing which jobs make money."
    - **Reports and the Command Centre:** "Know your numbers without opening a spreadsheet."
- **Image:** none.
- **Icons and marks:**
  - Payments, Tips, Invoicing: `hd-payments`.
  - Team pay: `hd-team-and-shifts`.
  - Profit per job, Reports: `hd-reports`.
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 4. More info: invoicing and chasing

- **Layout:** A12. At rest, Paid sits in sage. When opened, the section becomes sage.
- **Holding copy (at rest):**
  - Label: `{ get paid }`
  - Headline: "Stop spending your time **chasing clients** for payment."
  - Line: "Deposits, balances and reminders by email and WhatsApp, until it's paid."
  - Button: "How it fits together →" (ghost).
- **Holding copy (opened):**
  - Headline: "Every payment in. Every payout out. **No chasing.**"
  - Four cards (the title, then the line):
    - **Deposits and balances:** "Taken online when they book, and on the date the balance falls due."
    - **Reminders that stop:** "Email and WhatsApp nudges until it's paid, then they stop."
    - **Team pay:** "Worked out from the job, the hours and the tips."
    - **Profit per job:** "What each booking actually made, every morning."
  - Button: "Back" (ink).
- **Image:** none.
- **Icons and marks:** the cards use `hd-payments`, `hd-tasks`, `hd-team-and-shifts` and `hd-reports`.
- **Motion:** `MoreInfoSection`.

### 5. Proof

- **Layout:** a `StatBlock` on sky.
- **Holding copy:**
  - Stat (row 6): "**59%** of small businesses have invoices overdue by 30 days or more."
  - Source line: "Intuit QuickBooks, 2026 Small Business Late Payments Report, July 2026. About 5,000 small businesses a quarter in the US, Canada, the UK and Australia."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. What it looks like for you

- **Layout:** two cards with holding images.
- **Holding copy:**
  - Label: `{ for example }`
  - Headline: "Paid on time, **and so is the team**."
  - Card 1: "**A DJ** takes a deposit at booking. The balance reminder goes out by WhatsApp a week before, and it's paid before the first song." Tag: "Example".
  - Card 2: "**A mobile bar's** team share the tips from one QR code on the bar, and the split lands in their pay." Tag: "Example".
- **Image:**
  - Card 1: `HoldingImage` 4:3. "A DJ at the decks, crowd blurred in the foreground."
  - Card 2: `HoldingImage` 4:3. "A bartender pouring at a mobile bar, a small QR sign on the counter."
- **Icons and marks:** none.
- **Motion:** `RevealGroup`. `Parallax` on the images.

### 7. Next: Get rebooked

- **Holding copy:** "Next: **Get rebooked** →" / "Happy customers come back and bring friends."
- **Icons and marks:** `hd-shape-loop`, still, in sky.
- **Motion:** `HeydayLine` draws to the next dot.

### 8. Closing call to action

- As on Get ahead.

---

## `/how-it-works/get-rebooked`: Get rebooked

- **Template:** T3
- **What this page is for:** shows how Heyday looks after customers after the day and brings them back, with their friends.
- **Title and description (for search):** "Get rebooked: reviews, referrals, gift vouchers and loyalty | Heyday" / "Next-day feedback, a referral code before the review ask, gift vouchers, loyalty and offers for your quiet dates, so happy customers come back."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (steps), cream #F2E9E1 (features), paper #FBF9F6 (the more-info section, which grows to sky #AEC9EE), lavender #D6D0F5 (proof), cream #F2E9E1 (situations), paper #FBF9F6 (loop back), ink #0A0A0A (closing).
- **Group colour and mark:** sky #AEC9EE, Loop (`hd-shape-loop`).

### 1. Hero

- **Layout:** type-led. The text is on the left; the Loop is large on the right, spinning slowly.
- **Holding copy:**
  - Label: `{ get rebooked }`
  - Headline: "Happy customers come back, **and bring their friends**."
  - Line: "Feedback the next day, a referral code before the review ask, gift vouchers, loyalty, and offers for your quiet dates."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `HeydayMark`, morphing from the sun into `loop`.
- **Motion:** it morphs on load, then spins at 60° a second while on screen, and bounces once.

### 2. The steps in this group

- **Layout:** the Heyday line. Steps 11 and 12 are lit, with captions.
- **Holding copy:**
  - Label: `{ steps 11 and 12 of 12 }`
  - Headline: "Looked after, **then back again**."
  - Captions:
    - **11. Look after them:** "The next day is when they're happiest, or when a problem comes out."
    - **12. Get rebooked:** "Repeat business often slips away simply because nobody asked."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `HeydayLine` draws, and steps 11 and 12 fill.

### 3. What's in Get rebooked

- **Layout:** a grid of cards, four across (it wraps). Each card has a small icon, the name, a pain line and a "Coming soon" chip.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "The booking **after the booking**."
  - Cards (the name, then the line):
    - **Reviews:** "Get more five-star reviews without the awkward ask."
    - **Referrals:** "Turn happy customers into your sales team."
    - **Gift vouchers:** "Get paid for bookings that haven't happened yet."
    - **Loyalty:** "Stop letting regulars drift away."
    - **Fill quiet dates:** "Stop letting quiet dates go to waste."
    - **Waiting lists:** "Stop losing money on cancellations."
    - **Complaints settled fairly:** "Stop letting one bad day become a bad review."
  - Put an "Only on Heyday" sticker on Fill quiet dates, Waiting lists and Gift vouchers (three).
- **Image:** none.
- **Icons and marks:**
  - Reviews, Referrals, Complaints: `hd-reviews`.
  - Gift vouchers, Loyalty: `hd-payments`.
  - Fill quiet dates, Waiting lists: `hd-online-booking`.
  - These still need their own icons.
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 4. More info: referral first, then the review

- **Layout:** A12. At rest, the Loop sits in sky. When opened, the section becomes sky.
- **Holding copy (at rest):**
  - Label: `{ get rebooked }`
  - Headline: "Get more five-star reviews **without the awkward ask**."
  - Line: "A thumbs up the next day gets a referral code first, then the review ask. A thumbs down gets 'How can we improve?', in private."
  - Button: "How it fits together →" (ghost).
- **Holding copy (opened):**
  - Headline: "Happy customers come back, **and bring their friends**."
  - Four cards (the title, then the line):
    - **Next-day feedback:** "One tap: thumbs up or thumbs down."
    - **Referral code first:** "A code to share, rewarding both sides."
    - **Then the review:** "Asked when they're happiest."
    - **Problems kept private:** "A thumbs down goes to you, not to a review site."
  - Button: "Back" (ink).
- **Image:** none.
- **Icons and marks:** the cards use `hd-reviews`, `hd-payments`, `hd-reviews` and `hd-tasks`.
- **Motion:** `MoreInfoSection`. At rest, the Loop spins slowly between its sun moments.

### 5. Proof

- **Layout:** a `StatBlock` on lavender.
- **Holding copy:**
  - Stat (row 8): "Increasing customer retention by **5%** increases profits by **25% to 95%**."
  - Source line: "Bain & Company (Frederick Reichheld), as summarized by Harvard Business Review, 'The Value of Keeping the Right Customers', 2014. Cross-industry."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. What it looks like for you

- **Layout:** two cards with holding images.
- **Holding copy:**
  - Label: `{ for example }`
  - Headline: "One good day, **then the next**."
  - Card 1: "**A cocktail class** ends. The next day, a happy guest gets a referral code and passes it to a friend who's planning a birthday." Tag: "Example".
  - Card 2: "**A cancelled seat** in Saturday's class goes to the next person on the waiting list, who confirms and pays in a minute." Tag: "Example".
- **Image:**
  - Card 1: `HoldingImage` 4:3. "Friends clinking glasses at the end of a cocktail class."
  - Card 2: `HoldingImage` 4:3. "A phone notification on a café table: 'A seat just opened up'."
- **Icons and marks:** none.
- **Motion:** `RevealGroup`. `Parallax` on the images.

### 7. Back to the start: Get ahead

- **What it's for:** closes the circle. The workflow loops, so the last group links back to the first.
- **Layout:** a wide link card. The Heyday line curves back to the first dot. The Loop sits on the right.
- **Holding copy:**
  - Label: `{ and round again }`
  - Headline: "Back to **Get ahead** →"
  - Line: "Every rebooking starts the workflow again, already one step ahead."
- **Image:** none.
- **Icons and marks:** `HeydayMark` in the `loop` shape, sky.
- **Motion:** the Loop spins at 60° a second while the card is on screen, and `HeydayLine` draws back to the first dot.

### 8. Closing call to action

- As on Get ahead.

---

## `/features`: All features

- **Template:** T4
- **What this page is for:** one place to see every feature, sorted by the six groups, with filters so a visitor can find what they need fast.
- **Title and description (for search):** "All Heyday features: quotes, booking, payments, team and more" / "Every Heyday feature in one place, from instant quotes and online booking to shift offers, payments, reviews and AI replies."
- **Grounds, top to bottom:** cream #F2E9E1 (hero and filters), paper #FBF9F6 (all six groups, one long section with a group heading for each), sky #AEC9EE (the AI), cream #F2E9E1 (can't find it), ink #0A0A0A (closing).

### 1. Hero

- **What it's for:** tells the visitor what's on the page.
- **Layout:** a short type-led hero, without a big mark. There's a small sun beside the label.
- **Holding copy:**
  - Label: `{ features }`
  - Headline: "Everything your business needs, **in one workflow**."
  - Line: "Every feature, sorted by what it does for you. Features marked 'Coming soon' are on the way."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `hd-mark` at 20px beside the label.
- **Motion:** none. The hero is still, so the list below is the focus.

### 2. Filters and jump links

- **What it's for:** lets visitors narrow the list, or jump straight to a group.
- **Layout:**
  - A row of `FilterChips`: All, Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked, Only on Heyday, Live, Coming soon.
  - Under it, jump links to the six groups. This bar stays pinned under the header while you scroll through the list. It's a normal sticky bar, not the picture-changing sticky scroll.
- **Holding copy:** the chip labels above.
- **Image:** none.
- **Icons and marks:** each group chip carries its section mark, still, at 16px.
- **Motion:** none. Filtered cards fade in over 0.2s. With reduced motion, they just appear.

### 3. The six groups

- **What it's for:** the full list.
- **Layout:** for each group in order:
  - a heading row with the group's section mark (still, 48px, in its colour), the group name and its promise, and "See how it works →" linking to the group page;
  - then a grid of feature cards, four across (two on tablets, one on phones).
  - Each card has the small icon, the feature name, its pain line, a "Coming soon" chip, and an "Only on Heyday" tag in Geist Mono where it applies.
- **Holding copy:** the group headings and card lines are exactly as on the six group pages (section 3 of each). The groups hold these features:
  - **Get ahead:** AI setup assistant; Policies and procedures; Team management; Integrations and importing.
  - **Get found:** Booking page and mini-site; Get listed on the Heyday marketplace; Sell everywhere, one diary; Campaigns and off-peak offers; Ads that know which bookings pay; Guest capture at events; Partners and cross-promotion.
  - **Win the client:** Enquiries and lead types; Missed-call capture; AI receptionist; Replies that write themselves; Instant quotes; Follow-ups and autoresponders; Online booking and instant book; Classes, tickets and private groups; Packages, memberships and regulars; Contracts and e-signatures; Group bookings and split payments.
  - **Run the day:** Client portal and event planning; One inbox; Client records; Call notes and follow-ups; Scheduling and one diary; Shift offers and staffing; Checklists, shopping and kit lists; On the day; Tasks; Hiring and onboarding; Time tracking.
  - **Get paid:** Payments and deposits; Tips by QR and tap; Invoicing and chasing; Team pay and expenses; Profit per job; Reports and the Command Centre.
  - **Get rebooked:** Reviews; Referrals; Gift vouchers; Loyalty; Fill quiet dates; Waiting lists; Complaints settled fairly.
- **Image:** none.
- **Icons and marks:** section marks on the group headings (`hd-shape-*`, still). Small icons on the cards, as on the group pages.
- **Motion:** `RevealGroup` on each group's cards (150ms stagger, capped at the seventh card). No parallax.

### 4. The AI

- **What it's for:** points to the AI page, which sits outside the six groups.
- **Layout:** one wide panel (A5) on sky. The text is on the left; the Infinity shape is on the right.
- **Holding copy:**
  - Label: `{ the ai }`
  - Headline: "AI that works the way you do, **and only as much as you want**."
  - Line: "It reads the booking, your prices and your policies before it writes a word. You decide what it sends."
  - Button: "See the AI" (ghost, to `/features/ai`).
- **Image:** none.
- **Icons and marks:** `HeydayMark` in the `inf` shape.
- **Motion:** it morphs from the sun to Infinity when the panel comes into view, then flows. `SectionReveal` on the text.

### 5. Can't find it?

- **What it's for:** catches visitors looking for something that isn't listed.
- **Layout:** a short centred block.
- **Holding copy:**
  - Headline: "Looking for **something else**?"
  - Line: "Tell us what your business needs. If you sell your time, your skills or an experience, we want to hear it."
  - Buttons: "Contact us" (ghost), "Book a demo" (primary).
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 6. Closing call to action

- An ink block. "Ready for **your Heyday**?", with "Start free trial" and "Book a demo". The sun bounces once when the section comes into view.

---

## `/features/ai`: The AI

- **Template:** T11
- **What this page is for:** explains Heyday's AI in plain words: what it does, the three levels an owner chooses between, and the safeguards, so an owner can trust it.
- **Title and description (for search):** "Heyday AI: replies, setup and a receptionist, only as much as you want" / "AI that drafts replies from the booking and your policies, learns from your corrections, and only sends on its own when you switch it on."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (the three levels), lavender #D6D0F5 (assistant or agent), cream #F2E9E1 (the promise and safeguards), paper #FBF9F6 (the AI features), sky #AEC9EE (proof), cream #F2E9E1 (FAQ), ink #0A0A0A (closing).

### 1. Hero

- **What it's for:** leads with control, the thing owners worry about most.
- **Layout:** type-led. The text is on the left; the sun is large on the right.
- **Holding copy:**
  - Label: `{ the ai }`
  - Headline: "You choose **how much the AI does**."
  - Line: "It reads the booking, your prices and your policies before it writes a word. You decide what it sends."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `HeydayMark`, starting as the sun.
- **Motion:** the sun bounces once on load. The headline has no rise.

### 2. Three levels

- **What it's for:** shows the three levels an owner can choose, one type of message at a time.
- **Layout:** a sticky scroll (B7).
  - **Left:** three blocks, one per level.
  - **Right:** a sticky panel showing one email as it moves through the levels.
  - **Beside the panel:** the Heyday line with three dots, filling as you go.
  - **Above the panel:** `HeydayMark`, which changes with the level: the sun at level 1, the Loop at level 2, Infinity at level 3.
- **Holding copy:**
  - Label: `{ three levels }`
  - Headline: "Start safe. **Hand over more as trust grows.**"
  - Blocks:
    - **Level 1: Draft.** "The AI writes the reply. A person reads it and presses send." Tag: "AI assistant".
    - **Level 2: Draft and train.** "You correct the draft, and each correction becomes a rule it follows from then on. It keeps getting closer to how you'd answer." Tag: "AI assistant that learns".
    - **Level 3: Autopilot.** "For the types of message you switch on (where do I park, payment reminders, sorry we missed your call), it writes and sends by itself, within your rules. It hands over to a person when it isn't sure, when a rule would be broken, or when money or a promise is involved." Tag: "AI agent", and "Coming soon".
- **Image:** `ScreenIllustration`, one per level, labelled "Illustration · example data".
  - **Level 1:** an inbox thread with a customer question ("Can we add 10 guests?"), an AI draft underneath with notes showing what it read (the booking, the price list, the policy), and a "Send" button.
  - **Level 2:** the same draft with one sentence struck through and rewritten by the owner, and a chip: "Saved as a rule: always offer the next package up".
  - **Level 3:** a list headed "Sent today", showing three sent replies (parking, a payment reminder, "sorry we missed your call") and one "Handed to you" item flagged amber.
- **Icons and marks:** `HeydayMark` above the panel (sun, then `loop`, then `inf`). `hd-ai-replies-small` in each block's label.
- **Motion:**
  - `StickyScroll`: the panel cross-fades between levels (0.4s), and the new picture rises 16px.
  - `HeydayMark` morphs to each level's shape (0.9s, going through the sun between shapes).
  - `HeydayLine` fills.

### 3. Assistant or agent?

- **What it's for:** explains the words "AI assistant", "AI agent" and "agentic" once, in plain English.
- **Layout:** two panels side by side on lavender (stacked on phones), with a single line under both.
- **Holding copy:**
  - Label: `{ in plain words }`
  - Headline: "Assistant **or agent**?"
  - Panel 1: "**AI assistant (levels 1 and 2):** it suggests, and you decide."
  - Panel 2: "**AI agent (level 3):** it decides and acts, inside the rules you set. That's what people mean by 'agentic'."
  - Line under both: "An AI agent is software that does a job for you. 'Agentic' describes how much it acts on its own, rather than only suggesting."
- **Image:** none.
- **Icons and marks:** Panel 1 uses `hd-ai-replies`. Panel 2 uses `hd-automations`.
- **Motion:** `RevealGroup`.

### 4. The promise, and the safeguards

- **What it's for:** makes the trust promise, then shows exactly what stops level 3 going wrong.
- **Layout:**
  - The promise in large type.
  - Under it, four cards on the Heyday line.
  - One "Only on Heyday" sticker beside the headline.
- **Holding copy:**
  - Label: `{ the promise }`
  - Headline: "The AI drafts. **You approve.**"
  - Line: "That's the promise at levels 1 and 2. If you choose level 3, these safeguards are always on:"
  - Cards:
    - **One type at a time:** "You switch autopilot on for one type of message at a time."
    - **Unsure means draft:** "Anything it isn't confident about goes back to being a draft for you."
    - **A daily list, one off switch:** "See everything it sent each day, and stop it with one switch."
    - **People for the big things:** "Refunds, complaints, prices outside your rules and promises always need a person."
- **Image:** none.
- **Icons and marks:** `hd-automations`, `hd-ai-replies`, `hd-reports` and `hd-team-and-shifts` on the cards.
- **Motion:** `RevealGroup`. `HeydayLine` draws under the cards.

### 5. What the AI does

- **What it's for:** lists the AI features, each linking to its page.
- **Layout:** a grid of cards, three across. Each card has a small icon, the name, one line and a "Coming soon" chip.
- **Holding copy:**
  - Label: `{ ai features }`
  - Headline: "AI where it **saves you time**."
  - Cards (the name, then the line):
    - **Replies that write themselves:** "Drafts every reply from the conversation, the client's record, the booking's live situation, your policies and your availability."
    - **Who's getting in touch:** "Sorts every message by who sent it (a lead, a current customer, a past customer, your team) and spots when it belongs to an enquiry already open."
    - **Call notes and follow-ups:** "Every call summarized in the inbox, and a recap email drafted in one click. Voicemails arrive as text."
    - **Missed-call capture:** "Works out who called, adds the call-back to your list, and sends a 'Sorry we missed your call' written for who they are."
    - **AI receptionist:** "Answers calls and texts, takes messages and books."
    - **AI setup assistant:** "Reads your website, price list, old emails and policies, and fills in your settings for you to check."
    - **Ask your business:** "Ask questions about your business in plain English, and get a weekly coach's summary."
    - **AI cost controls:** "See what the AI costs, and set limits."
- **Image:** none.
- **Icons and marks:**
  - Replies, Setup assistant, Receptionist, Ask your business: `hd-ai-replies`.
  - Who's getting in touch: `hd-one-inbox`.
  - Call notes, Missed-call capture: `hd-missed-calls`.
  - Cost controls: `hd-reports`.
- **Motion:** `RevealGroup`, rising at a 150ms stagger.

### 6. Proof

- **What it's for:** one sourced number about why fast replies matter.
- **Layout:** a `StatBlock` on sky.
- **Holding copy:**
  - Stat (row 18): "**90%** of customers rate an 'immediate' response as important, and 60% define immediate as 10 minutes or less."
  - Source line: "HubSpot Research (2018), cited in HubSpot's State of Service Report 2022."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 7. FAQ

- **What it's for:** answers the questions the briefs can answer honestly.
- **Layout:** an accordion (`FAQ`) in a single column, 65 characters wide.
- **Holding copy:**
  - Label: `{ questions }`
  - Headline: "Questions about **the AI**."
  - Questions and answers:
    - **Does the AI send anything without me?** "Not at levels 1 and 2. Only at level 3, and only for the types of message you switch on."
    - **What does it read before it writes?** "The conversation so far, the client's record, the booking's live situation, your policies and procedures, your prices and your availability."
    - **Can I turn it off?** "Yes. Level 3 has one switch to stop it, and each type of message is switched on separately."
    - **Which plans include which level?** "[TBC]. Plans aren't decided yet."
    - **What does it cost to run?** "[TBC]. The cost controls will show it."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the accordion opens with a 0.2s height transition. With reduced motion, it opens instantly. No rise.

### 8. Closing call to action

- An ink block. "Ready for **your Heyday**?", with "Start free trial" and "Book a demo". The sun bounces once.

---

## `/integrations`: Integrations

- **Template:** T10
- **What this page is for:** shows the apps and platforms Heyday connects to, honestly marked as connected or coming soon.
- **Title and description (for search):** "Heyday integrations: payments, accounts, calendars, ads and marketplaces" / "Connect Heyday to Stripe, Zapier and more. QuickBooks, Xero, Google Calendar, ads and marketplaces are coming soon."
- **Grounds, top to bottom:** cream #F2E9E1 (hero and filters), paper #FBF9F6 (the list), sky #AEC9EE (missing one?), ink #0A0A0A (closing).

### 1. Hero

- **What it's for:** tells visitors what connects.
- **Layout:** a short type-led hero.
- **Holding copy:**
  - Label: `{ integrations }`
  - Headline: "Stop typing the same thing **into three apps**."
  - Line: "Heyday connects to the tools you already use. The ones marked 'Coming soon' are on the way."
  - Buttons: "Start free trial" (primary), "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** `hd-automations` at 20px beside the label.
- **Motion:** none.

### 2. Filters

- **What it's for:** filters the list by category.
- **Layout:** `FilterChips`: All, Payments, Automation, Accounting, Calendar, Advertising, Messaging, Marketplaces, Connected, Coming soon.
- **Holding copy:** the chip labels.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** filtered cards fade in over 0.2s.

### 3. The list

- **What it's for:** every integration, with a card for each linking to its page.
- **Layout:**
  - A grid of cards, three across, grouped under category headings.
  - Each card has the name in text, the category in Geist Mono, one line on what it connects, and a status chip: "Coming soon" (every integration, until Heyday is live).
  - No logos until Jem confirms we may use them.
- **Holding copy:** the integration pages below.
- **Image:** none.
- **Icons and marks:** none. The names do the work.
- **Motion:** `RevealGroup` per category.

### 4. Missing one?

- **What it's for:** captures demand for integrations we don't have yet.
- **Layout:** a panel on sky.
- **Holding copy:**
  - Headline: "Need something **we don't connect to yet**?"
  - Line: "Tell us which tool you use. It helps us decide what to build next."
  - Button: "Tell us" (ghost, to `/contact`).
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 5. Closing call to action

- An ink block, as elsewhere.

### Integration pages (`/integrations/[slug]`)

**Every integration page uses the same template:**
1. **Hero:** the name (as text), the category label in Geist Mono, the status chip, and one line on what it connects. Buttons: "Start free trial" and "Book a demo".
2. **What it does for you:** three short points in cards.
3. **How it works:** the setup steps, shown only once the integration is live. Until then: "Setup steps [TBC] when this integration opens."
4. **Related features:** two or three feature cards with small icons.
5. **FAQ:** only what the briefs can answer.
6. **Closing call to action.**

**Grounds:** cream, paper, cream, paper, ink.
**Motion:** `SectionReveal` only. No parallax, no sticky scroll.
**Icons and marks:** small icons on the related feature cards only.

| Page | Category | What it connects, in plain words | Status | Related features |
|---|---|---|---|---|
| `/integrations/stripe` | Payments | Takes card payments for deposits, balances and invoices. | Coming soon | Payments and deposits; Invoicing and chasing |
| `/integrations/zapier` | Automation | Connects Heyday to other apps you use, so information moves between them. | Coming soon | Follow-ups and autoresponders; Integrations and importing |
| `/integrations/quickbooks` | Accounting | Sends your clients, invoices and payments to your accounts. | Coming soon | Invoicing and chasing; Reports and the Command Centre |
| `/integrations/xero` | Accounting | Sends your clients, invoices and payments to your accounts. | Coming soon | Invoicing and chasing; Reports and the Command Centre |
| `/integrations/google-calendar` | Calendar | Keeps your Heyday diary and your Google Calendar in step. | Coming soon | Scheduling and one diary |
| `/integrations/google-ads` | Advertising | Sends the real value of each booking back to Google Ads, so your ads learn which clicks book. | Coming soon | Ads that know which bookings pay |
| `/integrations/microsoft-ads` | Advertising | Sends the real value of each booking back to Microsoft Ads. | Coming soon | Ads that know which bookings pay |
| `/integrations/whatsapp` | Messaging | Brings WhatsApp messages into the one inbox, and sends WhatsApp reminders and nudges. | Coming soon | One inbox; Follow-ups and autoresponders |
| `/integrations/airbnb-experiences` | Marketplaces | Brings your Airbnb Experiences bookings into the same diary, following Airbnb's rules. | Coming soon | Sell everywhere, one diary |
| `/integrations/classbento` | Marketplaces | Brings your ClassBento bookings into the same diary, following ClassBento's rules. | Coming soon | Sell everywhere, one diary; Classes, tickets and private groups |
| `/integrations/togather` | Marketplaces | Brings your Togather bookings into the same diary, following Togather's rules. | Coming soon | Sell everywhere, one diary |
| `/integrations/letsbatch` | Marketplaces | Brings your LetsBatch bookings into the same diary, following LetsBatch's rules. | Coming soon | Sell everywhere, one diary; Classes, tickets and private groups |
| `/integrations/yuup` | Marketplaces | Brings your Yuup bookings into the same diary, following Yuup's rules. | Coming soon | Sell everywhere, one diary |

**Holding copy for the "What it does for you" cards:**
- **Stripe:** "Deposits taken at booking." / "Balances collected on the due date." / "Invoices paid online."
- **Zapier:** "Send new bookings to other apps." / "Bring information from other apps in." / "Fewer things typed twice."
- **QuickBooks and Xero:** "No double entry." / "Payments matched to invoices." / "Books ready for your accountant."
- **Google Calendar:** "See your bookings where you already look." / "Fewer clashes." / "One diary."
- **Google Ads and Microsoft Ads:** "Ads learn which bookings pay." / "Less spent on clicks that never book." / "See profit per ad in Reports."
- **WhatsApp:** "Every WhatsApp in one thread per client." / "Reminders by WhatsApp." / "Replies drafted by the AI."
- **Each marketplace:** "Every booking in one diary." / "No date sold twice." / "Bring customers back to book direct."

**FAQ answers:**
- **Is it live?** Answer with the status in the table.
- **When will it be ready?** "[TBC]."
- **What does it cost?** "[TBC]."
- **Do I need a paid account with them?** "[TBC]". Check each platform's terms before this is published.

---

## `/whats-new`: What's new

- **Template:** T15 (as a list)
- **What this page is for:** the product updates log, like Jobber's. It starts empty and fills when early access opens. It has no invented entries.
- **Title and description (for search):** "What's new in Heyday" / "Product updates from Heyday. The first updates arrive with early access."
- **Grounds, top to bottom:** paper #FBF9F6 (the whole page). This is a reading page, so it has no background fades and no overlapping tops.

### 1. Header

- **What it's for:** names the page.
- **Layout:** a plain heading at reading width.
- **Holding copy:**
  - Label: `{ what's new }`
  - Headline: "What's new in Heyday."
  - Line: "New features and changes, newest first."
- **Image:** none.
- **Icons and marks:** `hd-mark` at 20px beside the label.
- **Motion:** none.

### 2. Updates list (empty state)

- **What it's for:** shows where updates will appear, without pretending there are any yet.
- **Layout:**
  - One card (A5) at reading width.
  - When there are entries, each shows the date in Geist Mono, the group's small section mark, the title, two lines, and a link to the feature page.
  - Entries come from `updates.ts`, which starts empty.
- **Holding copy (empty state):**
  - Headline: "Nothing here **yet**."
  - Line: "The first updates arrive with early access. Join the list and you'll hear first."
  - Button: "Join early access" (primary).
- **Image:** none.
- **Icons and marks:** a small still sun on the empty-state card. When entries exist, each carries its group's `hd-shape-*` at 20px.
- **Motion:** none.

### 3. Closing call to action

- **What it's for:** a light nudge to early access or a demo.
- **Layout:** a slim paper band with the two buttons.
- **Holding copy:** "Want to see it before it's out?" with "Start free trial" (primary) and "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.
