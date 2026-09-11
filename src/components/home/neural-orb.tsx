"use client";

import { useEffect, useRef } from "react";
import { convergeAt, orbRadius, MERGE_STAGE, ORB_STAGES } from "./flock";

/**
 * The neural orb.
 *
 * Grows out of the point where the flock converges. A sphere of connected
 * nodes — the classic neural-network globe — inside a brightening white body
 * that falls to nothing at its edge. As the stages advance it swells until it
 * fills the viewport.
 *
 * It is deliberately NOT a self-contained object: no rim, no hard edge, and it
 * shares `orbRadius` with the flock so the tail flares to the same width where
 * they meet. The two are meant to read as one comet — nucleus and tail — not
 * as a ball with a trail attached.
 *
 * Stage 7 is the merge (orb not yet present). Stages 8..11 drive progress
 * 0.25 -> 1.0.
 */

const NODES = 170;
/** 3D distance below which two nodes are wired together, on a unit sphere. */
const LINK_DIST = 0.42;
/** Motes suspended inside the shell, twinkling. */
const SPARKS = 260;

interface Node {
  x: number;
  y: number;
  z: number;
}

interface OrbProps {
  stage: number;
}

export function NeuralOrb({ stage }: OrbProps) {
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
    /** Eased toward the stage's target so growth is continuous, not stepped. */
    let progress = 0;

    // Fibonacci sphere — even coverage without clumping at the poles.
    const nodes: Node[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODES; i++) {
      const y = 1 - (i / (NODES - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      nodes.push({ x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring });
    }

    // The sphere is rigid, so which nodes are neighbours never changes under
    // rotation. Compute the wiring once rather than every frame.
    const edges: [number, number][] = [];
    for (let i = 0; i < NODES; i++) {
      for (let j = i + 1; j < NODES; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) edges.push([i, j]);
      }
    }

    // Sparkle motes suspended inside the shell — the dust in the reference.
    // For a uniform fill the radius must be cbrt(u); using u directly piles
    // them up in the middle and leaves the outer volume empty.
    const sparks: {
      x: number;
      y: number;
      z: number;
      phase: number;
      rate: number;
    }[] = [];
    for (let i = 0; i < SPARKS; i++) {
      const rr = Math.cbrt(Math.random()) * 0.93;
      const theta = Math.random() * Math.PI * 2;
      const cosPhi = Math.random() * 2 - 1;
      const sinPhi = Math.sqrt(Math.max(0, 1 - cosPhi * cosPhi));
      sparks.push({
        x: rr * sinPhi * Math.cos(theta),
        y: rr * cosPhi,
        z: rr * sinPhi * Math.sin(theta),
        phase: Math.random() * Math.PI * 2,
        rate: 1.4 + Math.random() * 3.6,
      });
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
    }

    function frame(now: number) {
      if (disposed) return;
      if (!start) start = now;
      const time = (now - start) / 1000;

      const target = Math.max(
        0,
        Math.min(1, (stageRef.current - MERGE_STAGE) / ORB_STAGES)
      );
      progress += (target - progress) * (reduced ? 1 : 0.05);

      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.scale(dpr, dpr);

      if (progress < 0.002) {
        if (!reduced) raf = requestAnimationFrame(frame);
        return;
      }

      // Follows the same climb the trails do, so the orb rises with the flock
      // rather than the trails sliding up off a stationary orb.
      const cp = convergeAt(progress);
      const cx = cp.x * w;
      const cy = cp.y * h;
      // Shared with the flock, which flares its tail to this same radius so the
      // two read as one comet rather than a ball with a thread attached.
      const r = orbRadius(progress, w, h);

      // Outer bloom. Widens and brightens with progress — this is the "glowing
      // more and more".
      const bloom = ctx!.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.5);
      bloom.addColorStop(0, `rgba(255, 255, 255, ${0.5 * progress})`);
      bloom.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx!.fillStyle = bloom;
      ctx!.beginPath();
      ctx!.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
      ctx!.fill();

      // Body — bright in the middle, falling to nothing at the rim. The outer
      // stop must be fully transparent: it used to end at 0.1-0.4 alpha, which
      // put a visible disc edge exactly where the tail meets the orb and made
      // it read as a separate object sitting on top of the trail.
      const body = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
      body.addColorStop(0, `rgba(255, 255, 255, ${0.55 + 0.45 * progress})`);
      body.addColorStop(0.6, `rgba(255, 255, 255, ${0.34 + 0.44 * progress})`);
      body.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fill();

      // No rim. An outline is the single strongest cue that something is a
      // separate object, and the lattice already describes the sphere.

      // The network inside. Drawn in ink, because a white network on a white
      // orb would be invisible — the same reason the rest of the site is ink
      // on off-white.
      const rot = time * 0.22;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const tilt = 0.32;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const px: number[] = new Array(NODES);
      const py: number[] = new Array(NODES);
      const pz: number[] = new Array(NODES);

      const nodeR = r * 0.82;
      for (let i = 0; i < NODES; i++) {
        const n = nodes[i];
        // Yaw, then a fixed tilt so we never look straight down the equator.
        const x1 = n.x * cosR - n.z * sinR;
        const z1 = n.x * sinR + n.z * cosR;
        const y2 = n.y * cosT - z1 * sinT;
        const z2 = n.y * sinT + z1 * cosT;
        px[i] = cx + x1 * nodeR;
        py[i] = cy + y2 * nodeR;
        pz[i] = z2;
      }

      // The structure now *intensifies* all the way in. It used to fade out
      // after 0.72 for the whiteout, which hid the lattice at exactly the point
      // the orb is closest — the opposite of showing what it is made of.
      const netStrength = Math.min(1, 0.35 + progress * 1.1);

      if (netStrength > 0.01) {
        ctx!.lineWidth = 1;
        for (let e = 0; e < edges.length; e++) {
          const [i, j] = edges[e];
          // Depth fade — far side of the sphere sits back.
          const depth = (pz[i] + pz[j]) / 2;
          const a = (0.16 + 0.24 * ((depth + 1) / 2)) * netStrength;
          if (a < 0.012) continue;
          ctx!.strokeStyle = `rgba(10, 10, 10, ${a.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(px[i], py[i]);
          ctx!.lineTo(px[j], py[j]);
          ctx!.stroke();
        }

        // Vertices. They grow with the orb rather than staying a fixed pixel
        // size, so coming closer actually resolves more detail.
        const vertexScale = Math.min(4.5, 0.5 + r / 110);
        for (let i = 0; i < NODES; i++) {
          const a = (0.32 + 0.55 * ((pz[i] + 1) / 2)) * netStrength;
          const size = (1.0 + 1.4 * ((pz[i] + 1) / 2)) * vertexScale;
          ctx!.fillStyle = `rgba(10, 10, 10, ${a.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(px[i], py[i], size, 0, Math.PI * 2);
          ctx!.fill();
        }

        // Motes suspended inside, twinkling on their own clocks. These are what
        // make the interior read as a volume with stuff in it rather than a
        // hollow wireframe.
        const moteScale = Math.min(3, 0.4 + r / 190);
        for (let i = 0; i < SPARKS; i++) {
          const sp = sparks[i];
          const x1 = sp.x * cosR - sp.z * sinR;
          const z1 = sp.x * sinR + sp.z * cosR;
          const y2 = sp.y * cosT - z1 * sinT;
          const z2 = sp.y * sinT + z1 * cosT;

          const twinkle = 0.5 + 0.5 * Math.sin(time * sp.rate + sp.phase);
          const a = (0.1 + 0.55 * twinkle) * ((z2 + 1) / 2) * netStrength;
          if (a < 0.02) continue;

          ctx!.fillStyle = `rgba(10, 10, 10, ${a.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(
            cx + x1 * nodeR,
            cy + y2 * nodeR,
            (0.7 + 0.9 * twinkle) * moteScale,
            0,
            Math.PI * 2
          );
          ctx!.fill();
        }
      }

      // A wash of white rather than a full whiteout. Russ wants to be absorbed
      // *into* the orb and see what it is made of, so blanking the screen to
      // solid white at the end would erase the very thing being approached.
      const flash = Math.max(0, (progress - 0.82) / 0.18);
      if (flash > 0) {
        ctx!.fillStyle = `rgba(255, 255, 255, ${(Math.min(1, flash) * 0.3).toFixed(3)})`;
        ctx!.fillRect(0, 0, w, h);
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    if (reduced) {
      progress = Math.max(0, Math.min(1, (stageRef.current - MERGE_STAGE) / ORB_STAGES));
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
