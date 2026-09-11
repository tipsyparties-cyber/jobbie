"use client";

import { useEffect, useRef } from "react";

/**
 * Binary rain intro.
 *
 * Phase 1  rain fills the screen, top to bottom
 * Phase 2  characters inside the up+up letterforms hold hard black; every
 *          character outside settles to a ghost, so the wordmark emerges out of
 *          the noise as a density difference rather than being drawn
 * Phase 3  on scroll, the wordmark *travels up the page still made of code* —
 *          characters darken ahead of it and lighten behind it as it climbs.
 *          Only once it reaches the header does the caller swap in black text.
 *
 * The field never fizzles out. It stays a living matrix for the whole intro,
 * and the wordmark is only ever the part of that matrix held dark — which is
 * what lets the logo travel *through* the code rather than across a blank page.
 *
 * The mask is built ONCE at a reference size and position, then sampled
 * through an inverse transform. Re-rendering the wordmark offscreen and
 * re-reading its pixels every frame would be far too slow, and it is
 * unnecessary — moving and scaling the sample point gives the same result.
 */

const T_FILL = 900;
const T_EMERGE = 1900;
/** Field is settled and the wordmark is waiting to travel. */
const T_SETTLED = 2100;

const CELL_DESKTOP = 18;
const CELL_MOBILE = 22;
const MOBILE_MAX = 640;

const INK = "10, 10, 10";

/**
 * The three alphas the field moves between. The gap between FIELD and MARK is
 * what makes the wordmark readable, and it is deliberately narrow: at 0.2
 * against a solid 1.0 the field looked washed out and the logo looked stamped
 * on. 0.26 against 0.68 is about 2.6:1, which still reads clearly on a light
 * ground but lets the wordmark sit *in* the matrix rather than on top of it.
 */
const FIELD_ALPHA = 0.26;
const MARK_ALPHA = 0.68;
/** While the rain is still falling, before the wordmark separates out. */
const FILL_ALPHA = 0.44;

const ALPHA_STEPS = 12;

/** The characters the field rains — the wordmark's own letters. */
const CHARS = ["u", "p", "+"];

/** Where the travelling wordmark comes to rest, in px from the top. */
const HEADER_Y = 30;
/** How much it shrinks on the way up. It cannot shrink to the header's actual
 *  1.5rem — that is smaller than a single character cell, so the code form
 *  would stop being legible. It shrinks to a size that still reads as
 *  characters, and the caller swaps in the real logo on arrival. */
const TRAVEL_SCALE = 0.42;

/** Shared with the caller so the DOM wordmark matches the code one. */
export function wordmarkSize(viewportWidth: number) {
  return Math.max(76, Math.min(viewportWidth * 0.26, 320));
}

/** Weight the mask is drawn at, and the weight the DOM wordmark resolves at. */
export const MASK_WEIGHT = 600;

/**
 * Extra thickness added to the letterforms, as a fraction of font size.
 * Sized to pull in roughly one more ring of cells — enough to read as solid,
 * but not so much that the counters inside the p's close up.
 */
const MASK_FATTEN = 0.03;

/** Alpha a cell centre must clear to count as inside a letterform. */
const MASK_THRESHOLD = 48;

function cellSizeFor(viewportWidth: number) {
  return viewportWidth < MOBILE_MAX ? CELL_MOBILE : CELL_DESKTOP;
}

type Part = { text: string; font: string; dx: number; dy: number; w: number };

/**
 * Lays out "up" + "+up" + "^" to mirror the DOM wordmark, which renders as:
 *   <span class="font-body font-light">up</span>
 *   <span class="font-display text-[1.15em]">+up</span>
 *   <span class="text-[0.7em] -ml-[0.15em] -top-[0.35em]">^</span>
 * The caret's em offsets resolve against its own 0.7em size, hence the 0.7
 * factors.
 */
function layoutWordmark(
  ctx: CanvasRenderingContext2D,
  size: number,
  sans: string,
  serif: string
): { parts: Part[]; width: number } {
  const caret = size * 0.7;
  const parts: Part[] = [
    { text: "up", font: `${MASK_WEIGHT} ${size}px ${sans}`, dx: 0, dy: 0, w: 0 },
    { text: "+up", font: `${MASK_WEIGHT} ${size * 1.15}px ${serif}`, dx: 0, dy: 0, w: 0 },
    { text: "^", font: `${MASK_WEIGHT} ${caret}px ${sans}`, dx: -0.15 * caret, dy: -0.35 * caret, w: 0 },
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
  // Stroke as well as fill: the stroke straddles the outline, so half of its
  // width pushes the letterform outwards and pulls extra cells into the mask.
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = size * MASK_FATTEN * 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const p of parts) {
    x += p.dx;
    ctx.font = p.font;
    ctx.strokeText(p.text, x, baseline + p.dy);
    ctx.fillText(p.text, x, baseline + p.dy);
    x += p.w;
  }
}

