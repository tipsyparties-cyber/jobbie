"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  angle: number;
  speed: number;
  radius: number;
  orbitRadius: number;
  opacity: number;
  phase: number;
}

// Sample points along a question mark shape
function getQuestionMarkPoints(cx: number, cy: number, scale: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];

  // The curved top of the ? — an arc from left going right and down
  for (let t = 0; t <= 1; t += 0.008) {
    const angle = Math.PI * 1.1 - t * Math.PI * 1.6; // arc from ~200deg to ~-90deg
    const r = scale * 0.35;
    const x = cx + Math.cos(angle) * r + scale * 0.05;
    const y = cy - scale * 0.22 + Math.sin(angle) * r * 0.9;
    points.push({ x, y });
  }

  // The straight stem going down from the curve
  for (let t = 0; t <= 1; t += 0.02) {
    const x = cx + scale * 0.05;
    const y = cy + scale * 0.05 + t * scale * 0.18;
    points.push({ x, y });
  }

  // The dot at the bottom
  for (let t = 0; t < 20; t++) {
    const angle = (t / 20) * Math.PI * 2;
    const r = scale * 0.035;
    const x = cx + scale * 0.05 + Math.cos(angle) * r;
    const y = cy + scale * 0.38 + Math.sin(angle) * r;
    points.push({ x, y });
  }

  return points;
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    // Get points along question mark
    const qmPoints = getQuestionMarkPoints(cx, cy, size);

    // Create particles distributed along the question mark
    const particles: Particle[] = [];
    const count = 250;

    for (let i = 0; i < count; i++) {
      // Pick a random point on the question mark path
      const pt = qmPoints[Math.floor(Math.random() * qmPoints.length)];
      // Add some scatter so it's not a solid line
      const scatter = 8 + Math.random() * 15;
      const scatterAngle = Math.random() * Math.PI * 2;
      const bx = pt.x + Math.cos(scatterAngle) * scatter;
      const by = pt.y + Math.sin(scatterAngle) * scatter;

      particles.push({
        x: bx,
        y: by,
        baseX: bx,
        baseY: by,
        angle: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.008,
        radius: 0.5 + Math.random() * 1.5,
        orbitRadius: 3 + Math.random() * 10,
        opacity: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const connectionDist = 50;
    let time = 0;
    let fadeIn = 0;

    function draw() {
      if (!ctx) return;
      time += 0.008;
      fadeIn = Math.min(fadeIn + 0.008, 1);

      ctx.clearRect(0, 0, size, size);
      ctx.globalAlpha = fadeIn;

      // Update particle positions — gentle orbital motion
      for (const p of particles) {
        p.angle += p.speed;
        p.x = p.baseX + Math.cos(p.angle + p.phase) * p.orbitRadius;
        p.y = p.baseY + Math.sin(p.angle * 0.7 + p.phase) * p.orbitRadius * 0.8;

        // Subtle breathing
        const breathe = Math.sin(time * 0.5 + p.phase) * 2;
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        p.x += (dx / dist) * breathe;
        p.y += (dy / dist) * breathe;
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.1 + j * 0.05);
            ctx.strokeStyle = `rgba(10, 10, 10, ${alpha * pulse})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[j].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const pulse = 0.7 + 0.3 * Math.sin(time * 3 + p.phase);
        ctx.fillStyle = `rgba(10, 10, 10, ${p.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Travelling pulses along the question mark shape
      const pulseCount = 6;
      for (let p = 0; p < pulseCount; p++) {
        const t = ((time * 15 + p * (qmPoints.length / pulseCount)) % qmPoints.length);
        const idx = Math.floor(t) % qmPoints.length;
        const pt = qmPoints[idx];

        ctx.fillStyle = `rgba(10, 10, 10, ${0.4 + 0.2 * Math.sin(time * 4 + p)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const startTimeout = setTimeout(() => {
      animRef.current = requestAnimationFrame(draw);
    }, 1500);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
      style={{ imageRendering: "auto" }}
    />
  );
}
