/* ==================================================================== *
 *  The seven example stories — template T7, spec part 4, and the working
 *  page at reference/site/story-mobile-bartender.html.
 *
 *  EVERY ONE IS LABELLED EXAMPLE, and that is not a formality.
 *
 *  Jobber's equivalent pages are real named businesses with real quotes
 *  and real numbers. Heyday has no customers, so the same page shape
 *  filled with invented detail would be the most dishonest thing on the
 *  site — a fabricated customer, which the brief's first rule forbids in
 *  as many words.
 *
 *  So these describe SHAPES of business. No names, no quotes, no logos,
 *  no numbers. What they do carry is the one thing that is true and
 *  useful: which features a business of this shape would switch on, and
 *  in what order, as it grows through the four stages. That is a genuine
 *  answer to "would this work for me?", and it costs nothing invented.
 *
 *  The feature slugs are checked against the feature data at build time
 *  by `featureHref`, so a story cannot quietly point at a page that isn't
 *  there.
 * ==================================================================== */

export type StoryStage = {
  /** Which of the four growth stages. */
  stage: string;
  title: string;
  line: string;
  /** Features switched on at this stage, by slug. */
  features: string[];
  /** The illustration for this stage. Example data. */
  screen: {
    title: string;
    rows: { label: string; value: string; hot?: boolean }[];
    action: string;
  };
};

export type Story = {
  slug: string;
  /** What kind of business. Never a name. */
  kind: string;
  headline: string;
  highlight: string;
  /** What it sells, both ways. */
  sells: { service: string; experience: string };
  /** The chore that hurts most, which is why they would come looking. */
  hurt: string;
  hurtHighlight: string;
  art: string;
  /** Which of the six kinds on /who-its-for this belongs to. */
  kindSlug: string;
  stages: StoryStage[];
};

const STAGE_NAMES = [
  "doing it all yourself",
  "owner-operator",
  "a team",
  "it runs itself",
] as const;

