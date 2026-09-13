# Heyday site spec, part 1: the whole-site parts and the homepage

This is the page-by-page spec for the Heyday host software site, the jobbie repo. The build prompt gives the rules, the templates and the motion table. These spec files write out every page, section by section, with:
- what each section is for;
- its layout;
- holding copy;
- image slots;
- icons and marks;
- motion;
- background colours.

**All copy here is holding copy for Jem to edit.** Where the briefs already have wording (the hero, the homepage copy, the headline bank), it's used as is. Anything not decided yet is a `[TBC]` placeholder. Nothing here invents customers, quotes, numbers, prices or ratings.

**The spec files:**

| File | Covers |
|---|---|
| `01-global-and-home.md` (this file) | The parts every page shares: page structure, page transitions, the header, the footer, holding images, product illustrations, states, search and share images. Then the homepage |
| `02-product-pages.md` | How it works, the six group pages, All features, the AI page, integrations, What's new |
| `03-feature-pages.md` and `../data/features.json` | The feature-page template, section by section, and the holding content for every feature page |
| `04-who-stories-pricing-compare.md` | Who it's for, the seven stories, pricing, the compare hub and pages |
| `05-resources-company-utility.md` | Resources, the free tools and quiz, templates, guides and blog, About, Security, Help, Contact, Demo, Early access, Log in, the page for AI search tools, legal pages and the 404 |

**If documents disagree:**
- **Look and motion:** the design brief wins.
- **Facts, features and statuses:** `BUILD-NEXT-HEYDAY-SAAS.md` and the SaaS brief win.
- **Structure and holding copy:** these spec files win.

---

## A. The parts every page shares

### A1. Page structure (`PageShell`)
- **Sections:** each section is a block with 56px rounded top corners (32px on phones) that sits 56px up over the one before. This follows the design brief, A10.
- **Background colours:** on marketing pages, the ground fades from one section's colour to the next as you scroll (design brief, B2).
  - Articles, tools, forms and legal pages stay on paper #FBF9F6, with no fade.
  - Dark blocks are ink #0A0A0A with cream text. Use them only for closing calls to action and the Run the day sections.
- **Width:** content up to 1280px, with a side gutter of at least 16px. Reading text is about 65 characters wide.
- **Spacing:** 124px between sections on desktop, 80px on phones.
- **Behind the hero and group-page heroes:** faint 1px rounded-rectangle outlines (design brief, B1).

### A2. Moving between pages
- **Where:** in `src/app/template.tsx`, so it runs on every route change.
- **The page content:** fades in and rises 12px over 0.35s, with `cubic-bezier(.215,.61,.355,1)`.
- **The header and footer** don't animate. The sun in the header bounces on first load only, not on every page change.
- **Scrolling:** go to the top on a route change. Links to a place on the same page scroll smoothly, unless reduced motion is on.
- **Reduced motion:** the page simply appears.

### A3. The header (`SiteHeader`)
Keep the current header: a 72px bar, the three panels shaped differently, and the grace delay when the pointer leaves (commit 8aebdb3). Change what's in it.

- **Left:** the Heyday wordmark (`assets/heyday-wordmark.png`, as a CSS mask in ink) with the small sun beside it, in blue #93B7E8. The sun bounces once on first load.
- **Middle:** Product ▾, Who it's for ▾, Resources ▾, Pricing.
- **Right:** "Log in" (text link), then "Book a demo" (ghost button), then "Start free trial" (primary orange button). Add `[PHONE TBC]` only once there's a real number.
- **Phones:** the wordmark and a menu button. The menu opens full screen on cream, with the same groups as accordions and the two buttons at the bottom.

**The Product panel** (the columns shape):

