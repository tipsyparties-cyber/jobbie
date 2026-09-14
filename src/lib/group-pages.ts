import type { GroupId } from "@/lib/groups";

/* ==================================================================== *
 *  The six group pages' copy — template T3, spec part 2, and the working
 *  page at docs/heyday/reference/site/group-win-the-client.html.
 *
 *  One entry per group. Everything else on the page is generated from the
 *  twelve-step flow and the feature data, so this file only holds what is
 *  genuinely written rather than derived.
 *
 *  `statRow` is a row number in the stats bank, never a figure. Two groups
 *  have no credible published statistic and say nothing rather than
 *  borrowing one from a neighbouring claim — that is what the empty rows
 *  in STATS-BANK.md's "pages with no credible statistic yet" list means in
 *  practice.
 *
 *  The examples carry no invented names, numbers or businesses. They are
 *  situations — "a couple wants a cocktail bar for 80 guests" — which is a
 *  shape of job, not a customer.
 * ==================================================================== */

export type GroupPage = {
  /** The search title. */
  title: string;
  /** The H1, and the phrase inside it that takes the marker. */
  headline: string;
  highlight: string;
  stepsHeading: string;
  stepsHighlight: string;
  featuresHeading: string;
  featuresHighlight: string;
  /** The more-info row: which feature it is about, and its detail. */
  headlineFeature: string;
  rowHighlight: string;
  rowDetailHeading: string;
  /** The statistic. A row number, and the big number as it prints. */
  statRow: number;
  statBig: string;
  examplesHeading: string;
  examplesHighlight: string;
  examples: { who: string; situation: string; art: string }[];
};

