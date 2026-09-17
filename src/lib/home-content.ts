/* ==================================================================== *
 *  The homepage's words — spec part 1, sections 3 to 15.
 *
 *  Copy lives in data and the page comes from templates, so the homepage
 *  file stays a list of sections rather than nine hundred lines of prose
 *  with markup threaded through it. When Jem swaps holding copy for real
 *  copy, this is the one file that changes.
 *
 *  Everything here is holding copy from the spec, verbatim where the spec
 *  gives words. Nothing has been improved in passing: the brief's rule is
 *  that a placeholder stays exactly as written until Jem or Russell
 *  answers it, and an "improved" placeholder is one nobody notices is
 *  still a placeholder.
 * ==================================================================== */

import type { GroupId } from "@/lib/groups";

/* ---- 3. What Heyday is ---------------------------------------------- */

export const WHAT_CHIPS: { label: string; href: string; icon: string }[] = [
  { label: "Instant quotes", href: "/features/quotes", icon: "hd-instant-quotes" },
  { label: "Online booking", href: "/features/online-booking", icon: "hd-online-booking" },
  { label: "Payments and deposits", href: "/features/payments", icon: "hd-payments" },
  { label: "One inbox", href: "/features/inbox", icon: "hd-one-inbox" },
  { label: "Shift offers", href: "/features/shift-offers", icon: "hd-team-and-shifts" },
  { label: "Team pay", href: "/features/team-pay-and-expenses", icon: "hd-team-pay-and-expenses" },
  { label: "Follow-ups", href: "/features/follow-ups", icon: "hd-automations" },
  { label: "Reviews", href: "/features/reviews", icon: "hd-reviews" },
];

/**
 * The business types. Written once as real text, as links to the anchors
 * on /who-its-for; the moving duplicate that makes the marquee loop is
 * aria-hidden and carries no links, so a search engine and a screen reader
 * each meet every word exactly once.
 */
export const BUSINESS_TYPES: { label: string; anchor: string }[] = [
  { label: "Mobile bars", anchor: "events-and-hospitality" },
  { label: "Caterers", anchor: "events-and-hospitality" },
  { label: "Private chefs", anchor: "events-and-hospitality" },
  { label: "Photographers", anchor: "photo-video-and-entertainment" },
  { label: "DJs", anchor: "photo-video-and-entertainment" },
  { label: "Performers", anchor: "photo-video-and-entertainment" },
  { label: "Photo booths", anchor: "photo-video-and-entertainment" },
  { label: "Planners", anchor: "events-and-hospitality" },
  { label: "Florists", anchor: "events-and-hospitality" },
  { label: "Class hosts", anchor: "classes-and-experiences" },
  { label: "Tours", anchor: "classes-and-experiences" },
  { label: "Escape rooms", anchor: "classes-and-experiences" },
  { label: "Cleaners", anchor: "home-and-personal-services" },
  { label: "Trades", anchor: "home-and-personal-services" },
  { label: "Tutors", anchor: "home-and-personal-services" },
  { label: "Beauty and wellness", anchor: "beauty-wellness-and-fitness" },
  { label: "Fitness", anchor: "beauty-wellness-and-fitness" },
  { label: "Staffing agencies", anchor: "staffing-and-hire" },
];

/* ---- 5. How Heyday runs your day (sideways scroll 1) ---------------- */

export type FlowStep = {
  group: GroupId;
  step: string;
  line: string;
  icon: string;
};

export const FLOW: FlowStep[] = [
  { group: "get-ahead", step: "Get ahead of the game", icon: "hd-ai-setup-assistant", line: "Your prices, packages, rules, diary and team, ready before anyone asks." },
  { group: "get-found", step: "Get found", icon: "hd-booking-page", line: "A booking page, a marketplace listing, and ads that know which bookings pay." },
  { group: "win-the-client", step: "Catch every enquiry", icon: "hd-enquiries", line: "One inbox, an instant first reply, and missed-call capture." },
  { group: "win-the-client", step: "Quote instantly", icon: "hd-instant-quotes", line: "A price in seconds, which the customer can adjust themselves." },
  { group: "win-the-client", step: "Follow up automatically", icon: "hd-automations", line: "Follow-ups that change with the lead, and stop the moment they reply." },
  { group: "win-the-client", step: "Win the client", icon: "hd-online-booking", line: "Instant booking, with the deposit and signed terms in the same step." },
  { group: "run-the-day", step: "Plan it together", icon: "hd-client-portal", line: "The client portal, reminders, changes and balance chasing." },
  { group: "run-the-day", step: "Staff it and get ready", icon: "hd-team-and-shifts", line: "Shift offers, clash and travel checks, and kit lists." },
  { group: "run-the-day", step: "The day", icon: "hd-tasks", line: "Reminders, check-in, alerts, and tips by QR or tap." },
  { group: "get-paid", step: "Get paid", icon: "hd-payments", line: "Deposits, balances, invoices, tips and team pay." },
  { group: "get-rebooked", step: "Look after them", icon: "hd-reviews", line: "Next-day feedback: a referral code first, then the review ask." },
  { group: "get-rebooked", step: "Get rebooked", icon: "hd-campaigns", line: "Win-back messages, loyalty, memberships and gift vouchers." },
];

