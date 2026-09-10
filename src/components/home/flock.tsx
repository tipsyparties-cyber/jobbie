"use client";

import { useEffect, useRef } from "react";

/**
 * The flock.
 *
 * Long undulating trails that fly in from the left, one per stepper stage,
 * each with a labelled head node and its own iridescent colour. On the merge
 * stage every trail converges to a single point; on the orb stages after that
 * they angle upward, brighten, and are absorbed.
 *
 * Each trail is drawn as a **stipple** — a dense scatter of ink particles
 * around a centreline, tight at the head and dispersing toward the tail —
 * sitting inside a soft coloured bloom. The bloom carries the iridescence; the
 * particles carry the form.
 *
 * Driven by `stage`, which comes from section metadata the same way
 * ParticleCanvas is driven by `particleShape`.
 */

export interface Creature {
  label: string;
  /** [r, g, b] — the iridescent identity of this trail */
  rgb: [number, number, number];
  /** Resting head position as a fraction of the viewport */
  headX: number;
  headY: number;
  /** How far the tail sweeps vertically as it recedes left, in viewport fractions */
  sweep: number;
  /** Undulation phase so no two move together */
  phase: number;
}

export const CREATURES: Creature[] = [
  { label: "TIME SAVING",   rgb: [242, 226, 150], headX: 0.34, headY: 0.19, sweep:  0.20, phase: 0.0 },
  { label: "DATA INSIGHTS", rgb: [210, 194, 246], headX: 0.46, headY: 0.32, sweep: -0.15, phase: 1.1 },
  { label: "SCALABILITY",   rgb: [182, 218, 246], headX: 0.31, headY: 0.44, sweep:  0.11, phase: 2.2 },
  { label: "ACCURACY",      rgb: [226, 202, 248], headX: 0.45, headY: 0.57, sweep: -0.22, phase: 3.3 },
  { label: "SPEED",         rgb: [228, 232, 240], headX: 0.33, headY: 0.69, sweep:  0.16, phase: 4.4 },
  { label: "REDUCE COSTS",  rgb: [193, 236, 208], headX: 0.44, headY: 0.81, sweep: -0.12, phase: 5.5 },
];

/** Where every trail meets on the final stage. Shared with the neural orb,
 *  which grows out of exactly this point. */
export const CONVERGE = { x: 0.52, y: 0.5 };

/** First stage at which all trails have arrived and merge. */
export const MERGE_STAGE = 7;
/** Stages after the merge, during which the orb grows and the trails rise. */
export const ORB_STAGES = 4;

/** Smooth-path samples, used for the bloom underneath. */
const PATH_POINTS = 64;
/** Stipple particles per trail. */
const GRAINS = 720;
const GRAINS_MOBILE = 300;
const MOBILE_MAX = 640;
/** Length of the tail as a fraction of viewport width */
const TAIL_LEN = 0.95;
const BUCKETS = 7;
const INK = "10, 10, 10";

interface Grain {
  /** Position along the tail, 0 at head, 1 at tip. Biased toward the head. */
  f: number;
  /** Lateral offset in spread units, roughly -1..1 */
  off: number;
  size: number;
  bucket: number;
}

interface State {
  /** 0 = off-screen left, 1 = at rest */
  arrival: number;
  /** 0 = at rest, 1 = at the convergence point */
  merge: number;
}

interface FlockProps {
  stage: number;
}

