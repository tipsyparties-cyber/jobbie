import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {/* Clears the fixed bar: the announcement strip plus the 72px row. */}
      <main className="pt-[7.2rem]">{children}</main>
      <div className="flex justify-center py-8">
        <a href="#top" className="text-ink/30 hover:text-ink/60 transition-colors text-2xl" style={{ display: "inline-block" }}>^</a>
      </div>
      <SiteFooter />
    </>
  );
}