/* ---- 6. The feature rows -------------------------------------------- */

export type FeatureRow = {
  group: GroupId;
  headline: string;
  highlight: string;
  line: string;
  detailHeading: string;
  cards: { title: string; body: string; icon: string }[];
  /** A row in lib/stats-bank, where one is approved for this row. */
  stat?: number;
};

export const FEATURE_ROWS: FeatureRow[] = [
  {
    group: "win-the-client",
    headline: "Stop losing bookings while you work out the price.",
    highlight: "work out the price",
    line: "Customers see a price in seconds, change it themselves, and book with a deposit.",
    detailHeading: "Every enquiry caught, priced, followed up and booked.",
    cards: [
      { title: "Caught", body: "Email, WhatsApp, texts and calls in one thread per client.", icon: "hd-one-inbox" },
      { title: "Priced", body: "A price in seconds that the customer can adjust.", icon: "hd-instant-quotes" },
      { title: "Followed up", body: "Follow-ups that change with the lead, and stop when they reply.", icon: "hd-ai-replies" },
      { title: "Booked", body: "Instant booking, with the deposit and signed terms in the same step.", icon: "hd-online-booking" },
    ],
    stat: 1,
  },
  {
    group: "run-the-day",
    headline: "Stop checking five apps to find one message.",
    highlight: "five apps",
    line: "Email, WhatsApp, texts and calls in one thread per client, with AI drafting replies that already know the booking.",
    detailHeading: "Every conversation, with the booking beside it.",
    cards: [
      { title: "One inbox", body: "Every channel in one thread.", icon: "hd-one-inbox" },
      { title: "Client records", body: "Every message, quote and payment for one client.", icon: "hd-client-records" },
      { title: "Call notes", body: "Every call summarized, and voicemails transcribed.", icon: "hd-missed-calls" },
      { title: "Replies that write themselves", body: "Drafts you approve.", icon: "hd-ai-replies" },
    ],
  },
  {
    group: "get-paid",
    headline: "Stop spending your time chasing clients for payment.",
    highlight: "chasing clients",
    line: "Deposits, balances and reminders by email and WhatsApp, until it's paid.",
    detailHeading: "Every payment in. Every payout out. No chasing.",
    cards: [
      { title: "Deposits and balances", body: "Taken online when they book, and on the date the balance falls due.", icon: "hd-payments" },
      { title: "Reminders that stop", body: "Nudges until it's paid, then they stop.", icon: "hd-automations" },
      { title: "Team pay", body: "Worked out from the job, the hours and the tips.", icon: "hd-team-and-shifts" },
      { title: "Profit per job", body: "What each booking actually made.", icon: "hd-reports" },
    ],
  },
  {
    group: "run-the-day",
    headline: "Stop texting your whole team to fill one shift.",
    highlight: "fill one shift",
    line: "Offer the job to the right people, and let the first yes take it. Clashes are caught before they happen.",
    detailHeading: "The right people, in the right place, on the day.",
    cards: [
      { title: "Shift offers", body: "Ranked by distance, reliability and rating.", icon: "hd-team-and-shifts" },
      { title: "Clash and travel checks", body: "Caught before you confirm.", icon: "hd-tasks" },
      { title: "Checklists and kit lists", body: "Nothing forgotten on the day.", icon: "hd-tasks" },
      { title: "On the day", body: "Reminders, check-in and cover if someone drops out.", icon: "hd-team" },
    ],
  },
];

/* ---- 10. Only on Heyday (sideways scroll 2) ------------------------- */

