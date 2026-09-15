import { CREAM, SAGE, BLUE, SKY, LAVENDER, PAPER, ORANGE, INK } from "@/lib/palette";

/* ==================================================================== *
 *  The six groups.
 *
 *  They organise the whole site: the header's Product menu, the features
 *  index, the group pages, the pricing table, the quiz results and the
 *  compare grids all read from here. "It runs itself" is the thread through
 *  all six, without being a seventh group.
 *
 *  A group is told apart by its COLOUR and its number, not by a shape of
 *  its own. There is one mark — Jem's — and the logo spec forbids redrawing
 *  it, so the six shapes the old sun morphed into are gone. The reasoning
 *  is in docs/heyday/HANDOVER.md § 3.
 *
 *  Promises are from SaaS brief 3.3 and 3.7. Colours are design brief A11;
 *  icons are A7.
 * ==================================================================== */

export type GroupId =
  | "get-ahead"
  | "get-found"
  | "win-the-client"
  | "run-the-day"
  | "get-paid"
  | "get-rebooked";

export type Group = {
  id: GroupId;
  n: string;
  name: string;
  /** The one-line promise, from SaaS brief 3.7. */
  promise: string;
  /** Which of the twelve steps this group covers. */
  steps: string;
  /** The group's own colour: its label, its rules, the ground of its cards. */
  colour: string;
  /**
   * The colour the MARK takes in this group's section.
   *
   * A11, and the logo spec's rules: the mark is never black and never
   * orange. Where the group's own colour is one of those — Run the day is
   * ink, Get ahead is orange — the mark falls back to blue rather than
   * breaking the rule.
   */
  markColour: string;
  /**
   * The ground a section of this group sits on.
   *
   * Get found's lavender is too pale to read on paper, so it sits on cream
   * instead (A11, colour notes).
   */
  ground: string;
  /** Feature icon standing in until Jem draws group icons (A7). */
  icon: string;
};

export const GROUPS: Group[] = [
  {
    id: "get-ahead",
    n: "01",
    name: "Get ahead",
    promise:
      "Ready before the first enquiry. Set up in an afternoon, with AI filling in the hard parts.",
    steps: "Step 1",
    colour: ORANGE,
    markColour: BLUE,
    ground: CREAM,
    icon: "hd-automations",
  },
  {
    id: "get-found",
    n: "02",
    name: "Get found",
    promise: "Be the one they find, and know which efforts actually pay.",
    steps: "Step 2",
    colour: LAVENDER,
    markColour: LAVENDER,
    ground: CREAM,
    icon: "hd-online-booking",
  },
  {
    id: "win-the-client",
    n: "03",
    name: "Win the client",
    promise:
      "Every enquiry caught, priced, followed up and booked, even while you're busy.",
    steps: "Steps 3 to 6",
    colour: BLUE,
    markColour: BLUE,
    ground: PAPER,
    icon: "hd-instant-quotes",
  },
  {
    id: "run-the-day",
    n: "04",
    name: "Run the day",
    promise: "The planning, the team and the day itself, handled.",
    steps: "Steps 7 to 9",
    colour: INK,
    markColour: BLUE,
    ground: PAPER,
    icon: "hd-team-and-shifts",
  },
  {
    id: "get-paid",
    n: "05",
    name: "Get paid",
    promise: "Every payment in, every payout out.",
    steps: "Step 10",
    colour: SAGE,
    markColour: SAGE,
    ground: PAPER,
    icon: "hd-payments",
  },
  {
    id: "get-rebooked",
    n: "06",
    name: "Get rebooked",
    promise: "Happy customers come back, and bring friends.",
    steps: "Steps 11 and 12",
    colour: SKY,
    markColour: SKY,
    ground: PAPER,
    icon: "hd-reviews",
  },
];

/** The thread through all six. Not a group. Wherever it appears the mark
 *  is turning — Spin, from the logo spec — because that is the claim. */
export const RUNS_ITSELF = {
  name: "It runs itself",
  colour: INK,
  markColour: BLUE,
};

export const groupById = (id: string) => GROUPS.find((g) => g.id === id);

/** The next group in the flow. Get rebooked loops back to Get ahead, which
 *  is why the last group's page points at the first (T3, item 7). */
export const nextGroup = (id: GroupId): Group => {
  const i = GROUPS.findIndex((g) => g.id === id);
  return GROUPS[(i + 1) % GROUPS.length];
};

