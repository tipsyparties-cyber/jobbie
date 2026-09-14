import type { Metadata } from "next";
import { PageHero } from "@/components/heyday/page-shell";
import { Sheet, Wrap } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { HeydayMark } from "@/components/heyday/heyday-mark";
import { Button } from "@/components/ui/button";
import { SITE, CTA } from "@/lib/site";
import { PAPER, BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  /login — template T16.
 *
 *  A placeholder, and deliberately not a sign-in form.
 *
 *  There are no accounts, so a username and password box would be a
 *  form that cannot succeed — and worse, a box people type real
 *  passwords into. Some of those would be passwords they use elsewhere.
 *  An empty sign-in form on a site with no accounts is a small security
 *  problem dressed as a placeholder.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Log in to ${SITE.name}`,
  description: "Heyday opens with early access.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        label="log in"
        h1="There’s nothing to log in to yet."
        highlight="nothing to log in to"
        sub={`${SITE.name} opens with early access, a few businesses at a time.`}
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <div className="mx-auto max-w-[52ch] py-6 text-center">
              <div className="mb-6 flex justify-center">
                <HeydayMark size={72} sun={BLUE} morphInView />
              </div>
              <p className="hd-sub mx-auto">
                Accounts open with early access. When yours is ready
                you&rsquo;ll get an invite, and this is where you&rsquo;ll
                sign in.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href={CTA.comingSoon.href} variant="primary" arrow>
                  {CTA.comingSoon.label}
                </Button>
                <Button href="/" variant="ghost">
                  Back to home
                </Button>
              </div>
              {/* Why there is no form. Worth saying, because an empty
                  sign-in box is the thing people expect here. */}
              <p className="mx-auto mt-8 max-w-[46ch] font-mono text-xs leading-relaxed text-ink/55">
                There is no sign-in form on this page on purpose. There are
                no accounts yet, so a password box could only collect
                passwords it has nowhere to send — and some of those would
                be passwords people use elsewhere.
              </p>
            </div>
          </SectionReveal>
        </Wrap>
      </Sheet>
    </>
  );
}
