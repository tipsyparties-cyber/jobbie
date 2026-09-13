# Heyday site spec, part 4: who it's for, stories, pricing and compare

This part specifies 16 pages, section by section:
- the Who it's for page;
- the stories index and all seven story pages;
- the pricing page;
- the compare hub and its five comparison pages.

Every section gives what it's for, the layout, holding copy, the image slot, the icons and marks, and the motion. **All copy here is holding copy for Jem to edit.** Anything in square brackets is a placeholder that must be decided or approved before launch: `[PRICE TBC]`, `[TBC]`, `[to confirm]`, `[needs approval]`, `[check on the day]`.

**Rules that apply to every page in this part:**
- **Features:** every feature is "Coming soon" until Jem and Russell decide otherwise.
- **Honesty:** no invented customers, names, quotes, logos, numbers, prices or ratings. Statistics come only from `STATS-BANK.md`, shown with their source through `StatBlock`.
- **Colours:** grounds use jobbie's palette only:
  - cream #F2E9E1, paper #FBF9F6, sage #9AAD92, blue #93B7E8, sky #AEC9EE, lavender #D6D0F5;
  - ink #0A0A0A for dark blocks;
  - yellow #FCFC72 only as a highlight marker;
  - orange #F26B2A only for buttons and active states.
  Section marks keep their own colours from the design brief's A11 (Get ahead orange, Get found lavender, Win the client blue, Run the day ink, Get paid sage, Get rebooked sky, It runs itself ink).
- **Buttons and cards:** the design brief's A4 (buttons) and A5 (panels, cards, stickers).
- **Motion:** follows the motion table in `HEYDAY-JOBBIE-FULL-SITE-PROMPT.md` section 5.
  - Pinned sideways scroll is homepage-only, so rows of cards here are normal swipe rows.
  - Hero sections never rise; they're readable on the first frame.
  - Reduced motion switches everything off.
- **Rival facts:** Jobber and HoneyBook facts come from `research/JOBBER-INVENTORY.md` and `research/HONEYBOOK-INVENTORY.md`, checked 13 September 2026. Check them again before publishing. Check Cherry and Flashquotes facts come only from the SaaS brief, section 6.2.

---

## `/who-its-for`: Who it's for

- **Template:** T6
- **What this page is for:** to let anyone who sells their time, skills or an experience see themselves in Heyday, then send them to the features, the group pages and the stories.
- **Title and description (for search):** "Who Heyday is for: software for event, class and service businesses" / "Heyday runs the whole business for caterers, class hosts, photographers, mobile bars, cleaners and anyone who sells their time, skills or an experience. From the first enquiry to the next booking."
- **Grounds, top to bottom:**

| Section | Ground |
|---|---|
| 1. Hero | cream |
| 2. One skill, two ways | paper |
| 3. Six kinds of business | sky |
| 4. Not on the list | paper |
| 5. Solutions by group | cream |
| 6. Grows with you | lavender |
| 7. Stories | paper |
| 8. Closing | ink |

### 1. Hero
- **What it's for:** say straight away that Heyday is for every business that sells time, skills or an experience, not one trade.
- **Layout:** two columns. Copy on the left. On the right, a three-picture collage of holding images, overlapping at slight angles.
- **Holding copy:**
  - Label: `{ who it's for }`
  - Headline: "Built for businesses that sell **time, skills and experiences**."
  - Line: "From one person doing every job to a crew on every weekend, Heyday runs the whole business, from the first enquiry to the next booking."
  - Rotating line (the existing `rotating-word.tsx`): "Built for caterers / class hosts / photographers / mobile bars / DJs / cleaners / escape rooms / you."
  - Buttons: "Start free trial" (primary; opens early access) and "Book a demo" (ghost).
- **Image:** three `HoldingImage` slots:
  - 4:5: "a bartender mid-pour at a garden party, guests blurred behind";
  - 1:1: "hands shaping clay at a pottery class";
  - 3:4: "a cleaner carrying kit up the front steps of a house".
  Art direction for every photo on this page: real people genuinely mid-work, not posing.
- **Icons and marks:** none.
- **Motion:** none on the copy. `Parallax` on the three pictures, gentle, ±40px.

### 2. One skill, two ways
- **What it's for:** show that many of these businesses sell the same skill as a service and as an experience, and that Heyday runs both in one diary. This is Heyday's gap (SaaS brief 3.1 and 6.2: nobody else sells a hire and a class from one system).
- **Layout:** a statement headline, then a two-column table-like list of five rows (service, then experience), each row a card.
- **Holding copy:**
  - Label: `{ one skill, two ways }`
  - Headline: "Sell the service **and** the experience, from one diary."
  - Rows:
    - Bartender: bar service at a wedding | a cocktail-making class
    - Photographer: shooting an event | a photography workshop
    - Chef or caterer: private dining or catering | a cooking class
    - Florist: event flowers | a flower-arranging workshop
    - Magician or entertainer: a show | a magic workshop
  - Line under the rows: "Other tools make you choose: proposals for the service, tickets for the class. Heyday runs both, plus the team who deliver them. Coming soon."
- **Image:** none.
- **Icons and marks:** `hd-instant-quotes` on the service column head, `hd-online-booking` on the experience column head.
- **Motion:** `SectionReveal` on the headline; `RevealGroup` on the five rows (150ms steps).

### 3. Six kinds of business
- **What it's for:** the six kinds the header's Who it's for panel links to, written as examples rather than a closed list. Each has an anchor.
- **Layout:** a two-column grid of six cards (card style, A5), three rows. Each card has:
  - a 3:2 `HoldingImage` at the top;
  - the kind of business, and who that means;
  - the chore that hurts most, as one line;
  - three feature links, each with its small icon.
  On phones, one column.
- **Holding copy:**
  - Label: `{ who it suits }`
  - Headline: "If you sell your time, **you'll find yourself here**."
  - Cards:

    | Anchor | Kind | Who that means | Chore line | Feature links (icons) |
    |---|---|---|---|---|
    | `#events-hospitality` | Events and hospitality | "Mobile bars, caterers, private chefs, planners, florists and more." | "Stop working out every quote by hand." | Instant quotes (`hd-instant-quotes`), Shift offers and staffing (`hd-team-and-shifts`), Payments and deposits (`hd-payments`) |
    | `#classes-experiences` | Classes and experiences | "Workshop and class hosts, team-building, tours and escape rooms." | "Stop running your classes from a spreadsheet." | Classes, tickets and private groups (`hd-online-booking`), Gift vouchers (`hd-payments`), Reviews (`hd-reviews`) |
    | `#photo-video-entertainment` | Photo, video and entertainment | "Photographers, videographers, DJs and musicians, performers and photo booths." | "Stop losing enquiries while you're working." | Missed-call capture (`hd-missed-calls`), Replies that write themselves (`hd-ai-replies`), Contracts and e-signatures (`hd-tasks`) |
    | `#home-personal-services` | Home and personal services | "Cleaners, landscapers, handymen, removals, pet care, tutors and more." | "Stop chasing clients for payment." | Online booking and instant book (`hd-online-booking`), Invoicing and chasing (`hd-payments`), One inbox (`hd-one-inbox`) |
    | `#beauty-wellness-fitness` | Beauty, wellness and fitness | "Hair and make-up artists, therapists, trainers and wellness hosts." | "Stop starting from zero every month." | Packages, memberships and regulars (`hd-automations`), Loyalty (`hd-reviews`), Follow-ups and autoresponders (`hd-automations`) |
    | `#staffing-hire` | Staffing and hire | "Event staffing agencies, rentals and anyone who supplies people or kit." | "Stop texting your whole team to fill one shift." | Shift offers and staffing (`hd-team-and-shifts`), Hiring and onboarding (`hd-tasks`), Team pay and expenses (`hd-payments`) |

- **Image:** six `HoldingImage` slots, 3:2:
  - Events and hospitality: "a caterer plating canapés at a pass, staff moving past";
  - Classes and experiences: "a class of six at a painting night, easels, the host leaning in to help";
  - Photo, video and entertainment: "a photographer crouched mid-shot at a first dance";
  - Home and personal services: "a landscaper's hands and a van tailgate, tools laid out";
  - Beauty, wellness and fitness: "a make-up artist working on a bride by a window";
  - Staffing and hire: "a line of servers in uniform getting a briefing before an event".
- **Icons and marks:** the small icons listed in the table.
- **Motion:**
  - `SectionReveal` on the headline.
  - `RevealGroup` on the six cards (150ms steps).
  - `Parallax` on each card's picture (±30px).

### 4. Not on the list
- **What it's for:** stop anyone thinking Heyday isn't for them, and name the businesses that also sell on marketplaces.
- **Layout:** one large centered sentence, then a short line with a small sticker.
- **Holding copy:**
  - Label: `{ not on the list? }`
  - Headline: "If you sell your time, your skills or an experience, **it's for you**."
  - Line: "Selling on Togather, ClassBento, Airbnb Experiences, LetsBatch or Yuup too? Bring those bookings into the same diary, and win customers back to book with you directly. Coming soon."
  - Sticker: "The rules are yours to set."
- **Image:** none.
- **Icons and marks:** `hd-shape-signal` (Get found), small and still, beside the marketplace line.
- **Motion:** `SectionReveal` on the sentence. The sticker straightens on hover (A5).

### 5. Solutions by group
- **What it's for:** show what Heyday fixes, sorted by the six groups, each linking to its group page.
- **Layout:** a three-column grid of six panels (two columns on tablet, one on phone). Each panel has:
  - its section mark, 72px and still;
  - the group name and its promise;
  - three feature links with small icons;
  - "See how →" linking to `/how-it-works/[group]`.
