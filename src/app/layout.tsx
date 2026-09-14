import type { Metadata } from "next";
import { serif, sans, hero, display, mono } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/**
 * Locally the tab leads with the product name, so this project can be told
 * apart at a glance from the other site running on localhost. Name first
 * because tabs truncate from the right.
 */
const isDev = process.env.NODE_ENV === "development";

export const metadata: Metadata = {
  title: isDev
    ? { default: SITE.name, template: `${SITE.name} · %s` }
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
  icons: {
    icon: "/favicon.svg",
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
