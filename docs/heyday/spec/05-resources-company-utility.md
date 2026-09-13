# Heyday site spec, part 5: resources, company and utility pages

This part covers the resources hub, the three free tools (with the pricing calculator's maths and the leak-check quiz in full), templates, the guide and blog templates, and the company and utility pages. Those are About, Security, Help, Contact, Demo, Early access, Log in, the page for AI search tools, the legal placeholders and the 404. Every word here is holding copy for Jem to edit. Anything in square brackets waits for Jem or Russell. Every feature Heyday mentions is "Coming soon" until they decide otherwise.

---

## `/resources`: Resources hub

- **Template:** T12
- **What this page is for:** one place for everything free that helps a business run better, with the tools first.
- **Title and description (for search):** "Free tools, templates and guides for event, class and service businesses | Heyday" / "Price a class or event, send a proper quote and find where your business leaks bookings and money. Free, with no email needed."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), fading to paper #FBF9F6 (tools), sky #AEC9EE (templates), cream #F2E9E1 (guides and blog), paper #FBF9F6 (help and what's new), ink #0A0A0A (closing call to action)

### 1. Hero
- **What it's for:** say what's here and that it's free, with no catch.
- **Layout:** type-led hero on the left. On the right, three small tilted stickers, one for each tool.
- **Holding copy:** label `{ resources }`; headline "Free help for businesses that **sell their time**"; line "Tools, templates and guides for event, class and service businesses. No email needed."; no buttons (the cards below are the actions).
- **Image:** none.
- **Icons and marks:** stickers use hd-instant-quotes (pricing calculator), hd-tasks (quote template) and hd-shape-inf small (leak check).
- **Motion:** `SectionReveal` on the headline; the stickers straighten on hover.

### 2. Free tools
- **What it's for:** send people straight to the three tools.
- **Layout:** three cards in a row (one column on phones). Each card has an icon, a title, one line and a verb button.
- **Holding copy:** label `{ free tools }`; headline "Work it out in **two minutes**".
  - **Class and event pricing calculator:** "Find the price that covers your costs and pays you properly." Button: "Work out my price".
  - **Quote template:** "Fill in the details and copy a clear, professional quote." Button: "Make a quote".
  - **The leak check:** "Sixteen quick questions that show where bookings and money slip away." Button: "Start the check".
- **Image:** none.
- **Icons and marks:** hd-instant-quotes, hd-tasks, hd-reports.
- **Motion:** `RevealGroup`, three cards stepping 150ms apart.

### 3. Templates
- **What it's for:** the ready-to-use templates.
- **Layout:** a two-column list of template cards.
- **Holding copy:** label `{ templates }`; headline "Start from something **that works**"; items "Quote template", "Follow-up messages (email and WhatsApp)" and "Invoice template"; button "See all templates" (ghost).
- **Image:** none.
- **Icons and marks:** hd-tasks, hd-one-inbox, hd-payments.
- **Motion:** `RevealGroup`.

### 4. Guides and blog
- **What it's for:** the reading library, small and honest.
- **Layout:** three guide cards, then one line linking to the blog.
- **Holding copy:** label `{ guides }`; headline "Guides from people who **run an events business**"; cards "How to price a class", "Running a mobile bar" and "Hiring event staff", each marked "Coming soon" until written; line "Read the blog →".
- **Image:** `HoldingImage` on each guide card, 4:3. Art direction: a real business mid-task (a host setting out a class table, a bartender stocking a bar, a team briefing before an event). People working, not posing.
- **Icons and marks:** none.
- **Motion:** `RevealGroup`; `Parallax` on the three pictures.

