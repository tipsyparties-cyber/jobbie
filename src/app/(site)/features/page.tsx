import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/surfaces";
import { StatusChip } from "@/components/ui/surfaces";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Icon } from "@/components/heyday/icon";
import { GROUPS } from "@/lib/groups";
import { FEATURES, featuresInGroup, statusLabel } from "@/lib/heyday-features";
import { CTA, SITE } from "@/lib/site";
import { PAPER } from "@/lib/palette";

/**
 * All features — template T4.
 *
 * Sorted by the six groups rather than alphabetically, because that is the
 * sort a business owner is doing in their head: not "what does it have" but
 * "what will it fix". Jump links stay pinned under the header.
 */

export const metadata: Metadata = {
  title: "All features",
  description: `Everything ${SITE.name} does, sorted by what it fixes: get ahead, get found, win the client, run the day, get paid and get rebooked.`,
};

export default function FeaturesIndex() {
  return (
    <div className="text-ink">
      <header className="mx-auto max-w-[1280px] px-6 pb-14 pt-10">
        <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[0.02em] text-ink/55">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="px-2">›</span>
          <span className="text-ink/80">All features</span>
        </nav>
        <h1 className="mt-10 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Everything {SITE.name} does.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          {FEATURES.length} features in six groups, from getting ready before
          the first enquiry to getting the next booking. Every one is coming
          soon while {SITE.name} is in early access.
        </p>
      </header>

      {/* Jump links. An ordinary sticky element, not the picture-changing
          sticky scroll. */}
      <div className="sticky top-[72px] z-40 border-y border-ink/12" style={{ backgroundColor: PAPER }}>
        <nav className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-6 py-3">
          {GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-ink/20 px-3.5 py-2 font-body text-sm transition-[border-radius] duration-200 hover:rounded-[28px] hover:border-ink"
            >
              <HeydayLogo size={20} colour={g.colour} />
              {g.name}
            </a>
          ))}
        </nav>
      </div>

      {GROUPS.map((g) => (
        <section key={g.id} id={g.id} className="scroll-mt-[132px]">
          <div className="mx-auto max-w-[1280px] px-6 py-16">
            <SectionReveal>
              <div className="flex items-start gap-4">
                <HeydayLogo size={40} colour={g.colour} />
                <div>
                  <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
                    {g.name}
                  </h2>
                  <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink/70">
                    {g.promise}
                  </p>
                </div>
              </div>
            </SectionReveal>

            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuresInGroup(g.id).map((f) => (
                <Link key={f.slug} href={`/features/${f.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col bg-paper p-6">
                    <Icon name={f.icon} size={36} ground={PAPER} />
                    <p className="mt-4 font-display text-base font-semibold">{f.name}</p>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/65">
                      {f.pain}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <StatusChip status={statusLabel(f.status)} />
                      {f.onlyOnHeyday && (
                        <span className="font-mono text-[11px] tracking-[0.02em] text-ink/45">
                          Only on {SITE.name}
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <div className="rounded-[40px] bg-ink px-8 py-16 text-center md:px-16">
          <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-cream">
            {SITE.promise}
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={CTA.primary.href} variant="primary" arrow>
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost" className="border-cream text-cream">
              {CTA.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