export const GROUP_PAGES: Record<GroupId, GroupPage> = {
  "get-ahead": {
    title: "Get ahead: set up once, before the first enquiry",
    headline: "Ready before the first enquiry.",
    highlight: "before the first enquiry",
    stepsHeading: "Set it up once, and it stays set.",
    stepsHighlight: "once",
    featuresHeading: "Everything in place before anyone asks.",
    featuresHighlight: "before anyone asks",
    headlineFeature: "ai-setup-assistant",
    rowHighlight: "an afternoon",
    rowDetailHeading: "Your prices, rules and team, ready to go.",
    statRow: 20,
    statBig: "11 hours",
    examplesHeading: "Set up in an afternoon, not a month.",
    examplesHighlight: "not a month",
    examples: [
      {
        who: "A mobile bar",
        situation:
          "has a price list in a spreadsheet, packages in an old PDF and travel rules in their head. All three go in once, and every quote after that uses them.",
        art: "an owner at a kitchen table with a laptop and a printed price list",
      },
      {
        who: "A class host",
        situation:
          "is moving from a ticketing site. Past guests, upcoming sessions and prices come across, so the diary is not empty on day one.",
        art: "a host setting out a class table before guests arrive",
      },
    ],
  },

  "get-found": {
    title: "Get found: a booking page, a listing and ads that pay",
    headline: "Be the one they find.",
    highlight: "the one they find",
    stepsHeading: "Found, and worth finding.",
    stepsHighlight: "worth finding",
    featuresHeading: "People find you, and you know which efforts pay.",
    featuresHighlight: "which efforts pay",
    headlineFeature: "booking-page",
    rowHighlight: "a price and a date",
    rowDetailHeading: "A page that prices and books, not one that collects emails.",
    statRow: 17,
    statBig: "40%",
    examplesHeading: "Found at eleven at night, booked by midnight.",
    examplesHighlight: "booked by midnight",
    examples: [
      {
        who: "A photo booth company",
        situation:
          "gets most of its enquiries after 9pm, when people are planning. The booking page prices and takes the deposit while everyone is asleep.",
        art: "guests laughing in a photo booth at a wedding",
      },
      {
        who: "A caterer",
        situation:
          "spends on ads but cannot tell which clicks became bookings. Real booking value goes back to the ad platform, so the spend follows the money.",
        art: "a caterer plating canapés in a busy event kitchen",
      },
    ],
  },

  "win-the-client": {
    title: "Win the client: instant quotes, follow-ups and instant booking",
    headline: "Win the client, even while you’re busy.",
    highlight: "even while you’re busy",
    stepsHeading: "Caught, priced, followed up, booked.",
    stepsHighlight: "booked",
    featuresHeading: "From first message to booked.",
    featuresHighlight: "to booked",
    headlineFeature: "quotes",
    rowHighlight: "work out the price",
    rowDetailHeading: "Every enquiry caught, priced, followed up and booked.",
    statRow: 2,
    statBig: "Nearly 7×",
    examplesHeading: "Booked before the next business replies.",
    examplesHighlight: "before the next business replies",
    examples: [
      {
        who: "A couple",
        situation:
          "wants a cocktail bar for 80 guests on a Saturday in June, two hours from you. They see the price, pick the package and pay the deposit before you’ve finished your shift.",
        art: "a couple on a sofa looking at a phone together, smiling",
      },
      {
        who: "A class host",
        situation:
          "has twelve seats in Saturday’s pottery class, and a bachelorette party asking for a private session. Both book in the same diary.",
        art: "a pottery class mid-session, hands on clay, a teacher leaning in",
      },
    ],
  },

  "run-the-day": {
    title: "Run the day: the planning, the team and the day itself",
    headline: "The planning, the team and the day itself, handled.",
    highlight: "handled",
    stepsHeading: "From confirmed to delivered.",
    stepsHighlight: "to delivered",
    featuresHeading: "The right people, in the right place, on the day.",
    featuresHighlight: "on the day",
    headlineFeature: "shift-offers",
    rowHighlight: "fill one shift",
    rowDetailHeading: "Offered to the right people. First yes takes it.",
    statRow: 14,
    statBig: "78.6%",
    examplesHeading: "Nobody texting the group chat on a Friday night.",
    examplesHighlight: "on a Friday night",
    examples: [
      {
        who: "An event staffing agency",
        situation:
          "needs forty-one people across a weekend. The shifts go out to everyone who fits, and the first yes takes each one, with clashes and travel checked before anything is confirmed.",
        art: "a supervisor briefing a line of staff before doors open",
      },
      {
        who: "A mobile bar",
        situation:
          "has two jobs on the same Saturday and one bartender who could do either. The clash is caught before the second booking is confirmed, not on the morning.",
        art: "a bartender loading crates into a van at dawn",
      },
    ],
  },

  "get-paid": {
    title: "Get paid: deposits, balances, invoices and team pay",
    headline: "Every payment in. Every payout out.",
    highlight: "Every payout out",
    stepsHeading: "Paid, without chasing anyone.",
    stepsHighlight: "without chasing anyone",
    featuresHeading: "The money in, the money out, and what’s left.",
    featuresHighlight: "what’s left",
    headlineFeature: "payments",
    rowHighlight: "chasing clients",
    rowDetailHeading: "Every payment in. Every payout out. No chasing.",
    statRow: 6,
    statBig: "59%",
    examplesHeading: "The balance collected before the van is loaded.",
    examplesHighlight: "before the van is loaded",
    examples: [
      {
        who: "A private chef",
        situation:
          "takes a deposit when the date is booked and the balance seven days before, both without asking. The reminders stop the moment it is paid.",
        art: "a chef checking a phone between prep tasks",
      },
      {
        who: "A staffing agency",
        situation:
          "pays forty people from the hours they actually worked, with expenses and tips in the same run, rather than rebuilding it in a spreadsheet on Monday.",
        art: "a supervisor with a tablet at the end of an event",
      },
    ],
  },

  "get-rebooked": {
    title: "Get rebooked: reviews, referrals and win-backs",
    headline: "Happy customers come back, and bring their friends.",
    highlight: "and bring their friends",
    stepsHeading: "The day after, and the year after.",
    stepsHighlight: "the year after",
    featuresHeading: "One booking, then the next one.",
    featuresHighlight: "then the next one",
    headlineFeature: "reviews",
    rowHighlight: "asking for the review",
    rowDetailHeading: "The referral code first, then the review ask.",
    statRow: 8,
    statBig: "25–95%",
    examplesHeading: "Asked at the moment they’re happiest.",
    examplesHighlight: "at the moment they’re happiest",
    examples: [
      {
        who: "A photographer",
        situation:
          "delivers the gallery, and the referral code and the review ask follow in the right order, the next morning, without anyone remembering to send them.",
        art: "a photographer checking the back of the camera while a group watches",
      },
      {
        who: "A class host",
        situation:
          "has a Tuesday in February looking thin. The offer goes to the guests most likely to book that date, not to the whole list.",
        art: "guests laughing around a class table, glasses raised",
      },
    ],
  },
};
