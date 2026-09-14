import { TBC } from "@/lib/site";

/* ==================================================================== *
 *  The comparison pages — template T9, spec part 4, and the working
 *  pages at reference/site/compare.html and compare-honeybook.html.
 *
 *  THESE PAGES MAKE CLAIMS ABOUT NAMED COMPETITORS, which makes them the
 *  riskiest content on the site. Three rules are built into the shape of
 *  the data rather than left to whoever writes the next one:
 *
 *  1. **Every page carries the date it was checked**, and the date is a
 *     field, not a sentence someone might forget to update. The brief is
 *     explicit that `research/` is a starting point from 13 September
 *     2026 and not a source to quote from — so every fact here is marked
 *     with when it was read, and the pages say to check again before
 *     publishing.
 *
 *  2. **Anything not in the pack is `[check on the day]`**, never a
 *     guess. A wrong statement about a rival's product is worse than no
 *     statement: it is the one thing on this site that could be both
 *     unfair and actionable. Where the research says "not stated", the
 *     page says "not stated" — which is a fact about their marketing,
 *     not a claim about their product.
 *
 *  3. **Every page says where the rival is better**, in its own section,
 *     and for the older products that section is longer than ours. It has
 *     to be: they are shipping and Heyday is not, and a comparison page
 *     that cannot name a single advantage of a mature competitor is one
 *     no reader will believe.
 *
 *  Heyday's own column says "Coming soon" throughout, because it is.
 * ==================================================================== */

/** The date the pack's research was taken. Every fact traces to this. */
export const CHECKED = "13 September 2026";

export type Rival = {
  slug: string;
  /** The rival's name. Never their logo — the brief forbids that until
   *  Jem confirms it is allowed. */
  name: string;
  /** The hub card's two lines. */
  chooseThem: string;
  chooseUs: string;
  /** The page's H1 and its highlight. */
  headline: string;
  highlight: string;
  intro: string;
  /** The at-a-glance table. `them` is what their own pages said on the
   *  date above; `us` is ours. */
  glance: { row: string; them: string; us: string }[];
  /** Feature by feature, by group. */
  matrix: { group: string; rows: { feature: string; them: string; us: string }[] }[];
  /** Where they are better. Honest, and first-person plain. */
  betterHeading: string;
  better: string[];
  /** Where Heyday differs. All coming soon. */
  differentHeading: string;
  different: string[];
  faq: { q: string; a: string }[];
};

/** The four switching steps. The same on every comparison page. */
export const SWITCHING_STEPS = [
  {
    title: "Bring your clients and bookings",
    body: `Bring them with you. ${TBC.importMethod}`,
  },
  {
    title: "Let the AI suggest",
    body: "Your prices, packages and messages. Coming soon.",
  },
  { title: "Connect", body: "Your calendar and payments." },
  {
    title: "Go live",
    body: `With a real person on hand. ${TBC.supportHours}`,
  },
];

const SOON = "Coming soon";

