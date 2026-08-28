import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/components/site/PageView";
import SiteShell from "@/components/site/SiteShell";
import { loadChrome, loadManifest, loadPage, slugToPath } from "@/lib/content";

export function generateStaticParams() {
  return loadManifest()
    .paths.filter((p) => p !== "/")
    .map((p) => ({ slug: p.split("/").filter(Boolean) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slugToPath(slug);
  try {
    const page = loadPage(path);
    return { title: page.title, description: page.desc };
  } catch {
    return { title: "Black Pearl Painters" };
  }
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slugToPath(slug);
  if (path === "/seo-audit/") notFound();
  let page;
  try {
    page = loadPage(path);
  } catch {
    notFound();
  }
  const chrome = loadChrome();
  return (
    <SiteShell chrome={chrome}>
      <PageView page={page} chrome={chrome} />
    </SiteShell>
  );
}
