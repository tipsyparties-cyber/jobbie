import { Cormorant_Garamond, Inter, Plus_Jakarta_Sans } from "next/font/google";

export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * The hero face.
 *
 * gsap.com sets its hero in PP Mori (Pangram Pangram) — confirmed from their
 * own @font-face rules: PPMori-Regular and PPMori-SemiBold. Mori is a
 * commercial licence, so it is not bundled here: shipping their woff2 files
 * would be redistributing a licensed font we have not paid for.
 *
 * Plus Jakarta Sans is the closest free stand-in — the same low-contrast
 * geometric grotesque with a tall x-height, and it has a real 600 weight,
 * which is the weight gsap's hero actually uses.
 *
 * It is deliberately its own variable rather than a change to `sans`. If
 * Russ licenses Mori, this is the only place that changes: swap this for a
 * `next/font/local` call pointing at the woff2 files and every hero on the
 * site follows. Nothing else needs touching.
 */
export const hero = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hero-face",
  display: "swap",
});
