import {
  Cormorant_Garamond,
  DM_Sans,
  Inter,
  Plus_Jakarta_Sans,
  Schibsted_Grotesk,
  Geist_Mono,
} from "next/font/google";

/* ==================================================================== *
 *  The type system — design brief A3.
 *
 *  Four faces, each with one job. No serif: Cormorant Garamond reads
 *  wedding-soft, which is HoneyBook's territory and the thing Heyday is
 *  most at risk of being mistaken for.
 * ==================================================================== */

/**
 * Hero headline. Plus Jakarta Sans stands in for PP Mori, which gsap.com
 * uses and which is a paid Pangram Pangram licence. If Mori is ever
 * bought, this is the only line that changes.
 */
export const hero = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hero-face",
  display: "swap",
});

/**
 * Headings, buttons and card titles.
 *
 * The brief's first choice is Cabinet Grotesk, the face Magic8 uses. It is
 * free from Fontshare rather than Google, so it needs self-hosting with
 * `next/font/local` and a licence check before shipping. Schibsted Grotesk
 * is the brief's own named Google fallback, so the build runs on that until
 * the licence is confirmed — a swap of this one declaration.
 */
export const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

/** Body. */
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Small labels, step numbers, stat sources and the { braced } labels.
 * 12–13px with 0.02em tracking. This is the techy note, and it only works
 * while it stays rare.
 */
export const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

/**
 * Retired from the Heyday pages, kept only so the agency routes still
 * compile until they are removed in Phase 7.
 */
export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

/**
 * The logo word, and nothing else — logo spec § 2.
 *
 * DM Sans Bold is a brand requirement, not a type choice: the spec names
 * the face, the weight, the case and the tracking. It is loaded at one
 * weight and used by one component, so it costs a single file.
 */
export const logo = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-logo",
  display: "swap",
});
