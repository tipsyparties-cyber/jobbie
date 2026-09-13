# Hey Day business software (the jobbie site): what to build next

> **Note for Claude Code (14 September 2026):** this is a background document. Where it suggests mentioning Tipsy Parties on the site (a "Built by Tipsy Parties" proof line, Tipsy's real story, Tipsy's numbers, or "built by people who run an events business"), don't. Heyday isn't built by Tipsy Parties, and the site doesn't mention Tipsy unless Jem and Russell decide otherwise. The spec files in `spec/` and the build prompt's rules win.


**For:** Claude Code, working in `tipsyparties-cyber/jobbie`, branch `redesign/mono-binary-intro` (runs on port 3001).
**From:** Jem, with Claude, 13 September 2026. Russell to review.
**Read with:** `HEYDAY-SAAS-WEBSITE-BRIEF.md`, which has the research behind this plan: sections 3.3 to 3.9 (the product and the website plan), 5 (Jobber compared with what we have), 6.1 (how getjobber.com is built), and Appendices A and C (every capability, and every Jobber feature page). This file says what to build and in what order. That one says why.

---

## What this site is

The website for Hey Day: self-serve software (SaaS) that runs a whole events, entertainment, activity, services or class business, from the first enquiry to the rebooking.

- **Who it’s for:** anyone who sells their time, skills or an experience, and needs quotes, bookings, payments and automation to run the business:
  - **event, entertainment and hospitality suppliers:** mobile bars, private chefs and caterers, photographers, planners, DJs and musicians, entertainers, photo booths, florists
  - **activity and class hosts:** workshops and classes, team-building, tours, escape rooms
  - **service providers:** home services and trades, cleaning, beauty and wellness, fitness, tutoring, pet care, rentals
  - **one-person businesses** with no team yet, as well as businesses with a crew
- **What they sell:** many sell one skill two ways, as a *service* at someone’s event (bar hire for a wedding) and as an *experience* (a cocktail class). Others sell one service. Hey Day handles both.
- **It grows with them, the way Tipsy grew:** from the person delivering the cocktail class, to an owner-operator, to a team, to owners automating themselves out of the day-to-day. The site shows every stage (Phase 6, and section 1 of the SaaS brief).
- **The site’s job:** do for all of these businesses what getjobber.com does for home services. Explain every feature in depth (one page per feature), add one Who it’s for page and a set of example stories of businesses growing on Hey Day, then turn visitors into trials or demos.
- **The customer side:** the Hey Day marketplace, where customers find these businesses. It has its own brief, `BUILD-NEXT-HEYDAY-MARKETPLACE.md`.

The site started as a copy of another website (an automation agency’s). It already has good bones: 20 feature pages built from one template, four product sections in Jobber’s order, and a scrolling homepage. But most of its words are still the old site’s, and every example is a trade.

---

## Rules for every phase

1. **Honest claims only.** The software isn’t a product for other businesses yet. It’s the Tipsy system, which runs one business. So:
   - Every feature page shows a status: *live* or *coming soon*. Jem and Russell decide which features are live at launch (SaaS brief, question 4). Until they do, treat everything as coming soon.
   - Don’t invent customers, numbers, prices, ratings or awards. Keep customer quotes signed “Placeholder” until real ones are approved. Use `[PRICE TBC]` and `[PHONE TBC]`.
   - “Start free trial” can’t start a trial yet. Until the product exists it opens an early-access form (name, email, type of business, what you sell). Don’t store or send anything from the form until the privacy notice and consent wording are agreed.
2. **US first:** US spelling, dollars and US terms (Phase 2).
3. **Keep the look as it is** until Jem and Russell decide it (Phase 0). Don’t restyle.
4. **One template plus data.** Jobbie already does this (`src/lib/features.ts` for the words, `src/components/features/feature-page.tsx` for the page). Build industry, comparison and resource pages the same way.
5. **Respect the design record:** `docs/superpowers/specs/2026-09-10-mono-reskin-binary-intro-design.md`. Don’t re-propose anything in its “Do not re-propose” table, and keep the feature rows as they are (Addendum 34).
6. **Only this repo.** Never touch the Tipsy system.
7. **Check every phase** with the typecheck, the build and the linter (the baseline is 7 existing warnings). If you can’t see the running site, say so and ask Jem for screenshots. Don’t claim how something looks.
8. **Commit at the end of each phase,** with a message that says what changed and why.

---

## Phase 0: decisions (ask Jem; the defaults let work start)

