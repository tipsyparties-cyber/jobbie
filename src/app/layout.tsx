import type { Metadata } from "next";
import { serif, sans, hero, display, mono } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { GsapProvider } from "@/lib/gsap-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CustomCursor } from "@/components/ui/custom-cursor";
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
      <body>
        <div className="bg-blobs" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
        </div>
        <GsapProvider>
          {children}
        </GsapProvider>
        <CustomCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