### 5. Help and what's new
- **What it's for:** where to get help, and what's changed.
- **Layout:** two side-by-side panels (A5 panel style).
- **Holding copy:** left panel: headline "Need a person?", line "Real people, at the hours you work [support hours to confirm].", button "Get help" (ghost). Right panel: headline "What's new", line "The first updates arrive with early access.", button "See what's new" (ghost).
- **Image:** none.
- **Icons and marks:** hd-one-inbox (help), hd-shape-loop small (what's new).
- **Motion:** `SectionReveal`.

### 6. Closing call to action
- **What it's for:** turn a helpful visit into a sign-up.
- **Layout:** `CTABlock` on ink.
- **Holding copy:** headline "Ready to stop doing it **all by hand**?"; buttons "Start free trial" (primary) and "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** the Heyday sun, small, cream rays.
- **Motion:** `SectionReveal`.

---

## `/tools`: Free tools index

- **Template:** T12 (list variant)
- **What this page is for:** the list of free tools, so each one can be found and shared.
- **Title and description (for search):** "Free pricing calculator, quote template and business check | Heyday" / "Free tools for event, class and service businesses. No sign-up, no email wall."
- **Grounds, top to bottom:** cream #F2E9E1 (hero), paper #FBF9F6 (the list), ink #0A0A0A (closing call to action)

### 1. Hero
- **What it's for:** say what the tools are and that they're free.
- **Layout:** short type-led hero.
- **Holding copy:** label `{ free tools }`; headline "Tools that **do the maths** for you"; line "Free, and nothing to sign up for."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 2. The tools
- **What it's for:** one card per tool, with more room than the hub gives.
- **Layout:** three large cards stacked, each with an icon, a title, two lines, "What you'll get" and a verb button.
- **Holding copy:**
  - **Class and event pricing calculator:** "Enter your costs, your team and your time. See the price that pays you properly, and what a marketplace commission takes." What you'll get: "Your price, your price per person, and the break-even number of seats." Button: "Work out my price".
  - **Quote template:** "A clear quote with packages, a deposit and your terms, ready to copy or print." What you'll get: "A quote you can send today." Button: "Make a quote".
  - **The leak check:** "Sixteen questions across the six parts of running a booking business." What you'll get: "A score for each part, and what to fix first." Button: "Start the check".
- **Image:** none.
- **Icons and marks:** hd-instant-quotes, hd-tasks, hd-reports.
- **Motion:** `RevealGroup`.

### 3. Closing call to action
- **What it's for:** hand off to the product.
- **Layout:** `CTABlock` on ink.
- **Holding copy:** headline "Want this done for you on **every booking**?"; buttons "Start free trial" and "Book a demo".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

---

## `/tools/class-and-event-pricing-calculator`: Class and event pricing calculator

- **Template:** T13
- **What this page is for:** let a business work out a price that covers every cost and pays them properly, then show how Heyday prices every quote this way automatically.
- **Title and description (for search):** "Class and event pricing calculator (free) | Heyday" / "Work out what to charge for a class, workshop or event service. Includes your team, materials, travel, marketplace commission and card fees."
- **Grounds, top to bottom:** paper #FBF9F6 throughout (tool page), with an ink #0A0A0A closing block

### 1. Tool header
- **What it's for:** say what the tool does in one line and get out of the way.
- **Layout:** a short header above the tool. No hero picture.
- **Holding copy:** label `{ free tool }`; headline "What should you **charge**?"; line "Put in your costs and the calculator does the rest. Nothing is saved or sent."
- **Image:** none.
- **Icons and marks:** hd-instant-quotes, small, beside the label.
- **Motion:** none.

### 2. The calculator
- **What it's for:** the tool itself, with the tool first and no email wall.
- **Layout:** two columns on desktop, inputs on the left and a live result panel on the right that stays in view (a normal sticky element). One column on phones, with the result below.
- **Inputs** (holding labels, with example values pre-filled and marked "example"):
  1. **What are you pricing?** A toggle: "A class or experience (priced per seat)" / "A service at an event (priced per booking)".
  2. **How many people?** Seats you'll sell, or guests at the event. Example: 12.
  3. **How long?** Hours of delivery. Example: 2.
  4. **Setup and pack-down time:** hours. Example: 1.
  5. **Your team:** people × hourly pay. Example: 2 × $25. A "+ Add a role" row.
  6. **Materials per person:** ingredients, clay, flowers, drinks. Example: $8.
  7. **Fixed costs for the booking:** venue hire, equipment hire, kit. Example: $60.
  8. **Travel:** miles × cost per mile, or a flat amount. Example: 30 miles × $0.70 (example rate; the business sets its own).
  9. **Commission** if it's sold on a marketplace, as a %. Example: 0. The helper text says "Marketplaces often take a share of each booking. Check yours."
  10. **Card fees** as a %. Example: 3 (marked "example; use your provider's rate").
  11. **The profit you want,** as a % of the price. Example: 30.
- **The maths** (show it under the result, in plain words and in Geist Mono):
  - Team cost = Σ (people × hourly pay × (delivery hours + setup hours))
  - Materials = materials per person × people
  - Total cost (C) = team cost + materials + fixed costs + travel
  - Price (P) = C ÷ (1 − profit % − commission % − card fee %)
  - Price per person = P ÷ people
  - For classes, the break-even seats = fixed costs (team + fixed + travel) ÷ (price per seat − materials per seat − the fee share of a seat), rounded up
  - If profit % + commission % + card fee % reaches 100% or more, show: "Those percentages add up to the whole price. Lower the profit you want, or the commission."
- **The result panel:**
  - Big number: "Charge about **$[P]**" (rounded to the nearest $5, with the exact figure below).
  - "That's $[P ÷ people] per person."
  - For classes: "You break even at [n] seats."
  - A small table of the same booking at 20%, 30%, 40% and 50% profit.
  - "Marketplace commission on this booking: $[commission × P]." Shown only if commission > 0.
- **Holding copy:** buttons "Work out my price" (primary; the result updates live, and the button is there for keyboard users) and "Start again" (ghost).
- **Image:** none.
- **Icons and marks:** none inside the tool.
- **Motion:** none on the working parts. The big number counts up once, over 0.4s, when a value changes, and doesn't with reduced motion.

### 3. After the value (the upsell)
- **What it's for:** only now, show how Heyday does this on every quote.
- **Layout:** a panel with copy on the left and a `ScreenIllustration` on the right.
- **Holding copy:** label `{ put it into action }`; headline "Put those prices into action on **every quote**"; line "Heyday prices every enquiry from your own rules: guests, hours, travel and date, with your margin shown. Coming soon."; buttons "Join early access" (primary) and "See instant quotes" (ghost, to the Instant quotes feature page).
- **Image:** `ScreenIllustration`: an instant quote for "Saturday, 80 guests, 4 hours", with a package, two add-ons, travel, a deposit line and a "Margin 34%" chip. Labelled "Illustration · example data".
- **Icons and marks:** hd-instant-quotes as a tilted sticker on the illustration.
- **Motion:** `SectionReveal`; `Parallax` on the illustration.

### 4. Related tools
- **What it's for:** keep them going.
- **Layout:** two cards.
- **Holding copy:** "Quote template: turn your price into a quote." / "The leak check: find where bookings slip away."
- **Image:** none.
- **Icons and marks:** hd-tasks, hd-reports.
- **Motion:** `RevealGroup`.

### 5. FAQ
- **What it's for:** answer the questions people will have, honestly.
- **Layout:** `FAQ` accordion.
- **Holding copy:**
  - "Is anything I type saved?" "No. It stays on this page and disappears when you leave."
  - "Why include my own time?" "If you don't pay yourself in the price, the business only works while you do it for free."
  - "What if I sell on a marketplace too?" "Put its commission in. The calculator shows what that costs on each booking."
  - "Is this financial advice?" "No. It's a starting point. Check your own costs and taxes."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 6. Closing call to action
- **What it's for:** hand off.
- **Layout:** `CTABlock` on ink.
- **Holding copy:** headline "Stop working out prices **one enquiry at a time**"; buttons "Start free trial" and "Book a demo".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

---

## `/tools/quote-template`: Quote template

- **Template:** T13
- **What this page is for:** give a business a clear quote they can send today, and show how much faster Heyday makes it.
- **Title and description (for search):** "Free quote template for events, classes and services | Heyday" / "Fill in a clear quote with packages, add-ons, a deposit and your terms. Copy it into an email or print it. Free."
- **Grounds, top to bottom:** paper #FBF9F6 throughout, with an ink #0A0A0A closing block

### 1. Tool header
- **What it's for:** one line, then the tool.
- **Layout:** a short header.
- **Holding copy:** label `{ free template }`; headline "A quote that **gets a yes**"; line "Fill it in, then copy or print it. Nothing is saved or sent."
- **Image:** none.
- **Icons and marks:** hd-tasks, small.
- **Motion:** none.

### 2. The template
- **What it's for:** the tool.
- **Layout:** a form on the left and a live preview of the quote on the right (a paper card, 2px ink outline, 16px corners). One column on phones, with the preview under the form.
- **Fields** (holding labels):
  - **Your business:** business name, your name, email, phone, website (optional), logo upload (kept on the page only).
  - **Your client:** client name, email (optional).
  - **The booking:** what it is (for example "Cocktail bar for a 40th birthday"), date, start and finish times, location ("At yours" / "At ours" / address), number of guests or seats.
  - **What's included:** repeatable line items (item, description, quantity, price). An "Add-on" tick marks optional extras, and the preview shows add-ons as "Optional".
  - **Packages** (optional): up to three named options (for example Classic, Signature, Premium), each with its own lines. The preview shows them side by side.
  - **Travel:** amount or "Included".
  - **Tax:** % or none.
  - **Deposit:** % or amount, and when the balance is due (for example "14 days before").
  - **Valid until:** date.
  - **Terms:** a short text box, or a link to your terms. Holding helper: "Link to your own terms. We don't write them for you."
  - **Note to the client:** free text.
- **The preview:** your business details; "Quote for [client]"; the booking details; the lines or packages; subtotal, travel, tax, total; the deposit to book and the balance and its due date; valid until; terms; your note.
- **Holding copy:** buttons "Copy as text" (primary: plain text for an email or WhatsApp), "Print or save as PDF" (ghost; uses the browser's print) and "Start again" (ghost).
- **Image:** none.
- **Icons and marks:** none in the tool.
- **Motion:** none.

### 3. After the value (the upsell)
- **What it's for:** show the Heyday version: priced for you, adjustable by the client, and booked with a deposit.
- **Layout:** panel, copy left, illustration right.
- **Holding copy:** label `{ put it into action }`; headline "Now imagine it **writes itself**"; line "In Heyday, the quote is priced from your rules the moment the enquiry arrives. Your client can change guests or add-ons and book with a deposit, in one step. Coming soon."; buttons "Join early access" and "See instant quotes" (ghost).
- **Image:** `ScreenIllustration`: a customer's phone showing the quote with a guest slider (40 → 55), the total updating, and a "Book with $[deposit] deposit" button. Labelled "Illustration · example data".
- **Icons and marks:** hd-instant-quotes, hd-online-booking stickers.
- **Motion:** `SectionReveal`; `Parallax` on the illustration.
- **Statistic:** `StatBlock` with STATS-BANK row 1: "Quotes sent within 4 hours book 25% more often." Source: Flashquotes, based on 32,000+ quoted leads from 100+ operators over 12 months (its own customers: mobile bars, coffee carts, photo booths, DJs). Vendor data.

### 4. Related tools and FAQ
- **What it's for:** keep them going, and answer the obvious questions.
- **Layout:** two related cards, then a `FAQ`.
- **Holding copy:** related: "Pricing calculator", "Follow-up message templates". FAQ:
  - "Is anything saved?" "No."
  - "Can I use my own terms?" "Yes. Paste them or link to them."
  - "Should I ask for a deposit?" "Many businesses do, to hold the date. It's your call."
- **Image:** none.
- **Icons and marks:** hd-instant-quotes, hd-one-inbox.
- **Motion:** `RevealGroup` on the cards; none in the FAQ.

### 5. Closing call to action
- **Layout:** `CTABlock` on ink.
- **What it's for:** hand off.
- **Holding copy:** headline "Send the quote **while they're still looking**"; buttons "Start free trial" and "Book a demo".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

---

## `/tools/leak-check`: The leak check

- **Template:** T14
- **What this page is for:** a short quiz, built on the six groups, that shows a business where it loses bookings and money, and which features fix each gap.
- **Title and description (for search):** "The leak check: where is your business losing bookings? | Heyday" / "Answer 16 quick questions and get a score for each part of running a booking business, from getting found to getting rebooked. Free, no email."
- **Grounds, top to bottom:** cream #F2E9E1 (intro), paper #FBF9F6 (the quiz), then each results card in its group's colour, then ink #0A0A0A (closing call to action)

### 1. Intro
- **What it's for:** set expectations: short, honest, nothing saved.
- **Layout:** centred intro card (A5 panel) with the Heyday line across it showing the six groups as dots.
- **Holding copy:** label `{ the leak check }`; headline "Where is your business **leaking**?"; line "16 questions, about three minutes. You'll get a score for each part of the business, and what to fix first. Nothing is saved or sent."; button "Start the check" (primary).
- **Image:** none.
- **Icons and marks:** six section marks, small and still, on the Heyday line dots: hd-shape-sunrise, -signal, -connect, -dial, -paid, -loop.
- **Motion:** `SectionReveal` on the card. The six marks morph from the sun as the card comes into view, stepping 150ms apart.

### 2. The quiz
- **What it's for:** the questions.
- **Layout:** one question per screen. The group's section mark and name sit above the question. The `HeydayLine` along the top fills orange as you go. There are "Back" and "Next" buttons, and every answer is a large radio card. It all works by keyboard.
- **Scoring:** each answer scores 2, 1 or 0. An answer marked "Not for me" is left out of that group's total. Group score = points ÷ (2 × questions answered) × 100, rounded. Bands: 75–100 "Tight", 40–74 "Some leaks", 0–39 "Leaking".
- **The questions** (holding copy; answers score 2 / 1 / 0):

**Get ahead** (hd-shape-sunrise, orange)
1. "When someone asks for a price, how long does it take you to work it out?"
   - "It's set up. I can answer in minutes." (2)
   - "I work it out each time." (1)
   - "I check notes, calendars and spreadsheets first." (0)
2. "Where do your prices, packages and rules live?"
   - "In one system." (2)
   - "In a document or two." (1)
   - "Mostly in my head." (0)

**Get found** (hd-shape-signal, lavender)
3. "Can people see a price and book on your website without messaging you?"
   - "Yes." (2)
   - "They can send an enquiry form." (1)
   - "No, they have to get in touch." (0)
4. "Do you know which ads, posts or listings bring bookings that actually pay?"
   - "Yes, by booking value." (2)
   - "Roughly." (1)
   - "No." (0)
5. "If you sell on marketplaces, are those bookings in the same diary as your own?"
   - "Yes, automatically." (2)
   - "I copy them across by hand." (0)
   - "I don't sell on marketplaces." (Not for me)

**Win the client** (hd-shape-connect, blue)
6. "How fast does a new enquiry usually hear back from you?"
   - "Within the hour." (2)
   - "The same day." (1)
   - "The next day or later." (0)
7. "What happens when a quote goes quiet?"
   - "Follow-ups go out automatically." (2)
   - "I chase when I remember." (1)
   - "Usually nothing." (0)
8. "When you miss a call, what happens?"
   - "They get a message back, and I get a reminder to call." (2)
   - "I call back when I see it." (1)
   - "Often nothing." (0)

**Run the day** (hd-shape-dial, ink)
9. "How do you fill a shift?"
   - "I offer it and the first yes takes it." (2)
   - "I text people one by one." (1)
   - "I do it myself." (0)
10. "Where do messages from clients and your team live?"
    - "In one inbox." (2)
    - "Across two or three apps." (1)
    - "Everywhere: texts, WhatsApp, email and DMs." (0)
11. "Before the day, does everyone get the times, address and kit list without you sending them?"
    - "Yes, automatically." (2)
    - "I send them myself." (1)
    - "It's mostly in my head." (0)

**Get paid** (hd-shape-paid, sage)
12. "When do you take money?"
    - "A deposit when they book, and the balance collected automatically before the day." (2)
    - "A deposit, then I chase the balance." (1)
    - "After the job." (0)
13. "How do you work out your team's pay and tips?"
    - "Automatically, from the job." (2)
    - "In a spreadsheet." (1)
    - "By hand, at the end of the month." (0)
14. "Do you know the profit on each job?"
    - "Yes." (2)
    - "Roughly." (1)
    - "No." (0)

**Get rebooked** (hd-shape-loop, sky)
15. "After a booking, what do customers hear from you?"
    - "A feedback ask, then a referral code or a review ask." (2)
    - "Sometimes a thank-you." (1)
    - "Nothing." (0)
16. "Do past customers get offers to book again?"
    - "Yes, on a schedule." (2)
    - "Now and then." (1)
    - "No." (0)

- **Image:** none.
- **Icons and marks:** the group's section mark above each question (still). The Heyday line shows progress.
- **Motion:** none on the answer cards. Between groups, the mark above the question morphs from the previous group's shape through the sun into the next (0.9s; none with reduced motion).

### 3. Results
- **What it's for:** a score per group and what to fix, with feature links.
- **Layout:** a summary line at the top ("Your biggest leak: [group]"), then six result cards in a 3×2 grid (one column on phones). Each card is on its group's colour, with its section mark, score, band and one line. For "Some leaks" and "Leaking", it lists the features that fix it. Cards are ordered lowest score first.
- **Holding copy:** label `{ your results }`; headline "Here's where it's **slipping**"; each card: "[Group]: [score]/100 · [band]". Lines per band:
  - Tight: "This part runs well. Keep it that way."
  - Some leaks: "A few bookings or hours are slipping here."
  - Leaking: "This is where most of the time and money goes."
- **Feature links for a low score** (all say "Coming soon"):
  - **Get ahead:** AI setup assistant, Instant quotes, Policies and procedures.
  - **Get found:** Booking page and mini-site, Ads that know which bookings pay, Sell everywhere, Get listed on the Heyday marketplace.
  - **Win the client:** Enquiries and lead types, Follow-ups and autoresponders, Missed-call capture, Instant quotes, Online booking and instant book.
  - **Run the day:** Shift offers and staffing, One inbox, On the day, Checklists and kit lists, Client portal.
  - **Get paid:** Payments and deposits, Invoicing and chasing, Team pay and expenses, Tips by QR and tap, Profit per job.
  - **Get rebooked:** Reviews, Referrals, Campaigns and off-peak offers, Loyalty, Gift vouchers, Fill quiet dates.
- **Statistics on the results** (`StatBlock`, only on that group's card when it scores under 75):
  - Win the client: STATS-BANK row 2. "Firms that contacted a lead within an hour were nearly seven times as likely to qualify it." Harvard Business Review, 2011, 1.25 million US sales leads. (It measured leads *qualified*, not bookings; say so.)
  - Get paid: STATS-BANK row 6. "59% of small businesses have invoices overdue by 30+ days." Intuit QuickBooks, 2026 Small Business Late Payments Report, about 5,000 small businesses a quarter in the US, Canada, UK and Australia.
  - Get rebooked: STATS-BANK row 8. "Increasing customer retention by 5% increases profits by 25% to 95%." Bain & Company research, as summarised by Harvard Business Review, 2014, cross-industry.
- **Buttons:** "Print my results" (ghost; browser print), "Start again" (ghost), "Join early access" (primary). There's no "email me my results" until the privacy notice is agreed.
- **Image:** none.
- **Icons and marks:** each card's section mark: hd-shape-sunrise, -signal, -connect, -dial, -paid, -loop. Small feature icons beside each feature link.
- **Motion:** each card's mark morphs from the sun as its card reveals (`RevealGroup`, 150ms steps). Scores count up once. None with reduced motion.

### 4. Closing call to action
- **What it's for:** hand off.
- **Layout:** `CTABlock` on ink.
- **Holding copy:** headline "Fix the leaks **once**, and let it run"; buttons "Start free trial" and "Book a demo".
- **Image:** none.
- **Icons and marks:** the Heyday sun as the Loop, spinning slowly.
- **Motion:** `SectionReveal`; `HeydayMark` loop while on screen.

---

## `/templates`: Templates

- **Template:** T13 (gallery variant)
- **What this page is for:** ready-to-use templates a business can copy today.
- **Title and description (for search):** "Free quote, invoice and follow-up message templates | Heyday" / "Copy-ready templates for event, class and service businesses: a quote, an invoice and follow-up messages for email and WhatsApp."
- **Grounds, top to bottom:** cream #F2E9E1 (header), paper #FBF9F6 (the templates), ink #0A0A0A (closing call to action)

### 1. Header
- **What it's for:** say what's here.
- **Layout:** short header with filter chips: "All", "Quotes", "Messages", "Invoices".
- **Holding copy:** label `{ templates }`; headline "Start from something **that works**"; line "Copy them, change them, use them. Free."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

### 2. Quote template
- **What it's for:** point to the interactive quote template.
- **Layout:** a gallery card with a small preview of a filled quote.
- **Holding copy:** "Quote template: packages, add-ons, a deposit and your terms." Button: "Make a quote".
- **Image:** `ScreenIllustration`: a small quote preview. Labelled "Illustration · example data".
- **Icons and marks:** hd-tasks.
- **Motion:** `SectionReveal`.

### 3. Follow-up message templates
- **What it's for:** four messages people send every week, written to copy. Curly brackets are the parts to change.
- **Layout:** four cards, each with an Email/WhatsApp toggle, the message in a paper box, and a "Copy" button.
- **Holding copy:**
  1. **A quote that's gone quiet (day 2).**
     - Email subject: "Your quote for {date}".
     - Body: "Hi {first name}, just checking the quote for {what it is} on {date} came through. Happy to change anything. The date's still free for now. {your name}"
     - WhatsApp: "Hi {first name}, it's {your name} from {business}. Did the quote for {date} come through OK? Happy to tweak anything 👍"
  2. **Deposit reminder.**
     - Email subject: "Hold your date for {date}".
     - Body: "Hi {first name}, to hold {date} for you, the deposit of {amount} is due by {deadline}. You can pay here: {link}. {your name}"
     - WhatsApp: "Hi {first name}, a quick one: the {amount} deposit holds {date} for you. Pay here when you're ready: {link}"
  3. **The day before.**
     - Email subject: "All set for tomorrow".
     - Body: "Hi {first name}, we're all set for tomorrow. {team member} will arrive at {time} at {address}. Anything to change? Just reply. {your name}"
     - WhatsApp: "All set for tomorrow! {team member} arrives at {time}. Any changes, message here."
  4. **Thank you and feedback.**
     - Email subject: "How did it go?"
     - Body: "Hi {first name}, thank you for booking {what it was}. How did it go? One click: 👍 or 👎 {link}. {your name}"
     - WhatsApp: "Thank you for having us, {first name}! How did it go? 👍 or 👎 {link}"
- **Image:** none.
- **Icons and marks:** hd-one-inbox on the card header.
- **Motion:** none on the message boxes. `RevealGroup` on the cards.

### 4. Invoice template
- **What it's for:** a simple invoice layout to copy.
- **Layout:** one card with a preview and "Copy as text" and "Print" buttons.
- **Holding copy:** fields shown: your business details, invoice number, date, client, booking, line items, subtotal, tax, total, deposit paid, balance due and due date, how to pay, and a thank-you note. Button: "Use this invoice".
- **Image:** `ScreenIllustration`: an invoice preview. Labelled "Illustration · example data".
- **Icons and marks:** hd-payments.
- **Motion:** `SectionReveal`.

### 5. After the value, and closing call to action
- **What it's for:** show that Heyday sends all of these at the right moment by itself.
- **Layout:** a panel with the workflow-builder picture, then `CTABlock` on ink.
- **Holding copy:** panel headline "Heyday sends these **at the right moment**, by itself"; line "Set each message once: when it goes, how, and to whom. Coming soon."; button "See follow-ups" (ghost). Closing: "Stop copying and pasting"; buttons "Start free trial" and "Book a demo".
- **Image:** `heyday-workflow-builder-still.svg` (cropped to the flow and the "Customise step" panel).
- **Icons and marks:** hd-automations.
- **Motion:** `SectionReveal`; `Parallax` on the picture.

---

## `/guides` and `/guides/[slug]`: Guides

- **Template:** T15
- **What this page is for:** a small library of practical guides from people who run an events business.
- **Title and description (for search):** index "Guides for event, class and service businesses | Heyday" / "Practical guides: pricing a class, running a mobile bar, hiring event staff." Each guide: "[Guide title] | Heyday guides" / [its standfirst].
- **Grounds, top to bottom:** index: cream #F2E9E1 (header), then paper #FBF9F6. Guide pages: paper #FBF9F6 throughout, with an ink #0A0A0A call-to-action box.

### 1. Index: header and list
- **What it's for:** list the guides.
- **Layout:** header, then guide cards (picture, title, one line, reading time).
- **Holding copy:** label `{ guides }`; headline "Guides from people who **run an events business**". The first three titles, each marked "Coming soon" until written:
  - "How to price a class"
  - "Running a mobile bar"
  - "Hiring event staff"
- **Image:** `HoldingImage` 4:3 per card. Art direction: real work in progress, no stock smiles.
- **Icons and marks:** none.
- **Motion:** `RevealGroup` on the cards; `Parallax` on the pictures.

### 2. Guide page: header
- **What it's for:** title, standfirst, reading time.
- **Layout:** reading column about 65 characters wide, with a breadcrumb "Resources › Guides".
- **Holding copy:** the title as H1; a standfirst of one or two sentences; "[n] min read"; "Updated [date]".
- **Image:** `HoldingImage` 16:9 under the header.
- **Icons and marks:** none.
- **Motion:** `SectionReveal` on the header only.

### 3. Guide page: body
- **What it's for:** the reading.
- **Layout:** the reading column. Styled H2s, lists, pull-quotes (a yellow highlight behind one phrase), tables, and figures with captions.
- **Holding copy:** one clearly labelled sample, **not published and not indexed**: "How to price a class (sample layout)". It uses headings like "Start with your costs", "Pay yourself properly", "Price per seat vs private groups" and "When to raise prices", with lorem-free holding lines that describe what each part will say. Jem writes the real one.
- **Image:** figures as `HoldingImage` 3:2 where needed.
- **Icons and marks:** none.
- **Motion:** none on body text. Figures get `SectionReveal` only.

### 4. Guide page: related, and the call-to-action box
- **What it's for:** keep reading, and one gentle ask.
- **Layout:** a one-card call to action inside the column, then three related guide cards.
- **Holding copy:** box: "Heyday prices every class and booking **from your own rules**. Coming soon." Buttons: "Join early access" and "Try the pricing calculator" (ghost).
- **Image:** none.
- **Icons and marks:** hd-instant-quotes in the box.
- **Motion:** `SectionReveal` on the box.

---

## `/blog` and `/blog/[slug]`: Blog

- **Template:** T15
- **What this page is for:** news and short pieces, kept small enough for a small team to keep up.
- **Title and description (for search):** index "The Heyday blog" / "Notes on running an event, class or service business, and what's new at Heyday." Each post: "[Post title] | Heyday blog" / [its standfirst].
- **Grounds, top to bottom:** index: cream #F2E9E1, then paper #FBF9F6. Posts: paper #FBF9F6 throughout.

### 1. Index
- **What it's for:** the list of posts.
- **Layout:** header, then post cards (picture, title, date, one line), newest first.
- **Holding copy:** label `{ blog }`; headline "Notes from **the day job**"; an empty state until posts exist: "The first posts are on their way."
- **Image:** `HoldingImage` 3:2 per card.
- **Icons and marks:** none.
- **Motion:** `RevealGroup` on the cards.

### 2. Post page
- **What it's for:** the reading.
- **Layout:** the same reading layout as guides, with date and author. The author name stays a [TBC] placeholder; no invented names.
- **Holding copy:** one clearly labelled sample, **not published and not indexed**: "Sample post (layout only)".
- **Image:** `HoldingImage` 16:9 header.
- **Icons and marks:** none.
- **Motion:** header `SectionReveal`; none on the body.

### 3. Related and the call-to-action box
- **What it's for:** as for guides.
- **Layout:** as for guides.
- **Holding copy:** "Run the whole business in **one workflow**. Coming soon." Buttons: "Join early access" and "See how it works" (ghost).
- **Image:** none.
- **Icons and marks:** the Heyday sun, small.
- **Motion:** `SectionReveal`.

---

## `/about`: About

- **Template:** T16
- **What this page is for:** who's behind Heyday and why it exists. [Jem and Russell to write the story.]
- **Title and description (for search):** "About Heyday" / "Why Heyday exists: software that runs the whole business, for anyone who sells their time, skills or an experience. [About story TBC]"
- **Grounds, top to bottom:** cream #F2E9E1 (hero), fading to sage #9AAD92 (the origin), paper #FBF9F6 (grows with you), lavender #D6D0F5 (what we believe), paper #FBF9F6 (the people), ink #0A0A0A (closing call to action)

### 1. Hero
- **What it's for:** the one-line reason Heyday exists.
- **Layout:** type-led hero. The Heyday sun sits large on the right.
- **Holding copy:** label `{ about }`; headline "Software that runs **the whole business**"; line "For anyone who sells their time, their skills or an experience. [Who's behind Heyday: Jem and Russell to write.]"
- **Image:** none.
- **Icons and marks:** the Heyday sun (`HeydayMark`, large).
- **Motion:** `HeydayMark` bounces once on load (none with reduced motion).

### 2. The origin
- **What it's for:** where Heyday comes from, in Jem's and Russell's words. It doesn't mention Tipsy Parties unless they decide it should.
- **Layout:** copy on the left, picture on the right.
- **Holding copy:** label `{ where it comes from }`; headline "[Headline TBC]"; body "[Heyday's story: Jem and Russell to write]".
- **Image:** `HoldingImage` 4:5. Art direction: [TBC, to match the story].
- **Icons and marks:** none.
- **Motion:** `SectionReveal`; `Parallax` on the picture.

### 3. Grows with you
- **What it's for:** show the path Heyday offers, from doing every job yourself to a business that runs itself.
- **Layout:** four `Sticker` cards on the `HeydayLine`.
- **Holding copy:** label `{ grows with you }`; headline "From doing it all **to a business that runs itself**"; stages:
  - "Doing it all yourself": instant quotes, online booking, one inbox.
  - "Owner-operator": shift offers, team pay and tips, checklists.
  - "A team": hiring, the Command Centre, reports.
  - "It runs itself": automations you set, AI that drafts and asks.
- **Image:** none.
- **Icons and marks:** hd-instant-quotes, hd-team-and-shifts, hd-reports, hd-automations on the stickers.
- **Motion:** `RevealGroup`, 150ms steps; stickers straighten on hover; `HeydayLine` fills as it reveals.

### 4. What we believe
- **What it's for:** the product principles from the SaaS brief, section 3.5.
- **Layout:** four panels in a 2×2 grid.
- **Holding copy:** label `{ what we believe }`; headline "Software that **works the way you do**"; panels:
  - "Everything is yours to set, starting from sensible defaults."
  - "Customisable, not complicated."
  - "AI drafts, a person approves. Money and promises always pass a person."
  - "The goal: you handle the exceptions, and the rest runs."
- **Image:** none.
- **Icons and marks:** hd-automations, hd-tasks, hd-ai-replies, hd-shape-inf small.
- **Motion:** `RevealGroup`.

### 5. The people
- **What it's for:** a human face, once Jem and Russell choose what to show.
- **Layout:** team cards.
- **Holding copy:** "[Names, roles and photos: TBC by Jem and Russell]". No invented names.
- **Image:** `HoldingImage` 1:1 per person.
- **Icons and marks:** none.
- **Motion:** `RevealGroup`.

### 6. Closing call to action
- **What it's for:** hand off.
- **Layout:** `CTABlock` on ink.
- **Holding copy:** headline "Ready for **your Heyday**?"; buttons "Start free trial" and "Book a demo".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

---

## `/security`: Security

- **Template:** T16
- **What this page is for:** a plain explanation of how payments, logins and data are handled. It says only what's true, and marks everything else [to confirm].
- **Title and description (for search):** "Security at Heyday" / "How Heyday handles payments, logins and your data, in plain words."
- **Grounds, top to bottom:** paper #FBF9F6 throughout (a plain page), with an ink #0A0A0A closing block

### 1. Header
- **What it's for:** set the tone: plain and honest.
- **Layout:** short header.
- **Holding copy:** label `{ security }`; headline "Your business, **kept safe**"; line "Plain answers about payments, logins and your data. Marked [to confirm] where we're still deciding."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal` on the header only.

### 2. The answers
- **What it's for:** one short section per topic.
- **Layout:** a stack of panels, each with an icon, a heading and two or three lines.
- **Holding copy:**
  - **Payments:** "Card payments are handled by [payment provider: to confirm]. [Whether Heyday ever sees full card numbers: to confirm]."
  - **Logging in:** "[Two-factor login: to confirm]. [Sign in with Google or Apple: to confirm]."
  - **Who sees what:** "You decide what each team member can see and do, with roles and permissions." (Coming soon.)
  - **Your data is yours:** "[Export your clients, bookings and payments at any time: to confirm]."
  - **Keeping each business separate:** "[How each business's data is kept apart: to confirm]."
  - **AI and your data:** "You choose how much the AI does. It drafts, and a person approves anything involving money or promises." "[Which AI providers are used, and whether your data trains them: to confirm]."
  - **Reporting a problem:** "[Security contact: TBC]."
- **Image:** none.
- **Icons and marks:** hd-payments, hd-team-and-shifts, hd-reports, hd-ai-replies.
- **Motion:** none.

### 3. Closing call to action
- **What it's for:** hand off.
- **Layout:** `CTABlock` on ink.
- **Holding copy:** headline "Questions about security?"; buttons "Contact us" (primary) and "Book a demo" (ghost).
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

(Mark the whole page for legal and security review before it goes live.)

---

## `/help`: Help and onboarding

- **Template:** T16
- **What this page is for:** how to reach a real person, and what help there is to get set up.
- **Title and description (for search):** "Help and support | Heyday" / "Talk to a real person, get help setting up, and find answers."
- **Grounds, top to bottom:** cream #F2E9E1 (header), paper #FBF9F6 (ways to get help, FAQ), ink #0A0A0A (closing call to action)

### 1. Header
- **What it's for:** reassurance first.
- **Layout:** short type-led header.
- **Holding copy:** label `{ help }`; headline "Talk to a **real person**"; line "At the hours you actually work. [support hours to confirm]"
- **Image:** none.
- **Icons and marks:** hd-one-inbox.
- **Motion:** `SectionReveal`.

### 2. Ways to get help
- **What it's for:** the channels.
- **Layout:** three panels.
- **Holding copy:**
  - "Email: [EMAIL TBC]". Line: "We reply within [response time: to confirm]."
  - "Phone: [PHONE TBC]", shown only once there's a real number.
  - "A free setup call: [to confirm]". Line: "We'll help you bring your clients, bookings and prices across."
- **Image:** none.
- **Icons and marks:** hd-one-inbox, hd-missed-calls, hd-tasks.
- **Motion:** `RevealGroup`.

### 3. The help centre
- **What it's for:** set expectations for self-serve help.
- **Layout:** one panel.
- **Holding copy:** "The help centre opens with early access."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 4. FAQ
- **What it's for:** the questions people ask before signing up.
- **Layout:** `FAQ`.
- **Holding copy:**
  - "Is Heyday available now?" "It's opening to businesses through early access. Every feature says 'Coming soon' until it's live."
  - "Can I bring my clients and bookings from another tool?" "That's the plan. [How, and what's included: to confirm]."
  - "Do I need a card to try it?" "[To confirm]."
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

### 5. Closing call to action
- **Layout:** `CTABlock` on ink.
- **What it's for:** hand off.
- **Holding copy:** headline "Rather see it first?"; buttons "Book a demo" (primary) and "Join early access" (ghost).
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** `SectionReveal`.

---

## `/contact`: Contact

- **Template:** T16
- **What this page is for:** a simple way to get in touch.
- **Title and description (for search):** "Contact Heyday" / "Questions about Heyday? Get in touch."
- **Grounds, top to bottom:** paper #FBF9F6 throughout (form page)

### 1. Header and form
- **What it's for:** the form.
- **Layout:** header, then the form on the left and "Other ways to reach us" on the right.
- **Holding copy:** label `{ contact }`; headline "Say **hey**"; fields: first name, email, "What's it about?" (select: "A demo", "Early access", "Something else"), message; button "Send" (primary). Right panel: "[EMAIL TBC]", "[PHONE TBC]", "[support hours to confirm]".
- **Rule:** until the privacy notice and consent wording are agreed, the form stores and sends nothing. The Send button is disabled, with the line "The form opens soon. Email us at [EMAIL TBC] for now." Keep the repo's existing contact action switched off until then.
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

---

## `/demo`: Book a demo

- **Template:** T16
- **What this page is for:** book time to see Heyday with a person.
- **Title and description (for search):** "Book a Heyday demo" / "See how Heyday would run your business, from the first enquiry to the next booking."
- **Grounds, top to bottom:** cream #F2E9E1 (header), paper #FBF9F6 (the calendar)

### 1. Header and what you'll see
- **What it's for:** say what the demo covers.
- **Layout:** copy on the left, calendar on the right.
- **Holding copy:** label `{ demo }`; headline "See it run **your kind of business**"; line "[Length: TBC], with [who: TBC]."; what you'll see:
  - "The whole workflow, from the first enquiry to the next booking."
  - "How it would work for your kind of business."
  - "Your questions, answered."
- **Image:** none.
- **Icons and marks:** hd-shape-inf, small, beside the headline.
- **Motion:** `SectionReveal` on the copy only.

### 2. The calendar
- **What it's for:** pick a time.
- **Layout:** a calendar placeholder panel (A5 panel style).
- **Holding copy:** "[Booking calendar goes here: provider TBC]". Until it's connected: "Email [EMAIL TBC] to book a time."
- **Image:** none.
- **Icons and marks:** hd-online-booking.
- **Motion:** none.

---

## `/early-access`: Early access

- **Template:** T16
- **What this page is for:** what "Start free trial" opens until the product is live: a short early-access sign-up.
- **Title and description (for search):** "Join Heyday early access" / "Heyday is opening to event, class and service businesses. Join early access."
- **Grounds, top to bottom:** paper #FBF9F6 throughout (form page), cream #F2E9E1 behind the success state

### 1. The form
- **What it's for:** collect interest, honestly.
- **Layout:** a single centred panel with the form. A short "What you'll get" list sits beside it on desktop.
- **Holding copy:** label `{ early access }`; headline "Be one of the **first in**"; line "Heyday is opening to businesses a few at a time."; fields:
  1. First name
  2. Email
  3. "What kind of business is it?" (select): Events and hospitality; Classes and experiences; Photo, video and entertainment; Home and personal services; Beauty, wellness and fitness; Staffing and hire; Something else
  4. "What do you sell?" (short text)

  Button: "Join early access" (primary). What you'll get: "An invite when it opens", "Help setting up [to confirm]".
- **Rule:** store and send nothing until the privacy notice and consent wording are agreed. Until then:
  - the button is disabled;
  - the line reads "Sign-up opens soon.";
  - there's no consent checkbox until its wording is agreed.
- **Image:** none.
- **Icons and marks:** none on the form.
- **Motion:** none on the form.

### 2. Success state (once sign-up is switched on)
- **What it's for:** a warm confirmation.
- **Layout:** the panel swaps to a centred message with the Heyday sun.
- **Holding copy:** headline "You're **on the list**"; line "We'll email you when it's your turn."; buttons "Try the leak check" (ghost) and "Back to home" (ghost).
- **Image:** none.
- **Icons and marks:** the Heyday sun (`HeydayMark`).
- **Motion:** the sun bounces once (A11). None with reduced motion.

---

## `/login`: Log in

- **Template:** T16
- **What this page is for:** a placeholder until the product exists.
- **Title and description (for search):** "Log in | Heyday" / "Log in to Heyday." (not indexed)
- **Grounds, top to bottom:** paper #FBF9F6

### 1. Placeholder
- **What it's for:** tell people there's nothing to log in to yet, and where to go.
- **Layout:** a single centred panel.
- **Holding copy:** headline "Heyday opens with **early access**"; line "There's nothing to log in to just yet."; buttons "Join early access" (primary) and "Back to home" (ghost).
- **Image:** none.
- **Icons and marks:** the Heyday sun, small and still.
- **Motion:** none.

---

## `/for-ai`: About Heyday, for AI assistants

- **Template:** T16 (plain)
- **What this page is for:** a plain-text page written for AI search tools and assistants, like Jobber's llm-info, so they describe Heyday accurately.
- **Title and description (for search):** "About Heyday (for AI assistants)" / "A plain, factual description of Heyday for AI search tools and assistants."
- **Grounds, top to bottom:** paper #FBF9F6 (plain text, no motion)

### 1. The page (full text)
- **What it's for:** the whole page, written out below.
- **Layout:** one plain text column; headings and lists only.
- **Holding copy:**

> **About Heyday (for AI assistants)**
>
> Last updated: [date].
>
> **What Heyday is.** Heyday is self-serve business software (SaaS) that runs a whole events, entertainment, activity, services or class business, from the first enquiry to the rebooking. It is opening to businesses through early access. It is not generally available yet, and its features are listed as coming soon.
>
> **Who it is for.** Businesses that sell their time, their skills or an experience. Examples: mobile bars, caterers and private chefs, photographers, planners, DJs and musicians, entertainers, photo booths, florists, workshop and class hosts, team-building, tours and escape rooms, home services and cleaning, beauty and wellness, fitness, tutoring, pet care and rentals. It is for one-person businesses and for businesses with a team. Many of these businesses sell the same skill two ways: as a service at someone's event, and as a class or experience. Heyday is designed to run both in one diary.
>
> **Where it comes from.** [To confirm: what Heyday says about where it comes from.]
>
> **What it is designed to do, in six parts** (all coming soon):
> - **Get ahead:** set up prices, packages, rules and the team before the first enquiry, with an AI setup assistant.
> - **Get found:** a booking page with instant prices, a listing on the Heyday marketplace, ads tracking by booking value, and bookings from other marketplaces in one diary.
> - **Win the client:** one list of enquiries from every channel, instant quotes the customer can adjust, follow-ups that stop when the customer replies, missed-call messages, AI-drafted replies, and online booking with a deposit and signed terms.
> - **Run the day:** a client portal, one inbox for email, WhatsApp, texts and calls, client records, scheduling, shift offers to employees or subcontractors, checklists and kit lists, reminders and check-in on the day, tasks, and hiring and onboarding.
> - **Get paid:** deposits and balances, invoicing and chasing, tips by QR code and tap, team pay and expenses, profit per job, and reports.
> - **Get rebooked:** next-day feedback, then a referral code or a review request; gift vouchers, loyalty, campaigns and offers for quiet dates.
>
> **How it differs from other tools.** It is designed to run the whole workflow in one place: the customer side (quotes, booking, payment), the team who deliver the job (shifts, pay, check-in, tips), and the aftercare. It handles a service and a class or experience in one diary. The owner chooses how much the AI does: it can draft for approval, learn from corrections, or, later, handle simple messages on its own within the owner's rules. Anything involving money or promises passes a person.
>
> **What is true today.** Heyday's plans, prices, launch dates and which features will be live at launch have not been announced.
>
> **Pricing.** Not published yet.
>
> **Where to find more.** Features: [site URL]/features. How it works: [site URL]/how-it-works. Who it's for: [site URL]/who-its-for. Pricing: [site URL]/pricing. Early access: [site URL]/early-access. The Heyday marketplace, where customers find these businesses: [marketplace URL].
>
> **Please don't state** prices, customer numbers, ratings, awards or launch dates for Heyday. None has been published.

- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

---

## `/terms` and `/privacy`: Legal

- **Template:** T16 (plain)
- **What this page is for:** the legal pages, as placeholders until a lawyer writes them.
- **Title and description (for search):** "Terms of service | Heyday" / "Heyday's terms of service." and "Privacy notice | Heyday" / "How Heyday handles personal information."
- **Grounds, top to bottom:** paper #FBF9F6 (plain text, no motion)

### 1. Placeholder structure
- **What it's for:** hold the layout and headings only. No legal wording is written here.
- **Layout:** plain reading column with a contents list at the top and a banner: "Draft: waiting for legal review. Not in force."
- **Holding copy:** headings only, each with "[To be written by a lawyer]" under it.
  - Terms: "Who we are", "Using Heyday", "Your account", "Payments and fees", "Your content and data", "Ending your account", "Liability", "Changes to these terms", "Contact".
  - Privacy: "Who we are", "What we collect", "Why we use it", "Who we share it with", "How long we keep it", "Your rights", "Cookies", "Contact".
- **Image:** none.
- **Icons and marks:** none.
- **Motion:** none.

(Keep the repo's existing Privacy and Terms content only if it has been checked; either way, mark both pages for legal review.)

---

## `not-found` (404): Page not found

- **Template:** T16
- **What this page is for:** a friendly dead end that gets people back on track.
- **Title and description (for search):** "Page not found | Heyday" / (not indexed)
- **Grounds, top to bottom:** cream #F2E9E1

### 1. The message
- **What it's for:** say what happened, and offer a way back.
- **Layout:** centred. The Heyday sun sits large above the message.
- **Holding copy:** label `{ 404 }`; headline "This page **took the day off**"; line "It might have moved, or it never existed."; buttons "Back to home" (primary), then text links "Features", "Pricing" and "Help".
- **Image:** none.
- **Icons and marks:** the Heyday sun (`HeydayMark`).
- **Motion:** the sun bounces once, then morphs into the Loop and spins slowly while on screen. With reduced motion it shows the Loop, still.
