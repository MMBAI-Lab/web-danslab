import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppDetailPage from "@/components/pages/AppDetailPage";
import { getApp, getAppSlugs } from "@/lib/apps";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAppSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: getApp("es", slug)?.name ?? "Apps" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const app = getApp("es", slug);
  if (!app) notFound();
  return <AppDetailPage lang="es" app={app} />;
}
