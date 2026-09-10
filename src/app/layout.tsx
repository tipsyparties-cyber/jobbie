import type { Metadata } from "next";
import { serif, sans } from "@/lib/fonts";
import { GsapProvider } from "@/lib/gsap-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "up+up | AI & Automation Agency",
    template: "%s | up+up",
  },
  description:
    "We use AI & automation to make businesses faster, stronger, and simpler. Bespoke automation systems built for real operations.",
  metadataBase: new URL("https://upandup.agency"),
  openGraph: {
    title: "up+up | AI & Automation Agency",
    description:
      "We use AI & automation to make businesses faster, stronger, and simpler.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "up+up | AI & Automation Agency",
    description:
      "We use AI & automation to make businesses faster, stronger, and simpler.",
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
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