| Decision | Default until decided |
|---|---|
| **Name:** keep “jobbie”, or a Hey Day name such as “Hey Day for hosts”? | Keep “jobbie” in the one wordmark component (`src/components/ui/wordmark.tsx`). Put the product name in a single constant, and write body copy that rarely needs the name, so a rename is a one-line change. |
| **Look:** the HoneyBook colours jobbie has now, or Jem’s marketplace look (Anton and Bowlby One headings, cream #EDE6D8, blue #1F5FDC, red-orange #C63A18, butter #F4E08C)? | Keep the current look. |
| **Groups:** keep jobbie’s four outcome groups (Get found, Win the work, Run it without you, Keep more of it), or move to the six in the SaaS brief, section 3.3 (Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked)? | The six are the suggestion, because they follow the real order of a booking and give the aftercare its own group. Until Jem confirms, keep four; the regrouping table in Phase 3 makes the switch a quick change. |
| **Before launch, what does “Start free trial” do?** | Opens the early-access form (rule 1). |
| **Domain:** how does this site sit next to the marketplace? | No change needed yet. See the marketplace brief, Phase 0. |

---

## Phase 1: clear out the old site’s leftovers

- **Remove the old site’s name, “up+up”, everywhere it shows.**
  - The browser title and description in `src/app/layout.tsx` still say “up+up | AI & Automation Agency”.
  - Search visible copy and metadata for “up+up”, “upandup”, “agency” and “Start a conversation”.
- **Menus.** Update `site-header.tsx`, `navbar.tsx`, `mobile-menu.tsx` and `footer.tsx`.
  - Main menu: Features, Who it’s for, Pricing, Resources.
  - Right-hand side: Log in, a phone number (`[PHONE TBC]`, as Jobber shows one), “Book a demo” and “Start free trial”.
  - Footer columns: Product (features, pricing, integrations, the Hey Day marketplace), Who it’s for, Resources, Company, Legal.
- **Remove the agency pages:**
  - Services
  - Projects (it presents Tipsy as an agency’s client project)
  - the blog post “Demystifying AI automation”
  - Rewrite About instead of removing it: “built by people who run an events business”.
  - Keep Privacy and Terms, but mark them for legal review.
- **Hero** (`GsapHero` in `src/components/home/gsap-structure.tsx`). Already done on 13 September 2026 (commits d06ee47 and 594b770):
  - the headline “Do what you love. Let Hey Day run the rest.”
  - the line under it
  - the scroll animation in `hero-motion.tsx`

  Keep all of it. Only change the buttons, to “Start free trial” and “Book a demo”.
- **Statement.** “The best businesses aren’t run by super humans…” is the old site’s line. Replace it with the draft statement in the same section (“Six apps, a group chat and your evenings…”).
- **Sideways band.** It lists the old site’s nine AI agents and tools. Replace them with Hey Day features, sorted into the groups (Phase 3).
- **Product sections** (`src/components/home/product-sections.tsx`):
  - **The AI:** its button “See how the agents work” points at `/services`. Point it at `/features/ai`.
  - **Switching:** it promises a done-for-you service (“We map it before we build it”, “a fortnight of watching how you actually run”). That’s an agency’s promise. Rewrite it for self-serve software:
    - set it up yourself, with an AI assistant suggesting your settings (coming soon)
    - free help moving your clients, bookings and prices across `[to confirm]`
    - real people to help, at the hours hosts work, including evenings and weekends `[to confirm]`
    - These are promises, so Jem and Russell confirm them before they go live.
- **Showcase.** “One business, six systems” presents Tipsy as an agency’s client project. Change it to “Tipsy Parties runs on this software every day”, using approved numbers only.

**Done when:** a search for “up+up”, “upandup”, “agency” and “Start a conversation” finds nothing in visible copy or metadata.

---

## Phase 2: write for every kind of business, in US English

**Mix the examples.** The copy speaks only to trades now (vans, boilers, sinks, clean kitchens). Keep those, because trades are Hey Day customers too, and add everyone else. A cleaner, a wedding photographer and a pottery teacher should each see themselves on every page.
- **Booking** is the everyday word, since it fits a job, an event, a class and an appointment. Use job, event, class or session when the example is specific.
- **Team** means the people who deliver. Make clear it covers employees and subcontractors.
- **Client** is the person who books. **Guest** is someone at an event or class.
- **Open every feature page with a real situation,** and rotate the situations across the site. For example:
  - on Quoting: “A couple wants a cocktail bar for 80 guests on a Saturday in June, two hours from you.”
  - on Online booking: “A customer wants their windows cleaned every month.”
  - on Classes: “Twelve seats in Saturday’s pottery class, and a bachelorette party asking for a private session.”

**US English:**

| Jobbie says now | Hey Day says |
|---|---|
| postcode | ZIP code |
| fortnight | two weeks |
| right to work | work eligibility checks (Form I-9 for employees, Form W-9 for subcontractors) |
| licences, colours, organise | licenses, colors, organize |

**Industry list** (`INDUSTRIES` in `product-sections.tsx`). Keep all 16 that are there, from events and mobile bars to cleaning, trades, landscaping, removals, pet care, childcare, tutoring and staffing agencies. Then add:
- Private chefs
- DJs and musicians
- Entertainers (magicians, performers, kids’ parties)
- Photo booths
- Florists and event styling
- Wedding and event planners
- Workshop and class hosts (pottery, painting, cooking, cocktails)
- Team-building providers
- Tours and activities
- Escape rooms
- Businesses that sell on marketplaces

The heading already fits everyone: “Built for businesses that sell time, people and availability.” So does the line under it (“whether you are pouring drinks or fixing boilers”). Keep both.

---

## Phase 3: feature pages, modelled on Jobber’s

**First, extend the data shape** in `src/lib/features.ts`:
- `status: "live" | "coming-soon"`.
  - The page shows a “Coming soon” label beside the H1 and on its index card.
  - Its buttons read “Join early access” rather than “Start free trial”.
- `jobber?: string`: the Jobber page it’s modelled on. This is for reference and never shown.
- New `bucket` values, if Phase 0 chooses five groups.

**The template.** Keep jobbie’s, which matches Jobber’s. Then add what Jem asked for, so every page sells the idea before the feature:
1. Breadcrumb.
2. **The headline (H1) is the owner’s pain, in their words,** not the feature name. “Stop spending your time chasing clients for payment.” beats “Automated payment reminders”. The table below has one for every page.
3. **The line under it names the feature in the words people search for,** for example “Automatic payment reminders that get you paid faster”. Put the same phrase in the page title, so the page still ranks.
4. **What it does for you:** up to three short lines, each starting *Saves*, *Increases* or *Reduces*. For example: “Saves the hours you spend chasing. Reduces late payments. Increases the cash in your bank.”
5. **The proof:** one or two real statistics from real studies. Each shows its source, year and who it covers in small print, with a link. Order of preference:
   - Tipsy’s or Hey Day’s own figures, once approved
   - independent studies
   - a rival’s published data, clearly credited (“Jobber’s data from its own customers”)
   - Never a figure without a source.
6. **What it’s costing you:** a worked example with the maths shown, using clearly labelled example numbers. Or a small calculator where the visitor enters their own numbers.
7. Intro, “How it works” jump links, then three or four blocks (label, heading, copy, image slot).
8. A customer quote (a placeholder until real ones exist).
9. Related features.
10. A closing call to action.

**Changes to the data and components:**
- **New fields on the `Feature` type:**
  - `pain` (the H1)
  - `searchLine`
  - `outcomes: { saves?: string; increases?: string; reduces?: string }`
  - `stats: { claim: string; source: string; year: string; url: string; covers: string }[]`
  - `example?: { inputs: string; maths: string; result: string }`
- **One `StatBlock` component** that always prints the source, so a statistic can never appear without one.
- **The verified statistics** are in `STATS-BANK.md` in the brief folder.

**The page list.** “At Tipsy today” comes from the SaaS brief (sections 5.2 to 5.4, Appendix A, and the marketplace brief section 11).
- *Built, needs generalising* means it works for Tipsy but not yet for other businesses.
- It isn’t a launch status. Every page stays “coming soon” until Jem and Russell decide.
- Where jobbie already has a page, rewrite it rather than adding a new one.

**Get found**

| Page | Modelled on (Jobber) | What it covers for hosts | At Tipsy today | Jobbie now |
|---|---|---|---|---|
| Booking page and mini-site | Websites | The host’s own page with the instant quote and live availability built in, on their own domain | Built for Tipsy (its US site is built around the instant quote) | `booking-page`: rewrite |
| Get listed on the Hey Day marketplace | (Hey Day only) | Switch on a marketplace listing with real prices and live availability | To build | New |
| Sell everywhere, one diary | (Hey Day only) | Bookings from Airbnb Experiences, ClassBento, Togather, LetsBatch and Yuup in the same diary, following each platform’s rules | To build | New |
| Campaigns and off-peak offers | Campaigns | Win-back, anniversary and seasonal emails; fill quiet dates | Broadcasts and the email editor exist; segments to build | `campaigns`: rewrite |
| Ads that know which bookings pay | (Hey Day only) | Send real booking value back to Google and Microsoft Ads | Built | New, or part of Reporting |

**Win the work**

| Page | Modelled on (Jobber) | What it covers for hosts | At Tipsy today | Jobbie now |
|---|---|---|---|---|
| Instant quotes | Quotes | Priced by guests, hours, travel and date; packages and add-ons; prices that move with demand (and later with availability); the client adjusts the quote live and compares alternatives; deposit in the same step. Full page, including the stat and the worked example: SaaS brief, section 3.9 | Built, needs generalising (demand from diary fullness and comparing dates to build) | `quotes`: rewrite |
| Online booking and instant book | Online booking | Let anyone book, check the diary first, or set rules by location, date or booking value | Checkout with deposits built; the owner’s rules to build | `online-booking`: rewrite |
| Classes, tickets and private groups | (Hey Day only) | Sessions, capacity, places left, waiting lists, private group bookings | Private classes built; ticketed sessions to build | New |
| Packages, memberships and regulars | Recurring jobs | Packages, one-offs, weekly or monthly bookings, memberships, price lists for regular clients and agencies, direct debits | Agent price lists built; memberships, recurring billing and direct debits to build | New |
| Enquiries and lead types | Sales pipeline | Every channel in one list; hot, urgent, high value, easy and off-peak labels; a ranked list | Priority ranking built; owner-set lead types to build | `enquiries`: rewrite |
| Follow-ups and autoresponders (the settings studio) | Automations; Customer messaging | Design or import a message; choose when it goes, how (email, WhatsApp, text), to whom and what triggers it; replies that change with the lead type | Seven follow-ups with WhatsApp built, on fixed timings; the owner-editable studio to build | `follow-ups`: rewrite |
| AI receptionist | AI Receptionist | Answers calls and texts, takes messages, books | Not at Tipsy | New |
| Replies that write themselves (the AI email writer) | Jobber AI (Rewrite) | Drafts every reply from the conversation, the client’s record, the booking’s live situation, the business’s policies and procedures, and its availability. Three levels: draft, draft and train, autopilot (SaaS brief, section 3.8) | Draft, and draft and train, built; autopilot to build | New |
| Call notes and follow-ups | (Jobber doesn’t) | Every call summarized in the inbox; a recap email drafted in one click; voicemails transcribed | Built | New |
| Missed-call capture | AI Receptionist (partly) | Works out who called (new enquiry, current enquiry, current or past customer, someone else); sets a call-back reminder; sends a “Sorry we missed your call” text and email written for who they are | Call-back list for known callers built; the message to the caller and unknown callers to build | New |
| Contracts and e-signatures | Quotes (signature) | The client signs the terms with the quote | Staff contracts are e-signed; client signing to build | New |

**Run it without you**

| Page | Modelled on (Jobber) | What it covers for hosts | At Tipsy today | Jobbie now |
|---|---|---|---|---|
| One inbox | Customer messaging | Email, WhatsApp, texts, calls and app chat in one thread per client; AI drafts that read the booking; hidden numbers between clients and the team | Built | `inbox`: rewrite |
| Client portal and event planning | Client Hub | Pay, confirm guest numbers, choose menus, share with the group, request changes, download receipts | Built, needs generalising | `client-portal`: rewrite |
| Client records | CRM | Every email, WhatsApp, text, call and note, and every quote, booking and payment, for one client. Who they are (lead, current customer, past customer) is worked out automatically. Custom fields for each type of business | Built; custom fields to build | `client-records`: rewrite |
| Scheduling and one diary | Scheduling | One diary across every booking source, with clash and travel checks | Built, needs generalising | `scheduling`: rewrite |
| Shift offers and staffing | Team management; Scheduling | Offer shifts to employees or subcontractors, who accept or decline; automatic placement by distance and rating | Built (automatic on some bookings; more being tested) | `staff-allocation`: rename and rewrite |
| On the day | Dispatch; Jobs | Reminders, briefings, check-in with alerts, emergency cover | Built | Replaces `job-tracking` |
| Checklists, shopping and kit lists | Checklists and forms | Pre-event checks, shopping lists from the client’s choices, kit ordering, waivers | Built (kit ordering being tested) | New |
| Hiring and onboarding | (Jobber doesn’t) | AI screening, self-booked interviews, ID checks, e-signed contracts, training sign-off | Built for UK rules; US checks to build | New |
| Team management | Team management | Roles and permissions, employees and subcontractors, tiers | Built | `team`: rewrite |
| Tasks | (Jobber doesn’t) | To-dos with tagged colleagues and deadlines that chase each person | Built | New |
| Time tracking | Time tracking | Hours for employees | Check-in only; timesheets to build | `time-tracking`: mark coming soon |

**Keep more of it** (Get paid)

| Page | Modelled on (Jobber) | What it covers for hosts | At Tipsy today | Jobbie now |
|---|---|---|---|---|
| Payments and deposits | Payments | Deposits and balances, card, Apple and Google Pay, pay-by-bank, payment plans | Built; saved cards charged automatically, and Tap to Pay, to build | `payments`: rewrite, and remove or mark those two claims |
| Tips by QR and tap | Payments (tips) | A QR tip jar shared across the team; tap tips | QR tip jar built; tap to build | New |
| Invoicing and chasing | Invoicing | Pro forma and final invoices; overdue chasing by email and WhatsApp | Built, needs generalising | `invoicing`: rewrite |
| Team pay and expenses | Payroll (via Gusto) | Payouts, self-serve cash-out, expenses with rules | Built for the UK (Wise); US payouts to build | New |
| Profit per job | Job costing | The margin on every quote, and profit per job or event | Margin shown on quotes; labour costs from hours to build | `job-costing`: rename and rewrite |
| Reports and the Command Centre | Dashboard; Reporting | Reports in plain English, a morning report, profit per channel | Built | `reporting`: rewrite |

**Get rebooked** (its own group if Phase 0 chooses five; otherwise under Get found)

| Page | Modelled on (Jobber) | What it covers for hosts | At Tipsy today | Jobbie now |
|---|---|---|---|---|
| Reviews | Reviews | Next-day thumbs up or down. A thumbs up gets a referral code, *then* the review ask. A thumbs down gets “how can we improve?” and the complaint loop, with a manager signing off | Feedback and the complaint flow built; the automatic review ask to be restored; referral-then-review to build | `reviews`: rewrite in this order |
| Referrals | Referrals | A code for happy clients, rewarding both sides | Partner links exist; client referrals to build | `referrals`: rewrite |
| Gift vouchers | (Jobber doesn’t) | Sell vouchers for an amount or a specific experience; check balances; redeem | To build | New |
| Loyalty | (Jobber doesn’t) | Loyalty cards and rewards for regulars | To build | New |

**Hey Day only: features neither Jobber nor Tipsy has.** The full list, with reasons, is in the SaaS brief, section 3.8, table 3. Some already have pages above:
- gift vouchers, loyalty and memberships
- referral code then review
- sell everywhere, and the marketplace listing
- lead types
- missed-call messages
- autopilot

Add these as coming-soon pages:

| Page | What it covers | Status |
|---|---|---|
| AI setup assistant | Reads the business’s website, price list, old emails and policies, then fills in the quote form, automations and rules for the owner to check | To build |
| Policies and procedures | One library the AI and the team both work from, with staff confirming they’ve read it | To build (Tipsy has training sign-off for its team) |
| Fill quiet dates | Offers to the customers most likely to book the dates that look thin, for the owner to approve | To build |
| Group bookings and split payments | Each guest pays their share by link | To build |
| Waiting lists | Cancelled seats and dates offered to the next person automatically | To build |
| Guest capture at events | QR codes on menus, tip jars and photo galleries, so guests follow the business or book their own, with consent | To build |
| Partners and cross-promotion | Complementary businesses recommending each other, with a referral share | To build; the policy is undecided |
| Complaints settled fairly | The team member approves the reply and can offer part of a refund; a manager signs off | Partly built |

**Two pages outside the groups:**
- **`/features/ai`, modelled on the Jobber AI page:**
  - It covers AI replies, the setup assistant, an AI coach, the AI receptionist, and the AI control panel for costs.
  - Lead with “You choose how much the AI does.”
  - Show the three levels from the SaaS brief, section 3.8 (draft; draft and train; autopilot), with their safeguards.
  - Explain “AI assistant”, “AI agent” and “agentic” in plain words: levels 1 and 2 are an assistant, level 3 is an agent acting on its own within the owner’s rules.
  - Keep “The AI drafts. You approve.” as the promise for levels 1 and 2.
- **`/integrations`:** QuickBooks and Xero, Google Calendar, Zapier, Stripe. At Tipsy today, Stripe and Zapier are connected; accounts sync is still to build.

**Jobber pages not to copy:** Chemical tracking, Jobber Capital (business loans), GPS vehicle tracking. Consumer financing becomes “payment plans”, and route planning waits until later.

**Order of work:** rewrite the existing pages first, then add the new ones, group by group. After each group, show Jem the index page and one feature page before carrying on.

**If the six groups are chosen** (SaaS brief, section 3.3), give `BucketId` six values and regroup the pages like this:

| Group | Pages |
|---|---|
| Get ahead | AI setup assistant, Policies and procedures, Team management, Integrations (including importing from old tools) |
| Get found | Booking page, Get listed on the marketplace, Sell everywhere, Campaigns, Ads that know which bookings pay, Guest capture at events, Partners and cross-promotion |
| Win the client | Enquiries and lead types, Missed-call capture, AI receptionist, Replies that write themselves, Instant quotes, Follow-ups and autoresponders, Online booking and instant book, Classes and tickets, Packages and memberships, Contracts and e-signatures, Group bookings and split payments |
| Run the day | Client portal, One inbox, Client records, Call notes and follow-ups, Scheduling, Shift offers and staffing, Checklists and kit lists, On the day, Tasks, Hiring and onboarding, Time tracking |
| Get paid | Payments and deposits, Tips, Invoicing and chasing, Team pay and expenses, Profit per job, Reports and the Command Centre |
| Get rebooked | Reviews, Referrals, Gift vouchers, Loyalty, Fill quiet dates, Waiting lists, Complaints settled fairly |

**A headline for every page.** These are suggestions for Jem to change. Each page’s statistic comes from `STATS-BANK.md`.

| Page | Headline (the owner’s pain) | Saves / Increases / Reduces |
|---|---|---|
| AI setup assistant | Stop spending weeks setting up software. | Saves setup time. Reduces mistakes in your prices and rules. |
| Policies and procedures | Stop answering the same staff questions every week. | Saves training time. Reduces mistakes and mixed messages. |
| Team management | Stop chasing your team for paperwork. | Saves admin. Reduces expired certificates on live jobs. |
| Integrations | Stop typing the same thing into three apps. | Saves double entry. Reduces errors. |
| Booking page | Stop losing customers who only wanted a price. | Increases bookings from your website. |
| Get listed on the marketplace | Get found by people looking for something to do. | Increases new customers. |
| Sell everywhere | Stop juggling five calendars. | Reduces double bookings. Saves admin. |
| Campaigns | Stop letting quiet weeks happen to you. | Increases repeat bookings. |
| Ads that know which bookings pay | Stop paying for clicks that never book. | Reduces wasted ad spend. Increases bookings per dollar. |
| Guest capture at events | Every guest at your event is your next customer. | Increases new bookings. |
| Partners and cross-promotion | Get recommended by businesses your customers already love. | Increases new customers. |
| Enquiries and lead types | Stop letting your best leads wait in a pile. | Reduces response time. Increases your win rate. |
| Missed-call capture | Stop losing customers to voicemail. | Increases calls returned. Reduces lost enquiries. |
| AI receptionist | Stop missing calls while you’re working. | Increases enquiries caught. Saves interruptions. |
| Replies that write themselves | Stop writing the same email fifty times a week. | Saves hours a week. Increases reply speed. |
| Instant quotes | Stop losing bookings while you work out the price. | Saves quoting time. Increases your win rate. Reduces pricing mistakes. |
| Follow-ups and autoresponders | Stop chasing quotes that went quiet. | Increases bookings. Saves chasing time. |
| Online booking and instant book | Let customers book while you sleep. | Increases bookings. Reduces phone tag. |
| Classes and tickets | Stop running your classes from a spreadsheet. | Increases seats sold. Saves admin. |
| Packages and memberships | Stop starting from zero every month. | Increases repeat income. |
| Contracts and e-signatures | Stop printing, signing and scanning. | Saves time. Reduces disputes. |
| Group bookings and split payments | Let the group pay their own share. | Increases group bookings. Reduces chasing. |
| Client portal | Stop answering “what time do you arrive?” again. | Reduces calls and emails. Saves time. |
| One inbox | Stop checking five apps to find one message. | Reduces missed messages. Saves time. |
| Client records | Stop starting every conversation from scratch. | Saves time. Increases repeat bookings. |
| Call notes and follow-ups | Stop scribbling notes during calls. | Saves time. Reduces forgotten promises. |
| Scheduling | Stop rebuilding your week every time something changes. | Saves admin. Reduces clashes. |
| Shift offers and staffing | Stop texting your whole team to fill one shift. | Saves hours. Reduces no-shows. |
| Checklists and kit lists | Stop finding out on the day that something’s missing. | Reduces mistakes. Saves last-minute trips. |
| On the day | Stop worrying whether your team turned up. | Reduces no-shows. Increases peace of mind. |
| Tasks | Stop holding every to-do in your head. | Reduces missed jobs. Saves mental load. |
| Hiring and onboarding | Stop drowning in applications. | Saves hiring time. Reduces bad hires. |
| Time tracking | Stop guessing hours on a Friday. | Reduces pay mistakes. Saves admin. |
| Payments and deposits | Stop losing dates to no-shows. | Reduces no-shows. Increases cash up front. |
| Tips | Stop leaving tips on the table. | Increases your team’s pay. |
| Invoicing and chasing | Stop spending your time chasing clients for payment. | Saves chasing time. Reduces late payments. |
| Team pay and expenses | Stop spending payday on spreadsheets. | Saves admin. Reduces pay mistakes. |
| Profit per job | Stop guessing which jobs make money. | Increases profit. |
| Reports and the Command Centre | Know your numbers without opening a spreadsheet. | Saves time. Increases control. |
| Reviews | Get more five-star reviews without the awkward ask. | Increases reviews. Reduces bad reviews going public. |
| Referrals | Turn happy customers into your sales team. | Increases new customers. |
| Gift vouchers | Get paid for bookings that haven’t happened yet. | Increases cash up front. |
| Loyalty | Stop letting regulars drift away. | Increases repeat bookings. |
| Fill quiet dates | Stop letting quiet dates go to waste. | Increases bookings on quiet days. |
| Waiting lists | Stop losing money on cancellations. | Reduces empty seats and dates. |
| Complaints settled fairly | Stop letting one bad day become a bad review. | Reduces bad reviews. Saves time. |

---

## Phase 4: one “Who it’s for” page, and example stories

**Don’t build one page per type of business.** It’s a lot of pages, and a list can never be complete, so anyone missing from it would think Hey Day isn’t for them. Build one page and a set of stories instead.

**The Who it’s for page (`/who-its-for`):**
- **Who it suits,** written as examples, not a closed list:
  - event, entertainment and hospitality suppliers
  - activity and class hosts
  - service providers
  - one-person businesses, and businesses with a crew
  - businesses that sell on marketplaces
  - End with: “If you sell your time, your skills or an experience, it’s for you.” Jobbie’s industries section already has the right idea: “Not on the list? The rules engine is yours to set.”
- **The solutions,** sorted by the feature groups (Phase 3), each linking to its feature page.
- **Grows with you:** the four stages from the SaaS brief, section 1 (doing it all yourself, owner-operator, a team, it runs itself).
- **The example stories,** as cards.

**Example stories** (`src/lib/stories.ts`, plus one template at `/stories/[slug]`). Each story follows one kind of business as it grows:
1. **Who they are and what they sell:** the service, and the experience or class where they have one.
2. **The chore that hurts most,** for example “Stop chasing clients for deposits and guest numbers.”
3. **Doing it all themselves:** the Hey Day features that give them their evenings back.
4. **Taking on help:** the features that keep a small team organized.
5. **A team, then a business that runs itself:** what the owner still does, and what the system does.
6. **The features used,** each linking to its feature page.
7. **The early-access or trial box.**

**The first seven,** from Jem’s list. The growth moments are suggestions for Jem to change.

| Story | What they sell | Suggested growth moment |
|---|---|---|
| A caterer | Catering and private dining | Staffing big events without a group chat |
| A class host | Public classes with tickets, and private group sessions | Filling seats, and taking private bookings in the same diary |
| A performer | Shows, parties and corporate events | Answering enquiries and sending quotes while performing every weekend |
| A photo booth company scaling up | Booth hire and branded activations | Going from one booth to several, with a team on each |
| A mobile bartender (Tipsy Parties) | Bar hire for events, and cocktail classes | From one person behind the bar to a team of bartenders run from one system |
| An event staffing agency | Staff for other people’s events | Shift offers, checks and payouts at volume |
| A photographer | Wedding and event photography, and workshops | Selling workshops alongside shoots, then hiring a second shooter |

**Rules for the stories:**
- Only Tipsy’s story is real, and it uses approved numbers only.
- Label every other story clearly as an example (for instance “How a caterer could run on Hey Day”), with no invented names, quotes, logos or numbers.
- Replace the examples with real customer stories as customers join.
- Add more kinds of business at any time, such as a cleaner, an escape room or a tour guide.

---

## Phase 5: the other page types Jobber has

- **Pricing:**
  - Jobber’s structure (SaaS brief, section 6.1): “Try free now, pick a plan later”, a plan table, add-ons, card fees shown openly, and an FAQ.
  - Use three plans and one monthly or yearly toggle.
  - Every price stays `[PRICE TBC]` until the business model is decided (SaaS brief, section 3.6a).
- **Comparison hub:** vs HoneyBook, vs Jobber, vs Check Cherry, vs Flashquotes, and vs spreadsheets. Each page has:
  - a summary table and a feature grid
  - a switching plan
  - the date it was checked
  - rival facts checked on the day of writing, never from memory
- **Customer stories:** these are the example stories from Phase 4, with Tipsy’s as the first real one.
- **How it works:** the whole flow from the SaaS brief, section 3.3, one step at a time.
  - For each step, show what the customer does, what the business does, and what Hey Day does.
  - Include the variations: classes skip the quote, some trades need a visit first, recurring work loops back, and marketplace bookings arrive already won.
- **Resources:** free tools that need no email address, with the upsell only after the tool has helped:
  - a class and event pricing calculator
  - a quote template
  - a “how much are you leaving on the table?” score, built on the feature groups, like Jobber’s Home Service Score quiz
- **AI search page:** a plain-text page written for AI search tools, like Jobber’s “llm-info” page.
- **Company and support pages:**
  - **Security:** payments, two-factor login, data export
  - **Support**
  - **About:** built by people who run an events business
  - **Book a demo:** a calendar placeholder
  - **Early access:** what “Start free trial” opens for now
  - **Log in:** a placeholder until the product exists
  - **Terms and Privacy**

---

## Phase 6: the homepage, in its final order

Jobbie’s current sections, merged with getjobber.com’s homepage order. The draft words for every section are in the SaaS brief, section 3.7 (“Homepage copy”).

1. **Hero:** headline, one line underneath, and two buttons: “Start free trial” and “Book a demo”.
2. **Proof:** “Built by Tipsy Parties, and running Tipsy every day”, with one approved number.
3. **Statement.**
4. **Sideways band:** the groups and their features. Use the six from the SaaS brief, section 3.3, once Jem confirms them.
5. **Feature rows.** Keep the current look.
6. **What it does** (`ProductSurface`). Rewrite the ten capabilities for hosts, and add classes and tickets, and gift vouchers.
7. **The AI** (`AiSection`).
8. **Who it’s for** (`IndustriesSection`): the list, ending “and anyone who sells their time, skills or an experience”, linking to the Who it’s for page.
9. **Grows with you (new):** from doing every job yourself, to a small team, to a business that runs itself, told through Tipsy’s story (SaaS brief, section 1).
10. **Sell everywhere (new):** one diary for the business’s own page, the Hey Day marketplace and the other platforms they sell on.
11. **Switching** (`SupportSection`), now written for self-serve.
12. **Example stories** (replaces the showcase): a rail of the seven story cards, with Tipsy first.
13. **Closing call to action and footer.**

**Later, once the product exists:** a live demo on the homepage. Book a bartender for a party and a seat in a cocktail class on the same page, with no signup.

---

## Phase 7: link it to the marketplace

- Add “Hey Day marketplace” to the footer, and build the “Get listed on the Hey Day marketplace” feature page.
- Once the look is decided, move the colours and fonts into one design-tokens file that both sites use.
- Use the same words on both sites:
  - on the marketplace, businesses are “hosts”. On this site, call them businesses, and say “host” only when talking about the marketplace
  - At yours / At theirs / Online
  - Tickets / Private / Gifts

---

## A page is done when

- the H1 reads as a search phrase plus an outcome;
- its status (live or coming soon) shows on the page;
- its example is a host’s situation, not a trade’s;
- it uses US spelling and no UK-only terms;
- every number and quote is approved or clearly a placeholder;
- the typecheck, the build and the linter pass.

**Open questions:** `HEYDAY-SAAS-WEBSITE-BRIEF.md` section 8, and `HEYDAY-MARKETPLACE-WEBSITE-BRIEF.md` section 12.
