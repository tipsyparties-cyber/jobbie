import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES, featureBySlug } from "@/lib/features";
import { FeaturePage } from "@/components/features/feature-page";

/**
 * One route for all twenty feature pages. The words live in lib/features.ts
 * and the page lives in components/features/feature-page.tsx; this file only
 * joins them and handles metadata.
 *
 * Statically generated — every slug is known at build time, so these are
 * plain HTML rather than anything that has to run per request.
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
  const feature = featureBySlug(slug);
  if (!feature) return {};
  return {
    title: feature.name,
    description: feature.promise,
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
