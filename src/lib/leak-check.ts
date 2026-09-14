import type { GroupId } from "@/lib/groups";

/* ==================================================================== *
 *  The leak check — template T14, spec part 5, and the working page at
 *  reference/site/leak-check.html.
 *
 *  Sixteen questions, scored per group, modelled on getjobber.com's Home
 *  Service Score. No email wall: the result appears on the page, and the
 *  only thing asked for afterwards is early access, which is a link and
 *  not a gate.
 *
 *  Every question is about the READER'S business, not about Heyday. That
 *  is what makes the tool worth doing even for someone who never signs
 *  up, and it is also why nothing here needs approving: none of it is a
 *  claim about a product that does not exist yet.
 *
 *  The answers are ordered worst to best and score 0 to 3, so a group's
 *  score is a plain percentage of what was available. No weighting and no
 *  curve — a score that has been massaged is one you cannot explain when
 *  someone asks how they got it.
 *
 *  Nothing is stored or sent. The page says so twice.
 * ==================================================================== */

export type Question = {
  id: string;
  group: GroupId;
  q: string;
  /** Worst first. Index is the score, 0 to 3. */
  answers: string[];
};

export const QUESTIONS: Question[] = [
  /* --- Get ahead (2) --- */
  {
    id: "prices-written-down",
    group: "get-ahead",
    q: "Are your prices written down somewhere you can quote from?",
    answers: [
      "I work each one out from scratch",
      "I have rough numbers in my head",
      "A price list I have to interpret",
      "A price list anyone could quote from",
    ],
  },
  {
    id: "rules-written-down",
    group: "get-ahead",
    q: "Are your rules — deposits, travel, cancellations — written down?",
    answers: [
      "No, I decide each time",
      "Some are, in different places",
      "Mostly, in one document",
      "Yes, and everyone who quotes knows them",
    ],
  },

  /* --- Get found (2) --- */
  {
    id: "book-without-asking",
    group: "get-found",
    q: "Can a customer see a price and book without speaking to you?",
    answers: [
      "No, everything goes through me",
      "They can enquire, but not price it",
      "They can price some things",
      "Yes, price and book, any time",
    ],
  },
  {
    id: "know-what-works",
    group: "get-found",
    q: "Do you know which of your marketing actually brings bookings?",
    answers: [
      "No idea",
      "A rough sense",
      "I know enquiry numbers, not bookings",
      "I know what each source is worth in bookings",
    ],
  },

  /* --- Win the client (5) --- */
  {
    id: "reply-speed",
    group: "win-the-client",
    q: "How long does a new enquiry usually wait for a first reply?",
    answers: [
      "A day or more, if I'm busy",
      "Later the same day",
      "Within a couple of hours",
      "Within minutes, day or night",
    ],
  },
  {
    id: "quote-speed",
    group: "win-the-client",
    q: "How long from enquiry to a price in their hands?",
    answers: [
      "Days, sometimes",
      "About a day",
      "A few hours",
      "Straight away",
    ],
  },
  {
    id: "missed-calls",
    group: "win-the-client",
    q: "What happens when you can't answer the phone?",
    answers: [
      "Nothing. They call someone else",
      "Voicemail, and I ring back when I can",
      "I ring back the same day",
      "They get a written reply within minutes",
    ],
  },
  {
    id: "follow-ups",
    group: "win-the-client",
    q: "What happens to a quote that goes quiet?",
    answers: [
      "Nothing",
      "I chase it if I remember",
      "I chase most of them",
      "It's chased automatically, and stops when they reply",
    ],
  },
  {
    id: "channels",
    group: "win-the-client",
    q: "How many places do you have to check for customer messages?",
    answers: [
      "Four or more",
      "Three",
      "Two",
      "One",
    ],
  },

  /* --- Run the day (3) --- */
  {
    id: "double-booking",
    group: "run-the-day",
    q: "How would you find out about a double booking?",
    answers: [
      "When someone turns up",
      "When I next look at the diary",
      "I check carefully before confirming",
      "It's checked before I can confirm",
    ],
  },
  {
    id: "filling-shifts",
    group: "run-the-day",
    q: "How do you fill a shift?",
    answers: [
      "Text everyone and count the replies",
      "A group chat",
      "I ask people in order until someone says yes",
      "It's offered to the right people and the first yes takes it",
    ],
  },
  {
    id: "kit",
    group: "run-the-day",
    q: "How often does something get forgotten on the day?",
    answers: [
      "Most jobs",
      "Now and then",
      "Rarely, because I check everything myself",
      "There's a list per job, and it's checked off",
    ],
  },

  /* --- Get paid (2) --- */
  {
    id: "deposits",
    group: "get-paid",
    q: "Do you take a deposit when someone books?",
    answers: [
      "No",
      "Sometimes, for big jobs",
      "Usually, if I remember to ask",
      "Always, in the same step as the booking",
    ],
  },
  {
    id: "chasing",
    group: "get-paid",
    q: "Who chases an unpaid balance?",
    answers: [
      "Me, eventually, when I notice",
      "Me, on a Sunday",
      "Me, but I have a system",
      "Nobody. Reminders go out and stop once it's paid",
    ],
  },

  /* --- Get rebooked (2) --- */
  {
    id: "reviews",
    group: "get-rebooked",
    q: "How often do you ask for a review?",
    answers: [
      "Almost never",
      "When I remember, and when it went well",
      "Most jobs",
      "Every job, the next day, automatically",
    ],
  },
  {
    id: "rebooking",
    group: "get-rebooked",
    q: "What brings a past customer back?",
    answers: [
      "They get in touch, or they don't",
      "I post on social media",
      "I email my list sometimes",
      "They're asked at the right moment, automatically",
    ],
  },
];

/** What a score in each band means. Plain, and not flattering. */
export function band(pct: number): { label: string; line: string } {
  if (pct >= 80)
    return {
      label: "Tight",
      line: "Little is slipping here. Whatever you've built is working.",
    };
  if (pct >= 55)
    return {
      label: "Holding",
      line: "It works while you're on top of it. It's the busy weeks that cost you.",
    };
  if (pct >= 30)
    return {
      label: "Leaking",
      line: "Bookings and money are going out of here regularly.",
    };
  return {
    label: "Wide open",
    line: "This is where most of it is going. Start here.",
  };
}

export const MAX_PER_ANSWER = 3;
