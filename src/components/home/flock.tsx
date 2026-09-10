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

/**
 * Order is arrival order. The first leads, dead centre at half height — it
 * barely has to move on the merge, so it reads as the spine the rest of the
 * flock gathers onto. The others then alternate above and below it, opening
 * outward as they arrive.
 *
 * Every bloom is pure white for now — the site is black, white and off-white
 * only. `rgb` is kept per creature so individual tints can come back without
 * restructuring anything.
 */
export const CREATURES: Creature[] = [
  { label: "SPEED",         rgb: [255, 255, 255], headX: 0.38, headY: 0.50, sweep:  0.06, phase: 0.0 },
  { label: "TIME SAVING",   rgb: [255, 255, 255], headX: 0.34, headY: 0.31, sweep:  0.18, phase: 1.1 },
  { label: "DATA INSIGHTS", rgb: [255, 255, 255], headX: 0.46, headY: 0.69, sweep: -0.16, phase: 2.2 },
  { label: "SCALABILITY",   rgb: [255, 255, 255], headX: 0.31, headY: 0.20, sweep:  0.22, phase: 3.3 },
  { label: "ACCURACY",      rgb: [255, 255, 255], headX: 0.45, headY: 0.80, sweep: -0.24, phase: 4.4 },
  { label: "REDUCE COSTS",  rgb: [255, 255, 255], headX: 0.42, headY: 0.41, sweep:  0.10, phase: 5.5 },
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
    /** Eased climb progress, matched to the orb's easing rate. */
    let riseEased = 0;
    /** Accumulated undulation clock, so speed can change without phase jumps. */
    let wavePhase = 0;
    let lastNow = 0;

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
     * Vertical offset of the centreline at position f along the tail.
     *
     * `wavePhase` is an accumulated clock, not raw elapsed time. The undulation
     * speeds up across the orb stages, and multiplying time by a changing speed
     * would jump the wave's phase every time that speed changed — sin(kt)
     * discontinuities whenever k moves. Integrating speed over time instead
     * keeps it smooth.
     */
    function offsetAt(c: Creature, s: State, wavePhase: number, f: number) {
      // The trail sweeps vertically as it recedes, which gives the long lazy
      // arcs while the flock is assembling.
      const arc = Math.pow(f, 1.5) * c.sweep * h * (1 - s.merge * 0.55);

      // Two waves travelling down the body at different rates. Amplitude is a
      // fraction of viewport height, not a pixel constant, so it undulates as
      // broadly as the page is tall.
      // The envelopes start at 0.22 and 0.15 rather than 0, so the wave still
      // has amplitude at f=0 — the head itself undulates instead of sitting
      // dead still while the tail whips, which is what sells it as swimming.
      const amp = h * 0.085;
      const wave =
        (Math.sin(f * 4.2 - wavePhase * 2.0 + c.phase) * amp * (0.22 + 0.78 * Math.pow(f, 0.55)) +
          Math.sin(f * 9.0 - wavePhase * 3.3 + c.phase * 1.7) * amp * 0.3 * (0.15 + 0.85 * Math.pow(f, 0.85))) *
        // Damped once merged, but only halfway — the trails have to keep
        // visibly moving after they converge, since the undulation speeding up
        // is now what carries the later stages.
        (1 - s.merge * 0.5);

      const bob = Math.sin(wavePhase * 0.5 + c.phase) * h * 0.02 * (1 - s.merge * 0.6);

      return arc + wave + bob;
    }

    /**
     * How far the stipple disperses either side of the centreline at f.
     * `approach` scales it as the orb comes toward us — without this the orb
     * would grow while the trails stayed put, which reads as the orb inflating
     * rather than the viewer moving closer to it.
     */
    function spreadAt(f: number, merge: number, approach: number) {
      return (h * 0.006 + Math.pow(f, 0.85) * h * 0.05) * (1 - merge * 0.75) * approach;
    }

    /** Everything about a trail scales by this as the orb approaches. */
    function approachScale(rise: number) {
      return 1 + rise * 2.4;
    }

    /** Soft coloured bloom under the stipple — this is the iridescence. */
    function drawBloom(
      c: Creature,
      s: State,
      wavePhase: number,
      hx: number,
      hy: number,
      alpha: number,
      approach: number
    ) {
      const [r, g, b] = c.rgb;
      const len = TAIL_LEN * w * approach;

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

      // Raised from the tinted version: a white bloom on off-white has far
      // less to work with than a coloured one, so it needs more opacity to
      // lift the ground at all.
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.45 * alpha})`;
      ctx!.lineWidth = 30 * approach;
      ctx!.stroke();

      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.55 * alpha})`;
      ctx!.lineWidth = 13 * approach;
      ctx!.stroke();
    }

    /** The stipple itself — ink grains scattered around the centreline. */
    function drawStipple(
      ci: number,
      c: Creature,
      s: State,
      wavePhase: number,
      hx: number,
      hy: number,
      alpha: number,
      approach: number
    ) {
      const len = TAIL_LEN * w * approach;
      // Grains grow too, so the stipple reads as coarser detail seen closer up
      // rather than the same fine dust stretched further.
      const grainScale = 1 + (approach - 1) * 0.65;
      ctx!.globalAlpha = alpha;

      for (let b = 1; b < BUCKETS; b++) {
        const group = grains[ci][b];
        if (group.length === 0) continue;

        ctx!.fillStyle = `rgba(${INK}, ${((b / (BUCKETS - 1)) * 0.5).toFixed(3)})`;

        for (let i = 0; i < group.length; i++) {
          const gr = group[i];
          const x = hx - gr.f * len;
          const y =
            hy +
            offsetAt(c, s, wavePhase, gr.f) +
            gr.off * spreadAt(gr.f, s.merge, approach);
          const sz = gr.size * grainScale;
          ctx!.fillRect(x, y, sz, sz);
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
      showLabel: boolean,
      approach: number
    ) {
      const [r, g, b] = rgb;

      // The head is pure falloff — no stroked rim and no hard-edged filled
      // disc. Both of those read as a drawn outline rather than a light
      // source, which is what made it look like a ring instead of a glow.
      //
      // What makes it read on a light page is not an edge but *contrast*: the
      // stipple grains are densest right around the head (their f is biased
      // toward it), so a pure white centre punches through the darkest part of
      // the trail. The head is drawn after the stipple for exactly this.

      // Wide soft halo.
      const halo = ctx!.createRadialGradient(x, y, 0, x, y, 42 * approach);
      halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.62 * alpha})`);
      halo.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${0.3 * alpha})`);
      halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(x, y, 42 * approach, 0, Math.PI * 2);
      ctx!.fill();

      // Inner glow, gradient so it has no boundary of its own.
      const core = ctx!.createRadialGradient(x, y, 0, x, y, 12 * approach);
      core.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      core.addColorStop(0.45, `rgba(255, 255, 255, ${0.85 * alpha})`);
      core.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(x, y, 12 * approach, 0, Math.PI * 2);
      ctx!.fill();

      // Small solid disc for a crisp bright centre, like the bright bead at the
      // end of a neon line. Filled only — never stroked, since a stroke is what
      // turned this into a ring before.
      ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 4.5 * approach, 0, Math.PI * 2);
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

      // 0 while the flock is still assembling, 1 once the orb is at full size.
      // Eased at the same rate the orb eases its own progress, so the trails
      // and the orb climb together instead of separating during a transition.
      const riseTarget = Math.max(
        0,
        Math.min(1, (stageNow - MERGE_STAGE) / ORB_STAGES)
      );
      riseEased += (riseTarget - riseEased) * (reduced ? 1 : 0.05);
      const rise = riseEased;

      // Undulation speed climbs across the orb stages — this is what carries
      // the later stages now, in place of the angle change. Integrated rather
      // than multiplied so a change in speed never jumps the wave's phase.
      const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0;
      lastNow = now;
      wavePhase += dt * (1 + rise * 2.2);

      for (let i = 0; i < CREATURES.length; i++) {
        const c = CREATURES[i];
        const s = states[i];

        const wantArrival = stageNow >= i + 1 ? 1 : 0;
        const wantMerge = merged ? 1 : 0;

        s.arrival += (wantArrival - s.arrival) * (reduced ? 1 : 0.045);
        s.merge += (wantMerge - s.merge) * (reduced ? 1 : 0.055);

        if (s.arrival < 0.004) continue;

        // Trails now hold almost to the end. They previously faded from rise
        // 0.45, which is barely after the orb starts growing — but they have to
        // grow *with* the orb to convey the approach, so fading them that early
        // removed the very thing that sells it.
        const absorbed = 1 - Math.max(0, (rise - 0.86) / 0.14);
        const a = s.arrival * absorbed;
        if (a < 0.01) continue;

        const approach = approachScale(rise);
        const [hx, hy] = headPos(c, s, rise);

        drawBloom(c, s, wavePhase, hx, hy, Math.min(1, a * (1 + rise * 0.6)), approach);
        drawStipple(i, c, s, wavePhase, hx, hy, a, approach);
        drawHead(
          hx,
          hy + offsetAt(c, s, wavePhase, 0),
          c.rgb,
          c.label,
          a,
          s.merge < 0.35,
          approach
        );
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
