"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ORANGE, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  StickyScroll — design brief B7, HoneyBook's device.
 *
 *  The copy scrolls normally down the left; the picture on the right is
 *  stuck to the viewport and changes to match whichever block you are
 *  reading. The panel behind the picture takes that block's colour, so the
 *  section changes mood as you move through it.
 *
 *  Used on the homepage's "What it does", feature pages' "How it works",
 *  How it works, the story pages and the AI page. Never on pricing,
 *  compare, tools or articles — those are pages people SCAN, and a picture
 *  that changes under you while you are comparing two numbers is noise.
 *
 *  The blocks are 78vh so that exactly one of them is ever the obvious
 *  candidate for "the one being read". Shorter and two compete; taller and
 *  the picture sits unchanged long enough to look broken.
 *
 *  Below 1100px the stage unpins and sits above the copy, because a
 *  half-width sticky picture on a phone is just a picture that will not go
 *  away.
 * ==================================================================== */

export type StickyBlock = {
  id: string;
  label?: string;
  title: string;
  body: ReactNode;
  /** The panel colour while this block is the one being read. */
  colour?: string;
  /** The picture shown while this block is the one being read. */
  picture: ReactNode;
  links?: { label: string; href: string }[];
};

export function StickyScroll({ blocks }: { blocks: StickyBlock[] }) {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = els.indexOf(e.target as HTMLDivElement);
          if (i >= 0) setActive(i);
        });
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* The copy. The dotted line down its left edge fills in as you go,
          which is the Heyday line doing the job it does everywhere else:
          showing where you are in an order of things. */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-y-0 -left-7 hidden w-0.5 flex-col items-center justify-around bg-ink/20 lg:flex"
        >
          {blocks.map((b, i) => (
            <i
              key={b.id}
              className="h-3 w-3 rounded-full border-[1.5px] border-ink transition-colors duration-300"
              style={{
                backgroundColor: i <= active ? ORANGE : "#FBF9F6",
              }}
            />
          ))}
        </div>

        {blocks.map((b, i) => (
          <div
            key={b.id}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className="flex min-h-[78vh] flex-col justify-center"
          >
            {b.label ? (
              <p className="hd-label">{b.label}</p>
            ) : null}
            <h3
              className="mb-2.5 mt-1.5 font-display font-bold leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
            >
              {b.title}
            </h3>
            <div className="mb-3.5 max-w-[44ch] text-ink/65">{b.body}</div>
            {b.links?.length ? (
              <div className="flex flex-wrap gap-2">
                {b.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="font-display text-[13.5px] font-semibold underline underline-offset-[3px]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ) : null}

            {/* On narrow screens the stage is gone, so each block carries
                its own picture inline. */}
            <div className="mt-6 lg:hidden">{b.picture}</div>
          </div>
        ))}
      </div>

      <div className="sticky top-24 hidden h-[calc(100vh-150px)] min-h-[460px] self-start lg:block">
        <div
          className="relative grid h-full place-items-center overflow-hidden rounded-[40px] border border-ink p-10 transition-colors duration-[600ms]"
          style={{
            backgroundColor: blocks[active]?.colour ?? SKY,
            boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)",
          }}
        >
          {blocks.map((b, i) => (
            <div
              key={b.id}
              aria-hidden={i !== active}
              className="absolute inset-10 grid place-items-center transition-all duration-[400ms]"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "none" : "translateY(16px)",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              {b.picture}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
