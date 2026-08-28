import Report from "@/components/Report";

export const metadata = {
  title: "SEO & competitive visibility — Black Pearl Painters",
  robots: { index: false, follow: false },
};

export default function SeoAuditPage() {
  return (
    <div className="audit-wrap">
      <Report />
    </div>
  );
}
