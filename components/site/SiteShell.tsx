import Header from "./Header";
import Footer from "./Footer";
import type { Chrome } from "@/lib/content";

export default function SiteShell({
  chrome,
  children,
}: {
  chrome: Chrome;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header chrome={chrome} />
      {children}
      <Footer chrome={chrome} />
    </>
  );
}
