import type { Metadata } from "next";
import PageView from "@/components/site/PageView";
import SiteShell from "@/components/site/SiteShell";
import { loadChrome, loadPage } from "@/lib/content";

const page = loadPage("/");
const chrome = loadChrome();

export const metadata: Metadata = {
  title: page.title,
  description: page.desc,
};

export default function HomePage() {
  return (
    <SiteShell chrome={chrome}>
      <PageView page={page} chrome={chrome} />
    </SiteShell>
  );
}
