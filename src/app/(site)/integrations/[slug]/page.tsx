import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageHero,
  CTABlock,
  Breadcrumbs,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Icon } from "@/components/heyday/icon";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import {
  INTEGRATIONS,
  integrationBySlug,
  CATEGORY_LABELS,
} from "@/lib/integrations";
import { featureBySlug, featureHref } from "@/lib/heyday-features";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  /integrations/[slug] — one page per connection, HoneyBook's pattern.
 *
 *  Three things each: what it connects, how, and its status. The status
 *  is "Coming soon" on every one of them, because nothing is connected.
 *
 *  The marketplace pages carry one extra clause — "following their own
 *  rules" — because bringing bookings across from another platform is
 *  subject to that platform's terms, and stating it unconditionally would
 *  be a promise Heyday is not in a position to make.
 * ==================================================================== */

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = integrationBySlug(slug);
  if (!i) return {};
  return {
    title: `${i.name} and ${SITE.name} | ${SITE.name}`,
    description: i.line,
  };
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const it = integrationBySlug(slug);
  if (!it) notFound();

  const related = INTEGRATIONS.filter(
    (i) => i.category === it.category && i.slug !== it.slug
  );

  return (
    <>
      <PageHero
        crumbs={
          <Breadcrumbs
            items={[
              { label: "Integrations", href: "/integrations" },
              {
                label: CATEGORY_LABELS[it.category],
                href: `/integrations#${it.category}`,
              },
              { label: it.name },
            ]}
          />
        }
        label={CATEGORY_LABELS[it.category].toLowerCase()}
        h1={`${it.name} and ${SITE.name}`}
        sub={it.line}
        chips={<StatusChip />}
        actions={
          <>
            <Button href={CTA.comingSoon.href} variant="primary" arrow>
              {CTA.comingSoon.label}
            </Button>
            <Button href="/integrations" variant="ghost">
              All integrations
            </Button>
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-2">
            <SectionReveal>
              <SheetLabel>what it connects</SheetLabel>
              <p className="m-0 text-lg leading-relaxed">{it.what}</p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <SheetLabel>how it works</SheetLabel>
              <p className="m-0 text-lg leading-relaxed">{it.how}</p>
            </SectionReveal>
          </div>

          {/* Said on every one of these pages, because it is true on every
              one of them and a visitor may only ever read this page. */}
          <p className="mt-10 max-w-[70ch] font-mono text-xs leading-relaxed text-ink/55">
            This connection is not built yet. We use {it.name}&rsquo;s name
            rather than their logo until we have permission to use it.
          </p>
        </Wrap>
      </Sheet>

      {/* The features this connection serves. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>related features</SheetLabel>
            <h2 className="hd-h2">
              What it&rsquo;s <span className="hd-hl">for</span>.
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {it.features.map((fs) => {
              const f = featureBySlug(fs);
              if (!f) return null;
              return (
                <Card
                  key={fs}
                  className="flex h-full flex-col gap-2 p-6"
                  style={{ backgroundColor: PAPER }}
                >
                  <Icon name={f.icon} size={40} ground={PAPER} />
                  <b className="font-display text-[17px] font-bold leading-tight">
                    {f.name}
                  </b>
                  <Link
                    href={featureHref(fs)}
                    className="mt-auto pt-3 font-display text-sm font-semibold underline underline-offset-[3px]"
                  >
                    See it →
                  </Link>
                </Card>
              );
            })}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {related.length ? (
        <Sheet colour={PAPER}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>also in {CATEGORY_LABELS[it.category].toLowerCase()}</SheetLabel>
            </SectionReveal>
            <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Card
                  key={r.slug}
                  className="flex h-full flex-col gap-2 p-6"
                  style={{ backgroundColor: PAPER }}
                >
                  <b className="font-display text-[19px] font-bold">{r.name}</b>
                  <p className="m-0 text-[15px] text-ink/60">{r.line}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <StatusChip />
                    <Link
                      href={`/integrations/${r.slug}`}
                      className="font-display text-sm font-semibold underline underline-offset-[3px]"
                    >
                      See it →
                    </Link>
                  </div>
                </Card>
              ))}
            </RevealGroup>
          </Wrap>
        </Sheet>
      ) : null}

      <CTABlock />
    </>
  );
}
