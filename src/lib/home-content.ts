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
import type { MarkMotion } from "@/components/heyday/heyday-logo";

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

/* ---- 9. The AI levels ------------------------------------------------ */

/* The mark gets livelier as the level rises: still while it waits for you,
   beating while it is learning from you, turning for good once it is on its
   own. Three of the logo spec's seven animations, in that order. */
export const AI_LEVELS: {
  title: string;
  line: string;
  motion?: MarkMotion;
  soon?: boolean;
}[] = [
  { title: "Draft", line: "It writes, you send." },
  { title: "Draft and train", line: "It learns from every correction.", motion: "beat" },
  {
    title: "Autopilot",
    line: "It handles the simple ones by itself.",
    motion: "spin",
    soon: true,
  },
];

/* ---- 8. Build it your way -------------------------------------------- */

export const BUILDER_POINTS: { line: string; icon: string }[] = [
  { line: "Start from a ready-made workflow for your kind of business.", icon: "hd-automations" },
  { line: "Every step says what it does in plain words.", icon: "hd-ai-replies" },
  { line: "Test it on yourself before it goes live.", icon: "hd-tasks" },
];
