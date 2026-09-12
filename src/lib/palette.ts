/**
 * The palette, taken from honeybook.com.
 *
 * Lives here rather than in the page because the ground map, the gsap-structure
 * sections and the showcase tiles all need the same values. Two copies would
 * drift, and a drifted ground is the one bug you cannot see in a diff.
 *
 * All six clear WCAG AA against `--color-ink` (#0A0A0A) for body text.
 */

export const CREAM = "#F2E9E1";
export const SAGE = "#9AAD92";
export const BLUE = "#93B7E8";
/** The loudest of the set. One screen only — it stops being an accent the
 *  moment it appears twice. */
export const YELLOW = "#FCFC72";
export const PAPER = "#FBF9F6";
/** Most saturated. A moment of emphasis, not a resting ground. */
export const LAVENDER = "#D6D0F5";
