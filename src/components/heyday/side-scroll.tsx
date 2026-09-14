"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ORANGE } from "@/lib/palette";

/* ==================================================================== *
 *  SideScroll — the pinned sideways scroll, design brief B6.
 *
 *  The section pins to the viewport and the row of cards travels sideways
 *  as you scroll down. The trick is that the section's HEIGHT is set from
 *  how far the track has to travel: viewport height plus the track's
 *  overflow. That is what makes the sideways distance and the scroll
 *  distance agree, so it never runs out early or keeps you pinned after
 *  the last card.
 *
 *  Twice on the homepage and nowhere else (motion table, section 5).
 *  Everywhere else a plain swipe row does the same job without taking the
 *  page's scroll away from the reader.
 *
 *  Below 760px, and under reduced motion, it becomes exactly that: a
 *  normal snap-scrolling row, no pinning, no height games. Hijacking the
 *  scroll on a phone is how you make a page impossible to get past.
 * ==================================================================== */

export function SideScroll({
  head,
  children,
  progress = true,
}: {
  /** The heading block, shown above the track inside the pin. */
  head: ReactNode;
  children: ReactNode;
  progress?: boolean;
}) {
  const secRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const still = useReducedMotion();

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;

    let extra = 0;
    let frame = 0;

    const size = () => {
      const on = window.innerWidth > 760 && !still;
      setPinned(on);
      if (!on) {
        sec.style.height = "";
        track.style.transform = "";
        extra = 0;
        return;
      }
      extra = Math.max(0, track.scrollWidth - window.innerWidth + 120);
      sec.style.height = `${window.innerHeight + extra}px`;
    };

    const draw = () => {
      frame = 0;
      if (!extra) return;
      const r = sec.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, -r.top / (sec.offsetHeight - window.innerHeight))
      );
      track.style.transform = `translateX(${-p * extra}px)`;
      sec.style.setProperty("--hd-side-progress", `${p * 100}%`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    size();
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      size();
      draw();
    });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [still]);

  return (
    <div ref={secRef} className="relative">
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "relative flex flex-col justify-center py-20"
        }
      >
        <div className="mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)] pb-[30px]">
          {head}
        </div>

        <div
          ref={trackRef}
          className={`flex gap-6 ${
            pinned
              ? "will-change-transform"
              : "snap-x snap-mandatory overflow-x-auto pb-4"
          }`}
          style={{
            paddingLeft:
              "max(clamp(16px,4vw,48px), calc((100vw - 1280px) / 2 + 48px))",
          }}
        >
          {children}
        </div>

        {progress && pinned ? (
          <div
            className="relative mx-auto mt-[34px] h-0.5 w-[min(560px,80vw)] rounded-sm bg-ink/20"
            aria-hidden
          >
            <b
              className="absolute left-0 top-[-1px] h-1 rounded"
              style={{
                backgroundColor: ORANGE,
                width: "var(--hd-side-progress, 0%)",
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** One card in the track. */
export function SideCard({
  group,
  title,
  children,
  className = "",
  style,
}: {
  group?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex w-[340px] flex-none snap-start flex-col gap-3 rounded-2xl border-2 border-ink p-6 ${className}`}
      style={{
        minHeight: 300,
        boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
        ...style,
      }}
    >
      {group ? (
        <span className="font-mono text-xs tracking-[0.04em] text-ink/55">
          {group}
        </span>
      ) : null}
      <h3 className="m-0 font-display text-[22px] font-bold leading-tight tracking-[-0.01em]">
        {title}
      </h3>
      {children}
    </div>
  );
}
