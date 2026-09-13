import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES, featureBySlug } from "@/lib/heyday-features";
import { FeaturePage } from "@/components/heyday/feature-page";
import { SITE } from "@/lib/site";

/**
 * All forty-six feature pages, from one template and one data file.
 *
 * Statically generated: every slug is known at build time, so these are
 * plain HTML rather than anything that runs per request.
 */

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = featureBySlug(slug);
  if (!f) return {};
  // The title uses the search line's words, as the brief asks, so the page
  // answers the search someone actually typed.
  return {
    title: f.name,
    description: f.searchLine ?? `${f.name} — ${SITE.name}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  if (!feature) notFound();
  return <FeaturePage feature={feature} />;
}
