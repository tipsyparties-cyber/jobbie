"use client";

import { useEffect, useRef } from "react";

/**
 * The flock.
 *
 * Long undulating trails that fly in from the left, one per stepper stage,
 * each with a labelled head node and its own iridescent colour. On the final
 * stage every trail converges to a single point on the right.
 *
 * Driven by `stage`, which comes from section metadata the same way
 * ParticleCanvas is driven by `particleShape`:
 *   stage 0     nothing
 *   stage 1..4  that many trails present
 *   stage 5     all four converged
 *
 * Note on colour: the reference for this is glowing green on near-black.
 * Glow is additive and cannot be reproduced on an off-white ground — nothing
 * out-brightens white. So each trail carries its colour as chroma (a
 * saturated halo around a near-white core) rather than as emitted light.
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
  { label: "TIME SAVING",  rgb: [150, 120, 235], headX: 0.34, headY: 0.30, sweep:  0.22, phase: 0.0 },
  { label: "DATA INSIGHTS", rgb: [ 90, 170, 240], headX: 0.46, headY: 0.46, sweep: -0.16, phase: 1.7 },
  { label: "SCALABILITY",  rgb: [245, 150,  90], headX: 0.30, headY: 0.62, sweep:  0.10, phase: 3.1 },
  { label: "ACCURACY",     rgb: [235, 195,  80], headX: 0.44, headY: 0.76, sweep: -0.26, phase: 4.6 },
];

/** Where every trail meets on the final stage */
const CONVERGE = { x: 0.52, y: 0.5 };

const TAIL_POINTS = 96;
/** Length of the tail as a fraction of viewport width */
const TAIL_LEN = 0.95;

interface FlockProps {
  stage: number;
}

interface State {
  /** 0 = off-screen left, 1 = at rest */
  arrival: number;
  /** 0 = at rest, 1 = at the convergence point */
  merge: number;
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

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
    }

    /** Builds the tail polyline for one creature at the current time. */
    function tailPoints(c: Creature, s: State, time: number) {
      const restX = c.headX * w;
      const restY = c.headY * h;

      // Arrival slides the head in from off-screen left.
      const enterX = -0.25 * w;
      let hx = enterX + (restX - enterX) * s.arrival;
      let hy = restY;

      // Merge pulls it to the shared convergence point.
      if (s.merge > 0) {
        hx += (CONVERGE.x * w - hx) * s.merge;
        hy += (CONVERGE.y * h - hy) * s.merge;
      }

      const pts: [number, number][] = [];
      const len = TAIL_LEN * w;

      for (let j = 0; j < TAIL_POINTS; j++) {
        const f = j / (TAIL_POINTS - 1); // 0 at head, 1 at tail tip
        const x = hx - f * len;

        // The trail sweeps vertically as it recedes, which is what gives the
        // reference its long lazy arcs rather than straight lines.
        const arc = Math.pow(f, 1.5) * c.sweep * h * (1 - s.merge * 0.55);

        // A wave travelling down the body. Amplitude grows toward the tip so
        // the head stays steady and the tail whips — it reads as swimming.
        const wave =
          Math.sin(f * 9 - time * 2.1 + c.phase) * 16 * Math.pow(f, 0.8) * (1 - s.merge * 0.8);

        // Slow bob of the whole creature.
        const bob = Math.sin(time * 0.5 + c.phase) * 9 * (1 - s.merge);

        pts.push([x, hy + arc + wave + bob]);
      }
      return pts;
    }

    function strokeTail(pts: [number, number][], rgb: [number, number, number], alpha: number) {
      const [r, g, b] = rgb;

      ctx!.beginPath();
      ctx!.moveTo(pts[0][0], pts[0][1]);
      for (let j = 1; j < pts.length; j++) {
        // Midpoint smoothing keeps the polyline reading as a continuous curve.
        const [px, py] = pts[j - 1];
        const [cx, cy] = pts[j];
        ctx!.quadraticCurveTo(px, py, (px + cx) / 2, (py + cy) / 2);
      }

      // Wide, soft, saturated halo — this is the part doing the visible work
      // on a light ground.
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.16 * alpha})`;
      ctx!.lineWidth = 11;
      ctx!.stroke();

      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.4 * alpha})`;
      ctx!.lineWidth = 4;
      ctx!.stroke();

      // Near-white core so it still reads as "white iridescent" rather than
      // as a plain coloured line.
      ctx!.strokeStyle = `rgba(255, 255, 255, ${0.85 * alpha})`;
      ctx!.lineWidth = 1.4;
      ctx!.stroke();
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

      const bloom = ctx!.createRadialGradient(x, y, 0, x, y, 26);
      bloom.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.42 * alpha})`);
      bloom.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx!.fillStyle = bloom;
      ctx!.beginPath();
      ctx!.arc(x, y, 26, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.9 * alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 6, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
      ctx!.fill();

      if (showLabel) {
        ctx!.font = `500 11px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "alphabetic";
        ctx!.fillStyle = `rgba(10, 10, 10, ${0.75 * alpha})`;
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

      const merged = stageNow >= CREATURES.length + 1;

      for (let i = 0; i < CREATURES.length; i++) {
        const c = CREATURES[i];
        const s = states[i];

        const wantArrival = stageNow >= i + 1 ? 1 : 0;
        const wantMerge = merged ? 1 : 0;

        // Ease toward the wanted state. Arrival is slower than merge so trails
        // glide in but snap together decisively.
        s.arrival += (wantArrival - s.arrival) * (reduced ? 1 : 0.045);
        s.merge += (wantMerge - s.merge) * (reduced ? 1 : 0.055);

        if (s.arrival < 0.004) continue;

        const pts = tailPoints(c, s, time);
        strokeTail(pts, c.rgb, s.arrival);
        // Labels fade out as the trails merge, or they would pile up.
        drawHead(pts[0][0], pts[0][1], c.rgb, c.label, s.arrival, s.merge < 0.35);
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    if (reduced) {
      // Settle immediately and paint one frame.
      for (let i = 0; i < states.length; i++) {
        states[i].arrival = stageRef.current >= i + 1 ? 1 : 0;
        states[i].merge = stageRef.current >= CREATURES.length + 1 ? 1 : 0;
      }
      frame(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => resize();
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
