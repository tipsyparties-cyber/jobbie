# Hey Day marketplace: website brief for Claude Code

**Prepared for:** Claude Code, to design and build the Hey Day marketplace, the customer-facing site where people find and book experiences, and hosts join.
**Prepared by:** Jem, with Claude, 13 September 2026. Russell to review.
**Status:** exploration. Policies marked “to decide” are open (section 12).
**Companion brief** in the same folder: `HEYDAY-SAAS-WEBSITE-BRIEF.md` (the software hosts run their business on).

---

## 0. How to use this brief

- **Start from Jem’s homepage design:** https://claude.ai/code/artifact/5384682b-c265-4ffd-9ee4-c3cb2ded4432. It sets the direction, structure, voice and look. Build on it rather than replacing it; section 2 describes it in detail.
- **Never invent reviews, host names, numbers or prices.** The design already does this well: its review slots say “Hey Day is new, so this space is being kept for real words from real customers. Nothing here is a review yet.” Keep that honesty everywhere. Use clearly marked placeholders such as `[HOST PHOTO]` or `[PRICE TBC]`.
- **Only promise what will work at launch.** Section 11 shows what already exists in the Tipsy system and what must be built.
- **Voice:** match the homepage. Warm, witty, British, human, specific (“Two hours, one wheel, one wonky bowl.”). The name is written **Hey Day**, and the tagline is “Make your day a Hey Day.”

---

## 1. What the marketplace is

**The line from the design:** “Find something brilliant to do. Experiences to go out and find, and hosts who will bring the whole thing to you.”

- **Two places:**
  - **At yours:** the host comes to you, at home, at a holiday rental, at the office, or at a venue you’ve booked.
  - **At theirs:** you go to them, at studios, kitchens, workshops and specialist venues.
  - **Online** is a third option.
- **Four ways to book:**
  - **Tickets:** a place on a session that’s already running.
  - **Private experiences:** the whole thing for your own group.
  - **Gifts:** a specific experience, a Hey Day voucher, or a gift set.
  - **Online:** join from anywhere.
- **Seven categories:** Make & Create, Food & Drink, Games & Entertainment, Wellness, Outdoors & Adventure, Music & Dance, Culture & Discovery.
- **Two sides:**
  - **Customers** find and book.
  - **Hosts** list and deliver. They’re makers, cooks, teachers, performers and guides, from individuals working out of a spare room to established studios.
- **The advantage:** every host runs their business on Hey Day’s own software (the SaaS brief). That means listings can show **real prices and live availability**, including for “at yours” experiences priced by group size and distance, which most marketplaces can’t.

---

## 2. What Jem’s homepage already sets (the starting point)

**Sections, in order:**

1. **Header:** logo, then navigation: At yours · At theirs · Online · Gifts · Become a host · Log in · Find experiences.
2. **Hero:** H1 “Find something brilliant to do”.
   - A search bar with a category picker, and an At yours / At theirs / Either toggle.
   - A scrolling strip of activities (Pottery, Cocktails, Cooking, Painting, Floristry, Photography, Baking, Kayaking, Dance, Wellness, Music, Printmaking, Perfume Making, Pasta Making, Games, Culture).
   - Art direction: “people genuinely mid-experience… not posing”.
3. **“More doing. Less scrolling.”** A short manifesto and “Explore experiences →”.
4. **Seven category sections** (Category 01 to 07), each with its own paragraph and “Explore experiences →”.
5. **“Your place or theirs?”** Explains At yours and At theirs.
6. **“Lots of ways to experience”:** Tickets, Private experiences, Gifts, Online.
7. **“What people are saying”:** honest placeholders.
8. **About Hey Day:** “A world of interesting things to actually do”, ending “Make your day a Hey Day.”
9. **About us:** What we do (with a “How Hey Day works” link) and Who we are (with “Learn more about us”).
10. **“Good things are made by good people”:** four example host cards, each with a role, a place tag (At yours or At theirs) and a one-line story. Then “Become a Hey Day host →”.
11. **“Have a nose around”:** nine example experiences with one-liners (“Learn three, drink three.” / “Flour everywhere. Worth it.”), then “Start searching”.
12. **“Follow along”:** a social feed.
13. **“Join the Hey Day collective”:** an email sign-up with first name, last name, email and optional location.
14. **Final call to action,** then a footer with four columns:
    - **Explore:** All experiences, At yours, At theirs, Online, Gifts, Categories
    - **Hey Day:** About, Inspiration, Meet the makers, Become a host, Careers
    - **Help:** Contact, FAQs, Booking help, Terms, Privacy
    - **Stay connected:** newsletter sign-up

