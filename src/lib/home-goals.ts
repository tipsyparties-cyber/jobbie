import { BLUE, LAVENDER, SKY, SAGE, YELLOW } from "@/lib/palette";

/* ==================================================================== *
 *  The goal tabs — spec part 1, homepage section 3a.
 *
 *  "What do you want more of?" Five reasons an owner arrives, each one
 *  answered by what Heyday actually does about it. Modelled on
 *  getjobber.com's Get Noticed / Win Jobs / Work Smarter / Boost Profits
 *  pills.
 *
 *  Every number in `cards` is EXAMPLE DATA and the panel says so on the
 *  picture. These sit where a rival prints its own customers' results;
 *  Heyday has no customers yet, so inventing numbers here would be the
 *  exact thing rule 1 of the brief forbids. DECISIONS-NEEDED has the open
 *  question about whether real results ever replace them.
 *
 *  `stat` is a row number in the stats bank, never a figure typed in.
 *  "More hands" has none, because there is no credible statistic for
 *  shift-filling and a borrowed one would be worse than silence.
 * ==================================================================== */

export type Goal = {
  id: string;
  /** The pill. */
  pill: string;
  colour: string;
  heading: string;
  line: string;
  cta: { label: string; href: string };
  /** A row in lib/stats-bank, or null where there is no honest figure. */
  stat: number | null;
  /** Example data. Labelled as such on the panel. */
  cards: { label: string; value: string; change?: string }[];
  /** The art direction for the holding image, and its alt text. */
  art: string;
  /** What the product screen in the corner shows. */
  screen: {
    title: string;
    rows: { text: string; meta?: string; hot?: boolean }[];
    action: string;
  };
};

export const GOALS: Goal[] = [
  {
    id: "more-bookings",
    pill: "More bookings",
    colour: BLUE,
    heading: "Win the booking before the next business replies.",
    line: "Instant quotes, online booking and follow-ups that stop the moment they reply, so enquiries turn into bookings while you work.",
    cta: { label: "See Win the client", href: "/how-it-works/win-the-client" },
    stat: 1,
    cards: [
      { label: "Enquiries this week", value: "32", change: "↑ 22%" },
      { label: "First reply in", value: "40 sec" },
      { label: "Booked online", value: "18", change: "↑ 13%" },
    ],
    art: "a couple on a sofa booking on a phone, smiling",
    screen: {
      title: "New enquiry",
      rows: [
        { text: "Saturday, 40 guests", meta: "from the booking page" },
        { text: "Quote drafted", meta: "0m 40s", hot: true },
      ],
      action: "Send quote",
    },
  },
  {
    id: "more-time",
    pill: "More time",
    colour: LAVENDER,
    heading: "Stop doing the admin at midnight.",
    line: "Replies drafted for you, reminders and chasing that run themselves, and one inbox for every message. You handle the exceptions.",
    cta: { label: "See how it works", href: "/how-it-works" },
    stat: 20,
    cards: [
      { label: "Admin this week", value: "3 hrs", change: "↓ 8 hrs" },
      { label: "Messages answered", value: "128" },
      { label: "Follow-ups sent", value: "31" },
    ],
    art: "an owner closing a laptop and heading out in the evening light",
    screen: {
      title: "Today",
      rows: [
        { text: "12 replies drafted", meta: "waiting for you" },
        { text: "Approve all", meta: "1 tap", hot: true },
      ],
      action: "Approve and send",
    },
  },
  {
    id: "more-hands",
    pill: "More hands",
    colour: SKY,
    heading: "Fill every shift without the group chat.",
    line: "Offer the job to the right people and let the first yes take it. Clashes, travel and kit lists are checked before the day.",
    cta: { label: "See Run the day", href: "/how-it-works/run-the-day" },
    stat: null,
    cards: [
      { label: "Shifts filled", value: "12 of 12" },
      { label: "Filled in", value: "8 min" },
      { label: "Clashes caught", value: "3" },
    ],
    art: "a crew in matching aprons setting up a bar together",
    screen: {
      title: "Saturday, 6pm",
      rows: [
        { text: "Offered to 9 people", meta: "the right ones" },
        { text: "Team member accepted", meta: "first yes", hot: true },
      ],
      action: "Confirm the shift",
    },
  },
  {
    id: "more-money",
    pill: "More money, on time",
    colour: SAGE,
    heading: "Get paid without chasing anyone.",
    line: "Deposits when they book, balances collected before the day, reminders that stop once it's paid, and your team paid from the job.",
    cta: { label: "See Get paid", href: "/how-it-works/get-paid" },
    stat: 6,
    cards: [
      { label: "Paid on time", value: "96%", change: "↑ 18%" },
      { label: "Overdue", value: "$0" },
      { label: "Tips this month", value: "$640" },
    ],
    art: "an owner smiling at a payment notification, a van behind them",
    screen: {
      title: "Payments",
      rows: [
        { text: "Deposit taken on booking", meta: "automatic" },
        { text: "Balance collected", meta: "before the day", hot: true },
      ],
      action: "Pay the team",
    },
  },
  {
    id: "more-regulars",
    pill: "More regulars",
    colour: YELLOW,
    heading: "Turn one booking into a regular.",
    line: "Next-day feedback, a referral code before the review ask, and win-back messages that go out at the right moment.",
    cta: { label: "See Get rebooked", href: "/how-it-works/get-rebooked" },
    stat: 8,
    cards: [
      { label: "Average rating", value: "4.9 ★" },
      { label: "Referrals", value: "14", change: "↑ 13%" },
      { label: "Booked again", value: "9" },
    ],
    art: "guests hugging the host at the end of a party",
    screen: {
      title: "The day after",
      rows: [
        { text: "Feedback asked", meta: "next morning" },
        { text: "Referral code sent", meta: "before the review ask", hot: true },
      ],
      action: "Ask for the review",
    },
  },
];

/** The quote slot, said once and signed Placeholder. */
export const GOAL_QUOTE = (goal: string) =>
  `A real customer quote about ${goal} goes here once one is approved.`;
