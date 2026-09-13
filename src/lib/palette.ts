/**
 * The palette — design brief A2 and B2.
 *
 * The pastels came from honeybook.com, which the design brief is candid
 * about: the colours alone will not tell the two apart. What does is
 * orange on every action, ink outlines, hard shadows and the sun marks.
 *
 * One file, because the ground map, the section marks, the group colours
 * and every tinted card read from it. Two copies would drift, and a drifted
 * ground is the one bug that never shows in a diff.
 *
 * Every ground here clears WCAG AA against INK for body text.
 */

/** Text, outlines, offset shadows, icon strokes. */
export const INK = "#0A0A0A";

/**
 * Heyday orange — the action colour, and the thing that most separates this
 * from HoneyBook.
 *
 * Two rules, both from A2, and both easy to break by accident:
 *
 *  1. It is a FILL, never a text colour. Orange text on cream fails
 *     contrast. Buttons are orange with INK text: ink on orange is about
 *     6:1 and passes AA, white on orange does not.
 *  2. Orange and yellow never touch — no orange button on a yellow ground,
 *     no yellow highlight beside an orange button. Where they would meet,
 *     the button goes ink instead.
 */
export const ORANGE = "#F26B2A";

/** Resting ground. */
export const CREAM = "#F2E9E1";
/** Cards, and the quieter of the two grounds. */
export const PAPER = "#FBF9F6";
export const SAGE = "#9AAD92";
export const BLUE = "#93B7E8";
/** BLUE lifted toward white — soft enough to read as air, dark enough that
 *  paper still shows against it. */
export const SKY = "#AEC9EE";
/** Pale enough that a mark drawn in it disappears on paper, which is why
 *  the Signal section sits on cream (A11, colour notes). */
export const LAVENDER = "#D6D0F5";
/**
 * Highlights only — a marker behind one phrase per screen, or a sticker.
 * Never a ground, and never touching orange.
 */
export const YELLOW = "#FCFC72";

/** Text on an ink ground. */
export const CREAM_ON_INK = CREAM;