**The look**
- **Display fonts:** Anton, Bowlby One and Big Shoulders Display.
- **Body fonts:** Quicksand and Hanken Grotesk.
- **Palette:** a warm cream background (#EDE6D8), dark ink (#2E2A20), a strong blue (#1F5FDC), a red-orange (#C63A18 / #EF4E2A) and a butter yellow (#F4E08C).
- **Imagery:** placeholder slots written as art direction (for example “A finished handmade mug, still on the wheel”). Keep that approach until real photography exists.

**Pages the homepage links to that need building:** search results, category pages, At yours, At theirs, Online, Gifts, How Hey Day works, About, Meet the makers, Inspiration, Become a host, Log in, Careers, Contact, FAQs, Booking help, Terms and Privacy.

---

## 3. Who it serves

**Customers** book for occasions and needs such as:
- date ideas and something to do this week
- birthdays, and hen and stag dos
- team socials, away days and Christmas parties
- visitors, and people on holiday or in a holiday rental
- gifts for “people who have enough stuff already”
- learning a new skill

Their words (from the research): per person, private group, “something to do this week”, “team socials, away days and celebrations”, gift card, book now, request a quote.

**Hosts:**
- makers and artists
- cooks, private chefs and supper clubs
- bartenders and mixologists
- florists and photographers
- performers and entertainers
- guides and storytellers
- wellness teachers
- team-building providers

Many sell a skill two ways: as a service at someone’s event, and as an experience or class. Their words: host, teacher, maker, “get paid to do what you love”, “turn your passion into profit”, bookings, payouts, commission.

---

## 4. How the market works today (research, 13 September 2026)

Quotes are near-verbatim; spot-check before reuse.

| Platform | What customers get | What hosts pay | Who owns the customer |
|---|---|---|---|
| **Airbnb Experiences** | Hosted experiences per guest or per group (for example a pizza class at $129 per guest, up to 6), with reviews and messaging | **20%** fee, paid the day after. Needs 5 years’ experience, and hosts are charged 20% if they cancel | Airbnb. Bookings off the platform are banned, and so is marketing without express consent |
| **Airbnb Services** | People who come to you (chefs, photographers, make-up, massage): priced packages with minimums, and “pricing upon request” | **15%** (at least $6) | Airbnb |
| **ClassBento** (Australia, UK, US; owns Obby) | Creative classes, team activities, experience gifts, online classes with kits | **20%** on marketplace bookings; **3.9% + £0.25** through its widget on the host’s own site | Not stated |
| **Obby** (UK) | Classes at £30 to £80 per person, team-building | **12.5 to 17.5%**; **0%** on bookings from the teacher’s own site | Obby. Details may be used only to fulfil the order |
| **Yuup** (UK cities) | Local experiences per person or per group (“£480 for 10, then £40 per extra guest”), a teams hub, gift cards | Commission agreed privately; **5%** on direct bookings within 24 hours. Needs £5M public liability | The host is the data controller, but Yuup’s time slots are for Yuup bookers only |
| **Togather** (UK) | One enquiry matched to suppliers; quotes “From £35 per guest”; money held until after the event; deposits from 10%; a replacement guarantee | About **15%**. 1 in 20 accepted, with insurance, hygiene and alcohol licences required. Up to 15 suppliers per enquiry | Togather. No moving repeat bookings off the platform, ever |
| **Batch** (US group parties) | Group planning (polls, shared itinerary, cost splitting); 5,000 experiences | **Zero commission**, a flat monthly fee | The supplier: “you own the booking, the data, and the relationship” |
| **Classpop!** (US) | Private classes and team-building “From $35 / person”, gift cards | Not published | Classpop |
| **FareHarbor, Peek, Bookwhen** | Booking tools for tickets and sessions, not marketplaces | FareHarbor charges customers up to 6%; Bookwhen is free to $59 a month | The business |

**What customers value (copy these):**
- vetting they can see, and reviews with counts
- clear per-person or per-group prices, minimum spends, and places left
- a seat held while checking out
- simple cancellation rules
- money held until after the event, deposit plans, and a replacement guarantee
- gift cards and team or Christmas hubs
- quick replies from hosts

**What frustrates hosts (avoid these):**
- commission with no end date, on customers they’ve already won
- being barred from contacting customers before confirmation, and from repeat business
- hidden fee rates
- enquiries sent to 15 suppliers at once
- custom requests kept by the platform

---

## 5. Where Hey Day can be better

1. **Real prices and live availability** for both at-theirs sessions and at-yours bookings, because every host runs on Hey Day software. At-yours prices are worked out from group size, hours and distance, where other sites show “pricing upon request”.
2. **Tickets, private groups and bespoke requests in one place.** Custom requests go straight to the host, not to a platform inbox.
3. **Fair to hosts:** a published fee, little or nothing on customers the host brings, and no endless lock-in (to decide, section 12).
4. **Better matching:** each enquiry goes to a few well-matched hosts, not fifteen.
5. **Gifts done well:** simple to buy and redeem, with no penalty fees on unspent balances.
6. **Honest reviews,** including reviews from hosts’ direct bookings, clearly labelled.
7. **Recommendations and cross-promotion, with consent:** “You loved the pottery. Try printmaking next.”
8. **Every event is a shop window.** Guests at an at-yours experience can scan a QR code (on the menu, the tip jar or the photo gallery) to follow the host or book their own.

---

## 6. The customer journey

What customers do at each step, and what Hey Day does. Status: *Built* means it exists in the Tipsy system for one business; *To build* is new.

1. **Discover:** homepage, categories, inspiration, social, email. Profit-based ad tracking and ad audiences are *Built*.
2. **Search and filter:** by category, at yours / at theirs / online, date, group size, price, area, and a map. *To build*.
3. **Experience page:** see section 8. Quote engines are *Built* (Tipsy); multi-host listings are *To build*.
4. **Choose:**
   - a ticket (*To build*)
   - a private booking with an instant price (*Built* for Tipsy)
   - a request for a bespoke quote (the office quote tool is *Built*)
5. **Book and pay:**
   - deposit or full payment, Apple and Google Pay, pay-by-bank: *Built*
   - gift vouchers and payment plans: *To build*
   - paying out to many hosts through Stripe Connect: *To build*
6. **Manage the booking:** a customer portal for guest numbers, add-ons, dietary needs and allergies, share links with the group, and messages. Most is *Built* for Tipsy; the allergy field is planned.
7. **Before the day:** reminders, what to bring, travel, and a “booking tomorrow” email. *Built*.
8. **The day:** host check-in, and QR tips shared across the crew. *Built*.
9. **Afterwards:**
   - feedback the next day: *Built*
   - thumbs up leads to a referral code, then a review ask: *To build*
   - thumbs down leads to “how can we improve?” and the complaint loop, with a manager signing off: partly *Built*
   - recommendations and remarketing, with consent: *To build*

---

## 7. The host journey

1. **Discover Hey Day:** the “Become a host” page, word of mouth, host communities.
2. **Apply and get approved:** vetting by category. Everyone needs identity, experience and insurance. Food and drink hosts also need a food hygiene certificate and, where alcohol is served, a licence. Children’s activities may need background checks. *Tipsy has ID and right-to-work checks built.*
3. **Set up on Hey Day software:** listings, prices, packages, tickets and capacity, at-yours travel area, availability, cancellation policy, team and payouts.
4. **Go live and get bookings:** from the marketplace, their own Hey Day booking page, and other platforms brought into one diary.
5. **Deliver:** the team, kit, travel, check-in and tips.
6. **Get paid:** payouts on a clear schedule, with fees shown per booking.
7. **Grow:** reviews, repeat customers (their own), referrals, and upgrading their software plan.

---

## 8. Page plan

**Customer side**
- **Home:** Jem’s design.
- **Search results:**
  - filters for category, place (at yours, at theirs, online), date, group size, price and area
  - map and list views
  - sort by recommended, soonest, price or rating
  - cards showing photo, title, host, place tag, price per person or per group, rating and places left
- **Category pages** (7) and **activity pages** (pottery, cocktails and so on). Each has the category story from the homepage, a filtered list, top hosts and an FAQ.
- **Area pages,** for example “Cocktail classes in Bristol”. These matter for search.
- **Experience page:**
  - title, photos, and the host’s story in their own words
  - what you’ll do (a short itinerary), what’s included, duration
  - group size and places left
  - price per person or per group, the minimum spend and the price per extra guest
  - at yours or at theirs, and the travel area for at-yours
  - dates and times, or “request a quote”
  - age, accessibility, what to bring, cancellation terms
  - reviews, the host profile, similar experiences
  - “Give this as a gift”, and a sticky booking box
- **Host profile:** story, photos, all their experiences, reviews and response time.
- **Private and group bookings, and a Teams hub:** team socials, away days, Christmas parties, invoicing for companies.
- **Gifts:** vouchers, gifts of a specific experience, gift sets, a balance checker, and how to redeem.
- **Online experiences.**
- **Explainers:** How Hey Day works (for customers), and Trust and safety (vetting, secure payments, review rules, insurance).
- **Editorial:** Inspiration (the “things you might not have thought of” idea as a blog), and Meet the makers.
- **Help and company:** Help and FAQs, Booking help, Contact, About, Careers, Terms, Privacy.
- **Customer account:** bookings, manage booking, messages, saved experiences, gift balances.

**Host side (marketing)**
- **Become a host:**
  - why Hey Day: fair fees, keep your customers, real tools
  - how it works, fees, standards, host stories, and “Apply”
- **Host fees:** published plainly (the model is to decide, section 12).
- **Host standards and vetting**, by category.
- **Host resources:** pricing an experience, photography tips, writing a listing.
- **A link to the Hey Day host software site** (the SaaS brief) for running the whole business.

---

## 9. Experience page examples from the research (for reference)

- **Airbnb pizza class:** host story (“Retired TV cameraman turned pizzaiolo”), itinerary, $129 per guest, up to 6, about 3 hours, at the host’s home, a 3-day cancellation window, age 14 and up, “Show dates” and “Message” buttons.
- **Airbnb Services chef:** packages at $100 / $150 / $250 per guest with minimums, “Custom Menu: Pricing upon request”, provided at your home.
- **Yuup team pottery:** £480 for a group of 10, then £40 per extra guest, up to 40, at the studio or “onsite at workplace”, with custom dates sent to Yuup.
- **Yuup wreath workshop:** £50 per adult, 2 hours, “20 places remaining”, and a “This is a gift” option.
- **Togather mobile bar:** “From £35 per guest”, with only a “Request a quote” button, and protections listed (money held until after the event, deposits from 10%, a replacement guarantee).

---

## 10. How the marketplace makes money (options; to decide)

- **Commission on bookings the marketplace brings,** published plainly. The benchmarks are Togather at about 15%, Obby at 12.5 to 17.5%, and Airbnb and ClassBento at 15 to 20%.
- **0% or little on customers the host brings themselves** (Obby, the ClassBento widget, Yuup’s direct rate).
- **The alternative:** a flat monthly fee with no commission (Batch).
- **Possibly a small customer booking fee:** say plainly who pays what.
- **Gift voucher breakage and corporate invoicing:** check the rules first (see section 12).
- **The host software subscription** (the SaaS brief) is separate, and the two can be bundled.

---

## 11. What already exists in the Tipsy system

The machinery a marketplace needs is running inside Tipsy, between customers and freelance bartenders. It needs extending to many hosts.

| Marketplace need | At Tipsy today | Status |
|---|---|---|
| Instant prices by group size, hours and distance | The Tipsy quote engine | Built, needs generalising |
| Checking a host can do the date before confirming | The pre-booking availability check | Built |
| Matching a job to nearby, available, well-rated people | The shift filler | Built |
| Hidden phone numbers and a log of every conversation, with AI flags on off-platform attempts | Masked numbers and the Call masking page | Built |
| Taking payment and paying out | Stripe and Wise, for one business | Built; Stripe Connect for many hosts to build |
| Ratings after every booking, and pay held on complaints | Feedback and the complaint flow | Built |
| Tips at the event | The QR tip jar | Built |
| Tickets, capacity, waiting lists | None | To build |
| Gift vouchers, a referral-then-review flow, loyalty, memberships | None | To build |
| Search, categories, area pages, host profiles | None | To build |
| Many hosts in one system, with separate data | Not yet (the biggest platform job) | To build |

---

## 12. Policies to decide (Jem and Russell)

1. **Fees:**
   - commission, flat fee or both?
   - what rate, and does it apply only to the first booking the marketplace brings?
   - does it ever expire?
2. **Customer ownership and marketing:**
   - when do hosts get customer contact details?
   - can hosts market to marketplace customers, with consent?
   - may Hey Day recommend other hosts to a host’s customers? Only complementary ones, and with a referral share?
3. **Money held until after the event,** and replacement guarantees. Holding customers’ money can bring extra rules, so check the payments set-up.
4. **Gift vouchers:** expiry, and fees on unspent balances. Rules differ by country; for example, US federal law sets minimum validity periods for gift cards.
5. **Vetting standards by category:** insurance levels, food hygiene, alcohol licences, background checks for children’s activities.
6. **Default cancellation terms,** and who covers a host cancelling.
7. **Review rules:** do reviews from direct bookings count, how disputes are handled, response-time standards.
8. **Launch market and first city.** The design reads British; the SaaS leans towards the US first.
9. **Launch order:** software first then the marketplace, or both together?

---

## 13. Getting started (suggestions)

- **Seed supply from the software:** every host on Hey Day software can switch on a marketplace listing.
- **Tipsy as the first host:** cocktail classes at theirs and bar hire at yours, with real availability.
- **Start with one city and a few categories** with strong supply. Food & Drink and Make & Create fit Tipsy’s network.
- **Grow the Hey Day Collective email list** before launch, to have customers on day one.
- **Launch the Teams hub** ahead of the Christmas party season.