export const ONLY_ON_HEYDAY: { title: string; line: string; icon: string; href: string }[] = [
  { title: "AI autopilot levels", line: "Start safe, then hand over more as trust grows.", icon: "hd-ai-replies", href: "/features/ai" },
  { title: "Missed-call messages by caller type", line: "Every missed caller hears back within minutes, in the right words.", icon: "hd-missed-calls", href: "/features/missed-call-capture" },
  { title: "AI setup assistant", line: "Set up in an afternoon, not a month.", icon: "hd-ai-setup-assistant", href: "/features/ai-setup-assistant" },
  { title: "Lead types with replies to match", line: "Your best leads get the fastest, most personal answer.", icon: "hd-enquiries", href: "/features/enquiries" },
  { title: "Fill quiet dates", line: "Offers go to the customers most likely to book the dates that look thin.", icon: "hd-campaigns", href: "/features/campaigns" },
  { title: "Group bookings with split payments", line: "Each guest pays their share by link.", icon: "hd-group-bookings", href: "/features/group-bookings" },
  { title: "Referral code first, then the review", line: "More word of mouth, and more reviews.", icon: "hd-reviews", href: "/features/referrals" },
  { title: "Sell everywhere, in one diary", line: "Bookings from other platforms, and your marketplace listing, in one place.", icon: "hd-sell-everywhere", href: "/features/sell-everywhere" },
  { title: "A free listing on Heyday Collective", line: "Our consumer site, where people go to find something to do. Free with any plan.", icon: "hd-marketplace-listing", href: "/features/marketplace-listing" },
];

/* ---- 11. The example stories ---------------------------------------- */

export type Story = {
  slug: string;
  title: string;
  icon: string;
  art: string;
};

/**
 * Every one is labelled Example, and none carries an invented name, quote,
 * logo or number. They are shapes of business, not customers.
 */
export const STORIES: Story[] = [
  { slug: "mobile-bartender", title: "A mobile bartender: from one person behind the bar to a team", icon: "hd-team-and-shifts", art: "a bartender mid-pour at an outdoor party" },
  { slug: "caterer", title: "A caterer: staffing big events without a group chat", icon: "hd-team", art: "a caterer plating canapés in a busy event kitchen, mid-service" },
  { slug: "class-host", title: "A class host: filling seats and taking private bookings", icon: "hd-classes-and-tickets", art: "a class host leaning in to help one guest, the room busy behind" },
  { slug: "performer", title: "A performer: quoting while performing every weekend", icon: "hd-instant-quotes", art: "a performer checking a phone backstage between sets" },
  { slug: "photo-booth", title: "A photo booth company: from one booth to several", icon: "hd-online-booking", art: "two people loading a photo booth into a van at the end of a night" },
  { slug: "staffing-agency", title: "An event staffing agency: shifts, checks and payouts at volume", icon: "hd-team-and-shifts", art: "a supervisor briefing a line of staff before doors open" },
  { slug: "photographer", title: "A photographer: selling workshops alongside shoots", icon: "hd-classes-and-tickets", art: "a photographer checking the back of the camera while a group watches" },
];

/* ---- 12. Grows with you --------------------------------------------- */

export const STAGES: { title: string; line: string; icon: string }[] = [
  { title: "Doing it all yourself", line: "Quotes, bookings and payments that give you your evenings back.", icon: "hd-instant-quotes" },
  { title: "Owner-operator", line: "Automations and follow-ups carry the routine.", icon: "hd-automations" },
  { title: "A team", line: "Shift offers, checks and pay, all in one place.", icon: "hd-team-and-shifts" },
  { title: "It runs itself", line: "You oversee the exceptions.", icon: "hd-integrations" },
];

/* ---- 14. Switching --------------------------------------------------- */

export const SWITCHING: { title: string; note: string; icon: string }[] = [
  { title: "Bring your clients and bookings with you.", note: "[to confirm]", icon: "hd-tasks" },
  { title: "Let the AI suggest your settings.", note: "Coming soon", icon: "hd-ai-replies" },
  { title: "Talk to a real person when you need one.", note: "[support hours to confirm]", icon: "hd-one-inbox" },
];

/* ---- 9. The AI dial ------------------------------------------------- */

