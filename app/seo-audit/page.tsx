import Report from "@/components/Report";
import SiteShell from "@/components/site/SiteShell";
import { loadChrome } from "@/lib/content";

export const metadata = {
  title: "SEO & competitive visibility — Black Pearl Painters",
  robots: { index: false, follow: false },
};

export default function SeoAuditPage() {
  const chrome = loadChrome();
  return (
    <SiteShell chrome={chrome}>
      <div className="audit-wrap" id="main">
        <Report />
      </div>
    </SiteShell>
  );
}