export function Flock({ stage }: FlockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(stage);
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let disposed = false;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let start = 0;

    const states: State[] = CREATURES.map(() => ({ arrival: 0, merge: 0 }));
    /** Per creature, grains grouped by fixed alpha bucket. */
    let grains: Grain[][][] = [];

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;

      const count = w < MOBILE_MAX ? GRAINS_MOBILE : GRAINS;

      grains = CREATURES.map(() => {
        const buckets: Grain[][] = Array.from({ length: BUCKETS }, () => []);
        for (let i = 0; i < count; i++) {
          // Exponent > 1 biases mass toward the head, so the trail is dense at
          // the front and dissolves behind it.
          const f = Math.pow(Math.random(), 1.35);

          // Sum of three uniforms ~ normal: dense core, thin fringe. Same
          // trick the background murmuration used.
          const off = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2.4;

          // Fringe grains fade; so does the far end of the tail.
          const edge = Math.max(0, 1 - Math.abs(off));
          const strength = Math.pow(edge, 1.8) * (1 - f * 0.55);
          const bucket = Math.min(BUCKETS - 1, Math.max(0, Math.round(strength * (BUCKETS - 1))));

          buckets[bucket].push({
            f,
            off,
            size: Math.random() < 0.16 ? 2 : 1,
            bucket,
          });
        }
        return buckets;
      });
    }

    /** Head position, accounting for arrival and merge. */
    function headPos(c: Creature, s: State): [number, number] {
      const restX = c.headX * w;
      const restY = c.headY * h;
      const enterX = -0.25 * w;
      let hx = enterX + (restX - enterX) * s.arrival;
      let hy = restY;
      if (s.merge > 0) {
        hx += (CONVERGE.x * w - hx) * s.merge;
        hy += (CONVERGE.y * h - hy) * s.merge;
      }
      return [hx, hy];
    }

    /** Vertical offset of the centreline at position f along the tail. */
    function offsetAt(c: Creature, s: State, time: number, rise: number, f: number) {
      // The trail sweeps vertically as it recedes, which gives the long lazy
      // arcs. Once the orb charges, an upward bias is added so the tail is
      // pushed down relative to the head and they read as climbing.
      const arc =
        Math.pow(f, 1.5) * c.sweep * h * (1 - s.merge * 0.55) +
        Math.pow(f, 1.2) * rise * h * 0.6;

      // Two waves travelling down the body at different rates. Amplitude is a
      // fraction of viewport height, not a pixel constant, so it undulates as
      // broadly as the page is tall.
      const amp = h * 0.085;
      const wave =
        (Math.sin(f * 4.2 - time * 1.15 + c.phase) * amp * Math.pow(f, 0.55) +
          Math.sin(f * 9.0 - time * 1.9 + c.phase * 1.7) * amp * 0.3 * Math.pow(f, 0.85)) *
        (1 - s.merge * 0.85);

      const bob = Math.sin(time * 0.45 + c.phase) * h * 0.02 * (1 - s.merge);

      return arc + wave + bob;
    }

    /** How far the stipple disperses either side of the centreline at f. */
    function spreadAt(f: number, merge: number) {
      return (h * 0.006 + Math.pow(f, 0.85) * h * 0.05) * (1 - merge * 0.75);
    }

    /** Soft coloured bloom under the stipple — this is the iridescence. */
    function drawBloom(
      c: Creature,
      s: State,
      time: number,
      rise: number,
      hx: number,
      hy: number,
      alpha: number
    ) {
      const [r, g, b] = c.rgb;
      const len = TAIL_LEN * w;

      ctx!.beginPath();
      for (let i = 0; i < PATH_POINTS; i++) {
        const f = i / (PATH_POINTS - 1);
        const x = hx - f * len;
        const y = hy + offsetAt(c, s, time, rise, f);
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";

      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.3 * alpha})`;
      ctx!.lineWidth = 30;
      ctx!.stroke();

      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.34 * alpha})`;
      ctx!.lineWidth = 13;
      ctx!.stroke();
    }

    /** The stipple itself — ink grains scattered around the centreline. */
    function drawStipple(
      ci: number,
      c: Creature,
      s: State,
      time: number,
      rise: number,
      hx: number,
      hy: number,
      alpha: number
    ) {
      const len = TAIL_LEN * w;
      ctx!.globalAlpha = alpha;

      for (let b = 1; b < BUCKETS; b++) {
        const group = grains[ci][b];
        if (group.length === 0) continue;

        ctx!.fillStyle = `rgba(${INK}, ${((b / (BUCKETS - 1)) * 0.5).toFixed(3)})`;

        for (let i = 0; i < group.length; i++) {
          const gr = group[i];
          const x = hx - gr.f * len;
          const y =
            hy + offsetAt(c, s, time, rise, gr.f) + gr.off * spreadAt(gr.f, s.merge);
          ctx!.fillRect(x, y, gr.size, gr.size);
        }
      }

      ctx!.globalAlpha = 1;
    }

    function drawHead(
      x: number,
      y: number,
      rgb: [number, number, number],
      label: string,
      alpha: number,
      showLabel: boolean
    ) {
      const [r, g, b] = rgb;

      const bloom = ctx!.createRadialGradient(x, y, 0, x, y, 34);
      bloom.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.55 * alpha})`);
      bloom.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${0.22 * alpha})`);
      bloom.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx!.fillStyle = bloom;
      ctx!.beginPath();
      ctx!.arc(x, y, 34, 0, Math.PI * 2);
      ctx!.fill();

      // White head — the colour stays in the air around it, never in the dot.
      ctx!.fillStyle = `rgba(255, 255, 255, ${0.98 * alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 5, 0, Math.PI * 2);
      ctx!.fill();

      // Faint tinted rim, or a white dot on a near-white page has no edge.
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.75 * alpha})`;
      ctx!.lineWidth = 1.6;
      ctx!.beginPath();
      ctx!.arc(x, y, 5, 0, Math.PI * 2);
      ctx!.stroke();

      if (showLabel) {
        ctx!.font = `500 11px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "alphabetic";
        ctx!.fillStyle = `rgba(${INK}, ${0.75 * alpha})`;
        ctx!.fillText(label, x, y - 18);
      }
    }

    function frame(now: number) {
      if (disposed) return;
      if (!start) start = now;
      const time = (now - start) / 1000;
      const stageNow = stageRef.current;

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.scale(dpr, dpr);

      const merged = stageNow >= MERGE_STAGE;
      // 0 while the flock is still assembling, 1 once the orb is at full size.
      const rise = Math.max(0, Math.min(1, (stageNow - MERGE_STAGE) / ORB_STAGES));

      for (let i = 0; i < CREATURES.length; i++) {
        const c = CREATURES[i];
        const s = states[i];

        const wantArrival = stageNow >= i + 1 ? 1 : 0;
        const wantMerge = merged ? 1 : 0;

        s.arrival += (wantArrival - s.arrival) * (reduced ? 1 : 0.045);
        s.merge += (wantMerge - s.merge) * (reduced ? 1 : 0.055);

        if (s.arrival < 0.004) continue;

        // Trails brighten as the orb charges, then are absorbed into it.
        const absorbed = 1 - Math.max(0, (rise - 0.45) / 0.55);
        const a = s.arrival * absorbed;
        if (a < 0.01) continue;

        const [hx, hy] = headPos(c, s);

        drawBloom(c, s, time, rise, hx, hy, Math.min(1, a * (1 + rise * 0.6)));
        drawStipple(i, c, s, time, rise, hx, hy, a);
        drawHead(hx, hy + offsetAt(c, s, time, rise, 0), c.rgb, c.label, a, s.merge < 0.35);
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    build();
    if (reduced) {
      for (let i = 0; i < states.length; i++) {
        states[i].arrival = stageRef.current >= i + 1 ? 1 : 0;
        states[i].merge = stageRef.current >= MERGE_STAGE ? 1 : 0;
      }
      frame(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