| Column heading (with its small, still section mark) | Links, each with its small icon |
|---|---|
| Get ahead (hd-shape-sunrise) | AI setup assistant · Policies and procedures · Team management · Integrations |
| Get found (hd-shape-signal) | Booking page · Get listed on the marketplace · Sell everywhere · Campaigns · Ads that know which bookings pay · Guest capture · Partners |
| Win the client (hd-shape-connect) | Enquiries and lead types · Missed-call capture · AI receptionist · Replies that write themselves · Instant quotes · Follow-ups · Online booking · Classes and tickets · Packages and memberships · Contracts · Group bookings |
| Run the day (hd-shape-dial) | Client portal · One inbox · Client records · Call notes · Scheduling · Shift offers · Checklists and kit lists · On the day · Tasks · Hiring and onboarding · Time tracking |
| Get paid (hd-shape-paid) | Payments and deposits · Tips · Invoicing and chasing · Team pay and expenses · Profit per job · Reports |
| Get rebooked (hd-shape-loop) | Reviews · Referrals · Gift vouchers · Loyalty · Fill quiet dates · Waiting lists · Complaints settled fairly |

- The labels are short forms of the feature names in `data/features.json`. Each link goes to `/features/<slug>` from that file.
- Long columns show their first six links, then "All Win the client features →" (and so on for each group).
- **Along the bottom:** All features · How it works · The AI · Integrations · What's new.
- **Promo card** (right, on blue #93B7E8):
  - a small crop of the workflow-builder still;
  - "Build it your way";
  - "Drag in a step. Click it to make it yours.";
  - it links to the Follow-ups and autoresponders feature page (`/features/follow-ups`).

**The Who it's for panel** (the cards shape):

| Card | The line under it |
|---|---|
| Events and hospitality | Mobile bars, caterers, private chefs, venues, planners, and more. |
| Classes and experiences | Workshops, cooking and cocktail classes, tours, escape rooms, team-building. |
| Photo, video and entertainment | Photographers, videographers, DJs, musicians, performers, photo booths. |
| Home and personal services | Cleaners, trades, landscapers, pet care, tutors, childcare. |
| Beauty, wellness and fitness | Mobile beauty, therapists, personal trainers, instructors. |
| Staffing and hire | Event staffing agencies, rentals and equipment hire. |

- Each card links to its anchor on `/who-its-for`.
- **The featured strip:** two story cards: "How Tipsy Parties runs on Heyday" and "How a class host could run on Heyday" (labelled Example).
- **The panel's last line:** "Not on the list? If you sell your time, your skills or an experience, it's for you."

**The Resources panel** (the list shape): Free tools · Templates · Guides · Blog · Compare Heyday · Help · What's new.

**Motion:** the panel opens with the existing slide, and moving between menus swaps the panel's contents. There's no other motion in the header.

### A4. The announcement bar (optional; Jem to decide)
- **Layout:** a thin ink bar above the header, with cream text: "Heyday is opening to businesses soon. Join early access →". There's a close button, and a closed bar stays closed on that device.
- Both rivals use a bar like this for launches.

### A5. The footer (`SiteFooter`)
- **Ground:** ink #0A0A0A, with cream text. It has the 56px rounded top, sitting over the section above.
- **Top row:**
  - on the left, the Heyday wordmark in cream, with the sun beside it in sky #AEC9EE, slowly cycling through the six shapes, each in its own colour (A11 in the design brief);
  - on the right, "Make your day a Heyday." and a link to the Heyday marketplace, "Find something to do →".
- **Columns:**
  - **Product:** All features · How it works · The AI · Integrations · Pricing · What's new · The Heyday marketplace
  - **Who it's for:** Who it's for · Stories · the six kinds of business, as anchors
  - **Resources:** Free tools · Templates · Guides · Blog · Compare Heyday
  - **Company:** About · Security · Help · Contact · Book a demo
  - **Legal:** Terms · Privacy · For AI assistants
- **Bottom row:** "© [year] [company name TBC]", a note that pages marked Coming soon describe features that aren't live yet, and the two buttons ("Start free trial" and "Book a demo").
- **Motion:** only the cycling sun. It stops when the footer is off screen, and with reduced motion.

### A6. Holding images (`HoldingImage`)
Every photo slot on the site uses this until real photos exist.
- **Shape:** a box at the ratio the spec gives: 16:9, 4:3, 1:1, 3:4 or 4:5. Nothing is ever stretched.
- **Colour:** a light tint of the section's colour (mix the section colour 35% with paper). On a coloured ground, use paper.
- **Edge:** a 1px ink outline. The corners match the container: 16px in cards, 40px in panels.
- **Inside:**
  - the section's group shape, centred at 12% opacity (or the sun, if the section has no group);
  - bottom left, in Geist Mono 12px: "Holding image · " followed by the art direction.
- **Alt text:** the art direction.
- **Finding them later:** put the art direction in a `data-art` attribute, so every holding image can be found and swapped for a real photo. A real photo keeps the ratio and the alt text.
- **Loading:** lazy, except in the hero.
- **The art direction's tone:** real people in the middle of their work or event, not posing. For example:
  - an owner answering a message between set-ups;
  - a bartender mid-pour at a party;
  - a class in full swing;
  - a photographer checking the back of the camera.
- **Never:** stock handshakes, laptops on beaches or empty offices.

### A7. Product illustrations (`ScreenIllustration`)
Every product-screen picture is a small SVG React component drawn in the style of `assets/heyday-workflow-builder-still.svg`. That means:
- a paper app window with a 2px ink outline, 16px corners and a hard 11px 11px shadow at 8% ink;
- the Heyday wordmark top left;
- Geist Mono labels;
- exactly one orange thing: the action, or the active state;
- "Illustration · example data" in small print underneath.

**People in the pictures** are shown by role ("The customer", "Team member", "You"), never by an invented name or business.

**Each spec entry lists what the screen shows.** Draw those elements, and nothing that suggests a feature is live when it's coming soon.

**Motion:** a still illustration can have one small loop when it's on screen. For example, a "Paid" chip ticking over, or a new message arriving. It pauses off screen and with reduced motion.

### A8. States
- **Loading:** a 24px sun turning as the Loop. With reduced motion, it's still.
- **Empty:** the small sun, one line saying what will appear here and when, and a link to somewhere useful.
- **Errors:** one plain sentence saying what went wrong, and one saying what to do. No apologies and no codes.
- **Form success:** the sun bounces once, then the confirmation sentence.
- **Keyboard focus:** a 2px ink outline, offset 3px, plus the button's rounding.
- **Skip link:** "Skip to content" is the first thing to receive keyboard focus on every page.

### A9. Search, sharing and icons
- **Page titles:** "Page title | Heyday". Feature pages use their search line.
- **Descriptions:** 155 characters at most, written for each page (the spec gives one).
- **Share images:** 1200×630. The page's group shape sits on its group colour, with the page title in the heading font, and the wordmark bottom left. Pages with no group use the sun on cream.
- **Favicon and app icons:** made from `assets/heyday-mark.svg` at 16, 32, 180 and 512px. Use the blue sun on the cream tile for the app icon.
- **Theme colour:** cream #F2E9E1.
- **Other files:** `sitemap.xml` and `robots.txt`. Holding and sample pages are `noindex` until they're real.

### A10. The sun's colour
always one colour, and never black or orange.
- **In a group's section,** it takes that group's colour: Signal lavender, Connect blue, Paid sage, Loop sky. Where the group's colour is ink or orange (Run the day, Get ahead), it's blue.
- **On plain grounds:** blue #93B7E8 on cream and paper, paper #FBF9F6 on blue, sage and sky, and sky #AEC9EE on ink.
- **When it morphs into a shape,** its colour blends into the shape's colour.
- **In code:** pass the sun colour as a prop. `heyday-mark-motion.js` takes it as `new Mark(svg, wrap, shape, {sun: colour})`.

---

## B. The homepage

## `/`: Home
- **Template:** T1 (design brief B4, homepage copy from SaaS brief 3.7)
- **What this page is for:** show a busy owner, in one scroll, that Heyday runs their whole workflow, and get them to early access or a demo.
- **Title and description (for search):** "Heyday: software that runs your events, class or service business" / "Instant quotes, bookings, payments, your team, your inbox and every follow-up, in one workflow that grows with you. Coming soon: join early access."
- **Grounds, top to bottom:** cream (hero), cream (who it's for strip), paper (statement), sky (How Heyday runs your day), the four feature rows each on paper with its shape in its colour, lavender (What it does), blue (Build it your way), paper (The AI), cream (Only on Heyday), paper (who it's for and stories), sage-tinted paper (grows with you), blue (sell everywhere), cream (switching), ink (closing), then the ink footer.

### 1. Header
- Part A3.

### 2. Hero
- **What it's for:** say what Heyday is and why it's different in the first second, and show the whole workflow moving.
- **Layout:** two columns, 1280px and wider. On the left, the copy. On the right, the rising cards panel (blue #93B7E8, with 56px top corners and faint outline shapes behind it). Below 1280px, one landed card sits under the copy.
- **Holding copy:**
  - **Headline:** "Do what you love, Heyday runs the rest." This is live in the repo; keep it.
  - **Sub-line:** "You didn't start a business to work for it. We make your business work for you." Keep the live wording.
  - **The line that says what it is:** "The all-in-one app for events, entertainment, activity, class and service businesses. Instant quotes, bookings and payments, your team, your inbox and every follow-up, in one place that grows with you."
  - **Buttons:** "Start free trial →" (primary; it opens early access) and "Book a demo" (ghost).
  - **The rotating line:** "Built for caterers / class hosts / photographers / mobile bars / DJs / cleaners / escape rooms / you."
  - **The panel's accessible label:** "Example workflow: an enquiry becomes a booked, paid, staffed and reviewed job."
- **Image:** `RisingCards` with the eight workflow cards from the design brief, B5:
  1. New enquiry
  2. Instant quote
  3. Booked
  4. Team confirmed
  5. The day
  6. Paid
  7. New review
  8. Rebooked

  Each card has its step label, small icon, rows and orange pill, and all the data is example data. `assets/heyday-hero-still.svg` is the reference.
- **Icons and marks:** each card's small icon (hd-one-inbox, hd-instant-quotes, hd-online-booking, hd-team-and-shifts, hd-tasks, hd-payments, hd-reviews, hd-shape-loop). The HeydayMark sun, in paper #FBF9F6 on the blue panel, peeks in from the right edge and nudges each card as it lands.
- **Motion:**
  - the letter scatter and assembly from `hero-motion.tsx`, on load and on scroll away;
  - RisingCards: 1.67s rise, 0.83s hold, 2.5s exit, a new card every 3s;
  - the lavender ripple and the details popping in as each card lands;
  - the sun's nudge;
  - the HeydayLine under the panel lighting the current step.

  With reduced motion, the cards stop on one landed card.

### 3. Who it's for strip, with the proof line
- **What it's for:** let every kind of business see itself straight away, and say where Heyday comes from.
- **Layout:** a full-width marquee of business types in Geist Mono, then one centred proof line under it.
- **Holding copy:**
  - **The marquee:** "Mobile bars · Caterers · Private chefs · Photographers · DJs · Performers · Photo booths · Planners · Florists · Class hosts · Tours · Escape rooms · Cleaners · Trades · Tutors · Beauty and wellness · Fitness · Staffing agencies · and anyone who sells their time, skills or an experience".
  - **The proof line:** "Built by Tipsy Parties. Running Tipsy Parties every day."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the marquee drifts slowly and pauses on hover. With reduced motion, it's a still, wrapped line. The proof line rises in (SectionReveal).

### 4. Statement
- **What it's for:** name the problem in one big sentence.
- **Layout:** one sentence at large size, centred, with lots of space around it.
- **Holding copy:**
  - **Label:** `{ why Heyday }`
  - **Statement:** "Six apps, a group chat and your evenings. That's how most small businesses run. **It doesn't have to be.**"
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the statement's words reveal on scroll (the existing statement word reveal, Addendum 33).

### 5. How Heyday runs your day (sideways scroll 1)
- **What it's for:** the whole-workflow idea, which people mustn't miss. It pins, and scrolling moves the twelve steps sideways.
- **Layout:** `SideScroll`. A heading block on the left, then a track of twelve cards, each about 360px wide, then an end card. The HeydayLine runs along the bottom as the progress bar. On phones it becomes a swipe row.
- **Holding copy:**
  - **Label:** `{ how heyday runs your day }`
  - **Heading:** "One workflow for your whole business, **from the first hello to the next booking.**"
  - **The cards** (group label, step, then what Heyday does):
    1. **Get ahead · Get ahead of the game:** "Your prices, packages, rules, diary and team, ready before anyone asks."
    2. **Get found · Get found:** "A booking page, a marketplace listing, and ads that know which bookings pay."
    3. **Win the client · Catch every enquiry:** "One inbox, an instant first reply, and missed-call capture."
    4. **Win the client · Quote instantly:** "A price in seconds, which the customer can adjust themselves."
    5. **Win the client · Follow up automatically:** "Follow-ups that change with the lead, and stop the moment they reply."
    6. **Win the client · Win the client:** "Instant booking, with the deposit and signed terms in the same step."
    7. **Run the day · Plan it together:** "The client portal, reminders, changes and balance chasing."
    8. **Run the day · Staff it and get ready:** "Shift offers, clash and travel checks, and kit lists."
    9. **Run the day · The day:** "Reminders, check-in, alerts, and tips by QR or tap."
    10. **Get paid · Get paid:** "Deposits, balances, invoices, tips and team pay."
    11. **Get rebooked · Look after them:** "Next-day feedback: a referral code first, then the review ask."
    12. **Get rebooked · Get rebooked:** "Win-back messages, loyalty, memberships and gift vouchers."
  - **The end card:** "It runs itself" / "You oversee the exceptions. Heyday does the rest." / "See how it works →", linking to `/how-it-works`.
- **Image:** none. The cards carry icons.
- **Icons and marks:** each card has its step's small icon and its group's small section mark beside the group label. The end card has hd-shape-inf.
- **Motion:** SideScroll pins the section and moves the track as you scroll down. The HeydayLine fills orange. The end card's Infinity flows. With reduced motion, or on phones, it's a normal swipe row.

### 6. The feature rows (the four "Stop…" rows)
- **What they're for:** the four biggest everyday pains, each fixed. This keeps Russell's treatment from Addendum 34: the highlighted phrase inside the headline, alternating sides, and no dividers. Each row's soft form becomes its group's shape.
- **Layout:**
  - Four rows, alternating copy-left and copy-right, each on paper.
  - The shape (about 330px) sits on the opposite side from the copy.
  - Each row is a `MoreInfoSection`: its button grows the shape into the row.
  - The detail layer has four small cards, a stat where one is approved, and "Back".
- **Holding copy, row by row:**

**Row 1: instant quotes** (Win the client, the Connect shape, blue)
- **Headline:** "Stop losing bookings while you **work out the price**."
- **Line:** "Customers see a price in seconds, change it themselves, and book with a deposit."
- **Button:** "How it fits together →"
- **The detail heading:** "Every enquiry caught, priced, followed up and booked."
- **The cards:**
  - **Caught:** email, WhatsApp, texts and calls in one thread per client.
  - **Priced:** a price in seconds that the customer can adjust.
  - **Followed up:** follow-ups that change with the lead, and stop when they reply.
  - **Booked:** instant booking, with the deposit and signed terms in the same step.
- **Stat:** STATS-BANK row 1, "Quotes sent within 4 hours book 25% more often", source Flashquotes.

**Row 2: one inbox** (Run the day, the Dial, ink)
- **Headline:** "Stop checking **five apps** to find one message."
- **Line:** "Email, WhatsApp, texts and calls in one thread per client, with AI drafting replies that already know the booking."
- **The detail heading:** "Every conversation, with the booking beside it."
- **The cards:**
  - **One inbox:** every channel in one thread.
  - **Client records:** every message, quote and payment for one client.
  - **Call notes:** every call summarized, and voicemails transcribed.
  - **Replies that write themselves:** drafts you approve.
- **Colour:** the detail layer is ink, so its text is cream.

**Row 3: payments** (Get paid, the Paid shape, sage)
- **Headline:** "Stop spending your time **chasing clients** for payment."
- **Line:** "Deposits, balances and reminders by email and WhatsApp, until it's paid."
- **The detail heading:** "Every payment in. Every payout out. No chasing."
- **The cards:**
  - **Deposits and balances:** taken online when they book, and on the date the balance falls due.
  - **Reminders that stop:** nudges until it's paid, then they stop.
  - **Team pay:** worked out from the job, the hours and the tips.
  - **Profit per job:** what each booking actually made.

**Row 4: shift offers** (Run the day, the Dial, ink)
- **Headline:** "Stop texting your whole team to **fill one shift**."
- **Line:** "Offer the job to the right people, and let the first yes take it. Clashes are caught before they happen."
- **The detail heading:** "The right people, in the right place, on the day."
- **The cards:**
  - **Shift offers:** ranked by distance, reliability and rating.
  - **Clash and travel checks:** caught before you confirm.
  - **Checklists and kit lists:** nothing forgotten on the day.
  - **On the day:** reminders, check-in and cover if someone drops out.
- **Colour:** the detail layer is ink, so its text is cream.

- **Image:** none. The shapes are the pictures.
- **Icons and marks:** hd-shape-connect, hd-shape-dial, hd-shape-paid and hd-shape-dial. The detail cards use the small icons (hd-one-inbox, hd-instant-quotes, hd-ai-replies, hd-online-booking, hd-payments, hd-tasks, hd-team-and-shifts, hd-reports).
- **Motion:**
  - each shape morphs out of the sun as its row comes into view;
  - about every 7 seconds it turns back into the sun, bounces, and turns back;
  - the button grows the shape into the row over 0.9s, the detail rises in over 0.45s, and "Back" reverses it;
  - the copy rises in with SectionReveal.

### 7. What it does (the sticky scroll)
- **What it's for:** show the whole product in one scroll, like HoneyBook's product story: the copy scrolls and the picture changes to match.
- **Layout:** `StickyScroll`, from 1024px wide. On the left, six blocks, one per group, each at least 80vh tall. On the right, a sticky panel whose background takes each group's colour. On phones, each picture sits above its block.
- **Holding copy:**
  - **Label:** `{ what it does }`
  - **Heading:** "One place for the whole job, **from first hello to five stars.**"
  - **The blocks** (group label, then heading, then line, then links):
    1. **Get ahead:** "Ready before the first enquiry." / "Set up your prices, packages, rules and team once, with AI filling in the hard parts (coming soon)." / Links: AI setup assistant, Policies and procedures, Integrations.
    2. **Get found:** "Be the one they find." / "Your own booking page with the instant quote built in, a listing on the Heyday marketplace, and every other platform in one diary." / Links: Booking page, Get listed, Sell everywhere.
    3. **Win the client:** "Every enquiry caught, priced and booked." / "Instant quotes, online booking, classes and tickets, and follow-ups that stop when they reply." / Links: Instant quotes, Online booking, Classes and tickets, Follow-ups.
    4. **Run the day:** "The planning, the team and the day itself, handled." / "Scheduling, shift offers, client records, one inbox, and hiring and onboarding." / Links: Scheduling, Shift offers, One inbox, Hiring and onboarding.
    5. **Get paid:** "Every payment in. Every payout out." / "Deposits and balances, invoices and chasing, team pay, and profit per job." / Links: Payments and deposits, Invoicing and chasing, Profit per job, Reports.
    6. **Get rebooked:** "Happy customers come back, and bring their friends." / "Next-day feedback, a referral code before the review ask, gift vouchers and loyalty." / Links: Reviews, Referrals, Gift vouchers, Loyalty.
- **Image:** one `ScreenIllustration` per block:
  1. **Get ahead:** the setup assistant filling in a price list from a website. Show a progress list, one row highlighted orange, and "Check and save".
  2. **Get found:** the booking page, with the business's name as a placeholder, the instant-quote form (date, guests, hours), a live price, and "Book now".
  3. **Win the client:** the quote the customer adjusts. Show a guests slider, a package toggle (good, better, best), the total updating, a deposit amount, and "Book and pay deposit".
  4. **Run the day:** one client thread (an email, a WhatsApp, a text and a call note, with an AI draft ready to approve), with a shift offer card underneath (three team members ranked, the first "Yes" taking it).
  5. **Get paid:** the payments list (deposit paid, balance due in 7 days, a reminder sent by WhatsApp), with a "Paid" chip ticking over.
  6. **Get rebooked:** the next-day message (a thumbs up), then a referral code card, then "Leave a review" (orange).
- **Icons and marks:** each block's label carries its small section mark. Each picture's corner carries its lead small icon.
- **Motion:** StickyScroll. The active block is chosen when 60% of it is in view. The panel's background moves to that group's colour, and the picture cross-fades over 0.4s while rising 16px. Each picture has one small loop. On ink (Run the day), the picture sits on a paper card.

### 8. Build it your way (the workflow builder)
- **What it's for:** show owners they can set up their own workflow: drag in a step, then click it to make it theirs. A demo video goes here later.
- **Layout:** two columns. On the left, the copy and three points on the HeydayLine. On the right, `WorkflowDemo` in a panel on blue #93B7E8.
- **Holding copy:**
  - **Label:** `{ build it your way }`
  - **Heading:** "Build it **your way**."
  - **Line:** "Drag in a step. Click it to make it yours. Heyday runs it every time."
  - **The three points:**
    - "Start from a ready-made workflow for your kind of business."
    - "Every step says what it does in plain words."
    - "Test it on yourself before it goes live."
  - **Button:** "See follow-ups and automations →" (ghost)
  - **The video chip:** "Demo video coming soon".
- **Image:** `assets/heyday-workflow-builder-still.svg`, used as the `WorkflowDemo` poster.
- **Icons and marks:** hd-automations, hd-ai-replies and hd-tasks on the three points.
- **Motion:** the picture has a gentle parallax. When the video exists, it autoplays muted on a loop while on screen. With reduced motion, show the poster with a play button.

### 9. The AI
- **What it's for:** say how the AI works and that the owner stays in control.
- **Layout:** a heading, then three panels in a row, joined by the HeydayLine running left to right to show the levels going up.
- **Holding copy:**
  - **Label:** `{ the ai }`
  - **Heading:** "AI that works the way you do, **and only as much as you want.**"
  - **Line:** "It reads the booking, your prices and your policies before it writes a word. You decide what it sends."
  - **The panels:**
    - **Draft:** "It writes, you send."
    - **Draft and train:** "It learns from every correction."
    - **Autopilot:** "It handles the simple ones by itself." Marked "Coming soon".
  - **Button:** "How the AI works →" (ghost), linking to `/features/ai`.
- **Image:** none.
- **Icons and marks:** the panels carry the sun, the Loop and Infinity, small and still, for the three levels, with hd-ai-replies on the first.
- **Motion:** the panels rise in turn (RevealGroup, 150ms apart), and the HeydayLine fills from left to right.

### 10. Only on Heyday (sideways scroll 2)
- **What it's for:** the features no rival has, which people mustn't miss.
- **Layout:** `SideScroll` again, well apart from section 5. A heading block, eight cards, and an end card.
- **Holding copy:**
  - **Label:** `{ only on heyday }`
  - **Heading:** "The things **neither of them** does."
  - **The cards,** each marked "Coming soon" where it isn't built:
    1. **AI autopilot levels:** "Start safe, then hand over more as trust grows."
    2. **Missed-call messages by caller type:** "Every missed caller hears back within minutes, in the right words."
    3. **AI setup assistant:** "Set up in an afternoon, not a month."
    4. **Lead types with replies to match:** "Your best leads get the fastest, most personal answer."
    5. **Fill quiet dates:** "Offers go to the customers most likely to book the dates that look thin."
    6. **Group bookings with split payments:** "Each guest pays their share by link."
    7. **Referral code first, then the review:** "More word of mouth, and more reviews."
    8. **Sell everywhere, in one diary:** "Bookings from other platforms, and your marketplace listing, in one place."
  - **The end card:** "See every feature →", linking to `/features?filter=only-on-heyday`.
- **Image:** none.
- **Icons and marks:** each card's small icon. The label carries a small "Only on Heyday" sticker.
- **Motion:** SideScroll, as in section 5. With reduced motion, or on phones, it's a normal swipe row.

### 11. Who it's for, and the example stories
- **What it's for:** show that it suits every kind of business that sells time, skills or an experience, through stories rather than a list.
- **Layout:** a heading and line, a wrapped row of business-type chips, then a swipe row of seven story cards. It isn't pinned.
- **Holding copy:**
  - **Label:** `{ who it's for }`
  - **Heading:** "Built for businesses that sell **time, skills and experiences.**"
  - **Line:** "If you sell your time, your skills or an experience, it's for you."
  - **The chips:** the six kinds from the header's Who it's for panel.
  - **The story cards** (Tipsy's is the real one; the rest are labelled Example):
    - "Tipsy Parties: from one person behind the bar to a team"
    - "A caterer: staffing big events without a group chat"
    - "A class host: filling seats and taking private bookings"
    - "A performer: quoting while performing every weekend"
    - "A photo booth company: from one booth to several"
    - "An event staffing agency: shifts, checks and payouts at volume"
    - "A photographer: selling workshops alongside shoots"
  - **Button:** "See who it's for →" (ghost)
- **Image:** each story card has a `HoldingImage` at 4:3 with its art direction. For example: "A caterer plating canapés in a busy event kitchen, mid-service"; "A class host leaning in to help one guest, the room busy behind"; "A bartender mid-pour at an outdoor party".
- **Icons and marks:** each card has its lead small icon in the corner.
- **Motion:** the cards rise in (RevealGroup). The row swipes or drags. There's no pinning.

### 12. Grows with you
- **What it's for:** show that Heyday grows from a one-person business to a business that runs itself, the way Tipsy did.
- **Layout:** four stickers on the HeydayLine, left to right.
- **Holding copy:**
  - **Label:** `{ grows with you }`
  - **Heading:** "From doing it all yourself **to a business that runs itself.**"
  - **The four stickers** (the stages from SaaS brief section 1):
    1. **Doing it all yourself:** "Quotes, bookings and payments that give you your evenings back."
    2. **Owner-operator:** "Automations and follow-ups carry the routine."
    3. **A team:** "Shift offers, checks and pay, all in one place."
    4. **It runs itself:** "You oversee the exceptions."
  - **The Tipsy line:** "Tipsy Parties started with one person behind a bar. Today a team of [needs approval] bartenders runs from one system." Leave it out until the number is approved.
- **Image:** none.
- **Icons and marks:** the stickers carry hd-instant-quotes, hd-automations, hd-team-and-shifts and hd-shape-inf.
- **Motion:** the stickers straighten on hover, rise in turn, and the HeydayLine fills.

### 13. Sell everywhere
- **What it's for:** say that Heyday works alongside the marketplaces they already use, and link to the Heyday marketplace.
- **Layout:** a solid block in jobbie's own blue #93B7E8 with ink text. The copy is on the left; on the right, a diary picture.
- **Holding copy:**
  - **Label:** `{ sell everywhere }`
  - **Heading:** "Selling on Airbnb, ClassBento or Togather? **Keep them.**"
  - **Line:** "Bring every booking into one diary, and win your customers back to book direct." Marked Coming soon.
  - **Buttons:** "See Sell everywhere →" (ghost). A text link to the Heyday marketplace: "Find something to do →".
- **Image:** a `ScreenIllustration` of one week's diary. Bookings come from four sources, each tagged in Geist Mono: your booking page, the Heyday marketplace, another platform, a repeat client. One clash is flagged in orange.
- **Icons and marks:** hd-online-booking.
- **Motion:** the picture has a gentle parallax, and the copy rises in.

### 14. Switching
- **What it's for:** take away the fear of moving over.
- **Layout:** a heading, then three steps on the HeydayLine.
- **Holding copy:**
  - **Label:** `{ switching }`
  - **Heading:** "Switching is the part everyone dreads. **So we made it easy.**"
  - **The three steps:**
    1. "Bring your clients and bookings with you." [to confirm]
    2. "Let the AI suggest your settings." (Coming soon)
    3. "Talk to a real person when you need one." [support hours to confirm]
  - **Button:** "Book a demo" (ghost)
- **Image:** none.
- **Icons and marks:** hd-tasks, hd-ai-replies and hd-one-inbox.
- **Motion:** the steps rise in turn, and the line fills.

### 15. Closing call to action
- **What it's for:** the last push to sign up.
- **Layout:** an ink block with cream text, centred, with the sun beside the heading.
- **Holding copy:**
  - **Heading:** "Ready for **your Heyday?**"
  - **Line:** "Join early access, or book a demo and we'll show you round."
  - **Buttons:** "Start free trial →" (primary) and "Book a demo" (ghost, with a cream outline).
- **Image:** none.
- **Icons and marks:** the animated HeydayMark, in sky #AEC9EE on ink.
- **Motion:** the sun morphs through the six shapes once as the block comes into view, then rests as the sun.

### 16. Footer
- Part A5.
