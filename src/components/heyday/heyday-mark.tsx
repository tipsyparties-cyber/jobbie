"use client";

import { useEffect, useRef } from "react";
import { Mark, reducedMotion, type ShapeName } from "@/lib/heyday-mark";

/* ==================================================================== *
 *  The Heyday sun — design brief A11.
 *
 *  A thin React wrapper over the ported engine. The engine owns one rAF
 *  loop for every mark on the page, so this component does as little as
 *  possible: create, drive, destroy.
 *
 *  Three behaviours, and the brief is specific about when each runs:
 *
 *  - `bounceOnLoad`   the header, once, and that is all.
 *  - `morphInView`    a section's mark starts as the sun and becomes its
 *                     shape as it scrolls in, on the rise timing (A6).
 *                     Always via the sun, so you see where each shape comes
 *                     from.
 *  - `cycle`          the footer, slowly through the six shapes.
 *
 *  It only animates while on screen — an IntersectionObserver sets
 *  `visible`, which is what the engine checks before spending a frame on
 *  spin or flow. With reduced motion it shows the finished shape, still.
 * ==================================================================== */

/**
 * Bounce once per session, not once per route change.
 *
 * Module scope rather than component state: the header remounts on every
 * navigation, and a mark that hops each time reads as a page still
 * loading. Kept here rather than in the header so anything asking for
 * bounceOnLoad gets the same restraint for free.
 */
let bounced = false;

export function HeydayMark({
  shape = "sun",
  sun,
  size = 120,
  className = "",
  bounceOnLoad = false,
  morphInView = false,
  cycle,
  label,
}: {
  /** The shape it settles on. */
  shape?: ShapeName;
  /** The sun's colour. Never black, never orange (A11). */
  sun?: string;
  size?: number;
  className?: string;
  bounceOnLoad?: boolean;
  /** Start as the sun, become `shape` when scrolled into view. */
  morphInView?: boolean;
  /**
   * Cycle these shapes, one every `cycle.every` ms.
   *
   * The footer runs forever. `once` runs a single pass and then rests as
   * the sun, which is what the homepage closing block asks for: a
   * flourish as you arrive, not a thing still moving behind the last
   * decision on the page.
   */
  cycle?: { shapes: ShapeName[]; every?: number; once?: boolean };
  /** Give it a label where it carries meaning; omit where it is decoration. */
  label?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const markRef = useRef<Mark | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // Remount-safe: the engine appends its own paths, so clear anything a
    // previous mount left behind.
    svg.innerHTML = "";

    // Starting as the sun is what makes the morph legible — you see the
    // shape fold out of something you recognise.
    const start: ShapeName = morphInView || cycle ? "sun" : shape;
    const mark = new Mark(svg, wrapRef.current, start, { sun });
    markRef.current = mark;

    if (bounceOnLoad && !bounced) {
      bounced = true;
      mark.bounce();
    }

    let timer: ReturnType<typeof setInterval> | null = null;
    let io: IntersectionObserver | null = null;
    let morphed = false;

    if (cycle && !reducedMotion()) {
      let i = 0;
      const shapes = cycle.shapes;
      timer = setInterval(() => {
        i += 1;
        if (cycle.once && i >= shapes.length) {
          if (timer) clearInterval(timer);
          mark.morph("sun", 600);
          return;
        }
        i %= shapes.length;
        // Back through the sun between two shapes (A11).
        mark.morph("sun", 600).then(() => mark.morph(shapes[i], 900));
      }, cycle.every ?? 5000);
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          mark.visible = entry.isIntersecting;
          if (entry.isIntersecting && morphInView && !morphed) {
            morphed = true;
            if (reducedMotion()) {
              mark.morph(shape, 0);
            } else {
              mark.morph(shape, 900);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      io.observe(svg);
    } else if (morphInView) {
      mark.morph(shape, reducedMotion() ? 0 : 900);
    }

    return () => {
      if (timer) clearInterval(timer);
      io?.disconnect();
      mark.destroy();
    };
  }, [shape, sun, bounceOnLoad, morphInView, cycle]);

  return (
    <span
      ref={wrapRef}
      className={`inline-block ${className}`}
      style={{ width: size, height: size, transformOrigin: "50% 85%" }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg ref={svgRef} width={size} height={size} viewBox="0 0 100 100" />
    </span>
  );
}

/**
 * The still versions, from `public/icons/heyday-section-marks.svg`.
 *
 * For every place the brief says "small and still" — the Product menu, the
 * feature breadcrumbs — and for anywhere a live morph would be noise.
 */
export function SectionMark({
  shape,
  size = 24,
  className = "",
  colour,
}: {
  shape: ShapeName;
  /** A string is allowed so a mark can fill its box, e.g. "100%". */
  size?: number | string;
  className?: string;
  colour?: string;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      className={className}
      style={colour ? { color: colour } : undefined}
    >
      <use href={`/icons/heyday-section-marks.svg#hd-shape-${shape}`} />
    </svg>
  );
}
