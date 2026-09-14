import type { GroupId } from "@/lib/groups";

/* ==================================================================== *
 *  The twelve steps — SaaS brief 3.3, spec part 2, and the working page
 *  at docs/heyday/reference/site/how-it-works.html.
 *
 *  This is the spine of the whole site. The six groups are made of these
 *  steps, the homepage's first sideways scroll is these steps, and every
 *  group page lists the ones it covers. One file, so they cannot drift.
 *
 *  Each step is told from three sides — what the customer does, what the
 *  owner does, what Heyday does — because that is the argument. A feature
 *  list says what the software has; this says where the owner's time
 *  currently goes and who takes it over.
 *
 *  The screen for each step is holding art with example data, labelled as
 *  such wherever it is drawn.
 * ==================================================================== */

export type Step = {
  n: number;
  group: GroupId;
  /** The step's name. */
  title: string;
  /** What the customer is doing at this point. */
  customer: string;
  /** What the owner is doing, and where it hurts. */
  you: string;
  /** What Heyday does about it. */
  heyday: string;
  /** The small icon for the step. */
  icon: string;
  /** The illustration: a window title and its rows. Example data. */
  screen: {
    title: string;
    rows: { label: string; value: string; hot?: boolean }[];
    action: string;
  };
};

export const STEPS: Step[] = [
  {
    n: 1,
    group: "get-ahead",
    title: "Get ahead of the game",
    customer: "Hasn’t found you yet.",
    you: "Get prices, packages, rules, your diary and your team ready, and move old customer lists across.",
    heyday:
      "The AI setup assistant, starter settings for your kind of business, importing clients and bookings, and your booking page.",
    icon: "hd-ai-setup-assistant",
    screen: {
      title: "Setup assistant",
      rows: [
        { label: "Packages", value: "12 read from your price list" },
        { label: "Add-ons", value: "6" },
        { label: "Travel rule", value: "$1 a mile after 20" },
        { label: "Deposit rule", value: "30% · check", hot: true },
      ],
      action: "Check and save",
    },
  },
  {
    n: 2,
    group: "get-found",
    title: "Get found",
    customer:
      "Searches, sees an ad, asks a friend or an AI, or spots you on a marketplace.",
    you: "Want to know which of those actually brings bookings.",
    heyday:
      "Your booking page, a marketplace listing, ads that know which bookings pay, reviews, referrals and guest capture.",
    icon: "hd-booking-page",
    screen: {
      title: "Your booking page",
      rows: [
        { label: "Date", value: "Sat 14 June" },
        { label: "Guests", value: "80" },
        { label: "Hours", value: "4" },
        { label: "Live price", value: "$1,450", hot: true },
      ],
      action: "Book now",
    },
  },
  {
    n: 3,
    group: "win-the-client",
    title: "Catch every enquiry",
    customer:
      "Gets in touch by form, email, WhatsApp, social or phone, usually while you’re busy.",
    you: "Are mid-job, and some calls get missed.",
    heyday:
      "One inbox, an instant first reply, missed-call capture, knowing who’s getting in touch, and lead types.",
    icon: "hd-enquiries",
    screen: {
      title: "One inbox",
      rows: [
        { label: "Email · Sam", value: "New enquiry" },
        { label: "WhatsApp · Alex", value: "Current customer" },
        { label: "Missed call", value: "New enquiry", hot: true },
        { label: "Text · Priya", value: "Past customer" },
      ],
      action: "Reply to all",
    },
  },
  {
    n: 4,
    group: "win-the-client",
    title: "Quote instantly",
    customer:
      "Wants a price now, and will ask the next business if they don’t get one.",
    you: "Some jobs need a few questions or a visit first.",
    heyday:
      "The instant quote they can adjust, AI-drafted quotes for bespoke requests, and booking a visit when one is needed.",
    icon: "hd-instant-quotes",
    screen: {
      title: "Your quote",
      rows: [
        { label: "Guests", value: "80" },
        { label: "Hours", value: "4" },
        { label: "Glassware hire", value: "Included" },
        { label: "Total", value: "$1,450", hot: true },
      ],
      action: "Book with deposit",
    },
  },
  {
    n: 5,
    group: "win-the-client",
    title: "Follow up automatically",
    customer: "Goes quiet to compare, ask a partner or wait for payday.",
    you: "Don’t have time to chase.",
    heyday:
      "Follow-ups that change with the lead and stop the moment they reply, and reminders when a checkout is left half done.",
    icon: "hd-automations",
    screen: {
      title: "Follow-up rule",
      rows: [
        { label: "When", value: "No reply after 2 days" },
        { label: "Send", value: "A friendly WhatsApp nudge" },
        { label: "Unless", value: "They’ve booked" },
        { label: "Then", value: "Stop", hot: true },
      ],
      action: "Save",
    },
  },
  {
    n: 6,
    group: "win-the-client",
    title: "Win the client",
    customer: "Says yes, but only if the date is still free and booking is easy.",
    you: "Need the date, the team and the deposit locked in.",
    heyday:
      "Instant booking, with a check that the diary and the team are free, and the deposit and signed terms in the same step.",
    icon: "hd-online-booking",
    screen: {
      title: "Checkout",
      rows: [
        { label: "Date", value: "Sat 14 June ✓" },
        { label: "Team free", value: "✓" },
        { label: "Deposit", value: "$450", hot: true },
        { label: "Terms", value: "agreed" },
      ],
      action: "Pay deposit",
    },
  },
  {
    n: 7,
    group: "run-the-day",
    title: "Plan it together",
    customer: "Changes guest numbers, makes choices and asks questions.",
    you: "Keep track of it all, and of the balance due.",
    heyday:
      "The client portal, reminders, change requests and balance chasing.",
    icon: "hd-client-portal",
    screen: {
      title: "Client portal",
      rows: [
        { label: "Guest numbers", value: "80 → 92" },
        { label: "Menu choices", value: "3 picked" },
        { label: "Change request", value: "Start 30 min later", hot: true },
        { label: "Balance due", value: "$1,000 · 14 days" },
      ],
      action: "Confirm changes",
    },
  },
  {
    n: 8,
    group: "run-the-day",
    title: "Staff it and get ready",
    customer: "Has nothing to do.",
    you: "Someone has to deliver it with the right kit, and if you’re short of people, hiring starts.",
    heyday:
      "Shift offers to employees or subcontractors, clash and travel checks, kit lists, briefings, and hiring.",
    icon: "hd-team-and-shifts",
    screen: {
      title: "Shift offer · Sat 14 June",
      rows: [
        { label: "Team member 1 · 4 mi", value: "Accepted ✓", hot: true },
        { label: "Team member 2 · 9 mi", value: "offered" },
        { label: "Team member 3 · 12 mi", value: "offered" },
      ],
      action: "Confirm the team",
    },
  },
  {
    n: 9,
    group: "run-the-day",
    title: "The day",
    customer: "Enjoys it, or changes something at the last minute.",
    you: "Your team turns up and delivers.",
    heyday:
      "Reminders, travel times, check-in, alerts, emergency cover, and tips by QR or tap.",
    icon: "hd-on-the-day",
    screen: {
      title: "On the day",
      rows: [
        { label: "Check-in", value: "5:28pm ✓", hot: true },
        { label: "Arrive by", value: "5:30pm" },
        { label: "Travel", value: "24 min" },
        { label: "Tip jar", value: "QR ready" },
      ],
      action: "Open the day",
    },
  },
  {
    n: 10,
    group: "get-paid",
    title: "Get paid",
    customer:
      "Pays in stages: a deposit, the balance, extras and tips, a final invoice.",
    you: "Pay your team too.",
    heyday:
      "Deposits, balances, invoices, chasing, tips, and team pay and payouts.",
    icon: "hd-payments",
    screen: {
      title: "Payments",
      rows: [
        { label: "Deposit", value: "Paid ✓" },
        { label: "Balance reminder", value: "sent" },
        { label: "Balance", value: "Paid ✓", hot: true },
        { label: "Team payout", value: "queued" },
      ],
      action: "Pay the team",
    },
  },
  {
    n: 11,
    group: "get-rebooked",
    title: "Look after them",
    customer: "Is happiest the next day, or has a problem to raise.",
    you: "Want the review, and want to fix any problem in private.",
    heyday:
      "Next-day feedback. A thumbs up gets a referral code, then the review ask. A thumbs down gets “How can we improve?”.",
    icon: "hd-reviews",
    screen: {
      title: "The next day",
      rows: [
        { label: "How was it?", value: "👍" },
        { label: "Your referral code", value: "SHARE20", hot: true },
        { label: "Leave a review", value: "asked" },
      ],
      action: "Leave a review",
    },
  },
  {
    n: 12,
    group: "get-rebooked",
    title: "Get rebooked",
    customer: "Would book again if someone asked.",
    you: "Repeat business slips away when nobody asks.",
    heyday:
      "Win-back and anniversary messages, loyalty, memberships, gift vouchers, quiet-date offers and cross-promotion.",
    icon: "hd-campaigns",
    screen: {
      title: "Win-back draft",
      rows: [
        { label: "To", value: "The customer" },
        { label: "Message", value: "“It’s been a year since your party…”" },
        { label: "When", value: "Tomorrow, 10am", hot: true },
      ],
      action: "Send",
    },
  },
];

/**
 * The four ways the flow bends. These matter more than they look: a class
 * host reading a twelve-step flow that opens with "quote" will decide the
 * software is not for them, and it is. Naming the variations is how one
 * flow covers services and experiences at once.
 */
export const VARIATIONS: { title: string; line: string }[] = [
  {
    title: "Classes, tickets and appointments",
    line: "People book a seat or a slot straight away, so steps 4 and 5 are skipped.",
  },
  {
    title: "Some trades and bespoke jobs",
    line: "A visit or a call comes between steps 3 and 4.",
  },
  {
    title: "Recurring work",
    line: "A weekly clean or a monthly membership loops from step 10 back to step 7.",
  },
  {
    title: "Marketplace bookings",
    line: "They arrive at step 6 already won. Heyday runs steps 7 to 12, and brings the customer back to book direct.",
  },
];

export const stepsInGroup = (group: GroupId) =>
  STEPS.filter((s) => s.group === group);
