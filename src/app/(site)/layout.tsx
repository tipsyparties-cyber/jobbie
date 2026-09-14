import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SheetStack } from "@/components/heyday/sheet-stack";

/* ==================================================================== *
 *  Every page except the homepage.
 *
 *  The shell lives here rather than in each page, which is what makes a
 *  site of forty pages feel like one site. Pages return their sheets and
 *  nothing else.
 *
 *  `SheetStack` is the wiring behind <Sheet>: it stacks the sections in
 *  document order and runs the colour fade between them. Putting it in
 *  the layout means a new page gets that for free and cannot forget it.
 *
 *  The 72px of top padding clears the fixed header. It used to be 115px,
 *  for an announcement bar that was never built — spec A4 leaves it to
 *  Jem — so every inner page carried 43px of empty space above its
 *  heading.
 * ==================================================================== */

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SheetStack>
      <SiteHeader />
      <main id="main" className="pt-[72px]">
        {children}
      </main>
      <SiteFooter />
    </SheetStack>
  );
}
