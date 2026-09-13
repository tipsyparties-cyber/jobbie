import { CREAM, SAGE, BLUE, SKY, LAVENDER, PAPER, ORANGE, INK } from "@/lib/palette";
import type { ShapeName } from "@/lib/heyday-mark";

/* ==================================================================== *
 *  The six groups.
 *
 *  They organise the whole site: the header's Product menu, the features
 *  index, the group pages, the pricing table, the quiz results and the
 *  compare grids all read from here. "It runs itself" is the thread through
 *  all six, and has its own mark (Infinity) without being a seventh group.
 *
 *  Promises are from SaaS brief 3.3 and 3.7. Shapes and colours are design
 *  brief A11; icons are A7.
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
  /** The mark this group folds into (A11). */
  shape: ShapeName;
  /** The shape's own colour. */
  colour: string;
  /**
   * The colour the SUN takes in this group's section.
   *
   * A11: the sun is never black and never orange. Where the group's own
   * colour is one of those — Run the day is ink, Get ahead is orange — the
   * sun falls back to blue rather than breaking the rule.
   */
  sun: string;
  /**
   * The ground a section of this group sits on.
   *
   * Signal is lavender, which is too pale to read on paper, so Get found
   * sits on cream instead (A11, colour notes).
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
    shape: "sunrise",
    colour: ORANGE,
    sun: BLUE,
    ground: CREAM,
    icon: "hd-automations",
  },
  {
    id: "get-found",
    n: "02",
    name: "Get found",
    promise: "Be the one they find, and know which efforts actually pay.",
    steps: "Step 2",
    shape: "signal",
    colour: LAVENDER,
    sun: LAVENDER,
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
    shape: "connect",
    colour: BLUE,
    sun: BLUE,
    ground: PAPER,
    icon: "hd-instant-quotes",
  },
  {
    id: "run-the-day",
    n: "04",
    name: "Run the day",
    promise: "The planning, the team and the day itself, handled.",
    steps: "Steps 7 to 9",
    shape: "dial",
    colour: INK,
    sun: BLUE,
    ground: PAPER,
    icon: "hd-team-and-shifts",
  },
  {
    id: "get-paid",
    n: "05",
    name: "Get paid",
    promise: "Every payment in, every payout out.",
    steps: "Step 10",
    shape: "paid",
    colour: SAGE,
    sun: SAGE,
    ground: PAPER,
    icon: "hd-payments",
  },
  {
    id: "get-rebooked",
    n: "06",
    name: "Get rebooked",
    promise: "Happy customers come back, and bring friends.",
    steps: "Steps 11 and 12",
    shape: "loop",
    colour: SKY,
    sun: SKY,
    ground: PAPER,
    icon: "hd-reviews",
  },
];

/** The thread through all six. Not a group, but it has a mark. */
export const RUNS_ITSELF = {
  name: "It runs itself",
  shape: "inf" as ShapeName,
  colour: INK,
  sun: BLUE,
};

export const groupById = (id: string) => GROUPS.find((g) => g.id === id);

/** The next group in the flow. Get rebooked loops back to Get ahead, which
 *  is the point of the Loop mark sitting there (T3, item 7). */
export const nextGroup = (id: GroupId): Group => {
  const i = GROUPS.findIndex((g) => g.id === id);
  return GROUPS[(i + 1) % GROUPS.length];
};

/**
 * The sun's colour on a plain ground, where no group owns the section
 * (A11): blue on cream and paper, paper on blue, sage and sky, sky on ink.
 */
export function sunOn(ground: string): string {
  if (ground === INK) return SKY;
  if (ground === BLUE || ground === SAGE || ground === SKY) return PAPER;
  return BLUE;
}