/** Pre-renders each character at each alpha step so the hot loop is drawImage, not fillText. */
function buildGlyphs(cell: number, dpr: number) {
  const px = Math.round(cell * dpr);
  const fontSize = Math.round(cell * 0.78 * dpr);
  const glyphs: HTMLCanvasElement[][] = [];

  for (const ch of CHARS) {
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
  /** Index into CHARS */
  ch: number;
  /** ms after fill start at which this cell first appears */
  appearAt: number;
  alpha: number;
}

interface BinaryIntroProps {
  /** Fired once the code wordmark has finished travelling to the header. */
  onArrived: () => void;
  /** Set by the caller when the viewer scrolls down: starts the climb. */
  travel: boolean;
}

export function BinaryIntro({ onArrived, travel }: BinaryIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const travelRef = useRef(travel);
  const arrivedRef = useRef(false);
  const onArrivedRef = useRef(onArrived);

  useEffect(() => {
    travelRef.current = travel;
  }, [travel]);
  useEffect(() => {
    onArrivedRef.current = onArrived;
  }, [onArrived]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    /** Alpha channel of the reference mask, one byte per screen pixel. */
    let mask: Uint8Array | null = null;
    let w = 0;
    let h = 0;
    /** Eased 0..1 climb into the header. */
    let lift = 0;

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = cellSizeFor(w);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);

      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;

      glyphs = buildGlyphs(cell, dpr);

      // Reference mask: the wordmark at full size, centred. Built once and
      // then sampled through a transform, never rebuilt as it moves.
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d")!;
      octx.fillStyle = "#000";
      drawWordmark(octx, w / 2, h / 2, wordmarkSize(w), sans, serif);

      // Keep only the alpha channel — a quarter of the memory of the ImageData.
      const data = octx.getImageData(0, 0, w, h).data;
      const a = new Uint8Array(w * h);
      for (let i = 0, j = 3; i < a.length; i++, j += 4) a[i] = data[j];
      mask = a;

      cells = new Array(cols * rows);
      const colStart: number[] = [];
      for (let c = 0; c < cols; c++) colStart[c] = Math.random() * 260;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells[r * cols + c] = {
            ch: (Math.random() * CHARS.length) | 0,
            appearAt: colStart[c] + (r / Math.max(rows - 1, 1)) * (T_FILL - 320),
            alpha: 0,
          };
        }
      }
    }

    /**
     * How much of this cell falls inside the wordmark, 0..1. Maps the point
     * back into the reference mask's space.
     *
     * Sampled at four corners rather than one so the letterform edges feather
     * across a cell instead of stepping straight from field alpha to mark
     * alpha. Single-point sampling gave the wordmark a hard, stamped-on edge.
     */
    function maskAt(px: number, py: number) {
      if (!mask) return 0;
      const scale = 1 + (TRAVEL_SCALE - 1) * lift;
      const cyNow = h / 2 + (HEADER_Y - h / 2) * lift;
      const q = cell * 0.25;

      let hits = 0;
      for (let i = 0; i < 4; i++) {
        const ox = i & 1 ? q : -q;
        const oy = i & 2 ? q : -q;
        const mx = Math.round(w / 2 + (px + ox - w / 2) / scale);
        const my = Math.round(h / 2 + (py + oy - cyNow) / scale);
        if (mx < 0 || my < 0 || mx >= w || my >= h) continue;
        if (mask[my * w + mx] > MASK_THRESHOLD) hits++;
      }
      return hits / 4;
    }

    function frame(now: number) {
      if (disposed) return;
      if (!start) start = now;
      const t = now - start;

      // The climb only begins when the caller says so, so nothing progresses
      // until the viewer scrolls.
      const wantLift = travelRef.current && t >= T_SETTLED ? 1 : 0;
      lift += (wantLift - lift) * (reduced ? 1 : 0.055);

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      const px = Math.round(cell * dpr);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cl = cells[r * cols + c];

          // Mask coverage is recomputed every frame against the wordmark's
          // *current* position. That is what makes characters darken ahead of
          // it and settle back behind it as it climbs — the same mechanism
          // that revealed it.
          const m = maskAt((c + 0.5) * cell, (r + 0.5) * cell);

          let target: number;
          if (t < cl.appearAt) {
            target = 0;
          } else if (t < T_EMERGE) {
            // Uniform while the rain falls — the wordmark should emerge out of
            // an even field, not already be sitting in it.
            target = Math.min((t - cl.appearAt) / 260, 1) * FILL_ALPHA;
          } else {
            // No fizzle. The matrix persists for the whole intro; the wordmark
            // is only ever the characters held darker within it. Interpolating
            // on coverage rather than switching on a boolean is what softens
            // the letterform edges.
            target = FIELD_ALPHA + (MARK_ALPHA - FIELD_ALPHA) * m;
          }

          cl.alpha += (target - cl.alpha) * 0.18;
          if (cl.alpha < 0.01) continue;

          const step = Math.min(ALPHA_STEPS - 1, Math.max(0, Math.round(cl.alpha * ALPHA_STEPS) - 1));
          ctx.drawImage(glyphs[cl.ch][step], Math.round(c * cell * dpr), Math.round(r * cell * dpr), px, px);
        }
      }

      // Churn a slice of the field each frame so the characters flicker.
      const churn = Math.round(cells.length * 0.02);
      for (let i = 0; i < churn; i++) {
        const cl = cells[(Math.random() * cells.length) | 0];
        cl.ch = (Math.random() * CHARS.length) | 0;
      }

      // Arrived once the climb has effectively finished. The caller swaps in
      // the black text at this point, at the header, so the colour change is
      // never visible mid-page.
      if (!arrivedRef.current && lift > 0.97) {
        arrivedRef.current = true;
        onArrivedRef.current();
      }

      raf = requestAnimationFrame(frame);
    }

    function onResize() {
      if (started) build();
    }

    // The mask is measured from canvas text, so it must not be built until
    // next/font has actually loaded — otherwise the letterforms come out in
    // fallback metrics. The timeout guards against fonts.ready never settling.
    let started = false;
    function startAll() {
      if (started || disposed) return;
      started = true;
      build();
      raf = requestAnimationFrame(frame);
    }

    let fontGuard = 0;
    if (document.fonts) {
      document.fonts.ready.then(startAll);
      fontGuard = window.setTimeout(startAll, 600);
    } else {
      startAll();
    }

    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(fontGuard);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95]"
    />
  );
}
