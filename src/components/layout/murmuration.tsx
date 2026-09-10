"use client";

import { useEffect, useRef } from "react";

/**
 * Background murmuration.
 *
 * A stippled ribbon of particles that undulates across the viewport — a
 * starling murmuration, but quantised to a grid so it reads as data rather
 * than wildlife. Sits behind everything, over the drifting iridescent blobs.
 *
 * Each particle's alpha is fixed at creation (it derives from its lateral
 * offset, which never changes), so the render loop can sort particles into a
 * handful of alpha buckets and set fillStyle once per bucket instead of once
 * per particle. That keeps several thousand particles cheap.
 */

const COUNT_DESKTOP = 5200;
const COUNT_MOBILE = 1800;
const MOBILE_MAX = 640;

const BUCKETS = 8;
/** Grid the particles snap to. Small enough to stipple, big enough to read as structure. */
const QUANTISE = 2;
const INK = "10, 10, 10";

interface Particle {
  /** Position along the ribbon, 0..1 */
  t: number;
  /** Lateral offset from the centreline, roughly -1.6..1.6 */
  off: number;
  /** Per-particle wander phase */
  phase: number;
  /** Fixed alpha bucket index */
  bucket: number;
  /** 1 or 2 px */
  size: number;
}

export function Murmuration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let disposed = false;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    /** particles grouped by alpha bucket, so fillStyle changes 8x a frame, not 5200x */
    let byBucket: Particle[][] = [];
    let start = 0;

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      // The background never needs full retina density; capping at 1.5 keeps
      // the fill rate down on high-DPI screens.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;

      const count = w < MOBILE_MAX ? COUNT_MOBILE : COUNT_DESKTOP;
      particles = new Array(count);
      byBucket = Array.from({ length: BUCKETS }, () => []);

      for (let i = 0; i < count; i++) {
        // Sum of three uniforms approximates a normal distribution, which
        // gives the dense core and thin fringe of a real murmuration.
        const off =
          ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 3.2;

        // Fringe particles are fainter. Squared falloff so the core stays dark.
        const falloff = Math.max(0, 1 - Math.abs(off) / 1.7);
        const strength = falloff * falloff;
        const bucket = Math.min(BUCKETS - 1, Math.max(0, Math.round(strength * (BUCKETS - 1))));

        const p: Particle = {
          t: Math.random(),
          off,
          phase: Math.random() * Math.PI * 2,
          bucket,
          size: Math.random() < 0.18 ? 2 : 1,
        };
        particles[i] = p;
        byBucket[bucket].push(p);
      }
    }

    function frame(now: number) {
      if (disposed) return;
      if (!start) start = now;
      const time = (now - start) / 1000;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const cy = h * 0.52;
      const spanX = w * 1.5;
      const originX = -w * 0.25;

      for (let b = 1; b < BUCKETS; b++) {
        const group = byBucket[b];
        if (group.length === 0) continue;

        // Bucket 0 is invisible fringe and is skipped entirely.
        const alpha = (b / (BUCKETS - 1)) * 0.5;
        ctx!.fillStyle = `rgba(${INK}, ${alpha.toFixed(3)})`;

        for (let i = 0; i < group.length; i++) {
          const p = group[i];

          // Slow travel along the ribbon, wrapping seamlessly.
          let t = p.t + time * 0.012;
          t -= Math.floor(t);

          const x = originX + t * spanX;

          // Two sine terms of different frequency give the lazy S-curve;
          // the slow phase drift keeps it from ever repeating visibly.
          const centre =
            cy +
            Math.sin(t * 3.1 + time * 0.17) * h * 0.17 +
            Math.sin(t * 6.9 + time * 0.11) * h * 0.07;

          // The band pinches and swells along its length, which is what makes
          // the dark knot in the middle of a real murmuration.
          const spread = h * 0.14 * (0.5 + 0.5 * Math.sin(t * 4.3 + time * 0.13));

          const y =
            centre + p.off * spread + Math.sin(time * 0.7 + p.phase) * 3;

          // Snap to a grid — this is the "tech, not wildlife" part.
          const qx = Math.round((x * dpr) / QUANTISE) * QUANTISE;
          const qy = Math.round((y * dpr) / QUANTISE) * QUANTISE;

          ctx!.fillRect(qx, qy, p.size * dpr, p.size * dpr);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function onResize() {
      build();
    }

    build();
    if (reduced) {
      // One static frame, no loop.
      frame(0);
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      raf = requestAnimationFrame(frame);
    }
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
