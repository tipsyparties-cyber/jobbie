"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  angle: number;
  speed: number;
  radius: number;
  orbitRadius: number;
  opacity: number;
  phase: number;
}

// Check if point is inside brain side-profile shape
function isInsideBrain(px: number, py: number, cx: number, cy: number, s: number): boolean {
  // Normalize to -1..1 relative to brain centre
  const nx = (px - cx) / s;
  const ny = (py - cy) / s;

  // Side profile brain shape — front is left, back is right
  // Cerebrum: large rounded top
  const cerebrumDist = Math.sqrt((nx + 0.05) ** 2 / 1.3 + (ny + 0.1) ** 2 / 0.65);
  if (cerebrumDist < 0.85) return true;

  // Cerebellum: smaller bulge at back-bottom
  const cerebellumDist = Math.sqrt((nx - 0.4) ** 2 / 0.15 + (ny - 0.35) ** 2 / 0.1);
  if (cerebellumDist < 0.9) return true;

  // Brain stem
  if (nx > -0.05 && nx < 0.15 && ny > 0.4 && ny < 0.7) return true;

  return false;
}

// Get outline points for brain side profile
function getBrainOutlinePoints(cx: number, cy: number, s: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];

  // Cerebrum top arc (large dome)
  for (let t = 0; t <= 1; t += 0.003) {
    const angle = Math.PI * 0.85 - t * Math.PI * 1.5;
    const rx = s * 0.95;
    const ry = s * 0.7;
    const x = cx - s * 0.05 + Math.cos(angle) * rx;
    const y = cy - s * 0.1 + Math.sin(angle) * ry;
    points.push({ x, y });
  }

  // Temporal lobe bottom curve
  for (let t = 0; t <= 1; t += 0.005) {
    const x = cx - s * 0.9 + t * s * 1.4;
    const y = cy + s * 0.55 + Math.sin(t * Math.PI) * s * 0.1;
    points.push({ x, y });
  }

  // Cerebellum
  for (let t = 0; t <= 1; t += 0.005) {
    const angle = -Math.PI * 0.3 + t * Math.PI * 1.0;
    const x = cx + s * 0.55 + Math.cos(angle) * s * 0.35;
    const y = cy + s * 0.35 + Math.sin(angle) * s * 0.25;
    points.push({ x, y });
  }

  // Brain stem
  for (let t = 0; t <= 1; t += 0.01) {
    points.push({ x: cx + s * 0.15 + Math.sin(t * 2) * s * 0.03, y: cy + s * 0.6 + t * s * 0.25 });
  }

  return points;
}

function getQuestionMarkPoints(cx: number, cy: number, scale: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let t = 0; t <= 1; t += 0.006) {
    const angle = Math.PI * 1.1 - t * Math.PI * 1.6;
    const r = scale * 0.3;
    points.push({ x: cx + Math.cos(angle) * r, y: cy - scale * 0.2 + Math.sin(angle) * r * 0.85 });
  }
  for (let t = 0; t <= 1; t += 0.015) {
    points.push({ x: cx, y: cy + scale * 0.05 + t * scale * 0.15 });
  }
  for (let t = 0; t < 15; t++) {
    const angle = (t / 15) * Math.PI * 2;
    points.push({ x: cx + Math.cos(angle) * scale * 0.03, y: cy + scale * 0.32 + Math.sin(angle) * scale * 0.03 });
  }
  return points;
}

function getClusterPoints(cx: number, cy: number, scale: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const r = scale * 0.25;
  for (let i = 0; i < 500; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.pow(Math.random(), 0.5) * r;
    points.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
    });
  }
  return points;
}

function getShapePoints(cx: number, cy: number, scale: number, shape: "cluster" | "question" | "brain"): { x: number; y: number }[] {
  if (shape === "cluster") return getClusterPoints(cx, cy, scale);
  if (shape === "question") return getQuestionMarkPoints(cx, cy, scale);

  const points: { x: number; y: number }[] = [];
  const s = scale * 0.38;

  // Brain side-profile — built from ellipses that we sample inside
  // Main cerebrum: large ellipse, slightly left of centre, upper
  // Cerebellum: smaller ellipse, right-lower
  // Brain stem: narrow rect, bottom centre-right

  const regions = [
    // Cerebrum — main mass (wide, tall dome)
    { cx: cx - s * 0.08, cy: cy - s * 0.12, rx: s * 0.85, ry: s * 0.62, weight: 5 },
    // Frontal lobe — bulge front-left
    { cx: cx - s * 0.5, cy: cy - s * 0.05, rx: s * 0.45, ry: s * 0.5, weight: 3 },
    // Parietal — top
    { cx: cx + s * 0.05, cy: cy - s * 0.45, rx: s * 0.55, ry: s * 0.35, weight: 2 },
    // Occipital — back
    { cx: cx + s * 0.55, cy: cy - s * 0.1, rx: s * 0.35, ry: s * 0.45, weight: 2 },
    // Temporal — lower front
    { cx: cx - s * 0.3, cy: cy + s * 0.25, rx: s * 0.5, ry: s * 0.3, weight: 2 },
    // Cerebellum — back-bottom
    { cx: cx + s * 0.55, cy: cy + s * 0.4, rx: s * 0.3, ry: s * 0.22, weight: 2 },
    // Brain stem
    { cx: cx + s * 0.2, cy: cy + s * 0.65, rx: s * 0.1, ry: s * 0.18, weight: 1 },
  ];

  // Generate points inside these regions
  for (const region of regions) {
    const count = region.weight * 80;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); // sqrt for uniform distribution in circle
      const x = region.cx + Math.cos(angle) * r * region.rx;
      const y = region.cy + Math.sin(angle) * r * region.ry;
      points.push({ x, y });
    }
  }

  return points;
}

