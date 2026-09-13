# Hey Day business software (SaaS): website brief for Claude Code

**Prepared for:** Claude Code, to design and build the website for Hey Day: self-serve software (SaaS) that runs a whole events, entertainment, activity, services or class business. Companion brief: `HEYDAY-MARKETPLACE-WEBSITE-BRIEF.md`.
**Prepared by:** Jem, with Claude, 13 September 2026. Russell to review.
**Status:** exploration. Nothing here is a final business decision unless it says so. Open questions are listed in section 8.

---

## 0. How to use this brief

**Start from the jobbie site.** The working Hey Day host software site is on GitHub: `tipsyparties-cyber/jobbie`, branch `redesign/mono-binary-intro` (public; checked 13 September 2026 at commit `32aa33c`).
- It runs on port 3001.
- It started as a copy of another website, so some of its wording and pages are leftovers that need replacing (section 3.7a). Its logo now reads “jobbie”.
- Build on it; don’t start again. Section 3.7a covers what it already has and what it needs to become Hey Day.

**Brand (to decide; section 8, question 12).** Two looks exist:
  - **Jem’s marketplace homepage** (https://claude.ai/code/artifact/5384682b-c265-4ffd-9ee4-c3cb2ded4432). This brief proposed it so the host software and the marketplace feel like one family.
    - Display fonts: Anton, Bowlby One, Big Shoulders Display. Body fonts: Quicksand and Hanken Grotesk.
    - Colours: cream #EDE6D8, ink #2E2A20, blue #1F5FDC, red-orange #C63A18, butter #F4E08C.
  - **The jobbie site as it stands:** its current layout and scroll effects (modelled on gsap.com).
    - Colours (from HoneyBook): cream #F2E9E1, sage #9AAD92, blue #93B7E8, yellow #FCFC72, paper #FBF9F6, lavender #D6D0F5.
  - Until the look is decided, keep jobbie’s and don’t restyle it.
  - The name is also to decide. “jobbie” is the working name in the code; other options are “Hey Day for hosts” or “Hey Day Business”.

**Start here for the website:** section 3.7a (what the jobbie site already has), 3.7 (site map, homepage outline, devices, headlines), then 3.8 (Jobber as the model), 3.9 (the Quotes page worked example), 5.5 (feature page template) and 6 (competitor website lessons). Appendix C lists every Jobber feature page with the Hey Day equivalent.

- Read sections 1 to 4 before designing anything. Sections 5 to 7 are the evidence (competitors and lessons from their websites). The appendices are the full capability lists.
- **Never invent claims, prices, customer numbers or testimonials.** Where a number is needed and isn’t in this brief, leave a clearly marked placeholder such as `[PRICE TBC]`.
- **Only claim on the website what will be live at launch.** Appendix A marks every capability as *Built, generic*, *Built, needs generalising* or *To build*. Anything not yet built must be labelled “coming soon” or left off.
- **Writing style (proposed, confirm with Jem):** plain English, short sentences, the customer’s own words, benefits before features. No em dashes. Hey Day targets the US first, so use US spelling and dollars.
- **Related material:**
  - The full interactive report this brief is drawn from (catalogue, journey chart, competitors, US market): https://claude.ai/code/artifact/de4ad9dd-5d03-461b-b204-343c738ef99d
  - The Tipsy system: `~/Projects/tipsy-full-system`. Read-only reference; never change it from a website project.

---

## 1. Hey Day at a glance

- **What it is:** self-serve software (SaaS) that runs a whole events, entertainment, activity, services or class business.
- **Who it’s for:** anyone who sells their time, skills or an experience, and needs quotes, bookings, payments and automation to run the business. That includes:
  - **event, entertainment and hospitality suppliers:** bartenders and mobile bars, private chefs and caterers, photographers, planners, DJs and musicians, entertainers, florists, photo booths
  - **activity and class hosts:** workshops and classes, team-building, tours, escape rooms
  - **service providers:** home services and trades, cleaning, beauty and wellness, fitness, tutoring, pet care, rentals
  - **one-person businesses** with no team yet, as well as businesses with a crew
  - **businesses that also sell through marketplaces** such as Togather, ClassBento, Airbnb Experiences, LetsBatch and Yuup
- **How customers buy:** sign up, start a free trial, set it up themselves, and pay monthly (like Jobber and HoneyBook).
- **The website’s job:** explain in depth how it all works (like getjobber.com), then turn visitors into trials.
- **Main call to action:** “Start free trial”. The second button is “Book a demo”.
- **Proof:** Tipsy Parties runs on the same system today.
- **Benchmarks to learn from:**
  - **Jobber** for the features and how its website explains them (section 3.8 and Appendix C). Its home service customers are Hey Day customers too.
  - **HoneyBook** for the client flow.
  - **Togather, ClassBento, Airbnb Experiences, LetsBatch and Yuup** for how event and class customers and suppliers behave (section 3.3a).

**Hey Day grows with the business, the way Tipsy grew.**
- Tipsy started with one person delivering the cocktail class.
- It became an owner-operator business, then a team of about 231 bartenders run from one system.
- Now the owners are automating themselves out of the day-to-day: in one booking, 23 of the 36 business-side steps run by themselves.

Hey Day offers every business the same path:

| Stage | What it looks like | What Hey Day does for them |
|---|---|---|
| Doing it all yourself | One person selling and delivering: a photographer, a cleaner, a class teacher | Instant quotes, online booking and payment, one inbox, follow-ups and reviews, so the admin stops eating the evenings |
| Owner-operator | The owner still delivers, with a few helpers or subcontractors | Shift offers, the team’s pay and tips, checklists, a client portal |
| A team | The owner runs the business and a team delivers | Hiring and onboarding, the Command Centre, reports, profit per job, AI replies |
| It runs itself | An overseer handles the exceptions, the team delivers, and the system does the rest | Automations the owner sets, AI that drafts and asks for approval, and alerts when something needs a person |

The plans suggested in section 3.6 (Solo, Crew, Operator, Group) follow the same path.

---

## 2. Where this comes from: the Tipsy system

Tipsy Parties is a mobile cocktail bar and cocktail class business trading in the UK (tipsyparties.co.uk) and the US (tipsyparties.com, Lake Tahoe, the Bay Area and nearby). Over 2026 its owners built their own system to run the whole business. It is the proof behind Hey Day.

Verified facts about the system (from reading the code on 11 to 12 September 2026):

- 3,774 code files, 824 connection points (APIs), 855 database changes, 140+ scheduled automations, 25+ outside services connected.
- It runs the whole chain: instant quotes, follow-ups, booking and payment, reminders, staffing with shift offers to freelancers, shopping and kit lists, event-day check-in, tips, pay, feedback, complaints, recruitment and onboarding, an AI inbox across email, WhatsApp, calls and texts, profit-based Google Ads tracking and reporting.
- About 231 working bartenders (September 2026).
- In one Tipsy booking the business side has 36 steps: 23 run by themselves, 2 are being tested to, and 11 are still done by hand.

**The honest limits** (section 7 of the Tipsy review covers these): it was built for one business in one country. Selling it needs (a) one system that keeps each client’s data separate, (b) Tipsy’s own rules turned into settings each client controls, (c) taking payments on behalf of other businesses (for example Stripe Connect), and (d) US versions of pay, worker checks and texting rules. Tipsy’s US arm currently runs on a separate, smaller app.

---

## 3. Hey Day

### 3.1 The idea in one line

**Hey Day runs your whole business, whether you’re delivering the service or hosting the experience.**

Many event and activity suppliers sell one skill two ways:

| Supplier | As a service at someone’s event | As an experience or class |
|---|---|---|
| Bartender | Bar service at a party or wedding | A cocktail-making class |
| Photographer | Shooting a wedding or event | A photography workshop |
| DJ or musician | Playing a party | A DJ or music lesson |
| Chef or caterer | Private dining or catering | A cooking class |
| Florist | Event flowers | A flower-arranging workshop |
| Make-up artist | A bridal team on the day | A make-up masterclass |
| Magician or entertainer | A show | A magic or circus-skills workshop |
| Artist | Live painting at an event | A paint-and-sip night |
| Private chef | Private dining or a supper club | A cooking class |
| Hospitality venue or pop-up bar | Private hire and events | A masterclass or tasting |

**Plenty of service providers sell one thing and need the same tools:** a cleaning company, a landscaper, a tour guide, an escape room, a hairdresser. Hey Day runs their quotes, bookings, payments, team and follow-ups too. Where a business sells both a service and an experience, Hey Day runs both in one diary.

Existing tools make them choose: HoneyBook handles proposals and contracts for the service, and FareHarbor, Peek or Bookwhen handle tickets for the class. None handles both, plus the team who deliver them. Tipsy already sells both (bartender hire and cocktail classes) from one system, which is the proof that it works.

**Many of these suppliers also sell through marketplaces.** Examples: Togather (event food, drink and entertainment), ClassBento and Yuup (classes and experiences), Airbnb Experiences, LetsBatch (team and group experiences), and HoneyBook’s directory. Those platforms bring customers, but they take a commission and often keep the customer. The supplier still has to run everything else somewhere: direct bookings, bespoke quotes, the team, repeat customers and the other channels.

**Hey Day is the supplier’s home base.** Direct bookings and marketplace bookings sit in one diary, the customers are the supplier’s own, and everything from quote to rebooking runs in one place. Hey Day’s own marketplace comes later (section 3.3a).

### 3.2 Who it’s for (US)

From the market research in this project:

| Segment | US size | What they use now | Where to reach them |
|---|---|---|---|
| Mobile bars and drinks carts (**start here**) | About 1,083 counted in 2022, an undercount | Check Cherry, Flashquotes, HoneyBook, some Jobber | Mobile Bev Pros Facebook group (6,400), The Knot’s bar category, GigSalad, The Bash, US Bartenders Guild |
| Caterers with event staff | 13,222 firms with staff, averaging 11 staff each | Caterease, Total Party Planner, Curate | NACE (40+ chapters); Cater+Event show, New Orleans, 22 to 25 March 2027 |
| Photo booth companies | About 3,322 | Check Cherry | Photo Booth Expo, Las Vegas, 8 to 10 February 2027; Photo Booth Owners Facebook group (4,600) |
| DJ and entertainment companies | Part of 38,677 performer firms with staff | Check Cherry, DJ Intelligence | Mobile Beat DJ Con (same week as Photo Booth Expo); GigSalad (110,000+ listed) |
| Private classes and team-building | Not counted separately | FareHarbor, Peek, Xola, Classpop! | Classpop!, corporate planners |
| Hosts already selling on marketplaces (classes, experiences, event food and drink) | Togather alone lists 1,500+ vetted UK suppliers, including mobile bars; Batch lists 5,000 US experiences | ClassBento, Airbnb Experiences, Yuup, Togather, LetsBatch, plus their own spreadsheets | Their public listings on those platforms, and host communities |
| Private chefs, supper clubs and pop-up bars | Not counted separately | HoneyBook, marketplaces, spreadsheets | Food and drink communities, marketplaces |

**Everyone in this section is a target.** Mobile bars are marked “start here” only because Tipsy proves the product there.

The groups below already use software, but it covers only part of the job. None of it grows with them from one person to a business that runs itself (section 1).

| Group | What they use now | Where Hey Day can be stronger |
|---|---|---|
| Solo photographers, planners and other creatives with no team yet | HoneyBook, Dubsado | Instant prices the client can adjust, online booking against real availability, workshops and classes alongside the service, and team tools ready for when they take someone on |
| Home services and trades (cleaning, landscaping, handyman, removals and more) | Jobber, Housecall Pro | Quotes the customer can adjust live, shift offers to subcontractors who accept or decline, WhatsApp in the same inbox, and a listing on the Hey Day marketplace |
| Tours, activities and escape rooms | FareHarbor, Peek, Xola | Private groups and bespoke quotes next to the tickets, bookings at the customer’s place as well as yours, the team and their pay, and customers who stay yours |
| Other service providers (beauty and wellness, fitness, tutoring, pet care, rentals) | Appointment apps and spreadsheets | Quotes and packages for group and event bookings (bridal parties, wellness days), memberships and recurring bookings, the team, and follow-ups that bring customers back |

Before any of this goes on the website, check each rival’s current features on the day. The sizes of these groups, and where to reach them, still need researching (section 8, question 13).

### 3.3 What Hey Day does, in the order an owner needs it

This is the backbone of the website’s “How it works” story. Full detail, with status, is in Appendix B.

1. **Get found:** a booking-ready page, profit-based ad tracking, ad audiences, drop-off tracking, social links tracked to enquiries.
2. **Catch every enquiry:** one inbox for email, WhatsApp, texts and calls; autoresponders; missed-call rescue; spam rescue; AI replies drafted within minutes.
3. **Price it instantly:** a quote builder the owner sets up (questions, variables, prices); instant good, better and best quotes; interactive quotes the customer can adjust; busy-date and off-peak pricing; packages, bundles, recurring plans and memberships; price lists for regular clients and agencies.
4. **Follow up without chasing:** follow-ups that change with the lead (hot, urgent, high value, easy, off-peak), paused for dates you can’t do; WhatsApp nudges; abandoned-checkout recovery; discount codes and partner links.
5. **Take the booking:** instant booking by the owner’s rules (anyone, check the diary or team first, or rules by location, date, size or value); deposit or full payment online; terms signed in the same step; payment plans, direct debits and gift vouchers.
6. **Plan the event with the customer:** a customer portal for details, choices and changes; automatic reminders; menus and share links; allergies and special requests; a clear “all set” message.
7. **Staff it:** shift offers to the team, ranked by distance, reliability and rating; clash and travel checks; kit and shopping lists; employees and subcontractors each handled correctly.
8. **The day:** check-in with reminders, travel times, what to bring, an operator screen, QR or tap tipping.
9. **Afterwards:** feedback the next day; thumbs up leads to a referral code, then a review request; thumbs down leads to a “how can we improve?” questionnaire and the complaint loop (AI drafts, team member responds, manager signs off); win-back, loyalty and membership offers; cross-promotion (“you loved the class, now book the bar for your party”); and remarketing to everyone who has given consent.
10. **Pay the team:** pay worked out automatically, payouts, expenses, tips shared.
11. **Run the office:** Command Centre, tasks that chase themselves, audit trail, permissions, a policies hub, AI that knows the business.
12. **Hire more people:** applicant screening, interviews, ID and right-to-work checks, contracts, onboarding, training.
13. **Know the numbers:** ask questions in plain English, a morning report, profit per ad, missing-money checks.
14. **Grow:** areas and branches, partners and agencies, AI cost control, and later a Hey Day marketplace.

**The site framework: the whole flow, in the order it really happens**

Jem’s starting point: get ahead of the game, get found, quote instantly, follow up automatically, and win the client with instant booking or an instant availability check. The table below carries on from there to the end of a real booking. It works for every kind of business in section 1; the variations follow the table.

| Step | What really happens | What Hey Day does |
|---|---|---|
| 1. Get ahead of the game | Before anyone asks, the prices, packages, rules, diary and team need to be ready, and old customer lists need a home | The AI setup assistant, starter settings for each type of business, importing clients and bookings from old tools, the booking page |
| 2. Get found | People search, see an ad, ask a friend or an AI, spot the business on a marketplace, or were a guest at one of its events | Booking page, marketplace listing, ads that know which bookings pay, reviews, referrals, guest capture at events |
| 3. Catch every enquiry | Enquiries arrive by form, email, WhatsApp, social messages and phone, usually while the owner is busy, and some are missed calls | One inbox, an instant first reply, missed-call capture, knowing who’s getting in touch, lead types |
| 4. Quote instantly | They want a price now, and will ask the next business if they don’t get one. Some jobs need a few questions or a visit first | The instant quote the customer can adjust; AI-drafted quotes for bespoke requests; booking a visit when one is needed |
| 5. Follow up automatically | Many people go quiet: they compare, ask their partner or wait for payday | Follow-ups that change with the lead type and stop the moment they reply; answers to their questions drafted by AI; reminders when a checkout is left half done |
| 6. Win the client | They say yes, but only if the date is still free and booking is easy | Instant booking, or an instant check that the diary and the team are free; deposit and signed terms in the same step |
| 7. Plan it together | The weeks between booking and the day: guest numbers change, choices are made, questions come in, the balance falls due | The client portal, reminders, change requests, balance chasing |
| 8. Staff it and get ready | Someone has to deliver it, with the right kit. Short of people? Hiring starts | Shift offers to employees or subcontractors, clash and travel checks, shopping and kit lists, briefings, hiring and onboarding |
| 9. The day | It goes to plan, or something changes at the last minute | Reminders, travel times, check-in, alerts, emergency cover, tips by QR or tap |
| 10. Get paid | Money arrives in stages: a deposit at booking, the balance before the day, extras and tips on the day, a final invoice after. The team need paying too | Deposits, balances, invoices, chasing, tips, team pay and payouts |
| 11. Look after them | The next day is when they’re happiest, or when a problem comes out | Next-day feedback. A thumbs up gets a referral code, then the review ask. A thumbs down gets “how can we improve?” and the complaint loop |
| 12. Get rebooked | Repeat business often slips away simply because nobody asked | Win-back and anniversary messages, loyalty, memberships, gift vouchers, quiet-date offers, cross-promotion |
| Throughout: it runs itself | The owner moves from doing every step to overseeing the exceptions | Tasks, the Command Centre, reports and profit per job, and the AI levels in section 3.8. This is the growth path in section 1 |

**Variations, so the flow fits every business:**
- **Classes, tickets and appointments** skip steps 4 and 5: people book a seat or a slot straight away.
- **Some trades and bespoke jobs** add a visit or a call between steps 3 and 4.
- **Recurring work** (a weekly clean, a monthly membership) loops from step 10 back to step 7 instead of ending.
- **Marketplace bookings** arrive at step 6 already won. Hey Day’s job is then steps 7 to 12, plus bringing the customer back to book direct (section 3.3a).

**Six headline groups for the website** (for the menus, the homepage and the feature index; Jobber uses four):

| Group | Steps | The promise |
|---|---|---|
| Get ahead | 1 | Ready before the first enquiry |
| Get found | 2 | People find you, and you know which efforts pay |
| Win the client | 3 to 6 | Every enquiry caught, priced, followed up and booked |
| Run the day | 7 to 9 | The planning, the team and the day itself, handled |
| Get paid | 10 | Every payment in, every payout out |
| Get rebooked | 11 and 12 | Happy customers come back and bring friends |

“It runs itself” isn’t a seventh group. It’s the thread through all six, and the growth path in section 1. The names are suggestions for Jem to change.

### 3.3a Marketplaces: their customers, their suppliers, and Hey Day

**The principle:** work *with* the marketplaces first, and compete with them later.

- **Now:**
  - Hey Day brings a supplier’s marketplace bookings into the same diary as their direct bookings, so capacity, staff and payments line up and nothing is double-booked.
  - It also gives them their own booking page, so repeat customers book direct.
- **Later:** Hey Day’s own marketplace lists every Hey Day supplier with instant prices and live availability, and lets the supplier keep the customer.

**The marketplaces, side by side (studied 13 September 2026).** Quotes are near-verbatim; spot-check before reuse.

| | What customers get | What suppliers get and pay | Who owns the customer |
|---|---|---|---|
| **Airbnb Experiences** | Hosted experiences priced per guest or per group (for example $129 per guest, up to 6), with reviews, dates and messaging | “Get paid to do what you love”. A **20%** fee, paid the day after. Needs 5 years’ experience, insurance, and a 20% penalty if the host cancels | Airbnb. Bookings or payments off the platform are banned, and so is marketing to guests |
| **Airbnb Services** | People who come to you: chefs, catering, photography, hair, make-up, massage. Priced packages with minimums, and “custom menu, pricing upon request” | “Give your business a new home”. A **15%** fee (at least $6). Needs 2 years’ experience | Airbnb, as above |
| **Yuup** (UK: Bristol, Bath, Birmingham, Cardiff, Nottingham, Brighton) | Local experiences per person or per group (“£480 for 10, then £40 per extra guest”), a teams hub, gift cards, 4.9 from 15,387 reviews | “Turn your passion into profit”. Free to list. The commission is agreed privately, not published. **5%** on the host’s own direct bookings, but only within 24 hours of the click. One portal for Yuup, direct and offline bookings. Weekly payouts. Needs £5M public liability cover | The host is the data controller. But Yuup’s time slots are for Yuup bookers only, and custom dates go to Yuup’s inbox, not the host’s |
| **ClassBento** (Australia, UK, US; now owns Obby) | Creative classes, team activities, experience gifts and live-streamed classes with kits; 4.9 from 1,149 Trustpilot reviews | “Top teachers earn $100,000+ per year”. **20%** (including VAT) on marketplace bookings, and **3.9% + £0.25** on bookings through the teacher’s own booking widget. “We’ll automate your admin work” (read through a page renderer, so spot-check) | Not stated on the pages read |
| **Obby** (UK classes, acquired by ClassBento) | Classes at £30 to £80 per person, and team-building | “Earn money teaching with Obby”. **17.5%** commission on the free and £14 plans, **12.5%** on the £24 and £39 plans, and **0%** on bookings from the teacher’s own website (plus 2.5% card fees). Paid at the end of the month the class ran | Obby. It is the data controller, and teachers may use customer details only to fulfil the order |
| **Togather** (UK) | One enquiry matched to suppliers, with quotes from “£35 per guest”. Money is held until after the event, deposits start at 10%, and a replacement supplier is guaranteed (Protect+). Corporate accounts can pay by invoice | “£2k typically per month”, and about **15%** commission taken from the quote. Free to join and quote. About 1 in 20 applicants accepted, needing insurance, a food hygiene certificate and an alcohol licence. Up to 15 suppliers are sent each enquiry. Paid on the Tuesday or Thursday after the event. Separate dashboards for festival traders (Togather Live and Live 360) | Togather. Contact details only after confirmation, and suppliers can never move repeat bookings off the platform, on pain of removal |
| **Batch** (letsbatch.com, US group parties: hen and stag dos, birthdays) | Group planning with polls, a shared itinerary and cost-splitting; 5,000 experiences priced per person or per party | “Reach 3 million party planners.” **Zero commission**: an optional flat monthly fee instead. Paid tiers add a unified inbox (web chat, SMS and social DMs) and a website chatbot | The supplier: traffic goes “straight to your site so you own the booking, the data, and the relationship” |
| **HoneyBook** | Not a marketplace for customers; a directory of pros | Software at $29 to $109 a month (see 6.2) | The supplier |

**Three fee models suppliers meet:**
- **Commission that keeps the customer:** Togather about 15%, Airbnb 15 to 20%, ClassBento 20%.
- **Commission on marketplace bookings, but nothing on the supplier’s own bookings:** Obby 0% on its own site, ClassBento 3.9% + £0.25 on its widget, Yuup 5% within 24 hours.
- **A flat fee, with the supplier keeping the customer:** Batch.

The fees and rules above come from each platform’s own pages on 13 September 2026. Togather’s customer service fee, Batch’s monthly prices and Yuup’s standard commission aren’t published.

**What the marketplaces leave to the supplier (Hey Day’s job)**
- **Bespoke quotes, deposits and changing the numbers.** Chefs’ “pricing upon request”, weddings, corporate events. Yuup even sends custom requests to its own inbox.
- **One diary across every channel.** Airbnb and Yuup lock a time slot to their own bookers, and Airbnb charges 20% if the host cancels, so double-booking is costly.
- **Keeping their own customers, repeat bookings and referrals.** Airbnb bans marketing to its guests.
- **The team:** assistants, extra staff, rotas and pay. No marketplace covers staff.
- **Everything after the booking:** menus, shopping and kit lists, travel, dietary needs, running orders.
- **Insurance, licences and tax,** all left to the host.
- **Direct bookings from their own website with no commission.**
- **One set of accounts across all channels:** what each channel really earns (15% vs 0%), and payouts on different schedules.
- **Documents:** insurance, hygiene certificates and alcohol licences, each uploaded separately to every platform, each with its own expiry date.
- **Reviews spread across platforms.** Togather even asks suppliers to re-enter outside reviews by hand.
- **Extras after the event,** handled by email on Togather.

**Hey Day as the neutral home base.** Yuup (one portal for Yuup, direct and offline bookings) and ClassBento (a booking system for teachers) are both trying to become the supplier’s system. But each joins things up around itself and charges for it. Hey Day would be neutral:
- **Bring in bookings from every marketplace** and block those slots everywhere else, which respects the “slot is only for our bookers” rules.
- **Take direct bookings and bespoke quotes** at no marketplace commission.
- **Label every customer by where they came from, and apply that source’s rules automatically.**
  - **Managing and delivering a marketplace booking in Hey Day is always fine, and is the point.** That covers the diary, the team, shopping and kit lists, logistics, the event details and the payments. The marketplaces’ own terms allow using customer details to fulfil the booking. Only marketing to those customers and moving them off the platform are restricted, and only by some platforms.
  - **Most customers can be marketed to, with consent:** direct bookings, the supplier’s own website, social media, WhatsApp and phone enquiries, event guests who opt in, and (later) Hey Day marketplace customers.
  - **A few marketplaces restrict it for the customers *they* send.**
    - Togather bans suppliers from steering its customers into repeat bookings elsewhere.
    - Airbnb bans commercial messages without the guest’s express consent.
    - Obby limits its customers’ details to fulfilling the order.
  - **Hey Day warns before anything would break those rules.** Breaking them can get a supplier removed from a platform that may still send them a lot of bookings.
- **Turn every event into a source of new customers.** The guests at an event are not the marketplace’s customers. A QR code on the menu, the tip jar or the photo gallery can invite guests to opt in, book their own event or join a class. Check each platform’s terms before relying on this.
- **Cross-promote and remarket.**
  - **Within the supplier’s own offers:** a customer who did a cocktail class is offered the bar service for their next party, or a different class.
  - **Across suppliers, once the Hey Day marketplace exists:** customers are recommended complementary experiences from other Hey Day suppliers.
  - **Always with consent,** and with rules about who gets recommended, so suppliers aren’t pointing their customers at rivals.
- **Show the true margin by channel:** a Togather job is worth about 15% less than the same job booked direct.
- **Store documents once,** with expiry reminders, ready to send to every platform.
- **Give direct bookings the protections customers like on marketplaces:** clear line-item quotes, deposit plans, and a guarantee. That removes the main reasons to book through a middleman. Whether Hey Day can hold customers’ money until after the event needs checking, because holding other people’s money can bring extra rules.

**The catch:** the research found no public way to pull bookings out of these marketplaces. Airbnb offers only Google Calendar sync. Linking them may start with calendar feeds, plus reading the marketplaces’ booking-confirmation emails into the diary (Tipsy already reads supplier and delivery emails automatically), plus manual entry. This needs confirming before the website promises it.

**Hey Day’s own marketplace** has its own brief, `HEYDAY-MARKETPLACE-WEBSITE-BRIEF.md`, covering its lessons, pages and policies.

### 3.4 Why Hey Day wins

- **The whole chain in one place.** Research found no US tool that joins quote, booking, payment, staffing, crew pay and after-care for event businesses. Every tool does either the customer side (Check Cherry, Flashquotes, HoneyBook) or the staff side (Liveforce, StaffConnect).
- **Service and experience together.** Proposals for the service and ticketed or private classes for the experience, in one diary.
- **The team, not just the office.** Shift offers, pay, check-in and tips for the people who deliver. HoneyBook’s “team” means office staff. Jobber has no freelance or subcontractor crews.
- **Prices that work themselves out.** Per guest, per hour, by distance and date, with the margin shown. HoneyBook doesn’t calculate prices; Jobber quotes line items.
- **Every channel, one inbox, AI that knows the booking.** Including WhatsApp, which HoneyBook doesn’t mention.
- **It grows with them.** From one person doing every job to a business that runs itself (section 1).
- **Built and proven by operators.** Tipsy runs on it.

### 3.5 Product principles the website must communicate

- **Everything is customisable.** Each setting starts from a sensible default for the owner’s industry, the AI suggests improvements from their own data, and the owner has the final say. Nothing the AI suggests goes live until they accept it.
- **Customisable, not complicated.** Industry starter kits and an AI setup assistant fill in the settings from the owner’s website and old emails.
- **A settings studio anyone can use.** Every automation reads like a sentence: *When [a quote is sent], wait [3 days], then send [this message] by [email and WhatsApp] to [the customer], unless [they’ve booked].* Messages can be designed in a drag-and-drop editor, written by AI, or imported from Mailchimp, Canva or HTML.
- **AI drafts, a person approves.** Money and promises always pass a person. Trust is widened one task at a time.
- **It can run itself.** The goal is an owner who only handles exceptions, while the team deliver.

### 3.6 Pricing (benchmarks only; not decided)

| Benchmark | Price |
|---|---|
| HoneyBook | $36 / $59 / $129 a month (US, monthly billing); £29 / £49 / £109 (UK, yearly) |
| Jobber | $49 / $139 / $299 / $499 a month; add-ons $29 to $99 |
| Check Cherry | $29 / $59 / $139 a month, unlimited staff logins |
| Flashquotes | Free to $199 a month, plus a fee added to the customer’s bill |
| Staffing marketplaces | 15% to about 40% on top of wages |

Possible structure to test, following the growth path in section 1: **Solo** (quotes, bookings, payments, inbox, follow-ups) → **Crew** (adds staffing, pay, hiring) → **Operator** (adds Command Centre, advanced pricing, reports, AI control) → **Group** (branches, franchises). Plus payment processing fees and optional add-ons (AI receptionist, extra phone numbers). Owners are angry about price rises (HoneyBook +89% in 2025, Dubsado +75% in December 2025), so a price-lock promise could be a selling point.

### 3.6a How Hey Day makes money (options; the decision is Jem’s and Russell’s)

**The goal:** move suppliers’ customers from marketplaces to their own Hey Day bookings, and earn from that move.

**Suggested: don’t charge a fee on bookings imported from other platforms.**
- The supplier has already paid that marketplace 15 to 20%, so a second fee on the same booking feels like a tax.
- Suppliers would simply stop importing, which breaks the one-diary promise.
- It’s hard to enforce, because imports arrive by calendar feed, email or manual entry.
- Importing is what gets their whole business into Hey Day. Treat it as the hook, not the till.

**Where the money comes from instead (the Jobber, HoneyBook and Square pattern):**
1. **Monthly plans by features and team size** (Solo, Crew, Operator, Group). This is predictable income, and the benchmarks are $29 to $499 a month.
2. **A small margin on payments taken through Hey Day** for direct bookings: deposits, balances, tips, gift vouchers and memberships. HoneyBook and Jobber earn much of their revenue this way, and more than half of Jobber’s transactions now go through its own payments. This lines up everyone’s interests: every customer who moves from a marketplace’s 15 to 20% to the supplier’s own Hey Day booking page saves the supplier money *and* earns Hey Day a payment margin.
3. **Paid add-ons that cost money to run:** an AI receptionist, extra phone and WhatsApp numbers, and message bundles.
4. **Later, a marketplace commission,** only on customers the Hey Day marketplace brings. It would be lower than Togather’s, perhaps on the first booking only, and 0% on customers the supplier brought themselves.

**Getting suppliers hooked.** A free or very cheap starting plan with a higher payment fee. Paid plans lower that fee (“pay monthly to cut your transaction fees”), and the higher tiers unlock the team, AI and growth features. Obby, Square and Flashquotes all use versions of this. The free plan must cap the things that cost money to run (AI use, texts and WhatsApps, phone numbers), because AI alone cost Tipsy about $164 a fortnight.

**The pitch this enables:**

> “Keep your customers and cut your commission. A supplier doing £100,000 a year through a 15% marketplace pays £15,000. The same bookings taken direct through Hey Day cost card fees plus a monthly plan.”

Use real figures once prices are set. **Moving customers across the right way:**
- the supplier’s own booking page
- referral codes
- rebooking offers to direct customers
- opt-ins from event guests

Always with Hey Day warning before a marketplace rule would be broken (section 3.3a).

**What to decide now, and what can wait:**
- **Now**, because the pricing page and the positioning depend on it: the *shape* of the model. That covers subscription plus payments, whether there’s a free plan, and whether imports are free.
- **Later:** the exact prices, fee percentages and marketplace commission.

### 3.7 Hey Day website plan


**Proposed site map**

- Home
- How it works: the whole flow from section 3.3, from getting ahead to getting rebooked, with the customer, the team and the office side by side
- Features (index), and one page per feature group:
  - Quotes and pricing
  - Online booking and payments
  - Classes and experiences (sessions, capacity, tickets, private groups)
  - Customer portal and event planning
  - Inbox and AI replies
  - Follow-ups and automations (the settings studio)
  - Team scheduling and shift offers
  - Pay, tips and expenses
  - Reviews, referrals, gift vouchers, loyalty and memberships
  - Sell everywhere: your own booking page and the marketplaces you use, in one diary
  - Hiring and onboarding
  - Reports and the Command Centre
  - AI assistant
- **Who it’s for: one page, not one page per type of business.** A list of types can never be complete, and anyone missing from it would think Hey Day isn’t for them. The page has:
  - **who it suits,** written as examples rather than a closed list (section 1), ending with “and anyone who sells their time, skills or an experience”
  - **the solutions,** sorted by what they fix, each linking to its feature page
  - **the growth path** from section 1: doing it all yourself, owner-operator, a team, and a business that runs itself
  - **the example stories** (next item)
- **Example stories, instead of one page per type of business.** Each story follows one kind of business as it grows, and shows which Hey Day features it uses at each stage. The first seven:
  - a caterer
  - a class host
  - a performer
  - a photo booth company scaling up
  - a mobile bartender (Tipsy Parties’ own story, with real, approved numbers)
  - an event staffing agency
  - a photographer
  - **Labelling:** until real customers exist, every story except Tipsy’s is clearly labelled as an example, with no invented names, quotes or numbers. Real customer stories replace them as customers join, and more kinds of business can be added at any time.
- Pricing
- Compare: Hey Day vs HoneyBook, vs Jobber, vs Check Cherry, vs Flashquotes
- Customer stories: the example stories above, with Tipsy Parties as the first real one
- Resources: free tools (a pricing calculator for classes and events, a quote template, a “leak check” quiz), guides, templates, blog
- About (built by operators), Contact, Book a demo, Start free trial
- Support and onboarding, Security and privacy, Terms, Privacy

**Homepage outline**

1. Headline and subheadline (options below), with “Start free trial” and “Book a demo”.
2. Who it’s for: a strip of the kinds of business it suits, ending “and anyone who sells their time, skills or an experience”, linking to the Who it’s for page and the example stories.
3. The problem: six apps and a group chat; quotes nobody chases; Saturdays filled by phone.
4. How it works, in the six groups from section 3.3: get ahead, get found, win the client, run the day, get paid, get rebooked.
5. Feature highlights with screenshots.
6. Proof: “Built by Tipsy Parties, and running Tipsy every day” with real, approved numbers.
7. Comparison teaser: what HoneyBook, Jobber and Check Cherry don’t do.
8. Pricing teaser.
9. FAQ.
10. Final call to action.

**Devices to include (from the research in section 6)**

- **One framework across the whole site:** *Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked* (section 3.3). Each has a real, approved stat and, once there are customers, a named customer.
- **“Try free now, pick a plan later”:** a two-field signup (or Google or Apple), no card, the trial on the top tier. “Book a demo” is always the second button, with a phone number in the header.
- **A live demo on the homepage:** book a bartender for a party *and* a seat in a cocktail class on the same page, with no signup.
- **Example stories, not one page per type of business.**
  - Each story opens with that business’s biggest chore, for example “Stop chasing clients for deposits and guest numbers”.
  - It follows the business through each stage of growth.
  - Where the business sells both a service and an experience, it shows them side by side.
  - Stories stay labelled as examples until real customers replace them.
- **Free tools with no email wall:** a class and event pricing calculator, a quote template, a “how much are you leaving on the table?” score. Upsell only after the value.
- **A money stat from Tipsy’s real data, with the maths shown,** once approved.
- **Comparison pages:** vs HoneyBook, Jobber, Check Cherry, Flashquotes, and “vs spreadsheets”. Dated, honest, with a switching plan and free migration.
- **Trust:** one audited headline number, a money-back guarantee, a free setup call for everyone, support hours that include evenings and weekends, and a plain security page.
- **A page written for AI search tools** that explains Hey Day.

**Homepage copy (draft for Jem to edit)**

Rules for this copy:
- US English.
- Any number marked `[needs approval]` stays out until Jem and Russell approve it.
- Anything not built yet says “coming soon”.
- “Start free trial” opens early access until the product exists, and “No card needed” only appears once that’s true.

**1. Hero** (big type, so it’s kept short)
- **Headline:** “Do what you love. Let Hey Day run the rest.”
- **The line under it:** “You didn’t start a business to work for it. We make it work for you.”
  - This tighter version of Jem’s line is already live on the jobbie site (commit d06ee47, 13 September 2026), along with the headline and a scroll animation (commit 594b770). Keep all three.
  - Jem’s original wording, if wanted instead: “You didn’t start your business to work for it. We make your business work for you.”
- **Then a smaller line that says what it is:** “The all-in-one app for events, entertainment, activity, class and service businesses. Instant quotes, bookings and payments, your team, your inbox and every follow-up, in one place that grows with you.”
- **Buttons:** “Start free trial” and “Book a demo”.
- **A rotating line underneath:** “Built for caterers / class hosts / photographers / mobile bars / DJs / cleaners / escape rooms / you.” Ending on “you” keeps it open to everyone.
- **Other headlines to test:**
  - “Get booked. Get paid. Get your evenings back.”
  - “From the first enquiry to the next booking, handled.”

**2. Proof strip**
- “Built by Tipsy Parties. Running Tipsy Parties every day.”
- “In every Tipsy booking, 23 of the 36 behind-the-scenes steps now run themselves.” `[needs approval]`

**3. Statement** (one large sentence, lots of space; replaces the old site’s line)
- Braced label: `{ why Hey Day }`
- “Six apps, a group chat and your evenings. That’s how most small businesses run. It doesn’t have to be.”

**4. Sideways band: the six groups** (section 3.3), with their features under each:

| Group | Line |
|---|---|
| Get ahead | “Ready before the first enquiry. Set up in an afternoon, with AI filling in the hard parts.” (setup assistant coming soon) |
| Get found | “Be the one they find, and know which efforts actually pay.” |
| Win the client | “Every enquiry caught, priced, followed up and booked, even while you’re busy.” |
| Run the day | “The planning, the team and the day itself, handled.” |
| Get paid | “Every payment in. Every payout out. No chasing.” |
| Get rebooked | “Happy customers come back, and bring their friends.” |

**5. Feature rows** (keep the current look: a highlighted phrase inside each headline). Use only features that work today:

| Headline | The copy under it |
|---|---|
| “Stop losing bookings while you **work out the price**.” | Customers see a price in seconds, change it themselves, and book with a deposit. Then the stat “Quotes sent within 4 hours book 25% more often”, credited to Flashquotes, or the Harvard speed-to-lead finding instead (section 3.9). |
| “Stop checking **five apps** to find one message.” | Email, WhatsApp, texts and calls in one thread per client, with AI drafting replies that already know the booking. |
| “Stop texting your whole team to **fill one shift**.” | Offer the job to the right people, and let the first yes take it. Clashes are caught before they happen. |
| “Stop spending your time **chasing clients** for payment.” | Deposits, balances and reminders by email and WhatsApp, until it’s paid. |

**6. What it does**
- Heading: “One place for the whole job, from first hello to five stars.”
- Under it, ten capabilities with one line each: quotes, booking, scheduling, staffing, client records, inbox, payments, profit per job, reports, compliance. Rewrite jobbie’s current lines in host and service language.

**7. The AI**
- Heading: “AI that works the way you do, and only as much as you want.”
- Line: “It reads the booking, your prices and your policies before it writes a word. You decide what it sends.”
- **Three cards:**
  - **Draft:** it writes, you send.
  - **Draft and train:** it learns from every correction.
  - **Autopilot:** it handles the simple ones by itself (coming soon).

**8. Who it’s for**
- Heading: “Built for businesses that sell time, skills and experiences.”
- The list of examples (section 1), ending “If you sell your time, your skills or an experience, it’s for you.”

**9. Grows with you**
- Heading: “From doing it all yourself to a business that runs itself.”
- The four stages from section 1, one line each.
- Then: “Tipsy Parties started with one person behind a bar. Today a team of [number] bartenders runs from one system.” `[needs approval]`

**10. Sell everywhere**
- Heading: “Selling on Airbnb, ClassBento or Togather? Keep them.”
- Line: “Bring every booking into one diary, and win your customers back to book direct.” (coming soon)

**11. Switching**
- Heading: “Switching is the part everyone dreads. So we made it easy.”
- **Three steps:**
  - Bring your clients and bookings with you.
  - Let the AI suggest your settings (coming soon).
  - Talk to a real person when you need one. `[support hours to confirm]`

**12. Example stories**
- Heading: “See how it works for businesses like yours.”
- A rail of the seven story cards, with Tipsy first (section 3.7).

**13. Closing**
- Heading: “Ready for your Hey Day?”
- Buttons: “Start free trial” and “Book a demo”. The marketplace tagline, “Make your day a Hey Day.”, can sit in the footer to tie the two sites together.

---

### 3.7a What the jobbie site already has, and what it needs to become Hey Day

Checked on 13 September 2026 at commit `32aa33c`.

**Already built, and worth keeping:**

- **The homepage structure** it started with, in this order:
  - a big-type hero
  - one statement
  - a sideways band sorted by Jobber’s four outcomes (Get found, Win the work, Run it without you, Keep more of it)
  - feature rows
  - a showcase
  - a footer
- **Four product sections,** in the order getjobber.com uses:
  - what it does: “One system for the whole job, start to paid.”, with 10 capabilities
  - the AI: “AI that has actually worked a Saturday.”
  - who it’s for: 16 named industries
  - switching: “Switching systems is the bit everyone dreads.”
- **20 feature pages built from one template,** plus an index sorted by outcome. The words live in `src/lib/features.ts` and the page in `src/components/features/feature-page.tsx`. Adding a Hey Day feature page means adding one entry. The page structure from section 5.5 is already there.
  - Get found: Reviews, Booking page, Campaigns, Referrals
  - Win the work: Quoting, Online booking, Enquiries, Follow-ups
  - Run it without you: Scheduling, Staff allocation, Job tracking, Time tracking, Client records, Client portal, Unified inbox, Team management
  - Keep more of it: Payments, Invoicing, Job costing, Reporting
- **Honest placeholders:** every customer quote is signed “Placeholder”, and every image is a coloured panel where the screenshot will go.

**Leftovers from the site it was copied from:**

- **The old site’s wording.** The logo reads “jobbie”, but most of the words still belong to an automation agency’s site. That includes the browser title, the hero, the menu (Features, Services, Projects, Contact) and the main button (“Start a conversation”). The build brief lists the exact wording to remove.
- **It sells a done-for-you service, not self-serve software.** The switching section’s first step is “We map it before we build it”, with “a fortnight of watching how you actually run”. That’s an agency’s promise. Hey Day needs:
  - “Start free trial” and “Book a demo” buttons
  - a pricing page
  - the self-serve setup described in section 3.5
- **The proof is framed as an agency’s client project.** The showcase and case study describe an agency building Tipsy’s system. For Hey Day the proof is that Tipsy Parties runs on this software every day (section 3.7, homepage item 6).

**Written for trades only:**

- **Every example is a trade.** The copy talks about vans, boilers, sinks, jobsites and clean kitchens. Trades are Hey Day customers too, so keep them. But so are event, entertainment, hospitality, activity and class businesses, and other service providers (section 3.2).
- **Hey Day’s industry list:** keep the trades that are there (cleaning, trades and maintenance, landscaping, removals, pet care, childcare and the rest). Then add:
  - private chefs, DJs and musicians, entertainers and photo booths
  - florists, and wedding and event planners
  - workshop and class hosts, and team-building providers
  - tours and activities, and escape rooms
- **Mix the examples on every feature page,** so that a cleaner, a wedding photographer and a pottery teacher each see themselves.

**UK words on a US-first site:** “postcode”, “fortnight”, “right to work”, “licences” and “colours”. Use ZIP code, two weeks, US worker checks (I-9 for employees, W-9 for subcontractors) and US spelling (section 0).

**Hey Day features with no page yet** (compare the site map in section 3.7):

- Classes and experiences: sessions, capacity, tickets, private groups
- Instant quotes the customer adjusts, with the price updating live
- Instant booking, with rules the owner sets
- The settings studio:
  - design or import follow-ups
  - choose when, how and who they go to, and what triggers them
  - autoresponders
- Lead types (hot, urgent, high value, easy, off-peak), with replies that change to suit
- Packages, memberships and recurring bookings
- Price lists for regular customers, and direct debits
- Gift vouchers, loyalty cards, and tips by tap or QR code
- The referral code first, then the review ask
- Sell everywhere: marketplace bookings in the same diary (section 3.3a)
- Shift offers to employees or subcontractors, who accept or decline
- Hiring and onboarding
- The complaint flow, event-day check-in and emergency cover
- The customer portal for event planning

**Claims to check before launch.** Some of jobbie’s copy describes things the Tipsy system doesn’t do yet (sections 5.2 and 5.3):
- clocking in and out by location, and time tracking (Tipsy has check-in only)
- Tap to Pay on the owner’s phone
- cards on file, charged automatically when the job is done
- route planning across several jobs
- job costing from logged hours
- customer referral links with rewards
- automatic review requests (Tipsy’s automatic ask is still to be restored)

Each one must be built before launch, or labelled “coming soon” (section 0).

---

### 3.8 Jobber is the model to learn from

Jobber serves home services, and Hey Day will too, so Jobber is both the model and a direct rival for those customers.
- **Why it’s the model:** it already solves most of the problems Hey Day solves, and its website explains those solutions better than anyone.
- **Proof there’s a market:** Jobber has 100,000+ customers and 400,000+ service pros, which shows that service owners will pay for this.
- **How to use it:** **use Jobber as the template for Hey Day’s feature set and website, and add the language of events, hospitality, activities and classes.**
- **The gap:** Jobber has no events, entertainment or class pages, so that space is open.

Section 3.2 says where Hey Day can be stronger than Jobber for home services.

**Don’t just copy Jobber.** Hey Day’s features come from three places, each with its own table below:
1. Jobber’s features, translated for Hey Day’s businesses.
2. Tipsy’s own features that Jobber doesn’t have, tweaked for any business.
3. Features neither of them has, built new for Hey Day.

**1. Jobber’s features, translated for Hey Day’s businesses**

| Jobber | Hey Day | At Tipsy today |
|---|---|---|
| Requests and online request forms | Enquiries from every channel, plus an instant quote form | Built |
| Quotes with markups, optional line items and package options | Instant quotes per guest, hour, distance and date; good, better and best packages and add-ons; quotes the customer can adjust live | Built, needs generalising |
| Customer e-signature on quotes | Proposal, terms and deposit in one step | To build |
| Automated quote follow-ups and AI-drafted quotes | Follow-ups that change with the lead (hot, urgent, high value), and AI replies that read the booking | Partly built |
| Online booking, with bookable services, drive-time limits and automatic assignment | Instant booking by the owner’s rules, plus seats in classes | Partly built (classes to build) |
| Client Hub: approve quotes, see jobs, pay, refer | A customer portal to plan the event: choices, menus, guest numbers, changes, payments, receipts | Built, needs generalising |
| Scheduling, dispatch and recurring jobs | The event diary and shift offers to employees or subcontractors; recurring agreements | Offers built; recurring to build |
| Route optimisation and GPS | Travel times and drive-time zones; check-in on the day | Partly built |
| Job forms and checklists | Pre-event checks, run sheets, and shopping and kit lists | Built |
| On-my-way texts and visit reminders | Day-before and day-of emails, crew briefing notes, check-in reminders | Built |
| Time tracking and timesheets | Check-in; clock-out and hours to build | Partly built |
| Invoicing, reminders, payments, Tap to Pay, tips, instant payouts | Deposits and balances, overdue chasing by email and WhatsApp, a QR tip jar shared by the crew, crew payouts and cash-out | Built (Tap to Pay to build) |
| Card on file, automatic payments, consumer financing | Payment plans, direct debits, memberships | To build |
| Marketing Suite: reviews, referrals, campaigns, website | After-care: a referral code, then a review ask; win-back and anniversary emails; loyalty, memberships and gift vouchers; a booking page | Partly (mostly to build) |
| AI Receptionist | An AI receptionist, plus one inbox for email, WhatsApp, calls, texts and app chat | Inbox built; receptionist to build |
| Copilot (business advice) | A weekly AI business coach, and asking the business questions in plain English | Reports built; coach to build |
| Reporting and job costing | Profit per event, per channel and per ad; missing-money checks | Built |
| QuickBooks sync and Gusto payroll | Accounts sync; payroll through a provider for employees, payouts for subcontractors | Partly built |
| Team management and permissions | Roles and permissions, employees and subcontractors handled differently, tiers, engagement watch | Built (worker types to build) |
| Pipeline (sales stages) | Lead labels and the office’s ranked list | Partly built |
| Custom automation builder | The settings studio: “When… wait… send… by… to… unless…” | To build |
| Jobber Plus (bigger teams, onboarding specialist) | Operator and Group tiers, with a setup specialist | To decide |

**2. Tipsy’s features to bring in (Jobber doesn’t have these, or not like this)**

Checked in the Tipsy code on 13 September 2026. “Built” means it works at Tipsy today; it still has to be opened up to other businesses.

| Feature | What it does at Tipsy today | The Hey Day version | Status |
|---|---|---|---|
| A CRM that fills itself | Every email, WhatsApp, text, call and app message, and every quote, booking, payment and note, on one record per person. What the business holds on them is read fresh whenever anyone, or the AI, deals with them | The same, plus custom fields for each type of business (allergies for a caterer, access notes for a cleaner, skill level for a class host) | Built; custom fields to build |
| Tasks | To-dos with tagged colleagues and deadlines, and reminders that chase each person | The same, with system-raised jobs, such as a call back, in the same list | Built |
| The AI email writer | Drafts every reply by reading the conversation so far, everything held on the person, the booking’s live situation (money owed, what’s locked in, who’s assigned, what’s already been said), the business’s knowledge, and the owner’s standing rules. A second check tests every draft against those rules: if it breaks one, it’s rewritten, and if it still breaks one, the person is told why. Notes show what it found and where, so the reader can trust it and press send. The owner’s corrections become rules that every later draft follows | The same for any business, reading that business’s own policies and procedures, prices and live availability. Three levels the owner chooses (below) | Built as drafts; nothing sends itself |
| Who’s getting in touch | Each message is sorted by who sent it: a lead, a current customer, a past customer, a team member. It also spots when a new message belongs to an enquiry already open. The reply is written to suit | The same, for every channel including calls | Built for messages |
| Call notes and follow-up emails | Every answered call lands in the inbox with a summary and who it was with. The owner can open the recording and transcript. One click drafts a recap email from what was said, for a person to send | The same, on the phone systems Hey Day supports | Built (Zoom Phone at Tipsy) |
| Voicemails transcribed | Voicemails arrive in the inbox as text | The same | Built |
| Missed-call call-back list | A missed call from a known number goes on the call-back list after an hour, unless someone has rung them back. Several calls from one person make one call back | The full missed-call flow below | Built for known callers |
| Everything else in section 5.4 | Instant quotes the customer adjusts, the availability check, shift offers, recruiting, payouts, check-in, kit lists, the complaint flow, hidden numbers, priority ranking, profit-based ad tracking, agent accounts, the event-planning portal, the AI control panel | Opened up for any business | See section 5.4 |

**Missed-call capture: the full version for Hey Day**

1. **A call is missed,** whether it went to an answering service or to voicemail.
2. **Hey Day works out who called from the number and what it holds on them:** a new enquiry, a current enquiry, a current customer, a past customer, a team member, or someone else (a supplier, a wrong number). An unknown number is treated as a possible new enquiry.
3. **It flags the call with that type and puts a call-back reminder on the list.** One person is one call back. The reminder clears itself if someone rings them back.
4. **It texts the caller, and emails them if it has their address, with a “Sorry we missed your call” message written for who they are:**
   - **a new caller** gets a link to the instant quote or booking page
   - **a current customer** gets a note about their booking (“We saw you called about Saturday. Here’s everything for your booking, and we’ll ring you back shortly.”)
   - **a past customer** gets a welcome back
   - **if they left a voicemail,** the reply answers it where it can
5. **The owner chooses, for each type of caller, whether that message sends itself or waits as a draft** (the levels below).

Status:
- Built at Tipsy: step 1 and step 3 for known callers, and the sorting in step 2 (for messages).
- To build: the message to the caller, handling unknown numbers, and sorting calls as well as messages.
- Check the US texting rules for automatic texts before launch (section 7).

**The AI email writer: three levels the owner chooses, one type of message at a time**

| Level | What happens | What to call it |
|---|---|---|
| 1. Draft | The AI writes the reply; a person reads it and presses send | An AI assistant (sometimes called a copilot) |
| 2. Draft and train | The same, but the person corrects the draft, and each correction becomes a rule it follows from then on, so it keeps getting closer to how the owner would answer | An AI assistant that learns |
| 3. Autopilot | The AI writes and sends by itself, for the types of message the owner has switched on (“where do I park?”, payment reminders, “sorry we missed your call”), within the owner’s rules. It stops and hands over to a person when it isn’t sure, when a rule would be broken, or when money or a promise is involved | An AI agent. This is what “agentic” means |

**Jem asked: is one an AI agent and the other agentic?** Nearly.
- **An AI agent** is software that does a job for you.
- **“Agentic”** describes how much it acts on its own, rather than only suggesting.
- **Levels 1 and 2 are an assistant:** it suggests and you decide.
- **Level 3 is agentic:** it decides and acts, inside the rules you set.
- **On the website,** say “AI assistant” for levels 1 and 2 and “AI agent” for level 3, and explain “agentic” once, in plain words.

**Safeguards for level 3.** Jobber’s promise is “nothing goes out until you approve it”. Hey Day lets owners go further, safely:
- It’s switched on one type of message at a time.
- Anything it isn’t confident about goes back to being a draft.
- There’s a daily list of everything it sent, and one switch to stop it.
- Refunds, complaints, prices outside the rules and promises always need a person (section 3.5).

**Subscriptions (a suggestion; the decision is Jem’s and Russell’s):**
- Level 1 on every plan.
- Level 2 from the Crew plan up.
- Level 3 on the top plan or as a paid add-on, because it costs more to run and needs trust built first.
- AI use is capped on the cheaper plans (section 3.6a).

**Status:** levels 1 and 2 are built at Tipsy. Level 3 is to build; Tipsy deliberately sends nothing by itself today.

**3. Features neither Jobber nor Tipsy has (build these for Hey Day)**

| Feature | What it does | Why owners want it |
|---|---|---|
| AI autopilot levels | The three levels above, set per type of message | Start safe, then hand over more as trust grows |
| Missed-call messages by caller type | The flow above | Every missed caller hears back within minutes, in the right words |
| AI setup assistant | Reads the business’s website, price list, old emails and policies, then fills in the quote form, automations and rules for the owner to check | Set up in an afternoon, not a month |
| Policies and procedures library | The business uploads its terms, FAQs and “how we do things”. The AI and the team both work from it, and staff confirm they’ve read it | The AI answers the way the business would, and new staff learn faster |
| Lead types with replies to match | Enquiries sorted as hot, urgent, high value, easy or off-peak, with replies and follow-ups that change to suit | The best leads get the fastest, most personal answer |
| Fill quiet dates | When the diary looks thin, offers go to the customers most likely to book those dates, for the owner to approve | Fewer empty days |
| Group bookings with split payments | Each guest pays their share by link | Bigger group bookings, and no chasing friends for money |
| Waiting lists that fill themselves | A cancelled seat or date goes to the next person on the list automatically | Cancellations stop costing money |
| Gift vouchers, loyalty cards and memberships | Sell and redeem vouchers; reward regulars; monthly memberships | Money up front, and customers who come back |
| Referral code first, then the review | A happy customer gets a code to share, then the review ask | More word of mouth, and more reviews |
| Guest capture at events | A QR code on the menu, the tip jar or the photo gallery lets guests follow the business or book their own, with consent | Every event brings the next booking |
| Cross-promotion between businesses | Complementary businesses on Hey Day recommend each other, with a referral share | New customers from partners, not ads |
| Sell everywhere, in one diary | Bookings from other marketplaces in the same diary, plus a listing on the Hey Day marketplace | One place to run everything |
| Complaints settled fairly | The team member sees the complaint, approves the reply and can offer part of a refund; a manager signs off | Faster, fairer outcomes. Tipsy already asks the team member and holds their pay; the approve-and-offer step is new |

Anything in this table stays “coming soon” on the website until it’s built.

**getjobber.com, page by page, and the Hey Day version**

| getjobber.com | Hey Day |
|---|---|
| Homepage built on four pillars (Get Noticed, Win Jobs, Work Smarter, Boost Profits) | Homepage built on the six groups: *Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked* (section 3.3) |
| 15 feature pages in the Product menu | About 12 feature pages (section 3.7), each using Jobber’s feature-page template (section 5.5) |
| 57 industry pages from one template | One Who it’s for page, plus example stories of businesses growing on Hey Day (section 3.7) |
| Pricing: “Try Jobber for free now. Pick a plan later.” | The same approach, with three plans, one toggle and a money-back guarantee |
| 57 comparison pages | vs HoneyBook, Jobber, Check Cherry, Flashquotes and spreadsheets, plus pages for marketplace hosts (“Selling on Togather or ClassBento? Keep your own customers too”) |
| 151 free tools (templates, calculators, generators) | A handful to start: a pricing calculator for classes and events, quote and proposal templates, a “leak check” score |
| The Academy (1,053 articles) | A small guide library: pricing a class, running a mobile bar, hiring event staff |
| The Home Service Score quiz | A Hey Day score (the leak check) |
| The reviews page | A reviews page once customers exist, with Tipsy first |
| The Jobber Plus sub-site, demo-led | An Operator and Group tier page with “Book a demo” |
| The /llm-info/ page for AI search tools | An “About Hey Day for AI assistants” page |

The full list of Jobber’s feature pages, with headlines and the Hey Day equivalent of each, is in **Appendix C**.

### 3.9 Worked example: the Quotes page

Use this as the pattern for every Hey Day feature page. It shows Jobber’s page exactly as built (read 13 September 2026), then the Hey Day version.

**Jobber’s Quotes page (getjobber.com/features/quotes), top to bottom**

1. **Hero:**
   - Headline: “Job quoting software that wins you more work”.
   - One sentence: build customer-friendly quotes in minutes, price jobs perfectly, automate follow-ups.
   - A star rating (4.8 from 13,861 App Store reviews), “Start Free Trial”, and a product screenshot.
2. **Seven feature sections.** Each is a benefit headline, two or three sentences, one screenshot and its own “Start Free Trial” button:
   1. “Make customer-friendly quotes in less time”: a quote with three package options and product photos.
   2. “Set the right price with quote markups”
   3. “Sell more with optional line items”: customers tick add-ons and the total updates.
   4. “Offer consumer financing with Wisetack”
   5. “Automate your quote follow-ups”: follow-up settings and a text-message preview.
   6. “Get quote approvals faster”: customers approve or ask for changes in their portal and sign on screen.
   7. “Quote with up-to-date pricing”: 3M+ Home Depot products.
3. **A pricing strip:** “Pick the best plan for your business.” with “View Pricing”.
4. **A testimonial with a number:** “TRUSTED BY 400,000 SERVICE PROS”, and Doni Jones of Don’s Tree Service: “we were doing right around $2 million, and this year we’ll cross over 5.5 million”.
5. **Related features:** six cards (Invoicing, Payments, Financing, Client Hub, Jobs, Online Booking).
6. **Integrations:** “Integrations that fit the way you work” and a link to the app marketplace.
7. **No FAQ.**

**What to copy:**
- One benefit per section, each with its own screenshot.
- A trial button after *every* section. Jobber repeats it eight times.
- Customer-facing proof (the package quote, the signature).
- A testimonial with a before-and-after number.
- Related features that keep people exploring.

**What to add:** an FAQ, which Jobber’s page lacks, and sections Jobber can’t offer.

**Hey Day’s Quotes and pricing page (draft copy; status in brackets, and only claim what’s live)**

1. **Hero:**
   - **Headline (the owner’s pain):** “Stop losing bookings while you work out the price.”
   - **The line under it (the search phrase):** “Instant quote software that prices every job the way you would, in seconds.”
   - **Sub:** “Customers answer a few questions and see a price straight away: per guest, per hour, per person or per room, by distance and date. You set the rules. Hey Day does the maths and the chasing.”
   - **What it does for you:** “Saves the evenings you spend writing quotes. Increases how many quotes turn into bookings. Reduces pricing mistakes.”
   - Button: “Start free trial”. Screenshot: a good, better and best quote.
2. **The proof, straight after the hero, in large type:** “QUOTES SENT WITHIN 4 HOURS BOOK 25% MORE OFTEN”
   - **Source, in small print under it:** “Flashquotes, based on 32,000+ quoted leads from 100+ established operators over the past 12 months”, linked to flashquotes.com. Rechecked live on 13 September 2026.
     - This is Flashquotes’ own data from its customers (mobile bars, coffee carts, photo booths, DJs), read on its homepage on 13 September 2026.
     - It is **not** Jobber’s figure; an earlier draft of this brief said so by mistake.
   - **Crediting a direct rival on Hey Day’s site is Jem’s and Russell’s call.** If they’d rather not, use the independent Harvard Business Review finding instead: firms that contacted a lead within an hour were nearly seven times as likely to qualify it as firms that waited even an hour longer (1.25 million leads, 2011; `STATS-BANK.md`, row 2).
   - **Replace it with Tipsy’s or Hey Day’s own figure** as soon as one is approved.
   - **Hey Day’s quotes are instant, so every quote lands inside that four-hour window.** Don’t claim more than the data says: it doesn’t compare seconds with hours.
   - **For reference,** Flashquotes’ own lost-revenue example is “$146,880”, which “Assumes a typical operator sending 200 quotes/month at a $1,700 average booking value.”
3. **What slow quotes are costing you: a worked example, with the maths shown.** Label the numbers as an example:
   - **Flashquotes’ own booking rates:** 22% for quotes sent within 4 hours, 18% for quotes sent later the same day, and 16% for quotes sent the next day or later.
   - A business sends 40 quotes a month and usually replies the next day: 40 × 16% = 6.4 bookings.
   - Quoting within 4 hours instead: 40 × 22% = 8.8 bookings.
   - That’s 2.4 extra bookings a month. At an average booking of $1,200, that’s **$2,880 a month, or $34,560 a year,** lost to slow quotes.
   - **Then a small calculator:** the visitor enters their own quotes a month, win rate and average booking, and sees their number. No email needed to see the result.
4. **“Instant quotes, day or night.”** The quote form on your site gives a priced quote with three options, on screen, as a PDF and by email. *(Built)*
5. **“Prices that move with your demand.”** Busy dates can cost more and quiet dates less, by rules you set. Later this can follow how full your diary is and how many of your team are free that day. Your margin shows on every quote. *(Busy-date pricing built; pricing from how full the diary is and team availability to build)*
6. **“Let customers shape their own quote, live.”** They change guests, hours or the package and tick add-ons, and the price updates instantly. They can also compare the alternatives side by side before they book: good, better and best packages now, other dates and times later (for example “Saturday $1,450, Friday $1,200”). *(Live changes and three options built; comparing other dates to build)*
7. **“Price it right, every time.”** Rules for guests, hours, staff, travel and busy dates, with minimum spends. *(Built, needs generalising)*
5. **“Sell the service and the experience.”** One price list for a bar at a wedding and seats in a cocktail class: per person, private group, and extra guests. *(Private bookings built; ticketed classes to build)*
6. **“Follow up without chasing.”** Seven emails over 30 days, plus a WhatsApp, worded for the occasion. They stop the moment the customer books, and hot and urgent leads come first. *(Emails and WhatsApp built; lead labels to build)*
7. **“Check you can deliver before you say yes.”** For far-off or last-minute dates, Hey Day asks your team first and only confirms when someone can do it. *(Built; Jobber has nothing like it)*
8. **“Book and pay in one step.”** They accept the quote, sign your terms and pay the deposit together, with payment plans for big bookings. *(Deposits built; e-signing and payment plans to build)*
9. **“Quotes for the big, bespoke ones.”** Price phone and email enquiries with the same rules in the office quote tool, and changes are repriced automatically. *(Built)*
10. **Pricing strip,** then a testimonial from Tipsy Parties with a before-and-after number `[TO BE APPROVED]`.
11. **Related features:** Online booking and payments; Follow-ups and automations; Customer portal; Inbox and AI replies; Classes and experiences; Reviews and referrals.
12. **Integrations:** Stripe, Google Ads, Zapier, and QuickBooks `[when built]`.
13. **FAQ:**
    - “Can I price per person and per hour?”
    - “Can customers see prices on my own website?”
    - “What about bespoke events?”
    - “Can I stop bookings on dates I’m full?”
    - “Does my customer pay a fee?”

---


## 5. Jobber compared with what we have

Based on about 30 distinct Jobber feature pages, plus its homepage, pricing and AI pages, studied on 13 September 2026. “We” means the Tipsy system as checked in the code. Status words match Appendix A.

### 5.1 What Jobber sells, by stage

- **Win work:** website builder, Google Business Profile, reviews, referrals, email campaigns, online booking, request forms, AI Receptionist (calls and texts), client records with tags, sales pipeline, quotes with markups and optional items, a supplier catalogue, customer e-signature on quotes, consumer financing, automatic quote follow-ups, AI-drafted quotes.
- **Schedule:** drag-and-drop calendar, recurring jobs, crew assignment, route optimisation, visit reminders, vehicle tracking.
- **Do the work:** mobile app, job details and photos, forms and checklists, on-my-way texts, clock in and out, GPS, voice commands.
- **Get paid:** batch invoicing and reminders, card, bank transfer and Tap to Pay, card on file with automatic charging, deposits, tips, instant payouts, financing, a client portal for payments.
- **Grow:** Marketing Suite (an AI marketing plan, drafted social posts, campaigns, review requests, referrals).
- **Manage:** dashboard, 20+ reports, job costing, expenses, QuickBooks Online sync, Gusto payroll (US), permissions, Zapier, 100+ integrations, business loans (Jobber Capital).
- **AI:** Receptionist, Copilot (business advice), Rewrite, Voice, auto-drafted quotes, marketing drafts. Its promise, “Nothing goes out until you approve it”, is the same principle as ours.
- **Prices:** Core $29 to Plus $529 a month (yearly billing); add-ons Marketing Suite $99, AI Receptionist $29, Pipeline $49; extra users $29; card fees 2.9% + 30¢.

### 5.2 Jobber has it, and so do we

| Jobber | Our version | Status |
|---|---|---|
| Quotes with follow-ups | Instant quotes priced by guests, hours, travel and date, with seven follow-ups and WhatsApp | Built, needs generalising |
| Online booking | Quote-to-booking checkout with deposits | Built, needs generalising |
| Client Hub | Customer portal: pay, confirm details, choose menus, request changes, download receipts | Built, needs generalising |
| Payments, deposits, tips | Stripe, pay-by-bank, deposits and balances, QR tip jar shared across the crew | Built |
| Invoicing and reminders | Pro forma and final invoices, overdue chasing by email and WhatsApp | Built, needs generalising |
| Client records | Customer records, full message history, search everything | Built |
| Scheduling and clash checks | Shift filler with clash and travel checks | Built, needs generalising |
| Checklists | Pre-job checks with reminders and strikes | Built, needs generalising |
| Permissions and reports | Roles and permissions, reports in plain English, a morning report | Built |
| Automations | Many automations, on fixed timings | Built; owner-editable version to build |
| AI rewrite and drafting | AI drafts every reply using the booking and the owner’s rules | Built |
| Review requests | Only in the reply to thank-you emails; the automatic ask was lost | To restore |
| Website | Tipsy’s US site, built around the instant quote | Built for Tipsy only |

### 5.3 Jobber has it, we don’t yet

| Jobber feature | Worth building for Hey Day? |
|---|---|
| AI Receptionist (answers calls and texts) | Yes |
| Customer e-signature on quotes and contracts | Yes, a must-have (QuickSigner exists for staff contracts) |
| Card on file, automatic charging, recurring billing | Yes, for payment plans, recurring work and memberships |
| Tap to Pay on the owner’s phone | Yes, for tips and on-the-day extras |
| Time tracking, GPS, timesheets, job costing by labour | Yes, for employees; we only have check-in |
| Route optimisation across several jobs | Lower priority for events; useful for delivery and rental crews |
| QuickBooks sync, Gusto payroll | Yes: accounts sync is a must-have; payroll through a provider |
| Marketing Suite: AI plan, social posts, campaigns | Later; broadcasts and the email editor exist |
| Google review automation, with AI reply suggestions | Yes, as part of the referral-then-review flow |
| Referral programme for customers | Yes (partner links exist) |
| Owner mobile app with voice | Yes; the portal works on phones, but there’s no native app |
| 100+ integrations and Zapier | Some: QuickBooks, Zapier, calendar sync first |
| Consumer financing and business loans | Later, if at all |
| Spanish language | Consider for the US |

### 5.4 We have it, Jobber doesn’t (Hey Day’s edge)

Section 3.8 describes the most important of these in detail (the AI email writer and its three levels, call notes, missed-call capture), and adds the features neither Jobber nor Tipsy has.

| Our capability | Status |
|---|---|
| Quotes priced per guest and per hour, with busy-date pricing, price testing and the margin shown | Built, needs generalising |
| Interactive quotes the customer adjusts, with the price updating live | Built |
| Checking the team can do the date before the booking is confirmed | Built, needs generalising |
| Classes and experiences alongside services | Private classes built; ticketed sessions to build |
| Shift offers to freelancers or subcontractors, who accept or decline, then automatic placement | Built (automatic placement on some bookings; more being tested) |
| Recruiting: AI screening, self-booked interviews, ID and right-to-work checks, e-signed contracts, onboarding, training sign-off | Built (UK rules) |
| Contractor payouts, self-serve cash-out, expenses with rules | Built (UK, Wise) |
| Event-day check-in with alerts and strikes, an operator console, an emergency blast | Built |
| Shopping and kit lists from the customer’s choices, kit ordering and tracking | Built (kit ordering being tested) |
| A complaint flow that asks the team member and holds their pay until it’s sorted | Built |
| Hidden phone numbers between customers and staff, with a conversation log and AI flags | Built |
| One inbox for email, WhatsApp, calls, texts and app chat, with AI drafts that read the booking and learn from corrections | Built |
| Priority ranking that re-ranks messages as things change | Built |
| Profit-based ad conversions and ad audiences | Built |
| Agent and reseller accounts with their own prices and portal | Built |
| Customer portal for event planning: choices, menus, share links, change requests | Built |
| An AI control panel for every AI cost | Built |
| Tasks with tagged colleagues and deadlines that chase each person | Built |
| Engagement watch and a where-to-recruit map | Built |

### 5.5 How Jobber writes its feature pages (reuse this template)

- **Jobber’s headline formula:** a search phrase plus an outcome. For example “Job quoting software that wins you more work” and “Online payments software that gets you paid 4x faster”.
- **Hey Day goes further. Every feature page has:**
  - **A headline about the owner’s pain, in their words:** “Stop spending your time chasing clients for payment.” That makes the feature relatable, where “automated payment reminders” only describes it. The search phrase goes in the line underneath and in the page title, so the page still ranks in search.
  - **What it does for you,** in up to three short lines starting *Saves*, *Increases* or *Reduces*.
  - **Proof:** one or two real statistics from real studies, each with its source, year and who it covers, and a link.
  - **What it’s costing you:** a worked example with the maths shown, or a small calculator where the visitor enters their own numbers.
  - The full template, and a headline for every page, are in `BUILD-NEXT-HEYDAY-SAAS.md`, Phase 3. The verified statistics are in `STATS-BANK.md`.
- **Page order:**
  1. Hero with a screenshot
  2. Four to eight alternating sections, each a short label, a benefit headline and a screenshot
  3. A named testimonial with a number
  4. Related features
  5. “Start Free Trial” with “No credit card required”
- **Promises it repeats:** get paid faster, never miss a lead, less admin, stay in control.
- **Tone:** plain, practical, second person, reassuring.

---

## 6. Lessons from competitor websites

### 6.1 How getjobber.com is built (studied 13 September 2026)

**Scale:** 13 sitemaps, roughly 1,700 pages: 171 core pages, 1,053 Academy articles, 57 comparison pages, 56 feature pages, 151 free-tool pages and 57 industry pages. Hey Day can’t match that at launch, and doesn’t need to. It needs the same *shape*, at a smaller size.

**Navigation**
- **Header:** Log In, phone number, “Book A Demo”, “Start Free Trial”.
- **Product menu:** 15 feature pages (Quoting, Invoicing, Payments, Online Bookings, Scheduling, Field Documentation, Client Management, Client Hub, Job Management, Sales Pipeline, Team Management, Client Communication, AI Tools, Receptionist, Marketing Tools), plus the top tier (Jobber Plus), Integrations, All Features and Product Updates.
- **Industries menu:** 18 named trades, plus All Industries.
- **Pricing.**
- **Resources menu:** articles, free tools, podcast, reports, community, grants, events, help centre.
- **Footer:** also includes an “llm-info” page written for AI search tools.

**One framework runs the whole site.** Four verb-led pillars: *Get Noticed, Win Jobs, Work Smarter, Boost Profits*. Each has a stat (“12 hours+ saved on average per week”, “44% revenue growth on average in first year”), a named customer quote and a “Learn more”. The same four pillars structure the homepage, the features, every industry page and even a free diagnostic quiz.

**Homepage order**
1. **Hero.** H1 “Run a stronger service business”, a one-line sub, “Start Free Trial” and “Find Your Plan”.
2. **Proof.** Rotating real owners and app-store ratings.
3. **The four pillars.**
4. **Social proof.** “Join over 400,000 service pros…” and “No credit card required.”
5. **The AI block.**
6. **Industries grid.**
7. **Reassurance.** “You’ve got this, and we’ve got your back.”
8. **Resources.**

**Pricing page**
- **Headline:** “Try Jobber for free now. Pick a plan later.”
- **Plans:** four, each with a one-line “for the pro who…” tagline and six “everything in X, plus” bullets.
- **Selectors:** team size and billing (monthly, 1 year, prepaid).
- **Extras:** users at $29 each, and three paid add-ons.
- **Trial:** 14 days of the Grow tier, no card needed.
- **Comparison table:** ten sections, with card fees shown openly.
- **FAQ:** contracts, how the trial works, which plan, changing plans, accounting sync, franchises.
- **No money-back guarantee.**

**Industry page template (reused about 57 times)**
1. Trade-specific H1 and owner video
2. A positioning line
3. The four pillars with trade-specific sub-features
4. “Trusted by the best [trade]”, with three named owners
5. A six-card feature grid
6. Integrations chosen for that trade
7. Award badges
8. An email box and trial button
9. Eight free resources for that trade
10. A trade FAQ, for example “Can Jobber handle recurring cleaning appointments?”

Extra pages per trade (CRM, invoicing, dispatch) catch more search terms. **Jobber has no events, entertainment or class pages.** Its one non-trade example (dog walking) is thin.

**Proof and trust**
- **A reviews page:** ratings from seven review sites, awards, reviews tagged with business size, and video stories.
- **Customer stories as magazine articles:** for example “If I lost Jobber tomorrow, I’d be devastated.”
- **Every quote has a full name, a business name and a number.**
- **Weaknesses:** the headline numbers disagree with each other (400k vs 250k vs 100k), and the security page is thin.

**Comparison pages**
- A hub of 57 pages, including rival-versus-rival pages that catch early researchers.
- Each page has a summary table, a feature grid, dated prices, testimonials and a four-step switching plan (“fully moved within 10 days”).
- The tone is fairly honest: they admit where a rival scores higher.

**Free tools and lead magnets**
- **151 tool pages:** templates, calculators and generators, all usable with no email.
- **Every button is a verb:** “Calculate Margins”, “Price Services Now”.
- **The upsell comes after the value:** “Put those prices into action…”
- **A 5-minute “Home Service Score” quiz** built on the four pillars.
- **Gated guides that are really trial offers:** one email field, plus “save 30% on your first 6 months”.
- **A large Academy, a podcast, events, grants and a community.**

**Signup and demo**
- **Trial signup:** one step, just email and password (or Google or Apple), “No credit card required” and a testimonial beside the form.
- **Demo:** “Book your free 20 minute demo” through a calendar.
- **Bigger accounts:** a separate demo-led door, with onboarding priced as a “$599 value”.

**Support**
- Phone, chat and email, Monday to Friday, North American hours.
- A dedicated onboarding specialist only on the top tier.

**Copy for Hey Day**
- **One framework across the site:** *Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked* (section 3.3).
- **The trial model:** “Try free now, pick a plan later”, a two-field signup, no card, and the trial on the top tier.
- **Two buttons everywhere:** “Start free trial” and “Book a demo”.
- **Example stories instead of an industry template:** one Who it’s for page, plus stories of different kinds of business growing on Hey Day, each showing the service *and* the experience (section 3.7).
- **Free tools with no email wall:** a class and event pricing calculator, a quote template, a “how much are you leaving on the table?” score.
- **Honest comparison pages with dates,** plus a switching plan.
- **A page for AI search tools** that explains Hey Day.

**Do better than Jobber**
- **One audited headline number,** used everywhere.
- **Simpler pricing:** three plans, one toggle.
- **A money-back guarantee, and a free setup call for everyone.**
- **Support hours that match the audience,** evenings and weekends.
- **A plain security page:** payments, two-factor login, data export.
- **Only the marketing a small team can keep up.** Start with tools, example stories and one comparison hub, not podcasts and grants.

### 6.2 Event and class supplier tools (studied 13 September 2026)

Quotes below are near-verbatim from a page-reading tool. Spot-check any line before reusing it.

**HoneyBook** (honeybook.com): for “anyone with clients”.
- **Hero:** “Manage every client, project, and payment all in one place.”
- **Proof:** “20 hours saved every week”, “$12B+ in payments processed”, “Trusted by over 100K small businesses”.
- **Pricing:** $29 / $49 / $109 a month billed yearly ($36 / $59 / $129 monthly). £29 / £49 / £109 in the UK.
- **Trial and guarantee:** a 30-day trial with no card, and a 60-day money-back guarantee.
- **Industry pages:**
  - Photographers: “Everything beyond the photos”, with tipping and “mini sessions” where clients pick a slot.
  - DJs and event planners: generic, with no trade words and reused web-designer testimonials.
- **Also:** a ChatGPT connector, templates (some paid), and a referral scheme for its own users.
- **Busy promotions:** about eight offers at once, which makes the list price look fake.

**Check Cherry** (checkcherry.com): built for event pros. The closest rival.
- **Hero:** “Make Clients Love Booking You.” Buttons “Start Free Trial”, “Try Live Booking” and “Watch a Demo”.
- **Proof:** “246,000+ Events booked”, “$31M+ In add-ons upsold”, “30,000+ Events booked after hours or on weekends”.
- **27 trade pages**, each opening on a chore. Bartending: “Stop manually calculating quotes for every event”, with guest-count tiers, bartender counts, travel zones, sales tax and “hot leads” (abandoned bookings).
- **Staff:** claim or request shifts and check in and out, but its pages say nothing about paying staff.
- **Classes:** the closest it gets is “mini sessions” (10+ people per slot), framed only around photography.
- **Pricing:** by upcoming bookings, not users: $29 (or $39 monthly) / $59 / $139, with unlimited staff accounts. A 14-day trial and a 60-day money-back guarantee.
- **Comparisons:** 15 comparison pages, including “vs Spreadsheets”.

**Flashquotes** (flashquotes.com): “The CRM for mobile businesses.”
- **Lead stat:** “QUOTES SENT WITHIN 4 HOURS BOOK 25% MORE OFTEN”, with its data source and a worked example of lost revenue.
- **Trade one-liners:** “150 guests × your rate. Instant.” / “Bronze, silver, gold. They pick. You pour.”
- **Pricing:** free forever / $49 / $99 / $199, plus a 3% fee charged to the supplier’s client.
- **Line worth noting:** “Built by operators”.

**Bookwhen** (class booking): passes, memberships, discount codes, waiting lists, ticket types, waivers and vouchers, from free to $59 a month. No proposals, contracts, crew rostering or per-guest hire quotes. **Classpop** is a marketplace that sells classes and team-building “From $35 / person” and keeps the customer.

**The audience’s own words (use them)**
- **Selling:** get booked, lead to payment, first inquiry to event day, never miss a lead, hot leads, speed wins, quotes that close, book while you sleep, after hours and weekends.
- **Money:** deposits, payment plans, packages, add-ons, extras, good-better-best, per head, guest count, travel fees, peak dates.
- **Pain:** chasing clients, back-and-forth, spreadsheets, double-booking, slipping through the cracks, “chaos costs you bookings”, “I got my life back”.
- **Team:** event pros, operators, multi-op, crew, event brief, run sheet, packing list, check-in.
- **Client side:** client portal, magic link, planning forms, questionnaires.
- **Class side:** fill classes, sell out, slots, passes, waiting lists, gift cards, team building, per person.

**Must-haves: Hey Day won’t be considered without these**
- Lead form, and packages and add-ons shown as cards.
- Automatic pricing by guests, hours, staff, travel and peak dates, shown at enquiry.
- Self-serve booking with availability checks.
- Proposal, e-signed contract and deposit in one step; payment plans; Apple and Google Pay.
- A branded client portal with a magic link; questionnaires; automated email and texts.
- Two-way calendar sync.
- A staff app with accept or decline.
- An owner mobile app.
- QuickBooks and Zapier.
- A ChatGPT or Claude connector.
- For classes: capacity, multi-person tickets, discount codes, waiting lists, gift vouchers.
- A trial of 14 to 30 days with no card, or a free tier. Human support, free migration, and a money-back guarantee (HoneyBook and Check Cherry both offer 60 days).

**Gaps none of them fill (Hey Day’s space)**
- **Nobody sells both a hire and a class from one system.** Event tools price hires, and class tools sell seats.
- **No gift vouchers in any event tool.**
- **Nobody pays the crew, or uses one crew across hires and classes.**
- **Nobody lets a supplier sell a private class at a party, per head, under their own brand.**
- **No referral rewards for the supplier’s own customers.** Tipping and review requests appear in only one tool each.

**Website ideas worth copying**
1. Trade pages that open with a chore, in that trade’s nouns: “Stop chasing clients for song lists and deposits.”
2. A live demo visitors can use without signing up (“Try Live Booking”). For Hey Day: book a hire *and* a class seat on one page.
3. A money stat from real data, with the maths shown (Flashquotes’ 4-hour stat).
4. Stats that prove the product sells for you: add-ons upsold, bookings made after hours.
5. Short feature one-liners in the trade’s words.
6. A three-step setup with a time promise: “Get your first deposit in no time”.
7. Testimonials that give a name, business and trade, and lead with one number.
8. Comparison pages, including “vs Spreadsheets”.

**Avoid**
- Piles of promotions.
- Trade pages that only swap the headline.
- Prices that disagree between pages.
- Fees that land on the supplier’s client without warning.
- Headlines that just name the feature.
- Stats with no source.

---

## 7. What stands in the way (for the product, not the website)

- **One system for many businesses.** Tipsy’s database has no way to keep one client’s data separate from another’s.
- **Tipsy is written into it.** 174 code files name tipsyparties.co.uk, 73 assume UK time, money is pounds only, and many rules are fixed in code (quote questions, onboarding steps, staff ranking).
- **Taking payments for other businesses** needs Stripe Connect or similar.
- **US readiness:** contractor forms, direct debits, texting registration, state tax and time zones.
- **Worker status:** clients’ teams will be employees or subcontractors, and the product must handle both correctly, especially in California.
- **Support, security reviews and privacy paperwork** that paying clients will expect.

---

## 8. Open questions for Jem and Russell

1. **Which businesses to go after first:** everyone in section 3.2 is a target. Which ones get adverts, example stories and sales effort first?
2. **Hey Day name and domain:** is the name confirmed and the domain secured?
3. **Launch market:** US first (the current lean)?
4. **Which Hey Day features must be live at launch** so the website only claims what’s real?
5. **Prices,** and whether to promise a price lock. First settle the model’s shape (section 3.6a):
   - subscription plus a payment margin?
   - a free starter plan with a higher payment fee?
   - imported bookings free?
   - marketplace commission only on customers Hey Day brings?
6. **Can Tipsy be named** as the case study, and which real numbers can be published?
7. **Who does onboarding and support** for Hey Day trials?
8. **Brand:** does Hey Day follow Tipsy’s look (Jost font, dark buttons) or get its own identity?
9. **Marketplaces:** connect Hey Day to Togather, ClassBento, Airbnb Experiences, LetsBatch and Yuup from launch (bringing their bookings into one diary)? Or only compete with them later through Hey Day’s own marketplace?
10. **The Hey Day marketplace’s fee model, when it comes:**
    - Commission, a flat fee like Batch, or 0% on customers the supplier brings, like Obby?
    - Does commission apply only to the first booking it introduces, and does it ever expire?
    - When are contact details shared?
11. **Cross-promotion between suppliers:**
    - May Hey Day recommend other suppliers to a supplier’s customers?
    - Only complementary ones, never direct rivals?
    - Does the supplier whose customer it was earn a share when a recommendation leads to a booking?
12. **Host software name and look:**
    - Keep “jobbie” (the working name in the code), or use a Hey Day name such as “Hey Day for hosts”?
    - Keep the HoneyBook colours jobbie has now, or use Jem’s marketplace look?
13. **Sizes and channels for the groups added in section 3.2** (solo creatives, home services and trades, tours and escape rooms, other service providers): how many are there in the US, and where do we reach them?

---

## Appendices

- **Appendix A:** capability catalogue, 138 items, with status and goals.
- **Appendix B:** the owner’s journey, 126 friction points, with who feels each, the fix, whether Tipsy does it and where.
- **Appendix C:** every Jobber feature page, with its headline, what it covers and the Hey Day equivalent.

---

# Appendix A: Capability catalogue (from the Tipsy system review)

Status key: Built, generic = works for any business now; Built, needs generalising = engine exists with Tipsy rules in it; To build = gap. ★ = beats rivals.

## Get found and catch every enquiry

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Ads that learn which bookings make money | Ads are judged on enquiries, so Google finds you more time-wasters. | Sends each booking’s real profit back to Google and Microsoft Ads, backdated up to 90 days. Odd values are held for review, and it checks that Google actually counted each one. | Built, needs generalising | Every Tipsy quote and booking reports its profit to both ad accounts. | More revenue, Save money |
| Smart ad audiences | Paying to show ads to people who have already booked. | Every night, people with an open quote are targeted and booked customers are left out. Only people who consented are included. | Built, needs generalising | Rebuilt every night for Tipsy’s Google Ads. | Save money, More revenue |
| Enquiry-form drop-out tracking | No idea which question makes people give up on your form. | Records every step of the form, the device and where the visitor came from, and shows where people leave. | Built, generic | The quote funnel page in Tipsy’s boss area. | More revenue |
| Missed-call rescue | A missed call is usually a lost job. | Missed calls from anyone already known go on a ring-back list, and a call-back raised from a WhatsApp chat comes with the recent messages. | Built, generic | Checked every 15 minutes on Tipsy’s office line. | More revenue, Happier customers |
| Spam folder rescue | Genuine enquiries rot in the spam folder. | Reads the spam folder on a schedule and pulls real messages back into the inbox. | Built, generic | Runs on Tipsy’s Gmail. | More revenue |
| Instant first reply, day or night | A 10pm enquiry gets answered at 10am, after a competitor already replied. | AI replies to a new enquiry straight away, using your prices and FAQs within rules you set, then hands over to a person. | Built, needs generalising | The AI already drafts these replies. Today a person presses send on every one, so auto-sending first replies would be new. | More revenue, Faster, Happier customers |
| ★ AI phone receptionist | Calls go unanswered while you’re busy on a job. | A voice AI answers the phone, takes the enquiry, books a call-back or gives a quote from your price rules. | To build | Not built at Tipsy. | Save time, More revenue, Happier customers |
| Customer chat assistant | Customers ring or email to ask things the system already knows. | A chat assistant that answers a customer about their own booking and nothing else. | Built, needs generalising | Built for customers, bartenders and bookings. Each one can only see one person’s data. | Save time, Happier customers |
| Booking page and mini website | No website, or one that doesn’t take bookings. | A ready-made page for each business, with the instant quote and booking built in, so a start-up is live in a day. | To build | Tipsy’s US website was rebuilt around its instant quote. There is no general site builder. | More revenue, Simpler |
| Listed on experience and event marketplaces | Missing the customers who search Viator, GetYourGuide or event directories. | Publishes sessions and packages to those sites and pulls their bookings into the same diary. | To build | Not built. | More revenue |
| ★ A shared marketplace across all clients | Small businesses can’t afford to be found. | Every client’s services listed in one searchable place, the way Togather lists event suppliers. Each new client makes the marketplace more useful to customers. | To build | Planned for the new company, eventually. The machinery exists inside Tipsy, between customers and its freelance bartenders: matching, live availability, hidden numbers, payments, payouts and ratings. | More revenue |

## Price it and quote it fast

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Instant quote builder | “Contact us for a quote” loses people who want a price now. | A visitor answers a few questions and gets a priced good, better and best quote on screen, as a PDF and by email. The quote is interactive: they change guests or hours and the price updates at once. | Built, needs generalising | Tipsy’s quote form is fully self-serve, with no human step, and its quote page reprices live. | More revenue, Faster, Save time, Happier customers |
| ★ Proposal, contract and payment in one | The customer says yes, then waits days for the contract and the invoice. | One link where the customer picks an option, signs the terms and pays the deposit in a single sitting. This is HoneyBook’s core product. | Built, needs generalising | Tipsy goes from quote to booking to payment, but customers don’t sign a contract. E-signing is only used for staff contracts. | Faster, More revenue, Happier customers, Simpler |
| Pricing rules engine | Prices live in the owner’s head, so staff quote inconsistently. | The owner sets the quote questions, the variables and the price rules: people, hours, travel, date, group size and extras. Or they start from rules the AI suggests from their website, price list and past quotes, and adjust them. | Built, needs generalising | Tipsy’s engine prices guests, hours, travel, date and extras, with rates the owner edits. The questions are built into the code for two services, so selling it needs a question and rule builder. | Save time, Simpler, More revenue |
| Package builder | The software only sells what its makers imagined. | The owner sets up what they sell: one-off services, fixed packages and recurring plans (weekly, fortnightly, monthly or every few weeks) and memberships, each with its own price, questions and extras. | Built, needs generalising | Tipsy’s UK packages are fixed in code: two services with good, better and best tiers plus extras. The US site keeps its six packages as editable settings, which is the pattern to follow. | More revenue, Simpler |
| Price lists for regular customers | Regular clients expect a better price, and it’s kept in someone’s head. | Give a regular client, or a group of clients, their own prices, minimums and invoice terms. Their quotes and bookings use them automatically. | Built, needs generalising | Tipsy does this for agencies: their own prices, travel zones, minimum guests, reference formats, portal and invoices. There’s nothing yet for an individual regular customer. | More revenue, Less stress |
| Busy-date pricing | Peak dates sell at the same price as quiet ones. | Adds a premium automatically when other bookings nearby already fall on the same date. | Built, needs generalising | Live on Tipsy quotes. | More revenue |
| ★ Price testing | Guessing whether you’re too cheap or too dear. | Quotes some customers 0%, 4% or 8% less at random, then reports which level earns the most profit per quote. | Built, needs generalising | Tipsy’s pricing experiment and its report. | More revenue |
| Margin on every quote | Saying yes to jobs that lose money. | Shows the estimated profit on a quote before it goes out. | Built, needs generalising | Tipsy works it out from ingredient and staff costs. | Save money, Less risk |
| Travel priced from real drive times | Far-away jobs priced like local ones. | Prices travel from real routes and drive-time zones, not guesswork. | Built, needs generalising | Google, HERE, OSRM and Mapbox zones across the UK. The US site prices by drive-time bands too. | Save money, Save time |
| Price guarantee and undercharge alarm | Jobs quietly charged less than quoted. | Holds a quote’s price for 30 days and raises an alert when a booking charges less than its quote. | Built, generic | A daily check on every Tipsy booking. | Save money, Less risk, Happier customers |
| Discount codes and partner links | Promotions handled by hand, and abused. | Codes with expiry dates, use limits and a minimum spend, plus shareable partner links that apply a code automatically. | Built, generic | Live for Tipsy’s partners. | More revenue, Save time |
| ★ Agent and reseller accounts | Agents and partners need their own prices, references and invoices. | Recognises a partner from their email, applies their prices, areas and minimums, gives them a portal and bills them directly. | Built, needs generalising | Tipsy’s agency bookings. | More revenue, Save time |
| Find my quote | “Can you resend my quote?” emails. | A customer looks up an old quote by its reference, or by email with a code. | Built, generic | Tipsy’s retrieve page. | Save time, Happier customers |

## Turn quotes into bookings

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Quote follow-up sequence | Most quotes are never chased. | Seven emails over 30 days with prices refreshed each time. It stops the moment they book or the date passes. | Built, needs generalising | Runs hourly for every Tipsy quote. | More revenue, Save time |
| WhatsApp nudge | Emails get ignored, but a WhatsApp gets read. | A friendly follow-up message 2 to 48 hours after a quote, sent only within sensible hours. | Built, needs generalising | Tipsy’s quote follow-up messages. | More revenue |
| Abandoned checkout recovery | People start paying, then get distracted. | Sends a one-click link back to exactly where they stopped. | Built, generic | Tipsy’s abandoned-checkout job. | More revenue |
| ★ Check you can deliver before you sell | Taking a booking you can’t staff, then refunding it with an apology. | For far-off or last-minute bookings, it asks local staff first and only confirms when someone says yes. | Built, needs generalising | Tipsy’s pre-booking check. | Less risk, Less stress, Happier customers |
| Quote-to-booking checkout | Booking takes a phone call and a bank transfer. | The quote becomes a booking, with the deposit taken online in one flow. | Built, needs generalising | Tipsy’s booking wizard. The US site does the same with Square. | Faster, Save time, Happier customers |
| ★ Instant booking rules the owner sets | Either every booking needs a phone call, or anyone can book a date you can’t do. | The owner chooses how bookings are accepted: anyone can book, check the diary or staff first, or rules based on location, date, party size or booking value. Anything outside the rules comes to the owner to approve. The AI can suggest the rules from the business’s own bookings, and the owner adjusts them. | Built, needs generalising | Tipsy already does this with built-in rules. Big classes get a bespoke price. A far-away or last-minute booking goes through by itself when a bartender with no clash says yes and nothing within 70 miles is left unstaffed that day; otherwise the office decides. The full amount is taken inside 10 days, and the US site won’t instant-price beyond a 4-hour drive. | More revenue, Faster, Less risk |
| ★ Lead labels and smart follow-up | Every lead is chased the same way, including dates you can’t do, while the best leads wait. | Each lead is labelled hot, urgent (close date), high value, easy (nearby) or off-peak, and the best rise to the top of the office’s list. Follow-ups change with the label: faster for close and valuable leads, paused for fully booked dates, and off-peak offers when demand is low. The owner sets the labels and follow-up rules, or accepts the AI’s suggested ones and adjusts them. | Built, needs generalising | Partly there. The priority bot ranks a lead’s messages by how soon their date is, and the AI’s tone changes before and after booking. The follow-up schedule is the same for everyone, and there are no labels yet. Value, profit, distance, busy dates and staff coverage are all already in the system. | More revenue, Less stress, Save money |
| Meeting scheduler | Days of back-and-forth to book a call or a site visit. | Prospects pick a slot for a call, tasting or site visit from your real diary, with reminders. | Built, needs generalising | Tipsy’s interview diary does this for candidates. It would need opening up to customers. | Save time, Faster |
| Add-ons, before and after booking | Extras forgotten, or never offered. | Customers add extras themselves and the price recalculates. Some extras need approval. | Built, needs generalising | Bar hire, tables and glass hire at Tipsy. | More revenue, Happier customers |

## Get paid, in full, on time

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| Deposits and balances online | Chasing bank transfers and matching them by hand. | Card, Apple Pay, Google Pay and Pay by Bank. A booking is marked paid the moment the money lands. | Built, generic | Stripe on every Tipsy booking. | Save time, Faster, Happier customers |
| Pay by Bank nudge | Card fees eating into large balances. | Steers customers towards cheaper bank payments. | Built, generic | Tipsy’s balance page. | Save money |
| ★ Late payment chaser | Awkward money conversations, or none at all. | Reminders before the deadline, then escalating emails and WhatsApps. It stops by itself when they pay. | Built, needs generalising | Tipsy’s overdue chase from 9 days before the event. The deadlines are hardcoded today. | Save time, Less stress, Save money |
| Payment plans | Big bookings lost because the customer can’t pay it all at once. | Split a balance into scheduled instalments that charge and chase themselves. | Built, needs generalising | Tipsy has a deposit and a balance. There are no instalment plans yet. | More revenue, Happier customers |
| Automatic invoices | Invoices written by hand, late or never. | A pro forma invoice when a job is booked and a final one the day after it, both in the customer’s account. | Built, needs generalising | Every Tipsy booking. | Save time, Simpler |
| Cancellations and refunds | Refunds done wrong, or split across several payments by hand. | Applies the cancellation fee and splits the refund across every payment the customer made. | Built, generic | Tipsy’s cancel button. | Save time, Less risk |
| Self-serve receipts | Admin time spent sending receipts. | Customers download their own receipts, and staff can find any payment by its receipt number. | Built, generic | Live at Tipsy this week. | Save time, Happier customers |
| ★ Digital tip jar | Customers don’t carry cash, so staff lose out. | Each worker has a QR code. It finds the job they’re on, takes the tip by card or phone and shares it across the crew. Guests could also tap a card or phone on the worker’s phone. | Built, needs generalising | Every Tipsy bartender has a QR tip jar, with Apple Pay and Google Pay. Tapping a card on the worker’s phone isn’t built. | Happier customers, More revenue |
| Gift vouchers | Missing the present-buying market, especially for classes and experiences. | Sell vouchers online, track balances and let recipients book with them. | To build | Not built. | More revenue |
| ★ Recurring service agreements | Regular work is re-booked, re-staffed and re-invoiced by hand every time. | A regular client agrees a bespoke set of tasks at a set price, repeating weekly, monthly or every few weeks. Each visit is booked, offered to staff and paid for automatically, by direct debit or a saved card. | To build | Not built. Tipsy sells one-off events, but the booking, staffing and payment machinery each visit needs already exists. | More revenue, Save time, Less stress |
| Loyalty cards and points | Regular customers get nothing for coming back. | A digital loyalty card or points for repeat bookings, redeemed as a discount or an extra. | To build | Not built. Discount codes exist and could carry the reward. | More revenue, Happier customers |
| Subscriptions and memberships | Regular customers billed by hand. | Memberships and subscriptions the owner designs: tiers with a monthly or yearly fee and benefits such as included sessions or credits, member prices, priority booking and members-only events. Billed by direct debit or a saved card, with pausing, cancelling and automatic retries when a payment fails. | To build | Not built. The pieces it would build on exist: agency price lists (for member prices), discount codes, the customer portal and Stripe. There are no direct debits or saved cards yet: customers pay each time by card or bank transfer. | More revenue, Save time |

## Staff the job and get it done

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Shift filler | Hours on the phone finding someone for Saturday. | Finds staff within range, checks for clashes including travel time and ranks the candidates. It offers the job by text, WhatsApp, email or push and assigns the first good yes. | Built, needs generalising | Tipsy sends offers in timed waves and places the first good yes on bookings set to auto-assign. Otherwise the office presses Assign, with clash and travel warnings. Inside 48 hours an emergency blast texts everyone and places the first clash-free yes. Automatic re-offers after a drop-out are being tested. | Save time, Less stress, Faster |
| Clash and short-notice watch | Double-booked staff, found out on the day. | Checks every job for clashes and keeps a close eye on short-notice jobs. | Built, needs generalising | A daily clash sweep and a 15-minute watch at Tipsy. | Less risk, Less stress |
| Check-in on the day | No-shows discovered when the customer rings. | Staff must check in by a deadline. Late check-ins trigger alerts and a strike. | Built, needs generalising | Tipsy’s midday check-in. | Less risk, Less stress, Happier customers |
| Where-to-recruit map | Hiring where it’s easy, not where the jobs are. | Colours each area by staffing need, using demand, staff quality and drive times. | Built, needs generalising | Tipsy’s coverage map. | Simpler, More revenue |
| Change requests | Every date or headcount change becomes an email chain. | The customer asks for a change. The system reprices it, checks staff, then approves it or queues it for a person. | Built, needs generalising | Guest, date, time and venue changes at Tipsy. | Save time, Happier customers, Less stress |
| Job materials lists | Staff over-buy, or turn up short. | Builds each worker’s shopping or materials list from the job and pays them for it. | Built, needs generalising | Tipsy’s ingredient lists, sized to what the shop sells, plus the glasses each cocktail needs. Each drink goes to the bartender who owns the right glasses. | Save time, Save money |
| Kit allowance and orders | Staff kit costs a fortune and nobody tracks it. | Workers earn kit credit per job and order from set suppliers, and deliveries are tracked. | Built, needs generalising | Tipsy’s equipment orders. The office presses Place, a robot in the desktop app fills in the Drinkstuff order, and DPD emails track delivery. The Place click stays while the robot is tested; the aim is fully automatic ordering. | Save money, Save time |
| Crew briefing notes | The important note never reached the person on site. | Flagged notes go to the confirmed crew at the right time before the job. | Built, needs generalising | Tipsy’s critical-notes forwarding. | Happier customers, Less risk |
| On-shift ops console | Whoever is on call juggles five apps. | One screen for today’s jobs and calls, with an emergency button and a shift report. | Built, needs generalising | Tipsy’s operator console. | Less stress, Simpler |
| Ticketed sessions with capacity | Public classes and tours booked by email, and overbooked. | Sessions with a set number of places, public tickets and private groups side by side, plus waiting lists. | To build | Tipsy sells private classes only. There are no ticketed sessions. | More revenue, Save time |
| Waivers and customer forms | Paper waivers and allergy forms on the day. | Customers sign waivers and fill in dietary or safety forms before they arrive. | To build | Not built for customers. Tipsy collects cocktail choices and addresses in the portal. | Less risk, Save time |
| Subcontractor network | Turning work away when your own crew is full. | Pass overflow jobs to trusted partner businesses and take a cut, with the same quality checks. | To build | Tipsy’s agency accounts work in the other direction, with partners sending work in. | More revenue |
| Timesheets and hours worked | Hourly staff paid on trust. | Staff clock in and out on site, with their location recorded. | To build | Only check-in exists. There’s no clock-out or hours total. | Save money, Less risk |
| Route planning | Multi-drop days planned on paper. | Puts a day’s jobs in the quickest order. | To build | Travel times exist, but multi-stop routes don’t. | Save time, Save money |

## Every conversation in one place

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ One inbox for everything | Messages scattered across Gmail, WhatsApp, texts and voicemail. | Email, WhatsApp, texts, calls and app messages in one queue, each one linked to the customer and the job. | Built, needs generalising | Tipsy’s Command Centre. | Less stress, Save time, Simpler |
| ★ AI replies that know the business | Hours a day typing the same answers. | Drafts every reply from your FAQs, your policies, the customer’s booking and your past replies. Every correction becomes a standing rule. Email-only assistants like Fyxer can’t see the booking. | Built, needs generalising | Drafts every incoming message at Tipsy, and a person approves each one. | Save time, Faster, Happier customers |
| ★ Automation builder anyone can use | Changing a follow-up or a reminder needs a developer. | Every automation reads like a sentence the owner fills in: when something happens, wait this long, send this message by this channel to these people, unless this is true. Messages are built in a drag-and-drop editor, written by the AI or imported from Mailchimp, Canva or HTML, with a preview, a test send and a log. | Built, needs generalising | The pieces exist at Tipsy: the drag-and-drop editor, scheduled broadcasts with audiences and A/B tests, and send-time guards. But follow-up timings are fixed in code, the trigger panel only explains, and importing isn’t built. | Save time, Simpler, Less stress |
| Autoresponders | Customers don’t know whether their message arrived, especially at night or over a holiday. | Instant replies the owner sets for new enquiries, out of hours and holidays, on every channel, with the AI filling in details like the price and date. | Built, needs generalising | Tipsy has one automatic WhatsApp reply, which steers bartenders to the app. Customer replies are drafts a person sends. | Happier customers, Faster |
| Sort and prioritise | The urgent message is buried under newsletters. | Works out who is writing, what they want and which job it’s about, then ranks it. | Built, needs generalising | Runs on every Tipsy message. The priority bot re-ranks as things change, using Russell’s own rules, how soon the booking or quoted date is, money owed and how long someone has waited. | Less stress, Faster |
| Who is waiting on us | A customer waiting three days because it fell between two people. | Shows everything a person is still waiting for across every channel. | Built, generic | The sender panel in Tipsy’s inbox. | Happier customers, Less stress |
| AI does the small updates | Copying details from an email into the system. | The AI offers to make a change, such as a new phone number or guest count, and a person clicks to approve it. | Built, generic | “Ellie can help” at Tipsy. | Save time |
| Ask your inbox | “What did we tell that customer in March?” | Ask in plain English and get an answer from your email history, with the emails quoted. | Built, generic | Tipsy’s archive search. | Save time, Less stress |
| Email engine | Emails landing in spam, or one complaint blocking your logins. | Separate streams for service and marketing email, a drag-and-drop editor, scheduled broadcasts, A/B tests and address checks. | Built, generic | About 60 Tipsy emails run on it. | More revenue, Less risk |
| Consent and unsubscribe | GDPR and marketing rules handled by hope. | One-click unsubscribe, with a history and a consent record for every person. | Built, generic | Every Tipsy marketing email. | Less risk |
| US texting that gets delivered | Business texts in the US get blocked by carriers unless the sender is registered. | Registers the business under the US carrier rules (A2P 10DLC) and keeps a consent record for every number it texts. | Built, needs generalising | Tipsy sends texts through Twilio in the UK. US registration and consent records would be new. | Less risk, More revenue |
| WhatsApp Business, done properly | Staff using their personal WhatsApp for customers. | Official WhatsApp with approved templates, the 24-hour reply rule, contact hours and a last check before anything sends. | Built, needs generalising | Tipsy’s customer WhatsApp line. The two staff lines use an unofficial connection that couldn’t be sold. | Happier customers, Less risk |
| ★ Hidden phone numbers | Staff and customers swap numbers and cut you out. | Calls and texts go through shared numbers, so neither side sees the other’s real number. Calls can be transcribed and checked for attempts to take the work off the books. | Built, needs generalising | Between Tipsy customers and bartenders. The Call masking page shows the office every call and text as one conversation per booking, with transcripts and flags. | Save money, Less risk |
| Office calls captured | What was agreed on the phone gets lost. | Each call’s recording, transcript and AI summary lands in the inbox against the customer. | Built, generic | Zoom Phone at Tipsy, synced every 15 minutes. | Less stress, Less risk |
| Meeting note-taker | Video calls with clients leave no record. | Joins or reads video calls, writes the notes and actions, and files them against the customer. | Built, needs generalising | Phone calls are summarised already. Video meetings aren’t. | Save time |
| Team and customer chat | Staff updates by text message, with no record. | In-app chat with read receipts. Unread messages get chased. | Built, needs generalising | Tipsy’s staff and customer chat. | Simpler, Less stress |
| Push notifications that check they arrive | Notifications sent to phones that never show them. | Push notifications with delivery receipts, plus a check on whether each person can actually be reached. | Built, generic | Tipsy’s staff app. | Less risk |

## Keep them coming back

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| Automatic feedback | You only hear about a job when something went wrong. | Asks every customer for feedback the day after and rewards staff for good scores. | Built, needs generalising | Tipsy’s thumbs-up bonus. | Happier customers, More revenue |
| Review booster | Happy customers never leave a Google review. | Asks happy customers, and only them, for a review on Google, Trustpilot or similar, at the right moment. | Built, needs generalising | Since 2 September, a customer who emails to say thanks gets a reply with Trustpilot and reviews.io links, which a person sends. The thumbs-up review ask the old system had wasn’t carried over to the new feedback page, and nothing is ever sent after a thumbs down. | More revenue |
| Rebooking and win-back | Last year’s customers forgotten this year. | Anniversary, seasonal and lapsed-customer campaigns that stop when they book. | To build | Broadcasts and email sequences exist, but there are no repeat-customer campaigns. | More revenue |
| Customer referrals | Word of mouth is neither tracked nor rewarded. | After a thumbs up, each customer gets a referral code that rewards both them and a friend, and only then is asked for a review. | To build | Partner links exist and apply discount codes automatically. There’s nothing for customers yet. | More revenue |
| ★ Complaint handling | Complaints handled inconsistently, or missed. | Spots a complaint, offers a holding reply to the customer and turns their words into a message for the worker who did the job, with price and admin talk removed. It keeps the worker’s answer and holds that job’s pay until the complaint is sorted. A manager always signs off. | Built, needs generalising | Tipsy’s complaint flow, built 8 to 10 September. The pay hold lifts after 7 days, or sooner if the office releases it. | Less stress, Happier customers, Less risk |

## Find, check and onboard people

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Applicant tracking with AI screening | Hundreds of CVs and no time to read them. | Takes applications from your site and Indeed, reads CVs, merges duplicates and scores every applicant. | Built, needs generalising | Runs hourly at Tipsy. | Save time |
| A hiring pipeline that chases itself | Candidates go quiet, and you forget who owes whom a reply. | Chases forms that haven’t come back and only closes candidates who owe you a reply. | Built, generic | Tipsy’s recruitment stages. | Save time, Less stress |
| Interview booking | Days of back-and-forth to find a slot. | Candidates book their own slot and get reminders by email and WhatsApp. | Built, needs generalising | Tipsy’s interview diary. | Save time |
| Skills tests and AI interviews | Hiring on the strength of a good chat. | Online assessments and AI-run interviews. | Built, generic | Runs today as a separate product; could become part of Hey Day’s hiring tools. | Less risk, Save time |
| ★ ID and right-to-work checks | Heavy Home Office fines for one missed check. | A passport-and-selfie check through Yoti, share codes for workers from outside the UK and Ireland, and alerts before permission to work runs out. | Built, needs generalising | Every Tipsy bartender. Expiry dates are checked daily. | Less risk |
| Background checks | US clients expect workers to be checked before they’re sent into someone’s home or party. | Orders a background check from a checking service during onboarding and records the result. | To build | Not built. UK checks are right-to-work only. | Less risk |
| Onboarding checklist | New starters stall halfway and nobody notices. | Takes them step by step through right to work, personal details, contract, training, first jobs and kit, and chases anyone stuck for a week. | Built, needs generalising | Tipsy’s eight-step onboarding. | Save time, Less stress |
| Contracts and e-signing | Printing, signing and scanning. | Fills a contract template for each person and sends it for e-signature. | Built, generic | Every Tipsy bartender contract. | Save time, Less risk |
| Training by shadowing | Training arranged by phone and never signed off. | Puts a trainee on a real job near them, chases the trainer for feedback and requires a sign-off. | Built, needs generalising | Tipsy’s training sign-off. | Happier customers, Less risk |
| Performance tiers | The best staff treated the same as the worst. | Scores staff on jobs done, notice given when cancelling, feedback and reliability. Higher tiers get offered work first. | Built, needs generalising | Tipsy’s Gold, Silver and Bronze tiers. The automatic recalculation is currently switched off. | Happier customers, More revenue |
| ★ Engagement watch | Staff drift away before you notice. | Flags people who never accept work, people who are never offered any and people who always say yes but never get picked. | Built, generic | Runs daily at Tipsy. | Less stress, Save money |
| Staff app | Staff ring the office for everything. | Jobs, pay, expenses, messages, recipes and training all in one app. | Built, needs generalising | The bartender side of Tipsy’s portal. | Save time, Simpler |
| ★ Employees and subcontractors, handled differently | Crew tools built for one kind of worker get the other kind wrong. | Each team member is set up as an employee or a subcontractor, and the features switch to match. Employees get timesheets, payroll through a provider and rota rules. Subcontractors get job offers they can decline, their own availability, invoices and payouts. Warnings by state and country. | Built, needs generalising | Tipsy only works with self-employed bartenders, so every crew tool assumes one kind of worker. | Less risk, Simpler |
| Holidays and absence | Leave tracked in a spreadsheet. | Requests, approvals and a calendar that the shift filler respects. | To build | Not built. Tipsy asks staff for availability instead. | Simpler |

## Pay your people

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| Pay rules per job | Working out who is owed what takes a day a week. | Works out pay per job from hours, travel, level, zone and extras, using rules the owner sets. | Built, needs generalising | Tipsy’s pay calculator, built around two job types. | Save time, Less risk |
| ★ Contractor payouts | Paying 50 freelancers by bank transfer, one at a time. | Pays through Wise from a queue, with an undo window. | Built, needs generalising | Every Tipsy wage. | Save time |
| ★ Instant cash-out | Good staff leave for apps that pay faster. | Workers take earned pay early for a fee, with blocks and approvals built in. Check the rules before selling early pay as a product. | Built, needs generalising | Tipsy’s cash-out. A customer complaint pauses it for that job for up to 7 days. | Less stress, Save money |
| Expenses with rules | Receipts in a shoebox and claims nobody checks. | Claims with receipt photos, checked against rules: the person worked the job, it’s within 28 days and it’s under the cap. Approved claims are added to the next pay, and small parking claims are approved automatically. | Built, generic | Tipsy’s expenses. | Save time, Save money, Less risk |
| Money owed, netted off | Staff owe you money you never get back. | Takes what is owed off the next job and reconciles every balance. | Built, needs generalising | Tipsy’s deductions and wage reconciliation. | Save money |
| Employee payroll | PAYE, pensions and reporting to HMRC, or US payroll taxes. | Connect to an existing payroll provider rather than build one. | To build | Not built. Tipsy pays freelancers. | Less risk, Save time |
| US contractor paperwork | Chasing W-9s in January and filing 1099s late. | Collects each contractor’s W-9 at onboarding, pays by ACH and issues 1099 forms at year end. | To build | Not built. Tipsy’s payouts run through Wise for UK freelancers. HoneyBook already does this in the US. | Less risk, Save time |

## Money and the books

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| Bank feed matching | Hours spent matching payments to bookings. | Imports bank lines and matches receipts to them. | Built, needs generalising | Wise, Square and Mercury at Tipsy. | Save time |
| Accounting sync | Everything retyped into Xero or QuickBooks. | Posts invoices, payments and payouts to your accounts package. | To build | Only a Zapier link to QuickBooks, for payee records. | Save time |
| Cash-flow forecast | Caught out by a quiet month. | Shows deposits and balances due, wages owed and expected income, week by week. | To build | The data exists, but the forecast doesn’t. | Less stress, Less risk |
| Supplier price watch | Supplier prices creep up and margins shrink unnoticed. | Tracks what you pay per item and flags rises. | To build | Tipsy stores a shelf price per ingredient. Supermarkets block automatic lookups. | Save money |
| Missing-money checks | Money that should have come in, and didn’t. | A weekly check for bookings where what was paid and what is owed don’t match. | Built, generic | Tipsy’s balance-mismatch report. | Save money, Less risk |

## Know your numbers

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Ask your business | Every question needs a spreadsheet. | Ask “how many weddings did we do in June?” in plain English and get the answer. | Built, needs generalising | Tipsy’s reports page writes the query itself, read-only. | Save time, Simpler |
| ★ Command Centre | Starting the day not knowing what’s on fire. | One screen showing what needs you now, your tasks, your messages and the numbers. | Built, needs generalising | Tipsy’s office works from it every day. | Less stress, Simpler, Faster |
| ★ Weekly AI business coach | Owners drown in numbers and still don’t know what to fix. | Every Monday the AI reads the numbers and names the three things worth fixing this week, such as slow replies, a quiet area or a price that is too low. | To build | The numbers and the AI are there. Nothing puts them together yet. | More revenue, Less stress |
| What everybody did | No clear picture of who is doing what. | A daily view of each person’s work. | Built, needs generalising | Tipsy’s productivity page. | Less stress |
| Overnight report | Problems found days later. | An email every morning covering what happened and what needs attention. | Built, needs generalising | Tipsy’s overnight report. | Less stress, Less risk |
| Ad spend against profit | You know the clicks, but not the profit. | Shows ad spend next to the profit it brought in. | Built, needs generalising | Tipsy’s Google Ads view. | Save money |
| Owner’s phone app | The business stops when the owner leaves the desk. | Everything important on the phone: messages, approvals, payments and today’s jobs. | Built, needs generalising | Tipsy’s portal works on phones, and there is a desktop app. There’s no dedicated owner app. | Faster, Less stress |

## Run the business, not the admin

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ Policies and procedures hub | The rules live in the owner’s head and in old WhatsApps. | A staff handbook people can search and ask questions of, with sign-to-say-read and version history. The same text feeds the AI. | To build | Tipsy has a knowledge base feeding the AI (operators manual, bartender policies, FAQs), but no handbook staff can use. | Less stress, Simpler, Less risk |
| Knowledge base behind the AI | AI that makes things up. | Your documents, rules and answers are searched before the AI says anything about policy. | Built, generic | Tipsy’s inbox knowledge base. | Less risk, Happier customers |
| Roles and permissions | Either everyone sees everything, or nobody can do their job. | Roles linked to permissions the owner edits, page by page. | Built, generic | Eight roles at Tipsy. | Less risk, Simpler |
| Log in as someone | “It doesn’t work for me”, and no way to see it. | The owner sees exactly what a staff member or customer sees, read-only if wanted, and every visit is logged. | Built, generic | Tipsy’s impersonation. | Faster, Less stress |
| Full audit trail | “Who changed this price?” | Records every change: who made it, when, and the before and after. | Built, generic | Every Tipsy booking. | Less risk |
| Tasks that chase themselves | Things agreed in meetings never happen. | Anyone adds their own ad hoc tasks, tags colleagues and sets a deadline. Tasks sit on the action centre, overdue first. When a deadline arrives, each tagged person is chased separately, so one person snoozing it doesn’t silence it for the others. Tasks can also be raised in the inbox with an owner, a due date and attachments, and AI sets their priority. | Built, generic | Tipsy’s action-centre tasks and inbox tasks. | Less stress |
| Something-broke alarm | Automations fail without anyone knowing. | Logs every failure, retries it and alerts the owner outside quiet hours. Every key to an outside service is checked weekly. | Built, generic | Across Tipsy’s 140+ automations. | Less risk, Less stress |
| Compliance calendar | Insurance, certificates and licences expire unnoticed. | Tracks expiry dates for people, vehicles and the business, and chases renewals. | To build | Right-to-work expiry is tracked. Nothing else is. | Less risk, Less stress |
| Build-me-this service | Off-the-shelf software never quite fits. | Clients post requests to a list that an AI developer works through, and a person signs off each one. | Built, needs generalising | How the Tipsy system itself gets built. | Simpler |

## Put AI to work safely

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| ★ AI setup assistant | Setting up business software takes weeks, so owners give up. | The owner shares their website, price list and old emails. The AI drafts their pricing rules, email templates, FAQs and policies for them to approve. | To build | Not built. The pieces it would fill in (knowledge base, templates, price settings) all exist. | Faster, Save time, Simpler |
| Ready-made kits for each industry | A blank system is intimidating. | Starter packs of emails, questions, prices, policies and automations for bartenders, cleaners, tour guides and so on. | To build | Tipsy’s own setup is effectively the events kit. | Faster, Simpler |
| ★ AI control panel | AI bills creep up, and nobody knows which tool uses what. | Choose the AI model for each task, switch suppliers without code and see spend per feature. It alerts on billing failures, checks monthly for better or cheaper models and has one off switch. | Built, generic | Tipsy’s AI settings. They cost about $164 a fortnight in late August. | Save money, Less risk |
| A person in the loop, by design | Fear of AI saying the wrong thing to a customer. | The AI drafts and a person approves. When it isn’t sure, it asks a question instead of guessing. Clients can raise the trust level one task at a time. | Built, generic | No AI-written reply leaves Tipsy without a person pressing send. | Less risk, Happier customers |
| Photo and document tidy | Messy receipt photos and staff pictures. | Rotates receipt photos, tidies headshots for approval and reads CVs. | Built, needs generalising | Used across Tipsy. | Save time |
| Call summaries | Nobody has time to write up calls. | Transcribes calls and writes a short summary where the phone system didn’t. | Built, generic | Tipsy’s office calls and masked calls. | Save time, Less stress |

## Grow into new places and countries

| Capability | Problem it solves | What it does | Status | At Tipsy today | Goals |
|---|---|---|---|---|---|
| Branches and territories | A second area runs differently from the first. | Areas with their own staff, prices, travel zones and managers, all reporting to one owner. | Built, needs generalising | Tipsy’s travel zones, coverage map and day-limited operator access. | Simpler, More revenue |
| ★ Franchise and licensee controls | Franchisees drift from the brand and the prices. | Central brand, prices and policies, local running, and a royalty worked out automatically from bookings. | To build | Not built. Agency accounts show part of the pattern. | More revenue, Less risk |
| Several currencies and payment providers | A second country means a second system. | Prices, deposits and payouts in each country’s currency, through the local payment provider. | To build | The US arm was built as a separate app in dollars with Square. | More revenue |
| Tax and VAT per country | Getting tax wrong in a new market. | Applies the right tax to each quote and invoice, and reports it. | To build | Not built. | Less risk |
| Languages and time zones | Customers and staff abroad served in the wrong language, at the wrong hour. | AI translates messages and emails both ways, and every time is shown in local time. | To build | 73 code files assume UK time today. | Happier customers, More revenue |
| Right-to-work rules per country | Every country checks workers differently. | The same checklist with each country’s rules plugged in. | Built, needs generalising | UK and Irish rules only, through Yoti. The US would need I-9 checks for employees. | Less risk |
| Group reporting | No single view across companies or countries. | Combined numbers across every branch, company and currency. | To build | Not built. | Less stress, Simpler |
| White-label for partners | Agencies want to sell the service under their own name. | Partners run the system under their own brand for their own clients. | Built, needs generalising | Tipsy’s agency portal is the starting point. | More revenue |
| Single sign-on, security and an open API | Big clients won’t sign without a security review. | Company logins, security paperwork, uptime promises and an API other systems can connect to. | To build | Staff two-factor login and Zapier hooks exist. There’s no public API. | Less risk, More revenue |

---

# Appendix B: The owner’s journey, step by step (friction, fix, status)

## 1. Someone needs what you sell

*The customer:* They have a birthday, hen do, wedding or work event coming up and start looking: Google, Instagram, a friend’s recommendation, or a marketplace like The Knot or GigSalad.

*The business:* You need to be found, look trustworthy and know which of your marketing actually brings bookings.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Customer | “How do I know who’s any good?” | Reviews and photos where people look, and a steady flow of new reviews | Partly | A reviews widget and 5-star badges in emails. The review ask after a thumbs up was lost in the move from the old system |
| Business | Paying for ads without knowing which ones bring bookings | Each enquiry stores the ad click and where it came from, and each booking’s profit goes back to Google and Microsoft | Yes | Click IDs saved on the quote; conversions uploaded every 30 minutes |
| Business | Not knowing which social posts bring enquiries | Tagged links in your bio, posts and social ads, so every enquiry shows which post it came from, and booking profit sent back to Facebook and Instagram ads the way it already goes to Google | Partly | The quote form saves campaign tags and the referring page. Nothing sends results back to Meta yet; the Microsoft Ads link shows the pattern to copy |
| Business | Ads shown to people who have already booked | Nightly ad audiences that target open quotes and leave booked customers out | Yes | Google Customer Match audiences rebuilt every night |
| Business | Invisible on marketplaces and directories | Listings kept up to date, with their leads coming straight in | Not yet | Nothing yet. Those leads arrive as ordinary emails at best |
| Business | No website, or one that doesn’t take enquiries | A simple site with the instant quote built in | Partly | Tipsy’s US site was rebuilt around its instant quote; there’s no general site builder |
| Business | Not knowing where people give up on the website | Drop-off tracking at each step of the form | Yes | The quote funnel page in the boss area |

## 2. They get in touch

*The customer:* Whichever way is easiest for them: the website form, WhatsApp, a call, an email, a text or an Instagram message. Often in the evening or at the weekend, and often to three or four businesses at once.

*The business:* Enquiries land in six different places, and whoever answers first and best usually wins.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Customer | “I just want a price without talking to anyone” | The instant quote form: a few questions, then good, better and best prices on screen and by email | Yes | The front page of quotes.tipsyparties.co.uk, reached from ads and the website. This is Tipsy’s main route in |
| Business | Messages scattered across email, WhatsApp, calls and texts | One inbox, with every message linked to the customer and the job | Yes | The Command Centre: email, WhatsApp and app chat, with call summaries and forwarded texts |
| Business | Instagram, Facebook and Google messages go unseen | Those messages pulled into the same inbox through Meta’s official messaging tools, the same route WhatsApp already uses, then quoted from the office quote tool and followed up like any other enquiry | Not yet | Not in the inbox today. Meta has to approve the connection |
| Customer | “I rang and nobody answered” | Missed calls go on a ring-back list; later, an AI receptionist could answer | Partly | A ring-back list every 15 minutes. No AI receptionist yet |
| Customer | “I messaged at 10pm and heard back the next afternoon” | A reply drafted within minutes and, within rules you set, sent straight away | Partly | Drafts are ready in minutes, but a person still presses send |
| Customer | “Did they even get my message?” | Autoresponders the owner sets for new enquiries, out of hours and holidays, on every channel | Partly | Only one automatic reply exists, on WhatsApp, steering bartenders to the app. Customer replies are drafts a person sends |
| Business | Real enquiries land in spam | The spam folder checked on a schedule and real messages pulled back | Yes | Runs on Tipsy’s Gmail |
| Business | What was said on the phone is forgotten | Calls recorded, transcribed and summarised into the inbox | Yes | Zoom Phone calls synced every 15 minutes, with AI summaries |

## 3. They want a price and answers

*The customer:* They want to know what it costs, what’s included and whether you can do their date, and they ask the questions everyone asks.

*The business:* Working out a price, checking you can staff it and answering the same questions again, without mistakes.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Every business needs different questions to price a job | A quote builder where the owner sets the questions, the variables and how each answer changes the price | Partly | Tipsy’s quote form and pricing engine. The rates are settings the owner edits, but the questions are built into the code for two services |
| Business | Every business sells different packages | A package builder for one-off services, fixed packages and recurring plans, each with its own price and extras | Partly | Tipsy’s UK packages are fixed in code; the US site keeps its six packages as editable settings |
| Business | Regular clients expect their own price | Price lists for a regular client or a group of clients, the way Tipsy prices agencies | Partly | Agencies get their own prices, zones, minimums and invoices. Individual customers don’t |
| Business | Phone and email enquiries still need a proper quote | The office builds the same instant quote from the conversation and sends it | Yes | The office quote tool, using the same pricing as the website form |
| Business | Different staff quote different prices | Pricing rules for guests, hours, travel, date and extras | Yes | Tipsy’s quote engine, built round cocktails and bartenders, so it needs generalising |
| Business | Peak Saturdays sold at quiet-day prices | A busy-date premium added automatically | Yes | Live on Tipsy quotes |
| Business | Saying yes to a job that loses money | The estimated profit shown on every quote | Yes | Worked out from ingredient and staff costs |
| Customer | “Can you actually do my date?” | Local staff asked before a far-off or last-minute booking is confirmed | Yes | Tipsy’s pre-booking availability check |
| Business | The same questions answered all day | AI drafts the answer from your FAQs, policies and the enquiry, warmer before they book and firmer after | Yes | The inbox drafter, its knowledge base and its tone-by-stage rules |
| Customer | “What would it cost with ten more people, or another hour?” | An interactive quote: the customer changes guests or hours and the price updates at once, including busy-date pricing | Yes | Tipsy’s quote page, with guest and hour controls that reprice live. The date and venue are shown but changed by request |
| Customer | “Can you resend my quote?” | They look it up themselves by reference or an emailed code | Yes | Tipsy’s find-my-quote page |

## 4. They go quiet while they decide

*The customer:* They check with their partner or the group, compare two or three quotes, and often simply forget.

*The business:* This is where most quotes are lost, to silence rather than to a competitor.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Quotes nobody chases | Seven emails over 30 days, worded for their occasion, stopping the moment they book | Yes | The Tipsy email journey, run hourly |
| Business | Every quote chased the same way | Follow-ups that change with the lead: sooner and more personal for close dates and high values, lighter for far-off, low-value ones | Partly | The emails and WhatsApp run on one fixed schedule for every quote. The data to vary them already exists: value, profit, date, distance and demand |
| Business | Not knowing which leads to ring first | Leads labelled hot, urgent, high value, easy (nearby) or off-peak, with the best pushed to the top of the office’s list | Partly | The priority bot already ranks a lead’s messages by how soon their date is. There are no lead labels, and value and demand aren’t used yet |
| Business | Chasing a date you’re already full on | Follow-ups paused for dates you can’t staff, or switched to offering another date | Not yet | Nothing checks capacity before a follow-up goes out, though busy-date pricing and the coverage map already know which dates are busy |
| Business | Quiet midweek dates go unsold | Off-peak offers sent automatically when demand is low | Not yet | Busy-date pricing adds a premium when a date is busy, but there’s nothing for quiet dates |
| Business | Changing a follow-up needs a developer | A simple builder: design the message or import one made elsewhere, then choose when it goes, by which channel, to whom and what triggers it | Partly | The drag-and-drop email editor and scheduled broadcasts exist. Follow-up timings are fixed in code, and the trigger panel only explains |
| Business | Emails get ignored | A friendly WhatsApp 2 to 48 hours after the quote, in sensible hours | Yes | Tipsy’s quote follow-up message |
| Customer | “Will the price go up if I wait?” | The price held for 30 days | Yes | Tipsy’s 30-day quote guarantee |
| Customer | No reason to decide now | Occasion offers and discount codes | Yes | “Bride goes free”, occasion gifts, discount codes and partner links |
| Business | Not knowing which wording or price works best | A/B tests on emails, and random price testing with a profit report | Partly | Both are built. The price test starts switched off, and I couldn’t confirm any email variants are live |
| Business | Planners and agencies asking on behalf of clients | Partner accounts with their own prices, portal and invoices | Yes | Tipsy’s agency bookings |

## 5. They book

*The customer:* They want it done in two minutes: pay a deposit, get a confirmation and know what happens next.

*The business:* Taking the money, getting the terms agreed and setting up the job without retyping anything.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Customer | “Do I have to ring to book?” | The quote becomes a booking, with the deposit paid online in one go | Yes | Stripe checkout: a £20 deposit, or the full amount inside 10 days |
| Customer | “Can I just book it now?” | Instant booking, with the owner choosing the rule: anyone can book, check the diary or staff first, or it depends on location, date, party size or value | Partly | Tipsy already books conditionally, but the rules are built in. Big classes get a bespoke price, far-away and last-minute bookings check staff first, the full amount is taken inside 10 days, and the US site won’t instant-price beyond a 4-hour drive |
| Business | The owner’s diary lives in Google or Outlook | Check the owner’s own calendar before accepting a booking, and add confirmed bookings to it | Not yet | Tipsy checks its crew’s availability instead; there’s no calendar connection |
| Business | People start paying and get distracted | A one-click link back to where they stopped | Yes | Abandoned-checkout email after 2 hours |
| Business | Terms and conditions never signed | The terms signed in the same step as paying | Not yet | E-signing exists for staff contracts (QuickSigner) and could be reused |
| Business | Matching payments to bookings by hand | Card payments marked paid instantly, bank transfers matched by reference | Yes | Stripe, plus bank payments applied every 15 minutes |
| Business | Card fees on big balances | Customers steered to cheaper pay-by-bank | Yes | Tipsy’s balance page |
| Customer | “Where’s my invoice?” | A pro forma invoice at booking, a final one after, and receipts to download | Yes | Every Tipsy booking; self-serve receipts went live this week |
| Customer | “Another password to remember” | A magic login link, with no password | Yes | A 7-day link in the confirmation email |
| Customer | “It’s too much to pay in one go” | Instalment plans that charge and chase themselves | Not yet | Tipsy has a deposit and a balance only |
| Customer | “I want to give this as a present” | Gift vouchers sold online, with balances tracked and redeemable at booking | Not yet | Not built |
| Business | Regular work re-booked and re-invoiced by hand | A recurring agreement: a bespoke set of tasks at a set price, repeating weekly, monthly or every few weeks, with every visit booked and staffed automatically | Not yet | Not built; Tipsy sells one-off events |
| Business | Chasing regular clients for every payment | Direct debit or a saved card, charged automatically for each visit or each month | Not yet | Not built; customers pay each time by card or bank transfer |

## 6. The planning weeks

*The customer:* Guest numbers change, they choose the menu, they think of more questions and they forget deadlines.

*The business:* Collecting details, handling changes and chasing the balance, without a pile of emails.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Missing addresses, phone numbers and choices | Tasks in the customer’s portal, with automatic reminders | Yes | Address checks from T-21, and cocktail reminders weekly, then at T-1 and T-0 |
| Customer | “We’ve got ten more people now” | Changes requested in the portal, repriced and checked with the crew | Yes | Guest, date, time and venue requests, handled every 15 minutes |
| Business | Last-minute menu changes | Choices close on a set date, and the office can lock them sooner | Yes | Customers are told T-10; changes are refused from T-3 |
| Customer | “Can I show the menu to my partner?” | A printable themed menu and a share link | Yes | Tipsy’s menu themes and public share page |
| Customer | “One of our guests has an allergy” | Allergies and dietary needs captured with the choices | Planned | Coming with the new menu |
| Business | Chasing the balance is awkward | Reminders, then escalating email and WhatsApp that stop once it’s paid | Yes | Reminders at T-11 and T-10, chasing from T-9 and a warning at T-7 |
| Business | Important notes never reach the crew | Flagged notes sent to the crew at the right time | Yes | Tipsy’s critical-notes forwarding |
| Customer | “Is everything sorted?” | An “all set” email once choices, balance and staff are confirmed, then a “booking tomorrow” email | Yes | Tipsy’s booking lifecycle emails |

## 7. Behind the scenes: staffing the job

*The customer:* They never see this, but it decides whether their day goes well.

*The business:* Once there’s a crew, filling shifts becomes the biggest job in the business.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Hours on the phone finding someone | Offers sent in timed waves to ranked staff within range, leaving out anyone with a clash | Yes | Ranked 50% on distance, 30% on tier and 20% on points; sent by email, WhatsApp or app |
| Business | Choosing who gets the job | The best yes placed automatically, with the office handling exceptions | Partly | Automatic on auto-assign bookings and emergencies; otherwise the office presses Assign |
| Business | A bartender drops out | A cancel button that re-offers and places the first good yes | Being tested | The emergency button already texts everyone with a bonus and places the first clash-free yes |
| Business | The most reliable staff aren’t offered work first | Reliability and customer rating in the ranking | Partly | Tiers exist, but the recalculation is off until every bartender is classified |
| Business | Double bookings found on the day | Clash checks that include travel and set-up time | Yes | A daily clash sweep and a short-notice watch |
| Staff | “What do I need to buy?” | A shopping list built from the customer’s choices, with the glasses for each drink | Yes | Held back if more than £50 is owed; each drink goes to whoever owns the right glasses |
| Staff | Ordering and tracking kit | Staff order from their kit credit and the order places itself | Being tested | The office presses Place and a robot orders from Drinkstuff; DPD emails track the parcel |
| Staff | Turning up short of glasses | A “you’re short” prompt with the order filled in | Not yet | The comparison exists, but only the office sees it |
| Business | Staff and customers swapping numbers | Hidden phone numbers between them | Yes | Tipsy’s masked numbers, with a scan for work taken off the books |
| Business | Not knowing what staff and customers say to each other | Every call and text between them goes through the system and shows as one conversation per booking, with call transcripts and an AI flag on any attempt to work direct | Yes | Tipsy’s Call masking page. Each conversation is marked flagged, checked and fine, or never scanned, and unscanned is never shown as safe |
| Staff | Jobs not checked before the day | A pre-job checklist with reminders and strikes | Yes | Pre-booking checks at T-6 |

## 8. The day

*The customer:* They want it to just work: staff arrive on time, the drinks flow, and guests may want to tip or more people may turn up.

*The business:* Knowing everyone is on the way, and fixing it fast when they’re not.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Customer | “Is the bartender definitely coming?” | Check-in by a deadline, with reminders and strikes | Yes | Check-in by midday, with reminders from 8am to 1pm |
| Business | The person on call juggles five apps | One screen for today’s jobs and calls, with an emergency button | Yes | Tipsy’s operator console |
| Customer | “Can we add a few more guests?” | The same checked answer every time | Yes | Tipsy’s extra-guests-on-the-night answer |
| Customer | Guests with no cash to tip | Tip by scanning a QR code, or by tapping a card or phone on the staff member’s phone, with tips split across the crew | Partly | The QR tip jar works today, with Apple Pay and Google Pay on the guest’s phone. Tapping a card on the bartender’s phone isn’t built |
| Business | Hourly staff paid on trust | Clock in and out with location | Not yet | Only check-in exists |
| Staff | Parking and taxi receipts | Claims with receipts, checked against rules | Yes | A 28-day limit and a £500 cap; small parking claims approved automatically |

## 9. Afterwards

*The customer:* If they loved it, they might review, rebook next year or tell friends. If not, they want it put right.

*The business:* Where reputation and repeat business are won or lost, and where problems must be handled fairly.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Only hearing when something went wrong | A feedback email the next day, chased if ignored | Yes | 1pm the day after: thumbs up, neutral or down |
| Business | Happy customers never leave a review or pass you on | After a thumbs up, give them a referral code that rewards both them and a friend, then ask for a review | Not yet | The review ask was lost in the move from the old system, and customers have no referral codes (only partner links exist) |
| Customer | A lovely thank-you email left unanswered | A warm reply with review links | Yes | Russell’s fixed reply with Trustpilot and reviews.io links |
| Customer | “Something went wrong and I want it sorted” | A holding reply at once, the bartender asked for their side, pay frozen and a manager signing off | Yes | Tipsy’s complaint flow, built 8 to 10 September |
| Business | Closing a complaint drags on | AI drafts the final reply, the bartender approves it and offers a voluntary refund, and the manager signs off | Not yet | The bartender is asked in free text today |
| Business | Refunds split across several payments | Worked out and refunded automatically | Yes | Tipsy’s cancel and refund tool |
| Staff | Good work goes unrewarded | A bonus for every thumbs up | Yes | Added to the bartender’s wage automatically |
| Business | Last year’s customers forgotten | Anniversary and win-back campaigns | Not yet | Broadcasts exist, but there are no repeat-customer campaigns |
| Customer | Friends asking “who did your bar?” | Each customer gets their own referral code or link to share | Partly | Only partner links exist, which apply a discount code automatically |
| Customer | Regulars get nothing for coming back | Loyalty cards or points that reward repeat bookings | Not yet | Not built; discount codes exist and could carry the reward |
| Customer | Regulars want to belong, and you want steady income | Memberships the owner designs: a monthly or yearly fee with benefits like included sessions, member prices, priority booking and members-only events | Not yet | Not built; member prices would reuse the agency price-list idea |

## 10. Paying your people

*The business:* Fast, correct pay keeps good staff, and good staff make the customer’s day.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Working out who is owed what | The wage builds itself at check-in | Yes | Base pay, travel, zone extra, shopping pay, bonuses and approved expenses |
| Staff | “When do I get paid?” | Staff cash out themselves, through Wise | Yes | Cash-out 48 hours after the job; new starters are paid in the fortnightly run |
| Business | Paying out while a complaint is open | Pay frozen until it’s resolved | Yes | A 7-day freeze or Release pay; the fortnightly pay run doesn’t check yet |
| Business | Staff owe money you never recover | Taken off the next job automatically | Yes | Tipsy’s deductions |
| Business | US contractor tax forms | W-9s collected and 1099s issued at year end | Not yet | Tipsy pays UK freelancers through Wise |
| Business | Employee payroll and tax | Connect to a payroll provider | Not yet | Not built; Tipsy pays freelancers |

## 11. Running the office, every day

*The customer:* Customers only notice this when it goes wrong: a slow reply, a wrong detail, or a message that shouldn’t have gone.

*The business:* The admin that grows with every booking.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Not knowing what needs you today | A screen of what’s urgent, for each person | Yes | The Command Centre’s Needs-me-now cards |
| Business | A customer waiting because it fell between two people | Everything a person is waiting on, across every channel | Yes | The who-is-waiting-on-us panel |
| Business | Copying details from emails into the system | The AI offers the update and a person clicks to approve it | Yes | “Ellie can help” |
| Business | “What did we tell them in March?” | Ask the inbox in plain English | Yes | Tipsy’s archive search |
| Business | The rules live in the owner’s head | A handbook that the AI and staff both read | Partly | The AI’s knowledge base exists; there’s no handbook for staff |
| Business | Things agreed never happen | Your own ad hoc tasks, with colleagues tagged and a deadline that chases each of them | Yes | Action-centre tasks: private unless shared, overdue first, and one person snoozing doesn’t silence it for the others |
| Business | Jobs that come out of an email or call get forgotten | A task raised in the inbox, with an owner, a due date and attachments, and its priority set by AI | Yes | Tipsy’s inbox tasks, which operators can raise too |
| Business | Automations fail and nobody notices | Failures logged, retried and alerted | Yes | Plus a weekly check of every outside service’s key |
| Business | Messages sent at the wrong moment | Nothing goes out about a cancelled booking, and every message is checked again as it sends | Yes | Tipsy’s send-time and cancellation guards |
| Business | “Who changed this?” | Every change recorded, with before and after | Yes | Tipsy’s booking audit trail |
| Business | Staff see too much, or not enough | Roles and permissions, and logging in as anyone to check | Yes | Eight roles, and read-only impersonation |
| Business | Marketing without consent | One-click unsubscribe with consent records | Yes | Every Tipsy marketing email |

## 12. Hiring more people

*The customer:* Customers feel this as the quality of the person who turns up.

*The business:* Growth stalls if hiring is slow.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Not knowing where to hire | A map showing which areas need staff | Yes | Tipsy’s coverage map, which doesn’t alert anyone yet |
| Business | Writing and posting job ads | An “advertise for this area” button | Not yet | Simple to add; ads are placed by hand today |
| Business | Hundreds of CVs | AI reads and scores every application | Yes | Indeed and website applications scored hourly |
| Business | Candidates go quiet | Forms chased automatically, and stale candidates closed | Yes | The shortlist form is chased twice within 48 hours |
| Business | Arranging interviews | Candidates book their own slot, with reminders | Yes | Tipsy’s interview diary |
| Business | Fines for illegal working | ID and right-to-work checks with expiry alerts | Yes | Yoti checks, share codes and a daily expiry check |
| Staff | Contracts printed and scanned | Contracts filled in and e-signed | Yes | QuickSigner |
| Staff | New starters stall | A step-by-step onboarding checklist that chases | Yes | Eight steps; anyone stuck for 7 days is chased |
| Business | Training never signed off | Shadowing a real job, with a required sign-off | Yes | Tipsy’s training sign-off |
| Business | Staff drift away unnoticed | A daily check on disengaged staff | Yes | Tipsy’s engagement watch |

## 13. Knowing your numbers

*The business:* Decisions without spreadsheets.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | Every question needs a spreadsheet | Ask your business in plain English | Yes | Tipsy’s reports page writes the query itself, read-only |
| Business | Problems found days later | A morning report of what needs attention | Yes | Tipsy’s overnight report |
| Business | Knowing the clicks but not the profit | Ad spend shown next to the profit it brought in | Yes | Tipsy’s Google Ads view |
| Business | Money that should have come in and didn’t | Weekly checks for payments that don’t add up, and a daily undercharge alarm | Yes | Tipsy’s balance-mismatch report and quote-drift check |
| Business | Caught out by a quiet month | A cash-flow forecast from deposits, balances and wages | Not yet | The data exists, but the forecast doesn’t |
| Business | Everything retyped into the accounts | Sync with Xero or QuickBooks | Partly | Only a Zapier link to QuickBooks for payee records, plus bank line matching |

## 14. Growing

*The business:* What changes when there are many people, places and partners.

| Who feels it | Friction | How we remove it | Do we do it? | Where it is at Tipsy |
|---|---|---|---|---|
| Business | AI bills that creep up | One control panel for every AI cost, with an off switch | Yes | Tipsy’s AI settings and monthly model review |
| Business | Quality varies between areas | Zones, coverage and running area by area | Partly | Travel zones and the coverage map exist |
| Business | A second country means a second system | Currencies, local payments, tax and languages in one system | Not yet | The US arm runs as a separate, smaller app |
| Customer | “I want to compare and book local suppliers in one place” | A marketplace of every client’s services, with instant prices and live availability | Planned | Planned for the new company, eventually. The machinery exists inside Tipsy, which matches customers to freelance bartenders with live availability, hidden numbers, payments, payouts and ratings |
| Business | Franchisees drift from the brand | Central prices and brand, with local running | Not yet | Nothing yet |
| Business | Setting up a new business takes weeks | An AI setup assistant, ready-made kits for each industry, and an import from their old system | Partly | Tipsy’s own setup is effectively the events kit, and the Tadabase import shows the move can be automated |

---

# Appendix C: Jobber’s feature pages, and the Hey Day equivalent

From getjobber.com, 13 September 2026. Headlines are near-verbatim, and some punctuation has been adapted. Every page follows the same template: a hero with a screenshot; four to eight sections, each a label, a benefit headline and a screenshot; a named testimonial; related features; then “Start Free Trial” with “No credit card required”. Use this list page by page when designing Hey Day’s feature pages.

| Jobber page | Headline | What it covers | Hey Day equivalent |
|---|---|---|---|
| Quotes (/features/quotes/) | “Job quoting software that wins you more work” | Quick quotes, markups, optional line items, financing, automatic follow-ups, customer signature, a supplier catalogue | Instant quotes per guest and hour, packages and add-ons, interactive repricing, proposal and deposit in one step |
| Online booking (/features/online-booking/) | “An online booking system that fills your schedule with less effort” | Bookable services, automatic team assignment, schedule control, drive-time limits | Instant booking by the owner’s rules, class seats and capacity |
| Client Hub (/features/client-hub/) | “A convenient online client portal that keeps work moving forward” | Requests, quote approval, visit prep, payments, deposits, tips, referrals | A customer portal to plan the event |
| Sales pipeline (/features/sales-pipeline-software/) | “Close more jobs with Jobber’s sales pipeline software” | Stages, stalled-lead alerts, lead owners, lost-lead insights | Lead labels (hot, urgent, high value, easy, off-peak) and a ranked list |
| CRM (/features/field-service-crm/) | “A field service CRM that helps you wow customers at every stage” | Client profiles, job history, communication history, tags | Customer records with every message and booking |
| AI Receptionist (/features/ai-receptionist/) | “The best AI answering service in blue collar” | Answers calls and texts, reschedules, takes messages as tasks, transfers calls | AI receptionist, plus the one inbox including WhatsApp |
| Scheduling (/features/scheduling/) | “A smart scheduling software that keeps you one step ahead” | Fast scheduling, crew assignment, less driving, team updates, recurring jobs | Event diary, shift offers, clash and travel checks, recurring agreements |
| Dispatch (/features/service-dispatch-software/) | “Service dispatch software that frees up your time” | Requests, calendar, job details, GPS, visit reminders, on-my-way texts | Crew briefing notes, day-of reminders, check-in |
| Route optimisation (/features/route-optimization/) | “Service routing software for a more productive schedule” | Team routes, multi-day routing, start and end points | Travel times; multi-stop days for rental and delivery crews |
| Jobs (/features/jobs/) | “Job management software that makes your workday run smoothly” | Customer prep, job details, time, team location, follow-ups | The event job sheet |
| Work orders (/features/work-order-management-software/) | “Get the job done right, every time” | Setting the team up, updates, keeping jobs moving, keeping customers informed, margins | Run sheets and the event record |
| Checklists and forms (/features/job-forms/) | “Mobile service checklists to get jobs done right in the field” | Job checklists, inspection and authorisation forms | Pre-event checks, packing and kit lists, waivers and customer forms |
| Team management (/features/team-management/) | “Keep your teams in sync and on track” | Permissions, GPS, time tracking, location timers, checklists, notifications, payroll, performance | Roles, employees and subcontractors, tiers, engagement watch, payouts |
| Time tracking (/features/automatic-time-tracking-software/) | “Service tracking software for easier payroll and job costing” | Field hours, location timers, payroll sync, job costing | Check-in and check-out, and hours for employees |
| GPS (/features/gps-tracking-app/) | “Employee GPS tracking software to schedule jobs on the go” | GPS waypoints, vehicle tracking | Optional: arrival confirmation at the venue |
| Mobile app (/features/field-service-management-app/) | “Easily run your business – even from your truck” | Monitor, schedule, complete visits, quote and invoice, communicate | Owner app and crew app |
| Invoicing (/features/field-service-invoicing-software/) | “Field service invoicing software that speeds up your cash flow” | Instant invoices, knowing when to invoice, batch invoicing, stopping the chasing | Pro forma and final invoices, overdue chasing by email and WhatsApp |
| Payments (/features/field-service-credit-card-processing/) | “Online payments software that gets you paid 4x faster” | Online payments, automatic charging, Tap to Pay, instant payouts, tips | Deposits and balances, pay-by-bank, QR and tap tips shared by the crew |
| Consumer financing (/features/consumer-financing/) | “Paperless consumer financing that helps you win bigger jobs” | Pay over time through a finance partner | Payment plans and instalments |
| Jobber Capital (/features/jobber-capital/) | “Unlock funding to keep growing” | Business loans for Jobber Payments users | Later, if at all |
| Marketing tools (/features/marketing-tools/) | “Win new customers, earn repeat work, and build your brand.” | An AI marketing plan, Google presence, job showcases, staying in touch, referrals; “Nothing goes out until you approve it” | After-care and marketing, with AI drafts the owner approves |
| Campaigns (/features/marketing-tools/campaigns/) | “Email campaigns that turn past customers into booked jobs” | Templates, segments, automation, reporting | Win-back, anniversary and seasonal campaigns; off-peak offers |
| Referrals (/features/marketing-tools/referrals/) | “Build a referral program for your service business” | Automatic credits and discounts | A referral code after a thumbs up, rewarding both sides |
| Reviews (/features/marketing-tools/reviews/) | “Get more five-star reviews without the awkward ask” | Automatic requests, AI reply suggestions, competitor comparison | A review ask after the referral; a “how can we improve?” questionnaire after a thumbs down |
| Websites (/features/marketing-tools/website/) | “Launch a professional home services website” | A do-it-yourself site with search optimisation, request forms, a custom domain | A booking page or mini site with the instant quote built in |
| Dashboard (/features/dashboard/) | “Track your service business on one easy dashboard” | Jobs, appointments, payments, insights | The Command Centre |
| Reporting (/features/field-service-reporting/) | “Financial management and reporting tools for field service teams” | Reports, expenses, payouts, accounts sync | Reports in plain English, a morning report, profit per channel |
| Job costing (/features/job-costing-software/) | “Job costing software that makes profitability tracking easy” | Profit per job, materials, labour, expenses | Margin on every quote and profit per event |
| QuickBooks sync (/features/quickbooks-sync/) | (not captured) | One-way sync of clients, invoices, payments, tips, payouts | Accounts sync (QuickBooks and Xero) |
| Automations (/features/automate-repetitive-tasks/) | “Field service automation for contractors and service businesses” | Review requests, follow-ups, automatic payments, a custom automation builder, AI quote drafting | The settings studio and autoresponders |
| Customer messaging (/features/customer-communication-management/) | “Automated client communication software that keeps clients informed” | Templates, follow-ups, reminders, on-my-way texts, two-way SMS | The one inbox, with automated messages by email, WhatsApp and text |
| Jobber AI (/features/ai/) | “Powerful AI Tools for Field Service Businesses” | Automations, Rewrite, Receptionist, Voice, Recommendations | AI replies, AI setup assistant, AI coach, AI receptionist, AI control panel |
| Chemical tracking (/features/chemical-tracking/) | “Chemical tracking software for in-depth record keeping” | Pesticide records | Not relevant; the nearest is allergy and licence records |
