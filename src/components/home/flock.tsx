"use client";

import { useEffect, useRef } from "react";

/**
 * The flock.
 *
 * Long undulating filaments that fly in from the left, one per stepper stage,
 * each with a labelled head. On the merge stage they all converge to a single
 * point; on the orb stages after that they scale up with the orb and are
 * absorbed.
 *
 * Each trail is a **crisp stroked line**, not a stipple. They pinch to nothing
 * at the head so the whole flock meets at a point and fans out behind it,
 * crossing each other — the fibre-optic look of the reference.
 *
 * Driven by `stage`, which comes from section metadata the same way
 * ParticleCanvas is driven by `particleShape`.
 */

export interface Creature {
  label: string;
  /** [r, g, b] — kept per trail so individual tints can return */
  rgb: [number, number, number];
  /** Resting head position as a fraction of the viewport */
  headX: number;
  headY: number;
  /** How far the tail sweeps vertically as it recedes, in viewport fractions */
  sweep: number;
  /** Undulation phase so no two move together */
  phase: number;
}

/**
 * Order is arrival order. The first leads, dead centre at half height.
 *
 * Sweeps are large and of mixed sign so the tails fan widely and cross one
 * another behind the head rather than running parallel.
 *
 * Every line is ink for now — the site is black, white and off-white only.
 * `rgb` is kept per creature so individual tints can come back without
 * restructuring anything.
 */
export const CREATURES: Creature[] = [
  { label: "SPEED",         rgb: [255, 255, 255], headX: 0.38, headY: 0.50, sweep:  0.05, phase: 0.0 },
  { label: "TIME SAVING",   rgb: [255, 255, 255], headX: 0.34, headY: 0.31, sweep:  0.30, phase: 1.1 },
  { label: "DATA INSIGHTS", rgb: [255, 255, 255], headX: 0.46, headY: 0.69, sweep: -0.26, phase: 2.2 },
  { label: "SCALABILITY",   rgb: [255, 255, 255], headX: 0.31, headY: 0.20, sweep:  0.44, phase: 3.3 },
  { label: "ACCURACY",      rgb: [255, 255, 255], headX: 0.45, headY: 0.80, sweep: -0.40, phase: 4.4 },
  { label: "REDUCE COSTS",  rgb: [255, 255, 255], headX: 0.42, headY: 0.41, sweep:  0.16, phase: 5.5 },
];

/** Where every trail meets on the merge stage. */
export const CONVERGE = { x: 0.52, y: 0.5 };

/** How far the formation lifts across the orb stages, in viewport fractions. */
const CLIMB = 0.085;

/**
 * The convergence point drifts upward as the orb charges, so the whole
 * formation climbs rather than sitting still. Deliberately small — it stays in
 * the middle of the page, this is a lift and not a journey to the top.
 *
 * Shared with the neural orb so the orb rises with the flock instead of the
 * trails detaching from it.
 */
export function convergeAt(rise: number) {
  return { x: CONVERGE.x, y: CONVERGE.y - rise * CLIMB };
}

/**
 * Radius of the neural orb at a given progress. Lives here rather than in
 * neural-orb.tsx because the flock needs it too. Two copies of this formula
 * would drift apart and the join between tail and nucleus would come undone.
 */
export function orbRadius(progress: number, w: number, h: number) {
  return 14 + progress * progress * Math.sqrt(w * w + h * h) * 0.62;
}

/** First stage at which all trails have arrived and merge. */
export const MERGE_STAGE = 7;
/** Stages after the merge, during which the orb grows. */
export const ORB_STAGES = 4;

