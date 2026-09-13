import type { Metadata } from "next";
import { StyleguideBody } from "./body";

/**
 * The style guide.
 *
 * Every component and every kind of motion on one page, so Jem can check
 * them in one go instead of hunting them across the site.
 *
 * Not indexed, and not linked from anywhere. It is a tool, not a page.
 */
export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return <StyleguideBody />;
}
