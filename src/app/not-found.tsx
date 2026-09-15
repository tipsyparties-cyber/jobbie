import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Wrap } from "@/components/heyday/sheet";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  404 — template T16, spec part 5.
 *
 *  The sun bounces and turns into the Loop, which is the one place on the
 *  site where a bit of charm is the right response: somebody has hit a
 *  dead end and the page should be light about it rather than apologetic.
 *
 *  Links to Home, Features and Pricing, per the spec — the three places
 *  a lost visitor most often actually wanted.
 * ==================================================================== */

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-paper pt-[72px]">
        <Wrap>
          <div className="mx-auto max-w-[52ch] py-28 text-center">
            <div className="mb-7 flex justify-center">
              {/* Click round: the mark turns 45 degrees, once. A wrong
                  turn, which is what this page is. */}
              <HeydayLogo
                size={96}
                colour={BLUE}
                motion="click"
                label="The Heyday mark"
              />
            </div>
            <p className="hd-label">404</p>
            <h1
              className="mb-4 font-hero font-extrabold leading-none tracking-[-0.035em]"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              This page took <span className="hd-hl">the day off</span>.
            </h1>
            <p className="hd-sub mx-auto">
              It might have moved, or it never existed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/" variant="primary" arrow>
                Back to home
              </Button>
              <Button href="/features" variant="ghost">
                Features
              </Button>
              <Button href="/pricing" variant="ghost">
                Pricing
              </Button>
            </div>
            <p className="mt-8 font-mono text-xs text-ink/55">
              Looking for something that used to be here?{" "}
              <Link href="/help" className="underline underline-offset-2">
                {SITE.name} help
              </Link>
              .
            </p>
          </div>
        </Wrap>
      </main>
      <SiteFooter />
    </>
  );
}
