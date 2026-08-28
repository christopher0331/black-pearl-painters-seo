import Report from "@/components/Report";

export const metadata = {
  title: "SEO & competitive visibility — Black Pearl Painters",
  robots: { index: false, follow: false },
};

export default function SeoAuditPage() {
  return (
    <div className="audit-app">
      <header className="audit-top">
        <a href="/">← Site clone</a>
        <strong>SEO &amp; competitive visibility</strong>
        <a className="audit-live" href="https://blackpearlpainters.com/">
          Live WordPress site ↗
        </a>
      </header>
      <div className="audit-wrap" id="main">
        <Report />
      </div>
    </div>
  );
}