export function WhyUsCanvas({ phase }: { phase: "cluster" | "question" | "brain" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const currentPhaseRef = useRef(phase);

  useEffect(() => {
    currentPhaseRef.current = phase;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 500;
    const cx = size / 2;
    const cy = size / 2;

    const shapePoints = getShapePoints(cx, cy, size, phase);
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const pt = shapePoints[Math.floor(Math.random() * shapePoints.length)];
      const scatter = 2 + Math.random() * 5;
      const scatterAngle = Math.random() * Math.PI * 2;
      particles[i].targetX = pt.x + Math.cos(scatterAngle) * scatter;
      particles[i].targetY = pt.y + Math.sin(scatterAngle) * scatter;
    }
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    const shapePoints = getShapePoints(cx, cy, size, "cluster");
    const count = 300;

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < count; i++) {
        const pt = shapePoints[Math.floor(Math.random() * shapePoints.length)];
        const scatter = 3 + Math.random() * 15;
        const scatterAngle = Math.random() * Math.PI * 2;
        const bx = pt.x + Math.cos(scatterAngle) * scatter;
        const by = pt.y + Math.sin(scatterAngle) * scatter;

        particlesRef.current.push({
          x: bx, y: by,
          targetX: bx, targetY: by,
          angle: Math.random() * Math.PI * 2,
          speed: 0.001 + Math.random() * 0.004,
          // Wide variety of dot sizes like the reference
          radius: Math.random() < 0.3 ? 2 + Math.random() * 4 : 0.5 + Math.random() * 1.5,
          orbitRadius: 1.5 + Math.random() * 5,
          opacity: 0.4 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const connectionDist = 60;
    let time = 0;
    let fadeIn = 0;

    function draw() {
      if (!ctx) return;
      time += 0.006;
      fadeIn = Math.min(fadeIn + 0.006, 1);

      ctx.clearRect(0, 0, size, size);
      ctx.globalAlpha = fadeIn;

      const particles = particlesRef.current;

      // Move toward targets
      for (const p of particles) {
        const baseX = p.x - Math.cos(p.angle + p.phase) * p.orbitRadius;
        const baseY = p.y - Math.sin(p.angle * 0.7 + p.phase) * p.orbitRadius * 0.8;
        const dx = p.targetX - baseX;
        const dy = p.targetY - baseY;
        const newBaseX = baseX + dx * 0.025;
        const newBaseY = baseY + dy * 0.025;

        p.angle += p.speed;
        p.x = newBaseX + Math.cos(p.angle + p.phase) * p.orbitRadius;
        p.y = newBaseY + Math.sin(p.angle * 0.7 + p.phase) * p.orbitRadius * 0.8;
      }

      // Draw connections — longer lines, some extending outward
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < 3; j++) {
          const ddx = particles[i].x - particles[j].x;
          const ddy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.2;
            ctx.strokeStyle = `rgba(242, 238, 227, ${alpha})`;
            ctx.lineWidth = 0.3 + Math.random() * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Extending lines from edge particles — shooting outward
      if (currentPhaseRef.current === "brain") {
        for (let i = 0; i < particles.length; i += 5) {
          const p = particles[i];
          const distFromCenter = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
          if (distFromCenter > 80) {
            const angle = Math.atan2(p.y - cy, p.x - cx);
            const len = 15 + Math.random() * 30;
            const endX = p.x + Math.cos(angle) * len;
            const endY = p.y + Math.sin(angle) * len;
            const pulse = 0.3 + 0.2 * Math.sin(time * 2 + i);
            ctx.strokeStyle = `rgba(242, 238, 227, ${pulse * 0.15})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            // Small dot at end of extending line
            ctx.fillStyle = `rgba(242, 238, 227, ${pulse * 0.3})`;
            ctx.beginPath();
            ctx.arc(endX, endY, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw particles — varying sizes
      for (const p of particles) {
        const pulse = 0.7 + 0.3 * Math.sin(time * 2.5 + p.phase);
        ctx.fillStyle = `rgba(242, 238, 227, ${p.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Travelling pulses
      for (let p = 0; p < 8; p++) {
        const idx = Math.floor((time * 20 + p * 50) % particles.length);
        const pt = particles[idx];
        if (pt) {
          ctx.fillStyle = `rgba(242, 238, 227, 0.7)`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const startTimeout = setTimeout(() => {
      animRef.current = requestAnimationFrame(draw);
    }, 500);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]"
      style={{ imageRendering: "auto" }}
    />
  );
}
