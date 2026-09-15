import type { Metadata, Viewport } from "next";
import { serif, sans, hero, display, mono, logo } from "@/lib/fonts";
import { SITE, PROJECT } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/**
 * Locally the tab leads with the PROJECT name — "Heyday Jobbie" — so
 * this repo can be told apart at a glance from the Heyday marketplace
 * project, which shares the brand and nothing else. Project name first,
 * because tabs truncate from the right and the first word is the only
 * one you can rely on seeing.
 *
 * In production the tab says Heyday, because that is the product.
 */
const isDev = process.env.NODE_ENV === "development";

/** Cream, the site's ground — so the browser chrome matches the page. */
export const viewport: Viewport = {
  themeColor: "#F2E9E1",
};

export const metadata: Metadata = {
  title: isDev
    ? { default: PROJECT, template: `${PROJECT} · %s` }
    : {
        default: `${SITE.name} — ${SITE.promise}`,
        template: `%s | ${SITE.name}`,
      },
  description: SITE.description,
  metadataBase: new URL("https://heyday.app"),
  openGraph: {
    title: `${SITE.name} — ${SITE.promise}`,
    description: SITE.description,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.promise}`,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  /**
   * The mark, from the logo pack's own files — logo spec § 5.
   *
   * These replace the 160×153 screenshot crop that stood in while there
   * was no source file. Each size is the pack's, built from its 512 with
   * its own 1px of air; none of them is a smaller one scaled up, which is
   * what the spec asks for and what keeps 16px legible.
   *
   * **The transparent mark, not the blue tile.** Russell's call — the
   * spec left it open for Jem (§ 5, "Still open") and it is now decided.
   * The mark sits on whatever the browser's tab strip is, light or dark.
   *
   * The SVG goes first, because a browser that takes it gets a mark that
   * is sharp at any size and on any display. The PNGs are the fallback,
   * each built by the pack from its own 512 rather than scaled down from
   * a bigger one.
   *
   * The 16 is the burst alone. That is deliberate in the pack: the arcs
   * close up and turn to mush at that size, so they are dropped rather
   * than drawn badly.
   *
   * THE HOME-SCREEN ICON IS NOT A FAVICON and stays the badge — the mark
   * in paper on a solid blue square. iOS masks an app icon to a squircle
   * and paints black behind anything transparent, so a transparent mark
   * there would be a black tile with a hole in it.
   */
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hero.variable} ${display.variable} ${mono.variable} ${logo.variable}`}>
      {/* Cream, which is the site's ground. Sections paint their own
          colour over it; this is what shows in the gaps and behind the
          rounded tops. */}
      <body className="bg-cream">
        {/* Skip link: the first thing a keyboard user reaches, on every
            page (spec A8). */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