export const STORIES: Story[] = [
  {
    slug: "mobile-bartender",
    kind: "a mobile bartender",
    headline: "From one bartender to a team run from one system.",
    highlight: "to a team run from one system",
    sells: {
      service: "bar hire for events",
      experience: "cocktail classes",
    },
    hurt: "Every booking meant dozens of steps: the quote, the chasing, the staff, the kit, the pay. Most of them were done by hand.",
    hurtHighlight: "dozens of steps",
    art: "a bartender shaking a cocktail at a guest’s party, guests laughing in the background",
    kindSlug: "events-and-hospitality",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "One person, every job.",
        line: "It started with one person delivering the cocktail class. Instant quotes and online booking meant customers could price and book a party without a phone call.",
        features: ["quotes", "online-booking", "payments"],
        screen: {
          title: "Quote · a party for 40",
          rows: [
            { label: "Guests", value: "40" },
            { label: "Hours", value: "3" },
            { label: "Package", value: "Signature" },
            { label: "Total", value: "[example]", hot: true },
          ],
          action: "Book with deposit",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "Help, without a group chat.",
        line: "As bookings grew, shifts went out as offers that freelance bartenders accept or decline, with tips shared through a QR tip jar.",
        features: ["shift-offers", "tips", "checklists-and-kit-lists"],
        screen: {
          title: "Shift offer · Sat 14 June",
          rows: [
            { label: "Bartender 1 · 4 mi · ★4.9", value: "Accepted ✓", hot: true },
            { label: "Bartender 2 · 9 mi · ★4.8", value: "offered" },
            { label: "Bartender 3 · 12 mi · ★4.7", value: "offered" },
          ],
          action: "Confirm",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "A team of bartenders.",
        line: "Hiring, checks and onboarding run in the same system, and one inbox holds every email, WhatsApp, text and call, with AI drafting the replies.",
        features: ["hiring-and-onboarding", "inbox", "replies-that-write-themselves"],
        screen: {
          title: "One client thread",
          rows: [
            { label: "Email", value: "“Can we start at 7?”" },
            { label: "WhatsApp", value: "“And add 10 guests?”" },
            { label: "Call note", value: "Wants the mocktail menu" },
            { label: "AI draft", value: "ready", hot: true },
          ],
          action: "Approve and send",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "Most steps run by themselves.",
        line: "Most of the steps in each booking run without anyone touching them. The owner handles the exceptions.",
        features: ["follow-ups", "reporting", "tasks"],
        screen: {
          title: "This morning",
          rows: [
            { label: "Bookings", value: "6 this week" },
            { label: "Money in", value: "[example]" },
            { label: "Shifts filled", value: "14 of 14" },
            { label: "Needs a person", value: "3 alerts", hot: true },
          ],
          action: "See the 3",
        },
      },
    ],
  },
  {
    slug: "caterer",
    kind: "a caterer",
    headline: "Staffing big events without a group chat.",
    highlight: "without a group chat",
    sells: { service: "catering for events", experience: "cooking classes" },
    hurt: "Every event needed a different crew, and filling it meant texting everyone and counting the replies by hand.",
    hurtHighlight: "counting the replies by hand",
    art: "a caterer plating canapés in a busy event kitchen, mid-service",
    kindSlug: "events-and-hospitality",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "Quoting between services.",
        line: "Menus and head counts turn into a price the customer can adjust, so enquiries get an answer while the kitchen is running.",
        features: ["quotes", "packages-and-memberships", "payments"],
        screen: {
          title: "Quote · 120 covers",
          rows: [
            { label: "Covers", value: "120" },
            { label: "Menu", value: "Canapés + bowl food" },
            { label: "Dietaries", value: "9 noted" },
            { label: "Total", value: "[example]", hot: true },
          ],
          action: "Send quote",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "The crew, offered not texted.",
        line: "A shift goes out to the right people at once, ranked by distance and reliability, and the first yes takes it.",
        features: ["shift-offers", "checklists-and-kit-lists", "on-the-day"],
        screen: {
          title: "Crew for Saturday",
          rows: [
            { label: "Offered to", value: "11 people" },
            { label: "Filled", value: "6 of 6", hot: true },
            { label: "Clashes caught", value: "2" },
          ],
          action: "Confirm the crew",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "Two kitchens, one diary.",
        line: "Classes and catering sit in the same diary, so a Saturday class and a Saturday wedding cannot be double-booked.",
        features: ["classes-and-tickets", "scheduling", "client-records"],
        screen: {
          title: "Saturday",
          rows: [
            { label: "10am", value: "Pasta class · 12 seats" },
            { label: "4pm", value: "Wedding · 120 covers" },
            { label: "Crew overlap", value: "checked ✓", hot: true },
          ],
          action: "Open the day",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "The routine runs itself.",
        line: "Deposits, balances, reminders, kit lists and team pay all run to the rules the owner set once.",
        features: ["invoicing", "team-pay-and-expenses", "profit-per-job"],
        screen: {
          title: "This week",
          rows: [
            { label: "Balances collected", value: "automatic" },
            { label: "Team paid", value: "from the job" },
            { label: "Profit per job", value: "[example]", hot: true },
          ],
          action: "See the report",
        },
      },
    ],
  },
  {
    slug: "class-host",
    kind: "a class host",
    headline: "Filling seats, and taking private bookings in the same diary.",
    highlight: "in the same diary",
    sells: { service: "private group bookings", experience: "public classes" },
    hurt: "Public seats sold on one platform, private groups arrived by email, and the diary lived in a spreadsheet between them.",
    hurtHighlight: "lived in a spreadsheet",
    art: "a class host leaning in to help one guest, the room busy behind",
    kindSlug: "classes-and-experiences",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "Seats that sell themselves.",
        line: "A class page takes bookings and payment at once, so nobody has to be asked twice.",
        features: ["classes-and-tickets", "booking-page", "payments"],
        screen: {
          title: "Thursday’s class",
          rows: [
            { label: "Seats", value: "12" },
            { label: "Sold", value: "9" },
            { label: "Waiting list", value: "4", hot: true },
          ],
          action: "Open more seats",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "Private groups, same diary.",
        line: "A private booking is quoted and confirmed in the same place as a public seat, so the room can never be sold twice.",
        features: ["group-bookings", "quotes", "scheduling"],
        screen: {
          title: "Private booking",
          rows: [
            { label: "Group", value: "18 people" },
            { label: "Room", value: "checked free ✓", hot: true },
            { label: "Split payment", value: "links sent" },
          ],
          action: "Confirm",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "More than one host.",
        line: "Sessions are offered to the hosts who can take them, with briefings and kit lists attached.",
        features: ["shift-offers", "team", "checklists-and-kit-lists"],
        screen: {
          title: "Next month",
          rows: [
            { label: "Sessions", value: "18" },
            { label: "Hosts assigned", value: "18 of 18", hot: true },
            { label: "Kit lists", value: "sent" },
          ],
          action: "Publish the month",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "Quiet dates fill themselves.",
        line: "Thin dates get an offer to the customers most likely to book them, and vouchers bring people back.",
        features: ["fill-quiet-dates", "gift-vouchers", "loyalty"],
        screen: {
          title: "Looking thin",
          rows: [
            { label: "Tuesday 9th", value: "3 of 12 sold" },
            { label: "Offer sent to", value: "past guests", hot: true },
            { label: "Booked since", value: "[example]" },
          ],
          action: "See the campaign",
        },
      },
    ],
  },
  {
    slug: "performer",
    kind: "a performer",
    headline: "Answering enquiries and sending quotes while performing every weekend.",
    highlight: "while performing every weekend",
    sells: { service: "shows and sets", experience: "workshops" },
    hurt: "Enquiries arrived on the nights they were working, and the ones that waited until Monday had already booked someone else.",
    hurtHighlight: "had already booked someone else",
    art: "a performer mid-set, the crowd blurred",
    kindSlug: "photo-video-and-entertainment",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "Nothing missed on a show night.",
        line: "Missed calls get a written reply within minutes, and every channel lands in one thread.",
        features: ["missed-call-capture", "inbox", "enquiries"],
        screen: {
          title: "While you were on",
          rows: [
            { label: "Missed calls", value: "3" },
            { label: "Replied within", value: "2 min", hot: true },
            { label: "Enquiries open", value: "2" },
          ],
          action: "Read them",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "A price without a phone call.",
        line: "Date, length and travel turn into a price the customer can see straight away, with the deposit in the same step.",
        features: ["quotes", "online-booking", "contracts-and-e-signatures"],
        screen: {
          title: "Quote",
          rows: [
            { label: "Date", value: "Sat 14 June" },
            { label: "Set length", value: "2 × 45 min" },
            { label: "Travel", value: "38 miles" },
            { label: "Total", value: "[example]", hot: true },
          ],
          action: "Book and sign",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "Workshops alongside the shows.",
        line: "A workshop sells seats while a show sells a date, and both sit in one diary.",
        features: ["classes-and-tickets", "scheduling", "booking-page"],
        screen: {
          title: "June",
          rows: [
            { label: "Shows", value: "9" },
            { label: "Workshops", value: "3" },
            { label: "Clashes", value: "none ✓", hot: true },
          ],
          action: "Open the diary",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "The quiet weeks get worked.",
        line: "Follow-ups chase the quotes that went quiet, and win-back messages go to last year's bookers.",
        features: ["follow-ups", "campaigns", "reviews"],
        screen: {
          title: "Running by itself",
          rows: [
            { label: "Follow-ups sent", value: "14" },
            { label: "Stopped on reply", value: "6" },
            { label: "Win-backs queued", value: "9", hot: true },
          ],
          action: "See the queue",
        },
      },
    ],
  },
  {
    slug: "photo-booth",
    kind: "a photo booth company",
    headline: "Going from one booth to several, with a team on each.",
    highlight: "with a team on each",
    sells: { service: "booth hire for events", experience: "branded activations" },
    hurt: "Two booths out on the same night meant two vans, two crews and two kit lists, all tracked on paper.",
    hurtHighlight: "all tracked on paper",
    art: "guests laughing in a photo booth at a wedding",
    kindSlug: "photo-video-and-entertainment",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "One booth, booked online.",
        line: "Date, hours and extras price themselves, and the deposit holds the date.",
        features: ["quotes", "online-booking", "payments"],
        screen: {
          title: "Booth hire",
          rows: [
            { label: "Hours", value: "4" },
            { label: "Props and prints", value: "added" },
            { label: "Deposit", value: "[example]", hot: true },
          ],
          action: "Hold the date",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "Two booths, one night.",
        line: "Each booth gets its own crew, kit list and travel time, checked before the night is confirmed.",
        features: ["shift-offers", "checklists-and-kit-lists", "on-the-day"],
        screen: {
          title: "Saturday",
          rows: [
            { label: "Booth A", value: "crew ✓ · kit ✓" },
            { label: "Booth B", value: "crew ✓ · kit ✓" },
            { label: "Travel overlap", value: "checked ✓", hot: true },
          ],
          action: "Confirm the night",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "A crew per booth.",
        line: "Hiring, checks and briefings run in the same system as the bookings.",
        features: ["hiring-and-onboarding", "team", "time-tracking"],
        screen: {
          title: "The team",
          rows: [
            { label: "Operators", value: "7" },
            { label: "Checks complete", value: "7 of 7", hot: true },
            { label: "Hours logged", value: "this week" },
          ],
          action: "Open the team",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "Where the money actually went.",
        line: "Profit per job shows which bookings paid once travel, crew and consumables are counted.",
        features: ["profit-per-job", "reporting", "team-pay-and-expenses"],
        screen: {
          title: "Last month",
          rows: [
            { label: "Bookings", value: "22" },
            { label: "Best margin", value: "[example]" },
            { label: "Worst margin", value: "[example]", hot: true },
          ],
          action: "See the report",
        },
      },
    ],
  },
  {
    slug: "staffing-agency",
    kind: "an event staffing agency",
    headline: "Shift offers, checks and payouts at volume.",
    highlight: "at volume",
    sells: { service: "staff for events", experience: "training days" },
    hurt: "Filling forty shifts a weekend meant a spreadsheet, a group chat and someone on the phone all Friday.",
    hurtHighlight: "someone on the phone all Friday",
    art: "a supervisor briefing a line of staff before doors open",
    kindSlug: "staffing-and-hire",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "One list of people.",
        line: "Every person, their checks, their skills and their availability in one record instead of four.",
        features: ["team", "hiring-and-onboarding", "policies-and-procedures"],
        screen: {
          title: "The roster",
          rows: [
            { label: "People", value: "84" },
            { label: "Checks in date", value: "81", hot: true },
            { label: "Skills tagged", value: "all" },
          ],
          action: "Open the roster",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "Shifts offered, not allocated.",
        line: "An offer goes to everyone who fits, and the first yes takes it, with clashes and travel checked first.",
        features: ["shift-offers", "scheduling", "time-tracking"],
        screen: {
          title: "This weekend",
          rows: [
            { label: "Shifts", value: "41" },
            { label: "Filled", value: "41 of 41", hot: true },
            { label: "Average fill time", value: "[example]" },
          ],
          action: "Confirm the weekend",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "The day, supervised.",
        line: "Check-in, travel times, alerts and cover if someone drops out, without anyone watching a phone.",
        features: ["on-the-day", "tasks", "client-portal"],
        screen: {
          title: "Right now",
          rows: [
            { label: "Checked in", value: "38 of 41" },
            { label: "Running late", value: "2" },
            { label: "Cover needed", value: "1", hot: true },
          ],
          action: "Offer the cover",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "Paid from the job.",
        line: "Pay comes from the hours worked and the rates set, with expenses and tips in the same run.",
        features: ["team-pay-and-expenses", "invoicing", "reporting"],
        screen: {
          title: "Payout run",
          rows: [
            { label: "People", value: "41" },
            { label: "From", value: "hours and rates" },
            { label: "Expenses", value: "included", hot: true },
          ],
          action: "Run the payout",
        },
      },
    ],
  },
  {
    slug: "photographer",
    kind: "a photographer",
    headline: "Selling workshops alongside shoots, then hiring a second shooter.",
    highlight: "then hiring a second shooter",
    sells: { service: "event and portrait shoots", experience: "photography workshops" },
    hurt: "Shoots were booked by email and workshops on a ticketing site, so neither knew about the other.",
    hurtHighlight: "neither knew about the other",
    art: "a photographer checking the back of the camera while a group watches",
    kindSlug: "photo-video-and-entertainment",
    stages: [
      {
        stage: STAGE_NAMES[0],
        title: "The shoot, quoted and signed.",
        line: "Hours, coverage and usage price themselves, and the contract is signed in the same step as the deposit.",
        features: ["quotes", "contracts-and-e-signatures", "payments"],
        screen: {
          title: "Quote · a wedding",
          rows: [
            { label: "Coverage", value: "10 hours" },
            { label: "Second shooter", value: "added" },
            { label: "Contract", value: "to sign", hot: true },
          ],
          action: "Book and sign",
        },
      },
      {
        stage: STAGE_NAMES[1],
        title: "Workshops in the same diary.",
        line: "Seats sell themselves on dates the shoots have not already taken.",
        features: ["classes-and-tickets", "scheduling", "booking-page"],
        screen: {
          title: "Autumn",
          rows: [
            { label: "Shoots", value: "14" },
            { label: "Workshops", value: "4" },
            { label: "Double bookings", value: "none ✓", hot: true },
          ],
          action: "Open the diary",
        },
      },
      {
        stage: STAGE_NAMES[2],
        title: "A second shooter.",
        line: "Dates are offered rather than arranged, with the brief and the kit list attached.",
        features: ["shift-offers", "team", "checklists-and-kit-lists"],
        screen: {
          title: "Saturday",
          rows: [
            { label: "Offered to", value: "4 shooters" },
            { label: "Accepted", value: "1", hot: true },
            { label: "Brief sent", value: "with the kit list" },
          ],
          action: "Confirm",
        },
      },
      {
        stage: STAGE_NAMES[3],
        title: "The aftercare runs itself.",
        line: "Gallery delivery, the review ask and the anniversary message all go out without being remembered.",
        features: ["reviews", "referrals", "campaigns"],
        screen: {
          title: "After the day",
          rows: [
            { label: "Gallery", value: "delivered" },
            { label: "Referral code", value: "sent first" },
            { label: "Review ask", value: "then sent", hot: true },
          ],
          action: "See the sequence",
        },
      },
    ],
  },
];

export const storyBySlug = (slug: string) =>
  STORIES.find((s) => s.slug === slug);
