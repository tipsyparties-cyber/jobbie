"use client";

import { useEffect, useRef, useState } from "react";
import { HeydayLogo, type MarkMotion } from "@/components/heyday/heyday-logo";
import { BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  The mark, animating when it arrives on screen.
 *
 *  This is what replaced `morphInView` on the old sun. The old engine had
 *  to be told to morph at the moment a section scrolled in; the new mark's
 *  animations are CSS, so all this has to do is add the class once.
 *
 *  Once, deliberately. A section mark that replays every time you scroll
 *  past it turns the page into a fidget. The observer disconnects on the
 *  first intersection.
 *
 *  `HeydayLogo` itself stays a server component — most marks on the site
 *  are static art and should not ship a client bundle. This is only for
 *  the handful that are meant to move as you reach them.
 * ==================================================================== */

export function HeydayLogoInView({
  motion = "together",
  size = 64,
  colour = BLUE,
  className = "",
  label,
}: {
  motion?: MarkMotion;
  size?: number | string;
  colour?: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Nothing to observe: show it as already arrived, but on the next
      // frame rather than in the effect body. A synchronous setState here
      // costs a cascading render for a branch that only fires where there
      // is no IntersectionObserver at all.
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="inline-block leading-none">
      {/* Until it has been seen it renders as the resting mark, so there is
          never a gap where the logo is missing — the animation adds itself
          to something already correct. */}
      <HeydayLogo
        size={size}
        colour={colour}
        motion={seen ? motion : undefined}
        className={className}
        label={label}
      />
    </span>
  );
}