/** Samples per line. High enough that the curve reads as smooth, not faceted. */
const PATH_POINTS = 130;
/** Length of the tail as a fraction of viewport width */
const TAIL_LEN = 0.95;
const INK = "10, 10, 10";

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
    /** Eased climb progress, matched to the orb's easing rate. */
    let riseEased = 0;
    /** Accumulated undulation clock, so speed can change without phase jumps. */
    let wavePhase = 0;
    let lastNow = 0;

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

    /** Head position, accounting for arrival, merge, and the climb. */
    function headPos(c: Creature, s: State, rise: number): [number, number] {
      const restX = c.headX * w;
      const restY = c.headY * h;
      const enterX = -0.25 * w;
      let hx = enterX + (restX - enterX) * s.arrival;
      let hy = restY;
      if (s.merge > 0) {
        const cp = convergeAt(rise);
        hx += (cp.x * w - hx) * s.merge;
        hy += (cp.y * h - hy) * s.merge;
      }
      return [hx, hy];
    }

    /**
     * Vertical offset of the line at position f along it, 0 at the head.
     *
     * Every term is pinched to (near) nothing at f = 0, so all six lines meet
     * at a point and fan out behind it — the convergence in the reference is a
     * sharp point, not a bundle of parallel threads. The whole-flock bob is
     * deliberately phase-free so it moves them together and does not reopen
     * that point.
     *
     * `wavePhase` is an accumulated clock, not raw elapsed time: the undulation
     * speeds up across the orb stages, and multiplying time by a changing speed
     * would jump the wave's phase whenever that speed changed.
     */
    function offsetAt(c: Creature, s: State, wavePhase: number, f: number) {
      const amp = h * 0.085;
      // 0.05 rather than 0.22 at f=0 — the earlier value kept the heads apart
      // and blunted the convergence into a bundle.
      const envA = amp * (0.05 + 0.95 * Math.pow(f, 0.6));
      const envB = amp * 0.3 * Math.pow(f, 0.9);

      const arc = Math.pow(f, 1.4) * c.sweep * h;

      const wave =
        Math.sin(f * 4.2 - wavePhase * 2.0 + c.phase) * envA +
        Math.sin(f * 9.0 - wavePhase * 3.3 + c.phase * 1.7) * envB;

      // Shared across every trail, so the formation breathes as one body and
      // the meeting point stays a point.
      const bob = Math.sin(wavePhase * 0.5) * h * 0.018;

      return arc + wave + bob;
    }

    /** Line thickness and glow scale as the orb approaches. */
    function girthScale(rise: number) {
      return 1 + rise * rise * 9;
    }

    /** Tail length grows far more gently than thickness. */
    function lengthScale(rise: number) {
      return 1 + rise * 2.2;
    }

    /** One crisp filament, with a soft lift underneath it. */
    function drawLine(
      c: Creature,
      s: State,
      wavePhase: number,
      hx: number,
      hy: number,
      alpha: number,
      lenScale: number,
      girth: number
    ) {
      const len = TAIL_LEN * w * lenScale;

      ctx!.beginPath();
      for (let i = 0; i < PATH_POINTS; i++) {
        const f = i / (PATH_POINTS - 1);
        const x = hx - f * len;
        const y = hy + offsetAt(c, s, wavePhase, f);
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }

      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";

      // A faint white lift under the line. The page carries texture from the
      // drifting blobs, and a bare hairline can get lost in it; this seats the
      // filament without turning into the heavy bloom the stipple version had.
      ctx!.strokeStyle = `rgba(255, 255, 255, ${0.55 * alpha})`;
      ctx!.lineWidth = 5 * girth;
      ctx!.stroke();

      // The filament itself — crisp, thin, ink.
      ctx!.strokeStyle = `rgba(${INK}, ${0.62 * alpha})`;
      ctx!.lineWidth = 1.3 * girth;
      ctx!.stroke();
    }

    function drawHead(
      x: number,
      y: number,
      rgb: [number, number, number],
      label: string,
      alpha: number,
      showLabel: boolean,
      headScale: number
    ) {
      const [r, g, b] = rgb;

      // Pure falloff, no stroked rim and no hard-edged disc — both read as a
      // drawn outline rather than a light source.
      const halo = ctx!.createRadialGradient(x, y, 0, x, y, 34 * headScale);
      halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.62 * alpha})`);
      halo.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${0.3 * alpha})`);
      halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(x, y, 34 * headScale, 0, Math.PI * 2);
      ctx!.fill();

      // Small solid bead for a crisp bright centre. Filled only — never
      // stroked, since a stroke is what turned this into a ring before.
      ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 4 * headScale, 0, Math.PI * 2);
      ctx!.fill();

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
      const stageNow = stageRef.current;

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.scale(dpr, dpr);

      const merged = stageNow >= MERGE_STAGE;

      // Eased at the same rate the orb eases its own progress, so the trails
      // and the orb stay locked together through a section change.
      const riseTarget = Math.max(
        0,
        Math.min(1, (stageNow - MERGE_STAGE) / ORB_STAGES)
      );
      riseEased += (riseTarget - riseEased) * (reduced ? 1 : 0.05);
      const rise = riseEased;

      // Undulation speed climbs across the orb stages. Integrated rather than
      // multiplied so a change in speed never jumps the wave's phase.
      const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0;
      lastNow = now;
      wavePhase += dt * (1 + rise * 2.2);

      const girth = girthScale(rise);
      const len = lengthScale(rise);

      for (let i = 0; i < CREATURES.length; i++) {
        const c = CREATURES[i];
        const s = states[i];

        const wantArrival = stageNow >= i + 1 ? 1 : 0;
        const wantMerge = merged ? 1 : 0;

        s.arrival += (wantArrival - s.arrival) * (reduced ? 1 : 0.045);
        s.merge += (wantMerge - s.merge) * (reduced ? 1 : 0.055);

        if (s.arrival < 0.004) continue;

        // Trails hold almost to the end — they have to grow with the orb to
        // convey the approach, so fading them early removes the cue.
        const absorbed = 1 - Math.max(0, (rise - 0.86) / 0.14);
        const a = s.arrival * absorbed;
        if (a < 0.01) continue;

        const [hx, hy] = headPos(c, s, rise);

        drawLine(c, s, wavePhase, hx, hy, Math.min(1, a * (1 + rise * 0.4)), len, girth);

        // The heads have merged into the orb by now, so they fade out rather
        // than scaling up into a white blob over the middle of it.
        const headFade = 1 - Math.max(0, Math.min(1, (rise - 0.3) / 0.45));
        if (headFade > 0.01) {
          drawHead(
            hx,
            hy + offsetAt(c, s, wavePhase, 0),
            c.rgb,
            c.label,
            a * headFade,
            s.merge < 0.35,
            1 + rise * 1.2
          );
        }
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    if (reduced) {
      for (let i = 0; i < states.length; i++) {
        states[i].arrival = stageRef.current >= i + 1 ? 1 : 0;
        states[i].merge = stageRef.current >= MERGE_STAGE ? 1 : 0;
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