export const RIVALS: Rival[] = [
  {
    slug: "honeybook",
    name: "HoneyBook",
    chooseThem:
      "Choose HoneyBook if you want a proven client and proposal tool today.",
    chooseUs:
      "Choose Heyday if you also run a team who deliver, or sell classes as well as services.",
    headline:
      "Heyday vs HoneyBook: the whole workflow, not just the paperwork.",
    highlight: "not just the paperwork",
    intro:
      "HoneyBook is a proven tool for managing clients, proposals and payments. Heyday is built for businesses that also run a team who deliver, and sell classes as well as services. Heyday is coming soon.",
    glance: [
      {
        row: "Built for",
        them: "“Anyone with clients”: creatives, planners, photographers, venues",
        us: "Event, entertainment, activity, class and service businesses, from one person to a team",
      },
      {
        row: "Plans (US)",
        them: "Starter $29, Essentials $49, Premium $109 a month billed yearly ($36, $59, $129 monthly)",
        us: TBC.price,
      },
      { row: "Trial", them: "30 days, no card", us: `Early access ${TBC.trial}` },
      { row: "Guarantee", them: "60-day money-back guarantee", us: TBC.confirm },
      {
        row: "Card fees",
        them: `2.9% + 25¢ on its comparison table; “from 2.7% + 10¢” is its Tap to Pay rate ${TBC.checkOnTheDay}`,
        us: TBC.generic,
      },
      { row: "Available", them: "Today", us: SOON },
    ],
    matrix: [
      {
        group: "Get ahead",
        rows: [
          {
            feature: "Help moving from your old tool",
            them: "Yes: free file setup and account migration",
            us: SOON,
          },
          {
            feature: "AI that sets things up for you",
            them: "Partly: an AI automations builder on Essentials and Premium",
            us: "Coming soon: an AI setup assistant that reads your website, prices and emails",
          },
        ],
      },
      {
        group: "Get found",
        rows: [
          {
            feature: "Lead and booking forms",
            them: "Yes: lead forms and embeddable contact forms",
            us: "Coming soon: a booking page with the instant quote built in",
          },
          {
            feature: "A marketplace listing",
            them: `Not stated as a listing tied to live prices ${TBC.checkOnTheDay}`,
            us: "Coming soon: the Heyday marketplace, with real prices and live availability",
          },
          {
            feature: "Ad tracking",
            them: "Listed integrations with Google Ads and Facebook Conversions",
            us: "Coming soon: real booking value sent back to your ads",
          },
        ],
      },
      {
        group: "Win the client",
        rows: [
          {
            feature: "Prices worked out by guests, hours, travel and date",
            them: `Partly: packages and add-ons; no per-guest calculation stated ${TBC.checkOnTheDay}`,
            us: "Coming soon: instant quotes the customer can adjust",
          },
          {
            feature: "Proposal, contract and deposit in one step",
            them: "Yes",
            us: SOON,
          },
          {
            feature: "Automated follow-ups",
            them: "Yes: automations on Essentials and Premium, plus AI follow-up suggestions",
            us: "Coming soon: follow-ups that change with the lead",
          },
          {
            feature: "One inbox including WhatsApp",
            them: "Partly: email, plus texts and calls through the Business Phone add-on (US); WhatsApp not stated",
            us: "Coming soon: email, WhatsApp, texts and calls in one thread",
          },
          {
            feature: "Classes with tickets and capacity",
            them: "Partly: mini sessions and a scheduler; ticketed classes not stated",
            us: "Coming soon: classes, tickets and private groups",
          },
        ],
      },
      {
        group: "Run the day",
        rows: [
          { feature: "Client portal", them: "Yes", us: SOON },
          {
            feature: "Scheduling and calendar sync",
            them: "Yes, including round-robin for team meetings",
            us: SOON,
          },
          {
            feature: "Shift offers to the people who deliver",
            them: "Not stated: team members are office users",
            us: SOON,
          },
          {
            feature: "Check-in on the day, kit and shopping lists",
            them: "Not stated",
            us: SOON,
          },
        ],
      },
      {
        group: "Get paid",
        rows: [
          { feature: "Deposits, payment plans, tips", them: "Yes", us: SOON },
          {
            feature: "Paying your team",
            them: "Not stated",
            us: "Coming soon: team pay, tips shared, payouts",
          },
          { feature: "Profit per job", them: "Yes: profits by project", us: SOON },
        ],
      },
      {
        group: "Get rebooked",
        rows: [
          {
            feature: "Review requests",
            them: "Partly: “gather and share testimonials”",
            us: "Coming soon: referral code first, then the review ask",
          },
          {
            feature: "Referral rewards for your customers",
            them: "Not stated: its referral scheme is for its own users",
            us: SOON,
          },
          { feature: "Gift vouchers", them: "Not stated", us: SOON },
        ],
      },
    ],
    betterHeading: "Where HoneyBook is better today.",
    better: [
      "It’s here now. HoneyBook is a mature product; Heyday is coming soon.",
      "A big template gallery, with kits for 17 industries and paid partner templates.",
      "About 40 integration pages, including QuickBooks, Zapier, Zoom, Calendly and Canva.",
      "Banking built in: HoneyBook Finance, with a business account, savings and loans for eligible US members.",
      "Trade extras: client galleries for photographers and floor plans for venues.",
    ],
    differentHeading: "Built for businesses with a team who deliver.",
    different: [
      "Shift offers, team pay and tips for the people on the job.",
      "Services and classes in one diary.",
      "Prices worked out per guest, hour, distance and date.",
      "WhatsApp in the same inbox, with AI drafts that know the booking.",
    ],
    faq: [
      {
        q: "Can I keep using HoneyBook while I try Heyday?",
        a: "Yes. Join early access and compare side by side.",
      },
      { q: "Will my templates come across?", a: TBC.generic },
      {
        q: "Does Heyday do proposals and contracts like HoneyBook?",
        a: "Yes, the proposal, contract and deposit happen in one step. Coming soon.",
      },
      {
        q: "When was this page checked?",
        a: `${CHECKED}, against HoneyBook’s own pages. [update on publishing]`,
      },
    ],
  },
  {
    slug: "jobber",
    name: "Jobber",
    chooseThem:
      "Choose Jobber for field service depth: routes, dispatch and job costing.",
    chooseUs:
      "Choose Heyday if you run events, classes or experiences, priced per guest and staffed by freelancers.",
    headline: "Heyday vs Jobber: built for events, not for routes.",
    highlight: "not for routes",
    intro:
      "Jobber is a mature field service tool for home services: routing, dispatch, job costing and a large add-on range. Heyday is built for businesses whose work is an event or a class, priced per guest and staffed by people who choose their own shifts. Heyday is coming soon.",
    glance: [
      {
        row: "Built for",
        them: "Home service trades: cleaning, landscaping, HVAC, plumbing, electrical",
        us: "Event, entertainment, activity, class and service businesses",
      },
      {
        row: "Plans (US)",
        them: "Core from $49/mo, Connect from $139/mo, Grow from $199/mo, Plus from $499/mo, by user count and billing term",
        us: TBC.price,
      },
      {
        row: "Add-ons",
        them: "Marketing Suite $99/mo, AI Receptionist $29/mo, Pipeline $49/mo on the pricing page. Its features index shows different figures for two of those — a conflict on its own site",
        us: TBC.price,
      },
      { row: "Trial", them: TBC.checkOnTheDay, us: `Early access ${TBC.trial}` },
      { row: "Card fees", them: TBC.checkOnTheDay, us: TBC.generic },
      { row: "Available", them: "Today", us: SOON },
    ],
    matrix: [
      {
        group: "Get ahead",
        rows: [
          {
            feature: "Setting up your prices and rules",
            them: "Products and services, with quote templates",
            us: "Coming soon: an AI setup assistant that reads your website, prices and emails",
          },
        ],
      },
      {
        group: "Get found",
        rows: [
          {
            feature: "A marketplace where customers find you",
            them: "Not stated as a consumer marketplace with live prices",
            us: "Coming soon: the Heyday marketplace",
          },
          {
            feature: "Campaigns and referrals",
            them: "Yes, as add-ons or in Marketing Suite; no standalone price published",
            us: SOON,
          },
        ],
      },
      {
        group: "Win the client",
        rows: [
          {
            feature: "Quotes",
            them: "Yes: quote templates with good, better, best options",
            us: "Coming soon: instant quotes the customer can adjust, priced per guest and hour",
          },
          {
            feature: "Classes and ticketed sessions",
            them: "Not stated: the model is jobs and visits",
            us: "Coming soon: classes, tickets and private groups",
          },
          {
            feature: "AI receptionist",
            them: "Yes, as an add-on",
            us: SOON,
          },
        ],
      },
      {
        group: "Run the day",
        rows: [
          {
            feature: "Routing and dispatch",
            them: "Yes, and it is one of their strengths",
            us: "Not planned: Heyday schedules events, not routes",
          },
          {
            feature: "Offering a shift and letting the first yes take it",
            them: "Not stated: work is assigned to employees",
            us: "Coming soon: shift offers ranked by distance, reliability and rating",
          },
          {
            feature: "Freelancers and subcontractors",
            them: TBC.checkOnTheDay,
            us: "Coming soon: offers, checks and pay for both",
          },
        ],
      },
      {
        group: "Get paid",
        rows: [
          { feature: "Invoicing and payments", them: "Yes", us: SOON },
          {
            feature: "Job costing",
            them: "Yes, and it is one of their strengths",
            us: "Coming soon: profit per job",
          },
          {
            feature: "Paying your team from the job",
            them: TBC.checkOnTheDay,
            us: "Coming soon: team pay, tips shared, payouts",
          },
        ],
      },
      {
        group: "Get rebooked",
        rows: [
          {
            feature: "Reviews",
            them: "Yes, as an add-on or in Marketing Suite",
            us: "Coming soon: referral code first, then the review ask",
          },
          { feature: "Gift vouchers", them: "Not stated", us: SOON },
        ],
      },
    ],
    betterHeading: "Where Jobber is better today.",
    better: [
      "It’s here now, and it is mature. Heyday is coming soon.",
      "Routing, dispatch and job costing for work that happens at many addresses in a day. Heyday does not do this and is not planning to.",
      "A large add-on range, and a long list of integrations.",
      "Depth in the home service trades, built over years, with training and a support organisation to match.",
    ],
    differentHeading: "Built for a job that happens once, with a crew.",
    different: [
      "Priced per guest, hour, distance and date, not per visit.",
      "Classes and tickets alongside services, in one diary.",
      "Shift offers to freelancers, with clash and travel checks.",
      "The aftercare: feedback, a referral code, then the review ask.",
    ],
    faq: [
      {
        q: "Is Heyday a Jobber replacement for a cleaning company?",
        a: "If your work is routed visits, Jobber is the better fit today and we would say so. Heyday is built for work that is an event or a class.",
      },
      {
        q: "Does Heyday do routing?",
        a: "No, and it is not planned. Heyday checks travel time between bookings, which is a different job.",
      },
      {
        q: "When was this page checked?",
        a: `${CHECKED}, against Jobber’s own pages. [update on publishing]`,
      },
    ],
  },
  {
    slug: "check-cherry",
    name: "Check Cherry",
    chooseThem:
      "Choose Check Cherry for event booking built around your trade today.",
    chooseUs:
      "Choose Heyday if you want the team’s pay, classes and the aftercare in the same place.",
    headline: "Heyday vs Check Cherry: past the booking, into the day.",
    highlight: "into the day",
    intro:
      "Check Cherry is built for event businesses — photo booths, photographers, entertainers — and covers the booking well. Heyday covers the same ground and then keeps going: the team who deliver the job, their shifts and their pay, classes alongside services, and the aftercare. Heyday is coming soon.",
    glance: [
      {
        row: "Built for",
        them: `Event businesses: photo booths, photographers, entertainers ${TBC.checkOnTheDay}`,
        us: "The same, plus classes, staffing and the team who deliver",
      },
      { row: "Plans (US)", them: TBC.checkOnTheDay, us: TBC.price },
      { row: "Trial", them: TBC.checkOnTheDay, us: `Early access ${TBC.trial}` },
      { row: "Card fees", them: TBC.checkOnTheDay, us: TBC.generic },
      { row: "Available", them: "Today", us: SOON },
    ],
    matrix: [
      {
        group: "Win the client",
        rows: [
          {
            feature: "Online booking with a deposit",
            them: `Yes ${TBC.checkOnTheDay}`,
            us: SOON,
          },
          {
            feature: "Classes and ticketed sessions",
            them: TBC.checkOnTheDay,
            us: "Coming soon: classes, tickets and private groups",
          },
        ],
      },
      {
        group: "Run the day",
        rows: [
          {
            feature: "Offering shifts to the people who deliver",
            them: TBC.checkOnTheDay,
            us: "Coming soon: shift offers, clash and travel checks",
          },
          {
            feature: "One inbox including WhatsApp",
            them: TBC.checkOnTheDay,
            us: SOON,
          },
        ],
      },
      {
        group: "Get paid",
        rows: [
          {
            feature: "Paying your team from the job",
            them: TBC.checkOnTheDay,
            us: "Coming soon: team pay, tips shared, payouts",
          },
        ],
      },
      {
        group: "Get rebooked",
        rows: [
          {
            feature: "Referral code before the review ask",
            them: TBC.checkOnTheDay,
            us: SOON,
          },
        ],
      },
    ],
    betterHeading: "Where Check Cherry is better today.",
    better: [
      "It’s here now. Heyday is coming soon.",
      "Built specifically around event trades, with the templates and defaults that come from years of serving them.",
      "The rest of this section is deliberately short because we have not audited Check Cherry properly yet. We will not list a rival’s weaknesses we have not checked. [check on the day]",
    ],
    differentHeading: "The parts after the booking.",
    different: [
      "Shift offers, team pay and tips for the people on the job.",
      "Classes and services in one diary.",
      "The aftercare: feedback, a referral code, then the review ask.",
    ],
    faq: [
      {
        q: "When was this page checked?",
        a: `${CHECKED}. Much of this page is still marked ${TBC.checkOnTheDay} because we have not audited Check Cherry in the depth we audited HoneyBook and Jobber. [complete before publishing]`,
      },
    ],
  },
  {
    slug: "flashquotes",
    name: "Flashquotes",
    chooseThem:
      "Choose Flashquotes for fast quotes for mobile businesses, with a free plan.",
    chooseUs:
      "Choose Heyday if you want the whole workflow after the quote, from staffing to rebooking.",
    headline: "Heyday vs Flashquotes: the quote is the first step, not the last.",
    highlight: "not the last",
    intro:
      "Flashquotes does one thing and does it fast: an instant quote for mobile businesses, with a free plan. Heyday does that too, and then everything after it — the booking, the team, the day, the payment and the rebooking. Heyday is coming soon.",
    glance: [
      {
        row: "Built for",
        them: "Mobile bars, coffee carts, photo booths and DJs",
        us: "The same, plus classes, staffing and the whole workflow after the quote",
      },
      {
        row: "Plans (US)",
        them: `A free plan is offered ${TBC.checkOnTheDay}`,
        us: TBC.price,
      },
      { row: "Trial", them: TBC.checkOnTheDay, us: `Early access ${TBC.trial}` },
      { row: "Available", them: "Today", us: SOON },
    ],
    matrix: [
      {
        group: "Win the client",
        rows: [
          {
            feature: "Instant quotes",
            them: "Yes, and it is what they are for",
            us: "Coming soon: instant quotes the customer can adjust",
          },
          {
            feature: "Follow-ups that stop when they reply",
            them: TBC.checkOnTheDay,
            us: SOON,
          },
        ],
      },
      {
        group: "Run the day",
        rows: [
          {
            feature: "Staffing the job",
            them: "Not what the product is for",
            us: "Coming soon: shift offers, clash and travel checks",
          },
          { feature: "One inbox", them: TBC.checkOnTheDay, us: SOON },
        ],
      },
      {
        group: "Get paid",
        rows: [
          {
            feature: "Deposits and balances",
            them: TBC.checkOnTheDay,
            us: SOON,
          },
          {
            feature: "Paying your team",
            them: "Not what the product is for",
            us: SOON,
          },
        ],
      },
      {
        group: "Get rebooked",
        rows: [
          { feature: "Reviews and referrals", them: TBC.checkOnTheDay, us: SOON },
        ],
      },
    ],
    betterHeading: "Where Flashquotes is better today.",
    better: [
      "It’s here now, it is free to start, and it is focused. Heyday is coming soon.",
      "If all you need is a fast quote, a tool that only does that is simpler than one that does twelve things.",
      "Their published booking data is the source of one of the statistics on this site, which we credit to them by name rather than passing it off as our own.",
    ],
    differentHeading: "Everything after the quote.",
    different: [
      "The booking, with the deposit and signed terms in the same step.",
      "The team who deliver it, their shifts and their pay.",
      "The day itself, and the payment.",
      "The aftercare, and the next booking.",
    ],
    faq: [
      {
        q: "You quote a Flashquotes statistic on this site. Isn’t that odd?",
        a: "It is their data and we say so every time we use it, including that they are a direct rival. It is the best evidence published for how much reply speed matters, and pretending otherwise would be worse than crediting them.",
      },
      {
        q: "When was this page checked?",
        a: `${CHECKED}. [update on publishing]`,
      },
    ],
  },
  {
    slug: "spreadsheets",
    name: "spreadsheets",
    chooseThem: "Keep spreadsheets if you have a handful of bookings a month.",
    chooseUs: "Choose Heyday when the admin starts eating your evenings.",
    headline: "Heyday vs spreadsheets: when the admin starts eating your evenings.",
    highlight: "eating your evenings",
    intro:
      "A spreadsheet is free, it is yours, and for a handful of bookings a month it is genuinely fine. It stops being fine at the point where remembering things becomes the job. Heyday is coming soon.",
    glance: [
      {
        row: "Cost",
        them: "Free, plus your time",
        us: TBC.price,
      },
      {
        row: "Who it suits",
        them: "A handful of bookings a month, one person, no team",
        us: "From the point where chasing and remembering becomes the job",
      },
      {
        row: "What it does when you’re busy",
        them: "Nothing. It waits for you",
        us: "Coming soon: replies, follow-ups, reminders and chasing run themselves",
      },
      { row: "Available", them: "Today", us: SOON },
    ],
    matrix: [
      {
        group: "Win the client",
        rows: [
          {
            feature: "A price while they’re still interested",
            them: "Only when you’re free to work one out",
            us: "Coming soon: instant quotes, day or night",
          },
          {
            feature: "Following up",
            them: "Only if you remember",
            us: "Coming soon: follow-ups that stop when they reply",
          },
        ],
      },
      {
        group: "Run the day",
        rows: [
          {
            feature: "Double bookings",
            them: "Caught when you notice",
            us: "Coming soon: checked before you confirm",
          },
          {
            feature: "Filling a shift",
            them: "A group chat and counting the replies",
            us: "Coming soon: offered to the right people, first yes takes it",
          },
        ],
      },
      {
        group: "Get paid",
        rows: [
          {
            feature: "Chasing a balance",
            them: "You, on a Sunday",
            us: "Coming soon: reminders that stop once it’s paid",
          },
        ],
      },
    ],
    betterHeading: "Where a spreadsheet is better.",
    better: [
      "It’s free, and it is here now.",
      "It does exactly what you tell it, and nothing else.",
      "Nobody has to learn it, and nothing breaks when a supplier changes their pricing.",
      "You own the file. If you are doing four bookings a month, a spreadsheet is the right answer and we would rather say so than sell you software.",
    ],
    differentHeading: "What software does that a spreadsheet can’t.",
    different: [
      "It answers while you’re working.",
      "It remembers to chase, and stops when someone replies.",
      "It knows the team’s availability before you promise a date.",
      "It asks for the review the day after, every time.",
    ],
    faq: [
      {
        q: "When is a spreadsheet still the right answer?",
        a: "When the admin is not costing you anything yet. If you can answer every enquiry the day it arrives and nothing slips, you do not need this.",
      },
      {
        q: "Can I bring my spreadsheet across?",
        a: TBC.importMethod,
      },
    ],
  },
];

export const rivalBySlug = (slug: string) =>
  RIVALS.find((r) => r.slug === slug);
