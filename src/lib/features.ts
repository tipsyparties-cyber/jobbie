import { CREAM, SAGE, BLUE, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The feature-page blueprint.
 *
 *  getjobber.com has roughly twenty feature pages and every one of them is
 *  the same page with different words:
 *
 *    breadcrumb → H1 + intro + CTA → "How does X work?" with jump links →
 *    three or four blocks (small uppercase kicker, heading, copy, CTA,
 *    image) → a customer quote → related features → closing CTA
 *
 *  So this file is the words and `components/features/feature-page.tsx` is
 *  the page. Twenty hand-built pages would drift within a week and mean
 *  twenty edits every time the template changes.
 *
 *  Copy is written for jobbie's user — a service business that quotes,
 *  books, staffs and invoices — rather than translated from jobber's field
 *  trades. Where jobber says "before you pack up from the jobsite", the
 *  equivalent here is "before the van leaves", and the difference matters:
 *  it is the tell that a page was written rather than swapped.
 *
 *  All copy is placeholder in the sense that Russ has final say, but it is
 *  real copy — specific, and about jobbie — not lorem.
 * ==================================================================== */

export type FeatureBlock = {
  /** Small uppercase label above the heading. */
  kicker: string;
  head: string;
  copy: string;
};

export type Feature = {
  slug: string;
  /** Short name, used in navigation and related-feature cards. */
  name: string;
  bucket: BucketId;
  /** The one-line promise. Used on the index and in related cards. */
  promise: string;
  /** The H1. Longer, and written to be the answer to a search. */
  h1: string;
  intro: string;
  blocks: FeatureBlock[];
  quote?: { text: string; who: string; org: string };
  tint: string;
};

export type BucketId = "get-found" | "win-work" | "run-it" | "keep-it";

export const BUCKETS: {
  id: BucketId;
  n: string;
  title: string;
  copy: string;
  tint: string;
}[] = [
  {
    id: "get-found",
    n: "01",
    title: "Get found",
    copy: "The work that brings people to you, running whether or not anyone remembered to do it.",
    tint: CREAM,
  },
  {
    id: "win-work",
    n: "02",
    title: "Win the work",
    copy: "Quote in minutes, answer at midnight, follow up without being chased.",
    tint: BLUE,
  },
  {
    id: "run-it",
    n: "03",
    title: "Run it without you",
    copy: "The day-to-day that eats your week — scheduling, answering, chasing, filing — handled.",
    tint: SAGE,
  },
  {
    id: "keep-it",
    n: "04",
    title: "Keep more of it",
    copy: "Know what each job actually made you, and stay on the right side of the paperwork.",
    tint: LAVENDER,
  },
];

export const FEATURES: Feature[] = [
  /* ---------------- Get found ---------------- */
  {
    slug: "reviews",
    name: "Reviews",
    bucket: "get-found",
    promise: "Ask every happy customer, automatically, at the moment they are happiest.",
    h1: "Review software that asks while the job is still fresh",
    intro:
      "The best time to ask for a review is the hour after the work is done, and that is exactly when nobody has time to ask. jobbie asks for you, to the right customer, on the channel they already replied on.",
    blocks: [
      {
        kicker: "Ask at the right moment",
        head: "Requests go out when the job closes, not when you remember",
        copy: "The trigger is the job status, so the ask lands while the customer is still standing in a clean kitchen. You choose the delay, the channel and which job types are worth asking about at all.",
      },
      {
        kicker: "Catch problems first",
        head: "Unhappy customers reach you, not Google",
        copy: "A low score routes to your inbox as a job to fix rather than straight to a public page. You get the chance to put it right, which is usually all the customer wanted.",
      },
      {
        kicker: "See what it is worth",
        head: "Track the rating as a number you can act on",
        copy: "Reviews by staff member, job type and month, so you can see whether a dip is a person, a service or a bad week.",
      },
    ],
    quote: {
      text: "We went from asking maybe one customer in ten to asking every single one. The rating moved in a month.",
      who: "Placeholder",
      org: "Placeholder",
    },
    tint: CREAM,
  },
  {
    slug: "booking-page",
    name: "Booking page",
    bucket: "get-found",
    promise: "A page that takes bookings, not just enquiries.",
    h1: "A booking page that fills your diary while you work",
    intro:
      "Most service websites collect an email address and call it a lead. Yours shows real availability, takes the details you need to price the job, and puts it straight on the calendar.",
    blocks: [
      {
        kicker: "Real availability",
        head: "Customers see what is actually free",
        copy: "The page reads the same calendar your team works from, with your travel time, buffers and cut-offs already applied. No holding slots, no checking and coming back.",
      },
      {
        kicker: "Your questions",
        head: "Ask what you need to price it properly",
        copy: "Guest numbers, access, postcode, parking, how many flights of stairs. The questions that decide the price get asked before the booking exists, not on the day.",
      },
      {
        kicker: "Matches your brand",
        head: "It looks like you, on your own domain",
        copy: "Your colours, your wording, your terms. It reads as part of your site rather than a third-party form bolted onto it.",
      },
    ],
    tint: CREAM,
  },
  {
    slug: "campaigns",
    name: "Campaigns",
    bucket: "get-found",
    promise: "Email and SMS to the right slice of your customer list.",
    h1: "Campaigns built from what your customers actually booked",
    intro:
      "Your customer list already knows what people booked, when, for how much and how often. Campaigns use that, so a message goes to the forty people it suits rather than the four thousand it does not.",
    blocks: [
      {
        kicker: "Segment by behaviour",
        head: "Filter by what they booked, not what they ticked",
        copy: "Everyone who booked in December but not since. Everyone who spent over a threshold. Everyone within ten miles of a date you are trying to fill.",
      },
      {
        kicker: "Fill the gaps",
        head: "Turn a quiet week into an offer",
        copy: "A thin fortnight in the calendar is a reason to send something. Point a campaign at the dates you want filled and the customers most likely to fill them.",
      },
      {
        kicker: "Know what worked",
        head: "Measured in bookings, not opens",
        copy: "Because the campaign and the calendar are the same system, you see what a send actually produced in revenue rather than in clicks.",
      },
    ],
    tint: CREAM,
  },
  {
    slug: "referrals",
    name: "Referrals",
    bucket: "get-found",
    promise: "Make it easy for good customers to bring you more.",
    h1: "Referrals that run themselves",
    intro:
      "Word of mouth is already your best channel. The only thing missing is asking, tracking it, and making sure the person who sent someone your way actually gets what you promised them.",
    blocks: [
      {
        kicker: "Ask the right people",
        head: "Offer it to the customers who would say yes",
        copy: "The ask goes to repeat customers and five-star reviewers, not to someone whose last job went sideways.",
      },
      {
        kicker: "Track it properly",
        head: "Every referral tied to the person who sent it",
        copy: "A unique link per customer, so credit lands automatically and nobody has to remember who mentioned whom.",
      },
      {
        kicker: "Pay out without chasing",
        head: "Rewards applied to the next booking",
        copy: "Credit, discount or cash. It applies itself when the referred job completes, which is the only version anyone trusts twice.",
      },
    ],
    tint: CREAM,
  },

  /* ---------------- Win the work ---------------- */
  {
    slug: "quotes",
    name: "Quoting",
    bucket: "win-work",
    promise: "A priced, branded quote while you are still on the phone.",
    h1: "Quoting software that prices the job the way you would",
    intro:
      "Quoting is where most service businesses lose both time and margin — hours writing them, and money guessing. jobbie builds the quote from your own rules, so the number is right and it goes out the same day.",
    blocks: [
      {
        kicker: "Your pricing, encoded",
        head: "The rules you have never written down, written down",
        copy: "Line items, add-ons, travel bands, minimum spends, seasonal rates, the discount you always give that one client. Once, properly — then every quote applies them without you.",
      },
      {
        kicker: "Options sell",
        head: "Good, better, best on one page",
        copy: "Give the customer something to choose between instead of something to accept or refuse. Tiered quotes lift average value because most people take the middle.",
      },
      {
        kicker: "Follow up automatically",
        head: "Nothing goes cold because you got busy",
        copy: "Unanswered quotes chase themselves on a schedule you set, and stop the moment the customer replies. Most wins are a second message, not a better price.",
      },
      {
        kicker: "Straight to booked",
        head: "Accepted online, on the calendar, no retyping",
        copy: "The customer approves and pays a deposit in the same click, and the job exists with everything already attached.",
      },
    ],
    quote: {
      text: "Quotes used to be a Sunday job. Now they go out before the next call.",
      who: "Placeholder",
      org: "Placeholder",
    },
    tint: BLUE,
  },
  {
    slug: "online-booking",
    name: "Online booking",
    bucket: "win-work",
    promise: "Customers book themselves against real availability.",
    h1: "Online booking that never double-books you",
    intro:
      "Taking a booking should not cost you three messages and a phone call. Customers pick from what is genuinely free, answer the questions that matter, and pay a deposit to hold it.",
    blocks: [
      {
        kicker: "One calendar",
        head: "Availability that accounts for the whole operation",
        copy: "Staff, travel, equipment, setup and pack-down. A slot only shows if everything the job needs is free, which is why the calendar can be trusted.",
      },
      {
        kicker: "Deposits",
        head: "A booking that is actually committed",
        copy: "Take a deposit at the point of booking and no-shows largely stop being a category of problem.",
      },
      {
        kicker: "Rules you set",
        head: "Notice periods, cut-offs and blackout dates",
        copy: "Minimum lead time, maximum bookings per day, dates you will not work. The page enforces them so you never have to say no manually.",
      },
    ],
    tint: BLUE,
  },
  {
    slug: "enquiries",
    name: "Enquiries",
    bucket: "win-work",
    promise: "Every enquiry captured, answered and triaged.",
    h1: "Enquiry forms that start the job, not a to-do",
    intro:
      "An enquiry that sits unanswered for a day is usually an enquiry someone else answered. jobbie captures them from every channel, replies immediately, and tells you which ones are worth your morning.",
    blocks: [
      {
        kicker: "Every channel",
        head: "Web, WhatsApp, email and phone in one queue",
        copy: "However someone gets in touch, it arrives as the same kind of thing — with the customer's history attached if they have booked before.",
      },
      {
        kicker: "Answered instantly",
        head: "A real reply in seconds, at any hour",
        copy: "The receptionist agent answers the questions it can, asks the ones that decide the price, and books an assessment if that is what is needed.",
      },
      {
        kicker: "Sorted for you",
        head: "The ones worth your time, first",
        copy: "Scored on value, fit and how likely they are to book, so your morning starts with the enquiry most worth having.",
      },
    ],
    tint: BLUE,
  },
  {
    slug: "follow-ups",
    name: "Follow-ups",
    bucket: "win-work",
    promise: "Nothing goes quiet because you got busy.",
    h1: "Automated follow-up that sounds like you wrote it",
    intro:
      "The difference between a busy quarter and a quiet one is usually second messages. jobbie sends them — to quotes, to enquiries, to customers who have not booked in a while — and stops the second someone replies.",
    blocks: [
      {
        kicker: "Sequences",
        head: "Two nudges and a close, on your timing",
        copy: "Set the gaps and the wording once. Every quote gets the same treatment, including the ones you would have forgotten.",
      },
      {
        kicker: "It knows when to stop",
        head: "A reply ends the sequence immediately",
        copy: "Nothing is worse than being chased by software you have already answered. A human reply anywhere cancels the rest.",
      },
      {
        kicker: "Win back",
        head: "Customers who have gone quiet",
        copy: "Anyone who used to book regularly and has not for a while gets a different message from a cold lead, because they are not one.",
      },
    ],
    tint: BLUE,
  },

  /* ---------------- Run it without you ---------------- */
  {
    slug: "scheduling",
    name: "Scheduling",
    bucket: "run-it",
    promise: "Jobs on the calendar, people on the jobs, everyone told.",
    h1: "Scheduling software that survives a busy Saturday",
    intro:
      "Most scheduling breaks at the point something changes. jobbie handles the change — the cancellation, the extra hour, the person who called in sick — and tells everyone affected without you writing a single message.",
    blocks: [
      {
        kicker: "See the whole week",
        head: "Every job, every person, one view",
        copy: "Drag to move, stretch to extend. Conflicts surface as you make them rather than on the morning of the job.",
      },
      {
        kicker: "Routes that make sense",
        head: "Jobs ordered by where they actually are",
        copy: "The day is built around travel, not just time. Less driving is more jobs, and it is the cheapest margin you will ever find.",
      },
      {
        kicker: "Everyone knows",
        head: "Changes reach the people they affect",
        copy: "Move a job and the crew, the customer and the calendar all update. The group chat stops being the system of record.",
      },
    ],
    tint: SAGE,
  },
  {
    slug: "staff-allocation",
    name: "Staff allocation",
    bucket: "run-it",
    promise: "The right people on the right job, clashes caught first.",
    h1: "Staff allocation that knows who can actually do the job",
    intro:
      "Assigning people is not a calendar problem, it is a matching problem — skills, certificates, distance, who works well together, who you promised a Saturday off. jobbie holds all of it.",
    blocks: [
      {
        kicker: "Match on what matters",
        head: "Skills, tickets, distance and availability",
        copy: "Only the people who can legally and practically do the job are offered for it. No more finding out on site that nobody has the right certificate.",
      },
      {
        kicker: "Clashes caught early",
        head: "Double-bookings surface before the customer sees them",
        copy: "Including the awkward ones — someone assigned across two sites, or booked past a legal rest break.",
      },
      {
        kicker: "Offer and accept",
        head: "Shifts go out, staff claim them",
        copy: "Send a shift to everyone who qualifies and let it go to whoever takes it first, or assign directly. Both beat a group chat at 11pm.",
      },
    ],
    quote: {
      text: "Allocation used to take a full evening every week. It is now the thing I check rather than the thing I do.",
      who: "Placeholder",
      org: "Placeholder",
    },
    tint: SAGE,
  },
  {
    slug: "job-tracking",
    name: "Job tracking",
    bucket: "run-it",
    promise: "What happened on site, recorded as it happens.",
    h1: "Job tracking that leaves a record worth having",
    intro:
      "The gap between what was quoted and what happened is where margin and disputes both live. Checklists, photos and notes captured on site close it, without anyone filling in a form at the end of a long day.",
    blocks: [
      {
        kicker: "Checklists",
        head: "The steps for this job type, every time",
        copy: "Different work needs different steps. The right list appears on the right job, so standards do not depend on who turned up.",
      },
      {
        kicker: "Photos and notes",
        head: "Before and after, timestamped and attached",
        copy: "Evidence against the job, not in somebody's camera roll. It settles the awkward conversation before it becomes one.",
      },
      {
        kicker: "Variations",
        head: "Extra work captured while it is being done",
        copy: "Add it on site, priced from your rules, approved by the customer there and then. Unbilled extras are the quietest way to lose money.",
      },
    ],
    tint: SAGE,
  },
  {
    slug: "time-tracking",
    name: "Time tracking",
    bucket: "run-it",
    promise: "Hours logged where the work happened.",
    h1: "Time tracking that does not rely on anyone remembering",
    intro:
      "Hours are what you pay and often what you charge, so guessing at them is expensive twice. jobbie logs them against the job automatically and flags the ones that do not look right.",
    blocks: [
      {
        kicker: "Automatic",
        head: "Clock in when you arrive, out when you leave",
        copy: "Location-aware, so the timesheet fills itself and nobody reconstructs a week from memory on a Friday.",
      },
      {
        kicker: "Against the job",
        head: "Hours attached to work, not just to a week",
        copy: "Which means job costing is real rather than an estimate, and quoting gets better every month.",
      },
      {
        kicker: "Straight to pay",
        head: "Approved hours become a payment run",
        copy: "Including overtime, travel time and whatever your bonus rules are. One approval, not a spreadsheet.",
      },
    ],
    tint: SAGE,
  },
  {
    slug: "client-records",
    name: "Client records",
    bucket: "run-it",
    promise: "One page per customer, holding everything.",
    h1: "A client record that means nobody starts from nothing",
    intro:
      "Every quote, job, message, photo, invoice and payment against one customer, visible to whoever picks up the phone. The difference between sounding like a company and sounding like a stranger.",
    blocks: [
      {
        kicker: "The whole history",
        head: "Everything that has ever happened, in order",
        copy: "Including the things people usually keep in their own inbox. When someone leaves, the relationship stays.",
      },
      {
        kicker: "The details that matter",
        head: "Gate codes, allergies, the dog, the awkward parking",
        copy: "The small knowledge that makes a repeat visit good. It belongs on the record, not in one person's head.",
      },
      {
        kicker: "Properties and sites",
        head: "Customers with more than one address",
        copy: "Multiple sites under one account, each with its own history, contacts and access notes.",
      },
    ],
    tint: SAGE,
  },
  {
    slug: "client-portal",
    name: "Client portal",
    bucket: "run-it",
    promise: "Customers answer their own questions.",
    h1: "A client portal that removes the where-are-you call",
    intro:
      "Most inbound calls are a customer wanting information you already have. Give them a place to see it and the phone rings less, which is worth more than it sounds.",
    blocks: [
      {
        kicker: "Self-serve",
        head: "Quotes, bookings, invoices and history in one place",
        copy: "Approve a quote, check a date, download an invoice, pay a balance — without waiting for your office hours.",
      },
      {
        kicker: "Fewer interruptions",
        head: "The calls you stop getting",
        copy: "Every answer the portal gives is a call your team did not take mid-job.",
      },
      {
        kicker: "Book again",
        head: "Repeat work in two clicks",
        copy: "A returning customer books the same thing again without re-explaining any of it.",
      },
    ],
    tint: SAGE,
  },
  {
    slug: "inbox",
    name: "Unified inbox",
    bucket: "run-it",
    promise: "Every channel, one thread per customer.",
    h1: "One inbox for email, WhatsApp, SMS and web forms",
    intro:
      "Conversations scattered across four apps and three phones is how things get missed. jobbie puts them in one thread per customer, with the job attached and an agent covering the hours you cannot.",
    blocks: [
      {
        kicker: "One thread",
        head: "However they message, it lands in the same place",
        copy: "Reply from one screen and it goes back on the channel they used. Nobody has to remember where the conversation was.",
      },
      {
        kicker: "Covered out of hours",
        head: "Answered at midnight, escalated when it matters",
        copy: "The agent handles what it can, and stops with the whole thread attached when it cannot. It never guesses.",
      },
      {
        kicker: "Nothing lost",
        head: "Assigned, chased and closed like work",
        copy: "Messages behave like jobs — owned by someone, with a state — rather than sitting unread in a shared account.",
      },
    ],
    tint: SAGE,
  },
  {
    slug: "team",
    name: "Team management",
    bucket: "run-it",
    promise: "Permissions, documents and onboarding in one place.",
    h1: "Team management for a workforce that changes every month",
    intro:
      "Seasonal staff, freelancers and a core team all need different access and different paperwork. Handling that by hand is how expired certificates end up on live jobs.",
    blocks: [
      {
        kicker: "Permissions",
        head: "People see what their role needs",
        copy: "A crew member sees today. A manager sees the week. Nobody sees the margin unless you decide they should.",
      },
      {
        kicker: "Documents",
        head: "Certificates tracked to their expiry",
        copy: "Right to work, insurance, licences and training, with reminders before they lapse rather than after.",
      },
      {
        kicker: "Onboarding",
        head: "New starters set up without a meeting",
        copy: "Details, documents and bank details collected once, verified, and never stored where they should not be.",
      },
    ],
    tint: SAGE,
  },

  /* ---------------- Keep more of it ---------------- */
  {
    slug: "payments",
    name: "Payments",
    bucket: "keep-it",
    promise: "Get paid on completion, not thirty days later.",
    h1: "Payment processing that gets you paid before the van leaves",
    intro:
      "Every day between finishing a job and being paid for it is a day you have lent someone money. jobbie takes payment online, in person, on a schedule, or automatically the moment the job closes.",
    blocks: [
      {
        kicker: "Paid online",
        head: "Card and bank transfer from the invoice itself",
        copy: "The customer pays from the link in the message, on their phone, without an account or a phone call.",
      },
      {
        kicker: "Paid automatically",
        head: "Cards on file, charged on completion",
        copy: "For recurring and contract work, the invoice and the payment are the same event. Nothing to chase because nothing is outstanding.",
      },
      {
        kicker: "Paid in person",
        head: "Take a card on the phone in your pocket",
        copy: "Tap to pay on site, before the van leaves. The fastest money is the money collected while you are still standing there.",
      },
      {
        kicker: "Reconciled",
        head: "Payments matched to invoices without a spreadsheet",
        copy: "Payouts, fees and refunds land against the right job, so the books agree with the bank without an evening's work.",
      },
    ],
    quote: {
      text: "We were averaging three weeks to get paid. It is now mostly same-day.",
      who: "Placeholder",
      org: "Placeholder",
    },
    tint: LAVENDER,
  },
  {
    slug: "invoicing",
    name: "Invoicing",
    bucket: "keep-it",
    promise: "Invoices that send themselves and chase themselves.",
    h1: "Invoicing that happens without anyone sitting down to do it",
    intro:
      "Invoicing is the admin most often left until the end of the week, which is exactly why cash flow suffers. When the job closes, the invoice goes — with everything already on it.",
    blocks: [
      {
        kicker: "Built from the job",
        head: "Nothing retyped, nothing left off",
        copy: "Quoted items, approved variations, materials and logged hours are already there. The extras that usually go unbilled are on it.",
      },
      {
        kicker: "Batch it",
        head: "A month of invoices in one pass",
        copy: "For contract and recurring work, raise and send the lot at once rather than one at a time.",
      },
      {
        kicker: "Chased automatically",
        head: "Reminders that stop when payment lands",
        copy: "A polite schedule you set once. Most late payment is forgetfulness, and forgetfulness responds well to being reminded.",
      },
    ],
    tint: LAVENDER,
  },
  {
    slug: "job-costing",
    name: "Job costing",
    bucket: "keep-it",
    promise: "What each job actually made you.",
    h1: "Job costing that tells you which work is worth taking",
    intro:
      "Revenue is easy to see and margin is not, which is how businesses end up busiest on their least profitable work. Labour, travel and materials against every job, automatically.",
    blocks: [
      {
        kicker: "Real numbers",
        head: "Costs from logged hours, not estimates",
        copy: "Because time tracking and allocation feed it, the figure is what happened rather than what was planned.",
      },
      {
        kicker: "Patterns",
        head: "Which job types, customers and crews make money",
        copy: "Often uncomfortable, always useful. The busiest customer is not reliably the best one.",
      },
      {
        kicker: "Better quoting",
        head: "Last year's actuals price next year's work",
        copy: "Costing feeds back into your quoting rules, so the estimate gets closer to the truth every quarter.",
      },
    ],
    tint: LAVENDER,
  },
  {
    slug: "reporting",
    name: "Reporting",
    bucket: "keep-it",
    promise: "The numbers that change what you do on Monday.",
    h1: "Reporting that answers the questions you actually ask",
    intro:
      "Not a wall of charts. Where work comes from, what converts, who is busy, what is owed, and what next month looks like at today's booking pace.",
    blocks: [
      {
        kicker: "The dashboard",
        head: "Today, this week, and what needs you",
        copy: "Unsent quotes, unpaid invoices, unfilled shifts and jobs at risk — the short list of things that will cost you if ignored.",
      },
      {
        kicker: "Where work comes from",
        head: "Channel by channel, to actual revenue",
        copy: "Enquiries, bookings and money traced back to source, so spend follows what works.",
      },
      {
        kicker: "Forward view",
        head: "What next month looks like from here",
        copy: "Booked revenue against the same point last year, so a quiet patch is something you spot in advance rather than survive.",
      },
    ],
    tint: LAVENDER,
  },
];

export const featureBySlug = (slug: string) =>
  FEATURES.find((f) => f.slug === slug);

export const featuresIn = (bucket: BucketId) =>
  FEATURES.filter((f) => f.bucket === bucket);

/** Three others to show at the foot of a feature page: same bucket first,
 *  topped up from elsewhere so a small bucket still fills the row. */
export const relatedTo = (f: Feature): Feature[] => {
  const same = FEATURES.filter((x) => x.bucket === f.bucket && x.slug !== f.slug);
  const rest = FEATURES.filter((x) => x.bucket !== f.bucket);
  return [...same, ...rest].slice(0, 3);
};