/*
 * Homepage section 9, from docs/heyday/reference/section-9 (Russell's pack,
 * 15 September 2026). It replaces the three static panels — Draft, Draft
 * and train, Autopilot — which are still in git history and in the
 * superseded block of spec/01 section 9.
 *
 * The copy is the pack's, word for word. Two lines matter more than they
 * look:
 *
 * - The line under the heading names the non-message things. Without it
 *   the section shrinks to "AI writes your emails" and the whole
 *   difference from Jobber and HoneyBook is lost. Never cut it for length.
 * - The closing line says the first setting is not "off". There is no dead
 *   setting at the bottom of the dial, and that is the point.
 *
 * [needs approval] The level names. "Assistant / Semi-automatic / Fully
 * automatic" is the pack's current wording; "Remind me / Ask me / Just do
 * it" was considered and is warmer but less clear in a settings screen.
 */

export type DialLevel = {
  /** The button, and the bold start of the sentence. */
  name: string;
  /** The caption at the stop on the dial. */
  stop: string;
  say: string;
  /** The smaller line under the sentence. */
  beneath: string;
  card: {
    flag: string;
    title: string;
    sub: string;
    /** Muted words before the controls. */
    lead?: string;
    /** The first one is the card's single action. */
    controls: string[];
    /** Below a dashed rule: it asks to be trusted with more. */
    trust?: { bold: string; rest: string };
  };
};

export const AI_DIAL = {
  label: "the ai",
  heading: "AI that works the way you want it to.",
  line: "As much or as little as you want. Not just replies — quoting, pricing, taking bookings, ordering supplies, chasing money and every job task run at a level you set. Start where you’re comfortable. Move it up when it’s earned it.",
  /** Semi-automatic: the page at rest shows the approve-and-go story. */
  defaultLevel: 1,
  levels: [
    {
      name: "Assistant",
      stop: "assistant",
      say: "It tells you what needs doing, and who should do it. You do it.",
      beneath: "Nothing happens without you.",
      card: {
        flag: "Needs doing",
        title: "Transport not arranged",
        sub: "Friday 12th · Meadow Hall · 6 crew",
        lead: "Suggested: Sam, ops",
        controls: ["Assign"],
      },
    },
    {
      name: "Semi-automatic",
      stop: "semi-auto",
      say: "It gets everything ready and waits. You read it, you approve it, it goes.",
      beneath: "One click instead of twenty minutes.",
      card: {
        flag: "Ready for you",
        title: "Van hire, 8am–6pm Friday",
        sub: "£48.20 · Meadow Hall · cheapest of 3 quotes",
        controls: ["Approve", "Change"],
        trust: {
          bold: "You have approved this 11 times without changing it.",
          rest: "Shall I start doing it myself?",
        },
      },
    },
    {
      name: "Fully automatic",
      stop: "fully auto",
      say: "It does it, and writes down what it did.",
      beneath: "For the jobs you’ve stopped thinking about.",
      card: {
        flag: "Done",
        title: "Van hire booked, 8am–6pm Friday",
        sub: "£48.20 paid and logged to the job · Sam and the client sent tracking",
        lead: "Did I get this right?",
        controls: ["Yes", "Nearly", "No"],
      },
    },
  ] as DialLevel[],
  /*
   * Added 16 September 2026, at Russell's request: the dial showed control
   * but barely argued for it, so the section needed copy that sells being
   * in charge of how much runs itself.
   *
   * Each point is something the product does elsewhere on the site rather
   * than a new claim. In order: the dial's own three levels and the pack's
   * "start where you're comfortable"; the pack's line that the same three
   * choices apply to every job task separately; and the fully automatic
   * card, which writes down what it did and what it cost.
   */
  control: [
    {
      title: "You set it, and you can unset it.",
      line: "Start where you’re comfortable. Move it up when it has earned it, and move it back down whenever you want.",
    },
    {
      title: "One job at a time, not all or nothing.",
      line: "Let quoting run itself while payments still wait for your say-so. Every part of the work has its own setting.",
    },
    {
      title: "Nothing happens quietly.",
      line: "Every automatic action is written down — what it did, what it cost and who it told — so you can check it after the fact.",
    },
  ],
  closing: {
    bold: "The same three choices on quoting, pricing, bookings, ordering, chasing money and every job task.",
    rest: "The first setting isn’t “off” — it still tells you what needs doing and offers to hand it to someone.",
  },
  button: { label: "See how it works", href: "/features/ai" },
};

/* ---- 8. Build it your way -------------------------------------------- */

export const BUILDER_POINTS: { line: string; icon: string }[] = [
  { line: "Start from a ready-made workflow for your kind of business.", icon: "hd-automations" },
  { line: "Every step says what it does in plain words.", icon: "hd-ai-replies" },
  { line: "Test it on yourself before it goes live.", icon: "hd-tasks" },
];
