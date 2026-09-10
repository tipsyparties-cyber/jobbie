"use client";

import { useEffect, useRef } from "react";

/**
 * Binary rain intro.
 *
 * Phase 1  rain fills the screen, top to bottom
 * Phase 2  digits inside the up+up letterforms hold hard black; every digit
 *          outside fades to pale grey, so the wordmark emerges out of the
 *          noise as a density difference rather than being drawn
 * Phase 3  the field fizzles out a few digits at a time, randomly staggered,
 *          until only up+up remains
 *
 * The caller then takes over for the rise into the header.
 */

const T_FILL = 1000;
const T_EMERGE = 2200;
const T_FIZZLE = 3600;
const T_RESOLVE = 3900;

const CELL_DESKTOP = 18;
const CELL_MOBILE = 22;
const MOBILE_MAX = 640;

const INK = "10, 10, 10";
const GHOST_ALPHA = 0.14;
const ALPHA_STEPS = 12;

/** Shared with the caller so the DOM wordmark lands exactly where the digits resolved. */
export function wordmarkSize(viewportWidth: number) {
  return Math.max(64, Math.min(viewportWidth * 0.2, 240));
}

function cellSizeFor(viewportWidth: number) {
  return viewportWidth < MOBILE_MAX ? CELL_MOBILE : CELL_DESKTOP;
}

type Part = { text: string; font: string; dx: number; dy: number; w: number };

/**
 * Lays out "up" + "+up" + "^" to mirror the DOM wordmark, which renders as:
 *   <span class="font-body font-light">up</span>
 *   <span class="font-display text-[1.15em]">+up</span>
 *   <span class="text-[0.7em] -ml-[0.15em] -top-[0.35em]">^</span>
 * The caret's em offsets resolve against its own 0.7em size, hence the 0.7 factors.
 */
function layoutWordmark(
  ctx: CanvasRenderingContext2D,
  size: number,
  sans: string,
  serif: string
): { parts: Part[]; width: number } {
  const caret = size * 0.7;
  const parts: Part[] = [
    { text: "up", font: `300 ${size}px ${sans}`, dx: 0, dy: 0, w: 0 },
    { text: "+up", font: `300 ${size * 1.15}px ${serif}`, dx: 0, dy: 0, w: 0 },
    { text: "^", font: `300 ${caret}px ${sans}`, dx: -0.15 * caret, dy: -0.35 * caret, w: 0 },
  ];

  let width = 0;
  for (const p of parts) {
    ctx.font = p.font;
    p.w = ctx.measureText(p.text).width;
    width += p.w + p.dx;
  }
  return { parts, width };
}

function drawWordmark(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  sans: string,
  serif: string
) {
  const { parts, width } = layoutWordmark(ctx, size, sans, serif);
  let x = cx - width / 2;
  const baseline = cy + size * 0.35;

  ctx.textBaseline = "alphabetic";
  for (const p of parts) {
    x += p.dx;
    ctx.font = p.font;
    ctx.fillText(p.text, x, baseline + p.dy);
    x += p.w;
  }
}

