import type { Metadata } from "next";
import HomeView from "@/components/site/HomeView";
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
      <HomeView page={page} chrome={chrome} />
    </SiteShell>
  );
}
