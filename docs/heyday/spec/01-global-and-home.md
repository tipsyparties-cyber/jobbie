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
- **The featured strip:** two example story cards: "How a mobile bartender could run on Heyday" and "How a class host could run on Heyday", both labelled Example.
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
- **Structured data on the homepage:** a `SoftwareApplication` entry with the name Heyday, the category `BusinessApplication`, the operating system "Web", and a plain description.
  - Leave out ratings, reviews and prices until they're real.
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
- **Title and description (for search):** "Heyday | All-in-one software for event, class and service businesses" / "Quotes, bookings, payments, your team, follow-ups and reviews for events, class and service businesses, in one automated workflow. Join early access."
- **Grounds, top to bottom:** cream (hero), cream (what Heyday is), paper (statement), sky (How Heyday runs your day), the four feature rows each on paper with its shape in its colour, lavender (What it does), blue (Build it your way), paper (The AI), cream (Only on Heyday), paper (who it's for and stories), sage-tinted paper (grows with you), blue (sell everywhere), cream (switching), ink (closing), then the ink footer.

### 1. Header
- Part A3.

### 2. Hero
- **What it's for:** say what Heyday is and why it's different in the first second, and show the whole workflow moving.
- **Layout:** two columns, 1280px and wider. On the left, the copy. On the right, the rising cards panel (blue #93B7E8, with 56px top corners and faint outline shapes behind it). Below 1280px, one landed card sits under the copy.
- **Decorative suns (instead of the orbs):** the blurred pastel orbs go. In their place go three Heyday suns of different sizes. Each is one colour (design brief A11), never black or orange:
  - **A big one** (about 520px) in sage #9AAD92, low on the left. It's cut off by the page edge and runs down across the rounded top of the next section, so it carries the eye into "What Heyday is". It sits above both sections' backgrounds and behind all text.
  - **A medium one** (about 160px) in lavender #D6D0F5, near the top left, half off the page edge.
  - **A small one** (about 64px) in sky #AEC9EE, between the copy and the rising cards panel.
  - **Below 1280px,** where the panel isn't shown, add a medium blue #93B7E8 one at the top right.
  - **They're decoration:** `aria-hidden`, with no pointer events, and never over the headline's letters.
- **Motion for the suns:**
  - Each turns on its own rhythm with the dial click: 45° in 0.7s, every 6 to 10 seconds, staggered so they never move together.
  - Each has a gentle parallax, so they drift as you scroll. The big one moves the most, up to 80px.
  - With reduced motion, they're still.
- **Replace, don't add:** the rising cards panel takes the place of what's on the right of the hero now. That means the faint radial diagram, whose labels (customer service, sales, receptionist and so on) come from the old site, and the blurred pastel blobs. Remove both from the hero.
- **The animation, from anyone.com's hero, in our own art:**
  - Tall white cards rise one at a time through the blue panel.
  - Each card rises for 1.67s, holds for 0.83s, then exits upward over 2.5s, with a new card every 3s.
  - The cards simply scroll up and away. There's no ripple, no pop-in, and nothing peeking in. Each card shows all its details the whole time.
  - The full timing is in design brief A9.
  - Never use anyone.com's artwork or its animation file.
- **Holding copy:**
  - **Label:** `{ easy automation, your way }`
  - **Headline:** "You didn't start a business to have an admin job." This is Jem's hero, chosen on 13 September. It replaces "Do what you love, Heyday runs the rest.", which is live in the repo now.
  - **Line:** "Think of Heyday as you, times a thousand. Always on, always instant."
  - **Small line:** "From the first hello to the next booking. Automate as much or as little as you want."
  - **Buttons:** "Start free trial →" (primary; it opens early access) and "Book a demo" (ghost).
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
- **Icons and marks:** each card's small icon (hd-one-inbox, hd-instant-quotes, hd-online-booking, hd-team-and-shifts, hd-tasks, hd-payments, hd-reviews, hd-shape-loop).
- **Motion:**
  - the letter scatter and assembly from `hero-motion.tsx`, on load and on scroll away;
  - RisingCards: 1.67s rise, 0.83s hold, 2.5s exit, a new card every 3s;
  - the HeydayLine under the panel lighting the current step.

  With reduced motion, the cards stop on one landed card.

### 3. What Heyday is (with the business types)
- **What it's for:**
  - Straight after the hero, it says plainly what Heyday is and who it's for.
  - It's also where the homepage's search wording lives. The hero headline is the owner's pain; this section carries the words people type into Google.
- **Layout:** on cream, centred under the hero, in this order: the label, the heading (an H2), one line, a row of feature links, and the business-type marquee.
- **Holding copy:**
  - **Label:** `{ what heyday is }`
  - **Heading (H2):** "The all-in-one software that runs your **events, class or service business**."
  - **Line:** "Enquiries, instant quotes, bookings and payments, your team's shifts and pay, client messages, follow-ups, reviews and rebookings, all in one automated workflow. For anyone who sells their time, skills or an experience, from one-person businesses to growing teams."
  - **Feature links** (small chips, each linking to its feature page): Instant quotes · Online booking · Payments and deposits · One inbox · Shift offers · Team pay · Follow-ups · Reviews
  - **The marquee:** "Mobile bars · Caterers · Private chefs · Photographers · DJs · Performers · Photo booths · Planners · Florists · Class hosts · Tours · Escape rooms · Cleaners · Trades · Tutors · Beauty and wellness · Fitness · Staffing agencies · and anyone who sells their time, skills or an experience"
- **Image:** none.
- **Icons and marks:** each chip has its small icon: hd-instant-quotes, hd-online-booking, hd-payments, hd-one-inbox, hd-team-and-shifts, hd-team-pay-and-expenses, hd-automations, hd-reviews.
- **Search:**
  - **Headings:** the hero headline stays the page's only H1, and this heading is the H2 that names what Heyday is.
  - **The business types:** write them once as real text, as a list whose items link to the anchors on `/who-its-for`. The moving copies that make the marquee loop are `aria-hidden` and aren't links, so search engines and screen readers see each word once.
  - **The feature chips** are real links to the feature pages, so search engines can see how the site fits together.
  - **Wording:** use the words people search for naturally, never stuffed in. For example: all-in-one business software, business automation, booking software, quoting software, event business software, class booking software, CRM and client management, staff scheduling, team pay, deposits and payments.
- **Motion:**
  - The heading and line rise in (SectionReveal), then the chips rise in turn (RevealGroup, 150ms apart).
  - The marquee drifts slowly and pauses on hover.
  - With reduced motion, everything is still.

### 3a. What do you want more of? (the goal tabs)
- **What it's for:** meet visitors at the reason they came. Five goals an owner has, each showing how Heyday gets them there, with a picture that changes to match. It's modelled on getjobber.com's "Get Noticed / Win Jobs / Work Smarter / Boost Profits" tabs.
- **Layout:** on cream.
  - The label and heading, centred, then a row of five pills. The pills are allinn buttons: 8px corners at rest, 28px on hover. The chosen pill is ink with cream text and 28px corners.
  - Under the pills, one big panel (A5, 40px corners, 1px ink outline, hard shadow), in two halves:
    - **Left, the picture area,** in the goal's colour. It holds a `HoldingImage` slot, a product illustration card (`ScreenIllustration`) and three floating stat cards, each a Magic 8 card with a label, a big number and a small change chip.
    - **Right, on paper:** the heading, one line, a dark button, a thin rule, one sourced stat, and a customer quote slot signed "Placeholder".
  - On phones the halves stack, picture first.
- **Holding copy:**
  - **Label:** `{ why they come to heyday }`
  - **Heading (H2):** "What do you want **more of**?"

  | Pill | Colour | Heading | Line | Button | Sourced stat | Stat cards (example data) | Holding image |
  |---|---|---|---|---|---|---|---|
  | More bookings | blue #93B7E8 | "Win the booking before the next business replies." | "Instant quotes, online booking and follow-ups that stop the moment they reply, so enquiries turn into bookings while you work." | "See Win the client →" | Row 1: "Quotes sent within 4 hours book 25% more often." | Enquiries this week 32 (↑ 22%) · First reply in 40 sec · Booked online 18 (↑ 13%) | a couple on a sofa booking on a phone, smiling |
  | More time | lavender #D6D0F5 | "Stop doing the admin at midnight." | "Replies drafted for you, reminders and chasing that run themselves, and one inbox for every message. You handle the exceptions." | "See how it works →" | Row 20: "Small business owners spend 11 hours a week on admin and finance." | Admin this week 3 hrs (↓ 8 hrs) · Messages answered 128 · Follow-ups sent 31 | an owner closing a laptop and heading out in the evening light |
  | More hands | sky #AEC9EE | "Fill every shift without the group chat." | "Offer the job to the right people and let the first yes take it. Clashes, travel and kit lists are checked before the day." | "See Run the day →" | none | Shifts filled 12 of 12 · Filled in 8 min · Clashes caught 3 | a crew in matching aprons setting up a bar together |
  | More money, on time | sage #9AAD92 | "Get paid without chasing anyone." | "Deposits when they book, balances collected before the day, reminders that stop once it's paid, and your team paid from the job." | "See Get paid →" | Row 6: "59% of small businesses have invoices overdue by 30+ days." | Paid on time 96% (↑ 18%) · Overdue $0 · Tips this month $640 | an owner smiling at a payment notification, a van behind them |
  | More regulars | yellow #FCFC72 | "Turn one booking into a regular." | "Next-day feedback, a referral code before the review ask, and win-back messages that go out at the right moment." | "See Get rebooked →" | Row 8: "Increasing customer retention by 5% increases profits by 25% to 95%." | Average rating 4.9 ★ · Referrals 14 (↑ 13%) · Booked again 9 | guests hugging the host at the end of a party |

  - The quote slot reads: "A real customer quote about [the goal] goes here once one is approved." Signed "Placeholder".
- **Image:** one `HoldingImage` per goal, with the art direction above. Real people mid-work, not posing.
- **Icons and marks:** none.
- **Motion:**
  - The pills change shape on hover.
  - Switching a pill swaps the panel. The stat cards, the illustration and the text rise 16px and fade in, 80ms apart, over 0.55s.
  - The section rises in as a whole (SectionReveal).
  - With reduced motion, it just switches.
- **Accessibility:** a real tab list (`role="tablist"`, `tab`, `tabpanel`). The left and right arrow keys move between pills.
- **Rule:** the floating stat cards are labelled "Illustration · example data" until real customers' numbers are approved. Never present them as results.

### 4. Statement
- **What it's for:** name the problem in one big sentence.
- **Layout:** one sentence at large size, centred, with lots of space around it.
- **Holding copy:**
  - **Label:** `{ why Heyday }`
  - **Statement:** "Six apps, a group chat and your evenings. That's how most small businesses run. **It doesn't have to be.**"
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the statement's words reveal on scroll (the existing statement word reveal, Addendum 33).

### 4a. Time, money, customers (the stats band)
- **What it's for:** three headline numbers on what a business cares about most: its time, its money and its customers. It's modelled on honeybook.com's stats band (and the idea of getjobber.com's "12 hours+ saved" and "44% revenue growth"), but in Heyday's own colours and type: not dark, no tape, no cards.
- **Layout:** a lavender #D6D0F5 block with ink text, centred.
  - The label and heading.
  - Three columns divided by thin ink lines (1.5px), stacked on phones with a line between each. No cards, no tape, no highlight behind the numbers. Each column has:
    - a Geist Mono category (TIME, MONEY, CUSTOMERS);
    - the number, large (up to about 88px), in ink, in the heading face;
    - one line;
    - the source, in small Geist Mono.
  - Under the columns, a note in a dashed outline for Heyday's own results.
- **Holding copy:**
  - **Label:** `{ what a business cares about most }`
  - **Heading (H2):** "Time back. Money in. **Happy customers.**"
  - **Time (row 20):** "11 hours": "a week on admin for the average small business owner. Heyday is built to hand it back." Source: "American Express and Small Business Saturday UK, SME Business Barometer, July 2026. 1,000 UK business owners."
  - **Money (row 1):** "25%": "more bookings when the quote goes out within 4 hours. Heyday's instant quotes are built to go out in seconds." Source: "Flashquotes, 32,000+ quoted leads from 100+ operators over 12 months. Vendor data."
  - **Customers (row 18):** "90%": "of customers want an immediate reply. Heyday answers day and night, in your words." Source: "HubSpot Research (2018), cited in HubSpot's State of Service Report 2022."
  - **Note:** "Heyday's own results go here once early-access customers have them: [X] hours saved a week · [X]% more revenue in the first year · [X] average customer rating. Until then, these sourced figures stand in. [needs approval]"
- **Rule:** Jobber's numbers are its own customers' results. Heyday doesn't have any yet, so these are sourced industry figures from `STATS-BANK.md`. When real results exist, swap in Heyday's own, in the same three places, once Jem and Russell approve them.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** the three columns rise in, 150ms apart. Yellow never touches orange, so there's no orange inside the band.

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

### 9. The AI — SUPERSEDED 15 September 2026
> Replaced by the dial below, from Russell's section 9 pack (`docs/heyday/reference/section-9`). Kept for the record: this is what shipped first, three static panels on the HeydayLine.

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

### 9. How much it does for you (the three levels)
- **What it's for:** the single biggest reason to choose Heyday over Jobber or HoneyBook. They sell automation as all-or-nothing. Every product in Heyday runs at a level the owner sets, and they move it, not us. This section has to land that in one screen.
- **Layout:** a heading, then the dial and the task card described below. One line beneath naming the products the levels apply to. (An earlier draft had three static panels on the HeydayLine — the dial replaces them.)
- **Holding copy:**
  - **Label:** `{ the ai }`
  - **Heading:** "AI that works the way you want it to."
  - **Line:** "As much or as little as you want. Not just replies — quoting, pricing, taking bookings, ordering supplies, chasing money and every job task run at a level you set. Start where you're comfortable. Move it up when it's earned it."
  - **Note on the heading:** it is "the way **you want it to**", not "the way you do". The claim is control, not imitation — every AI product on earth says it learns your style; almost none let you decide how far it goes. Do not soften this back to "works the way you do" in a later draft.
  - **Why the heading leads with AI:** it is the word people recognise and search for, and both rivals lead with it. But the heading alone shrinks the claim to written replies, which is a fraction of what this is. **The line underneath is doing the real work** — it has to name the non-message things, or the section reads as "AI writes your emails" and the whole differentiator is lost. Never cut that line for length.
  - **The panels:**
    - **Assistant** — "It tells you what needs doing, and who should do it. You do it." Beneath, smaller: "Nothing happens without you."
    - **Semi-automatic** — "It gets everything ready and waits. You read it, you approve it, it goes." Beneath: "One click instead of twenty minutes."
    - **Fully automatic** — "It does it, and writes down what it did." Beneath: "For the jobs you've stopped thinking about."
  - **The line beneath:** "The same three choices on quoting, pricing, bookings, ordering, chasing money and every job task."
  - **Button:** "See how it works →" (ghost), linking to `/features/ai`.
- **Important:** the first level is **not** "off". Say so in the copy — it still tells you what needs doing and offers to hand it to someone. There is no dead setting at the bottom of the dial, and that is the point.
- **The image — a dial you can turn.** This replaces the three static panels. Working prototype: `reference/autonomy-dial.html`, which is the reference build, not a mock-up.
  - **The dial.** A 180° semicircular gauge, drawn in SVG on a 300×200 viewBox, centre (150,158), radius 108. A cream track, a coloured fill over it, a needle from the centre, and a paper hub. Three marked stops at the left, top and right, captioned `assistant`, `semi-auto`, `fully auto`.
  - **The fill colour changes with the level:** sage at assistant, blue at semi-auto, lavender at fully auto. The fill runs from the left stop to the needle, so the arc reads as "how much of this you have handed over".
  - **Turning it.** Three chips under the dial, one per level, and the whole thing is operable by keyboard — they are buttons with `aria-pressed`, not a drag-only control. A slider that can only be dragged fails for half the people using it.
  - **On first view only**, the dial sweeps the whole range once — assistant, then fully auto, then settles back on semi-auto — so a still screenshot is not the whole story but a reader who scrolls past learns it is a range. Fires from an IntersectionObserver at 40% visibility, roughly 260ms / 1150ms / 2100ms. It never loops.
  - **Motion values.** Six things move, and each one is doing a job — take them from the reference build rather than re-inventing:
    - the **fill** transitions `stroke-dashoffset .75s cubic-bezier(.22,1,.36,1)` and its colour `.45s`;
    - the **needle** `transform .75s cubic-bezier(.34,1.32,.5,1)` — a slight overshoot, because a real dial settles rather than stopping dead;
    - the **stop dot** for the live level takes that level's colour and scales to 1.45 on a spring, so the eye has somewhere to land;
    - a **ring pulses out of the hub** when the needle arrives (r 14→38, fading, .75s), which is what makes it feel like the dial clicked into place;
    - the **sentence and the task card** change over rather than snapping — 9px rise and fade, .42s — and the animation restarts on every change, so repeated clicks always animate;
    - the **card's flag** pops from .82 scale, which draws the eye to the one word that changed ("Needs doing" → "Ready for you" → "Done").
  - Everything above is disabled under `prefers-reduced-motion`, including the opening sweep. Nothing loops, and nothing moves unless the reader moved it.
  - **Default position: semi-automatic**, the middle. It is the most representative level and it means the page at rest shows the approve-and-go story, which is the one that sells.
- **Beside the dial: the same task, three ways.** This is what makes the dial mean anything — do not ship the dial with abstract copy next to it. One real task ("arrange transport for Friday's job"), shown as a card that changes with the level:
  - **Assistant** — a "Needs doing" flag, "Transport not arranged", the job details, and a suggested owner with an Assign button. It has still told you, and offered to delegate.
  - **Semi-automatic** — a "Ready for you" flag, "Van hire, 8am–6pm Friday", "£48.20 · cheapest of 3 quotes", and Approve / Change. Beneath a dashed rule, the trust line: **"You have approved this 11 times without changing it. Shall I start doing it myself?"**
  - **Fully automatic** — a "Done" flag, what it booked, "£48.20 paid and logged to the job · Sam and the client sent tracking", then **"Did I get this right?"** with Yes / Nearly / No.
  - Those last two cards carry the two ideas that make this product different — it asks to be promoted, and it asks whether it got it right. They belong in the image, not in a paragraph underneath.
- **Layout:** two columns inside one bordered panel — dial and chips on the left (max 340px), the level sentence and the task card on the right. One column under 760px, dial first.
- **Do not:** let the card height jump as the level changes. Reserve the space; a panel that resizes under the pointer feels broken.
- **Do not:** let this become only about written replies. The heading says AI because that is the recognisable word; the section is about every automated action in Heyday. If a draft of this page ends up with three panels all about email, it has gone wrong.
- **[needs approval]** Level names. "Assistant / Semi-automatic / Fully automatic" is the current wording. Alternatives considered: "Remind me / Ask me / Just do it", which is warmer but less clear in a nav or a settings screen where the same three words have to work.
  - **Built:** `src/components/heyday/ai-dial.tsx`, data in `AI_DIAL` in `src/lib/home-content.ts`.

### 10. Only on Heyday (sideways scroll 2) — SUPERSEDED 17 September 2026
> Russell asked for a table of the features and products instead of the
> card scroll. Kept for the record; what shipped first is below, and the
> table that replaced it is after it.

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

### 10. Only on Heyday (the table)
- **What it's for:** unchanged — the features no rival has, which people mustn't miss.
- **Layout:** the same heading block (label, "Only on Heyday" sticker, "The things **neither of them** does."), then one table, then a ghost button to `/features`.
- **The table:** three columns — Feature, What it does, Status — with a row per product group (the group's number, name and mark) heading its features.
- **Where the rows come from:** `onlyOnHeyday()` in `src/lib/heyday-features.ts`, i.e. every feature flagged `onlyOnHeyday` in the feature data. Eighteen at the time of writing, across five of the six groups (Get paid has none). **It is not a second hand-written list** — the old eight-card list had already drifted from the feature data, and this cannot.
- **What it does NOT do:** make any claim about Jobber or HoneyBook. The heading carries the comparison; naming what a rival lacks belongs on the compare pages, where every line carries the date it was checked.
- **Scrolling:** the table is the one thing on the homepage allowed to scroll sideways on a phone, inside a labelled, focusable region.
- **Built:** `OnlyOnHeyday` in `src/components/home/sections-product.tsx`.

- **Renamed 17 September 2026 (Russell).** The label was `{ only on heyday }` and the heading "The things **neither of them** does." — the label and the sticker beside it said the same four words twice. It is now `{ the extras }` and "What **else** you get.", which also covers the bonuses below. The "Only on Heyday" sticker stays: it is a site-wide device used on the feature pages and the AI page.
- **The bonus block (Russell, same day).** After the product groups, a BONUS row heading two lines: a free listing on Heyday Collective, and the Heyday app, both "Coming soon". They come from `HOME_BONUS` in `home-content.ts`, NOT from the feature data — the Collective is a separate product with its own site, and the app is a way of reaching Heyday rather than a thing Heyday does. A feature record for either would put it in the 46, in the Product menu and in the comparison grids.
- **The Collective listing is lifted out of Get found** and shown only in the bonus block, so it is not listed twice.

### 11. Who it's for, and the example stories
- **What it's for:** show that it suits every kind of business that sells time, skills or an experience, through stories rather than a list.
- **Layout:** a heading and line, a wrapped row of business-type chips, then a swipe row of seven story cards. It isn't pinned.
- **Holding copy:**
  - **Label:** `{ who it's for }`
  - **Heading:** "Built for businesses that sell **time, skills and experiences.**"
  - **Line:** "If you sell your time, your skills or an experience, it's for you."
  - **The chips:** the six kinds from the header's Who it's for panel.
  - **The story cards** (all labelled Example until real customers replace them):
    - "A mobile bartender: from one person behind the bar to a team"
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
- **What it's for:** show that Heyday grows from a one-person business to a business that runs itself.
- **Layout:** four stickers on the HeydayLine, left to right.
- **Holding copy:**
  - **Label:** `{ grows with you }`
  - **Heading:** "From doing it all yourself **to a business that runs itself.**"
  - **The four stickers** (the stages from SaaS brief section 1):
    1. **Doing it all yourself:** "Quotes, bookings and payments that give you your evenings back."
    2. **Owner-operator:** "Automations and follow-ups carry the routine."
    3. **A team:** "Shift offers, checks and pay, all in one place."
    4. **It runs itself:** "You oversee the exceptions."
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


### 14a. Heyday Collective: the free listing — ADDED 17 September 2026

- **Russell's call.** A section about the free listing, after switching and
  before the closing call to action: "boost your business even further".
- **Why here:** by this point the reader has been told what the software
  does and that moving to it is easy. The listing is the thing that comes
  on top, so it reads as "and there is this as well" rather than as another
  feature to weigh up. It is also the last argument the page makes before
  it asks for the decision, and the one neither Jobber nor HoneyBook can
  answer — they sell software, they do not send anyone customers.
- **Ground:** lavender, between Switching (cream) and the closing block (paper).
- **Layout:** two columns. Left: label `{ heyday collective }`, heading
  "And a free listing, **to boost it further.**", the line explaining what
  the Collective is, a "Coming soon" chip, three points, then a ghost
  button to `/features/marketplace-listing` and a link to `/pricing`.
  Right: a Screen illustration of the listing as the customer sees it.
- **The three points:** free with any plan (and what the Collective takes
  on a booking is still being decided); real prices and live dates, read
  from the same diary; bookings land tagged in the same diary and inbox.
- **The money:** the listing is free, but no rate is promised anywhere —
  the price in the illustration is `[PRICE TBC]` like every other price on
  the site, and the commission is `[commission TBC]`.
- **Copy:** `COLLECTIVE` in `src/lib/home-content.ts`. **Built:**
  `CollectiveBoost` in `src/components/home/sections-bottom.tsx`.

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