- **Holding copy:**
  - Label: `{ what it fixes }`
  - Headline: "Everything between the enquiry **and the encore**."
  - Panels:
    - **Get ahead** (`hd-shape-sunrise`): "Ready before the first enquiry." Links: AI setup assistant (`hd-automations`), Team management (`hd-team-and-shifts`), Integrations (`hd-tasks`).
    - **Get found** (`hd-shape-signal`): "Be the one they find, and know which efforts pay." Links: Booking page and mini-site (`hd-online-booking`), Get listed on the Heyday marketplace (`hd-online-booking`), Ads that know which bookings pay (`hd-reports`).
    - **Win the client** (`hd-shape-connect`): "Every enquiry caught, priced, followed up and booked." Links: Instant quotes (`hd-instant-quotes`), Missed-call capture (`hd-missed-calls`), Follow-ups and autoresponders (`hd-automations`).
    - **Run the day** (`hd-shape-dial`): "The planning, the team and the day itself, handled." Links: Client portal (`hd-one-inbox`), Shift offers and staffing (`hd-team-and-shifts`), On the day (`hd-tasks`).
    - **Get paid** (`hd-shape-paid`): "Every payment in. Every payout out." Links: Payments and deposits (`hd-payments`), Tips (`hd-payments`), Profit per job (`hd-reports`).
    - **Get rebooked** (`hd-shape-loop`): "Happy customers come back, and bring their friends." Links: Reviews (`hd-reviews`), Referrals (`hd-reviews`), Gift vouchers (`hd-payments`).
- **Image:** none. The marks carry it.
- **Icons and marks:** the six section marks, plus the small icons listed.
- **Motion:**
  - `SectionReveal` on the headline.
  - `RevealGroup` on the six panels.
  - Each panel's mark morphs from the sun into its shape as it comes into view, with `HeydayMark` set to the shape. It's still once it has morphed.

### 6. Grows with you
- **What it's for:** show the growth path from SaaS brief section 1, and that Heyday is built for every stage.
- **Layout:** four stickers (A5, tilted, straightening on hover) on a horizontal `HeydayLine`. On phones, they stack vertically on a vertical line.
- **Holding copy:**
  - Label: `{ grows with you }`
  - Headline: "From doing it all yourself to **a business that runs itself**."
  - Stickers:
    1. **Doing it all yourself.** "One person selling and delivering. Instant quotes, online booking, one inbox and follow-ups stop the admin eating your evenings."
    2. **Owner-operator.** "You still deliver, with a few helpers. Shift offers, your team's pay and tips, checklists and a client portal."
    3. **A team.** "You run the business and a team delivers. Hiring and onboarding, the Command Centre, reports and AI replies."
    4. **It runs itself.** "You handle the exceptions. Automations you set, AI that drafts and asks, and alerts when something needs a person."
  - Line under: "Tipsy Parties grew this way, from one person behind a bar to a team run from one system. [team size needs approval]"
- **Image:** none.
- **Icons and marks:** `hd-shape-inf` (It runs itself), small and still, at the end of the line.
- **Motion:**
  - `HeydayLine` fills orange as the section scrolls through.
  - `RevealGroup` on the four stickers.

### 7. Stories
- **What it's for:** send people to the example story nearest their own business.
- **Layout:** a swipeable row of seven story cards (a normal swipe row with scroll snap, not pinned), with Tipsy's first. Each card has:
  - a 4:3 `HoldingImage`;
  - an "Example" or "Real story" label chip;
  - the kind of business;
  - the growth moment, as one line;
  - "Read the story →".
- **Holding copy:**
  - Label: `{ stories }`
  - Headline: "See how it works **for businesses like yours**."
  - Cards, in order:
    1. A mobile bartender (Real story): "From one person behind the bar to a team run from one system."
    2. A caterer (Example): "Staffing big events without a group chat."
    3. A class host (Example): "Filling seats, and taking private bookings in the same diary."
    4. A performer (Example): "Answering enquiries and sending quotes while performing every weekend."
    5. A photo booth company (Example): "Going from one booth to several, with a team on each."
    6. An event staffing agency (Example): "Shift offers, checks and payouts at volume."
    7. A photographer (Example): "Selling workshops alongside shoots, then hiring a second shooter."
  - Link under the row: "All stories →" (`/stories`).
- **Image:** seven `HoldingImage` slots, 4:3, each matching its story's hero art direction (see the story pages).
- **Icons and marks:** none on the cards.
- **Motion:** `SectionReveal` on the headline. The row swipes (drag or scroll) with a visible "Swipe" hint. `RevealGroup` on the first three visible cards only.

### 8. Closing
- **What it's for:** the call to action.
- **Layout:** the ink block with cream text, centered, with two buttons.
- **Holding copy:**
  - Label: `{ ready? }`
  - Headline: "Ready for **your Heyday**?"
  - Line: "Join early access and help shape it."
  - Buttons: "Start free trial" (primary) and "Book a demo" (ghost, with a cream outline).
- **Image:** none.
- **Icons and marks:** the Heyday sun (`hd-mark`), 64px, above the headline.
- **Motion:** `HeydayMark` bounces once when the block comes into view. `SectionReveal` on the copy.

---

## `/stories`: Stories

- **Template:** T7 (index variant)
- **What this page is for:** list every story, real and example, so visitors can pick the one nearest their business.
- **Title and description (for search):** "Stories: how businesses like yours could run on Heyday" / "Follow a caterer, a class host, a performer, a photo booth company, a mobile bar, a staffing agency and a photographer as they grow, and see which Heyday features they use at each stage."
- **Grounds, top to bottom:**

| Section | Ground |
|---|---|
| 1. Hero | cream |
| 2. The stories | paper |
| 3. A note on examples | paper |
| 4. Closing | ink |

### 1. Hero
- **What it's for:** say what the stories are, and that all but one are examples.
- **Layout:** one column, left-aligned. Headline, line, then a row of filter chips.
- **Holding copy:**
  - Label: `{ stories }`
  - Headline: "Businesses that **grow on Heyday**."
  - Line: "Each story follows one kind of business from doing every job itself to a business that runs itself. Tipsy Parties' story is real. The others are clearly marked examples until real customers replace them."
  - Filter chips: "All", "Events and hospitality", "Classes and experiences", "Photo, video and entertainment", "Staffing and hire".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 2. The stories
- **What it's for:** the list of stories.
- **Layout:** a grid of story cards (card style): two columns, one on phones. Tipsy's card is first and spans both columns.
  - Each card has a `HoldingImage`: 16:9 for Tipsy's, 4:3 for the rest.
  - Then a label chip ("Real story" in ink, "Example" in paper with an ink outline), the kind of business, the chore that hurts most as a headline, the growth moment, and "Read the story →".
- **Holding copy:**

| Card | Label | Headline (the chore) | Growth moment |
|---|---|---|---|
| A mobile bartender: Tipsy Parties | Real story | "From one bartender to a team run from one system." | "Bar hire for events, and cocktail classes." |
| A caterer | Example | "Stop chasing clients for final guest numbers and dietary requirements." | "Staffing big events without a group chat." |
| A class host | Example | "Stop running your classes from a spreadsheet." | "Filling seats, and taking private bookings in the same diary." |
| A performer | Example | "Stop losing enquiries while you're on stage." | "Answering enquiries and sending quotes while performing every weekend." |
| A photo booth company | Example | "Stop double-booking your booths." | "Going from one booth to several, with a team on each." |
| An event staffing agency | Example | "Stop texting your whole team to fill one shift." | "Shift offers, checks and payouts at volume." |
| A photographer | Example | "Stop chasing clients for timelines and final payments." | "Selling workshops alongside shoots, then hiring a second shooter." |

- **Image:** one `HoldingImage` per card, using each story's hero art direction.
- **Icons and marks:** none.
- **Motion:**
  - `RevealGroup` on the cards (150ms steps, capped at the seventh).
  - `Parallax` on Tipsy's wide picture only.

### 3. A note on examples
- **What it's for:** be plain about what's real.
- **Layout:** one short paragraph in Geist Mono, 13px, in a paper panel with an ink outline.
- **Holding copy:** "Only Tipsy Parties' story is real. The others show how that kind of business could run on Heyday: no invented names, quotes or numbers. We'll replace them with real customer stories as customers join. Want to be one? Tell us about your business."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 4. Closing
Same as the Who it's for page, section 8.

---

## `/stories/tipsy-parties`: A mobile bartender: Tipsy Parties

- **Template:** T7
- **What this page is for:** the one real story: Heyday is the system Tipsy Parties already runs on. Use approved numbers only.
- **Title and description (for search):** "Tipsy Parties: from one bartender to a team run on Heyday" / "How a mobile cocktail bar and cocktail class business grew from one person behind the bar to a team run from one system. The system that became Heyday."
- **Naming:** whether Tipsy can be named, and which numbers can be published, is open question 6 in the SaaS brief section 8. Build the page with Tipsy named and every number as `[needs approval]`. Keep it unpublished until Jem and Russell approve.
- **Grounds, top to bottom:**

| Section | Ground |
|---|---|
| 1. Hero | cream |
| 2. The chore | paper |
| 3. Growth stages | the sticky panel's ground changes per stage: sky, lavender, sage, cream |
| 4. Features used | paper |
| 5. Early access | ink |

### 1. Hero
- **What it's for:** introduce the business and what it sells, both ways.
- **Layout:** two columns. Copy on the left; a 4:5 `HoldingImage` on the right in a panel (A5).
- **Holding copy:**
  - Label chip: "Real story".
  - Label: `{ a mobile bartender }`
  - Headline: "From one bartender to **a team run from one system**."
  - Line: "Tipsy Parties sells bar hire for parties and weddings, and cocktail classes, in the UK and the US. Its owners built the system that runs the whole business. That system is becoming Heyday."
  - Two chips: "The service: bar hire for events" and "The experience: cocktail classes".
  - Button: "Join early access" (primary).
- **Image:** `HoldingImage` 4:5: "a Tipsy bartender shaking a cocktail at a guest's party, guests laughing in the background". Use real Tipsy photography once approved.
- **Icons and marks:** none.
- **Motion:** none on the copy. `Parallax` on the picture.