/** Pre-renders '0' and '1' at each alpha step so the hot loop is drawImage, not fillText. */
function buildGlyphs(cell: number, dpr: number) {
  const px = Math.round(cell * dpr);
  const fontSize = Math.round(cell * 0.78 * dpr);
  const glyphs: HTMLCanvasElement[][] = [];

  for (const ch of ["0", "1"]) {
    const row: HTMLCanvasElement[] = [];
    for (let a = 0; a < ALPHA_STEPS; a++) {
      const c = document.createElement("canvas");
      c.width = px;
      c.height = px;
      const g = c.getContext("2d")!;
      g.font = `${fontSize}px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = `rgba(${INK}, ${((a + 1) / ALPHA_STEPS).toFixed(3)})`;
      g.fillText(ch, px / 2, px / 2);
      row.push(c);
    }
    glyphs.push(row);
  }
  return glyphs;
}

interface Cell {
  ch: 0 | 1;
  mask: boolean;
  /** ms after fill start at which this cell first appears */
  appearAt: number;
  /** ms at which this cell begins to extinguish (non-mask cells only) */
  fizzleAt: number;
  alpha: number;
}

interface BinaryIntroProps {
  /** Fired once the field has fizzled and only the wordmark remains. */
  onResolved: () => void;
  /** Set when the caller has taken over; the canvas fades out. */
  handedOff: boolean;
}

export function BinaryIntro({ onResolved, handedOff }: BinaryIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedRef = useRef(false);
  const onResolvedRef = useRef(onResolved);
  useEffect(() => {
    onResolvedRef.current = onResolved;
  }, [onResolved]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // No rain. Resolve straight away so the wordmark simply appears.
      const t = window.setTimeout(() => {
        if (!resolvedRef.current) {
          resolvedRef.current = true;
          onResolvedRef.current();
        }
      }, 200);
      return () => window.clearTimeout(t);
    }

    const ctx = canvas.getContext("2d", { alpha: true })!;
    const rootStyle = getComputedStyle(document.documentElement);
    const sans = rootStyle.getPropertyValue("--font-sans").trim() || "system-ui, sans-serif";
    const serif = rootStyle.getPropertyValue("--font-serif").trim() || "Georgia, serif";

    let raf = 0;
    let cells: Cell[] = [];
    let cols = 0;
    let rows = 0;
    let cell = CELL_DESKTOP;
    let dpr = 1;
    let glyphs: HTMLCanvasElement[][] = [];
    let start = 0;
    let disposed = false;

    function build() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = cellSizeFor(w);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);

      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;

      glyphs = buildGlyphs(cell, dpr);

      // Build the letterform mask by rendering the wordmark offscreen and
      // reading its pixel alpha, so the mask is font-accurate.
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d")!;
      octx.fillStyle = "#000";
      drawWordmark(octx, w / 2, h / 2, wordmarkSize(w), sans, serif);
      const mask = octx.getImageData(0, 0, w, h).data;

      cells = new Array(cols * rows);
      // Each column starts falling at a slightly different moment.
      const colStart: number[] = [];
      for (let c = 0; c < cols; c++) colStart[c] = Math.random() * 260;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.min(w - 1, Math.floor((c + 0.5) * cell));
          const py = Math.min(h - 1, Math.floor((r + 0.5) * cell));
          const inMask = mask[(py * w + px) * 4 + 3] > 128;

          cells[r * cols + c] = {
            ch: Math.random() < 0.5 ? 0 : 1,
            mask: inMask,
            appearAt: colStart[c] + (r / Math.max(rows - 1, 1)) * (T_FILL - 320),
            // Staggered across the whole fizzle window so digits go out a few
            // at a time rather than all together.
            fizzleAt: T_EMERGE + Math.random() * (T_FIZZLE - T_EMERGE),
            alpha: 0,
          };
        }
      }
    }

    function frame(now: number) {
      if (disposed) return;
      if (!start) start = now;
      const t = now - start;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      const px = Math.round(cell * dpr);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cl = cells[r * cols + c];

          let target: number;
          if (t < cl.appearAt) {
            target = 0;
          } else if (t < T_EMERGE) {
            // Fill: fade in, then hold at full noise density.
            const ramp = Math.min((t - cl.appearAt) / 260, 1);
            target = ramp * (cl.mask ? 1 : 0.72);
          } else if (cl.mask) {
            target = 1;
          } else if (t < cl.fizzleAt) {
            // Emerge: everything outside the letterforms drops back to a ghost.
            target = GHOST_ALPHA;
          } else {
            target = 0;
          }

          // Ease toward the target so nothing snaps.
          cl.alpha += (target - cl.alpha) * 0.18;
          if (cl.alpha < 0.01) continue;

          const step = Math.min(ALPHA_STEPS - 1, Math.max(0, Math.round(cl.alpha * ALPHA_STEPS) - 1));
          ctx.drawImage(glyphs[cl.ch][step], Math.round(c * cell * dpr), Math.round(r * cell * dpr), px, px);
        }
      }

      // Churn a slice of the field each frame so the digits flicker.
      const churn = Math.round(cells.length * 0.02);
      for (let i = 0; i < churn; i++) {
        const cl = cells[(Math.random() * cells.length) | 0];
        cl.ch = cl.ch === 0 ? 1 : 0;
      }

      if (!resolvedRef.current && t >= T_RESOLVE) {
        resolvedRef.current = true;
        onResolvedRef.current();
      }

      raf = requestAnimationFrame(frame);
    }

    function onResize() {
      build();
    }

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] transition-opacity duration-500"
      style={{ opacity: handedOff ? 0 : 1 }}
    />
  );
}
