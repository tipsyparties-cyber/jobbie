import type { Metadata, Viewport } from "next";
import { serif, sans, hero, display, mono } from "@/lib/fonts";
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
   * A paper H on a blue tile — the colours the Heyday sun takes on a
   * blue ground (A11). Not orange: orange is the action colour, and a
   * favicon is not an action.
   *
   * Not the sun, which spec A9 asks for. At 16px the sun's eight strokes
   * turn to mush, for the same reason the icon family has `-small`
   * versions at 24px and under. The app icon matches the favicon rather
   * than using the sun at 180px, because two icons for one product is
   * worse than one that diverges from the spec.
   *
   */
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hero.variable} ${display.variable} ${mono.variable}`}>
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
