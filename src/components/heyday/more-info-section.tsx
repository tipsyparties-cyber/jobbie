"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Mark, reducedMotion } from "@/lib/heyday-mark";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/heyday/motion";
import { INK, CREAM } from "@/lib/palette";
import type { Group } from "@/lib/groups";

/* ==================================================================== *
 *  More info: the shape grows into the page — design brief A12.
 *
 *  Jem's idea. The section's shape sits beside the headline; press the
 *  button and it grows around its own core until the whole section is its
 *  colour, and the detail is underneath.
 *
 *  Two details make it read as the section filling rather than as a spider
 *  expanding, and both come from the engine:
 *
 *  - `boost` swells the core to radius 46 as it grows, closing the gaps
 *    between the arrows. Without it you get a growing asterisk.
 *  - The scale is worked out from the section's own farthest corner, so it
 *    always covers and never overshoots by a random multiple.
 *
 *  Accessibility is written into the brief and is the part most likely to
 *  be skipped: aria-expanded and aria-controls on the button, the hidden
 *  layer inert, focus to "Back" on open and back to the button on close,
 *  Escape closes. With reduced motion it simply swaps.
 * ==================================================================== */

export function MoreInfoSection({
  group,
  headline,
  highlight,
  line,
  detail,
  flip = false,
  className = "",
}: {
  group: Group;
  headline: string;
  /** The phrase inside the headline that takes the yellow marker. */
  highlight?: string;
  line: string;
  detail: React.ReactNode;
  /**
   * Put the shape on the left and the copy on the right.
   *
   * The rows alternate down the page — Addendum 34's treatment, which
   * Russell asked to keep and which the prototype keeps too. Without it
   * four rows of the same shape read as a repeated component rather than
   * as four different arguments.
   */
  flip?: boolean;
  className?: string;
}) {
  const still = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const markRef = useRef<Mark | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  /** The shape's scale while it grows to cover the section. */
  const scale = useSpring(1, { duration: 900, bounce: 0 });
  const panelId = useId();

  /* The mark. It idles as its shape and, about every seven seconds, turns
     back into the sun, bounces, and returns — so you see where it came
     from without having to be told. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";
    const mark = new Mark(svg, svg.parentElement, "sun", { sun: group.sun });
    markRef.current = mark;
    mark.morph(group.shape, reducedMotion() ? 0 : 900);

    if (reducedMotion()) return () => mark.destroy();

    const t = setInterval(() => {
      if (!mark.visible) return;
      mark.morph("sun", 700).then(() => {
        mark.bounce();
        setTimeout(() => mark.morph(group.shape, 900), 400);
      });
    }, 7000);

    return () => {
      clearInterval(t);
      mark.destroy();
    };
  }, [group.shape, group.sun]);

  /**
   * How far the shape has to grow to cover the section.
   *
   * The mark is drawn on a 100-unit square and its rays reach 46% of that
   * from the core, so the scale is (distance to the farthest corner) ÷ (46%
   * of the rendered width), plus 8% of headroom (A12).
   */
  function coverScale() {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return 14;
    const s = section.getBoundingClientRect();
    const m = svg.getBoundingClientRect();
    const cx = m.left + m.width / 2;
    const cy = m.top + m.height / 2;
    const far = Math.max(
      Math.hypot(cx - s.left, cy - s.top),
      Math.hypot(s.right - cx, cy - s.top),
      Math.hypot(cx - s.left, s.bottom - cy),
      Math.hypot(s.right - cx, s.bottom - cy)
    );
    return (far / (m.width * 0.46)) * 1.08;
  }

  async function openPanel() {
    const mark = markRef.current;
    setOpen(true);
    if (still || reducedMotion() || !mark) {
      backRef.current?.focus();
      return;
    }

    // Grow around the core, slowly then fast, while the core swells to close
    // the gaps between the arrows. Both halves run together: the scale is a
    // motion value, the core swell is the engine's own `boost`.
    await Promise.all([
      scale.set(coverScale()),
      mark.to({ boost: 1 }, 900),
    ]);
    backRef.current?.focus();

    // Reset behind the detail layer, which is now covering it, so closing
    // starts from the shape's resting size rather than snapping.
    scale.jump(1);
    mark.to({ boost: 0 }, 0);
  }

  /** Focus goes back to the button that opened it — otherwise closing
   *  drops a keyboard user at the top of the document. */
  function close() {
    setOpen(false);
    (buttonRef.current?.querySelector("a,button") as HTMLElement | null)?.focus();
  }

  /* Escape closes, wherever focus is inside the section. Declared after
     close() so the component reads in the order it runs. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onInk = group.colour === INK;

  return (
    <div
      ref={sectionRef}
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundColor: open ? group.colour : "transparent" }}
    >
      {/* Resting content and detail share one grid cell, so the section is
          tall enough for whichever is showing and does not jump. */}
      <div className="grid">
        <div
          className="col-start-1 row-start-1 mx-auto grid w-full max-w-[1280px] items-center gap-10 px-[clamp(16px,4vw,48px)] pb-[150px] pt-[110px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          style={{ visibility: open ? "hidden" : "visible" }}
          inert={open}
        >
          <div className={flip ? "lg:order-2" : undefined}>
            <SectionReveal>
              <p className="hd-label">{group.name.toLowerCase()}</p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <h3
                className="m-0 mb-4 font-display font-bold leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", textWrap: "balance" }}
              >
                {highlight ? (
                  <>
                    {headline.split(highlight)[0]}
                    <span className="hd-hl">{highlight}</span>
                    {headline.split(highlight)[1]}
                  </>
                ) : (
                  headline
                )}
              </h3>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <p className="hd-sub">{line}</p>
            </SectionReveal>
            <SectionReveal delay={0.45}>
              <div ref={buttonRef}>
                <Button
                  variant="ghost"
                  arrow
                  onClick={openPanel}
                  aria-expanded={open}
                  aria-controls={panelId}
                >
                  How it fits together
                </Button>
              </div>
            </SectionReveal>
          </div>

          <div
            className={`relative z-[1] flex justify-center ${flip ? "lg:order-1" : ""}`}
          >
            <motion.span
              className="inline-block w-[min(100%,320px)]"
              style={{
                aspectRatio: "1",
                transformOrigin: "50% 88%",
                scale,
              }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className="block h-full w-full overflow-visible"
              />
            </motion.span>
          </div>
        </div>

        {/* The detail layer. */}
        <motion.div
          id={panelId}
          className="col-start-1 row-start-1 mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)] pb-[150px] pt-[110px]"
          style={{ pointerEvents: open ? "auto" : "none", color: onInk ? CREAM : INK }}
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
          transition={{ duration: open ? 0.45 : 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          inert={!open}
        >
          {detail}
          <div className="mt-10">
            <button
              ref={backRef}
              onClick={close}
              className="inline-flex h-12 items-center rounded-lg border px-[22px] font-display text-base font-semibold transition-[border-radius] duration-200 ease-in-out hover:rounded-[28px] focus-visible:rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
              style={{ borderColor: onInk ? CREAM : INK, color: onInk ? CREAM : INK }}
            >
              Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
