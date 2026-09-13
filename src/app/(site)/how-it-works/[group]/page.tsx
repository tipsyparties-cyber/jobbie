import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HeydayMark } from "@/components/heyday/heyday-mark";
import { Icon } from "@/components/heyday/icon";
import { MoreInfoSection } from "@/components/heyday/more-info-section";
import { GROUPS, groupById, nextGroup, type GroupId } from "@/lib/groups";
import { featuresInGroup, statusLabel } from "@/lib/heyday-features";
import { CTA, SITE } from "@/lib/site";
import { PAPER } from "@/lib/palette";
import type { ShapeName } from "@/lib/heyday-mark";

/**
 * The six group pages — template T3.
 *
 * Each one is a chapter of the twelve-step flow. The group's mark morphs
 * out of the sun on load, its features are listed, and the headline feature
 * opens with the more-info grow.
 *
 * Get rebooked points back to Get ahead, which is why the flow is a loop
 * rather than a list — and why the Loop mark sits on that group.
 */

export function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const g = groupById(group);
  if (!g) return {};
  return { title: g.name, description: g.promise };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const g = groupById(group);
  if (!g) notFound();

  const features = featuresInGroup(g.id as GroupId);
  const headline = features[0];
  const next = nextGroup(g.id);

  return (
    <div className="text-ink">
      <header style={{ backgroundColor: g.ground }}>
        <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-10">
          <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[0.02em] text-ink/55">
            <Link href="/how-it-works" className="hover:text-ink">How it works</Link>
            <span className="px-2">›</span>
            <span className="text-ink/80">{g.name}</span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-[12px] tracking-[0.02em] text-ink/50">
                {g.n} · {g.steps}
              </p>
              <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                {g.name}
              </h1>
              <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink/75">
                {g.promise}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={CTA.primary.href} variant="primary" arrow>
                  {CTA.primary.label}
                </Button>
                <Button href={CTA.secondary.href} variant="ghost">
                  {CTA.secondary.label}
                </Button>
              </div>
            </div>

            {/* Morphs out of the sun as it arrives, so you see where the
                group's shape comes from. */}
            <div className="flex justify-center lg:justify-end">
              <HeydayMark
                shape={g.shape as ShapeName}
                sun={g.sun}
                size={220}
                morphInView
                label={`${g.name}: the ${g.shape} mark`}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
          What&apos;s in {g.name.toLowerCase()}
        </h2>
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.slug} href={`/features/${f.slug}`} className="block h-full">
              <Card className="flex h-full flex-col bg-paper p-6">
                <Icon name={f.icon} size={36} ground={PAPER} />
                <p className="mt-4 font-display text-base font-semibold">{f.name}</p>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/65">
                  {f.pain}
                </p>
                <div className="mt-5">
                  <StatusChip status={statusLabel(f.status)} />
                </div>
              </Card>
            </Link>
          ))}
        </RevealGroup>
      </section>

      {/* One more-info section, for the group's headline feature. */}
      {headline && (
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <MoreInfoSection
            group={g}
            headline={headline.pain ?? headline.name}
            line={headline.searchLine ?? ""}
            detail={
              <div>
                <p className="font-display text-2xl font-semibold">{headline.name}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {features.slice(0, 4).map((f) => (
                    <div key={f.slug} className="rounded-xl border border-current/20 p-4">
                      <p className="font-display text-base font-semibold">{f.name}</p>
                      <p className="mt-1 font-body text-sm opacity-70">
                        {statusLabel(f.status)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </section>
      )}

      {/* The next group, on the line. Get rebooked loops back to the start. */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <SectionReveal>
          <Link
            href={`/how-it-works/${next.id}`}
            className="flex flex-wrap items-center justify-between gap-6 rounded-[40px] border-2 border-ink p-8"
            style={{ boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)" }}
          >
            <div>
              <p className="font-mono text-[12px] tracking-[0.02em] text-ink/50">
                Next
              </p>
              <p className="mt-2 font-display text-2xl font-semibold">
                {next.name} →
              </p>
              <p className="mt-2 max-w-md font-body text-sm text-ink/65">
                {next.promise}
              </p>
            </div>
            <HeydayMark shape={next.shape as ShapeName} sun={next.sun} size={90} />
          </Link>
        </SectionReveal>
      </section>

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