### 2. The chore
- **What it's for:** name what hurt most before the system existed.
- **Layout:** one large statement, lots of space.
- **Holding copy:**
  - Label: `{ what hurt most }`
  - Statement: "Every booking meant **dozens of steps**: the quote, the chasing, the staff, the kit, the pay. Most of them were done by hand."
  - Line: "[Russell's own words about the early days: needs approval]"
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal` on the statement.

### 3. Growth stages
- **What it's for:** follow Tipsy through the four stages, showing which features switched on at each.
- **Layout:** `StickyScroll` (B7 mechanics). Four copy blocks on the left. On the right, a sticky panel whose `ScreenIllustration` changes per stage. A vertical `HeydayLine` beside the blocks, one dot per stage. On phones, each picture sits above its block.
- **Holding copy** (each block: label, headline, two lines, feature chips):
  1. `{ doing it all yourself }`. "One person, **every job**." "It started with one person delivering the cocktail class. Instant quotes and online booking meant customers could price and book a party without a phone call." Chips: Instant quotes, Online booking and instant book, Payments and deposits.
  2. `{ owner-operator }`. "Help, **without a group chat**." "As bookings grew, shifts went out as offers that freelance bartenders accept or decline, with tips shared through a QR tip jar." Chips: Shift offers and staffing, Tips, Checklists and kit lists.
  3. `{ a team }`. "A team of **[number: needs approval]** bartenders." "Hiring, checks and onboarding run in the same system, and one inbox holds every email, WhatsApp, text and call, with AI drafting the replies." Chips: Hiring and onboarding, One inbox, Replies that write themselves.
  4. `{ it runs itself }`. "Most steps **run by themselves**." "In one booking, [23 of the 36: needs approval] business-side steps now run without anyone touching them. The owners handle the exceptions." Chips: Follow-ups and autoresponders, Reports and the Command Centre, Tasks.
- **Image:** four `ScreenIllustration` panels, labelled "Illustration · example data":
  1. The instant quote for a party: guests, hours, date, package cards, total `[example]`, "Book with deposit".
  2. A shift offer: event card, three bartenders ranked by distance and rating, "Accepted" on the first.
  3. One client thread: an email, a WhatsApp and a call note, with an AI draft underneath and "Approve and send".
  4. The morning report: bookings, money in, shifts filled, three alerts needing a person.
- **Icons and marks:** a small icon on each chip: `hd-instant-quotes`, `hd-online-booking`, `hd-payments`, `hd-team-and-shifts`, `hd-tasks`, `hd-one-inbox`, `hd-ai-replies`, `hd-automations`, `hd-reports`.
- **Motion:** `StickyScroll`. `HeydayLine` fills as each stage comes in.

### 4. Features used
- **What it's for:** link every feature in the story to its feature page.
- **Layout:** a grid of small cards (card style), four columns (two on phones), each with a small icon, the feature name, a "Coming soon" chip, and a link.
- **Holding copy:**
  - Label: `{ what they use }`
  - Headline: "The features **behind the story**."
  - Cards: Instant quotes; Online booking and instant book; Payments and deposits; Shift offers and staffing; Tips; Checklists and kit lists; Hiring and onboarding; One inbox; Replies that write themselves; Follow-ups and autoresponders; Reports and the Command Centre; Tasks.
- **Image:** none.
- **Icons and marks:** each feature's small icon.
- **Motion:** `RevealGroup` (150ms steps, capped at the seventh).

### 5. Early access
- **What it's for:** turn the story into a sign-up.
- **Layout:** the ink block. On the left, a headline and line; on the right, the `EarlyAccessForm` (name, email, kind of business, what you sell), which stores and sends nothing yet.
- **Holding copy:**
  - Label: `{ early access }`
  - Headline: "Run your business **the way Tipsy does**."
  - Line: "Join early access. Tell us what you sell and we'll show you what Heyday can take off your hands."
  - Button: "Join early access".
- **Image:** none.
- **Icons and marks:** the Heyday sun (`hd-mark`), 48px.
- **Motion:** the sun bounces on a successful sign-up.

---

## `/stories/caterer`: A caterer

- **Template:** T7
- **What this page is for:** show how a caterer could run on Heyday, from quoting per head to staffing big events. Label it "Example" throughout.
- **Title and description (for search):** "How a caterer could run on Heyday" / "Per-head quotes with menus, guest numbers and allergies in one portal, and servers and chefs staffed without a group chat. An example story."
- **Grounds:** hero cream; chore paper; stages with a sticky panel that changes sky, lavender, sage, cream; features paper; early access ink.

### 1. Hero
- **What it's for:** introduce the kind of business and what it sells.
- **Layout:** as the Tipsy story's hero.
- **Holding copy:**
  - Label chip: "Example".
  - Label: `{ a caterer }`
  - Headline: "How a caterer could run on Heyday, **from the first tasting to the last plate**."
  - Line: "A catering business that sells private dining and event catering, and runs the odd cooking class."
  - Chips: "The service: catering and private dining" and "The experience: a cooking class".
  - Button: "Join early access".
- **Image:** `HoldingImage` 4:5: "a caterer plating at a busy pass during an event, servers reaching in".
- **Icons and marks:** none.
- **Motion:** none on the copy. `Parallax` on the picture.

### 2. The chore
- **What it's for:** name the chore that hurts most.
- **Layout:** a statement.
- **Holding copy:**
  - Label: `{ what hurts most }`
  - Statement: "Stop chasing clients for **final guest numbers and dietary requirements**."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 3. Growth stages
- **What it's for:** the four stages, ending on the growth moment, "staffing big events without a group chat".
- **Layout:** `StickyScroll`, as the Tipsy story.
- **Holding copy:**
  1. `{ doing it all yourself }`. "Quotes **per head**, not per hour of your evening." "Menus, add-ons and staffing priced by guest count and date, with a deposit taken in the same step." Chips: Instant quotes, Payments and deposits, Follow-ups and autoresponders.
  2. `{ taking on help }`. "Guest numbers **in one place**." "The client confirms guest numbers, menu choices and allergies in their portal, and the shopping list builds itself from their choices." Chips: Client portal and event planning, Checklists and kit lists.
  3. `{ a team }`. "Big events, **no group chat**." "Shifts go to servers and chefs as offers they accept or decline, ranked by distance and reliability, with clash checks before anyone's booked twice." Chips: Shift offers and staffing, On the day, Team pay and expenses.
  4. `{ it runs itself }`. "You handle **the exceptions**." "Reminders, balance chasing and next-day feedback run by themselves, and the morning report shows the profit on every event." Chips: Invoicing and chasing, Reviews, Profit per job.
- **Image:** four `ScreenIllustration` panels, "Illustration · example data":
  1. a per-head quote with three menu cards and add-ons;
  2. the client portal with guest count, menu choices and an allergy list;
  3. a shift offer for a large event, with servers ranked;
  4. an event's profit line: income, staff, food, margin.
- **Icons and marks:** chip icons: `hd-instant-quotes`, `hd-payments`, `hd-automations`, `hd-one-inbox`, `hd-tasks`, `hd-team-and-shifts`, `hd-reviews`, `hd-reports`.
- **Motion:** `StickyScroll`, `HeydayLine`.

### 4. Features used
- **What it's for:** link every feature in the story.
- **Layout:** as the Tipsy story.
- **Holding copy:**
  - Headline: "The features **behind the story**."
  - Cards: Instant quotes; Payments and deposits; Follow-ups and autoresponders; Client portal and event planning; Checklists and kit lists; Shift offers and staffing; On the day; Team pay and expenses; Invoicing and chasing; Reviews; Profit per job.
- **Image:** none.
- **Icons and marks:** small icons.
- **Motion:** `RevealGroup`.

### 5. Early access
As the Tipsy story, with the headline "Cater the event. **Let Heyday run the rest.**"

---

## `/stories/class-host`: A class host

- **Template:** T7
- **What this page is for:** show how a class host could sell public tickets and private group sessions from one diary. Label it "Example".
- **Title and description (for search):** "How a class host could run on Heyday" / "Tickets for public classes, private group bookings in the same diary, waiting lists and gift vouchers. An example story."
- **Grounds:** hero cream; chore paper; stages with a sticky panel that changes sky, lavender, sage, cream; features paper; early access ink.

### 1. Hero
- **What it's for:** introduce the business.
- **Layout:** as the Tipsy story.
- **Holding copy:**
  - Label chip: "Example".
  - Label: `{ a class host }`
  - Headline: "How a class host could **fill every seat**."
  - Line: "A studio that runs public classes with tickets, and private sessions for groups and parties."
  - Chips: "The experience: public classes with tickets" and "The service: private group sessions".
  - Button: "Join early access".
- **Image:** `HoldingImage` 4:5: "a pottery class of eight, the host at the wheel mid-demonstration, clay on everyone's hands".
- **Icons and marks:** none.
- **Motion:** `Parallax` on the picture.

### 2. The chore
- **Holding copy:**
  - Label: `{ what hurts most }`
  - Statement: "Stop running your classes **from a spreadsheet**."
- **What it's for, layout, image, icons, motion:** as the caterer story.

### 3. Growth stages
- **What it's for:** ending on the growth moment, "filling seats, and taking private bookings in the same diary".
- **Layout:** `StickyScroll`.
- **Holding copy:**
  1. `{ doing it all yourself }`. "Seats that **sell themselves**." "Sessions with capacity and places left, booked and paid online, with a reminder the day before." Chips: Classes, tickets and private groups; Online booking and instant book.
  2. `{ taking on help }`. "Private groups, **same diary**." "A bachelorette party asks for a private session. It lands in the same diary as the public classes, and each guest can pay their share by link." Chips: Group bookings and split payments; Gift vouchers.
  3. `{ a team }`. "More instructors, **fewer messages**." "Classes go out as shift offers to your instructors, and their pay is worked out from the sessions they ran." Chips: Shift offers and staffing; Team pay and expenses.
  4. `{ it runs itself }`. "No more **empty seats**." "A cancelled seat goes to the next person on the waiting list, and quiet dates get offers for you to approve." Chips: Waiting lists; Fill quiet dates; Reviews.
- **Image:** four `ScreenIllustration` panels, "Illustration · example data":
  1. a week of sessions with "places left" on each;
  2. a private group booking with split-payment links;
  3. an instructor's shift offer;
  4. a waiting list moving up after a cancellation.
- **Icons and marks:** `hd-online-booking`, `hd-payments`, `hd-team-and-shifts`, `hd-automations`, `hd-reviews`.
- **Motion:** `StickyScroll`, `HeydayLine`.

### 4. Features used
- **Holding copy:** Cards: Classes, tickets and private groups; Online booking and instant book; Group bookings and split payments; Gift vouchers; Shift offers and staffing; Team pay and expenses; Waiting lists; Fill quiet dates; Reviews.
- **Everything else:** as the caterer story.

### 5. Early access
As the Tipsy story, with the headline "Teach the class. **Let Heyday fill it.**"

---

## `/stories/performer`: A performer

- **Template:** T7
- **What this page is for:** show how a performer could catch every enquiry and send quotes while performing every weekend. Label it "Example".
- **Title and description (for search):** "How a performer could run on Heyday" / "Missed-call capture, AI-drafted replies, instant quotes and contracts, so enquiries don't wait until Monday. An example story."
- **Grounds:** hero cream; chore paper; stages with a sticky panel that changes sky, lavender, sage, cream; features paper; early access ink.

### 1. Hero
- **Holding copy:**
  - Label chip: "Example".
  - Label: `{ a performer }`
  - Headline: "How a performer could **book the next show from the last one**."
  - Line: "A magician who plays parties, weddings and corporate events, and runs magic workshops."
  - Chips: "The service: shows and parties" and "The experience: magic workshops".
  - Button: "Join early access".
- **Image:** `HoldingImage` 4:5: "a magician mid-trick at a kid's party, children leaning in".
- **Layout, icons, motion:** as the Tipsy story.

### 2. The chore
- **Holding copy:** Label `{ what hurts most }`; statement: "Stop losing enquiries **while you're on stage**."

### 3. Growth stages
- **What it's for:** ending on the growth moment, "answering enquiries and sending quotes while performing every weekend".
- **Holding copy:**
  1. `{ doing it all yourself }`. "Every call, **caught**." "Miss a call mid-show and the caller gets a text written for who they are, with a call-back reminder for you." Chips: Missed-call capture; One inbox.
  2. `{ taking on help }`. "Replies that **write themselves**." "Heyday drafts every reply from the conversation and the booking. You read it between sets and tap send." Chips: Replies that write themselves; Instant quotes.
  3. `{ a team }`. "A second act, **no admin**." "Bigger events get a second performer through a shift offer, with the contract signed and the deposit taken in one step." Chips: Shift offers and staffing; Contracts and e-signatures; Payments and deposits.
  4. `{ it runs itself }`. "Simple replies, **handled**." "Once you trust it, simple enquiries get answered by themselves, inside the rules you set." Chips: AI autopilot levels (coming soon); Follow-ups and autoresponders.
- **Image:** four `ScreenIllustration` panels, "Illustration · example data":
  1. a missed-call text going out, with the call-back reminder;
  2. an AI draft under an enquiry, with "Approve and send";
  3. a contract and deposit on one screen;
  4. the AI level setting, with levels 1, 2 and 3 as chips.
- **Icons and marks:** `hd-missed-calls`, `hd-one-inbox`, `hd-ai-replies`, `hd-instant-quotes`, `hd-team-and-shifts`, `hd-tasks`, `hd-payments`, `hd-automations`.
- **Layout and motion:** `StickyScroll`, `HeydayLine`.

### 4. Features used
- **Holding copy:** Cards: Missed-call capture; One inbox; Replies that write themselves; Instant quotes; Shift offers and staffing; Contracts and e-signatures; Payments and deposits; Follow-ups and autoresponders; The AI.

### 5. Early access
Headline: "Do the show. **Let Heyday book the next one.**"

---

## `/stories/photo-booth`: A photo booth company scaling up

- **Template:** T7
- **What this page is for:** show how a photo booth company could go from one booth to several, with a team on each. Label it "Example".
- **Title and description (for search):** "How a photo booth company could scale on Heyday" / "Packages and add-ons priced instantly, every booth in one diary, kit lists, and a team on each booth. An example story."
- **Grounds:** hero cream; chore paper; stages with a sticky panel that changes sky, lavender, sage, cream; features paper; early access ink.

### 1. Hero
- **Holding copy:**
  - Label chip: "Example".
  - Label: `{ a photo booth company }`
  - Headline: "How a photo booth company could go **from one booth to several**."
  - Line: "Booth hire for weddings and parties, plus branded activations for companies."
  - Chips: "The service: booth hire" and "The service: branded activations".
  - Button: "Join early access".
- **Image:** `HoldingImage` 4:5: "guests in props mid-laugh at a photo booth, the attendant adjusting the camera".

### 2. The chore
- **Holding copy:** Label `{ what hurts most }`; statement: "Stop **double-booking your booths**."

### 3. Growth stages
- **What it's for:** ending on the growth moment, "going from one booth to several, with a team on each".
- **Holding copy:**
  1. `{ doing it all yourself }`. "Packages, **priced in seconds**." "Hours, backdrops, prints and add-ons priced instantly, and booked against real availability." Chips: Instant quotes; Online booking and instant book.
  2. `{ taking on help }`. "Nothing left **in the van**." "Every booking comes with a kit list and a checklist, so the right props and prints go out." Chips: Checklists and kit lists; On the day.
  3. `{ a team }`. "One diary, **every booth**." "Each booth has its own place in one diary, and each booking goes to an attendant as a shift offer." Chips: Scheduling and one diary; Shift offers and staffing; Team pay and expenses.
  4. `{ it runs itself }`. "Every guest, **a lead**." "A QR code on the photo gallery lets guests follow you or book their own, with their consent, and the morning report shows profit per booth." Chips: Guest capture at events (coming soon); Profit per job; Reviews.
- **Image:** four `ScreenIllustration` panels, "Illustration · example data":
  1. a package picker with add-on cards;
  2. a kit list with ticked items;
  3. the diary with three booths as rows;
  4. a gallery page with a "Book your own" QR code.
- **Icons and marks:** `hd-instant-quotes`, `hd-online-booking`, `hd-tasks`, `hd-team-and-shifts`, `hd-payments`, `hd-reports`, `hd-reviews`.

### 4. Features used
- **Holding copy:** Cards: Instant quotes; Online booking and instant book; Checklists and kit lists; On the day; Scheduling and one diary; Shift offers and staffing; Team pay and expenses; Guest capture at events; Profit per job; Reviews.

### 5. Early access
Headline: "Run the booths. **Let Heyday run the bookings.**"

---

## `/stories/event-staffing-agency`: An event staffing agency

- **Template:** T7
- **What this page is for:** show how a staffing agency could run shift offers, checks and payouts at volume. Label it "Example".
- **Title and description (for search):** "How an event staffing agency could run on Heyday" / "Shift offers that fill themselves, hiring and checks, and team pay at volume. An example story."
- **Grounds:** hero cream; chore paper; stages with a sticky panel that changes sky, lavender, sage, cream; features paper; early access ink.

### 1. Hero
- **Holding copy:**
  - Label chip: "Example".
  - Label: `{ an event staffing agency }`
  - Headline: "How a staffing agency could **fill every shift**."
  - Line: "An agency that supplies servers, bartenders and event crew to caterers, venues and planners."
  - Chips: "The service: staff for other people's events".
  - Button: "Join early access".
- **Image:** `HoldingImage` 4:5: "a crew in black uniforms getting a briefing in a venue kitchen before service".

### 2. The chore
- **Holding copy:** Label `{ what hurts most }`; statement: "Stop texting your whole team **to fill one shift**."

### 3. Growth stages
- **What it's for:** ending on the growth moment, "shift offers, checks and payouts at volume".
- **Holding copy:**
  1. `{ doing it all yourself }`. "Price lists **for regular clients**." "Quotes by staff and hours, with price lists for the caterers and venues that book you every month." Chips: Instant quotes; Packages, memberships and regulars.
  2. `{ taking on help }`. "The first yes **takes the shift**." "Offers go to the right people, ranked by distance, reliability and rating, with clash and travel checks." Chips: Shift offers and staffing; Scheduling and one diary.
  3. `{ a team }`. "Hiring **at volume**." "Applicants screened, interviews booked, checks done and contracts signed in one place, ready for their first shift." Chips: Hiring and onboarding; Team management.
  4. `{ it runs itself }`. "Payday **without spreadsheets**." "Pay is worked out from the shifts worked, payouts go out, and complaints are settled fairly with a manager signing off." Chips: Team pay and expenses; Complaints settled fairly; Reports and the Command Centre.
- **Image:** four `ScreenIllustration` panels, "Illustration · example data":
  1. a client price list;
  2. a shift offer going to ranked staff;
  3. an applicant pipeline;
  4. a pay run summary.
- **Icons and marks:** `hd-instant-quotes`, `hd-automations`, `hd-team-and-shifts`, `hd-tasks`, `hd-payments`, `hd-reports`.
- **Note for the build:** hiring checks are built for UK rules at Tipsy; US checks (Form I-9 and Form W-9) are still to build. Keep the copy general.

### 4. Features used
- **Holding copy:** Cards: Instant quotes; Packages, memberships and regulars; Shift offers and staffing; Scheduling and one diary; Hiring and onboarding; Team management; Team pay and expenses; Complaints settled fairly; Reports and the Command Centre.

### 5. Early access
Headline: "Supply the people. **Let Heyday run the rota.**"

---

## `/stories/photographer`: A photographer

- **Template:** T7
- **What this page is for:** show how a photographer could sell workshops alongside shoots, then hire a second shooter. Label it "Example".
- **Title and description (for search):** "How a photographer could run on Heyday" / "Packages, contracts and deposits in one step, workshops in the same diary, and a second shooter when you need one. An example story."
- **Grounds:** hero cream; chore paper; stages with a sticky panel that changes sky, lavender, sage, cream; features paper; early access ink.

### 1. Hero
- **Holding copy:**
  - Label chip: "Example".
  - Label: `{ a photographer }`
  - Headline: "How a photographer could **spend more time behind the camera**."
  - Line: "A wedding and event photographer who also runs photography workshops."
  - Chips: "The service: wedding and event photography" and "The experience: photography workshops".
  - Button: "Join early access".
- **Image:** `HoldingImage` 4:5: "a photographer kneeling mid-shot during a ceremony, the couple soft in the background".

### 2. The chore
- **Holding copy:** Label `{ what hurts most }`; statement: "Stop chasing clients for **timelines and final payments**."

### 3. Growth stages
- **What it's for:** ending on the growth moment, "selling workshops alongside shoots, then hiring a second shooter".
- **Holding copy:**
  1. `{ doing it all yourself }`. "Booked, signed and paid **in one go**." "The couple picks a package, signs the contract and pays the deposit in one step, with the balance on a payment plan." Chips: Instant quotes; Contracts and e-signatures; Payments and deposits.
  2. `{ taking on help }`. "Workshops, **same diary**." "Sell seats in your workshops next to your shoots, so a Saturday wedding and a Sunday class never clash." Chips: Classes, tickets and private groups; Client portal and event planning.
  3. `{ a team }`. "A second shooter, **sorted**." "Big weddings get a second shooter through a shift offer, with their pay worked out from the booking." Chips: Shift offers and staffing; Team pay and expenses.
  4. `{ it runs itself }`. "Referrals, **then reviews**." "A happy couple gets a referral code first, then the review ask, and anniversary messages bring them back." Chips: Referrals; Reviews; Campaigns and off-peak offers.
- **Image:** four `ScreenIllustration` panels, "Illustration · example data":
  1. package, contract and deposit on one screen;
  2. the diary with a wedding and a workshop side by side;
  3. a second-shooter shift offer;
  4. the thumbs-up, referral code, review ask sequence.
- **Icons and marks:** `hd-instant-quotes`, `hd-tasks`, `hd-payments`, `hd-online-booking`, `hd-one-inbox`, `hd-team-and-shifts`, `hd-reviews`, `hd-automations`.

### 4. Features used
- **Holding copy:** Cards: Instant quotes; Contracts and e-signatures; Payments and deposits; Classes, tickets and private groups; Client portal and event planning; Shift offers and staffing; Team pay and expenses; Referrals; Reviews; Campaigns and off-peak offers.

### 5. Early access
Headline: "Take the pictures. **Let Heyday take the admin.**"

---

## `/pricing`: Pricing

- **Template:** T8
- **What this page is for:** show plan structure, what's in each plan, fees and reassurance openly, and turn visitors into early-access sign-ups. Prices stay `[PRICE TBC]` until the business model is decided (SaaS brief 3.6a and question 5).
- **Title and description (for search):** "Heyday pricing: plans for every stage of your business" / "Try Heyday free and pick a plan later. Plans that grow with you from doing it all yourself to a business that runs itself, with card fees shown up front."
- **Grounds, top to bottom:**

| Section | Ground |
|---|---|
| 1. Hero and toggle | cream |
| 2. Plan cards | cream |
| 3. Bigger business | blue |
| 4. Card fees | paper |
| 5. Add-ons | paper |
| 6. Compare every feature | paper |
| 7. Reassurance | sage |
| 8. FAQ | paper |
| 9. Closing | ink |

### 1. Hero and toggle
- **What it's for:** the promise, and the billing toggle.
- **Layout:** centered headline and line, then a monthly and yearly toggle (a pill switch; the active side is orange).
- **Holding copy:**
  - Label: `{ pricing }`
  - Headline: "Try Heyday free. **Pick a plan later.**"
  - Line: "Join early access today. When Heyday opens, you choose the plan that fits the stage you're at, and move up when you grow. [trial length and card requirement to confirm]"
  - Toggle: "Monthly" / "Yearly: save [TBC]".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none. The toggle only changes state.

### 2. Plan cards
- **What it's for:** three plans that follow the growth path. The names and contents are suggestions from SaaS brief 3.6 and 3.8, for Jem and Russell to decide.
- **Layout:** three panels (A5) side by side (stacked on phones), equal height. Each has:
  - the plan name, then a one-line "for the business that…" tagline;
  - the price (`[PRICE TBC]` / month), with a small "billed monthly" or "billed yearly" note;
  - a button;
  - "Everything in [the plan below], plus:" with five or six bullets, each with a small icon.

  The middle card has a slot for a "Most popular" sticker, hidden until it's true.
- **Holding copy:**
  - **Solo** (suggested name): "For the business that does it all itself." `[PRICE TBC]`. Button "Join early access". Bullets:
    - instant quotes the customer can adjust;
    - online booking and payments;
    - one inbox for email, WhatsApp, texts and calls;
    - follow-ups and reminders;
    - reviews and referrals;
    - AI replies as drafts you approve (AI level 1).
  - **Crew** (suggested name): "For owners who deliver with a few helpers." `[PRICE TBC]`. Button "Join early access". "Everything in Solo, plus":
    - shift offers and staffing;
    - team pay and tips;
    - hiring and onboarding;
    - checklists and kit lists;
    - the client portal;
    - AI that learns from your corrections (AI level 2).
  - **Operator** (suggested name): "For a team that runs without you in the room." `[PRICE TBC]`. Button "Book a demo". "Everything in Crew, plus":
    - the Command Centre and reports;
    - profit per job;
    - advanced pricing (busy-date and off-peak prices);
    - the AI control panel;
    - AI autopilot for simple messages (AI level 3) `[or as an add-on: to confirm]`.
  - Small print under the cards: "Plans, names and prices are being finalized. Every feature is coming soon."
- **Image:** none.
- **Icons and marks:** a small icon per bullet (`hd-instant-quotes`, `hd-online-booking`, `hd-one-inbox`, `hd-automations`, `hd-reviews`, `hd-ai-replies`, `hd-team-and-shifts`, `hd-payments`, `hd-tasks`, `hd-reports`). On each card's head, the small still section mark of the stage it suits: Solo `hd-shape-connect`, Crew `hd-shape-dial`, Operator `hd-shape-inf`.
- **Motion:** `RevealGroup` on the three cards, once, as they come in. Nothing else moves.

### 3. Bigger business
- **What it's for:** the door for branches and franchises: the suggested "Group" tier.
- **Layout:** a full-width band, copy on the left and a button on the right.
- **Holding copy:**
  - Headline: "Running **branches or a franchise**?"
  - Line: "Areas, branches and partners on one system, with a setup specialist. [Group plan to confirm]"
  - Button: "Book a demo" (dark).
- **Image:** none.
- **Icons and marks:** `hd-shape-loop`, small and still.
- **Motion:** `SectionReveal`.

### 4. Card fees
- **What it's for:** show payment fees openly, the way Jobber does.
- **Layout:** a simple two-column list in a panel.
- **Holding copy:**
  - Label: `{ fees, up front }`
  - Headline: "Card fees, **shown before you sign up**."
  - Rows:
    - Card payments: `[TBC]`
    - Pay by bank: `[TBC]`
    - Tap to pay: `[TBC]` (coming soon)
    - Payouts to your team: `[TBC]`
  - Line: "Bookings you bring in from other marketplaces: `[fee to confirm; the suggestion is no fee]`."
- **Image:** none.
- **Icons and marks:** `hd-payments`.
- **Motion:** none.

### 5. Add-ons
- **What it's for:** the paid extras that cost money to run (SaaS brief 3.6a).
- **Layout:** three small cards in a row.
- **Holding copy:**
  - Label: `{ add-ons }`
  - Headline: "Add what **you need, when you need it**."
  - Cards (each "Coming soon", `[PRICE TBC]`):
    - "AI receptionist: answers calls and texts, takes messages, books."
    - "Extra phone and WhatsApp numbers."
    - "Message bundles: more texts and WhatsApps each month."
- **Image:** none.
- **Icons and marks:** `hd-missed-calls`, `hd-one-inbox`, `hd-automations`.
- **Motion:** `RevealGroup`.

### 6. Compare every feature
- **What it's for:** the full comparison table, grouped by the six groups.
- **Layout:** a `ComparisonTable` with a header row (Solo, Crew, Operator) that stays pinned while the table scrolls.
  - Each group is a collapsible section with its section mark (small, still) and name.
  - Cells show a tick, a dash, or a short note.
  - Every cell is marked as a suggestion from SaaS brief 3.6 and 3.8 where the briefs say, and `[TBC]` everywhere else.
  - On phones, the table scrolls sideways inside its own container.
- **Holding copy:**
  - Label: `{ every feature }`
  - Headline: "Compare **every feature**."

| Group and feature | Solo | Crew | Operator |
|---|---|---|---|
| **Get ahead** (`hd-shape-sunrise`) | | | |
| AI setup assistant | [TBC] | [TBC] | [TBC] |
| Policies and procedures | [TBC] | [TBC] | [TBC] |
| Team management | – (suggested) | ✓ (suggested) | ✓ (suggested) |
| Integrations | [TBC] | [TBC] | [TBC] |
| **Get found** (`hd-shape-signal`) | | | |
| Booking page and mini-site | ✓ (suggested) | ✓ | ✓ |
| Get listed on the Heyday marketplace | [TBC] | [TBC] | [TBC] |
| Sell everywhere, one diary | [TBC] | [TBC] | [TBC] |
| Campaigns and off-peak offers | [TBC] | [TBC] | [TBC] |
| Ads that know which bookings pay | [TBC] | [TBC] | ✓ (suggested) |
| Guest capture at events | [TBC] | [TBC] | [TBC] |
| **Win the client** (`hd-shape-connect`) | | | |
| Instant quotes | ✓ (suggested) | ✓ | ✓ |
| Online booking and instant book | ✓ (suggested) | ✓ | ✓ |
| Classes, tickets and private groups | [TBC] | [TBC] | [TBC] |
| Packages, memberships and regulars | [TBC] | [TBC] | [TBC] |
| Enquiries and lead types | [TBC] | [TBC] | [TBC] |
| Follow-ups and autoresponders | ✓ (suggested) | ✓ | ✓ |
| Missed-call capture | [TBC] | [TBC] | [TBC] |
| Replies that write themselves | Level 1 (suggested) | Levels 1–2 (suggested) | Levels 1–3 (suggested, or add-on) |
| AI receptionist | Add-on (suggested) | Add-on | Add-on |
| Contracts and e-signatures | [TBC] | [TBC] | [TBC] |
| Group bookings and split payments | [TBC] | [TBC] | [TBC] |
| **Run the day** (`hd-shape-dial`) | | | |
| One inbox | ✓ (suggested) | ✓ | ✓ |
| Client portal and event planning | [TBC] | ✓ (suggested) | ✓ |
| Client records | ✓ (suggested) | ✓ | ✓ |
| Call notes and follow-ups | [TBC] | [TBC] | [TBC] |
| Scheduling and one diary | ✓ (suggested) | ✓ | ✓ |
| Shift offers and staffing | – (suggested) | ✓ (suggested) | ✓ |
| Checklists and kit lists | [TBC] | ✓ (suggested) | ✓ |
| On the day | [TBC] | [TBC] | [TBC] |
| Tasks | [TBC] | [TBC] | [TBC] |
| Hiring and onboarding | – (suggested) | ✓ (suggested) | ✓ |
| Time tracking | [TBC] | [TBC] | [TBC] |
| **Get paid** (`hd-shape-paid`) | | | |
| Payments and deposits | ✓ (suggested) | ✓ | ✓ |
| Tips | [TBC] | ✓ (suggested) | ✓ |
| Invoicing and chasing | ✓ (suggested) | ✓ | ✓ |
| Team pay and expenses | – (suggested) | ✓ (suggested) | ✓ |
| Profit per job | – (suggested) | – (suggested) | ✓ (suggested) |
| Reports and the Command Centre | – (suggested) | – (suggested) | ✓ (suggested) |
| **Get rebooked** (`hd-shape-loop`) | | | |
| Reviews | ✓ (suggested) | ✓ | ✓ |
| Referrals | [TBC] | [TBC] | [TBC] |
| Gift vouchers | [TBC] | [TBC] | [TBC] |
| Loyalty | [TBC] | [TBC] | [TBC] |
| Fill quiet dates | [TBC] | [TBC] | [TBC] |
| Waiting lists | [TBC] | [TBC] | [TBC] |
| Complaints settled fairly | [TBC] | [TBC] | [TBC] |

  - Line under the table: "Every feature is coming soon. 'Suggested' marks follow the plan structure we're testing; nothing is final."
- **Image:** none.
- **Icons and marks:** the six section marks on the group heads, small and still.
- **Motion:** none. The header row is simply sticky; no rise on rows.

### 7. Reassurance
- **What it's for:** lower the risk of trying Heyday. Every item is a promise, so each stays `[to confirm]` until Jem and Russell agree it.
- **Layout:** three stickers (A5) in a row, the maximum per screen, plus one line under them.
- **Holding copy:**
  - Label: `{ no catch }`
  - Headline: "Try it **without the risk**."
  - Stickers:
    - "Money back if it's not for you. [guarantee to confirm]"
    - "A free setup call for everyone. [to confirm]"
    - "Your price, locked. [price lock to confirm]"
  - Line: "Real people to help, at the hours you work, including evenings and weekends. [support hours to confirm]"
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `RevealGroup` on the stickers. They straighten on hover.

### 8. FAQ
- **What it's for:** answer the questions both rivals' pricing pages answer, honestly.
- **Layout:** an `FAQ` accordion, one column, max 65 characters wide.
- **Holding copy:**
  - Label: `{ questions }`
  - Headline: "Pricing **questions**."
  1. "Can I try Heyday for free?" / "Heyday opens with early access. Join now and we'll let you know when you can start. [trial length to confirm]"
  2. "Do I need a card to start?" / "[TBC]"
  3. "Which plan is right for me?" / "Pick by the stage you're at. Solo if you do it all yourself, Crew if you deliver with helpers, Operator if a team delivers and you run the business. You can move up as you grow. [plan names to confirm]"
  4. "Can I change plans later?" / "[TBC]"
  5. "What are the card fees?" / "They're shown on this page before you sign up. [rates TBC]"
  6. "Do you charge on bookings from other marketplaces?" / "[to confirm: the suggestion is no fee on bookings you bring in from other platforms]"
  7. "Is the AI extra?" / "Every plan drafts replies for you to approve. Higher plans add AI that learns from your corrections, and AI that handles simple messages on its own within your rules. [plan split to confirm]"
  8. "Can you help me move from the tool I use now?" / "Yes: bring your clients and bookings with you, and talk to a real person when you need one. [to confirm]"
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none. The accordion opens and closes without rising.

### 9. Closing
As the Who it's for page, section 8.

---

## `/compare`: Compare

- **Template:** T9 (hub)
- **What this page is for:** give researchers an honest starting point for comparing Heyday with the tools they already know.
- **Title and description (for search):** "Heyday vs HoneyBook, Jobber, Check Cherry, Flashquotes and spreadsheets" / "Honest, dated comparisons of Heyday with the tools event, class and service businesses use now, including where the other tool is better."
- **Grounds, top to bottom:**

| Section | Ground |
|---|---|
| 1. Hero | cream |
| 2. The comparisons | paper |
| 3. How we compare | paper |
| 4. Closing | ink |

### 1. Hero
- **What it's for:** set the tone: honest, dated, fair.
- **Layout:** one column, left-aligned.
- **Holding copy:**
  - Label: `{ compare }`
  - Headline: "Heyday vs the tools **you're weighing up**."
  - Line: "Honest comparisons with the date we checked them, including where the other tool is better. Heyday is coming soon; they're here today."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 2. The comparisons
- **What it's for:** one card per rival.
- **Layout:** a grid of five cards (card style), two columns, with rival names as text and no logos. Each card has two short lines, a "Checked 13 September 2026" chip, and "See the comparison →".
- **Holding copy:**
  - **vs HoneyBook.** "Choose HoneyBook if you want a proven client and proposal tool today." / "Choose Heyday if you also run a team who deliver, or sell classes as well as services."
  - **vs Jobber.** "Choose Jobber for field service depth: routes, dispatch and job costing." / "Choose Heyday if you run events, classes or experiences, priced per guest and staffed by freelancers."
  - **vs Check Cherry.** "Choose Check Cherry for event booking built around your trade today." / "Choose Heyday if you want the team's pay, classes and the aftercare in the same place."
  - **vs Flashquotes.** "Choose Flashquotes for fast quotes for mobile businesses, with a free plan." / "Choose Heyday if you want the whole workflow after the quote, from staffing to rebooking."
  - **vs spreadsheets.** "Keep spreadsheets if you have a handful of bookings a month." / "Choose Heyday when the admin starts eating your evenings."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `RevealGroup` on the cards.

### 3. How we compare
- **What it's for:** say how the pages are kept honest.
- **Layout:** a short paragraph in a panel.
- **Holding copy:** "We check every rival's own pages on the date shown and link to them. Where they're better, we say so. Heyday's features are coming soon, and we mark them that way. Spotted something out of date? Tell us and we'll fix it."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 4. Closing
As the Who it's for page, section 8.

---

## `/compare/honeybook`: Heyday vs HoneyBook

- **Template:** T9
- **What this page is for:** an honest comparison for businesses on HoneyBook, or weighing it up. Facts from `research/HONEYBOOK-INVENTORY.md`, **checked 13 September 2026: check again before publishing.**
- **Title and description (for search):** "Heyday vs HoneyBook: an honest comparison" / "How Heyday compares with HoneyBook for event, class and service businesses: pricing, features, the team, classes and where HoneyBook is better. Checked [date]."
- **Grounds, top to bottom:**

| Section | Ground |
|---|---|
| 1. Hero | cream |
| 2. At a glance | paper |
| 3. Feature by feature | paper |
| 4. Where HoneyBook is better | sky |
| 5. Where Heyday is different | lavender |
| 6. Switching | cream |
| 7. FAQ | paper |
| 8. Closing | ink |

### 1. Hero
- **What it's for:** frame the comparison.
- **Layout:** one column. A "Checked 13 September 2026" chip under the headline.
- **Holding copy:**
  - Label: `{ heyday vs honeybook }`
  - Headline: "Heyday vs HoneyBook: **the whole workflow, not just the paperwork**."
  - Line: "HoneyBook is a proven tool for managing clients, proposals and payments. Heyday is built for businesses that also run a team who deliver, and sell classes as well as services. Heyday is coming soon."
  - Buttons: "Join early access" and "See all comparisons".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 2. At a glance
- **What it's for:** the summary table.
- **Layout:** a two-column `ComparisonTable`, with a "Checked" date under it and links to the sources.
- **Holding copy:**

| | HoneyBook | Heyday |
|---|---|---|
| Built for | "Anyone with clients": creatives, planners, photographers, venues | Event, entertainment, activity, class and service businesses, from one person to a team |
| Plans (US) | Starter $29, Essentials $49, Premium $109 a month billed yearly ($36, $59, $129 monthly) | [PRICE TBC] |
| Trial | 30 days, no card | Early access [trial to confirm] |
| Guarantee | 60-day money-back guarantee | [to confirm] |
| Card fees | 2.9% + 25¢ on the comparison table; its pricing page also says "from 2.7% + 10¢", which is its Tap to Pay rate [check on the day] | [TBC] |
| Available | Today | Coming soon |

- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 3. Feature by feature
- **What it's for:** a grid grouped by the six groups. HoneyBook cells use only what the inventory confirms: "Yes", "Partly" (with a note), "Add-on", "Not stated" or "No".
- **Layout:** a `ComparisonTable` in six collapsible sections, each with its small still section mark. It scrolls sideways on phones.
- **Holding copy:**

| Feature | HoneyBook (checked 13 Sep 2026) | Heyday |
|---|---|---|
| **Get ahead** | | |
| Help moving from your old tool | Yes: free file setup and account migration | Coming soon |
| AI that sets things up for you | Partly: an AI automations builder on Essentials and Premium | Coming soon: an AI setup assistant that reads your website, prices and emails |
| **Get found** | | |
| Lead and booking forms | Yes: lead forms and embeddable contact forms | Coming soon: a booking page with the instant quote built in |
| A marketplace listing | Not stated as a listing tied to live prices [check on the day] | Coming soon: the Heyday marketplace, with real prices and live availability |
| Ad tracking | Listed integrations with Google Ads and Facebook Conversions | Coming soon: real booking value sent back to your ads |
| **Win the client** | | |
| Prices worked out by guests, hours, travel and date | Partly: clients choose packages and add-ons; no per-guest calculation stated [check on the day] | Coming soon: instant quotes the customer can adjust |
| Proposal, contract and deposit in one step | Yes | Coming soon |
| Automated follow-ups | Yes: automations on Essentials and Premium, plus AI follow-up suggestions | Coming soon: follow-ups that change with the lead |
| One inbox including WhatsApp | Partly: email, plus texts and calls through the Business Phone add-on (US); WhatsApp not stated | Coming soon: email, WhatsApp, texts and calls in one thread |
| Classes with tickets and capacity | Partly: mini sessions and a scheduler; ticketed classes not stated | Coming soon: classes, tickets and private groups |
| **Run the day** | | |
| Client portal | Yes | Coming soon |
| Scheduling and calendar sync | Yes, including round-robin for team meetings | Coming soon |
| Shift offers to the people who deliver | Not stated: team members are office users | Coming soon |
| Check-in on the day, kit and shopping lists | Not stated | Coming soon |
| **Get paid** | | |
| Deposits, payment plans, tips | Yes | Coming soon |
| Paying your team | Not stated | Coming soon: team pay, tips shared, payouts |
| Profit per job | Yes: profits by project | Coming soon |
| **Get rebooked** | | |
| Review requests | Partly: "gather and share testimonials" | Coming soon: referral code first, then the review ask |
| Referral rewards for your customers | Not stated: its referral scheme is for its own users | Coming soon |
| Gift vouchers | Not stated | Coming soon |

- **Image:** none.
- **Icons and marks:** the six section marks on the group heads.
- **Motion:** none.

### 4. Where HoneyBook is better
- **What it's for:** say plainly where HoneyBook is ahead.
- **Layout:** a list of five short cards (card style).
- **Holding copy:**
  - Label: `{ where they're ahead }`
  - Headline: "Where **HoneyBook is better** today."
  - Cards:
    - "It's here now. HoneyBook is a mature product; Heyday is coming soon."
    - "A big template gallery, with kits for 17 industries and paid partner templates."
    - "About 40 integration pages, including QuickBooks, Zapier, Zoom, Calendly and Canva."
    - "Banking built in: HoneyBook Finance, with a business account, savings and loans for eligible US members."
    - "Trade extras: client galleries for photographers and floor plans for venues."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `RevealGroup`.

### 5. Where Heyday is different
- **What it's for:** Heyday's edge, with every item marked "Coming soon".
- **Layout:** four stickers (only three visible at once: a swipe row on phones) plus a line.
- **Holding copy:**
  - Label: `{ where heyday's different }`
  - Headline: "Built for businesses **with a team who deliver**."
  - Stickers:
    - "Shift offers, team pay and tips for the people on the job."
    - "Services and classes in one diary."
    - "Prices worked out per guest, hour, distance and date."
    - "WhatsApp in the same inbox, with AI drafts that know the booking."
  - Line: "All coming soon."
- **Image:** none.
- **Icons and marks:** `hd-team-and-shifts`, `hd-online-booking`, `hd-instant-quotes`, `hd-one-inbox`.
- **Motion:** `RevealGroup`. The stickers straighten on hover.

### 6. Switching
- **What it's for:** the switching plan.
- **Layout:** four steps on a horizontal `HeydayLine` (vertical on phones).
- **Holding copy:**
  - Label: `{ switching }`
  - Headline: "Switching is the part everyone dreads. **So we made it easy.**"
  - Steps:
    1. "Bring your clients and bookings with you. [import method to confirm]"
    2. "Let the AI suggest your prices, packages and messages. Coming soon."
    3. "Connect your calendar and payments."
    4. "Go live, with a real person on hand. [support hours to confirm]"
- **Image:** none.
- **Icons and marks:** `hd-tasks`, `hd-ai-replies`, `hd-online-booking`, `hd-mark`.
- **Motion:** `HeydayLine` fills as the steps come in; `RevealGroup` on the steps.

### 7. FAQ
- **Layout:** an `FAQ` accordion.
- **Holding copy:**
  1. "Can I keep using HoneyBook while I try Heyday?" / "Yes. Join early access and compare side by side."
  2. "Will my templates come across?" / "[TBC]"
  3. "Does Heyday do proposals and contracts like HoneyBook?" / "Yes, the proposal, contract and deposit happen in one step. Coming soon."
  4. "When was this page checked?" / "13 September 2026, against HoneyBook's own pages. [update on publishing]"
- **Motion:** none.

### 8. Closing
As the Who it's for page, section 8.

---

## `/compare/jobber`: Heyday vs Jobber

- **Template:** T9
- **What this page is for:** an honest comparison for service businesses on Jobber or weighing it up. Facts from `research/JOBBER-INVENTORY.md`, **checked 13 September 2026: check again before publishing.**
- **Title and description (for search):** "Heyday vs Jobber: an honest comparison" / "How Heyday compares with Jobber for event, class and service businesses: pricing, quotes per guest, freelance crews, classes and where Jobber is better. Checked [date]."
- **Grounds:** hero cream; at a glance paper; feature by feature paper; where Jobber is better sky; where Heyday is different lavender; switching cream; FAQ paper; closing ink.

### 1. Hero
- **Holding copy:**
  - Label: `{ heyday vs jobber }`
  - Headline: "Heyday vs Jobber: **for events, classes and experiences too**."
  - Line: "Jobber is built for home service businesses, and it's very good at it. Heyday is built for businesses that price per guest, run classes, and staff events with freelancers, as well as home services. Heyday is coming soon."
  - Buttons: "Join early access" and "See all comparisons".
- **Layout, image, icons, motion:** as the HoneyBook page.

### 2. At a glance
- **Holding copy:**

| | Jobber | Heyday |
|---|---|---|
| Built for | Home service businesses | Event, entertainment, activity, class and service businesses |
| Plans (US, no commitment) | Core $49 (1 user), Connect from $139, Grow from $199, Plus from $499 (5 users) a month; lower with a commitment or yearly billing; extra users $29 a month | [PRICE TBC] |
| Add-ons | Marketing Suite $99, AI Receptionist $29, Pipeline $49 a month (its pricing page; its features page shows different prices) | [PRICE TBC] |
| Trial | 14 days on Grow, no card | Early access [trial to confirm] |
| Card fees | 2.9% + 30¢; Tap to Pay 2.7% + 30¢; bank payments 1% | [TBC] |
| Available | Today | Coming soon |

- **Layout, motion:** as the HoneyBook page.

### 3. Feature by feature
- **Holding copy:**

| Feature | Jobber (checked 13 Sep 2026) | Heyday |
|---|---|---|
| **Get ahead** | | |
| Help moving from your old tool | Yes: data import and onboarding sessions, depending on plan | Coming soon |
| AI that suggests how to run things | Yes: suggested automations | Coming soon: an AI setup assistant |
| **Get found** | | |
| A website | Yes: websites included on all plans | Coming soon: a booking page with the instant quote built in |
| Google Business Profile | Yes: included on every plan | [TBC] |
| A marketplace listing | No Jobber marketplace for customers stated | Coming soon: the Heyday marketplace |
| **Win the client** | | |
| Quotes | Yes: line items, optional add-ons, markups, templates, deposits | Coming soon: priced per guest, hour, travel and date, adjusted live by the customer |
| Per-guest and per-hour pricing | Not stated: quotes are line items [check on the day] | Coming soon |
| AI receptionist | Yes: $29 a month add-on | Coming soon: missed-call messages written for who called |
| WhatsApp in the inbox | Not stated: two-way texting on Grow and up | Coming soon |
| Classes with tickets and capacity | Not stated [check on the day] | Coming soon |
| **Run the day** | | |
| Scheduling, dispatch and routes | Yes, including route optimization and GPS | Coming soon: one diary with clash and travel checks |
| Client portal | Yes: Client Hub | Coming soon |
| Freelance and subcontractor crews with shift offers | Not stated [check on the day] | Coming soon |
| Time tracking and checklists | Yes: time tracking and job forms on Connect and up | Coming soon |
| **Get paid** | | |
| Invoicing, payments, tips, instant payouts | Yes | Coming soon |
| Paying your team | Through integrations (Gusto, Paychex, SequiPay); no built-in payroll found | Coming soon: team pay, tips shared, payouts |
| Job costing | Yes: on Grow and up | Coming soon: profit per job |
| **Get rebooked** | | |
| Reviews, referrals, campaigns | Yes: add-ons, or in Marketing Suite | Coming soon: referral code first, then the review ask |
| Gift vouchers | Not found | Coming soon |

- **Layout, icons, motion:** as the HoneyBook page.

### 4. Where Jobber is better
- **Holding copy:**
  - Headline: "Where **Jobber is better** today."
  - Cards:
    - "It's here now, with a mature mobile app, available in Spanish for team members."
    - "Field service depth: route optimization, GPS tracking, dispatch and automatic time tracking."
    - "A large app marketplace, with over 150 listings, plus Zapier and an open API."
    - "Websites and Google Business Profile tools included on every plan."
    - "An AI receptionist you can switch on today."
- **Layout, motion:** as the HoneyBook page.

### 5. Where Heyday is different
- **Holding copy:**
  - Headline: "Built for **events, classes and crews**."
  - Stickers:
    - "Quotes priced per guest, hour, distance and date, which the customer adjusts live."
    - "Classes and tickets in the same diary as your services."
    - "Freelance crews who accept or decline shift offers, with pay and tips worked out."
    - "WhatsApp in the same inbox, and a listing on the Heyday marketplace."
  - Line: "All coming soon."
- **Icons and marks:** `hd-instant-quotes`, `hd-online-booking`, `hd-team-and-shifts`, `hd-one-inbox`.

### 6. Switching
As the HoneyBook page, section 6.

### 7. FAQ
- **Holding copy:**
  1. "I'm a home service business. Is Heyday for me?" / "Yes. Trades and home services are Heyday customers too. Coming soon."
  2. "Does Heyday do route optimization?" / "Not at launch. Travel times and clash checks, yes; full route planning comes later."
  3. "Can I bring my Jobber clients across?" / "[import method to confirm]"
  4. "When was this page checked?" / "13 September 2026, against Jobber's own pages. [update on publishing]"

### 8. Closing
As the Who it's for page, section 8.

---

## `/compare/check-cherry`: Heyday vs Check Cherry

- **Template:** T9
- **What this page is for:** an honest comparison with the closest rival for event businesses. Facts only from SaaS brief 6.2 (studied 13 September 2026). **Everything else is `[check on the day]`.**
- **Title and description (for search):** "Heyday vs Check Cherry: an honest comparison" / "How Heyday compares with Check Cherry for mobile bars, photo booths, DJs and other event businesses. Checked [date]."
- **Grounds:** hero cream; at a glance paper; feature by feature paper; where Check Cherry is better sky; where Heyday is different lavender; switching cream; FAQ paper; closing ink.

### 1. Hero
- **Holding copy:**
  - Label: `{ heyday vs check cherry }`
  - Headline: "Heyday vs Check Cherry: **from the booking to the payout**."
  - Line: "Check Cherry is built for event pros, and it's the closest tool to Heyday. Heyday adds the team's pay, classes alongside hires, and the aftercare. Heyday is coming soon."
- **Layout, image, icons, motion:** as the HoneyBook page.

### 2. At a glance
- **Holding copy:**

| | Check Cherry | Heyday |
|---|---|---|
| Built for | Event pros: 27 trade pages, including bartending | Event, entertainment, activity, class and service businesses |
| Plans | $29 ($39 monthly) / $59 / $139 a month, priced by upcoming bookings, with unlimited staff accounts (SaaS brief 6.2, checked 13 September 2026) [check on the day] | [PRICE TBC] |
| Trial | 14 days | Early access [trial to confirm] |
| Guarantee | 60-day money-back guarantee | [to confirm] |
| Card fees | [check on the day] | [TBC] |
| Available | Today | Coming soon |

### 3. Feature by feature
- **Holding copy:**

| Feature | Check Cherry (from its site, 13 Sep 2026) | Heyday |
|---|---|---|
| Quotes by guest-count tiers, staff counts, travel zones and sales tax | Yes | Coming soon |
| Abandoned bookings flagged as "hot leads" | Yes | Coming soon: half-finished checkout reminders and lead types |
| Live booking visitors can try | Yes: "Try Live Booking" | [TBC] |
| Staff claim or request shifts, check in and out | Yes | Coming soon |
| Paying staff | Not stated on its pages | Coming soon |
| Classes | Partly: "mini sessions", framed around photography | Coming soon: classes, tickets and private groups |
| Gift vouchers | Not stated | Coming soon |
| Referral rewards for your customers | Not stated | Coming soon |
| One inbox including WhatsApp | [check on the day] | Coming soon |
| Everything else | [check on the day] | |

### 4. Where Check Cherry is better
- **Holding copy:**
  - Headline: "Where **Check Cherry is better** today."
  - Cards:
    - "It's here now, built for event pros from day one."
    - "27 trade pages, each in that trade's own words."
    - "A live booking demo visitors can try without signing up."
    - "Unlimited staff accounts on every plan."

### 5. Where Heyday is different
- **Holding copy:**
  - Headline: "The team, **the class and the aftercare**."
  - Stickers:
    - "Team pay, shared tips and payouts."
    - "Hire and class in one diary: bar hire and a cocktail class from one system."
    - "Referral code first, then the review ask."
  - Line: "All coming soon."
- **Icons and marks:** `hd-team-and-shifts`, `hd-online-booking`, `hd-reviews`.

### 6. Switching
As the HoneyBook page, section 6.

### 7. FAQ
- **Holding copy:**
  1. "I run a mobile bar. Which is better for me?" / "Check Cherry is ready today. Heyday is built by a mobile bar business, Tipsy Parties, and adds your team's pay and classes. Coming soon."
  2. "Can I bring my Check Cherry bookings across?" / "[import method to confirm]"
  3. "When was this page checked?" / "13 September 2026. [update on publishing]"

### 8. Closing
As the Who it's for page, section 8.

---

## `/compare/flashquotes`: Heyday vs Flashquotes

- **Template:** T9
- **What this page is for:** an honest comparison with the quoting tool for mobile businesses. Facts only from SaaS brief 6.2 and `STATS-BANK.md` row 1. **Everything else is `[check on the day]`.**
- **Title and description (for search):** "Heyday vs Flashquotes: an honest comparison" / "How Heyday compares with Flashquotes for mobile bars, coffee carts, photo booths and DJs: quotes, fees and what happens after the booking. Checked [date]."
- **Grounds:** hero cream; at a glance paper; feature by feature paper; where Flashquotes is better sky; where Heyday is different lavender; switching cream; FAQ paper; closing ink.

### 1. Hero
- **Holding copy:**
  - Label: `{ heyday vs flashquotes }`
  - Headline: "Heyday vs Flashquotes: **after the quote, the whole workflow**."
  - Line: "Flashquotes is fast quoting for mobile businesses. Heyday quotes instantly too, then runs the staffing, the day, the pay and the rebooking. Heyday is coming soon."

### 2. At a glance
- **Holding copy:**

| | Flashquotes | Heyday |
|---|---|---|
| Built for | "The CRM for mobile businesses" | Event, entertainment, activity, class and service businesses |
| Plans | Free forever / $49 / $99 / $199 a month, plus a 3% fee charged to the supplier's client (SaaS brief 6.2, checked 13 September 2026) [check on the day] | [PRICE TBC] |
| Fees | A 3% fee charged to the supplier's client | [TBC] |
| Available | Today | Coming soon |

### 3. Feature by feature
- **Holding copy:**

| Feature | Flashquotes (from its site, 13 Sep 2026) | Heyday |
|---|---|---|
| Instant per-guest quotes | Yes: "150 guests × your rate. Instant." | Coming soon |
| Good, better, best packages | Yes: "Bronze, silver, gold. They pick. You pour." | Coming soon |
| Shift offers and team pay | [check on the day] | Coming soon |
| Classes with tickets | [check on the day] | Coming soon |
| One inbox including WhatsApp | [check on the day] | Coming soon |
| Everything else | [check on the day] | |

### 4. Where Flashquotes is better
- **Holding copy:**
  - Headline: "Where **Flashquotes is better** today."
  - Cards:
    - "It's here now, with a free-forever plan."
    - "It publishes real data from its customers: quotes sent within 4 hours book 25% more often." This one uses `StatBlock` with STATS-BANK row 1: "Flashquotes homepage, based on 32,000+ quoted leads from 100+ established operators over the past 12 months. Flashquotes' own customer data."
    - "Built by operators, for mobile businesses."

### 5. Where Heyday is different
- **Holding copy:**
  - Headline: "The quote is **where Heyday starts**."
  - Stickers:
    - "Staffing, the day and the team's pay, after the booking."
    - "Classes and experiences in the same diary."
    - "Aftercare: referral code first, then the review ask."
  - Line: "All coming soon. Heyday's fees: [TBC]."
- **Icons and marks:** `hd-team-and-shifts`, `hd-online-booking`, `hd-reviews`.

### 6. Switching
As the HoneyBook page, section 6.

### 7. FAQ
- **Holding copy:**
  1. "Will Heyday add a fee to my customer's bill?" / "[TBC]"
  2. "Is there a free plan?" / "[to confirm]"
  3. "When was this page checked?" / "13 September 2026. [update on publishing]"

### 8. Closing
As the Who it's for page, section 8.

---

## `/compare/spreadsheets`: Heyday vs spreadsheets

- **Template:** T9
- **What this page is for:** for businesses still running on spreadsheets, notes and a group chat: fair about what spreadsheets do well, clear about what they cost.
- **Title and description (for search):** "Heyday vs spreadsheets: when it's time to switch" / "Spreadsheets are free and flexible, until the admin eats your evenings. See what they can't do, and what Heyday does instead."
- **Grounds:**

| Section | Ground |
|---|---|
| 1. Hero | cream |
| 2. At a glance | paper |
| 3. What a spreadsheet can't do | paper |
| 4. Where spreadsheets are better | sky |
| 5. The cost of doing it by hand | sage |
| 6. Switching | cream |
| 7. Closing | ink |

### 1. Hero
- **Holding copy:**
  - Label: `{ heyday vs spreadsheets }`
  - Headline: "Six apps, a group chat **and your evenings**."
  - Line: "That's how most small businesses run. It doesn't have to be."
- **Layout, image, icons, motion:** as the HoneyBook page.

### 2. At a glance
- **Holding copy:**

| | Spreadsheets | Heyday |
|---|---|---|
| Cost | Free | [PRICE TBC] |
| Quotes | You work them out by hand | Coming soon: instant quotes the customer can adjust |
| Bookings | Typed in after a phone call | Coming soon: booked and paid online |
| Follow-ups | When you remember | Coming soon: sent by themselves, stopping when they reply |
| Your team | A group chat | Coming soon: shift offers they accept or decline |
| Payments | Chased by hand | Coming soon: deposits, balances and reminders |

### 3. What a spreadsheet can't do
- **What it's for:** show the jobs a spreadsheet leaves to you.
- **Layout:** a grid of six small cards with small icons.
- **Holding copy:**
  - Headline: "What a spreadsheet **leaves to you**."
  - Cards:
    - "Reply to an enquiry at 11pm." (`hd-ai-replies`)
    - "Price a party of 80 while you're driving." (`hd-instant-quotes`)
    - "Chase a deposit on the right day." (`hd-payments`)
    - "Offer a shift to the right person first." (`hd-team-and-shifts`)
    - "Remind a guest the day before." (`hd-automations`)
    - "Ask for a review when they're happiest." (`hd-reviews`)
- **Motion:** `RevealGroup`.

### 4. Where spreadsheets are better
- **Holding copy:**
  - Headline: "Where **spreadsheets are better**."
  - Cards:
    - "They're free."
    - "You already know how to use them."
    - "For a handful of bookings a month, they're plenty."

### 5. The cost of doing it by hand
- **What it's for:** the proof, with sources.
- **Layout:** three `StatBlock`s in a row.
- **Holding copy:**
  - Headline: "What doing it by hand **costs**."
  - Stats:
    - **STATS-BANK row 3:** "Of 2,241 US companies audited, the average time to respond to a lead was 42 hours, and 23% never responded." Source: Harvard Business Review, "The Short Life of Online Sales Leads", March 2011.
    - **STATS-BANK row 20:** "Small business owners spend 11 hours a week on admin and finance tasks." Source: American Express and Small Business Saturday UK, SME Business Barometer, July 2026. 1,000 UK business owners (say it's the UK).
    - **STATS-BANK row 6:** "59% of small businesses have invoices overdue by 30+ days." Source: Intuit QuickBooks, 2026 Small Business Late Payments Report.
- **Motion:** `RevealGroup`.

### 6. Switching
- **Holding copy:**
  - Headline: "From spreadsheet to Heyday, **in an afternoon**. [time promise to confirm]"
  - Steps:
    1. "Upload your client list and bookings. [format to confirm]"
    2. "Set your prices and packages, with the AI filling in the hard parts. Coming soon."
    3. "Connect your calendar and payments."
    4. "Send your first instant quote."
- **Layout, motion:** as the HoneyBook page, section 6.

### 7. Closing
As the Who it's for page, section 8.
